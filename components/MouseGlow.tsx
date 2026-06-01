"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const isTemplatePath = (p: string) => /^\/showcase\/.+/.test(p);

// How fast the glow chases the cursor each frame.
// 0.12 = smooth trail; raise toward 0.2 for tighter tracking.
const LERP = 0.12;

// Half of the element's CSS size (700 px) — used to centre the orb on cursor.
const HALF = 350;

/**
 * Large radial-gradient orb that follows the cursor via a per-frame lerp loop.
 * All DOM updates happen directly in the RAF callback — zero React re-renders.
 * The element is already a GPU compositor layer (will-change: transform) so
 * the browser updates it without touching the main thread paint path.
 */
export default function MouseGlow() {
  const glowRef    = useRef<HTMLDivElement>(null);
  const pathname   = usePathname();
  const isTemplate = isTemplatePath(pathname);

  useEffect(() => {
    if (isTemplate) return;
    const el = glowRef.current;
    if (!el) return;

    // Target position (updated instantly on mousemove)
    let mx = -9999, my = -9999;
    // Current rendered position (lerped each frame)
    let cx = -9999, cy = -9999;
    let raf: number;
    let started = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // Snap current position on the very first move so the orb
      // doesn't animate in from off-screen.
      if (!started) {
        cx = mx;
        cy = my;
        started = true;
      }
    };

    const loop = () => {
      cx += (mx - cx) * LERP;
      cy += (my - cy) * LERP;
      el.style.transform = `translate(${cx - HALF}px, ${cy - HALF}px)`;
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [isTemplate]);

  if (isTemplate) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position:      "fixed",
        top:           0,
        left:          0,
        width:         700,
        height:        700,
        borderRadius:  "50%",
        background:    "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 65%)",
        pointerEvents: "none",
        zIndex:        0,
        // Start off-screen; snaps to cursor on first mousemove via `started` flag
        transform:     "translate(-9999px, -9999px)",
        willChange:    "transform",
      }}
    />
  );
}
