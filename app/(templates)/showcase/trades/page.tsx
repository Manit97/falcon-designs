"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────────
   DESIGN SYSTEM — Swift Trades v2
   UI/UX Pro Max: Home Services / Emergency Plumbing
   Pattern: Emergency-first · Trust & Authority · Dark canvas + Amber accent
   Taste Skill: VARIANCE 7 / MOTION 5 / DENSITY 6
   Emil Kowalski: custom easing, clip-path slider, scale(0.97) active, SVG icons
───────────────────────────────────────────────────────────────────────────── */
const T = {
  bg:       "#080c14",
  surface:  "#0d1220",
  card:     "#111827",
  cardHov:  "#141f30",
  amber:    "#f59e0b",
  amberDk:  "#d97706",
  amberLt:  "rgba(245,158,11,0.12)",
  white:    "#f8fafc",
  dim:      "#94a3b8",
  muted:    "#4b5563",
  border:   "rgba(255,255,255,0.07)",
  borderHov:"rgba(245,158,11,0.35)",
  red:      "#ef4444",
};

/* Emil: custom easing — built-in CSS easings are too weak */
const EASE_OUT  = [0.23, 1, 0.32, 1] as const;
const EASE_SOFT = [0.32, 0.72, 0, 1] as const; /* iOS-like, for drawers/panels */

/* ─────────────────────────────────────────────────────────────────────────────
   SVG ICONS — Emil: never use emoji as icons
───────────────────────────────────────────────────────────────────────────── */
const Icons = {
  Plumbing: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v2h5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-5v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/>
      <circle cx="6.5" cy="19.5" r="2.5"/>
    </svg>
  ),
  Boiler: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c0 0-2 2-2 5s2 4 2 7-2 3-2 3"/>
      <path d="M16 2c0 0-2 2-2 5s2 4 2 7-2 3-2 3"/>
      <path d="M8 2c0 0-2 2-2 5s2 4 2 7-2 3-2 3"/>
      <rect x="3" y="19" width="18" height="3" rx="1"/>
    </svg>
  ),
  Gas: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12"/>
      <path d="M12 12C12 12 7 9 7 5a5 5 0 0 1 10 0c0 4-5 7-5 7z"/>
      <path d="M9 21h6"/>
    </svg>
  ),
  Drainage: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L8 8h8L12 2z"/>
      <path d="M12 8v6"/>
      <circle cx="12" cy="17" r="3"/>
      <path d="M7 21h10"/>
    </svg>
  ),
  Heating: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2"/>
      <line x1="7" y1="9" x2="7" y2="15"/>
      <line x1="11" y1="9" x2="11" y2="15"/>
      <line x1="15" y1="9" x2="15" y2="15"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
    </svg>
  ),
  Emergency: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12,6 12,12 16,14"/>
    </svg>
  ),
  Phone: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.08 6.08l1.79-1.79a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.08z"/>
    </svg>
  ),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20,6 9,17 4,12"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
    </svg>
  ),
  ChevronLeft: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15,18 9,12 15,6"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9,18 15,12 9,6"/>
    </svg>
  ),
  Star: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
    </svg>
  ),
};

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */
const SERVICES = [
  { Icon: Icons.Plumbing,  title: "Plumbing",         desc: "Leaks, burst pipes, taps, toilets, and full bathroom fit-outs. Fixed right, first time." },
  { Icon: Icons.Boiler,    title: "Boiler Repair",    desc: "Gas Safe engineers covering all makes and models. Same-day emergency repair available." },
  { Icon: Icons.Gas,       title: "Gas Services",     desc: "Landlord safety certificates, appliance servicing, and new gas pipework installations." },
  { Icon: Icons.Drainage,  title: "Drainage",         desc: "Blocked drains, CCTV surveys, high-pressure jetting, and drain lining repairs." },
  { Icon: Icons.Heating,   title: "Central Heating",  desc: "Radiator installs, power flushing, smart thermostats, complete system replacements." },
  { Icon: Icons.Emergency, title: "24/7 Emergency",   desc: "No call-out surcharge before 10pm. Engineers on standby because breakdowns don't keep office hours." },
];

const STATS = [
  { value: 14,   suffix: "+",    label: "Years Trading" },
  { value: 9200, suffix: "+",    label: "Jobs Completed" },
  { value: 4.9,  suffix: "★",    label: "Average Rating" },
  { value: 47,   suffix: " min", label: "Avg. Response" },
];

const STEPS = [
  { n: "01", title: "Call or Book Online",  body: "Ring 0800 123 4567 any time or use the quick-book form. We confirm your slot within minutes." },
  { n: "02", title: "Engineer Arrives",     body: "DBS-checked, Gas Safe registered. On time, stocked with parts. 97% first-fix rate." },
  { n: "03", title: "Job Done. Guaranteed.", body: "We tidy up, issue certificates where required. Every repair carries a 12-month parts and labour guarantee." },
];

const PRICING = [
  {
    tier: "Emergency Call-Out",
    price: "£89",
    unit: "call-out fee",
    tag: null,
    desc: "For burst pipes, boiler breakdowns, and urgent drainage issues.",
    features: [
      "1-hour response window",
      "Fixed-price quote before work starts",
      "Gas Safe certified engineers",
      "12-month parts & labour guarantee",
      "No surcharge before 10pm",
    ],
    cta: "Book Emergency",
    highlight: false,
  },
  {
    tier: "Monthly Protection",
    price: "£29",
    unit: "per month",
    tag: "Most Popular",
    desc: "Annual boiler service plus priority support for total peace of mind.",
    features: [
      "Annual boiler service included",
      "2 plumbing check-ups per year",
      "Priority 30-minute response",
      "10% off all call-out fees",
      "No call-out charge for covered faults",
      "Cancel anytime",
    ],
    cta: "Start Protection",
    highlight: true,
  },
  {
    tier: "Full Installation",
    price: "POA",
    unit: "free survey",
    tag: null,
    desc: "New boilers, bathroom fit-outs, and complete heating system overhauls.",
    features: [
      "Free on-site survey & quote",
      "New boiler from £1,200 installed",
      "Full bathroom from £3,500",
      "5-year parts guarantee",
      "0% finance available",
      "Manufacturer warranty registered",
    ],
    cta: "Get a Survey",
    highlight: false,
  },
];

const REVIEWS = [
  { name: "Sarah M.",   area: "Hackney",       stars: 5, source: "Google",      avatar: "SM", text: "Boiler packed in at 9pm on a Friday. Swift Trades had an engineer with me by 10:30 and fixed it within the hour. Genuinely impressed — and the price was completely fair." },
  { name: "James T.",   area: "Islington",     stars: 5, source: "Trustpilot",  avatar: "JT", text: "Used them for a full bathroom plumbing refit. Tidy, professional, finished on time and half the price I was quoted elsewhere. Already booked them for the kitchen." },
  { name: "Priya K.",   area: "Camden",        stars: 5, source: "Google",      avatar: "PK", text: "Blocked drain sorted in under 20 minutes. Text confirmation, arrived early, cleaned up after themselves. This is exactly what you want from a trades company." },
  { name: "Michael R.", area: "Wandsworth",    stars: 5, source: "Trustpilot",  avatar: "MR", text: "Been on the monthly protection plan for 8 months. Had one call-out — engineer arrived in 25 minutes at 7am on a Sunday. Extraordinary service, worth every penny." },
  { name: "Lucy H.",    area: "Barnet",        stars: 5, source: "Google",      avatar: "LH", text: "New boiler installed start to finish in one day. Team was respectful of the house, left everything spotless. The finance option made it completely manageable." },
  { name: "David O.",   area: "Southwark",     stars: 5, source: "Which?",      avatar: "DO", text: "Annual boiler service and they found a carbon monoxide issue I had no idea about. Could have been serious. Cannot recommend highly enough — possibly the most important call I've made." },
];

const BEFORE_AFTER = [
  {
    title: "Burst Pipe Repair",
    location: "Kitchen — Hackney",
    before: { label: "BEFORE", bg: "linear-gradient(135deg, #2d1810 0%, #4a2218 40%, #3d1a0e 100%)", detail: "Ceiling collapse from burst 22mm copper pipe. Active flooding." },
    after:  { label: "AFTER",  bg: "linear-gradient(135deg, #0f2a1a 0%, #1a4a2e 40%, #0d3320 100%)", detail: "Full repair, replastered, painted. 1-year guarantee." },
  },
  {
    title: "Bathroom Renovation",
    location: "En-suite — Islington",
    before: { label: "BEFORE", bg: "linear-gradient(135deg, #1e1810 0%, #382d18 40%, #2d2210 100%)", detail: "1980s avocado suite. Cracked tiles, outdated pipework, leaking." },
    after:  { label: "AFTER",  bg: "linear-gradient(135deg, #101a22 0%, #183040 40%, #0d2030 100%)", detail: "Full modern refit. Walk-in shower, underfloor heating, 5-year guarantee." },
  },
  {
    title: "Boiler Replacement",
    location: "Utility Room — Barnet",
    before: { label: "BEFORE", bg: "linear-gradient(135deg, #221510 0%, #3d2418 40%, #2a1a0d 100%)", detail: "18-year-old unit. 40% efficiency. Constant breakdowns." },
    after:  { label: "AFTER",  bg: "linear-gradient(135deg, #0f1a26 0%, #162a3e 40%, #0c1c30 100%)", detail: "A-rated Worcester Bosch 36kW. 97% efficiency. 10-year warranty." },
  },
];

const ACCREDITATIONS = ["Gas Safe Registered", "Which? Trusted Trader", "NAPIT Approved", "Trading Standards", "12-Month Guarantee", "Fully Insured"];

const AREAS = [
  "Islington","Hackney","Camden","Haringey","Southwark",
  "Lambeth","Wandsworth","Tower Hamlets","Newham","Lewisham",
  "Barnet","Enfield","Waltham Forest","Greenwich","Brent","Ealing",
];

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────────────────────────────────────── */

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" style={{ color: T.amber }}>
      {Array.from({ length: n }).map((_, i) => <Icons.Star key={i} />)}
    </div>
  );
}

/* Animated number counter — fires when in view */
function CountUp({ target, suffix, duration = 1.8 }: { target: number; suffix: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [displayed, setDisplayed] = useState(0);
  const isDecimal = target % 1 !== 0;

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const raf = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      const val = target * ease;
      setDisplayed(isDecimal ? Math.round(val * 10) / 10 : Math.round(val));
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [inView, target, duration, isDecimal]);

  return <span ref={ref}>{displayed}{suffix}</span>;
}

/* Before/After Slider — Emil: clip-path reveal + pointer capture */
function BeforeAfterSlider({ job, index }: { job: typeof BEFORE_AFTER[0]; index: number }) {
  const [pos, setPos] = useState(50);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setPos(x);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updatePos(e.clientX);
  }, [updatePos]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePos(e.clientX);
  }, [updatePos]);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const onClick = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) updatePos(e.clientX);
  }, [updatePos]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE_OUT }}
    >
      {/* Job label */}
      <div className="mb-4">
        <p className="font-display font-bold text-base" style={{ color: T.white }}>{job.title}</p>
        <p className="font-body text-xs mt-1" style={{ color: T.muted }}>{job.location}</p>
      </div>

      {/* Slider container */}
      <div
        ref={containerRef}
        className="relative select-none overflow-hidden cursor-ew-resize"
        style={{ aspectRatio: "16/10", borderRadius: 2 }}
        onClick={onClick}
      >
        {/* Before layer */}
        <div className="absolute inset-0 flex flex-col justify-end p-5" style={{ background: job.before.bg }}>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="font-display font-bold text-[9px] tracking-widest uppercase px-2 py-1"
              style={{ background: "rgba(239,68,68,0.85)", color: "#fff" }}>
              {job.before.label}
            </span>
          </div>
          <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "60%" }}>
            {job.before.detail}
          </p>
        </div>

        {/* After layer — clip-path reveal */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-5"
          style={{
            background: job.after.bg,
            clipPath: `inset(0 ${100 - pos}% 0 0)`,
            transition: isDragging.current ? "none" : "clip-path 80ms ease-out",
          }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <span className="font-display font-bold text-[9px] tracking-widest uppercase px-2 py-1"
              style={{ background: "rgba(34,197,94,0.85)", color: "#fff" }}>
              {job.after.label}
            </span>
          </div>
          <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "60%" }}>
            {job.after.detail}
          </p>
        </div>

        {/* Drag handle */}
        <div
          className="absolute top-0 bottom-0 z-20 flex items-center justify-center"
          style={{ left: `${pos}%`, transform: "translateX(-50%)", touchAction: "none" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          {/* Hairline */}
          <div className="absolute top-0 bottom-0 w-px" style={{ background: "rgba(255,255,255,0.9)" }} />
          {/* Handle circle */}
          <div
            className="relative z-10 flex items-center justify-center gap-1 w-10 h-10 rounded-full shadow-xl"
            style={{ background: T.white }}
          >
            <Icons.ChevronLeft />
            <Icons.ChevronRight />
          </div>
        </div>

        {/* Drag hint — fades out */}
        {pos === 50 && (
          <div className="absolute top-4 right-4 pointer-events-none">
            <p className="font-display text-[9px] tracking-widest uppercase px-2 py-1"
              style={{ background: "rgba(0,0,0,0.5)", color: "rgba(255,255,255,0.6)" }}>
              Drag to compare
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* Header */
function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? "rgba(8,12,20,0.97)" : "rgba(8,12,20,0.6)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${scrolled ? T.border : "transparent"}`,
        transition: "background 300ms cubic-bezier(0.23,1,0.32,1), border-color 300ms cubic-bezier(0.23,1,0.32,1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-0.5 h-5 rounded-full" style={{ background: T.amber }} />
          <span className="font-display font-extrabold text-sm tracking-widest uppercase" style={{ color: T.white }}>
            Swift<span style={{ color: T.amber }}>Trades</span>
          </span>
        </a>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[["Services","#services"],["How It Works","#how-it-works"],["Pricing","#pricing"],["Reviews","#reviews"],["Areas","#areas"]].map(([label, href]) => (
            <a key={label} href={href}
              className="font-body text-sm"
              style={{ color: T.dim, transition: "color 180ms ease-out" }}
              onMouseEnter={e => (e.currentTarget.style.color = T.white)}
              onMouseLeave={e => (e.currentTarget.style.color = T.dim)}
            >{label}</a>
          ))}
        </nav>

        {/* Phone + CTA */}
        <div className="flex items-center gap-3">
          <a href="tel:08001234567" className="hidden sm:flex items-center gap-2">
            <Icons.Phone />
            <span className="font-display font-bold text-sm" style={{ color: T.amber }}>0800 123 4567</span>
          </a>
          <a href="#contact"
            className="font-display font-bold text-xs tracking-widest uppercase px-5 py-2.5"
            style={{
              background: T.amber, color: "#000",
              transition: "background 160ms cubic-bezier(0.23,1,0.32,1), transform 160ms cubic-bezier(0.23,1,0.32,1)",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T.amberDk; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = T.amber; }}
            onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
            onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
          >
            Get a Quote
          </a>
        </div>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────────────────── */
export default function SwiftTradesPage() {
  const servicesRef  = useRef(null);
  const pricingRef   = useRef(null);
  const reviewsRef   = useRef(null);
  const areasRef     = useRef(null);
  const statsRef     = useRef(null);
  const servicesView = useInView(servicesRef,  { once: true, margin: "-60px" });
  const pricingView  = useInView(pricingRef,   { once: true, margin: "-60px" });
  const reviewsView  = useInView(reviewsRef,   { once: true, margin: "-60px" });
  const areasView    = useInView(areasRef,     { once: true, margin: "-60px" });
  const statsView    = useInView(statsRef,     { once: true, margin: "-40px" });

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = "auto"; };
  }, []);

  return (
    <div style={{ background: T.bg, color: T.white, minHeight: "100vh" }} className="font-body">
      <SiteHeader />

      {/* ── HERO — Split layout, bleeding image right ───────────────────────── */}
      <section className="relative min-h-screen overflow-hidden flex items-center">

        {/* Bleeding right image panel */}
        <div className="hidden md:block absolute top-0 right-0 w-[52%] h-full"
          style={{ background: "linear-gradient(135deg, #0d1e35 0%, #0a1525 30%, #061020 100%)" }}>
          {/* Inner visual texture */}
          <div className="absolute inset-0 opacity-40"
            style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(245,158,11,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(59,130,246,0.08) 0%, transparent 50%)" }} />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
          {/* Left fade into bg */}
          <div className="absolute top-0 left-0 w-32 h-full"
            style={{ background: `linear-gradient(to right, ${T.bg}, transparent)` }} />
          {/* Floating trust badges */}
          <div className="absolute top-1/3 left-16 space-y-4">
            {[
              { label: "Gas Safe", num: "Reg. No. 123456" },
              { label: "Which? Trusted", num: "Verified 2026" },
              { label: "97% First Fix", num: "Rate" },
            ].map((b, i) => (
              <motion.div key={b.label}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.8 + i * 0.15, ease: EASE_OUT }}
                className="px-5 py-3 backdrop-blur-sm"
                style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${T.border}` }}
              >
                <p className="font-display font-bold text-sm" style={{ color: T.white }}>{b.label}</p>
                <p className="font-body text-[10px] mt-0.5" style={{ color: T.muted }}>{b.num}</p>
              </motion.div>
            ))}
          </div>
          {/* Large background number */}
          <div className="absolute bottom-12 right-12 font-display font-extrabold select-none pointer-events-none leading-none"
            style={{ fontSize: "18vw", color: "rgba(245,158,11,0.04)", lineHeight: 1 }}>
            24/7
          </div>
        </div>

        {/* Left content */}
        <div className="relative z-10 w-full md:w-[54%] px-5 md:pl-10 lg:pl-20 pt-28 pb-16">
          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="inline-flex items-center gap-2.5 mb-8 px-4 py-2"
            style={{ border: `1px solid rgba(245,158,11,0.35)`, background: "rgba(245,158,11,0.07)" }}
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
            transition={{ duration: 0.9, delay: 0.1, ease: EASE_OUT }}
            className="font-display font-extrabold leading-none mb-6"
            style={{ fontSize: "clamp(3.2rem, 7.5vw, 7rem)", letterSpacing: "-0.03em", color: T.white }}
          >
            LONDON&apos;S<br />
            <span style={{ color: T.amber }}>EMERGENCY</span><br />
            TRADES<br />
            <span style={{ WebkitTextStroke: `1px ${T.dim}`, color: "transparent" }}>SPECIALISTS.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
            className="font-body text-lg leading-relaxed mb-10 max-w-md"
            style={{ color: T.dim }}
          >
            Plumbing, boilers, gas, and drainage — fixed fast by Gas Safe engineers who turn up when they say they will.
          </motion.p>

          {/* CTAs — Emil: scale(0.97) active, 160ms ease-out */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE_OUT }}
            className="flex flex-col sm:flex-row gap-4 mb-14"
          >
            <a href="tel:08001234567"
              className="font-display font-bold text-sm tracking-widest uppercase px-8 py-4 flex items-center justify-center gap-3"
              style={{
                background: T.amber, color: "#000",
                transition: "background 160ms cubic-bezier(0.23,1,0.32,1), transform 160ms cubic-bezier(0.23,1,0.32,1)",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T.amberDk; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = T.amber; }}
              onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
              onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
            >
              <Icons.Phone /> Call 0800 123 4567
            </a>
            <a href="#contact"
              className="font-display font-bold text-sm tracking-widest uppercase px-8 py-4 flex items-center justify-center gap-3"
              style={{
                border: `1px solid ${T.border}`, color: T.white,
                transition: "border-color 180ms ease-out, color 180ms ease-out, transform 160ms cubic-bezier(0.23,1,0.32,1)",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = T.amber; (e.currentTarget as HTMLElement).style.color = T.amber; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = T.border; (e.currentTarget as HTMLElement).style.color = T.white; }}
              onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
              onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
            >
              Book Online <Icons.ArrowRight />
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE_OUT }}
            className="grid grid-cols-2 md:grid-cols-4 border"
            style={{ borderColor: T.border }}
          >
            {STATS.map(({ value, suffix, label }, i) => (
              <div key={label} className="px-5 py-4 border-r last:border-r-0" style={{ borderColor: T.border }}>
                <p className="font-display font-extrabold text-2xl" style={{ color: T.amber }}>
                  <CountUp target={value} suffix={suffix} />
                </p>
                <p className="font-display text-[9px] tracking-widest uppercase mt-1" style={{ color: T.muted }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-12 animate-pulse" style={{ background: `linear-gradient(to bottom, transparent, ${T.amber})` }} />
        </motion.div>
      </section>

      {/* ── ACCREDITATIONS STRIP ───────────────────────────────────────────── */}
      <div style={{ background: T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {ACCREDITATIONS.map(a => (
            <div key={a} className="flex items-center gap-2">
              <span style={{ color: T.amber }}><Icons.Check /></span>
              <span className="font-display font-semibold text-[10px] tracking-widest uppercase" style={{ color: T.muted }}>{a}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICES ───────────────────────────────────────────────────────── */}
      <section id="services" ref={servicesRef} className="py-28 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={servicesView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="mb-16"
          >
            <p className="font-display font-semibold text-[10px] tracking-widest uppercase mb-3" style={{ color: T.amber }}>What We Fix</p>
            <h2 className="font-display font-extrabold leading-none" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", color: T.white }}>
              OUR SERVICES.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 border" style={{ borderColor: T.border }}>
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                animate={servicesView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.07, ease: EASE_OUT }}
                className="p-8 border-r border-b relative overflow-hidden group"
                style={{ borderColor: T.border, transition: "background 200ms cubic-bezier(0.23,1,0.32,1)" }}
                onMouseEnter={e => (e.currentTarget.style.background = T.cardHov)}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                {/* Amber left border reveal on hover via clip-path */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5"
                  style={{
                    background: T.amber,
                    clipPath: "inset(100% 0 0 0)",
                    transition: "clip-path 220ms cubic-bezier(0.23,1,0.32,1)",
                  }}
                  ref={el => {
                    if (!el) return;
                    const parent = el.parentElement;
                    if (!parent) return;
                    parent.addEventListener("mouseenter", () => { el.style.clipPath = "inset(0 0 0 0)"; });
                    parent.addEventListener("mouseleave", () => { el.style.clipPath = "inset(100% 0 0 0)"; });
                  }}
                />
                <div className="mb-5" style={{ color: T.amber }}><s.Icon /></div>
                <h3 className="font-display font-bold text-base mb-3" style={{ color: T.white }}>{s.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: T.dim }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE & AFTER GALLERY ─────────────────────────────────────────── */}
      <section
        id="gallery"
        className="py-28 px-5 md:px-10"
        style={{ background: T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="mb-16"
          >
            <p className="font-display font-semibold text-[10px] tracking-widest uppercase mb-3" style={{ color: T.amber }}>Real Work</p>
            <h2 className="font-display font-extrabold leading-none mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", color: T.white }}>
              BEFORE &amp; AFTER.
            </h2>
            <p className="font-body text-sm max-w-lg leading-relaxed" style={{ color: T.dim }}>
              Drag the handle left or right on each card to see exactly what we fixed — and how we left it.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {BEFORE_AFTER.map((job, i) => (
              <BeforeAfterSlider key={job.title} job={job} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-28 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="mb-16"
          >
            <p className="font-display font-semibold text-[10px] tracking-widest uppercase mb-3" style={{ color: T.amber }}>Simple Process</p>
            <h2 className="font-display font-extrabold leading-none" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", color: T.white }}>
              HOW IT WORKS.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-0 border" style={{ borderColor: T.border }}>
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE_OUT }}
                className="p-10 border-r last:border-r-0 relative overflow-hidden"
                style={{ borderColor: T.border }}
              >
                {/* Ghost number */}
                <p className="absolute top-6 right-6 font-display font-extrabold select-none pointer-events-none leading-none"
                  style={{ fontSize: "6rem", color: "rgba(245,158,11,0.06)", lineHeight: 1 }}>
                  {step.n}
                </p>
                {/* Amber dot */}
                <div className="w-2 h-2 rounded-full mb-8" style={{ background: T.amber }} />
                <h3 className="font-display font-bold text-lg mb-3" style={{ color: T.white }}>{step.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: T.dim }}>{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ────────────────────────────────────────────────────────── */}
      <section
        id="pricing"
        ref={pricingRef}
        className="py-28 px-5 md:px-10"
        style={{ background: T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={pricingView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="mb-16"
          >
            <p className="font-display font-semibold text-[10px] tracking-widest uppercase mb-3" style={{ color: T.amber }}>Transparent Pricing</p>
            <h2 className="font-display font-extrabold leading-none mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", color: T.white }}>
              CLEAR COSTS.<br />NO SURPRISES.
            </h2>
            <p className="font-body text-sm max-w-lg leading-relaxed" style={{ color: T.dim }}>
              Fixed prices quoted before any work starts. You approve it — then we start.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {PRICING.map((p, i) => (
              <motion.div
                key={p.tier}
                initial={{ opacity: 0, y: 40 }}
                animate={pricingView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE_OUT }}
                className="relative flex flex-col p-8"
                style={{
                  background: p.highlight ? T.card : "transparent",
                  border: `1px solid ${p.highlight ? T.amber : T.border}`,
                  transition: "border-color 200ms ease-out, background 200ms ease-out, transform 180ms cubic-bezier(0.23,1,0.32,1)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  if (!p.highlight) (e.currentTarget as HTMLElement).style.borderColor = T.borderHov;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  if (!p.highlight) (e.currentTarget as HTMLElement).style.borderColor = T.border;
                }}
              >
                {/* Most Popular badge */}
                {p.tag && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="font-display font-bold text-[9px] tracking-widest uppercase px-4 py-1.5"
                      style={{ background: T.amber, color: "#000" }}>
                      {p.tag}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <p className="font-display font-semibold text-[10px] tracking-widest uppercase mb-3" style={{ color: T.muted }}>{p.tier}</p>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="font-display font-extrabold" style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", color: T.white, lineHeight: 1 }}>{p.price}</span>
                    <span className="font-body text-sm mb-2" style={{ color: T.muted }}>{p.unit}</span>
                  </div>
                  <p className="font-body text-xs leading-relaxed" style={{ color: T.dim }}>{p.desc}</p>
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  {p.features.map(f => (
                    <div key={f} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-0.5" style={{ color: T.amber }}><Icons.Check /></span>
                      <span className="font-body text-sm" style={{ color: T.dim }}>{f}</span>
                    </div>
                  ))}
                </div>

                <a href="#contact"
                  className="font-display font-bold text-xs tracking-widest uppercase px-6 py-4 text-center block"
                  style={{
                    background: p.highlight ? T.amber : "transparent",
                    color: p.highlight ? "#000" : T.white,
                    border: p.highlight ? "none" : `1px solid ${T.border}`,
                    transition: "background 160ms cubic-bezier(0.23,1,0.32,1), color 160ms ease-out, border-color 160ms ease-out, transform 160ms cubic-bezier(0.23,1,0.32,1)",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    if (p.highlight) { el.style.background = T.amberDk; }
                    else { el.style.borderColor = T.amber; el.style.color = T.amber; }
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    if (p.highlight) { el.style.background = T.amber; }
                    else { el.style.borderColor = T.border; el.style.color = T.white; }
                  }}
                  onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
                  onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                >
                  {p.cta} <span style={{ marginLeft: 4 }}>→</span>
                </a>
              </motion.div>
            ))}
          </div>

          {/* Finance note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={pricingView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE_OUT }}
            className="text-center font-body text-xs mt-8"
            style={{ color: T.muted }}
          >
            0% finance available on installations over £500. Subject to credit check. All prices include VAT.
          </motion.p>
        </div>
      </section>

      {/* ── REVIEWS ────────────────────────────────────────────────────────── */}
      <section id="reviews" ref={reviewsRef} className="py-28 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={reviewsView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <p className="font-display font-semibold text-[10px] tracking-widest uppercase mb-3" style={{ color: T.amber }}>Customer Reviews</p>
              <h2 className="font-display font-extrabold leading-none" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", color: T.white }}>
                WHAT THEY SAY.
              </h2>
            </div>
            {/* Aggregate score */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div>
                <p className="font-display font-extrabold text-4xl" style={{ color: T.white }}>4.9</p>
                <Stars n={5} />
                <p className="font-body text-xs mt-1" style={{ color: T.muted }}>from 1,400+ reviews</p>
              </div>
              <div className="w-px h-16" style={{ background: T.border }} />
              <div className="space-y-1">
                {[["Google","★ 4.9"],["Trustpilot","★ 4.8"],["Which?","★ 4.9"]].map(([src, score]) => (
                  <div key={src} className="flex items-center gap-2">
                    <span className="font-display font-bold text-[10px] tracking-widest uppercase" style={{ color: T.muted }}>{src}</span>
                    <span className="font-display font-bold text-xs" style={{ color: T.amber }}>{score}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Review grid — 2 cols desktop, Emil: stagger 50ms */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 30 }}
                animate={reviewsView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE_OUT }}
                className="p-7 flex flex-col gap-5"
                style={{ background: T.card, border: `1px solid ${T.border}` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar initial circle */}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-sm"
                      style={{ background: T.amberLt, color: T.amber }}>
                      {r.avatar}
                    </div>
                    <div>
                      <p className="font-display font-bold text-sm" style={{ color: T.white }}>{r.name}</p>
                      <p className="font-display text-[9px] tracking-widest uppercase mt-0.5" style={{ color: T.muted }}>{r.area}, London</p>
                    </div>
                  </div>
                  {/* Source badge */}
                  <span className="font-display font-semibold text-[9px] tracking-widest uppercase px-2 py-1 flex-shrink-0"
                    style={{ border: `1px solid ${T.border}`, color: T.muted }}>
                    {r.source}
                  </span>
                </div>
                <Stars n={r.stars} />
                <p className="font-body text-sm leading-relaxed flex-1" style={{ color: T.dim }}>
                  &ldquo;{r.text}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS FULL-BLEED ───────────────────────────────────────────────── */}
      <section ref={statsRef} className="py-24 px-5 md:px-10" style={{ background: T.amber }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-black/20">
            {STATS.map(({ value, suffix, label }) => (
              <div key={label} className="text-center px-8">
                <p className="font-display font-extrabold leading-none mb-2" style={{ fontSize: "clamp(3rem, 5vw, 5rem)", color: "#000" }}>
                  {statsView ? <CountUp target={value} suffix={suffix} duration={2} /> : "0"}
                </p>
                <p className="font-display font-semibold text-[10px] tracking-widest uppercase" style={{ color: "rgba(0,0,0,0.5)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AREAS ──────────────────────────────────────────────────────────── */}
      <section
        id="areas"
        ref={areasRef}
        className="py-28 px-5 md:px-10"
        style={{ background: T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={areasView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="mb-10"
          >
            <p className="font-display font-semibold text-[10px] tracking-widest uppercase mb-3" style={{ color: T.amber }}>We Cover</p>
            <h2 className="font-display font-extrabold leading-none mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", color: T.white }}>
              AREAS WE SERVE.
            </h2>
            <p className="font-body text-sm max-w-lg leading-relaxed" style={{ color: T.dim }}>
              Based in North London. Covering all major boroughs across the capital within our average 47-minute response time. Call to confirm your postcode.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={areasView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
            className="flex flex-wrap gap-2.5"
          >
            {AREAS.map((a, i) => (
              <motion.span
                key={a}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={areasView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.03, ease: EASE_OUT }}
                className="font-display font-semibold text-[10px] tracking-widest uppercase px-4 py-2.5"
                style={{ border: `1px solid ${T.border}`, color: T.dim, transition: "border-color 180ms ease-out, color 180ms ease-out" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = T.borderHov; (e.currentTarget as HTMLElement).style.color = T.amber; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = T.border; (e.currentTarget as HTMLElement).style.color = T.dim; }}
              >{a}</motion.span>
            ))}
            <span className="font-display font-semibold text-[10px] tracking-widest uppercase px-4 py-2.5"
              style={{ border: `1px solid rgba(245,158,11,0.4)`, color: T.amber }}>
              + Many More
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── EMERGENCY CTA — Full bleed dark ────────────────────────────────── */}
      <section id="contact" className="relative py-28 px-5 md:px-10 overflow-hidden" style={{ background: T.bg }}>
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(245,158,11,0.06) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{ backgroundImage: "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-2"
              style={{ border: `1px solid rgba(239,68,68,0.4)`, background: "rgba(239,68,68,0.07)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.red }} />
              <span className="font-display font-semibold text-[10px] tracking-widest uppercase" style={{ color: T.red }}>
                Emergency Line Open Now
              </span>
            </div>
            <h2 className="font-display font-extrabold leading-none mb-4"
              style={{ fontSize: "clamp(3rem, 9vw, 8rem)", letterSpacing: "-0.04em", color: T.white }}>
              GOT AN<br /><span style={{ color: T.amber }}>EMERGENCY?</span>
            </h2>
            <p className="font-body text-lg max-w-md mx-auto leading-relaxed mb-10" style={{ color: T.dim }}>
              No call-out charge before 10pm. Engineers on standby 24 hours, 7 days a week.
            </p>
            <a href="tel:08001234567"
              className="font-display font-extrabold tracking-widest uppercase inline-flex items-center gap-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", color: T.amber, transition: "color 180ms ease-out" }}
              onMouseEnter={e => (e.currentTarget.style.color = T.white)}
              onMouseLeave={e => (e.currentTarget.style.color = T.amber)}
            >
              <Icons.Phone /> 0800 123 4567
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT FORM ───────────────────────────────────────────────────── */}
      <section className="py-28 px-5 md:px-10" style={{ background: T.surface, borderTop: `1px solid ${T.border}` }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <p className="font-display font-semibold text-[10px] tracking-widest uppercase mb-3" style={{ color: T.amber }}>Quick Quote</p>
            <h2 className="font-display font-extrabold leading-none mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em", color: T.white }}>
              BOOK A VISIT.
            </h2>
            <p className="font-body text-sm leading-relaxed mb-10" style={{ color: T.dim }}>
              Fill in the form and we&apos;ll get back to you within 30 minutes during working hours, or first thing in the morning if after 9pm.
            </p>
            <div className="space-y-6">
              {[
                { label: "24/7 Emergency Line", value: "0800 123 4567", href: "tel:08001234567" },
                { label: "Email Us", value: "hello@swifttrades.co.uk", href: "mailto:hello@swifttrades.co.uk" },
                { label: "Location", value: "Serving All London Boroughs", href: "#areas" },
              ].map(({ label, value, href }) => (
                <div key={label}>
                  <p className="font-display text-[9px] tracking-widest uppercase mb-1" style={{ color: T.muted }}>{label}</p>
                  <a href={href} className="font-body text-sm" style={{ color: T.dim, transition: "color 180ms ease-out" }}
                    onMouseEnter={e => (e.currentTarget.style.color = T.amber)}
                    onMouseLeave={e => (e.currentTarget.style.color = T.dim)}
                  >{value}</a>
                </div>
              ))}
            </div>
            {/* Trust row */}
            <div className="mt-10 pt-8 border-t flex flex-wrap gap-4" style={{ borderColor: T.border }}>
              {ACCREDITATIONS.slice(0, 3).map(a => (
                <div key={a} className="flex items-center gap-1.5">
                  <span style={{ color: T.amber }}><Icons.Check /></span>
                  <span className="font-display text-[9px] tracking-widest uppercase" style={{ color: T.muted }}>{a}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
            className="space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {["Your Name", "Phone Number"].map(ph => (
                <input key={ph} type="text" placeholder={ph}
                  className="w-full px-5 py-4 font-body text-sm focus:outline-none"
                  style={{ background: T.card, border: `1px solid ${T.border}`, color: T.white,
                    transition: "border-color 180ms ease-out" }}
                  onFocus={e => (e.currentTarget.style.borderColor = T.amber)}
                  onBlur={e => (e.currentTarget.style.borderColor = T.border)}
                />
              ))}
            </div>
            <input type="email" placeholder="Email Address"
              className="w-full px-5 py-4 font-body text-sm focus:outline-none"
              style={{ background: T.card, border: `1px solid ${T.border}`, color: T.white,
                transition: "border-color 180ms ease-out" }}
              onFocus={e => (e.currentTarget.style.borderColor = T.amber)}
              onBlur={e => (e.currentTarget.style.borderColor = T.border)}
            />
            <select className="w-full px-5 py-4 font-body text-sm focus:outline-none appearance-none"
              style={{ background: T.card, border: `1px solid ${T.border}`, color: T.muted,
                transition: "border-color 180ms ease-out" }}
              onFocus={e => (e.currentTarget.style.borderColor = T.amber)}
              onBlur={e => (e.currentTarget.style.borderColor = T.border)}
            >
              <option>Service required…</option>
              {SERVICES.map(s => <option key={s.title}>{s.title}</option>)}
            </select>
            <select className="w-full px-5 py-4 font-body text-sm focus:outline-none appearance-none"
              style={{ background: T.card, border: `1px solid ${T.border}`, color: T.muted,
                transition: "border-color 180ms ease-out" }}
              onFocus={e => (e.currentTarget.style.borderColor = T.amber)}
              onBlur={e => (e.currentTarget.style.borderColor = T.border)}
            >
              <option>How urgent is this?</option>
              <option>Emergency — right now</option>
              <option>Today if possible</option>
              <option>Within the next few days</option>
              <option>Just getting a quote</option>
            </select>
            <textarea placeholder="Describe the problem — as much detail helps." rows={4}
              className="w-full px-5 py-4 font-body text-sm focus:outline-none resize-none"
              style={{ background: T.card, border: `1px solid ${T.border}`, color: T.white,
                transition: "border-color 180ms ease-out" }}
              onFocus={e => (e.currentTarget.style.borderColor = T.amber)}
              onBlur={e => (e.currentTarget.style.borderColor = T.border)}
            />
            <button type="button"
              className="w-full font-display font-bold text-sm tracking-widest uppercase py-4"
              style={{
                background: T.amber, color: "#000",
                transition: "background 160ms cubic-bezier(0.23,1,0.32,1), transform 160ms cubic-bezier(0.23,1,0.32,1)",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = T.amberDk)}
              onMouseLeave={e => (e.currentTarget.style.background = T.amber)}
              onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
              onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
            >
              Send Request →
            </button>
            <p className="font-body text-xs text-center" style={{ color: T.muted }}>
              We respond within 30 min during business hours. No spam, ever.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="py-14 px-5 md:px-10" style={{ background: T.bg, borderTop: `1px solid ${T.border}` }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-0.5 h-5 rounded-full" style={{ background: T.amber }} />
                <span className="font-display font-extrabold text-sm tracking-widest uppercase" style={{ color: T.white }}>
                  Swift<span style={{ color: T.amber }}>Trades</span>
                </span>
              </div>
              <p className="font-body text-xs leading-relaxed" style={{ color: T.muted }}>
                London&apos;s trusted emergency trades specialists. Gas Safe registered, fully insured, 12-month guarantee on all work.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                {ACCREDITATIONS.slice(0,3).map(a => (
                  <span key={a} className="font-display text-[8px] tracking-widest uppercase px-2.5 py-1"
                    style={{ border: `1px solid ${T.border}`, color: T.muted }}>
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-16 gap-y-3">
              {[["Services","#services"],["How It Works","#how-it-works"],["Pricing","#pricing"],["Reviews","#reviews"],["Areas","#areas"],["Contact","#contact"],["Privacy Policy","#"],["Terms","#"]].map(([label, href]) => (
                <a key={label} href={href}
                  className="font-display text-[10px] tracking-widest uppercase"
                  style={{ color: T.muted, transition: "color 180ms ease-out" }}
                  onMouseEnter={e => (e.currentTarget.style.color = T.white)}
                  onMouseLeave={e => (e.currentTarget.style.color = T.muted)}
                >{label}</a>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
            style={{ borderTop: `1px solid ${T.border}` }}>
            <p className="font-body text-xs" style={{ color: T.muted }}>
              © 2026 Swift Trades Ltd. Registered in England & Wales. Gas Safe No. 123456.
            </p>
            <a href="https://falcon-designs-agency.vercel.app" target="_blank" rel="noopener noreferrer"
              className="font-display text-[10px] tracking-widest uppercase"
              style={{ color: T.muted, transition: "color 180ms ease-out" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#f97316")}
              onMouseLeave={e => (e.currentTarget.style.color = T.muted)}
            >
              Website by Falcon Designs ↗
            </a>
          </div>
        </div>
      </footer>

      {/* ── MOBILE STICKY EMERGENCY BAR ────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        style={{ background: T.amber, borderTop: `2px solid ${T.amberDk}` }}>
        <a href="tel:08001234567"
          className="flex items-center justify-center gap-3 py-4 font-display font-bold text-sm tracking-widest uppercase"
          style={{ color: "#000" }}>
          <Icons.Phone /> 0800 123 4567 — Emergency Line
        </a>
      </div>
    </div>
  );
}
