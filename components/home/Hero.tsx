"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import ParallaxLayer from "@/components/ParallaxLayer";

// Load the WebGL canvas client-side only (no SSR — browser API)
const HeroCube = dynamic(() => import("./HeroCube"), { ssr: false });

const WORDS = ["BOLD.", "FAST.", "BUILT", "TO WIN."];
const TAGLINE = "Web Design & AI Solutions for Ambitious Brands";

// Easing
const EXPO = [0.16, 1, 0.3, 1] as const;

function WordReveal({ text, delay, outline }: { text: string; delay: number; outline?: boolean }) {
  return (
    <div className="clip-reveal overflow-hidden">
      <motion.span
        className={`block font-display font-extrabold leading-none tracking-tightest select-none
          ${outline ? "text-stroke" : "text-fd-white"}`}
        style={{ fontSize: "clamp(3.5rem, 11vw, 9.5rem)" }}
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, delay, ease: EXPO }}
      >
        {text}
      </motion.span>
    </div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleMouse = (e: MouseEvent) => {
      if (!orbRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 60;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
      orbRef.current.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-fd-black px-6 md:px-10 pt-24"
    >
      {/* Radial orange glow — mouse tracked */}
      <div
        ref={orbRef}
        className="absolute top-1/2 left-1/2 pointer-events-none"
        style={{
          transform: "translate(-50%, -50%)",
          width: "80vw",
          height: "80vw",
          maxWidth: 900,
          maxHeight: 900,
          background:
            "radial-gradient(circle, rgba(249,115,22,0.12) 0%, rgba(249,115,22,0.03) 45%, transparent 70%)",
          transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          zIndex: 0,
        }}
      />

      {/* Grid lines decoration — parallax: drifts at a slower rate than page scroll */}
      <ParallaxLayer
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        offset={25}
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Main content — two columns on large screens ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-[58%_1fr] lg:items-center lg:gap-8">

          {/* ── LEFT: text content ── */}
          <div>
            {/* Label */}
            {mounted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EXPO }}
                className="flex items-center gap-3 mb-10"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-fd-orange animate-pulse" />
                <span className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange">
                  Available for projects
                </span>
              </motion.div>
            )}

            {/* Main headline */}
            <div className="mb-8">
              {mounted && (
                <>
                  <WordReveal text="BOLD."   delay={0.1} />
                  <WordReveal text="FAST."   delay={0.18} outline />
                  <WordReveal text="BUILT"   delay={0.26} />
                  <WordReveal text="TO WIN." delay={0.34} outline />
                </>
              )}
            </div>

            {/* Tagline + CTA row */}
            {mounted && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: EXPO }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-8"
              >
                <p className="font-body text-base md:text-lg text-fd-dim max-w-sm leading-relaxed">
                  {TAGLINE}
                </p>

                <div className="flex items-center gap-5">
                  <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.25, ease: EXPO }}>
                    <Link
                      href="/showcase"
                      className="group font-display font-bold text-xs tracking-widest uppercase bg-fd-orange text-fd-black px-7 py-4 hover:bg-fd-white transition-colors duration-300 flex items-center gap-3"
                    >
                      View Our Work
                      <span className="group-hover:translate-x-1 transition-transform duration-300">↗</span>
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.25, ease: EXPO }}>
                    <Link
                      href="/contact"
                      className="font-display font-semibold text-xs tracking-widest uppercase text-fd-dim border border-fd-border px-7 py-4 hover:border-fd-white hover:text-fd-white transition-all duration-300 block"
                    >
                      Get a Quote
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>

          {/* ── RIGHT: 3D cube — desktop only ── */}
          {mounted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: EXPO }}
              className="hidden lg:block"
              style={{ height: "clamp(340px, 45vw, 560px)" }}
            >
              <HeroCube />
            </motion.div>
          )}
        </div>

        {/* Scroll indicator */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-10 right-6 md:right-10 flex flex-col items-center gap-2"
          >
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-fd-orange to-transparent animate-pulse" />
            <span className="font-display text-[9px] tracking-widest3 uppercase text-fd-muted rotate-90 origin-center translate-y-4">
              Scroll
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
