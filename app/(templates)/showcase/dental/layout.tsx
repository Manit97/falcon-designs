"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const T = {
  bg:     "#FAFAF8",
  sage:   "#5C7A62",
  sageDk: "#3F5A44",
  text:   "#1A1714",
  textMd: "#4A4540",
  border: "#DDD8D0",
};
const SERIF = "'Playfair Display', Georgia, serif";
const SANS  = "'Inter', system-ui, sans-serif";

const BASE = "/showcase/dental";

const NAV_LINKS = [
  { label: "Services",   href: `${BASE}/services` },
  { label: "Treatments", href: `${BASE}#section-treatments` },
  { label: "About Us",   href: `${BASE}/about` },
  { label: "Gallery",    href: `${BASE}#section-gallery` },
  { label: "Contact",    href: `${BASE}/contact` },
];

function FontLoader() {
  useEffect(() => {
    if (document.getElementById("ivory-fonts")) return;
    const l = document.createElement("link");
    l.id   = "ivory-fonts";
    l.rel  = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap";
    document.head.appendChild(l);
  }, []);
  return null;
}

export default function DentalLayout({ children }: { children: React.ReactNode }) {
  const pathname   = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); setMobileOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href.startsWith("#") ? false : pathname === href || pathname === href + "/";

  return (
    <div id="ivory-dental-root" style={{ background: T.bg, fontFamily: SANS, minHeight: "100dvh" }}>
      <FontLoader />
      <style>{`
        #ivory-dental-root a { cursor: pointer !important; }
        #ivory-dental-root a * { cursor: pointer !important; }
        #ivory-dental-root button { cursor: pointer !important; }
        #ivory-dental-root button * { cursor: pointer !important; }

        .iv-desktop-nav { display: flex !important; }
        .iv-burger { display: none !important; }
        @media (max-width: 820px) {
          .iv-desktop-nav { display: none !important; }
          .iv-burger { display: flex !important; }
          .iv-nav { padding: 0 1.25rem !important; }
        }
        @media (max-width: 640px) {
          .iv-px { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 400,
        background: scrolled ? "rgba(250,250,248,0.96)" : "rgba(250,250,248,0.98)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${scrolled ? T.border : "transparent"}`,
        transition: "border-color 300ms",
      }}>
        <nav className="iv-nav" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href={BASE} style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", cursor: "pointer" }}>
            <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
              <path d="M14 3C10 3 7 6 7 9c0 2 .5 3.5 1 5l2 8c.3 1.2 1 2 2 2s1.5-.8 2-2l1-4 1 4c.5 1.2 1.2 2 2 2s1.7-.8 2-2l2-8c.5-1.5 1-3 1-5 0-3-3-6-7-6z" fill={T.sage} />
            </svg>
            <span style={{ fontFamily: SERIF, fontSize: "1.1rem", fontWeight: 600, color: T.text }}>Ivory Dental</span>
          </Link>

          {/* Desktop links */}
          <div className="iv-desktop-nav" style={{ gap: "2.25rem", alignItems: "center" }}>
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href}
                style={{
                  fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.05em",
                  color: isActive(l.href) ? T.sage : T.textMd,
                  textDecoration: "none",
                  cursor: "pointer",
                  userSelect: "none",
                  borderBottom: isActive(l.href) ? `1.5px solid ${T.sage}` : "1.5px solid transparent",
                  paddingBottom: "2px",
                  transition: "color 180ms, border-color 180ms",
                }}
                onMouseEnter={e => { if (!isActive(l.href)) (e.currentTarget as HTMLElement).style.color = T.sage; }}
                onMouseLeave={e => { if (!isActive(l.href)) (e.currentTarget as HTMLElement).style.color = T.textMd; }}
              >{l.label}</Link>
            ))}
            <Link href={`${BASE}/book`}
              style={{ padding: "0.65rem 1.4rem", background: T.sage, color: "#fff", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", cursor: "pointer", userSelect: "none", transition: "background 200ms" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.sageDk}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.sage}
            >Book Now</Link>
          </div>

          {/* Burger */}
          <button className="iv-burger" onClick={() => setMobileOpen(o => !o)} aria-label="Menu" style={{
            background: "none", border: "none", padding: "0.5rem",
            flexDirection: "column", gap: "5px",
          }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ display: "block", width: 22, height: 1.5, background: T.text, transition: "all 250ms" }} />
            ))}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{ background: "rgba(250,250,248,0.98)", backdropFilter: "blur(16px)", borderTop: `1px solid ${T.border}`, padding: "1.25rem 1.5rem 1.75rem" }}>
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} style={{
                display: "block", padding: "0.7rem 0",
                fontSize: "0.9rem", fontWeight: 500, color: isActive(l.href) ? T.sage : T.textMd,
                textDecoration: "none", borderBottom: `1px solid ${T.border}`,
              }}>{l.label}</Link>
            ))}
            <Link href={`${BASE}/book`} style={{
              display: "block", marginTop: "1.25rem", padding: "0.85rem 1.5rem",
              background: T.sage, color: "#fff", textAlign: "center",
              textDecoration: "none", fontSize: "0.78rem", fontWeight: 600,
              letterSpacing: "0.14em", textTransform: "uppercase",
            }}>Book Now</Link>
          </div>
        )}
      </header>

      {/* Page content — padded for fixed nav */}
      <div style={{ paddingTop: 68 }}>
        {children}
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: T.text, color: "rgba(255,255,255,0.65)", fontFamily: SANS, padding: "3.5rem 2rem 1.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "2.5rem", marginBottom: "2.5rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none"><path d="M14 3C10 3 7 6 7 9c0 2 .5 3.5 1 5l2 8c.3 1.2 1 2 2 2s1.5-.8 2-2l1-4 1 4c.5 1.2 1.2 2 2 2s1.7-.8 2-2l2-8c.5-1.5 1-3 1-5 0-3-3-6-7-6z" fill={T.sage} /></svg>
              <span style={{ fontFamily: SERIF, fontSize: "1rem", fontWeight: 600, color: "#fff" }}>Ivory Dental</span>
            </div>
            <p style={{ fontSize: "0.82rem", lineHeight: "1.7", color: "rgba(255,255,255,0.5)", maxWidth: 240 }}>Award-winning private dentistry in the heart of London. Exceptional care since 2010.</p>
          </div>
          <div>
            <h4 style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#D4E2D6", marginBottom: "1.25rem" }}>Pages</h4>
            {[
              { label: "Home",       href: BASE },
              { label: "Services",   href: `${BASE}/services` },
              { label: "Treatments", href: `${BASE}#section-treatments` },
              { label: "About Us",   href: `${BASE}/about` },
              { label: "Gallery",    href: `${BASE}#section-gallery` },
              { label: "Contact",    href: `${BASE}/contact` },
              { label: "Book",       href: `${BASE}/book` },
            ].map(l => (
              <Link key={l.label} href={l.href} style={{ display: "block", fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", textDecoration: "none", cursor: "pointer", userSelect: "none", marginBottom: "0.55rem", transition: "color 180ms" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)"}
              >{l.label}</Link>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#D4E2D6", marginBottom: "1.25rem" }}>Treatments</h4>
            {["General Dentistry","Cosmetic Dentistry","Orthodontics","Dental Implants","Teeth Whitening","Emergency Dental"].map(l => (
              <p key={l} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", marginBottom: "0.55rem" }}>{l}</p>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#D4E2D6", marginBottom: "1.25rem" }}>Contact</h4>
            {["020 1234 5678","hello@ivorydental.co.uk","42 Harley Street, W1G 9PH","Mon–Fri 8am–7pm · Sat 9am–4pm"].map(l => (
              <p key={l} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", marginBottom: "0.55rem" }}>{l}</p>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.25rem", fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
          <span>© {new Date().getFullYear()} Ivory Dental Ltd. All rights reserved.</span>
          <span>GDC Number: 123456 · CQC Registered</span>
        </div>
      </footer>
    </div>
  );
}
