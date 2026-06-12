"use client";

import { use, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { notFound } from "next/navigation";
import { SERVICES, BASE, T, SERIF, SANS, EASE } from "../../lib/data";

function Label({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.25rem" }}>
      <div style={{ width: 28, height: 1, background: T.gold }} />
      <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: T.gold }}>{text}</span>
    </div>
  );
}

function StepCard({ step, i }: { step: { num: string; title: string; body: string }; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
      style={{ padding: "2rem", background: T.bgMd, border: `1px solid ${T.border}` }}
    >
      <div style={{ fontFamily: SERIF, fontSize: "2.5rem", fontWeight: 600, color: T.gold, opacity: 0.28, lineHeight: 1, marginBottom: "0.75rem" }}>{step.num}</div>
      <h3 style={{ fontFamily: SERIF, fontSize: "1.1rem", fontWeight: 600, color: T.text, marginBottom: "0.6rem" }}>{step.title}</h3>
      <p style={{ fontSize: "0.82rem", color: T.textMd, lineHeight: 1.8 }}>{step.body}</p>
    </motion.div>
  );
}

export default function ServiceDetailPage({ params }: { params: Promise<{ service: string }> }) {
  const { service: slug } = use(params);
  const service = SERVICES.find(s => s.slug === slug);
  if (!service) return notFound();

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);

  const related = SERVICES.filter(s => s.slug !== slug).slice(0, 3);

  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, margin: "-60px 0px" });
  const pointsRef = useRef<HTMLDivElement>(null);
  const pointsInView = useInView(pointsRef, { once: true, margin: "-40px 0px" });
  const relRef = useRef<HTMLDivElement>(null);
  const relInView = useInView(relRef, { once: true, margin: "-40px 0px" });

  return (
    <main style={{ background: T.bg, fontFamily: SANS, color: T.text }}>

      {/* ── HERO ── */}
      <div style={{ position: "relative", height: "65vh", minHeight: 500, overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <motion.div style={{ position: "absolute", inset: "-20%", y: heroY }}>
          <img src={service.heroImg} alt={service.title} style={{ width: "100%", height: "140%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,13,10,0.96) 15%, rgba(15,13,10,0.4) 100%)" }} />
        </motion.div>
        <div style={{ position: "absolute", top: 0, left: 0, width: 1, height: "40%", background: `linear-gradient(${T.gold}, transparent)` }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem 4.5rem", width: "100%" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", gap: "0.4rem", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
            <Link href={BASE} style={{ fontSize: "0.7rem", color: T.textLt, textDecoration: "none" }}>Home</Link>
            <span style={{ color: T.textLt, fontSize: "0.7rem" }}>›</span>
            <Link href={`${BASE}/services`} style={{ fontSize: "0.7rem", color: T.textLt, textDecoration: "none" }}>Services</Link>
            <span style={{ color: T.textLt, fontSize: "0.7rem" }}>›</span>
            <span style={{ fontSize: "0.7rem", color: T.gold }}>{service.title}</span>
          </div>

          <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: T.gold, marginBottom: "0.5rem" }}>
            {service.price}
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontFamily: SERIF, fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: 500, color: T.textInv, lineHeight: 1.08, maxWidth: 640, marginBottom: "0.75rem" }}
          >
            {service.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "1.05rem", color: "rgba(250,248,245,0.7)", maxWidth: 520 }}
          >
            {service.tagline}
          </motion.p>
        </div>
      </div>

      {/* ── QUICK INFO STRIP ── */}
      <div style={{ background: T.bgDk, borderBottom: `1px solid rgba(184,149,106,0.14)` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem", display: "flex", flexWrap: "wrap" }}>
          {[
            { label: "Duration",  val: service.duration },
            { label: "Recovery",  val: service.recovery },
            { label: "Results",   val: service.results },
            { label: "Starting from", val: service.price },
          ].map((item, i) => (
            <div key={item.label} style={{
              padding: "1.5rem 2.5rem 1.5rem 0", marginRight: "2.5rem",
              borderRight: i < 3 ? `1px solid rgba(184,149,106,0.12)` : "none",
              paddingRight: "2.5rem",
            }}>
              <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.textLt, marginBottom: "0.2rem" }}>{item.label}</div>
              <div style={{ fontSize: "0.85rem", fontWeight: 500, color: T.textInv }}>{item.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "5.5rem 2.5rem" }}>
        <div className="lm-sub-grid" style={{ gap: "5rem", alignItems: "start" }}>

          {/* Left — content */}
          <div ref={contentRef}>
            <Label text="Overview" />
            <p style={{ fontSize: "1rem", color: T.textMd, lineHeight: 1.95, marginBottom: "3.5rem", maxWidth: 640 }}>
              {service.intro}
            </p>

            {/* Treatments included */}
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 500, color: T.text, marginBottom: "1.25rem" }}>
              Treatments Included
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "3.5rem" }}>
              {service.treatments.map(t => (
                <div key={t} style={{ padding: "0.55rem 1.1rem", border: `1px solid ${T.border}`, background: T.bgMd, fontSize: "0.78rem", fontWeight: 500, color: T.text }}>
                  {t}
                </div>
              ))}
            </div>

            {/* Steps */}
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 500, color: T.text, marginBottom: "1.5rem" }}>
              What to Expect
            </h2>
            <div className="lm-steps-grid" style={{ gap: "1rem", marginBottom: "3.5rem" }}>
              {service.steps.map((step, i) => <StepCard key={step.num} step={step} i={i} />)}
            </div>

            {/* Benefits */}
            <div ref={pointsRef}>
              <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 500, color: T.text, marginBottom: "1.5rem" }}>
                Treatment Benefits
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {service.points.map((point, i) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: -16 }}
                    animate={pointsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] }}
                    style={{ display: "flex", gap: "0.9rem", alignItems: "flex-start", padding: "1rem 1.25rem", background: T.bgMd, border: `1px solid ${T.borderLt}` }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: "1px" }}>
                      <circle cx="9" cy="9" r="8" stroke={T.gold} strokeWidth="1.4" />
                      <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke={T.gold} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: "0.85rem", color: T.text, lineHeight: 1.55 }}>{point}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Gold blockquote */}
            <div style={{ borderLeft: `3px solid ${T.gold}`, paddingLeft: "1.5rem", margin: "3.5rem 0", background: T.bgMd, padding: "1.75rem 1.75rem 1.75rem 2rem" }}>
              <h3 style={{ fontFamily: SERIF, fontSize: "1.15rem", fontWeight: 600, color: T.text, marginBottom: "0.6rem" }}>
                Why Lumière?
              </h3>
              <p style={{ fontSize: "0.85rem", color: T.textMd, lineHeight: 1.85 }}>
                Our {service.title.toLowerCase()} specialists are among the most experienced in the UK. Every treatment is preceded by a clinical assessment, carried out in our state-of-the-art Harley Street facility, and supported by comprehensive aftercare. We measure success not by what we do, but by what clients see when they look in the mirror.
              </p>
            </div>
          </div>

          {/* Right — sticky sidebar */}
          <div className="lm-sub-sidebar" style={{ position: "sticky", top: "5.5rem" }}>

            {/* Book card */}
            <div style={{ border: `1px solid ${T.border}`, padding: "2rem", background: T.bgMd, marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: T.gold, marginBottom: "0.4rem" }}>
                {service.price}
              </div>
              <h3 style={{ fontFamily: SERIF, fontSize: "1.2rem", fontWeight: 600, color: T.text, marginBottom: "0.5rem" }}>
                Book {service.title}
              </h3>
              <p style={{ fontSize: "0.78rem", color: T.textMd, lineHeight: 1.7, marginBottom: "1.5rem" }}>
                All treatments begin with a complimentary consultation. No obligation, complete confidence.
              </p>
              <Link
                href={`${BASE}/book?service=${service.slug}`}
                style={{
                  display: "block", textAlign: "center", padding: "0.9rem",
                  background: T.gold, color: T.bgDk,
                  fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.16em",
                  textTransform: "uppercase", textDecoration: "none", marginBottom: "0.75rem",
                  transition: `background 200ms ${EASE}, transform 120ms ${EASE}`,
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.goldLt}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.gold}
                onMouseDown={e => (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"}
                onMouseUp={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
              >Book a Consultation</Link>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.09 6.09l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span style={{ fontSize: "0.8rem", fontWeight: 500, color: T.text }}>+44 (0)20 7946 0320</span>
              </div>
            </div>

            {/* Quick info */}
            <div style={{ border: `1px solid ${T.border}`, padding: "1.5rem", background: T.bgMd, marginBottom: "1.25rem" }}>
              <h4 style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.gold, marginBottom: "1rem" }}>
                At a Glance
              </h4>
              {[
                { label: "Duration",  val: service.duration },
                { label: "Recovery",  val: service.recovery },
                { label: "Results",   val: service.results },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: `1px solid ${T.borderLt}` }}>
                  <span style={{ fontSize: "0.75rem", color: T.textMd }}>{item.label}</span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 500, color: T.text }}>{item.val}</span>
                </div>
              ))}
            </div>

            {/* Other treatments nav */}
            <div style={{ border: `1px solid ${T.border}`, padding: "1.5rem", background: T.bgMd }}>
              <h4 style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.gold, marginBottom: "1rem" }}>
                Other Treatments
              </h4>
              {SERVICES.filter(s => s.slug !== slug).slice(0, 4).map(s => (
                <Link
                  key={s.slug}
                  href={`${BASE}/services/${s.slug}`}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "0.6rem 0", borderBottom: `1px solid ${T.borderLt}`,
                    textDecoration: "none", color: T.textMd, fontSize: "0.78rem",
                    transition: "color 150ms",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.gold}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.textMd}
                >
                  {s.title}
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4h8M5 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED TREATMENTS ── */}
      <section ref={relRef} style={{ background: T.bgMd, borderTop: `1px solid ${T.border}`, padding: "5rem 2.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Label text="You May Also Like" />
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 500, color: T.text, marginBottom: "2.5rem" }}>
            Related treatments
          </h2>
          <div className="lm-svc-grid" style={{ gap: "1.25rem" }}>
            {related.map((s, i) => {
              const [hov, setHov] = React.useState(false);
              return (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={relInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Link href={`${BASE}/services/${s.slug}`} style={{ textDecoration: "none", display: "block" }}
                    onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
                    <div style={{ overflow: "hidden", aspectRatio: "16/10", marginBottom: "1rem" }}>
                      <img src={s.img} alt={s.title} style={{
                        width: "100%", height: "100%", objectFit: "cover", display: "block",
                        transform: hov ? "scale(1.04)" : "scale(1)",
                        transition: `transform 600ms ${EASE}`,
                      }} />
                    </div>
                    <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.gold, marginBottom: "0.3rem" }}>{s.price}</div>
                    <h3 style={{ fontFamily: SERIF, fontSize: "1.1rem", fontWeight: 600, color: hov ? T.gold : T.text, transition: "color 200ms", lineHeight: 1.3 }}>{s.title}</h3>
                    <p style={{ fontSize: "0.76rem", color: T.textMd, lineHeight: 1.65, marginTop: "0.4rem" }}>{s.tagline}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}

// Fix: React needs to be in scope for useState in the inline component above
import React from "react";
