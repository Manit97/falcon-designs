"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const isHomePage = pathname === "/";
    if (!isHomePage) return;

    const lenis = new Lenis({
      lerp:            0.06,
      wheelMultiplier: 0.7,
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
  }, [pathname]);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <>{children}</>;
}
