"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────────────────────
   DESIGN SYSTEM — Ivory Dental
   Palette: warm ivory / sage green / warm gold
   Fonts: Playfair Display (headings) + Inter (body)
───────────────────────────────────────────────────────────────────────────── */
const T = {
  bg:       "#FAFAF8",
  surface:  "#F2EDE6",
  surface2: "#E8E1D8",
  sage:     "#5C7A62",
  sageDk:   "#3F5A44",
  sageLt:   "#D4E2D6",
  gold:     "#A8865C",
  goldLt:   "#F0E8DC",
  text:     "#1A1714",
  textMd:   "#4A4540",
  textLt:   "#7A736C",
  border:   "#DDD8D0",
  white:    "#FFFFFF",
};

const EASE = [0.23, 1, 0.32, 1] as const;
const VP   = { once: true, margin: "-60px" } as const;

const SERIF = "'Playfair Display', Georgia, serif";
const SANS  = "'Inter', system-ui, sans-serif";

// ── Google Fonts loader ───────────────────────────────────────────────────────
function FontLoader() {
  useEffect(() => {
    if (document.getElementById("ivory-fonts")) return;
    const l = document.createElement("link");
    l.id   = "ivory-fonts";
    l.rel  = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap";
    document.head.appendChild(l);
  }, []);
  return null;
}

// ── Animated count-up ─────────────────────────────────────────────────────────
function CountUp({ to, suffix, decimal }: { to: number; suffix: string; decimal?: boolean }) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv     = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });
  useEffect(() => { if (inView) mv.set(to); }, [inView, to, mv]);
  useEffect(() => spring.on("change", v => {
    if (ref.current) ref.current.textContent = decimal ? v.toFixed(1) : Math.floor(v).toLocaleString();
  }), [spring, decimal]);
  return <span ref={ref}>0</span>;
}

// ── Before / After slider ─────────────────────────────────────────────────────
function BeforeAfterSlider({ before, after, label }: { before: string; after: string; label: string }) {
  const [pos, setPos]   = useState(50);
  const [drag, setDrag] = useState(false);
  const ref             = useRef<HTMLDivElement>(null);
  const move = (clientX: number) => {
    if (!ref.current) return;
    const { left, width } = ref.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - left) / width) * 100)));
  };
  return (
    <div ref={ref} onMouseMove={e => drag && move(e.clientX)} onMouseUp={() => setDrag(false)} onMouseLeave={() => setDrag(false)} onTouchMove={e => move(e.touches[0].clientX)}
      style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", cursor: "col-resize", userSelect: "none" }}>
      <img src={after} alt={`After — ${label}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={before} alt={`Before — ${label}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
      </div>
      <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, width: "2px", background: "#fff", transform: "translateX(-50%)", pointerEvents: "none" }} />
      <div onMouseDown={e => { e.preventDefault(); setDrag(true); }} onTouchStart={() => setDrag(true)}
        style={{ position: "absolute", top: "50%", left: `${pos}%`, transform: "translate(-50%,-50%)", width: 40, height: 40, background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.25)", cursor: "ew-resize", zIndex: 2 }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5 8H2M5 8L3 6M5 8L3 10M11 8H14M11 8L13 6M11 8L13 10" stroke={T.textMd} strokeWidth="1.5" strokeLinecap="round" /></svg>
      </div>
      <span style={{ position: "absolute", bottom: 12, left: 12, background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "3px 8px", backdropFilter: "blur(4px)" }}>Before</span>
      <span style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(92,122,98,0.85)", color: "#fff", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "3px 8px" }}>After</span>
      <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: "0.7rem", fontWeight: 500, padding: "4px 12px", backdropFilter: "blur(4px)", whiteSpace: "nowrap" }}>{label}</div>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Services",   id: "section-services" },
  { label: "Treatments", id: "section-treatments" },
  { label: "Our Team",   id: "section-team" },
  { label: "Gallery",    id: "section-gallery" },
  { label: "Contact",    id: "section-contact" },
];

function scrollTo(id: string) {
  const shell = document.getElementById("dental-shell");
  const el    = document.getElementById(id);
  if (!shell || !el) return;
  shell.scrollTo({ top: el.offsetTop - 68, behavior: "smooth" });
}

function DentalNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const el = document.getElementById("dental-shell");
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 40);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 200, background: scrolled ? "rgba(250,250,248,0.96)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: `1px solid ${scrolled ? T.border : "transparent"}`, transition: "all 300ms", fontFamily: SANS }}>
      <nav style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => scrollTo("dental-hero")} style={{ display: "flex", alignItems: "center", gap: "0.6rem", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none"><path d="M14 3C10 3 7 6 7 9c0 2 .5 3.5 1 5l2 8c.3 1.2 1 2 2 2s1.5-.8 2-2l1-4 1 4c.5 1.2 1.2 2 2 2s1.7-.8 2-2l2-8c.5-1.5 1-3 1-5 0-3-3-6-7-6z" fill={T.sage} /></svg>
          <span style={{ fontFamily: SERIF, fontSize: "1.1rem", fontWeight: 600, color: T.text }}>Ivory Dental</span>
        </button>
        <div style={{ display: "flex", gap: "2.25rem", alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)}
              style={{ background: "none", border: "none", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.05em", color: T.textMd, cursor: "pointer", padding: 0, transition: "color 180ms" }}
              onMouseEnter={e => (e.currentTarget.style.color = T.sage)}
              onMouseLeave={e => (e.currentTarget.style.color = T.textMd)}
            >{l.label}</button>
          ))}
          <button onClick={() => scrollTo("section-contact")}
            style={{ padding: "0.65rem 1.4rem", background: T.sage, color: "#fff", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", border: "none", transition: "background 200ms" }}
            onMouseEnter={e => (e.currentTarget.style.background = T.sageDk)}
            onMouseLeave={e => (e.currentTarget.style.background = T.sage)}
          >Book Now</button>
        </div>
      </nav>
    </header>
  );
}

// ── Testimonial card ───────────────────────────────────────────────────────────
function TestimonialCard({ name, treatment, quote, i }: { name: string; treatment: string; quote: string; i: number }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
      style={{ background: T.white, border: `1px solid ${T.border}`, padding: "1.75rem", display: "flex", flexDirection: "column", gap: "0.875rem", fontFamily: SANS }}
    >
      <div style={{ display: "flex", gap: 2 }}>
        {[...Array(5)].map((_, k) => <svg key={k} width="13" height="13" viewBox="0 0 24 24" fill={T.gold}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
      </div>
      <p style={{ fontSize: "0.87rem", color: T.textMd, lineHeight: "1.75", fontStyle: "italic" }}>"{quote.slice(0, 155)}…"</p>
      <div>
        <p style={{ fontSize: "0.82rem", fontWeight: 600, color: T.text }}>{name}</p>
        <p style={{ fontSize: "0.73rem", color: T.sage, letterSpacing: "0.06em" }}>{treatment}</p>
      </div>
    </motion.div>
  );
}

// ── Treatment card ────────────────────────────────────────────────────────────
function TreatmentCard({ name, desc, price, img, i }: { name: string; desc: string; price: string; img: string; i: number }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: (i % 3) * 0.09, ease: EASE }} style={{ fontFamily: SANS }}>
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3", marginBottom: "1rem" }}>
        <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 500ms cubic-bezier(0.23,1,0.32,1)" }} loading="lazy"
          onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)")}
          onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,23,20,0.5) 0%, transparent 60%)" }} />
        <span style={{ position: "absolute", bottom: 12, left: 12, background: T.sage, color: "#fff", fontSize: "0.63rem", fontWeight: 600, letterSpacing: "0.1em", padding: "4px 10px" }}>{price}</span>
      </div>
      <h3 style={{ fontFamily: SERIF, fontSize: "1.12rem", fontWeight: 500, color: T.text, marginBottom: "0.4rem" }}>{name}</h3>
      <p style={{ fontSize: "0.82rem", color: T.textLt, lineHeight: "1.65" }}>{desc}</p>
    </motion.div>
  );
}

// ── Team member card ──────────────────────────────────────────────────────────
function TeamCard({ name, role, img, specialties, i }: { name: string; role: string; img: string; specialties: string[]; i: number }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
      style={{ background: T.white, border: `1px solid ${T.border}`, overflow: "hidden", fontFamily: SANS }}
    >
      <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
        <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%", transition: "transform 600ms cubic-bezier(0.23,1,0.32,1)" }} loading="lazy"
          onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)")}
          onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(92,122,98,0.15) 0%, transparent 50%)" }} />
      </div>
      <div style={{ padding: "1.5rem" }}>
        <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: T.sage, marginBottom: "0.4rem" }}>{role}</p>
        <h3 style={{ fontFamily: SERIF, fontSize: "1.2rem", fontWeight: 500, color: T.text, marginBottom: "0.875rem" }}>{name}</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {specialties.map(s => (
            <span key={s} style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase", color: T.sage, background: T.sageLt, padding: "3px 10px" }}>{s}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Gallery bento ─────────────────────────────────────────────────────────────
const GALLERY = [
  { id: 1, span: "col-span-1 row-span-2", img: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80",  label: "Porcelain Veneers",  cat: "Veneers" },
  { id: 2, span: "col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80",  label: "Boutique Whitening", cat: "Whitening" },
  { id: 3, span: "col-span-2 row-span-1", img: "https://images.unsplash.com/photo-1591134279046-e6c4ab5d3c14?w=1200&q=80", label: "Composite Bonding",  cat: "Bonding" },
  { id: 4, span: "col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",   label: "Invisalign Result",  cat: "Ortho" },
  { id: 5, span: "col-span-1 row-span-2", img: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80",  label: "Dental Implant",    cat: "Implants" },
  { id: 6, span: "col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",  label: "Veneers x4",        cat: "Veneers" },
];

function GalleryItem({ item, i }: { item: typeof GALLERY[0]; i: number }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, scale: 0.96 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
      className={item.span} style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
    >
      <img src={item.img} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 500ms cubic-bezier(0.23,1,0.32,1)" }} loading="lazy"
        onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"; (e.currentTarget.nextSibling as HTMLElement).style.opacity = "1"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; (e.currentTarget.nextSibling as HTMLElement).style.opacity = "0"; }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,23,20,0.65) 0%, transparent 55%)", opacity: 0, transition: "opacity 250ms", pointerEvents: "none" }}>
        <div style={{ position: "absolute", bottom: 12, left: 12, fontFamily: SANS }}>
          <p style={{ color: "#fff", fontSize: "0.78rem", fontWeight: 600 }}>{item.label}</p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.63rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{item.cat}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function DentalShowcase() {
  return (
    <div id="dental-shell" style={{ background: T.bg, overflowY: "auto", overflowX: "hidden", height: "100dvh", fontFamily: SANS }}>
      <FontLoader />

      {/* CSS grid span helpers */}
      <style>{`
        #dental-shell .col-span-1{grid-column:span 1}
        #dental-shell .col-span-2{grid-column:span 2}
        #dental-shell .row-span-1{grid-row:span 1}
        #dental-shell .row-span-2{grid-row:span 2}
        @media(max-width:640px){
          #dental-shell .col-span-2{grid-column:span 1}
          #dental-shell .row-span-2{grid-row:span 1}
        }
      `}</style>

      {/* ── NAVBAR ──────────────────────────────────────────────────────── */}
      <DentalNav />

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section id="dental-hero" style={{ display: "grid", gridTemplateColumns: "52fr 48fr", minHeight: "calc(100dvh - 68px)", overflow: "hidden" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "4rem 3rem 4rem clamp(2rem, 5vw, 5rem)", background: T.bg }}>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ fontFamily: SANS, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.sage, marginBottom: "1.25rem" }}
          >Premium Private Dentistry · London</motion.p>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            style={{ fontFamily: SERIF, fontSize: "clamp(2.5rem, 4.5vw, 4.6rem)", fontWeight: 500, lineHeight: 1.08, color: T.text, marginBottom: "1.5rem" }}
          >
            Exceptional dental care,<br />
            <em style={{ fontStyle: "italic", color: T.sage }}>beautifully</em> delivered.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
            style={{ fontSize: "0.97rem", color: T.textMd, lineHeight: "1.75", maxWidth: 480, marginBottom: "2.5rem" }}
          >From routine check-ups to full smile transformations, every treatment is delivered with the precision, artistry and personal attention you deserve.</motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <div style={{ padding: "0.875rem 2rem", background: T.sage, color: "#fff", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", transition: "background 220ms" }}
              onMouseEnter={e => (e.currentTarget.style.background = T.sageDk)} onMouseLeave={e => (e.currentTarget.style.background = T.sage)}>
              Book a consultation
            </div>
            <div style={{ padding: "0.875rem 2rem", background: "transparent", color: T.sage, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", border: `1.5px solid ${T.sage}`, cursor: "pointer", transition: "all 220ms" }}
              onMouseEnter={e => { e.currentTarget.style.background = T.sage; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.sage; }}>
              View treatments
            </div>
          </motion.div>

        </div>

        {/* Bleeding hero image */}
        <div style={{ position: "relative", overflow: "hidden", minHeight: 400 }}>
          <motion.img src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1400&q=80" alt="Dentist with patient"
            initial={{ scale: 1.08, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, ease: EASE }}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(92,122,98,0.12) 0%, transparent 55%)" }} />
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 80, background: `linear-gradient(to right, ${T.bg}, transparent)` }} />
        </div>
      </section>

      {/* ── ACCREDITATIONS MARQUEE ───────────────────────────────────────── */}
      <div style={{ background: T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, overflow: "hidden", padding: "1.2rem 0" }}>
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} style={{ display: "flex", gap: "3.5rem", whiteSpace: "nowrap", width: "max-content" }}>
          {[...["British Dental Association","Care Quality Commission","General Dental Council","Invisalign Diamond Provider","Royal College of Surgeons","Association of Dental Implantology"],
            ...["British Dental Association","Care Quality Commission","General Dental Council","Invisalign Diamond Provider","Royal College of Surgeons","Association of Dental Implantology"]].map((a, i) => (
            <span key={i} style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.textLt }}>
              {a}<span style={{ color: T.sage, marginLeft: "3.5rem" }}>·</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section style={{ padding: "5rem 2rem", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: T.border }}>
          {[
            { to: 4800, suffix: "+",    label: "Patients treated" },
            { to: 14,   suffix: " yrs", label: "In private practice" },
            { to: 4.9,  suffix: "",     label: "Google rating", decimal: true },
            { to: 98,   suffix: "%",    label: "Patient satisfaction" },
          ].map(s => (
            <div key={s.label} style={{ background: T.bg, padding: "2.5rem 2rem", textAlign: "center" }}>
              <div style={{ fontFamily: SERIF, fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 500, color: T.text, marginBottom: "0.4rem", lineHeight: 1 }}>
                <CountUp to={s.to} suffix={s.suffix} decimal={s.decimal} />{s.suffix}
              </div>
              <div style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: T.textLt }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section id="section-services" style={{ background: T.surface, padding: "6rem 2rem", borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "end", marginBottom: "4rem" }}>
            <div>
              <p style={{ fontFamily: SANS, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.sage, marginBottom: "0.75rem" }}>How we care for you</p>
              <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, color: T.text, lineHeight: 1.1 }}>
                Every aspect of your<br /><em style={{ color: T.sage }}>dental health, covered.</em>
              </h2>
            </div>
            <p style={{ fontSize: "0.9rem", color: T.textMd, lineHeight: "1.8", alignSelf: "end" }}>
              From your very first visit to ongoing preventive care and complex smile transformations, Ivory Dental offers a complete suite of services designed around you — not a one-size-fits-all approach.
            </p>
          </div>

          {/* Main services grid — 3 featured + 5 supporting */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: T.border, marginBottom: 2 }}>
            {[
              {
                label: "New Patient Journey",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={T.sage} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                ),
                desc: "A dedicated 60-minute welcome consultation. We review your dental history, take digital X-rays, assess your gums and bite, and build a completely personalised care plan — no rushing, no pressure.",
                tag: "Complimentary assessment",
              },
              {
                label: "Dental Care Plans",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={T.sage} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                ),
                desc: "Our monthly membership plan covers two check-ups, two hygiene visits, all X-rays and a 10% discount on all treatments. From £18/month — better value than pay-as-you-go, with no insurance complexity.",
                tag: "From £18 / month",
              },
              {
                label: "Sedation Dentistry",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={T.sage} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                ),
                desc: "Conscious IV sedation and oral sedation options for anxious patients, complex procedures or those who simply prefer to be fully relaxed. You remain safe and responsive — but calm, comfortable and virtually unaware of the treatment.",
                tag: "Anxiety-free",
              },
            ].map(s => (
              <motion.div key={s.label}
                whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}
                style={{ background: T.white, padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}
              >
                <div style={{ width: 52, height: 52, background: T.sageLt, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div>
                  <p style={{ fontFamily: SANS, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.sage, marginBottom: "0.5rem" }}>{s.tag}</p>
                  <h3 style={{ fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 500, color: T.text, marginBottom: "0.75rem" }}>{s.label}</h3>
                  <p style={{ fontSize: "0.84rem", color: T.textMd, lineHeight: "1.75" }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Supporting services — horizontal list */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 2, background: T.border }}>
            {[
              {
                label: "Family Dentistry",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={T.sage} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
                desc: "Appointments for the whole family from age 3 upward. NHS-aligned fees for under-18s.",
              },
              {
                label: "Corporate Dental",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={T.sage} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
                desc: "Group care plans, lunchtime appointments and on-site health days for businesses across Central London.",
              },
              {
                label: "Digital Smile Design",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={T.sage} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
                desc: "Preview your new smile digitally before any treatment begins. Software-mapped to your face and bone structure.",
              },
              {
                label: "Dental Finance",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={T.sage} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
                desc: "0% interest finance on treatments over £500. Spread the cost over 12 months with no hidden fees.",
              },
              {
                label: "Oral Cancer Screening",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={T.sage} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
                desc: "VELscope screening included at every check-up. Early detection saves lives — it takes under 2 minutes.",
              },
            ].map((s, i) => (
              <motion.div key={s.label}
                whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 16 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
                style={{ background: T.bg, padding: "2rem 1.75rem", cursor: "default", transition: "background 250ms" }}
                onMouseEnter={e => (e.currentTarget.style.background = T.white)}
                onMouseLeave={e => (e.currentTarget.style.background = T.bg)}
              >
                <div style={{ color: T.sage, marginBottom: "1rem" }}>{s.icon}</div>
                <h4 style={{ fontFamily: SERIF, fontSize: "1rem", fontWeight: 500, color: T.text, marginBottom: "0.5rem" }}>{s.label}</h4>
                <p style={{ fontSize: "0.8rem", color: T.textLt, lineHeight: "1.7" }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA strip */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", marginTop: "3rem", padding: "2rem 2.5rem", background: T.sage }}>
            <div>
              <p style={{ fontFamily: SERIF, fontSize: "1.2rem", fontWeight: 500, color: "#fff", marginBottom: "0.25rem" }}>Not sure where to start?</p>
              <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.75)", fontFamily: SANS }}>Book a complimentary consultation and we'll guide you through every option.</p>
            </div>
            <button
              onClick={() => scrollTo("section-contact")}
              style={{ padding: "0.875rem 2.25rem", background: T.white, color: T.sage, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", border: "none", cursor: "pointer", flexShrink: 0, transition: "background 200ms, color 200ms" }}
              onMouseEnter={e => { e.currentTarget.style.background = T.sageLt; }}
              onMouseLeave={e => { e.currentTarget.style.background = T.white; }}
            >Book a free consultation</button>
          </div>

        </div>
      </section>

      {/* ── TREATMENTS ───────────────────────────────────────────────────── */}
      <section id="section-treatments" style={{ padding: "0 2rem 6rem", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: SANS, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.sage, marginBottom: "0.75rem" }}>What we offer</p>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, color: T.text, marginBottom: "1rem" }}>Treatments for every smile</h2>
          <p style={{ fontSize: "0.88rem", color: T.textLt, maxWidth: 480, margin: "0 auto", lineHeight: "1.75" }}>
            From your first hygiene visit to a complete smile makeover, our full range of treatments is designed to care for you at every stage of life.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: "2.5rem" }}>
          {[
            { name: "General Dentistry",  desc: "Comprehensive check-ups, hygiene cleans and preventive care to keep your smile in perfect health.", price: "From £65",    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80" },
            { name: "Cosmetic Dentistry", desc: "Veneers, composite bonding and smile design to give you the radiant, balanced smile you've always wanted.", price: "From £295",  img: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80" },
            { name: "Orthodontics",       desc: "Invisalign and ceramic braces to straighten teeth discreetly for teens and adults alike.",               price: "From £1,800", img: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80" },
            { name: "Dental Implants",    desc: "Titanium implants that look, feel and function exactly like natural teeth — designed to last a lifetime.", price: "From £2,200", img: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80" },
            { name: "Teeth Whitening",    desc: "Professional in-chair and take-home whitening systems that deliver dramatically brighter results.",        price: "From £350",   img: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80" },
            { name: "Emergency Dental",   desc: "Same-day emergency appointments for toothache, broken teeth and dental trauma — 7 days a week.",          price: "From £95",    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80" },
          ].map((t, i) => <TreatmentCard key={t.name} {...t} i={i} />)}
        </div>
      </section>

      {/* ── BEFORE / AFTER ───────────────────────────────────────────────── */}
      <section style={{ background: T.surface, padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p style={{ fontFamily: SANS, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.sage, marginBottom: "0.75rem" }}>Smile transformations</p>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, color: T.text, marginBottom: "1rem" }}>The Ivory Dental difference</h2>
            <p style={{ fontSize: "0.87rem", color: T.textLt, maxWidth: 440, margin: "0 auto", lineHeight: "1.75" }}>Drag the slider to reveal the transformation. Real patients, real results — no filters.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "2rem" }}>
            {[
              { label: "Porcelain Veneers",  before: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80", after: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80" },
              { label: "Composite Bonding",  before: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80", after: "https://images.unsplash.com/photo-1591134279046-e6c4ab5d3c14?w=800&q=80" },
              { label: "Teeth Whitening",    before: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80", after: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80" },
            ].map(item => <BeforeAfterSlider key={item.label} {...item} />)}
          </div>
        </div>
      </section>

      {/* ── SPLIT FEATURE ────────────────────────────────────────────────── */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ position: "relative", overflow: "hidden", minHeight: 500 }}>
          <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80" alt="Modern dental practice" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, transparent 60%, ${T.bg})` }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "4rem clamp(2rem,4vw,4rem)", background: T.bg }}>
          <p style={{ fontFamily: SANS, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.sage, marginBottom: "1rem" }}>Why Ivory Dental</p>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 500, color: T.text, lineHeight: 1.2, marginBottom: "1.75rem" }}>
            A practice that puts you<br /><em style={{ color: T.sage }}>at the centre</em> of everything.
          </h2>
          {[
            { title: "Anxiety-free environment", desc: "Sedation options, TV glasses, a calm team and no judgment — ever." },
            { title: "Digital-first precision", desc: "CBCT 3D scanning, CAD/CAM crowns and digital smile design as standard." },
            { title: "Transparent pricing", desc: "Full treatment plans with costs agreed in advance. No hidden fees." },
            { title: "Central London location", desc: "42 Harley Street, moments from Oxford Circus and Bond Street." },
          ].map(f => (
            <div key={f.title} style={{ display: "flex", gap: "1rem", marginBottom: "1.2rem" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.sage, flexShrink: 0, marginTop: 8 }} />
              <div>
                <p style={{ fontSize: "0.88rem", fontWeight: 600, color: T.text, marginBottom: "0.2rem" }}>{f.title}</p>
                <p style={{ fontSize: "0.82rem", color: T.textLt, lineHeight: "1.6" }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────────────── */}
      <section id="section-team" style={{ padding: "6rem 2rem", background: T.surface }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p style={{ fontFamily: SANS, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.sage, marginBottom: "0.75rem" }}>The team</p>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, color: T.text }}>Meet the experts behind your smile</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1.5rem" }}>
            {[
              { name: "Dr. Sarah Mitchell", role: "Principal Dentist & Cosmetic Specialist", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80", specialties: ["Cosmetic", "Veneers"] },
              { name: "Dr. James Okafor",   role: "Implantologist & Oral Surgeon",           img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80", specialties: ["Implants", "Surgery"] },
              { name: "Dr. Priya Sharma",   role: "Orthodontist",                            img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80", specialties: ["Invisalign", "Braces"] },
              { name: "Hannah Cole",        role: "Lead Dental Hygienist",                   img: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=800&q=80", specialties: ["Hygiene", "Prevention"] },
            ].map((m, i) => <TeamCard key={m.name} {...m} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── GALLERY BENTO ────────────────────────────────────────────────── */}
      <section id="section-gallery" style={{ padding: "6rem 2rem", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: SANS, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.sage, marginBottom: "0.75rem" }}>Smile gallery</p>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, color: T.text }}>Real patients, real results</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gridAutoRows: "200px", gap: 10 }}>
          {GALLERY.map((item, i) => <GalleryItem key={item.id} item={item} i={i} />)}
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section style={{ padding: "6rem 2rem", background: T.surface }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p style={{ fontFamily: SANS, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.sage, marginBottom: "0.75rem" }}>Patient stories</p>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, color: T.text }}>Changing smiles, changing lives</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: "1.5rem" }}>
            {[
              { name: "Charlotte W.", treatment: "Porcelain Veneers",  quote: "I'd been self-conscious about my smile for 20 years. Dr Mitchell completely transformed it — the veneers look so natural that nobody believes they aren't my real teeth. The whole experience was calm, explained at every stage, and genuinely painless." },
              { name: "Marcus T.",    treatment: "Dental Implants",    quote: "I was terrified of the implant process but James made the whole thing straightforward. Three months later I have a tooth I literally can't tell apart from the rest. Best money I've ever spent on myself." },
              { name: "Aisha K.",     treatment: "Invisalign",         quote: "14 months of Invisalign with Dr Sharma and my teeth are perfect. The digital preview at the start was brilliant — seeing where I'd end up kept me motivated throughout. The practice is beautiful and the team are exceptional." },
              { name: "Robert H.",    treatment: "Teeth Whitening",    quote: "I was sceptical whitening would make much difference at my age. I was very wrong. 8 shades lighter in 90 minutes — my colleagues all asked if I'd been on holiday. Couldn't be happier." },
              { name: "Sophie L.",    treatment: "Composite Bonding",  quote: "The bonding on my chipped front teeth took less than two hours and is completely invisible. Dr Mitchell is an artist. I keep catching myself smiling in the mirror, which I never did before." },
              { name: "David M.",     treatment: "Emergency Appointment", quote: "I called at 7:30am on a Sunday with excruciating toothache. I was seen by 9am, had the tooth treated and was pain-free by lunchtime. Remarkable service and incredibly reassuring in what felt like a crisis." },
            ].map((t, i) => <TestimonialCard key={t.name} {...t} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section id="section-contact" style={{ position: "relative", overflow: "hidden", padding: "7rem 2rem", textAlign: "center" }}>
        <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&q=80" alt="" aria-hidden
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.22) saturate(0.5)" }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: SANS, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.sageLt, marginBottom: "1rem" }}>Ready to begin?</p>
          <motion.h2 whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
            style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4.5vw,3.5rem)", fontWeight: 500, color: "#fff", maxWidth: 700, margin: "0 auto 1.5rem", lineHeight: 1.15 }}
          >Your perfect smile is closer than you think.</motion.h2>
          <p style={{ fontSize: "0.93rem", color: "rgba(255,255,255,0.7)", maxWidth: 440, margin: "0 auto 2.5rem", lineHeight: "1.75", fontFamily: SANS }}>
            Book a consultation today and let us show you exactly what's possible. Complimentary smile assessment included.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <div style={{ padding: "0.875rem 2rem", background: T.sage, color: "#fff", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", fontFamily: SANS, transition: "background 220ms" }}
              onMouseEnter={e => (e.currentTarget.style.background = T.sageDk)} onMouseLeave={e => (e.currentTarget.style.background = T.sage)}>
              Book your consultation
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#fff", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", border: "1.5px solid rgba(255,255,255,0.4)", padding: "0.875rem 2rem", cursor: "pointer", fontFamily: SANS }}>
              📞 020 1234 5678
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ background: T.text, color: "rgba(255,255,255,0.65)", fontFamily: SANS, padding: "3.5rem 2rem 1.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "2.5rem", marginBottom: "2.5rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none"><path d="M14 3C10 3 7 6 7 9c0 2 .5 3.5 1 5l2 8c.3 1.2 1 2 2 2s1.5-.8 2-2l1-4 1 4c.5 1.2 1.2 2 2 2s1.7-.8 2-2l2-8c.5-1.5 1-3 1-5 0-3-3-6-7-6z" fill={T.sage} /></svg>
              <span style={{ fontFamily: SERIF, fontSize: "1rem", fontWeight: 600, color: "#fff" }}>Ivory Dental</span>
            </div>
            <p style={{ fontSize: "0.82rem", lineHeight: "1.7", color: "rgba(255,255,255,0.5)", maxWidth: 240 }}>Award-winning private dentistry in the heart of London. Exceptional care since 2010.</p>
          </div>
          {[
            { title: "Treatments", links: ["General Dentistry","Cosmetic Dentistry","Orthodontics","Dental Implants","Teeth Whitening","Emergency Dental"] },
            { title: "Contact",    links: ["020 1234 5678","hello@ivorydental.co.uk","42 Harley Street, W1G 9PH","Mon–Fri 8am–7pm · Sat 9am–4pm"] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: T.sageLt, marginBottom: "1.25rem" }}>{col.title}</h4>
              {col.links.map(l => <p key={l} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", marginBottom: "0.55rem" }}>{l}</p>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.25rem", fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
          <span>© {new Date().getFullYear()} Ivory Dental Ltd. All rights reserved.</span>
          <span>GDC Number: 123456 · CQC Registered</span>
        </div>
      </footer>
    </div>
  );
}
