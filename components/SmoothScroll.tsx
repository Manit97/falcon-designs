"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const isHomePage = pathname === "/";

    const lenis = new Lenis({
      // Homepage: slow floaty config — the 300vh ZoomParallax sticky section
      // masks the deceleration so it feels premium, not heavy.
      // All other pages: snappy config that matches native/template scroll feel.
      lerp:            isHomePage ? 0.06 : 0.14,
      wheelMultiplier: isHomePage ? 0.7  : 1.0,
      orientation:     "vertical",
      smoothWheel:     true,
      syncTouch:       false,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", () => {
      window.dispatchEvent(new Event("scroll", { bubbles: false }));
    });

    let rafId: number;
    const raf = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [pathname]); // re-create Lenis when route changes so config updates

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <>{children}</>;
}
