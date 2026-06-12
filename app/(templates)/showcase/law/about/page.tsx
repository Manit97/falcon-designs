"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { TEAM, ACCREDITATIONS, STATS, BASE, T, SERIF, SANS, EASE } from "../lib/data";
import { useCountUp } from "../lib/CountUp";

function AboutStat({ value, label }: { value: string; label: string }) {
  const { ref, display } = useCountUp(value);
  return (
    <div ref={ref} style={{ borderLeft: `2px solid ${T.gold}`, paddingLeft: "1rem" }}>
      <div style={{ fontFamily: SERIF, fontSize: "2rem", fontWeight: 600, color: T.gold, lineHeight: 1 }}>{display}</div>
      <div style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textMd, marginTop: "0.25rem" }}>{label}</div>
    </div>
  );
}

const VALUES = [
  { num: "01", title: "Integrity",  body: "We give honest advice, even when it is not what a client hopes to hear. Our reputation rests on our clients trusting our word." },
  { num: "02", title: "Excellence", body: "We hold ourselves to the highest standards of legal scholarship and client service. Good enough is never sufficient." },
  { num: "03", title: "Discretion", body: "Our clients trust us with their most sensitive matters. That trust is sacred. We treat every instruction with absolute confidentiality." },
  { num: "04", title: "Commitment", body: "We are with our clients from the first call to final resolution. We do not disappear once the retainer is signed." },
];

function ValueCard({ v, i }: { v: typeof VALUES[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
      className={i < 3 ? "sterling-value-border" : ""}
      style={{ padding: "2.5rem 2rem", borderRight: i < 3 ? `1px solid ${T.border}` : "none" }}>
      <div style={{ fontFamily: SERIF, fontSize: "3rem", fontWeight: 600, color: T.gold, opacity: 0.3, lineHeight: 1, marginBottom: "1rem" }}>{v.num}</div>
      <h3 style={{ fontFamily: SERIF, fontSize: "1.3rem", fontWeight: 600, color: T.cream, marginBottom: "0.75rem" }}>{v.title}</h3>
      <p style={{ fontSize: "0.82rem", color: T.textMd, lineHeight: 1.8 }}>{v.body}</p>
    </motion.div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
      <div style={{ width: 32, height: 1, background: T.gold }} />
      <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.26em", textTransform: "uppercase", color: T.gold }}>{text}</span>
    </div>
  );
}

function TeamCard({ member, index }: { member: typeof TEAM[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px 0px" });
  const [hov, setHov] = useState(false);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ cursor: "default" }}>
      {/* Photo */}
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "3/4", marginBottom: "1.25rem" }}>
        <img src={member.img} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", transform: hov ? "scale(1.04)" : "scale(1)", transition: `transform 600ms ${EASE}` }} />
        <div style={{ position: "absolute", inset: 0, background: hov ? "rgba(10,14,26,0.25)" : "rgba(10,14,26,0)", transition: `background 400ms` }} />
        {/* Gold bottom bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: T.gold, transform: hov ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: `transform 400ms ${EASE}` }} />
      </div>

      <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: T.gold, marginBottom: "0.3rem" }}>{member.area}</div>
      <h3 style={{ fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 600, color: T.cream, marginBottom: "0.2rem" }}>{member.name}</h3>
      <div style={{ fontSize: "0.78rem", fontWeight: 500, color: T.textMd, marginBottom: "0.85rem" }}>{member.role}</div>
      <p style={{ fontSize: "0.78rem", color: T.textLt, lineHeight: 1.75, marginBottom: "1rem" }}>{member.bio}</p>

      {/* Qualifications */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        {member.quals.map(q => (
          <div key={q} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: T.gold, flexShrink: 0, marginTop: "0.45rem" }} />
            <span style={{ fontSize: "0.72rem", color: T.textLt }}>{q}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", area: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1400);
  }

  return (
    <main style={{ background: T.navy, fontFamily: SANS, color: T.text }}>

      {/* ── HERO ── */}
      <div style={{ position: "relative", overflow: "hidden", padding: "9rem 2.5rem 6rem" }}>
        <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1800&q=80" alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.18) saturate(0.5)" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(105deg, ${T.navy}EE 50%, ${T.navy}88 100%)` }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "60%", background: `linear-gradient(${T.gold}, transparent)` }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1320, margin: "0 auto" }}>
          <SectionLabel text="The Firm" />
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontFamily: SERIF, fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: 500, color: T.cream, lineHeight: 1.1, maxWidth: 700, marginBottom: "1.5rem" }}>
            About Sterling &amp; Co
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.18, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontSize: "1rem", color: T.textMd, maxWidth: 560, lineHeight: 1.8 }}>
            For nearly three decades, Sterling &amp; Co has built its reputation on one principle: exceptional legal work, delivered with genuine care for every client.
          </motion.p>
        </div>
      </div>

      {/* ── STORY ── */}
      <section className="sterling-story-grid sterling-px" style={{ maxWidth: 1320, margin: "0 auto", padding: "7rem 2.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
        <div>
          <SectionLabel text="Our Story" />
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 500, color: T.cream, lineHeight: 1.2, marginBottom: "1.5rem" }}>
            Built on principle,<br /><em style={{ color: T.gold }}>driven by excellence.</em>
          </h2>
          <p style={{ fontSize: "0.9rem", color: T.textMd, lineHeight: 1.9, marginBottom: "1rem" }}>Sterling &amp; Co was founded in 1996 by Jonathan Sterling, a former barrister who believed that the best legal advice combined forensic intellectual precision with true commercial understanding. What began as a three-partner firm has grown into one of London's most respected independent practices.</p>
          <p style={{ fontSize: "0.9rem", color: T.textMd, lineHeight: 1.9, marginBottom: "1.5rem" }}>We have never sought to be the largest firm in London. We have sought to be the best at what we do — and to ensure that every client, regardless of the complexity of their matter, feels genuinely heard and expertly served.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {STATS.map(s => <AboutStat key={s.label} value={s.value} label={s.label} />)}
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: -16, right: -16, bottom: 16, left: 16, border: `1px solid ${T.border}` }} />
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80" alt="Sterling & Co offices"
            style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", position: "relative", zIndex: 1 }} />
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ background: T.navyMd, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: "6rem 2.5rem" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <SectionLabel text="What We Stand For" />
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 500, color: T.cream }}>Our Values</h2>
          </div>
          <div className="sterling-values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0" }}>
            {VALUES.map((v, i) => <ValueCard key={v.num} v={v} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" style={{ padding: "7rem 2.5rem" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
            <SectionLabel text="The People" />
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, color: T.cream, marginBottom: "1rem" }}>Meet the Team</h2>
            <p style={{ fontSize: "0.9rem", color: T.textMd, maxWidth: 480, margin: "0 auto" }}>Our solicitors are among the most experienced in their respective fields — recognised for both their legal expertise and their genuine commitment to clients.</p>
          </div>
          <div className="sterling-team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "3rem" }}>
            {TEAM.map((m, i) => <TeamCard key={m.name} member={m} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── ACCREDITATIONS ── */}
      <section style={{ background: T.navyMd, borderTop: `1px solid ${T.border}`, padding: "5rem 2.5rem" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: T.textLt, marginBottom: "2.5rem" }}>Regulated &amp; Recognised</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
            {ACCREDITATIONS.map(a => (
              <div key={a} style={{ padding: "0.65rem 1.25rem", border: `1px solid ${T.border}`, fontSize: "0.72rem", fontWeight: 500, color: T.textMd, letterSpacing: "0.04em" }}>{a}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section id="contact" className="sterling-px" style={{ padding: "7rem 2.5rem" }}>
        <div className="sterling-contact-grid" style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>

          {/* Info */}
          <div>
            <SectionLabel text="Get in Touch" />
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, color: T.cream, marginBottom: "1rem", lineHeight: 1.2 }}>
              Book your free<br /><em style={{ color: T.gold }}>30-minute consultation.</em>
            </h2>
            <p style={{ fontSize: "0.9rem", color: T.textMd, lineHeight: 1.85, marginBottom: "2.5rem" }}>
              We offer a no-obligation initial consultation for all new clients. Everything discussed is strictly confidential. Simply complete the form and a member of our team will be in touch within two working hours.
            </p>
            {[
              { icon: "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4", label: "Address", value: "42 Chancery Lane, London WC2A 1JE" },
              { icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.09 6.09l.93-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z", label: "Telephone", value: "+44 (0)20 7123 4567" },
              { icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6", label: "Email", value: "enquiries@sterlingco.co.uk" },
              { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: "SRA Number", value: "654321 · Authorised & Regulated" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                <div style={{ width: 36, height: 36, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} /></svg>
                </div>
                <div>
                  <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.textLt, marginBottom: "0.15rem" }}>{item.label}</div>
                  <div style={{ fontSize: "0.85rem", color: T.cream }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div style={{ border: `1px solid ${T.border}`, padding: "2.5rem", background: T.navyMd }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ width: 56, height: 56, border: `2px solid ${T.gold}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                  <svg width="22" height="16" viewBox="0 0 22 16" fill="none"><path d="M1 8l6 6L21 1" stroke={T.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h3 style={{ fontFamily: SERIF, fontSize: "1.5rem", fontWeight: 600, color: T.cream, marginBottom: "0.75rem" }}>Message Received</h3>
                <p style={{ fontSize: "0.85rem", color: T.textMd, lineHeight: 1.8 }}>Thank you, {formState.name}. A member of our team will contact you at {formState.email} within two working hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                <h3 style={{ fontFamily: SERIF, fontSize: "1.35rem", fontWeight: 600, color: T.cream, marginBottom: "0.25rem" }}>Request a Consultation</h3>
                <div className="sterling-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {[
                    { key: "name",  label: "Full Name *",    type: "text",  placeholder: "Jonathan Smith" },
                    { key: "phone", label: "Phone Number",   type: "tel",   placeholder: "+44 7700 900000" },
                  ].map(f => (
                    <label key={f.key} style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.textMd }}>{f.label}</span>
                      <input type={f.type} placeholder={f.placeholder} value={(formState as any)[f.key]}
                        onChange={e => setFormState(p => ({ ...p, [f.key]: e.target.value }))}
                        style={{ padding: "0.7rem 0.9rem", background: T.navyLt, border: `1px solid ${T.border}`, color: T.cream, fontSize: "0.88rem", outline: "none", fontFamily: SANS }} />
                    </label>
                  ))}
                </div>
                <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.textMd }}>Email Address *</span>
                  <input type="email" placeholder="you@example.com" value={formState.email}
                    onChange={e => setFormState(p => ({ ...p, email: e.target.value }))}
                    style={{ padding: "0.7rem 0.9rem", background: T.navyLt, border: `1px solid ${T.border}`, color: T.cream, fontSize: "0.88rem", outline: "none", fontFamily: SANS }} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.textMd }}>Practice Area</span>
                  <select value={formState.area} onChange={e => setFormState(p => ({ ...p, area: e.target.value }))}
                    style={{ padding: "0.7rem 0.9rem", background: T.navyLt, border: `1px solid ${T.border}`, color: formState.area ? T.cream : T.textLt, fontSize: "0.88rem", outline: "none", fontFamily: SANS, appearance: "none" }}>
                    <option value="">Select a practice area…</option>
                    {["Civil Litigation","Family Law","Corporate & Commercial","Property Law","Wills & Probate"].map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.textMd }}>Your Message *</span>
                  <textarea placeholder="Please briefly describe your matter…" rows={4} value={formState.message}
                    onChange={e => setFormState(p => ({ ...p, message: e.target.value }))}
                    style={{ padding: "0.7rem 0.9rem", background: T.navyLt, border: `1px solid ${T.border}`, color: T.cream, fontSize: "0.88rem", outline: "none", fontFamily: SANS, resize: "vertical" }} />
                </label>
                <p style={{ fontSize: "0.72rem", color: T.textLt, lineHeight: 1.6 }}>By submitting this form you agree to our privacy policy. All communications are strictly confidential.</p>
                <button type="submit" disabled={submitting}
                  style={{ padding: "0.9rem", background: T.gold, color: T.navy, border: "none", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", cursor: submitting ? "wait" : "pointer", opacity: submitting ? 0.7 : 1, transition: `all 200ms ${EASE}`, transform: "scale(1)" }}
                  onMouseEnter={e => { if (!submitting) (e.currentTarget as HTMLElement).style.background = T.goldLt; }}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.gold}
                  onMouseDown={e => (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"}
                  onMouseUp={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
                >
                  {submitting ? "Sending…" : "Send Enquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
