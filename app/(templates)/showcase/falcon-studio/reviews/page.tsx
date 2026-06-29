"use client";
import React from "react";
import Link from "next/link";
import { ContainerScroll, CardsContainer, CardTransformed, ReviewStars } from "@/components/ui/container-scroll";
import TwitterTestimonials from "@/components/ui/twitter-testimonial-cards";
import { TypewriterTestimonial } from "@/components/ui/typewriter-testimonial";

// ─── Old newspaper palette ────────────────────────────────────────────────────
const E = {
  bg: "#f0ebe0",          // aged newsprint
  bgAlt: "#e8e2d5",       // slightly darker cream
  surface: "#e2dbd0",     // card surface
  ink: "#1c1814",         // warm near-black ink
  inkMid: "#4a4540",      // mid ink
  inkFaint: "#8a8278",    // faint ink
  rule: "#c4bdb0",        // warm gray column rule
  accent: "#8b2500",      // masthead dark red
  hero: "#141210",        // hero background (near-black for contrast)
  display: "'Playfair Display', 'Georgia', serif",
  body: "'DM Sans', 'Inter', sans-serif",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const REVIEWS = [
  { name: "Priya Mehta",      role: "Creative Director", company: "Nova Agency",       rating: 5, text: "Falcon Studio cut our project handover time in half. Clients can update content themselves without breaking anything — that alone is worth every penny.",              avatar: "PM", color: "#6366f1" },
  { name: "James Whitfield",  role: "Freelance Designer", company: "Independent",      rating: 5, text: "I've tried every website builder out there. Nothing comes close to the level of control Falcon gives you without needing to write a single line of code.",      avatar: "JW", color: "#f59e0b" },
  { name: "Sofia Andersen",   role: "Founder",           company: "Brighten Studio",   rating: 5, text: "The eCommerce features are genuinely powerful. We launched a full client shop in 3 days — something that used to take us 3 weeks with our old stack.",            avatar: "SA", color: "#10b981" },
  { name: "Marcus Cole",      role: "Head of Digital",   company: "Atlas Group",       rating: 5, text: "Our SEO scores jumped from 61 to 94 after migrating to Falcon Studio. The built-in structured data and Core Web Vitals optimisation is outstanding.",            avatar: "MC", color: "#ef4444" },
  { name: "Yuki Tanaka",      role: "UI/UX Designer",    company: "Forma Lab",         rating: 5, text: "The animation system is a designer's dream. I can prototype scroll-driven experiences in hours that used to require a dedicated dev team.",                       avatar: "YT", color: "#8b5cf6" },
  { name: "Rachel Torres",    role: "Agency Owner",      company: "Meridian Creative",  rating: 5, text: "Client management is a game-changer. Custom dashboards, role permissions, live commenting — our clients actually love logging in.",                              avatar: "RT", color: "#0ea5e9" },
  { name: "Daniel Osei",      role: "Full-Stack Dev",    company: "Codeblock",          rating: 4, text: "As a developer I was sceptical of website builders. But the custom CSS layer and API access made me a convert. Best of both worlds.",                           avatar: "DO", color: "#f97316" },
  { name: "Amara Nwosu",      role: "Marketing Manager", company: "Spire Digital",     rating: 5, text: "The analytics integrations are seamless. Google Analytics 4, Meta Pixel, and Hotjar all connected in minutes — no GTM configuration needed.",                   avatar: "AN", color: "#ec4899" },
  { name: "Tom Hargreaves",   role: "Lead Designer",     company: "Studio CO.",         rating: 5, text: "I've recommended Falcon Studio to every client I work with. The page speed alone — consistently sub-2s — makes the sell so much easier.",                       avatar: "TH", color: "#14b8a6" },
];

const STATS = [
  { value: "4.9",  sup: "/ 5", label: "Average rating",  sub: "across 2,400+ reviews" },
  { value: "97",   sup: "%",   label: "Recommend us",     sub: "to a colleague" },
  { value: "12k",  sup: "+",   label: "Active agencies",  sub: "using Falcon Studio" },
  { value: "2.4M", sup: "",    label: "Sites built",      sub: "and counting" },
];

// Cards for 3D hero grid — 4 columns, ~5 cards each
type HeroCard = { quote: string; name: string; handle: string; country: string; avatar: string; color: string };

const COL_A: HeroCard[] = [
  { quote: "Cut our handover time in half.", name: "Priya Mehta",    handle: "@priya_m",   country: "India",   avatar: "PM", color: "#6366f1" },
  { quote: "The animation system is a dream.", name: "Yuki Tanaka",  handle: "@yukitan",   country: "Japan",   avatar: "YT", color: "#8b5cf6" },
  { quote: "Sub-2s page speed every time.",  name: "Tom Hargreaves", handle: "@tomharg",   country: "UK",      avatar: "TH", color: "#14b8a6" },
  { quote: "Best of both worlds.",           name: "Daniel Osei",    handle: "@dan_o",     country: "Ghana",   avatar: "DO", color: "#f97316" },
  { quote: "Clients love logging in.",       name: "Rachel Torres",  handle: "@rachtorres",country: "USA",     avatar: "RT", color: "#0ea5e9" },
];
const COL_B: HeroCard[] = [
  { quote: "Nothing comes close to this level of control.", name: "James Whitfield", handle: "@james_w",  country: "UK",        avatar: "JW", color: "#f59e0b" },
  { quote: "SEO scores jumped from 61 to 94.",             name: "Marcus Cole",     handle: "@marcuscole",country: "USA",       avatar: "MC", color: "#ef4444" },
  { quote: "Analytics connected in minutes.",              name: "Amara Nwosu",    handle: "@amara_n",   country: "Nigeria",   avatar: "AN", color: "#ec4899" },
  { quote: "Full shop launched in 3 days.",                name: "Sofia Andersen", handle: "@sofiaand",  country: "Denmark",   avatar: "SA", color: "#10b981" },
  { quote: "Prototype scroll experiences in hours.",       name: "Yuki Tanaka",    handle: "@yukitan",   country: "Japan",     avatar: "YT", color: "#8b5cf6" },
];
const COL_C: HeroCard[] = [
  { quote: "Our go-to tool for every client.",   name: "Rachel Torres",   handle: "@rachtorres", country: "USA",     avatar: "RT", color: "#0ea5e9" },
  { quote: "Cut our project timeline in half.",  name: "Priya Mehta",     handle: "@priya_m",    country: "India",   avatar: "PM", color: "#6366f1" },
  { quote: "Custom CSS layer is a game-changer.",name: "Daniel Osei",     handle: "@dan_o",      country: "Ghana",   avatar: "DO", color: "#f97316" },
  { quote: "Core Web Vitals have never looked better.", name: "Marcus Cole", handle: "@marcuscole", country: "USA",  avatar: "MC", color: "#ef4444" },
  { quote: "The eCommerce features are powerful.", name: "Sofia Andersen", handle: "@sofiaand",  country: "Denmark", avatar: "SA", color: "#10b981" },
];
const COL_D: HeroCard[] = [
  { quote: "GTM replaced in minutes.",     name: "Amara Nwosu",    handle: "@amara_n",    country: "Nigeria", avatar: "AN", color: "#ec4899" },
  { quote: "Consistently fast — every build.", name: "Tom Hargreaves", handle: "@tomharg", country: "UK",     avatar: "TH", color: "#14b8a6" },
  { quote: "Clients can self-serve now.",  name: "Priya Mehta",    handle: "@priya_m",    country: "India",   avatar: "PM", color: "#6366f1" },
  { quote: "No code needed for anything.", name: "James Whitfield",handle: "@james_w",    country: "UK",      avatar: "JW", color: "#f59e0b" },
  { quote: "Role permissions changed everything.", name: "Rachel Torres", handle: "@rachtorres", country: "USA", avatar: "RT", color: "#0ea5e9" },
];

// ─── Shared components ────────────────────────────────────────────────────────
function StarRating({ count, size = 13 }: { count: number; size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 14 14" fill={i < count ? E.accent : E.rule}>
          <path d="M7 1l1.545 3.13 3.455.502-2.5 2.436.59 3.44L7 8.885l-3.09 1.623.59-3.44L2 4.632l3.455-.502L7 1z" />
        </svg>
      ))}
    </span>
  );
}

// ─── 3D hero card ─────────────────────────────────────────────────────────────
function HeroCard({ card }: { card: HeroCard }) {
  return (
    <div style={{
      background: E.bg,
      border: `1px solid ${E.rule}`,
      borderRadius: 10,
      padding: "1rem 1.1rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.65rem",
      width: 200,
      flexShrink: 0,
      boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: card.color,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.62rem", fontWeight: 700, color: "#fff",
          fontFamily: "'DM Sans', sans-serif", flexShrink: 0,
        }}>{card.avatar}</div>
        <div>
          <div style={{ fontSize: "0.75rem", fontWeight: 600, color: E.ink, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.2 }}>{card.name}</div>
          <div style={{ fontSize: "0.65rem", color: E.inkFaint, fontFamily: "'DM Sans', sans-serif" }}>{card.handle} · {card.country}</div>
        </div>
      </div>
      <p style={{
        fontSize: "0.78rem",
        lineHeight: 1.6,
        color: E.inkMid,
        fontFamily: "'Playfair Display', serif",
        fontStyle: "italic",
      }}>&ldquo;{card.quote}&rdquo;</p>
    </div>
  );
}

// ─── Vertical scroll column ───────────────────────────────────────────────────
function ScrollColumn({ cards, duration, reverse = false, offset = 0 }: {
  cards: HeroCard[]; duration: string; reverse?: boolean; offset?: number;
}) {
  // Triple the cards so there's always content visible — the middle third loops
  const tripled = [...cards, ...cards, ...cards];
  return (
    <div style={{ flexShrink: 0, marginTop: offset }}>
      <style>{`
        @keyframes scrollUp   { from { transform: translateY(0); } to { transform: translateY(calc(-100% / 3)); } }
        @keyframes scrollDown { from { transform: translateY(calc(-100% / 3)); } to { transform: translateY(0); } }
      `}</style>
      <div style={{
        display: "flex", flexDirection: "column", gap: 10,
        animation: `${reverse ? "scrollDown" : "scrollUp"} ${duration} linear infinite`,
        willChange: "transform",
      }}>
        {tripled.map((card, i) => <HeroCard key={i} card={card} />)}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ReviewsPage() {

  return (
    <div style={{ background: E.bg, minHeight: "100vh", color: E.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f0ebe0; font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
        a { text-decoration: none; color: inherit; }
        .chip-btn { transition: background 0.15s, color 0.15s, border-color 0.15s; }
        .chip-btn:hover { border-color: #1c1814 !important; color: #1c1814 !important; }
      `}</style>

      {/* ── Nav ───────────────────────────────────────────────────────────── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(10,9,8,0.85)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2.5rem", height: 60 }}>
          <Link href="/showcase/falcon-studio" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: E.body, fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: E.bg }}>
            <div style={{ width: 22, height: 22, background: E.accent, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1L13 7L7 13L1 7L7 1Z" fill="#fff" /></svg>
            </div>
            Falcon Studio
          </Link>

          <div style={{ fontFamily: E.display, fontStyle: "italic", fontSize: "0.8rem", color: "rgba(247,245,240,0.3)" }}>
            Vol. III · Reviews
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <Link href="/showcase/falcon-studio/pricing" style={{ fontFamily: E.body, fontSize: "0.78rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(247,245,240,0.4)" }}>Pricing</Link>
            <Link href="/showcase/falcon-studio/reviews" style={{ fontFamily: E.body, fontSize: "0.78rem", letterSpacing: "0.06em", textTransform: "uppercase", color: E.accent, fontWeight: 600 }}>Reviews</Link>
            <button style={{ fontFamily: E.body, fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", background: E.accent, padding: "0.5rem 1.1rem", border: "none", cursor: "pointer" }}>
              Start Creating
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <header style={{
        minHeight: "100vh",
        background: E.hero,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        borderBottom: `1px solid rgba(255,255,255,0.06)`,
      }}>

        {/* LEFT — editorial headline */}
        <div style={{
          position: "relative",
          zIndex: 10,
          width: "46%",
          flexShrink: 0,
          padding: "6rem 0 6rem 5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "2rem",
        }}>
          {/* Kicker */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <StarRating count={5} size={13} />
            <span style={{ fontFamily: E.body, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(240,235,224,0.45)" }}>
              A showcase of social proof formats
            </span>
          </div>

          {/* Main headline */}
          <h1 style={{
            fontFamily: E.display,
            fontSize: "clamp(3.5rem, 5.5vw, 5.5rem)",
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: E.bg,
          }}>
            Your wins<br />
            <em style={{ fontWeight: 700, color: E.accent }}>deserve</em><br />
            a stage.
          </h1>

          {/* Subtext */}
          <p style={{ fontFamily: E.body, fontSize: "1rem", color: "rgba(240,235,224,0.45)", maxWidth: "32ch", lineHeight: 1.65 }}>
            Achievements this good shouldn&apos;t live in a plain grid. Explore every format we can build to present them.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "2.5rem", paddingTop: "0.5rem" }}>
            {[["6", "+", "Formats"], ["∞", "", "Layouts"], ["1", "st", "Impression"]].map(([val, sup, label], i, arr) => (
              <React.Fragment key={label}>
                <div>
                  <div style={{ fontFamily: E.display, fontSize: "2rem", fontWeight: 900, color: E.bg, lineHeight: 1 }}>
                    {val}<span style={{ color: E.accent, fontSize: "1rem" }}>{sup}</span>
                  </div>
                  <div style={{ fontFamily: E.body, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(240,235,224,0.3)", marginTop: "0.25rem" }}>{label}</div>
                </div>
                {i < arr.length - 1 && <div style={{ width: 1, background: "rgba(240,235,224,0.1)" }} />}
              </React.Fragment>
            ))}
          </div>

          {/* Scroll cue */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginTop: "0.5rem" }}>
            <div style={{ width: 24, height: 1, background: "rgba(240,235,224,0.2)" }} />
            <span style={{ fontFamily: E.body, fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(240,235,224,0.25)" }}>Scroll to explore formats</span>
          </div>
        </div>

        {/* RIGHT — 3D tilted card grid */}
        <div style={{
          position: "absolute",
          right: "-60px",
          top: 0,
          bottom: 0,
          width: "68%",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}>
          {/* Left-side gradient bleed from hero bg → transparent */}
          <div style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "38%",
            background: `linear-gradient(to right, ${E.hero} 0%, transparent 100%)`,
            zIndex: 5,
            pointerEvents: "none",
          }} />
          {/* Top/bottom fade */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to bottom, ${E.hero} 0%, transparent 18%, transparent 82%, ${E.hero} 100%)`,
            zIndex: 5,
            pointerEvents: "none",
          }} />

          {/* 3D perspective wrapper */}
          <div style={{ perspective: "900px", width: "100%", height: "100%" }}>
            <div style={{
              transform: "rotateX(15deg) rotateZ(-8deg) translateX(40px)",
              transformStyle: "preserve-3d",
              display: "flex",
              gap: 10,
              height: "150%",
              marginTop: "-25%",
              paddingLeft: "5%",
            }}>
              <ScrollColumn cards={COL_A} duration="22s"         offset={0}    />
              <ScrollColumn cards={COL_B} duration="28s" reverse offset={-80}  />
              <ScrollColumn cards={COL_C} duration="18s"         offset={40}   />
              <ScrollColumn cards={COL_D} duration="32s" reverse offset={-120} />
              <ScrollColumn cards={COL_A} duration="24s"         offset={60}   />
            </div>
          </div>
        </div>
      </header>

      {/* ── Bento body — scroll-locked ────────────────────────────────────── */}
      {/* ContainerScroll is the scroll driver. The sticky inner div locks   */}
      {/* the whole bento in place while cards animate on the right.         */}
      <ContainerScroll
        style={{ minHeight: "560vh", background: E.rule }}
        className="overflow-visible"
      >
        <div style={{
          position: "sticky",
          top: 0,
          height: "100svh",
          display: "flex",
          gap: "1px",
          overflow: "hidden",
        }}>

          {/* ── LEFT COLUMN ── 4 cards filling full viewport height */}
          <div style={{ flex: "0 0 42%", display: "flex", flexDirection: "column", gap: "1px", overflow: "hidden" }}>

            {/* Card 1 — Section header */}
            <div style={{ background: E.bg, padding: "2.25rem 2.75rem", flex: "0 0 auto" }}>
              <div style={{ fontFamily: E.body, fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: E.inkFaint, marginBottom: "0.9rem" }}>
                § Social Proof Formats
              </div>
              <h2 style={{ fontFamily: E.display, fontSize: "clamp(1.9rem, 2.8vw, 2.6rem)", fontWeight: 900, lineHeight: 0.93, letterSpacing: "-0.03em", color: E.ink, marginBottom: "0.9rem" }}>
                Proof that<br /><em style={{ color: E.accent }}>moves.</em>
              </h2>
              <p style={{ fontFamily: E.body, fontSize: "0.82rem", color: E.inkMid, lineHeight: 1.7, maxWidth: "36ch" }}>
                Your achievements deserve more than a plain grid. Here&apos;s every format we can build to show them.
              </p>
            </div>

            {/* Card 2 — Stats 2×2 grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: E.rule, flex: "0 0 auto" }}>
              {STATS.map((s) => (
                <div key={s.value} style={{ background: E.bgAlt, padding: "1.4rem 1.75rem" }}>
                  <div style={{ fontFamily: E.display, fontSize: "1.9rem", fontWeight: 900, letterSpacing: "-0.04em", color: E.ink, lineHeight: 1 }}>
                    {s.value}<span style={{ color: E.accent, fontSize: "0.85rem" }}>{s.sup}</span>
                  </div>
                  <div style={{ fontFamily: E.body, fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: E.ink, marginTop: "0.3rem" }}>{s.label}</div>
                  <div style={{ fontFamily: E.display, fontStyle: "italic", fontSize: "0.62rem", color: E.inkFaint, marginTop: "0.1rem" }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Card 3 — Twitter testimonial cards */}
            <div style={{ background: E.ink, flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <div style={{ padding: "1rem 1.75rem", borderBottom: "1px solid rgba(240,235,224,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
                <span style={{ fontFamily: E.body, fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(240,235,224,0.3)" }}>Format · X / Twitter cards</span>
                <ReviewStars rating={5} style={{ color: E.accent }} />
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "3.5rem 2rem 2rem", overflow: "hidden", height: "100%" }}>
                <TwitterTestimonials fillWidth />
              </div>
            </div>

          </div>

          {/* ── RIGHT CARD — review deck driven by outer ContainerScroll */}
          <div style={{ flex: 1, background: E.bg, display: "flex", flexDirection: "column", overflow: "hidden" }}>

            {/* Card label bar */}
            <div style={{ padding: "1.25rem 3rem", borderBottom: `1px solid ${E.rule}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
              <span style={{ fontFamily: E.body, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: E.inkFaint }}>Format · Scroll deck</span>
              <span style={{ fontFamily: E.display, fontStyle: "italic", fontSize: "0.75rem", color: E.inkFaint }}>Scroll to flip through</span>
            </div>

            {/* Centred deck — fills remaining height */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "4rem", padding: "2rem 3.5rem" }}>

              {/* Left label */}
              <div style={{ flex: "0 0 auto", width: 190 }}>
                <div style={{ fontFamily: E.body, fontSize: "0.58rem", letterSpacing: "0.16em", textTransform: "uppercase", color: E.inkFaint, marginBottom: "1rem" }}>One format</div>
                <div style={{ fontFamily: E.display, fontSize: "2.6rem", fontWeight: 900, lineHeight: 0.88, letterSpacing: "-0.04em", color: E.ink }}>
                  The<br />scroll<br /><em style={{ color: E.accent }}>deck.</em>
                </div>
                <div style={{ marginTop: "1.5rem", height: 1, width: "100%", background: E.rule }} />
                <p style={{ fontFamily: E.body, fontSize: "0.7rem", color: E.inkFaint, lineHeight: 1.65, marginTop: "0.85rem" }}>
                  Each card flips in as you scroll. Works for any quote, case study, or endorsement.
                </p>
              </div>

              {/* Animated card deck */}
              <CardsContainer style={{ width: 420, height: 340, flexShrink: 0 }}>
                {REVIEWS.map((r, i) => (
                  <CardTransformed
                    key={r.name}
                    index={i}
                    arrayLength={REVIEWS.length}
                    variant="light"
                    incrementY={8}
                    incrementZ={8}
                    style={{
                      background: i % 3 === 0 ? E.ink : i % 3 === 1 ? E.bgAlt : E.bg,
                      borderColor: i % 3 === 0 ? "rgba(240,235,224,0.1)" : E.rule,
                      borderRadius: 4,
                      padding: "1.5rem 1.75rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                    }}
                  >
                    <ReviewStars rating={r.rating} style={{ color: E.accent }} className="text-inherit" />
                    <p style={{ fontFamily: E.display, fontStyle: "italic", fontSize: "0.9rem", lineHeight: 1.6, color: i % 3 === 0 ? "rgba(240,235,224,0.9)" : E.inkMid, flexGrow: 1, display: "flex", alignItems: "center" }}>
                      &ldquo;{r.text}&rdquo;
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", paddingTop: "0.85rem", borderTop: `1px solid ${i % 3 === 0 ? "rgba(240,235,224,0.1)" : E.rule}`, width: "100%" }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: r.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: E.body, fontSize: "0.58rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>{r.avatar}</div>
                      <div>
                        <div style={{ fontFamily: E.body, fontSize: "0.75rem", fontWeight: 600, color: i % 3 === 0 ? E.bg : E.ink }}>{r.name}</div>
                        <div style={{ fontFamily: E.body, fontSize: "0.65rem", color: i % 3 === 0 ? "rgba(240,235,224,0.4)" : E.inkFaint }}>{r.role} · {r.company}</div>
                      </div>
                    </div>
                  </CardTransformed>
                ))}
              </CardsContainer>

            </div>
          </div>

        </div>
      </ContainerScroll>

      {/* ── Typewriter testimonials section ───────────────────────────────── */}
      <section style={{ background: E.bgAlt, borderTop: `1px solid ${E.rule}`, borderBottom: `1px solid ${E.rule}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "6rem 2.5rem" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "5rem", paddingBottom: "3rem", borderBottom: `1px solid ${E.rule}` }}>
            <div>
              <div style={{ fontFamily: E.body, fontSize: "0.65rem", letterSpacing: "0.16em", textTransform: "uppercase", color: E.inkFaint, marginBottom: "1rem" }}>
                § Format · Typewriter avatars
              </div>
              <h2 style={{ fontFamily: E.display, fontSize: "clamp(2.2rem, 3.5vw, 3rem)", fontWeight: 900, lineHeight: 0.93, letterSpacing: "-0.03em", color: E.ink }}>
                Hover to reveal<br /><em style={{ color: E.accent }}>the moment.</em>
              </h2>
            </div>
            <p style={{ fontFamily: E.body, fontSize: "0.88rem", color: E.inkMid, lineHeight: 1.75, maxWidth: "36ch", textAlign: "right" }}>
              Achievements feel personal when they&apos;re delivered one letter at a time. Each face hides a quote — hover to reveal it.
            </p>
          </div>

          {/* Typewriter avatars — large, centred */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TypewriterTestimonial testimonials={[
              { image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop", text: "Falcon Studio cut our delivery time in half. Absolute game changer for our agency.", name: "John Doe", jobtitle: "Software Engineer" },
              { image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=300&auto=format&fit=crop", text: "The templates are production-ready. We shipped a client site in 3 days flat.", name: "Jane Smith", jobtitle: "Marketing Manager" },
              { image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300&auto=format&fit=crop", text: "Scroll animations used to take us weeks. Now it's an afternoon. Incredible.", name: "Alex Johnson", jobtitle: "UX Designer" },
              { image: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?q=80&w=300&auto=format&fit=crop", text: "Best investment we made this year. ROI was visible within the first project.", name: "Emily White", jobtitle: "Project Lead" },
              { image: "https://images.unsplash.com/photo-1507003211169-0a6dd7228f2d?q=80&w=300&auto=format&fit=crop", text: "Our clients keep asking how we build so fast. Falcon Studio is our secret weapon.", name: "David Lee", jobtitle: "Creative Director" },
              { image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop", text: "The design quality blew our clients away. We closed two new contracts the week we launched.", name: "Sarah Chen", jobtitle: "Operations Manager" },
              { image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=300&auto=format&fit=crop", text: "We went from concept to live site in under a week. That's never happened before in our studio.", name: "Michael Brown", jobtitle: "Creative Lead" },
            ]} large />
          </div>

        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${E.rule}`, background: E.ink }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 2.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: E.body, fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(240,235,224,0.35)", marginBottom: "1.25rem" }}>
              Your turn
            </div>
            <h2 style={{
              fontFamily: E.display,
              fontSize: "clamp(2.5rem, 4vw, 3.75rem)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: E.bg,
              marginBottom: "1.5rem",
            }}>
              Show your wins<br />
              <span style={{ fontStyle: "italic", color: E.accent }}>beautifully.</span>
            </h2>
            <p style={{ fontFamily: E.body, fontSize: "0.95rem", color: "rgba(240,235,224,0.45)", maxWidth: "34ch", lineHeight: 1.65 }}>
              Pick the format that fits your brand. We&apos;ll build it into your site — scroll decks, tweet stacks, typewriter reveals and more.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "flex-start" }}>
            <a href="#" onClick={e => e.preventDefault()} style={{
              fontFamily: E.body, fontSize: "0.82rem", fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase",
              background: E.accent, color: "#fff", padding: "1rem 2.25rem", display: "inline-block",
            }}>
              Start free trial →
            </a>
            <Link href="/showcase/falcon-studio/pricing" style={{
              fontFamily: E.body, fontSize: "0.82rem", letterSpacing: "0.08em",
              textTransform: "uppercase", color: "rgba(240,235,224,0.35)",
              padding: "1rem 0", borderBottom: "1px solid rgba(240,235,224,0.12)",
            }}>
              View pricing
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
