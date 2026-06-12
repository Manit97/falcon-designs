"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { use } from "react";
import { PRACTICES, TESTIMONIALS, BASE, T, SERIF, SANS, EASE } from "../../lib/data";
import { notFound } from "next/navigation";

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
      <div style={{ width: 32, height: 1, background: T.gold }} />
      <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.26em", textTransform: "uppercase", color: T.gold }}>{text}</span>
    </div>
  );
}

export default function SubCategoryPage({ params }: { params: Promise<{ practice: string; sub: string }> }) {
  const { practice: practiceSlug, sub: subSlug } = use(params);
  const practice = PRACTICES.find(p => p.slug === practiceSlug);
  const sub = practice?.subs.find(s => s.slug === subSlug);
  if (!practice || !sub) return notFound();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);

  const relatedSubs = practice.subs.filter(s => s.slug !== sub.slug);

  return (
    <main style={{ background: T.navy, fontFamily: SANS, color: T.text }}>

      {/* ── HERO ── */}
      <div ref={heroRef} style={{ position: "relative", height: "60vh", minHeight: 440, overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <motion.div style={{ position: "absolute", inset: "-20%", y: heroY }}>
          <img src={sub.img} alt={sub.title} style={{ width: "100%", height: "140%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,14,26,1) 25%, rgba(10,14,26,0.45) 100%)" }} />
        </motion.div>
        <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "40%", background: `linear-gradient(${T.gold}, transparent)` }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", padding: "0 2.5rem 4rem", width: "100%" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", gap: "0.4rem", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
            <Link href={BASE} style={{ fontSize: "0.7rem", color: T.textLt, textDecoration: "none" }}>Home</Link>
            <span style={{ color: T.textLt, fontSize: "0.7rem" }}>›</span>
            <Link href={`${BASE}/${practice.slug}`} style={{ fontSize: "0.7rem", color: T.textLt, textDecoration: "none" }}>{practice.title}</Link>
            <span style={{ color: T.textLt, fontSize: "0.7rem" }}>›</span>
            <span style={{ fontSize: "0.7rem", color: T.gold }}>{sub.title}</span>
          </div>
          <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: T.gold, marginBottom: "0.5rem" }}>{practice.title}</div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontFamily: SERIF, fontSize: "clamp(2.2rem,5.5vw,4.5rem)", fontWeight: 500, color: T.cream, lineHeight: 1.1, marginBottom: "0.75rem" }}>
            {sub.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontSize: "1rem", color: T.textMd, fontStyle: "italic", fontFamily: SERIF }}>
            {sub.tagline}
          </motion.p>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <section className="sterling-px" style={{ maxWidth: 1320, margin: "0 auto", padding: "6rem 2.5rem" }}>
        <div className="sterling-sub-content-grid" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "5rem", alignItems: "start" }}>

          {/* Left — content */}
          <div>
            <SectionLabel text="Overview" />
            <p style={{ fontSize: "1rem", color: T.textMd, lineHeight: 1.95, marginBottom: "3rem", maxWidth: 620 }}>{sub.intro}</p>

            {/* How we can help */}
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 500, color: T.cream, marginBottom: "2rem" }}>How We Can Help</h2>
            <div className="sterling-points-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "3.5rem" }}>
              {sub.points.map((point, i) => (
                <motion.div key={point} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                  style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start", padding: "1.25rem", border: `1px solid ${T.border}`, background: T.navyLt }}>
                  <div style={{ width: 20, height: 20, flexShrink: 0, marginTop: "1px" }}>
                    <svg viewBox="0 0 20 20" fill="none" style={{ width: "100%", height: "100%" }}>
                      <circle cx="10" cy="10" r="9" stroke={T.gold} strokeWidth="1.5" />
                      <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke={T.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span style={{ fontSize: "0.85rem", color: T.cream, lineHeight: 1.5 }}>{point}</span>
                </motion.div>
              ))}
            </div>

            {/* Why Choose Us */}
            <div style={{ borderLeft: `3px solid ${T.gold}`, padding: "1.75rem 2rem", background: T.navyLt, marginBottom: "3rem" }}>
              <h3 style={{ fontFamily: SERIF, fontSize: "1.3rem", fontWeight: 600, color: T.cream, marginBottom: "0.75rem" }}>Why Choose Sterling &amp; Co?</h3>
              <p style={{ fontSize: "0.88rem", color: T.textMd, lineHeight: 1.85 }}>
                Our {sub.title.toLowerCase()} specialists bring decades of combined experience to every matter. We are recognised in the Legal 500 for our expertise, and we pride ourselves on providing clear, honest advice without unnecessary complexity. From your first call to final resolution, we are with you every step of the way.
              </p>
            </div>

            {/* Related testimonial */}
            <div style={{ border: `1px solid ${T.border}`, padding: "2rem", background: T.navyLt, position: "relative" }}>
              <div style={{ fontFamily: SERIF, fontSize: "4rem", lineHeight: 1, color: T.gold, opacity: 0.2, position: "absolute", top: "0.5rem", left: "1.5rem" }}>"</div>
              <p style={{ fontFamily: SERIF, fontSize: "1rem", color: T.cream, lineHeight: 1.8, fontStyle: "italic", marginBottom: "1.25rem", paddingTop: "0.75rem" }}>
                {TESTIMONIALS[0].quote}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 28, height: 1, background: T.gold }} />
                <div style={{ fontSize: "0.75rem", color: T.textMd }}>{TESTIMONIALS[0].author} — <span style={{ color: T.gold }}>{TESTIMONIALS[0].context}</span></div>
              </div>
            </div>
          </div>

          {/* Right — sticky sidebar */}
          <div className="sterling-sub-sidebar" style={{ position: "sticky", top: "5.5rem" }}>
            {/* Contact card */}
            <div style={{ border: `1px solid ${T.border}`, padding: "2rem", background: T.navyMd, marginBottom: "1.5rem" }}>
              <h3 style={{ fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 600, color: T.cream, marginBottom: "0.5rem" }}>Free Consultation</h3>
              <p style={{ fontSize: "0.8rem", color: T.textMd, lineHeight: 1.7, marginBottom: "1.5rem" }}>Speak with a specialist today. No obligation — everything discussed is strictly confidential.</p>
              <Link href={`${BASE}/about#contact`} style={{ display: "block", textAlign: "center", padding: "0.9rem", background: T.gold, color: T.navy, textDecoration: "none", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "0.75rem", transition: `background 200ms` }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.goldLt}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.gold}
              >Book a Free Consultation</Link>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.09 6.09l.93-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke={T.gold} strokeWidth="1.5" /></svg>
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: T.cream }}>+44 (0)20 7123 4567</span>
              </div>
            </div>

            {/* Practice area nav */}
            <div style={{ border: `1px solid ${T.border}`, padding: "1.5rem", background: T.navyMd }}>
              <h4 style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.gold, marginBottom: "1rem" }}>Also in {practice.title}</h4>
              {relatedSubs.map(rs => (
                <Link key={rs.slug} href={`${BASE}/${practice.slug}/${rs.slug}`}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.65rem 0", borderBottom: `1px solid ${T.borderLt}`, textDecoration: "none", color: T.textMd, fontSize: "0.8rem", transition: "color 150ms" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.gold}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.textMd}
                >
                  {rs.title}
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 4h10M7 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                </Link>
              ))}
              <Link href={`${BASE}/${practice.slug}`} style={{ display: "block", marginTop: "1rem", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: T.gold, textDecoration: "none" }}>
                ← All {practice.title}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
