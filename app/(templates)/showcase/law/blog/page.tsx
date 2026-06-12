"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { BLOG_POSTS, PRACTICES, BASE, T, SERIF, SANS, EASE } from "../lib/data";

const CATEGORIES = ["All", "Civil Litigation", "Family Law", "Corporate & Commercial", "Property Law", "Wills & Probate"];

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
      <div style={{ width: 32, height: 1, background: T.gold }} />
      <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.26em", textTransform: "uppercase", color: T.gold }}>{text}</span>
    </div>
  );
}

function BlogCard({ post, index, featured = false }: { post: typeof BLOG_POSTS[0]; index: number; featured?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  const [hov, setHov] = useState(false);

  if (featured) {
    return (
      <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
        <Link href={`${BASE}/blog`} className="sterling-featured-grid" style={{ textDecoration: "none", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: `1px solid ${T.border}` }}>
          <div className="sterling-featured-img" style={{ overflow: "hidden" }}>
            <img src={post.img} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hov ? "scale(1.04)" : "scale(1)", transition: `transform 700ms ${EASE}`, display: "block" }} />
          </div>
          <div style={{ padding: "3rem", background: T.navyMd, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: T.gold, marginBottom: "0.6rem" }}>Featured · {post.category}</div>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 600, color: hov ? T.gold : T.cream, lineHeight: 1.2, marginBottom: "1rem", transition: "color 220ms" }}>{post.title}</h2>
            <p style={{ fontSize: "0.85rem", color: T.textMd, lineHeight: 1.8, marginBottom: "1.5rem" }}>{post.excerpt}</p>
            <div style={{ fontSize: "0.72rem", color: T.textLt, marginBottom: "1.5rem" }}>{post.author} · {post.date}</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: T.gold, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Read Article
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <Link href={`${BASE}/blog`} style={{ textDecoration: "none", display: "block", border: `1px solid ${T.border}`, background: T.navyMd }}>
        <div style={{ overflow: "hidden" }}>
          <img src={post.img} alt={post.title} style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", transform: hov ? "scale(1.05)" : "scale(1)", transition: `transform 600ms ${EASE}`, display: "block" }} />
        </div>
        <div style={{ padding: "1.75rem" }}>
          <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.gold, marginBottom: "0.5rem" }}>{post.category}</div>
          <h3 style={{ fontFamily: SERIF, fontSize: "1.2rem", fontWeight: 600, color: hov ? T.gold : T.cream, lineHeight: 1.3, marginBottom: "0.65rem", transition: "color 220ms" }}>{post.title}</h3>
          <p style={{ fontSize: "0.78rem", color: T.textMd, lineHeight: 1.7, marginBottom: "1rem" }}>{post.excerpt}</p>
          <div style={{ fontSize: "0.68rem", color: T.textLt }}>{post.author} · {post.date}</div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === activeCategory);

  return (
    <main style={{ background: T.navy, fontFamily: SANS, color: T.text }}>

      {/* ── HERO ── */}
      <div style={{ position: "relative", overflow: "hidden", padding: "8rem 2.5rem 5rem" }}>
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1800&q=75" alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.12) saturate(0.3)" }} />
        <div style={{ position: "absolute", inset: 0, background: `${T.navy}DD` }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "50%", background: `linear-gradient(${T.gold}, transparent)` }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1320, margin: "0 auto" }}>
          <SectionLabel text="Knowledge & Insight" />
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontFamily: SERIF, fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: 500, color: T.cream, lineHeight: 1.1, maxWidth: 700 }}>
            Legal Insights &amp; News
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.18, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontSize: "1rem", color: T.textMd, maxWidth: 500, lineHeight: 1.8, marginTop: "1rem" }}>
            Expert commentary and analysis from the solicitors at Sterling &amp; Co on the legal issues that matter most.
          </motion.p>
        </div>
      </div>

      {/* ── FEATURED ── */}
      <section style={{ maxWidth: 1320, margin: "0 auto", padding: "4rem 2.5rem 2rem" }}>
        <BlogCard post={BLOG_POSTS[0]} index={0} featured />
      </section>

      {/* ── FILTER + GRID ── */}
      <section style={{ maxWidth: 1320, margin: "0 auto", padding: "3rem 2.5rem 6rem" }}>
        {/* Category pills */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "3rem", paddingBottom: "2rem", borderBottom: `1px solid ${T.border}` }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{
                padding: "0.5rem 1.1rem", border: `1px solid ${activeCategory === cat ? T.gold : T.border}`,
                background: activeCategory === cat ? T.gold : "transparent",
                color: activeCategory === cat ? T.navy : T.textMd,
                fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: "pointer", transition: `all 180ms ${EASE}`,
              }}>
              {cat}
            </button>
          ))}
        </div>

        <div className="sterling-blog-articles-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }}>
          {filtered.slice(filtered[0] === BLOG_POSTS[0] && activeCategory === "All" ? 1 : 0).map((p, i) => (
            <BlogCard key={p.slug} post={p} index={i} />
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section style={{ background: T.navyMd, borderTop: `1px solid ${T.border}`, padding: "5rem 2.5rem" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <SectionLabel text="Stay Informed" />
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.8rem,3.5vw,2.5rem)", fontWeight: 500, color: T.cream, marginBottom: "1rem" }}>Legal updates, straight to your inbox.</h2>
          <p style={{ fontSize: "0.88rem", color: T.textMd, lineHeight: 1.8, marginBottom: "2rem" }}>Receive our monthly round-up of key legal developments, case studies and practical guidance from the Sterling &amp; Co team.</p>
          <div className="sterling-newsletter-row" style={{ display: "flex", gap: "0", maxWidth: 480, margin: "0 auto" }}>
            <input type="email" placeholder="Your email address" className="sterling-newsletter-input" style={{ flex: 1, padding: "0.85rem 1.1rem", background: T.navyLt, border: `1px solid ${T.border}`, borderRight: "none", color: T.cream, fontSize: "0.88rem", outline: "none", fontFamily: SANS }} />
            <button className="sterling-newsletter-btn" style={{ padding: "0.85rem 1.5rem", background: T.gold, color: T.navy, border: "none", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap", transition: `background 200ms` }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.goldLt}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.gold}
            >Subscribe</button>
          </div>
          <p style={{ fontSize: "0.7rem", color: T.textLt, marginTop: "0.75rem" }}>No spam. Unsubscribe at any time.</p>
        </div>
      </section>

    </main>
  );
}
