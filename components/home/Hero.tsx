"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ParallaxLayer from "@/components/ParallaxLayer";

const TAGLINE = "Web Design & AI Solutions for Ambitious Brands";

const WORDS = [
  { text: "BOLD.",   outline: false },
  { text: "FAST.",   outline: true },
  { text: "BUILT",   outline: false },
  { text: "TO WIN.", outline: true },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

    return () => {
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-center bg-fd-black min-h-screen overflow-hidden"
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


        {/* ── Content ── */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 pt-24">
          {/* Label — fades in first */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex items-center gap-3 mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-fd-orange animate-pulse" />
            <span className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange">
              Available for projects
            </span>
          </motion.div>

          {/* Headline — each word slides up individually */}
          <div className="mb-8">
            {WORDS.map((word, i) => (
              <div key={word.text} className="overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.3 + i * 0.15,
                  }}
                  className={`block font-display font-extrabold leading-none tracking-tightest select-none ${
                    word.outline ? "text-stroke" : "text-fd-white"
                  }`}
                  style={{
                    fontSize: "clamp(3.5rem, 11vw, 9.5rem)",
                    display: "block",
                  }}
                >
                  {word.text}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Tagline + CTAs — fade in last */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
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
          </motion.div>
        </div>

      </section>
    </section>
  );
}
