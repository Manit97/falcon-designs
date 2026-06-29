"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ScannerCardStream = dynamic(() => import("@/components/ScannerCardStream").then(m => ({ default: m.ScannerCardStream })), { ssr: false });

const LUX = {
  bg: "#0c0a08",
  surface: "#141210",
  surfaceHigh: "#1c1916",
  gold: "#c9a96e",
  goldLight: "#e8d5b0",
  goldDim: "rgba(201,169,110,0.25)",
  text: "#f5f0e8",
  muted: "rgba(245,240,232,0.45)",
  subtle: "rgba(245,240,232,0.2)",
  border: "rgba(201,169,110,0.18)",
  borderSubtle: "rgba(245,240,232,0.08)",
  display: "'Wix Madefor Display', 'Inter', sans-serif",
  body: "'Wix Madefor Text', 'Inter', sans-serif",
};

const PLANS = [
  {
    name: "Starter",
    price: { monthly: 17, annual: 14 },
    desc: "For freelancers stepping into their craft with intention.",
    cta: "Begin your journey",
    features: [
      "3 published sites",
      "10 GB storage",
      "Falcon subdomain",
      "SSL certificate",
      "Basic analytics",
      "Community support",
    ],
    notIncluded: ["Custom domain", "eCommerce", "Client management", "Priority support"],
  },
  {
    name: "Pro",
    price: { monthly: 49, annual: 39 },
    desc: "For studios where every detail demands excellence.",
    highlight: true,
    cta: "Start creating",
    features: [
      "Unlimited sites",
      "100 GB storage",
      "Custom domain included",
      "SSL certificate",
      "Advanced analytics",
      "eCommerce (up to 1,000 products)",
      "Client management dashboard",
      "Priority email support",
    ],
    notIncluded: ["White-label", "Dedicated account manager"],
  },
  {
    name: "Enterprise",
    price: { monthly: null, annual: null },
    desc: "Bespoke solutions for studios of uncompromising scale.",
    cta: "Request a consultation",
    features: [
      "Unlimited everything",
      "White-label platform",
      "Custom integrations",
      "Dedicated account manager",
      "SLA & uptime guarantee",
      "SSO & advanced security",
      "Custom contracts & billing",
      "24/7 phone support",
    ],
    notIncluded: [],
  },
];

function Nav() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Wix+Madefor+Display:wght@400;700;800&family=Wix+Madefor+Text:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Wix Madefor Text', sans-serif; -webkit-font-smoothing: antialiased; background: ${LUX.bg}; }
        a { text-decoration: none; color: inherit; }
        .lux-nav-link { opacity: 0.5; transition: opacity 0.2s; }
        .lux-nav-link:hover { opacity: 1; }
      `}</style>
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(12,10,8,0.88)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${LUX.border}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2.5rem", height: 68 }}>
          <Link href="/showcase/falcon-studio" style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontFamily: LUX.display, fontSize: "1rem", fontWeight: 800, color: LUX.text, letterSpacing: "0.04em" }}>
            <div style={{ width: 26, height: 26, background: LUX.gold, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1L13 7L7 13L1 7L7 1Z" fill={LUX.bg} /></svg>
            </div>
            FALCON STUDIO
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <Link href="/showcase/falcon-studio/pricing" className="lux-nav-link" style={{ fontFamily: LUX.body, fontSize: "0.84rem", fontWeight: 500, color: LUX.text, padding: "0.4rem 0.85rem" }}>Pricing</Link>
            <Link href="/showcase/falcon-studio/reviews" className="lux-nav-link" style={{ fontFamily: LUX.body, fontSize: "0.84rem", fontWeight: 500, color: LUX.text, padding: "0.4rem 0.85rem" }}>Reviews</Link>
            <button style={{ fontFamily: LUX.body, fontSize: "0.82rem", fontWeight: 700, color: LUX.bg, background: LUX.gold, padding: "0.55rem 1.3rem", borderRadius: 100, border: "none", cursor: "pointer", marginLeft: "0.5rem" }}>Start Creating</button>
          </div>
        </div>
      </nav>
    </>
  );
}

function LuxHero() {
  const [visible, setVisible] = useState(false);
  const [line1, setLine1] = useState(false);
  const [line2, setLine2] = useState(false);
  const [sub, setSub] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => setLine1(true), 400);
    const t3 = setTimeout(() => setLine2(true), 750);
    const t4 = setTimeout(() => setSub(true), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden", background: LUX.bg }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.55, filter: "saturate(0.4) sepia(0.6) hue-rotate(10deg)" }}>
        <ScannerCardStream direction={-1} initialSpeed={90} friction={0.97} scanEffect="scramble" cardGap={40} repeat={4} />
      </div>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: `radial-gradient(ellipse at center, transparent 20%, ${LUX.bg} 75%)` }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", zIndex: 1, pointerEvents: "none", background: `linear-gradient(to top, ${LUX.bg} 0%, transparent 100%)` }} />

      <div style={{
        position: "absolute", left: "50%", top: "50%",
        transform: `translateX(-50%) translateY(-110px) scaleX(${visible ? 1 : 0})`,
        width: 120, height: 1,
        background: `linear-gradient(to right, transparent, ${LUX.gold}, transparent)`,
        transition: "transform 1.2s cubic-bezier(0.16,1,0.3,1)",
        zIndex: 2,
      }} />

      <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 2rem" }}>
        <p style={{ fontFamily: LUX.body, fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: LUX.gold, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.8s ease, transform 0.8s ease", marginBottom: "2rem" }}>
          Falcon Studio · Plans &amp; Pricing
        </p>
        <h1 style={{ fontFamily: LUX.display, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, color: LUX.text, margin: 0 }}>
          <span style={{ display: "block", fontSize: "clamp(3rem, 7vw, 6rem)", opacity: line1 ? 1 : 0, transform: line1 ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
            Crafted with intention.
          </span>
          <span style={{ display: "block", fontSize: "clamp(3rem, 7vw, 6rem)", color: LUX.gold, opacity: line2 ? 1 : 0, transform: line2 ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
            Priced with purpose.
          </span>
        </h1>
        <p style={{ fontFamily: LUX.body, fontSize: "1.05rem", color: LUX.muted, maxWidth: "44ch", lineHeight: 1.75, marginTop: "2rem", opacity: sub ? 1 : 0, transform: sub ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
          Every pixel deliberate. Every detail considered.<br />Choose the plan that moves with your ambition.
        </p>
        <div style={{ position: "absolute", bottom: "3rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", opacity: sub ? 0.5 : 0, transition: "opacity 1s ease 0.3s" }}>
          <span style={{ fontFamily: LUX.body, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: LUX.gold }}>Scroll</span>
          <div style={{ width: 1, height: 32, background: `linear-gradient(to bottom, ${LUX.gold}, transparent)` }} />
        </div>
      </div>
    </div>
  );
}

function LuxCardForm() {
  const [cardNum, setCardNum] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [flipped, setFlipped] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const raw = cardNum.replace(/\D/g, "");
  const g1 = (raw.slice(0, 4) + "####").slice(0, 4);
  const g2 = ("*".repeat(Math.min(raw.slice(4, 8).length, 4)) + "####").slice(0, 4);
  const g3 = ("*".repeat(Math.min(raw.slice(8, 12).length, 4)) + "####").slice(0, 4);
  const g4 = (raw.slice(12, 16) + "####").slice(0, 4);

  function fmtNumber(v: string) { return v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})/g, "$1 ").trim(); }
  function fmtExpiry(v: string) { const d = v.replace(/\D/g, "").slice(0, 4); return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d; }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2800);
  }

  return (
    <>
      <style>{`
        .lux-input::placeholder { color: rgba(201,169,110,0.2); }
        .lux-input:focus { outline: none; border-color: ${LUX.gold} !important; background: rgba(201,169,110,0.06) !important; }
        .ccf-card-wrapper { perspective: 900px; width: 100%; }
        .ccf-card-inner { position: relative; transition: transform 0.6s cubic-bezier(.4,0,.2,1); transform-style: preserve-3d; }
        .ccf-card-inner.flipped { transform: rotateY(180deg); }
        .ccf-card-face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .ccf-card-back { transform: rotateY(180deg); }
        @keyframes lux-ok { 0%{opacity:0;transform:translateY(6px)} 20%{opacity:1;transform:translateY(0)} 80%{opacity:1} 100%{opacity:0} }
        .lux-ok { animation: lux-ok 2.8s ease forwards; }
      `}</style>

      {/* Eyebrow */}
      <p style={{ fontFamily: LUX.body, fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: LUX.gold, marginBottom: "1.25rem" }}>
        Craftsmanship in motion
      </p>
      <h3 style={{ fontFamily: LUX.display, fontSize: "1.6rem", fontWeight: 800, color: LUX.text, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "0.6rem" }}>
        A living demonstration.
      </h3>
      <p style={{ fontFamily: LUX.body, fontSize: "0.875rem", color: LUX.muted, lineHeight: 1.65, marginBottom: "0.75rem" }}>
        This is an interactive showcase — a glimpse into what we build, not a live payment gateway. No data is collected, no transaction will occur.
      </p>
      <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(201,169,110,0.08)", border: `1px solid ${LUX.border}`, borderRadius: 6, padding: "0.4rem 0.75rem", marginBottom: "1.5rem" }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5.5" stroke={LUX.gold} strokeWidth="1"/><path d="M6 5v3M6 3.5v.5" stroke={LUX.gold} strokeWidth="1.2" strokeLinecap="round"/></svg>
        <span style={{ fontFamily: LUX.body, fontSize: "0.7rem", color: LUX.gold }}>Demo only — fully safe to interact with</span>
      </div>

      {/* Gold rule */}
      <div style={{ height: 1, background: `linear-gradient(to right, ${LUX.gold}, transparent)`, marginBottom: "2rem", opacity: 0.4 }} />

      {/* Card visual */}
      <div className="ccf-card-wrapper" style={{ marginBottom: "2rem" }}>
        <div className={`ccf-card-inner${flipped ? " flipped" : ""}`} style={{ height: 200, borderRadius: 16 }}>
          {/* FRONT */}
          <div className="ccf-card-face" style={{
            position: "absolute", inset: 0, borderRadius: 16, overflow: "hidden",
            background: `linear-gradient(135deg, #1c1610 0%, #2a1f0e 40%, #1a1208 100%)`,
            border: `1px solid ${LUX.border}`,
            boxShadow: `0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(201,169,110,0.15)`,
            padding: "1.4rem 1.6rem",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}>
            {/* Subtle grid pattern */}
            <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(201,169,110,0.04) 1px, transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none" }} />
            {/* Gold shimmer top edge */}
            <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${LUX.gold}, transparent)`, opacity: 0.5 }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
              <span style={{ fontFamily: LUX.display, fontSize: "0.75rem", fontWeight: 800, color: LUX.gold, letterSpacing: "0.18em" }}>FALCON</span>
              <svg width="36" height="24" viewBox="0 0 36 24" fill="none" opacity="0.6">
                <circle cx="14" cy="12" r="10" fill={LUX.gold} />
                <circle cx="22" cy="12" r="10" fill={LUX.goldLight} fillOpacity="0.5" />
              </svg>
            </div>

            <div style={{ position: "relative" }}>
              {/* Chip */}
              <svg width="36" height="28" viewBox="0 0 36 28" fill="none" style={{ marginBottom: "0.75rem" }}>
                <rect x="0.5" y="0.5" width="35" height="27" rx="4.5" fill="#c9a84c" stroke="#a8873a" />
                <rect x="11" y="0.5" width="14" height="27" fill="#a8873a" fillOpacity=".4" />
                <rect x="0.5" y="8" width="35" height="12" fill="#a8873a" fillOpacity=".4" />
              </svg>
            </div>

            <div style={{ position: "relative" }}>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: "1.05rem", fontWeight: 700, letterSpacing: "0.2em", color: LUX.goldLight, marginBottom: "0.6rem" }}>
                {g1} {g2} {g3} {g4}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontFamily: LUX.body, fontSize: "0.5rem", color: LUX.muted, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>Cardholder</div>
                  <div style={{ fontFamily: LUX.body, fontSize: "0.72rem", fontWeight: 600, color: LUX.text, letterSpacing: "0.06em" }}>{name.toUpperCase() || "YOUR NAME"}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: LUX.body, fontSize: "0.5rem", color: LUX.muted, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>Expires</div>
                  <div style={{ fontFamily: LUX.body, fontSize: "0.72rem", fontWeight: 600, color: LUX.text }}>{expiry || "MM/YY"}</div>
                </div>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div className="ccf-card-face ccf-card-back" style={{
            position: "absolute", inset: 0, borderRadius: 16, overflow: "hidden",
            background: `linear-gradient(135deg, #1c1610 0%, #2a1f0e 40%, #1a1208 100%)`,
            border: `1px solid ${LUX.border}`,
            boxShadow: `0 8px 40px rgba(0,0,0,0.6)`,
            display: "flex", flexDirection: "column", gap: "1rem",
          }}>
            <div style={{ height: 36, background: "rgba(0,0,0,0.5)", marginTop: 24 }} />
            <div style={{ padding: "0 1.4rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ flex: 1, height: 32, background: "rgba(201,169,110,0.06)", borderRadius: 4, border: `1px solid ${LUX.borderSubtle}` }} />
              <div style={{ width: 48, height: 32, background: LUX.surfaceHigh, borderRadius: 4, border: `1px solid ${LUX.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Courier New', monospace", fontSize: "0.85rem", color: LUX.gold, letterSpacing: 3 }}>{cvv ? ("*".repeat(cvv.length) + "###").slice(0, 3) : "###"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <label style={{ fontFamily: LUX.body, fontSize: "0.65rem", fontWeight: 600, color: LUX.muted, letterSpacing: "0.2em", textTransform: "uppercase" }}>Card number</label>
          <input className="lux-input" type="text" inputMode="numeric" placeholder="0000 0000 0000 0000" value={cardNum} onChange={e => setCardNum(fmtNumber(e.target.value))} maxLength={19}
            style={{ background: LUX.surface, border: `1px solid ${LUX.borderSubtle}`, borderRadius: 8, padding: "0.75rem 1rem", color: LUX.text, fontFamily: "'Courier New', monospace", fontSize: "0.95rem", letterSpacing: "0.12em", width: "100%", boxSizing: "border-box", transition: "border-color 0.2s" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <label style={{ fontFamily: LUX.body, fontSize: "0.65rem", fontWeight: 600, color: LUX.muted, letterSpacing: "0.2em", textTransform: "uppercase" }}>Cardholder name</label>
          <input className="lux-input" type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} maxLength={26}
            style={{ background: LUX.surface, border: `1px solid ${LUX.borderSubtle}`, borderRadius: 8, padding: "0.75rem 1rem", color: LUX.text, fontFamily: LUX.body, fontSize: "0.95rem", width: "100%", boxSizing: "border-box", transition: "border-color 0.2s" }} />
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ fontFamily: LUX.body, fontSize: "0.65rem", fontWeight: 600, color: LUX.muted, letterSpacing: "0.2em", textTransform: "uppercase" }}>Expiry</label>
            <input className="lux-input" type="text" inputMode="numeric" placeholder="MM/YY" value={expiry} onChange={e => setExpiry(fmtExpiry(e.target.value))} maxLength={5}
              style={{ background: LUX.surface, border: `1px solid ${LUX.borderSubtle}`, borderRadius: 8, padding: "0.75rem 1rem", color: LUX.text, fontFamily: "'Courier New', monospace", fontSize: "0.95rem", width: "100%", boxSizing: "border-box", transition: "border-color 0.2s" }} />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ fontFamily: LUX.body, fontSize: "0.65rem", fontWeight: 600, color: LUX.muted, letterSpacing: "0.2em", textTransform: "uppercase" }}>CVV</label>
            <input className="lux-input" type="password" inputMode="numeric" placeholder="···" value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} onFocus={() => setFlipped(true)} onBlur={() => setFlipped(false)} maxLength={4}
              style={{ background: LUX.surface, border: `1px solid ${LUX.borderSubtle}`, borderRadius: 8, padding: "0.75rem 1rem", color: LUX.text, fontFamily: "'Courier New', monospace", fontSize: "0.95rem", width: "100%", boxSizing: "border-box", transition: "border-color 0.2s" }} />
          </div>
        </div>
        <button type="submit" style={{ marginTop: "0.5rem", background: LUX.gold, color: LUX.bg, fontFamily: LUX.body, fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.06em", border: "none", borderRadius: 8, padding: "0.9rem 1rem", cursor: "pointer", transition: "opacity 0.2s" }}>
          {submitted ? "Processing..." : "Confirm & Pay →"}
        </button>
        {submitted && <div className="lux-ok" style={{ textAlign: "center", fontFamily: LUX.body, fontSize: "0.8rem", color: LUX.gold, letterSpacing: "0.1em" }}>Demonstration complete — no payment was made</div>}
        <p style={{ fontFamily: LUX.body, fontSize: "0.72rem", color: LUX.subtle, textAlign: "center", lineHeight: 1.6, marginTop: "0.25rem" }}>
          This form is a design showcase. Nothing you enter here is stored, transmitted, or charged. It exists purely to illustrate the level of craft we bring to every build.
        </p>
      </form>
    </>
  );
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <div style={{ background: LUX.bg, minHeight: "100vh", color: LUX.text }}>
      <Nav />
      <LuxHero />

      {/* Two-column layout: Plans left, Card form right — full viewport section */}
      <div style={{ height: "100vh", overflow: "hidden", display: "flex", alignItems: "center", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1400, width: "100%", margin: "0 auto", padding: "2rem 2rem", display: "grid", gridTemplateColumns: "1fr 400px", gap: "3rem", alignItems: "start" }}>

        {/* LEFT — intro + plans */}
        <div>
          {/* Intro */}
          <div style={{ marginBottom: "3rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: LUX.surfaceHigh, border: `1px solid ${LUX.border}`, borderRadius: 100, padding: "0.35rem 1rem 0.35rem 0.35rem", marginBottom: "2rem" }}>
              <span style={{ background: LUX.gold, borderRadius: 100, padding: "0.2rem 0.65rem", fontFamily: LUX.body, fontSize: "0.7rem", fontWeight: 700, color: LUX.bg }}>NEW</span>
              <span style={{ fontFamily: LUX.body, fontSize: "0.78rem", color: LUX.muted }}>AI site builder now included on all plans</span>
            </div>
            <h2 style={{ fontFamily: LUX.display, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "0.75rem", color: LUX.text }}>
              Simple, transparent pricing.
            </h2>
            <p style={{ fontFamily: LUX.body, fontSize: "1rem", color: LUX.muted, maxWidth: "44ch", marginBottom: "1.75rem", lineHeight: 1.7 }}>
              No hidden fees. No setup costs. Start free — upgrade when you&apos;re ready.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", background: LUX.surface, border: `1px solid ${LUX.borderSubtle}`, borderRadius: 100, padding: "0.3rem" }}>
              <button onClick={() => setAnnual(false)} style={{ fontFamily: LUX.body, fontSize: "0.84rem", fontWeight: 600, padding: "0.45rem 1.2rem", borderRadius: 100, border: "none", background: annual ? "transparent" : LUX.surfaceHigh, color: annual ? LUX.muted : LUX.text, cursor: "pointer", transition: "all 0.2s" }}>Monthly</button>
              <button onClick={() => setAnnual(true)} style={{ fontFamily: LUX.body, fontSize: "0.84rem", fontWeight: 600, padding: "0.45rem 1.2rem", borderRadius: 100, border: "none", background: annual ? LUX.surfaceHigh : "transparent", color: annual ? LUX.text : LUX.muted, cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                Annual
                <span style={{ background: LUX.goldDim, color: LUX.gold, fontSize: "0.65rem", fontWeight: 700, padding: "0.15rem 0.55rem", borderRadius: 100, border: `1px solid ${LUX.border}` }}>Save 20%</span>
              </button>
            </div>
          </div>

          {/* Plans — horizontal 3-col */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: LUX.borderSubtle, border: `1px solid ${LUX.borderSubtle}`, borderRadius: 20, overflow: "hidden" }}>
            {PLANS.map(plan => (
              <div key={plan.name} style={{ background: plan.highlight ? LUX.surfaceHigh : LUX.surface, padding: "1.75rem", position: "relative" }}>
                {plan.highlight && (
                  <>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, transparent, ${LUX.gold}, transparent)` }} />
                    <div style={{ position: "absolute", top: "0.85rem", right: "1rem", fontFamily: LUX.body, fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.15em", color: LUX.gold, textTransform: "uppercase" }}>Popular</div>
                  </>
                )}
                <div style={{ fontFamily: LUX.body, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.25em", color: plan.highlight ? LUX.gold : LUX.subtle, textTransform: "uppercase", marginBottom: "1rem" }}>{plan.name}</div>
                <div style={{ marginBottom: "0.6rem" }}>
                  {plan.price.monthly ? (
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.2rem" }}>
                      <span style={{ fontFamily: LUX.display, fontSize: "2.6rem", fontWeight: 800, color: plan.highlight ? LUX.goldLight : LUX.text, letterSpacing: "-0.04em" }}>${annual ? plan.price.annual : plan.price.monthly}</span>
                      <span style={{ fontFamily: LUX.body, fontSize: "0.78rem", color: LUX.muted }}>/mo</span>
                    </div>
                  ) : (
                    <div style={{ fontFamily: LUX.display, fontSize: "1.8rem", fontWeight: 800, color: LUX.text, paddingTop: "0.25rem" }}>Bespoke</div>
                  )}
                </div>
                <p style={{ fontFamily: LUX.body, fontSize: "0.78rem", color: LUX.muted, lineHeight: 1.6, marginBottom: "1.5rem" }}>{plan.desc}</p>
                <button style={{ display: "block", width: "100%", textAlign: "center", fontFamily: LUX.body, fontSize: "0.78rem", fontWeight: 700, background: plan.highlight ? LUX.gold : "transparent", color: plan.highlight ? LUX.bg : LUX.gold, padding: "0.7rem", borderRadius: 8, marginBottom: "1.5rem", border: `1px solid ${plan.highlight ? LUX.gold : LUX.border}`, cursor: "pointer" }}>
                  {plan.cta}
                </button>
                <div style={{ borderTop: `1px solid ${LUX.borderSubtle}`, paddingTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                        <path d="M2 6L4.5 8.5L10 3.5" stroke={plan.highlight ? LUX.gold : LUX.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span style={{ fontFamily: LUX.body, fontSize: "0.76rem", color: LUX.text, lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", opacity: 0.25 }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                        <path d="M3 9L9 3M3 3L9 9" stroke={LUX.muted} strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span style={{ fontFamily: LUX.body, fontSize: "0.76rem", color: LUX.muted, lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — luxury card form */}
        <div style={{ position: "sticky", top: "6rem", background: LUX.surface, border: `1px solid ${LUX.border}`, borderRadius: 20, padding: "2.5rem", boxShadow: `0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,169,110,0.1)` }}>
          {/* Gold corner accent */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, borderRadius: "20px 20px 0 0", background: `linear-gradient(to right, transparent, ${LUX.gold}, transparent)` }} />
          <LuxCardForm />
        </div>
      </div>
      </div>

      {/* Logos */}
      <section style={{ borderTop: `1px solid ${LUX.borderSubtle}`, borderBottom: `1px solid ${LUX.borderSubtle}`, padding: "4rem 2rem" }}>
        <p style={{ textAlign: "center", fontFamily: LUX.body, fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.25em", color: LUX.subtle, textTransform: "uppercase", marginBottom: "2.5rem" }}>Trusted by 12,000+ studios and agencies</p>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "3.5rem", flexWrap: "wrap" }}>
          {["STUDIO CO.", "NOVA AGENCY", "BRIGHTON & CO", "MERIDIAN", "ATLAS GROUP", "FORMA"].map(n => (
            <span key={n} style={{ fontFamily: LUX.display, fontWeight: 800, fontSize: "0.9rem", letterSpacing: "0.08em", color: LUX.subtle }}>{n}</span>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ margin: "6rem 2rem", borderRadius: 24, padding: "5rem 4rem", border: `1px solid ${LUX.border}`, background: LUX.surface, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
        <div style={{ position: "absolute", top: "-60px", right: "10%", width: 320, height: 320, borderRadius: "50%", background: LUX.goldDim, filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <p style={{ fontFamily: LUX.body, fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: LUX.gold, marginBottom: "1rem" }}>Begin your story</p>
          <h2 style={{ fontFamily: LUX.display, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800, color: LUX.text, letterSpacing: "-0.02em", marginBottom: "0.75rem", lineHeight: 1.1 }}>
            Where vision meets<br />execution.
          </h2>
          <p style={{ fontFamily: LUX.body, fontSize: "1rem", color: LUX.muted, maxWidth: "40ch" }}>
            Join 12,000+ agencies already building with Falcon Studio. 14-day free trial, no credit card required.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", position: "relative" }}>
          <button style={{ fontFamily: LUX.body, fontSize: "0.9rem", fontWeight: 700, background: LUX.gold, color: LUX.bg, padding: "0.9rem 2.2rem", borderRadius: 100, border: "none", cursor: "pointer" }}>Start free trial →</button>
          <button style={{ fontFamily: LUX.body, fontSize: "0.9rem", fontWeight: 500, color: LUX.muted, padding: "0.9rem 1.75rem", borderRadius: 100, border: `1px solid ${LUX.borderSubtle}`, background: "transparent", cursor: "pointer" }}>Talk to sales</button>
        </div>
      </section>
    </div>
  );
}
