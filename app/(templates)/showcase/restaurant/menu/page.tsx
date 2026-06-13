"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { T, DISPLAY, SANS, EASE, BASE, MENU } from "../lib/data";

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
}

const SECTIONS = [
  { key: "snacks",   label: "Snacks & Canapés" },
  { key: "starters", label: "Starters" },
  { key: "mains",    label: "Mains" },
  { key: "grill",    label: "From the Grill" },
  { key: "desserts", label: "Desserts" },
  { key: "wines",    label: "Featured Wines" },
] as const;

function MenuItem({ item, index, isInView }: { item: { name: string; desc: string; price: string }; index: number; isInView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.23,1,0.32,1], delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "1.4rem 0",
        borderBottom: `1px solid ${T.borderLt}`,
        display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem",
        cursor: "default",
        transition: `background 200ms`,
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: DISPLAY, fontSize: "1.15rem", fontWeight: 400, fontStyle: hovered ? "italic" : "normal", color: hovered ? T.cream : "rgba(244,239,230,0.9)", marginBottom: "0.3rem", transition: `all 250ms ${EASE}` }}>
          {item.name}
        </div>
        <div style={{ fontSize: "0.75rem", color: T.textLt, letterSpacing: "0.04em", lineHeight: 1.5 }}>{item.desc}</div>
      </div>

      {/* Dot-leader line */}
      <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: "0.75rem", paddingTop: "0.2rem" }}>
        <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, ${T.borderLt})` }} />
        <span style={{ fontFamily: DISPLAY, fontSize: "1.05rem", fontWeight: 300, color: T.amber, whiteSpace: "nowrap" }}>{item.price}</span>
      </div>
    </motion.div>
  );
}

function MenuSection({ sectionKey, label }: { sectionKey: keyof typeof MENU; label: string }) {
  const { ref, isInView } = useReveal(0.08);
  const items = MENU[sectionKey];

  return (
    <section id={sectionKey} ref={ref} style={{ padding: "4rem 0", borderBottom: `1px solid ${T.border}`, scrollMarginTop: 120 }}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.23,1,0.32,1] }}
        style={{ marginBottom: "2.5rem" }}
      >
        <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 300, fontStyle: "italic", color: T.cream, marginBottom: "0.4rem" }}>
          {label}
        </h2>
        <div style={{ width: 40, height: 1, background: T.amber }} />
      </motion.div>

      <div className="em-menu-cols" style={{ gap: "0 4rem" }}>
        {items.map((item, i) => (
          <MenuItem key={i} item={item} index={i} isInView={isInView} />
        ))}
      </div>
    </section>
  );
}

export default function MenuPage() {
  const [activeSection, setActiveSection] = useState<string>("snacks");
  const heroRef = useRef<HTMLDivElement>(null);
  const { isInView: heroIn } = useReveal(0.1);

  return (
    <main style={{ background: T.bg, minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ position: "relative", height: "55vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          position: "absolute", inset: "-20% 0",
          backgroundImage: `url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85")`,
          backgroundSize: "cover", backgroundPosition: "center 25%",
          filter: "brightness(0.22)",
        }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${T.bg} 0%, transparent 30%, transparent 70%, ${T.bg} 100%)`, zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", color: T.amber, marginBottom: "1rem" }}>
              Seasonal Menu
            </div>
            <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(3rem,7vw,5.5rem)", fontWeight: 300, fontStyle: "italic", color: T.cream, lineHeight: 1, marginBottom: "1rem" }}>
              The Menu
            </h1>
            <p style={{ fontSize: "0.82rem", color: T.textMd, letterSpacing: "0.08em" }}>
              All prices include VAT · Allergen information available on request
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sticky nav */}
      <div style={{ position: "sticky", top: 72, zIndex: 400, background: "rgba(9,7,5,0.97)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 2.5rem", display: "flex", gap: "0", overflowX: "auto" }}>
          {SECTIONS.map(s => (
            <a key={s.key} href={`#${s.key}`}
              onClick={() => setActiveSection(s.key)}
              style={{
                padding: "1rem 1.25rem", display: "block",
                fontSize: "0.64rem", fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase",
                color: activeSection === s.key ? T.amber : T.textMd,
                textDecoration: "none", whiteSpace: "nowrap",
                borderBottom: `2px solid ${activeSection === s.key ? T.amber : "transparent"}`,
                transition: `all 220ms ${EASE}`,
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.cream}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = activeSection === s.key ? T.amber : T.textMd}
            >{s.label}</a>
          ))}
        </div>
      </div>

      {/* Menu content */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 2.5rem 6rem" }}>

        {/* Tasting note */}
        <div style={{ padding: "3rem 0 0", borderBottom: `1px solid ${T.border}`, paddingBottom: "3rem" }}>
          <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap", alignItems: "flex-start" }}>
            <div style={{ flex: "1 1 300px" }}>
              <h3 style={{ fontFamily: DISPLAY, fontSize: "1.6rem", fontWeight: 300, fontStyle: "italic", color: T.cream, marginBottom: "1rem" }}>A note on our menu</h3>
              <p style={{ fontSize: "0.84rem", color: T.textMd, lineHeight: 1.9 }}>
                Our menu changes with the season and is written to reflect what we find at market each week. What you read here captures the spirit of what we cook; the specifics on any given evening may vary.
              </p>
            </div>
            <div style={{ flex: "1 1 260px", background: T.bgCard, border: `1px solid ${T.border}`, padding: "1.5rem" }}>
              <div style={{ fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase", color: T.amber, marginBottom: "1rem" }}>Tasting Menu</div>
              <div style={{ fontFamily: DISPLAY, fontSize: "1.15rem", fontStyle: "italic", color: T.cream, marginBottom: "0.3rem" }}>8-course Prestige</div>
              <div style={{ fontSize: "0.8rem", color: T.textLt, marginBottom: "1.2rem" }}>Available Tuesday–Friday, whole table only</div>
              <div style={{ fontFamily: DISPLAY, fontSize: "1.7rem", fontWeight: 300, color: T.amber, marginBottom: "1.25rem" }}>£135 pp</div>
              <Link href={`${BASE}/reserve`} style={{
                display: "inline-block", padding: "0.65rem 1.6rem",
                border: `1px solid ${T.amber}`, color: T.amber,
                fontSize: "0.64rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none",
                transition: `all 200ms ${EASE}`,
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = T.amber; el.style.color = T.bg; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = T.amber; }}
              >Book Now</Link>
            </div>
          </div>
        </div>

        {/* Sections */}
        {SECTIONS.map(s => (
          <MenuSection key={s.key} sectionKey={s.key} label={s.label} />
        ))}

        {/* Reserve CTA */}
        <div style={{ textAlign: "center", padding: "4rem 0 0" }}>
          <div style={{ fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", color: T.amber, marginBottom: "1rem" }}>Ready to dine?</div>
          <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 300, fontStyle: "italic", color: T.cream, marginBottom: "2rem" }}>
            Reserve your table
          </h2>
          <Link href={`${BASE}/reserve`} style={{
            display: "inline-block", padding: "0.85rem 2.5rem",
            border: `1px solid ${T.amber}`, color: T.amber,
            fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none",
            transition: `all 220ms ${EASE}`,
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = T.amber; el.style.color = T.bg; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = T.amber; }}
          >Reserve a Table</Link>
        </div>
      </div>
    </main>
  );
}
