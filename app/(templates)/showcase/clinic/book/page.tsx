"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES, BASE, T, SERIF, SANS, EASE } from "../lib/data";

const TIMES = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

function Label({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.25rem" }}>
      <div style={{ width: 28, height: 1, background: T.gold }} />
      <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: T.gold }}>{text}</span>
    </div>
  );
}

type FormData = {
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<FormData>({
    service: "", date: "", time: "",
    name: "", email: "", phone: "", message: "",
  });

  const set = (k: keyof FormData, v: string) => setForm(f => ({ ...f, [k]: v }));

  const step1Valid = form.service && form.date && form.time;
  const step2Valid = form.name && form.email;

  function handleConfirm() {
    setDone(true);
  }

  const inputStyle = {
    width: "100%", padding: "0.8rem 1rem",
    background: T.bgMd, border: `1px solid ${T.border}`,
    color: T.text, fontSize: "0.88rem", outline: "none",
    fontFamily: SANS, transition: `border-color 180ms`,
  };

  const labelStyle = {
    fontSize: "0.62rem", fontWeight: 700 as const, letterSpacing: "0.14em",
    textTransform: "uppercase" as const, color: T.textMd, display: "block", marginBottom: "0.4rem",
  };

  return (
    <main style={{ background: T.bg, fontFamily: SANS, color: T.text, minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <div style={{ position: "relative", padding: "6.5rem 2.5rem 4rem", overflow: "hidden", borderBottom: `1px solid ${T.border}` }}>
        <img
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=80"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.12) saturate(0.5)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(105deg, ${T.bg}F0 55%, ${T.bg}88 100%)` }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: 1, height: "60%", background: `linear-gradient(${T.gold}, transparent)` }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
          <Label text="Lumière Clinic" />
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontFamily: SERIF, fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 500, color: T.text, lineHeight: 1.1, maxWidth: 560 }}
          >
            Book your<br /><em style={{ color: T.gold }}>consultation.</em>
          </motion.h1>
          <p style={{ fontSize: "0.88rem", color: T.textMd, maxWidth: 420, lineHeight: 1.78, marginTop: "1rem" }}>
            All treatments begin with a complimentary 45-minute skin consultation. Select your treatment of interest, choose a time, and we'll be in touch to confirm.
          </p>
        </div>
      </div>

      {/* ── FORM AREA ── */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 2.5rem" }}>
        <div className="lm-contact-grid" style={{ gap: "5rem", alignItems: "start" }}>

          {/* Left — step form */}
          <div>
            {done ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                style={{ textAlign: "center", padding: "4rem 2rem" }}
              >
                <div style={{
                  width: 64, height: 64, border: `2px solid ${T.gold}`, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem",
                }}>
                  <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                    <path d="M1 9l7 7L23 1" stroke={T.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 style={{ fontFamily: SERIF, fontSize: "2rem", fontWeight: 600, color: T.text, marginBottom: "0.75rem" }}>
                  Booking Received
                </h2>
                <p style={{ fontSize: "0.88rem", color: T.textMd, lineHeight: 1.8, maxWidth: 400, margin: "0 auto 2rem" }}>
                  Thank you, {form.name}. We have received your request for <strong>{SERVICES.find(s => s.slug === form.service)?.title}</strong> on {form.date} at {form.time}. A member of our team will contact you at {form.email} to confirm your appointment.
                </p>
                <Link href={BASE} style={{
                  display: "inline-block", padding: "0.8rem 2rem",
                  border: `1px solid ${T.gold}`, color: T.gold,
                  fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.16em",
                  textTransform: "uppercase", textDecoration: "none",
                }}>Return Home</Link>
              </motion.div>
            ) : (
              <>
                {/* Step indicator */}
                <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: "3rem" }}>
                  {[1, 2, 3].map((s, i) => (
                    <div key={s} style={{ display: "flex", alignItems: "center", flex: i < 2 ? "1 1 auto" : "0 0 auto" }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                        background: step >= s ? T.gold : "transparent",
                        border: `1.5px solid ${step >= s ? T.gold : T.border}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: `all 300ms ${EASE}`,
                      }}>
                        {step > s ? (
                          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                            <path d="M1 5l3.5 3.5L11 1" stroke={T.bgDk} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <span style={{ fontSize: "0.7rem", fontWeight: 600, color: step >= s ? T.bgDk : T.textLt }}>{s}</span>
                        )}
                      </div>
                      {i < 2 && (
                        <div style={{ flex: 1, height: 1, background: step > s ? T.gold : T.border, margin: "0 0.5rem", transition: `background 300ms ${EASE}` }} />
                      )}
                    </div>
                  ))}
                  <div style={{ marginLeft: "1rem", display: "flex", gap: "1rem" }}>
                    {["Treatment", "Details", "Confirm"].map((label, i) => (
                      <span key={label} style={{ fontSize: "0.62rem", fontWeight: step === i + 1 ? 600 : 400, color: step === i + 1 ? T.gold : T.textLt, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {/* ── STEP 1: Treatment + Date ── */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <h2 style={{ fontFamily: SERIF, fontSize: "1.8rem", fontWeight: 500, color: T.text, marginBottom: "2rem" }}>
                        Choose your treatment
                      </h2>

                      {/* Service selector */}
                      <div style={{ marginBottom: "1.5rem" }}>
                        <span style={labelStyle}>Treatment *</span>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                          {SERVICES.map(s => (
                            <button
                              key={s.slug}
                              onClick={() => set("service", s.slug)}
                              style={{
                                padding: "0.9rem 1rem", textAlign: "left",
                                background: form.service === s.slug ? T.gold : T.bgMd,
                                border: `1px solid ${form.service === s.slug ? T.gold : T.border}`,
                                cursor: "pointer",
                                transition: `all 180ms ${EASE}`,
                              }}
                            >
                              <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: form.service === s.slug ? T.bgDk : T.gold, marginBottom: "0.15rem" }}>
                                {s.price}
                              </div>
                              <div style={{ fontSize: "0.82rem", fontWeight: 500, color: form.service === s.slug ? T.bgDk : T.text, fontFamily: SANS }}>
                                {s.title}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
                        <label style={{ display: "flex", flexDirection: "column" }}>
                          <span style={labelStyle}>Preferred Date *</span>
                          <input type="date" value={form.date} onChange={e => set("date", e.target.value)}
                            style={inputStyle}
                            onFocus={e => (e.currentTarget.style.borderColor = T.gold)}
                            onBlur={e => (e.currentTarget.style.borderColor = T.border)}
                          />
                        </label>
                        <label style={{ display: "flex", flexDirection: "column" }}>
                          <span style={labelStyle}>Preferred Time *</span>
                          <select value={form.time} onChange={e => set("time", e.target.value)}
                            style={{ ...inputStyle, appearance: "none" }}
                            onFocus={e => (e.currentTarget.style.borderColor = T.gold)}
                            onBlur={e => (e.currentTarget.style.borderColor = T.border)}
                          >
                            <option value="">Select a time…</option>
                            {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </label>
                      </div>

                      <button
                        disabled={!step1Valid}
                        onClick={() => setStep(2)}
                        style={{
                          padding: "0.9rem 2.5rem", background: step1Valid ? T.gold : T.bgMd,
                          border: "none", color: step1Valid ? T.bgDk : T.textLt,
                          fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em",
                          textTransform: "uppercase", cursor: step1Valid ? "pointer" : "not-allowed",
                          transition: `all 200ms ${EASE}`,
                        }}
                        onMouseEnter={e => { if (step1Valid) (e.currentTarget as HTMLElement).style.background = T.goldLt; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = step1Valid ? T.gold : T.bgMd; }}
                        onMouseDown={e => { if (step1Valid) (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
                        onMouseUp={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
                      >
                        Continue →
                      </button>
                    </motion.div>
                  )}

                  {/* ── STEP 2: Contact Details ── */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <h2 style={{ fontFamily: SERIF, fontSize: "1.8rem", fontWeight: 500, color: T.text, marginBottom: "2rem" }}>
                        Your details
                      </h2>

                      <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", marginBottom: "2rem" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                          <label style={{ display: "flex", flexDirection: "column" }}>
                            <span style={labelStyle}>Full Name *</span>
                            <input type="text" placeholder="Your name" value={form.name} onChange={e => set("name", e.target.value)}
                              style={inputStyle}
                              onFocus={e => (e.currentTarget.style.borderColor = T.gold)}
                              onBlur={e => (e.currentTarget.style.borderColor = T.border)}
                            />
                          </label>
                          <label style={{ display: "flex", flexDirection: "column" }}>
                            <span style={labelStyle}>Phone Number</span>
                            <input type="tel" placeholder="+44 7700 900000" value={form.phone} onChange={e => set("phone", e.target.value)}
                              style={inputStyle}
                              onFocus={e => (e.currentTarget.style.borderColor = T.gold)}
                              onBlur={e => (e.currentTarget.style.borderColor = T.border)}
                            />
                          </label>
                        </div>
                        <label style={{ display: "flex", flexDirection: "column" }}>
                          <span style={labelStyle}>Email Address *</span>
                          <input type="email" placeholder="you@example.com" value={form.email} onChange={e => set("email", e.target.value)}
                            style={inputStyle}
                            onFocus={e => (e.currentTarget.style.borderColor = T.gold)}
                            onBlur={e => (e.currentTarget.style.borderColor = T.border)}
                          />
                        </label>
                        <label style={{ display: "flex", flexDirection: "column" }}>
                          <span style={labelStyle}>Additional Notes</span>
                          <textarea
                            placeholder="Any relevant medical history, skin concerns, or questions…"
                            rows={4} value={form.message} onChange={e => set("message", e.target.value)}
                            style={{ ...inputStyle, resize: "vertical" }}
                            onFocus={e => (e.currentTarget.style.borderColor = T.gold)}
                            onBlur={e => (e.currentTarget.style.borderColor = T.border)}
                          />
                        </label>
                      </div>

                      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                        <button onClick={() => setStep(1)} style={{
                          padding: "0.9rem 1.75rem", background: "transparent",
                          border: `1px solid ${T.border}`, color: T.textMd,
                          fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.14em",
                          textTransform: "uppercase", cursor: "pointer",
                          transition: `border-color 180ms`,
                        }}
                          onMouseEnter={e => (e.currentTarget.style.borderColor = T.textMd)}
                          onMouseLeave={e => (e.currentTarget.style.borderColor = T.border)}
                        >← Back</button>
                        <button
                          disabled={!step2Valid}
                          onClick={() => setStep(3)}
                          style={{
                            padding: "0.9rem 2.5rem", background: step2Valid ? T.gold : T.bgMd,
                            border: "none", color: step2Valid ? T.bgDk : T.textLt,
                            fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em",
                            textTransform: "uppercase", cursor: step2Valid ? "pointer" : "not-allowed",
                            transition: `all 200ms ${EASE}`,
                          }}
                          onMouseEnter={e => { if (step2Valid) (e.currentTarget as HTMLElement).style.background = T.goldLt; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = step2Valid ? T.gold : T.bgMd; }}
                          onMouseDown={e => { if (step2Valid) (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
                          onMouseUp={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
                        >Review Booking →</button>
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP 3: Confirm ── */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <h2 style={{ fontFamily: SERIF, fontSize: "1.8rem", fontWeight: 500, color: T.text, marginBottom: "2rem" }}>
                        Review & confirm
                      </h2>

                      <div style={{ border: `1px solid ${T.border}`, background: T.bgMd, padding: "1.75rem", marginBottom: "1.5rem" }}>
                        <h3 style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.gold, marginBottom: "1.25rem" }}>
                          Booking Summary
                        </h3>
                        {[
                          { label: "Treatment", val: SERVICES.find(s => s.slug === form.service)?.title ?? "—" },
                          { label: "Date",      val: form.date },
                          { label: "Time",      val: form.time },
                          { label: "Name",      val: form.name },
                          { label: "Email",     val: form.email },
                          { label: "Phone",     val: form.phone || "—" },
                        ].map(row => (
                          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.65rem 0", borderBottom: `1px solid ${T.borderLt}` }}>
                            <span style={{ fontSize: "0.72rem", color: T.textMd }}>{row.label}</span>
                            <span style={{ fontSize: "0.82rem", fontWeight: 500, color: T.text }}>{row.val}</span>
                          </div>
                        ))}
                      </div>

                      <p style={{ fontSize: "0.72rem", color: T.textLt, lineHeight: 1.65, marginBottom: "1.5rem" }}>
                        By confirming this booking you agree to our cancellation policy. We require 24 hours' notice for any amendments. All consultations are complimentary and strictly confidential.
                      </p>

                      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                        <button onClick={() => setStep(2)} style={{
                          padding: "0.9rem 1.75rem", background: "transparent",
                          border: `1px solid ${T.border}`, color: T.textMd,
                          fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.14em",
                          textTransform: "uppercase", cursor: "pointer",
                        }}>← Back</button>
                        <button onClick={handleConfirm} style={{
                          padding: "0.9rem 2.5rem", background: T.gold, border: "none",
                          color: T.bgDk, fontSize: "0.68rem", fontWeight: 600,
                          letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer",
                          transition: `background 200ms ${EASE}, transform 120ms ${EASE}`,
                        }}
                          onMouseEnter={e => (e.currentTarget.style.background = T.goldLt)}
                          onMouseLeave={e => (e.currentTarget.style.background = T.gold)}
                          onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
                          onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                        >Confirm Booking</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>

          {/* Right — info panel */}
          <div style={{ position: "sticky", top: "5.5rem" }}>
            <div style={{ border: `1px solid ${T.border}`, background: T.bgMd, padding: "2rem", marginBottom: "1.25rem" }}>
              <h3 style={{ fontFamily: SERIF, fontSize: "1.2rem", fontWeight: 600, color: T.text, marginBottom: "1rem" }}>What to Expect</h3>
              {[
                { num: "1", text: "Select your treatment of interest and a preferred date and time." },
                { num: "2", text: "One of our team will call to confirm within 2 working hours." },
                { num: "3", text: "Arrive at 12 Harley Street. Your consultation lasts approximately 45 minutes." },
                { num: "4", text: "Leave with a written treatment plan — no obligation to proceed." },
              ].map(s => (
                <div key={s.num} style={{ display: "flex", gap: "0.9rem", marginBottom: "1rem" }}>
                  <div style={{ width: 22, height: 22, flexShrink: 0, background: T.gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "0.62rem", fontWeight: 700, color: T.bgDk }}>{s.num}</span>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: T.textMd, lineHeight: 1.65 }}>{s.text}</p>
                </div>
              ))}
            </div>

            <div style={{ border: `1px solid ${T.border}`, background: T.bgMd, padding: "1.5rem" }}>
              <h4 style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.gold, marginBottom: "0.85rem" }}>Contact us directly</h4>
              {[
                { icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.09 6.09l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z", val: "+44 (0)20 7946 0320" },
                { icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6", val: "hello@lumiereclinic.co.uk" },
                { icon: "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4", val: "12 Harley Street, London W1G 9PQ" },
              ].map(item => (
                <div key={item.val} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", marginBottom: "0.85rem" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "1px" }}><path d={item.icon} /></svg>
                  <span style={{ fontSize: "0.78rem", color: T.textMd }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
