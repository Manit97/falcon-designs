"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

/**
 * Wraps its children in a motion.div that translates vertically as the element
 * scrolls through the viewport — creating a classic parallax depth effect.
 *
 * - offset: total Y travel in pixels (half up, half down). Larger = stronger effect.
 * - The element rises as the user scrolls down, giving a sense of layers at
 *   different depths.
 *
 * Works seamlessly with Lenis smooth-scroll because Lenis fires native scroll
 * events that Framer Motion's useScroll intercepts.
 */
export default function ParallaxLayer({
  children,
  offset = 50,
  className,
  style,
}: {
  children?: ReactNode;
  offset?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Element starts offset px below its natural position and rises to offset px above.
  const y = useTransform(scrollYProgress, [0, 1], [`${offset}px`, `${-offset}px`]);

  return (
    <motion.div ref={ref} className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  );
}
