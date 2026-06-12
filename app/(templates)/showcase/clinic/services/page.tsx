"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { SERVICES, BASE, T, SERIF, SANS, EASE } from "../lib/data";

function Label({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.25rem" }}>
      <div style={{ width: 28, height: 1, background: T.gold }} />
      <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: T.gold }}>{text}</span>
    </div>
  );
}

function ServiceRow({ s, index }: { s: typeof SERVICES[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const [hov, setHov] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 0,
        borderBottom: `1px solid ${T.border}`,
        direction: isEven ? "ltr" : "rtl",
      }}
    >
      {/* Image */}
      <div
        style={{ overflow: "hidden", aspectRatio: "4/3", direction: "ltr" }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        <img
          src={s.img}
          alt={s.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transform: hov ? "scale(1.04)" : "scale(1)",
            transition: `transform 700ms ${EASE}`,
          }}
        />
      </div>

      {/* Content */}
      <div style={{
        direction: "ltr",
        padding: "4rem 3.5rem",
        background: isEven ? T.bg : T.bgMd,
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: T.gold, marginBottom: "0.6rem" }}>
          {s.price}
        </div>
        <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 500, color: T.text, lineHeight: 1.18, marginBottom: "1rem" }}>
          {s.title}
        </h2>
        <p style={{ fontSize: "0.88rem", color: T.textMd, lineHeight: 1.85, marginBottom: "1.5rem", maxWidth: 400 }}>{s.tagline}</p>

        {/* Quick specs */}
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          {[
            { label: "Duration", val: s.duration },
            { label: "Recovery", val: s.recovery },
          ].map(spec => (
            <div key={spec.label}>
              <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.textLt }}>{spec.label}</div>
              <div style={{ fontSize: "0.82rem", fontWeight: 500, color: T.text, marginTop: "0.2rem" }}>{spec.val}</div>
            </div>
          ))}
        </div>

        {/* Treatments */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "2rem" }}>
          {s.treatments.map(t => (
            <span key={t} style={{ fontSize: "0.64rem", padding: "0.25rem 0.7rem", border: `1px solid ${T.border}`, color: T.textMd, fontWeight: 500 }}>{t}</span>
          ))}
        </div>

        <Link
          href={`${BASE}/services/${s.slug}`}
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.6rem",
            fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.16em",
            textTransform: "uppercase", color: T.gold, textDecoration: "none",
            transition: `gap 200ms ${EASE}`,
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.gap = "1rem"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.gap = "0.6rem"}
        >
          Explore Treatment
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
        </Link>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <main style={{ background: T.bg, fontFamily: SANS, color: T.text }}>

      {/* ── HERO ── */}
      <div style={{ position: "relative", height: "55vh", minHeight: 420, overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <motion.div style={{ position: "absolute", inset: "-20%", y: heroY }}>
          <img
            src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1600&q=85"
            alt="Services"
            style={{ width: "100%", height: "140%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,13,10,0.95) 20%, rgba(15,13,10,0.45) 100%)" }} />
        </motion.div>
        <div style={{ position: "absolute", top: 0, left: 0, width: 1, height: "45%", background: `linear-gradient(${T.gold}, transparent)` }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem 4rem", width: "100%" }}>
          <Label text="Lumière Treatments" />
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontFamily: SERIF, fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: 500, color: T.textInv, lineHeight: 1.08, maxWidth: 640 }}
          >
            Every treatment,<br /><em style={{ color: T.gold }}>bespoke to you.</em>
          </motion.h1>
        </div>
      </div>

      {/* ── INTRO ROW ── */}
      <div style={{ borderBottom: `1px solid ${T.border}`, padding: "2.5rem 2.5rem", background: T.bgMd }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
          <p style={{ fontSize: "0.88rem", color: T.textMd, maxWidth: 520, lineHeight: 1.75 }}>
            From a single facial to a comprehensive treatment programme — all Lumière protocols begin with a complimentary skin consultation to ensure the right treatment, every time.
          </p>
          <Link href={`${BASE}/book`} style={{
            padding: "0.8rem 2rem", background: T.gold, color: T.bgDk,
            fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.18em",
            textTransform: "uppercase", textDecoration: "none",
            transition: `background 200ms ${EASE}`,
            flexShrink: 0,
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.goldLt}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.gold}
          >Book a Free Consultation</Link>
        </div>
      </div>

      {/* ── SERVICE ROWS ── */}
      <div>
        {SERVICES.map((s, i) => <ServiceRow key={s.slug} s={s} index={i} />)}
      </div>

      {/* ── CTA ── */}
      <section style={{ background: T.bgDk, padding: "6rem 2.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <Label text="Get Started" />
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 500, color: T.textInv, marginBottom: "1rem", lineHeight: 1.2 }}>
            Not sure where to begin?
          </h2>
          <p style={{ fontSize: "0.88rem", color: T.textLt, lineHeight: 1.8, marginBottom: "2rem" }}>
            Our complimentary skin consultation uses advanced multi-spectral imaging to identify exactly what your skin needs — and prescribes the right treatment pathway.
          </p>
          <Link href={`${BASE}/skin-consultations`} style={{
            display: "inline-block", padding: "0.9rem 2.5rem",
            border: `1px solid ${T.gold}`, color: T.gold,
            fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em",
            textTransform: "uppercase", textDecoration: "none",
            transition: `background 200ms ${EASE}, color 200ms ${EASE}`,
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T.gold; (e.currentTarget as HTMLElement).style.color = T.bgDk; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = T.gold; }}
          >Start with a Consultation</Link>
        </div>
      </section>

    </main>
  );
}
