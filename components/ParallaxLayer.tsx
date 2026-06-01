"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

/**
 * Wraps its children in a motion.div that translates vertically as the element
 * scrolls through the viewport — creating a classic parallax depth effect.
 *
 * Two layers of smoothing:
 *   1. Lenis lerp — the page scroll itself decelerates exponentially (no hard stop).
 *   2. useSpring  — each parallax element has its own spring inertia on top of
 *      the scroll, so different layers decelerate at different rates and feel
 *      like they're floating at different depths.
 *
 * offset   — total Y travel in px (element rises this many px across its viewport journey).
 * spring   — Framer Motion spring config. Stiffer = more tightly coupled to scroll.
 */
export default function ParallaxLayer({
  children,
  offset = 50,
  className,
  style,
  spring = { stiffness: 80, damping: 20, mass: 0.6 },
}: {
  children?: ReactNode;
  offset?: number;
  className?: string;
  style?: CSSProperties;
  spring?: { stiffness: number; damping: number; mass?: number };
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Raw linear transform driven by scroll progress
  const rawY = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  // Spring gives each layer its own deceleration curve on top of Lenis's scroll.
  // Background glows (large offset, low stiffness) trail further behind;
  // section headers (smaller offset, same spring) feel crisper.
  const y = useSpring(rawY, spring);

  return (
    <motion.div ref={ref} className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  );
}
