"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import ParallaxLayer from "@/components/ParallaxLayer";

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
];

const UPCOMING = [
  { id: "restaurant", title: "Restaurant & Dining", category: "Food & Hospitality", colour: "#f59e0b", status: "coming" },
  { id: "saas",       title: "SaaS Product",        category: "Technology",          colour: "#6366f1", status: "coming" },
  { id: "agency",     title: "Creative Agency",      category: "Studio · Portfolio",  colour: "#10b981", status: "coming" },
];

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-fd-black pt-20">

      {/* ── Page header ── */}
      <section className="py-28 px-6 md:px-10 border-b border-fd-border relative overflow-hidden">
        <ParallaxLayer
          className="absolute w-[600px] h-[600px] pointer-events-none"
          offset={150}
          style={{
            top: "calc(50% - 300px)",
            left: "calc(33.333% - 300px)",
            background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)",
          }}
        />
        <ParallaxLayer offset={45} className="max-w-7xl mx-auto relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EXPO }}
            className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange mb-5"
          >
            Our Showcase
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: EXPO }}
            className="font-display font-extrabold leading-none tracking-tightest text-fd-white"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            WORK THAT<br /><span className="text-stroke">SPEAKS.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25, ease: EXPO }}
            className="font-body text-fd-dim text-lg mt-8 max-w-xl leading-relaxed"
          >
            Every template is a fully working website — live on the web, production-ready, and available to be customised for your brand.
          </motion.p>
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

          <div className="grid md:grid-cols-2 gap-6">
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

      {/* ── Upcoming templates ── */}
      <section className="py-24 px-6 md:px-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <ParallaxLayer offset={45}>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VP}
              transition={{ duration: 0.6, ease: EXPO }}
              className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-muted mb-14 flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-fd-muted" />
              In Development
            </motion.p>
          </ParallaxLayer>

          <ParallaxLayer offset={28} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {UPCOMING.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VP}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EXPO }}
                className="border border-fd-border border-dashed p-8 flex flex-col justify-between min-h-[200px] group hover:border-fd-border hover:bg-fd-surface/50 transition-all duration-300"
              >
                <div>
                  <div className="w-3 h-3 rounded-full mb-5 opacity-60" style={{ background: p.colour }} />
                  <h3 className="font-display font-bold text-base text-fd-white mb-1">{p.title}</h3>
                  <p className="font-display text-xs text-fd-muted tracking-widest uppercase">{p.category}</p>
                </div>
                <span className="font-display text-[10px] tracking-widest uppercase text-fd-muted border border-dashed border-fd-border px-3 py-1 self-start mt-6">
                  Coming Soon
                </span>
              </motion.div>
            ))}
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
