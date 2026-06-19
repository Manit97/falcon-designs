"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap');

  .ch-gsap-reveal { visibility: hidden; }

  .ch-film-grain {
      position: absolute; inset: 0; pointer-events: none; z-index: 50;
      opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .ch-bg-grid {
      background-size: 60px 60px;
      background-image:
          linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  .ch-text-3d {
      color: #000;
      text-shadow: 0 10px 30px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.08);
  }

  .ch-text-silver {
      background: linear-gradient(180deg, #000 0%, rgba(0,0,0,0.38) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: drop-shadow(0px 10px 20px rgba(0,0,0,0.12));
  }

  .ch-text-card-silver {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  .ch-premium-card {
      background: linear-gradient(145deg, #162C6D 0%, #0A101D 100%);
      box-shadow:
          0 40px 100px -20px rgba(0,0,0,0.9),
          0 20px 40px -20px rgba(0,0,0,0.8),
          inset 0 1px 2px rgba(255,255,255,0.2),
          inset 0 -2px 4px rgba(0,0,0,0.8);
      border: 1px solid rgba(255,255,255,0.04);
  }

  .ch-card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--ch-mx, 50%) var(--ch-my, 50%), rgba(255,255,255,0.06) 0%, transparent 40%);
      mix-blend-mode: screen;
  }

  .ch-iphone-bezel {
      background-color: #111;
      box-shadow:
          inset 0 0 0 2px #52525B,
          inset 0 0 0 7px #000,
          0 40px 80px -15px rgba(0,0,0,0.9),
          0 15px 25px -5px rgba(0,0,0,0.7);
      transform-style: preserve-3d;
  }

  .ch-hardware-btn {
      background: linear-gradient(90deg, #404040 0%, #171717 100%);
      box-shadow: -2px 0 5px rgba(0,0,0,0.8), inset -1px 0 1px rgba(255,255,255,0.15), inset 1px 0 2px rgba(0,0,0,0.8);
      border-left: 1px solid rgba(255,255,255,0.05);
  }

  .ch-screen-glare { background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%); }

  .ch-widget-depth {
      background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
      box-shadow: 0 10px 20px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.05), inset 0 -1px 1px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.03);
  }

  .ch-floating-badge {
      background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 100%);
      backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
      box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 25px 50px -12px rgba(0,0,0,0.8),
          inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  .ch-progress-ring {
      transform: rotate(-90deg); transform-origin: center;
      stroke-dasharray: 402; stroke-dashoffset: 402; stroke-linecap: round;
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  leftPanel?: React.ReactNode;
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
}

export function CinematicHero({
  leftPanel,
  brandName = "RANKED",
  tagline1 = "Rank higher,",
  tagline2 = "load faster.",
  cardHeading = "Performance, built in.",
  cardDescription = <>Every Falcon site ships <span className="text-white font-semibold">mobile-first</span>, passes Core Web Vitals, and is structured for Google from day one — no plugins, no afterthought optimisations.</>,
  metricValue = 98,
  metricLabel = "SEO Score",
  ctaHeading = "Start ranking.",
  ctaDescription = "Every site we build is engineered to reach page one. Performance and SEO aren't bolt-ons — they're baked in from the first line of code.",
  className,
  ...props
}: CinematicHeroProps) {
  // sectionRef → the pinned sticky unit (full row)
  // rightRef  → the 60% right panel (card is absolute inside this)
  const sectionRef = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef   = useRef<HTMLDivElement>(null);
  const rafRef      = useRef<number>(0);

  // Ensure phone starts perfectly upright on mount
  useEffect(() => {
    if (mockupRef.current) {
      gsap.set(mockupRef.current, { rotationX: 0, rotationY: 0, rotationZ: 0 });
    }
  }, []);

  // Mouse tilt confined to right panel — subtle drift only
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!mainCardRef.current || !mockupRef.current) return;
        const r = mainCardRef.current.getBoundingClientRect();
        mainCardRef.current.style.setProperty("--ch-mx", `${e.clientX - r.left}px`);
        mainCardRef.current.style.setProperty("--ch-my", `${e.clientY - r.top}px`);
        if (rightRef.current) {
          const rr = rightRef.current.getBoundingClientRect();
          const xVal = ((e.clientX - rr.left) / rr.width  - 0.5) * 2;
          const yVal = ((e.clientY - rr.top)  / rr.height - 0.5) * 2;
          // Reduced multipliers (6/4 instead of 12) for a gentle float, not a flip
          gsap.to(mockupRef.current, { rotationY: xVal * 6, rotationX: -yVal * 4, ease: "power3.out", duration: 1.4 });
        }
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafRef.current); };
  }, []);

  // Cinematic scroll timeline — pinned on sectionRef, animation inside rightRef
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clear any stale GSAP cached transforms before setting fresh initial states
      if (mockupRef.current) gsap.set(mockupRef.current, { clearProps: "transform" });
      gsap.set(".ch-mockup-wrapper", { clearProps: "transform" });

      // Initial states (all scoped to rightRef so they don't bleed outside)
      gsap.set(".ch-text-track",  { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".ch-text-days",   { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".ch-main-card",   { y: () => (rightRef.current?.offsetHeight ?? window.innerHeight) + 200, autoAlpha: 1 });
      gsap.set([".ch-card-left", ".ch-card-right", ".ch-badge", ".ch-phone-widget"], { autoAlpha: 0 });
      gsap.set(".ch-mockup-wrapper", { autoAlpha: 0, rotationX: 0, rotationY: 0, rotationZ: 0 });
      gsap.set(".ch-cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      // Hero text entrance (plays once on load)
      gsap.timeline({ delay: 0.4 })
        .to(".ch-text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".ch-text-days",  { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      // Scroll timeline — pins the WHOLE section row (left + right together)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=4200",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: () => {
            if (!mockupRef.current) return;
            const alpha = gsap.getProperty(".ch-mockup-wrapper", "autoAlpha") as number;
            if (alpha < 0.1) {
              gsap.set(mockupRef.current, { rotationX: 0, rotationY: 0, rotationZ: 0 });
            }
          },
        },
      });

      scrollTl
        // Right panel: blur out hero text, card flies up from bottom of panel
        .to([".ch-hero-text", ".ch-bg-grid"], { scale: 1.12, filter: "blur(20px)", opacity: 0.15, ease: "power2.inOut", duration: 2 }, 0)
        .to(".ch-main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        // Card expands to fill right panel
        .to(".ch-main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        // Mockup + widgets appear
        .fromTo(".ch-mockup-wrapper",
          { y: 280, autoAlpha: 0, scale: 0.75 },
          { y: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8")
        .fromTo(".ch-phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
        .to(".ch-progress-ring", { strokeDashoffset: 60, duration: 2, ease: "power3.inOut" }, "-=1.2")
        .to(".ch-counter",       { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 2, ease: "expo.out" }, "-=2.0")
        .fromTo(".ch-badge",     { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0")
        .fromTo(".ch-card-left", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".ch-card-right", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        // Hold, then transition to CTA
        .to({}, { duration: 0.5 })
        .set(".ch-hero-text",   { autoAlpha: 0 })
        .set(".ch-cta-wrapper", { autoAlpha: 1 })
        .to({}, { duration: 3 })
        // CTA pulls back card slightly, then exits
        .to([".ch-mockup-wrapper", ".ch-badge", ".ch-card-left", ".ch-card-right"],
            { scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05 })
        .to(".ch-main-card", { width: "85%", height: "85%", borderRadius: "32px", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".ch-cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".ch-main-card", { y: () => -(rightRef.current?.offsetHeight ?? window.innerHeight) - 200, ease: "power3.in", duration: 1.5 });

    }, sectionRef);

    return () => ctx.revert();
  }, [metricValue]);

  return (
    <div
      ref={sectionRef}
      className={cn("relative w-full h-screen flex overflow-hidden", className)}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      {/* ── LEFT 40% — static panel, stays visible throughout ── */}
      <div style={{
        flex: "0 0 40%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4rem 3.5rem 4rem 4rem",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        position: "relative",
        zIndex: 10,
        background: "linear-gradient(145deg, #B83D0A 0%, #D45C20 55%, #C14710 100%)",
        overflow: "hidden",
      }}>
        {/* Dot grid */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }} />
        {/* Top-right warm glow */}
        <div aria-hidden="true" style={{
          position: "absolute", top: "-15%", right: "-15%",
          width: "70%", height: "70%",
          background: "radial-gradient(circle, rgba(255,210,120,0.22) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        {/* Bottom-left dark anchor */}
        <div aria-hidden="true" style={{
          position: "absolute", bottom: "-10%", left: "-10%",
          width: "55%", height: "55%",
          background: "radial-gradient(circle, rgba(80,10,0,0.35) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        {/* Diagonal scratch lines */}
        <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.04 }} preserveAspectRatio="none">
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1={`${i * 9 - 5}%`} y1="0%" x2={`${i * 9 + 15}%`} y2="100%"
              stroke="white" strokeWidth="1" />
          ))}
        </svg>
        <div style={{ position: "relative", zIndex: 1 }}>
          {leftPanel}
        </div>
      </div>

      {/* ── RIGHT 60% — cinematic animation panel ── */}
      <div
        ref={rightRef}
        style={{ flex: "0 0 60%", position: "relative", overflow: "hidden", background: "#fff" }}
      >
        <div className="ch-film-grain" aria-hidden="true" />
        <div className="ch-bg-grid absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />

        {/* Hero text (visible before card appears) */}
        <div className="ch-hero-text absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-8 will-change-transform">
          <h2 className="ch-text-track ch-gsap-reveal ch-text-3d text-4xl lg:text-6xl font-bold tracking-tight mb-3">
            {tagline1}
          </h2>
          <h2 className="ch-text-days ch-gsap-reveal ch-text-silver text-4xl lg:text-6xl font-extrabold tracking-tighter">
            {tagline2}
          </h2>
        </div>

        {/* CTA layer */}
        <div className="ch-cta-wrapper absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-8 ch-gsap-reveal pointer-events-auto will-change-transform">
          {/* Ornament line */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
            <div style={{ width: 36, height: 1, background: "#d1d1d1" }} />
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "0.75rem", fontStyle: "italic", color: "#aaa", letterSpacing: "0.08em" }}>rank higher</span>
            <div style={{ width: 36, height: 1, background: "#d1d1d1" }} />
          </div>

          {/* Heading — editorial serif, extreme scale */}
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(3.2rem, 7vw, 6rem)",
            fontWeight: 400,
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            color: "#0d0d0d",
            marginBottom: "0.3rem",
          }}>
            {ctaHeading.replace(".", "")}
          </h2>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(3.2rem, 7vw, 6rem)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.0,
            letterSpacing: "-0.01em",
            color: "#555",
            marginBottom: "2.4rem",
          }}>
            now.
          </h2>

          <p style={{
            fontFamily: "'Wix Madefor Text', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.76,
            letterSpacing: "0.01em",
            color: "#767676",
            maxWidth: "38ch",
            marginBottom: "2.8rem",
          }}>
            {ctaDescription}
          </p>

          <a href="#cta" style={{
            display: "inline-flex", alignItems: "center", gap: "0.6rem",
            fontFamily: "'Wix Madefor Text', sans-serif",
            fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.02em",
            color: "#fff", background: "#0d0d0d",
            padding: "1rem 2.2rem", borderRadius: 12,
            textDecoration: "none",
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          }}>
            Start ranking
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>

        {/* Deep blue card — absolute inside right panel */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
          <div
            ref={mainCardRef}
            className="ch-main-card ch-premium-card ch-gsap-reveal relative overflow-hidden flex items-center justify-center pointer-events-auto"
            style={{ width: "85%", height: "85%", borderRadius: 32 }}
          >
            <div className="ch-card-sheen" aria-hidden="true" />

            <div className="relative w-full h-full px-4 lg:px-10 grid grid-cols-3 items-center gap-4 z-10 py-6">

              {/* Right — brand name */}
              <div className="ch-card-right ch-gsap-reveal flex justify-end items-center z-20">
                <h2 className="ch-text-card-silver font-black uppercase tracking-tighter"
                    style={{ fontSize: "clamp(2.5rem,5vw,6rem)", lineHeight: 1 }}>
                  {brandName}
                </h2>
              </div>

              {/* Centre — iPhone */}
              <div className="ch-mockup-wrapper relative w-full h-full flex items-center justify-center order-first" style={{ perspective: "1000px" }}>
                <div className="relative flex items-center justify-center scale-[0.68] lg:scale-90">
                  <div ref={mockupRef} className="relative w-[280px] h-[580px] rounded-[3rem] ch-iphone-bezel flex flex-col will-change-transform" style={{ transformStyle: "preserve-3d" }}>
                    <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] ch-hardware-btn rounded-l-md" aria-hidden="true" />
                    <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] ch-hardware-btn rounded-l-md" aria-hidden="true" />
                    <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] ch-hardware-btn rounded-l-md" aria-hidden="true" />
                    <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] ch-hardware-btn rounded-r-md" aria-hidden="true" />
                    <div className="absolute inset-[7px] bg-[#050914] rounded-[2.5rem] overflow-hidden text-white z-10" style={{ boxShadow: "inset 0 0 15px rgba(0,0,0,1)" }}>
                      <div className="absolute inset-0 ch-screen-glare z-40 pointer-events-none" aria-hidden="true" />
                      <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" style={{ boxShadow: "0 0 8px rgba(34,197,94,0.8)" }} />
                      </div>
                      <div className="relative w-full h-full pt-12 px-5 pb-8 flex flex-col">
                        {/* Phone header */}
                        <div className="ch-phone-widget flex justify-between items-center mb-6">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold mb-1">Live Audit</span>
                            <span className="text-xl font-bold tracking-tight">SEO Report</span>
                          </div>
                          <div className="w-9 h-9 rounded-full flex items-center justify-center border border-emerald-400/30" style={{ background: "linear-gradient(135deg,rgba(16,185,129,0.25),rgba(5,150,105,0.05))" }}>
                            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/></svg>
                          </div>
                        </div>
                        {/* Score ring */}
                        <div className="ch-phone-widget relative w-44 h-44 mx-auto flex items-center justify-center mb-6" style={{ filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.8))" }}>
                          <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                            <circle cx="88" cy="88" r="64" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                            <circle className="ch-progress-ring" cx="88" cy="88" r="64" fill="none" stroke="#10b981" strokeWidth="12" />
                          </svg>
                          <div className="text-center z-10 flex flex-col items-center">
                            <span className="ch-counter text-4xl font-extrabold tracking-tighter">0</span>
                            <span className="text-[8px] text-emerald-300/60 uppercase tracking-[0.1em] font-bold mt-0.5">{metricLabel}</span>
                          </div>
                        </div>
                        {/* Metric rows */}
                        <div className="space-y-2.5">
                          <div className="ch-phone-widget ch-widget-depth rounded-2xl p-3 flex items-center">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center mr-3 border border-emerald-400/20" style={{ background: "linear-gradient(135deg,rgba(16,185,129,0.2),rgba(5,150,105,0.05))" }}>
                              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                            </div>
                            <div className="flex-1 flex justify-between items-center">
                              <div>
                                <div className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider mb-0.5">Page Speed</div>
                                <div className="text-xs text-white font-bold">1.2s LCP</div>
                              </div>
                              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">FAST</span>
                            </div>
                          </div>
                          <div className="ch-phone-widget ch-widget-depth rounded-2xl p-3 flex items-center">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center mr-3 border border-blue-400/20" style={{ background: "linear-gradient(135deg,rgba(59,130,246,0.2),rgba(37,99,235,0.05))" }}>
                              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                            </div>
                            <div className="flex-1 flex justify-between items-center">
                              <div>
                                <div className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider mb-0.5">Mobile Score</div>
                                <div className="text-xs text-white font-bold">100 / 100</div>
                              </div>
                              <span className="text-[10px] font-bold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">PASS</span>
                            </div>
                          </div>
                          <div className="ch-phone-widget ch-widget-depth rounded-2xl p-3 flex items-center">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center mr-3 border border-purple-400/20" style={{ background: "linear-gradient(135deg,rgba(168,85,247,0.2),rgba(124,58,237,0.05))" }}>
                              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                            </div>
                            <div className="flex-1 flex justify-between items-center">
                              <div>
                                <div className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider mb-0.5">Core Web Vitals</div>
                                <div className="text-xs text-white font-bold">All passing</div>
                              </div>
                              <span className="text-[10px] font-bold text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full">✓ ALL</span>
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
                      </div>
                    </div>
                  </div>

                  {/* Floating badges */}
                  <div className="ch-badge absolute top-8 -left-20 ch-floating-badge rounded-2xl p-4 flex items-center gap-4 z-30">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center border border-emerald-400/30" style={{ background: "linear-gradient(180deg,rgba(16,185,129,0.2),rgba(5,150,105,0.05))" }}>
                      <span className="text-xl" aria-hidden="true">🚀</span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold tracking-tight">Page 1 Ranking</p>
                      <p className="text-emerald-200/50 text-xs">Organic traffic ↑ 240%</p>
                    </div>
                  </div>
                  <div className="ch-badge absolute bottom-20 -right-20 ch-floating-badge rounded-2xl p-4 flex items-center gap-4 z-30">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center border border-blue-400/30" style={{ background: "linear-gradient(180deg,rgba(59,130,246,0.2),rgba(37,99,235,0.05))" }}>
                      <span className="text-lg" aria-hidden="true">📱</span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold tracking-tight">Mobile First</p>
                      <p className="text-blue-200/50 text-xs">All devices, perfectly</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Left — card text */}
              <div className="ch-card-left ch-gsap-reveal flex flex-col justify-center z-20">
                <h3 className="text-white text-xl lg:text-3xl font-bold mb-4 tracking-tight leading-tight">{cardHeading}</h3>
                <p className="text-blue-100/65 text-sm lg:text-base leading-relaxed hidden lg:block">{cardDescription}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
