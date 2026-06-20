"use client";
import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });
import { CinematicHero } from "@/components/ui/cinematic-hero";

/* ── Design tokens ──────────────────────────────────────────────────── */
const T = {
  bg:      "#ffffff",
  surface: "#f6f6f6",
  dark:    "#111111",
  text:    "#000000",
  muted:   "#666666",
  border:  "#e8e8e8",
  bDark:   "#323232",
  blue:    "#0000ee",
  lime:    "#c9ff00",
  display: "'Wix Madefor Display', 'Inter', sans-serif",
  body:    "'Wix Madefor Text', 'Inter', sans-serif",
};

/* Wix exact easings */
const EASE       = [0.23, 1, 0.32, 1] as const;
const WIX_EASE   = [0.83, 0, 0.17, 1] as const;
const MOVE_EASE  = [0.69, 0.39, 0.26, 0.54] as const; // Wix moveAnimation

/* ── Reveal (moveAnimation — translateY(3vw) + fade) ────────────────── */
function Reveal({ children, delay = 0, y = 32, style }: {
  children: React.ReactNode; delay?: number; y?: number; style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: MOVE_EASE }}
      style={style}>
      {children}
    </motion.div>
  );
}

/* ── SlideReveal (motion-slideIn — clip-path polygon wipe) ──────────── */
function SlideReveal({ children, delay = 0, style }: {
  children: React.ReactNode; delay?: number; style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  return (
    <motion.div ref={ref}
      initial={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", y: "2vw" }}
      animate={inView ? { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: WIX_EASE }}
      style={{ overflow: "hidden", ...style }}>
      {children}
    </motion.div>
  );
}

/* ── FlipReveal (motion-flipIn — perspective rotateX) ───────────────── */
function FlipReveal({ children, delay = 0, style }: {
  children: React.ReactNode; delay?: number; style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, rotateX: -60, y: 20 }}
      animate={inView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: EASE }}
      style={{ perspective: 800, transformStyle: "preserve-3d", ...style }}>
      {children}
    </motion.div>
  );
}

/* ── GlideReveal (motion-glideIn — translate from offset) ───────────── */
function GlideReveal({ children, delay = 0, x = 0, y = 0, style }: {
  children: React.ReactNode; delay?: number; x?: number; y?: number; style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
      style={style}>
      {children}
    </motion.div>
  );
}

/* ── Counter ──────────────────────────────────────────────────────────── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1600, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Browser mockup ──────────────────────────────────────────────────── */
function BrowserMockup({ children, url = "falcon-designs.co.uk", dark = false }: {
  children: React.ReactNode; url?: string; dark?: boolean;
}) {
  return (
    <div style={{
      borderRadius: 12, overflow: "hidden",
      boxShadow: dark
        ? "0 32px 80px rgba(0,0,0,0.55), 0 4px 16px rgba(0,0,0,0.3)"
        : "0 24px 64px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
      border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : T.border}`,
      background: dark ? "#0d0d0d" : T.bg,
    }}>
      <div style={{
        background: dark ? "#1a1a1a" : "#f0f0f0",
        borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.07)" : T.border}`,
        padding: "10px 14px", display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#ff5f57","#febc2e","#28c840"].map(c => (
            <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, display: "block" }} />
          ))}
        </div>
        <div style={{
          flex: 1, background: dark ? "#111" : "#fff", borderRadius: 6,
          padding: "4px 12px", fontFamily: T.body, fontSize: "0.68rem",
          color: dark ? "rgba(255,255,255,0.3)" : T.muted,
          border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : T.border}`,
          maxWidth: 320, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>{url}</div>
      </div>
      {children}
    </div>
  );
}

/* ── Marquee data ────────────────────────────────────────────────────── */
const MARQUEE_ITEMS = [
  "Design","Development","Business Solutions","CMS","eCommerce",
  "Booking Systems","Scroll Animation","AI Features","Client Handovers",
  "SEO","Marketing Integrations","Custom CSS","WebGL","Performance",
];

const MARQUEE_2 = [
  "Aurum Creations","Maison Noir","Ivory Dental","Ember Restaurant",
  "Sterling & Co","Velour Nails","Vivah Films","James Cole PT",
  "Lumière Clinic","Swift Trades","Falcon Designs",
];

/* ── Feature tabs ────────────────────────────────────────────────────── */
const FEATURE_TABS = [
  {
    label: "Design",
    tag: "Pixel-perfect",
    desc: "Create complex digital experiences intuitively — full canvas freedom, responsive by default.",
    img: "https://images.unsplash.com/photo-1543168256-418811576931?auto=format&w=900&q=80",
    chips: ["Custom CSS", "Animations & Effects", "Grid Layout"],
  },
  {
    label: "Development",
    tag: "Code-first",
    desc: "Write custom code directly in the editor. Velo by Wix gives you JS/TS, REST APIs, and backend functions.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&w=900&q=80",
    chips: ["TypeScript", "REST APIs", "Serverless"],
  },
  {
    label: "Business Solutions",
    tag: "Native apps",
    desc: "eCommerce, bookings, events, memberships — every solution native, no third-party plugins required.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&w=900&q=80",
    chips: ["eCommerce", "Bookings", "CRM"],
  },
  {
    label: "Client Management",
    tag: "Streamlined handovers",
    desc: "Customisable client dashboards with role-based permissions. Clients update content without touching the design.",
    img: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&w=900&q=80",
    chips: ["Custom Roles", "CMS Access", "Live Comments"],
  },
  {
    label: "SEO & Marketing",
    tag: "Growth tools",
    desc: "Built-in SEO tools, structured data, integrations with Google Analytics, Meta Pixel, and 500+ marketing apps.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&w=900&q=80",
    chips: ["Structured Data", "Meta Pixel", "Analytics"],
  },
];

/* ── Business solution template rows ────────────────────────────────── */
interface BtnCard {
  label: string;
  tag: string;
  cellBg: string;
  btn: React.CSSProperties;
  hover: React.CSSProperties;
  badge?: boolean;
}

const BTN_ROW_1: BtnCard[] = [
  {
    label: "Get Started →",
    tag: "Glassmorphism",
    cellBg: "linear-gradient(135deg,#1a1a2e 0%,#16213e 100%)",
    btn: { background: "rgba(255,255,255,0.09)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.22)", color: "#fff", padding: "0.85rem 2.2rem", borderRadius: 999, fontSize: "0.9rem", fontWeight: 500, letterSpacing: "0.02em", boxShadow: "0 4px 32px rgba(100,100,255,0.25)", display: "inline-block", textDecoration: "none", transform: "none", transition: "all 0.22s ease" },
    hover: { background: "rgba(255,255,255,0.18)", boxShadow: "0 8px 48px rgba(100,100,255,0.5)", transform: "translateY(-2px)" },
  },
  {
    label: "BUY NOW",
    tag: "Brutalist",
    cellBg: "#f4f1eb",
    btn: { background: "#000", color: "#fff", border: "3px solid #000", padding: "0.9rem 2.2rem", borderRadius: 0, fontWeight: 900, fontSize: "0.95rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, boxShadow: "6px 6px 0 #c9ff00", display: "inline-block", textDecoration: "none", transform: "none", transition: "box-shadow 0.15s, transform 0.15s" },
    hover: { boxShadow: "9px 9px 0 #c9ff00", transform: "translate(-3px,-3px)" },
  },
  {
    label: "Explore Now",
    tag: "Aurora Glow",
    cellBg: "#08080f",
    btn: { background: "linear-gradient(135deg,#7f00ff,#00d4ff,#ff6ec7)", color: "#fff", padding: "0.85rem 2.4rem", borderRadius: 999, fontWeight: 600, fontSize: "0.9rem", boxShadow: "0 0 40px rgba(127,0,255,0.45), 0 0 80px rgba(0,212,255,0.12)", border: "none", display: "inline-block", textDecoration: "none", transform: "none", transition: "all 0.22s ease" },
    hover: { boxShadow: "0 0 60px rgba(127,0,255,0.7), 0 0 120px rgba(0,212,255,0.25)", transform: "scale(1.05)" },
  },
  {
    label: "> ACCESS_GRANTED",
    tag: "Terminal",
    cellBg: "#020202",
    btn: { background: "transparent", color: "#00ff41", border: "1px solid #00ff41", padding: "0.75rem 1.5rem", borderRadius: 0, fontFamily: "'Courier New', monospace", fontSize: "0.72rem", textShadow: "0 0 8px #00ff41", letterSpacing: "0.1em", display: "inline-block", textDecoration: "none", transform: "none", transition: "all 0.18s ease" },
    hover: { background: "rgba(0,255,65,0.08)", boxShadow: "0 0 18px rgba(0,255,65,0.35)", transform: "none" },
  },
  {
    label: "Tap me! ✿",
    tag: "Soft 3D",
    cellBg: "#fff0f7",
    btn: { background: "#ff85c2", color: "#fff", border: "none", padding: "0.9rem 2.2rem", borderRadius: 16, fontWeight: 700, fontSize: "0.95rem", boxShadow: "0 6px 0 #b5005e, 0 8px 20px rgba(255,133,194,0.35)", display: "inline-block", textDecoration: "none", transform: "none", transition: "all 0.15s ease" },
    hover: { transform: "translateY(-3px)", boxShadow: "0 9px 0 #b5005e, 0 12px 28px rgba(255,133,194,0.45)" },
  },
  {
    label: "Let's work together",
    tag: "Handwritten",
    cellBg: "#faf7f0",
    btn: { background: "transparent", color: "#c9841a", border: "none", borderBottom: "2.5px solid #c9841a", padding: "0.4rem 0.2rem", borderRadius: 0, fontFamily: "'Dancing Script', cursive", fontSize: "1.55rem", fontWeight: 700, display: "inline-block", textDecoration: "none", transform: "none", transition: "all 0.18s ease" },
    hover: { color: "#8a5700", borderBottomColor: "#8a5700", transform: "skewX(-2deg)" },
  },
];

const BTN_ROW_2: BtnCard[] = [
  {
    label: "EXCLUSIVE ACCESS",
    tag: "Over-the-top Gold",
    cellBg: "#100800",
    btn: { background: "linear-gradient(135deg,#f7b500,#f45c00)", color: "#1a0800", padding: "0.9rem 2rem", borderRadius: 8, fontWeight: 900, fontSize: "0.85rem", letterSpacing: "0.18em", boxShadow: "0 5px 0 #7a2e00, 4px 9px 0 #3a1500, 0 0 40px rgba(247,181,0,0.35)", textTransform: "uppercase" as const, textShadow: "0 1px 0 rgba(255,255,255,0.25)", border: "none", display: "inline-block", textDecoration: "none", transform: "none", transition: "all 0.18s ease" },
    hover: { transform: "translate(-2px,-3px)", boxShadow: "0 8px 0 #7a2e00, 6px 12px 0 #3a1500, 0 0 60px rgba(247,181,0,0.5)" },
  },
  {
    label: "Discover More",
    tag: "Elegant Ghost",
    cellBg: "#f8f6f2",
    btn: { background: "transparent", color: "#1a1a1a", border: "2px solid #1a1a1a", padding: "0.85rem 2.2rem", borderRadius: 4, fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontStyle: "italic" as const, fontWeight: 400, letterSpacing: "0.03em", display: "inline-block", textDecoration: "none", transform: "none", transition: "all 0.22s ease" },
    hover: { background: "#1a1a1a", color: "#f8f6f2", transform: "none" },
  },
  {
    label: "Join 12,847 creators →",
    tag: "Social Proof Pill",
    cellBg: "#0a0a0a",
    btn: { background: "#fff", color: "#000", padding: "0.7rem 1.6rem 0.7rem 0.7rem", borderRadius: 999, fontSize: "0.82rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", border: "none", transform: "none", transition: "all 0.18s ease" },
    hover: { transform: "scale(1.04)", boxShadow: "0 6px 24px rgba(255,255,255,0.15)" },
    badge: true,
  },
  {
    label: "PRESS START",
    tag: "VT323 Giant",
    cellBg: "#0d0010",
    btn: { fontFamily: "'VT323', monospace", fontSize: "2.1rem", color: "#ff2d9b", background: "transparent", border: "3px solid #ff2d9b", padding: "0.2rem 1.4rem", boxShadow: "4px 4px 0 #7a0040, 0 0 20px rgba(255,45,155,0.35)", letterSpacing: "0.05em", display: "inline-block", textDecoration: "none", lineHeight: 1.3, transform: "none", transition: "all 0.15s ease" },
    hover: { boxShadow: "6px 6px 0 #7a0040, 0 0 40px rgba(255,45,155,0.55)", transform: "translate(-2px,-2px)" },
  },
  {
    label: "Unlock Magic ✦",
    tag: "Rainbow Shimmer",
    cellBg: "#111",
    btn: { background: "linear-gradient(90deg,#ff0080,#ff8c00,#40e0d0,#7b2fff)", color: "#fff", padding: "0.85rem 2.2rem", borderRadius: 999, fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.04em", border: "none", display: "inline-block", textDecoration: "none", boxShadow: "0 4px 24px rgba(255,0,128,0.35)", transform: "none", transition: "all 0.22s ease" },
    hover: { boxShadow: "0 6px 36px rgba(255,0,128,0.55), 0 0 60px rgba(64,224,208,0.25)", transform: "scale(1.05)" },
  },
  {
    label: "→ START BUILDING",
    tag: "Pixel Retro",
    cellBg: "#050d2e",
    btn: { fontFamily: "'Press Start 2P', monospace", fontSize: "0.5rem", color: "#ffd600", background: "transparent", border: "2px solid #ffd600", padding: "0.8rem 1.3rem", boxShadow: "3px 3px 0 #7a6000", letterSpacing: "0.06em", display: "inline-block", textDecoration: "none", transform: "none", transition: "all 0.15s ease" },
    hover: { boxShadow: "5px 5px 0 #7a6000, 0 0 20px rgba(255,214,0,0.35)", transform: "translate(-2px,-2px)" },
  },
];

/* ── Client workflow features ────────────────────────────────────────── */
const CMS_FEATURES = [
  {
    title: "Customisable handovers",
    desc: "Personalise the process with client-specific resources and custom roles and permissions.",
  },
  {
    title: "A code-free CMS",
    desc: "Let clients add data and update content, without touching the design.",
  },
  {
    title: "Live comments",
    desc: "Make version history always a thing of the past. Get feedback directly on the canvas.",
  },
];

/* ── Resources ───────────────────────────────────────────────────────── */
const RESOURCES = [
  {
    kicker: "Community",
    title: "Learn from fellow professionals alongside them.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&w=700&q=80",
    cta: "Join the community →",
  },
  {
    kicker: "Academy",
    title: "with lessons and tutorials on all aspects of our platform.",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&w=700&q=80",
    cta: "Start learning →",
  },
  {
    kicker: "Blog — FWD",
    title: "inspiration from industry and agency experts on our blog, FWD.",
    img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&w=700&q=80",
    cta: "Read FWD →",
  },
];

/* ── FAQs ────────────────────────────────────────────────────────────── */
const FAQS = [
  { q: "What is Falcon Studio?",
    a: "Falcon Studio is the premium web design platform for designers, developers, and agencies. We build bespoke digital experiences with full canvas freedom, custom code capabilities, and a suite of native business tools — no templates, no compromises." },
  { q: "How does the design process work?",
    a: "We start with a single discovery call. From there we build a custom visual system — typography, colour, layout, motion — that couldn't belong to anyone else. You review at every stage on a staging environment before we go live." },
  { q: "Can I update the site myself after launch?",
    a: "Yes. We build a CMS handoff tailored to your comfort level. You should never need to call us to change a photo, update opening hours, or add a blog post. The handover includes a personalised resource kit and live comment access." },
  { q: "Do you use page builders or templates?",
    a: "Never. Every project is written from scratch in Next.js and TypeScript. You get a codebase you actually own — not a platform licence that can be repriced or revoked." },
  { q: "What industries have you built for?",
    a: "Law firms, dental practices, hair salons, nail studios, restaurants, aesthetic clinics, jewellery e-commerce, wedding filmmakers, personal trainers, trades services, and more. Each sector has its own UX expectations — we know them." },
  { q: "How does pricing work?",
    a: "We price per project with a fixed proposal — no hourly billing, no surprises. After a discovery call we'll give you a clear scope and timeline. Ongoing retainers are available for clients who want continued support." },
];

/* ── FeatureTabs — "Dark Atelier" redesign ───────────────────────────── */
/*
 * Mix of all 4 directions:
 *   Dir 1 (Dark Room)     → full #050505 bg, numbered tab list
 *   Dir 2 (Type Takeover) → ghost oversized label behind content
 *   Dir 3 (Electric Split)→ lime accents, active tab has lime left-bar + glow dot
 *   Dir 4 (Glass)         → lime inset frame on right panel, dark glass badge
 */
function FeatureTabs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", v => {
      const idx = Math.min(
        Math.floor(v * FEATURE_TABS.length),
        FEATURE_TABS.length - 1,
      );
      setActiveIdx(idx);
    });
  }, [scrollYProgress]);

  const tab = FEATURE_TABS[activeIdx];

  return (
    <div ref={containerRef} style={{ height: `${FEATURE_TABS.length * 100}vh`, position: "relative" }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        display: "grid", gridTemplateColumns: "44fr 56fr",
        overflow: "hidden",
        background: "#050505",
      }}>

        {/* ── Ghost oversized label — Dir 2 ── */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center",
          pointerEvents: "none", zIndex: 0, overflow: "hidden",
        }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={`ghost-${activeIdx}`}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.7, ease: EASE }}
              style={{
                fontFamily: T.display,
                fontSize: "clamp(9rem, 17vw, 20rem)",
                fontWeight: 800,
                letterSpacing: "-0.05em",
                color: "rgba(255,255,255,0.028)",
                whiteSpace: "nowrap",
                userSelect: "none",
                lineHeight: 1,
                paddingLeft: "3rem",
                textTransform: "uppercase",
              }}>
              {tab.label}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* ── LEFT: text panel ── */}
        <div style={{
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "0 3.5rem 0 4.5rem",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          position: "relative", zIndex: 1,
        }}>

          {/* Kicker — lime small caps */}
          <p style={{
            fontFamily: T.body, fontSize: "0.68rem", fontWeight: 700,
            color: T.lime, letterSpacing: "0.14em", textTransform: "uppercase",
            marginBottom: "2.8rem",
          }}>
            Create exceptional websites at scale
          </p>

          {/* Feature content — crossfades */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: WIX_EASE }}
              style={{ overflow: "hidden" }}>

              {/* Tag — inline, lime dash prefix, no pill */}
              <p style={{
                fontFamily: T.body, fontSize: "0.72rem", fontWeight: 600,
                color: "rgba(201,255,0,0.7)", letterSpacing: "0.04em",
                marginBottom: "0.9rem",
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}>
                <span style={{ display: "inline-block", width: 20, height: 1.5, background: T.lime, flexShrink: 0 }} />
                {tab.tag}
              </p>

              {/* Heading — BIG, tight, white */}
              <h2 style={{
                fontFamily: T.display,
                fontSize: "clamp(2.8rem, 4.5vw, 4.2rem)",
                fontWeight: 800, lineHeight: 0.96, letterSpacing: "-0.04em",
                color: "#ffffff", marginBottom: "1.4rem",
                textWrap: "balance",
              }}>{tab.label}</h2>

              {/* Description */}
              <p style={{
                fontFamily: T.body, fontSize: "0.95rem", lineHeight: 1.74,
                color: "rgba(255,255,255,0.45)", maxWidth: 380, marginBottom: "1.8rem",
              }}>{tab.desc}</p>

              {/* Chips — dot-separated inline, no pill background */}
              <div style={{
                display: "flex", flexWrap: "wrap", alignItems: "center",
                gap: "0.15rem", marginBottom: "2.4rem",
              }}>
                {tab.chips.map((chip, ci) => (
                  <span key={chip} style={{ display: "flex", alignItems: "center" }}>
                    {ci > 0 && (
                      <span style={{ color: T.lime, margin: "0 0.45rem", fontSize: "0.7rem" }}>·</span>
                    )}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: ci * 0.07 + 0.15 }}
                      style={{
                        fontFamily: T.body, fontSize: "0.78rem", fontWeight: 500,
                        color: "rgba(255,255,255,0.5)",
                      }}>
                      {chip}
                    </motion.span>
                  </span>
                ))}
              </div>

              {/* CTAs — lime pill + ghost underline, no rectangles */}
              <div style={{ display: "flex", gap: "1.6rem", alignItems: "center" }}>
                <a href="#cta" style={{
                  fontFamily: T.body, fontSize: "0.84rem", fontWeight: 700,
                  color: "#000", background: T.lime,
                  padding: "0.72rem 1.7rem", borderRadius: 100,
                  display: "inline-flex", alignItems: "center", gap: "0.35rem",
                  transition: "transform 0.18s, box-shadow 0.18s",
                  boxShadow: `0 0 0 0 ${T.lime}`,
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px rgba(201,255,0,0.35)`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${T.lime}`;
                  }}>
                  Start creating
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ marginTop: 1 }}>
                    <path d="M2 11L11 2M11 2H4.5M11 2V8.5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="#work" style={{
                  fontFamily: T.body, fontSize: "0.84rem", fontWeight: 500,
                  color: "rgba(255,255,255,0.35)",
                  borderBottom: "1px solid rgba(255,255,255,0.18)",
                  paddingBottom: "2px",
                  transition: "color 0.2s, border-color 0.2s",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.45)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
                  }}>
                  Discover more
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Tab list — numbered, Dir 1 + 3 ── */}
          <div style={{ marginTop: "3rem" }}>
            {FEATURE_TABS.map((f, i) => (
              <div key={f.label} style={{
                position: "relative",
                borderTop: `1px solid rgba(255,255,255,${i === 0 ? 0.1 : 0.05})`,
                borderBottom: i === FEATURE_TABS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : undefined,
                padding: "0.85rem 0 0.85rem 1.4rem",
                display: "flex", alignItems: "center", gap: "1rem",
                cursor: "default",
              }}>
                {/* Lime left bar — Dir 3 */}
                <motion.div
                  animate={{
                    scaleY: activeIdx === i ? 1 : 0,
                    opacity: activeIdx === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.35, ease: WIX_EASE }}
                  style={{
                    position: "absolute", left: 0, top: "15%", bottom: "15%",
                    width: 2, background: T.lime,
                    transformOrigin: "top", borderRadius: 1,
                  }}
                />
                {/* Number */}
                <span style={{
                  fontFamily: T.display, fontSize: "0.6rem", fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: activeIdx === i ? T.lime : "rgba(255,255,255,0.18)",
                  transition: "color 0.3s",
                  width: 20, flexShrink: 0,
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* Label */}
                <span style={{
                  fontFamily: T.display, fontSize: "0.88rem", fontWeight: 700,
                  color: activeIdx === i ? "#ffffff" : "rgba(255,255,255,0.28)",
                  transition: "color 0.3s", flex: 1,
                }}>{f.label}</span>
                {/* Lime glow dot when active */}
                {activeIdx === i && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: T.lime,
                      boxShadow: `0 0 10px ${T.lime}, 0 0 20px rgba(201,255,0,0.4)`,
                      flexShrink: 0,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: image with lime inset frame — Dir 3 + 4 ── */}
        <div style={{ position: "relative", overflow: "hidden", background: "#0a0a0a", zIndex: 1 }}>

          {/* Image — slightly desaturated, dark */}
          <AnimatePresence>
            <motion.img
              key={`img-${activeIdx}`}
              src={tab.img}
              alt={tab.label}
              initial={{ opacity: 0, scale: 1.07 }}
              animate={{ opacity: 0.65, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: EASE }}
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%", objectFit: "cover",
                filter: "saturate(0.6)",
              }}
            />
          </AnimatePresence>

          {/* Dark gradient overlays */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(5,5,5,0.45) 0%, transparent 35%), linear-gradient(to top, rgba(5,5,5,0.75) 0%, transparent 55%)",
          }} />

          {/* Lime inset frame — Dir 3, draws in on tab change */}
          <AnimatePresence>
            <motion.div
              key={`frame-${activeIdx}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
              style={{
                position: "absolute", inset: 20,
                border: `1.5px solid ${T.lime}`,
                borderRadius: 6,
                pointerEvents: "none",
                boxShadow: `inset 0 0 40px rgba(201,255,0,0.04), 0 0 0 0 ${T.lime}`,
              }}
            />
          </AnimatePresence>

          {/* Corner accents — top-left & bottom-right only */}
          {[
            { top: 20, left: 20, transform: "rotate(0deg)" },
            { bottom: 20, right: 20, transform: "rotate(180deg)" },
          ].map((pos, ci) => (
            <div key={ci} style={{
              position: "absolute", ...pos,
              width: 16, height: 16, pointerEvents: "none",
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M0 10V0H10" stroke={T.lime} strokeWidth="1.5" opacity="0.7"/>
              </svg>
            </div>
          ))}

          {/* Bottom dark glass info card — Dir 4 */}
          <AnimatePresence>
            <motion.div
              key={`info-${activeIdx}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.45, delay: 0.25, ease: EASE }}
              style={{
                position: "absolute", bottom: 40, left: 40,
                background: "rgba(0,0,0,0.72)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(201,255,0,0.18)",
                borderRadius: 10, padding: "0.85rem 1.25rem",
                maxWidth: 340,
              }}>
              <div style={{
                fontFamily: T.body, fontSize: "0.6rem", fontWeight: 700,
                color: T.lime, textTransform: "uppercase", letterSpacing: "0.12em",
                marginBottom: "0.45rem",
              }}>{tab.tag}</div>
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.1rem" }}>
                {tab.chips.map((chip, ci) => (
                  <span key={chip} style={{ display: "inline-flex", alignItems: "center" }}>
                    {ci > 0 && <span style={{ color: "rgba(255,255,255,0.25)", margin: "0 0.4rem", fontSize: "0.65rem" }}>·</span>}
                    <span style={{ fontFamily: T.body, fontSize: "0.75rem", color: "rgba(255,255,255,0.65)" }}>{chip}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Scroll progress — right edge, lime */}
          <div style={{
            position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)",
            display: "flex", flexDirection: "column", gap: 7,
          }}>
            {FEATURE_TABS.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: activeIdx === i ? 32 : 8,
                  background: activeIdx === i ? T.lime : "rgba(255,255,255,0.18)",
                  boxShadow: activeIdx === i ? `0 0 8px ${T.lime}` : "none",
                }}
                transition={{ duration: 0.35, ease: WIX_EASE }}
                style={{ width: 2.5, borderRadius: 2 }}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

/* ── ParallaxShowcase — zooms out from single site into 3-col grid ───── */
const SC_COL_L = [
  { img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&w=900&q=80", label: "NOURIS", cat: "Beauty & Fashion", h: 310 },
  { img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&w=900&q=80", label: "JAMES COLE PT", cat: "Fitness", h: 270 },
  { img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&w=900&q=80", label: "MAISON NOIR", cat: "Hair Atelier", h: 330 },
  { img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&w=900&q=80", label: "VELOUR NAILS", cat: "Beauty Studio", h: 280 },
];
const SC_COL_C = [
  { img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&w=900&q=80", label: "YS ELITE ARCHITECTURE", cat: "Architecture", h: 420, browser: true, url: "ys-elite-architecture.com" },
  { img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&w=900&q=80", label: "EMBER LONDON", cat: "Fine Dining", h: 290 },
  { img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&w=900&q=80", label: "LUMIÈRE CLINIC", cat: "Medical Aesthetics", h: 310 },
];
const SC_COL_R = [
  { img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&w=900&q=80", label: "STERLING & CO", cat: "Legal Services", h: 270 },
  { img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&w=900&q=80", label: "IVORY DENTAL", cat: "Healthcare", h: 320 },
  { img: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&w=900&q=80", label: "VIVAH FILMS", cat: "Wedding Films", h: 300 },
  { img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&w=900&q=80", label: "SWIFT TRADES", cat: "Trades & Services", h: 260 },
];

type ScCard = { img: string; label: string; cat: string; h: number; browser?: boolean; url?: string };

function ShowcaseCard({ item }: { item: ScCard }) {
  return (
    <div style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${T.border}`, marginBottom: 12, background: "#f5f5f5", flexShrink: 0, boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
      {item.browser && (
        <div style={{ background: "#f0f0f0", borderBottom: `1px solid ${T.border}`, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", gap: 5 }}>
            {["#ff5f57","#febc2e","#28c840"].map(c => <span key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, display: "block" }} />)}
          </div>
          <div style={{ flex: 1, background: "#fff", borderRadius: 5, padding: "3px 10px", fontFamily: T.body, fontSize: "0.62rem", color: T.muted, border: `1px solid ${T.border}`, maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.url}</div>
        </div>
      )}
      <div style={{ height: item.h, position: "relative", overflow: "hidden" }}>
        <img src={item.img} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.55) 100%)" }} />
        <div style={{ position: "absolute", bottom: 14, left: 14 }}>
          <div style={{ fontFamily: T.display, fontSize: "0.58rem", fontWeight: 700, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>{item.cat}</div>
          <div style={{ fontFamily: T.display, fontSize: "0.85rem", fontWeight: 800, color: "#fff" }}>{item.label}</div>
        </div>
        <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(255,255,255,0.88)", backdropFilter: "blur(8px)", borderRadius: 6, padding: "0.28rem 0.55rem", fontFamily: T.body, fontSize: "0.55rem", fontWeight: 600, color: T.text, border: "1px solid rgba(0,0,0,0.06)", whiteSpace: "nowrap" }}>Built with Falcon Studio ✦</div>
      </div>
    </div>
  );
}

function HeroMockupSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Phase 1 (0→0.55): zoom-out — center column scales down, left/right slide in
  // The center col is ~33% of the grid. To make its first card fill ~80% of viewport, scale ≈ 2.5
  const centerScale = useTransform(scrollYProgress, [0, 0.55], [2.5, 1]);
  const centerScaleOrigin = "50% 15%"; // anchor to top of first card
  const sideX_L  = useTransform(scrollYProgress, [0.05, 0.55], ["-110%", "0%"]);
  const sideX_R  = useTransform(scrollYProgress, [0.05, 0.55], ["110%", "0%"]);

  // Phase 2 (0.55→1): parallax — each column drifts at different speed
  const col1Y = useTransform(scrollYProgress, [0.55, 1], [0, -180]);
  const col2Y = useTransform(scrollYProgress, [0.55, 1], [0, 100]);
  const col3Y = useTransform(scrollYProgress, [0.55, 1], [0, -140]);

  return (
    <div ref={containerRef} style={{ height: "520vh", background: T.bg }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: T.bg }}>
        {/* 3-col grid — fills viewport edge to edge */}
        <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, padding: "2rem 2rem 0" }}>

          {/* Left column — slides in from left */}
          <motion.div style={{ x: sideX_L, y: col1Y, display: "flex", flexDirection: "column" }}>
            {SC_COL_L.map((item, i) => <ShowcaseCard key={i} item={item} />)}
          </motion.div>

          {/* Center column — starts zoomed, scales down into place */}
          <motion.div style={{ scale: centerScale, transformOrigin: centerScaleOrigin, y: col2Y, display: "flex", flexDirection: "column" }}>
            {SC_COL_C.map((item, i) => <ShowcaseCard key={i} item={item} />)}
          </motion.div>

          {/* Right column — slides in from right */}
          <motion.div style={{ x: sideX_R, y: col3Y, display: "flex", flexDirection: "column" }}>
            {SC_COL_R.map((item, i) => <ShowcaseCard key={i} item={item} />)}
          </motion.div>
        </div>

      </div>
    </div>
  );
}

/* ── RetainerBodyText — typeset + overdrive: staggered phrase reveal ─── */
/*
 * Typeset fixes:  line-height +0.08 (dark-bg compensation), letter-spacing
 *   0.012em, contrast raised from 0.5→0.62, max-width in ch units.
 * Overdrive:      semantic phrase segmentation — each chunk reveals with a
 *   clip-path wipe on scroll entry, key service phrases brighter, em-dash
 *   lime, closing sentence italic.
 */
function RetainerBodyText() {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const segments = [
    { text: "Every retainer client gets a dedicated performance dashboard ", hi: "base" },
    { text: "—",                                                             hi: "dash" },
    { text: " monthly SEO reports,",                                         hi: "service" },
    { text: " speed audits,",                                                hi: "service" },
    { text: " content updates,",                                             hi: "service" },
    { text: " and a full update log.",                                       hi: "base" },
    { text: " Your site keeps improving while you focus on your business.",  hi: "closing" },
  ] as const;

  const colorFor = (hi: string) => {
    if (hi === "dash")    return GOLD;
    if (hi === "service") return "rgba(255,255,255,0.82)";
    if (hi === "closing") return "rgba(255,255,255,0.48)";
    return "rgba(255,255,255,0.60)";
  };

  return (
    <p ref={ref} style={{
      fontFamily: T.body,
      fontSize: "1.05rem",
      lineHeight: 1.84,
      letterSpacing: "0.012em",
      maxWidth: "50ch",
      marginBottom: "3rem",
    }}>
      {segments.map((seg, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          animate={inView ? { opacity: 1, clipPath: "inset(0 0% 0 0)" } : {}}
          transition={{ duration: 0.55, delay: i * 0.09, ease: WIX_EASE }}
          style={{
            display: "inline",
            color: colorFor(seg.hi),
            fontStyle: seg.hi === "closing" ? "italic" : "normal",
            fontWeight: seg.hi === "service" ? 500 : 400,
          }}>
          {seg.text}
        </motion.span>
      ))}
    </p>
  );
}

/* ── EnterpriseSection — scroll-driven two-phase mockup reveal ──────── */
/*
 * Phase 1 (scroll 0→40%): browser chrome slides down into view — the
 *   right panel starts showing only the website content (no frame visible)
 *   then the full browser frame scales/translates into view.
 * Phase 2 (scroll 40→100%): inner dashboard content scrolls upward,
 *   revealing the full enterprise site grid (mirrors comp-mc1wxk9714).
 */
function EnterpriseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phase 1 — reveal browser chrome
  const mockupScale = useTransform(scrollYProgress, [0, 0.4], [1.18, 1]);
  const mockupY     = useTransform(scrollYProgress, [0, 0.4], [80, 0]);
  const chromeOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1]);

  // Phase 2 — inner content scrolls up
  const innerY = useTransform(scrollYProgress, [0.4, 1], [0, -260]);

  // Left text fades in on entry
  const leftOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const leftY       = useTransform(scrollYProgress, [0, 0.15], [40, 0]);

  const RETAINER_CLIENTS = [
    { name: "Aurum Creations",  score: 96, change: "+4", status: "Healthy",  img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&w=200&q=70" },
    { name: "Ember London",     score: 91, change: "+2", status: "Healthy",  img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&w=200&q=70" },
    { name: "Ivory Dental",     score: 88, change: "+6", status: "Healthy",  img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&w=200&q=70" },
    { name: "Sterling & Co",    score: 84, change: "+1", status: "Review",   img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&w=200&q=70" },
    { name: "Maison Noir",      score: 79, change: "-2", status: "Review",   img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&w=200&q=70" },
    { name: "Vivah Films",      score: 93, change: "+3", status: "Healthy",  img: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&w=200&q=70" },
  ];

  const UPDATE_LOG = [
    { client: "Aurum Creations",  action: "SEO meta updated — 12 pages",       time: "2h ago",   dot: "#22c55e" },
    { client: "Ember London",     action: "New menu section published",          time: "Yesterday", dot: "#22c55e" },
    { client: "Sterling & Co",    action: "Blog post scheduled for Friday",      time: "2d ago",   dot: "#f59e0b" },
    { client: "Ivory Dental",     action: "Speed audit complete — 96/100",       time: "3d ago",   dot: "#22c55e" },
    { client: "Maison Noir",      action: "Homepage image refresh requested",    time: "4d ago",   dot: "#f59e0b" },
    { client: "Vivah Films",      action: "Gallery updated — 24 new photos",     time: "5d ago",   dot: "#22c55e" },
  ];

  const SIDEBAR_ITEMS = [
    { label: "Overview" }, { label: "Performance", active: true },
    { label: "SEO Reports" }, { label: "Content Updates" },
    { label: "Speed Audits" }, { label: "Update Log" },
    { label: "Invoices" }, { label: "Settings" },
  ];

  return (
    <div ref={containerRef} style={{ height: "300vh", position: "relative" }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        background: "#1a0c0c",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        display: "grid", gridTemplateColumns: "1fr 1fr",
      }}>

        {/* ── LEFT: text, stays pinned ── */}
        <motion.div style={{ opacity: leftOpacity, y: leftY,
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "0 5rem 0 6rem",
        }}>

          {/* Kicker — diamond marker */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "2rem" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill={GOLD}>
              <rect x="5" y="0" width="7" height="7" transform="rotate(45 5 5)" rx="0.5"/>
            </svg>
            <span style={{
              fontFamily: T.body, fontSize: "0.68rem", fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.38)",
            }}>Ongoing Retainer</span>
          </div>

          {/* Headline — Playfair Display, mixed italic/bold for drama */}
          <h2 style={{ marginBottom: "1.8rem", lineHeight: 1.05 }}>
            <span style={{
              display: "block",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.8rem, 4.5vw, 4.4rem)",
              fontWeight: 400, fontStyle: "italic",
              letterSpacing: "-0.01em",
              color: "rgba(255,255,255,0.75)",
            }}>Built once.</span>
            <span style={{
              display: "block",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.8rem, 4.5vw, 4.4rem)",
              fontWeight: 900, fontStyle: "normal",
              letterSpacing: "-0.025em",
              color: "#ffffff",
            }}>Refined forever.</span>
          </h2>

          {/* Body text — typeset + overdrive: staggered phrase reveal, semantic highlighting */}
          <RetainerBodyText />

          {/* Funky button — sharp rectangle, lime slides up from bottom on hover */}
          <FunkyButton />
        </motion.div>

        {/* ── RIGHT: two-phase animated mockup ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center",
          padding: "3rem 3.5rem 3rem 1.5rem", overflow: "hidden",
        }}>
          <motion.div style={{
            scale: mockupScale, y: mockupY,
            width: "100%", maxWidth: 680,
            borderRadius: 14,
            boxShadow: "0 40px 100px rgba(0,0,0,0.55), 0 4px 20px rgba(0,0,0,0.3)",
            overflow: "hidden",
          }}>

            {/* Browser chrome — fades in as phase 1 completes */}
            <motion.div style={{ opacity: chromeOpacity }}>
              <div style={{
                background: "#1e1e1e", padding: "9px 14px",
                display: "flex", alignItems: "center", gap: 10,
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}>
                <div style={{ display: "flex", gap: 5 }}>
                  {["#ff5f57","#febc2e","#28c840"].map(c => (
                    <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, display: "block" }} />
                  ))}
                </div>
                <div style={{
                  flex: 1, background: "rgba(255,255,255,0.08)", borderRadius: 6,
                  padding: "4px 12px", fontFamily: T.body, fontSize: "0.62rem",
                  color: "rgba(255,255,255,0.35)",
                  maxWidth: 220,
                }}>reports.falcondesigns.co.uk</div>
                <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
                  {["June 2025"].map(l => (
                    <span key={l} style={{ fontFamily: T.body, fontSize: "0.62rem", color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.08)", padding: "2px 10px", borderRadius: 4 }}>{l}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Dashboard body */}
            <div style={{ display: "flex", height: 500, overflow: "hidden", background: "#fff" }}>

              {/* Left sidebar */}
              <motion.div style={{ opacity: chromeOpacity, flexShrink: 0 }}>
                <div style={{ width: 168, height: "100%", background: "#f8f8f8", borderRight: "1px solid #e8e8e8", padding: "1rem 0", display: "flex", flexDirection: "column" }}>
                  <div style={{ padding: "0.5rem 1rem 1rem", borderBottom: "1px solid #e8e8e8", marginBottom: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <div style={{ width: 22, height: 22, background: "#000", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M7 1L13 7L7 13L1 7L7 1Z" fill="white"/></svg>
                      </div>
                      <span style={{ fontFamily: T.display, fontSize: "0.72rem", fontWeight: 800, color: "#000" }}>Falcon Studio</span>
                    </div>
                  </div>
                  {SIDEBAR_ITEMS.map((item) => (
                    <div key={item.label} style={{ padding: "0.42rem 1rem", background: item.active ? "#e8edff" : "transparent", cursor: "pointer" }}>
                      <span style={{ fontFamily: T.body, fontSize: "0.68rem", color: item.active ? T.blue : "#444", fontWeight: item.active ? 600 : 400 }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Main content — scrolls up in phase 2 */}
              <div style={{ flex: 1, overflow: "hidden" }}>
                <motion.div style={{ y: innerY }}>

                  {/* Phase 1 visible: header + score cards */}
                  <div style={{ padding: "1rem 1.2rem 0.75rem", borderBottom: "1px solid #e8e8e8", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: T.display, fontSize: "0.95rem", fontWeight: 800, color: "#000" }}>Performance Overview</span>
                    <span style={{ fontFamily: T.body, fontSize: "0.6rem", color: "#888", background: "#f0f0f0", padding: "3px 10px", borderRadius: 100 }}>June 2025</span>
                  </div>

                  {/* Summary stat row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, padding: "0.75rem 1rem" }}>
                    {[
                      { label: "Avg. SEO Score", val: "90/100", delta: "↑ +3 vs May", good: true },
                      { label: "Updates Shipped", val: "34", delta: "This month", good: true },
                      { label: "Sites on Retainer", val: "6", delta: "All active", good: true },
                    ].map(s => (
                      <div key={s.label} style={{ background: "#f8f8f8", borderRadius: 8, padding: "0.6rem 0.8rem", border: "1px solid #efefef" }}>
                        <div style={{ fontFamily: T.body, fontSize: "0.58rem", color: "#888", marginBottom: 4 }}>{s.label}</div>
                        <div style={{ fontFamily: T.display, fontSize: "1.1rem", fontWeight: 800, color: "#000", lineHeight: 1 }}>{s.val}</div>
                        <div style={{ fontFamily: T.body, fontSize: "0.55rem", color: s.good ? "#16a34a" : "#dc2626", marginTop: 3 }}>{s.delta}</div>
                      </div>
                    ))}
                  </div>

                  {/* Client score list */}
                  <div style={{ padding: "0 1rem 0.75rem" }}>
                    <div style={{ fontFamily: T.body, fontSize: "0.62rem", fontWeight: 600, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Client Sites</div>
                    {RETAINER_CLIENTS.map(c => (
                      <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "0.4rem 0", borderBottom: "1px solid #f0f0f0" }}>
                        <img src={c.img} alt={c.name} style={{ width: 32, height: 32, borderRadius: 6, objectFit: "cover", flexShrink: 0 }} />
                        <span style={{ fontFamily: T.body, fontSize: "0.7rem", fontWeight: 500, color: "#222", flex: 1 }}>{c.name}</span>
                        <div style={{ width: 80, height: 4, background: "#f0f0f0", borderRadius: 2, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${c.score}%`, background: c.score >= 90 ? "#22c55e" : c.score >= 80 ? "#f59e0b" : "#ef4444", borderRadius: 2 }} />
                        </div>
                        <span style={{ fontFamily: T.display, fontSize: "0.68rem", fontWeight: 700, color: "#000", width: 28, textAlign: "right" }}>{c.score}</span>
                        <span style={{ fontFamily: T.body, fontSize: "0.6rem", color: c.change.startsWith("+") ? "#16a34a" : "#dc2626", width: 28, textAlign: "right" }}>{c.change}</span>
                        <span style={{ fontFamily: T.body, fontSize: "0.58rem", padding: "2px 7px", borderRadius: 100, background: c.status === "Healthy" ? "#dcfce7" : "#fef9c3", color: c.status === "Healthy" ? "#16a34a" : "#92400e" }}>{c.status}</span>
                      </div>
                    ))}
                  </div>

                  {/* Phase 2 revealed: update log */}
                  <div style={{ padding: "0.75rem 1rem 0", borderTop: "1px solid #e8e8e8" }}>
                    <div style={{ fontFamily: T.body, fontSize: "0.62rem", fontWeight: 600, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Recent Updates</div>
                    {UPDATE_LOG.map((u, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: u.dot, marginTop: 4, flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: T.body, fontSize: "0.65rem", fontWeight: 600, color: "#222" }}>{u.client}</div>
                          <div style={{ fontFamily: T.body, fontSize: "0.6rem", color: "#777" }}>{u.action}</div>
                        </div>
                        <span style={{ fontFamily: T.body, fontSize: "0.58rem", color: "#bbb", flexShrink: 0 }}>{u.time}</span>
                      </div>
                    ))}
                  </div>

                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ── FunkyButton — gold floods up from bottom, text + arrow flip ─────── */
const GOLD = "#c9a44a";
function FunkyButton() {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <motion.a
      href="#cta"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      animate={{ scale: pressed ? 0.96 : 1 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      style={{
        position: "relative", display: "inline-flex", alignItems: "center",
        gap: "0.85rem", width: "fit-content",
        border: `2px solid ${GOLD}`,
        padding: "1rem 2rem",
        overflow: "hidden",
        cursor: "pointer",
        textDecoration: "none",
        userSelect: "none",
      }}>

      {/* Gold fill rising from bottom */}
      <motion.div
        animate={{ y: hovered ? "0%" : "100%" }}
        transition={{ duration: 0.38, ease: [0.83, 0, 0.17, 1] }}
        style={{
          position: "absolute", inset: 0,
          background: GOLD,
          y: "100%",
          pointerEvents: "none",
        }}
      />

      {/* Label */}
      <motion.span
        animate={{ color: hovered ? "#1a0c0c" : "#fff" }}
        transition={{ duration: 0.18, delay: hovered ? 0.12 : 0 }}
        style={{
          position: "relative", zIndex: 1,
          fontFamily: T.body, fontSize: "0.9rem", fontWeight: 700,
          letterSpacing: "0.01em",
        }}>
        View retainer plans
      </motion.span>

      {/* Arrow — slides right + flips colour on hover */}
      <motion.span
        animate={{
          x: hovered ? 5 : 0,
          color: hovered ? "#1a0c0c" : GOLD,
        }}
        transition={{ duration: 0.22, delay: hovered ? 0.1 : 0, ease: EASE }}
        style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center" }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M8.5 3.5l5 4.5-5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.span>

      {/* Corner notch — top-right decorative cut */}
      <svg
        width="12" height="12" viewBox="0 0 12 12" fill="none"
        style={{ position: "absolute", top: -1, right: -1, pointerEvents: "none" }}>
        <path d="M12 0L12 12L0 0Z" fill="#1a0c0c"/>
        <path d="M12 0L0 0" stroke={GOLD} strokeWidth="2"/>
        <path d="M12 0L12 12" stroke={GOLD} strokeWidth="2"/>
      </svg>
    </motion.a>
  );
}

/* ── FloatingWidget (bob loop) ───────────────────────────────────────── */
function FloatingWidget({
  children, style, delay = 0,
}: { children: React.ReactNode; style?: React.CSSProperties; delay?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 4 + delay * 0.7, ease: "easeInOut", delay }}
      style={style}>
      {children}
    </motion.div>
  );
}

/* ── HorizontalScrollStrip — scroll-driven sticky horizontal strip ────── */
function HorizontalScrollStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  useEffect(() => {
    return scrollYProgress.on("change", v => {
      const strip = stripRef.current;
      if (!strip) return;
      const maxScroll = strip.scrollWidth - strip.clientWidth;
      strip.scrollLeft = v * maxScroll;
    });
  }, [scrollYProgress]);

  const WIDGETS: { el: React.ReactNode; w: number; delay: number; bob: number }[] = [
    {
      w: 260, delay: 0, bob: 0,
      el: (
        <div style={{ background: "#1a1a1a", borderRadius: 16, padding: "1.5rem", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
          <div style={{ fontFamily: T.display, fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1rem" }}>Support Us</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 }}>
            {["$10","$20","$50"].map((v, i) => (
              <div key={v} style={{ background: i === 0 ? T.blue : "#2a2a2a", borderRadius: 8, padding: "0.6rem 0", textAlign: "center", fontFamily: T.body, fontSize: "0.88rem", fontWeight: 600, color: i === 0 ? "#fff" : "rgba(255,255,255,0.6)" }}>{v}</div>
            ))}
          </div>
          <div style={{ background: "#2a2a2a", borderRadius: 8, padding: "0.6rem 0.9rem", fontFamily: T.body, fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>Custom Amount</div>
          <div style={{ background: T.lime, borderRadius: 8, padding: "0.75rem", textAlign: "center", fontFamily: T.body, fontSize: "0.88rem", fontWeight: 700, color: "#000" }}>Donate $10</div>
        </div>
      ),
    },
    {
      w: 300, delay: 0.1, bob: 0.5,
      el: (
        <div style={{ background: "#1a1a1a", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
          <div style={{ height: 160, backgroundImage: "url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=600&q=80)", backgroundSize: "cover", backgroundPosition: "center" }} />
          <div style={{ padding: "1.2rem" }}>
            <div style={{ fontFamily: T.display, fontSize: "0.7rem", fontWeight: 700, color: T.lime, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>Featured</div>
            <div style={{ fontFamily: T.display, fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "0.3rem" }}>Gold Properties</div>
            <div style={{ fontFamily: T.body, fontSize: "0.82rem", color: "rgba(255,255,255,0.4)" }}>4 bed · 3 bath · Kensington</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.9rem" }}>
              <span style={{ fontFamily: T.display, fontSize: "1.2rem", fontWeight: 800, color: "#fff" }}>£2.4M</span>
              <div style={{ background: T.blue, borderRadius: 6, padding: "0.4rem 0.9rem", fontFamily: T.body, fontSize: "0.7rem", fontWeight: 600, color: "#fff" }}>View</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      w: 240, delay: 0.2, bob: 1.0,
      el: (
        <div style={{ background: "#fff", borderRadius: 16, padding: "1.5rem", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
          <div style={{ fontFamily: T.body, fontSize: "0.7rem", color: T.muted, marginBottom: "0.5rem" }}>Net Revenue</div>
          <div style={{ fontFamily: T.display, fontSize: "2rem", fontWeight: 800, color: T.text, lineHeight: 1, marginBottom: "0.3rem" }}>$14,520</div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <span style={{ fontFamily: T.body, fontSize: "0.72rem", fontWeight: 700, color: "#16a34a" }}>▲ +129%</span>
            <span style={{ fontFamily: T.body, fontSize: "0.72rem", color: T.muted }}>vs last month</span>
          </div>
          <div style={{ marginTop: "1rem", height: 48, display: "flex", alignItems: "flex-end", gap: 4 }}>
            {[30,50,40,70,55,90,80,100,88,72,95,100].map((h, i) => (
              <div key={i} style={{ flex: 1, background: i >= 9 ? T.blue : "#f0f0f0", borderRadius: 2, height: `${h}%` }} />
            ))}
          </div>
        </div>
      ),
    },
    {
      w: 280, delay: 0.15, bob: 0.3,
      el: (
        <div style={{ background: "#1a1a1a", borderRadius: 16, padding: "1.5rem", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
          <div style={{ fontFamily: T.display, fontSize: "0.9rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>Add New Product</div>
          {["Product name","SKU","Price"].map(f => (
            <div key={f} style={{ marginBottom: 8 }}>
              <div style={{ fontFamily: T.body, fontSize: "0.62rem", color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>{f}</div>
              <div style={{ background: "#252525", borderRadius: 6, padding: "0.55rem 0.8rem", border: "1px solid rgba(255,255,255,0.08)" }} />
            </div>
          ))}
          <div style={{ background: T.blue, borderRadius: 8, padding: "0.7rem", textAlign: "center", marginTop: 12, fontFamily: T.body, fontSize: "0.78rem", fontWeight: 600, color: "#fff" }}>Save product</div>
        </div>
      ),
    },
    {
      w: 250, delay: 0.25, bob: 0.8,
      el: (
        <div style={{ background: "linear-gradient(135deg, #0f0f3d, #1a1a6e)", borderRadius: 16, padding: "1.5rem", border: "1px solid rgba(0,0,238,0.3)", boxShadow: "0 20px 60px rgba(0,0,238,0.2)" }}>
          <div style={{ fontFamily: T.display, fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.8rem" }}>Convert To</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {["USD","GBP","EUR"].map((c, i) => (
              <div key={c} style={{ flex: 1, textAlign: "center", padding: "0.4rem", background: i === 1 ? T.blue : "rgba(255,255,255,0.05)", borderRadius: 6, fontFamily: T.body, fontSize: "0.72rem", fontWeight: 600, color: i === 1 ? "#fff" : "rgba(255,255,255,0.5)" }}>{c}</div>
            ))}
          </div>
          <div style={{ fontFamily: T.display, fontSize: "2.2rem", fontWeight: 800, color: "#fff", marginBottom: "0.2rem" }}>£1,247.50</div>
          <div style={{ fontFamily: T.body, fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>= $1,580.00 USD</div>
        </div>
      ),
    },
    {
      w: 270, delay: 0.3, bob: 1.2,
      el: (
        <div style={{ background: "#1a1a1a", borderRadius: 16, padding: "1.5rem", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
          <div style={{ fontFamily: T.display, fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1rem" }}>Book Appointment</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 12 }}>
            {["Mon","Tue","Wed","Thu","Fri","Sat"].map((d, i) => (
              <div key={d} style={{ textAlign: "center", padding: "0.5rem 0.3rem", background: i === 2 ? T.lime : "#252525", borderRadius: 8, fontFamily: T.body, fontSize: "0.7rem", fontWeight: 600, color: i === 2 ? "#000" : "rgba(255,255,255,0.5)" }}>{d}</div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {["9:00","10:30","14:00"].map((t, i) => (
              <div key={t} style={{ flex: 1, textAlign: "center", padding: "0.45rem", background: i === 1 ? T.blue : "#252525", borderRadius: 6, fontFamily: T.body, fontSize: "0.68rem", fontWeight: 600, color: i === 1 ? "#fff" : "rgba(255,255,255,0.5)" }}>{t}</div>
            ))}
          </div>
          <div style={{ background: T.blue, borderRadius: 8, padding: "0.7rem", textAlign: "center", fontFamily: T.body, fontSize: "0.78rem", fontWeight: 600, color: "#fff" }}>Confirm Booking</div>
        </div>
      ),
    },
    {
      w: 220, delay: 0.1, bob: 0.6,
      el: (
        <div style={{ background: "linear-gradient(160deg, #1a0a2e, #2d1060)", borderRadius: 16, padding: "1.5rem", border: "1px solid rgba(139,92,246,0.3)", boxShadow: "0 20px 60px rgba(139,92,246,0.2)" }}>
          <div style={{ fontFamily: T.display, fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1rem" }}>Followers</div>
          <div style={{ fontFamily: T.display, fontSize: "2.8rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>84.2K</div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", margin: "0.5rem 0 1rem" }}>
            <span style={{ fontFamily: T.body, fontSize: "0.72rem", fontWeight: 700, color: "#a78bfa" }}>▲ +2,140</span>
            <span style={{ fontFamily: T.body, fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>this week</span>
          </div>
          <div style={{ height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2 }}>
            <div style={{ height: "100%", width: "68%", background: "linear-gradient(to right, #8b5cf6, #c4b5fd)", borderRadius: 2 }} />
          </div>
          <div style={{ fontFamily: T.body, fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", marginTop: 6 }}>68% to 100K goal</div>
        </div>
      ),
    },
    {
      w: 290, delay: 0.2, bob: 0.9,
      el: (
        <div style={{ background: "#111", borderRadius: 16, padding: "1.5rem", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <div style={{ fontFamily: T.display, fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Now Playing</div>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.lime, boxShadow: `0 0 8px ${T.lime}` }} />
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: "1.2rem" }}>
            <div style={{ width: 52, height: 52, borderRadius: 10, background: "linear-gradient(135deg, #ff6b6b, #feca57)", flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: T.display, fontSize: "0.95rem", fontWeight: 700, color: "#fff" }}>Golden Hour</div>
              <div style={{ fontFamily: T.body, fontSize: "0.72rem", color: "rgba(255,255,255,0.4)" }}>JVKE · This Is What</div>
            </div>
          </div>
          <div style={{ height: 3, background: "#2a2a2a", borderRadius: 2, marginBottom: 8 }}>
            <div style={{ height: "100%", width: "42%", background: T.lime, borderRadius: 2 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: T.body, fontSize: "0.65rem", color: "rgba(255,255,255,0.3)" }}>1:24</span>
            <span style={{ fontFamily: T.body, fontSize: "0.65rem", color: "rgba(255,255,255,0.3)" }}>3:21</span>
          </div>
        </div>
      ),
    },
    {
      w: 240, delay: 0.35, bob: 0.4,
      el: (
        <div style={{ background: "#1a1a1a", borderRadius: 16, padding: "1.5rem", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
          <div style={{ fontFamily: T.display, fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.8rem" }}>Customer Reviews</div>
          <div style={{ display: "flex", gap: 3, marginBottom: 8 }}>
            {[1,2,3,4,5].map(s => <div key={s} style={{ fontSize: "1.1rem", color: "#facc15" }}>★</div>)}
          </div>
          <div style={{ fontFamily: T.display, fontSize: "2rem", fontWeight: 800, color: "#fff", lineHeight: 1, marginBottom: 4 }}>4.9</div>
          <div style={{ fontFamily: T.body, fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginBottom: "1rem" }}>from 2,841 reviews</div>
          {[["Excellent",78],["Good",16],["Average",4],["Poor",2]].map(([l, p]) => (
            <div key={l as string} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
              <span style={{ fontFamily: T.body, fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", width: 56 }}>{l}</span>
              <div style={{ flex: 1, height: 4, background: "#252525", borderRadius: 2 }}>
                <div style={{ height: "100%", width: `${p}%`, background: "#facc15", borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      w: 260, delay: 0.15, bob: 1.4,
      el: (
        <div style={{ background: "linear-gradient(160deg, #0a1628, #0d2240)", borderRadius: 16, padding: "1.5rem", border: "1px solid rgba(59,130,246,0.25)", boxShadow: "0 20px 60px rgba(59,130,246,0.15)" }}>
          <div style={{ fontFamily: T.display, fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.8rem" }}>Event Countdown</div>
          <div style={{ fontFamily: T.display, fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>Summer Collection Drop</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6 }}>
            {[["04","Days"],["12","Hrs"],["37","Min"],["09","Sec"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center", background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: "0.6rem 0.3rem" }}>
                <div style={{ fontFamily: T.display, fontSize: "1.4rem", fontWeight: 800, color: "#fff", lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: T.body, fontSize: "0.6rem", color: "rgba(255,255,255,0.35)", marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ background: T.blue, borderRadius: 8, padding: "0.65rem", textAlign: "center", marginTop: 12, fontFamily: T.body, fontSize: "0.75rem", fontWeight: 600, color: "#fff" }}>Notify Me</div>
        </div>
      ),
    },
    {
      w: 240, delay: 0.05, bob: 0.7,
      el: (
        <div style={{ background: "#fff", borderRadius: 16, padding: "1.5rem", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
          <div style={{ fontFamily: T.body, fontSize: "0.7rem", color: T.muted, marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Inventory</div>
          {[["Trainers XL","In Stock",true],["Bomber Jacket","Low Stock",false],["Silk Dress","In Stock",true],["Leather Belt","Out",false]].map(([n, s, ok]) => (
            <div key={n as string} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.55rem 0", borderBottom: "1px solid #f0f0f0" }}>
              <span style={{ fontFamily: T.body, fontSize: "0.75rem", color: T.text }}>{n}</span>
              <span style={{ fontFamily: T.body, fontSize: "0.65rem", fontWeight: 600, color: ok ? "#16a34a" : s === "Low Stock" ? "#d97706" : "#dc2626" }}>{s}</span>
            </div>
          ))}
          <div style={{ background: T.text, borderRadius: 7, padding: "0.6rem", textAlign: "center", marginTop: 12, fontFamily: T.body, fontSize: "0.75rem", fontWeight: 600, color: "#fff" }}>Manage Stock</div>
        </div>
      ),
    },
    {
      w: 300, delay: 0.2, bob: 1.1,
      el: (
        <div style={{ background: "#1a1a1a", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
          <div style={{ height: 130, backgroundImage: "url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&w=600&q=80)", backgroundSize: "cover", backgroundPosition: "center" }} />
          <div style={{ padding: "1.1rem" }}>
            <div style={{ fontFamily: T.display, fontSize: "0.65rem", fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Recipe</div>
            <div style={{ fontFamily: T.display, fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "0.3rem" }}>Pan-Seared Salmon</div>
            <div style={{ display: "flex", gap: 12 }}>
              {[["⏱","25 min"],["🔥","380 cal"],["👤","2 serv"]].map(([ic, v]) => (
                <div key={v as string} style={{ fontFamily: T.body, fontSize: "0.68rem", color: "rgba(255,255,255,0.4)" }}>{ic} {v}</div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      w: 260, delay: 0.3, bob: 0.55,
      el: (
        <div style={{ background: "#1a1a1a", borderRadius: 16, padding: "1.5rem", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
          <div style={{ fontFamily: T.display, fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1rem" }}>Team</div>
          {[
            { name: "Sarah K.", role: "Lead Designer", col: "#8b5cf6" },
            { name: "James T.", role: "Developer", col: T.blue },
            { name: "Priya M.", role: "Strategist", col: "#ec4899" },
          ].map(m => (
            <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: m.col, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.display, fontSize: "0.75rem", fontWeight: 700, color: "#fff" }}>{m.name[0]}</div>
              <div>
                <div style={{ fontFamily: T.body, fontSize: "0.78rem", fontWeight: 600, color: "#fff" }}>{m.name}</div>
                <div style={{ fontFamily: T.body, fontSize: "0.65rem", color: "rgba(255,255,255,0.35)" }}>{m.role}</div>
              </div>
              <div style={{ marginLeft: "auto", width: 8, height: 8, borderRadius: "50%", background: T.lime }} />
            </div>
          ))}
        </div>
      ),
    },
    {
      w: 250, delay: 0.1, bob: 0.85,
      el: (
        <div style={{ background: "linear-gradient(135deg, #0a2a1e, #0d3d2a)", borderRadius: 16, padding: "1.5rem", border: "1px solid rgba(16,163,74,0.25)", boxShadow: "0 20px 60px rgba(16,163,74,0.1)" }}>
          <div style={{ fontFamily: T.display, fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.8rem" }}>Email Sign-up</div>
          <div style={{ fontFamily: T.display, fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginBottom: "0.3rem" }}>Stay in the loop</div>
          <div style={{ fontFamily: T.body, fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginBottom: "1rem" }}>Get weekly insights & design tips.</div>
          <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 8, padding: "0.6rem 0.9rem", fontFamily: T.body, fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", marginBottom: 8 }}>your@email.com</div>
          <div style={{ background: T.lime, borderRadius: 8, padding: "0.7rem", textAlign: "center", fontFamily: T.body, fontSize: "0.78rem", fontWeight: 700, color: "#000" }}>Subscribe</div>
        </div>
      ),
    },
  ];

  return (
    /* Tall container — scrolling through this drives the strip left/right */
    <div ref={containerRef} style={{ height: "calc(100vh + 4500px)" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {/* Heading */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem", marginBottom: "3rem", width: "100%" }}>
          <SlideReveal>
            <h2 style={{
              fontFamily: T.display,
              fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
              fontWeight: 800, letterSpacing: "-0.025em", color: "#fff", lineHeight: 1.05,
            }}>
              Design freely.<br />
              <span style={{ color: T.lime }}>No limits.</span>
            </h2>
          </SlideReveal>
        </div>
        {/* Strip — scrollLeft driven by scroll progress */}
        <div style={{ position: "relative" }}>
          <div
            ref={stripRef}
            style={{
              display: "flex", gap: 24, alignItems: "flex-start",
              overflowX: "hidden", overflowY: "visible",
              padding: "1rem 2.5rem 2.5rem",
              scrollbarWidth: "none",
            }}
          >
            <style>{`#work ::-webkit-scrollbar { display: none; }`}</style>
            {WIDGETS.map((w, i) => (
              <div key={i} style={{ flexShrink: 0, width: w.w }}>
                <FloatingWidget delay={w.bob}>
                  {w.el}
                </FloatingWidget>
              </div>
            ))}
            <div style={{ flexShrink: 0, width: 80 }} />
          </div>
          {/* Fade edges */}
          <div style={{ position: "absolute", top: 0, left: 0, width: 80, height: "100%", background: "linear-gradient(to right, #0a0a0a, transparent)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: "100%", background: "linear-gradient(to left, #0a0a0a, transparent)", pointerEvents: "none" }} />
        </div>
      </div>
    </div>
  );
}

/* ── HandwritingShowcase — Hacker Terminal Theme ─────────────────────── */
const HW_FONTS = {
  dancing: "'Dancing Script', cursive",
  caveat: "'Caveat', cursive",
  pacifico: "'Pacifico', cursive",
  pinyon: "'Pinyon Script', cursive",
  kalam: "'Kalam', cursive",
};

const TERM = {
  bg: "#000d00",
  card: "rgba(0,18,0,0.92)",
  border: "rgba(0,255,65,0.18)",
  borderHi: "rgba(0,255,65,0.45)",
  green: "#00ff41",
  greenDim: "rgba(0,255,65,0.55)",
  greenMuted: "rgba(0,255,65,0.28)",
  innerBg: "rgba(0,255,65,0.04)",
  innerBg2: "rgba(0,255,65,0.08)",
  glow: "0 0 20px rgba(0,255,65,0.15), 0 0 60px rgba(0,255,65,0.06)",
  font: "'VT323', monospace",
};

/* Matrix rain canvas */
function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const draw = ctx;
    const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノ01アABCDEF0123456789@#$%/\\|{}[]";
    const FS = 13;
    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;
    let cols = Math.floor(W / FS);
    const drops: number[] = Array.from({ length: cols }, () => Math.random() * -80);
    let raf = 0, last = 0;

    function frame(t: number) {
      raf = requestAnimationFrame(frame);
      if (t - last < 45) return;
      last = t;
      draw.fillStyle = "rgba(0,13,0,0.06)";
      draw.fillRect(0, 0, W, H);
      for (let i = 0; i < drops.length; i++) {
        const y = drops[i] * FS;
        if (y < 0) { drops[i] += 0.5; continue; }
        // bright head
        draw.fillStyle = "#afffaf";
        draw.font = `bold ${FS}px 'Courier New', monospace`;
        draw.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * FS, y);
        // dim trail char one step above head
        if (y > FS) {
          draw.fillStyle = "rgba(0,255,65,0.4)";
          draw.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * FS, y - FS);
        }
        drops[i] += 0.6;
        if (y > H && Math.random() > 0.978) drops[i] = Math.random() * -60;
      }
    }
    raf = requestAnimationFrame(frame);

    const ro = new ResizeObserver(() => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
      cols = Math.floor(W / FS);
      drops.length = 0;
      for (let i = 0; i < cols; i++) drops.push(Math.random() * -80);
    });
    ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return (
    <canvas ref={canvasRef} style={{
      position: "absolute", inset: 0, width: "100%", height: "100%",
      opacity: 0.6, zIndex: 0, display: "block",
    }} />
  );
}

function SvgHandwrite({ text, font, fontSize = 42, color = "#00ff41", width = 340, height = 90, delay = 0, triggerKey = 0 }: {
  text: string; font: string; fontSize?: number; color?: string;
  width?: number; height?: number; delay?: number; triggerKey?: number;
}) {
  const pathRef = useRef<SVGTextElement>(null);
  const [length, setLength] = useState(3000);
  const [go, setGo] = useState(false);

  useEffect(() => {
    setGo(false);
    const t = setTimeout(() => {
      if (pathRef.current) {
        const l = (pathRef.current as SVGTextElement).getComputedTextLength?.() ?? 3000;
        setLength(l + 50);
      }
      setTimeout(() => setGo(true), delay * 1000);
    }, 50);
    return () => clearTimeout(t);
  }, [text, font, triggerKey, delay]);

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible", display: "block", filter: go ? `drop-shadow(0 0 6px ${color}88)` : "none", transition: "filter 0.5s" }}>
      <text
        ref={pathRef}
        x={10} y={height * 0.72}
        fontFamily={font} fontSize={fontSize}
        fill="none" stroke={color} strokeWidth={1.8}
        strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray={`${length} ${length}`}
        strokeDashoffset={go ? 0 : length}
        style={{ transition: go ? `stroke-dashoffset ${Math.max(1.2, text.length * 0.07)}s cubic-bezier(0.4,0,0.2,1)` : "none" }}
      >
        {text}
      </text>
    </svg>
  );
}

function HwCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      flex: 1, background: TERM.card,
      border: `1px solid ${TERM.border}`,
      borderRadius: 12, padding: "2.5rem 2rem 2rem",
      display: "flex", flexDirection: "column", gap: "1.5rem",
      boxShadow: TERM.glow,
      minWidth: 0, overflow: "hidden", position: "relative",
    }}>
      {/* corner brackets */}
      <div style={{ position: "absolute", top: 10, left: 10, width: 10, height: 10, borderTop: `2px solid ${TERM.greenDim}`, borderLeft: `2px solid ${TERM.greenDim}` }} />
      <div style={{ position: "absolute", top: 10, right: 10, width: 10, height: 10, borderTop: `2px solid ${TERM.greenDim}`, borderRight: `2px solid ${TERM.greenDim}` }} />
      <div style={{ position: "absolute", bottom: 10, left: 10, width: 10, height: 10, borderBottom: `2px solid ${TERM.greenDim}`, borderLeft: `2px solid ${TERM.greenDim}` }} />
      <div style={{ position: "absolute", bottom: 10, right: 10, width: 10, height: 10, borderBottom: `2px solid ${TERM.greenDim}`, borderRight: `2px solid ${TERM.greenDim}` }} />

      <div style={{ fontFamily: TERM.font, fontSize: "1rem", letterSpacing: "0.18em", color: TERM.greenDim }}>
        &gt; {title.toUpperCase().replace(/\s/g, "_")}
      </div>
      {children}
    </div>
  );
}

const HW_STYLE_CYCLE = [
  { font: HW_FONTS.dancing, label: "Dancing Script", color: "#00ff41" },
  { font: HW_FONTS.caveat, label: "Caveat", color: "#afffaf" },
  { font: HW_FONTS.pacifico, label: "Pacifico", color: "#00ff41" },
  { font: HW_FONTS.pinyon, label: "Pinyon Script", color: "#7fff7f" },
  { font: HW_FONTS.kalam, label: "Kalam", color: "#00e538" },
];

function HwCardsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-10% 0px" });
  const [styleIdx, setStyleIdx] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setStyleIdx(i => (i + 1) % HW_STYLE_CYCLE.length);
      setTestimonialIdx(i => (i + 1) % 4);
      setCycleKey(k => k + 1);
    }, 3200);
    return () => clearInterval(id);
  }, [inView]);

  const curStyle = HW_STYLE_CYCLE[styleIdx];
  const testimonials = [
    { l: "Best decision", r: "we ever made." },
    { l: "They just", r: "get it." },
    { l: "Worth every", r: "penny." },
    { l: "Delivered beyond", r: "expectations." },
  ];

  const innerCard = (extra?: React.CSSProperties): React.CSSProperties => ({
    flex: 1, minWidth: 0, borderRadius: 8, padding: "1.6rem 1.4rem",
    background: TERM.innerBg, border: `1px solid ${TERM.border}`, overflow: "hidden",
    ...extra,
  });

  return (
    <div ref={ref} style={{ background: TERM.bg, borderRadius: 16, padding: "2.5rem", border: `1px solid ${TERM.border}`, boxShadow: TERM.glow }}>
      {/* Row 1 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
        {/* THE BRIEF */}
        <HwCard title="The Brief">
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", minWidth: 0 }}>
            <div style={innerCard()}>
              <div style={{ fontFamily: TERM.font, fontSize: "0.75rem", color: TERM.greenMuted, marginBottom: "0.75rem", letterSpacing: "0.12em" }}>// CLIENT_REQUEST</div>
              <SvgHandwrite text="Build me something" font={HW_FONTS.caveat} fontSize={30} color={TERM.green} width={260} height={72} delay={0.1} triggerKey={inView ? 1 : 0} />
              <SvgHandwrite text="that actually converts." font={HW_FONTS.caveat} fontSize={28} color={TERM.greenDim} width={260} height={72} delay={1.2} triggerKey={inView ? 1 : 0} />
            </div>
            <div style={{ display: "flex", alignItems: "center", paddingTop: "3.5rem" }}>
              <svg width={28} height={16} viewBox="0 0 32 18" fill="none"><path d="M0 9h28M20 2l8 7-8 7" stroke={TERM.green} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={innerCard({ background: TERM.innerBg2, borderColor: TERM.borderHi })}>
              <div style={{ fontFamily: TERM.font, fontSize: "0.75rem", color: TERM.greenMuted, marginBottom: "0.75rem", letterSpacing: "0.12em" }}>// RESPONSE</div>
              <SvgHandwrite text="Delivered." font={HW_FONTS.dancing} fontSize={52} color={TERM.green} width={260} height={96} delay={2.2} triggerKey={inView ? 1 : 0} />
              <svg width={180} height={14} viewBox="0 0 180 14" style={{ display: "block", marginTop: -14 }}>
                <path d="M8 10 Q90 2 172 10" fill="none" stroke={TERM.green} strokeWidth={2.5} strokeLinecap="round"
                  strokeDasharray="180 180" strokeDashoffset={inView ? 0 : 180}
                  style={{ transition: inView ? "stroke-dashoffset 0.6s 3s ease" : "none" }}
                />
              </svg>
            </div>
          </div>
        </HwCard>

        {/* THE CRAFT */}
        <HwCard title="The Craft">
          <div style={{ display: "flex", gap: "0.75rem", minWidth: 0 }}>
            <div style={innerCard({ background: "rgba(0,255,65,0.06)", transition: "background 0.4s" })}>
              <div style={{ fontFamily: TERM.font, fontSize: "0.75rem", color: TERM.greenMuted, marginBottom: "0.75rem", letterSpacing: "0.1em" }}>{curStyle.label.toUpperCase()}</div>
              <SvgHandwrite key={`opt2-l-${cycleKey}`} text="Falcon" font={curStyle.font} fontSize={56} color={curStyle.color} width={220} height={100} delay={0} triggerKey={cycleKey} />
            </div>
            <div style={innerCard()}>
              <div style={{ fontFamily: TERM.font, fontSize: "0.75rem", color: TERM.greenMuted, marginBottom: "0.75rem", letterSpacing: "0.1em" }}>YOUR_BRAND</div>
              <SvgHandwrite key={`opt2-r-${cycleKey}`} text="Designs." font={curStyle.font} fontSize={56} color={TERM.green} width={220} height={100} delay={0.5} triggerKey={cycleKey} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: "0.5rem" }}>
            {HW_STYLE_CYCLE.map((_, i) => (
              <div key={i} style={{ width: i === styleIdx ? 18 : 6, height: 4, borderRadius: 2, background: i === styleIdx ? TERM.green : TERM.greenMuted, transition: "all 0.3s" }} />
            ))}
          </div>
        </HwCard>
      </div>

      {/* Row 2 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        {/* BEFORE & AFTER */}
        <HwCard title="Before & After">
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", minWidth: 0 }}>
            <div style={innerCard()}>
              <div style={{ fontFamily: TERM.font, fontSize: "0.75rem", color: TERM.greenMuted, marginBottom: "0.75rem", letterSpacing: "0.1em" }}>BEFORE</div>
              <div style={{ position: "relative", display: "inline-block" }}>
                <SvgHandwrite text="Homepage?" font={HW_FONTS.kalam} fontSize={32} color={TERM.greenDim} width={240} height={68} delay={0.1} triggerKey={inView ? 1 : 0} />
                <svg width={180} height={8} viewBox="0 0 180 8" style={{ display: "block", marginTop: -48, marginLeft: 8 }}>
                  <line x1={0} y1={4} x2={168} y2={4} stroke="#ff4444" strokeWidth={2.5}
                    strokeDasharray="168 168" strokeDashoffset={inView ? 0 : 168}
                    style={{ transition: inView ? "stroke-dashoffset 0.5s 1.2s ease" : "none" }}
                  />
                </svg>
              </div>
              <SvgHandwrite text="Landing page? Both?" font={HW_FONTS.kalam} fontSize={28} color={TERM.greenMuted} width={240} height={68} delay={1.8} triggerKey={inView ? 1 : 0} />
            </div>
            <div style={{ display: "flex", alignItems: "center", paddingTop: "3rem" }}>
              <svg width={28} height={16} viewBox="0 0 32 18" fill="none"><path d="M0 9h28M20 2l8 7-8 7" stroke={TERM.green} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={innerCard({ background: TERM.innerBg2, borderColor: TERM.borderHi })}>
              <div style={{ fontFamily: TERM.font, fontSize: "0.75rem", color: TERM.greenMuted, marginBottom: "0.75rem", letterSpacing: "0.1em" }}>AFTER</div>
              <SvgHandwrite text="Done." font={HW_FONTS.dancing} fontSize={64} color={TERM.green} width={200} height={100} delay={3.2} triggerKey={inView ? 1 : 0} />
              <svg width={130} height={14} viewBox="0 0 130 14" style={{ display: "block", marginTop: -14, marginLeft: 8 }}>
                <path d="M4 10 Q65 2 126 10" fill="none" stroke={TERM.green} strokeWidth={2.5} strokeLinecap="round"
                  strokeDasharray="130 130" strokeDashoffset={inView ? 0 : 130}
                  style={{ transition: inView ? "stroke-dashoffset 0.5s 4.2s ease" : "none" }}
                />
              </svg>
            </div>
          </div>
        </HwCard>

        {/* WHAT CLIENTS WRITE */}
        <HwCard title="What Clients Write">
          <div style={{ display: "flex", gap: "0.75rem", minWidth: 0 }}>
            <div style={innerCard({ minHeight: 160 })}>
              <div style={{ fontFamily: TERM.font, fontSize: "1.2rem", color: TERM.greenMuted, marginBottom: "0.75rem" }}>❝</div>
              <SvgHandwrite key={`t-l-${testimonialIdx}`} text={testimonials[testimonialIdx].l} font={HW_FONTS.dancing} fontSize={38} color={TERM.greenDim} width={240} height={76} delay={0} triggerKey={testimonialIdx} />
            </div>
            <div style={innerCard({ background: TERM.innerBg2, borderColor: TERM.borderHi, minHeight: 160 })}>
              <div style={{ fontFamily: TERM.font, fontSize: "1.2rem", color: TERM.greenMuted, marginBottom: "0.75rem" }}>❞</div>
              <SvgHandwrite key={`t-r-${testimonialIdx}`} text={testimonials[testimonialIdx].r} font={HW_FONTS.dancing} fontSize={38} color={TERM.green} width={240} height={76} delay={0.6} triggerKey={testimonialIdx} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: "0.25rem" }}>
            {testimonials.map((_, i) => (
              <div key={i} style={{ width: i === testimonialIdx ? 18 : 6, height: 4, borderRadius: 2, background: i === testimonialIdx ? TERM.green : TERM.greenMuted, transition: "all 0.3s" }} />
            ))}
          </div>
        </HwCard>
      </div>
    </div>
  );
}

function HandwritingShowcase() {
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(id);
  }, []);

  /* Outer wrapper is 3× the viewport height so the sticky panel
     locks for 2 full screen-lengths of scroll, then releases naturally */
  return (
    <div style={{ height: "300vh", borderTop: `1px solid ${TERM.border}`, borderBottom: `1px solid ${TERM.border}` }}>
      <section style={{
        position: "sticky", top: 0,
        height: "100vh", overflow: "hidden",
        background: TERM.bg, display: "flex",
      }}>
        {/* ── Left 60% — matrix rain pane ── */}
        <div style={{ position: "relative", flex: "0 0 60%", overflow: "hidden" }}>
          <MatrixCanvas />
          {/* Scanlines */}
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)",
          }} />
          {/* Right-edge fade into right pane */}
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
            background: "linear-gradient(to right, transparent 70%, rgba(0,13,0,0.95) 100%)",
          }} />
          {/* Phosphor vignette */}
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
            background: "radial-gradient(ellipse at 40% 50%, transparent 45%, rgba(0,0,0,0.55) 100%)",
          }} />
          {/* Centred heading */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 3,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.2rem",
            padding: "4rem 3rem",
          }}>
            <div style={{ fontFamily: TERM.font, fontSize: "0.8rem", color: TERM.greenDim, letterSpacing: "0.28em" }}>
              SYSTEM:// TYPOGRAPHY_ENGINE v2.4.1
            </div>
            <h2 style={{
              fontFamily: TERM.font, fontSize: "clamp(2rem,4vw,3.6rem)", fontWeight: 400,
              lineHeight: 1.05, letterSpacing: "0.06em", color: TERM.green, textAlign: "center",
              textShadow: `0 0 30px ${TERM.green}66, 0 0 60px ${TERM.green}33`,
            }}>
              TYPOGRAPHY<br />IN MOTION
              <span style={{ opacity: blink ? 1 : 0, transition: "opacity 0.1s" }}>_</span>
            </h2>
            <div style={{ fontFamily: TERM.font, fontSize: "0.75rem", color: TERM.greenMuted, letterSpacing: "0.15em" }}>
              [RENDERING LIVE OUTPUT...]
            </div>
          </div>
        </div>

        {/* ── Right 40% — capability list ── */}
        <div style={{
          flex: "0 0 40%", background: "rgba(0,8,0,0.97)",
          borderLeft: `1px solid ${TERM.border}`,
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "4rem 3.5rem", gap: "2rem",
        }}>
          <div style={{ fontFamily: TERM.font, fontSize: "0.75rem", color: TERM.greenMuted, letterSpacing: "0.2em" }}>
            &gt; CAPABILITY_STACK.exe
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
            {[
              { label: "Custom typefaces", sub: "Hand-picked for your brand voice" },
              { label: "Handwriting animations", sub: "SVG draw-on effects that feel alive" },
              { label: "Variable font control", sub: "Weight, width, slant — all tuned" },
              { label: "Motion typography", sub: "Kinetic text that earns attention" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ fontFamily: TERM.font, fontSize: "0.85rem", color: TERM.green, flexShrink: 0, marginTop: 2 }}>
                  [{String(i + 1).padStart(2, "0")}]
                </div>
                <div>
                  <div style={{ fontFamily: TERM.font, fontSize: "1rem", color: TERM.green, letterSpacing: "0.08em" }}>{item.label}</div>
                  <div style={{ fontFamily: "'Wix Madefor Text', sans-serif", fontSize: "0.8rem", color: TERM.greenMuted, marginTop: "0.2rem", lineHeight: 1.5 }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <a href="#" onClick={e => e.preventDefault()} style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem",
            fontFamily: TERM.font, fontSize: "0.85rem", color: TERM.bg,
            background: TERM.green, padding: "0.7rem 1.4rem", borderRadius: 4,
            letterSpacing: "0.12em", textDecoration: "none", width: "fit-content",
            boxShadow: `0 0 20px ${TERM.green}55`,
          }}>
            SEE_TYPOGRAPHY_DEMOS &gt;
          </a>
        </div>
      </section>
    </div>
  );
}

/* ── Retro palette ───────────────────────────────────────────────────── */
const RETRO_NEON = { cyan: "#00f5ff", yellow: "#ffd600", pink: "#ff2d9b", green: "#39ff14", purple: "#bf00ff" };
const RETRO_GOLD = "#ffd600";

/* ── BtnShowcaseCard ─────────────────────────────────────────────────── */
function BtnShowcaseCard({ card }: { card: BtnCard }) {
  const [hovered, setHovered] = useState(false);
  const mergedStyle: React.CSSProperties = hovered
    ? { ...card.btn, ...card.hover }
    : { ...card.btn };
  return (
    <div style={{
      flexShrink: 0, width: 300, height: 168,
      background: card.cellBg,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: "1rem",
      border: `1.5px solid ${RETRO_GOLD}55`,
      boxShadow: `3px 3px 0 ${RETRO_GOLD}44`,
      padding: "1.2rem", position: "relative", overflow: "hidden",
    }}>
      {/* corner pip */}
      <div style={{ position: "absolute", top: 7, right: 7, width: 7, height: 7, border: `1.5px solid ${RETRO_GOLD}66` }} />
      <div style={{ position: "absolute", bottom: 7, left: 7, width: 7, height: 7, border: `1.5px solid ${RETRO_GOLD}44` }} />
      <a
        href="#"
        onClick={e => e.preventDefault()}
        style={mergedStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {card.badge && (
          <span style={{ background: "#22c55e", width: 8, height: 8, borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
        )}
        {card.label}
      </a>
      <div style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.33rem", color: RETRO_GOLD,
        opacity: 0.55, letterSpacing: "0.07em", textTransform: "uppercase",
      }}>{card.tag}</div>
    </div>
  );
}

/* ── BizMarqueeRow — button showcase edition ─────────────────────────── */
function BizMarqueeRow({ items, reverse = false }: {
  items: BtnCard[]; reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)" }}>
      <div
        className={reverse ? "biz-marquee-rtl" : "biz-marquee-ltr"}
        style={{ display: "flex", gap: 16, width: "max-content", paddingBottom: 4 }}>
        {doubled.map((card, i) => (
          <BtnShowcaseCard key={i} card={card} />
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════════ */
export default function FalconStudioPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* ── Global styles ─────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Wix+Madefor+Display:wght@400;500;600;700;800&family=Wix+Madefor+Text:wght@400;500;600;700&family=Dancing+Script:wght@400;700&family=Caveat:wght@400;700&family=Pacifico&family=Pinyon+Script&family=Kalam:wght@300;400;700&family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Press+Start+2P&family=VT323&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #ffffff; color: #000000; font-family: 'Wix Madefor Text', 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
        a { text-decoration: none; color: inherit; }
        img { display: block; max-width: 100%; }
        button { cursor: pointer; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }

        /* Nav */
        #fs-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; transition: background 0.5s cubic-bezier(0.23,1,0.32,1), border-color 0.5s cubic-bezier(0.23,1,0.32,1); border-bottom: 1px solid transparent; }
        #fs-nav.scrolled { background: rgba(255,255,255,0.96); backdrop-filter: blur(14px); border-color: #e8e8e8; }
        .nav-inner { max-width: 1280px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 0 2.5rem; height: 68px; }
        .nav-logo { font-family: 'Wix Madefor Display', sans-serif; font-size: 1rem; font-weight: 800; letter-spacing: -0.01em; color: #000; display: flex; align-items: center; gap: 0.5rem; }
        .nav-logo-sq { width: 26px; height: 26px; background: #000; border-radius: 4px; display: flex; align-items: center; justify-content: center; }
        .nav-links { display: flex; gap: 0; list-style: none; }
        .nav-link { font-family: 'Wix Madefor Text', sans-serif; font-size: 0.84rem; font-weight: 500; color: #000; padding: 0.4rem 0.9rem; display: flex; align-items: center; gap: 0.25rem; border-radius: 6px; transition: background 0.15s; cursor: pointer; }
        .nav-link:hover { background: #f4f4f4; }
        .nav-link svg { transition: transform 0.2s; }
        .nav-link:hover svg { transform: rotate(180deg); }
        .nav-right { display: flex; align-items: center; gap: 0.75rem; }
        .nav-login { font-family: 'Wix Madefor Text', sans-serif; font-size: 0.84rem; font-weight: 500; color: #000; padding: 0.4rem 0.75rem; border-radius: 6px; transition: background 0.15s; }
        .nav-login:hover { background: #f4f4f4; }
        .nav-cta { font-family: 'Wix Madefor Text', sans-serif; font-size: 0.82rem; font-weight: 700; color: #fff; background: #000; border: none; padding: 0.55rem 1.2rem; border-radius: 100px; transition: background 0.2s; }
        .nav-cta:hover { background: #222; }
        .burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; padding: 4px; }
        .burger span { display: block; width: 22px; height: 1.5px; background: #000; transition: all 0.3s cubic-bezier(0.23,1,0.32,1); }
        @media (max-width: 820px) { .nav-links { display: none; } .burger { display: flex; } .nav-inner { padding: 0 1.25rem; } }
        @media (max-width: 560px) { .nav-login { display: none; } }

        /* Marquee — feature strip */
        .marquee-wrap { overflow: hidden; border-top: 1px solid #e8e8e8; border-bottom: 1px solid #e8e8e8; background: #fff; }
        .marquee-track { display: flex; width: max-content; }
        .marquee-track.running { animation: scroll-left 36s linear infinite; }
        .marquee-track.running:hover { animation-play-state: paused; }
        .marquee-track-2 { display: flex; width: max-content; }
        .marquee-track-2.running { animation: scroll-left-2 48s linear infinite; }
        .marquee-track-2.running:hover { animation-play-state: paused; }
        @keyframes scroll-left  { from { transform: translateX(0);    } to { transform: translateX(-50%); } }
        @keyframes scroll-left-2{ from { transform: translateX(0);    } to { transform: translateX(-50%); } }

        /* Biz template marquee — two rows opposite directions */
        .biz-marquee-ltr { animation: biz-ltr 40s linear infinite; }
        .biz-marquee-ltr:hover { animation-play-state: paused; }
        .biz-marquee-rtl { animation: biz-rtl 40s linear infinite; }
        .biz-marquee-rtl:hover { animation-play-state: paused; }
        @keyframes biz-ltr { from { transform: translateX(0);    } to { transform: translateX(-50%); } }
        @keyframes biz-rtl { from { transform: translateX(-50%); } to { transform: translateX(0);    } }

        /* Feature item (border-bottom pattern) */
        .feat-item { display: flex; align-items: flex-start; justify-content: space-between; gap: 1.5rem; padding: 1.3rem 0; border-bottom: 1px solid #323232; }
        .feat-item:first-child { border-top: 1px solid #323232; }

        /* Dark card strip */
        .card-strip { display: flex; gap: 16px; overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none; cursor: grab; padding-bottom: 4px; }
        .card-strip::-webkit-scrollbar { display: none; }
        .card-strip:active { cursor: grabbing; }
        .tmpl-card { flex-shrink: 0; width: 320px; border-radius: 10px; overflow: hidden; background: #1a1a1a; border: 1px solid rgba(255,255,255,0.07); transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.3s; }
        .tmpl-card:hover { transform: translateY(-6px); border-color: rgba(255,255,255,0.18); }
        .card-chrome { background: #111; padding: 8px 12px; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .card-dots { display: flex; gap: 5px; }
        .card-dot { width: 10px; height: 10px; border-radius: 50%; }
        .card-url { flex: 1; background: #222; border-radius: 4px; padding: 3px 10px; font-family: 'Wix Madefor Text', sans-serif; font-size: 0.6rem; color: rgba(255,255,255,0.3); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .card-img { width: 100%; height: 196px; object-fit: cover; object-position: top; display: block; transition: transform 0.6s cubic-bezier(0.23,1,0.32,1); }
        .tmpl-card:hover .card-img { transform: scale(1.04); }
        .card-info { padding: 1rem 1.1rem 1.2rem; }
        .card-cat { font-family: 'Wix Madefor Text', sans-serif; font-size: 0.6rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #0000ee; margin-bottom: 0.2rem; }
        .card-title { font-family: 'Wix Madefor Display', sans-serif; font-size: 0.95rem; font-weight: 700; color: #fff; }

        /* FAQ */
        .faq-item { border-bottom: 1px solid #e8e8e8; }
        .faq-item:first-child { border-top: 1px solid #e8e8e8; }
        .faq-btn { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 0; background: none; border: none; font-family: 'Wix Madefor Display', sans-serif; font-size: 1.05rem; font-weight: 700; color: #000; text-align: left; gap: 1.5rem; transition: color 0.2s; }
        .faq-btn:hover { color: #0000ee; }
        .faq-chevron { flex-shrink: 0; width: 30px; height: 30px; border: 1.5px solid #323232; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: transform 0.4s cubic-bezier(0.83,0,0.17,1), background 0.25s, border-color 0.25s; }
        .faq-chevron.open { transform: rotate(180deg); background: #000; border-color: #000; }
        .faq-chevron svg { transition: stroke 0.25s; }
        .faq-chevron.open svg { stroke: #fff; }

        /* Stats */
        .stats-grid { display: grid; grid-template-columns: repeat(4,1fr); border-top: 1px solid rgba(255,255,255,0.07); }
        .stat-cell { padding: 3rem 2.5rem; border-right: 1px solid rgba(255,255,255,0.07); display: flex; flex-direction: column; gap: 0.4rem; }
        .stat-cell:last-child { border-right: none; }
        @media (max-width: 860px) { .stats-grid { grid-template-columns: 1fr 1fr; } .stat-cell:nth-child(2) { border-right: none; } .stat-cell { border-bottom: 1px solid rgba(255,255,255,0.07); } }

        /* Process */
        .process-grid { display: grid; grid-template-columns: repeat(4,1fr); }
        .process-cell { padding: 2.5rem; border-right: 1px solid #e8e8e8; }
        .process-cell:last-child { border-right: none; }
        @media (max-width: 860px) { .process-grid { grid-template-columns: 1fr 1fr; } .process-cell:nth-child(2) { border-right: none; } .process-cell { border-bottom: 1px solid #e8e8e8; } }

        /* Mobile menu */
        #mobile-menu { position: fixed; inset: 0; z-index: 199; background: #fff; padding-top: 90px; display: flex; flex-direction: column; align-items: center; gap: 0.2rem; overflow-y: auto; }

        /* Resources */
        .res-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        @media (max-width: 860px) { .res-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .res-grid { grid-template-columns: 1fr; } }

        /* Responsive */
        @media (max-width: 820px) {
          .split-2col { grid-template-columns: 1fr !important; }
          .hide-mobile { display: none !important; }
        }

        /* ── Retro Gaming ── */
        @keyframes retro-blink { 0%,100% { opacity:1; } 49% { opacity:1; } 50%,99% { opacity:0; } }
        @keyframes retro-flicker { 0%,100% { opacity:1; } 92% { opacity:1; } 93% { opacity:0.85; } 94% { opacity:1; } 97% { opacity:1; } 98% { opacity:0.9; } }
        .retro-cursor::after { content:"▮"; animation: retro-blink 1.1s step-end infinite; margin-left:0.15em; color:#ffe600; }
        .retro-flicker { animation: retro-flicker 6s ease-in-out infinite; }
        .retro-scanline {
          background-image: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.13) 3px, rgba(0,0,0,0.13) 4px);
          pointer-events: none;
        }
        .retro-card { transition: transform 0.15s, box-shadow 0.15s !important; }
        .retro-card:hover { transform: translate(-3px,-3px) !important; }
        .biz-marquee-ltr, .biz-marquee-rtl { will-change: transform; }
      `}</style>

      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <nav id="fs-nav" className={scrolled ? "scrolled" : ""}>
        <div className="nav-inner">
          <Link href="/showcase/falcon-studio" className="nav-logo">
            <div className="nav-logo-sq">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1L13 7L7 13L1 7L7 1Z" fill="white" />
              </svg>
            </div>
            FALCON STUDIO
          </Link>

          <ul className="nav-links">
            {[
              { label: "Product", arrow: true },
              { label: "Resources", arrow: true },
              { label: "Enterprise", arrow: true },
              { label: "Pricing", arrow: false },
            ].map(n => (
              <li key={n.label}>
                <a href="#" className="nav-link">
                  {n.label}
                  {n.arrow && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6l4 4 4-4" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-right">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ cursor: "pointer" }}>
              <circle cx="9" cy="9" r="7.5" stroke="#000" strokeWidth="1.4"/>
              <path d="M9 1.5C9 1.5 12 5 12 9s-3 7.5-3 7.5M9 1.5C9 1.5 6 5 6 9s3 7.5 3 7.5M1.5 9h15" stroke="#000" strokeWidth="1.4"/>
            </svg>
            <a href="#" className="nav-login">Log In</a>
            <button className="nav-cta">Start Creating</button>
            <button className="burger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
              <span style={menuOpen ? { transform: "rotate(45deg) translate(4.5px,4.5px)" } : {}} />
              <span style={menuOpen ? { opacity: 0, transform: "scaleX(0)" } : {}} />
              <span style={menuOpen ? { transform: "rotate(-45deg) translate(4.5px,-4.5px)" } : {}} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div id="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}>
            {["Product","Resources","Enterprise","Pricing","Log In"].map(l => (
              <a key={l} href="#" onClick={() => setMenuOpen(false)}
                style={{ fontFamily: T.display, fontSize: "1.8rem", fontWeight: 700, color: T.text, padding: "0.6rem 2rem" }}>
                {l}
              </a>
            ))}
            <button className="nav-cta" style={{ marginTop: "2rem", fontSize: "0.95rem", padding: "0.9rem 2.5rem" }}
              onClick={() => setMenuOpen(false)}>
              Start Creating
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} style={{
        position: "relative", minHeight: "100svh", display: "flex",
        flexDirection: "column", justifyContent: "center", alignItems: "center",
        textAlign: "center", overflow: "hidden", background: T.bg, paddingTop: 68,
      }}>
        <HeroCanvas />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 860, padding: "0 1.5rem 3rem", width: "100%" }}>
          {/* Kicker badge — glide in from left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            style={{ display: "inline-flex", marginBottom: "2rem" }}>
            <span style={{
              fontFamily: T.body, fontSize: "0.72rem", fontWeight: 600,
              border: `1.5px solid ${T.bDark}`, borderRadius: 100,
              padding: "0.32rem 0.9rem", letterSpacing: "0.04em", color: T.text,
            }}>Website building platform for designers, developers, and marketers</span>
          </motion.div>

          {/* Headline — clip-path wipe (motion-slideIn) */}
          <div style={{ overflow: "hidden" }}>
            <motion.h1
              initial={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", y: "4vw" }}
              animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", y: 0 }}
              transition={{ duration: 0.9, delay: 0.22, ease: WIX_EASE }}
              style={{
                fontFamily: T.display,
                fontSize: "clamp(3rem, 8vw, 7rem)",
                fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em",
                color: T.text, marginBottom: "1.5rem",
                textWrap: "balance",
              }}>
              Design with impact
              <br />
              Deliver at scale
            </motion.h1>
          </div>

          {/* Subtext — moveAnimation */}
          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: MOVE_EASE }}
            style={{
              fontFamily: T.body, fontSize: "clamp(1rem, 2vw, 1.12rem)",
              color: T.muted, lineHeight: 1.65, maxWidth: 500,
              margin: "0 auto 2.8rem",
            }}>
            The website building platform for designers, developers, and marketers.
          </motion.p>

          {/* CTA — glide up */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.6, ease: EASE }}>
            <a href="#cta" style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              fontFamily: T.body, fontSize: "0.92rem", fontWeight: 600,
              color: "#fff", background: T.blue,
              padding: "0.85rem 2.2rem", borderRadius: 100,
              transition: "background 0.2s, transform 0.14s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#0000cc"; (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = T.blue; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
              Start creating →
            </a>
          </motion.div>
        </div>

      </section>

      {/* ══════════════════════════════════════════════════════════════════
          HERO MOCKUP — scroll-driven: browser scales in, inner site scrolls
      ══════════════════════════════════════════════════════════════════ */}
      <HeroMockupSection />

      {/* ══════════════════════════════════════════════════════════════════
          FEATURE TABS
      ══════════════════════════════════════════════════════════════════ */}
      <FeatureTabs />

      {/* ══════════════════════════════════════════════════════════════════
          MARQUEE 1
      ══════════════════════════════════════════════════════════════════ */}
      <div className="marquee-wrap">
        <div className="marquee-track running">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "1.2rem", padding: "1rem 1.8rem", flexShrink: 0 }}>
              <span style={{ fontFamily: T.display, fontSize: "0.88rem", fontWeight: 600, color: T.text, whiteSpace: "nowrap" }}>
                {item}
              </span>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.blue, flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          FEATURE SECTION — 40/60 split, right side scroll-locked
      ══════════════════════════════════════════════════════════════════ */}
      <CinematicHero
        leftPanel={
          <div>
            {/* Kicker */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", marginBottom: "1.6rem" }}>
              <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.85)", flexShrink: 0 }} />
              <span style={{
                fontFamily: T.body, fontSize: "0.68rem", fontWeight: 700,
                color: "rgba(255,215,170,0.85)", textTransform: "uppercase", letterSpacing: "0.2em",
              }}>
                Mobile &amp; SEO
              </span>
            </div>

            {/* Heading — hero scale, tight tracking */}
            <h2 style={{
              fontFamily: T.display,
              fontSize: "clamp(2.6rem, 4.8vw, 4.6rem)",
              fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.04em",
              color: "#ffffff", marginBottom: "0.5rem",
              textWrap: "balance" as React.CSSProperties["textWrap"],
            }}>
              Built to rank.
            </h2>
            <h2 style={{
              fontFamily: T.display,
              fontSize: "clamp(2.6rem, 4.8vw, 4.6rem)",
              fontWeight: 300, lineHeight: 1.0, letterSpacing: "-0.035em",
              color: "rgba(255,220,190,0.75)", marginBottom: "1.8rem",
              textWrap: "balance" as React.CSSProperties["textWrap"],
            }}>
              Designed to convert.
            </h2>

            {/* Thin divider */}
            <div style={{ width: 40, height: 1.5, background: "rgba(255,255,255,0.3)", marginBottom: "1.6rem", borderRadius: 1 }} />

            {/* Body */}
            <p style={{
              fontFamily: T.body, fontSize: "1rem", lineHeight: 1.82,
              letterSpacing: "0.012em",
              color: "rgba(255,225,200,0.72)", marginBottom: "2rem", maxWidth: "34ch",
            }}>
              Every site we build is mobile-first, passes Core Web Vitals, and is structured for search engines from day one.
            </p>

            {/* Checklist */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", marginBottom: "2.4rem" }}>
              {[
                "Mobile-first responsive layouts",
                "Core Web Vitals optimised",
                "Structured data & semantic HTML",
                "Sub-2s load times, guaranteed",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M2 7l3.5 3.5L12 3.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontFamily: T.body, fontSize: "0.9rem", lineHeight: 1.5, color: "rgba(255,235,215,0.88)", fontWeight: 500, letterSpacing: "0.005em" }}>{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a href="#cta" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontFamily: T.body, fontSize: "0.9rem", fontWeight: 800,
              color: "#A83500", background: "#ffffff",
              padding: "1rem 2rem", borderRadius: 10,
              letterSpacing: "-0.01em",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}>
              Start ranking
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        }
      />

      {/* ══════════════════════════════════════════════════════════════════
          FEATURE CARDS — Cards 1 & 3
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: T.bg, padding: "6rem 0" }}>
        <div style={{ maxWidth: 1380, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>

            {/* CARD 1 — placeholder */}
            <Reveal delay={0}>
              <div style={{
                borderRadius: 20, overflow: "hidden",
                border: `1px solid ${T.border}`,
                minHeight: 480, background: T.surface,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: T.body, fontSize: "0.8rem", color: T.muted }}>Card 1</span>
              </div>
            </Reveal>

            {/* CARD 3 — placeholder */}
            <Reveal delay={0.06}>
              <div style={{
                borderRadius: 20, overflow: "hidden",
                border: `1px solid ${T.border}`,
                minHeight: 480, background: T.surface,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: T.body, fontSize: "0.8rem", color: T.muted }}>Card 3</span>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          DARK CANVAS — floating widgets with FlipReveal entrance
      ══════════════════════════════════════════════════════════════════ */}
      <section id="work" style={{ background: "#0a0a0a" }}>
        <HorizontalScrollStrip />
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          ENTERPRISE — scroll-driven two-phase mockup reveal
      ══════════════════════════════════════════════════════════════════ */}
      <EnterpriseSection />

      {/* ══════════════════════════════════════════════════════════════════
          NATIVE BUSINESS SOLUTIONS — RETRO GAMING
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#050d2e", padding: "8rem 0 6rem", position: "relative", overflow: "hidden" }}>
        {/* Scanline overlay across whole section */}
        <div className="retro-scanline" style={{ position: "absolute", inset: 0, opacity: 0.14, zIndex: 0 }} />
        {/* Pixel square grid bg */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `linear-gradient(rgba(255,214,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,214,0,0.12) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }} />
        {/* Subtle filled squares scattered — second layer with offset */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `linear-gradient(rgba(255,214,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,214,0,0.05) 1px, transparent 1px)`,
          backgroundSize: "8px 8px",
          backgroundPosition: "16px 16px",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem", marginBottom: "4.5rem" }}>
          <div className="split-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>

            {/* Left — retro headline */}
            <SlideReveal>
              <div style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "0.6rem", color: RETRO_NEON.cyan,
                letterSpacing: "0.1em", textTransform: "uppercase",
                marginBottom: "1.4rem", lineHeight: 2,
                textShadow: `0 0 8px ${RETRO_NEON.cyan}`,
              }}>
                &gt;&gt; SELECT YOUR SOLUTION_
              </div>
              <h2 className="retro-flicker" style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "clamp(1.1rem, 2.4vw, 1.75rem)",
                fontWeight: 400,
                lineHeight: 1.6,
                color: RETRO_NEON.yellow,
                textShadow: `3px 3px 0 #7a6000, 0 0 20px ${RETRO_NEON.yellow}66`,
                letterSpacing: "0.01em",
                marginBottom: "0.5rem",
              }}>
                EVERY CLICK.<br />CRAFTED.
              </h2>
            </SlideReveal>

            {/* Right — body + CTAs */}
            <Reveal delay={0.12}>
              <p style={{
                fontFamily: "'VT323', monospace",
                fontSize: "1.35rem",
                lineHeight: 1.65,
                color: "rgba(180,220,255,0.88)",
                marginBottom: "2rem",
                maxWidth: 400,
                letterSpacing: "0.03em",
              }}>
                NOT JUST A BUTTON. THE MOMENT SOMEONE DECIDES TO TRUST YOU.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                {/* Pixel CTA primary */}
                <a href="#cta" style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "0.52rem", color: "#06000f",
                  background: RETRO_NEON.pink,
                  padding: "0.85rem 1.6rem",
                  boxShadow: `4px 4px 0 #7a0040`,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  display: "inline-block",
                  transition: "transform 0.1s, box-shadow 0.1s",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0 #7a0040, 0 0 18px ${RETRO_NEON.pink}88`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 #7a0040`;
                  }}
                  onMouseDown={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translate(2px,2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0 #7a0040`;
                  }}>
                  ▶ START CREATING
                </a>
                {/* Ghost secondary */}
                <a href="#work" style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "0.48rem", color: RETRO_NEON.cyan,
                  border: `2px solid ${RETRO_NEON.cyan}`,
                  padding: "0.75rem 1.4rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  display: "inline-block",
                  textShadow: `0 0 8px ${RETRO_NEON.cyan}88`,
                  boxShadow: `3px 3px 0 ${RETRO_NEON.cyan}44`,
                  transition: "box-shadow 0.1s, text-shadow 0.1s",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 ${RETRO_NEON.cyan}, 0 0 14px ${RETRO_NEON.cyan}66`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `3px 3px 0 ${RETRO_NEON.cyan}44`;
                  }}>
                  ALL SOLUTIONS »
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Marquee rows */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
          <BizMarqueeRow items={BTN_ROW_1} reverse={false} />
          <BizMarqueeRow items={BTN_ROW_2} reverse={true} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          HANDWRITING SHOWCASE
      ══════════════════════════════════════════════════════════════════ */}
      <HandwritingShowcase />

      {/* ══════════════════════════════════════════════════════════════════
          MARQUEE 2
      ══════════════════════════════════════════════════════════════════ */}
      <div className="marquee-wrap">
        <div className="marquee-track-2 running">
          {[...MARQUEE_2, ...MARQUEE_2].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.5rem", flexShrink: 0 }}>
              <span style={{ fontFamily: T.body, fontSize: "0.62rem", fontWeight: 600, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Built by Falcon
              </span>
              <span style={{ fontFamily: T.display, fontSize: "0.9rem", fontWeight: 700, color: T.text }}>
                {item}
              </span>
              <span style={{ width: 4, height: 4, background: T.blue, borderRadius: "50%", flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          STATS BENTO
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: T.dark }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="stats-grid">
            {[
              { n: 12, s: "+", label: "Industries built" },
              { n: 20, s: "+", label: "Bespoke templates" },
              { n: 100, s: "%", label: "Custom code" },
              { n: 0, s: "", label: "Templates used" },
            ].map(s => (
              <div key={s.label} className="stat-cell">
                <span style={{
                  fontFamily: T.display,
                  fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
                  fontWeight: 800, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1,
                }}>
                  <Counter target={s.n} suffix={s.s} />
                </span>
                <span style={{ fontFamily: T.body, fontSize: "0.85rem", color: "rgba(255,255,255,0.38)", letterSpacing: "0.02em" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          RESOURCES — FlipReveal cards
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "8rem 2.5rem" }}>
        <SlideReveal style={{ marginBottom: "3rem" }}>
          <h2 style={{
            fontFamily: T.display,
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight: 800, letterSpacing: "-0.02em", color: T.text,
          }}>
            Everything you need to succeed
          </h2>
        </SlideReveal>

        {/* 4 hacker cards */}
        <div style={{ marginBottom: "4rem" }}>
          <HwCardsGrid />
        </div>

        <div className="res-grid">
          {RESOURCES.map((r, i) => (
            <FlipReveal key={r.kicker} delay={i * 0.1}>
              <div style={{
                borderRadius: 12, overflow: "hidden",
                border: `1px solid ${T.border}`, transition: "box-shadow 0.3s, transform 0.3s cubic-bezier(0.23,1,0.32,1)",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(0,0,0,0.1)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}>
                <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3" }}>
                  <img src={r.img} alt={r.kicker}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)")}
                    onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                  />
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ fontFamily: T.body, fontSize: "0.7rem", fontWeight: 700, color: T.blue, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.6rem" }}>
                    {r.kicker}
                  </div>
                  <p style={{ fontFamily: T.display, fontSize: "1rem", fontWeight: 700, color: T.text, lineHeight: 1.45, marginBottom: "1rem" }}>
                    {r.title}
                  </p>
                  <a href="#" style={{
                    fontFamily: T.body, fontSize: "0.82rem", fontWeight: 600, color: T.text,
                    display: "flex", alignItems: "center", gap: "0.3rem",
                    borderBottom: `1.5px solid ${T.text}`, paddingBottom: "0.1rem",
                    width: "fit-content",
                  }}>{r.cta}</a>
                </div>
              </div>
            </FlipReveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PROCESS
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <div className="process-grid" style={{ maxWidth: 1280, margin: "0 auto" }}>
          {[
            { n: "01", title: "Discovery", desc: "One call. We learn your business, your audience, and what sets you apart. No briefs, no forms." },
            { n: "02", title: "Design", desc: "A custom visual system — typography, colour, layout, motion — that couldn't belong to anyone else." },
            { n: "03", title: "Build", desc: "Next.js, TypeScript, zero templates. Clean code that loads fast and ranks well." },
            { n: "04", title: "Launch", desc: "Live in weeks. Deployment, domain setup, CMS handoff, and ongoing support included." },
          ].map((step, i) => (
            <GlideReveal key={step.n} delay={i * 0.08} y={24}>
              <div className="process-cell">
                <div style={{
                  fontFamily: T.display, fontSize: "3.5rem", fontWeight: 800,
                  color: "#f0f0f0", lineHeight: 1, letterSpacing: "-0.04em",
                  marginBottom: "1rem", userSelect: "none",
                }}>{step.n}</div>
                <h3 style={{ fontFamily: T.display, fontSize: "1.2rem", fontWeight: 700, color: T.text, marginBottom: "0.6rem" }}>{step.title}</h3>
                <p style={{ fontFamily: T.body, fontSize: "0.88rem", lineHeight: 1.72, color: T.muted }}>{step.desc}</p>
              </div>
            </GlideReveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FAQ — with smooth chevron rotation
      ══════════════════════════════════════════════════════════════════ */}
      <section id="faq" style={{ maxWidth: 960, margin: "0 auto", padding: "8rem 2.5rem" }}>
        <SlideReveal style={{ marginBottom: "3.5rem" }}>
          <h2 style={{
            fontFamily: T.display,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 800, letterSpacing: "-0.025em", color: T.text,
          }}>
            Falcon Studio FAQ
          </h2>
        </SlideReveal>
        <div>
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="faq-item">
                <button className="faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <span className={`faq-chevron${openFaq === i ? " open" : ""}`}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 4l4 4 4-4" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.37, 0, 0.63, 1] }}
                      style={{ overflow: "hidden" }}>
                      <p style={{
                        fontFamily: T.body, fontSize: "0.95rem", lineHeight: 1.78,
                        color: T.muted, paddingBottom: "1.5rem", maxWidth: 720,
                      }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          LIME CTA
      ══════════════════════════════════════════════════════════════════ */}
      <section id="cta" style={{ background: T.lime, padding: "6rem 2.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "3rem", flexWrap: "wrap" }}>
          <SlideReveal>
            <h2 style={{
              fontFamily: T.display,
              fontSize: "clamp(3.5rem, 10vw, 8.5rem)",
              fontWeight: 800, lineHeight: 0.92, letterSpacing: "-0.04em", color: T.text,
            }}>
              Start<br />creating.
            </h2>
          </SlideReveal>

          <GlideReveal delay={0.2} x={30}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "flex-end" }}>
              <a href="mailto:hello@falcondesigns.co.uk"
                style={{
                  width: 120, height: 120, borderRadius: "50%",
                  background: T.text, display: "flex", alignItems: "center", justifyContent: "center",
                  flexDirection: "column", gap: "0.3rem",
                  transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1), background 0.2s",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1.08)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontFamily: T.body, fontSize: "0.6rem", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center" }}>Get started</span>
              </a>
              <p style={{ fontFamily: T.body, fontSize: "0.85rem", color: "rgba(0,0,0,0.5)", textAlign: "right" }}>
                No commitment. One call.
              </p>
            </div>
          </GlideReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════════ */}
      <footer style={{ background: "#0a0a0a", color: "rgba(255,255,255,0.45)", padding: "5rem 2.5rem 2.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "4rem" }}>

            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.2rem" }}>
                <div style={{ width: 28, height: 28, background: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1L13 7L7 13L1 7L7 1Z" fill="#000" />
                  </svg>
                </div>
                <span style={{ fontFamily: T.display, fontSize: "1rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em" }}>FALCON STUDIO</span>
              </div>
              <p style={{ fontFamily: T.body, fontSize: "0.84rem", lineHeight: 1.72, maxWidth: 280, marginBottom: "1.8rem" }}>
                Falcon Studio is the website building platform for designers, developers, and marketers. With high-end design capabilities, streamlined workflows, and robust business tools.
              </p>
              <div style={{ display: "flex", gap: "1rem", minWidth: 0 }}>
                {[
                  { label: "YT", path: "M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58a2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" },
                  { label: "IG", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                  { label: "X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25z" },
                  { label: "TK", path: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.73a8.16 8.16 0 004.77 1.54V6.79a4.85 4.85 0 01-1-.1z" },
                ].map(s => (
                  <a key={s.label} href="#" style={{ color: "rgba(255,255,255,0.35)", transition: "color 0.2s" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)")}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 style={{ fontFamily: T.body, fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: "1.2rem" }}>PRODUCT</h4>
              {["Design","Development","Enterprise","Figma to Studio","AI Features","Visual Sitemap","Business Solutions","eCommerce","CMS","Management Tools","SEO","Security"].map(l => (
                <a key={l} href="#" style={{ display: "block", fontFamily: T.body, fontSize: "0.84rem", marginBottom: "0.45rem", color: "rgba(255,255,255,0.45)", transition: "color 0.2s" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)")}>
                  {l}
                </a>
              ))}
            </div>

            {/* Resources */}
            <div>
              <h4 style={{ fontFamily: T.body, fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: "1.2rem" }}>RESOURCES</h4>
              {["Studio Academy","Community","Forum","Inspiration","Marketing Resources","Blog","Partner Program","Help Center","Pricing","Brand Guidelines"].map(l => (
                <a key={l} href="#" style={{ display: "block", fontFamily: T.body, fontSize: "0.84rem", marginBottom: "0.45rem", color: "rgba(255,255,255,0.45)", transition: "color 0.2s" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)")}>
                  {l}
                </a>
              ))}
            </div>

            {/* More */}
            <div>
              <h4 style={{ fontFamily: T.body, fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: "1.2rem" }}>MORE FROM WIX</h4>
              {["Website Builder","Website Design","Website Templates","eCommerce Website","Appointment Scheduling","Portfolio Website","Blog Website"].map(l => (
                <a key={l} href="#" style={{ display: "block", fontFamily: T.body, fontSize: "0.84rem", marginBottom: "0.45rem", color: "rgba(255,255,255,0.45)", transition: "color 0.2s" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)")}>
                  {l}
                </a>
              ))}
            </div>

            {/* Company */}
            <div>
              <h4 style={{ fontFamily: T.body, fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: "1.2rem" }}>COMPANY</h4>
              {["About Wix","About Studio","Contact Us","Press & Media","Accessibility","Site Map","Careers"].map(l => (
                <a key={l} href="#" style={{ display: "block", fontFamily: T.body, fontSize: "0.84rem", marginBottom: "0.45rem", color: "rgba(255,255,255,0.45)", transition: "color 0.2s" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)")}>
                  {l}
                </a>
              ))}
            </div>
          </div>

          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.8rem",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: "0.75rem",
          }}>
            <span style={{ fontFamily: T.body, fontSize: "0.75rem" }}>© 2026 Falcon Designs Ltd. All rights reserved.</span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {["Privacy Policy","Terms of Use","Cookie Policy","Accessibility"].map(l => (
                <a key={l} href="#" style={{ fontFamily: T.body, fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", transition: "color 0.2s" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)")}>
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
