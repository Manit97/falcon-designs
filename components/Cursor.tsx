"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch / coarse-pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot  = dotRef.current!;
    const ring = ringRef.current!;

    let mx = -200, my = -200;   // current mouse position
    let rx = -200, ry = -200;   // ring lerp position
    let visible = false;
    let raf: number;

    const show = () => {
      dot.style.opacity  = "1";
      ring.style.opacity = "0.45";
    };
    const hide = () => {
      dot.style.opacity  = "0";
      ring.style.opacity = "0";
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      // Snap ring to mouse on very first move so it doesn't fly in from off-screen
      if (!visible) {
        rx = mx;
        ry = my;
        visible = true;
        show();
      }

      // Dot tracks instantly
      dot.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`;
    };

    // RAF loop: lerp the ring toward the mouse
    const loop = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove",    onMove,                { passive: true });
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", () => visible && show());

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove",    onMove);
      document.removeEventListener("mouseleave", hide);
    };
  }, []);

  return (
    <>
      {/* Dot — tracks mouse instantly */}
      <div
        ref={dotRef}
        style={{
          position:        "fixed",
          top:             0,
          left:            0,
          width:           10,
          height:          10,
          borderRadius:    "50%",
          backgroundColor: "#ffffff",
          pointerEvents:   "none",
          zIndex:          99999,
          opacity:         0,
          boxShadow:       "0 0 0 1px rgba(0,0,0,0.2)",
          willChange:      "transform",
        }}
      />
      {/* Ring — trails behind via lerp */}
      <div
        ref={ringRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         32,
          height:        32,
          borderRadius:  "50%",
          border:        "1px solid rgba(255,255,255,0.4)",
          pointerEvents: "none",
          zIndex:        99998,
          opacity:       0,
          willChange:    "transform",
        }}
      />
    </>
  );
}
