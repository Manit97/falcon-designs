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
  "General Dentistry","Cosmetic Dentistry","Orthodontics",
  "Dental Implants","Teeth Whitening","Emergency Dental","Other / Not Sure",
];

const HOURS = [
  { day: "Monday – Friday", hours: "8:00 am – 7:00 pm" },
  { day: "Saturday",        hours: "9:00 am – 4:00 pm" },
  { day: "Sunday",          hours: "Closed" },
  { day: "Bank Holidays",   hours: "Emergency line only" },
];

function InfoRow({ icon, label, value, href }: { icon: string; label: string; value: string; href?: string }) {
  return (
    <div style={{ display: "flex", gap: "0.9rem", alignItems: "flex-start", marginBottom: "1.25rem" }}>
      <div style={{ width: 38, height: 38, borderRadius: "50%", background: T.sageLt, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>{icon}</div>
      <div>
        <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: T.textLt, marginBottom: "0.2rem" }}>{label}</p>
        {href ? (
          <a href={href} style={{ fontSize: "0.92rem", color: T.text, fontWeight: 500, textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.sage}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.text}
          >{value}</a>
        ) : (
          <p style={{ fontSize: "0.92rem", color: T.text, fontWeight: 500 }}>{value}</p>
        )}
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", treatment: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim())    e.name    = "Please enter your name";
    if (!form.email.trim())   e.email   = "Please enter your email";
    if (!form.message.trim()) e.message = "Please enter a message";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setDone(true); }, 1400);
  }

  if (done) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem 2rem", textAlign: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: T.sageLt, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", fontSize: "2rem" }}>✓</div>
        <h1 style={{ fontFamily: SERIF, fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 600, color: T.text, marginBottom: "1rem" }}>Message Received</h1>
        <p style={{ fontSize: "1rem", color: T.textMd, maxWidth: 460, lineHeight: 1.7, marginBottom: "0.6rem" }}>
          Thank you, <strong>{form.name}</strong>. A member of our team will reply to <strong>{form.email}</strong> within one working day.
        </p>
        <p style={{ fontSize: "0.9rem", color: T.textLt, marginBottom: "2.5rem" }}>For urgent matters, please call us on <strong>020 1234 5678</strong>.</p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href={BASE} style={{ padding: "0.75rem 2rem", background: T.sage, color: "#fff", textDecoration: "none", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Back to Home</Link>
          <Link href={`${BASE}/book`} style={{ padding: "0.75rem 2rem", border: `1.5px solid ${T.border}`, color: T.textMd, textDecoration: "none", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Book an Appointment</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: T.bg, fontFamily: SANS }}>
      {/* Hero */}
      <div style={{ background: T.text, padding: "4rem 2rem 3rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: T.sage, marginBottom: "0.75rem" }}>Get In Touch</p>
        <h1 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 600, color: "#fff", marginBottom: "0.6rem" }}>Contact Us</h1>
        <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", maxWidth: 480, margin: "0 auto" }}>We'd love to hear from you. Send us a message or give us a call.</p>
      </div>

      {/* Emergency Banner */}
      <div style={{ background: "#7B2323", padding: "0.9rem 2rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
        <span style={{ fontSize: "1rem" }}>🚑</span>
        <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#fff", letterSpacing: "0.03em" }}>Dental Emergency?</span>
        <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.8)" }}>Call our emergency line available 24/7:</span>
        <a href="tel:02012345679" style={{ fontSize: "0.9rem", fontWeight: 700, color: "#FFD4D4", textDecoration: "none" }}>020 1234 5679</a>
      </div>

      {/* Split layout */}
      <style>{`
        .iv-contact-grid { display: grid; grid-template-columns: 1fr 420px; gap: 4rem; align-items: start; }
        .iv-contact-name-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        @media (max-width: 820px) { .iv-contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } }
        @media (max-width: 480px) { .iv-contact-name-row { grid-template-columns: 1fr !important; } }
      `}</style>
      <div className="iv-contact-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 2rem 5rem" }}>

        {/* Left — Form */}
        <div>
          <h2 style={{ fontFamily: SERIF, fontSize: "1.75rem", fontWeight: 600, color: T.text, marginBottom: "0.5rem" }}>Send us a message</h2>
          <p style={{ fontSize: "0.875rem", color: T.textLt, marginBottom: "2.5rem" }}>Fill in the form and we'll get back to you within one working day.</p>

          <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="iv-contact-name-row">
              <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textMd }}>Full Name *</span>
                <input type="text" placeholder="Sarah Johnson" value={form.name}
                  onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: "" })); }}
                  style={{ padding: "0.75rem 1rem", border: `1.5px solid ${errors.name ? "#C0392B" : T.border}`, background: "#fff", fontSize: "0.9rem", color: T.text, outline: "none", fontFamily: SANS }} />
                {errors.name && <span style={{ fontSize: "0.72rem", color: "#C0392B" }}>{errors.name}</span>}
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textMd }}>Phone Number</span>
                <input type="tel" placeholder="07700 900000" value={form.phone}
                  onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                  style={{ padding: "0.75rem 1rem", border: `1.5px solid ${T.border}`, background: "#fff", fontSize: "0.9rem", color: T.text, outline: "none", fontFamily: SANS }} />
              </label>
            </div>

            <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textMd }}>Email Address *</span>
              <input type="email" placeholder="sarah@example.com" value={form.email}
                onChange={e => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: "" })); }}
                style={{ padding: "0.75rem 1rem", border: `1.5px solid ${errors.email ? "#C0392B" : T.border}`, background: "#fff", fontSize: "0.9rem", color: T.text, outline: "none", fontFamily: SANS }} />
              {errors.email && <span style={{ fontSize: "0.72rem", color: "#C0392B" }}>{errors.email}</span>}
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textMd }}>Treatment Interest</span>
              <select value={form.treatment} onChange={e => setForm(p => ({ ...p, treatment: e.target.value }))}
                style={{ padding: "0.75rem 1rem", border: `1.5px solid ${T.border}`, background: "#fff", fontSize: "0.9rem", color: form.treatment ? T.text : T.textLt, outline: "none", fontFamily: SANS, appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238A8480' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", paddingRight: "2.5rem" }}>
                <option value="">Select a treatment…</option>
                {TREATMENTS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textMd }}>Message *</span>
              <textarea placeholder="Tell us how we can help…" value={form.message} rows={5}
                onChange={e => { setForm(p => ({ ...p, message: e.target.value })); setErrors(p => ({ ...p, message: "" })); }}
                style={{ padding: "0.75rem 1rem", border: `1.5px solid ${errors.message ? "#C0392B" : T.border}`, background: "#fff", fontSize: "0.9rem", color: T.text, outline: "none", fontFamily: SANS, resize: "vertical" }} />
              {errors.message && <span style={{ fontSize: "0.72rem", color: "#C0392B" }}>{errors.message}</span>}
            </label>

            <p style={{ fontSize: "0.75rem", color: T.textLt, lineHeight: 1.6 }}>
              By submitting this form you agree to our privacy policy. We'll never share your details with third parties.
            </p>

            <button type="submit" disabled={submitting}
              style={{ alignSelf: "flex-start", padding: "0.9rem 2.5rem", background: T.sage, color: "#fff", border: "none", cursor: submitting ? "wait" : "pointer", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", opacity: submitting ? 0.7 : 1, transition: "all 200ms", minWidth: 200 }}
              onMouseEnter={e => { if (!submitting) (e.currentTarget as HTMLElement).style.background = T.sageDk; }}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.sage}
            >
              {submitting ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>

        {/* Right — Practice Info */}
        <div>
          {/* Contact details card */}
          <div style={{ background: "#fff", border: `1px solid ${T.border}`, padding: "2rem", marginBottom: "1.5rem" }}>
            <h3 style={{ fontFamily: SERIF, fontSize: "1.2rem", fontWeight: 600, color: T.text, marginBottom: "1.75rem" }}>Practice Details</h3>
            <InfoRow icon="📍" label="Address"   value="42 Harley Street, Marylebone, London W1G 9PH" />
            <InfoRow icon="📞" label="Main Line" value="020 1234 5678" href="tel:02012345678" />
            <InfoRow icon="✉️" label="Email"     value="hello@ivorydental.co.uk" href="mailto:hello@ivorydental.co.uk" />
            <InfoRow icon="🚑" label="Emergency" value="020 1234 5679 (24/7)" href="tel:02012345679" />
          </div>

          {/* Hours card */}
          <div style={{ background: "#fff", border: `1px solid ${T.border}`, padding: "2rem", marginBottom: "1.5rem" }}>
            <h3 style={{ fontFamily: SERIF, fontSize: "1.2rem", fontWeight: 600, color: T.text, marginBottom: "1.75rem" }}>Opening Hours</h3>
            {HOURS.map(h => (
              <div key={h.day} style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: `1px solid ${T.border}` }}>
                <span style={{ fontSize: "0.85rem", color: T.textMd, fontWeight: 500 }}>{h.day}</span>
                <span style={{ fontSize: "0.85rem", color: h.hours === "Closed" ? T.textLt : T.text, fontWeight: h.hours === "Closed" ? 400 : 600 }}>{h.hours}</span>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, height: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "2rem" }}>📍</span>
            <p style={{ fontSize: "0.8rem", fontWeight: 600, color: T.textMd }}>42 Harley Street</p>
            <p style={{ fontSize: "0.75rem", color: T.textLt }}>Marylebone · London W1G 9PH</p>
            <a href="#" style={{ marginTop: "0.5rem", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.sage, textDecoration: "none" }}>Open in Maps →</a>
          </div>

          {/* Book CTA */}
          <div style={{ background: T.sage, padding: "1.75rem", marginTop: "1.5rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#fff", marginBottom: "0.4rem" }}>Ready to book?</p>
            <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.7)", marginBottom: "1.25rem" }}>Skip the queue and book online in 2 minutes.</p>
            <Link href={`${BASE}/book`}
              style={{ display: "inline-block", padding: "0.7rem 1.75rem", background: "#fff", color: T.sage, textDecoration: "none", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Book Online
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
