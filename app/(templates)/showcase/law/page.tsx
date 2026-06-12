"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { PRACTICES, TESTIMONIALS, STATS, ACCREDITATIONS, BLOG_POSTS, BASE, T, SERIF, SANS, EASE } from "./lib/data";

// ── Scroll reveal hook ────────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return { ref, inView };
}

// ── Animated stat counter ─────────────────────────────────────────────────────
function StatCounter({ value, label, delay }: { value: string; label: string; delay: number }) {
  const { ref, inView } = useReveal();
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
      style={{ textAlign: "center", padding: "2rem 1rem" }}>
      <div style={{ fontFamily: SERIF, fontSize: "clamp(2.2rem,4vw,3.5rem)", fontWeight: 600, color: T.gold, lineHeight: 1, marginBottom: "0.5rem" }}>{value}</div>
      <div style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: T.textMd }}>{label}</div>
    </motion.div>
  );
}

// ── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
      <div style={{ width: 32, height: 1, background: T.gold }} />
      <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.26em", textTransform: "uppercase", color: T.gold }}>{text}</span>
    </div>
  );
}

// ── Parallax hero image ───────────────────────────────────────────────────────
function ParallaxHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);

  return (
    <div ref={ref} style={{ position: "relative", height: "100vh", minHeight: 700, overflow: "hidden", display: "flex", alignItems: "center" }}>
      {/* Parallax image */}
      <motion.div style={{ position: "absolute", inset: "-20%", y }}>
        <img
          src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1800&q=85"
          alt="Sterling & Co offices"
          style={{ width: "100%", height: "140%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(10,14,26,0.92) 40%, rgba(10,14,26,0.55) 100%)" }} />
      </motion.div>

      {/* Gold corner accent */}
      <div style={{ position: "absolute", top: 0, left: 0, width: 2, height: "30vh", background: `linear-gradient(${T.gold}, transparent)` }} />
      <div style={{ position: "absolute", top: 0, left: 0, width: "8vw", height: 2, background: `linear-gradient(90deg, ${T.gold}, transparent)` }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", padding: "0 2.5rem", width: "100%" }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <SectionLabel text="Established 1996 · London" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          style={{ fontFamily: SERIF, fontSize: "clamp(3rem,7vw,6rem)", fontWeight: 500, color: T.cream, lineHeight: 1.05, maxWidth: 800, marginBottom: "1.75rem" }}>
          Exceptional legal counsel.<br />
          <em style={{ color: T.gold }}>Unwavering commitment.</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
          style={{ fontSize: "1.05rem", color: T.textMd, maxWidth: 500, lineHeight: 1.75, marginBottom: "2.5rem" }}>
          Sterling &amp; Co is a leading independent law firm delivering expert advice across civil litigation, family law, corporate, property and private client matters.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38, ease: [0.23, 1, 0.32, 1] }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link href={`${BASE}/about#contact`} style={{
            padding: "1rem 2.25rem", background: T.gold, color: T.navy,
            textDecoration: "none", fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "uppercase",
            transition: `all 220ms ${EASE}`,
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T.goldLt; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = T.gold; }}
          >Free Consultation</Link>
          <Link href={`${BASE}/about`} style={{
            padding: "1rem 2.25rem", background: "transparent",
            border: `1px solid rgba(248,246,240,0.3)`, color: T.cream,
            textDecoration: "none", fontSize: "0.72rem", fontWeight: 600,
            letterSpacing: "0.16em", textTransform: "uppercase",
            transition: `all 220ms ${EASE}`,
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = T.cream; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,246,240,0.3)"; }}
          >About the Firm</Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: T.textLt }}>Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          style={{ width: 1, height: 36, background: `linear-gradient(${T.gold}, transparent)` }} />
      </div>
    </div>
  );
}

// ── Practice card ─────────────────────────────────────────────────────────────
function PracticeCard({ p, index }: { p: typeof PRACTICES[0]; index: number }) {
  const { ref, inView } = useReveal();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}>
      <Link href={`${BASE}/${p.slug}`} style={{ textDecoration: "none", display: "block" }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div style={{ position: "relative", overflow: "hidden", aspectRatio: "3/4" }}>
          <img src={p.img} alt={p.title} style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: `transform 700ms ${EASE}`,
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: hovered
              ? "linear-gradient(to top, rgba(10,14,26,0.95) 50%, rgba(10,14,26,0.4) 100%)"
              : "linear-gradient(to top, rgba(10,14,26,0.85) 40%, rgba(10,14,26,0.1) 100%)",
            transition: `background 400ms ${EASE}`,
          }} />

          {/* Gold line — slides in on hover */}
          <div style={{
            position: "absolute", top: 0, left: 0, width: 3, height: "100%",
            background: T.gold, transform: hovered ? "scaleY(1)" : "scaleY(0)",
            transformOrigin: "top", transition: `transform 400ms ${EASE}`,
          }} />

          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.75rem 1.5rem" }}>
            <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: T.gold, marginBottom: "0.5rem" }}>Practice Area</div>
            <h3 style={{ fontFamily: SERIF, fontSize: "1.4rem", fontWeight: 600, color: T.cream, lineHeight: 1.2, marginBottom: "0.65rem" }}>{p.title}</h3>
            <p style={{ fontSize: "0.78rem", color: T.textMd, lineHeight: 1.6, marginBottom: "1.25rem", opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(8px)", transition: `all 350ms ${EASE}` }}>{p.tagline}</p>

            {/* Sub-services */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
              {p.subs.map(s => (
                <span key={s.slug} style={{ fontSize: "0.62rem", padding: "0.2rem 0.6rem", border: `1px solid ${T.border}`, color: T.textMd, transition: `all 200ms` }}>{s.title}</span>
              ))}
            </div>

            <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", color: T.gold, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", opacity: hovered ? 1 : 0, transform: hovered ? "translateX(0)" : "translateX(-8px)", transition: `all 350ms ${EASE} 50ms` }}>
              Learn More
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Testimonial ───────────────────────────────────────────────────────────────
function TestimonialCard({ t, index }: { t: typeof TESTIMONIALS[0]; index: number }) {
  const { ref, inView } = useReveal();
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
      style={{ border: `1px solid ${T.border}`, padding: "2.5rem", position: "relative", background: T.navyLt }}>
      {/* Large quote mark */}
      <div style={{ fontFamily: SERIF, fontSize: "5rem", lineHeight: 1, color: T.gold, opacity: 0.25, position: "absolute", top: "1rem", left: "1.75rem", userSelect: "none" }}>"</div>
      <p style={{ fontFamily: SERIF, fontSize: "1.05rem", color: T.cream, lineHeight: 1.75, marginBottom: "1.75rem", fontStyle: "italic", paddingTop: "1rem" }}>{t.quote}</p>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{ width: 32, height: 1, background: T.gold }} />
        <div>
          <div style={{ fontSize: "0.78rem", fontWeight: 600, color: T.cream }}>{t.author}</div>
          <div style={{ fontSize: "0.68rem", color: T.gold, letterSpacing: "0.06em" }}>{t.context}</div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Blog card ─────────────────────────────────────────────────────────────────
function BlogCard({ post, index }: { post: typeof BLOG_POSTS[0]; index: number }) {
  const { ref, inView } = useReveal();
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}>
      <Link href={`${BASE}/blog`} style={{ textDecoration: "none", display: "block" }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div style={{ overflow: "hidden", aspectRatio: "16/9", marginBottom: "1.25rem" }}>
          <img src={post.img} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.05)" : "scale(1)", transition: `transform 600ms ${EASE}` }} />
        </div>
        <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.gold, marginBottom: "0.5rem" }}>{post.category}</div>
        <h3 style={{ fontFamily: SERIF, fontSize: "1.2rem", fontWeight: 600, color: hovered ? T.gold : T.cream, lineHeight: 1.3, marginBottom: "0.6rem", transition: `color 220ms` }}>{post.title}</h3>
        <p style={{ fontSize: "0.8rem", color: T.textMd, lineHeight: 1.7, marginBottom: "0.75rem" }}>{post.excerpt}</p>
        <div style={{ fontSize: "0.7rem", color: T.textLt }}>{post.author} · {post.date}</div>
      </Link>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function LawHomePage() {
  const { ref: aboutRef, inView: aboutInView } = useReveal();
  const { ref: accredRef, inView: accredInView } = useReveal();

  return (
    <main style={{ background: T.navy, fontFamily: SANS, color: T.text }}>

      {/* ── HERO ── */}
      <ParallaxHero />

      {/* ── STATS STRIP ── */}
      <section style={{ background: T.navyMd, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 2.5rem", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ borderRight: i < 3 ? `1px solid ${T.border}` : "none" }}>
              <StatCounter value={s.value} label={s.label} delay={i * 0.1} />
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT INTRO ── */}
      <section style={{ padding: "8rem 2.5rem" }}>
        <div ref={aboutRef} style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
          {/* Text */}
          <motion.div initial={{ opacity: 0, x: -32 }} animate={aboutInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}>
            <SectionLabel text="The Firm" />
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 500, color: T.cream, lineHeight: 1.15, marginBottom: "1.5rem" }}>
              A firm built on<br /><em style={{ color: T.gold }}>principle and precision.</em>
            </h2>
            <p style={{ fontSize: "0.9rem", color: T.textMd, lineHeight: 1.85, marginBottom: "1rem" }}>
              Founded in 1996, Sterling &amp; Co has grown from a boutique Chancery Lane practice into one of London's most respected independent law firms. We are defined not by our size, but by the quality of our work and the depth of our client relationships.
            </p>
            <p style={{ fontSize: "0.9rem", color: T.textMd, lineHeight: 1.85, marginBottom: "2rem" }}>
              Our solicitors are recognised in the Legal 500 and Chambers UK for their expertise and commerciality. We believe exceptional legal advice should be clear, actionable and delivered with genuine care.
            </p>
            <Link href={`${BASE}/about`} style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.gold, textDecoration: "none", transition: `gap 200ms ${EASE}` }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.gap = "1.25rem"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.gap = "0.75rem"}>
              Meet the Team
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M1 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </Link>
          </motion.div>

          {/* Bleeding image with gold frame */}
          <motion.div initial={{ opacity: 0, x: 32 }} animate={aboutInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -20, right: -20, bottom: 20, left: 20, border: `1px solid ${T.border}`, zIndex: 0 }} />
            <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=80" alt="Sterling & Co"
              style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", position: "relative", zIndex: 1, display: "block" }} />
            {/* Gold badge */}
            <div style={{ position: "absolute", bottom: -20, left: -20, zIndex: 2, background: T.gold, padding: "1.5rem", textAlign: "center", minWidth: 140 }}>
              <div style={{ fontFamily: SERIF, fontSize: "2rem", fontWeight: 600, color: T.navy, lineHeight: 1 }}>28+</div>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.navyMd }}>Years of Excellence</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRACTICE AREAS ── */}
      <section style={{ padding: "0 2.5rem 8rem" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <SectionLabel text="What We Do" />
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, color: T.cream, marginBottom: "1rem" }}>Practice Areas</h2>
            <p style={{ fontSize: "0.9rem", color: T.textMd, maxWidth: 520, margin: "0 auto" }}>Expert legal advice across five core disciplines, each led by specialist solicitors with deep sector knowledge.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "1.25rem" }}>
            {PRACTICES.map((p, i) => <PracticeCard key={p.slug} p={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── DARK GOLD MARQUEE ── */}
      <section style={{ background: T.gold, padding: "1rem 0", overflow: "hidden" }}>
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex", gap: "3rem", whiteSpace: "nowrap" }}>
          {[...ACCREDITATIONS, ...ACCREDITATIONS].map((a, i) => (
            <span key={i} style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.navy }}>{a} ·</span>
          ))}
        </motion.div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "8rem 2.5rem", background: T.navyMd }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ marginBottom: "4rem" }}>
            <SectionLabel text="Client Voices" />
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, color: T.cream }}>What Our Clients Say</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {TESTIMONIALS.map((t, i) => <TestimonialCard key={i} t={t} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── LATEST INSIGHTS ── */}
      <section style={{ padding: "8rem 2.5rem" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <SectionLabel text="Latest Insights" />
              <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, color: T.cream }}>Legal Insights &amp; News</h2>
            </div>
            <Link href={`${BASE}/blog`} style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.gold, textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              All Articles
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2.5rem" }}>
            {BLOG_POSTS.slice(0, 3).map((p, i) => <BlogCard key={p.slug} post={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── ACCREDITATIONS ── */}
      <section ref={accredRef} style={{ padding: "5rem 2.5rem", background: T.navyMd, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: T.textLt, marginBottom: "2.5rem" }}>Recognised by</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem" }}>
            {ACCREDITATIONS.map((a, i) => (
              <motion.div key={a} initial={{ opacity: 0 }} animate={accredInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: i * 0.07 }}
                style={{ padding: "0.75rem 1.5rem", border: `1px solid ${T.border}`, fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.08em", color: T.textMd }}>
                {a}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "10rem 2.5rem", textAlign: "center" }}>
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.15) saturate(0.4)" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(${T.navy}CC, ${T.navy}CC)` }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ width: 48, height: 1, background: T.gold, margin: "0 auto 2rem" }} />
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 500, color: T.cream, maxWidth: 720, margin: "0 auto 1.5rem", lineHeight: 1.15 }}>
            Ready to speak with a solicitor?
          </h2>
          <p style={{ fontSize: "0.95rem", color: T.textMd, maxWidth: 440, margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
            We offer a free 30-minute initial consultation for all new clients. There is no obligation, and everything discussed is strictly confidential.
          </p>
          <Link href={`${BASE}/about#contact`} style={{
            display: "inline-block", padding: "1.1rem 3rem",
            background: T.gold, color: T.navy,
            textDecoration: "none", fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            transition: `all 220ms ${EASE}`,
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.goldLt}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.gold}
          >Book Your Free Consultation</Link>
        </div>
      </section>

    </main>
  );
}
