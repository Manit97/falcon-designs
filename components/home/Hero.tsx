"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import ParallaxLayer from "@/components/ParallaxLayer";

const TAGLINE = "Web Design & AI Solutions for Ambitious Brands";

// Each word + whether it uses the outline style + [scrollStart, scrollEnd] as fraction of 300vh
const WORDS = [
  { text: "BOLD.",   outline: false, range: [0.00, 0.09] as [number, number] },
  { text: "FAST.",   outline: true,  range: [0.06, 0.15] as [number, number] },
  { text: "BUILT",   outline: false, range: [0.12, 0.21] as [number, number] },
  { text: "TO WIN.", outline: true,  range: [0.18, 0.27] as [number, number] },
];

export default function Hero() {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const sectionRef  = useRef<HTMLElement>(null);
  const orbRef      = useRef<HTMLDivElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const labelRef    = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const wordRefs    = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    /* ── Mouse-tracked glow orb ── */
    const handleMouse = (e: MouseEvent) => {
      if (!orbRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 60;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 40;
      orbRef.current.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    };
    window.addEventListener("mousemove", handleMouse);

    /* ── Scroll driver ── */
    const onScroll = () => {
      const wrapper = wrapperRef.current;
      const video   = videoRef.current;
      const bar     = progressRef.current;
      if (!wrapper || !video || !bar) return;

      const rect       = wrapper.getBoundingClientRect();
      const scrollable = wrapper.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const p = Math.min(1, Math.max(0, -rect.top / scrollable));

      /* video scrub */
      if (video.readyState >= 2 && video.duration) {
        video.currentTime = p * video.duration;
      }

      /* progress bar */
      bar.style.width = `${p * 100}%`;

      /* overlay fade-out: 75% → 100% */
      const overlay = overlayRef.current;
      if (overlay) {
        const fadeOut = p > 0.75 ? Math.max(0, 1 - (p - 0.75) / 0.25) : 1;
        overlay.style.opacity = String(fadeOut);
      }

      /* label: fade in 2% → 10% */
      const labelEl = labelRef.current;
      if (labelEl) {
        const lp = Math.min(1, Math.max(0, (p - 0.02) / 0.08));
        labelEl.style.opacity   = String(lp);
        labelEl.style.transform = `translateY(${(1 - lp) * 20}px)`;
      }

      /* word clip-reveals — each word slides up from its overflow mask */
      WORDS.forEach((word, i) => {
        const el = wordRefs.current[i];
        if (!el) return;
        const [start, end] = word.range;
        const wp = Math.min(1, Math.max(0, (p - start) / (end - start)));
        el.style.transform = `translateY(${(1 - wp) * 110}%)`;
      });

      /* tagline + CTAs: fade in 28% → 38% */
      const ctaEl = ctaRef.current;
      if (ctaEl) {
        const cp = Math.min(1, Math.max(0, (p - 0.28) / 0.10));
        ctaEl.style.opacity   = String(cp);
        ctaEl.style.transform = `translateY(${(1 - cp) * 20}px)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={wrapperRef} style={{ height: "300vh" }}>
      <section
        ref={sectionRef}
        style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
        className="relative flex flex-col justify-center bg-fd-black"
      >
        {/* Video */}
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          muted
          playsInline
          preload="auto"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        {/* Dark tint */}
        <div className="absolute inset-0" style={{ background: "rgba(8,8,8,0.58)" }} />

        {/* Grid lines */}
        <ParallaxLayer
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          offset={60}
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Bottom gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: "28%", background: "linear-gradient(to bottom, transparent, #080808)" }}
        />

        {/* Orange glow orb */}
        <div
          ref={orbRef}
          className="absolute top-1/2 left-1/2 pointer-events-none"
          style={{
            transform: "translate(-50%, -50%)",
            width: "80vw", height: "80vw",
            maxWidth: 900, maxHeight: 900,
            background:
              "radial-gradient(circle, rgba(249,115,22,0.10) 0%, rgba(249,115,22,0.03) 45%, transparent 70%)",
            transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
            zIndex: 1,
          }}
        />

        {/* Scroll progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-fd-border z-20">
          <div
            ref={progressRef}
            style={{ height: "100%", width: "0%", background: "#f97316", transition: "width 0.05s linear" }}
          />
        </div>

        {/* ── Content — entire block fades out near end ── */}
        <div
          ref={overlayRef}
          className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 pt-24"
        >
          {/* Label — fades in first */}
          <div
            ref={labelRef}
            style={{ opacity: 0, transform: "translateY(20px)" }}
            className="flex items-center gap-3 mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-fd-orange animate-pulse" />
            <span className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange">
              Available for projects
            </span>
          </div>

          {/* Headline — each word clip-reveals individually */}
          <div className="mb-8">
            {WORDS.map((word, i) => (
              <div key={word.text} className="overflow-hidden">
                <span
                  ref={(el) => { wordRefs.current[i] = el; }}
                  className={`block font-display font-extrabold leading-none tracking-tightest select-none ${
                    word.outline ? "text-stroke" : "text-fd-white"
                  }`}
                  style={{
                    fontSize: "clamp(3.5rem, 11vw, 9.5rem)",
                    transform: "translateY(110%)",
                    display: "block",
                  }}
                >
                  {word.text}
                </span>
              </div>
            ))}
          </div>

          {/* Tagline + CTAs — fade in last */}
          <div
            ref={ctaRef}
            style={{ opacity: 0, transform: "translateY(20px)" }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 max-w-4xl"
          >
            <p className="font-body text-base md:text-lg text-fd-dim max-w-sm leading-relaxed">
              {TAGLINE}
            </p>
            <div className="flex items-center gap-5">
              <Link
                href="/showcase"
                className="group font-display font-bold text-xs tracking-widest uppercase bg-fd-orange text-fd-black px-7 py-4 hover:bg-fd-white transition-colors duration-300 flex items-center gap-3"
              >
                View Our Work
                <span className="group-hover:translate-x-1 transition-transform duration-300">↗</span>
              </Link>
              <Link
                href="/contact"
                className="font-display font-semibold text-xs tracking-widest uppercase text-fd-dim border border-fd-border px-7 py-4 hover:border-fd-white hover:text-fd-white transition-all duration-300 block"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-6 md:right-10 flex flex-col items-center gap-2 z-10">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-fd-orange to-transparent animate-pulse" />
          <span className="font-display text-[9px] tracking-widest3 uppercase text-fd-muted rotate-90 origin-center translate-y-4">
            Scroll
          </span>
        </div>

      </section>
    </div>
  );
}
