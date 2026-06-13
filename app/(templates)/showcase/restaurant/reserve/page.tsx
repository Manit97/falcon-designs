"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { T, DISPLAY, SANS, EASE, BASE } from "../lib/data";

const TIMES = ["18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30"];
const COVERS = [1,2,3,4,5,6];
const OCCASIONS = ["Birthday","Anniversary","Business Dinner","Romantic","Other"];

type Form = {
  covers: number;
  date: string;
  time: string;
  occasion: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
  newsletter: boolean;
};

const INIT: Form = {
  covers: 2, date: "", time: "19:00", occasion: "",
  firstName: "", lastName: "", email: "", phone: "",
  notes: "", newsletter: false,
};

const inputStyle = {
  width: "100%", background: "transparent", border: `1px solid rgba(196,129,58,0.25)`,
  color: "#F4EFE6", padding: "0.85rem 1rem",
  fontSize: "0.85rem", fontFamily: "'Jost', system-ui, sans-serif",
  outline: "none",
  transition: `border-color 180ms cubic-bezier(0.23,1,0.32,1)`,
};

export default function ReservePage() {
  const [form, setForm] = useState<Form>(INIT);
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);

  const set = (k: keyof Form, v: Form[typeof k]) => setForm(f => ({ ...f, [k]: v }));

  const steps = [
    { n: 1, label: "Details" },
    { n: 2, label: "Contact" },
    { n: 3, label: "Confirm" },
  ];

  if (done) return (
    <main style={{ background: T.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: [0.23,1,0.32,1] }}
        style={{ textAlign: "center", maxWidth: 480 }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
          style={{ width: 72, height: 72, borderRadius: "50%", border: `2px solid ${T.amber}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem" }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M7 16l6.5 7L25 9" stroke={T.amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
        <div style={{ fontFamily: DISPLAY, fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: T.amber, marginBottom: "1rem" }}>Reservation Confirmed</div>
        <h1 style={{ fontFamily: DISPLAY, fontSize: "2.8rem", fontWeight: 300, fontStyle: "italic", color: T.cream, lineHeight: 1.1, marginBottom: "1.2rem" }}>
          We look forward<br />to welcoming you
        </h1>
        <p style={{ fontSize: "0.84rem", color: T.textMd, lineHeight: 1.9, marginBottom: "2.5rem" }}>
          A confirmation has been sent to <strong style={{ color: T.cream }}>{form.email}</strong>. Please arrive 10 minutes before your reservation time.
        </p>
        <div style={{ background: T.bgMd, border: `1px solid ${T.border}`, padding: "1.5rem 2rem", textAlign: "left", marginBottom: "2.5rem" }}>
          {[
            ["Date", form.date],
            ["Time", form.time],
            ["Covers", `${form.covers} guest${form.covers > 1 ? "s" : ""}`],
            ["Name", `${form.firstName} ${form.lastName}`],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: `1px solid ${T.borderLt}`, fontSize: "0.82rem" }}>
              <span style={{ color: T.textLt, letterSpacing: "0.1em" }}>{k}</span>
              <span style={{ color: T.cream }}>{v}</span>
            </div>
          ))}
        </div>
        <button onClick={() => { setForm(INIT); setStep(1); setDone(false); }}
          style={{ background: "transparent", border: `1px solid ${T.border}`, color: T.textMd, padding: "0.7rem 2rem", cursor: "pointer", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Make another reservation
        </button>
      </motion.div>
    </main>
  );

  return (
    <main style={{ background: T.bg, minHeight: "100vh" }}>
      {/* Hero bar */}
      <div style={{ position: "relative", height: "42vh", overflow: "hidden", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: "3rem" }}>
        <div style={{
          position: "absolute", inset: "-20% 0",
          backgroundImage: `url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=85")`,
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "brightness(0.22)",
        }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${T.bg} 0%, transparent 30%, transparent 55%, ${T.bg} 100%)`, zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", color: T.amber, marginBottom: "0.8rem" }}>Table Reservations</div>
            <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 300, fontStyle: "italic", color: T.cream }}>Reserve a Table</h1>
          </motion.div>
        </div>
      </div>

      {/* Step indicator */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0, padding: "2.5rem 2rem", borderBottom: `1px solid ${T.border}` }}>
        {steps.map((s, i) => (
          <div key={s.n} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: step >= s.n ? T.amber : "transparent",
                border: `1px solid ${step >= s.n ? T.amber : T.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.72rem", fontWeight: 500,
                color: step >= s.n ? T.bg : T.textLt,
                transition: `all 350ms ${EASE}`,
              }}>{s.n}</div>
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: step === s.n ? T.amber : T.textLt }}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ width: 80, height: 1, background: step > s.n ? T.amber : T.border, margin: "0 0.5rem", marginBottom: "1.4rem", transition: `background 350ms ${EASE}` }} />
            )}
          </div>
        ))}
      </div>

      {/* Form */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 2rem 5rem" }}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: [0.23,1,0.32,1] }}>
              <h2 style={{ fontFamily: DISPLAY, fontSize: "1.9rem", fontWeight: 300, fontStyle: "italic", color: T.cream, marginBottom: "2rem" }}>When & how many?</h2>

              {/* Covers */}
              <div style={{ marginBottom: "2rem" }}>
                <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: T.amber, marginBottom: "0.75rem" }}>Number of Guests</label>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {COVERS.map(n => (
                    <button key={n} onClick={() => set("covers", n)} style={{
                      width: 52, height: 52,
                      background: form.covers === n ? T.amber : "transparent",
                      border: `1px solid ${form.covers === n ? T.amber : T.border}`,
                      color: form.covers === n ? T.bg : T.textMd,
                      fontSize: "0.9rem", fontFamily: SANS, cursor: "pointer",
                      transition: `all 180ms ${EASE}`,
                    }}>{n}</button>
                  ))}
                  <button onClick={() => set("covers", 7)} style={{
                    padding: "0 1.2rem", height: 52,
                    background: form.covers >= 7 ? T.amber : "transparent",
                    border: `1px solid ${form.covers >= 7 ? T.amber : T.border}`,
                    color: form.covers >= 7 ? T.bg : T.textMd,
                    fontSize: "0.72rem", fontFamily: SANS, cursor: "pointer", letterSpacing: "0.08em",
                    transition: `all 180ms ${EASE}`,
                  }}>7+</button>
                </div>
                {form.covers >= 7 && (
                  <div style={{ marginTop: "0.75rem", padding: "0.75rem 1rem", background: T.amberDim, border: `1px solid ${T.border}`, fontSize: "0.78rem", color: T.textMd }}>
                    For groups of 7 or more, please email us at <span style={{ color: T.amber }}>reservations@emberlondon.co.uk</span>
                  </div>
                )}
              </div>

              {/* Date */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: T.amber, marginBottom: "0.75rem" }}>Date</label>
                <input type="date" value={form.date} onChange={e => set("date", e.target.value)}
                  style={{ ...inputStyle, colorScheme: "dark" }}
                  onFocus={e => (e.currentTarget.style.borderColor = T.amber)}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(196,129,58,0.25)")}
                />
              </div>

              {/* Time */}
              <div style={{ marginBottom: "2rem" }}>
                <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: T.amber, marginBottom: "0.75rem" }}>Time</label>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {TIMES.map(t => (
                    <button key={t} onClick={() => set("time", t)} style={{
                      padding: "0.6rem 1rem",
                      background: form.time === t ? T.amber : "transparent",
                      border: `1px solid ${form.time === t ? T.amber : T.border}`,
                      color: form.time === t ? T.bg : T.textMd,
                      fontSize: "0.78rem", fontFamily: SANS, cursor: "pointer",
                      transition: `all 180ms ${EASE}`,
                    }}>{t}</button>
                  ))}
                </div>
              </div>

              {/* Occasion */}
              <div style={{ marginBottom: "2.5rem" }}>
                <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: T.amber, marginBottom: "0.75rem" }}>
                  Occasion <span style={{ color: T.textLt, textTransform: "none", letterSpacing: 0 }}>(optional)</span>
                </label>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {OCCASIONS.map(o => (
                    <button key={o} onClick={() => set("occasion", form.occasion === o ? "" : o)} style={{
                      padding: "0.55rem 1.1rem",
                      background: form.occasion === o ? T.amberDim : "transparent",
                      border: `1px solid ${form.occasion === o ? T.amber : T.border}`,
                      color: form.occasion === o ? T.amber : T.textMd,
                      fontSize: "0.72rem", fontFamily: SANS, cursor: "pointer", letterSpacing: "0.06em",
                      transition: `all 180ms ${EASE}`,
                    }}>{o}</button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => form.date && form.time && setStep(2)}
                disabled={!form.date || !form.time}
                style={{
                  width: "100%", padding: "1rem",
                  background: form.date && form.time ? T.amber : "transparent",
                  border: `1px solid ${form.date && form.time ? T.amber : T.border}`,
                  color: form.date && form.time ? T.bg : T.textLt,
                  fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase",
                  fontFamily: SANS, cursor: form.date && form.time ? "pointer" : "default",
                  transition: `all 220ms ${EASE}`,
                }}
                onMouseDown={e => form.date && form.time && ((e.currentTarget as HTMLElement).style.transform = "scale(0.98)")}
                onMouseUp={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
              >Continue →</button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: [0.23,1,0.32,1] }}>
              <h2 style={{ fontFamily: DISPLAY, fontSize: "1.9rem", fontWeight: 300, fontStyle: "italic", color: T.cream, marginBottom: "2rem" }}>Your details</h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                {[
                  { key: "firstName" as const, label: "First Name", type: "text" },
                  { key: "lastName"  as const, label: "Last Name",  type: "text" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: T.amber, marginBottom: "0.5rem" }}>{f.label}</label>
                    <input type={f.type} value={form[f.key] as string} onChange={e => set(f.key, e.target.value)}
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = T.amber)}
                      onBlur={e => (e.currentTarget.style.borderColor = "rgba(196,129,58,0.25)")}
                    />
                  </div>
                ))}
              </div>

              {[
                { key: "email" as const, label: "Email Address", type: "email" },
                { key: "phone" as const, label: "Phone Number",  type: "tel" },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: T.amber, marginBottom: "0.5rem" }}>{f.label}</label>
                  <input type={f.type} value={form[f.key] as string} onChange={e => set(f.key, e.target.value)}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = T.amber)}
                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(196,129,58,0.25)")}
                  />
                </div>
              ))}

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: T.amber, marginBottom: "0.5rem" }}>
                  Special Requests <span style={{ color: T.textLt, textTransform: "none", letterSpacing: 0 }}>(optional)</span>
                </label>
                <textarea value={form.notes} onChange={e => set("notes", e.target.value)}
                  rows={3}
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={e => (e.currentTarget.style.borderColor = T.amber)}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(196,129,58,0.25)")}
                />
              </div>

              <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer", marginBottom: "2.5rem" }}>
                <div onClick={() => set("newsletter", !form.newsletter)} style={{
                  width: 18, height: 18, border: `1px solid ${form.newsletter ? T.amber : T.border}`,
                  background: form.newsletter ? T.amber : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: `all 180ms ${EASE}`, flexShrink: 0,
                }}>
                  {form.newsletter && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5L8 3" stroke={T.bg} strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>}
                </div>
                <span style={{ fontSize: "0.78rem", color: T.textMd }}>Receive our occasional newsletter with seasonal menus and events</span>
              </label>

              <div style={{ display: "flex", gap: "1rem" }}>
                <button onClick={() => setStep(1)} style={{
                  flex: "0 0 auto", padding: "1rem 1.5rem", background: "transparent",
                  border: `1px solid ${T.border}`, color: T.textMd,
                  fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: SANS, cursor: "pointer",
                }}>← Back</button>
                <button
                  onClick={() => form.firstName && form.email && setStep(3)}
                  disabled={!form.firstName || !form.email}
                  style={{
                    flex: 1, padding: "1rem",
                    background: form.firstName && form.email ? T.amber : "transparent",
                    border: `1px solid ${form.firstName && form.email ? T.amber : T.border}`,
                    color: form.firstName && form.email ? T.bg : T.textLt,
                    fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase",
                    fontFamily: SANS, cursor: form.firstName && form.email ? "pointer" : "default",
                    transition: `all 220ms ${EASE}`,
                  }}
                >Review Booking →</button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: [0.23,1,0.32,1] }}>
              <h2 style={{ fontFamily: DISPLAY, fontSize: "1.9rem", fontWeight: 300, fontStyle: "italic", color: T.cream, marginBottom: "2rem" }}>Confirm your reservation</h2>

              <div style={{ background: T.bgMd, border: `1px solid ${T.border}`, padding: "2rem", marginBottom: "2rem" }}>
                {[
                  ["Date",     form.date],
                  ["Time",     form.time],
                  ["Covers",   `${form.covers} guest${form.covers > 1 ? "s" : ""}`],
                  ["Occasion", form.occasion || "—"],
                  ["Name",     `${form.firstName} ${form.lastName}`],
                  ["Email",    form.email],
                  ["Phone",    form.phone || "—"],
                  ["Requests", form.notes || "None"],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: "1rem", padding: "0.75rem 0", borderBottom: `1px solid ${T.borderLt}`, fontSize: "0.84rem" }}>
                    <span style={{ color: T.textLt, letterSpacing: "0.1em", flexShrink: 0 }}>{k}</span>
                    <span style={{ color: T.cream, textAlign: "right" }}>{v}</span>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: "0.78rem", color: T.textLt, lineHeight: 1.8, marginBottom: "2rem" }}>
                By confirming you agree to our reservation policy. We hold your table for 15 minutes past the booking time. A cancellation notice of 24 hours is requested.
              </p>

              <div style={{ display: "flex", gap: "1rem" }}>
                <button onClick={() => setStep(2)} style={{
                  flex: "0 0 auto", padding: "1rem 1.5rem", background: "transparent",
                  border: `1px solid ${T.border}`, color: T.textMd,
                  fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: SANS, cursor: "pointer",
                }}>← Back</button>
                <button onClick={() => setDone(true)} style={{
                  flex: 1, padding: "1rem", background: T.amber,
                  border: `1px solid ${T.amber}`, color: T.bg,
                  fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase",
                  fontFamily: SANS, cursor: "pointer",
                  transition: `all 200ms ${EASE}`,
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.amberLt}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.amber}
                  onMouseDown={e => (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"}
                  onMouseUp={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
                >Confirm Reservation</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
