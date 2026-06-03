"use client";

/**
 * Self-contained animated icons sourced from animate-ui.com
 * Animations extracted from the animate-ui registry and adapted to work
 * standalone with the Framer Motion instance already in this project.
 *
 * Each icon accepts an `animate` boolean prop — set it to true to play.
 * Pair with onMouseEnter/onMouseLeave on the parent to trigger on hover.
 */

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const STROKE = { stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

// ── Shared wrapper ────────────────────────────────────────────────────────────
interface IconProps { animate: boolean; size?: number; className?: string }

// ── 1. Bot — eyes blink on hover ──────────────────────────────────────────────
export function BotIcon({ animate, size = 22, className }: IconProps) {
  const eyes = useAnimation();

  useEffect(() => {
    if (animate) {
      eyes.start({
        scaleY: [1, 0.15, 1],
        transition: { ease: "easeInOut", duration: 0.5 },
      });
    } else {
      eyes.set({ scaleY: 1 });
    }
  }, [animate, eyes]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
      viewBox="0 0 24 24" fill="none" className={className} {...STROKE}>
      {/* antenna */}
      <path d="M12 8V4H8" />
      {/* body */}
      <rect width={16} height={12} x={4} y={8} rx={2} />
      {/* arms */}
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      {/* eyes */}
      <motion.path d="M15 13v2" animate={eyes} style={{ originX: "15px", originY: "14px" }} />
      <motion.path d="M9 13v2"  animate={eyes} style={{ originX: "9px",  originY: "14px" }} />
    </svg>
  );
}

// ── 2. Clock — minute hand sweeps on hover ────────────────────────────────────
export function ClockIcon({ animate, size = 22, className }: IconProps) {
  const hand = useAnimation();

  useEffect(() => {
    if (animate) {
      hand.start({
        rotate: [0, 360],
        transition: { ease: "easeInOut", duration: 0.7 },
      });
    } else {
      hand.set({ rotate: 0 });
    }
  }, [animate, hand]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
      viewBox="0 0 24 24" fill="none" className={className} {...STROKE}>
      <circle cx={12} cy={12} r={10} />
      {/* hour hand — static */}
      <line x1={8} y1={14} x2={12} y2={12} />
      {/* minute hand — animates */}
      <motion.line x1={12} y1={6} x2={12} y2={12}
        animate={hand}
        style={{ originX: "12px", originY: "12px" }} />
    </svg>
  );
}

// ── 3. MessageCircleMore — dots bounce on hover ───────────────────────────────
export function MessageIcon({ animate, size = 22, className }: IconProps) {
  const d1 = useAnimation();
  const d2 = useAnimation();
  const d3 = useAnimation();

  useEffect(() => {
    if (animate) {
      const cfg = (delay: number) => ({
        y: [0, -2.5, 0],
        transition: { ease: "easeInOut", duration: 0.5, delay },
      });
      d1.start(cfg(0));
      d2.start(cfg(0.1));
      d3.start(cfg(0.2));
    } else {
      [d1, d2, d3].forEach((c) => c.set({ y: 0 }));
    }
  }, [animate, d1, d2, d3]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
      viewBox="0 0 24 24" fill="none" className={className} {...STROKE}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <motion.line x1="8"  y1="12" x2="8"  y2="12" animate={d1} />
      <motion.line x1="12" y1="12" x2="12" y2="12" animate={d2} />
      <motion.line x1="16" y1="12" x2="16" y2="12" animate={d3} />
    </svg>
  );
}

// ── 4. Sparkles — pulses + small star appears on hover ────────────────────────
export function SparklesIcon({ animate, size = 22, className }: IconProps) {
  const star  = useAnimation();
  const small = useAnimation();

  useEffect(() => {
    if (animate) {
      star.start({
        scale: [1, 0.85, 1.15, 1],
        transition: { duration: 0.55, ease: "easeInOut" },
      });
      small.start({
        opacity: [0, 1, 0],
        scale:   [0, 1, 0],
        transition: { duration: 0.55, ease: "easeInOut", delay: 0.1 },
      });
    } else {
      star.set({ scale: 1 });
      small.set({ opacity: 0, scale: 0 });
    }
  }, [animate, star, small]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
      viewBox="0 0 24 24" fill="none" className={className} {...STROKE}>
      {/* main star */}
      <motion.path
        d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
        animate={star}
        style={{ originX: "12px", originY: "12px" }}
      />
      {/* small accent — fades in on hover */}
      <motion.path
        d="M20 2v4 M22 4h-4"
        animate={small}
        initial={{ opacity: 0, scale: 0 }}
        style={{ originX: "20px", originY: "4px" }}
      />
    </svg>
  );
}
