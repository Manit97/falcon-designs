"use client";

import { useState } from "react";
import Link from "next/link";

const T = {
  bg:      "#FAFAF8",
  surface: "#F2EDE6",
  sage:    "#5C7A62",
  sageDk:  "#3F5A44",
  sageLt:  "#EBF0EC",
  gold:    "#A8865C",
  text:    "#1A1714",
  textMd:  "#4A4540",
  textLt:  "#8A8480",
  border:  "#DDD8D0",
};
const SERIF = "'Playfair Display', Georgia, serif";
const SANS  = "'Inter', system-ui, sans-serif";
const BASE  = "/showcase/dental";

const TREATMENTS = [
  { id: "general",      label: "General Dentistry",   desc: "Check-ups, fillings, hygiene" },
  { id: "cosmetic",     label: "Cosmetic Dentistry",   desc: "Veneers, bonding, smile design" },
  { id: "orthodontics", label: "Orthodontics",         desc: "Braces, Invisalign, retainers" },
  { id: "implants",     label: "Dental Implants",      desc: "Single, multiple, full arch" },
  { id: "whitening",    label: "Teeth Whitening",      desc: "Zoom, home kits, combination" },
  { id: "emergency",    label: "Emergency Dental",     desc: "Same-day urgent care" },
];

const CLINICIANS = [
  { id: "any",       name: "No Preference",     role: "First available clinician",  img: null },
  { id: "mitchell",  name: "Dr. Sarah Mitchell", role: "Principal & Cosmetic Lead",  img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&h=120&fit=crop&crop=face" },
  { id: "okafor",    name: "Dr. James Okafor",   role: "Implant Specialist",          img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=120&h=120&fit=crop&crop=face" },
  { id: "sharma",    name: "Dr. Priya Sharma",   role: "Orthodontics & Aligners",     img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&fit=crop&crop=face" },
  { id: "cole",      name: "Hannah Cole",        role: "Lead Dental Hygienist",       img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=120&h=120&fit=crop&crop=face" },
];

const TIMES = ["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"];

function getDays() {
  const days = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  for (let i = 0; i < 14; i++) {
    const clone = new Date(d);
    clone.setDate(d.getDate() + i);
    const dow = clone.getDay();
    if (dow !== 0) days.push(clone);
  }
  return days;
}

const DAYS = getDays();
const DAY_SHORT = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MON_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const TOTAL_STEPS = 5;

function StepBar({ step }: { step: number }) {
  const labels = ["Treatment","Clinician","Date & Time","Your Details","Confirm"];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: "3rem" }}>
      {labels.map((label, i) => {
        const idx = i + 1;
        const done = step > idx;
        const active = step === idx;
        return (
          <div key={label} style={{ display: "flex", alignItems: "center", flex: i < labels.length - 1 ? 1 : undefined }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: done ? T.sage : active ? T.sage : T.border,
                color: done || active ? "#fff" : T.textLt,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.8rem", fontWeight: 600, transition: "all 300ms",
                flexShrink: 0,
              }}>
                {done ? "✓" : idx}
              </div>
              <span style={{ fontSize: "0.65rem", fontWeight: active ? 600 : 400, color: active ? T.sage : done ? T.textMd : T.textLt, whiteSpace: "nowrap", letterSpacing: "0.04em" }}>{label}</span>
            </div>
            {i < labels.length - 1 && (
              <div style={{ flex: 1, height: 2, background: done ? T.sage : T.border, margin: "0 0.5rem", marginBottom: "1.4rem", transition: "background 300ms" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [treatment, setTreatment] = useState("");
  const [clinician, setClinician] = useState("");
  const [day, setDay] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const selectedTreatment = TREATMENTS.find(t => t.id === treatment);
  const selectedClinician = CLINICIANS.find(c => c.id === clinician);

  function submit() {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setDone(true); }, 1400);
  }

  if (done) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem 2rem", textAlign: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: T.sageLt, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", fontSize: "2rem" }}>✓</div>
        <h1 style={{ fontFamily: SERIF, fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 600, color: T.text, marginBottom: "1rem" }}>Appointment Requested</h1>
        <p style={{ fontSize: "1rem", color: T.textMd, maxWidth: 460, lineHeight: 1.7, marginBottom: "0.6rem" }}>
          Thank you, <strong>{form.name}</strong>. We've received your request for a <strong>{selectedTreatment?.label}</strong> appointment
          {day ? ` on ${DAY_SHORT[day.getDay()]} ${day.getDate()} ${MON_SHORT[day.getMonth()]} at ${time}` : ""}.
        </p>
        <p style={{ fontSize: "0.9rem", color: T.textLt, marginBottom: "2.5rem" }}>A confirmation email will be sent to <strong>{form.email}</strong> within a few minutes.</p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href={BASE} style={{ padding: "0.75rem 2rem", background: T.sage, color: "#fff", textDecoration: "none", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Back to Home</Link>
          <Link href={`${BASE}/contact`} style={{ padding: "0.75rem 2rem", border: `1.5px solid ${T.border}`, color: T.textMd, textDecoration: "none", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Contact Us</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: T.bg, minHeight: "100vh", fontFamily: SANS }}>
      {/* Hero strip */}
      <div style={{ background: T.text, padding: "4rem 2rem 3rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: T.sage, marginBottom: "0.75rem" }}>Ivory Dental</p>
        <h1 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 600, color: "#fff", marginBottom: "0.6rem" }}>Book an Appointment</h1>
        <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", maxWidth: 480, margin: "0 auto" }}>Complete the steps below and we'll confirm within 2 hours.</p>
      </div>

      {/* Form card */}
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "3rem 2rem 5rem" }}>
        <StepBar step={step} />

        {/* Step 1 — Treatment */}
        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: SERIF, fontSize: "1.5rem", fontWeight: 600, color: T.text, marginBottom: "0.5rem" }}>What treatment are you looking for?</h2>
            <p style={{ fontSize: "0.875rem", color: T.textLt, marginBottom: "2rem" }}>Select the category that best matches your needs.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
              {TREATMENTS.map(t => (
                <button key={t.id} onClick={() => setTreatment(t.id)}
                  style={{
                    padding: "1.5rem 1.25rem", border: `2px solid ${treatment === t.id ? T.sage : T.border}`,
                    background: treatment === t.id ? T.sageLt : "#fff",
                    textAlign: "left", cursor: "pointer", transition: "all 180ms",
                  }}>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600, color: T.text, marginBottom: "0.3rem" }}>{t.label}</div>
                  <div style={{ fontSize: "0.78rem", color: T.textLt }}>{t.desc}</div>
                </button>
              ))}
            </div>
            <button onClick={() => treatment && setStep(2)} disabled={!treatment}
              style={{ padding: "0.85rem 2.5rem", background: treatment ? T.sage : T.border, color: "#fff", border: "none", cursor: treatment ? "pointer" : "not-allowed", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", transition: "background 200ms" }}>
              Continue →
            </button>
          </div>
        )}

        {/* Step 2 — Clinician */}
        {step === 2 && (
          <div>
            <h2 style={{ fontFamily: SERIF, fontSize: "1.5rem", fontWeight: 600, color: T.text, marginBottom: "0.5rem" }}>Choose your clinician</h2>
            <p style={{ fontSize: "0.875rem", color: T.textLt, marginBottom: "2rem" }}>All clinicians are GDC registered and highly experienced.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2.5rem" }}>
              {CLINICIANS.map(c => (
                <button key={c.id} onClick={() => setClinician(c.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: "1rem",
                    padding: "1rem 1.25rem", border: `2px solid ${clinician === c.id ? T.sage : T.border}`,
                    background: clinician === c.id ? T.sageLt : "#fff",
                    textAlign: "left", cursor: "pointer", transition: "all 180ms",
                  }}>
                  {c.img ? (
                    <img src={c.img} alt={c.name} style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                  ) : (
                    <div style={{ width: 52, height: 52, borderRadius: "50%", background: T.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", flexShrink: 0 }}>👤</div>
                  )}
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 600, color: T.text }}>{c.name}</div>
                    <div style={{ fontSize: "0.78rem", color: T.textLt }}>{c.role}</div>
                  </div>
                  {clinician === c.id && <div style={{ marginLeft: "auto", color: T.sage, fontWeight: 700, fontSize: "1rem" }}>✓</div>}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={() => setStep(1)} style={{ padding: "0.85rem 1.75rem", border: `1.5px solid ${T.border}`, background: "transparent", color: T.textMd, cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>← Back</button>
              <button onClick={() => clinician && setStep(3)} disabled={!clinician}
                style={{ padding: "0.85rem 2.5rem", background: clinician ? T.sage : T.border, color: "#fff", border: "none", cursor: clinician ? "pointer" : "not-allowed", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", transition: "background 200ms" }}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Date & Time */}
        {step === 3 && (
          <div>
            <h2 style={{ fontFamily: SERIF, fontSize: "1.5rem", fontWeight: 600, color: T.text, marginBottom: "0.5rem" }}>Select a date & time</h2>
            <p style={{ fontSize: "0.875rem", color: T.textLt, marginBottom: "2rem" }}>Available slots for the next two weeks are shown below.</p>

            {/* Day picker */}
            <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "0.5rem", marginBottom: "2rem" }}>
              {DAYS.map((d, i) => {
                const sel = day?.toDateString() === d.toDateString();
                const isSat = d.getDay() === 6;
                return (
                  <button key={i} onClick={() => { setDay(d); setTime(""); }}
                    style={{
                      flexShrink: 0, padding: "0.75rem 0.9rem", border: `2px solid ${sel ? T.sage : T.border}`,
                      background: sel ? T.sage : "#fff", cursor: "pointer", transition: "all 180ms", minWidth: 64, textAlign: "center",
                    }}>
                    <div style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: sel ? "rgba(255,255,255,0.75)" : T.textLt, marginBottom: "0.3rem" }}>{DAY_SHORT[d.getDay()]}</div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, color: sel ? "#fff" : T.text }}>{d.getDate()}</div>
                    <div style={{ fontSize: "0.65rem", color: sel ? "rgba(255,255,255,0.65)" : T.textLt }}>{MON_SHORT[d.getMonth()]}</div>
                    {isSat && <div style={{ fontSize: "0.58rem", color: sel ? "rgba(255,255,255,0.7)" : T.gold, marginTop: "0.2rem" }}>AM only</div>}
                  </button>
                );
              })}
            </div>

            {/* Time slots */}
            {day && (
              <div>
                <p style={{ fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textLt, marginBottom: "0.75rem" }}>
                  Available times — {DAY_SHORT[day.getDay()]} {day.getDate()} {MON_SHORT[day.getMonth()]}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
                  {TIMES.filter(t => {
                    if (day.getDay() === 6) return parseInt(t) < 13;
                    return true;
                  }).map(t => (
                    <button key={t} onClick={() => setTime(t)}
                      style={{
                        padding: "0.55rem 0.9rem", border: `1.5px solid ${time === t ? T.sage : T.border}`,
                        background: time === t ? T.sage : "#fff", color: time === t ? "#fff" : T.textMd,
                        cursor: "pointer", fontSize: "0.82rem", fontWeight: 500, transition: "all 150ms",
                      }}>{t}</button>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={() => setStep(2)} style={{ padding: "0.85rem 1.75rem", border: `1.5px solid ${T.border}`, background: "transparent", color: T.textMd, cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>← Back</button>
              <button onClick={() => day && time && setStep(4)} disabled={!day || !time}
                style={{ padding: "0.85rem 2.5rem", background: day && time ? T.sage : T.border, color: "#fff", border: "none", cursor: day && time ? "pointer" : "not-allowed", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", transition: "background 200ms" }}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 4 — Details */}
        {step === 4 && (
          <div>
            <h2 style={{ fontFamily: SERIF, fontSize: "1.5rem", fontWeight: 600, color: T.text, marginBottom: "0.5rem" }}>Your details</h2>
            <p style={{ fontSize: "0.875rem", color: T.textLt, marginBottom: "2rem" }}>We'll use this to confirm your appointment and send reminders.</p>

            <style>{`@media(max-width:480px){ .iv-book-form-row{grid-template-columns:1fr!important} }`}</style>
            <div className="iv-book-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
              {([
                { key: "name",  label: "Full Name",      placeholder: "Sarah Johnson", type: "text" },
                { key: "phone", label: "Phone Number",   placeholder: "07700 900000",  type: "tel" },
              ] as const).map(f => (
                <label key={f.key} style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textMd }}>{f.label}</span>
                  <input type={f.type} placeholder={f.placeholder} value={form[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{ padding: "0.75rem 1rem", border: `1.5px solid ${T.border}`, background: "#fff", fontSize: "0.9rem", color: T.text, outline: "none", fontFamily: SANS }} />
                </label>
              ))}
            </div>
            <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.25rem" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textMd }}>Email Address</span>
              <input type="email" placeholder="sarah@example.com" value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                style={{ padding: "0.75rem 1rem", border: `1.5px solid ${T.border}`, background: "#fff", fontSize: "0.9rem", color: T.text, outline: "none", fontFamily: SANS }} />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "2.5rem" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textMd }}>Additional Notes <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: T.textLt }}>(optional)</span></span>
              <textarea placeholder="Any concerns, allergies, or relevant dental history…" value={form.notes}
                onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} rows={4}
                style={{ padding: "0.75rem 1rem", border: `1.5px solid ${T.border}`, background: "#fff", fontSize: "0.9rem", color: T.text, outline: "none", fontFamily: SANS, resize: "vertical" }} />
            </label>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={() => setStep(3)} style={{ padding: "0.85rem 1.75rem", border: `1.5px solid ${T.border}`, background: "transparent", color: T.textMd, cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>← Back</button>
              <button onClick={() => form.name && form.email && form.phone && setStep(5)}
                disabled={!form.name || !form.email || !form.phone}
                style={{ padding: "0.85rem 2.5rem", background: form.name && form.email && form.phone ? T.sage : T.border, color: "#fff", border: "none", cursor: form.name && form.email && form.phone ? "pointer" : "not-allowed", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", transition: "background 200ms" }}>
                Review Booking →
              </button>
            </div>
          </div>
        )}

        {/* Step 5 — Confirm */}
        {step === 5 && (
          <div>
            <h2 style={{ fontFamily: SERIF, fontSize: "1.5rem", fontWeight: 600, color: T.text, marginBottom: "0.5rem" }}>Review & confirm</h2>
            <p style={{ fontSize: "0.875rem", color: T.textLt, marginBottom: "2rem" }}>Please check your booking details before submitting.</p>

            <div style={{ border: `1.5px solid ${T.border}`, background: "#fff", padding: "2rem", marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: T.textLt, marginBottom: "1.5rem" }}>Booking Summary</h3>
              {[
                { label: "Treatment",   value: selectedTreatment?.label ?? "" },
                { label: "Clinician",   value: selectedClinician?.name ?? "" },
                { label: "Date",        value: day ? `${DAY_SHORT[day.getDay()]} ${day.getDate()} ${MON_SHORT[day.getMonth()]} ${new Date().getFullYear()}` : "" },
                { label: "Time",        value: time },
                { label: "Name",        value: form.name },
                { label: "Email",       value: form.email },
                { label: "Phone",       value: form.phone },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "0.65rem 0", borderBottom: `1px solid ${T.border}` }}>
                  <span style={{ fontSize: "0.8rem", color: T.textLt, fontWeight: 500, minWidth: 110 }}>{row.label}</span>
                  <span style={{ fontSize: "0.9rem", color: T.text, fontWeight: 500, textAlign: "right" }}>{row.value}</span>
                </div>
              ))}
              {form.notes && (
                <div style={{ padding: "0.65rem 0" }}>
                  <span style={{ fontSize: "0.8rem", color: T.textLt, fontWeight: 500 }}>Notes</span>
                  <p style={{ fontSize: "0.85rem", color: T.textMd, marginTop: "0.3rem" }}>{form.notes}</p>
                </div>
              )}
            </div>

            <p style={{ fontSize: "0.78rem", color: T.textLt, marginBottom: "2rem", lineHeight: 1.6 }}>
              By submitting this request you agree to our privacy policy. We will contact you within 2 hours to confirm your appointment.
            </p>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={() => setStep(4)} style={{ padding: "0.85rem 1.75rem", border: `1.5px solid ${T.border}`, background: "transparent", color: T.textMd, cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>← Edit</button>
              <button onClick={submit} disabled={submitting}
                style={{ padding: "0.85rem 2.5rem", background: T.sage, color: "#fff", border: "none", cursor: submitting ? "wait" : "pointer", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", opacity: submitting ? 0.7 : 1, transition: "opacity 200ms", minWidth: 200 }}>
                {submitting ? "Submitting…" : "Confirm Appointment"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
