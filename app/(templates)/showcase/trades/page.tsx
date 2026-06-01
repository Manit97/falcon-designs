"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ── Design tokens (Swift Trades brand — distinct from Falcon) ───────────── */
const T = {
  bg:      "#0c111d",
  surface: "#131929",
  card:    "#1a2235",
  amber:   "#f59e0b",
  amberDk: "#d97706",
  blue:    "#3b82f6",
  text:    "#f1f5f9",
  dim:     "#94a3b8",
  muted:   "#64748b",
  border:  "rgba(255,255,255,0.07)",
};

const EXPO = [0.16, 1, 0.3, 1] as const;

/* ── Data ─────────────────────────────────────────────────────────────────── */
const SERVICES = [
  { icon: "🔧", title: "Plumbing",          desc: "Leaks, burst pipes, taps, toilets, and full bathroom fit-outs. We fix it right the first time." },
  { icon: "🔥", title: "Boiler Repair",     desc: "Gas Safe registered engineers covering all makes and models. Same-day emergency repair available." },
  { icon: "⛽", title: "Gas Services",      desc: "Landlord gas safety certificates, appliance servicing, and new gas pipework installations." },
  { icon: "🌊", title: "Drainage",          desc: "Blocked drains, CCTV surveys, high-pressure water jetting, and drain lining repairs." },
  { icon: "♨️",  title: "Central Heating",  desc: "Radiator installs, power flushing, smart thermostats, and complete system replacements." },
  { icon: "⚡", title: "24 / 7 Emergency",  desc: "No call-out surcharge before 10pm. Engineers on standby — because breakdowns don't keep office hours." },
];

const STATS = [
  { value: "14+",    label: "Years Trading" },
  { value: "9,200+", label: "Jobs Done" },
  { value: "4.9★",   label: "Avg. Rating" },
  { value: "47 min", label: "Avg. Arrival" },
];

const STEPS = [
  { n: "1", title: "Call or Book Online", body: "Ring 0800 123 4567 any time or use the quick-book form below. We confirm your slot within minutes — no waiting on hold." },
  { n: "2", title: "Engineer Arrives",    body: "A fully-qualified, DBS-checked engineer arrives on time, stocked with the parts to fix it first visit. 97% first-fix rate." },
  { n: "3", title: "Job Done. Backed.",   body: "We tidy up, issue certificates where required, and every repair carries our 12-month parts and labour guarantee." },
];

const REVIEWS = [
  { name: "Sarah M.",  area: "Hackney",   text: "Boiler packed in at 9pm on a Friday. Swift Trades had an engineer with me by 10:30 and fixed it within the hour. Genuinely impressed — and the price was fair.", stars: 5 },
  { name: "James T.",  area: "Islington", text: "Used them for a full bathroom plumbing refit. Tidy, professional, finished on time and half the price I was quoted elsewhere. Already booked them again.", stars: 5 },
  { name: "Priya K.",  area: "Camden",    text: "Blocked drain sorted in under 20 minutes. Text confirmation, arrived early, cleaned up after themselves. Exactly what you want from a trades company.", stars: 5 },
];

const AREAS = [
  "Islington", "Hackney", "Camden", "Haringey", "Southwark",
  "Lambeth", "Wandsworth", "Tower Hamlets", "Newham", "Lewisham",
  "Barnet", "Enfield", "Waltham Forest", "Greenwich", "Brent",
];

const ACCREDITATIONS = ["Gas Safe Registered", "Which? Trusted Trader", "NAPIT Approved", "Trading Standards", "12-Month Guarantee"];

/* ── Sub-components ──────────────────────────────────────────────────────── */

function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(12,17,29,0.95)" : "rgba(12,17,29,0.7)",
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${scrolled ? T.border : "transparent"}`,
      }}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-10 h-16 md:h-18 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-1 h-6 rounded-full" style={{ background: T.amber }} />
          <span className="font-display font-extrabold text-sm tracking-widest uppercase" style={{ color: T.text }}>
            Swift<span style={{ color: T.amber }}>Trades</span>
          </span>
        </a>

        {/* Nav — desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {["Services", "How It Works", "Reviews", "Areas"].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
              className="font-body text-sm transition-colors duration-200"
              style={{ color: T.dim }}
              onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
              onMouseLeave={(e) => (e.currentTarget.style.color = T.dim)}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Phone + CTA */}
        <div className="flex items-center gap-3">
          <a
            href="tel:08001234567"
            className="hidden sm:flex items-center gap-2"
          >
            <span className="font-display font-bold text-sm" style={{ color: T.amber }}>
              0800 123 4567
            </span>
          </a>
          <a
            href="#contact"
            className="font-display font-bold text-xs tracking-widest uppercase px-5 py-2.5 transition-all duration-200"
            style={{ background: T.amber, color: "#000" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = T.amberDk)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = T.amber)}
          >
            Get a Quote
          </a>
        </div>
      </div>
    </header>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} style={{ color: T.amber }}>★</span>
      ))}
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function SwiftTradesPage() {
  const servicesRef    = useRef(null);
  const processRef     = useRef(null);
  const reviewsRef     = useRef(null);
  const areasRef       = useRef(null);
  const servicesView   = useInView(servicesRef,  { once: true, margin: "-60px" });
  const processView    = useInView(processRef,   { once: true, margin: "-60px" });
  const reviewsView    = useInView(reviewsRef,   { once: true, margin: "-60px" });
  const areasView      = useInView(areasRef,     { once: true, margin: "-60px" });

  // Smooth scroll for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = "auto"; };
  }, []);

  return (
    <div style={{ background: T.bg, color: T.text, minHeight: "100vh" }} className="font-body">
      <SiteHeader />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col justify-center px-5 md:px-10 pt-20 overflow-hidden"
        style={{ background: T.bg }}
      >
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width: "70vw", height: "70vw", maxWidth: 700, maxHeight: 700,
            background: `radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 65%)` }} />
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EXPO }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 border"
            style={{ borderColor: `rgba(245,158,11,0.4)`, background: `rgba(245,158,11,0.08)` }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
            <span className="font-display font-semibold text-[10px] tracking-widest uppercase" style={{ color: T.amber }}>
              Emergency Engineers Available Now
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EXPO }}
            className="font-display font-extrabold leading-none mb-6"
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)", color: T.text }}
          >
            LONDON&apos;S<br />
            <span style={{ color: T.amber, WebkitTextStroke: "0px" }}>EMERGENCY</span><br />
            TRADES TEAM.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EXPO }}
            className="font-body text-lg leading-relaxed mb-10 max-w-xl"
            style={{ color: T.dim }}
          >
            Plumbing, boilers, gas, and drainage — fixed fast by Gas Safe engineers who actually turn up when they say they will.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: EXPO }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <a
              href="tel:08001234567"
              className="font-display font-bold text-sm tracking-widest uppercase px-8 py-4 flex items-center justify-center gap-3 transition-all duration-200"
              style={{ background: T.amber, color: "#000" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = T.amberDk)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = T.amber)}
            >
              📞 Call 0800 123 4567
            </a>
            <a
              href="#contact"
              className="font-display font-bold text-sm tracking-widest uppercase px-8 py-4 flex items-center justify-center gap-3 transition-all duration-200 border"
              style={{ color: T.text, borderColor: T.border }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = T.amber; (e.currentTarget as HTMLElement).style.color = T.amber; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = T.border; (e.currentTarget as HTMLElement).style.color = T.text; }}
            >
              Book Online →
            </a>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: EXPO }}
            className="grid grid-cols-2 md:grid-cols-4 border"
            style={{ borderColor: T.border }}
          >
            {STATS.map(({ value, label }) => (
              <div key={label} className="px-6 py-5 border-r last:border-r-0" style={{ borderColor: T.border }}>
                <p className="font-display font-extrabold text-2xl" style={{ color: T.amber }}>{value}</p>
                <p className="font-display text-[10px] tracking-widest uppercase mt-1" style={{ color: T.muted }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-px h-10 animate-pulse" style={{ background: `linear-gradient(to bottom, transparent, ${T.amber})` }} />
        </motion.div>
      </section>

      {/* ── Accreditations strip ─────────────────────────────────────────── */}
      <div style={{ background: T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-4 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {ACCREDITATIONS.map((a) => (
            <div key={a} className="flex items-center gap-2">
              <span style={{ color: T.amber }}>✓</span>
              <span className="font-display font-semibold text-[10px] tracking-widest uppercase" style={{ color: T.muted }}>{a}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section id="services" ref={servicesRef} className="py-24 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={servicesView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EXPO }}
            className="mb-14"
          >
            <p className="font-display font-semibold text-[10px] tracking-widest uppercase mb-3" style={{ color: T.amber }}>
              What We Fix
            </p>
            <h2
              className="font-display font-extrabold leading-none"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: T.text }}
            >
              OUR SERVICES.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border" style={{ borderColor: T.border }}>
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                animate={servicesView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.07, ease: EXPO }}
                className="p-8 border-r border-b group transition-colors duration-300"
                style={{ borderColor: T.border }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = T.card)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
              >
                <div className="text-3xl mb-5">{s.icon}</div>
                <h3
                  className="font-display font-bold text-base mb-3 transition-colors duration-200"
                  style={{ color: T.text }}
                >
                  {s.title}
                </h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: T.dim }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        ref={processRef}
        className="py-24 px-5 md:px-10"
        style={{ background: T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={processView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EXPO }}
            className="mb-14"
          >
            <p className="font-display font-semibold text-[10px] tracking-widest uppercase mb-3" style={{ color: T.amber }}>Simple Process</p>
            <h2 className="font-display font-extrabold leading-none" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: T.text }}>
              HOW IT WORKS.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-0 border" style={{ borderColor: T.border }}>
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 30 }}
                animate={processView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EXPO }}
                className="p-10 border-r last:border-r-0"
                style={{ borderColor: T.border }}
              >
                <p className="font-display font-extrabold text-5xl mb-6" style={{ color: T.border, WebkitTextStroke: `1px rgba(245,158,11,0.25)` }}>
                  {step.n}
                </p>
                <h3 className="font-display font-bold text-lg mb-3" style={{ color: T.text }}>{step.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: T.dim }}>{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section id="reviews" ref={reviewsRef} className="py-24 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={reviewsView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EXPO }}
            className="mb-14"
          >
            <p className="font-display font-semibold text-[10px] tracking-widest uppercase mb-3" style={{ color: T.amber }}>Customer Reviews</p>
            <h2 className="font-display font-extrabold leading-none" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: T.text }}>
              WHAT THEY SAY.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 30 }}
                animate={reviewsView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EXPO }}
                className="p-8 border"
                style={{ background: T.card, borderColor: T.border }}
              >
                <Stars n={r.stars} />
                <p className="font-body text-sm leading-relaxed my-5" style={{ color: T.dim }}>&ldquo;{r.text}&rdquo;</p>
                <div>
                  <p className="font-display font-bold text-sm" style={{ color: T.text }}>{r.name}</p>
                  <p className="font-display text-[10px] tracking-widest uppercase mt-0.5" style={{ color: T.muted }}>{r.area}, London</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Areas ────────────────────────────────────────────────────────── */}
      <section
        id="areas"
        ref={areasRef}
        className="py-24 px-5 md:px-10"
        style={{ background: T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={areasView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EXPO }}
            className="mb-10"
          >
            <p className="font-display font-semibold text-[10px] tracking-widest uppercase mb-3" style={{ color: T.amber }}>We Cover</p>
            <h2 className="font-display font-extrabold leading-none" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: T.text }}>
              AREAS WE SERVE.
            </h2>
            <p className="font-body text-sm mt-4 max-w-lg leading-relaxed" style={{ color: T.dim }}>
              Based in North London, covering all major boroughs across the capital. Call to confirm your postcode.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={areasView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EXPO }}
            className="flex flex-wrap gap-3"
          >
            {AREAS.map((a) => (
              <span
                key={a}
                className="font-display font-semibold text-[10px] tracking-widest uppercase px-4 py-2 border"
                style={{ borderColor: T.border, color: T.dim }}
              >
                {a}
              </span>
            ))}
            <span className="font-display font-semibold text-[10px] tracking-widest uppercase px-4 py-2 border" style={{ borderColor: `rgba(245,158,11,0.4)`, color: T.amber }}>
              + Many More
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Emergency CTA ────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 px-5 md:px-10" style={{ background: T.amber }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <p className="font-display font-semibold text-[10px] tracking-widest uppercase mb-3 opacity-70">
              Available Right Now
            </p>
            <h2
              className="font-display font-extrabold leading-none"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#000" }}
            >
              GOT AN EMERGENCY?
            </h2>
            <p className="font-body text-sm leading-relaxed mt-3 max-w-md opacity-80">
              Don&apos;t wait. Our team is on standby 24 hours a day, 7 days a week. No call-out charge before 10pm.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <a
              href="tel:08001234567"
              className="font-display font-bold text-sm tracking-widest uppercase px-8 py-5 text-center transition-all duration-200"
              style={{ background: "#000", color: "#fff" }}
            >
              📞 0800 123 4567
            </a>
            <a
              href="mailto:hello@swifttrades.co.uk"
              className="font-display font-bold text-sm tracking-widest uppercase px-8 py-5 text-center border-2 border-black transition-all duration-200"
              style={{ color: "#000" }}
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact form ─────────────────────────────────────────────────── */}
      <section className="py-24 px-5 md:px-10" style={{ background: T.bg }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <p className="font-display font-semibold text-[10px] tracking-widest uppercase mb-3" style={{ color: T.amber }}>Quick Quote</p>
            <h2 className="font-display font-extrabold leading-none mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: T.text }}>
              BOOK A VISIT.
            </h2>
            <p className="font-body text-sm leading-relaxed mb-8" style={{ color: T.dim }}>
              Fill in the form and we&apos;ll get back to you within 30 minutes during working hours, or first thing in the morning if after 9pm.
            </p>
            <div className="space-y-4">
              {[
                { icon: "📍", label: "North London HQ", value: "Serving all London Boroughs" },
                { icon: "📞", label: "24/7 Emergency Line", value: "0800 123 4567" },
                { icon: "✉️", label: "Email", value: "hello@swifttrades.co.uk" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <span className="text-lg mt-0.5">{icon}</span>
                  <div>
                    <p className="font-display text-[10px] tracking-widest uppercase" style={{ color: T.muted }}>{label}</p>
                    <p className="font-body text-sm" style={{ color: T.dim }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {["Your Name", "Phone Number"].map((ph) => (
                <input
                  key={ph}
                  type="text"
                  placeholder={ph}
                  className="w-full px-5 py-4 font-body text-sm focus:outline-none transition-colors duration-200"
                  style={{ background: T.card, border: `1px solid ${T.border}`, color: T.text }}
                  onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = T.amber)}
                  onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = T.border)}
                />
              ))}
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-5 py-4 font-body text-sm focus:outline-none transition-colors duration-200"
              style={{ background: T.card, border: `1px solid ${T.border}`, color: T.text }}
              onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = T.amber)}
              onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = T.border)}
            />
            <select
              className="w-full px-5 py-4 font-body text-sm focus:outline-none transition-colors duration-200 appearance-none"
              style={{ background: T.card, border: `1px solid ${T.border}`, color: T.dim }}
              onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = T.amber)}
              onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = T.border)}
            >
              <option>Service required…</option>
              {SERVICES.map((s) => <option key={s.title}>{s.title}</option>)}
            </select>
            <textarea
              placeholder="Describe the problem — as much detail helps."
              rows={4}
              className="w-full px-5 py-4 font-body text-sm focus:outline-none resize-none transition-colors duration-200"
              style={{ background: T.card, border: `1px solid ${T.border}`, color: T.text }}
              onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = T.amber)}
              onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = T.border)}
            />
            <button
              type="button"
              className="w-full font-display font-bold text-sm tracking-widest uppercase py-4 transition-all duration-200"
              style={{ background: T.amber, color: "#000" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = T.amberDk)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = T.amber)}
            >
              Send Request →
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer
        className="py-12 px-5 md:px-10"
        style={{ background: T.surface, borderTop: `1px solid ${T.border}` }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 rounded-full" style={{ background: T.amber }} />
                <span className="font-display font-extrabold text-sm tracking-widest uppercase" style={{ color: T.text }}>
                  Swift<span style={{ color: T.amber }}>Trades</span>
                </span>
              </div>
              <p className="font-body text-xs leading-relaxed max-w-xs" style={{ color: T.muted }}>
                London&apos;s trusted emergency trades specialists. Gas Safe registered, fully insured, 12-month guarantee on all work.
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-x-16 gap-y-2">
              {["Services", "How It Works", "Reviews", "Areas", "Contact", "Privacy Policy"].map((l) => (
                <a key={l} href="#" className="font-display text-[10px] tracking-widest uppercase transition-colors duration-200"
                  style={{ color: T.muted }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>

          <div
            className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
            style={{ borderTop: `1px solid ${T.border}` }}
          >
            <p className="font-body text-xs" style={{ color: T.muted }}>
              © 2026 Swift Trades Ltd. Registered in England & Wales. Gas Safe No. 123456.
            </p>
            <a
              href="https://falcon-designs-agency.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-[10px] tracking-widest uppercase transition-colors duration-200"
              style={{ color: T.muted }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f97316")}
              onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
            >
              Website by Falcon Designs ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
