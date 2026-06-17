"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { C, DISPLAY, BODY, BASE, SERVICES, TEAM } from "../lib/data";

const EASE = [0.23,1,0.32,1] as const;
const TIMES = ["9:00","9:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00"];

type BookingState = {
  services: string[];
  artist: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};
const INIT: BookingState = { services: [], artist: "", date: "", time: "", name: "", email: "", phone: "", notes: "" };

function StepDot({ n, active, done }: { n: number; active: boolean; done: boolean }) {
  return (
    <div style={{
      width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
      background: done ? C.rose : active ? C.plum : C.border,
      color: done || active ? "#fff" : C.textLt,
      fontFamily: BODY, fontSize: "0.72rem", fontWeight: 600, flexShrink: 0,
      transition: "all 0.3s ease",
    }}>
      {done ? "✓" : n}
    </div>
  );
}

function StepBar({ step }: { step: number }) {
  const labels = ["Services","Artist","Date & Time","Your Details","Confirm"];
  return (
    <>
      <style>{`
        @media (max-width: 560px) {
          .nails-step-label { display: none !important; }
        }
      `}</style>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "3rem" }}>
        {labels.map((label, i) => (
          <div key={label} style={{ display: "flex", alignItems: "center", flex: i < labels.length - 1 ? 1 : 0 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
              <StepDot n={i+1} active={step === i+1} done={step > i+1} />
              <span className="nails-step-label" style={{ fontFamily: BODY, fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: step >= i+1 ? C.plum : C.textLt, fontWeight: step === i+1 ? 600 : 400, whiteSpace: "nowrap" }}>
                {label}
              </span>
            </div>
            {i < labels.length - 1 && (
              <div style={{ flex: 1, height: 1, background: step > i+1 ? C.rose : C.border, margin: "0 0.5rem", marginBottom: "1.4rem", transition: "background 0.3s ease" }} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<BookingState>(INIT);
  const [submitted, setSubmitted] = useState(false);

  function toggleService(slug: string) {
    setBooking(prev => ({
      ...prev,
      services: prev.services.includes(slug)
        ? prev.services.filter(s => s !== slug)
        : [...prev.services, slug],
    }));
  }
  function set(key: keyof BookingState, val: string) {
    setBooking(prev => ({ ...prev, [key]: val }));
  }

  function canProceed() {
    if (step === 1) return booking.services.length > 0;
    if (step === 2) return !!booking.artist;
    if (step === 3) return !!booking.date && !!booking.time;
    if (step === 4) return !!booking.name && !!booking.email;
    return true;
  }

  const selectedServices = SERVICES.filter(s => booking.services.includes(s.slug));
  const selectedArtist   = TEAM.find(t => t.name === booking.artist);

  if (submitted) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 2.5rem", background: C.bg }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: EASE }}
          style={{ textAlign: "center", maxWidth: 520 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: C.rose, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem", fontSize: "1.5rem" }}>✓</div>
          <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: C.plum, marginBottom: "1rem" }}>You're all booked.</h1>
          <p style={{ fontFamily: BODY, fontSize: "0.9rem", color: C.textMd, lineHeight: 1.75, fontWeight: 300, marginBottom: "0.75rem" }}>
            Confirmation sent to <strong>{booking.email}</strong>.
          </p>
          <p style={{ fontFamily: BODY, fontSize: "0.85rem", color: C.textLt, lineHeight: 1.7, fontWeight: 300, marginBottom: "2.5rem" }}>
            {selectedServices.map(s => s.name).join(", ")}<br />
            with {booking.artist === "any" ? "Best Available" : booking.artist}<br />
            {booking.date} at {booking.time}
          </p>
          <Link href={BASE} style={{ fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: C.white, background: C.rose, padding: "1rem 2.5rem", display: "inline-block" }}>
            Back to Velour
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .nails-book-option {
          padding: 1.2rem 1.5rem; border: 1px solid ${C.border}; cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
          display: flex; align-items: center; gap: 1rem; background: ${C.white};
        }
        .nails-book-option:hover { border-color: ${C.rose}; }
        .nails-book-option.selected { border-color: ${C.rose}; box-shadow: 0 0 0 1px ${C.rose}; }
        .nails-book-input {
          width: 100%; padding: 0.85rem 1rem; border: 1px solid ${C.border}; background: ${C.white};
          font-family: ${BODY}; font-size: 0.88rem; color: ${C.text}; outline: none;
          transition: border-color 0.2s;
        }
        .nails-book-input:focus { border-color: ${C.rose}; }
        .nails-book-time {
          padding: 0.6rem 1rem; border: 1px solid ${C.border}; cursor: pointer; background: ${C.white};
          font-family: ${BODY}; font-size: 0.72rem; color: ${C.textMd};
          transition: all 0.15s ease; white-space: nowrap;
        }
        .nails-book-time:hover { border-color: ${C.rose}; color: ${C.rose}; }
        .nails-book-time.selected { background: ${C.rose}; border-color: ${C.rose}; color: #fff; }
        .nails-book-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (max-width: 480px) { .nails-book-2col { grid-template-columns: 1fr; } }
      `}</style>

      {/* Header */}
      <section style={{ background: C.plum, padding: "5rem 2.5rem 4rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.roseLt, marginBottom: "0.8rem" }}>Online Booking</div>
          <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 300, color: "#fff", lineHeight: 1.05 }}>
            Book Your <em style={{ fontStyle: "italic", color: C.roseLt }}>Appointment</em>
          </h1>
        </div>
      </section>

      <section style={{ padding: "4rem 2.5rem 6rem", background: C.bg }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <StepBar step={step} />

          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3, ease: EASE }}>

              {/* STEP 1 — Services (multi-select) */}
              {step === 1 && (
                <div>
                  <h2 style={{ fontFamily: DISPLAY, fontSize: "1.8rem", fontWeight: 400, color: C.plum, marginBottom: "0.4rem" }}>Choose your services</h2>
                  <p style={{ fontFamily: BODY, fontSize: "0.82rem", color: C.textMd, marginBottom: "2rem", fontWeight: 300 }}>
                    Select one or more treatments — we'll schedule them together.
                  </p>

                  {booking.services.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.2rem" }}>
                      {selectedServices.map(s => (
                        <span key={s.slug} style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.1em", color: "#fff", background: C.rose, padding: "0.3rem 0.8rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          {s.name}
                          <button onClick={() => toggleService(s.slug)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 0, fontSize: "0.85rem", lineHeight: 1 }}>×</button>
                        </span>
                      ))}
                    </div>
                  )}

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.75rem" }}>
                    {SERVICES.map(s => {
                      const checked = booking.services.includes(s.slug);
                      return (
                        <div key={s.slug} className={`nails-book-option${checked ? " selected" : ""}`}
                          onClick={() => toggleService(s.slug)}>
                          {/* checkbox */}
                          <div style={{
                            width: 18, height: 18, border: `1.5px solid ${checked ? C.rose : C.border}`, borderRadius: 3,
                            flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                            background: checked ? C.rose : "transparent", transition: "all 0.15s",
                          }}>
                            {checked && <span style={{ color: "#fff", fontSize: "0.7rem", lineHeight: 1 }}>✓</span>}
                          </div>
                          <div>
                            <div style={{ fontFamily: BODY, fontSize: "0.88rem", fontWeight: 500, color: C.text }}>{s.name}</div>
                            <div style={{ fontFamily: BODY, fontSize: "0.72rem", color: C.textMd, marginTop: "0.1rem" }}>From {s.from} · {s.duration}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2 — Artist */}
              {step === 2 && (
                <div>
                  <h2 style={{ fontFamily: DISPLAY, fontSize: "1.8rem", fontWeight: 400, color: C.plum, marginBottom: "0.5rem" }}>Choose your artist</h2>
                  <p style={{ fontFamily: BODY, fontSize: "0.82rem", color: C.textMd, marginBottom: "2rem", fontWeight: 300 }}>Select a preferred nail artist, or let us assign the best available.</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <div className={`nails-book-option${booking.artist === "any" ? " selected" : ""}`} onClick={() => set("artist", "any")}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: booking.artist === "any" ? C.rose : C.border, flexShrink: 0, transition: "background 0.2s" }} />
                      <div><div style={{ fontFamily: BODY, fontSize: "0.88rem", fontWeight: 500, color: C.text }}>No preference — best available</div></div>
                    </div>
                    {TEAM.map(t => (
                      <div key={t.name} className={`nails-book-option${booking.artist === t.name ? " selected" : ""}`} onClick={() => set("artist", t.name)}>
                        <img src={t.img} alt={t.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", objectPosition: "center top", flexShrink: 0 }} />
                        <div>
                          <div style={{ fontFamily: BODY, fontSize: "0.88rem", fontWeight: 500, color: C.text }}>{t.name}</div>
                          <div style={{ fontFamily: BODY, fontSize: "0.72rem", color: C.textMd }}>{t.role} · {t.spec}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3 — Date & Time */}
              {step === 3 && (
                <div>
                  <h2 style={{ fontFamily: DISPLAY, fontSize: "1.8rem", fontWeight: 400, color: C.plum, marginBottom: "0.5rem" }}>Pick a date & time</h2>
                  <p style={{ fontFamily: BODY, fontSize: "0.82rem", color: C.textMd, marginBottom: "2rem", fontWeight: 300 }}>Choose when works best for you.</p>
                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ fontFamily: BODY, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.textLt, display: "block", marginBottom: "0.5rem" }}>Date</label>
                    <input type="date" className="nails-book-input" style={{ maxWidth: 300 }} value={booking.date}
                      min={new Date().toISOString().split("T")[0]} onChange={e => set("date", e.target.value)} />
                  </div>
                  {booking.date && (
                    <div>
                      <label style={{ fontFamily: BODY, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.textLt, display: "block", marginBottom: "0.75rem" }}>Available Times</label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {TIMES.map(t => (
                          <button key={t} className={`nails-book-time${booking.time === t ? " selected" : ""}`}
                            onClick={() => set("time", t)}>{t}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 4 — Details */}
              {step === 4 && (
                <div>
                  <h2 style={{ fontFamily: DISPLAY, fontSize: "1.8rem", fontWeight: 400, color: C.plum, marginBottom: "0.5rem" }}>Your details</h2>
                  <p style={{ fontFamily: BODY, fontSize: "0.82rem", color: C.textMd, marginBottom: "2rem", fontWeight: 300 }}>Just a few details to confirm your booking.</p>
                  <div className="nails-book-2col" style={{ marginBottom: "1rem" }}>
                    <div>
                      <label style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.textLt, display: "block", marginBottom: "0.4rem" }}>Full Name *</label>
                      <input className="nails-book-input" placeholder="Your name" value={booking.name} onChange={e => set("name", e.target.value)} />
                    </div>
                    <div>
                      <label style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.textLt, display: "block", marginBottom: "0.4rem" }}>Phone</label>
                      <input className="nails-book-input" placeholder="+44 7700 900000" value={booking.phone} onChange={e => set("phone", e.target.value)} />
                    </div>
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.textLt, display: "block", marginBottom: "0.4rem" }}>Email *</label>
                    <input className="nails-book-input" type="email" placeholder="you@example.com" value={booking.email} onChange={e => set("email", e.target.value)} />
                  </div>
                  <div>
                    <label style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.textLt, display: "block", marginBottom: "0.4rem" }}>Notes or Requests</label>
                    <textarea className="nails-book-input" rows={4} placeholder="Any allergies, special requests, or design references..."
                      value={booking.notes} onChange={e => set("notes", e.target.value)} style={{ resize: "vertical" }} />
                  </div>
                </div>
              )}

              {/* STEP 5 — Confirm */}
              {step === 5 && (
                <div>
                  <h2 style={{ fontFamily: DISPLAY, fontSize: "1.8rem", fontWeight: 400, color: C.plum, marginBottom: "0.5rem" }}>Confirm your booking</h2>
                  <p style={{ fontFamily: BODY, fontSize: "0.82rem", color: C.textMd, marginBottom: "2rem", fontWeight: 300 }}>Please review and confirm your appointment details.</p>
                  <div style={{ background: C.surface, padding: "2rem", marginBottom: "2rem" }}>
                    {[
                      ["Services",  selectedServices.map(s => s.name).join(", ") || "—"],
                      ["Artist",    booking.artist === "any" ? "Best Available" : booking.artist],
                      ["Date",      booking.date || "—"],
                      ["Time",      booking.time || "—"],
                      ["Name",      booking.name],
                      ["Email",     booking.email],
                      ...(booking.phone ? [["Phone", booking.phone]] as [string,string][] : []),
                      ...(booking.notes ? [["Notes", booking.notes]] as [string,string][] : []),
                    ].map(([k, v]) => (
                      <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "0.7rem 0", borderBottom: `1px solid ${C.border}`, gap: "1rem" }}>
                        <span style={{ fontFamily: BODY, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.textLt, flexShrink: 0 }}>{k}</span>
                        <span style={{ fontFamily: BODY, fontSize: "0.88rem", color: C.text, textAlign: "right", fontWeight: 400 }}>{v as string}</span>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontFamily: BODY, fontSize: "0.78rem", color: C.textLt, lineHeight: 1.65 }}>
                    A confirmation email will be sent to {booking.email}. You may cancel or reschedule up to 24 hours before your appointment.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2.5rem", paddingTop: "2rem", borderTop: `1px solid ${C.border}` }}>
            {step > 1 ? (
              <button onClick={() => setStep(s => s - 1)} style={{ fontFamily: BODY, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500, color: C.textMd, background: "none", border: `1px solid ${C.border}`, padding: "0.8rem 1.8rem", cursor: "pointer" }}>
                Back
              </button>
            ) : <div />}

            {step < 5 ? (
              <button onClick={() => setStep(s => s + 1)} disabled={!canProceed()} style={{
                fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase",
                fontWeight: 600, color: canProceed() ? C.white : C.textLt,
                background: canProceed() ? C.rose : C.border,
                border: "none", padding: "1rem 2.5rem", cursor: canProceed() ? "pointer" : "default",
                transition: "all 0.2s ease",
              }}>
                Continue
              </button>
            ) : (
              <button onClick={() => setSubmitted(true)} style={{
                fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase",
                fontWeight: 600, color: C.white, background: C.rose,
                border: "none", padding: "1rem 2.5rem", cursor: "pointer",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = C.plum)}
                onMouseLeave={e => (e.currentTarget.style.background = C.rose)}
              >
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
