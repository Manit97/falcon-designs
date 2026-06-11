"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import ParallaxLayer from "@/components/ParallaxLayer";

/* ─────────────────────────────────────────────────────────────────────────────
   Services — VerticalTabs adapted for Falcon Designs
   Taste Skill: VARIANCE 7 / MOTION 5. Dark canvas, orange accent, sharp edges.
   Emil Kowalski: scale(0.97) active, 160ms cubic-bezier, no transition:all.
   Images: dark, premium, tech-forward photography matching fd-black aesthetic.
───────────────────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: "01",
    title: "Web Design & Development",
    desc: "Pixel-perfect, high-performance Next.js websites. We obsess over every detail — from scroll animations to load times.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "AI Agents & Chatbots",
    desc: "Custom-trained AI assistants that handle bookings, answer questions, and capture leads 24/7. Built on Claude.",
    tags: ["Claude API", "Booking AI", "Lead Capture", "Custom Training"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Template Customisation",
    desc: "Start from one of our battle-tested templates and have it transformed into your brand in a single sprint.",
    tags: ["Fast Turnaround", "Branded", "Full Stack", "Deployed"],
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "Dashboard & CRM Systems",
    desc: "Internal tools that actually work. Client management, agent oversight, analytics — all in one place.",
    tags: ["Supabase", "Real-time", "Custom", "Scalable"],
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1400&auto=format&fit=crop",
  },
];

const AUTO_PLAY = 5000;
const EXPO = [0.16, 1, 0.3, 1] as const;

/* Image slide variants — vertical enter/exit (up or down depending on direction) */
const slideVariants = {
  enter: (d: number) => ({ y: d > 0 ? "-100%" : "100%", opacity: 0 }),
  center: { zIndex: 1, y: 0, opacity: 1 },
  exit:  (d: number) => ({ zIndex: 0, y: d > 0 ? "100%" : "-100%", opacity: 0 }),
};

export default function Services() {
  const [active, setActive]     = useState(0);
  const [direction, setDir]     = useState(0);
  const [paused, setPaused]     = useState(false);
  const ref                     = useRef(null);
  const inView                  = useInView(ref, { once: true, margin: "-100px" });

  const next = useCallback(() => {
    setDir(1);
    setActive(p => (p + 1) % SERVICES.length);
  }, []);

  const prev = useCallback(() => {
    setDir(-1);
    setActive(p => (p - 1 + SERVICES.length) % SERVICES.length);
  }, []);

  const goTo = (i: number) => {
    if (i === active) return;
    setDir(i > active ? 1 : -1);
    setActive(i);
    setPaused(false);
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, AUTO_PLAY);
    return () => clearInterval(t);
  }, [active, paused, next]);

  return (
    <section ref={ref} className="py-16 md:py-32 px-6 md:px-10 bg-fd-black border-t border-fd-border overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header — same style as original Services.tsx */}
        <ParallaxLayer offset={70} className="grid md:grid-cols-2 gap-10 mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EXPO }}
              className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange mb-4"
            >
              What We Do
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: EXPO }}
              className="font-display font-extrabold leading-none tracking-tightest text-fd-white"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              OUR<br />
              <span className="text-stroke">SERVICES</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: EXPO }}
            className="font-body text-fd-dim text-base leading-relaxed md:self-end max-w-sm"
          >
            We don&apos;t do average. Every project ships with world-class design, clean code, and performance built in from day one.
          </motion.p>
        </ParallaxLayer>

        {/* Main grid — left: tab list, right: image panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: EXPO }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >

          {/* ── Left: vertical service tabs ─────────────────────────────── */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="flex flex-col pl-5 md:pl-7">
              {SERVICES.map((s, i) => {
                const isActive = active === i;
                return (
                  <button
                    key={s.id}
                    onClick={() => goTo(i)}
                    className="group relative flex items-start gap-5 py-7 text-left border-t border-fd-border first:border-0"
                    style={{ transition: "color 300ms ease" }}
                  >
                    {/* Vertical orange progress bar */}
                    <div
                      className="absolute top-0 bottom-0 w-px"
                      style={{ left: -20, background: "#1f1f1f" }}
                    >
                      {isActive && (
                        <motion.div
                          key={`prog-${i}-${paused}`}
                          className="absolute top-0 left-0 w-full origin-top"
                          style={{ background: "#f97316" }}
                          initial={{ height: "0%" }}
                          animate={paused ? { height: "0%" } : { height: "100%" }}
                          transition={{ duration: AUTO_PLAY / 1000, ease: "linear" }}
                        />
                      )}
                    </div>

                    {/* Number */}
                    <span
                      className="font-display font-medium tabular-nums mt-1.5 flex-shrink-0"
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.1em",
                        color: isActive ? "#f97316" : "#666666",
                        transition: "color 300ms ease",
                      }}
                    >
                      /{s.id}
                    </span>

                    {/* Title + expand */}
                    <div className="flex flex-col gap-0 flex-1 min-w-0">
                      <span
                        className="font-display font-bold leading-tight"
                        style={{
                          fontSize: "clamp(1.4rem, 2.8vw, 2rem)",
                          letterSpacing: "-0.02em",
                          color: isActive ? "#f97316" : "#f8fafc",
                          transition: "color 300ms ease",
                        }}
                      >
                        {s.title}
                      </span>

                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                            className="overflow-hidden"
                          >
                            <p
                              className="font-body text-sm leading-relaxed max-w-sm mt-3"
                              style={{ color: "#999999" }}
                            >
                              {s.desc}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4 pb-1">
                              {s.tags.map(tag => (
                                <span
                                  key={tag}
                                  className="font-display text-[10px] tracking-widest uppercase px-3 py-1"
                                  style={{
                                    border: "1px solid rgba(249,115,22,0.25)",
                                    color: "#999999",
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Right: image panel ───────────────────────────────────────── */}
          <div
            className="lg:col-span-7 order-1 lg:order-2"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="relative overflow-hidden"
              style={{
                aspectRatio: "16/11",
                background: "#111111",
                border: "1px solid #1f1f1f",
              }}
            >
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={active}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    y: { type: "spring", stiffness: 260, damping: 32 },
                    opacity: { duration: 0.35 },
                  }}
                  className="absolute inset-0 cursor-pointer"
                  onClick={next}
                >
                  <img
                    src={SERVICES[active].image}
                    alt={SERVICES[active].title}
                    className="w-full h-full object-cover block"
                    style={{
                      /* Desaturate + darken so any image sits on the fd-black canvas */
                      filter: "grayscale(35%) brightness(0.55) contrast(1.05)",
                      transition: "transform 700ms cubic-bezier(0.23,1,0.32,1), filter 700ms ease",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "scale(1.04)";
                      el.style.filter = "grayscale(20%) brightness(0.65) contrast(1.05)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "scale(1)";
                      el.style.filter = "grayscale(35%) brightness(0.55) contrast(1.05)";
                    }}
                  />
                  {/* Bottom gradient */}
                  <div
                    className="absolute inset-x-0 bottom-0 pointer-events-none"
                    style={{
                      height: "40%",
                      background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                    }}
                  />
                  {/* Service label bottom-left */}
                  <div className="absolute bottom-6 left-6 pointer-events-none">
                    <p
                      className="font-display font-semibold uppercase"
                      style={{ fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)" }}
                    >
                      {SERVICES[active].id} — {SERVICES[active].title}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Nav buttons — Emil: scale(0.97) active, 160ms cubic-bezier */}
              <div className="absolute bottom-5 right-5 flex gap-2 z-20">
                {/* Prev — dark */}
                <button
                  onClick={e => { e.stopPropagation(); prev(); }}
                  aria-label="Previous service"
                  className="flex items-center justify-center"
                  style={{
                    width: 44, height: 44,
                    background: "rgba(8,8,8,0.85)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#f8fafc",
                    transition: "background 160ms cubic-bezier(0.23,1,0.32,1), border-color 160ms ease, transform 160ms cubic-bezier(0.23,1,0.32,1)",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(249,115,22,0.15)";
                    el.style.borderColor = "rgba(249,115,22,0.4)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(8,8,8,0.85)";
                    el.style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                  onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
                  onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/>
                  </svg>
                </button>

                {/* Next — orange */}
                <button
                  onClick={e => { e.stopPropagation(); next(); }}
                  aria-label="Next service"
                  className="flex items-center justify-center"
                  style={{
                    width: 44, height: 44,
                    background: "#f97316",
                    border: "1px solid #f97316",
                    color: "#000",
                    transition: "background 160ms cubic-bezier(0.23,1,0.32,1), border-color 160ms ease, transform 160ms cubic-bezier(0.23,1,0.32,1)",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "#c2410c";
                    el.style.borderColor = "#c2410c";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "#f97316";
                    el.style.borderColor = "#f97316";
                  }}
                  onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
                  onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
                  </svg>
                </button>
              </div>

              {/* Dot indicators — bottom centre */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {SERVICES.map((_, i) => (
                  <button
                    key={i}
                    onClick={e => { e.stopPropagation(); goTo(i); }}
                    aria-label={`Go to service ${i + 1}`}
                    style={{
                      width: active === i ? 20 : 6,
                      height: 6,
                      background: active === i ? "#f97316" : "rgba(255,255,255,0.3)",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      transition: "width 300ms cubic-bezier(0.23,1,0.32,1), background 200ms ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
