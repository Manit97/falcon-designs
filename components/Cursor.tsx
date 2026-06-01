"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const [hovered,  setHovered]  = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hidden,   setHidden]   = useState(true);

  // Fast spring for the main dot
  const x = useSpring(mouseX, { stiffness: 700, damping: 36, mass: 0.4 });
  const y = useSpring(mouseY, { stiffness: 700, damping: 36, mass: 0.4 });

  // Slow spring for the trailing ring
  const trailX = useSpring(mouseX, { stiffness: 140, damping: 24, mass: 1 });
  const trailY = useSpring(mouseY, { stiffness: 140, damping: 24, mass: 1 });

  useEffect(() => {
    // Touch devices: skip
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setHidden(false);
    };
    const down  = () => setClicking(true);
    const up    = () => setClicking(false);
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    const hoverCheck = (e: MouseEvent) => {
      const el = (e.target as Element).closest("a, button, [data-cursor-hover]");
      setHovered(!!el);
    };

    window.addEventListener("mousemove",  move,       { passive: true });
    window.addEventListener("mousemove",  hoverCheck, { passive: true });
    window.addEventListener("mousedown",  down);
    window.addEventListener("mouseup",    up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove",  move);
      window.removeEventListener("mousemove",  hoverCheck);
      window.removeEventListener("mousedown",  down);
      window.removeEventListener("mouseup",    up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [mouseX, mouseY]);

  // Hide on touch/coarse devices — SSR-safe check happens inside useEffect above
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const dotSize  = clicking ? 6  : hovered ? 44 : 10;
  const ringSize = clicking ? 18 : hovered ? 64 : 30;

  return (
    <>
      {/* ── Dot: plain white, no blend mode ─────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width:  dotSize,
          height: dotSize,
          backgroundColor: "#ffffff",
          opacity: hidden ? 0 : 1,
          // Shadow gives contrast on rare light surfaces
          boxShadow: "0 0 0 1px rgba(0,0,0,0.25)",
          transition:
            "width 0.2s cubic-bezier(0.16,1,0.3,1), height 0.2s cubic-bezier(0.16,1,0.3,1), opacity 0.12s ease",
        }}
      />

      {/* ── Trailing ring ────────────────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width:  ringSize,
          height: ringSize,
          border: hovered ? "1.5px solid rgba(249,115,22,0.7)" : "1px solid rgba(255,255,255,0.4)",
          opacity: hidden ? 0 : hovered ? 0.9 : 0.5,
          transition:
            "width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), border 0.2s ease, opacity 0.12s ease",
        }}
      />
    </>
  );
}
