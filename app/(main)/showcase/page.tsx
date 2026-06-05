"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import ParallaxLayer from "@/components/ParallaxLayer";
import { ImageComparisonElectric } from "@/components/ImageComparisonElectric";
import { ZoomParallax } from "@/components/ZoomParallax";

const HeroCube = dynamic(() => import("@/components/home/HeroCube"), { ssr: false });

const EXPO = [0.16, 1, 0.3, 1] as const;
const VP   = { once: true, margin: "0px 0px -80px 0px" } as const;

const LIVE_PROJECTS = [
  {
    id: "jewellery",
    title: "Fine Jewellery Store",
    category: "E-Commerce · Luxury",
    year: "2026",
    desc: "Dark gold aesthetic with scroll-driven ring assembly animation. Full product catalogue, hero slider, bespoke consultation flow, and Instagram strip.",
    tech: ["Next.js 15", "Framer Motion", "Tailwind CSS", "TypeScript"],
    href: "https://jewellery-template-one.vercel.app",
    status: "live",
    colour: "#c9a85c",
    bgColour: "#080807",
  },
  {
    id: "photography",
    title: "Photography Studio",
    category: "Portfolio · Creative",
    year: "2026",
    desc: "Full-screen cinematic gallery with floating lightbox. Built for visual storytellers who need their work front and centre.",
    tech: ["Next.js 15", "GSAP", "Framer Motion", "Tailwind CSS"],
    href: "https://photography-template-khaki.vercel.app",
    status: "live",
    colour: "#e2e8f0",
    bgColour: "#111111",
  },
  {
    id: "trades",
    title: "Trades & Services",
    category: "Home Services · Local",
    year: "2026",
    desc: "Emergency-first design for plumbers, gas engineers and tradespeople. Dark navy, 24/7 callout, services grid, reviews, areas, and contact form.",
    tech: ["Next.js 15", "Framer Motion", "Tailwind CSS", "TypeScript"],
    href: "/showcase/trades",
    status: "live",
    colour: "#f59e0b",
    bgColour: "#0c111d",
  },
  {
    id: "videographer",
    title: "Videographer Portfolio",
    category: "Creative · Film",
    year: "2026",
    desc: "Cinematic dark portfolio for cinematographers and directors. GSAP horizontal scroll gallery, SplitType hero reveal, Lenis smooth scroll, and film-grain overlay.",
    tech: ["Next.js 15", "GSAP", "SplitType", "Lenis"],
    href: "/showcase/videographer",
    status: "live",
    colour: "#c8b887",
    bgColour: "#070707",
  },
];


export default function ShowcasePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-fd-black">

      {/* ── Zoom parallax — full-screen hero ── */}
      <ZoomParallax />

      {/*
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      SAVED ORIGINAL HERO — restore by uncommenting this block
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      <section className="py-20 md:py-28 px-6 md:px-10 border-b border-fd-border relative overflow-hidden pt-20">
        <ParallaxLayer
          className="absolute w-[600px] h-[600px] pointer-events-none"
          offset={150}
          style={{
            top: "calc(50% - 300px)",
            left: "calc(33.333% - 300px)",
            background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-[58%_1fr] lg:items-center lg:gap-8">
          <ParallaxLayer offset={45}>
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, ease: EXPO }}
              className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange mb-5"
            >Our Showcase</motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: EXPO }}
              className="font-display font-extrabold leading-none tracking-tightest text-fd-white"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
            >WORK THAT<br /><span className="text-stroke">SPEAKS.</span></motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.25, ease: EXPO }}
              className="font-body text-fd-dim text-lg mt-8 max-w-xl leading-relaxed"
            >Every template is a fully working website — live on the web, production-ready, and available to be customised for your brand.</motion.p>
          </ParallaxLayer>
          {mounted && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: EXPO }}
              className="hidden lg:block" style={{ height: "clamp(300px, 40vw, 500px)" }}
            ><HeroCube /></motion.div>
          )}
        </div>
      </section>
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

      {/* ── Post-parallax title reveal ── */}
      <section className="py-28 px-6 md:px-10 border-b border-fd-border relative overflow-hidden">
        {/* Orange glow */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            top: "calc(50% - 300px)", left: "calc(33% - 300px)",
            width: 600, height: 600,
            background: "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)",
          }}
        />
        <ParallaxLayer offset={55} className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "0px 0px -120px 0px" }}
            transition={{ duration: 1.1, ease: EXPO }}
          >
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: EXPO }}
              className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange mb-6 flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-fd-orange animate-pulse" />
              Our Showcase
            </motion.p>
            <h1
              className="font-display font-extrabold leading-none tracking-tightest text-fd-white mb-8"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
            >
              WORK THAT<br /><span className="text-stroke">SPEAKS.</span>
            </h1>
            <p className="font-body text-fd-dim text-lg max-w-xl leading-relaxed">
              These are working examples of our design and development work, live across the web. They showcase what we can do — whether you want something similar, customised to fit your brand, or something entirely new. Tell us your vision, and we'll bring it to life.
            </p>
          </motion.div>
        </ParallaxLayer>
      </section>

      {/* ── Live deployed templates ── */}
      <section className="py-24 px-6 md:px-10 border-b border-fd-border overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <ParallaxLayer offset={50}>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VP}
              transition={{ duration: 0.6, ease: EXPO }}
              className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange mb-14 flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-fd-orange animate-pulse" />
              Live on Vercel
            </motion.p>
          </ParallaxLayer>

          {/* Inject keyframes for WebGL card animation */}
          <style>{`
            @keyframes wgGlow1 { 0%,100%{transform:translate(-8%,-15%) scale(1.15)} 50%{transform:translate(8%,15%) scale(.9)} }
            @keyframes wgGlow2 { 0%,100%{transform:translate(12%,10%) scale(1)} 50%{transform:translate(-12%,-10%) scale(1.25)} }
            @keyframes wgGlow3 { 0%,100%{transform:translate(0%,8%) scale(1.1)} 50%{transform:translate(0%,-8%) scale(.95)} }
            @keyframes wgGrid  { 0%{background-position:0 0} 100%{background-position:60px 60px} }
            @keyframes wgPulse { 0%,100%{opacity:.6} 50%{opacity:1} }
          `}</style>

          <div className="grid md:grid-cols-2 gap-6">

            {/* ── WebGL Feature Showcase — spans both columns ── */}
            <ParallaxLayer offset={16} className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VP}
                transition={{ duration: 0.8, ease: EXPO }}
              >
                <Link
                  href="/showcase/webgl"
                  className="group block border border-fd-border hover:border-[#6c63ff]/50 transition-all duration-500 overflow-hidden"
                  style={{ borderColor: "rgba(108,99,255,0.25)" }}
                >
                  {/* ── Preview — same h-64 as regular cards ── */}
                  <div className="relative h-64 overflow-hidden" style={{ background: "#050510" }}>

                    {/* Animated fluid glow blobs */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div style={{
                        position: "absolute", width: "55%", height: "160%",
                        top: "-30%", left: "5%",
                        background: "radial-gradient(ellipse, rgba(108,99,255,0.18) 0%, transparent 65%)",
                        animation: "wgGlow1 9s ease-in-out infinite",
                      }}/>
                      <div style={{
                        position: "absolute", width: "50%", height: "150%",
                        top: "-25%", right: "5%",
                        background: "radial-gradient(ellipse, rgba(0,212,255,0.10) 0%, transparent 65%)",
                        animation: "wgGlow2 11s ease-in-out infinite",
                      }}/>
                      <div style={{
                        position: "absolute", width: "40%", height: "120%",
                        top: "-10%", left: "30%",
                        background: "radial-gradient(ellipse, rgba(200,184,135,0.08) 0%, transparent 65%)",
                        animation: "wgGlow3 13s ease-in-out infinite",
                      }}/>
                    </div>

                    {/* Subtle grid overlay */}
                    <div className="absolute inset-0 pointer-events-none" style={{
                      backgroundImage: "linear-gradient(rgba(108,99,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.06) 1px, transparent 1px)",
                      backgroundSize: "60px 60px",
                      animation: "wgGrid 12s linear infinite",
                    }}/>

                    {/* Scan-line overlay */}
                    <div className="absolute inset-0 pointer-events-none" style={{
                      background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(5,5,16,0.15) 3px, rgba(5,5,16,0.15) 4px)",
                    }}/>

                    {/* Centre content */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="text-center">
                        <p
                          className="font-display font-extrabold tracking-tightest"
                          style={{
                            fontSize: "clamp(2.8rem,7vw,5.5rem)",
                            background: "linear-gradient(135deg, #6c63ff 0%, #00d4ff 45%, #c8b887 100%)",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            letterSpacing: "-0.02em",
                            lineHeight: 1,
                          }}
                        >
                          WEBGL
                        </p>
                        <p className="font-display text-[11px] tracking-widest3 uppercase mt-3"
                           style={{ color: "rgba(232,228,252,0.38)", animation: "wgPulse 3s ease-in-out infinite" }}>
                          Interactive Technology Demo
                        </p>
                      </div>
                    </div>

                    {/* Tech badges — top left */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                      {["Three.js", "GLSL", "Particles"].map((t) => (
                        <span key={t} className="font-display text-[9px] tracking-widest uppercase px-2 py-1 border"
                          style={{ borderColor: "rgba(108,99,255,0.35)", color: "#6c63ff", background: "rgba(108,99,255,0.08)" }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Live badge — top right */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full z-10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6c63ff] animate-pulse" />
                      <span className="font-display text-[10px] tracking-widest uppercase text-white">Live</span>
                    </div>

                    {/* Arrow — bottom right */}
                    <div className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                         style={{ background: "#6c63ff" }}>
                      <span className="text-white font-bold">↗</span>
                    </div>
                  </div>

                  {/* ── Info — same structure as regular cards ── */}
                  <div className="p-6 bg-fd-card group-hover:bg-fd-surface transition-colors duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <h2 className="font-display font-bold text-lg text-fd-white transition-colors duration-300"
                          style={{}} onMouseEnter={(e) => (e.currentTarget.style.color="#6c63ff")}
                          onMouseLeave={(e) => (e.currentTarget.style.color="")}>
                        WebGL Interactive Experience
                      </h2>
                      <span className="font-display text-xs text-fd-muted">2026</span>
                    </div>
                    <p className="font-body text-sm text-fd-dim leading-relaxed mb-4">
                      GPU-accelerated fluid simulation, interactive particle physics, and a 3D parallax tilt effect that responds to every cursor movement. The most technically advanced template in the collection — built with Three.js, custom GLSL shaders, and GSAP.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Three.js", "GLSL Shaders", "Particle Physics", "GSAP", "Lenis", "SplitType", "WebGL 2.0"].map((t) => (
                        <span key={t} className="font-display text-[9px] tracking-widest uppercase text-fd-muted border border-fd-border px-2 py-0.5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            </ParallaxLayer>

            {/* ── Regular template cards ── */}
            {LIVE_PROJECTS.map((p, i) => (
              <ParallaxLayer key={p.id} offset={20 + i * 14}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={VP}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EXPO }}
                >
                  <Link
                    href={p.href}
                    target={p.href.startsWith("http") ? "_blank" : undefined}
                    rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group block border border-fd-border hover:border-fd-orange/40 transition-all duration-500 overflow-hidden"
                  >
                    {/* Colour preview */}
                    <div
                      className="relative h-64 flex items-center justify-center overflow-hidden"
                      style={{ background: p.bgColour }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 rounded-full border opacity-10" style={{ borderColor: p.colour }} />
                        <div className="absolute w-32 h-32 rounded-full border opacity-20" style={{ borderColor: p.colour }} />
                        <div className="absolute w-16 h-16 rounded-full opacity-30" style={{ background: p.colour }} />
                      </div>
                      <div className="relative z-10 text-center">
                        <p className="font-display font-extrabold text-2xl" style={{ color: p.colour }}>{p.title}</p>
                        <p className="font-display text-xs tracking-widest uppercase mt-1" style={{ color: p.colour, opacity: 0.6 }}>{p.category}</p>
                      </div>
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="font-display text-[10px] tracking-widest uppercase text-white">Live</span>
                      </div>
                      <div className="absolute bottom-4 right-4 w-10 h-10 bg-fd-orange flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <span className="text-fd-black font-bold">↗</span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-6 bg-fd-card group-hover:bg-fd-surface transition-colors duration-300">
                      <div className="flex items-start justify-between mb-3">
                        <h2 className="font-display font-bold text-lg text-fd-white group-hover:text-fd-orange transition-colors duration-300">
                          {p.title}
                        </h2>
                        <span className="font-display text-xs text-fd-muted">{p.year}</span>
                      </div>
                      <p className="font-body text-sm text-fd-dim leading-relaxed mb-4">{p.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {p.tech.map((t) => (
                          <span key={t} className="font-display text-[9px] tracking-widest uppercase text-fd-muted border border-fd-border px-2 py-0.5">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </ParallaxLayer>
            ))}
          </div>
        </div>
      </section>

      {/* ── Before / After transformation ── */}
      <section className="py-24 px-6 md:px-10 border-b border-fd-border overflow-hidden">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <ParallaxLayer offset={45}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={VP}
                  transition={{ duration: 0.6, ease: EXPO }}
                  className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange mb-5 flex items-center gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-fd-orange animate-pulse" />
                  The Transformation
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ duration: 0.8, delay: 0.1, ease: EXPO }}
                  className="font-display font-extrabold leading-none tracking-tightest text-fd-white"
                  style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
                >
                  BEFORE &amp; <span className="text-stroke">AFTER.</span>
                </motion.h2>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.7, delay: 0.2, ease: EXPO }}
                className="font-body text-fd-dim text-base max-w-sm leading-relaxed md:text-right"
              >
                Drag the handle to see exactly what a Falcon Designs rebuild looks like — same business, completely different story.
              </motion.p>
            </div>
          </ParallaxLayer>

          {/* Electric arc comparison */}
          <ParallaxLayer offset={20}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.9, delay: 0.15, ease: EXPO }}
              className="border border-fd-border overflow-hidden"
            >
              <ImageComparisonElectric
                leftImage="/after-website.png"
                rightImage="/before-website.png"
                leftAlt="Rebuilt by Falcon Designs — modern, high-converting"
                rightAlt="Old plumber website — cluttered, dated design"
              />
            </motion.div>
            <div className="flex items-center justify-between mt-5 px-1">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-fd-muted opacity-50" />
                <span className="font-display text-[10px] tracking-widest uppercase text-fd-muted">
                  Generic DIY website — built on a page builder
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="font-display text-[10px] tracking-widest uppercase text-fd-orange">
                  Custom build by Falcon Designs — Next.js 15
                </span>
                <div className="w-2.5 h-2.5 rounded-full bg-fd-orange" />
              </div>
            </div>
          </ParallaxLayer>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 md:px-10 border-t border-fd-border bg-fd-surface overflow-hidden">
        <ParallaxLayer offset={40} className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-extrabold leading-none tracking-tightest text-fd-white mb-6" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            WANT YOUR OWN?
          </h2>
          <p className="font-body text-fd-dim mb-10 leading-relaxed">
            We&apos;ll take any of these templates and customise it completely for your brand — or build something entirely new from scratch.
          </p>
          <Link
            href="/contact"
            className="font-display font-bold text-xs tracking-widest uppercase bg-fd-orange text-fd-black px-10 py-4 hover:bg-fd-white transition-colors duration-300 inline-flex items-center gap-3"
          >
            Start a Project <span>→</span>
          </Link>
        </ParallaxLayer>
      </section>
    </div>
  );
}
