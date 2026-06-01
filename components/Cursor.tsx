"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hidden, setHidden] = useState(false);

  const springCfg = { stiffness: 600, damping: 32, mass: 0.5 };
  const x = useSpring(mouseX, springCfg);
  const y = useSpring(mouseY, springCfg);

  // Trailing ring (slower spring)
  const trailX = useSpring(mouseX, { stiffness: 120, damping: 22, mass: 1 });
  const trailY = useSpring(mouseY, { stiffness: 120, damping: 22, mass: 1 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const down  = () => setClicking(true);
    const up    = () => setClicking(false);
    const enter = () => setHidden(false);
    const leave = () => setHidden(true);

    const handleHoverOn = (e: MouseEvent) => {
      const el = (e.target as Element).closest("a, button, [data-cursor-hover]");
      setHovered(!!el);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    window.addEventListener("mousemove", handleHoverOn);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      window.removeEventListener("mousemove", handleHoverOn);
    };
  }, [mouseX, mouseY]);

  // Touch devices — no custom cursor
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  const dotSize = hovered ? 44 : clicking ? 6 : 10;
  const ringSize = hovered ? 64 : clicking ? 20 : 32;

  return (
    <>
      {/* Main dot — white with mix-blend-difference: visible on dark AND orange backgrounds */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: dotSize,
          height: dotSize,
          backgroundColor: "#ffffff",
          mixBlendMode: "difference",
          opacity: hidden ? 0 : 1,
          transition: "width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1), opacity 0.15s ease",
        }}
      />
      {/* Trailing ring — no blend mode so it's always visible */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: ringSize,
          height: ringSize,
          border: "1px solid rgba(255,255,255,0.35)",
          opacity: hidden ? 0 : hovered ? 0.7 : 0.45,
          transition: "width 0.4s cubic-bezier(0.16,1,0.3,1), height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.15s ease",
        }}
      />
    </>
  );
}
