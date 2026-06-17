"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { C, DISPLAY, BODY, BASE, SERVICES } from "../lib/data";

const EASE = [0.23,1,0.32,1] as const;

function Label({ text }: { text: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.2rem" }}>
      <span style={{ display: "block", width: 28, height: 1, background: C.rose }} />
      <span style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.rose, fontWeight: 600 }}>{text}</span>
    </div>
  );
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE, delay }}>
      {children}
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <style>{`
        .nails-svc-card { display: flex; background: ${C.white}; overflow: hidden; transition: box-shadow 0.3s ease; cursor: pointer; }
        .nails-svc-card:hover { box-shadow: 0 8px 40px rgba(62,29,74,0.1); }
        @media (max-width: 700px) { .nails-svc-card { flex-direction: column; } }
      `}</style>

      {/* Hero */}
      <section style={{ background: C.plum, padding: "6rem 2.5rem 5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Label text="What We Do" />
          <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(2.8rem, 7vw, 6rem)", fontWeight: 300, color: "#fff", lineHeight: 1.05 }}>
            Our <em style={{ fontStyle: "italic", color: C.roseLt }}>Services</em>
          </h1>
          <p style={{ fontFamily: BODY, fontSize: "0.95rem", color: "rgba(255,255,255,0.65)", maxWidth: 480, lineHeight: 1.75, marginTop: "1.5rem", fontWeight: 300 }}>
            From a classic coat of colour to intricate hand-painted nail art — every treatment is performed with the same standard of precision and care.
          </p>
        </div>
      </section>

      {/* Service list */}
      <section style={{ padding: "5rem 2.5rem", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {SERVICES.map((s, i) => (
            <FadeUp key={s.slug} delay={i * 0.06}>
              <Link href={`${BASE}/services/${s.slug}`} style={{ display: "block" }}>
                <div className="nails-svc-card">
                  {/* image */}
                  <div style={{ flexShrink: 0, width: 280, overflow: "hidden" }}>
                    <motion.img
                      src={s.img} alt={s.name}
                      style={{ width: "100%", height: "100%", minHeight: 220, objectFit: "cover", display: "block" }}
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.55, ease: EASE }}
                    />
                  </div>
                  {/* content */}
                  <div style={{ padding: "2.5rem 3rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div style={{ display: "flex", gap: "1.5rem", marginBottom: "0.8rem", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: BODY, fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.rose, fontWeight: 600 }}>From {s.from}</span>
                      <span style={{ fontFamily: BODY, fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.textLt }}>·</span>
                      <span style={{ fontFamily: BODY, fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.textLt }}>{s.duration}</span>
                    </div>
                    <h2 style={{ fontFamily: DISPLAY, fontSize: "2rem", fontWeight: 400, color: C.plum, marginBottom: "0.6rem" }}>{s.name}</h2>
                    <p style={{ fontFamily: DISPLAY, fontSize: "1.1rem", fontStyle: "italic", color: C.rose, marginBottom: "1rem" }}>{s.tagline}</p>
                    <p style={{ fontFamily: BODY, fontSize: "0.85rem", lineHeight: 1.7, color: C.textMd, fontWeight: 300, maxWidth: 520 }}>{s.desc}</p>
                    <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {s.includes.slice(0, 3).map(inc => (
                        <span key={inc} style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.1em", color: C.mauve, background: C.blush, padding: "0.3rem 0.8rem" }}>
                          {inc}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* arrow */}
                  <div style={{ display: "flex", alignItems: "center", padding: "0 2rem", flexShrink: 0 }}>
                    <span style={{ fontFamily: BODY, fontSize: "1.2rem", color: C.rose }}>→</span>
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: C.surface, padding: "5rem 2.5rem", textAlign: "center" }}>
        <Label text="Ready?" />
        <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: C.plum, marginBottom: "1.5rem" }}>
          Not sure which service to choose?
        </h2>
        <p style={{ fontFamily: BODY, fontSize: "0.88rem", color: C.textMd, maxWidth: 400, margin: "0 auto 2rem", lineHeight: 1.7, fontWeight: 300 }}>
          Book a complimentary consultation and our team will recommend the perfect treatment for you.
        </p>
        <Link href={`${BASE}/book`} style={{
          fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase",
          fontWeight: 600, color: C.white, background: C.rose, padding: "1rem 2.5rem", display: "inline-block",
        }}>
          Book Free Consultation
        </Link>
      </section>
    </>
  );
}
