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
      // lerp mode: each frame moves lerp% toward target — produces the
      // infinite exponential deceleration that premium sites are known for.
      // Unlike duration-based mode there is no hard stop; velocity tapers
      // asymptotically to zero, which feels weightless and organic.
      lerp:             0.06,   // slower decay → longer glide, more "floating" feel
      wheelMultiplier:  0.7,   // less distance per wheel tick → more control & smoothness
      orientation:      "vertical",
      smoothWheel:      true,
      // Leave touch alone — iOS momentum scrolling is already buttery.
      syncTouch:        false,
    });
    lenisRef.current = lenis;

    // ── Relay Lenis scroll events → native window scroll events ──────────
    // Framer Motion's useScroll listens for native 'scroll' events to update
    // its motion values. Lenis runs its own RAF loop and does not always fire
    // native events, so parallax transforms stall without this relay.
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
