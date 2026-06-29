"use client";
import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });
const ScannerCardStream = dynamic(() => import("@/components/ScannerCardStream").then(m => ({ default: m.ScannerCardStream })), { ssr: false });
const CreditCardForm = dynamic(() => import("@/components/CreditCardForm").then(m => ({ default: m.CreditCardForm })), { ssr: false });
import { CinematicHero } from "@/components/ui/cinematic-hero";
import { WovenLightHero } from "@/components/ui/woven-light-hero";
import FlowArt, { FlowSection } from "@/components/ui/flow-art";

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

/* ── FAQ sub-components ──────────────────────────────────────────────── */

type FaqItem = { q: string; a: string };

/* ── FAQ Theme 1: Ransom Note — floating bubbles ─────────────────────── */
const RANSOM_FONTS = [
  "'Georgia', serif", "'Arial Black', sans-serif", "'Courier New', monospace",
  "'Times New Roman', serif", "'Impact', sans-serif", "'Trebuchet MS', sans-serif",
  "'Palatino', serif", "'Verdana', sans-serif",
];
const RANSOM_SIZES = ["0.75rem","1.1rem","0.9rem","1.3rem","0.8rem","1rem","1.2rem","0.85rem"];
const RANSOM_ROTATIONS = [-3,-6,2,4,-2,5,-4,3];
const RANSOM_BGS = ["#f5f0e8","#fff","#e8e0d0","#faf5ec","#ede7db","#f0ebe2","#e5dfd5","#fdf8f0"];

function RansomWord({ word, i }: { word: string; i: number }) {
  const font = RANSOM_FONTS[i % RANSOM_FONTS.length];
  const size = RANSOM_SIZES[i % RANSOM_SIZES.length];
  const rot  = RANSOM_ROTATIONS[i % RANSOM_ROTATIONS.length];
  const bg   = RANSOM_BGS[i % RANSOM_BGS.length];
  const bold = i % 3 === 0;
  const colors = ["#111","#c8001a","#0000cc","#111","#222","#b35000","#111","#006600"];
  const color  = colors[i % colors.length];
  return (
    <span style={{
      fontFamily: font, fontSize: size, fontWeight: bold ? 900 : 400,
      color, background: bg, display: "inline-block",
      transform: `rotate(${rot}deg)`, padding: "1px 3px", margin: "1px",
      border: i % 5 === 0 ? "1px solid #ccc" : "none",
      lineHeight: 1.2, verticalAlign: "middle",
    }}>{word}</span>
  );
}

function FaqBubbles({ faqs }: { faqs: FaqItem[] }) {
  const [bubble, setBubble] = useState<{ text: string; q: string; id: number } | null>(null);
  const [counter, setCounter] = useState(0);

  function show(q: string, a: string) { setCounter(c => c + 1); setBubble({ text: a, q, id: counter }); }

  return (
    <div onClick={() => setBubble(null)} style={{
      background: "#f2ede4",
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c4b89a' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      position: "relative", overflow: "hidden",
      borderRight: "1px solid #c4b89a", borderBottom: "1px solid #c4b89a",
      padding: "2.5rem", display: "flex", flexDirection: "column", height: "100%",
    }}>
      <div style={{ fontFamily: "'Courier New', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#8a7a5a", marginBottom: "1.5rem", textTransform: "uppercase" }}>
        ✂ cut here — click to reveal
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", flex: 1 }}>
        {faqs.map((f, qi) => (
          <button key={qi} onClick={e => { e.stopPropagation(); show(f.q, f.a); }}
            style={{ background: "none", border: "none", textAlign: "left", cursor: "pointer", padding: 0, lineHeight: 1.6 }}>
            <div style={{ display: "inline" }}>
              {f.q.split(" ").map((word, wi) => (
                <RansomWord key={wi} word={word} i={qi * 7 + wi} />
              ))}
              <span style={{ fontFamily: "'Courier New', monospace", fontSize: "0.65rem", color: "#8a7a5a", marginLeft: "0.5rem" }}>→</span>
            </div>
          </button>
        ))}
      </div>
      <div style={{ marginTop: "auto", fontFamily: "'Courier New', monospace", fontSize: "0.58rem", color: "#8a7a5a", borderTop: "1px dashed #c4b89a", paddingTop: "0.75rem" }}>
        no ransom demanded. just answers.
      </div>

      <AnimatePresence mode="wait">
        {bubble && (
          <motion.div key={bubble.id}
            initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={e => e.stopPropagation()}
            style={{
              position: "absolute", inset: "1.25rem", zIndex: 10,
              background: "#fff", padding: "2rem",
              boxShadow: "4px 4px 0 #c4b89a, 8px 8px 0 rgba(196,184,154,0.3)",
              border: "1px solid #c4b89a", display: "flex", flexDirection: "column", gap: "1rem",
            }}>
            {/* Tape strips */}
            <div aria-hidden style={{ position: "absolute", top: -10, left: "30%", width: 60, height: 20, background: "rgba(255,230,100,0.6)", transform: "rotate(-2deg)", border: "1px solid rgba(200,180,60,0.3)" }} />
            <div style={{ display: "inline", marginTop: "0.5rem" }}>
              {bubble.q.split(" ").map((w, i) => <RansomWord key={i} word={w} i={i + 11} />)}
            </div>
            <p style={{ fontFamily: "'Courier New', monospace", fontSize: "0.88rem", lineHeight: 1.75, color: "#333", margin: 0, borderTop: "1px dashed #ddd", paddingTop: "0.75rem" }}>{bubble.text}</p>
            <button onClick={() => setBubble(null)} style={{ alignSelf: "flex-end", fontFamily: "'Courier New', monospace", fontSize: "0.7rem", color: "#8a7a5a", background: "none", border: "1px solid #c4b89a", cursor: "pointer", padding: "0.3rem 0.75rem" }}>
              ✕ close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── FAQ Theme 2: Redacted CIA Document — filmstrip ──────────────────── */
function FaqFilmstrip({ faqs }: { faqs: FaqItem[] }) {
  const [revealed, setRevealed] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0); const scrollStart = useRef(0);

  function onMouseDown(e: React.MouseEvent) { setIsDragging(true); dragStart.current = e.clientX; scrollStart.current = trackRef.current?.scrollLeft ?? 0; }
  function onMouseMove(e: React.MouseEvent) { if (!isDragging || !trackRef.current) return; trackRef.current.scrollLeft = scrollStart.current - (e.clientX - dragStart.current); }
  function onMouseUp() { setIsDragging(false); }

  const docNums = ["DOC-7741-B", "DOC-3892-C", "DOC-5501-A"];

  return (
    <div style={{
      background: "#e8e0d0",
      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(0,0,0,0.04) 27px, rgba(0,0,0,0.04) 28px)",
      borderBottom: "1px solid #b8a888",
      padding: "2.5rem 0 2.5rem 2.5rem",
      display: "flex", flexDirection: "column", overflow: "hidden", height: "100%",
      position: "relative",
    }}>
      {/* Classified stamp */}
      <div aria-hidden style={{
        position: "absolute", top: "1.5rem", right: "1.5rem",
        border: "3px solid rgba(180,0,0,0.35)", padding: "0.2rem 0.5rem",
        transform: "rotate(8deg)", pointerEvents: "none",
        fontFamily: "'Arial Black', sans-serif", fontSize: "0.65rem", fontWeight: 900,
        color: "rgba(180,0,0,0.35)", letterSpacing: "0.18em",
      }}>CLASSIFIED</div>

      <div style={{ fontFamily: "'Courier New', monospace", fontSize: "0.6rem", color: "#5a4a3a", letterSpacing: "0.12em", marginBottom: "1.25rem" }}>
        CENTRAL INTELLIGENCE AGENCY · FALCON DIVISION<br />
        <span style={{ color: "#8a6a4a" }}>DRAG TO BROWSE · CLICK TO DECLASSIFY</span>
      </div>

      <div ref={trackRef} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
        style={{ display: "flex", gap: "1.25rem", overflowX: "auto", paddingRight: "2.5rem", paddingBottom: "1rem", scrollbarWidth: "none", cursor: isDragging ? "grabbing" : "grab", userSelect: "none", flex: 1, alignItems: "flex-start" }}>
        {faqs.map((f, i) => {
          const isRevealed = revealed === i;
          return (
            <div key={i} onClick={() => { if (!isDragging) setRevealed(isRevealed ? null : i); }}
              style={{ flexShrink: 0, width: 220, minHeight: 200, background: "#f5f0e5", border: "1px solid #b8a888", padding: "1.25rem", cursor: "pointer", position: "relative", boxShadow: "2px 2px 0 rgba(0,0,0,0.1)" }}>
              {/* Document header */}
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: "0.55rem", color: "#8a6a4a", letterSpacing: "0.1em", marginBottom: "0.75rem", borderBottom: "1px solid #c8b898", paddingBottom: "0.5rem" }}>
                {docNums[i]} · PAGE 1 OF 1
              </div>
              {/* Question */}
              <p style={{ fontFamily: "'Courier New', monospace", fontSize: "0.78rem", color: "#2a1a0a", lineHeight: 1.5, marginBottom: "1rem", fontWeight: 700 }}>{f.q}</p>
              {/* Answer with redaction bars */}
              <div style={{ position: "relative" }}>
                <p style={{ fontFamily: "'Courier New', monospace", fontSize: "0.75rem", color: "#3a2a1a", lineHeight: 1.65, margin: 0, opacity: isRevealed ? 1 : 0.15, transition: "opacity 0.4s ease" }}>
                  {f.a}
                </p>
                {!isRevealed && (
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", gap: "0.3rem", justifyContent: "center" }}>
                    {[100, 85, 95, 60].map((w, ri) => (
                      <div key={ri} style={{ height: 14, width: `${w}%`, background: "#111", borderRadius: 1 }} />
                    ))}
                  </div>
                )}
              </div>
              {/* Declassify label */}
              <div style={{ marginTop: "1rem", fontFamily: "'Courier New', monospace", fontSize: "0.55rem", color: isRevealed ? "rgba(0,120,0,0.8)" : "rgba(180,0,0,0.6)", letterSpacing: "0.12em" }}>
                {isRevealed ? "► DECLASSIFIED" : "► CLICK TO DECLASSIFY"}
              </div>
              {/* Corner fold */}
              <div aria-hidden style={{ position: "absolute", bottom: 0, right: 0, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 18px 18px", borderColor: `transparent transparent #b8a888 transparent` }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── FAQ Theme 3: Retro Arcade — flip cards ──────────────────────────── */
const ARC = {
  bg: "#0d0221", surface: "#12042e",
  neonPink: "#ff2d78", neonYellow: "#ffe600", neonCyan: "#00f5ff",
  text: "#ffffff", muted: "rgba(255,255,255,0.45)",
  font: "'VT323', monospace",
  body: "'DM Sans', 'Inter', sans-serif",
};
function FaqFlipCards({ faqs }: { faqs: FaqItem[] }) {
  const [flipped, setFlipped] = useState<number | null>(null);
  const neons = [ARC.neonPink, ARC.neonYellow, ARC.neonCyan];

  return (
    <div style={{
      background: ARC.bg, borderRight: "1px solid rgba(255,45,120,0.15)",
      padding: "2.5rem", display: "flex", flexDirection: "column", height: "100%",
      position: "relative", overflow: "hidden",
    }}>
      {/* Scanlines */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.12) 3px,rgba(0,0,0,0.12) 4px)", zIndex: 1 }} />
      {/* Corner pixel decorations */}
      <div aria-hidden style={{ position: "absolute", top: 12, left: 12, width: 16, height: 16, borderTop: `2px solid ${ARC.neonPink}`, borderLeft: `2px solid ${ARC.neonPink}`, zIndex: 1 }} />
      <div aria-hidden style={{ position: "absolute", top: 12, right: 12, width: 16, height: 16, borderTop: `2px solid ${ARC.neonCyan}`, borderRight: `2px solid ${ARC.neonCyan}`, zIndex: 1 }} />
      <div aria-hidden style={{ position: "absolute", bottom: 12, left: 12, width: 16, height: 16, borderBottom: `2px solid ${ARC.neonCyan}`, borderLeft: `2px solid ${ARC.neonCyan}`, zIndex: 1 }} />
      <div aria-hidden style={{ position: "absolute", bottom: 12, right: 12, width: 16, height: 16, borderBottom: `2px solid ${ARC.neonPink}`, borderRight: `2px solid ${ARC.neonPink}`, zIndex: 1 }} />

      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", height: "100%", gap: "0.85rem" }}>
        <div style={{ fontFamily: ARC.font, fontSize: "1rem", color: ARC.neonPink, letterSpacing: "0.2em", textShadow: `0 0 12px ${ARC.neonPink}`, marginBottom: "0.25rem" }}>
          ★ ARCADE FAQ — FLIP TO REVEAL ★
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
          {faqs.map((f, i) => {
            const neon = neons[i % 3];
            return (
              <div key={i} onClick={() => setFlipped(flipped === i ? null : i)} style={{ perspective: "900px", cursor: "pointer", flex: 1 }}>
                <motion.div animate={{ rotateY: flipped === i ? 180 : 0 }} transition={{ duration: 0.6, ease: EASE }}
                  style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", minHeight: 75 }}>
                  {/* Front — arcade question panel */}
                  <div style={{
                    position: "absolute", inset: 0, background: ARC.surface,
                    border: `1px solid ${neon}`, padding: "0.85rem 1.1rem",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    backfaceVisibility: "hidden",
                    boxShadow: `0 0 12px rgba(${neon === ARC.neonPink ? "255,45,120" : neon === ARC.neonYellow ? "255,230,0" : "0,245,255"},0.15), inset 0 0 20px rgba(0,0,0,0.3)`,
                  }}>
                    <div>
                      <div style={{ fontFamily: ARC.font, fontSize: "0.7rem", color: neon, letterSpacing: "0.14em", marginBottom: "0.2rem", textShadow: `0 0 6px ${neon}` }}>STAGE {i + 1}</div>
                      <p style={{ fontFamily: ARC.font, fontSize: "clamp(0.9rem, 1.3vw, 1.1rem)", color: ARC.text, margin: 0, lineHeight: 1.3 }}>{f.q}</p>
                    </div>
                    <span style={{ fontFamily: ARC.font, fontSize: "1.4rem", color: neon, flexShrink: 0, marginLeft: "0.75rem", textShadow: `0 0 8px ${neon}` }}>▶</span>
                  </div>
                  {/* Back — answer */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: neon === ARC.neonYellow ? ARC.neonYellow : neon === ARC.neonCyan ? "#001a1a" : "#1a0012",
                    border: `1px solid ${neon}`, padding: "0.85rem 1.1rem",
                    display: "flex", alignItems: "center", backfaceVisibility: "hidden", transform: "rotateY(180deg)",
                    boxShadow: `inset 0 0 30px rgba(0,0,0,0.4)`,
                  }}>
                    <p style={{ fontFamily: ARC.body, fontSize: "0.82rem", color: neon === ARC.neonYellow ? "#000" : ARC.text, margin: 0, lineHeight: 1.6 }}>{f.a}</p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
        <div style={{ fontFamily: ARC.font, fontSize: "0.75rem", color: ARC.muted, letterSpacing: "0.1em" }}>
          INSERT COIN TO CONTINUE...
        </div>
      </div>
    </div>
  );
}

/* ── FAQ Theme 4: Vaporwave — accordion ──────────────────────────────── */
function FaqNewspaper({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{
      background: "linear-gradient(160deg, #1a0533 0%, #0d1a3a 50%, #001a2e 100%)",
      padding: "2.5rem", display: "flex", flexDirection: "column", height: "100%",
      position: "relative", overflow: "hidden",
    }}>
      {/* Perspective grid floor */}
      <div aria-hidden style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "45%", zIndex: 0,
        backgroundImage: `linear-gradient(rgba(255,50,220,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,50,220,0.25) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        transform: "perspective(300px) rotateX(55deg)",
        transformOrigin: "bottom center",
        maskImage: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
      }} />
      {/* Glow orbs */}
      <div aria-hidden style={{ position: "absolute", top: "10%", left: "60%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,50,220,0.18) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div aria-hidden style={{ position: "absolute", top: "30%", left: "10%", width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,220,255,0.12) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Chrome header text */}
        <div style={{ marginBottom: "1rem", flexShrink: 0 }}>
          <div style={{ fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.52rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(0,220,255,0.6)", marginBottom: "0.3rem" }}>
            A E S T H E T I C · FAQ
          </div>
          <div style={{
            fontFamily: "'Arial Black','Impact',sans-serif", fontSize: "clamp(0.85rem,1.4vw,1.1rem)",
            fontWeight: 900, letterSpacing: "0.05em",
            background: "linear-gradient(90deg, #ff32dc, #00dcff, #ff32dc)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 8px rgba(255,50,220,0.5))",
            lineHeight: 1.2,
          }}>DREAM ANSWERS</div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const accentColors = ["#ff32dc", "#00dcff", "#ffe600"];
            const accent = accentColors[i % 3];
            return (
              <div key={i} onClick={() => setOpen(isOpen ? null : i)}
                style={{ borderTop: `1px solid rgba(255,255,255,0.08)`, paddingTop: "0.9rem", paddingBottom: "0.9rem", cursor: "pointer", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem", color: accent, letterSpacing: "0.1em", opacity: 0.8, filter: `drop-shadow(0 0 4px ${accent})`, flexShrink: 0 }}>◈</span>
                    <h3 style={{
                      fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "clamp(0.85rem,1.4vw,1rem)",
                      fontWeight: 700, lineHeight: 1.25, margin: 0,
                      color: isOpen ? accent : "rgba(255,255,255,0.9)",
                      textShadow: isOpen ? `0 0 12px ${accent}` : "none",
                      transition: "color 0.3s, text-shadow 0.3s",
                    }}>{f.q}</h3>
                  </div>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }}
                    style={{ color: accent, fontSize: "1.1rem", flexShrink: 0, filter: `drop-shadow(0 0 6px ${accent})`, lineHeight: 1, marginTop: 2 }}>+</motion.span>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.38, ease: [0.37, 0, 0.63, 1] }} style={{ overflow: "hidden" }}>
                      <div style={{ marginTop: "0.75rem", paddingLeft: "1.5rem", borderLeft: `2px solid ${accent}` }}>
                        <p style={{ fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.85rem", lineHeight: 1.75, color: "rgba(255,255,255,0.55)", margin: 0 }}>{f.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", color: "rgba(255,50,220,0.4)", paddingTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          ░░ FALCON STUDIO ░░ EST. MMXXV ░░
        </div>
      </div>
    </div>
  );
}

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
    <div ref={containerRef} data-nav-theme="hero" style={{ height: `${FEATURE_TABS.length * 100}vh`, position: "relative" }}>
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
            <style>{`#work ::-webkit-scrollbar { display: none; }
        .flow-left-scroller::-webkit-scrollbar { display: none; }`}</style>
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

/* ── FontShowcase — Scroll-driven typography specimen ────────────────── */
const FONT_PAIRS = [
  {
    name: "Press Start 2P",
    category: "Pixel Display",
    tag: "Retro · Bold · Iconic",
    headlineFont: "'Press Start 2P', monospace",
    bodyFont: "'VT323', monospace",
    headline: "STAND OUT.",
    sub: "DEMAND ATTENTION.",
    body: "For brands that refuse to blend in. Gaming studios, streetwear, tech startups. This font doesn't ask for attention — it takes it.",
    weights: ["Regular 400"],
    bg: "#0a0014",
    surface: "#12001e",
    text: "#ffd600",
    muted: "rgba(255,214,0,0.5)",
    accent: "#ffd600",
    navTheme: "dark" as const,
  },
  {
    name: "Playfair Display",
    category: "Editorial Serif",
    tag: "Luxury · Authority",
    headlineFont: "'Playfair Display', Georgia, serif",
    bodyFont: "'Wix Madefor Text', 'Inter', sans-serif",
    headline: "Luxury, refined.",
    sub: "Authority without noise.",
    body: "The serif of choice for law firms, luxury hotels, and editorial brands. Playfair Display commands the page with timeless elegance.",
    weights: ["Regular 400", "Bold 700", "ExtraBold 900", "Italic"],
    bg: "#120608",
    surface: "#1e0a10",
    text: "#f5f0eb",
    muted: "rgba(245,220,200,0.55)",
    accent: "#d4a574",
    navTheme: "dark" as const,
  },
  {
    name: "DM Serif Display",
    category: "Editorial Serif",
    tag: "Sharp · Contemporary",
    headlineFont: "'DM Serif Display', Georgia, serif",
    bodyFont: "'Wix Madefor Text', 'Inter', sans-serif",
    headline: "Sharp. Intentional.",
    sub: "The editorial choice.",
    body: "DM Serif Display brings precision and personality. Designed for agencies, studios, and premium services that want presence — not noise.",
    weights: ["Regular 400", "Italic"],
    bg: "#f8f5f0",
    surface: "#ede8e0",
    text: "#0d0d0d",
    muted: "#6a6060",
    accent: "#D45C20",
    navTheme: "hacker" as const,
  },
] as const;

function FontPairSpecimen({ fp }: { fp: typeof FONT_PAIRS[number] }) {
  return (
    <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "3rem 4rem" }}>
      {/* Watermark letter */}
      <div aria-hidden style={{
        position: "absolute", right: "-0.05em", top: "50%",
        transform: "translateY(-52%)",
        fontFamily: fp.headlineFont,
        fontSize: "clamp(10rem, 20vw, 20rem)",
        fontWeight: 900,
        color: `${fp.accent}09`,
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
      }}>
        {fp.headline[0]}
      </div>

      {/* Tag chip */}
      <div style={{
        display: "inline-flex", alignItems: "center",
        marginBottom: "1.5rem",
        background: `${fp.accent}15`,
        border: `1px solid ${fp.accent}33`,
        borderRadius: 4, padding: "0.3rem 0.75rem",
        width: "fit-content",
      }}>
        <span style={{ fontFamily: T.body, fontSize: "0.65rem", fontWeight: 700, color: fp.accent, letterSpacing: "0.15em", textTransform: "uppercase" as const }}>
          {fp.tag}
        </span>
      </div>

      {/* Headline */}
      <div style={{
        fontFamily: fp.headlineFont,
        fontSize: "clamp(2.8rem, 6vw, 5rem)",
        fontWeight: 700,
        color: fp.text,
        lineHeight: 1.0,
        letterSpacing: "-0.03em",
        marginBottom: "0.2rem",
      }}>
        {fp.headline}
      </div>
      <div style={{
        fontFamily: fp.headlineFont,
        fontSize: "clamp(2.8rem, 6vw, 5rem)",
        fontWeight: 300,
        fontStyle: "italic",
        color: fp.muted,
        lineHeight: 1.0,
        letterSpacing: "-0.03em",
        marginBottom: "2.5rem",
      }}>
        {fp.sub}
      </div>

      {/* Divider */}
      <div style={{ width: 60, height: 2, background: fp.accent, marginBottom: "1.5rem" }} />

      {/* Body */}
      <p style={{
        fontFamily: fp.bodyFont,
        fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
        color: fp.muted,
        lineHeight: 1.8,
        maxWidth: 460,
        marginBottom: "2.5rem",
      }}>
        {fp.body}
      </p>

      {/* Weight chips */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" as const }}>
        {fp.weights.map(w => (
          <div key={w} style={{
            fontFamily: fp.headlineFont,
            fontSize: "0.75rem",
            color: fp.text,
            background: fp.surface,
            border: `1px solid ${fp.muted}30`,
            borderRadius: 4,
            padding: "0.3rem 0.75rem",
          }}>
            {w}
          </div>
        ))}
      </div>
    </div>
  );
}

function HackerFontSpecimen({ fp }: { fp: typeof FONT_PAIRS[number] }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden" }}>

      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0 }}><MatrixCanvas /></div>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "rgba(0,13,0,0.6)", zIndex: 1 }} />
      <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "55%", zIndex: 2, mixBlendMode: "screen", overflow: "hidden" }}>
        <WovenLightHero hideContent bgColor="transparent" />
      </div>

      {/* Scanline */}
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.015) 2px, rgba(0,255,65,0.015) 4px)", pointerEvents: "none", zIndex: 3 }} />

      {/* Top label */}
      <div style={{ position: "relative", zIndex: 3, padding: "clamp(1.5rem,4vw,3rem) clamp(1.5rem,4vw,3rem) 0", pointerEvents: "none" }}>
        <div style={{ fontFamily: TERM.font, fontSize: "0.6rem", color: TERM.greenDim, letterSpacing: "0.3em", marginBottom: "0.5rem" }}>
          FALCON_STUDIO / TYPOGRAPHY / FONT_03
        </div>
        <div style={{ width: "100%", height: 1, background: TERM.border }} />
      </div>

      {/* Centre */}
      <div style={{ position: "relative", zIndex: 3, display: "flex", flexDirection: "column", gap: "1.5rem", padding: "0 clamp(1.5rem,4vw,3rem)", pointerEvents: "none" }}>

        <div style={{ fontFamily: TERM.font, fontSize: "0.7rem", color: TERM.greenDim, letterSpacing: "0.2em" }}>
          &gt;&gt; LOADING_TYPEFACE...
        </div>

        {/* Big display name */}
        <div style={{ fontFamily: TERM.font, fontSize: "clamp(2.5rem, 4.5vw, 4rem)", color: TERM.green, lineHeight: 1, letterSpacing: "0.05em", textShadow: `0 0 40px ${TERM.green}55` }}>
          {fp.name.toUpperCase().replace(/ /g, "\n")}
        </div>

        {/* Tag with dot */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", width: "fit-content" }}>
          <div style={{ width: 8, height: 8, background: TERM.green, borderRadius: "50%", boxShadow: `0 0 10px ${TERM.green}` }} />
          <span style={{ fontFamily: TERM.font, fontSize: "0.65rem", color: TERM.green, letterSpacing: "0.2em" }}>
            {fp.tag.toUpperCase().replace(/ /g, "_").replace(/·/g, "/")}
          </span>
        </div>

        {/* Category */}
        <div style={{ fontFamily: TERM.font, fontSize: "0.55rem", color: TERM.greenDim, letterSpacing: "0.2em" }}>
          [{fp.category.toUpperCase().replace(/ /g, "-")}]
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ flex: 1, height: 1, background: TERM.border }} />
          <span style={{ fontFamily: TERM.font, fontSize: "0.5rem", color: TERM.greenDim, letterSpacing: "0.2em" }}>v2.4.1</span>
          <div style={{ flex: 1, height: 1, background: TERM.border }} />
        </div>

        {/* Font index list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {FONT_PAIRS.map((pair, i) => (
            <div key={pair.name} style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <span style={{ fontFamily: TERM.font, fontSize: "0.5rem", color: i === 2 ? TERM.green : TERM.greenDim, minWidth: "1.2rem" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div style={{ width: 16, height: 1, background: i === 2 ? TERM.green : TERM.border }} />
              <span style={{ fontFamily: TERM.font, fontSize: "0.55rem", color: i === 2 ? TERM.green : TERM.greenDim, letterSpacing: "0.1em", textShadow: i === 2 ? `0 0 8px ${TERM.green}` : "none" }}>
                {pair.name.toUpperCase().replace(/ /g, "_")}
              </span>
              {i === 2 && <span style={{ fontFamily: TERM.font, fontSize: "0.5rem", color: TERM.green, marginLeft: "auto" }}>◀ ACTIVE</span>}
            </div>
          ))}
        </div>

        {/* Weight chips */}
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" as const }}>
          {fp.weights.map((w) => (
            <span key={w} style={{ fontFamily: TERM.font, fontSize: "0.5rem", color: TERM.greenDim, border: `1px solid ${TERM.border}`, padding: "0.25rem 0.6rem", letterSpacing: "0.1em" }}>
              {w.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom status */}
      <div style={{ position: "relative", zIndex: 3, padding: "0 clamp(1.5rem,4vw,3rem) clamp(1.5rem,4vw,3rem)", pointerEvents: "none" }}>
        <div style={{ width: "100%", height: 1, background: TERM.border, marginBottom: "0.75rem" }} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: TERM.font, fontSize: "0.5rem", color: TERM.greenDim, letterSpacing: "0.2em" }}>SCROLL TO EXPLORE</span>
          <span style={{ fontFamily: TERM.font, fontSize: "0.5rem", color: TERM.greenDim, letterSpacing: "0.15em" }}>{FONT_PAIRS.length} FONTS LOADED</span>
        </div>
      </div>

      {/* CTA — bottom right */}
      <div style={{ position: "absolute", bottom: 0, right: 0, width: "45%", zIndex: 4, padding: "2.5rem", background: "linear-gradient(to top, rgba(0,13,0,0.92) 0%, rgba(0,13,0,0.5) 60%, transparent 100%)", pointerEvents: "none" }}>
        <p style={{ fontFamily: T.body, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)", marginBottom: "0.75rem" }}>Typography &amp; Backgrounds</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.4rem, 2.2vw, 2rem)", fontWeight: 700, lineHeight: 1.15, color: "#fff", marginBottom: "1rem", letterSpacing: "-0.02em" }}>Any choice.<br />We can build it.</h2>
        <p style={{ fontFamily: T.body, fontSize: "clamp(0.75rem, 0.95vw, 0.85rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>Every font and background you see here is just the start. We have a million more combinations — tailored precisely to your brand.</p>
      </div>

    </div>
  );
}

function GoldInkFontSpecimen({ fp }: { fp: typeof FONT_PAIRS[number] }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>

      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0 }}><GoldInkCanvas /></div>
      <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "55%", zIndex: 1, mixBlendMode: "screen", overflow: "hidden" }}>
        <WovenLightHero hideContent bgColor="transparent" />
      </div>

      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, padding: "3rem 4rem", pointerEvents: "none" }}>

        {/* Watermark letter */}
        <div aria-hidden style={{
          position: "absolute", right: "-0.05em", top: "50%",
          transform: "translateY(-52%)",
          fontFamily: fp.headlineFont,
          fontSize: "clamp(10rem, 20vw, 20rem)",
          fontWeight: 900,
          color: `${fp.accent}09`,
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}>
          {fp.headline[0]}
        </div>

        {/* Tag chip */}
        <div style={{ display: "inline-flex", alignItems: "center", marginBottom: "1.5rem", background: `${fp.accent}15`, border: `1px solid ${fp.accent}33`, borderRadius: 4, padding: "0.3rem 0.75rem", width: "fit-content" }}>
          <span style={{ fontFamily: T.body, fontSize: "0.65rem", fontWeight: 700, color: fp.accent, letterSpacing: "0.15em", textTransform: "uppercase" as const }}>
            {fp.tag}
          </span>
        </div>

        {/* Headline */}
        <div style={{ fontFamily: fp.headlineFont, fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 700, color: fp.text, lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: "0.2rem" }}>
          {fp.headline}
        </div>
        <div style={{ fontFamily: fp.headlineFont, fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 300, fontStyle: "italic", color: fp.muted, lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: "2.5rem" }}>
          {fp.sub}
        </div>

        {/* Divider */}
        <div style={{ width: 60, height: 2, background: fp.accent, marginBottom: "1.5rem" }} />

        {/* Body */}
        <p style={{ fontFamily: fp.bodyFont, fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)", color: fp.muted, lineHeight: 1.8, maxWidth: 460, marginBottom: "2.5rem" }}>
          {fp.body}
        </p>

        {/* Weight chips */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" as const }}>
          {fp.weights.map(w => (
            <div key={w} style={{ fontFamily: fp.headlineFont, fontSize: "0.75rem", color: fp.text, background: `${fp.accent}18`, border: `1px solid ${fp.accent}30`, borderRadius: 4, padding: "0.3rem 0.75rem" }}>
              {w}
            </div>
          ))}
        </div>
      </div>

      {/* CTA — bottom right */}
      <div style={{ position: "absolute", bottom: 0, right: 0, width: "45%", zIndex: 3, padding: "2.5rem", background: "linear-gradient(to top, rgba(18,6,8,0.92) 0%, rgba(18,6,8,0.5) 60%, transparent 100%)", pointerEvents: "none" }}>
        <p style={{ fontFamily: T.body, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)", marginBottom: "0.75rem" }}>Typography &amp; Backgrounds</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.4rem, 2.2vw, 2rem)", fontWeight: 700, lineHeight: 1.15, color: "#fff", marginBottom: "1rem", letterSpacing: "-0.02em" }}>Any choice.<br />We can build it.</h2>
        <p style={{ fontFamily: T.body, fontSize: "clamp(0.75rem, 0.95vw, 0.85rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>Every font and background you see here is just the start. We have a million more combinations — tailored precisely to your brand.</p>
      </div>

    </div>
  );
}

function StarWarpFontSpecimen({ fp }: { fp: typeof FONT_PAIRS[number] }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>

      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0 }}><StarWarpCanvas /></div>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 30%, rgba(10,0,20,0.85) 100%)", zIndex: 1 }} />
      <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "55%", zIndex: 2, mixBlendMode: "screen", overflow: "hidden" }}>
        <WovenLightHero hideContent bgColor="transparent" />
      </div>

      <div style={{ position: "relative", zIndex: 3, display: "flex", flexDirection: "column", gap: "2rem", padding: "clamp(1.5rem,4vw,3rem)", pointerEvents: "none" }}>

        {/* Tag chip */}
        <div style={{ background: `${fp.accent}20`, border: `1px solid ${fp.accent}50`, borderRadius: 4, padding: "0.3rem 0.9rem", width: "fit-content" }}>
          <span style={{ fontFamily: fp.headlineFont, fontSize: "0.55rem", color: fp.accent, letterSpacing: "0.2em" }}>
            {fp.tag.toUpperCase()}
          </span>
        </div>

        {/* Headline */}
        <div style={{ fontFamily: fp.headlineFont, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: fp.text, lineHeight: 1.1, letterSpacing: "0.05em", textShadow: `0 0 60px ${fp.accent}99, 0 0 20px ${fp.accent}66` }}>
          {fp.headline}
        </div>
        <div style={{ fontFamily: fp.headlineFont, fontSize: "clamp(1.2rem, 2.5vw, 2rem)", color: fp.muted, letterSpacing: "0.08em", textShadow: `0 0 30px ${fp.accent}55` }}>
          {fp.sub}
        </div>

        {/* Divider */}
        <div style={{ width: 60, height: 2, background: fp.accent, boxShadow: `0 0 12px ${fp.accent}` }} />

        {/* Body */}
        <p style={{ fontFamily: fp.bodyFont, fontSize: "clamp(0.85rem, 1.2vw, 1rem)", color: fp.muted, lineHeight: 1.8, maxWidth: 380 }}>
          {fp.body}
        </p>

        {/* Weight chips */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" as const, justifyContent: "center" }}>
          {fp.weights.map(w => (
            <div key={w} style={{ fontFamily: fp.headlineFont, fontSize: "0.65rem", color: fp.text, background: `${fp.accent}15`, border: `1px solid ${fp.accent}40`, borderRadius: 4, padding: "0.3rem 0.75rem" }}>
              {w}
            </div>
          ))}
        </div>
      </div>

      {/* CTA — bottom right */}
      <div style={{ position: "absolute", bottom: 0, right: 0, width: "45%", zIndex: 4, padding: "2.5rem", background: "linear-gradient(to top, rgba(10,0,20,0.92) 0%, rgba(10,0,20,0.5) 60%, transparent 100%)", pointerEvents: "none" }}>
        <p style={{ fontFamily: T.body, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)", marginBottom: "0.75rem" }}>Typography &amp; Backgrounds</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.4rem, 2.2vw, 2rem)", fontWeight: 700, lineHeight: 1.15, color: "#fff", marginBottom: "1rem", letterSpacing: "-0.02em" }}>Any choice.<br />We can build it.</h2>
        <p style={{ fontFamily: T.body, fontSize: "clamp(0.75rem, 0.95vw, 0.85rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>Every font and background you see here is just the start. We have a million more combinations — tailored precisely to your brand.</p>
      </div>

    </div>
  );
}

function cardBg(fp: typeof FONT_PAIRS[number]): string {
  if (fp.name === "DM Serif Display") return TERM.bg;
  if (fp.name === "Playfair Display") return "#120608";
  return fp.bg as string;
}

function FontShowcase() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const rightColRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!rightColRef.current) return;
      const rect = rightColRef.current.getBoundingClientRect();
      const scrolledIn = -rect.top;
      const cardH = window.innerHeight;
      const idx = Math.max(0, Math.min(FONT_PAIRS.length - 1, Math.floor((scrolledIn + cardH * 0.6) / cardH)));
      setActiveIdx(idx);
      if (wrapperRef.current) wrapperRef.current.dataset.navTheme = FONT_PAIRS[idx].navTheme;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLight = false; // all cards are now dark-themed

  return (
    <div ref={wrapperRef} data-nav-theme={FONT_PAIRS[0].navTheme} style={{ position: "relative" }}>

      {/* Full-width sticky background — sits behind everything, takes no scroll space */}
      <div style={{ position: "sticky", top: 0, height: "100vh", marginBottom: "-100vh", overflow: "hidden", zIndex: 0 }}>

        {/* Layer 0 — StarWarp (Press Start 2P) */}
        <div style={{ position: "absolute", inset: 0, background: "#0a0014", opacity: activeIdx === 0 ? 1 : 0, transition: "opacity 0.8s ease" }}>
          <StarWarpCanvas />
          <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 30%, rgba(10,0,20,0.85) 100%)" }} />
        </div>

        {/* Layer 1 — BurgundyInk (Playfair Display) */}
        <div style={{ position: "absolute", inset: 0, background: "#120608", opacity: activeIdx === 1 ? 1 : 0, transition: "opacity 0.8s ease" }}>
          <GoldInkCanvas />
        </div>

        {/* Layer 2 — Matrix (DM Serif) */}
        <div style={{ position: "absolute", inset: 0, background: TERM.bg, opacity: activeIdx === 2 ? 1 : 0, transition: "opacity 0.8s ease" }}>
          <MatrixCanvas />
          <div aria-hidden style={{ position: "absolute", inset: 0, background: "rgba(0,13,0,0.55)" }} />
        </div>

        {/* WovenLightHero lives in a separate sticky layer above the cards — see below */}

      </div>


      {/* Cards column — full width, provides scroll height */}
      <div ref={rightColRef} style={{ width: "100%", position: "relative", zIndex: 1 }}>

        <FlowArt>
          {FONT_PAIRS.map((fp, i) => (
            <FlowSection key={fp.name} aria-label={fp.name} style={{
              background: fp.name === "Playfair Display" ? "#120608"
                        : fp.name === "DM Serif Display" ? TERM.bg
                        : fp.bg as string
            }}>
              {fp.name === "Playfair Display" ? <GoldInkFontSpecimen fp={fp} /> : fp.name === "DM Serif Display" ? <HackerFontSpecimen fp={fp} /> : fp.name === "Press Start 2P" ? <StarWarpFontSpecimen fp={fp} /> : <FontPairSpecimen fp={fp} />}
            </FlowSection>
          ))}
          {/* Dwell spacer inside FlowArt */}
          <div style={{ height: "100vh" }} aria-hidden />
        </FlowArt>
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

/* ── BurgundyInkCanvas — Crimson ink diffusion on near-black wine ────── */
function GoldInkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;

    type Drop = { x: number; y: number; r: number; maxR: number; alpha: number; speed: number; hue: number };
    const drops: Drop[] = [];
    let raf: number;

    function spawnDrop() {
      // hue 340–355 = deep crimson/wine, occasionally 15–25 = warm rose
      const isCrimson = Math.random() > 0.3;
      drops.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0,
        maxR: 150 + Math.random() * 300,
        alpha: 0.18 + Math.random() * 0.18,
        speed: 0.25 + Math.random() * 0.35,
        hue: isCrimson ? 340 + Math.random() * 15 : 15 + Math.random() * 12,
      });
    }

    for (let i = 0; i < 12; i++) spawnDrop();
    let spawnTimer = 0;

    function draw() {
      ctx!.fillStyle = "rgba(18,6,8,0.012)";
      ctx!.fillRect(0, 0, W, H);

      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.r += d.speed;
        const progress = d.r / d.maxR;
        const a = d.alpha * (1 - progress * progress);

        const grad = ctx!.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r);
        grad.addColorStop(0,   `hsla(${d.hue},70%,28%,${a})`);
        grad.addColorStop(0.45,`hsla(${d.hue + 5},60%,20%,${a * 0.5})`);
        grad.addColorStop(1,   `hsla(${d.hue},50%,15%,0)`);

        ctx!.beginPath();
        ctx!.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx!.fillStyle = grad;
        ctx!.fill();

        if (d.r >= d.maxR) drops.splice(i, 1);
      }

      spawnTimer++;
      if (spawnTimer > 80) { spawnDrop(); spawnTimer = 0; }

      raf = requestAnimationFrame(draw);
    }

    ctx.fillStyle = "#120608";
    ctx.fillRect(0, 0, W, H);
    draw();

    const ro = new ResizeObserver(() => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
      ctx!.fillStyle = "#120608";
      ctx!.fillRect(0, 0, W, H);
    });
    ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return (
    <canvas ref={canvasRef} style={{
      position: "absolute", inset: 0, width: "100%", height: "100%",
      zIndex: 0, display: "block",
    }} />
  );
}

/* ── StarWarpCanvas — Hyperspace star warp ───────────────────────────── */
function StarWarpCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;
    const NUM = 220;
    const stars = Array.from({ length: NUM }, () => ({
      x: (Math.random() - 0.5) * W,
      y: (Math.random() - 0.5) * H,
      z: Math.random() * W,
      pz: 0,
    }));
    stars.forEach(s => { s.pz = s.z; });
    let raf: number;
    function draw() {
      ctx!.fillStyle = "#0a0014";
      ctx!.fillRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;
      for (const s of stars) {
        s.pz = s.z;
        s.z -= 4;
        if (s.z <= 0) {
          s.x = (Math.random() - 0.5) * W;
          s.y = (Math.random() - 0.5) * H;
          s.z = W;
          s.pz = s.z;
        }
        const sx = (s.x / s.z) * W + cx;
        const sy = (s.y / s.z) * H + cy;
        const px = (s.x / s.pz) * W + cx;
        const py = (s.y / s.pz) * H + cy;
        const size = Math.max(0.5, (1 - s.z / W) * 2.5);
        const alpha = 1 - s.z / W;
        // trail
        ctx!.beginPath();
        ctx!.moveTo(px, py);
        ctx!.lineTo(sx, sy);
        ctx!.strokeStyle = `rgba(255,214,0,${alpha * 0.7})`;
        ctx!.lineWidth = size;
        ctx!.stroke();
        // star dot
        ctx!.beginPath();
        ctx!.arc(sx, sy, size * 0.8, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,230,80,${alpha})`;
        ctx!.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
    const ro = new ResizeObserver(() => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
    });
    ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return (
    <canvas ref={canvasRef} style={{
      position: "absolute", inset: 0, width: "100%", height: "100%",
      zIndex: 0, display: "block",
    }} />
  );
}

/* ── PacManCanvas — Pac-Man inspired animated background ─────────────── */
function PacManCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const draw = ctx;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const DOT_GAP    = 34;
    const DOT_R      = 2.8;
    const POWER_R    = 6;
    const PAC_R      = 16;
    const GHOST_SIZE = 22;
    const PAC_SPEED  = 95; // px/s
    const FRAME_MS   = 1000 / 30;

    let W = 0, H = 0;

    type Dot = { x: number; y: number; alive: boolean; power: boolean; respawnAt: number; phase: number };
    let dots: Dot[] = [];

    function buildDots() {
      dots = [];
      const cols = Math.ceil(W / DOT_GAP) + 1;
      const rows = Math.ceil(H / DOT_GAP) + 1;
      const ox = (W % DOT_GAP) / 2;
      const oy = (H % DOT_GAP) / 2;
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          dots.push({
            x: ox + c * DOT_GAP,
            y: oy + r * DOT_GAP,
            alive: true,
            power: r % 6 === 0 && c % 6 === 0,
            respawnAt: 0,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    }

    const cv = canvas;
    function resize() {
      W = cv.offsetWidth;
      H = cv.offsetHeight;
      if (W > 0 && H > 0) { cv.width = W; cv.height = H; buildDots(); }
    }

    // Pac-Man
    type Dir = { x: number; y: number };
    const DIRS: Dir[] = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];
    const pac = { x: 0, y: 0, dir: DIRS[0], angle: 0, mouth: 0.2, mouthV: 1, nextTurn: 2500 };

    // Ghosts: Blinky (red), Pinky (pink), Inky (cyan), Clyde (orange)
    const GHOST_DEFS = [
      { fill: "rgba(231,28,28,0.55)",   pupil: "#1a40ff" },
      { fill: "rgba(255,180,220,0.50)", pupil: "#1a40ff" },
      { fill: "rgba(0,220,220,0.48)",   pupil: "#1a40ff" },
      { fill: "rgba(255,160,32,0.50)",  pupil: "#1a40ff" },
    ];
    const ghosts = GHOST_DEFS.map((def, i) => ({
      x: 0, y: 0,
      vx: (i % 2 === 0 ? 1 : -1) * 40,
      vy: (i < 2 ? -1 : 1) * 30,
      wander: i * 1.57,
      wanderSpd: 0.007 + i * 0.003,
      bob: i * 1.1,
      fill: def.fill,
      pupil: def.pupil,
    }));

    function initPositions() {
      pac.x = W * 0.25; pac.y = H * 0.5;
      ghosts.forEach((g, i) => {
        g.x = W * (0.5 + (i % 2 === 0 ? 0.15 : -0.15));
        g.y = H * (0.4 + i * 0.12);
      });
    }

    function drawGhost(g: typeof ghosts[0], t: number) {
      const S = GHOST_SIZE;
      const by = Math.sin(g.bob + t * 0.0008) * 3.5;
      const x = g.x, y = g.y + by;

      draw.save();
      draw.fillStyle = g.fill;
      draw.beginPath();
      draw.arc(x, y, S, Math.PI, 0);                // head dome
      draw.lineTo(x + S, y + S * 0.9);              // right side
      // 3-hump wavy skirt
      const base = y + S * 0.9;
      const hw = (S * 2) / 3;
      draw.quadraticCurveTo(x + S - hw * 0.5, base + S * 0.42, x + S - hw,     base);
      draw.quadraticCurveTo(x + S - hw * 1.5, base - S * 0.18, x + S - hw * 2, base);
      draw.quadraticCurveTo(x + S - hw * 2.5, base + S * 0.42, x - S,          base);
      draw.closePath();
      draw.fill();

      // white sclerae
      draw.fillStyle = "rgba(255,255,255,0.92)";
      draw.beginPath(); draw.ellipse(x - S * 0.33, y - S * 0.18, S * 0.23, S * 0.3, 0, 0, Math.PI * 2); draw.fill();
      draw.beginPath(); draw.ellipse(x + S * 0.33, y - S * 0.18, S * 0.23, S * 0.3, 0, 0, Math.PI * 2); draw.fill();
      // pupils
      draw.fillStyle = g.pupil;
      draw.beginPath(); draw.arc(x - S * 0.30, y - S * 0.15, S * 0.12, 0, Math.PI * 2); draw.fill();
      draw.beginPath(); draw.arc(x + S * 0.36, y - S * 0.15, S * 0.12, 0, Math.PI * 2); draw.fill();
      draw.restore();
    }

    let raf = 0, lastT = 0;

    function frame(t: number) {
      raf = requestAnimationFrame(frame);
      if (t - lastT < FRAME_MS) return;
      const dt = Math.min(t - lastT, 50) / 1000;
      lastT = t;

      draw.clearRect(0, 0, W, H);

      // Dots
      for (const dot of dots) {
        if (!dot.alive) { if (t >= dot.respawnAt) dot.alive = true; else continue; }
        if (dot.power) {
          dot.phase += 0.055;
          const pulse = 0.5 + 0.5 * Math.sin(dot.phase);
          draw.save();
          draw.shadowBlur = 12 + pulse * 10;
          draw.shadowColor = "rgba(255,214,0,0.75)";
          draw.fillStyle = `rgba(255,214,0,${0.55 + pulse * 0.38})`;
          draw.beginPath(); draw.arc(dot.x, dot.y, POWER_R * (0.82 + pulse * 0.28), 0, Math.PI * 2); draw.fill();
          draw.restore();
        } else {
          draw.fillStyle = "rgba(255,214,0,0.26)";
          draw.beginPath(); draw.arc(dot.x, dot.y, DOT_R, 0, Math.PI * 2); draw.fill();
        }
      }

      if (!prefersReduced) {
        // Pac-Man movement
        pac.nextTurn -= dt * 1000;
        if (pac.nextTurn <= 0) {
          const d = DIRS[Math.floor(Math.random() * DIRS.length)];
          pac.dir = d; pac.angle = Math.atan2(d.y, d.x);
          pac.nextTurn = 1400 + Math.random() * 2000;
        }
        pac.x += pac.dir.x * PAC_SPEED * dt;
        pac.y += pac.dir.y * PAC_SPEED * dt;
        if (pac.x < -PAC_R * 2)   pac.x = W + PAC_R * 2;
        if (pac.x > W + PAC_R * 2) pac.x = -PAC_R * 2;
        if (pac.y < -PAC_R * 2)   pac.y = H + PAC_R * 2;
        if (pac.y > H + PAC_R * 2) pac.y = -PAC_R * 2;

        // Mouth chewing
        pac.mouth += pac.mouthV * 2.8 * dt;
        if (pac.mouth >= 1) { pac.mouth = 1; pac.mouthV = -1; }
        if (pac.mouth <= 0) { pac.mouth = 0; pac.mouthV =  1; }

        // Eat nearby dots
        const eatR2 = (PAC_R + DOT_GAP * 0.38) ** 2;
        for (const dot of dots) {
          if (!dot.alive) continue;
          const dx = dot.x - pac.x, dy = dot.y - pac.y;
          if (dx * dx + dy * dy < eatR2) {
            dot.alive = false;
            dot.respawnAt = t + 6000 + Math.random() * 5000;
          }
        }

        // Draw Pac-Man
        const mAngle = pac.mouth * 0.36;
        draw.save();
        draw.translate(pac.x, pac.y);
        draw.rotate(pac.angle);
        draw.shadowBlur = 18;
        draw.shadowColor = "rgba(255,220,0,0.65)";
        draw.fillStyle = "rgba(255,220,0,0.82)";
        draw.beginPath();
        draw.moveTo(0, 0);
        draw.arc(0, 0, PAC_R, mAngle, Math.PI * 2 - mAngle);
        draw.closePath();
        draw.fill();
        draw.restore();

        // Ghosts
        for (const g of ghosts) {
          g.wander += g.wanderSpd * dt * 60;
          g.vx += Math.cos(g.wander) * 14 * dt;
          g.vy += Math.sin(g.wander) * 14 * dt;
          const spd = Math.sqrt(g.vx * g.vx + g.vy * g.vy);
          const maxSpd = 52;
          if (spd > maxSpd) { g.vx = (g.vx / spd) * maxSpd; g.vy = (g.vy / spd) * maxSpd; }
          g.x += g.vx * dt; g.y += g.vy * dt;
          if (g.x < -GHOST_SIZE * 2) g.x = W + GHOST_SIZE * 2;
          else if (g.x > W + GHOST_SIZE * 2) g.x = -GHOST_SIZE * 2;
          if (g.y < -GHOST_SIZE * 2) g.y = H + GHOST_SIZE * 2;
          else if (g.y > H + GHOST_SIZE * 2) g.y = -GHOST_SIZE * 2;
          drawGhost(g, t);
        }
      }
    }

    resize();
    initPositions();
    raf = requestAnimationFrame(frame);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "absolute", inset: 0, width: "100%", height: "100%",
      zIndex: 0, display: "block", pointerEvents: "none",
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
      flex: 1, background: "#fff",
      border: `1px solid ${T.border}`,
      borderRadius: 12, padding: "2.5rem 2rem 2rem",
      display: "flex", flexDirection: "column", gap: "1.5rem",
      boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      minWidth: 0, overflow: "hidden", position: "relative",
    }}>
      <div style={{ fontFamily: T.body, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", color: T.muted, textTransform: "uppercase" }}>
        {title}
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
    background: T.surface, border: `1px solid ${T.border}`, overflow: "hidden",
    ...extra,
  });

  const INK = "#111";
  const INK_MUTED = "#555";
  const ACCENT = "#000";

  return (
    <div ref={ref} style={{ background: T.bg, borderRadius: 16, padding: "2.5rem", border: `1px solid ${T.border}`, boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}>
      {/* Row 1 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
        {/* THE BRIEF */}
        <HwCard title="The Brief">
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", minWidth: 0 }}>
            <div style={innerCard()}>
              <div style={{ fontFamily: T.body, fontSize: "0.7rem", fontWeight: 600, color: INK_MUTED, marginBottom: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Client Request</div>
              <SvgHandwrite text="Build me something" font={HW_FONTS.caveat} fontSize={30} color={INK} width={260} height={72} delay={0.1} triggerKey={inView ? 1 : 0} />
              <SvgHandwrite text="that actually converts." font={HW_FONTS.caveat} fontSize={28} color={INK_MUTED} width={260} height={72} delay={1.2} triggerKey={inView ? 1 : 0} />
            </div>
            <div style={{ display: "flex", alignItems: "center", paddingTop: "3.5rem" }}>
              <svg width={28} height={16} viewBox="0 0 32 18" fill="none"><path d="M0 9h28M20 2l8 7-8 7" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={innerCard({ background: "#fff", borderColor: "#d0d0d0" })}>
              <div style={{ fontFamily: T.body, fontSize: "0.7rem", fontWeight: 600, color: INK_MUTED, marginBottom: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Response</div>
              <SvgHandwrite text="Delivered." font={HW_FONTS.dancing} fontSize={52} color={INK} width={260} height={96} delay={2.2} triggerKey={inView ? 1 : 0} />
              <svg width={180} height={14} viewBox="0 0 180 14" style={{ display: "block", marginTop: -14 }}>
                <path d="M8 10 Q90 2 172 10" fill="none" stroke={INK} strokeWidth={2.5} strokeLinecap="round"
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
            <div style={innerCard()}>
              <div style={{ fontFamily: T.body, fontSize: "0.7rem", fontWeight: 600, color: INK_MUTED, marginBottom: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{curStyle.label}</div>
              <SvgHandwrite key={`opt2-l-${cycleKey}`} text="Falcon" font={curStyle.font} fontSize={56} color={INK} width={220} height={100} delay={0} triggerKey={cycleKey} />
            </div>
            <div style={innerCard({ background: "#fff", borderColor: "#d0d0d0" })}>
              <div style={{ fontFamily: T.body, fontSize: "0.7rem", fontWeight: 600, color: INK_MUTED, marginBottom: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Your Brand</div>
              <SvgHandwrite key={`opt2-r-${cycleKey}`} text="Designs." font={curStyle.font} fontSize={56} color={INK} width={220} height={100} delay={0.5} triggerKey={cycleKey} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: "0.5rem" }}>
            {HW_STYLE_CYCLE.map((_, i) => (
              <div key={i} style={{ width: i === styleIdx ? 18 : 6, height: 4, borderRadius: 2, background: i === styleIdx ? INK : "#ccc", transition: "all 0.3s" }} />
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
              <div style={{ fontFamily: T.body, fontSize: "0.7rem", fontWeight: 600, color: INK_MUTED, marginBottom: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Before</div>
              <div style={{ position: "relative", display: "inline-block" }}>
                <SvgHandwrite text="Homepage?" font={HW_FONTS.kalam} fontSize={32} color={INK_MUTED} width={240} height={68} delay={0.1} triggerKey={inView ? 1 : 0} />
                <svg width={180} height={8} viewBox="0 0 180 8" style={{ display: "block", marginTop: -48, marginLeft: 8 }}>
                  <line x1={0} y1={4} x2={168} y2={4} stroke="#e53e3e" strokeWidth={2.5}
                    strokeDasharray="168 168" strokeDashoffset={inView ? 0 : 168}
                    style={{ transition: inView ? "stroke-dashoffset 0.5s 1.2s ease" : "none" }}
                  />
                </svg>
              </div>
              <SvgHandwrite text="Landing page? Both?" font={HW_FONTS.kalam} fontSize={28} color={INK_MUTED} width={240} height={68} delay={1.8} triggerKey={inView ? 1 : 0} />
            </div>
            <div style={{ display: "flex", alignItems: "center", paddingTop: "3rem" }}>
              <svg width={28} height={16} viewBox="0 0 32 18" fill="none"><path d="M0 9h28M20 2l8 7-8 7" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={innerCard({ background: "#fff", borderColor: "#d0d0d0" })}>
              <div style={{ fontFamily: T.body, fontSize: "0.7rem", fontWeight: 600, color: INK_MUTED, marginBottom: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>After</div>
              <SvgHandwrite text="Done." font={HW_FONTS.dancing} fontSize={64} color={INK} width={200} height={100} delay={3.2} triggerKey={inView ? 1 : 0} />
              <svg width={130} height={14} viewBox="0 0 130 14" style={{ display: "block", marginTop: -14, marginLeft: 8 }}>
                <path d="M4 10 Q65 2 126 10" fill="none" stroke={INK} strokeWidth={2.5} strokeLinecap="round"
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
              <div style={{ fontFamily: T.body, fontSize: "1.2rem", color: INK_MUTED, marginBottom: "0.75rem" }}>❝</div>
              <SvgHandwrite key={`t-l-${testimonialIdx}`} text={testimonials[testimonialIdx].l} font={HW_FONTS.dancing} fontSize={38} color={INK} width={240} height={76} delay={0} triggerKey={testimonialIdx} />
            </div>
            <div style={innerCard({ background: "#fff", borderColor: "#d0d0d0", minHeight: 160 })}>
              <div style={{ fontFamily: T.body, fontSize: "1.2rem", color: INK_MUTED, marginBottom: "0.75rem" }}>❞</div>
              <SvgHandwrite key={`t-r-${testimonialIdx}`} text={testimonials[testimonialIdx].r} font={HW_FONTS.dancing} fontSize={38} color={INK} width={240} height={76} delay={0.6} triggerKey={testimonialIdx} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: "0.25rem" }}>
            {testimonials.map((_, i) => (
              <div key={i} style={{ width: i === testimonialIdx ? 18 : 6, height: 4, borderRadius: 2, background: i === testimonialIdx ? INK : "#ccc", transition: "all 0.3s" }} />
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
    <div style={{ height: "200vh", borderTop: `1px solid ${TERM.border}`, borderBottom: `1px solid ${TERM.border}` }}>
      <section style={{
        position: "sticky", top: 0,
        height: "100vh", overflow: "hidden",
        background: TERM.bg,
      }}>
        {/* Full-width ScannerCardStream background */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          <ScannerCardStream
            direction={-1}
            initialSpeed={120}
            friction={0.97}
            scanEffect="scramble"
            cardGap={40}
            repeat={4}
          />
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
/* ── Nav themes ─────────────────────────────────────────────────────── */
const NAV_THEMES = {
  white:     { bg: "rgba(255,255,255,0.96)", border: "#e8e8e8",                text: "#000",    muted: "#666",                  ctaBg: "#000",    ctaText: "#fff",    logoBg: "#000",    logoIcon: "#fff" },
  hero:      { bg: "rgba(8,8,8,0.92)",       border: "rgba(255,255,255,0.08)", text: "#fff",    muted: "rgba(255,255,255,0.55)", ctaBg: "#c9ff00", ctaText: "#000",    logoBg: "#fff",    logoIcon: "#000" },
  dark:      { bg: "rgba(10,10,10,0.95)",    border: "rgba(255,214,0,0.15)",   text: "#FFD700", muted: "rgba(255,214,0,0.5)",   ctaBg: "#FFD700", ctaText: "#000",    logoBg: "#FFD700", logoIcon: "#000" },
  hacker:    { bg: "rgba(0,13,0,0.96)",      border: "rgba(0,255,65,0.18)",    text: "#00ff41", muted: "rgba(0,255,65,0.45)",   ctaBg: "#00ff41", ctaText: "#000",    logoBg: "#00ff41", logoIcon: "#000" },
  blue:      { bg: "rgba(5,13,46,0.96)",     border: "rgba(120,140,255,0.2)",  text: "#a5b4fc", muted: "rgba(165,180,252,0.5)", ctaBg: "#6366f1", ctaText: "#fff",    logoBg: "#a5b4fc", logoIcon: "#000" },
  lime:      { bg: "rgba(185,236,0,0.97)",   border: "transparent",            text: "#000",    muted: "#444",                  ctaBg: "#000",    ctaText: "#c9ff00", logoBg: "#000",    logoIcon: "#fff" },
  parchment: { bg: "rgba(245,240,224,0.97)", border: "rgba(200,160,80,0.35)",  text: "#1a0e00", muted: "#8a6a2a",               ctaBg: "#c8a050", ctaText: "#fff",    logoBg: "#c8a050", logoIcon: "#fff" },
} as const;
type NavThemeKey = keyof typeof NAV_THEMES;

export default function FalconStudioPage() {
  const [scrolled, setScrolled] = useState(false);
  const [navThemeKey, setNavThemeKey] = useState<NavThemeKey>("white");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const nt = NAV_THEMES[navThemeKey];
  const TRANS = "0.5s cubic-bezier(0.23,1,0.32,1)";

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 60);
      const sections = document.querySelectorAll<HTMLElement>("[data-nav-theme]");
      const mid = window.innerHeight * 0.5;
      let current: NavThemeKey = "white";
      sections.forEach(s => {
        const rect = s.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom > mid) current = (s.dataset.navTheme as NavThemeKey) || "white";
      });
      setNavThemeKey(current);
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
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
        #fs-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; border-bottom: 1px solid transparent; backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }
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
        .biz-marquee-up   { animation: biz-up   32s linear infinite; will-change: transform; }
        .biz-marquee-down { animation: biz-down 32s linear infinite; will-change: transform; }
        .biz-marquee-up:hover, .biz-marquee-down:hover { animation-play-state: paused; }
        @keyframes biz-up   { from { transform: translateY(0);    } to { transform: translateY(-50%); } }
        @keyframes biz-down { from { transform: translateY(-50%); } to { transform: translateY(0);    } }
      `}</style>

      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <nav id="fs-nav" style={{ background: scrolled ? nt.bg : "transparent", borderColor: scrolled ? nt.border : "transparent", transition: `background ${TRANS}, border-color ${TRANS}` }}>
        <div className="nav-inner">
          <Link href="/showcase/falcon-studio" className="nav-logo" style={{ color: nt.text, transition: `color ${TRANS}` }}>
            <div className="nav-logo-sq" style={{ background: nt.logoBg, transition: `background ${TRANS}` }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1L13 7L7 13L1 7L7 1Z" style={{ fill: nt.logoIcon, transition: `fill ${TRANS}` }} />
              </svg>
            </div>
            FALCON STUDIO
          </Link>

          <div className="nav-right">
            {[
              { label: "Pricing", href: "/showcase/falcon-studio/pricing" },
              { label: "Reviews", href: "/showcase/falcon-studio/reviews" },
            ].map(n => (
              <Link key={n.label} href={n.href} className="nav-link" style={{ color: nt.text, transition: `color ${TRANS}` }}>
                {n.label}
              </Link>
            ))}
            <button className="nav-cta" style={{ background: nt.ctaBg, color: nt.ctaText, transition: `background ${TRANS}, color ${TRANS}` }}>Start Creating</button>
            <button className="burger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
              <span style={{ ...(menuOpen ? { transform: "rotate(45deg) translate(4.5px,4.5px)" } : {}), background: nt.text, transition: `background ${TRANS}` }} />
              <span style={{ ...(menuOpen ? { opacity: 0, transform: "scaleX(0)" } : {}), background: nt.text, transition: `background ${TRANS}` }} />
              <span style={{ ...(menuOpen ? { transform: "rotate(-45deg) translate(4.5px,-4.5px)" } : {}), background: nt.text, transition: `background ${TRANS}` }} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div id="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}>
            {[
              { label: "SEO", href: "#seo" },
              { label: "FAQs", href: "#faq" },
              { label: "Pricing", href: "/showcase/falcon-studio/pricing" },
              { label: "Reviews", href: "/showcase/falcon-studio/reviews" },
              { label: "Log In", href: "#" },
            ].map(n => (
              <Link key={n.label} href={n.href} onClick={() => setMenuOpen(false)}
                style={{ fontFamily: T.display, fontSize: "1.8rem", fontWeight: 700, color: T.text, padding: "0.6rem 2rem" }}>
                {n.label}
              </Link>
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
      <section ref={heroRef} data-nav-theme="white" style={{
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
      <div id="seo" data-nav-theme="hero">
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
      </div>{/* /data-nav-theme hero */}


      {/* ══════════════════════════════════════════════════════════════════
          DARK CANVAS — floating widgets with FlipReveal entrance
      ══════════════════════════════════════════════════════════════════ */}
      <section id="work" data-nav-theme="dark" style={{ background: "#0a0a0a" }}>
        <HorizontalScrollStrip />
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          ENTERPRISE — scroll-driven two-phase mockup reveal
      ══════════════════════════════════════════════════════════════════ */}
      <EnterpriseSection />

      {/* ══════════════════════════════════════════════════════════════════
          NATIVE BUSINESS SOLUTIONS — RETRO GAMING
      ══════════════════════════════════════════════════════════════════ */}
      <div data-nav-theme="blue" style={{ height: "200vh" }}>
      <section style={{ position: "sticky", top: 0, height: "100vh", background: "#050d2e", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {/* Pac-Man animated background */}
        <PacManCanvas />
        {/* Scanline overlay */}
        <div className="retro-scanline" style={{ position: "absolute", inset: 0, opacity: 0.10, zIndex: 1, pointerEvents: "none" }} />
        {/* Very subtle grid lines on top for retro CRT texture */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          backgroundImage: `linear-gradient(rgba(255,214,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,214,0,0.06) 1px, transparent 1px)`,
          backgroundSize: "34px 34px",
        }} />

        {/* ── 3-column layout: slider | centre | slider ── */}
        <div style={{
          position: "relative", zIndex: 2,
          display: "flex", alignItems: "stretch",
          height: "100%", width: "100%", overflow: "hidden",
        }}>

          {/* Left vertical slider — scrolls upward */}
          <div style={{
            width: 300, flexShrink: 0, overflow: "hidden",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}>
            <div className="biz-marquee-up" style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 16 }}>
              {[...BTN_ROW_1, ...BTN_ROW_1].map((card, i) => (
                <BtnShowcaseCard key={i} card={card} />
              ))}
            </div>
          </div>

          {/* Centre — heading + tagline + CTAs */}
          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "3rem 2.5rem", textAlign: "center", gap: "1.8rem",
          }}>
            <div style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.58rem", color: RETRO_NEON.cyan,
              letterSpacing: "0.14em", textTransform: "uppercase",
              textShadow: `0 0 8px ${RETRO_NEON.cyan}`,
            }}>
              &gt;&gt; SELECT YOUR SOLUTION_
            </div>

            <h2 className="retro-flicker" style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "clamp(1.6rem, 3.2vw, 2.8rem)",
              fontWeight: 400,
              lineHeight: 1.55,
              color: RETRO_NEON.yellow,
              textShadow: `4px 4px 0 #7a6000, 0 0 28px ${RETRO_NEON.yellow}77`,
              letterSpacing: "0.02em",
              margin: 0,
            }}>
              EVERY CLICK.<br />CRAFTED.
            </h2>

            <p style={{
              fontFamily: "'VT323', monospace",
              fontSize: "clamp(1.3rem, 2vw, 1.75rem)",
              lineHeight: 1.6,
              color: "rgba(180,220,255,0.85)",
              maxWidth: 480,
              letterSpacing: "0.04em",
              margin: 0,
            }}>
              NOT JUST A BUTTON. THE MOMENT SOMEONE DECIDES TO TRUST YOU.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
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
          </div>

          {/* Right vertical slider — scrolls downward */}
          <div style={{
            width: 300, flexShrink: 0, overflow: "hidden",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}>
            <div className="biz-marquee-down" style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 16 }}>
              {[...BTN_ROW_2, ...BTN_ROW_2].map((card, i) => (
                <BtnShowcaseCard key={i} card={card} />
              ))}
            </div>
          </div>

        </div>
      </section>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          HANDWRITING SHOWCASE
      ══════════════════════════════════════════════════════════════════ */}
      {/* ══════════════════════════════════════════════════════════════════
          FONT SHOWCASE
      ══════════════════════════════════════════════════════════════════ */}
      <FontShowcase />


      {/* ══════════════════════════════════════════════════════════════════
          MARQUEE 2
      ══════════════════════════════════════════════════════════════════ */}


      {/* ══════════════════════════════════════════════════════════════════
          FAQ — scroll-locked 4-quadrant showcase
      ══════════════════════════════════════════════════════════════════ */}
      <div id="faq" data-nav-theme="parchment" style={{ height: "250vh", position: "relative" }}>
        <div style={{ position: "sticky", top: 68, height: "calc(100vh - 68px)", overflow: "hidden" }}>

          {/* Center wax-seal badge */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%) rotate(-6deg)",
            zIndex: 20, pointerEvents: "none",
            width: 160, height: 160,
          }}>
            {/* Outer serrated ring */}
            <svg viewBox="0 0 160 160" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
              {Array.from({ length: 32 }).map((_, i) => {
                const angle = (i / 32) * Math.PI * 2;
                const r1 = 76, r2 = 68;
                const x1 = 80 + Math.cos(angle) * r1, y1 = 80 + Math.sin(angle) * r1;
                const x2 = 80 + Math.cos(angle) * r2, y2 = 80 + Math.sin(angle) * r2;
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f5f0e0" strokeWidth="3" />;
              })}
              <circle cx="80" cy="80" r="66" fill="#f5f0e0" />
              <circle cx="80" cy="80" r="62" fill="none" stroke="#c8a050" strokeWidth="1.5" />
              <circle cx="80" cy="80" r="56" fill="none" stroke="#c8a050" strokeWidth="0.75" />
            </svg>
            {/* Inner text */}
            <div style={{
              position: "absolute", inset: 0, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", textAlign: "center", padding: "1rem",
            }}>
              <div style={{ fontFamily: "'Georgia',serif", fontSize: "0.42rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#8a6a2a", marginBottom: "0.3rem" }}>§ FALCON STUDIO</div>
              <div style={{ fontFamily: "'Georgia',serif", fontWeight: 700, fontSize: "0.88rem", lineHeight: 1.15, color: "#1a0e00", letterSpacing: "-0.01em" }}>
                Even our<br />FAQs have<br />
                <span style={{ color: "#c8a050", fontStyle: "italic" }}>magic.</span>
              </div>
              <div style={{ fontFamily: "'Georgia',serif", fontSize: "0.38rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8a6a2a", marginTop: "0.3rem" }}>EST. MMXXV</div>
            </div>
          </div>

          {/* 2×2 grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            height: "100%",
          }}>

            {/* TL — Hacker Terminal */}
            <FaqBubbles faqs={[
              { q: "What is Falcon Studio?", a: "The premium web design platform for designers, developers, and agencies. Custom code, full canvas freedom, no templates." },
              { q: "How does pricing work?", a: "Fixed-price proposals only. No hourly billing, no surprises. Ongoing retainers available after launch." },
              { q: "Do you use templates?", a: "Never. Every project is hand-coded in Next.js and TypeScript. You own the codebase outright." },
            ]} />

            {/* TR — Luxury Atelier */}
            <FaqFilmstrip faqs={[
              { q: "What industries do you build for?", a: "Law firms, dental clinics, hair salons, restaurants, jewellery e-commerce, wedding filmmakers, personal trainers, and many more." },
              { q: "Can I update the site myself?", a: "Yes. We build a CMS handoff tailored to your comfort level — change photos, text, or blog posts without calling us." },
              { q: "How long does a project take?", a: "Most projects ship in 3–6 weeks depending on scope. We'll give you a clear timeline in the proposal." },
            ]} />

            {/* BL — Retro Arcade */}
            <FaqFlipCards faqs={[
              { q: "Do you build on Webflow or Wix?", a: "No. We write every line from scratch in Next.js — you get a codebase you own, not a platform licence that can be repriced." },
              { q: "What happens after launch?", a: "You get a personalised resource kit, live comment access, and the option to retain us for ongoing support." },
              { q: "Is there a free trial?", a: "We offer a no-cost discovery call and a detailed proposal before any commitment. No pressure, no catch." },
            ]} />

            {/* BR — Brutalist Print */}
            <FaqNewspaper faqs={[
              { q: "How does the design process work?", a: "A single discovery call, then we build a custom visual system — typography, colour, layout, motion — that couldn't belong to anyone else. You review at every stage on a staging environment before we go live." },
              { q: "What makes Falcon Studio different?", a: "We treat every project as editorial work. Each pixel is deliberate, each decision documented. The result is a site that feels authored, not assembled." },
              { q: "Can I see examples of your work?", a: "Everything on this page is live Falcon Studio work. Scroll through — the templates, the animations, the interactions — all built by us." },
            ]} />

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          LIME CTA
      ══════════════════════════════════════════════════════════════════ */}
      <section id="cta" data-nav-theme="lime" style={{ background: T.lime, padding: "6rem 2.5rem", position: "relative", overflow: "hidden" }}>
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
