"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Routes that should use the browser's native cursor
const isTemplatePath = (p: string) => /^\/showcase\/.+/.test(p);

export default function Cursor() {
  const dotRef    = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);
  const pathname  = usePathname();
  const isTemplate = isTemplatePath(pathname);

  // ── On template pages: restore the native cursor ──────────────────────
  useEffect(() => {
    if (!isTemplate) return;

    // globals.css sets `cursor: none !important` on every element.
    // Inject an overriding rule that wins via cascade order (later = wins).
    const tag = document.createElement("style");
    tag.id = "native-cursor-restore";
    tag.textContent = "*, *::before, *::after { cursor: auto !important; }";
    document.head.appendChild(tag);

    return () => {
      document.getElementById("native-cursor-restore")?.remove();
    };
  }, [isTemplate]);

  // ── On Falcon pages: custom cursor ────────────────────────────────────
  useEffect(() => {
    if (isTemplate) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot  = dotRef.current!;
    const ring = ringRef.current!;

    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    let visible = false;
    let raf: number;

    const show = () => { dot.style.opacity = "1"; ring.style.opacity = "0.45"; };
    const hide = () => { dot.style.opacity = "0"; ring.style.opacity = "0"; };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) { rx = mx; ry = my; visible = true; show(); }
      dot.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`;
    };

    const loop = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove",    onMove, { passive: true });
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", () => visible && show());

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", hide);
    };
  }, [isTemplate]);

  // Don't render the custom cursor elements on template pages
  if (isTemplate) return null;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: 10, height: 10, borderRadius: "50%",
          backgroundColor: "#ffffff", pointerEvents: "none",
          zIndex: 99999, opacity: 0,
          boxShadow: "0 0 0 1px rgba(0,0,0,0.2)",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: 32, height: 32, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.4)",
          pointerEvents: "none", zIndex: 99998, opacity: 0,
          willChange: "transform",
        }}
      />
    </>
  );
}
