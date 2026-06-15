"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { SERVICES, TESTIMONIALS, STATS, BASE, T, SERIF, SANS, EASE } from "./lib/data";

// ── Hooks ─────────────────────────────────────────────────────────────────────
function useReveal(margin = "-80px 0px") {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: margin as any });
  return { ref, inView };
}

// ── Section label ─────────────────────────────────────────────────────────────
function Label({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.25rem" }}>
      <div style={{ width: 28, height: 1, background: T.gold }} />
      <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: T.gold }}>
        {text}
      </span>
    </div>
  );
}

// ── Service card ──────────────────────────────────────────────────────────────
function ServiceCard({ s, index }: { s: typeof SERVICES[number]; index: number }) {
  const { ref, inView } = useReveal();
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.23, 1, 0.32, 1] }}
    >
      <Link
        href={`${BASE}/services/${s.slug}`}
        style={{ textDecoration: "none", display: "block" }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {/* Image */}
        <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/5" }}>
          <img
            src={s.img}
            alt={s.title}
            style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block",
              transform: hov ? "scale(1.05)" : "scale(1)",
              transition: `transform 700ms ${EASE}`,
            }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: hov
              ? "linear-gradient(to top, rgba(15,13,10,0.88) 50%, rgba(15,13,10,0.2) 100%)"
              : "linear-gradient(to top, rgba(15,13,10,0.72) 35%, rgba(15,13,10,0.05) 100%)",
            transition: `background 450ms ${EASE}`,
          }} />
          {/* Gold left-edge reveal */}
          <div style={{
            position: "absolute", top: 0, left: 0, width: 2, height: "100%",
            background: T.gold,
            transform: hov ? "scaleY(1)" : "scaleY(0)",
            transformOrigin: "bottom",
            transition: `transform 420ms ${EASE}`,
          }} />
          {/* Content */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.75rem 1.5rem 1.5rem" }}>
            <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: T.gold, marginBottom: "0.4rem" }}>
              {s.price}
            </div>
            <h3 style={{ fontFamily: SERIF, fontSize: "1.3rem", fontWeight: 600, color: T.textInv, lineHeight: 1.2, marginBottom: "0.5rem" }}>{s.title}</h3>
            <p style={{
              fontSize: "0.78rem", color: "rgba(250,248,245,0.65)", lineHeight: 1.6, marginBottom: "1rem",
              opacity: hov ? 1 : 0, transform: hov ? "translateY(0)" : "translateY(8px)",
              transition: `opacity 350ms ${EASE}, transform 350ms ${EASE}`,
            }}>{s.tagline}</p>
            <div style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase",
              color: T.gold,
              opacity: hov ? 1 : 0, transform: hov ? "translateX(0)" : "translateX(-10px)",
              transition: `opacity 320ms ${EASE} 40ms, transform 320ms ${EASE} 40ms`,
            }}>
              Explore Treatment
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Testimonial card ──────────────────────────────────────────────────────────
function TestCard({ t, i }: { t: typeof TESTIMONIALS[number]; i: number }) {
  const { ref, inView } = useReveal();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
      style={{ padding: "2.25rem", border: `1px solid rgba(184,149,106,0.14)`, background: "rgba(37,32,23,0.5)" }}
    >
      <div style={{ fontFamily: SERIF, fontSize: "3.5rem", lineHeight: 1, color: T.gold, opacity: 0.22, userSelect: "none", marginBottom: "0.5rem" }}>"</div>
      <p style={{ fontFamily: SERIF, fontSize: "0.98rem", fontStyle: "italic", color: T.textInv, lineHeight: 1.8, marginBottom: "1.75rem" }}>{t.quote}</p>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{ width: 24, height: 1, background: T.gold }} />
        <div>
          <div style={{ fontSize: "0.78rem", fontWeight: 600, color: T.textInv }}>{t.author}</div>
          <div style={{ fontSize: "0.66rem", color: T.gold, letterSpacing: "0.04em" }}>{t.context}</div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ClinicHome() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 140]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const { ref: philRef, inView: philInView } = useReveal("-40px 0px");
  const { ref: aboutRef, inView: aboutInView } = useReveal();
  const { ref: statsRef, inView: statsInView } = useReveal();
  const { ref: teamRef, inView: teamInView } = useReveal();

  // Grain noise overlay
  const grainId = "lm-grain";

  return (
    <main style={{ background: T.bg, fontFamily: SANS, color: T.text }}>

      {/* ── HERO ── */}
      <div ref={heroRef} style={{ position: "relative", height: "100vh", minHeight: 680, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Parallax image */}
        <motion.div style={{ position: "absolute", inset: "-20%", y: heroY }}>
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1800&q=90"
            alt="Lumière clinic"
            style={{ width: "100%", height: "140%", objectFit: "cover" }}
          />
          {/* Layered overlays */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(15,13,10,0.70) 0%, rgba(15,13,10,0.45) 60%, rgba(15,13,10,0.65) 100%)" }} />
          {/* Warm tint */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(15,13,10,0.55) 100%)" }} />
        </motion.div>

        {/* Gold accent lines */}
        <div style={{ position: "absolute", top: 0, left: 0, width: 1, height: "35vh", background: `linear-gradient(${T.gold}, transparent)`, opacity: 0.6 }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: "6vw", height: 1, background: `linear-gradient(90deg, ${T.gold}, transparent)`, opacity: 0.6 }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 1, height: "25vh", background: `linear-gradient(transparent, ${T.gold})`, opacity: 0.4 }} />

        {/* Content */}
        <motion.div
          style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 820, padding: "0 2.5rem", opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Label text="Harley Street, London · Est. 2014" />
          </motion.div>

          <motion.h1
            className="lm-hero-h1"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{
              fontFamily: SERIF, fontSize: "clamp(3.2rem,7vw,6rem)",
              fontWeight: 500, color: T.textInv, lineHeight: 1.06,
              marginBottom: "1.5rem", letterSpacing: "-0.01em",
            }}
          >
            Where science meets<br />
            <em style={{ color: T.gold, fontStyle: "italic" }}>the art of beauty.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontSize: "1rem", color: "rgba(250,248,245,0.72)", maxWidth: 480, margin: "0 auto 2.5rem", lineHeight: 1.78 }}
          >
            London's leading aesthetic clinic. Bespoke treatments grounded in clinical evidence, administered by consultant-level practitioners.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.48, ease: [0.23, 1, 0.32, 1] }}
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link
              href={`${BASE}/book`}
              style={{
                padding: "0.95rem 2.5rem", background: T.gold, color: T.bgDk,
                fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em",
                textTransform: "uppercase", textDecoration: "none",
                transition: `background 200ms ${EASE}, transform 120ms ${EASE}`,
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.goldLt}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.gold}
              onMouseDown={e => (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"}
              onMouseUp={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
            >Book a Consultation</Link>
            <Link
              href={`${BASE}/services`}
              style={{
                padding: "0.95rem 2.5rem",
                border: "1px solid rgba(250,248,245,0.35)", color: "rgba(250,248,245,0.88)",
                fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.18em",
                textTransform: "uppercase", textDecoration: "none",
                transition: `border-color 200ms ${EASE}`,
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(250,248,245,0.7)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(250,248,245,0.35)"}
            >Our Treatments</Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.54rem", letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(250,248,245,0.4)" }}>Scroll</span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{ width: 1, height: 32, background: `linear-gradient(${T.gold}, transparent)` }} />
        </div>
      </div>

      {/* ── PHILOSOPHY STRIP ── */}
      <section style={{ background: T.bgMd, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: "0 2.5rem" }}>
        <div ref={philRef} className="lm-phil-grid" style={{ maxWidth: 1280, margin: "0 auto" }}>
          {[
            { num: "I",   title: "Science First",  body: "Every treatment protocol is grounded in peer-reviewed clinical evidence. We do not follow trends — we follow results." },
            { num: "II",  title: "Artistry",        body: "Technical excellence alone is not enough. Our practitioners bring an aesthetic sensibility that ensures enhancement always looks natural." },
            { num: "III", title: "Discretion",      body: "Our clients trust us with their most personal concerns. Every interaction, from consultation to aftercare, is handled with absolute care." },
          ].map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              animate={philInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              style={{
                padding: "3.5rem 2.5rem",
                borderRight: i < 2 ? `1px solid ${T.border}` : "none",
              }}
            >
              <div style={{ fontFamily: SERIF, fontSize: "0.78rem", fontStyle: "italic", color: T.gold, marginBottom: "0.75rem" }}>{p.num}</div>
              <h3 style={{ fontFamily: SERIF, fontSize: "1.2rem", fontWeight: 600, color: T.text, marginBottom: "0.75rem" }}>{p.title}</h3>
              <p style={{ fontSize: "0.82rem", color: T.textMd, lineHeight: 1.8 }}>{p.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="lm-px" style={{ padding: "7rem 2.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <Label text="Our Treatments" />
              <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, color: T.text, lineHeight: 1.15 }}>
                Six pillars of<br /><em style={{ color: T.gold }}>aesthetic excellence.</em>
              </h2>
            </div>
            <Link href={`${BASE}/services`} style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.14em",
              textTransform: "uppercase", color: T.gold, textDecoration: "none",
              transition: `gap 200ms ${EASE}`,
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.gap = "0.9rem"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.gap = "0.5rem"}
            >
              View All Treatments
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
            </Link>
          </div>
          <div className="lm-svc-grid" style={{ gap: "1.25rem" }}>
            {SERVICES.map((s, i) => <ServiceCard key={s.slug} s={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── ABOUT INTRO (bleeding image) ── */}
      <section style={{ background: T.bgMd, borderTop: `1px solid ${T.border}`, overflow: "hidden" }}>
        <div ref={aboutRef} className="lm-about-grid lm-px" style={{ maxWidth: 1280, margin: "0 auto", padding: "7rem 2.5rem", gap: "5rem", alignItems: "center" }}>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={aboutInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          >
            <Label text="The Lumière Philosophy" />
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, color: T.text, lineHeight: 1.2, marginBottom: "1.5rem" }}>
              Enhancement that looks<br /><em style={{ color: T.gold }}>entirely like you.</em>
            </h2>
            <p style={{ fontSize: "0.9rem", color: T.textMd, lineHeight: 1.88, marginBottom: "1rem" }}>
              Founded in 2014 by Dr. Sophie Marchand, Lumière was built on a single belief: that the best aesthetic treatment is one nobody can see. Not because nothing was done — but because everything was done with extraordinary precision.
            </p>
            <p style={{ fontSize: "0.9rem", color: T.textMd, lineHeight: 1.88, marginBottom: "2rem" }}>
              We work only with consultant-level practitioners, clinical-grade technologies, and treatment protocols designed around your unique biology — never off-the-shelf.
            </p>
            <Link href={`${BASE}/about`} style={{
              display: "inline-flex", alignItems: "center", gap: "0.75rem",
              fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.16em",
              textTransform: "uppercase", color: T.gold, textDecoration: "none",
              transition: `gap 200ms ${EASE}`,
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.gap = "1.2rem"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.gap = "0.75rem"}
            >
              Meet the Team
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M1 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
            </Link>
          </motion.div>

          {/* Bleeding image */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={aboutInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            style={{ position: "relative" }}
          >
            {/* Offset gold frame */}
            <div style={{ position: "absolute", top: -18, right: -18, bottom: 18, left: 18, border: `1px solid ${T.border}`, zIndex: 0 }} />
            <img
              src="https://images.unsplash.com/photo-1629909615184-74f495363b67?w=900&q=80"
              alt="Lumière clinic interior"
              style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block", position: "relative", zIndex: 1 }}
            />
            {/* Gold stat badge */}
            <div style={{ position: "absolute", bottom: -18, left: -18, zIndex: 2, background: T.gold, padding: "1.25rem 1.5rem", minWidth: 130, textAlign: "center" }}>
              <div style={{ fontFamily: SERIF, fontSize: "1.8rem", fontWeight: 600, color: T.bgDk, lineHeight: 1 }}>12+</div>
              <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.bgDkMd, marginTop: "0.2rem" }}>Years of Excellence</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DARK STATS + TESTIMONIALS ── */}
      <section style={{ background: T.bgDk, padding: "7rem 2.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Stats */}
          <div ref={statsRef} className="lm-stats-grid" style={{ gap: "0", marginBottom: "6rem" }}>
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  padding: "2.5rem",
                  borderRight: i < 3 ? `1px solid rgba(184,149,106,0.14)` : "none",
                  textAlign: "center",
                }}
              >
                <div style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 600, color: T.gold, lineHeight: 1, marginBottom: "0.5rem" }}>{s.value}</div>
                <div style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textLt }}>{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Testimonials */}
          <div style={{ marginBottom: "3rem" }}>
            <Label text="Client Voices" />
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 500, color: T.textInv, marginBottom: "2.5rem" }}>
              What our clients say.
            </h2>
          </div>
          <div className="lm-steps-grid" style={{ gap: "1.25rem" }}>
            {/* Featured quote — spans full or 2/3 on large */}
            <div style={{ gridColumn: "1 / -1", padding: "2.5rem", border: `1px solid rgba(184,149,106,0.2)`, background: "rgba(37,32,23,0.4)", marginBottom: "0" }}>
              <div style={{ fontFamily: SERIF, fontSize: "4rem", lineHeight: 1, color: T.gold, opacity: 0.18, userSelect: "none" }}>"</div>
              <p style={{ fontFamily: SERIF, fontSize: "clamp(1.1rem,2vw,1.4rem)", fontStyle: "italic", color: T.textInv, lineHeight: 1.75, maxWidth: 700, marginBottom: "1.75rem" }}>
                {TESTIMONIALS[0].quote}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 28, height: 1, background: T.gold }} />
                <div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 600, color: T.textInv }}>{TESTIMONIALS[0].author}</div>
                  <div style={{ fontSize: "0.66rem", color: T.gold }}>{TESTIMONIALS[0].context}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="lm-testimonial-grid" style={{ gap: "1.25rem", marginTop: "1.25rem" }}>
            {TESTIMONIALS.slice(1).map((t, i) => <TestCard key={i} t={t} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── TEAM PREVIEW ── */}
      <section className="lm-px" style={{ padding: "7rem 2.5rem" }}>
        <div ref={teamRef} style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <Label text="The Team" />
              <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, color: T.text, lineHeight: 1.15 }}>
                Practitioners you can<br /><em style={{ color: T.gold }}>trust completely.</em>
              </h2>
            </div>
            <Link href={`${BASE}/about#team`} style={{
              fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.14em",
              textTransform: "uppercase", color: T.gold, textDecoration: "none",
            }}>Meet Everyone →</Link>
          </div>

          <div className="lm-team-preview" style={{ gap: "2rem" }}>
            {[0, 1].map(i => {
              const m = [
                { name: "Dr. Sophie Marchand", role: "Medical Director & Founder", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&q=80", area: "Aesthetics · Dermatology" },
                { name: "Dr. James Okafor", role: "Senior Aesthetic Doctor", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700&q=80", area: "Injectables · Lasers" },
              ][i];
              return (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 24 }}
                  animate={teamInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
                  className="lm-team-card"
                  style={{ gap: "1.5rem", alignItems: "start", padding: "1.75rem", border: `1px solid ${T.border}`, background: T.bgMd }}
                >
                  <img src={m.img} alt={m.name} style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", objectPosition: "top" }} />
                  <div style={{ paddingTop: "0.25rem" }}>
                    <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.gold, marginBottom: "0.4rem" }}>{m.area}</div>
                    <h3 style={{ fontFamily: SERIF, fontSize: "1.2rem", fontWeight: 600, color: T.text, marginBottom: "0.25rem" }}>{m.name}</h3>
                    <p style={{ fontSize: "0.78rem", color: T.textMd, marginBottom: "1rem" }}>{m.role}</p>
                    <Link href={`${BASE}/about#team`} style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: T.gold, textDecoration: "none" }}>
                      View profile →
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "9rem 2.5rem", textAlign: "center" }}>
        <img
          src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1600&q=85"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.18) saturate(0.6)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(${T.bgDk}CC, ${T.bgDk}CC)` }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto" }}>
          <div style={{ width: 1, height: 48, background: `linear-gradient(${T.gold}, transparent)`, margin: "0 auto 2.5rem" }} />
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,5vw,3.8rem)", fontWeight: 500, color: T.textInv, lineHeight: 1.12, marginBottom: "1.25rem" }}>
            Begin your<br /><em style={{ color: T.gold }}>Lumière journey.</em>
          </h2>
          <p style={{ fontSize: "0.9rem", color: "rgba(250,248,245,0.6)", lineHeight: 1.8, maxWidth: 400, margin: "0 auto 2.5rem" }}>
            Every treatment begins with a complimentary skin consultation. No obligation. Complete confidence.
          </p>
          <Link
            href={`${BASE}/book`}
            style={{
              display: "inline-block", padding: "1rem 3rem",
              background: T.gold, color: T.bgDk,
              fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em",
              textTransform: "uppercase", textDecoration: "none",
              transition: `background 200ms ${EASE}, transform 120ms ${EASE}`,
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.goldLt}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.gold}
            onMouseDown={e => (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"}
            onMouseUp={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
          >Book Your Consultation</Link>
        </div>
      </section>

    </main>
  );
}
