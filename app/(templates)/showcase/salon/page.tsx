"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import { T, SERIF, SANS, EASE, BASE, BRAND, SERVICES, TEAM, TESTIMONIALS, GALLERY, TICKER_ITEMS } from "./lib/data";

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

function Label({ text }: { text: string }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "0.6rem",
      marginBottom: "1.25rem",
    }}>
      <div style={{ width: 18, height: 1, background: T.amber }} />
      <span style={{
        fontFamily: SANS, fontSize: "0.56rem", fontWeight: 600,
        letterSpacing: "0.28em", textTransform: "uppercase", color: T.amber,
      }}>{text}</span>
    </div>
  );
}

function ServiceCard({ s, index }: { s: typeof SERVICES[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      style={{ cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        overflow: "hidden", aspectRatio: "3/4", marginBottom: "1.5rem",
        background: "#111",
      }}>
        <img
          src={s.img}
          alt={s.name}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: `transform 700ms ${EASE}`,
          }}
        />
      </div>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        marginBottom: "0.6rem",
      }}>
        <h3 style={{
          fontFamily: SERIF, fontSize: "1.5rem", fontWeight: 500, fontStyle: "italic",
          color: T.cream, letterSpacing: "0.01em",
        }}>{s.name}</h3>
        <span style={{
          fontFamily: SANS, fontSize: "0.7rem", fontWeight: 500,
          color: T.amber, letterSpacing: "0.1em",
        }}>from {s.from}</span>
      </div>
      <p style={{
        fontFamily: SANS, fontSize: "0.8rem", color: T.textMd, lineHeight: 1.8, marginBottom: "1.25rem",
      }}>{s.desc}</p>
      <Link href={`${BASE}/services#${s.slug}`} style={{
        display: "inline-flex", alignItems: "center", gap: "0.5rem",
        fontFamily: SANS, fontSize: "0.62rem", fontWeight: 600,
        letterSpacing: "0.2em", textTransform: "uppercase", color: T.cream,
        opacity: 0.7, transition: `opacity 200ms, gap 200ms`,
      }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.gap = "0.9rem"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; (e.currentTarget as HTMLElement).style.gap = "0.5rem"; }}
      >
        View Prices
        <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </Link>
    </motion.div>
  );
}

export default function SalonHomepage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(heroP, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroP, [0, 0.6], [1, 0]);

  const { ref: svcRef,  inView: svcIn  } = useReveal();
  const { ref: teamRef, inView: teamIn } = useReveal();
  const { ref: tstRef,  inView: tstIn  } = useReveal();

  const allTickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <main>

      {/* ── HERO ── */}
      <div ref={heroRef} style={{ position: "relative", height: "100dvh", overflow: "hidden", minHeight: 600 }}>

        {/* Parallax image */}
        <motion.div style={{ position: "absolute", inset: "-15% 0", y: heroImgY }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url("https://images.unsplash.com/photo-1560869713-7d0a29430803?w=1600&q=80")`,
            backgroundSize: "cover", backgroundPosition: "center 20%",
          }} />
        </motion.div>

        {/* Layered overlays */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(11,21,18,0.88) 0%, rgba(11,21,18,0.55) 55%, rgba(11,21,18,0.2) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,21,18,0) 50%, rgba(11,21,18,0.95) 100%)" }} />

        {/* Hero content */}
        <motion.div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          justifyContent: "flex-end", padding: "0 2.5rem 6rem",
          maxWidth: 1320, margin: "0 auto", left: 0, right: 0,
          opacity: heroOpacity,
        }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" }}
          >
            <div style={{ width: 32, height: 1, background: T.amber }} />
            <span style={{
              fontFamily: SANS, fontSize: "0.6rem", fontWeight: 500,
              letterSpacing: "0.3em", textTransform: "uppercase", color: T.amber,
            }}>Marylebone, London</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(3.5rem, 9vw, 8rem)",
              fontWeight: 500, fontStyle: "italic",
              color: T.cream, lineHeight: 1.0,
              letterSpacing: "-0.01em",
              marginBottom: "1.5rem", maxWidth: 820,
            }}
          >
            Hair as<br />artistry.
          </motion.h1>

          {/* Subline + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{ display: "flex", flexWrap: "wrap", gap: "1rem 2.5rem", alignItems: "center" }}
          >
            <p style={{
              fontFamily: SANS, fontSize: "0.9rem", color: T.cream,
              opacity: 0.7, lineHeight: 1.7, maxWidth: 360,
              flexBasis: "100%",
            }}>
              Precision colour, expert cutting, and restorative treatments — all crafted for how you actually live.
            </p>
            <Link href={`${BASE}/book`} style={{
              fontFamily: SANS, fontSize: "0.65rem", fontWeight: 600,
              letterSpacing: "0.22em", textTransform: "uppercase",
              padding: "0.9rem 2rem", background: T.amber, color: T.bg,
              display: "inline-block",
              transition: `background 250ms ${EASE}`,
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.amberLt}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.amber}
            >Book Appointment</Link>
            <Link href={`${BASE}/services`} style={{
              fontFamily: SANS, fontSize: "0.65rem", fontWeight: 500,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: T.cream, opacity: 0.6,
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              transition: `opacity 200ms`,
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "0.6"}
            >
              Our Services
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 4h10M7 1l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            position: "absolute", right: "2.5rem", bottom: "3rem",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
          }}
        >
          <span style={{ fontFamily: SANS, fontSize: "0.5rem", letterSpacing: "0.3em", textTransform: "uppercase", color: T.cream, opacity: 0.35, writingMode: "vertical-rl" }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{ width: 1, height: 40, background: `linear-gradient(${T.amber}, transparent)` }}
          />
        </motion.div>
      </div>

      {/* ── TICKER (SIGNATURE ELEMENT) ── */}
      <div style={{
        background: T.amber, overflow: "hidden", padding: "0.85rem 0",
        borderTop: `1px solid rgba(0,0,0,0.1)`,
      }}>
        <div style={{
          display: "flex", whiteSpace: "nowrap",
          animation: "mnTicker 28s linear infinite",
        }}>
          {allTickerItems.map((item, i) => (
            <span key={i} style={{
              fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 500, fontStyle: "italic",
              color: T.bg, paddingRight: "0",
              display: "inline-flex", alignItems: "center",
            }}>
              {item}
              <span style={{
                display: "inline-block", width: 5, height: 5, background: T.bg,
                borderRadius: "50%", margin: "0 2rem", opacity: 0.35,
                flexShrink: 0,
              }} />
            </span>
          ))}
        </div>
      </div>

      {/* ── PHILOSOPHY ── */}
      <section style={{ padding: "7rem 2.5rem", background: T.bgPanel }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "5rem", alignItems: "start" }} className="mn-2col">
            <div>
              <Label text="Our Approach" />
              <h2 style={{
                fontFamily: SERIF, fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 500, fontStyle: "italic",
                color: T.cream, lineHeight: 1.2,
              }}>
                No two heads of<br />hair are the same.
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2.5rem" }}>
              {[
                { num: "I",   title: "Consult",   body: "Every appointment begins with a genuine conversation — about your hair history, your life, and how much time you have on a Tuesday morning." },
                { num: "II",  title: "Create",    body: "We work from the inside out. Colour is bespoke-mixed for your skin tone. Cuts are shaped around your natural growth patterns." },
                { num: "III", title: "Maintain",  body: "We tell you honestly what your hair needs. A good salon relationship is one that saves you money in the long run." },
              ].map((p, i) => (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    paddingTop: "1.5rem",
                    borderTop: `1px solid ${T.border}`,
                  }}
                >
                  <div style={{
                    fontFamily: SERIF, fontSize: "0.75rem", fontStyle: "italic",
                    color: T.amber, marginBottom: "0.5rem",
                  }}>{p.num}</div>
                  <h3 style={{
                    fontFamily: SERIF, fontSize: "1.1rem", fontWeight: 600,
                    color: T.cream, marginBottom: "0.75rem",
                  }}>{p.title}</h3>
                  <p style={{ fontFamily: SANS, fontSize: "0.78rem", color: T.textMd, lineHeight: 1.85 }}>{p.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ padding: "7rem 2.5rem", background: T.bgLight }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
                <div style={{ width: 18, height: 1, background: "#8A6428" }} />
                <span style={{ fontFamily: SANS, fontSize: "0.56rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#8A6428" }}>Services</span>
              </div>
              <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, fontStyle: "italic", color: T.textDk, lineHeight: 1.15 }}>
                What we do.
              </h2>
            </div>
            <Link href={`${BASE}/services`} style={{
              fontFamily: SANS, fontSize: "0.62rem", fontWeight: 600,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "#8A6428", display: "inline-flex", alignItems: "center", gap: "0.5rem",
              transition: "gap 200ms",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.gap = "1rem"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.gap = "0.5rem"}
            >
              Full Price List
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
          <div ref={svcRef} className="mn-svc-grid" style={{ gap: "3rem" }}>
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.slug} s={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ── */}
      <section style={{ padding: "7rem 2.5rem" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <Label text="Our Work" />
              <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, fontStyle: "italic", color: T.cream, lineHeight: 1.15 }}>
                Recent work.
              </h2>
            </div>
            <Link href={`${BASE}/gallery`} style={{
              fontFamily: SANS, fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.2em",
              textTransform: "uppercase", color: T.amber, display: "inline-flex", alignItems: "center", gap: "0.5rem",
              transition: "gap 200ms",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.gap = "1rem"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.gap = "0.5rem"}
            >
              View All
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>

          {/* Asymmetric gallery — 2 large + 4 smaller */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gridTemplateRows: "auto auto", gap: "0.75rem" }}>
            {GALLERY.slice(0, 5).map((g, i) => {
              const isHero = i === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, delay: i * 0.07 }}
                  style={{
                    gridRow: isHero ? "1 / 3" : "auto",
                    overflow: "hidden", position: "relative", cursor: "pointer",
                    aspectRatio: isHero ? "auto" : "1 / 1",
                    background: T.bgMd,
                  }}
                >
                  <div style={{ height: isHero ? "100%" : "auto", minHeight: isHero ? 480 : "auto" }}>
                    <img
                      src={g.img}
                      alt={g.label}
                      style={{
                        width: "100%", height: "100%", objectFit: "cover",
                        transition: `transform 600ms ${EASE}`,
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"}
                      onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"}
                    />
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(180deg, transparent 50%, rgba(11,21,18,0.7) 100%)",
                      display: "flex", alignItems: "flex-end", padding: "1.25rem",
                    }}>
                      <span style={{ fontFamily: SERIF, fontSize: "0.85rem", fontStyle: "italic", color: T.cream, opacity: 0.9 }}>{g.label}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ padding: "7rem 2.5rem", background: T.bgLight }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
              <div style={{ width: 18, height: 1, background: "#8A6428" }} />
              <span style={{ fontFamily: SANS, fontSize: "0.56rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#8A6428" }}>The Team</span>
              <div style={{ width: 18, height: 1, background: "#8A6428" }} />
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, fontStyle: "italic", color: T.textDk, lineHeight: 1.15 }}>
              Practitioners, not just stylists.
            </h2>
          </div>
          <div ref={teamRef} className="mn-team-grid" style={{ gap: "2.5rem" }}>
            {TEAM.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 24 }}
                animate={teamIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
              >
                <div style={{ overflow: "hidden", aspectRatio: "4/5", marginBottom: "1.5rem", background: "#ddd" }}>
                  <img
                    src={m.img} alt={m.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top",
                      transition: `transform 600ms ${EASE}`,
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"}
                    onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"}
                  />
                </div>
                <div style={{ paddingTop: "0.25rem", borderTop: `1px solid ${T.borderDk}` }}>
                  <div style={{ fontFamily: SANS, fontSize: "0.56rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8A6428", marginBottom: "0.35rem", marginTop: "0.75rem" }}>{m.specialty}</div>
                  <h3 style={{ fontFamily: SERIF, fontSize: "1.3rem", fontWeight: 600, color: T.textDk, marginBottom: "0.25rem" }}>{m.name}</h3>
                  <p style={{ fontFamily: SANS, fontSize: "0.72rem", color: T.textDkMd, lineHeight: 1.7 }}>{m.title}</p>
                  <p style={{ fontFamily: SANS, fontSize: "0.68rem", color: T.textDkMd, opacity: 0.65, marginTop: "0.4rem", lineHeight: 1.7 }}>{m.credential}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "7rem 2.5rem", background: T.bgPanel }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Label text="Client Stories" />
          <div ref={tstRef} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2rem" }} className="mn-team-grid">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={tstIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  padding: "2.5rem 2rem",
                  border: `1px solid ${T.border}`,
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <div style={{ fontFamily: SERIF, fontSize: "3rem", color: T.amber, opacity: 0.2, lineHeight: 1, marginBottom: "0.5rem", userSelect: "none" }}>"</div>
                <p style={{ fontFamily: SERIF, fontSize: "1rem", fontStyle: "italic", color: T.cream, lineHeight: 1.8, marginBottom: "1.75rem" }}>{t.quote}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: 20, height: 1, background: T.amber }} />
                  <div>
                    <div style={{ fontFamily: SANS, fontSize: "0.72rem", fontWeight: 600, color: T.cream }}>{t.author}</div>
                    <div style={{ fontFamily: SANS, fontSize: "0.62rem", color: T.amber, marginTop: "0.1rem" }}>{t.context}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: "8rem 2.5rem", background: T.bg, textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Subtle amber glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600, height: 600,
          background: `radial-gradient(circle, rgba(201,151,58,0.07) 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          style={{ position: "relative" }}
        >
          <Label text="Ready?" />
          <h2 style={{
            fontFamily: SERIF,
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 500, fontStyle: "italic",
            color: T.cream, lineHeight: 1.1, marginBottom: "1.5rem",
          }}>
            Book your appointment.
          </h2>
          <p style={{ fontFamily: SANS, fontSize: "0.88rem", color: T.textMd, lineHeight: 1.75, marginBottom: "2.5rem", maxWidth: 460, margin: "0 auto 2.5rem" }}>
            All new clients receive a complimentary 15-minute consultation before their first appointment.
          </p>
          <Link href={`${BASE}/book`} style={{
            fontFamily: SANS, fontSize: "0.68rem", fontWeight: 600,
            letterSpacing: "0.22em", textTransform: "uppercase",
            padding: "1rem 2.5rem", background: T.amber, color: T.bg,
            display: "inline-block",
            transition: `background 250ms ${EASE}`,
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.amberLt}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.amber}
          >Book Now →</Link>
        </motion.div>
      </section>

    </main>
  );
}
