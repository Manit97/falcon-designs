"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { T, SERIF, SANS, EASE, BASE, SERVICES, TEAM, BRAND } from "../lib/data";

type Step = 1 | 2 | 3 | 4;

interface BookingState {
  service:     string;
  stylist:     string;
  date:        string;
  time:        string;
  name:        string;
  email:       string;
  phone:       string;
  notes:       string;
}

const TIMES = [
  "9:00am", "9:30am", "10:00am", "10:30am", "11:00am", "11:30am",
  "12:00pm", "1:00pm", "1:30pm", "2:00pm", "2:30pm", "3:00pm",
  "3:30pm", "4:00pm", "4:30pm", "5:00pm", "5:30pm", "6:00pm",
];

function StepIndicator({ step, current }: { step: Step; current: Step }) {
  const done = current > step;
  const active = current === step;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
      <div style={{
        width: 28, height: 28, borderRadius: "50%",
        border: `1.5px solid ${done || active ? T.amber : T.borderLt}`,
        background: done ? T.amber : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: `all 300ms ${EASE}`,
        flexShrink: 0,
      }}>
        {done ? (
          <svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4.5L4.5 8L11 1" stroke={T.bg} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        ) : (
          <span style={{ fontFamily: SANS, fontSize: "0.65rem", fontWeight: 600, color: active ? T.amber : T.textMd }}>{step}</span>
        )}
      </div>
      <span style={{ fontFamily: SANS, fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: active || done ? T.cream : T.textMd, transition: "color 300ms" }}>
        {step === 1 ? "Service" : step === 2 ? "Stylist" : step === 3 ? "Date & Time" : "Your Details"}
      </span>
    </div>
  );
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir * -40, opacity: 0 }),
};

export default function BookPage() {
  const [step, setStep]   = useState<Step>(1);
  const [dir, setDir]     = useState(1);
  const [done, setDone]   = useState(false);
  const [booking, setBooking] = useState<BookingState>({
    service: "", stylist: "", date: "", time: "",
    name: "", email: "", phone: "", notes: "",
  });

  const go = (next: Step) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const update = (k: keyof BookingState, v: string) =>
    setBooking(b => ({ ...b, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  // Min date = today
  const today = new Date().toISOString().split("T")[0];

  const inputStyle: React.CSSProperties = {
    width: "100%", background: T.bgMd, border: `1px solid ${T.border}`,
    color: T.cream, fontFamily: SANS, fontSize: "0.88rem", padding: "0.9rem 1rem",
    outline: "none", transition: `border-color 200ms`,
  };

  if (done) {
    return (
      <main style={{ paddingTop: 68, minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: "6rem 2.5rem" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          style={{ textAlign: "center", maxWidth: 520 }}
        >
          {/* Amber circle check */}
          <div style={{
            width: 72, height: 72, borderRadius: "50%", background: T.amber,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 2rem",
          }}>
            <svg width="28" height="22" viewBox="0 0 28 22" fill="none"><path d="M2 11L10 19L26 3" stroke={T.bg} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h2 style={{ fontFamily: SERIF, fontSize: "2.5rem", fontStyle: "italic", fontWeight: 500, color: T.cream, marginBottom: "1rem" }}>
            Request sent.
          </h2>
          <p style={{ fontFamily: SANS, fontSize: "0.85rem", color: T.textMd, lineHeight: 1.8, marginBottom: "0.5rem" }}>
            Thank you, <strong style={{ color: T.cream }}>{booking.name}</strong>. We've received your booking request.
          </p>
          <p style={{ fontFamily: SANS, fontSize: "0.85rem", color: T.textMd, lineHeight: 1.8, marginBottom: "2.5rem" }}>
            We'll confirm your appointment at <strong style={{ color: T.cream }}>{booking.email}</strong> within 2 hours during studio hours.
          </p>
          <div style={{
            padding: "1.5rem 2rem", border: `1px solid ${T.border}`,
            background: T.bgPanel, marginBottom: "2.5rem", textAlign: "left",
          }}>
            {[
              { label: "Service",  value: booking.service },
              { label: "Stylist",  value: booking.stylist },
              { label: "Date",     value: new Date(booking.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }) },
              { label: "Time",     value: booking.time },
            ].map(r => (
              <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: `1px solid ${T.borderLt}` }}>
                <span style={{ fontFamily: SANS, fontSize: "0.72rem", color: T.textMd }}>{r.label}</span>
                <span style={{ fontFamily: SANS, fontSize: "0.72rem", color: T.cream, fontWeight: 500 }}>{r.value}</span>
              </div>
            ))}
          </div>
          <Link href={BASE} style={{
            fontFamily: SANS, fontSize: "0.63rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase",
            padding: "0.85rem 2rem", background: T.amber, color: T.bg, display: "inline-block",
            transition: `background 250ms`,
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.amberLt}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.amber}
          >Back to Home</Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main style={{ paddingTop: 68 }}>

      {/* ── HEADER ── */}
      <section style={{ padding: "5rem 2.5rem 3.5rem", background: T.bgPanel, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: SERIF, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontStyle: "italic", fontWeight: 500, color: T.cream, marginBottom: "3rem" }}
          >
            Book your appointment.
          </motion.h1>

          {/* Step indicators */}
          <div className="mn-step-row">
            {([1, 2, 3, 4] as Step[]).map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <StepIndicator step={s} current={step} />
                {i < 3 && (
                  <div style={{ width: 24, height: 1, background: T.borderLt, marginLeft: "0.4rem" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEP CONTENT ── */}
      <section style={{ padding: "5rem 2.5rem 7rem", minHeight: "60vh" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >

              {/* STEP 1 — SERVICE */}
              {step === 1 && (
                <div>
                  <h2 style={{ fontFamily: SERIF, fontSize: "1.6rem", fontStyle: "italic", fontWeight: 500, color: T.cream, marginBottom: "0.5rem" }}>Select a service</h2>
                  <p style={{ fontFamily: SANS, fontSize: "0.78rem", color: T.textMd, marginBottom: "2.5rem" }}>You can discuss specific treatments with your stylist at consultation.</p>

                  {/* Service categories */}
                  {SERVICES.map(s => (
                    <div key={s.slug} style={{ marginBottom: "1rem" }}>
                      <button
                        onClick={() => { update("service", s.name); go(2); }}
                        style={{
                          width: "100%", padding: "1.5rem 2rem",
                          border: `1px solid ${booking.service === s.name ? T.amber : T.borderLt}`,
                          background: booking.service === s.name ? "rgba(201,151,58,0.08)" : "transparent",
                          cursor: "pointer", textAlign: "left",
                          display: "flex", justifyContent: "space-between", alignItems: "center",
                          transition: `all 250ms ${EASE}`,
                          fontFamily: "inherit",
                        }}
                        onMouseEnter={e => { if (booking.service !== s.name) (e.currentTarget as HTMLElement).style.borderColor = T.amber; }}
                        onMouseLeave={e => { if (booking.service !== s.name) (e.currentTarget as HTMLElement).style.borderColor = T.borderLt; }}
                      >
                        <div>
                          <div style={{ fontFamily: SERIF, fontSize: "1.15rem", fontStyle: "italic", fontWeight: 500, color: T.cream, marginBottom: "0.25rem" }}>{s.name}</div>
                          <div style={{ fontFamily: SANS, fontSize: "0.72rem", color: T.textMd }}>{s.desc}</div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem", flexShrink: 0, marginLeft: "1.5rem" }}>
                          <span style={{ fontFamily: SANS, fontSize: "0.7rem", color: T.amber, fontWeight: 500 }}>from {s.from}</span>
                          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" style={{ color: T.amber }}>
                            <path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  ))}

                  <div style={{ marginTop: "1.5rem", padding: "1.25rem 1.5rem", background: T.bgPanel, border: `1px solid ${T.borderLt}` }}>
                    <p style={{ fontFamily: SANS, fontSize: "0.72rem", color: T.textMd, lineHeight: 1.7 }}>
                      Not sure what you need? Call us on <a href={`tel:${BRAND.phone}`} style={{ color: T.amber }}>{BRAND.phone}</a> and we'll help you figure it out.
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 2 — STYLIST */}
              {step === 2 && (
                <div>
                  <h2 style={{ fontFamily: SERIF, fontSize: "1.6rem", fontStyle: "italic", fontWeight: 500, color: T.cream, marginBottom: "0.5rem" }}>Choose your stylist</h2>
                  <p style={{ fontFamily: SANS, fontSize: "0.78rem", color: T.textMd, marginBottom: "2.5rem" }}>All our stylists are senior level — choose by specialty or availability.</p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
                    {[{ name: "No Preference", title: "We'll match you with the best available stylist", img: null, specialty: "Any" }, ...TEAM].map((m, i) => (
                      <button
                        key={m.name}
                        onClick={() => { update("stylist", m.name); go(3); }}
                        style={{
                          padding: "1.5rem",
                          border: `1px solid ${booking.stylist === m.name ? T.amber : T.borderLt}`,
                          background: booking.stylist === m.name ? "rgba(201,151,58,0.08)" : "transparent",
                          cursor: "pointer", textAlign: "left",
                          transition: `all 250ms ${EASE}`,
                          fontFamily: "inherit",
                        }}
                        onMouseEnter={e => { if (booking.stylist !== m.name) (e.currentTarget as HTMLElement).style.borderColor = T.amber; }}
                        onMouseLeave={e => { if (booking.stylist !== m.name) (e.currentTarget as HTMLElement).style.borderColor = T.borderLt; }}
                      >
                        {m.img && (
                          <img src={m.img} alt={m.name} style={{ width: "100%", aspectRatio: "3/2", objectFit: "cover", objectPosition: "top", marginBottom: "1rem" }} />
                        )}
                        {!m.img && i === 0 && (
                          <div style={{ width: "100%", aspectRatio: "3/2", background: T.bgPanel, marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ color: T.textMd }}>
                              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </div>
                        )}
                        <div style={{ fontFamily: SANS, fontSize: "0.56rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.amber, marginBottom: "0.35rem" }}>{m.specialty}</div>
                        <div style={{ fontFamily: SERIF, fontSize: "1rem", fontStyle: "italic", color: T.cream, marginBottom: "0.2rem" }}>{m.name}</div>
                        <div style={{ fontFamily: SANS, fontSize: "0.68rem", color: T.textMd, lineHeight: 1.5 }}>{m.title}</div>
                      </button>
                    ))}
                  </div>

                  <button onClick={() => go(1)} style={{ fontFamily: SANS, fontSize: "0.62rem", color: T.textMd, letterSpacing: "0.12em", cursor: "pointer", marginTop: "0.5rem", background: "none", border: "none", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M11 4H1M5 1L1 4l4 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Back
                  </button>
                </div>
              )}

              {/* STEP 3 — DATE & TIME */}
              {step === 3 && (
                <div>
                  <h2 style={{ fontFamily: SERIF, fontSize: "1.6rem", fontStyle: "italic", fontWeight: 500, color: T.cream, marginBottom: "0.5rem" }}>Pick a date & time</h2>
                  <p style={{ fontFamily: SANS, fontSize: "0.78rem", color: T.textMd, marginBottom: "2.5rem" }}>
                    Studio hours: Tue–Sat 9:00–19:00 · Sun 10:00–17:00 · Mon closed
                  </p>

                  {/* Date picker */}
                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ fontFamily: SANS, fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.amber, display: "block", marginBottom: "0.75rem" }}>Date</label>
                    <input
                      type="date"
                      min={today}
                      value={booking.date}
                      onChange={e => update("date", e.target.value)}
                      style={{ ...inputStyle, maxWidth: 280, colorScheme: "dark" }}
                      onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = T.amber}
                      onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = T.border}
                    />
                  </div>

                  {/* Time slots */}
                  <div style={{ marginBottom: "2.5rem" }}>
                    <label style={{ fontFamily: SANS, fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.amber, display: "block", marginBottom: "0.75rem" }}>Time</label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))", gap: "0.5rem" }}>
                      {TIMES.map(t => (
                        <button
                          key={t}
                          onClick={() => update("time", t)}
                          style={{
                            padding: "0.65rem 0.5rem",
                            border: `1px solid ${booking.time === t ? T.amber : T.borderLt}`,
                            background: booking.time === t ? "rgba(201,151,58,0.12)" : "transparent",
                            fontFamily: SANS, fontSize: "0.75rem",
                            color: booking.time === t ? T.amber : T.cream,
                            cursor: "pointer", transition: `all 200ms ${EASE}`,
                          }}
                          onMouseEnter={e => { if (booking.time !== t) (e.currentTarget as HTMLElement).style.borderColor = T.amber; }}
                          onMouseLeave={e => { if (booking.time !== t) (e.currentTarget as HTMLElement).style.borderColor = T.borderLt; }}
                        >{t}</button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <button onClick={() => go(2)} style={{ fontFamily: SANS, fontSize: "0.62rem", color: T.textMd, letterSpacing: "0.12em", cursor: "pointer", background: "none", border: "none", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M11 4H1M5 1L1 4l4 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      Back
                    </button>
                    <button
                      onClick={() => booking.date && booking.time && go(4)}
                      disabled={!booking.date || !booking.time}
                      style={{
                        fontFamily: SANS, fontSize: "0.63rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase",
                        padding: "0.85rem 1.75rem", background: booking.date && booking.time ? T.amber : T.borderLt,
                        color: T.bg, border: "none", cursor: booking.date && booking.time ? "pointer" : "default",
                        transition: `background 250ms`,
                      }}
                    >Continue</button>
                  </div>
                </div>
              )}

              {/* STEP 4 — DETAILS */}
              {step === 4 && (
                <form onSubmit={handleSubmit}>
                  <h2 style={{ fontFamily: SERIF, fontSize: "1.6rem", fontStyle: "italic", fontWeight: 500, color: T.cream, marginBottom: "0.5rem" }}>Your details</h2>
                  <p style={{ fontFamily: SANS, fontSize: "0.78rem", color: T.textMd, marginBottom: "2.5rem" }}>Almost done — just a few contact details to confirm your booking.</p>

                  {/* Summary */}
                  <div style={{ padding: "1.25rem 1.5rem", background: T.bgPanel, border: `1px solid ${T.border}`, marginBottom: "2.5rem" }}>
                    <div style={{ fontFamily: SANS, fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.amber, marginBottom: "0.75rem" }}>Booking Summary</div>
                    {[
                      { label: "Service", value: booking.service },
                      { label: "Stylist", value: booking.stylist },
                      { label: "Date", value: booking.date ? new Date(booking.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }) : "–" },
                      { label: "Time", value: booking.time || "–" },
                    ].map(r => (
                      <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: `1px solid ${T.borderLt}` }}>
                        <span style={{ fontFamily: SANS, fontSize: "0.72rem", color: T.textMd }}>{r.label}</span>
                        <span style={{ fontFamily: SANS, fontSize: "0.72rem", color: T.cream, fontWeight: 500 }}>{r.value}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }} className="mn-2col">
                    {[
                      { label: "Full Name",     key: "name",  type: "text",  placeholder: "Jane Smith",        required: true  },
                      { label: "Email Address", key: "email", type: "email", placeholder: "jane@email.com",    required: true  },
                      { label: "Phone Number",  key: "phone", type: "tel",   placeholder: "07700 900 000",     required: true  },
                    ].map(f => (
                      <div key={f.key} style={{ gridColumn: f.key === "phone" ? "1" : "auto" }}>
                        <label style={{ fontFamily: SANS, fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: T.amber, display: "block", marginBottom: "0.5rem" }}>{f.label}</label>
                        <input
                          type={f.type}
                          required={f.required}
                          placeholder={f.placeholder}
                          value={booking[f.key as keyof BookingState]}
                          onChange={e => update(f.key as keyof BookingState, e.target.value)}
                          style={inputStyle}
                          onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = T.amber}
                          onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = T.border}
                        />
                      </div>
                    ))}
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ fontFamily: SANS, fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: T.amber, display: "block", marginBottom: "0.5rem" }}>Notes (Optional)</label>
                    <textarea
                      placeholder="Hair history, allergies, anything you'd like us to know..."
                      value={booking.notes}
                      onChange={e => update("notes", e.target.value)}
                      rows={3}
                      style={{ ...inputStyle, resize: "vertical" }}
                      onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = T.amber}
                      onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = T.border}
                    />
                  </div>

                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <button type="button" onClick={() => go(3)} style={{ fontFamily: SANS, fontSize: "0.62rem", color: T.textMd, letterSpacing: "0.12em", cursor: "pointer", background: "none", border: "none", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M11 4H1M5 1L1 4l4 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      Back
                    </button>
                    <button
                      type="submit"
                      style={{
                        fontFamily: SANS, fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase",
                        padding: "0.9rem 2rem", background: T.amber, color: T.bg, border: "none",
                        cursor: "pointer", transition: `background 250ms`,
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.amberLt}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.amber}
                    >Confirm Booking Request</button>
                  </div>

                  <p style={{ fontFamily: SANS, fontSize: "0.68rem", color: T.textMd, marginTop: "1.25rem", lineHeight: 1.7, opacity: 0.7 }}>
                    By submitting you agree to our cancellation policy. We'll confirm your appointment by email within 2 hours during studio hours.
                  </p>
                </form>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
