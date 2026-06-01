"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname  = usePathname();

  // ── Create Lenis once ────────────────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration:     1.2,
      easing:       (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation:  "vertical",
      smoothWheel:  true,
    });
    lenisRef.current = lenis;

    let rafId: number;
    const raf = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // ── On every route change: jump to top instantly ─────────────────────
  // Without this, Lenis keeps the scroll offset from the previous page.
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <>{children}</>;
}
