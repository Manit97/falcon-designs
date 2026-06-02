"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import ParallaxLayer from "@/components/ParallaxLayer";

const EXPO = [0.16, 1, 0.3, 1] as const;
const VP   = { once: true, margin: "0px 0px -80px 0px" } as const;

const VALUES = [
  {
    n: "01",
    title: "Craft over templates",
    body: "Every line of code is written deliberately. We don't drag-and-drop. We don't do Wix. We build at the level you'd expect from a £50k agency — for a fraction of that price.",
  },
  {
    n: "02",
    title: "Speed is a feature",
    body: "A slow site loses customers. We obsess over Core Web Vitals, image optimisation, and server response times. Your site will be fast — measurably, provably fast.",
  },
  {
    n: "03",
    title: "Design that converts",
    body: "Beautiful is not enough. Everything we design is built around turning visitors into enquiries. Copy, layout, calls-to-action — it all works together with a purpose.",
  },
  {
    n: "04",
    title: "Long-term partnership",
    body: "We don't disappear after launch. Whether it's a content update, a new landing page, or a complete rebrand — we're your team for the long run.",
  },
];

const PROCESS = [
  { n: "01", title: "Discovery",      body: "We learn your business, your goals, and what sets you apart. No briefs, no forms — just a real conversation." },
  { n: "02", title: "Strategy",       body: "We map out the site architecture, content plan, and design direction before a single pixel is placed." },
  { n: "03", title: "Design & Build", body: "You see real designs, not wireframes. Live in your browser within days, not months." },
  { n: "04", title: "Launch & Beyond", body: "We handle everything: hosting, domain, speed checks, SEO setup. Then we stay on as your ongoing tech partner." },
];

const STATS = [
  { value: "48hr",  label: "First design, delivered" },
  { value: "100%",  label: "UK-based team" },
  { value: "∞",     label: "Revisions included" },
  { value: "24/7",  label: "Support, always" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-fd-black pt-20">

      {/* ── Header ── */}
      <section className="py-28 px-6 md:px-10 border-b border-fd-border overflow-hidden relative">
        <ParallaxLayer
          className="absolute bottom-0 left-0 w-[800px] h-[400px] pointer-events-none"
          offset={150}
          style={{ background: "radial-gradient(ellipse at 20% 100%, rgba(249,115,22,0.07) 0%, transparent 60%)" }}
        />
        <ParallaxLayer offset={45} className="max-w-7xl mx-auto relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EXPO }}
            className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange mb-5"
          >
            About Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: EXPO }}
            className="font-display font-extrabold leading-none tracking-tightest text-fd-white"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            BUILT IN<br /><span className="text-stroke">LONDON.</span>
          </motion.h1>
        </ParallaxLayer>
      </section>

      {/* ── Mission ── */}
      <section className="py-24 px-6 md:px-10 border-b border-fd-border overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.6fr] gap-20 items-start">

          <ParallaxLayer offset={50}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VP}
              transition={{ duration: 0.8, ease: EXPO }}
            >
              <p className="font-display font-semibold text-xs tracking-widest uppercase text-fd-orange mb-4">Our Mission</p>
              <div className="w-px h-24 bg-fd-border mt-2" />

              {/* ── Animated mission graphic ── */}
              <style>{`
                @keyframes missionFloat {
                  0%   { transform: translateY(0px)   rotateZ(-0.6deg); }
                  50%  { transform: translateY(-14px) rotateZ(0.6deg);  }
                  100% { transform: translateY(0px)   rotateZ(-0.6deg); }
                }
                @keyframes missionGlow {
                  0%,100% { filter: drop-shadow(0 8px 24px rgba(249,115,22,0.12)); }
                  50%     { filter: drop-shadow(0 20px 36px rgba(249,115,22,0.22)); }
                }
                .mission-float {
                  animation:
                    missionFloat 6s  ease-in-out infinite,
                    missionGlow  6s  ease-in-out infinite;
                  will-change: transform, filter;
                  display: inline-block;
                  transform-origin: center bottom;
                }
                .mission-float:hover {
                  animation-play-state: paused;
                  filter: drop-shadow(0 0 28px rgba(249,115,22,0.40)) !important;
                  transform: scale(1.04) !important;
                  transition: filter 0.4s ease, transform 0.4s ease;
                }
              `}</style>

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 1, delay: 0.35, ease: EXPO }}
                className="mt-10 select-none"
              >
                <div className="mission-float">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/mission-graphic.svg"
                    alt="Falcon Designs — Our Mission"
                    loading="lazy"
                    draggable={false}
                    style={{
                      width: "100%",
                      maxWidth: 280,
                      height: "auto",
                      display: "block",
                      mixBlendMode: "screen",
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </ParallaxLayer>

          <ParallaxLayer offset={30}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VP}
              transition={{ duration: 0.9, delay: 0.1, ease: EXPO }}
              className="space-y-6"
            >
              <p
                className="font-display font-bold text-fd-white leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
              >
                Good design isn&apos;t a luxury. It&apos;s how small businesses compete with the big ones.
              </p>
              <p className="font-body text-fd-dim leading-relaxed text-lg">
                Falcon Designs was built out of one frustration: too many brilliant businesses were being handed
                ugly, slow, forgettable websites — and paying too much for the privilege. We set out to fix that.
              </p>
              <p className="font-body text-fd-dim leading-relaxed">
                We&apos;re a small team of designers and developers based in London. We work exclusively on
                web — no social media management, no SEO packages, no upsells. Just exceptional websites
                and AI tools, built with genuine care, for businesses that deserve better.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border border-fd-border mt-10">
                {STATS.map(({ value, label }) => (
                  <div key={label} className="border-r border-fd-border last:border-r-0 p-6">
                    <p className="font-display font-extrabold text-2xl text-fd-orange">{value}</p>
                    <p className="font-display text-[10px] tracking-widest uppercase text-fd-muted mt-1 leading-tight">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </ParallaxLayer>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 px-6 md:px-10 border-b border-fd-border bg-fd-surface overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <ParallaxLayer offset={50}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VP}
              transition={{ duration: 0.6, ease: EXPO }}
              className="mb-16"
            >
              <p className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange mb-3">
                How We Think
              </p>
              <h2
                className="font-display font-extrabold leading-none tracking-tightest text-fd-white"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                OUR VALUES.
              </h2>
            </motion.div>
          </ParallaxLayer>

          <ParallaxLayer offset={28} className="grid md:grid-cols-2 gap-px bg-fd-border border border-fd-border">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VP}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EXPO }}
                className="bg-fd-surface p-10 group hover:bg-fd-card transition-colors duration-300"
              >
                <p className="font-display font-extrabold text-5xl text-fd-border group-hover:text-fd-orange transition-colors duration-500 mb-6">
                  {v.n}
                </p>
                <h3 className="font-display font-bold text-lg text-fd-white mb-3">{v.title}</h3>
                <p className="font-body text-sm text-fd-dim leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </ParallaxLayer>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-24 px-6 md:px-10 border-b border-fd-border overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <ParallaxLayer offset={50}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VP}
              transition={{ duration: 0.6, ease: EXPO }}
              className="mb-16"
            >
              <p className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange mb-3">
                The Process
              </p>
              <h2
                className="font-display font-extrabold leading-none tracking-tightest text-fd-white"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                FROM ZERO<br /><span className="text-stroke">TO LIVE.</span>
              </h2>
              <p className="font-body text-fd-dim mt-5 max-w-lg leading-relaxed">
                Most agencies take months. We move faster — without cutting corners.
              </p>
            </motion.div>
          </ParallaxLayer>

          <ParallaxLayer offset={28} className="space-y-0 border border-fd-border">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VP}
                transition={{ duration: 0.5, delay: i * 0.07, ease: EXPO }}
                className="group flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 px-8 py-10 border-b border-fd-border last:border-b-0 hover:bg-fd-surface transition-colors duration-300"
              >
                <span className="font-display font-extrabold text-4xl text-fd-border group-hover:text-fd-orange transition-colors duration-500 min-w-[60px]">
                  {p.n}
                </span>
                <div className="flex-1 sm:border-l sm:border-fd-border sm:pl-12">
                  <h3 className="font-display font-bold text-lg text-fd-white mb-2 group-hover:text-fd-orange transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="font-body text-sm text-fd-dim leading-relaxed">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </ParallaxLayer>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-24 px-6 md:px-10 border-b border-fd-border bg-fd-surface overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <ParallaxLayer offset={50}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VP}
              transition={{ duration: 0.6, ease: EXPO }}
              className="mb-16"
            >
              <p className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange mb-3">
                The Team
              </p>
              <h2
                className="font-display font-extrabold leading-none tracking-tightest text-fd-white"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                REAL PEOPLE.<br /><span className="text-stroke">REAL WORK.</span>
              </h2>
            </motion.div>
          </ParallaxLayer>

          <ParallaxLayer offset={30} className="grid md:grid-cols-2 gap-8 max-w-3xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VP}
              transition={{ duration: 0.8, ease: EXPO }}
              className="border border-fd-border p-8 group hover:border-fd-orange/40 transition-all duration-300"
            >
              <div
                className="w-16 h-16 rounded-full mb-6 flex items-center justify-center text-2xl font-display font-bold text-fd-orange"
                style={{ background: "rgba(249,115,22,0.1)" }}
              >
                F
              </div>
              <h3 className="font-display font-bold text-lg text-fd-white mb-1">Founders</h3>
              <p className="font-display text-xs text-fd-muted tracking-widest uppercase mb-4">
                Design & Development
              </p>
              <p className="font-body text-sm text-fd-dim leading-relaxed">
                We started Falcon Designs because we believed the UK&apos;s small businesses deserved world-class
                digital presence — not cookie-cutter templates and inflated agency retainers.
              </p>
            </motion.div>

            <div className="border border-fd-border border-dashed p-8 flex flex-col justify-between">
              <div>
                <p className="font-display font-semibold text-xs tracking-widest uppercase text-fd-muted mb-6">
                  We believe in
                </p>
                <ul className="space-y-3">
                  {[
                    "Honesty over hype",
                    "Speed without compromise",
                    "Design that earns its cost",
                    "Technology that empowers",
                  ].map((belief) => (
                    <li key={belief} className="flex items-start gap-3 font-body text-sm text-fd-dim">
                      <span className="text-fd-orange mt-0.5">—</span>
                      {belief}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ParallaxLayer>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 md:px-10 border-t border-fd-border overflow-hidden">
        <ParallaxLayer offset={40} className="max-w-3xl mx-auto text-center">
          <h2
            className="font-display font-extrabold leading-none tracking-tightest text-fd-white mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            READY TO START?
          </h2>
          <p className="font-body text-fd-dim mb-10 leading-relaxed">
            Tell us about your business. We&apos;ll tell you exactly what we can build for you — and what it will cost. No sales pitch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="font-display font-bold text-xs tracking-widest uppercase bg-fd-orange text-fd-black px-10 py-4 hover:bg-fd-white transition-colors duration-300 inline-flex items-center justify-center gap-3"
            >
              Start a Project <span>→</span>
            </Link>
            <Link
              href="/showcase"
              className="font-display font-bold text-xs tracking-widest uppercase border border-fd-border text-fd-muted px-10 py-4 hover:border-fd-orange hover:text-fd-white transition-all duration-300 inline-flex items-center justify-center gap-3"
            >
              See Our Work
            </Link>
          </div>
        </ParallaxLayer>
      </section>
    </div>
  );
}
