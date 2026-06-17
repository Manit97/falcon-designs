"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform, useInView } from "framer-motion";

// ── TOKENS ────────────────────────────────────────────────────────────────────
const BG      = "#0c0c0c";
const CARD    = "#141414";
const CREAM   = "#ffffff";
const LIME    = "#C8F000";
const GREY    = "rgba(255,255,255,0.45)";
const BORDER  = "rgba(255,255,255,0.12)";
const DISPLAY = "'Space Grotesk', sans-serif";
const BODY    = "'DM Sans', sans-serif";
const EASE    = "cubic-bezier(0.23,1,0.32,1)";

// ── DATA ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["About", "Programmes", "Process", "Results", "Contact"];

const STATS = [
  { value: "12+",   label: "Years Experience"     },
  { value: "200+",  label: "Clients Trained"       },
  { value: "95%",   label: "Retention Rate"        },
  { value: "BSc",   label: "Sports Science"        },
  { value: "NASM",  label: "Certified Trainer"     },
  { value: "24/7",  label: "WhatsApp Support"      },
];

const PROGRAMMES = [
  {
    slug: "11",
    name: "1-1 COACHING",
    tag: "Most Popular",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80",
    price: "From £120 / session",
    desc: "Fully bespoke programming, real-time technique correction, and weekly check-ins built around your schedule and goals.",
  },
  {
    slug: "online",
    name: "ONLINE COACHING",
    tag: "Best Value",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=80",
    price: "From £249 / month",
    desc: "Train anywhere in the world. Full programming, video form review, and direct access — without needing to be in the same city.",
  },
  {
    slug: "nutrition",
    name: "NUTRITION PLANNING",
    tag: "Add-on",
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1600&q=80",
    price: "From £149 / month",
    desc: "A sustainable, evidence-based nutrition strategy built around your training. No fads, no quick fixes.",
  },
];

const PROCESS = [
  { num: "01", title: "Free Consultation", desc: "A 30-minute call to talk through your goals, your history, and whether we're the right fit. No pressure." },
  { num: "02", title: "Body Assessment",   desc: "In-person measurements, movement screening, and a baseline strength test to build your programme from." },
  { num: "03", title: "Custom Programme",  desc: "Written specifically for you. Not a template. Week by week, built to progress and adapt to your life." },
  { num: "04", title: "Track & Evolve",    desc: "Regular reassessments ensure the programme stays aligned with your progress. If it stops working, we change it." },
];

const RESULTS = [
  { name: "Sarah T.",   duration: "14 months", result: "Lost 18kg, completed first half-marathon" },
  { name: "Marcus B.",  duration: "8 months",  result: "Gained 12kg muscle, first powerlifting comp"  },
  { name: "Elena K.",   duration: "6 months",  result: "Post-partum recovery, back to pre-baby strength" },
  { name: "David L.",   duration: "2 years",   result: "From desk-job back pain to competing in triathlons" },
  { name: "Priya S.",   duration: "10 months", result: "Overcame gym anxiety, now trains 5x per week"  },
  { name: "James W.",   duration: "18 months", result: "Down 30kg, reversed pre-diabetic diagnosis"    },
];

const TESTIMONIALS = [
  { quote: "James doesn't give you a programme — he gives you a strategy. Two years in and I'm still learning.", author: "Marcus B.", title: "Powerlifter, Client since 2022" },
  { quote: "I'd tried every gym in London. James was the first trainer who actually listened before prescribing.", author: "Sarah T.", title: "Runner, Client since 2023" },
  { quote: "I was nervous about working with a PT after two bad experiences. James rebuilt my confidence completely.", author: "Elena K.", title: "New mum, Client since 2024" },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────
function Dot() {
  return <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: LIME, marginRight: "0.6rem", flexShrink: 0 }} />;
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
      <Dot />
      <span style={{ fontFamily: DISPLAY, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: CREAM, opacity: 0.6 }}>{text}</span>
    </div>
  );
}

function ArrowButton({ href, text, dark = false }: { href: string; text: string; dark?: boolean }) {
  return (
    <a
      href={href}
      className="pt2-arrow-btn"
      style={{
        display: "inline-flex", alignItems: "center", gap: 0,
        border: `1.5px solid ${dark ? "rgba(0,0,0,0.25)" : BORDER}`,
        borderRadius: 999,
        overflow: "hidden", textDecoration: "none",
      }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.8"}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
    >
      <span style={{
        fontFamily: DISPLAY, fontSize: "0.72rem", fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: dark ? BG : CREAM,
        padding: "0.75rem 1.5rem",
      }}>{text}</span>
      <span style={{
        width: 42, height: 42, borderRadius: "50%", background: LIME,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 12L12 2M12 2H4M12 2V10" stroke={BG} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

function CardPanel({ p, i }: { p: { slug: string; name: string; tag: string; img: string; price: string; desc: string }; i: number }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: BG }}>
      <img src={p.img} alt={p.name} style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%", objectFit: "cover",
        filter: "grayscale(100%) brightness(0.38)",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(12,12,12,0.2) 0%, transparent 30%, rgba(12,12,12,0.88) 100%)",
      }} />
      {/* Counter */}
      <div style={{
        position: "absolute", top: "2.5rem", right: "2.5rem",
        fontFamily: DISPLAY, fontSize: "0.65rem", fontWeight: 700,
        color: CREAM, opacity: 0.28, letterSpacing: "0.1em",
      }}>
        {String(i + 1).padStart(2, "0")} / {String(PROGRAMMES.length).padStart(2, "0")}
      </div>
      {/* Bottom text */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "clamp(2rem, 4vw, 3.5rem)",
      }}>
        <div style={{ display: "inline-flex", alignItems: "center", background: LIME, borderRadius: 999, padding: "0.3rem 0.9rem", marginBottom: "1.25rem" }}>
          <span style={{ fontFamily: DISPLAY, fontSize: "0.58rem", fontWeight: 700, color: BG, letterSpacing: "0.12em", textTransform: "uppercase" }}>{p.tag}</span>
        </div>
        <div style={{
          fontFamily: DISPLAY, fontWeight: 700,
          fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
          textTransform: "uppercase", letterSpacing: "-0.02em",
          color: CREAM, lineHeight: 0.92, marginBottom: "1.5rem",
        }}>{p.name}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <div style={{ fontFamily: DISPLAY, fontSize: "0.75rem", fontWeight: 600, color: LIME, letterSpacing: "0.08em", marginBottom: "0.6rem" }}>{p.price}</div>
            <p style={{ fontFamily: BODY, fontSize: "0.85rem", color: GREY, lineHeight: 1.75, maxWidth: 500 }}>{p.desc}</p>
          </div>
          <ArrowButton href="#contact" text="Book This" />
        </div>
      </div>
    </div>
  );
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function PTPage() {
  const heroRef      = useRef<HTMLDivElement>(null);
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", goal: "", sent: false });

  // Hero parallax
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(heroP, [0, 1], [0, 160]);
  const heroOpacity = useTransform(heroP, [0, 0.6], [1, 0]);

  // Programme card stack.
  // Section is "100dvh + 10px" so the sticky travels only 10px after unlock —
  // giving a near-instant natural exit with zero jump.
  // Wheel lock engages when section top = viewport top (card fully visible, no cut).
  // progMV 0→1 drives the card animations while locked.
  // completed flag prevents re-lock during natural entry/exit.
  const programmeRef = useRef<HTMLDivElement>(null);
  const progMV = useMotionValue(0);
  const card2Y = useTransform(progMV, [0.08, 0.45], ["100vh", "0vh"]);
  const card3Y = useTransform(progMV, [0.55, 0.92], ["100vh", "0vh"]);

  useEffect(() => {
    const outer = programmeRef.current;
    if (!outer) return;
    let locked = false;
    let completed = 0;
    let savedScrollY = 0;

    const bodyUnlock = () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
    };

    // Snap to section-top-at-viewport-top, then freeze the page with position:fixed.
    // position:fixed is the only method that stops trackpad momentum 100% reliably.
    const engage = (startProg: number) => {
      const r = outer.getBoundingClientRect();
      savedScrollY = Math.round(window.scrollY + r.top);
      window.scrollTo({ top: savedScrollY, behavior: "instant" as ScrollBehavior });
      document.body.style.position = "fixed";
      document.body.style.top = `-${savedScrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      locked = true;
      completed = 0;
      progMV.set(startProg);
    };

    const release = (dir: 1 | -1) => {
      bodyUnlock();
      window.scrollTo({ top: savedScrollY, behavior: "instant" as ScrollBehavior });
      locked = false;
      completed = dir;
    };

    const onWheel = (e: WheelEvent) => {
      // Disable scroll lock on mobile — touch scroll handles the section natively
      if (window.innerWidth <= 768) return;

      const r = outer.getBoundingClientRect();
      const vh = window.innerHeight;

      // Section fully outside viewport — reset
      if (!locked) {
        if (r.top > vh)   { progMV.set(0); completed = 0; return; }
        if (r.bottom < 0) { progMV.set(1); completed = 0; return; }

        // Engage when section top reaches the viewport top.
        // Small positive tolerance (20px) lets natural scroll settle before locking.
        // Negative tolerance catches fast scrollers who overshoot by up to 40% of vh.
        if (completed !== 1  && e.deltaY > 0 && r.top <= 20 && r.top >= -vh * 0.4) {
          e.preventDefault(); engage(0); return;
        }
        if (completed !== -1 && e.deltaY < 0 && r.top >= -20 && r.top <= vh * 0.4) {
          e.preventDefault(); engage(1); return;
        }
        return;
      }

      // Locked — body is position:fixed so the page cannot move at all.
      // Drive animation with capped delta so hard swipes don't skip cards.
      e.preventDefault();
      const p = progMV.get();

      if (p >= 1 && e.deltaY > 0) { release(1);  return; }
      if (p <= 0 && e.deltaY < 0) { release(-1); return; }

      const delta = Math.min(Math.abs(e.deltaY), 50) * Math.sign(e.deltaY);
      progMV.set(Math.max(0, Math.min(1, p + delta / (vh * 1.2))));
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      bodyUnlock();
    };
  }, [progMV]);

  const { ref: statsRef,  inView: statsIn  } = useReveal(0.2);
  const { ref: processRef, inView: processIn } = useReveal();
  const { ref: resultsRef, inView: resultsIn } = useReveal();
  const { ref: testiRef,   inView: testiIn  } = useReveal();
  const { ref: contactRef, inView: contactIn } = useReveal(0.05);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.05)",
    border: `1px solid ${BORDER}`, color: CREAM,
    fontFamily: BODY, fontSize: "0.9rem",
    padding: "0.9rem 1.1rem", outline: "none",
    borderRadius: 8,
    transition: "border-color 200ms",
  };

  return (
    <div id="pt2" style={{ background: BG, color: CREAM, fontFamily: BODY, minHeight: "100dvh" }}>

      {/* ── FONTS + GLOBAL ─────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        html, body { overflow-x: hidden; }
        #pt2 *, #pt2 *::before, #pt2 *::after { box-sizing: border-box; margin: 0; padding: 0; }
        #pt2 a { text-decoration: none; color: inherit; }
        #pt2 button { cursor: pointer; border: none; background: none; font-family: inherit; }
        #pt2 img { display: block; }
        html { scroll-behavior: smooth; }

        /* Nav */
        .pt2-nav-links { display: flex; }
        .pt2-burger    { display: none; }
        @media (max-width: 768px) {
          .pt2-nav-links { display: none !important; }
          .pt2-burger    { display: flex !important; }
        }

        /* Stats */
        .pt2-stats { display: grid; grid-template-columns: repeat(6, 1fr); }
        @media (max-width: 900px) { .pt2-stats { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 540px) { .pt2-stats { grid-template-columns: repeat(2, 1fr) !important; } }

        /* About */
        .pt2-about { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        @media (max-width: 900px) { .pt2-about { grid-template-columns: 1fr !important; gap: 3rem !important; } }

        /* Process */
        .pt2-process { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        @media (max-width: 900px) { .pt2-process { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 540px) { .pt2-process { grid-template-columns: 1fr !important; } }

        /* Testimonials */
        .pt2-testi { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        @media (max-width: 900px) { .pt2-testi { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .pt2-testi { grid-template-columns: 1fr !important; } }

        /* Contact */
        .pt2-contact { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
        @media (max-width: 900px) { .pt2-contact { grid-template-columns: 1fr !important; gap: 3rem !important; } }

        /* Form row */
        .pt2-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
        @media (max-width: 560px) { .pt2-form-row { grid-template-columns: 1fr !important; } }

        /* Section pad — needs #pt2 prefix to beat the margin/padding reset above */
        #pt2 .pt2-pad { padding: 10rem 2.5rem; }
        @media (max-width: 600px) { #pt2 .pt2-pad { padding: 6rem 1.5rem; } }

        /* Results hover — smooth indent */
        .pt2-result-row { transition: padding-left 220ms cubic-bezier(0.23,1,0.32,1); }
        .pt2-result-row:hover { padding-left: 1.25rem !important; }

        /* Arrow button active press feedback */
        .pt2-arrow-btn { transition: opacity 200ms, transform 160ms ease-out; }
        .pt2-arrow-btn:active { transform: scale(0.97); }

        /* Stats mobile border fix */
        @media (max-width: 900px) { .pt2-stat-border { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.12); } }
        @media (max-width: 540px) { .pt2-stat-border { border-right: none !important; } }

        /* Programme section — desktop vs mobile */
        .pt2-prog-desktop { display: block; }
        .pt2-prog-mobile  { display: none; }
        @media (max-width: 768px) {
          .pt2-prog-desktop { display: none !important; }
          .pt2-prog-mobile  { display: block !important; }
        }

        /* Hero preview thumbnails — hide on small screens */
        @media (max-width: 600px) { .pt2-hero-cards { display: none !important; } }

        /* Results row — tighten gap on mobile */
        @media (max-width: 600px) {
          .pt2-result-inner-right { flex-direction: column !important; align-items: flex-start !important; gap: 0.4rem !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          #pt2 *, #pt2 *::before, #pt2 *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* ── NAV ──────────────────────────────────────────────────────────────── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        background: scrolled ? "rgba(12,12,12,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: `1px solid ${scrolled ? BORDER : "transparent"}`,
        transition: `background 400ms ${EASE}, border-color 400ms`,
      }}>
        <nav style={{ maxWidth: 1320, margin: "0 auto", padding: "0 2.5rem", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#" style={{ fontFamily: DISPLAY, fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.06em", color: CREAM }}>
            JAMES <span style={{ color: LIME }}>COLE</span>
          </a>

          <div className="pt2-nav-links" style={{ alignItems: "center", gap: "2.5rem" }}>
            {NAV_LINKS.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{
                fontFamily: DISPLAY, fontSize: "0.72rem", fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase", color: CREAM, opacity: 0.55,
                transition: "opacity 200ms",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "0.55"}
              >{l}</a>
            ))}
          </div>

          <div className="pt2-nav-links" style={{ alignItems: "center" }}>
            <ArrowButton href="#contact" text="Book a Call" />
          </div>

          <button className="pt2-burger" onClick={() => setMobileOpen(o => !o)}
            style={{ flexDirection: "column", gap: 5, padding: 4 }}
          >
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: "block", width: 22, height: 1.5, background: CREAM,
                transform: mobileOpen
                  ? i===0 ? "translateY(6.5px) rotate(45deg)"
                  : i===2 ? "translateY(-6.5px) rotate(-45deg)"
                  : "scaleX(0)"
                  : "none",
                transition: `transform 300ms ${EASE}`,
              }} />
            ))}
          </button>
        </nav>

        <div style={{
          overflow: "hidden", maxHeight: mobileOpen ? "260px" : 0,
          transition: `max-height 400ms ${EASE}`,
          background: "rgba(12,12,12,0.98)", backdropFilter: "blur(20px)",
          borderTop: `1px solid ${BORDER}`,
        }}>
          <div style={{ padding: "1.5rem 2.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {NAV_LINKS.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMobileOpen(false)} style={{
                fontFamily: DISPLAY, fontSize: "0.82rem", fontWeight: 600,
                letterSpacing: "0.1em", textTransform: "uppercase", color: CREAM,
              }}>{l}</a>
            ))}
          </div>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section ref={heroRef} style={{ position: "relative", height: "100dvh", minHeight: 640, overflow: "hidden" }}>

        {/* Parallax bg */}
        <motion.div style={{ position: "absolute", inset: "-15% 0", y: heroY }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&q=85")`,
            backgroundSize: "cover", backgroundPosition: "center 30%",
            filter: "grayscale(100%) brightness(0.35)",
          }} />
        </motion.div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(12,12,12,0.3) 0%, rgba(12,12,12,0.7) 70%, rgba(12,12,12,1) 100%)" }} />

        {/* Content */}
        <motion.div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          justifyContent: "flex-end", opacity: heroOpacity,
        }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 2.5rem 5rem", width: "100%" }}>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}
            >
              <Dot />
              <span style={{ fontFamily: DISPLAY, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: CREAM, opacity: 0.65 }}>Personal Training · South West London</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
              style={{
                fontFamily: DISPLAY, fontWeight: 700,
                fontSize: "clamp(3rem, 9vw, 9rem)",
                lineHeight: 0.95, letterSpacing: "-0.02em",
                color: CREAM, textTransform: "uppercase",
                marginBottom: "2rem", maxWidth: 900,
              }}
            >
              Elevate Your<br />Performance.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}
            >
              <ArrowButton href="#contact" text="Book Free Consultation" />
              <a href="#programmes" style={{
                fontFamily: DISPLAY, fontSize: "0.7rem", fontWeight: 600,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: CREAM, opacity: 0.45, transition: "opacity 200ms",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "0.45"}
              >View Programmes ↓</a>
            </motion.div>

            {/* Hero preview cards */}
            <motion.div
              className="pt2-hero-cards"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              style={{ display: "flex", gap: "1rem", marginTop: "3rem", flexWrap: "wrap" }}
            >
              {[
                { label: "1-1 Coaching",       img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=70" },
                { label: "Online Coaching",     img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&q=70" },
                { label: "Nutrition Planning",  img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=70" },
              ].map(c => (
                <div key={c.label} style={{
                  position: "relative", overflow: "hidden",
                  width: 160, height: 100, borderRadius: 10, flexShrink: 0,
                }}>
                  <img src={c.img} alt={c.label} style={{
                    width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%) brightness(0.5)",
                  }} />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.8))",
                    display: "flex", alignItems: "flex-end", padding: "0.6rem 0.75rem",
                  }}>
                    <span style={{ fontFamily: DISPLAY, fontSize: "0.62rem", fontWeight: 700, color: CREAM, letterSpacing: "0.04em" }}>{c.label}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────────── */}
      <div ref={statsRef} style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, position: "relative", zIndex: 2, background: BG }}>
        <div className="pt2-stats">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="pt2-stat-border"
              initial={{ opacity: 0, y: 16 }}
              animate={statsIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              style={{
                padding: "2rem 2rem",
                borderRight: i < STATS.length - 1 ? `1px solid ${BORDER}` : "none",
              }}
            >
              <div style={{ fontFamily: DISPLAY, fontSize: "1.9rem", fontWeight: 700, color: CREAM, lineHeight: 1, marginBottom: "0.35rem" }}>{s.value}</div>
              <div style={{ fontFamily: BODY, fontSize: "0.72rem", color: GREY, letterSpacing: "0.04em" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ────────────────────────────────────────────────────────────── */}
      <section id="about" className="pt2-pad" style={{ position: "relative", zIndex: 2, background: BG }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div className="pt2-about">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <SectionLabel text="About James" />
              <h2 style={{
                fontFamily: DISPLAY, fontWeight: 700, textTransform: "uppercase",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 0.95,
                letterSpacing: "-0.02em", color: CREAM, marginBottom: "2rem",
              }}>
                I am<br />James Cole.
              </h2>
              <p style={{ fontFamily: BODY, fontSize: "0.9rem", color: GREY, lineHeight: 1.9, marginBottom: "1.25rem", maxWidth: 480 }}>
                BSc Sports Science. NASM certified. 12 years working with real people — beginners, athletes, new parents, executives. I train out of a private studio in Battersea, and I keep my client list small on purpose.
              </p>
              <p style={{ fontFamily: BODY, fontSize: "0.9rem", color: GREY, lineHeight: 1.9, marginBottom: "2.5rem", maxWidth: 480 }}>
                I'll tell you what you need to hear. Not what you want to hear. That's the difference between a trainer and a coach — and it's why my clients stay.
              </p>
              <ArrowButton href="#contact" text="Work With Me" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
              style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "4/5" }}
            >
              <img
                src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=900&q=85"
                alt="James Cole"
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%) contrast(1.05)" }}
              />
              {/* Lime tag */}
              <div style={{
                position: "absolute", bottom: "1.5rem", left: "1.5rem",
                background: LIME, borderRadius: 999, padding: "0.6rem 1.25rem",
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}>
                <span style={{ fontFamily: DISPLAY, fontSize: "0.68rem", fontWeight: 700, color: BG, letterSpacing: "0.1em", textTransform: "uppercase" }}>Battersea Studio</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMMES — SCROLL-DRIVEN CARD STACK ───────────────────────────── */}
      <div id="programmes">

      {/* Mobile: simple stacked cards */}
      <section className="pt2-prog-mobile" style={{ borderTop: `1px solid ${BORDER}`, position: "relative", zIndex: 2, background: BG }}>
        <div style={{ padding: "4rem 1.5rem 2rem" }}>
          <SectionLabel text="Programmes" />
          <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, textTransform: "uppercase", fontSize: "clamp(1.8rem, 7vw, 3rem)", lineHeight: 0.95, letterSpacing: "-0.02em", color: CREAM }}>
            Our Training Programmes
          </h2>
        </div>
        {PROGRAMMES.map((p, i) => (
          <div key={p.slug} style={{ position: "relative", height: "70vw", minHeight: 320, borderTop: `1px solid ${BORDER}` }}>
            <img src={p.img} alt={p.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%) brightness(0.38)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 20%, rgba(12,12,12,0.92) 100%)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", background: LIME, borderRadius: 999, padding: "0.25rem 0.8rem", marginBottom: "0.75rem" }}>
                <span style={{ fontFamily: DISPLAY, fontSize: "0.55rem", fontWeight: 700, color: BG, letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.tag}</span>
              </div>
              <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "clamp(1.6rem, 6vw, 2.5rem)", textTransform: "uppercase", color: CREAM, lineHeight: 0.95, marginBottom: "0.6rem" }}>{p.name}</div>
              <div style={{ fontFamily: DISPLAY, fontSize: "0.72rem", color: LIME, marginBottom: "0.4rem" }}>{p.price}</div>
              <p style={{ fontFamily: BODY, fontSize: "0.8rem", color: GREY, lineHeight: 1.65, marginBottom: "1rem" }}>{p.desc}</p>
              <ArrowButton href="#contact" text="Book This" />
            </div>
          </div>
        ))}
      </section>

      {/* Desktop: scroll-jacked full-screen stack */}
      <section
        className="pt2-prog-desktop"
        ref={programmeRef}
        style={{ position: "relative", zIndex: 2, height: "calc(100dvh + 10px)", borderTop: `1px solid ${BORDER}` }}
      >
        <div style={{ position: "sticky", top: 0, height: "100dvh", overflow: "hidden" }}>

          {/* Section label + title overlay — shown on Card 1 */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            zIndex: 10, padding: "2.5rem 2.5rem 0",
            background: "linear-gradient(180deg, rgba(12,12,12,0.8) 0%, transparent 100%)",
          }}>
            <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <SectionLabel text="Programmes" />
                <h2 style={{
                  fontFamily: DISPLAY, fontWeight: 700, textTransform: "uppercase",
                  fontSize: "clamp(1.6rem, 3vw, 2.8rem)", lineHeight: 0.95,
                  letterSpacing: "-0.02em", color: CREAM,
                }}>
                  Our Training Programmes
                </h2>
              </div>
              <ArrowButton href="#contact" text="Get Started" />
            </div>
          </div>

          {/* Card 1 — always visible base layer */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
            <CardPanel p={PROGRAMMES[0]} i={0} />
          </div>

          {/* Card 2 — rises from below */}
          <motion.div style={{ position: "absolute", inset: 0, zIndex: 2, y: card2Y }}>
            <CardPanel p={PROGRAMMES[1]} i={1} />
          </motion.div>

          {/* Card 3 — rises from below, sits on top */}
          <motion.div style={{ position: "absolute", inset: 0, zIndex: 3, y: card3Y }}>
            <CardPanel p={PROGRAMMES[2]} i={2} />
          </motion.div>

          {/* Scroll hint */}
          <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "0.5rem", opacity: 0.3, zIndex: 10, pointerEvents: "none" }}>
            <div style={{ width: 24, height: 1, background: CREAM }} />
            <span style={{ fontFamily: DISPLAY, fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: CREAM }}>Scroll</span>
            <div style={{ width: 24, height: 1, background: CREAM }} />
          </div>
        </div>
      </section>

      </div>{/* end #programmes wrapper */}

      {/* ── PROCESS ──────────────────────────────────────────────────────────── */}
      <section id="process" className="pt2-pad" style={{ borderTop: `1px solid ${BORDER}`, position: "relative", zIndex: 10, background: BG }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "5rem", flexWrap: "wrap", gap: "2rem" }}>
            <div>
              <SectionLabel text="How It Works" />
              <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, textTransform: "uppercase", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 0.95, letterSpacing: "-0.02em", color: CREAM }}>
                The Process
              </h2>
            </div>
            <p style={{ fontFamily: BODY, fontSize: "0.85rem", color: GREY, lineHeight: 1.85, maxWidth: 360 }}>
              No guesswork, no generic plans. Every client goes through the same four-step foundation before a single set is programmed.
            </p>
          </div>

          <div ref={processRef} className="pt2-process">
            {PROCESS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                animate={processIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "3.5rem" }}
              >
                <div style={{ fontFamily: DISPLAY, fontSize: "0.75rem", fontWeight: 700, color: LIME, letterSpacing: "0.15em", marginBottom: "2rem" }}>{step.num}</div>
                <h3 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "1.2rem", textTransform: "uppercase", letterSpacing: "0.02em", color: CREAM, marginBottom: "1rem" }}>{step.title}</h3>
                <p style={{ fontFamily: BODY, fontSize: "0.82rem", color: GREY, lineHeight: 1.85 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS (event-highlights style) ─────────────────────────────────── */}
      <section id="results" className="pt2-pad" style={{ background: CARD, borderTop: `1px solid ${BORDER}`, position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "5rem", flexWrap: "wrap", gap: "2rem" }}>
            <div>
              <SectionLabel text="Client Results" />
              <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, textTransform: "uppercase", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 0.95, letterSpacing: "-0.02em", color: CREAM }}>
                Transformation<br />Highlights
              </h2>
            </div>
            <ArrowButton href="#contact" text="Start Yours" />
          </div>

          <div ref={resultsRef}>
            {RESULTS.map((r, i) => (
              <motion.div
                key={r.name}
                className="pt2-result-row"
                initial={{ opacity: 0, x: -16 }}
                animate={resultsIn ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "2rem 0", borderBottom: `1px solid ${BORDER}`,
                  flexWrap: "wrap", gap: "0.75rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "2rem", flex: 1, minWidth: 0 }}>
                  <span style={{ fontFamily: DISPLAY, fontSize: "0.65rem", fontWeight: 700, color: GREY, opacity: 0.4, width: 24, flexShrink: 0 }}>{String(i+1).padStart(2,"0")}</span>
                  <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "1.1rem", textTransform: "uppercase", color: CREAM }}>{r.name}</span>
                  <span style={{ fontFamily: BODY, fontSize: "0.78rem", color: GREY, display: "none" /* shown wider */ }}>{r.result}</span>
                </div>
                <div className="pt2-result-inner-right" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                  <span style={{ fontFamily: BODY, fontSize: "0.78rem", color: GREY, display: "flex" }}>{r.result}</span>
                  <span style={{ fontFamily: DISPLAY, fontSize: "0.65rem", fontWeight: 600, color: LIME, letterSpacing: "0.08em", whiteSpace: "nowrap" }}>{r.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────────── */}
      <section className="pt2-pad" style={{ borderTop: `1px solid ${BORDER}`, position: "relative", zIndex: 10, background: BG }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ marginBottom: "5rem" }}>
            <SectionLabel text="Client Stories" />
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, textTransform: "uppercase", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 0.95, letterSpacing: "-0.02em", color: CREAM }}>
              What Clients Say
            </h2>
          </div>

          <div ref={testiRef} className="pt2-testi">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={testiIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  background: CARD, borderRadius: 16, padding: "2.25rem 2rem",
                  border: `1px solid ${BORDER}`,
                  display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "2rem",
                }}
              >
                <p style={{ fontFamily: BODY, fontSize: "0.9rem", color: CREAM, lineHeight: 1.8, opacity: 0.85 }}>"{t.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: LIME, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: DISPLAY, fontSize: "0.7rem", fontWeight: 700, color: BG }}>{t.author[0]}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: DISPLAY, fontSize: "0.78rem", fontWeight: 700, color: CREAM }}>{t.author}</div>
                    <div style={{ fontFamily: BODY, fontSize: "0.68rem", color: GREY }}>{t.title}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────────── */}
      <section id="contact" className="pt2-pad" style={{ background: CARD, borderTop: `1px solid ${BORDER}`, position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div ref={contactRef} className="pt2-contact">

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={contactIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              <SectionLabel text="Get In Touch" />
              <h2 style={{
                fontFamily: DISPLAY, fontWeight: 700, textTransform: "uppercase",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 0.95,
                letterSpacing: "-0.02em", color: CREAM, marginBottom: "2.5rem",
              }}>
                Start Your<br />Transformation.
              </h2>

              {form.sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ padding: "3rem 2rem", border: `1px solid ${LIME}`, borderRadius: 16, textAlign: "center" }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: LIME, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none"><path d="M1 8L7 14L19 2" stroke={BG} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <h3 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "1.6rem", textTransform: "uppercase", color: CREAM, marginBottom: "0.75rem" }}>Message sent.</h3>
                  <p style={{ fontFamily: BODY, fontSize: "0.82rem", color: GREY, lineHeight: 1.8 }}>I'll be in touch within 24 hours to book your free consultation.</p>
                </motion.div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setForm(f => ({ ...f, sent: true })); }}>
                  <div className="pt2-form-row">
                    {[
                      { label: "Full Name",     key: "name",  type: "text",  ph: "Alex Johnson"   },
                      { label: "Email Address", key: "email", type: "email", ph: "alex@email.com"  },
                    ].map(f => (
                      <div key={f.key}>
                        <label style={{ fontFamily: DISPLAY, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: LIME, display: "block", marginBottom: "0.5rem" }}>{f.label}</label>
                        <input type={f.type} required placeholder={f.ph}
                          value={form[f.key as keyof typeof form] as string}
                          onChange={e => setForm(s => ({ ...s, [f.key]: e.target.value }))}
                          style={inputStyle}
                          onFocus={el => (el.currentTarget as HTMLElement).style.borderColor = LIME}
                          onBlur={el  => (el.currentTarget  as HTMLElement).style.borderColor = BORDER}
                        />
                      </div>
                    ))}
                  </div>
                  <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
                    <label style={{ fontFamily: DISPLAY, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: LIME, display: "block", marginBottom: "0.5rem" }}>Phone (Optional)</label>
                    <input type="tel" placeholder="07700 900 000"
                      value={form.phone}
                      onChange={e => setForm(s => ({ ...s, phone: e.target.value }))}
                      style={inputStyle}
                      onFocus={el => (el.currentTarget as HTMLElement).style.borderColor = LIME}
                      onBlur={el  => (el.currentTarget  as HTMLElement).style.borderColor = BORDER}
                    />
                  </div>
                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ fontFamily: DISPLAY, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: LIME, display: "block", marginBottom: "0.5rem" }}>Your Goal</label>
                    <textarea required rows={4} placeholder="Tell me where you're at and where you want to be..."
                      value={form.goal}
                      onChange={e => setForm(s => ({ ...s, goal: e.target.value }))}
                      style={{ ...inputStyle, resize: "vertical" }}
                      onFocus={el => (el.currentTarget as HTMLElement).style.borderColor = LIME}
                      onBlur={el  => (el.currentTarget  as HTMLElement).style.borderColor = BORDER}
                    />
                  </div>
                  <ArrowButton href="" text="Book Free Consultation" dark={false} />
                  <p style={{ fontFamily: BODY, fontSize: "0.66rem", color: GREY, marginTop: "1rem", lineHeight: 1.7, opacity: 0.6 }}>No commitment. I'll reach out within 24 hours.</p>
                </form>
              )}
            </motion.div>

            {/* Right info */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={contactIn ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              style={{ display: "flex", flexDirection: "column", gap: 0, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: "hidden" }}
            >
              {[
                { heading: "Studio Location", lines: ["Private Training Studio", "Battersea, London", "SW11 3BG"] },
                { heading: "Studio Hours",    lines: ["Mon – Fri: 6:00 – 20:00", "Saturday: 7:00 – 14:00", "Sunday: Closed"] },
                { heading: "Contact Direct",  lines: ["james@jamescole.co.uk", "07700 900 000"] },
                { heading: "Credentials",     lines: ["BSc Sports Science", "NASM-CPT", "Precision Nutrition L2"] },
              ].map((panel, i) => (
                <div key={panel.heading} style={{ padding: "2rem", background: BG, borderBottom: i < 3 ? `1px solid ${BORDER}` : "none" }}>
                  <div style={{ fontFamily: DISPLAY, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: LIME, marginBottom: "0.9rem" }}>{panel.heading}</div>
                  {panel.lines.map(l => <div key={l} style={{ fontFamily: BODY, fontSize: "0.82rem", color: GREY, lineHeight: 1.9 }}>{l}</div>)}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: "2.5rem 2.5rem", position: "relative", zIndex: 10, background: BG }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontFamily: DISPLAY, fontSize: "1rem", fontWeight: 700, color: CREAM }}>JAMES <span style={{ color: LIME }}>COLE</span></span>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {NAV_LINKS.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ fontFamily: DISPLAY, fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: GREY, transition: "color 200ms" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = CREAM}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = GREY}
              >{l}</a>
            ))}
          </div>
          <span style={{ fontFamily: BODY, fontSize: "0.64rem", color: GREY, opacity: 0.35 }}>Template by Falcon Designs</span>
        </div>
      </footer>

    </div>
  );
}
