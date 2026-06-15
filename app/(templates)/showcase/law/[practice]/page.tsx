"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { use } from "react";
import { PRACTICES, BASE, T, SERIF, SANS, EASE } from "../lib/data";
import { notFound } from "next/navigation";

function SubCard({ s, practiceSlug, i }: { s: { slug: string; title: string; tagline: string; img: string }; practiceSlug: string; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  const [hov, setHov] = useState(false);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}>
      <Link href={`${BASE}/${practiceSlug}/${s.slug}`} style={{ textDecoration: "none", display: "block" }}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img src={s.img} alt={s.title} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", transform: hov ? "scale(1.05)" : "scale(1)", transition: `transform 600ms ${EASE}`, display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,14,26,0.9) 40%, transparent 100%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.25rem 1.25rem 1rem" }}>
            <h3 style={{ fontFamily: SERIF, fontSize: "1.1rem", fontWeight: 600, color: hov ? T.gold : T.cream, lineHeight: 1.3, transition: "color 220ms", marginBottom: "0.4rem" }}>{s.title}</h3>
            <p style={{ fontSize: "0.75rem", color: T.textMd, lineHeight: 1.5 }}>{s.tagline}</p>
          </div>
          <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: T.gold, transform: hov ? "scaleY(1)" : "scaleY(0)", transformOrigin: "top", transition: `transform 350ms ${EASE}` }} />
        </div>
      </Link>
    </motion.div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
      <div style={{ width: 32, height: 1, background: T.gold }} />
      <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.26em", textTransform: "uppercase", color: T.gold }}>{text}</span>
    </div>
  );
}

export default function PracticeAreaPage({ params }: { params: Promise<{ practice: string }> }) {
  const { practice: practiceSlug } = use(params);
  const practice = PRACTICES.find(p => p.slug === practiceSlug);
  if (!practice) return notFound();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <main style={{ background: T.navy, fontFamily: SANS, color: T.text }}>

      {/* ── HERO ── */}
      <div ref={heroRef} style={{ position: "relative", height: "65vh", minHeight: 480, overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <motion.div style={{ position: "absolute", inset: "-20%", y: heroY }}>
          <img src={practice.heroImg} alt={practice.title} style={{ width: "100%", height: "140%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,14,26,1) 20%, rgba(10,14,26,0.5) 100%)" }} />
        </motion.div>
        <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "40%", background: `linear-gradient(${T.gold}, transparent)` }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", padding: "0 2.5rem 4rem", width: "100%" }}>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "1rem" }}>
            <Link href={BASE} style={{ fontSize: "0.7rem", color: T.textLt, textDecoration: "none" }}>Home</Link>
            <span style={{ color: T.textLt, fontSize: "0.7rem" }}>›</span>
            <span style={{ fontSize: "0.7rem", color: T.gold }}>Practice Areas</span>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontFamily: SERIF, fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: 500, color: T.cream, lineHeight: 1.1, marginBottom: "1rem" }}>
            {practice.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontSize: "1rem", color: T.textMd, maxWidth: 560, lineHeight: 1.75, fontStyle: "italic", fontFamily: SERIF }}>
            {practice.tagline}
          </motion.p>
        </div>
      </div>

      {/* ── INTRO + SUB-GRID ── */}
      <section className="sterling-px" style={{ maxWidth: 1320, margin: "0 auto", padding: "6rem 2.5rem" }}>
        <div className="sterling-practice-intro-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "5rem", marginBottom: "5rem" }}>
          <div>
            <SectionLabel text="Overview" />
            <p style={{ fontSize: "0.9rem", color: T.textMd, lineHeight: 1.9 }}>{practice.intro}</p>
            <Link href={`${BASE}/about#contact`} style={{
              display: "inline-flex", alignItems: "center", gap: "0.75rem", marginTop: "2rem",
              padding: "0.9rem 2rem", background: T.gold, color: T.navy,
              textDecoration: "none", fontSize: "0.68rem", fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase", transition: `background 200ms ${EASE}`,
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.goldLt}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.gold}
            >Speak to a Specialist</Link>
          </div>
          <div>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 500, color: T.cream, marginBottom: "2rem" }}>
              Areas of Expertise
            </h2>
            <div className="sterling-practice-subs-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              {practice.subs.map((s, i) => (
                <SubCard key={s.slug} s={s} practiceSlug={practice.slug} i={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: T.navyMd, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: "4rem 2.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 500, color: T.cream, marginBottom: "1rem" }}>
            Speak with a {practice.title} specialist today.
          </h2>
          <p style={{ fontSize: "0.88rem", color: T.textMd, lineHeight: 1.8, marginBottom: "2rem" }}>
            Free 30-minute consultation, no obligation. Everything discussed remains strictly confidential.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href={`${BASE}/about#contact`} style={{ padding: "0.9rem 2.25rem", background: T.gold, color: T.navy, textDecoration: "none", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>Book Consultation</Link>
            <Link href={BASE} style={{ padding: "0.9rem 2.25rem", border: `1px solid ${T.border}`, color: T.textMd, textDecoration: "none", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" }}>All Practice Areas</Link>
          </div>
        </div>
      </section>

    </main>
  );
}
