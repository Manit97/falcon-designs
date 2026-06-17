"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// ── TOKENS ──────────────────────────────────────────────────────────────────
const BG     = "#101010";
const PANEL  = "#161616";
const CARD   = "#1C1C1C";
const CREAM  = "#EDEBE5";
const RED    = "#D4453C";
const GREY   = "#777777";
const BORDER = "rgba(255,255,255,0.08)";
const COND   = "'Barlow Condensed', sans-serif";
const SANS   = "'DM Sans', sans-serif";
const EASE   = "cubic-bezier(0.23,1,0.32,1)";

// ── DATA ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = [["About", "#about"], ["Programmes", "#programs"], ["Process", "#process"], ["Contact", "#contact"]];

const TICKER_ITEMS = [
  "200+ Clients Transformed", "12 Years Experience", "95% Retention Rate",
  "South West London", "BSc Sports Science", "NASM Certified",
];

const PROGRAMS = [
  {
    slug: "11", name: "1-1 Coaching", tag: "Most Popular",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    price: "From £120 / session",
    desc: "Fully bespoke programming, real-time technique correction, and weekly check-ins built around your schedule.",
    features: ["Custom programme", "Unlimited WhatsApp support", "Progress tracking", "Monthly reassessment"],
  },
  {
    slug: "online", name: "Online Coaching", tag: "Best Value",
    img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
    price: "From £249 / month",
    desc: "Train anywhere. Full programming, video form review, and direct access — without needing to be in the same city.",
    features: ["App-based programme", "Video form review", "Weekly check-ins", "Nutrition guidelines"],
  },
  {
    slug: "nutrition", name: "Nutrition Planning", tag: "Add-on",
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    price: "From £149 / month",
    desc: "No fads. A sustainable, evidence-based nutrition strategy that complements your training and fits your actual life.",
    features: ["Full macro plan", "Meal timing strategy", "Supplement guidance", "Recipe bank"],
  },
];

const PROCESS = [
  { num: "01", title: "Free Consultation", desc: "A 30-minute call to talk through your goals, your history, and whether we're a good fit. No pressure." },
  { num: "02", title: "Body Assessment", desc: "In-person measurements, movement screening, and a strength baseline to build your programme from." },
  { num: "03", title: "Custom Programme", desc: "Your programme is written for you — not pulled from a template. Week by week, built to progress." },
  { num: "04", title: "Track & Evolve", desc: "Regular reassessments keep the programme aligned with your progress. If it isn't working, we change it." },
];

// ── HOOK ─────────────────────────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

// ── PROGRAM CARD ─────────────────────────────────────────────────────────────
function ProgramCard({ p, i, inView }: { p: typeof PROGRAMS[0]; i: number; inView: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: CARD, overflow: "hidden",
        outline: hov ? `2px solid ${RED}` : "2px solid transparent",
        transition: `outline-color 250ms ${EASE}`,
      }}
    >
      <div style={{ overflow: "hidden", aspectRatio: "16/9", position: "relative" }}>
        <img src={p.img} alt={p.name} style={{
          width: "100%", height: "100%", objectFit: "cover",
          transform: hov ? "scale(1.05)" : "scale(1)",
          transition: `transform 650ms ${EASE}`,
        }} />
        <div style={{ position: "absolute", top: "1rem", right: "1rem", background: RED, padding: "0.28rem 0.7rem" }}>
          <span style={{ fontFamily: SANS, fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: CREAM }}>{p.tag}</span>
        </div>
      </div>
      <div style={{ padding: "1.75rem 1.75rem 2rem" }}>
        <div style={{ fontFamily: COND, fontSize: "1.55rem", fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", color: CREAM, marginBottom: "0.3rem" }}>{p.name}</div>
        <div style={{ fontFamily: SANS, fontSize: "0.68rem", color: RED, fontWeight: 600, letterSpacing: "0.1em", marginBottom: "1rem" }}>{p.price}</div>
        <p style={{ fontFamily: SANS, fontSize: "0.78rem", color: GREY, lineHeight: 1.85, marginBottom: "1.5rem" }}>{p.desc}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
          {p.features.map(f => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div style={{ width: 4, height: 4, background: RED, borderRadius: "50%", flexShrink: 0 }} />
              <span style={{ fontFamily: SANS, fontSize: "0.73rem", color: GREY }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── COMPONENT ────────────────────────────────────────────────────────────────
export default function PTPage() {
  const heroRef  = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", goal: "", sent: false });

  const { scrollYProgress: heroP  } = useScroll({ target: heroRef,  offset: ["start start", "end start"] });
  const { scrollYProgress: aboutP } = useScroll({ target: aboutRef, offset: ["start end", "end start"] });

  const heroImgY    = useTransform(heroP,  [0, 1], [0, 140]);
  const heroOpacity = useTransform(heroP,  [0, 0.7], [1, 0]);
  const aboutImgY   = useTransform(aboutP, [0, 1], [-30, 30]);

  const { ref: programsRef, inView: programsIn } = useReveal();
  const { ref: processRef,  inView: processIn  } = useReveal();
  const { ref: contactRef,  inView: contactIn  } = useReveal(0.05);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const allTicker = [...TICKER_ITEMS, ...TICKER_ITEMS];

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.04)",
    border: `1px solid ${BORDER}`, color: CREAM,
    fontFamily: SANS, fontSize: "0.88rem", padding: "0.875rem 1rem",
    outline: "none", transition: `border-color 200ms`,
  };

  return (
    <div id="pt-root" style={{ background: BG, color: CREAM, fontFamily: SANS, minHeight: "100dvh" }}>

      {/* ── FONTS + GLOBAL STYLES ───────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        #pt-root *, #pt-root *::before, #pt-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
        #pt-root a { text-decoration: none; color: inherit; }
        #pt-root button { cursor: pointer; border: none; background: none; font-family: inherit; }
        #pt-root img { display: block; max-width: 100%; }
        html { scroll-behavior: smooth; }

        @keyframes ptTicker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* Nav */
        .pt-nav-links { display: flex; }
        .pt-burger    { display: none; }
        @media (max-width: 768px) {
          .pt-nav-links { display: none !important; }
          .pt-burger    { display: flex !important; }
        }

        /* About bleeding grid */
        .pt-about-grid { display: grid; grid-template-columns: 50vw 1fr; }
        @media (max-width: 900px) {
          .pt-about-grid { grid-template-columns: 1fr !important; }
          .pt-about-img  { min-height: 360px !important; }
          .pt-about-copy { padding: 3rem 2.5rem !important; }
        }

        /* Programs */
        .pt-programs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        @media (max-width: 960px) { .pt-programs-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .pt-programs-grid { grid-template-columns: 1fr !important; } }

        /* Process */
        .pt-process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
        @media (max-width: 900px) { .pt-process-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 540px) { .pt-process-grid { grid-template-columns: 1fr !important; } }

        /* Contact */
        .pt-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
        @media (max-width: 900px) { .pt-contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } }

        /* Form row */
        .pt-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
        @media (max-width: 560px) { .pt-form-row { grid-template-columns: 1fr !important; } }

        /* Section padding helpers */
        .pt-section { padding: 8rem 2.5rem; }
        @media (max-width: 600px) { .pt-section { padding: 5rem 1.5rem !important; } }

        @media (prefers-reduced-motion: reduce) {
          #pt-root *, #pt-root *::before, #pt-root *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        background: scrolled ? "rgba(16,16,16,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(1.3)" : "none",
        borderBottom: `1px solid ${scrolled ? BORDER : "transparent"}`,
        transition: `background 400ms ${EASE}, border-color 400ms`,
      }}>
        <nav style={{
          maxWidth: 1320, margin: "0 auto", padding: "0 2.5rem",
          height: 68, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <a href="#" style={{ display: "flex", flexDirection: "column", lineHeight: 1, gap: 1 }}>
            <span style={{ fontFamily: COND, fontSize: "1.15rem", fontWeight: 900, letterSpacing: "0.14em", color: CREAM }}>JAMES</span>
            <span style={{ fontFamily: COND, fontSize: "1.15rem", fontWeight: 400, letterSpacing: "0.14em", color: RED }}>COLE</span>
          </a>

          <div className="pt-nav-links" style={{ alignItems: "center", gap: "2.5rem" }}>
            {NAV_LINKS.map(([label, href]) => (
              <a key={href} href={href} style={{
                fontFamily: SANS, fontSize: "0.7rem", fontWeight: 500,
                letterSpacing: "0.12em", textTransform: "uppercase", color: CREAM, opacity: 0.65,
                transition: `opacity 200ms`,
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "0.65"}
              >{label}</a>
            ))}
            <a href="#contact" style={{
              fontFamily: SANS, fontSize: "0.66rem", fontWeight: 600,
              letterSpacing: "0.16em", textTransform: "uppercase",
              padding: "0.58rem 1.35rem",
              border: `1.5px solid ${RED}`, color: RED,
              transition: `background 220ms, color 220ms`,
              display: "inline-block",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = RED; el.style.color = CREAM; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = RED; }}
            >Start Now</a>
          </div>

          <button className="pt-burger" onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            style={{ flexDirection: "column", gap: 5, padding: 4 }}
          >
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: "block", width: 22, height: 1.5, background: CREAM,
                transform: mobileOpen
                  ? i === 0 ? "translateY(6.5px) rotate(45deg)"
                  : i === 2 ? "translateY(-6.5px) rotate(-45deg)"
                  : "scaleX(0)"
                  : "none",
                transition: `transform 300ms ${EASE}`,
              }} />
            ))}
          </button>
        </nav>

        <div style={{
          overflow: "hidden", maxHeight: mobileOpen ? "280px" : 0,
          transition: `max-height 400ms ${EASE}`,
          background: "rgba(16,16,16,0.98)", backdropFilter: "blur(20px)",
          borderTop: `1px solid ${BORDER}`,
        }}>
          <div style={{ padding: "1.5rem 2.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {NAV_LINKS.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMobileOpen(false)} style={{
                fontFamily: SANS, fontSize: "0.78rem", fontWeight: 500,
                letterSpacing: "0.14em", textTransform: "uppercase", color: CREAM,
              }}>{label}</a>
            ))}
          </div>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section ref={heroRef} style={{ position: "relative", height: "100dvh", minHeight: 600, overflow: "hidden" }}>

        {/* Parallax image */}
        <motion.div style={{ position: "absolute", inset: "-15% 0", y: heroImgY }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1800&q=85")`,
            backgroundSize: "cover", backgroundPosition: "center 25%",
          }} />
        </motion.div>

        {/* Gradient overlays */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(16,16,16,0.92) 0%, rgba(16,16,16,0.6) 55%, rgba(16,16,16,0.25) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 45%, rgba(16,16,16,0.92) 100%)" }} />

        {/* Content */}
        <motion.div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          opacity: heroOpacity,
        }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 2.5rem 6rem", width: "100%" }}>

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" }}
            >
              <div style={{ width: 32, height: 2, background: RED }} />
              <span style={{ fontFamily: SANS, fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase", color: RED }}>
                Personal Trainer · South West London
              </span>
            </motion.div>

            {/* HEADLINE — signature: filled + outlined dual lines */}
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
              style={{
                fontFamily: COND, fontWeight: 900,
                lineHeight: 0.88, letterSpacing: "-0.01em",
                marginBottom: "2rem",
              }}
            >
              <div style={{ fontSize: "clamp(4.5rem, 13vw, 14rem)", textAlign: "left", color: CREAM }}>
                TRANSFORM
              </div>
              <div style={{
                fontSize: "clamp(4.5rem, 13vw, 14rem)", textAlign: "right",
                color: "transparent",
                WebkitTextStroke: `2px ${CREAM}`,
              }}>
                YOUR BODY
              </div>
            </motion.h1>

            {/* Sub + CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease: [0.23, 1, 0.32, 1] }}
              style={{ display: "flex", flexWrap: "wrap", gap: "1rem 2.5rem", alignItems: "center" }}
            >
              <p style={{ fontFamily: SANS, fontSize: "0.88rem", color: CREAM, opacity: 0.65, lineHeight: 1.75, maxWidth: 380, flexBasis: "100%" }}>
                Evidence-based training, zero fluff. 12 years helping real people build bodies that last.
              </p>
              <a href="#contact" style={{
                fontFamily: SANS, fontSize: "0.65rem", fontWeight: 600,
                letterSpacing: "0.2em", textTransform: "uppercase",
                padding: "0.9rem 2.25rem", background: RED, color: CREAM,
                display: "inline-block", transition: `opacity 250ms`,
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.82"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
              >Book Free Consultation</a>
              <a href="#programs" style={{
                fontFamily: SANS, fontSize: "0.65rem", fontWeight: 500,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: CREAM, opacity: 0.5,
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                transition: "opacity 200ms",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "0.5"}
              >
                See Programmes
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 4h10M7 1l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          style={{ position: "absolute", right: "2.5rem", bottom: "2.75rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{ width: 1, height: 40, background: `linear-gradient(${RED}, transparent)` }}
          />
          <span style={{ fontFamily: SANS, fontSize: "0.48rem", letterSpacing: "0.3em", textTransform: "uppercase", color: CREAM, opacity: 0.3, writingMode: "vertical-rl" }}>Scroll</span>
        </motion.div>
      </section>

      {/* ── STATS TICKER ─────────────────────────────────────────────────────── */}
      <div style={{ background: RED, overflow: "hidden", padding: "0.9rem 0" }}>
        <div style={{ display: "flex", whiteSpace: "nowrap", animation: "ptTicker 36s linear infinite" }}>
          {allTicker.map((s, i) => (
            <span key={i} style={{
              fontFamily: COND, fontSize: "1.15rem", fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: CREAM, display: "inline-flex", alignItems: "center",
            }}>
              {s}
              <span style={{ display: "inline-block", width: 5, height: 5, background: CREAM, borderRadius: "50%", margin: "0 2rem", opacity: 0.4, flexShrink: 0 }} />
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ────────────────────────────────────────────────────────────── */}
      <section id="about" ref={aboutRef} style={{ overflow: "hidden" }}>
        <div className="pt-about-grid">

          {/* Bleeding image — takes 50vw from left edge */}
          <div className="pt-about-img" style={{ overflow: "hidden", position: "relative", minHeight: 580 }}>
            <motion.div style={{ y: aboutImgY, width: "100%", height: "100%", position: "absolute", inset: 0 }}>
              <img
                src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=1000&q=85"
                alt="James Cole, Personal Trainer"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
              />
            </motion.div>
            {/* Red bar at bottom */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: RED, zIndex: 2 }} />
          </div>

          {/* Copy */}
          <div className="pt-about-copy" style={{ padding: "0 5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
                <div style={{ width: 20, height: 2, background: RED }} />
                <span style={{ fontFamily: SANS, fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: RED }}>About James</span>
              </div>
              <h2 style={{
                fontFamily: COND, fontWeight: 800, textTransform: "uppercase",
                fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 0.95,
                color: CREAM, marginBottom: "1.75rem",
              }}>
                Training that<br />actually works.
              </h2>
              <p style={{ fontFamily: SANS, fontSize: "0.86rem", color: GREY, lineHeight: 1.9, marginBottom: "1.1rem" }}>
                I have a BSc in Sports Science and 12 years of experience working with everyone from complete beginners to competitive athletes. I train out of a private facility in Battersea, and I keep my client list deliberately small.
              </p>
              <p style={{ fontFamily: SANS, fontSize: "0.86rem", color: GREY, lineHeight: 1.9, marginBottom: "2.5rem" }}>
                Most trainers will tell you what you want to hear. I'll tell you what you need to hear — and then show you exactly how to get there.
              </p>

              {/* Credential pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {["BSc Sports Science", "NASM-CPT", "Precision Nutrition L2", "12 Years Experience"].map(c => (
                  <span key={c} style={{
                    fontFamily: SANS, fontSize: "0.63rem", fontWeight: 500, letterSpacing: "0.08em",
                    padding: "0.45rem 0.9rem", border: `1px solid ${BORDER}`, color: GREY,
                  }}>{c}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMMES ───────────────────────────────────────────────────────── */}
      <section id="programs" className="pt-section" style={{ background: PANEL }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
                <div style={{ width: 20, height: 2, background: RED }} />
                <span style={{ fontFamily: SANS, fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: RED }}>Programmes</span>
              </div>
              <h2 style={{ fontFamily: COND, fontWeight: 800, textTransform: "uppercase", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 0.95, color: CREAM }}>
                Choose your<br />path forward.
              </h2>
            </div>
            <p style={{ fontFamily: SANS, fontSize: "0.82rem", color: GREY, lineHeight: 1.85, maxWidth: 340 }}>
              Every programme starts with a free consultation. No commitment, no pressure — just an honest conversation.
            </p>
          </div>

          <div ref={programsRef} className="pt-programs-grid">
            {PROGRAMS.map((p, i) => (
              <ProgramCard key={p.slug} p={p} i={i} inView={programsIn} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TRANSFORMATION QUOTE ─────────────────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "10rem 2.5rem" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url("https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1800&q=80")`,
          backgroundSize: "cover", backgroundPosition: "center 40%",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(16,16,16,0.83)" }} />

        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          >
            <div style={{ fontFamily: COND, fontSize: "7rem", lineHeight: 0.75, color: RED, opacity: 0.22, userSelect: "none", marginBottom: "1.5rem" }}>"</div>
            <p style={{
              fontFamily: COND, fontWeight: 700, textTransform: "uppercase",
              fontSize: "clamp(1.6rem, 3.5vw, 2.75rem)", letterSpacing: "0.03em",
              color: CREAM, lineHeight: 1.2, marginBottom: "2.25rem",
            }}>
              I came in wanting to lose a stone.<br />I left with a completely different relationship<br />with my body.
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
              <div style={{ width: 24, height: 2, background: RED }} />
              <span style={{ fontFamily: SANS, fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: RED }}>
                Sarah T. — 14 months with James
              </span>
              <div style={{ width: 24, height: 2, background: RED }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────────── */}
      <section id="process" className="pt-section">
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>

          <div style={{ marginBottom: "5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
              <div style={{ width: 20, height: 2, background: RED }} />
              <span style={{ fontFamily: SANS, fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: RED }}>How It Works</span>
            </div>
            <h2 style={{ fontFamily: COND, fontWeight: 800, textTransform: "uppercase", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 0.95, color: CREAM }}>
              A process that<br />delivers results.
            </h2>
          </div>

          <div ref={processRef} className="pt-process-grid">
            {PROCESS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 28 }}
                animate={processIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  paddingTop: "2rem",
                  borderTop: `2px solid ${i === 0 ? RED : BORDER}`,
                }}
              >
                <div style={{ fontFamily: COND, fontSize: "3.5rem", fontWeight: 900, color: RED, opacity: 0.22, lineHeight: 1, marginBottom: "1rem" }}>{step.num}</div>
                <h3 style={{ fontFamily: COND, fontSize: "1.35rem", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: CREAM, marginBottom: "0.8rem" }}>{step.title}</h3>
                <p style={{ fontFamily: SANS, fontSize: "0.78rem", color: GREY, lineHeight: 1.9 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────────── */}
      <section id="contact" className="pt-section" style={{ background: PANEL }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div ref={contactRef} className="pt-contact-grid">

            {/* Form */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
                <div style={{ width: 20, height: 2, background: RED }} />
                <span style={{ fontFamily: SANS, fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: RED }}>Get In Touch</span>
              </div>
              <h2 style={{
                fontFamily: COND, fontWeight: 800, textTransform: "uppercase",
                fontSize: "clamp(2.5rem, 4.5vw, 3.75rem)", lineHeight: 0.95,
                color: CREAM, marginBottom: "2.5rem",
              }}>
                Start your<br />transformation.
              </h2>

              {form.sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  style={{ padding: "3rem 2rem", border: `1px solid ${RED}`, textAlign: "center" }}
                >
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%", background: RED,
                    display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem",
                  }}>
                    <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
                      <path d="M1 9L8 16L21 1" stroke={CREAM} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: COND, fontSize: "1.9rem", fontWeight: 800, textTransform: "uppercase", color: CREAM, marginBottom: "0.75rem" }}>
                    Message received.
                  </h3>
                  <p style={{ fontFamily: SANS, fontSize: "0.82rem", color: GREY, lineHeight: 1.8 }}>
                    I'll be in touch within 24 hours to book your free consultation.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={contactIn ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                  onSubmit={e => { e.preventDefault(); setForm(f => ({ ...f, sent: true })); }}
                >
                  <div className="pt-form-row">
                    {[
                      { label: "Full Name",     key: "name",  type: "text",  ph: "Alex Johnson"      },
                      { label: "Email Address", key: "email", type: "email", ph: "alex@email.com"     },
                    ].map(f => (
                      <div key={f.key}>
                        <label style={{ fontFamily: SANS, fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: RED, display: "block", marginBottom: "0.5rem" }}>{f.label}</label>
                        <input
                          type={f.type} required placeholder={f.ph}
                          value={form[f.key as keyof typeof form] as string}
                          onChange={e => setForm(s => ({ ...s, [f.key]: e.target.value }))}
                          style={inputStyle}
                          onFocus={el => (el.currentTarget as HTMLElement).style.borderColor = RED}
                          onBlur={el  => (el.currentTarget  as HTMLElement).style.borderColor = BORDER}
                        />
                      </div>
                    ))}
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ fontFamily: SANS, fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: RED, display: "block", marginBottom: "0.5rem" }}>Phone (Optional)</label>
                    <input
                      type="tel" placeholder="07700 900 000"
                      value={form.phone}
                      onChange={e => setForm(s => ({ ...s, phone: e.target.value }))}
                      style={inputStyle}
                      onFocus={el => (el.currentTarget as HTMLElement).style.borderColor = RED}
                      onBlur={el  => (el.currentTarget  as HTMLElement).style.borderColor = BORDER}
                    />
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ fontFamily: SANS, fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: RED, display: "block", marginBottom: "0.5rem" }}>Your Goal</label>
                    <textarea
                      required rows={4}
                      placeholder="Tell me where you're at and where you want to be..."
                      value={form.goal}
                      onChange={e => setForm(s => ({ ...s, goal: e.target.value }))}
                      style={{ ...inputStyle, resize: "vertical" }}
                      onFocus={el => (el.currentTarget as HTMLElement).style.borderColor = RED}
                      onBlur={el  => (el.currentTarget  as HTMLElement).style.borderColor = BORDER}
                    />
                  </div>

                  <button type="submit" style={{
                    width: "100%", fontFamily: SANS, fontSize: "0.68rem", fontWeight: 600,
                    letterSpacing: "0.2em", textTransform: "uppercase",
                    padding: "1rem 2rem", background: RED, color: CREAM,
                    transition: `opacity 250ms`,
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.82"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
                  >Book Free Consultation →</button>

                  <p style={{ fontFamily: SANS, fontSize: "0.66rem", color: GREY, marginTop: "1rem", lineHeight: 1.7, opacity: 0.65 }}>
                    No commitment. I'll reach out within 24 hours to schedule a call.
                  </p>
                </motion.form>
              )}
            </div>

            {/* Info panels */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                {
                  heading: "Studio Location",
                  body: "Private Training Studio\nBattersea, London\nSW11 3BG",
                },
                {
                  heading: "Studio Hours",
                  body: "Mon – Fri: 6:00 – 20:00\nSaturday: 7:00 – 14:00\nSunday: Closed",
                },
                {
                  heading: "Contact Direct",
                  body: "james@jamescole.co.uk\n07700 900 000",
                },
              ].map((panel, i) => (
                <motion.div
                  key={panel.heading}
                  initial={{ opacity: 0, x: 24 }}
                  animate={contactIn ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                  style={{ padding: "2.25rem 2.5rem", border: `1px solid ${BORDER}` }}
                >
                  <div style={{ fontFamily: COND, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: RED, marginBottom: "1rem" }}>{panel.heading}</div>
                  {panel.body.split("\n").map((line, j) => (
                    <div key={j} style={{ fontFamily: SANS, fontSize: "0.82rem", color: GREY, lineHeight: 1.9 }}>{line}</div>
                  ))}
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer style={{ background: "#0A0A0A", borderTop: `1px solid ${BORDER}`, padding: "2.75rem 2.5rem" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.25rem" }}>
          <div>
            <span style={{ fontFamily: COND, fontSize: "1rem", fontWeight: 900, letterSpacing: "0.12em", color: CREAM }}>JAMES </span>
            <span style={{ fontFamily: COND, fontSize: "1rem", fontWeight: 400, letterSpacing: "0.12em", color: RED }}>COLE</span>
          </div>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {NAV_LINKS.map(([label, href]) => (
              <a key={href} href={href} style={{ fontFamily: SANS, fontSize: "0.66rem", color: GREY, letterSpacing: "0.1em", opacity: 0.55, transition: "opacity 200ms" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "0.55"}
              >{label}</a>
            ))}
          </div>
          <span style={{ fontFamily: SANS, fontSize: "0.64rem", color: GREY, opacity: 0.35 }}>Template by Falcon Designs</span>
        </div>
      </footer>

    </div>
  );
}
