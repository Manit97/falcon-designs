"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BASE, T, DISPLAY, SANS, EASE } from "./lib/data";

function FontLoader() {
  useEffect(() => {
    if (document.getElementById("ember-fonts")) return;
    const l = document.createElement("link");
    l.id = "ember-fonts";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Jost:wght@300;400;500;600&display=swap";
    document.head.appendChild(l);
  }, []);
  return null;
}

const NAV_LINKS = [
  { label: "Menu",    href: `${BASE}/menu` },
  { label: "Story",   href: `${BASE}/story` },
];

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); setMobileOpen(false); }, [pathname]);

  return (
    <div id="ember-root" style={{ background: T.bg, fontFamily: SANS, minHeight: "100dvh", color: T.cream }}>
      <FontLoader />

      <style>{`
        #ember-root *, #ember-root *::before, #ember-root *::after { box-sizing: border-box; margin: 0; }
        #ember-root a, #ember-root button { cursor: pointer !important; }
        html { scroll-behavior: smooth; }

        @keyframes emFadeUp   { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes emFadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes emRevealX  { from{clip-path:inset(0 100% 0 0)} to{clip-path:inset(0 0% 0 0)} }
        @keyframes emRevealY  { from{clip-path:inset(100% 0 0 0)} to{clip-path:inset(0% 0 0 0)} }
        @keyframes emLineGrow { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes emPulse    { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes emScroll   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(10px)} }

        /* Scroll-triggered reveals */
        .em-reveal { opacity:0; transform:translateY(28px); transition:opacity 800ms ${EASE}, transform 800ms ${EASE}; }
        .em-reveal.on { opacity:1; transform:translateY(0); }
        .em-reveal-img { clip-path:inset(0 100% 0 0); transition:clip-path 1100ms ${EASE}; }
        .em-reveal-img.on { clip-path:inset(0 0% 0 0); }
        .em-reveal-up { clip-path:inset(100% 0 0 0); transition:clip-path 900ms ${EASE}; }
        .em-reveal-up.on { clip-path:inset(0% 0 0 0); }
        .em-s1{transition-delay:80ms} .em-s2{transition-delay:160ms}
        .em-s3{transition-delay:240ms} .em-s4{transition-delay:320ms}
        .em-s5{transition-delay:400ms} .em-s6{transition-delay:480ms}

        /* Hover amber underline */
        .em-link { position:relative; }
        .em-link::after { content:''; position:absolute; bottom:-2px; left:0; width:100%; height:1px; background:${T.amber}; transform:scaleX(0); transform-origin:left; transition:transform 280ms ${EASE}; }
        @media (hover:hover) and (pointer:fine) { .em-link:hover::after { transform:scaleX(1); } }

        /* Grain overlay */
        .em-grain::before {
          content:''; position:absolute; inset:-40%; width:calc(100% + 80%); height:calc(100% + 80%);
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
          background-size: 180px 180px;
          opacity:0.35; pointer-events:none; z-index:2;
          animation: emGrain 8s steps(2) infinite;
        }
        @keyframes emGrain {
          0%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)} 20%{transform:translate(3%,2%)}
          30%{transform:translate(-1%,4%)} 40%{transform:translate(4%,-1%)} 50%{transform:translate(-3%,3%)}
          60%{transform:translate(2%,-4%)} 70%{transform:translate(-4%,1%)} 80%{transform:translate(3%,3%)}
          90%{transform:translate(-2%,-2%)} 100%{transform:translate(0,0)}
        }

        @media (prefers-reduced-motion:reduce) {
          .em-reveal,.em-reveal.on{transition:none;opacity:1;transform:none}
          .em-reveal-img,.em-reveal-img.on{transition:none;clip-path:none}
          .em-reveal-up,.em-reveal-up.on{transition:none;clip-path:none}
          .em-grain::before{animation:none}
        }

        /* Responsive */
        .em-desktop-nav { display:flex; }
        .em-burger { display:none !important; }
        @media (max-width:860px) {
          .em-desktop-nav { display:none !important; }
          .em-burger { display:flex !important; }
          .em-nav-inner { padding:0 1.5rem !important; }
        }
        .em-dish-row { display:grid; grid-template-columns:1fr 1fr; }
        .em-gallery-grid { display:grid; grid-template-columns:repeat(12,1fr); grid-template-rows:auto; }
        .em-menu-cols { display:grid; grid-template-columns:1fr 1fr; }
        .em-chef-grid { display:grid; grid-template-columns:1fr 1fr; }
        .em-press-grid { display:grid; grid-template-columns:repeat(3,1fr); }
        .em-footer-grid { display:grid; grid-template-columns:1.8fr 1fr 1fr 1fr; }
        @media (max-width:900px) {
          .em-dish-row  { grid-template-columns:1fr !important; }
          .em-gallery-grid { grid-template-columns:1fr 1fr !important; }
          .em-menu-cols { grid-template-columns:1fr !important; }
          .em-chef-grid { grid-template-columns:1fr !important; }
          .em-press-grid{ grid-template-columns:1fr !important; }
          .em-footer-grid { grid-template-columns:1fr 1fr !important; gap:2.5rem !important; }
        }
        @media (max-width:600px) {
          .em-gallery-grid { grid-template-columns:1fr !important; }
          .em-footer-grid  { grid-template-columns:1fr !important; }
          .em-px { padding-left:1.25rem !important; padding-right:1.25rem !important; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 600,
        background: scrolled ? `rgba(9,7,5,0.96)` : "transparent",
        backdropFilter: scrolled ? "blur(18px) saturate(1.4)" : "none",
        borderBottom: `1px solid ${scrolled ? T.border : "transparent"}`,
        transition: `all 380ms ${EASE}`,
      }}>
        <nav className="em-nav-inner" style={{ maxWidth: 1320, margin: "0 auto", padding: "0 2.5rem", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href={BASE} style={{ textDecoration: "none" }}>
            <span style={{
              fontFamily: DISPLAY, fontSize: "1.7rem", fontWeight: 300,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: T.cream, lineHeight: 1,
              transition: `color 300ms ${EASE}`,
            }}>Ember</span>
          </Link>

          {/* Desktop nav */}
          <div className="em-desktop-nav" style={{ alignItems: "center", gap: "0.5rem" }}>
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} className="em-link" style={{
                padding: "0.5rem 1.1rem",
                fontSize: "0.7rem", fontWeight: 400, letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: pathname.startsWith(l.href) ? T.amber : T.textMd,
                textDecoration: "none",
                transition: `color 250ms ${EASE}`,
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.cream}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = pathname.startsWith(l.href) ? T.amber : T.textMd}
              >{l.label}</Link>
            ))}

            <div style={{ width: 1, height: 16, background: T.border, margin: "0 0.5rem" }} />

            <Link href={`${BASE}/reserve`} style={{
              padding: "0.6rem 1.6rem",
              border: `1px solid ${T.amber}`,
              color: T.amber,
              fontSize: "0.66rem", fontWeight: 500, letterSpacing: "0.2em",
              textTransform: "uppercase", textDecoration: "none",
              transition: `background 220ms ${EASE}, color 220ms ${EASE}, transform 120ms ${EASE}`,
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = T.amber; el.style.color = T.bg; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = T.amber; }}
              onMouseDown={e => (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"}
              onMouseUp={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
            >Reserve</Link>
          </div>

          {/* Burger */}
          <button className="em-burger" onClick={() => setMobileOpen(o => !o)} aria-label="Menu" style={{
            background: "none", border: "none", padding: "0.5rem",
            flexDirection: "column", gap: "5px",
          }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ display: "block", width: 22, height: 1.5, background: T.cream, transition: `all 260ms ${EASE}` }} />
            ))}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{
            background: "rgba(9,7,5,0.98)", backdropFilter: "blur(20px)",
            borderTop: `1px solid ${T.border}`, padding: "2rem 1.5rem 2.5rem",
          }}>
            {[...NAV_LINKS, { label: "Reserve a Table", href: `${BASE}/reserve` }].map(l => (
              <Link key={l.href} href={l.href} style={{
                display: "block", padding: "0.75rem 0",
                fontSize: "0.9rem", fontWeight: 400, letterSpacing: "0.12em",
                textTransform: "uppercase", color: T.cream, textDecoration: "none",
                borderBottom: `1px solid ${T.borderLt}`,
              }}>{l.label}</Link>
            ))}
          </div>
        )}
      </header>

      <div style={{ paddingTop: 72 }}>{children}</div>

      {/* ── FOOTER ── */}
      <footer style={{ background: T.bgMd, borderTop: `1px solid ${T.border}`, padding: "5rem 2.5rem 2.5rem" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div className="em-footer-grid" style={{ gap: "4rem", marginBottom: "4rem" }}>

            {/* Brand */}
            <div>
              <div style={{ fontFamily: DISPLAY, fontSize: "2.2rem", fontWeight: 300, letterSpacing: "0.2em", textTransform: "uppercase", color: T.cream, marginBottom: "0.35rem" }}>Ember</div>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: T.amber, marginBottom: "1.5rem" }}>Fine Dining · Fitzrovia</div>
              <p style={{ fontSize: "0.82rem", color: T.textMd, lineHeight: 1.85, maxWidth: 260, marginBottom: "1.5rem" }}>
                Wood-fire European cuisine in the heart of Fitzrovia. Open Tuesday through Saturday for dinner, and Saturday for lunch.
              </p>
              <div style={{ fontSize: "0.75rem", color: T.textLt, lineHeight: 2 }}>
                <div>14 Charlotte Street, London W1T 2LT</div>
                <div>+44 (0)20 7123 8800</div>
                <div>reservations@emberlondon.co.uk</div>
              </div>
            </div>

            {/* Navigate */}
            <div>
              <h4 style={{ fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: T.amber, marginBottom: "1.25rem" }}>Navigate</h4>
              {[
                { label: "Home",    href: BASE },
                { label: "Menu",    href: `${BASE}/menu` },
                { label: "Reserve", href: `${BASE}/reserve` },
                { label: "Story",   href: `${BASE}/story` },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{ display: "block", fontSize: "0.8rem", color: T.textMd, textDecoration: "none", marginBottom: "0.55rem", transition: "color 150ms" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.cream}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.textMd}
                >{l.label}</Link>
              ))}
            </div>

            {/* Hours */}
            <div>
              <h4 style={{ fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: T.amber, marginBottom: "1.25rem" }}>Hours</h4>
              {[
                { day: "Tuesday – Friday", hours: "Dinner from 18:00" },
                { day: "Saturday",         hours: "Lunch 12:00 · Dinner 18:00" },
                { day: "Sunday – Monday",  hours: "Closed" },
              ].map(r => (
                <div key={r.day} style={{ marginBottom: "0.85rem" }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 500, color: T.cream }}>{r.day}</div>
                  <div style={{ fontSize: "0.72rem", color: T.textLt }}>{r.hours}</div>
                </div>
              ))}
            </div>

            {/* Private */}
            <div>
              <h4 style={{ fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: T.amber, marginBottom: "1.25rem" }}>Private Dining</h4>
              <p style={{ fontSize: "0.78rem", color: T.textMd, lineHeight: 1.8, marginBottom: "1rem" }}>
                The Cellar Room seats up to 18 guests. Bespoke menus available.
              </p>
              <Link href={`${BASE}/reserve`} style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: T.amber, textDecoration: "none" }}>
                Enquire →
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: `linear-gradient(90deg, ${T.amber}, transparent)`, opacity: 0.3, marginBottom: "1.5rem" }} />

          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", fontSize: "0.68rem", color: T.textLt }}>
            <span>© {new Date().getFullYear()} Ember London Ltd. All rights reserved.</span>
            <span>Michelin Bib Gourmand 2024 · AA ✦✦✦ Rosette</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
