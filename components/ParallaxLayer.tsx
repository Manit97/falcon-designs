"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

/**
 * Parallax depth wrapper. Lenis already smooths the scroll — adding a
 * useSpring on top creates a double-spring that makes content pages feel
 * laggy. By default we use the raw linear transform (smooth enough via
 * Lenis). Pass `spring` only for purely decorative background elements
 * that should trail visually behind the main scroll.
 */
export default function ParallaxLayer({
  children,
  offset = 50,
  className,
  style,
  spring,
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

  const rawY = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  // Only apply spring when explicitly requested (decorative bg elements only).
  // Default is the raw linear value — Lenis provides all the smoothing needed.
  const springY = useSpring(rawY, spring ?? { stiffness: 1000, damping: 100 });
  const y = spring ? springY : rawY;

  return (
    <motion.div ref={ref} className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  );
}
