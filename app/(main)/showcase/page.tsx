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
  {
    id: "dental",
    title: "Private Dental Practice",
    category: "Healthcare · Premium",
    year: "2026",
    desc: "Light-first premium dentistry template. Before/after drag sliders, animated stat count-up, bento gallery with lightbox, sticky filter pills, and a full booking form — all in a warm sage and ivory palette.",
    tech: ["Next.js 15", "Framer Motion", "Tailwind CSS", "TypeScript"],
    href: "/showcase/dental",
    status: "live",
    colour: "#5C7A62",
    bgColour: "#F2EDE6",
  },
  {
    id: "law",
    title: "Law Firm — Sterling & Co",
    category: "Legal Services · Luxury",
    year: "2026",
    desc: "Dark navy and gold luxury law firm template. Mega-menu with 5 practice areas × 4 subcategories, parallax hero, scroll reveals, animated stats, team profiles, blog with category filter, and contact form.",
    tech: ["Next.js 15", "Framer Motion", "TypeScript"],
    href: "/showcase/law",
    status: "live",
    colour: "#C9A84C",
    bgColour: "#0A0E1A",
  },
  {
    id: "clinic",
    title: "Lumière Aesthetic Clinic",
    category: "Medical Aesthetics · Luxury",
    year: "2026",
    desc: "Warm cream and champagne gold med-spa template. Six individual service pages, parallax heroes, bleeding image layouts, frosted glass navbar, 3-step booking flow, team profiles, and scroll-reveal animations throughout.",
    tech: ["Next.js 15", "Framer Motion", "TypeScript"],
    href: "/showcase/clinic",
    status: "live",
    colour: "#B8956A",
    bgColour: "#FAF8F5",
  },
  {
    id: "restaurant",
    title: "Ember — Fine Dining Restaurant",
    category: "Hospitality · Fine Dining",
    year: "2026",
    desc: "Dark amber cinematic restaurant template. Parallax hero, signature dish rows with clip-path reveals, asymmetric atmosphere gallery, chef portrait section, private dining parallax, typographic menu, 3-step reservation flow, and story page with milestone timeline.",
    tech: ["Next.js 15", "Framer Motion", "TypeScript"],
    href: "/showcase/restaurant",
    status: "live",
    colour: "#C4813A",
    bgColour: "#090705",
  },
  {
    id: "salon",
    title: "Maison Noir — Hair Atelier",
    category: "Beauty · Hair Salon",
    year: "2026",
    desc: "Deep malachite luxury hair salon template. Parallax editorial hero, scrolling amber treatment ticker, philosophy pillars, alternating services with offset-frame images and price lists, filterable gallery with lightbox, team portraits, testimonials, and a 4-step animated booking flow.",
    tech: ["Next.js 15", "Framer Motion", "TypeScript"],
    href: "/showcase/salon",
    status: "live",
    colour: "#C9973A",
    bgColour: "#0B1512",
  },
  {
    id: "pt",
    title: "James Cole — Personal Trainer",
    category: "Fitness · Personal Training",
    year: "2026",
    desc: "Editorial athletic 1-pager for a London PT. Massive Barlow Condensed headlines with filled/outlined duality signature, parallax hero, red stats ticker, bleeding about photo with subtle parallax, 3 programme cards, full-bleed quote section, numbered 4-step process, and a contact form with animated panels.",
    tech: ["Next.js 15", "Framer Motion", "TypeScript"],
    href: "/showcase/pt",
    status: "live",
    colour: "#D4453C",
    bgColour: "#101010",
  },
  {
    id: "nails",
    title: "Velour — Nail Studio",
    category: "Beauty · Nail Salon",
    year: "2026",
    desc: "Feminine rose/plum luxury nail studio. Parallax bleeding hero, services marquee ticker, arch-cropped service cards, CSS infinite nail image slider, multi-step booking flow, filterable products shop with add-to-bag, team portraits, and an OpenStreetMap embed on the about page.",
    tech: ["Next.js 15", "Framer Motion", "TypeScript"],
    href: "/showcase/nails",
    status: "live",
    colour: "#C05472",
    bgColour: "#3E1D4A",
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

          {/* Inject keyframes */}
          <style>{`
            @keyframes wgGlow1 { 0%,100%{transform:translate(-8%,-15%) scale(1.15)} 50%{transform:translate(8%,15%) scale(.9)} }
            @keyframes wgGlow2 { 0%,100%{transform:translate(12%,10%) scale(1)} 50%{transform:translate(-12%,-10%) scale(1.25)} }
            @keyframes wgGlow3 { 0%,100%{transform:translate(0%,8%) scale(1.1)} 50%{transform:translate(0%,-8%) scale(.95)} }
            @keyframes wgGrid  { 0%{background-position:0 0} 100%{background-position:60px 60px} }
            @keyframes wgPulse { 0%,100%{opacity:.6} 50%{opacity:1} }
            @keyframes fsOrange1 { 0%,100%{transform:translate(-5%,-10%) scale(1.1)} 50%{transform:translate(5%,10%) scale(0.9)} }
            @keyframes fsOrange2 { 0%,100%{transform:translate(8%,5%) scale(1)} 50%{transform:translate(-8%,-5%) scale(1.2)} }
            @keyframes fsMatrix { 0%{transform:translateY(-100%)} 100%{transform:translateY(100%)} }
            @keyframes fsPulse  { 0%,100%{opacity:.5} 50%{opacity:1} }
            @keyframes fsBlink  { 0%,49%{opacity:1} 50%,100%{opacity:0} }
          `}</style>

          <div className="grid md:grid-cols-2 gap-6">

            {/* ── Falcon Studio — full width, TOP ── */}
            <ParallaxLayer offset={14} className="md:col-span-2">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VP} transition={{ duration: 0.8, ease: EXPO }}>
                <Link href="/showcase/falcon-studio" className="group block border transition-all duration-500 overflow-hidden"
                  style={{ borderColor: "rgba(184,61,10,0.35)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(184,61,10,0.75)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(184,61,10,0.35)")}
                >
                  {/* Preview */}
                  <div className="relative h-64 overflow-hidden flex">

                    {/* Left 40% — orange panel */}
                    <div className="relative overflow-hidden" style={{ flex: "0 0 40%", background: "linear-gradient(145deg,#B83D0A 0%,#D45C20 55%,#C14710 100%)" }}>
                      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
                      <div style={{ position:"absolute", top:"-20%", right:"-20%", width:"70%", height:"70%", background:"radial-gradient(circle,rgba(255,210,120,0.25) 0%,transparent 65%)", animation:"fsOrange1 8s ease-in-out infinite" }} />
                      <div className="absolute inset-0 flex flex-col justify-center px-7 z-10">
                        <div className="font-display text-[9px] tracking-widest uppercase mb-3" style={{ color:"rgba(255,215,170,0.7)" }}>Falcon Designs</div>
                        <div className="font-display font-black leading-none" style={{ fontSize:"clamp(1.6rem,3.5vw,2.8rem)", color:"#fff", letterSpacing:"-0.03em" }}>Built to<br/>rank.</div>
                        <div className="font-display font-light leading-none mt-1" style={{ fontSize:"clamp(1.3rem,2.5vw,2rem)", color:"rgba(255,220,190,0.65)", letterSpacing:"-0.02em" }}>Designed to<br/>convert.</div>
                      </div>
                    </div>

                    {/* Right 60% — deep navy */}
                    <div className="relative overflow-hidden" style={{ flex: "0 0 60%", background: "linear-gradient(145deg,#162C6D 0%,#0A101D 100%)" }}>
                      {/* Matrix rain hint */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                        {[...Array(8)].map((_,i) => (
                          <div key={i} className="absolute top-0 font-mono text-[10px]" style={{ left:`${i*12.5+2}%`, color:"#00ff41", animation:`fsMatrix ${3+i*0.4}s linear ${i*0.3}s infinite`, whiteSpace:"nowrap" }}>
                            {Array.from({length:12},()=>String.fromCharCode(0x30A0+Math.floor(Math.random()*96))).join("\n")}
                          </div>
                        ))}
                      </div>
                      {/* Glowing score ring */}
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="relative flex items-center justify-center" style={{ width:100, height:100 }}>
                          <svg width="100" height="100" style={{ position:"absolute", transform:"rotate(-90deg)" }}>
                            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(16,185,129,0.12)" strokeWidth="8" />
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="8" strokeLinecap="round" strokeDasharray="251" strokeDashoffset="35" style={{ filter:"drop-shadow(0 0 6px rgba(16,185,129,0.6))", animation:"fsPulse 2.5s ease-in-out infinite" }} />
                          </svg>
                          <div className="text-center z-10">
                            <div className="font-display font-extrabold text-white" style={{ fontSize:"1.5rem", lineHeight:1 }}>98</div>
                            <div className="font-display text-[7px] tracking-widest uppercase" style={{ color:"rgba(16,185,129,0.6)", marginTop:2 }}>SEO</div>
                          </div>
                        </div>
                      </div>
                      {/* Mini metric bars */}
                      <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-col gap-1.5">
                        {[["Page Speed","#10b981",90],["Mobile Score","#3b82f6",100],["Core Web Vitals","#a855f7",95]].map(([l,c,v])=>(
                          <div key={l as string} className="flex items-center gap-2">
                            <div className="font-mono text-[7px] uppercase tracking-wider" style={{ color:"rgba(255,255,255,0.35)", width:60, flexShrink:0 }}>{l as string}</div>
                            <div className="flex-1 h-[2px] rounded-full" style={{ background:"rgba(255,255,255,0.08)" }}>
                              <div className="h-full rounded-full" style={{ width:`${v as number}%`, background:c as string, boxShadow:`0 0 4px ${c as string}` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech badges — top left */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
                      {["GSAP","Framer Motion","Three.js"].map(t => (
                        <span key={t} className="font-display text-[9px] tracking-widest uppercase px-2 py-1 border"
                          style={{ borderColor:"rgba(184,61,10,0.5)", color:"#D45C20", background:"rgba(184,61,10,0.12)" }}>{t}</span>
                      ))}
                    </div>
                    {/* Live badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full z-20">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                      <span className="font-display text-[10px] tracking-widest uppercase text-white">Live</span>
                    </div>
                    {/* Arrow */}
                    <div className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                      style={{ background:"#D45C20" }}>
                      <span className="text-white font-bold">↗</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6 bg-fd-card group-hover:bg-fd-surface transition-colors duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <h2 className="font-display font-bold text-lg text-fd-white transition-colors duration-300"
                        onMouseEnter={e=>(e.currentTarget.style.color="#D45C20")} onMouseLeave={e=>(e.currentTarget.style.color="")}>
                        Falcon Designs — Studio Showcase
                      </h2>
                      <span className="font-display text-xs text-fd-muted">2026</span>
                    </div>
                    <p className="font-body text-sm text-fd-dim leading-relaxed mb-4">
                      Falcon Designs&apos; own creative studio page — every capability in one build. WebGL particle hero, GSAP scroll-cinematic phone animation, matrix rain terminal showcase, CinematicHero split layout, retro gaming button marquee, handwriting SVG animations, enterprise retainer dashboard, and a 3-column parallax mockup reveal.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Next.js 16","Three.js / WebGL","GSAP ScrollTrigger","Framer Motion","Canvas2D","VT323 Terminal"].map(t => (
                        <span key={t} className="font-display text-[9px] tracking-widest uppercase text-fd-muted border border-fd-border px-2 py-0.5">{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            </ParallaxLayer>

            {/* ── Regular template cards ── */}
            {LIVE_PROJECTS.map((p, i) => (
              <ParallaxLayer key={p.id} offset={20 + i * 14}>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VP} transition={{ duration: 0.6, delay: i * 0.1, ease: EXPO }}>
                  <Link
                    href={p.href}
                    target={p.href.startsWith("http") ? "_blank" : undefined}
                    rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group block border border-fd-border hover:border-fd-orange/40 transition-all duration-500 overflow-hidden"
                  >
                    <div className="relative h-64 flex items-center justify-center overflow-hidden" style={{ background: p.bgColour }}>
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
                    <div className="p-6 bg-fd-card group-hover:bg-fd-surface transition-colors duration-300">
                      <div className="flex items-start justify-between mb-3">
                        <h2 className="font-display font-bold text-lg text-fd-white group-hover:text-fd-orange transition-colors duration-300">{p.title}</h2>
                        <span className="font-display text-xs text-fd-muted">{p.year}</span>
                      </div>
                      <p className="font-body text-sm text-fd-dim leading-relaxed mb-4">{p.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {p.tech.map(t => (
                          <span key={t} className="font-display text-[9px] tracking-widest uppercase text-fd-muted border border-fd-border px-2 py-0.5">{t}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </ParallaxLayer>
            ))}

            {/* ── WebGL Feature Showcase — full width, BOTTOM ── */}
            <ParallaxLayer offset={16} className="md:col-span-2">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VP} transition={{ duration: 0.8, ease: EXPO }}>
                <Link href="/showcase/webgl" className="group block border border-fd-border hover:border-[#6c63ff]/50 transition-all duration-500 overflow-hidden"
                  style={{ borderColor: "rgba(108,99,255,0.25)" }}>
                  <div className="relative h-64 overflow-hidden" style={{ background: "#050510" }}>
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div style={{ position:"absolute", width:"55%", height:"160%", top:"-30%", left:"5%", background:"radial-gradient(ellipse, rgba(108,99,255,0.18) 0%, transparent 65%)", animation:"wgGlow1 9s ease-in-out infinite" }}/>
                      <div style={{ position:"absolute", width:"50%", height:"150%", top:"-25%", right:"5%", background:"radial-gradient(ellipse, rgba(0,212,255,0.10) 0%, transparent 65%)", animation:"wgGlow2 11s ease-in-out infinite" }}/>
                      <div style={{ position:"absolute", width:"40%", height:"120%", top:"-10%", left:"30%", background:"radial-gradient(ellipse, rgba(200,184,135,0.08) 0%, transparent 65%)", animation:"wgGlow3 13s ease-in-out infinite" }}/>
                    </div>
                    <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"linear-gradient(rgba(108,99,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.06) 1px, transparent 1px)", backgroundSize:"60px 60px", animation:"wgGrid 12s linear infinite" }}/>
                    <div className="absolute inset-0 pointer-events-none" style={{ background:"repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(5,5,16,0.15) 3px, rgba(5,5,16,0.15) 4px)" }}/>
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="text-center">
                        <p className="font-display font-extrabold tracking-tightest" style={{ fontSize:"clamp(2.8rem,7vw,5.5rem)", background:"linear-gradient(135deg, #6c63ff 0%, #00d4ff 45%, #c8b887 100%)", WebkitBackgroundClip:"text", backgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:"-0.02em", lineHeight:1 }}>
                          WEBGL
                        </p>
                        <p className="font-display text-[11px] tracking-widest3 uppercase mt-3" style={{ color:"rgba(232,228,252,0.38)", animation:"wgPulse 3s ease-in-out infinite" }}>Interactive Technology Demo</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                      {["Three.js","GLSL","Particles"].map(t => (
                        <span key={t} className="font-display text-[9px] tracking-widest uppercase px-2 py-1 border" style={{ borderColor:"rgba(108,99,255,0.35)", color:"#6c63ff", background:"rgba(108,99,255,0.08)" }}>{t}</span>
                      ))}
                    </div>
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full z-10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6c63ff] animate-pulse" />
                      <span className="font-display text-[10px] tracking-widest uppercase text-white">Live</span>
                    </div>
                    <div className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300" style={{ background:"#6c63ff" }}>
                      <span className="text-white font-bold">↗</span>
                    </div>
                  </div>
                  <div className="p-6 bg-fd-card group-hover:bg-fd-surface transition-colors duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <h2 className="font-display font-bold text-lg text-fd-white transition-colors duration-300"
                        onMouseEnter={e=>(e.currentTarget.style.color="#6c63ff")} onMouseLeave={e=>(e.currentTarget.style.color="")}>
                        WebGL Interactive Experience
                      </h2>
                      <span className="font-display text-xs text-fd-muted">2026</span>
                    </div>
                    <p className="font-body text-sm text-fd-dim leading-relaxed mb-4">
                      GPU-accelerated fluid simulation, interactive particle physics, and a 3D parallax tilt effect that responds to every cursor movement. The most technically advanced template in the collection — built with Three.js, custom GLSL shaders, and GSAP.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Three.js","GLSL Shaders","Particle Physics","GSAP","Lenis","SplitType","WebGL 2.0"].map(t => (
                        <span key={t} className="font-display text-[9px] tracking-widest uppercase text-fd-muted border border-fd-border px-2 py-0.5">{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            </ParallaxLayer>

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
