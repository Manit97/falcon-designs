"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import { T, DISPLAY, SANS, EASE, BASE, CHEF } from "../lib/data";

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
}

const TIMELINE = [
  { year: "2014", title: "Paris", body: "Thomas completes his stage under Pierre Gagnaire. The discipline of classic French cuisine — its sauces, its patience — becomes the foundation he would later set alight." },
  { year: "2015", title: "Laguiole", body: "A year at Bras. The mountains, the foraging, the conviction that great food begins with an intimate knowledge of where it comes from. Thomas brings this philosophy to London." },
  { year: "2016", title: "Bray", body: "Four years as Sous Chef at The Fat Duck under Heston. Scientific rigour meets unbridled imagination. Thomas learns that rules exist to be understood before they are broken." },
  { year: "2018", title: "Ember Opens", body: "Charlotte Street. A single open kitchen, a wood-fire grill, and a room of 36 covers. Ember earns its first AA Rosette within six months of opening." },
  { year: "2022", title: "Michelin Bib Gourmand", body: "The recognition arrives quietly, as Thomas would prefer. The team celebrates for one evening, then returns to work the next morning." },
  { year: "2024", title: "The Cellar Room", body: "The Victorian wine cellar beneath the restaurant opens as a private dining room. The same kitchen, the same fire, for up to 18 guests." },
];

const VALUES = [
  { title: "Provenance", body: "Every supplier is named on the menu. We believe ingredients this good deserve attribution. Our beef comes from one farm, our vegetables from three." },
  { title: "The Fire", body: "Not theatrical, not decorative. Fire is our primary cooking tool. It defines texture, depth, and flavour in a way no controlled heat source can replicate." },
  { title: "Restraint", body: "We resist the urge to add. A dish that is complete with three components is not improved by a fourth. The edit is as important as the idea." },
  { title: "Service", body: "Warm, knowledgeable, unobtrusive. Our team is trained to read the room. A birthday deserves recognition; a quiet dinner for two deserves quiet." },
];

export default function StoryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(heroProgress, [0, 1], [0, 100]);

  const quoteRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: quoteProgress } = useScroll({ target: quoteRef, offset: ["start end", "end start"] });
  const quoteImgY = useTransform(quoteProgress, [0, 1], [-50, 50]);

  const { ref: introRef, isInView: introIn } = useReveal(0.1);
  const { ref: timelineRef, isInView: timelineIn } = useReveal(0.05);
  const { ref: valuesRef, isInView: valuesIn } = useReveal(0.08);

  return (
    <main style={{ background: T.bg, overflow: "hidden" }}>

      {/* ── Hero ── */}
      <div ref={heroRef} style={{ position: "relative", height: "80vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.div style={{ position: "absolute", inset: "-20% 0", y: heroImgY }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url("${CHEF.img}")`,
            backgroundSize: "cover", backgroundPosition: "center top",
            filter: "brightness(0.28)",
          }} />
        </motion.div>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${T.bg} 0%, transparent 20%, transparent 60%, ${T.bg} 100%)`, zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 2rem" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 0.3, ease: [0.23,1,0.32,1] }}>
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", color: T.amber, marginBottom: "1.25rem" }}>Our Story</div>
            <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(3rem,7vw,5.5rem)", fontWeight: 300, fontStyle: "italic", color: T.cream, lineHeight: 1.05, marginBottom: "1.5rem" }}>
              Fire, Patience,<br />and Provenance
            </h1>
            <div style={{ width: 48, height: 1, background: T.amber, margin: "0 auto" }} />
          </motion.div>
        </div>
      </div>

      {/* ── Intro ── */}
      <section style={{ padding: "clamp(4rem,7vw,8rem) 2.5rem" }}>
        <div ref={introRef} style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem,6vw,8rem)", alignItems: "center" }}>
          <motion.div initial={{ opacity: 0, x: -32 }} animate={introIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.0, ease: [0.23,1,0.32,1] }}>
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", color: T.amber, marginBottom: "1.5rem" }}>The Beginning</div>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 300, fontStyle: "italic", color: T.cream, lineHeight: 1.15, marginBottom: "2rem" }}>
              A restaurant built around a single cooking tool
            </h2>
            <div style={{ width: 40, height: 1, background: T.amber, marginBottom: "2rem" }} />
            <p style={{ fontSize: "0.88rem", color: T.textMd, lineHeight: 2, marginBottom: "1.5rem" }}>
              Ember began as an argument: that the most sophisticated thing a kitchen could do was reduce itself to the simplest tool. Not a twenty-component tasting menu. Not a laboratory. A fire, and the understanding of how to use it.
            </p>
            <p style={{ fontSize: "0.88rem", color: T.textMd, lineHeight: 2 }}>
              Thomas Laurent opened Ember in 2018 after a decade cooking in France and England. He chose a 36-cover room on Charlotte Street deliberately: small enough to know every table, intimate enough to cook with intention.
            </p>
          </motion.div>

          {/* Image with offset frame */}
          <motion.div initial={{ opacity: 0, x: 32 }} animate={introIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.0, ease: [0.23,1,0.32,1], delay: 0.15 }}
            style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -16, right: -16, bottom: 16, left: 16, border: `1px solid ${T.border}`, zIndex: 0 }} />
            <div style={{ position: "relative", zIndex: 1, overflow: "hidden" }}>
              <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=85" alt="Kitchen" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Full-bleed quote ── */}
      <div ref={quoteRef} style={{ position: "relative", overflow: "hidden", padding: "clamp(5rem,8vw,9rem) 2.5rem" }}>
        <motion.div style={{ position: "absolute", inset: "-15% 0", y: quoteImgY }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url("https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&q=85")`,
            backgroundSize: "cover", backgroundPosition: "center",
            filter: "brightness(0.15)",
          }} />
        </motion.div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(9,7,5,0.75)", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ width: 1, height: 60, background: `linear-gradient(${T.amber}, transparent)`, margin: "0 auto 2.5rem" }} />
          <blockquote style={{ fontFamily: DISPLAY, fontSize: "clamp(1.5rem,3vw,2.4rem)", fontWeight: 300, fontStyle: "italic", color: T.cream, lineHeight: 1.5, marginBottom: "2rem" }}>
            "We are not trying to impress you. We are trying to feed you something that you will remember."
          </blockquote>
          <cite style={{ fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: T.amber, fontStyle: "normal" }}>
            Thomas Laurent · Head Chef & Co-founder
          </cite>
          <div style={{ width: 1, height: 60, background: `linear-gradient(transparent, ${T.amber})`, margin: "2.5rem auto 0" }} />
        </div>
      </div>

      {/* ── Timeline ── */}
      <section style={{ padding: "clamp(5rem,8vw,9rem) 2.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div ref={timelineRef} style={{ textAlign: "center", marginBottom: "4rem" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={timelineIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.23,1,0.32,1] }}>
              <div style={{ fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", color: T.amber, marginBottom: "1rem" }}>Milestones</div>
              <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 300, fontStyle: "italic", color: T.cream }}>The Journey</h2>
            </motion.div>
          </div>

          <div style={{ position: "relative" }}>
            {/* Vertical line */}
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: T.border, transform: "translateX(-50%)" }} />

            {TIMELINE.map((t, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, x: left ? -30 : 30 }}
                  animate={timelineIn ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, ease: [0.23,1,0.32,1], delay: i * 0.1 }}
                  style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr",
                    gap: "0", marginBottom: "3.5rem",
                  }}>
                  {left ? (
                    <>
                      <div style={{ paddingRight: "3rem", textAlign: "right" }}>
                        <div style={{ fontFamily: DISPLAY, fontSize: "2.5rem", fontWeight: 300, color: T.amber, opacity: 0.35, lineHeight: 1 }}>{t.year}</div>
                        <h3 style={{ fontFamily: DISPLAY, fontSize: "1.35rem", fontWeight: 400, fontStyle: "italic", color: T.cream, margin: "0.3rem 0 0.7rem" }}>{t.title}</h3>
                        <p style={{ fontSize: "0.8rem", color: T.textMd, lineHeight: 1.85 }}>{t.body}</p>
                      </div>
                      <div style={{ paddingLeft: "3rem", display: "flex", alignItems: "flex-start", paddingTop: "0.5rem" }}>
                        <div style={{ width: 10, height: 10, background: T.amber, transform: "rotate(45deg)", marginTop: "0.4rem", marginLeft: -5, flexShrink: 0 }} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ paddingRight: "3rem", display: "flex", alignItems: "flex-start", justifyContent: "flex-end", paddingTop: "0.5rem" }}>
                        <div style={{ width: 10, height: 10, background: T.amber, transform: "rotate(45deg)", marginTop: "0.4rem", marginRight: -5, flexShrink: 0 }} />
                      </div>
                      <div style={{ paddingLeft: "3rem" }}>
                        <div style={{ fontFamily: DISPLAY, fontSize: "2.5rem", fontWeight: 300, color: T.amber, opacity: 0.35, lineHeight: 1 }}>{t.year}</div>
                        <h3 style={{ fontFamily: DISPLAY, fontSize: "1.35rem", fontWeight: 400, fontStyle: "italic", color: T.cream, margin: "0.3rem 0 0.7rem" }}>{t.title}</h3>
                        <p style={{ fontSize: "0.8rem", color: T.textMd, lineHeight: 1.85 }}>{t.body}</p>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ padding: "clamp(4rem,7vw,8rem) 2.5rem", background: T.bgMd, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div ref={valuesRef} style={{ textAlign: "center", marginBottom: "4rem" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={valuesIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.23,1,0.32,1] }}>
              <div style={{ fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", color: T.amber, marginBottom: "1rem" }}>What We Stand For</div>
              <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 300, fontStyle: "italic", color: T.cream }}>Our Values</h2>
            </motion.div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "2.5rem" }}>
            {VALUES.map((v, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={valuesIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.23,1,0.32,1], delay: i * 0.1 }}
                style={{ borderTop: `2px solid ${T.amber}`, paddingTop: "1.5rem" }}>
                <h3 style={{ fontFamily: DISPLAY, fontSize: "1.4rem", fontWeight: 400, fontStyle: "italic", color: T.cream, marginBottom: "0.9rem" }}>{v.title}</h3>
                <p style={{ fontSize: "0.82rem", color: T.textMd, lineHeight: 1.9 }}>{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ textAlign: "center", padding: "clamp(5rem,8vw,9rem) 2.5rem" }}>
        <div style={{ fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", color: T.amber, marginBottom: "1.5rem" }}>
          Come and sit with us
        </div>
        <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(2.2rem,4vw,3.5rem)", fontWeight: 300, fontStyle: "italic", color: T.cream, lineHeight: 1.1, marginBottom: "1.5rem" }}>
          The table is waiting
        </h2>
        <div style={{ width: 48, height: 1, background: T.amber, margin: "0 auto 2.5rem" }} />
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href={`${BASE}/reserve`} style={{
            padding: "0.85rem 2.5rem", border: `1px solid ${T.amber}`, color: T.amber,
            fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none",
            transition: `all 220ms ${EASE}`,
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = T.amber; el.style.color = T.bg; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = T.amber; }}
          >Reserve a Table</Link>
          <Link href={`${BASE}/menu`} style={{
            padding: "0.85rem 2.5rem", border: `1px solid rgba(244,239,230,0.2)`, color: T.cream,
            fontSize: "0.68rem", fontWeight: 400, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none",
            transition: `border-color 220ms ${EASE}`,
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(244,239,230,0.45)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(244,239,230,0.2)"}
          >View the Menu</Link>
        </div>
      </section>
    </main>
  );
}
