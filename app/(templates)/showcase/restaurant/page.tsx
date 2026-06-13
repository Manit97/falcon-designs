"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { T, DISPLAY, SANS, EASE, BASE, SIGNATURE, GALLERY, PRESS, CHEF, PRIVATE } from "./lib/data";

// ── Scroll reveal hook ───────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
}

// ── Parallax Hero ────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const imgY    = useTransform(scrollY, [0, 700], [0, 120]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale   = useTransform(scrollY, [0, 600], [1, 1.06]);

  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section ref={ref} style={{ position: "relative", height: "100vh", overflow: "hidden", background: T.bg }}>

      {/* Parallax image */}
      <motion.div style={{
        position: "absolute", inset: "-20% 0", y: imgY, scale,
        transformOrigin: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=90")`,
          backgroundSize: "cover", backgroundPosition: "center 30%",
          filter: "brightness(0.42)",
        }} />
      </motion.div>

      {/* Layered overlays */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(9,7,5,0.3) 0%, rgba(9,7,5,0) 40%, rgba(9,7,5,0.5) 75%, ${T.bg} 100%)`, zIndex: 2 }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 90% 80% at 50% 60%, transparent 40%, rgba(9,7,5,0.7) 100%)`, zIndex: 2 }} />

      {/* Gold top rule */}
      <motion.div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2, zIndex: 10,
        background: `linear-gradient(90deg, transparent, ${T.amber}, transparent)`,
        scaleX: loaded ? 1 : 0, transformOrigin: "left",
      }} transition={{ duration: 1.4, ease: [0.23,1,0.32,1], delay: 0.4 }} />

      {/* Corner accents */}
      {[
        { top: 24, left: 24, borderTop: `1px solid ${T.amber}`, borderLeft: `1px solid ${T.amber}` },
        { top: 24, right: 24, borderTop: `1px solid ${T.amber}`, borderRight: `1px solid ${T.amber}` },
        { bottom: 24, left: 24, borderBottom: `1px solid ${T.amber}`, borderLeft: `1px solid ${T.amber}` },
        { bottom: 24, right: 24, borderBottom: `1px solid ${T.amber}`, borderRight: `1px solid ${T.amber}` },
      ].map((s, i) => (
        <motion.div key={i} style={{ position: "absolute", width: 28, height: 28, zIndex: 10, ...s }}
          initial={{ opacity: 0 }} animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.8 + i * 0.08 }} />
      ))}

      {/* Hero copy */}
      <motion.div style={{ position: "absolute", inset: 0, zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", opacity }}>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          style={{ fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", color: T.amber, marginBottom: "1.5rem", fontWeight: 400 }}>
          Fitzrovia, London · Est. 2018
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.5, ease: [0.23,1,0.32,1] }}
          style={{ fontFamily: DISPLAY, fontSize: "clamp(5rem,11vw,9.5rem)", fontWeight: 300, fontStyle: "italic", letterSpacing: "-0.01em", lineHeight: 0.9, color: T.cream, margin: "0 0 0.6rem" }}>
          Ember
        </motion.h1>

        <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.9, delay: 0.9 }}
          style={{ width: 60, height: 1, background: T.amber, margin: "0 auto 1.2rem", transformOrigin: "center" }} />

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.0, ease: [0.23,1,0.32,1] }}
          style={{ fontFamily: DISPLAY, fontSize: "clamp(1.1rem,2vw,1.5rem)", fontWeight: 300, fontStyle: "italic", color: T.textMd, letterSpacing: "0.06em", marginBottom: "3rem" }}>
          Wood-fire European cuisine
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.2, ease: [0.23,1,0.32,1] }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href={`${BASE}/reserve`} style={{
            padding: "0.85rem 2.5rem", border: `1px solid ${T.amber}`,
            color: T.amber, fontSize: "0.66rem", fontWeight: 500, letterSpacing: "0.2em",
            textTransform: "uppercase", textDecoration: "none", background: "transparent",
            transition: `all 220ms ${EASE}`,
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = T.amber; el.style.color = T.bg; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = T.amber; }}
          >Reserve a Table</Link>

          <Link href={`${BASE}/menu`} style={{
            padding: "0.85rem 2.5rem", border: `1px solid rgba(244,239,230,0.25)`,
            color: T.cream, fontSize: "0.66rem", fontWeight: 400, letterSpacing: "0.2em",
            textTransform: "uppercase", textDecoration: "none",
            transition: `border-color 220ms ${EASE}`,
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(244,239,230,0.55)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(244,239,230,0.25)"}
          >View Menu</Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity }}>
        <div style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: T.textLt }}>Scroll</div>
        <div style={{ width: 1, height: 40, background: `linear-gradient(${T.amber}, transparent)`, animation: "emScroll 2s ease-in-out infinite" }} />
      </motion.div>
    </section>
  );
}

// ── Signature Dish Row ───────────────────────────────────────────────────────
function DishRow({ dish, index }: { dish: typeof SIGNATURE[0]; index: number }) {
  const { ref, isInView } = useReveal(0.12);
  const [hovered, setHovered] = useState(false);
  const reverse = index % 2 === 1;

  return (
    <div ref={ref} className="em-dish-row" style={{
      direction: reverse ? "rtl" : "ltr",
      borderTop: `1px solid ${T.border}`,
    }}>
      {/* Image half */}
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3", direction: "ltr" }}>
        <motion.div
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.9, ease: [0.23,1,0.32,1] }}
          style={{ position: "absolute", inset: 0 }}
        >
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url("${dish.img}")`,
            backgroundSize: "cover", backgroundPosition: "center",
          }} />
        </motion.div>

        {/* Price overlay */}
        <div style={{ position: "absolute", bottom: 20, right: 20, background: T.bg, padding: "0.4rem 0.9rem", fontFamily: DISPLAY, fontSize: "1.3rem", fontWeight: 300, color: T.amber }}>
          {dish.price}
        </div>

        {/* Clip-path reveal — overlay starts covering image, wipes away to reveal */}
        <motion.div
          initial={{ clipPath: "inset(0 0 0 0)" }}
          animate={isInView ? { clipPath: "inset(0 100% 0 0)" } : {}}
          transition={{ duration: 1.0, ease: [0.23,1,0.32,1], delay: 0.1 }}
          style={{ position: "absolute", inset: 0, background: T.bg, pointerEvents: "none" }}
        />
      </div>

      {/* Text half */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: "clamp(2.5rem,5vw,5rem) clamp(2rem,5vw,5rem)",
          direction: "ltr", display: "flex", flexDirection: "column", justifyContent: "center",
          background: isInView ? T.bg : T.bg, position: "relative",
        }}
      >
        {/* Gold left accent */}
        <motion.div style={{
          position: "absolute", left: 0, top: "20%", bottom: "20%", width: 2,
          background: T.amber,
          scaleY: hovered ? 1 : 0,
          transformOrigin: "bottom",
        }} transition={{ duration: 0.55, ease: [0.23,1,0.32,1] }} />

        <motion.div
          initial={{ opacity: 0, x: reverse ? 24 : -24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.23,1,0.32,1], delay: 0.3 }}
        >
          <div style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: T.amber, marginBottom: "1rem" }}>
            Signature · 0{index + 1}
          </div>
          <h3 style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 300, fontStyle: "italic", color: T.cream, lineHeight: 1.1, marginBottom: "0.6rem" }}>
            {dish.name}
          </h3>
          <div style={{ fontSize: "0.72rem", color: T.amber, letterSpacing: "0.1em", marginBottom: "1.5rem" }}>{dish.subtitle}</div>
          <p style={{ fontSize: "0.88rem", color: T.textMd, lineHeight: 1.9, maxWidth: 440 }}>{dish.desc}</p>
        </motion.div>
      </div>
    </div>
  );
}

// ── Gallery ──────────────────────────────────────────────────────────────────
function Gallery() {
  const { ref, isInView } = useReveal(0.08);

  const layouts = [
    { gridColumn: "1 / 5",  gridRow: "1 / 3", aspectRatio: "3/4" },   // tall left
    { gridColumn: "5 / 9",  gridRow: "1 / 2", aspectRatio: "4/3" },   // wide top-mid
    { gridColumn: "9 / 13", gridRow: "1 / 2", aspectRatio: "1/1" },   // sq top-right
    { gridColumn: "5 / 9",  gridRow: "2 / 3", aspectRatio: "1/1" },   // sq bot-mid
    { gridColumn: "9 / 13", gridRow: "2 / 3", aspectRatio: "4/3" },   // wide bot-right
  ];

  return (
    <div ref={ref} style={{ padding: "0 2.5rem", maxWidth: 1320, margin: "0 auto" }}>
      <div className="em-gallery-grid" style={{ gap: 8 }}>
        {GALLERY.map((g, i) => (
          <div key={i} style={{ ...layouts[i], overflow: "hidden", position: "relative" }}>
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={isInView ? { clipPath: "inset(0% 0 0 0)" } : {}}
              transition={{ duration: 0.95, ease: [0.23,1,0.32,1], delay: i * 0.08 }}
              style={{ width: "100%", height: "100%" }}
            >
              <div style={{
                width: "100%", paddingBottom: layouts[i]?.aspectRatio === "3/4" ? "133%" : layouts[i]?.aspectRatio === "1/1" ? "100%" : "75%",
                backgroundImage: `url("${g.img}")`, backgroundSize: "cover", backgroundPosition: "center",
                filter: "brightness(0.85)",
                transition: `filter 500ms ${EASE}, transform 700ms ${EASE}`,
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = "brightness(1)"; (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = "brightness(0.85)"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Press Strip ──────────────────────────────────────────────────────────────
function PressStrip() {
  const { ref, isInView } = useReveal();

  return (
    <div ref={ref} style={{ background: T.bgMd, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: "5rem 2.5rem" }}>
      <div className="em-press-grid" style={{ maxWidth: 1320, margin: "0 auto", gap: "0" }}>
        {PRESS.map((p, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.23,1,0.32,1], delay: i * 0.12 }}
            style={{
              padding: "2.5rem 3rem",
              borderRight: i < PRESS.length - 1 ? `1px solid ${T.border}` : "none",
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: DISPLAY, fontSize: "1.05rem", fontStyle: "italic", color: T.cream, lineHeight: 1.65, marginBottom: "1.2rem" }}>
              "{p.quote}"
            </div>
            <div style={{ fontSize: "0.72rem", color: T.amber, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.35rem" }}>{p.outlet}</div>
            <div style={{ fontSize: "0.8rem", color: T.textLt, letterSpacing: "0.1em" }}>{p.rating}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Chef Section ─────────────────────────────────────────────────────────────
function ChefSection() {
  const { ref, isInView } = useReveal(0.1);

  return (
    <section style={{ padding: "clamp(5rem,8vw,10rem) 2.5rem" }}>
      <div ref={ref} className="em-chef-grid" style={{ maxWidth: 1320, margin: "0 auto", gap: "clamp(3rem,6vw,8rem)", alignItems: "center" }}>

        {/* Image */}
        <div style={{ position: "relative" }}>
          {/* Offset amber frame */}
          <div style={{
            position: "absolute", top: -16, right: -16, bottom: 16, left: 16,
            border: `1px solid ${T.border}`, zIndex: 0,
          }} />

          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 1.1, ease: [0.23,1,0.32,1], delay: 0.1 }}
            style={{ position: "relative", zIndex: 1, overflow: "hidden" }}
          >
            <img src={CHEF.img} alt={CHEF.name} style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }} />
          </motion.div>
        </div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.0, ease: [0.23,1,0.32,1], delay: 0.3 }}
        >
          <div style={{ fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", color: T.amber, marginBottom: "1.5rem" }}>The Chef</div>
          <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(2.4rem,4vw,3.8rem)", fontWeight: 300, fontStyle: "italic", color: T.cream, lineHeight: 1.1, marginBottom: "0.35rem" }}>
            {CHEF.name}
          </h2>
          <div style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: T.textLt, marginBottom: "2rem" }}>{CHEF.role}</div>

          <div style={{ width: 40, height: 1, background: T.amber, marginBottom: "2rem" }} />

          <p style={{ fontSize: "0.9rem", color: T.textMd, lineHeight: 2, marginBottom: "1.4rem" }}>{CHEF.bio}</p>
          <p style={{ fontSize: "0.9rem", color: T.textMd, lineHeight: 2, marginBottom: "2.5rem" }}>{CHEF.bio2}</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            {CHEF.awards.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 4, height: 4, background: T.amber, flexShrink: 0, transform: "rotate(45deg)" }} />
                <span style={{ fontSize: "0.78rem", color: T.textMd, letterSpacing: "0.05em" }}>{a}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Private Dining ───────────────────────────────────────────────────────────
function PrivateDining() {
  const { ref, isInView } = useReveal(0.1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section ref={scrollRef} style={{ position: "relative", overflow: "hidden", height: "clamp(420px,55vw,680px)" }}>
      <motion.div style={{ position: "absolute", inset: "-15% 0", y: imgY }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url("${PRIVATE.img}")`,
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "brightness(0.35)",
        }} />
      </motion.div>

      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, rgba(9,7,5,0.9) 40%, transparent 100%)`, zIndex: 1 }} />

      <div ref={ref} style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", alignItems: "center", padding: "0 clamp(2rem,8vw,8rem)" }}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.0, ease: [0.23,1,0.32,1] }}
          style={{ maxWidth: 540 }}
        >
          <div style={{ fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", color: T.amber, marginBottom: "1.25rem" }}>Private Dining</div>
          <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(2.2rem,4vw,3.5rem)", fontWeight: 300, fontStyle: "italic", color: T.cream, lineHeight: 1.1, marginBottom: "0.5rem" }}>
            {PRIVATE.name}
          </h2>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: T.textLt, marginBottom: "1.5rem" }}>{PRIVATE.capacity}</div>
          <div style={{ width: 40, height: 1, background: T.amber, marginBottom: "1.5rem" }} />
          <p style={{ fontSize: "0.88rem", color: T.textMd, lineHeight: 1.9, marginBottom: "2.5rem" }}>{PRIVATE.desc}</p>
          <Link href={`${BASE}/reserve`} style={{
            display: "inline-block", padding: "0.8rem 2.2rem",
            border: `1px solid ${T.amber}`, color: T.amber,
            fontSize: "0.66rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none",
            transition: `all 220ms ${EASE}`,
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = T.amber; el.style.color = T.bg; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = T.amber; }}
          >Enquire</Link>
        </motion.div>
      </div>
    </section>
  );
}

// ── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  const { ref, isInView } = useReveal();

  return (
    <section style={{ padding: "clamp(5rem,8vw,9rem) 2.5rem", textAlign: "center", background: T.bg }}>
      <motion.div ref={ref}
        initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.23,1,0.32,1] }}
      >
        <div style={{ fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", color: T.amber, marginBottom: "1.5rem" }}>
          Tuesday – Saturday
        </div>
        <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 300, fontStyle: "italic", color: T.cream, lineHeight: 1.1, marginBottom: "1.5rem" }}>
          Join us for dinner
        </h2>
        <div style={{ width: 50, height: 1, background: T.amber, margin: "0 auto 1.5rem" }} />
        <p style={{ fontSize: "0.9rem", color: T.textMd, maxWidth: 480, margin: "0 auto 3rem", lineHeight: 1.9 }}>
          Tables are typically booked two to three weeks ahead. We hold a small number of walk-in seats at the bar every evening.
        </p>
        <Link href={`${BASE}/reserve`} style={{
          display: "inline-block", padding: "1rem 3rem",
          border: `1px solid ${T.amber}`, color: T.amber,
          fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none",
          transition: `all 220ms ${EASE}`,
        }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = T.amber; el.style.color = T.bg; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = T.amber; }}
          onMouseDown={e => (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"}
          onMouseUp={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
        >Reserve a Table</Link>
      </motion.div>
    </section>
  );
}

// ── Section header helper ───────────────────────────────────────────────────
function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  const { ref, isInView } = useReveal();
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.23,1,0.32,1] }}
      style={{ textAlign: "center", padding: "clamp(4rem,7vw,8rem) 2.5rem 3rem" }}>
      <div style={{ fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", color: T.amber, marginBottom: "1.2rem" }}>{label}</div>
      <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem,3.8vw,3.4rem)", fontWeight: 300, fontStyle: "italic", color: T.cream, lineHeight: 1.2, marginBottom: subtitle ? "0.75rem" : 0 }}>{title}</h2>
      {subtitle && <p style={{ fontSize: "0.88rem", color: T.textMd, maxWidth: 520, margin: "0 auto" }}>{subtitle}</p>}
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function RestaurantHome() {
  return (
    <main style={{ overflow: "hidden" }}>
      <Hero />

      {/* Signature dishes header */}
      <SectionHeader
        label="From the Kitchen"
        title="Signature Dishes"
        subtitle="Each plate is written around the fire. The ingredients change with the seasons; the commitment does not."
      />

      {/* Dishes */}
      <div>
        {SIGNATURE.map((d, i) => <DishRow key={i} dish={d} index={i} />)}
      </div>

      {/* Menu CTA bar */}
      <div style={{ borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: "2.5rem", textAlign: "center", background: T.bgMd }}>
        <Link href={`${BASE}/menu`} style={{
          fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase",
          color: T.amber, textDecoration: "none",
          transition: `opacity 200ms`,
        }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.7"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
        >View the full menu →</Link>
      </div>

      {/* Gallery */}
      <SectionHeader label="The Atmosphere" title="A Place Apart" subtitle="Intimate, unhurried, candlelit. Ember is designed for conversation." />
      <Gallery />

      {/* Press */}
      <PressStrip />

      {/* Chef */}
      <ChefSection />

      {/* Private dining parallax */}
      <PrivateDining />

      {/* Final CTA */}
      <FinalCTA />
    </main>
  );
}
