"use client";
import type { ReactNode, CSSProperties } from "react";

/**
 * Lightweight wrapper that preserves the ParallaxLayer API while adding
 * zero scroll overhead. The homepage's smoothness comes from Lenis alone —
 * adding per-element useScroll+useTransform on content pages creates
 * ResizeObserver/IntersectionObserver + RAF overhead that makes scroll feel
 * heavier. The entrance animations (whileInView on children) are unaffected.
 */
export default function ParallaxLayer({
  children,
  offset: _offset,
  className,
  style,
  spring: _spring,
}: {
  children?: ReactNode;
  offset?: number;
  className?: string;
  style?: CSSProperties;
  spring?: { stiffness: number; damping: number; mass?: number };
}) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
