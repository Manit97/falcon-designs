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
  { label: "Contact",    href: `${BASE}#section-contact` },
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reset scroll to top on page change
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  const isActive = (href: string) =>
    href.startsWith("#") ? false : pathname === href || pathname === href + "/";

  return (
    <div style={{ background: T.bg, fontFamily: SANS, minHeight: "100dvh" }}>
      <FontLoader />

      {/* ── NAVBAR ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 400,
        background: scrolled ? "rgba(250,250,248,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: `1px solid ${scrolled ? T.border : "transparent"}`,
        transition: "all 300ms",
      }}>
        <nav style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href={BASE} style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", cursor: "pointer" }}>
            <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
              <path d="M14 3C10 3 7 6 7 9c0 2 .5 3.5 1 5l2 8c.3 1.2 1 2 2 2s1.5-.8 2-2l1-4 1 4c.5 1.2 1.2 2 2 2s1.7-.8 2-2l2-8c.5-1.5 1-3 1-5 0-3-3-6-7-6z" fill={T.sage} />
            </svg>
            <span style={{ fontFamily: SERIF, fontSize: "1.1rem", fontWeight: 600, color: T.text }}>Ivory Dental</span>
          </Link>

          {/* Links */}
          <div style={{ display: "flex", gap: "2.25rem", alignItems: "center" }}>
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
            <Link href={`${BASE}#section-contact`}
              style={{ padding: "0.65rem 1.4rem", background: T.sage, color: "#fff", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", cursor: "pointer", userSelect: "none", transition: "background 200ms" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.sageDk}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.sage}
            >Book Now</Link>
          </div>
        </nav>
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
