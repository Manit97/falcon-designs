"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const isTemplatePath = (p: string) => /^\/showcase\/.+/.test(p);

/**
 * A large radial-gradient orb that trails the mouse via CSS transition
 * (runs on the GPU compositor thread — zero main-thread cost).
 * This gives every Falcon page the same "live" feel as the Hero's mouse-orb.
 */
export default function MouseGlow() {
  const glowRef    = useRef<HTMLDivElement>(null);
  const pathname   = usePathname();
  const isTemplate = isTemplatePath(pathname);

  useEffect(() => {
    if (isTemplate) return;
    const el = glowRef.current;
    if (!el) return;

    let first = true;

    const onMove = (e: MouseEvent) => {
      const pos = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
      if (first) {
        // Snap to cursor without animating from off-screen
        el.style.transition = "none";
        el.style.transform   = pos;
        void el.offsetHeight; // flush layout so browser registers the snap
        el.style.transition  = "transform 0.8s cubic-bezier(0.16,1,0.3,1)";
        first = false;
      } else {
        el.style.transform = pos;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [isTemplate]);

  if (isTemplate) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position:     "fixed",
        top:          0,
        left:         0,
        width:        700,
        height:       700,
        borderRadius: "50%",
        background:   "radial-gradient(circle, rgba(249,115,22,0.055) 0%, transparent 65%)",
        pointerEvents: "none",
        zIndex:       0,
        transform:    "translate(-9999px, -9999px)", // off-screen until first move
        willChange:   "transform",
      }}
    />
  );
}
