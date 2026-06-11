"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

const T = {
  bg:      "#FAFAF8",
  surface: "#F2EDE6",
  sage:    "#5C7A62",
  sageDk:  "#3F5A44",
  sageLt:  "#D4E2D6",
  gold:    "#A8865C",
  text:    "#1A1714",
  textMd:  "#4A4540",
  textLt:  "#7A736C",
  border:  "#DDD8D0",
  white:   "#FFFFFF",
};
const EASE  = [0.23, 1, 0.32, 1] as const;
const SERIF = "'Playfair Display', Georgia, serif";
const SANS  = "'Inter', system-ui, sans-serif";
const BASE  = "/showcase/dental";

// ── Count-up ──────────────────────────────────────────────────────────────────
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

// ── Before/After slider ───────────────────────────────────────────────────────
function Slider({ before, after, label }: { before: string; after: string; label: string }) {
  const [pos, setPos]   = useState(50);
  const [drag, setDrag] = useState(false);
  const ref             = useRef<HTMLDivElement>(null);
  const move = (x: number) => {
    if (!ref.current) return;
    const { left, width } = ref.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((x - left) / width) * 100)));
  };
  return (
    <div ref={ref} onMouseMove={e => drag && move(e.clientX)} onMouseUp={() => setDrag(false)} onMouseLeave={() => setDrag(false)} onTouchMove={e => move(e.touches[0].clientX)}
      style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", cursor: "col-resize", userSelect: "none" }}>
      <img src={after}  alt="After"  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={before} alt="Before" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
      </div>
      <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, width: 2, background: "#fff", transform: "translateX(-50%)", pointerEvents: "none" }} />
      <div onMouseDown={e => { e.preventDefault(); setDrag(true); }} onTouchStart={() => setDrag(true)}
        style={{ position: "absolute", top: "50%", left: `${pos}%`, transform: "translate(-50%,-50%)", width: 40, height: 40, background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.25)", cursor: "ew-resize", zIndex: 2 }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5 8H2M5 8L3 6M5 8L3 10M11 8H14M11 8L13 6M11 8L13 10" stroke={T.textMd} strokeWidth="1.5" strokeLinecap="round" /></svg>
      </div>
      <span style={{ position: "absolute", bottom: 12, left: 12, background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "3px 8px" }}>Before</span>
      <span style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(92,122,98,0.85)", color: "#fff", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "3px 8px" }}>After</span>
      <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: "0.7rem", padding: "4px 12px", whiteSpace: "nowrap" }}>{label}</div>
    </div>
  );
}

// ── Testimonial ───────────────────────────────────────────────────────────────
function Testimonial({ name, treatment, quote, i }: { name: string; treatment: string; quote: string; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
      style={{ background: T.white, border: `1px solid ${T.border}`, padding: "1.75rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: (i % 3) * 0.09, ease: EASE }}>
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

// ─────────────────────────────────────────────────────────────────────────────
export default function DentalHome() {
  return (
    <div style={{ background: T.bg, fontFamily: SANS }}>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section style={{ display: "grid", gridTemplateColumns: "52fr 48fr", minHeight: "calc(100dvh - 68px)", overflow: "hidden" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "4rem 3rem 4rem clamp(2rem,5vw,5rem)", background: T.bg }}>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.sage, marginBottom: "1.25rem" }}>
            Premium Private Dentistry · London
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            style={{ fontFamily: SERIF, fontSize: "clamp(2.5rem,4.5vw,4.6rem)", fontWeight: 500, lineHeight: 1.08, color: T.text, marginBottom: "1.5rem" }}>
            Exceptional dental care,<br /><em style={{ fontStyle: "italic", color: T.sage }}>beautifully</em> delivered.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
            style={{ fontSize: "0.97rem", color: T.textMd, lineHeight: "1.75", maxWidth: 480, marginBottom: "2.5rem" }}>
            From routine check-ups to full smile transformations, every treatment is delivered with the precision, artistry and personal attention you deserve.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href={`${BASE}/book`} style={{ padding: "0.875rem 2rem", background: T.sage, color: "#fff", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", transition: "background 220ms" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.sageDk}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.sage}>
              Book a consultation
            </Link>
            <Link href={`${BASE}/services`} style={{ padding: "0.875rem 2rem", background: "transparent", color: T.sage, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", border: `1.5px solid ${T.sage}`, textDecoration: "none", transition: "all 220ms" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T.sage; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = T.sage; }}>
              Our services
            </Link>
          </motion.div>
        </div>
        <div style={{ position: "relative", overflow: "hidden", minHeight: 400 }}>
          <motion.img src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1400&q=80" alt="Dentist with patient"
            initial={{ scale: 1.08, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, ease: EASE }}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(92,122,98,0.12) 0%, transparent 55%)" }} />
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 80, background: `linear-gradient(to right, ${T.bg}, transparent)` }} />
        </div>
        <style>{`@media(max-width:768px){ section:first-of-type{grid-template-columns:1fr!important} }`}</style>
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
          {[{ to: 4800, suffix: "+", label: "Patients treated" }, { to: 14, suffix: " yrs", label: "In private practice" }, { to: 4.9, suffix: "", label: "Google rating", decimal: true }, { to: 98, suffix: "%", label: "Patient satisfaction" }].map(s => (
            <div key={s.label} style={{ background: T.bg, padding: "2.5rem 2rem", textAlign: "center" }}>
              <div style={{ fontFamily: SERIF, fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 500, color: T.text, marginBottom: "0.4rem", lineHeight: 1 }}>
                <CountUp to={s.to} suffix={s.suffix} decimal={s.decimal} />{s.suffix}
              </div>
              <div style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: T.textLt }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TREATMENTS ───────────────────────────────────────────────────── */}
      <section id="section-treatments" style={{ padding: "0 2rem 6rem", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.sage, marginBottom: "0.75rem" }}>What we offer</p>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, color: T.text, marginBottom: "1rem" }}>Treatments for every smile</h2>
          <p style={{ fontSize: "0.88rem", color: T.textLt, maxWidth: 480, margin: "0 auto", lineHeight: "1.75" }}>From your first hygiene visit to a complete smile makeover, our full range of treatments is designed to care for you at every stage of life.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: "2.5rem" }}>
          {[
            { name: "General Dentistry",  desc: "Comprehensive check-ups, hygiene cleans and preventive care to keep your smile in perfect health.", price: "From £65",    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80" },
            { name: "Cosmetic Dentistry", desc: "Veneers, composite bonding and smile design to give you the radiant, balanced smile you've always wanted.", price: "From £295",  img: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80" },
            { name: "Orthodontics",       desc: "Invisalign and ceramic braces to straighten teeth discreetly for teens and adults alike.", price: "From £1,800", img: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80" },
            { name: "Dental Implants",    desc: "Titanium implants that look, feel and function exactly like natural teeth — designed to last a lifetime.", price: "From £2,200", img: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80" },
            { name: "Teeth Whitening",    desc: "Professional in-chair and take-home whitening systems that deliver dramatically brighter results.", price: "From £350",   img: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80" },
            { name: "Emergency Dental",   desc: "Same-day emergency appointments for toothache, broken teeth and dental trauma — 7 days a week.", price: "From £95",    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80" },
          ].map((t, i) => <TreatmentCard key={t.name} {...t} i={i} />)}
        </div>
      </section>

      {/* ── BEFORE / AFTER ───────────────────────────────────────────────── */}
      <section style={{ background: T.surface, padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.sage, marginBottom: "0.75rem" }}>Smile transformations</p>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, color: T.text, marginBottom: "1rem" }}>The Ivory Dental difference</h2>
            <p style={{ fontSize: "0.87rem", color: T.textLt, maxWidth: 440, margin: "0 auto", lineHeight: "1.75" }}>Drag the slider to reveal the transformation. Real patients, real results — no filters.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "2rem" }}>
            {[
              { label: "Porcelain Veneers", before: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80", after: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80" },
              { label: "Composite Bonding", before: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80", after: "https://images.unsplash.com/photo-1591134279046-e6c4ab5d3c14?w=800&q=80" },
              { label: "Teeth Whitening",   before: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80", after: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80" },
            ].map(item => <Slider key={item.label} {...item} />)}
          </div>
        </div>
      </section>

      {/* ── WHY US — SPLIT ───────────────────────────────────────────────── */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ position: "relative", overflow: "hidden", minHeight: 480 }}>
          <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80" alt="Modern dental practice" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, transparent 60%, ${T.bg})` }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "4rem clamp(2rem,4vw,4rem)", background: T.bg }}>
          <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.sage, marginBottom: "1rem" }}>Why Ivory Dental</p>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 500, color: T.text, lineHeight: 1.2, marginBottom: "1.75rem" }}>
            A practice that puts you<br /><em style={{ color: T.sage }}>at the centre</em> of everything.
          </h2>
          {[
            { title: "Anxiety-free environment", desc: "Sedation options, TV glasses, a calm team and no judgment — ever." },
            { title: "Digital-first precision",  desc: "CBCT 3D scanning, CAD/CAM crowns and digital smile design as standard." },
            { title: "Transparent pricing",      desc: "Full treatment plans with costs agreed in advance. No hidden fees." },
            { title: "Central London location",  desc: "42 Harley Street, moments from Oxford Circus and Bond Street." },
          ].map(f => (
            <div key={f.title} style={{ display: "flex", gap: "1rem", marginBottom: "1.2rem" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.sage, flexShrink: 0, marginTop: 8 }} />
              <div>
                <p style={{ fontSize: "0.88rem", fontWeight: 600, color: T.text, marginBottom: "0.2rem" }}>{f.title}</p>
                <p style={{ fontSize: "0.82rem", color: T.textLt, lineHeight: "1.6" }}>{f.desc}</p>
              </div>
            </div>
          ))}
          <Link href={`${BASE}/about`} style={{ marginTop: "1rem", alignSelf: "flex-start", padding: "0.875rem 2rem", background: "transparent", color: T.sage, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", border: `1.5px solid ${T.sage}`, textDecoration: "none", transition: "all 220ms" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T.sage; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = T.sage; }}>
            Meet the team →
          </Link>
        </div>
        <style>{`@media(max-width:768px){ section:nth-of-type(4){grid-template-columns:1fr!important} }`}</style>
      </section>

      {/* ── GALLERY ──────────────────────────────────────────────────────── */}
      <section id="section-gallery" style={{ padding: "6rem 2rem", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.sage, marginBottom: "0.75rem" }}>Smile gallery</p>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, color: T.text }}>Real patients, real results</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gridAutoRows: "200px", gap: 10 }}>
          {[
            { id: 1, span: "col-span-1 row-span-2", img: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80",  label: "Porcelain Veneers",  cat: "Veneers" },
            { id: 2, span: "col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80",  label: "Boutique Whitening", cat: "Whitening" },
            { id: 3, span: "col-span-2 row-span-1", img: "https://images.unsplash.com/photo-1591134279046-e6c4ab5d3c14?w=1200&q=80", label: "Composite Bonding",  cat: "Bonding" },
            { id: 4, span: "col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",   label: "Invisalign Result",  cat: "Ortho" },
            { id: 5, span: "col-span-1 row-span-2", img: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80",  label: "Dental Implant",    cat: "Implants" },
            { id: 6, span: "col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",  label: "Veneers x4",        cat: "Veneers" },
          ].map(item => (
            <div key={item.id} className={item.span} style={{ position: "relative", overflow: "hidden" }}>
              <img src={item.img} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 500ms cubic-bezier(0.23,1,0.32,1)" }} loading="lazy"
                onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)")}
                onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
              />
              <div style={{ position: "absolute", bottom: 10, left: 10 }}>
                <p style={{ color: "#fff", fontSize: "0.75rem", fontWeight: 600, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{item.label}</p>
              </div>
            </div>
          ))}
        </div>
        <style>{`.col-span-1{grid-column:span 1}.col-span-2{grid-column:span 2}.row-span-1{grid-row:span 1}.row-span-2{grid-row:span 2}@media(max-width:640px){.col-span-2{grid-column:span 1}.row-span-2{grid-row:span 1}}`}</style>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section style={{ padding: "6rem 2rem", background: T.surface }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.sage, marginBottom: "0.75rem" }}>Patient stories</p>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, color: T.text }}>Changing smiles, changing lives</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: "1.5rem" }}>
            {[
              { name: "Charlotte W.", treatment: "Porcelain Veneers",    quote: "I'd been self-conscious about my smile for 20 years. Dr Mitchell completely transformed it — the veneers look so natural that nobody believes they aren't my real teeth. The whole experience was calm, explained at every stage, and genuinely painless." },
              { name: "Marcus T.",    treatment: "Dental Implants",      quote: "I was terrified of the implant process but James made the whole thing straightforward. Three months later I have a tooth I literally can't tell apart from the rest. Best money I've ever spent on myself." },
              { name: "Aisha K.",     treatment: "Invisalign",           quote: "14 months of Invisalign with Dr Sharma and my teeth are perfect. The digital preview at the start was brilliant — seeing where I'd end up kept me motivated throughout. The practice is beautiful and the team are exceptional." },
              { name: "Robert H.",    treatment: "Teeth Whitening",      quote: "I was sceptical whitening would make much difference at my age. I was very wrong. 8 shades lighter in 90 minutes — my colleagues all asked if I'd been on holiday. Couldn't be happier." },
              { name: "Sophie L.",    treatment: "Composite Bonding",    quote: "The bonding on my chipped front teeth took less than two hours and is completely invisible. Dr Mitchell is an artist. I keep catching myself smiling in the mirror, which I never did before." },
              { name: "David M.",     treatment: "Emergency Appointment", quote: "I called at 7:30am on a Sunday with excruciating toothache. I was seen by 9am, had the tooth treated and was pain-free by lunchtime. Remarkable service and incredibly reassuring in what felt like a crisis." },
            ].map((t, i) => <Testimonial key={t.name} {...t} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section id="section-contact" style={{ position: "relative", overflow: "hidden", padding: "7rem 2rem", textAlign: "center" }}>
        <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&q=80" alt="" aria-hidden
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.22) saturate(0.5)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4E2D6", marginBottom: "1rem" }}>Ready to begin?</p>
          <motion.h2 whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
            style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4.5vw,3.5rem)", fontWeight: 500, color: "#fff", maxWidth: 700, margin: "0 auto 1.5rem", lineHeight: 1.15 }}>
            Your perfect smile is closer than you think.
          </motion.h2>
          <p style={{ fontSize: "0.93rem", color: "rgba(255,255,255,0.7)", maxWidth: 440, margin: "0 auto 2.5rem", lineHeight: "1.75" }}>
            Book a consultation today and let us show you exactly what's possible. Complimentary smile assessment included.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href={`${BASE}/book`} style={{ padding: "0.875rem 2rem", background: T.sage, color: "#fff", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", transition: "background 220ms" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.sageDk} onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.sage}>
              Book your consultation
            </Link>
            <Link href={`${BASE}/contact`} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#fff", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", border: "1.5px solid rgba(255,255,255,0.4)", padding: "0.875rem 2rem", textDecoration: "none" }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
