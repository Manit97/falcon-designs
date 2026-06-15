"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { T, SERIF, SANS, EASE, BASE, SERVICES, TICKER_ITEMS } from "../lib/data";

function Label({ text, dark = false }: { text: string; dark?: boolean }) {
  const color = dark ? "#8A6428" : T.amber;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
      <div style={{ width: 18, height: 1, background: color }} />
      <span style={{ fontFamily: SANS, fontSize: "0.56rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color }}>{text}</span>
    </div>
  );
}

const FAQS = [
  { q: "Do I need to book a consultation first?", a: "All new clients receive a complimentary 15-minute consultation at the start of their first appointment, so we can discuss your hair history, goals, and any concerns before we begin." },
  { q: "How far in advance should I book?", a: "We recommend booking 2–3 weeks ahead for colour services, and 1–2 weeks for cuts. We do hold a small number of same-week appointments — call us to check availability." },
  { q: "What should I do to prepare for a colour appointment?", a: "Come with your hair in its natural, unwashed state (1–2 days unwashed is ideal). Avoid heavy product use. Bring reference images if you have them — the more visual, the better." },
  { q: "Do you offer a patch test?", a: "Yes — all clients new to colour services at Maison Noir are required to have a patch test at least 48 hours before their first colour appointment. We can post a kit or you can visit the studio." },
  { q: "What is your cancellation policy?", a: "We ask for 48 hours' notice for cancellations or changes. Late cancellations or no-shows may incur a charge of 50% of the service value." },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const allTicker = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <main style={{ paddingTop: 68 }}>

      {/* ── PAGE HEADER ── */}
      <section style={{
        padding: "6rem 2.5rem 5rem",
        background: T.bgPanel,
        borderBottom: `1px solid ${T.border}`,
      }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <Label text="Services & Pricing" />
            <h1 style={{
              fontFamily: SERIF, fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 500, fontStyle: "italic",
              color: T.cream, lineHeight: 1.0, maxWidth: 700,
            }}>
              Everything we do,<br />and what it costs.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ background: T.amber, overflow: "hidden", padding: "0.75rem 0" }}>
        <div style={{ display: "flex", whiteSpace: "nowrap", animation: "mnTicker 26s linear infinite" }}>
          {allTicker.map((item, i) => (
            <span key={i} style={{ fontFamily: SERIF, fontSize: "1.1rem", fontStyle: "italic", color: T.bg, display: "inline-flex", alignItems: "center" }}>
              {item}
              <span style={{ display: "inline-block", width: 4, height: 4, background: T.bg, borderRadius: "50%", margin: "0 1.75rem", opacity: 0.3, flexShrink: 0 }} />
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICES DETAIL ── */}
      {SERVICES.map((s, sIdx) => (
        <section
          key={s.slug}
          id={s.slug}
          style={{
            padding: "7rem 2.5rem",
            background: sIdx % 2 === 0 ? T.bg : T.bgLight,
          }}
        >
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "5rem", alignItems: "start",
            }} className="mn-2col">

              {/* Image side */}
              <motion.div
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                style={{ position: "relative" }}
              >
                {/* Offset frame */}
                <div style={{
                  position: "absolute", top: -14, left: -14, right: 14, bottom: 14,
                  border: `1px solid ${sIdx % 2 === 0 ? T.border : "rgba(138,100,40,0.2)"}`,
                  zIndex: 0,
                }} />
                <div style={{ overflow: "hidden", aspectRatio: "3/4", position: "relative", zIndex: 1 }}>
                  <img src={s.img} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                {/* Amber tag */}
                <div style={{
                  position: "absolute", bottom: -14, right: -14, zIndex: 2,
                  background: T.amber, padding: "0.75rem 1.25rem",
                }}>
                  <div style={{ fontFamily: SERIF, fontSize: "0.9rem", fontStyle: "italic", color: T.bg, fontWeight: 600 }}>from {s.from}</div>
                </div>
              </motion.div>

              {/* Content side */}
              <motion.div
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              >
                <Label text="Services" dark={sIdx % 2 !== 0} />
                <h2 style={{
                  fontFamily: SERIF, fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                  fontWeight: 500, fontStyle: "italic",
                  color: sIdx % 2 === 0 ? T.cream : T.textDk,
                  lineHeight: 1.1, marginBottom: "1rem",
                }}>{s.name}</h2>
                <p style={{
                  fontFamily: SANS, fontSize: "0.88rem", lineHeight: 1.85,
                  color: sIdx % 2 === 0 ? T.textMd : T.textDkMd,
                  marginBottom: "2.5rem", maxWidth: 460,
                }}>{s.desc}</p>

                {/* Price list */}
                <div className="mn-price-grid" style={{ gap: "0" }}>
                  {s.items.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex", justifyContent: "space-between", alignItems: "baseline",
                        padding: "1rem 0",
                        borderBottom: `1px solid ${sIdx % 2 === 0 ? T.borderLt : T.borderDk}`,
                        gap: "1rem",
                      }}
                    >
                      <span style={{ fontFamily: SANS, fontSize: "0.82rem", color: sIdx % 2 === 0 ? T.cream : T.textDk }}>{item.name}</span>
                      <span style={{ fontFamily: SANS, fontSize: "0.78rem", color: T.amber, whiteSpace: "nowrap", fontWeight: 500 }}>{item.price}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: "2.5rem" }}>
                  <Link href={`${BASE}/book`} style={{
                    fontFamily: SANS, fontSize: "0.63rem", fontWeight: 600,
                    letterSpacing: "0.22em", textTransform: "uppercase",
                    padding: "0.85rem 1.75rem", background: T.amber, color: T.bg,
                    display: "inline-block",
                    transition: `background 250ms ${EASE}`,
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.amberLt}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.amber}
                  >Book {s.name}</Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* ── FAQ ── */}
      <section style={{ padding: "7rem 2.5rem", background: T.bgPanel }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <Label text="FAQ" />
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, fontStyle: "italic", color: T.cream, lineHeight: 1.15 }}>
              Common questions.
            </h2>
          </div>
          <div>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                style={{ borderBottom: `1px solid ${T.border}` }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%", textAlign: "left", padding: "1.5rem 0",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    gap: "2rem", cursor: "pointer",
                    background: "none", border: "none", fontFamily: "inherit",
                  }}
                >
                  <span style={{ fontFamily: SERIF, fontSize: "1.05rem", fontWeight: 500, color: T.cream, lineHeight: 1.4 }}>{faq.q}</span>
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    style={{
                      flexShrink: 0, color: T.amber,
                      transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                      transition: `transform 300ms ${EASE}`,
                    }}
                  >
                    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <div style={{
                  overflow: "hidden",
                  maxHeight: openFaq === i ? 300 : 0,
                  transition: `max-height 400ms ${EASE}`,
                }}>
                  <p style={{ fontFamily: SANS, fontSize: "0.82rem", color: T.textMd, lineHeight: 1.85, paddingBottom: "1.5rem" }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOK CTA ── */}
      <section style={{ padding: "6rem 2.5rem", textAlign: "center", background: T.bg }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem, 4vw, 3rem)", fontStyle: "italic", fontWeight: 500, color: T.cream, marginBottom: "2rem" }}>
            Ready to book?
          </h2>
          <Link href={`${BASE}/book`} style={{
            fontFamily: SANS, fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase",
            padding: "0.9rem 2.25rem", background: T.amber, color: T.bg, display: "inline-block",
            transition: `background 250ms ${EASE}`,
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.amberLt}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.amber}
          >Book Your Appointment</Link>
        </motion.div>
      </section>
    </main>
  );
}
