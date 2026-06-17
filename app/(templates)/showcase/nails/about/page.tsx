"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { C, DISPLAY, BODY, BASE, TEAM } from "../lib/data";

const EASE = [0.23,1,0.32,1] as const;

function Label({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.2rem" }}>
      <span style={{ display: "block", width: 28, height: 1, background: light ? C.roseLt : C.rose }} />
      <span style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: light ? C.roseLt : C.rose, fontWeight: 600 }}>{text}</span>
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

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0,1], ["0%", "25%"]);

  return (
    <>
      <style>{`
        .nails-about-story { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center; }
        .nails-about-values { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .nails-about-team  { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1.5rem; }
        @media (max-width: 900px) {
          .nails-about-story { grid-template-columns: 1fr; gap: 3rem; }
          .nails-about-values { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .nails-about-values { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* HERO */}
      <section ref={heroRef} style={{ position: "relative", height: "60vh", minHeight: 480, overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <motion.div style={{ position: "absolute", inset: 0, y: imgY }}>
          <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80" alt="Salon interior"
            style={{ width: "100%", height: "115%", objectFit: "cover" }} />
        </motion.div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(62,29,74,0.88) 0%, rgba(0,0,0,0.1) 60%)" }} />
        <div style={{ position: "relative", zIndex: 1, padding: "0 2.5rem 4rem", maxWidth: 1280, width: "100%", margin: "0 auto" }}>
          <Label text="Our Story" light />
          <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 300, color: "#fff", lineHeight: 1.05 }}>
            About <em style={{ fontStyle: "italic", color: C.roseLt }}>Velour</em>
          </h1>
        </div>
      </section>

      {/* STORY */}
      <section style={{ padding: "7rem 2.5rem", maxWidth: 1280, margin: "0 auto" }}>
        <div className="nails-about-story">
          <FadeUp>
            <Label text="The Beginning" />
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: C.plum, lineHeight: 1.2, marginBottom: "1.5rem" }}>
              Founded on the belief that every nail appointment should feel <em style={{ fontStyle: "italic", color: C.rose }}>exceptional</em>.
            </h2>
            <p style={{ fontFamily: BODY, fontSize: "0.92rem", lineHeight: 1.85, color: C.textMd, fontWeight: 300, marginBottom: "1.2rem" }}>
              Velour was born in 2018 from Isabelle Laurent's frustration with nail studios that treated clients as an afterthought. Having trained across London and Paris, she knew what was possible — and set out to create a space where craft and care were inseparable.
            </p>
            <p style={{ fontFamily: BODY, fontSize: "0.92rem", lineHeight: 1.85, color: C.textMd, fontWeight: 300 }}>
              Today, from our studio in Marylebone, our team of four specialist nail artists see over 400 clients each month — and every one of them leaves with something they genuinely love.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div style={{ position: "relative" }}>
              <div style={{ overflow: "hidden", borderRadius: "200px 200px 0 0" }}>
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" alt="Isabelle Laurent"
                  style={{ width: "100%", height: 480, objectFit: "cover" }} />
              </div>
              <div style={{
                position: "absolute", bottom: -20, right: -20,
                background: C.plum, color: "#fff", padding: "1.5rem 2rem",
                fontFamily: DISPLAY, fontSize: "1rem", fontStyle: "italic",
                maxWidth: 220,
              }}>
                "Every detail matters. Every time."
                <div style={{ fontFamily: BODY, fontSize: "0.65rem", fontStyle: "normal", letterSpacing: "0.12em", marginTop: "0.5rem", color: C.roseLt }}>
                  — Isabelle Laurent, Founder
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ background: C.surface, padding: "6rem 2.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <FadeUp>
            <Label text="What We Stand For" />
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: C.plum, marginBottom: "3rem", lineHeight: 1.1 }}>
              Three values that guide everything.
            </h2>
          </FadeUp>
          <div className="nails-about-values">
            {[
              { n: "01", title: "Precision", desc: "We do not rush. Every line, every coat, every finishing detail is given the attention it deserves — because that is what makes the difference between good and exceptional." },
              { n: "02", title: "Care", desc: "From the moment you arrive, you are our focus. We listen, advise, and tailor every treatment to your nails, your lifestyle, and your vision." },
              { n: "03", title: "Integrity", desc: "We use only professional-grade products. We are honest about what your nails need. We never cut corners — on product, process, or person." },
            ].map((v, i) => (
              <FadeUp key={v.n} delay={i * 0.1}>
                <div style={{ paddingTop: "2rem", borderTop: `2px solid ${C.rose}` }}>
                  <div style={{ fontFamily: DISPLAY, fontSize: "2.5rem", color: C.blush, fontWeight: 400, marginBottom: "0.5rem" }}>{v.n}</div>
                  <h3 style={{ fontFamily: BODY, fontSize: "0.78rem", fontWeight: 700, color: C.plum, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.8rem" }}>{v.title}</h3>
                  <p style={{ fontFamily: BODY, fontSize: "0.85rem", lineHeight: 1.75, color: C.textMd, fontWeight: 300 }}>{v.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section style={{ padding: "6rem 2.5rem", maxWidth: 1280, margin: "0 auto" }}>
        <FadeUp>
          <Label text="Meet the Team" />
          <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: C.plum, marginBottom: "3rem", lineHeight: 1.1 }}>
            The hands behind the work.
          </h2>
        </FadeUp>
        <div className="nails-about-team">
          {TEAM.map((m, i) => (
            <FadeUp key={m.name} delay={i * 0.08}>
              <div>
                <div style={{ overflow: "hidden", borderRadius: "200px 200px 0 0", marginBottom: "1.5rem" }}>
                  <motion.img
                    src={m.img} alt={m.name}
                    style={{ width: "100%", height: 300, objectFit: "cover", objectPosition: "center top", display: "block" }}
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.55, ease: EASE }}
                  />
                </div>
                <div style={{ fontFamily: BODY, fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.rose, marginBottom: "0.3rem" }}>{m.spec}</div>
                <h3 style={{ fontFamily: DISPLAY, fontSize: "1.4rem", fontWeight: 400, color: C.plum, marginBottom: "0.2rem" }}>{m.name}</h3>
                <div style={{ fontFamily: BODY, fontSize: "0.75rem", color: C.textLt, marginBottom: "0.8rem", letterSpacing: "0.08em" }}>{m.role}</div>
                <p style={{ fontFamily: BODY, fontSize: "0.82rem", lineHeight: 1.65, color: C.textMd, fontWeight: 300 }}>{m.bio}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* MAP + CONTACT */}
      <section style={{ background: C.plum, padding: "6rem 2.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "5rem", alignItems: "start" }}>
            <FadeUp>
              <Label text="Find Us" light />
              <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: "#fff", lineHeight: 1.2, marginBottom: "2rem" }}>
                In the heart<br />of <em style={{ fontStyle: "italic", color: C.roseLt }}>Marylebone</em>.
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[
                  { icon: "📍", label: "Address", value: "24 Marylebone Lane\nLondon W1U 2PT" },
                  { icon: "🕐", label: "Hours", value: "Mon–Sat: 9:00am – 7:00pm\nSunday: 10:00am – 5:00pm" },
                  { icon: "✉️", label: "Contact", value: "hello@velourbynails.com\n+44 (0)20 7946 0123" },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", gap: "1rem" }}>
                    <div style={{ fontFamily: DISPLAY, fontSize: "1rem", flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontFamily: BODY, fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.roseLt, marginBottom: "0.3rem" }}>{item.label}</div>
                      <div style={{ fontFamily: BODY, fontSize: "0.85rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.65, whiteSpace: "pre-line", fontWeight: 300 }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href={`${BASE}/book`} style={{
                display: "inline-block", marginTop: "2.5rem",
                fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase",
                fontWeight: 600, color: C.plum, background: "#fff", padding: "1rem 2.2rem",
              }}>
                Book Now
              </Link>
            </FadeUp>

            {/* OpenStreetMap embed */}
            <FadeUp delay={0.1}>
              <div style={{ overflow: "hidden", borderRadius: 4 }}>
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1565%2C51.5155%2C-0.1465%2C51.5205&layer=mapnik&marker=51.5180%2C-0.1515"
                  width="100%"
                  height="400"
                  style={{ border: 0, display: "block", filter: "saturate(0.7) hue-rotate(290deg) brightness(0.85)" }}
                  loading="lazy"
                  title="Velour Nails Studio location"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
