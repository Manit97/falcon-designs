"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BASE, T, SERIF, SANS, EASE, BRAND } from "./lib/data";

function FontLoader() {
  useEffect(() => {
    if (document.getElementById("mn-fonts")) return;
    const l = document.createElement("link");
    l.id = "mn-fonts";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;0,6..96,700;1,6..96,400;1,6..96,500;1,6..96,600;1,6..96,700&family=Jost:wght@300;400;500;600&display=swap";
    document.head.appendChild(l);
  }, []);
  return null;
}

const NAV_LINKS = [
  { label: "Services", href: `${BASE}/services` },
  { label: "Gallery",  href: `${BASE}/gallery`  },
  { label: "About",    href: `${BASE}`           },
];

export default function SalonLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const isHome = pathname === BASE || pathname === `${BASE}/`;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); setMobileOpen(false); }, [pathname]);

  const navBg     = scrolled || !isHome ? `rgba(11,21,18,0.96)` : "transparent";
  const navBorder = scrolled || !isHome ? T.border : "transparent";

  return (
    <div id="mn-root" style={{ background: T.bg, fontFamily: SANS, minHeight: "100dvh", color: T.cream }}>
      <FontLoader />

      <style>{`
        #mn-root *, #mn-root *::before, #mn-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
        #mn-root a { text-decoration: none; }
        #mn-root button { cursor: pointer; border: none; background: none; font-family: inherit; }
        #mn-root img { display: block; max-width: 100%; }
        html { scroll-behavior: smooth; }

        @keyframes mnTicker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes mnFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes mnReveal {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }
        @keyframes mnScaleIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }

        /* Grid helpers */
        .mn-svc-grid     { display: grid; grid-template-columns: repeat(3, 1fr); }
        .mn-team-grid    { display: grid; grid-template-columns: repeat(3, 1fr); }
        .mn-gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
        .mn-price-grid   { display: grid; grid-template-columns: 1fr 1fr; }
        .mn-2col         { display: grid; grid-template-columns: 1fr 1fr; }

        @media (max-width: 900px) {
          .mn-svc-grid     { grid-template-columns: 1fr !important; }
          .mn-team-grid    { grid-template-columns: 1fr 1fr !important; }
          .mn-gallery-grid { grid-template-columns: 1fr 1fr !important; }
          .mn-2col         { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .mn-team-grid    { grid-template-columns: 1fr !important; }
          .mn-gallery-grid { grid-template-columns: 1fr !important; }
          .mn-price-grid   { grid-template-columns: 1fr !important; }
        }

        /* Mobile nav */
        .mn-desktop-nav { display: flex; }
        .mn-burger      { display: none; }
        @media (max-width: 768px) {
          .mn-desktop-nav { display: none !important; }
          .mn-burger      { display: flex !important; }
        }

        /* Homepage philosophy pillars */
        .mn-philosophy-pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; }

        /* Homepage gallery preview (asymmetric) */
        .mn-gallery-preview      { display: grid; grid-template-columns: 1.2fr 1fr 1fr; grid-template-rows: auto auto; gap: 0.75rem; }
        .mn-gallery-preview-hero { grid-row: 1 / 3; }

        /* Book page step row */
        .mn-step-row { display: flex; gap: 2.5rem; flex-wrap: wrap; }

        @media (max-width: 900px) {
          .mn-philosophy-pillars   { grid-template-columns: 1fr 1fr !important; }
          .mn-gallery-preview      { grid-template-columns: 1fr 1fr !important; grid-template-rows: auto !important; }
          .mn-gallery-preview-hero { grid-row: auto !important; aspect-ratio: 1 / 1 !important; }
        }
        @media (max-width: 600px) {
          .mn-philosophy-pillars   { grid-template-columns: 1fr !important; }
          .mn-svc-offset-frame     { display: none !important; }
          .mn-svc-price-tag        { position: absolute !important; bottom: 0 !important; right: 0 !important; }
          .mn-step-row             { gap: 1rem !important; }
          nav { padding: 0 1.25rem !important; }
          footer > div             { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          #mn-root *, #mn-root *::before, #mn-root *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        background: navBg,
        backdropFilter: (scrolled || !isHome) ? "blur(20px) saturate(1.4)" : "none",
        borderBottom: `1px solid ${navBorder}`,
        transition: `background 400ms ${EASE}, border-color 400ms ${EASE}`,
      }}>
        <nav style={{
          maxWidth: 1320, margin: "0 auto", padding: "0 2.5rem",
          height: 68, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <Link href={BASE} style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <span style={{
              fontFamily: SERIF, fontSize: "1.05rem", fontWeight: 700,
              letterSpacing: "0.22em", color: T.cream, lineHeight: 1,
            }}>MAISON</span>
            <span style={{
              fontFamily: SERIF, fontSize: "1.05rem", fontWeight: 400, fontStyle: "italic",
              letterSpacing: "0.22em", color: T.amber, lineHeight: 1,
            }}>NOIR</span>
          </Link>

          {/* Desktop links */}
          <div className="mn-desktop-nav" style={{ alignItems: "center", gap: "2.5rem" }}>
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} style={{
                fontFamily: SANS, fontSize: "0.68rem", fontWeight: 500,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: pathname === l.href ? T.amber : T.cream,
                opacity: pathname === l.href ? 1 : 0.7,
                transition: `color 250ms, opacity 250ms`,
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.color = T.amber; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = pathname === l.href ? "1" : "0.7"; (e.currentTarget as HTMLElement).style.color = pathname === l.href ? T.amber : T.cream; }}
              >{l.label}</Link>
            ))}
            <Link href={`${BASE}/book`} style={{
              fontFamily: SANS, fontSize: "0.65rem", fontWeight: 600,
              letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "0.6rem 1.4rem", background: T.amber, color: T.bg,
              transition: `background 250ms ${EASE}`,
              display: "inline-block",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.amberLt}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.amber}
            >Book Now</Link>
          </div>

          {/* Burger */}
          <button
            className="mn-burger"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(o => !o)}
            style={{ flexDirection: "column", gap: 5, padding: 4 }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: 22, height: 1.5, background: T.cream,
                transformOrigin: "center",
                transform: mobileOpen
                  ? i === 0 ? "translateY(6.5px) rotate(45deg)"
                  : i === 2 ? "translateY(-6.5px) rotate(-45deg)"
                  : "scaleX(0)"
                  : "none",
                transition: `transform 300ms ${EASE}`,
              }} />
            ))}
          </button>
        </nav>

        {/* Mobile menu */}
        <div style={{
          overflow: "hidden", maxHeight: mobileOpen ? "320px" : 0,
          transition: `max-height 400ms ${EASE}`,
          background: "rgba(11,21,18,0.98)", backdropFilter: "blur(20px)",
          borderTop: `1px solid ${T.border}`,
        }}>
          <div style={{ padding: "1.5rem 2.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} style={{
                fontFamily: SANS, fontSize: "0.75rem", fontWeight: 500,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: pathname === l.href ? T.amber : T.cream,
              }}>{l.label}</Link>
            ))}
            <Link href={`${BASE}/book`} style={{
              fontFamily: SANS, fontSize: "0.65rem", fontWeight: 600,
              letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "0.75rem 1.5rem", background: T.amber, color: T.bg,
              textAlign: "center", marginTop: "0.5rem",
            }}>Book Appointment</Link>
          </div>
        </div>
      </header>

      {/* ── PAGE CONTENT ── */}
      {children}

      {/* ── FOOTER ── */}
      <footer style={{ background: "#080E0C", borderTop: `1px solid ${T.borderLt}`, padding: "4rem 2.5rem 2.5rem" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div className="mn-2col" style={{ gap: "4rem", marginBottom: "3.5rem", alignItems: "start" }}>
            <div>
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ fontFamily: SERIF, fontSize: "1.4rem", fontWeight: 700, letterSpacing: "0.18em", color: T.cream, lineHeight: 1.1 }}>MAISON</div>
                <div style={{ fontFamily: SERIF, fontSize: "1.4rem", fontWeight: 400, fontStyle: "italic", letterSpacing: "0.18em", color: T.amber, lineHeight: 1.1 }}>NOIR</div>
              </div>
              <p style={{ fontFamily: SANS, fontSize: "0.82rem", color: T.textMd, lineHeight: 1.75, maxWidth: 340 }}>
                A hair atelier in Marylebone, London. Specialists in bespoke colour, precision cutting, and restorative treatments.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
              <div>
                <div style={{ fontFamily: SANS, fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: T.amber, marginBottom: "1rem" }}>Studio</div>
                {[BRAND.address, BRAND.phone, BRAND.email].map((t, i) => (
                  <div key={i} style={{ fontFamily: SANS, fontSize: "0.78rem", color: T.textMd, lineHeight: 1.9 }}>{t}</div>
                ))}
              </div>
              <div>
                <div style={{ fontFamily: SANS, fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: T.amber, marginBottom: "1rem" }}>Hours</div>
                <div style={{ fontFamily: SANS, fontSize: "0.78rem", color: T.textMd, lineHeight: 2 }}>
                  Tue – Sat<br />9:00 – 19:00<br /><br />Sunday<br />10:00 – 17:00<br /><br />Mon Closed
                </div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${T.borderLt}`, paddingTop: "1.75rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <span style={{ fontFamily: SANS, fontSize: "0.68rem", color: T.textMd, opacity: 0.6 }}>© 2026 Maison Noir Ltd. All rights reserved.</span>
            <span style={{ fontFamily: SANS, fontSize: "0.68rem", color: T.textMd, opacity: 0.4, letterSpacing: "0.1em" }}>Template by Falcon Designs</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
