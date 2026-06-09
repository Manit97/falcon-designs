"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────────
   DESIGN SYSTEM — Swift Trades v3
   Taste Skill: VARIANCE 8 / MOTION 5 / DENSITY 6
   New palette: Sky blue (water · trust · professional) replacing amber
   Emil Kowalski: clip-path, pointer capture, scale(0.97), custom cubic-bezier
───────────────────────────────────────────────────────────────────────────── */
const T = {
  bg:        "#07101e",
  surface:   "#0b1626",
  card:      "#101f35",
  cardHov:   "#132540",
  blue:      "#0ea5e9",
  blueDk:    "#0284c7",
  blueLt:    "rgba(14,165,233,0.10)",
  white:     "#f0f9ff",
  dim:       "#94a3b8",
  muted:     "#475569",
  border:    "rgba(255,255,255,0.07)",
  borderHov: "rgba(14,165,233,0.4)",
  red:       "#ef4444",
};

const EASE_OUT  = [0.23, 1, 0.32, 1] as const;
const EASE_SOFT = [0.32, 0.72, 0, 1] as const;

/* ─────────────────────────────────────────────────────────────────────────────
   SVG ICONS
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15,18 9,12 15,6"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
  { Icon: Icons.Plumbing,  title: "Plumbing",        desc: "Leaks, burst pipes, taps, toilets, and full bathroom fit-outs. Fixed right, first time." },
  { Icon: Icons.Boiler,    title: "Boiler Repair",   desc: "Gas Safe engineers covering all makes and models. Same-day emergency repair available." },
  { Icon: Icons.Gas,       title: "Gas Services",    desc: "Landlord safety certificates, appliance servicing, and new gas pipework installations." },
  { Icon: Icons.Drainage,  title: "Drainage",        desc: "Blocked drains, CCTV surveys, high-pressure jetting, and drain lining repairs." },
  { Icon: Icons.Heating,   title: "Central Heating", desc: "Radiator installs, power flushing, smart thermostats, complete system replacements." },
  { Icon: Icons.Emergency, title: "24/7 Emergency",  desc: "No call-out surcharge before 10pm. Engineers on standby because breakdowns don't keep office hours." },
];

const STATS = [
  { value: 14,   suffix: "+",    label: "Years Trading" },
  { value: 9200, suffix: "+",    label: "Jobs Completed" },
  { value: 4.9,  suffix: "★",    label: "Average Rating" },
  { value: 47,   suffix: " min", label: "Avg. Response" },
];

/* Sticky process steps — adapted from StickyFeatureSection */
const PROCESS_STEPS = [
  {
    n: "01",
    title: "Call or Book Online",
    body: "Ring 0800 123 4567 any time, or use the quick-book form below. We confirm your slot within minutes — no waiting on hold, no automated menus.",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    bg: "#e0f2fe",
    accent: "#0284c7",
  },
  {
    n: "02",
    title: "Engineer Arrives On Time",
    body: "A fully-qualified, DBS-checked, Gas Safe registered engineer arrives stocked with parts. 97% first-fix rate — most jobs sorted in a single visit.",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop",
    bg: "#f0f9ff",
    accent: "#0369a1",
  },
  {
    n: "03",
    title: "Job Done. Guaranteed.",
    body: "We tidy up, issue all required certificates, and every repair carries our 12-month parts and labour guarantee. You get a full written report within 24 hours.",
    imageUrl: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=2073&auto=format&fit=crop",
    bg: "#e8f4fd",
    accent: "#0284c7",
  },
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
  { name: "Sarah M.",   area: "Hackney",    stars: 5, source: "Google",     avatar: "SM", text: "Boiler packed in at 9pm on a Friday. Swift Trades had an engineer with me by 10:30 and fixed it within the hour. Genuinely impressed — and the price was completely fair." },
  { name: "James T.",   area: "Islington",  stars: 5, source: "Trustpilot", avatar: "JT", text: "Used them for a full bathroom plumbing refit. Tidy, professional, finished on time and half the price I was quoted elsewhere. Already booked them for the kitchen." },
  { name: "Priya K.",   area: "Camden",     stars: 5, source: "Google",     avatar: "PK", text: "Blocked drain sorted in under 20 minutes. Text confirmation, arrived early, cleaned up after themselves. Exactly what you want from a trades company." },
  { name: "Michael R.", area: "Wandsworth", stars: 5, source: "Trustpilot", avatar: "MR", text: "Been on the monthly protection plan for 8 months. Had one call-out — engineer arrived in 25 minutes at 7am on a Sunday. Extraordinary service, worth every penny." },
  { name: "Lucy H.",    area: "Barnet",     stars: 5, source: "Google",     avatar: "LH", text: "New boiler installed start to finish in one day. Team was respectful of the house, left everything spotless. The finance option made it completely manageable." },
  { name: "David O.",   area: "Southwark",  stars: 5, source: "Which?",     avatar: "DO", text: "Annual boiler service and they found a carbon monoxide issue I had no idea about. Could have been serious. Cannot recommend highly enough." },
];

/* Testimonial carousel data — adapted from REVIEWS with real quote photos */
const SQRT_5000 = Math.sqrt(5000);
interface TItem { tempId: number; testimonial: string; by: string; imgSrc: string; }
const TESTIMONIALS: TItem[] = [
  { tempId: 0, testimonial: "Boiler packed in at 9pm on a Friday. Engineer arrived by 10:30 and fixed it within the hour. Genuinely impressed — and the price was completely fair.", by: "Sarah M., Hackney", imgSrc: "https://i.pravatar.cc/150?img=1" },
  { tempId: 1, testimonial: "Full bathroom plumbing refit. Tidy, professional, finished on time and half the price I was quoted elsewhere. Already booked them for the kitchen.", by: "James T., Islington", imgSrc: "https://i.pravatar.cc/150?img=2" },
  { tempId: 2, testimonial: "Blocked drain sorted in under 20 minutes. Text confirmation, arrived early, cleaned up after themselves. Exactly what you want from a trades company.", by: "Priya K., Camden", imgSrc: "https://i.pravatar.cc/150?img=3" },
  { tempId: 3, testimonial: "Been on the monthly plan 8 months. Had one call-out — engineer arrived in 25 minutes at 7am on a Sunday. Extraordinary service, worth every penny.", by: "Michael R., Wandsworth", imgSrc: "https://i.pravatar.cc/150?img=4" },
  { tempId: 4, testimonial: "New boiler installed start to finish in one day. Left everything spotless. The 0% finance option made it completely manageable.", by: "Lucy H., Barnet", imgSrc: "https://i.pravatar.cc/150?img=5" },
  { tempId: 5, testimonial: "Found a carbon monoxide issue during the annual service that I had no idea about. Could have been serious. Cannot recommend highly enough.", by: "David O., Southwark", imgSrc: "https://i.pravatar.cc/150?img=6" },
  { tempId: 6, testimonial: "Leaking radiator called in at 8am, engineer arrived by 10, fixed and gone by 11. No fuss, no mess. Exactly the kind of service you hope for.", by: "Emma W., Haringey", imgSrc: "https://i.pravatar.cc/150?img=7" },
  { tempId: 7, testimonial: "Gas safety certificate done quickly and professionally. Got the digital copy within minutes. Landlord inspections have never been this painless.", by: "Tom B., Lewisham", imgSrc: "https://i.pravatar.cc/150?img=8" },
  { tempId: 8, testimonial: "Had them fit a full new bathroom suite over two days. Excellent quality finish, tidy workers, and genuinely great value. Already recommended to three neighbours.", by: "Rachel K., Ealing", imgSrc: "https://i.pravatar.cc/150?img=9" },
  { tempId: 9,  testimonial: "Dripping tap turned out to be a faulty pressure valve. Diagnosed and fixed in under an hour. Saved me from what could have been a serious flood.", by: "Mark P., Enfield", imgSrc: "https://i.pravatar.cc/150?img=10" },
  { tempId: 10, testimonial: "Power flush on the central heating has made a huge difference. Three radiators that never got warm are finally working. Worth every penny.", by: "Claire S., Brent", imgSrc: "https://i.pravatar.cc/150?img=11" },
  { tempId: 11, testimonial: "Yearly boiler service done properly for once. Engineer checked the flue thoroughly, explained every reading. First time I've actually felt confident in the result.", by: "Ben A., Tower Hamlets", imgSrc: "https://i.pravatar.cc/150?img=12" },
  { tempId: 12, testimonial: "Emergency drainage call at 11pm. Out-of-hours but no surcharge before 10pm so it was actually affordable. Professional, fast, and sorted first visit.", by: "Fatima N., Newham", imgSrc: "https://i.pravatar.cc/150?img=13" },
];

function TestimonialCard({ position, item, onMove, cardSize }: {
  position: number; item: TItem; onMove: (n: number) => void; cardSize: number;
}) {
  const isCenter = position === 0;
  return (
    <div
      onClick={() => onMove(position)}
      className="absolute left-1/2 top-1/2 cursor-pointer"
      style={{
        width: cardSize, height: cardSize,
        padding: 28,
        background: isCenter ? T.blue : T.card,
        border: `2px solid ${isCenter ? T.blue : T.border}`,
        clipPath: "polygon(44px 0%,calc(100% - 44px) 0%,100% 44px,100% 100%,calc(100% - 44px) 100%,44px 100%,0 100%,0 0)",
        transform: `translate(-50%,-50%) translateX(${(cardSize / 1.5) * position}px) translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px) rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)`,
        boxShadow: isCenter ? `0 8px 0 4px ${T.surface}` : "none",
        zIndex: isCenter ? 10 : 0,
        transition: "transform 500ms cubic-bezier(0.32,0.72,0,1), background 300ms ease, border-color 300ms ease, box-shadow 300ms ease",
      }}
    >
      {/* Cut-corner diagonal line */}
      <span className="absolute block origin-top-right rotate-45" style={{
        right: -2, top: 44,
        width: SQRT_5000, height: 2,
        background: isCenter ? "rgba(0,0,0,0.15)" : T.border,
      }} />
      <img
        src={item.imgSrc} alt={item.by.split(",")[0]} loading="lazy"
        className="mb-4 object-cover object-top"
        style={{ width: 48, height: 56, background: T.surface, boxShadow: `3px 3px 0 ${isCenter ? T.blueDk : T.bg}` }}
      />
      <p className="font-body text-sm sm:text-base leading-relaxed font-medium" style={{ color: isCenter ? "#000" : T.white }}>
        &ldquo;{item.testimonial}&rdquo;
      </p>
      <p className="absolute font-body text-xs italic" style={{ bottom: 28, left: 28, right: 28, color: isCenter ? "rgba(0,0,0,0.55)" : T.dim }}>
        — {item.by}
      </p>
    </div>
  );
}

function StaggerTestimonials() {
  const [cardSize, setCardSize] = useState(365);
  const [list, setList] = useState(TESTIMONIALS);

  const handleMove = useCallback((steps: number) => {
    setList(prev => {
      const next = [...prev];
      if (steps > 0) {
        for (let i = 0; i < steps; i++) {
          const item = next.shift(); if (!item) break;
          next.push({ ...item, tempId: Math.random() });
        }
      } else {
        for (let i = 0; i > steps; i--) {
          const item = next.pop(); if (!item) break;
          next.unshift({ ...item, tempId: Math.random() });
        }
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const update = () => setCardSize(window.matchMedia("(min-width: 640px)").matches ? 365 : 290);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 620, background: "#f8fafc", borderTop: "1px solid rgba(14,165,233,0.15)" }}>
      {list.map((item, index) => {
        /* Math.floor(n/2) gives true symmetric centre for any n.
           With 13 items → mid=6, positions -6…+6.
           (cardSize/1.5)*6 ≈ 1460px from centre — fully off-screen.
           Recycled card always appears off-screen → no visible pop. */
        const mid = Math.floor(list.length / 2);
        const position = index - mid;
        return <TestimonialCard key={item.tempId} item={item} onMove={handleMove} position={position} cardSize={cardSize} />;
      })}
      {/* Navigation — Emil: scale(0.97) active, 160ms custom cubic-bezier */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {([[-1, "Previous", Icons.ChevronLeft], [1, "Next", Icons.ChevronRight]] as const).map(([step, label, Icon]) => (
          <button key={label} onClick={() => handleMove(step)} aria-label={`${label} testimonial`}
            className="flex items-center justify-center"
            style={{ width: 56, height: 56, background: T.card, border: `2px solid ${T.border}`, color: T.white, transition: "background 160ms cubic-bezier(0.23,1,0.32,1), color 160ms ease-out, transform 160ms cubic-bezier(0.23,1,0.32,1)" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = T.blue; el.style.color = "#000"; el.style.borderColor = T.blue; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = T.card; el.style.color = T.white; el.style.borderColor = T.border; }}
            onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
            onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
          ><Icon /></button>
        ))}
      </div>
    </div>
  );
}

const BEFORE_AFTER = [
  {
    title: "Burst Pipe Repair",
    location: "Kitchen — Hackney",
    before: { label: "BEFORE", bg: "linear-gradient(135deg, #2d1810 0%, #4a2218 40%, #3d1a0e 100%)", detail: "Ceiling collapse from burst 22mm copper pipe. Active flooding." },
    after:  { label: "AFTER",  bg: "linear-gradient(135deg, #061a30 0%, #0b2d50 40%, #071e38 100%)", detail: "Full repair, replastered, painted. 1-year guarantee." },
  },
  {
    title: "Bathroom Renovation",
    location: "En-suite — Islington",
    before: { label: "BEFORE", bg: "linear-gradient(135deg, #1e1810 0%, #382d18 40%, #2d2210 100%)", detail: "1980s avocado suite. Cracked tiles, outdated pipework, leaking." },
    after:  { label: "AFTER",  bg: "linear-gradient(135deg, #061828 0%, #0b2a45 40%, #07192e 100%)", detail: "Full modern refit. Walk-in shower, underfloor heating, 5-year guarantee." },
  },
  {
    title: "Boiler Replacement",
    location: "Utility Room — Barnet",
    before: { label: "BEFORE", bg: "linear-gradient(135deg, #221510 0%, #3d2418 40%, #2a1a0d 100%)", detail: "18-year-old unit. 40% efficiency. Constant breakdowns." },
    after:  { label: "AFTER",  bg: "linear-gradient(135deg, #051424 0%, #092240 40%, #061830 100%)", detail: "A-rated Worcester Bosch 36kW. 97% efficiency. 10-year warranty." },
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
    <div className="flex gap-0.5" style={{ color: T.blue }}>
      {Array.from({ length: n }).map((_, i) => <Icons.Star key={i} />)}
    </div>
  );
}

function CountUp({ target, suffix, duration = 1.8 }: { target: number; suffix: string; duration?: number }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const numRef       = useRef<HTMLSpanElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-40px" });
  const rafId  = useRef(0);
  const isDecimal = target % 1 !== 0;
  const finalNum  = String(target);

  useEffect(() => {
    const el = numRef.current;
    if (!inView || !el) return;
    cancelAnimationFrame(rafId.current);
    const startTime = performance.now();

    const tick = (now: number) => {
      const t       = Math.min((now - startTime) / (duration * 1000), 1);
      const val     = target * t;
      const rounded = isDecimal ? Math.round(val * 10) / 10 : Math.round(val);
      /* Only write the NUMBER — suffix is a separate static span, never moves */
      el.textContent = t >= 1 ? finalNum : String(rounded);
      if (t < 1) rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [inView, target, duration, isDecimal, finalNum]);

  /*
   * Number and suffix split into separate spans.
   * — suffix never changes → never shifts
   * — number uses inline-grid ghost trick → container width fixed at final value
   * — tabular-nums on both spans → every digit identical width → no per-frame shift
   */
  return (
    <span ref={containerRef} style={{ display: "inline-flex", alignItems: "baseline" }}>
      <span style={{ display: "inline-grid" }}>
        {/* Ghost reserves exact width of final number permanently */}
        <span style={{ gridArea: "1/1", visibility: "hidden", pointerEvents: "none", fontVariantNumeric: "tabular-nums" }} aria-hidden="true">
          {finalNum}
        </span>
        {/* Animated number — tabular-nums keeps digit widths identical every frame */}
        <span ref={numRef} style={{ gridArea: "1/1", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
          0
        </span>
      </span>
      {/* Suffix is static — completely outside the animated span, never moves */}
      <span>{suffix}</span>
    </span>
  );
}

/* Before/After Slider — Emil: clip-path + pointer capture */
function BeforeAfterSlider({ job, index }: { job: typeof BEFORE_AFTER[0]; index: number }) {
  const [pos, setPos] = useState(50);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos(Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100)));
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

  const onPointerUp = useCallback(() => { isDragging.current = false; }, []);
  const onClick = useCallback((e: React.MouseEvent) => { if (!isDragging.current) updatePos(e.clientX); }, [updatePos]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: index * 0.1, ease: EASE_OUT }}>
      <div className="mb-4">
        <p className="font-display font-bold text-base" style={{ color: T.white }}>{job.title}</p>
        <p className="font-body text-xs mt-1" style={{ color: T.muted }}>{job.location}</p>
      </div>
      <div ref={containerRef} className="relative select-none overflow-hidden cursor-ew-resize" style={{ aspectRatio: "16/10" }} onClick={onClick}>
        <div className="absolute inset-0 flex flex-col justify-end p-5" style={{ background: job.before.bg }}>
          <span className="font-display font-bold text-[9px] tracking-widest uppercase px-2 py-1 self-start mb-2" style={{ background: "rgba(239,68,68,0.85)", color: "#fff" }}>{job.before.label}</span>
          <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "60%" }}>{job.before.detail}</p>
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-5" style={{ background: job.after.bg, clipPath: `inset(0 ${100 - pos}% 0 0)`, transition: isDragging.current ? "none" : "clip-path 80ms ease-out" }}>
          <span className="font-display font-bold text-[9px] tracking-widest uppercase px-2 py-1 self-start mb-2" style={{ background: "rgba(34,197,94,0.85)", color: "#fff" }}>{job.after.label}</span>
          <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "60%" }}>{job.after.detail}</p>
        </div>
        <div className="absolute top-0 bottom-0 z-20 flex items-center justify-center" style={{ left: `${pos}%`, transform: "translateX(-50%)", touchAction: "none" }} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
          <div className="absolute top-0 bottom-0 w-px" style={{ background: "rgba(255,255,255,0.9)" }} />
          <div className="relative z-10 flex items-center justify-center gap-0.5 w-10 h-10 rounded-full shadow-xl" style={{ background: T.white }}>
            <Icons.ChevronLeft /><Icons.ChevronRight />
          </div>
        </div>
        {pos === 50 && (
          <div className="absolute top-4 right-4 pointer-events-none">
            <p className="font-display text-[9px] tracking-widest uppercase px-2 py-1" style={{ background: "rgba(0,0,0,0.5)", color: "rgba(255,255,255,0.6)" }}>Drag to compare</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* CTA button — Emil: scale(0.97) active, 160ms custom cubic-bezier */
function Btn({ href, primary, children }: { href: string; primary?: boolean; children: React.ReactNode }) {
  return (
    <a href={href}
      className="font-display font-bold text-sm tracking-widest uppercase px-8 py-4 flex items-center justify-center gap-3"
      style={{
        background: primary ? T.blue : "transparent",
        color: primary ? "#000" : T.white,
        border: primary ? "none" : `1px solid ${T.border}`,
        transition: "background 160ms cubic-bezier(0.23,1,0.32,1), color 160ms ease-out, border-color 160ms ease-out, transform 160ms cubic-bezier(0.23,1,0.32,1)",
      }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; if (primary) el.style.background = T.blueDk; else { el.style.borderColor = T.blue; el.style.color = T.blue; } }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; if (primary) el.style.background = T.blue; else { el.style.borderColor = T.border; el.style.color = T.white; } }}
      onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
      onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
    >{children}</a>
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
    <header className="fixed top-0 left-0 right-0 z-50" style={{
      background: scrolled ? "rgba(7,16,30,0.97)" : "rgba(7,16,30,0.5)",
      backdropFilter: "blur(20px)",
      borderBottom: `1px solid ${scrolled ? T.border : "transparent"}`,
      transition: "background 300ms cubic-bezier(0.23,1,0.32,1), border-color 300ms cubic-bezier(0.23,1,0.32,1)",
    }}>
      <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-0.5 h-5 rounded-full" style={{ background: T.blue }} />
          <span className="font-display font-extrabold text-sm tracking-widest uppercase" style={{ color: T.white }}>
            Swift<span style={{ color: T.blue }}>Trades</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {[["Services","#services"],["Process","#process"],["Pricing","#pricing"],["Reviews","#reviews"],["Areas","#areas"]].map(([label, href]) => (
            <a key={label} href={href} className="font-body text-sm" style={{ color: T.dim, transition: "color 180ms ease-out" }}
              onMouseEnter={e => (e.currentTarget.style.color = T.white)} onMouseLeave={e => (e.currentTarget.style.color = T.dim)}>{label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="tel:08001234567" className="hidden sm:flex items-center gap-2">
            <Icons.Phone />
            <span className="font-display font-bold text-sm" style={{ color: T.blue }}>0800 123 4567</span>
          </a>
          <a href="#contact"
            className="font-display font-bold text-xs tracking-widest uppercase px-5 py-2.5"
            style={{ background: T.blue, color: "#000", transition: "background 160ms cubic-bezier(0.23,1,0.32,1), transform 160ms cubic-bezier(0.23,1,0.32,1)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T.blueDk; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = T.blue; }}
            onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
            onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
          >Get a Quote</a>
        </div>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────────────────── */
export default function SwiftTradesPage() {
  const servicesRef = useRef(null);
  const pricingRef  = useRef(null);
  const reviewsRef  = useRef(null);
  const areasRef    = useRef(null);
  const statsRef    = useRef(null);
  const servicesView = useInView(servicesRef, { once: true, margin: "-60px" });
  const pricingView  = useInView(pricingRef,  { once: true, margin: "-60px" });
  const reviewsView  = useInView(reviewsRef,  { once: true, margin: "-60px" });
  const areasView    = useInView(areasRef,    { once: true, margin: "-60px" });
  const statsView    = useInView(statsRef,    { once: true, margin: "-40px" });

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = "auto"; };
  }, []);

  return (
    <div style={{ background: T.bg, color: T.white, minHeight: "100vh" }} className="font-body">
      <SiteHeader />

      {/* ── HERO — Split: brand name left / sky blue angled panel right ────────
          Taste Skill: VARIANCE 8 / MOTION 4. Brand name as anchor. No grid,
          no decorative patterns — the angled colour block is the visual.
          Emil: overflow+clip text reveal (entrance only, seen once). No infinite
          animations. Buttons have scale(0.97) active.
      ─────────────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Sky blue right panel — solid colour, angled left edge, bleeds to edge */}
        <div className="hidden md:block absolute top-0 right-0 h-full" style={{
          width: "44%",
          background: T.blue,
          clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0% 100%)",
        }}>
          {/* "24/7" watermark — large, barely visible, purely decorative */}
          <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
            <p className="font-display font-extrabold leading-none"
              style={{ fontSize: "clamp(8rem, 20vw, 22rem)", color: "rgba(0,0,0,0.08)", letterSpacing: "-0.05em" }}>
              24/7
            </p>
          </div>
          {/* Trust panel — bottom of the blue section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: EASE_OUT }}
            className="absolute bottom-16 left-16 right-8 space-y-5"
          >
            {[
              { value: "97%",       label: "First-fix rate" },
              { value: "Gas Safe",  label: "Registered engineers" },
              { value: "12 months", label: "Parts & labour guarantee" },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-3">
                <span className="font-display font-extrabold text-xl" style={{ color: "rgba(0,0,0,0.8)" }}>{value}</span>
                <span className="font-body text-sm" style={{ color: "rgba(0,0,0,0.45)" }}>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Left content — 58% width on desktop, full width on mobile */}
        <div className="relative z-10 w-full md:w-[58%] px-5 md:pl-10 lg:pl-20 pt-28 pb-16">

          {/* Emergency badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="inline-flex items-center gap-2.5 mb-10 px-4 py-2"
            style={{ border: `1px solid rgba(239,68,68,0.4)`, background: "rgba(239,68,68,0.07)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.red }} />
            <span className="font-display font-semibold text-[10px] tracking-widest uppercase" style={{ color: T.red }}>
              Emergency Engineers On Standby
            </span>
          </motion.div>

          {/* Brand name — text reveal via overflow:hidden clip (Emil technique) */}
          <div className="overflow-hidden mb-1">
            <motion.p
              initial={{ y: "110%" }} animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: EASE_OUT }}
              className="font-display font-extrabold leading-none"
              style={{ fontSize: "clamp(4rem, 11vw, 10rem)", letterSpacing: "-0.04em", color: T.white }}
            >SWIFT</motion.p>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.p
              initial={{ y: "110%" }} animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease: EASE_OUT }}
              className="font-display font-extrabold leading-none"
              style={{ fontSize: "clamp(4rem, 11vw, 10rem)", letterSpacing: "-0.04em", color: T.blue }}
            >TRADES</motion.p>
          </div>

          {/* Rule — slides in from left */}
          <motion.div className="h-px mb-8"
            initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE_OUT }}
            style={{ background: `linear-gradient(to right, ${T.blue}, transparent)` }}
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE_OUT }}
            className="font-body text-lg leading-relaxed mb-4 max-w-md"
            style={{ color: T.dim }}
          >
            London&apos;s Gas Safe registered emergency plumbers. Plumbing, boilers, gas, and drainage — fixed fast.
          </motion.p>

          {/* Phone number — prominent but supporting, not the headline */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.58, ease: EASE_OUT }}
            className="flex items-center gap-3 mb-8"
          >
            <span style={{ color: T.blue }}><Icons.Phone /></span>
            <a href="tel:08001234567"
              className="font-display font-bold"
              style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", color: T.blue, letterSpacing: "-0.02em", transition: "color 180ms ease-out" }}
              onMouseEnter={e => (e.currentTarget.style.color = T.white)}
              onMouseLeave={e => (e.currentTarget.style.color = T.blue)}
            >0800 123 4567</a>
            <span className="font-display text-[9px] tracking-widest uppercase px-2 py-1"
              style={{ background: "rgba(239,68,68,0.12)", color: T.red, border: `1px solid rgba(239,68,68,0.3)` }}>
              No charge before 10pm
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: EASE_OUT }}
            className="flex flex-col sm:flex-row gap-4 mb-14"
          >
            <Btn href="tel:08001234567" primary><Icons.Phone /> Call Now</Btn>
            <Btn href="#contact">Book Online <Icons.ArrowRight /></Btn>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: EASE_OUT }}
            className="grid grid-cols-2 md:grid-cols-4 border"
            style={{ borderColor: T.border }}
          >
            {STATS.map(({ value, suffix, label }) => (
              <div key={label} className="px-6 py-5 border-r last:border-r-0" style={{ borderColor: T.border }}>
                <p className="font-display font-extrabold text-2xl" style={{ color: T.blue }}>
                  <CountUp target={value} suffix={suffix} />
                </p>
                <p className="font-display text-[9px] tracking-widest uppercase mt-1" style={{ color: T.muted }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
          <div className="w-px h-12" style={{ background: `linear-gradient(to bottom, transparent, ${T.blue})` }} />
        </motion.div>
      </section>

      {/* ── ACCREDITATIONS STRIP ───────────────────────────────────────────── */}
      <div style={{ background: T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {ACCREDITATIONS.map(a => (
            <div key={a} className="flex items-center gap-2">
              <span style={{ color: T.blue }}><Icons.Check /></span>
              <span className="font-display font-semibold text-[10px] tracking-widest uppercase" style={{ color: T.muted }}>{a}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICES ───────────────────────────────────────────────────────── */}
      <section id="services" ref={servicesRef} className="py-28 px-5 md:px-10" style={{ background: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={servicesView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: EASE_OUT }} className="mb-16">
            <p className="font-display font-semibold text-[10px] tracking-widest uppercase mb-3" style={{ color: "#0284c7" }}>What We Fix</p>
            <h2 className="font-display font-extrabold leading-none" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", color: "#0f172a" }}>OUR <span style={{ color: "#0ea5e9" }}>SERVICES.</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 border" style={{ borderColor: "rgba(14,165,233,0.15)" }}>
            {SERVICES.map((s, i) => (
              <motion.div key={s.title}
                initial={{ opacity: 0, y: 30 }} animate={servicesView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.07, ease: EASE_OUT }}
                className="p-8 border-r border-b relative overflow-hidden"
                style={{ borderColor: "rgba(14,165,233,0.15)", background: "#fff", transition: "background 200ms cubic-bezier(0.23,1,0.32,1)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#e0f2fe")}
                onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
              >
                {/* Clip-path left border reveal on hover — Emil technique */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: "#0ea5e9", clipPath: "inset(100% 0 0 0)", transition: "clip-path 220ms cubic-bezier(0.23,1,0.32,1)" }}
                  ref={el => {
                    if (!el) return;
                    const p = el.parentElement;
                    if (!p) return;
                    p.addEventListener("mouseenter", () => { el.style.clipPath = "inset(0 0 0 0)"; });
                    p.addEventListener("mouseleave", () => { el.style.clipPath = "inset(100% 0 0 0)"; });
                  }}
                />
                <div className="mb-5" style={{ color: "#0ea5e9" }}><s.Icon /></div>
                <h3 className="font-display font-bold text-base mb-3" style={{ color: "#0f172a" }}>{s.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#475569" }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE & AFTER ─────────────────────────────────────────────────── */}
      <section id="gallery" className="py-28 px-5 md:px-10" style={{ background: T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease: EASE_OUT }} className="mb-16">
            <p className="font-display font-semibold text-[10px] tracking-widest uppercase mb-3" style={{ color: T.blue }}>Real Work</p>
            <h2 className="font-display font-extrabold leading-none mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", color: T.white }}>BEFORE &amp; AFTER.</h2>
            <p className="font-body text-sm max-w-lg leading-relaxed" style={{ color: T.dim }}>Drag the handle on each card to see exactly what we fixed — and how we left it.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {BEFORE_AFTER.map((job, i) => <BeforeAfterSlider key={job.title} job={job} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — Sticky stacking cards ───────────────────────────
          Adapted from StickyFeatureSection component.
          Light section creates contrast against the dark page.
          Cards stack via CSS position:sticky as the user scrolls.
      ─────────────────────────────────────────────────────────────────────── */}
      <section id="process" style={{ background: "#f8fafc" }}>
        <div className="px-[5%]">
          <div className="max-w-7xl mx-auto">
            <div className="py-24 md:py-32 flex flex-col items-center">

              {/* Section header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
                className="text-center max-w-2xl mx-auto mb-20"
              >
                <p className="font-display font-semibold text-[10px] tracking-widest uppercase mb-4" style={{ color: "#0284c7" }}>
                  Simple Process
                </p>
                <h2 className="font-display font-extrabold leading-none mb-5"
                  style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", letterSpacing: "-0.03em", color: "#0f172a" }}>
                  THREE STEPS.<br />
                  <span style={{ color: "#0ea5e9" }}>ZERO HASSLE.</span>
                </h2>
                <p className="font-body text-base leading-relaxed" style={{ color: "#64748b" }}>
                  From your first call to a signed-off job — here&apos;s exactly what happens.
                </p>
              </motion.div>

              {/* Sticky cards container */}
              <div className="w-full space-y-0">
                {PROCESS_STEPS.map((step, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-12 p-8 md:p-12 rounded-2xl mb-8 sticky"
                    style={{
                      top: `${100 + index * 24}px`,
                      background: step.bg,
                      border: `1px solid rgba(14,165,233,0.15)`,
                      boxShadow: "0 4px 40px rgba(14,165,233,0.08), 0 1px 0 rgba(255,255,255,0.8) inset",
                    }}
                  >
                    {/* Text */}
                    <div className="flex flex-col justify-center">
                      {/* Step number */}
                      <p className="font-display font-extrabold mb-4 leading-none select-none"
                        style={{ fontSize: "5rem", color: "rgba(14,165,233,0.15)", lineHeight: 1 }}>
                        {step.n}
                      </p>
                      <h3 className="font-display font-extrabold mb-4"
                        style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "-0.02em", color: "#0f172a" }}>
                        {step.title}
                      </h3>
                      <p className="font-body text-base leading-relaxed" style={{ color: "#475569" }}>
                        {step.body}
                      </p>
                      {/* Inline trust detail */}
                      <div className="flex items-center gap-2 mt-6">
                        <span style={{ color: step.accent }}><Icons.Check /></span>
                        <span className="font-display font-semibold text-[10px] tracking-widest uppercase" style={{ color: step.accent }}>
                          {index === 0 && "Confirmed within minutes"}
                          {index === 1 && "97% first-fix rate"}
                          {index === 2 && "12-month guarantee included"}
                        </span>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="overflow-hidden rounded-xl shadow-lg" style={{ aspectRatio: "4/3" }}>
                      <img
                        src={step.imageUrl}
                        alt={step.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        style={{ transition: "transform 400ms cubic-bezier(0.23,1,0.32,1)" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                        onError={e => { (e.currentTarget as HTMLImageElement).src = "https://placehold.co/600x400/e0f2fe/0284c7?text=Step+Image"; }}
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ────────────────────────────────────────────────────────── */}
      <section id="pricing" ref={pricingRef} className="py-28 px-5 md:px-10" style={{ background: T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={pricingView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: EASE_OUT }} className="mb-16">
            <p className="font-display font-semibold text-[10px] tracking-widest uppercase mb-3" style={{ color: T.blue }}>Transparent Pricing</p>
            <h2 className="font-display font-extrabold leading-none mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", color: T.white }}>CLEAR COSTS.<br />NO SURPRISES.</h2>
            <p className="font-body text-sm max-w-lg leading-relaxed" style={{ color: T.dim }}>Fixed prices quoted before any work starts. You approve it — then we start.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {PRICING.map((p, i) => (
              <motion.div key={p.tier}
                initial={{ opacity: 0, y: 40 }} animate={pricingView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE_OUT }}
                className="relative flex flex-col p-8"
                style={{ background: p.highlight ? T.card : "transparent", border: `1px solid ${p.highlight ? T.blue : T.border}`, transition: "border-color 200ms ease-out, background 200ms ease-out, transform 180ms cubic-bezier(0.23,1,0.32,1)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; if (!p.highlight) (e.currentTarget as HTMLElement).style.borderColor = T.borderHov; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; if (!p.highlight) (e.currentTarget as HTMLElement).style.borderColor = T.border; }}
              >
                {p.tag && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="font-display font-bold text-[9px] tracking-widest uppercase px-4 py-1.5" style={{ background: T.blue, color: "#000" }}>{p.tag}</span>
                  </div>
                )}
                <div className="mb-6">
                  <p className="font-display font-semibold text-[10px] tracking-widest uppercase mb-3" style={{ color: T.muted }}>{p.tier}</p>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="font-display font-extrabold leading-none" style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", color: T.white }}>{p.price}</span>
                    <span className="font-body text-sm mb-2" style={{ color: T.muted }}>{p.unit}</span>
                  </div>
                  <p className="font-body text-xs leading-relaxed" style={{ color: T.dim }}>{p.desc}</p>
                </div>
                <div className="space-y-3 mb-8 flex-1">
                  {p.features.map(f => (
                    <div key={f} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-0.5" style={{ color: T.blue }}><Icons.Check /></span>
                      <span className="font-body text-sm" style={{ color: T.dim }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href="#contact"
                  className="font-display font-bold text-xs tracking-widest uppercase px-6 py-4 text-center block"
                  style={{ background: p.highlight ? T.blue : "transparent", color: p.highlight ? "#000" : T.white, border: p.highlight ? "none" : `1px solid ${T.border}`, transition: "background 160ms cubic-bezier(0.23,1,0.32,1), color 160ms ease-out, border-color 160ms ease-out, transform 160ms cubic-bezier(0.23,1,0.32,1)" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; if (p.highlight) el.style.background = T.blueDk; else { el.style.borderColor = T.blue; el.style.color = T.blue; } }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; if (p.highlight) el.style.background = T.blue; else { el.style.borderColor = T.border; el.style.color = T.white; } }}
                  onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
                  onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                >{p.cta} →</a>
              </motion.div>
            ))}
          </div>
          <motion.p initial={{ opacity: 0 }} animate={pricingView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="text-center font-body text-xs mt-8" style={{ color: T.muted }}>
            0% finance available on installations over £500. All prices include VAT.
          </motion.p>
        </div>
      </section>

      {/* ── REVIEWS — Stagger carousel ─────────────────────────────────────── */}
      <section id="reviews" ref={reviewsRef}>
        {/* Header row — padded */}
        <div className="py-16 px-5 md:px-10" style={{ background: T.bg }}>
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={reviewsView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: EASE_OUT }} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="font-display font-semibold text-[10px] tracking-widest uppercase mb-3" style={{ color: T.blue }}>Customer Reviews</p>
                <h2 className="font-display font-extrabold leading-none" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", color: T.white }}>WHAT THEY SAY.</h2>
              </div>
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
                      <span className="font-display font-bold text-xs" style={{ color: T.blue }}>{score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Full-width stagger carousel — no horizontal padding */}
        <StaggerTestimonials />
      </section>

      {/* ── STATS FULL-BLEED ───────────────────────────────────────────────── */}
      <section ref={statsRef} className="py-24 px-5 md:px-10" style={{ background: T.blue }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x" style={{ borderColor: "rgba(0,0,0,0.15)" }}>
            {STATS.map(({ value, suffix, label }) => (
              <div key={label} className="text-center px-8">
                <p className="font-display font-extrabold leading-none mb-2" style={{ fontSize: "clamp(3rem, 5vw, 5rem)", color: "#000" }}>
                  <CountUp target={value} suffix={suffix} duration={2} />
                </p>
                <p className="font-display font-semibold text-[10px] tracking-widest uppercase" style={{ color: "rgba(0,0,0,0.5)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AREAS ──────────────────────────────────────────────────────────── */}
      <section id="areas" ref={areasRef} className="py-28 px-5 md:px-10" style={{ background: T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={areasView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: EASE_OUT }} className="mb-10">
            <p className="font-display font-semibold text-[10px] tracking-widest uppercase mb-3" style={{ color: T.blue }}>We Cover</p>
            <h2 className="font-display font-extrabold leading-none mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", color: T.white }}>AREAS WE SERVE.</h2>
            <p className="font-body text-sm max-w-lg leading-relaxed" style={{ color: T.dim }}>Based in North London. Covering all major boroughs within our average 47-minute response time.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={areasView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }} className="flex flex-wrap gap-2.5">
            {AREAS.map((a, i) => (
              <motion.span key={a}
                initial={{ opacity: 0, scale: 0.9 }} animate={areasView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.03, ease: EASE_OUT }}
                className="font-display font-semibold text-[10px] tracking-widest uppercase px-4 py-2.5"
                style={{ border: `1px solid ${T.border}`, color: T.dim, transition: "border-color 180ms ease-out, color 180ms ease-out" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = T.borderHov; (e.currentTarget as HTMLElement).style.color = T.blue; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = T.border; (e.currentTarget as HTMLElement).style.color = T.dim; }}
              >{a}</motion.span>
            ))}
            <span className="font-display font-semibold text-[10px] tracking-widest uppercase px-4 py-2.5" style={{ border: `1px solid rgba(14,165,233,0.4)`, color: T.blue }}>+ Many More</span>
          </motion.div>
        </div>
      </section>

      {/* ── EMERGENCY CTA ──────────────────────────────────────────────────── */}
      <section id="contact" className="relative py-28 px-5 md:px-10 overflow-hidden" style={{ background: T.bg }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(14,165,233,0.07) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, ease: EASE_OUT }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-2" style={{ border: `1px solid rgba(239,68,68,0.4)`, background: "rgba(239,68,68,0.07)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.red }} />
              <span className="font-display font-semibold text-[10px] tracking-widest uppercase" style={{ color: T.red }}>Emergency Line Open Now</span>
            </div>
            <h2 className="font-display font-extrabold leading-none mb-4" style={{ fontSize: "clamp(3rem, 9vw, 8rem)", letterSpacing: "-0.04em", color: T.white }}>
              GOT AN<br /><span style={{ color: T.blue }}>EMERGENCY?</span>
            </h2>
            <p className="font-body text-lg max-w-md mx-auto leading-relaxed mb-10" style={{ color: T.dim }}>
              No call-out charge before 10pm. Engineers on standby 24 hours, 7 days a week.
            </p>
            <a href="tel:08001234567"
              className="font-display font-extrabold tracking-widest uppercase inline-flex items-center gap-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", color: T.blue, transition: "color 180ms ease-out" }}
              onMouseEnter={e => (e.currentTarget.style.color = T.white)}
              onMouseLeave={e => (e.currentTarget.style.color = T.blue)}
            >
              <Icons.Phone /> 0800 123 4567
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT FORM ───────────────────────────────────────────────────── */}
      <section className="py-28 px-5 md:px-10" style={{ background: T.surface, borderTop: `1px solid ${T.border}` }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease: EASE_OUT }}>
            <p className="font-display font-semibold text-[10px] tracking-widest uppercase mb-3" style={{ color: T.blue }}>Quick Quote</p>
            <h2 className="font-display font-extrabold leading-none mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em", color: T.white }}>BOOK A VISIT.</h2>
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
                    onMouseEnter={e => (e.currentTarget.style.color = T.blue)}
                    onMouseLeave={e => (e.currentTarget.style.color = T.dim)}>{value}</a>
                </div>
              ))}
            </div>
            <div className="mt-10 pt-8 border-t flex flex-wrap gap-4" style={{ borderColor: T.border }}>
              {ACCREDITATIONS.slice(0, 3).map(a => (
                <div key={a} className="flex items-center gap-1.5">
                  <span style={{ color: T.blue }}><Icons.Check /></span>
                  <span className="font-display text-[9px] tracking-widest uppercase" style={{ color: T.muted }}>{a}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {["Your Name", "Phone Number"].map(ph => (
                <input key={ph} type="text" placeholder={ph}
                  className="w-full px-5 py-4 font-body text-sm focus:outline-none"
                  style={{ background: T.card, border: `1px solid ${T.border}`, color: T.white, transition: "border-color 180ms ease-out" }}
                  onFocus={e => (e.currentTarget.style.borderColor = T.blue)}
                  onBlur={e => (e.currentTarget.style.borderColor = T.border)}
                />
              ))}
            </div>
            <input type="email" placeholder="Email Address"
              className="w-full px-5 py-4 font-body text-sm focus:outline-none"
              style={{ background: T.card, border: `1px solid ${T.border}`, color: T.white, transition: "border-color 180ms ease-out" }}
              onFocus={e => (e.currentTarget.style.borderColor = T.blue)}
              onBlur={e => (e.currentTarget.style.borderColor = T.border)}
            />
            <select className="w-full px-5 py-4 font-body text-sm focus:outline-none appearance-none"
              style={{ background: T.card, border: `1px solid ${T.border}`, color: T.muted, transition: "border-color 180ms ease-out" }}
              onFocus={e => (e.currentTarget.style.borderColor = T.blue)}
              onBlur={e => (e.currentTarget.style.borderColor = T.border)}
            >
              <option>Service required…</option>
              {SERVICES.map(s => <option key={s.title}>{s.title}</option>)}
            </select>
            <select className="w-full px-5 py-4 font-body text-sm focus:outline-none appearance-none"
              style={{ background: T.card, border: `1px solid ${T.border}`, color: T.muted, transition: "border-color 180ms ease-out" }}
              onFocus={e => (e.currentTarget.style.borderColor = T.blue)}
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
              style={{ background: T.card, border: `1px solid ${T.border}`, color: T.white, transition: "border-color 180ms ease-out" }}
              onFocus={e => (e.currentTarget.style.borderColor = T.blue)}
              onBlur={e => (e.currentTarget.style.borderColor = T.border)}
            />
            <button type="button"
              className="w-full font-display font-bold text-sm tracking-widest uppercase py-4"
              style={{ background: T.blue, color: "#000", transition: "background 160ms cubic-bezier(0.23,1,0.32,1), transform 160ms cubic-bezier(0.23,1,0.32,1)" }}
              onMouseEnter={e => (e.currentTarget.style.background = T.blueDk)}
              onMouseLeave={e => (e.currentTarget.style.background = T.blue)}
              onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
              onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
            >Send Request →</button>
            <p className="font-body text-xs text-center" style={{ color: T.muted }}>We respond within 30 min during business hours. No spam, ever.</p>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="py-14 px-5 md:px-10" style={{ background: T.bg, borderTop: `1px solid ${T.border}` }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-0.5 h-5 rounded-full" style={{ background: T.blue }} />
                <span className="font-display font-extrabold text-sm tracking-widest uppercase" style={{ color: T.white }}>
                  Swift<span style={{ color: T.blue }}>Trades</span>
                </span>
              </div>
              <p className="font-body text-xs leading-relaxed" style={{ color: T.muted }}>
                London&apos;s trusted emergency trades specialists. Gas Safe registered, fully insured, 12-month guarantee on all work.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                {ACCREDITATIONS.slice(0, 3).map(a => (
                  <span key={a} className="font-display text-[8px] tracking-widest uppercase px-2.5 py-1" style={{ border: `1px solid ${T.border}`, color: T.muted }}>{a}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-16 gap-y-3">
              {[["Services","#services"],["Process","#process"],["Pricing","#pricing"],["Reviews","#reviews"],["Areas","#areas"],["Contact","#contact"],["Privacy Policy","#"],["Terms","#"]].map(([label, href]) => (
                <a key={label} href={href} className="font-display text-[10px] tracking-widest uppercase"
                  style={{ color: T.muted, transition: "color 180ms ease-out" }}
                  onMouseEnter={e => (e.currentTarget.style.color = T.white)}
                  onMouseLeave={e => (e.currentTarget.style.color = T.muted)}>{label}</a>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: `1px solid ${T.border}` }}>
            <p className="font-body text-xs" style={{ color: T.muted }}>© 2026 Swift Trades Ltd. Registered in England & Wales. Gas Safe No. 123456.</p>
            <a href="https://falcon-designs-agency.vercel.app" target="_blank" rel="noopener noreferrer"
              className="font-display text-[10px] tracking-widest uppercase"
              style={{ color: T.muted, transition: "color 180ms ease-out" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#f97316")}
              onMouseLeave={e => (e.currentTarget.style.color = T.muted)}
            >Website by Falcon Designs ↗</a>
          </div>
        </div>
      </footer>

      {/* ── MOBILE STICKY EMERGENCY BAR ────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden" style={{ background: T.blue, borderTop: `2px solid ${T.blueDk}` }}>
        <a href="tel:08001234567" className="flex items-center justify-center gap-3 py-4 font-display font-bold text-sm tracking-widest uppercase" style={{ color: "#000" }}>
          <Icons.Phone /> 0800 123 4567 — Emergency Line
        </a>
      </div>
    </div>
  );
}
