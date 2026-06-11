"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const T = {
  bg:      "#FAFAF8",
  surface: "#F2EDE6",
  sage:    "#5C7A62",
  sageDk:  "#3F5A44",
  sageLt:  "#D4E2D6",
  text:    "#1A1714",
  textMd:  "#4A4540",
  textLt:  "#7A736C",
  border:  "#DDD8D0",
  white:   "#FFFFFF",
};
const EASE  = [0.23, 1, 0.32, 1] as const;
const SERIF = "'Playfair Display', Georgia, serif";
const SANS  = "'Inter', system-ui, sans-serif";
const BASE  = "/showcase/dental";

// ── Icon helpers ──────────────────────────────────────────────────────────────
const icons = {
  users:     <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={T.sage} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  shield:    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={T.sage} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  heart:     <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={T.sage} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  home:      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={T.sage} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  briefcase: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={T.sage} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  star:      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={T.sage} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  dollar:    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={T.sage} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  activity:  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={T.sage} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
};

// ── Service card (large) ──────────────────────────────────────────────────────
function ServiceCard({ icon, tag, title, desc, detail, i }: {
  icon: React.ReactNode; tag: string; title: string; desc: string; detail: string[]; i: number;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (i % 2) * 0.12, ease: EASE }}
      style={{ background: T.white, border: `1px solid ${T.border}`, padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
        <div style={{ width: 56, height: 56, background: T.sageLt, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {icon}
        </div>
        <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.sage, background: T.sageLt, padding: "4px 12px", whiteSpace: "nowrap", marginTop: 6 }}>{tag}</span>
      </div>
      <div>
        <h3 style={{ fontFamily: SERIF, fontSize: "1.4rem", fontWeight: 500, color: T.text, marginBottom: "0.75rem" }}>{title}</h3>
        <p style={{ fontSize: "0.87rem", color: T.textMd, lineHeight: "1.8" }}>{desc}</p>
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {detail.map(d => (
          <li key={d} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.82rem", color: T.textMd }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.sage, flexShrink: 0 }} />
            {d}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <div style={{ background: T.bg, fontFamily: SANS }}>

      {/* ── HERO ── */}
      <section style={{ position: "relative", height: 380, overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=1600&q=80" alt="Dental services" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.62) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", padding: "3rem 2rem", textAlign: "center" }}>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)", marginBottom: "0.75rem" }}>How we care for you</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ease: EASE }}
            style={{ fontFamily: SERIF, fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 500, color: "#fff", lineHeight: 1.1 }}>
            Every aspect of your dental health, covered.
          </motion.h1>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "4rem 2rem 3rem", textAlign: "center" }}>
        <p style={{ fontSize: "1.02rem", color: T.textMd, lineHeight: "1.85" }}>
          At Ivory Dental we go beyond treatments. Our complete suite of services is designed around each patient's individual needs — whether you're visiting us for the first time, managing ongoing care, or looking for a more comprehensive package for your family or team.
        </p>
      </section>

      {/* ── PRIMARY SERVICES — 2 col grid ── */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem 2rem" }}>
        <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.sage, marginBottom: "2rem" }}>Core services</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "1.5rem" }}>
          {[
            {
              icon: icons.users, tag: "Complimentary assessment",
              title: "New Patient Journey",
              desc: "Your first visit is a dedicated 60-minute welcome consultation. We review your dental history, take digital X-rays, assess your gums and bite, and build a completely personalised care plan — no rushing, no pressure, no obligation.",
              detail: ["Full medical history review", "Digital X-rays & intraoral camera", "Gum health assessment", "Personalised treatment roadmap"],
            },
            {
              icon: icons.shield, tag: "From £18 / month",
              title: "Dental Care Plans",
              desc: "Our monthly membership removes the unpredictability of dental bills. Cover includes two annual check-ups, two hygiene appointments, all routine X-rays and a 10% saving on every treatment — better value and simpler than dental insurance.",
              detail: ["2× check-ups per year", "2× hygiene appointments per year", "All routine X-rays included", "10% discount on all treatments"],
            },
            {
              icon: icons.heart, tag: "Anxiety-free",
              title: "Sedation Dentistry",
              desc: "For patients who feel anxious about dental treatment, we offer conscious IV sedation and oral sedation. You remain safe and able to respond but feel deeply relaxed and, for most patients, have little to no memory of the procedure.",
              detail: ["Conscious IV sedation", "Oral sedation tablets", "Dedicated sedation nurse present", "Post-sedation recovery suite"],
            },
            {
              icon: icons.home, tag: "Ages 3 and above",
              title: "Family Dentistry",
              desc: "We welcome patients from age three upward. Our child-friendly approach uses gentle techniques and a calm, unhurried manner to build positive associations with dentistry from an early age — protecting oral health for life.",
              detail: ["Child check-ups from age 3", "NHS-aligned fees for under-18s", "Fissure sealants & fluoride treatments", "Orthodontic monitoring & referral"],
            },
            {
              icon: icons.briefcase, tag: "Group rates available",
              title: "Corporate Dental Care",
              desc: "We partner with London businesses to provide group dental care plans, lunchtime appointments with minimal disruption to the working day, and annual on-site health screening days at your offices.",
              detail: ["Group care plan pricing", "Lunchtime & early morning slots", "On-site health screening days", "HR dental benefit packages"],
            },
            {
              icon: icons.star, tag: "Before treatment begins",
              title: "Digital Smile Design",
              desc: "Using advanced software and high-resolution photography, we map your facial proportions and create a fully digital preview of your new smile before any treatment begins. See exactly what's possible — and approve it before we start.",
              detail: ["High-res facial photography", "Proportional smile analysis", "Digital mock-up preview", "Wax-up confirmation option"],
            },
            {
              icon: icons.dollar, tag: "0% interest available",
              title: "Dental Finance",
              desc: "We believe cost should never be a barrier to a healthy smile. We offer 0% interest finance on all treatments over £500, spread over 12 months, with straightforward terms and no hidden fees. Subject to status.",
              detail: ["0% interest over 12 months", "Available on treatments from £500", "Instant online decision", "No early repayment charges"],
            },
            {
              icon: icons.activity, tag: "Included at every check-up",
              title: "Oral Cancer Screening",
              desc: "VELscope fluorescence screening is included as standard at every check-up. The exam takes under two minutes, is completely painless, and detects early signs of oral cancer when treatment is most effective. Early detection saves lives.",
              detail: ["VELscope fluorescence technology", "Included at every check-up", "Full soft tissue examination", "Instant results & referral if needed"],
            },
          ].map((s, i) => <ServiceCard key={s.title} {...s} i={i} />)}
        </div>
      </section>

      {/* ── PROCESS STEPS ── */}
      <section style={{ background: T.surface, borderTop: `1px solid ${T.border}`, padding: "6rem 2rem", marginTop: "4rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.sage, marginBottom: "0.75rem" }}>Your first visit</p>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, color: T.text }}>What to expect</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2px", background: T.border }}>
            {[
              { step: "01", title: "Book online",        desc: "Choose your appointment type and preferred time. New patients are offered the next available slot within 48 hours." },
              { step: "02", title: "Welcome & paperwork", desc: "Arrive 10 minutes early to complete your medical history form over a cup of tea in our calm waiting area." },
              { step: "03", title: "Full examination",   desc: "Digital X-rays, intraoral photos, gum probe readings and a full cancer screening — nothing is missed." },
              { step: "04", title: "Your care plan",     desc: "We walk you through our findings, explain every option and create a prioritised plan that fits your timeline and budget." },
            ].map((s, i) => (
              <motion.div key={s.step} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 16 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.45, ease: EASE }}
                style={{ background: T.white, padding: "2.5rem 2rem" }}>
                <p style={{ fontFamily: SERIF, fontSize: "3rem", fontWeight: 400, color: T.sageLt, lineHeight: 1, marginBottom: "1rem" }}>{s.step}</p>
                <h3 style={{ fontFamily: SERIF, fontSize: "1.1rem", fontWeight: 500, color: T.text, marginBottom: "0.6rem" }}>{s.title}</h3>
                <p style={{ fontSize: "0.83rem", color: T.textLt, lineHeight: "1.75" }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "6rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.sage, marginBottom: "0.75rem" }}>Common questions</p>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 500, color: T.text }}>Service FAQs</h2>
        </div>
        {[
          { q: "Are you accepting new patients?",      a: "Yes — we welcome new patients every day. You can book online or call us and we'll do our best to offer an appointment within 48 hours." },
          { q: "Do you see NHS patients?",             a: "We are a private practice. However, our care plans start from £18/month and make private dentistry highly competitive with NHS pricing for regular attenders." },
          { q: "What if I need to cancel?",            a: "We ask for 48 hours' notice for cancellations. Late cancellations or no-shows may incur a small fee as a courtesy to other patients on our waiting list." },
          { q: "Do you have parking nearby?",          a: "There are several NCP car parks within 5 minutes' walk of 42 Harley Street. We're also 3 minutes from Oxford Circus and Bond Street tube stations." },
          { q: "Can I pay on the day or do I need to book finance in advance?", a: "You can pay on the day by card, bank transfer or cash. If you'd like to spread payments using our 0% finance option, we'll set this up at your consultation appointment — it takes about 10 minutes." },
        ].map((faq, i) => (
          <FaqItem key={i} {...faq} i={i} />
        ))}
      </section>

      {/* ── CTA ── */}
      <section style={{ background: T.sage, padding: "5rem 2rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: "1rem" }}>Ready to get started?</p>
        <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 500, color: "#fff", marginBottom: "1.25rem" }}>
          Book your complimentary consultation
        </h2>
        <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.75)", maxWidth: 440, margin: "0 auto 2rem", lineHeight: "1.75" }}>
          Not sure which service is right for you? Come in and we'll guide you through every option — no charge, no pressure.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href={`${BASE}/book`}
            style={{ padding: "0.875rem 2.25rem", background: T.white, color: T.sage, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", transition: "background 200ms" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.sageLt}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.white}>
            Book now
          </Link>
          <Link href={BASE}
            style={{ padding: "0.875rem 2.25rem", background: "transparent", color: "#fff", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", border: "1.5px solid rgba(255,255,255,0.5)", textDecoration: "none" }}>
            Back to home
          </Link>
        </div>
      </section>

    </div>
  );
}

// ── FAQ accordion item ────────────────────────────────────────────────────────
function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${T.border}`, overflow: "hidden" }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: "1rem" }}>
        <span style={{ fontSize: "0.92rem", fontWeight: 600, color: T.text, fontFamily: SANS }}>{q}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 250ms" }}>
          <path d="M3 6l5 5 5-5" stroke={T.sage} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <motion.div animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} initial={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
        <p style={{ fontSize: "0.87rem", color: T.textLt, lineHeight: "1.8", paddingBottom: "1.25rem", fontFamily: SANS }}>{a}</p>
      </motion.div>
    </div>
  );
}

