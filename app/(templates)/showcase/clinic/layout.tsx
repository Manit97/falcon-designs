"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SERVICES, BASE, T, SERIF, SANS, EASE } from "./lib/data";

function FontLoader() {
  useEffect(() => {
    if (document.getElementById("lumiere-fonts")) return;
    const l = document.createElement("link");
    l.id = "lumiere-fonts";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:wght@300;400;500;600&display=swap";
    document.head.appendChild(l);
  }, []);
  return null;
}

export default function ClinicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHome = pathname === BASE || pathname === BASE + "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); setMobileOpen(false); setServicesOpen(false); }, [pathname]);

  const navBg = scrolled || !isHome
    ? "rgba(250,248,245,0.94)"
    : "transparent";
  const navBorder = scrolled || !isHome ? T.border : "transparent";
  const linkColor = (scrolled || !isHome) ? T.textMd : "rgba(250,248,245,0.85)";
  const logoColor = (scrolled || !isHome) ? T.text : T.textInv;
  const subColor  = (scrolled || !isHome) ? T.gold  : "rgba(184,149,106,0.9)";

  return (
    <div id="lumiere-root" style={{ background: T.bg, fontFamily: SANS, minHeight: "100dvh", color: T.text }}>
      <FontLoader />

      <style>{`
        #lumiere-root *, #lumiere-root *::before, #lumiere-root *::after { box-sizing: border-box; margin: 0; }
        #lumiere-root a, #lumiere-root button { cursor: pointer !important; }
        html { scroll-behavior: smooth; }

        /* Animations */
        @keyframes fadeUp   { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
        @keyframes lineGrow { from { transform:scaleX(0); } to { transform:scaleX(1); } }
        @keyframes shimmer  { from { background-position: -200% 0; } to { background-position: 200% 0; } }
        @keyframes grain    { 0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)} 20%{transform:translate(3%,2%)} 30%{transform:translate(-1%,4%)} 40%{transform:translate(4%,-1%)} 50%{transform:translate(-3%,3%)} 60%{transform:translate(2%,-4%)} 70%{transform:translate(-4%,1%)} 80%{transform:translate(3%,3%)} 90%{transform:translate(-2%,-2%)} }

        .lm-reveal { opacity:0; transform:translateY(24px); transition:opacity 700ms ${EASE}, transform 700ms ${EASE}; }
        .lm-reveal.visible { opacity:1; transform:translateY(0); }
        .lm-s1 { transition-delay:60ms; }  .lm-s2 { transition-delay:120ms; }
        .lm-s3 { transition-delay:180ms; } .lm-s4 { transition-delay:240ms; }
        .lm-s5 { transition-delay:300ms; } .lm-s6 { transition-delay:360ms; }

        .lm-gold-line { position:relative; }
        .lm-gold-line::after { content:''; position:absolute; bottom:-4px; left:0; width:100%; height:1px; background:${T.gold}; transform:scaleX(0); transform-origin:left; transition:transform 320ms ${EASE}; }
        .lm-gold-line:hover::after { transform:scaleX(1); }

        /* Clip-path image reveal */
        .lm-img-reveal { clip-path:inset(0 0 100% 0); transition:clip-path 900ms ${EASE}; }
        .lm-img-reveal.visible { clip-path:inset(0 0 0% 0); }

        /* Services dropdown */
        .lm-services-dropdown { position:absolute; top:calc(100% + 8px); left:50%; transform:translateX(-50%); background:rgba(250,248,245,0.98); backdrop-filter:blur(20px); border:1px solid ${T.border}; box-shadow:0 24px 60px rgba(15,13,10,0.12); padding:1.5rem; display:grid; grid-template-columns:repeat(3,1fr); gap:0.25rem; min-width:480px; z-index:600; transition:opacity 220ms ${EASE}, transform 220ms ${EASE}; }
        .lm-services-dropdown.closed { opacity:0; pointer-events:none; transform:translateX(-50%) translateY(-6px); }
        .lm-services-dropdown.open   { opacity:1; pointer-events:auto; transform:translateX(-50%) translateY(0); }
        .lm-drop-item { padding:0.65rem 0.9rem; text-decoration:none; display:block; transition:background 150ms; border-radius:2px; }
        .lm-drop-item:hover { background:${T.bgMd}; }

        /* Reduced motion */
        @media (prefers-reduced-motion:reduce) {
          .lm-reveal, .lm-reveal.visible { transition:none; opacity:1; transform:none; }
          .lm-img-reveal, .lm-img-reveal.visible { transition:none; clip-path:none; }
        }

        /* Hover only on pointer devices */
        @media (hover:none) {
          .lm-gold-line::after { display:none; }
        }

        /* ── Responsive ── */
        .lm-desktop-nav { display:flex; }
        .lm-burger { display:none !important; }
        @media (max-width:860px) {
          .lm-desktop-nav { display:none !important; }
          .lm-burger { display:flex !important; }
          .lm-nav-inner { padding:0 1.25rem !important; }
        }
        @media (max-width:640px) {
          .lm-px { padding-left:1.25rem !important; padding-right:1.25rem !important; }
          .lm-hero-h1 { font-size:clamp(2.8rem,12vw,5rem) !important; }
        }
        .lm-about-grid       { display:grid; grid-template-columns:1fr 1fr; }
        .lm-team-grid        { display:grid; grid-template-columns:repeat(3,1fr); }
        .lm-svc-grid         { display:grid; grid-template-columns:repeat(3,1fr); }
        .lm-stats-grid       { display:grid; grid-template-columns:repeat(4,1fr); }
        .lm-sub-grid         { display:grid; grid-template-columns:1fr 360px; }
        .lm-steps-grid       { display:grid; grid-template-columns:1fr 1fr; }
        .lm-contact-grid     { display:grid; grid-template-columns:1fr 1fr; }
        .lm-phil-grid        { display:grid; grid-template-columns:repeat(3,1fr); }
        .lm-testimonial-grid { display:grid; grid-template-columns:1fr 1fr; }
        .lm-team-preview     { display:grid; grid-template-columns:1fr 1fr; }
        .lm-team-card        { display:grid; grid-template-columns:160px 1fr; }
        @media (max-width:860px) {
          .lm-about-grid       { grid-template-columns:1fr !important; }
          .lm-team-grid        { grid-template-columns:1fr 1fr !important; gap:2rem !important; }
          .lm-svc-grid         { grid-template-columns:1fr 1fr !important; }
          .lm-stats-grid       { grid-template-columns:1fr 1fr !important; }
          .lm-sub-grid         { grid-template-columns:1fr !important; }
          .lm-sub-sidebar      { position:static !important; }
          .lm-contact-grid     { grid-template-columns:1fr !important; }
          .lm-footer-grid      { grid-template-columns:1fr 1fr !important; gap:2.5rem !important; }
          .lm-phil-grid        { grid-template-columns:1fr 1fr !important; }
          .lm-testimonial-grid { grid-template-columns:1fr !important; }
          .lm-team-preview     { grid-template-columns:1fr !important; }
        }
        @media (max-width:600px) {
          .lm-svc-grid         { grid-template-columns:1fr !important; }
          .lm-team-grid        { grid-template-columns:1fr !important; }
          .lm-steps-grid       { grid-template-columns:1fr !important; }
          .lm-footer-grid      { grid-template-columns:1fr !important; }
          .lm-phil-grid        { grid-template-columns:1fr !important; }
          .lm-team-card        { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        background: navBg,
        backdropFilter: (scrolled || !isHome) ? "blur(20px) saturate(1.4)" : "none",
        borderBottom: `1px solid ${navBorder}`,
        transition: `background 350ms ${EASE}, border-color 350ms ${EASE}, backdrop-filter 350ms ${EASE}`,
      }}>
        <nav className="lm-nav-inner" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2.5rem", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href={BASE} style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "2px" }}>
            <span style={{ fontFamily: SERIF, fontSize: "1.3rem", fontWeight: 600, color: logoColor, letterSpacing: "0.06em", lineHeight: 1, transition: `color 350ms ${EASE}` }}>Lumière</span>
            <span style={{ fontSize: "0.52rem", fontWeight: 600, letterSpacing: "0.32em", textTransform: "uppercase", color: subColor, transition: `color 350ms ${EASE}` }}>Aesthetic Clinic</span>
          </Link>

          {/* Desktop nav */}
          <div className="lm-desktop-nav" style={{ gap: "0.15rem", alignItems: "center" }}>
            {/* Services with dropdown */}
            <div style={{ position: "relative" }}
              onMouseEnter={() => { if (hoverTimer.current) clearTimeout(hoverTimer.current); setServicesOpen(true); }}
              onMouseLeave={() => { hoverTimer.current = setTimeout(() => setServicesOpen(false), 130); }}>
              <button style={{
                padding: "0.5rem 1rem", background: "none", border: "none",
                fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.06em",
                color: linkColor, display: "flex", alignItems: "center", gap: "0.3rem",
                transition: `color 300ms ${EASE}`,
              }}
                onMouseEnter={e => (e.currentTarget.style.color = servicesOpen ? T.gold : (scrolled || !isHome ? T.text : T.textInv))}
                onMouseLeave={e => (e.currentTarget.style.color = linkColor)}
              >
                Services
                <svg width="9" height="6" viewBox="0 0 9 6" fill="none" style={{ transition: `transform 220ms ${EASE}`, transform: servicesOpen ? "rotate(180deg)" : "none" }}>
                  <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
              {/* Dropdown */}
              <div className={`lm-services-dropdown ${servicesOpen ? "open" : "closed"}`}>
                {SERVICES.map(s => (
                  <Link key={s.slug} href={`${BASE}/services/${s.slug}`} className="lm-drop-item">
                    <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.gold, marginBottom: "0.15rem" }}>{s.short}</div>
                    <div style={{ fontSize: "0.78rem", fontWeight: 500, color: T.text }}>{s.title}</div>
                  </Link>
                ))}
              </div>
            </div>

            {[
              { label: "About", href: `${BASE}/about` },
            ].map(l => (
              <Link key={l.href} href={l.href} className="lm-gold-line" style={{
                padding: "0.5rem 1rem", fontSize: "0.72rem", fontWeight: 500,
                letterSpacing: "0.06em", color: pathname.startsWith(l.href) ? T.gold : linkColor,
                textDecoration: "none", transition: `color 300ms ${EASE}`,
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.text}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = pathname.startsWith(l.href) ? T.gold : linkColor}
              >{l.label}</Link>
            ))}

            <Link href={`${BASE}/book`} style={{
              marginLeft: "0.75rem", padding: "0.6rem 1.6rem",
              background: T.gold, color: T.bgDk,
              fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.16em",
              textTransform: "uppercase", textDecoration: "none",
              transition: `background 200ms ${EASE}, transform 120ms ${EASE}`,
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.goldLt}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.gold}
              onMouseDown={e => (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"}
              onMouseUp={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
            >Book Now</Link>
          </div>

          {/* Burger */}
          <button className="lm-burger" onClick={() => setMobileOpen(o => !o)} aria-label="Menu" style={{
            background: "none", border: "none", padding: "0.5rem",
            flexDirection: "column", gap: "5px",
          }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ display: "block", width: 22, height: 1.5, background: logoColor, transition: `all 250ms ${EASE}` }} />
            ))}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{
            background: "rgba(250,248,245,0.98)", backdropFilter: "blur(20px)",
            borderTop: `1px solid ${T.border}`, padding: "1.5rem 1.5rem 2rem",
          }}>
            <div style={{ marginBottom: "0.5rem" }}>
              <p style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: T.gold, marginBottom: "0.75rem" }}>Services</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.25rem" }}>
                {SERVICES.map(s => (
                  <Link key={s.slug} href={`${BASE}/services/${s.slug}`} style={{ padding: "0.5rem 0.6rem", fontSize: "0.8rem", fontWeight: 500, color: T.text, textDecoration: "none", background: T.bgMd }}>
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
            <div style={{ height: 1, background: T.border, margin: "1.25rem 0" }} />
            {[
              { label: "About", href: `${BASE}/about` },
              { label: "Book a Consultation", href: `${BASE}/book` },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{ display: "block", padding: "0.7rem 0", fontSize: "0.88rem", fontWeight: 500, color: T.text, textDecoration: "none", borderBottom: `1px solid ${T.borderLt}` }}>
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <div style={{ paddingTop: 68 }}>{children}</div>

      {/* ── FOOTER ── */}
      <footer style={{ background: T.bgDk, borderTop: `1px solid rgba(184,149,106,0.12)`, padding: "5rem 2.5rem 2.5rem", fontFamily: SANS }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="lm-footer-grid" style={{ display: "grid", gridTemplateColumns: "1.6fr repeat(3,1fr)", gap: "3.5rem", marginBottom: "4rem" }}>

            {/* Brand */}
            <div>
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontFamily: SERIF, fontSize: "1.5rem", fontWeight: 600, color: T.textInv, letterSpacing: "0.06em" }}>Lumière</div>
                <div style={{ fontSize: "0.52rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: T.gold }}>Aesthetic Clinic</div>
              </div>
              <p style={{ fontSize: "0.82rem", lineHeight: 1.85, color: T.textLt, maxWidth: 260, marginBottom: "1.5rem" }}>
                London's leading independent aesthetic clinic. Science-led, results-driven, and committed to enhancement that feels entirely like you.
              </p>
              <div style={{ fontSize: "0.75rem", color: T.textLt, lineHeight: 2 }}>
                <div>12 Harley Street, London W1G 9PQ</div>
                <div>+44 (0)20 7946 0320</div>
                <div>hello@lumiereclinic.co.uk</div>
              </div>
            </div>

            {/* Treatments */}
            <div>
              <h4 style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: T.gold, marginBottom: "1.25rem" }}>Treatments</h4>
              {SERVICES.map(s => (
                <Link key={s.slug} href={`${BASE}/services/${s.slug}`} style={{ display: "block", fontSize: "0.8rem", color: T.textLt, textDecoration: "none", marginBottom: "0.55rem", transition: "color 150ms" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.textInv}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.textLt}
                >{s.title}</Link>
              ))}
            </div>

            {/* Clinic */}
            <div>
              <h4 style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: T.gold, marginBottom: "1.25rem" }}>The Clinic</h4>
              {[
                { label: "About Us",     href: `${BASE}/about` },
                { label: "Our Team",     href: `${BASE}/about#team` },
                { label: "Book Now",     href: `${BASE}/book` },
                { label: "All Services", href: `${BASE}/services` },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{ display: "block", fontSize: "0.8rem", color: T.textLt, textDecoration: "none", marginBottom: "0.55rem", transition: "color 150ms" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.textInv}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.textLt}
                >{l.label}</Link>
              ))}
            </div>

            {/* Hours */}
            <div>
              <h4 style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: T.gold, marginBottom: "1.25rem" }}>Opening Hours</h4>
              {[
                { day: "Monday – Friday", hours: "9:00 – 19:00" },
                { day: "Saturday",        hours: "9:00 – 17:00" },
                { day: "Sunday",          hours: "Closed" },
              ].map(r => (
                <div key={r.day} style={{ marginBottom: "0.75rem" }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 500, color: T.textInv }}>{r.day}</div>
                  <div style={{ fontSize: "0.72rem", color: T.textLt }}>{r.hours}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Gold rule */}
          <div style={{ height: 1, background: `linear-gradient(90deg, ${T.gold}, transparent)`, opacity: 0.35, marginBottom: "1.5rem" }} />

          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", fontSize: "0.7rem", color: T.textLt }}>
            <span>© {new Date().getFullYear()} Lumière Aesthetic Clinic. All rights reserved.</span>
            <span>Regulated by the Care Quality Commission · Save Face Registered</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
