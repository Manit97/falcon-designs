"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { TEAM, STATS, ACCREDITATIONS, BASE, T, SERIF, SANS, EASE } from "../lib/data";

function Label({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.25rem" }}>
      <div style={{ width: 28, height: 1, background: T.gold }} />
      <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: T.gold }}>{text}</span>
    </div>
  );
}

function TeamCard({ member, index }: { member: typeof TEAM[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px 0px" });
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Portrait */}
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "3/4", marginBottom: "1.25rem" }}>
        <img
          src={member.img}
          alt={member.name}
          style={{
            width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block",
            transform: hov ? "scale(1.04)" : "scale(1)",
            transition: `transform 650ms ${EASE}`,
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: hov ? "rgba(15,13,10,0.18)" : "rgba(15,13,10,0)", transition: "background 400ms" }} />
        {/* Gold base bar reveal */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: T.gold,
          transform: hov ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left",
          transition: `transform 420ms ${EASE}`,
        }} />
      </div>

      <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: T.gold, marginBottom: "0.3rem" }}>{member.area}</div>
      <h3 style={{ fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 600, color: T.text, marginBottom: "0.2rem" }}>{member.name}</h3>
      <p style={{ fontSize: "0.78rem", color: T.textMd, marginBottom: "0.9rem" }}>{member.role}</p>
      <p style={{ fontSize: "0.78rem", color: T.textLt, lineHeight: 1.78, marginBottom: "1rem" }}>{member.bio}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        {member.quals.map(q => (
          <div key={q} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
            <div style={{ width: 3, height: 3, borderRadius: "50%", background: T.gold, flexShrink: 0, marginTop: "0.5rem" }} />
            <span style={{ fontSize: "0.7rem", color: T.textLt, lineHeight: 1.5 }}>{q}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);

  const storyRef = useRef<HTMLDivElement>(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-60px 0px" });
  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-60px 0px" });
  const accredRef = useRef<HTMLDivElement>(null);
  const accredInView = useInView(accredRef, { once: true, margin: "-40px 0px" });

  return (
    <main style={{ background: T.bg, fontFamily: SANS, color: T.text }}>

      {/* ── HERO ── */}
      <div style={{ position: "relative", height: "60vh", minHeight: 460, overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <motion.div style={{ position: "absolute", inset: "-20%", y: heroY }}>
          <img
            src="https://images.unsplash.com/photo-1629909615184-74f495363b67?w=1600&q=85"
            alt="Lumière clinic"
            style={{ width: "100%", height: "140%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,13,10,0.94) 15%, rgba(15,13,10,0.42) 100%)" }} />
        </motion.div>
        <div style={{ position: "absolute", top: 0, left: 0, width: 1, height: "45%", background: `linear-gradient(${T.gold}, transparent)` }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem 4.5rem", width: "100%" }}>
          <Label text="The Firm" />
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontFamily: SERIF, fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: 500, color: T.textInv, lineHeight: 1.08, maxWidth: 640 }}
          >
            About Lumière
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "1rem", color: "rgba(250,248,245,0.65)", maxWidth: 500, marginTop: "0.75rem" }}
          >
            A decade of trust, built one client at a time.
          </motion.p>
        </div>
      </div>

      {/* ── STORY ── */}
      <section style={{ overflow: "hidden" }}>
        <div ref={storyRef} className="lm-about-grid lm-px" style={{ maxWidth: 1280, margin: "0 auto", padding: "7rem 2.5rem", gap: "6rem", alignItems: "center" }}>
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={storyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          >
            <Label text="Our Story" />
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 500, color: T.text, lineHeight: 1.2, marginBottom: "1.5rem" }}>
              Built on principle,<br /><em style={{ color: T.gold }}>driven by science.</em>
            </h2>
            <p style={{ fontSize: "0.9rem", color: T.textMd, lineHeight: 1.9, marginBottom: "1rem" }}>
              Lumière was founded in 2014 by Dr. Sophie Marchand, following her training at the Hôpital Saint-Louis in Paris and the Royal College of Surgeons in London. What began as a two-room consultation suite on Harley Street has grown into one of the UK's most respected independent aesthetic clinics.
            </p>
            <p style={{ fontSize: "0.9rem", color: T.textMd, lineHeight: 1.9, marginBottom: "2rem" }}>
              We have never sought to be the largest clinic in London. We have sought to be the most trusted — and to ensure that every client leaves feeling, and looking, like the best version of themselves.
            </p>

            {/* Inline stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              {STATS.map(s => (
                <div key={s.label} style={{ borderLeft: `2px solid ${T.gold}`, paddingLeft: "1rem" }}>
                  <div style={{ fontFamily: SERIF, fontSize: "1.8rem", fontWeight: 600, color: T.gold, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textMd, marginTop: "0.25rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={storyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            style={{ position: "relative" }}
          >
            <div style={{ position: "absolute", top: -16, right: -16, bottom: 16, left: 16, border: `1px solid ${T.border}` }} />
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80"
              alt="Dr. Marchand at Lumière"
              style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block", position: "relative", zIndex: 1 }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── MISSION QUOTE ── */}
      <section style={{ background: T.bgDk, padding: "6rem 2.5rem", textAlign: "center", borderTop: `1px solid rgba(184,149,106,0.12)` }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ width: 1, height: 40, background: `linear-gradient(${T.gold}, transparent)`, margin: "0 auto 2rem" }} />
          <blockquote style={{ fontFamily: SERIF, fontSize: "clamp(1.4rem,3vw,2.2rem)", fontStyle: "italic", fontWeight: 500, color: T.textInv, lineHeight: 1.6, marginBottom: "1.5rem" }}>
            "The best aesthetic treatment is one nobody can see — not because nothing was done, but because everything was done with extraordinary precision."
          </blockquote>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
            <div style={{ width: 28, height: 1, background: T.gold }} />
            <span style={{ fontSize: "0.72rem", fontWeight: 600, color: T.gold, letterSpacing: "0.08em" }}>Dr. Sophie Marchand, Founder</span>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section ref={valuesRef} style={{ background: T.bgMd, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: "6rem 2.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <Label text="What We Stand For" />
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 500, color: T.text }}>Our Values</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0" }}>
            {[
              { num: "01", title: "Evidence",    body: "Every protocol we offer is grounded in peer-reviewed clinical evidence. We do not follow trends; we follow outcomes." },
              { num: "02", title: "Precision",   body: "Excellence in aesthetic medicine is a matter of millimetres. We train relentlessly to ensure every treatment is exact." },
              { num: "03", title: "Naturality",  body: "Our results philosophy is simple: enhancement that looks entirely like you, on the best day of your life." },
              { num: "04", title: "Discretion",  body: "We are trusted with the most personal concerns of our clients. That trust is sacred and handled with absolute care." },
            ].map((v, i) => (
              <motion.div
                key={v.num}
                initial={{ opacity: 0, y: 20 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                style={{ padding: "2.5rem 2rem", borderRight: i < 3 ? `1px solid ${T.border}` : "none" }}
              >
                <div style={{ fontFamily: SERIF, fontSize: "2.5rem", fontWeight: 600, color: T.gold, opacity: 0.25, lineHeight: 1, marginBottom: "1rem" }}>{v.num}</div>
                <h3 style={{ fontFamily: SERIF, fontSize: "1.2rem", fontWeight: 600, color: T.text, marginBottom: "0.65rem" }}>{v.title}</h3>
                <p style={{ fontSize: "0.8rem", color: T.textMd, lineHeight: 1.82 }}>{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" style={{ padding: "7rem 2.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <Label text="The People" />
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, color: T.text, marginBottom: "0.75rem" }}>Meet the team</h2>
            <p style={{ fontSize: "0.88rem", color: T.textMd, maxWidth: 440, margin: "0 auto" }}>
              Our practitioners are recognised as leaders in their respective disciplines — combining clinical excellence with an uncompromising aesthetic sensibility.
            </p>
          </div>
          <div className="lm-team-grid" style={{ gap: "2.5rem" }}>
            {TEAM.map((m, i) => <TeamCard key={m.name} member={m} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── ACCREDITATIONS ── */}
      <section ref={accredRef} style={{ background: T.bgMd, borderTop: `1px solid ${T.border}`, padding: "5rem 2.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.26em", textTransform: "uppercase", color: T.textLt, marginBottom: "2.5rem" }}>
            Regulated & Recognised
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem" }}>
            {ACCREDITATIONS.map((a, i) => (
              <motion.div
                key={a}
                initial={{ opacity: 0 }}
                animate={accredInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                style={{ padding: "0.65rem 1.4rem", border: `1px solid ${T.border}`, fontSize: "0.72rem", fontWeight: 500, color: T.textMd, letterSpacing: "0.04em" }}
              >{a}</motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "6rem 2.5rem", background: T.bgDk, textAlign: "center", borderTop: `1px solid rgba(184,149,106,0.12)` }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <Label text="Ready to Begin?" />
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 500, color: T.textInv, marginBottom: "1rem", lineHeight: 1.2 }}>
            Book your complimentary consultation.
          </h2>
          <p style={{ fontSize: "0.85rem", color: T.textLt, lineHeight: 1.8, marginBottom: "2rem" }}>
            Every Lumière journey begins with a complimentary skin analysis and treatment consultation. No obligation — just honest, expert guidance.
          </p>
          <Link href={`${BASE}/book`} style={{
            display: "inline-block", padding: "0.9rem 2.5rem",
            background: T.gold, color: T.bgDk,
            fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em",
            textTransform: "uppercase", textDecoration: "none",
            transition: `background 200ms ${EASE}`,
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.goldLt}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.gold}
          >Book Now</Link>
        </div>
      </section>

    </main>
  );
}
