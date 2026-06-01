"use client";
import { useEffect, useRef, useState } from "react";
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

  // Trailing dot (slower spring)
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

    // Detect hover over interactive elements
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

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
        style={{
          x, y,
          translateX: "-50%",
          translateY: "-50%",
          width:  hovered ? 40 : clicking ? 8 : 12,
          height: hovered ? 40 : clicking ? 8 : 12,
          backgroundColor: "#f97316",
          opacity: hidden ? 0 : 1,
          transition: "width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1), opacity 0.2s",
        }}
      />
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-white/30"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width:  hovered ? 60 : 28,
          height: hovered ? 60 : 28,
          opacity: hidden ? 0 : 0.5,
          transition: "width 0.4s cubic-bezier(0.16,1,0.3,1), height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.2s",
        }}
      />
    </>
  );
}
