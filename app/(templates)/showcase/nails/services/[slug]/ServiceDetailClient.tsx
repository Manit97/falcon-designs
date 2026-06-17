"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { C, DISPLAY, BODY, BASE, SERVICES } from "../../lib/data";

const EASE = [0.23,1,0.32,1] as const;

type Service = (typeof SERVICES)[number];

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

export default function ServiceDetailClient({ service: s }: { service: Service }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0,1], ["0%", "25%"]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <style>{`
        .nails-pricing-card { padding: 2rem; border: 1px solid ${C.border}; background: ${C.white}; transition: border-color 0.2s ease, box-shadow 0.2s ease; cursor: default; }
        .nails-pricing-card:hover { border-color: ${C.rose}; box-shadow: 0 4px 24px rgba(192,84,114,0.1); }
        .nails-faq-item { border-bottom: 1px solid ${C.border}; }
        .nails-faq-q { width: 100%; background: none; border: none; padding: 1.5rem 0; cursor: pointer; display: flex; justify-content: space-between; align-items: center; text-align: left; }
        .nails-svc-detail-grid { display: grid; grid-template-columns: 1fr 380px; gap: 5rem; align-items: start; }
        @media (max-width: 900px) { .nails-svc-detail-grid { grid-template-columns: 1fr; gap: 3rem; } }
      `}</style>

      {/* HERO */}
      <section ref={heroRef} style={{ position: "relative", height: "65vh", minHeight: 480, overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <motion.div style={{ position: "absolute", inset: 0, y: imgY }}>
          <img src={s.heroImg} alt={s.name} style={{ width: "100%", height: "115%", objectFit: "cover", objectPosition: "center top" }} />
        </motion.div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(62,29,74,0.85) 0%, rgba(0,0,0,0.15) 60%)" }} />
        <div style={{ position: "relative", zIndex: 1, padding: "0 2.5rem 4rem", maxWidth: 1280, width: "100%", margin: "0 auto" }}>
          <Link href={`${BASE}/services`} style={{ fontFamily: BODY, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "1.5rem" }}>
            ← All Services
          </Link>
          <div style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.roseLt, marginBottom: "0.75rem" }}>
            From {s.from} · {s.duration}
          </div>
          <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 300, color: "#fff", lineHeight: 1.05, marginBottom: "0.5rem" }}>
            {s.name}
          </h1>
          <p style={{ fontFamily: DISPLAY, fontSize: "1.3rem", fontStyle: "italic", color: C.roseLt }}>{s.tagline}</p>
        </div>
      </section>

      {/* BODY */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 2.5rem" }}>
        <div className="nails-svc-detail-grid">
          <div>
            <FadeUp>
              <Label text="About" />
              <p style={{ fontFamily: BODY, fontSize: "1rem", lineHeight: 1.85, color: C.textMd, fontWeight: 300, marginBottom: "3.5rem" }}>{s.desc}</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <Label text="What's Included" />
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "3.5rem" }}>
                {s.includes.map(inc => (
                  <div key={inc} style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.rose, flexShrink: 0 }} />
                    <span style={{ fontFamily: BODY, fontSize: "0.88rem", color: C.text, fontWeight: 400 }}>{inc}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.12}>
              <Label text="The Process" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "3.5rem" }}>
                {s.process.map(p => (
                  <div key={p.num} style={{ padding: "1.5rem", background: C.surface, borderLeft: `3px solid ${C.rose}` }}>
                    <div style={{ fontFamily: DISPLAY, fontSize: "1.8rem", color: C.blush, fontWeight: 400, lineHeight: 1 }}>{p.num}</div>
                    <div style={{ fontFamily: BODY, fontSize: "0.78rem", fontWeight: 600, color: C.plum, margin: "0.5rem 0 0.3rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>{p.title}</div>
                    <div style={{ fontFamily: BODY, fontSize: "0.82rem", color: C.textMd, lineHeight: 1.6, fontWeight: 300 }}>{p.desc}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.14}>
              <Label text="FAQs" />
              <div>
                {s.faqs.map((f, i) => (
                  <div key={i} className="nails-faq-item">
                    <button className="nails-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      <span style={{ fontFamily: BODY, fontSize: "0.9rem", fontWeight: 500, color: C.plum }}>{f.q}</span>
                      <span style={{ fontFamily: BODY, fontSize: "1.2rem", color: C.rose, transition: "transform 0.3s ease", transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                    </button>
                    <motion.div initial={false}
                      animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }} style={{ overflow: "hidden" }}>
                      <div style={{ paddingBottom: "1.5rem" }}>
                        <p style={{ fontFamily: BODY, fontSize: "0.85rem", lineHeight: 1.7, color: C.textMd, fontWeight: 300 }}>{f.a}</p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Right sticky */}
          <div style={{ position: "sticky", top: 100 }}>
            <FadeUp delay={0.05}>
              <div style={{ marginBottom: "2rem" }}><Label text="Pricing" /></div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "2rem" }}>
                {s.pricing.map(p => (
                  <div key={p.name} className="nails-pricing-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                      <span style={{ fontFamily: BODY, fontSize: "0.88rem", fontWeight: 600, color: C.plum }}>{p.name}</span>
                      <span style={{ fontFamily: DISPLAY, fontSize: "1.4rem", fontWeight: 400, color: C.rose }}>{p.price}</span>
                    </div>
                    <p style={{ fontFamily: BODY, fontSize: "0.78rem", color: C.textMd, fontWeight: 300 }}>{p.desc}</p>
                  </div>
                ))}
              </div>
              <Link href={`${BASE}/book`} style={{ display: "block", textAlign: "center", fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: C.white, background: C.rose, padding: "1.1rem" }}>
                Book This Service
              </Link>
              <Link href={`${BASE}/services`} style={{ display: "block", textAlign: "center", marginTop: "0.75rem", fontFamily: BODY, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.textMd, border: `1px solid ${C.border}`, padding: "0.9rem" }}>
                View All Services
              </Link>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* Related */}
      <section style={{ background: C.surface, padding: "5rem 2.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Label text="You May Also Like" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))", gap: "1.2rem", marginTop: "0.5rem" }}>
            {SERVICES.filter(x => x.slug !== s.slug).slice(0, 4).map((rel, i) => (
              <FadeUp key={rel.slug} delay={i * 0.07}>
                <Link href={`${BASE}/services/${rel.slug}`} style={{ display: "block", background: C.white, overflow: "hidden" }}>
                  <div style={{ overflow: "hidden", borderRadius: "120px 120px 0 0", margin: "1rem 1rem 0" }}>
                    <img src={rel.img} alt={rel.name} style={{ width: "100%", height: 160, objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "1rem 1rem 1.2rem" }}>
                    <div style={{ fontFamily: BODY, fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.rose, marginBottom: "0.4rem" }}>From {rel.from}</div>
                    <div style={{ fontFamily: DISPLAY, fontSize: "1.2rem", color: C.plum }}>{rel.name}</div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
