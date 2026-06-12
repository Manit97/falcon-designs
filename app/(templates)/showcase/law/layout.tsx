"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PRACTICES, BASE, T, SERIF, SANS, EASE } from "./lib/data";

function FontLoader() {
  useEffect(() => {
    if (document.getElementById("sterling-fonts")) return;
    const l = document.createElement("link");
    l.id = "sterling-fonts";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Montserrat:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(l);
  }, []);
  return null;
}

function PracticeDropdown({ open }: { open: boolean }) {
  return (
    <div style={{
      position: "absolute", top: "calc(100% + 12px)", left: "50%",
      transform: `translateX(-50%) translateY(${open ? "0" : "-8px"})`,
      opacity: open ? 1 : 0,
      pointerEvents: open ? "auto" : "none",
      transition: `opacity 220ms ${EASE}, transform 220ms ${EASE}`,
      width: 780, background: T.navyMd,
      border: `1px solid ${T.border}`,
      boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
      display: "grid", gridTemplateColumns: "repeat(5,1fr)",
      zIndex: 500,
    }}>
      {PRACTICES.map((p, i) => (
        <div key={p.slug} style={{
          borderRight: i < 4 ? `1px solid ${T.borderLt}` : "none",
        }}>
          {/* Area header */}
          <Link href={`${BASE}/${p.slug}`} style={{
            display: "block", padding: "1.25rem 1rem 0.75rem",
            textDecoration: "none",
            borderBottom: `1px solid ${T.borderLt}`,
          }}
            onMouseEnter={e => (e.currentTarget.style.background = T.navyLt)}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.gold, display: "block", marginBottom: "0.25rem" }}>{p.short}</span>
            <span style={{ fontSize: "0.78rem", fontWeight: 500, color: T.text, display: "block", lineHeight: 1.3 }}>{p.title}</span>
          </Link>
          {/* Subcategories */}
          {p.subs.map(s => (
            <Link key={s.slug} href={`${BASE}/${p.slug}/${s.slug}`} style={{
              display: "block", padding: "0.55rem 1rem",
              textDecoration: "none", fontSize: "0.75rem",
              color: T.textMd, transition: `color 150ms, background 150ms`,
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = T.cream; (e.currentTarget as HTMLElement).style.background = T.navyLt; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = T.textMd; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >{s.title}</Link>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function LawLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const practiceRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); setMobileOpen(false); setPracticeOpen(false); }, [pathname]);

  const openDropdown = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setPracticeOpen(true);
  };
  const closeDropdown = () => {
    hoverTimeout.current = setTimeout(() => setPracticeOpen(false), 120);
  };

  const isHome = pathname === BASE || pathname === BASE + "/";

  return (
    <div id="sterling-root" style={{ background: T.navy, fontFamily: SANS, minHeight: "100dvh", color: T.text }}>
      <FontLoader />
      <style>{`
        #sterling-root *, #sterling-root *::before, #sterling-root *::after { box-sizing: border-box; }
        #sterling-root a, #sterling-root button { cursor: pointer !important; }
        html { scroll-behavior: smooth; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes lineGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes countUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .sterling-reveal { opacity:0; transform:translateY(24px); transition: opacity 700ms ${EASE}, transform 700ms ${EASE}; }
        .sterling-reveal.visible { opacity:1; transform:translateY(0); }
        .sterling-stagger-1 { transition-delay: 60ms; }
        .sterling-stagger-2 { transition-delay: 120ms; }
        .sterling-stagger-3 { transition-delay: 180ms; }
        .sterling-stagger-4 { transition-delay: 240ms; }
        .sterling-stagger-5 { transition-delay: 300ms; }
        .gold-line::after { content:''; display:block; width:48px; height:2px; background:${T.gold}; margin-top:1rem; transform-origin:left; animation: lineGrow 600ms ${EASE} both; animation-delay: 300ms; }
        @media (prefers-reduced-motion: reduce) { .sterling-reveal, .sterling-reveal.visible { transition: none; opacity:1; transform:none; } }

        /* ── Mobile burger / desktop nav ── */
        .sterling-mobile-burger { display: none !important; }
        @media (max-width: 860px) {
          .sterling-desktop-nav { display: none !important; }
          .sterling-mobile-burger { display: flex !important; }
          .sterling-nav { padding: 0 1.25rem !important; }
        }

        /* ── Footer ── */
        @media (max-width: 860px) {
          .sterling-footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 480px) {
          .sterling-footer-grid { grid-template-columns: 1fr !important; }
        }

        /* ── Homepage stats ── */
        @media (max-width: 640px) {
          .sterling-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .sterling-stat-border { border-right: none !important; border-bottom: 1px solid rgba(201,168,76,0.18) !important; }
        }

        /* ── Homepage about 2-col ── */
        @media (max-width: 860px) {
          .sterling-about-grid { grid-template-columns: 1fr !important; gap: 3.5rem !important; }
        }

        /* ── Practice areas 5-col ── */
        @media (max-width: 860px) {
          .sterling-practices-grid { grid-template-columns: 1fr 1fr !important; gap: 1rem !important; }
        }
        @media (max-width: 480px) {
          .sterling-practices-grid { grid-template-columns: 1fr !important; }
        }

        /* ── Testimonials ── */
        @media (max-width: 860px) {
          .sterling-testimonials-grid { grid-template-columns: 1fr !important; }
        }

        /* ── Blog preview 3-col ── */
        @media (max-width: 860px) {
          .sterling-blog-preview-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .sterling-blog-preview-grid { grid-template-columns: 1fr !important; }
        }

        /* ── Practice page intro grid ── */
        @media (max-width: 860px) {
          .sterling-practice-intro-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }

        /* ── Sub page main grid + sidebar ── */
        @media (max-width: 860px) {
          .sterling-sub-content-grid { grid-template-columns: 1fr !important; }
          .sterling-sub-sidebar { position: static !important; }
        }

        /* ── Sub page points 2-col ── */
        @media (max-width: 640px) {
          .sterling-points-grid { grid-template-columns: 1fr !important; }
        }

        /* ── About story grid ── */
        @media (max-width: 860px) {
          .sterling-story-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }

        /* ── About values 4-col ── */
        @media (max-width: 860px) {
          .sterling-values-grid { grid-template-columns: 1fr 1fr !important; }
          .sterling-value-border { border-right: none !important; border-bottom: 1px solid rgba(201,168,76,0.18) !important; }
        }
        @media (max-width: 480px) {
          .sterling-values-grid { grid-template-columns: 1fr !important; }
        }

        /* ── About team 3-col ── */
        @media (max-width: 860px) {
          .sterling-team-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 480px) {
          .sterling-team-grid { grid-template-columns: 1fr !important; }
        }

        /* ── About contact grid ── */
        @media (max-width: 860px) {
          .sterling-contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .sterling-form-row { grid-template-columns: 1fr !important; }
        }

        /* ── Blog featured split ── */
        @media (max-width: 860px) {
          .sterling-featured-grid { grid-template-columns: 1fr !important; }
          .sterling-featured-img { min-height: 280px !important; }
        }

        /* ── Blog articles grid ── */
        @media (max-width: 860px) {
          .sterling-blog-articles-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .sterling-blog-articles-grid { grid-template-columns: 1fr !important; }
        }

        /* ── Newsletter subscribe row ── */
        @media (max-width: 480px) {
          .sterling-newsletter-row { flex-direction: column !important; }
          .sterling-newsletter-input { border-right: 1px solid rgba(201,168,76,0.18) !important; }
          .sterling-newsletter-btn { width: 100% !important; }
        }

        /* ── Section horizontal padding ── */
        @media (max-width: 640px) {
          .sterling-px { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 400,
        background: scrolled || !isHome ? `rgba(10,14,26,0.97)` : "transparent",
        backdropFilter: scrolled || !isHome ? "blur(16px)" : "none",
        borderBottom: `1px solid ${scrolled || !isHome ? T.border : "transparent"}`,
        transition: `all 320ms ${EASE}`,
      }}>
        <nav className="sterling-nav" style={{ maxWidth: 1320, margin: "0 auto", padding: "0 2.5rem", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href={BASE} style={{ display: "flex", flexDirection: "column", textDecoration: "none", gap: "1px" }}>
            <span style={{ fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 600, color: T.cream, letterSpacing: "0.04em", lineHeight: 1 }}>Sterling &amp; Co</span>
            <span style={{ fontSize: "0.56rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: T.gold }}>Solicitors</span>
          </Link>

          {/* Desktop nav */}
          <div className="sterling-desktop-nav" style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
            {/* Practice Areas with dropdown */}
            <div ref={practiceRef} style={{ position: "relative" }}
              onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
              <button style={{
                padding: "0.5rem 0.9rem", background: "transparent", border: "none",
                fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.08em",
                color: practiceOpen ? T.gold : T.textMd,
                display: "flex", alignItems: "center", gap: "0.35rem",
                transition: `color 180ms`,
              }}
                onMouseEnter={e => (e.currentTarget.style.color = T.cream)}
                onMouseLeave={e => (e.currentTarget.style.color = practiceOpen ? T.gold : T.textMd)}
              >
                Practice Areas
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transition: `transform 220ms ${EASE}`, transform: practiceOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <PracticeDropdown open={practiceOpen} />
            </div>

            {[
              { label: "About Us", href: `${BASE}/about` },
              { label: "Blog",     href: `${BASE}/blog` },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{
                padding: "0.5rem 0.9rem", fontSize: "0.72rem", fontWeight: 500,
                letterSpacing: "0.08em", color: pathname.startsWith(l.href) ? T.cream : T.textMd,
                textDecoration: "none", transition: `color 180ms`,
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.cream}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = pathname.startsWith(l.href) ? T.cream : T.textMd}
              >{l.label}</Link>
            ))}

            <Link href={`${BASE}/about#contact`} style={{
              marginLeft: "0.75rem", padding: "0.65rem 1.5rem",
              background: "transparent", border: `1px solid ${T.gold}`,
              color: T.gold, fontSize: "0.68rem", fontWeight: 600,
              letterSpacing: "0.16em", textTransform: "uppercase",
              textDecoration: "none", transition: `all 200ms ${EASE}`,
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T.gold; (e.currentTarget as HTMLElement).style.color = T.navy; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = T.gold; }}
            >Free Consultation</Link>
          </div>

          {/* Mobile burger */}
          <button onClick={() => setMobileOpen(o => !o)} style={{
            background: "none", border: "none", padding: "0.5rem",
            flexDirection: "column", gap: "5px",
          }} aria-label="Menu" id="mobile-menu-btn" className="sterling-mobile-burger">
            {[0,1,2].map(i => (
              <span key={i} style={{ display: "block", width: 22, height: 1.5, background: T.cream, transition: `all 250ms ${EASE}` }} />
            ))}
          </button>
        </nav>

        {/* Mobile menu */}
        <div style={{
          display: mobileOpen ? "block" : "none",
          background: T.navyMd, borderTop: `1px solid ${T.border}`,
          padding: "1.5rem 2rem 2rem", maxHeight: "80vh", overflowY: "auto",
        }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <button onClick={() => setMobileExpanded(mobileExpanded === "practice" ? null : "practice")}
              style={{ background: "none", border: "none", width: "100%", textAlign: "left", padding: "0.6rem 0", color: T.cream, fontSize: "0.9rem", fontWeight: 500, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Practice Areas
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: mobileExpanded === "practice" ? "rotate(180deg)" : "none", transition: "transform 220ms" }}>
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            {mobileExpanded === "practice" && (
              <div style={{ paddingLeft: "1rem", marginTop: "0.5rem" }}>
                {PRACTICES.map(p => (
                  <div key={p.slug}>
                    <Link href={`${BASE}/${p.slug}`} style={{ display: "block", padding: "0.4rem 0", color: T.gold, fontSize: "0.8rem", fontWeight: 600, textDecoration: "none" }}>{p.title}</Link>
                    {p.subs.map(s => (
                      <Link key={s.slug} href={`${BASE}/${p.slug}/${s.slug}`} style={{ display: "block", padding: "0.3rem 0 0.3rem 0.75rem", color: T.textMd, fontSize: "0.75rem", textDecoration: "none" }}>{s.title}</Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          {[{ label: "About Us", href: `${BASE}/about` }, { label: "Blog", href: `${BASE}/blog` }].map(l => (
            <Link key={l.href} href={l.href} style={{ display: "block", padding: "0.6rem 0", color: T.cream, fontSize: "0.9rem", fontWeight: 500, textDecoration: "none", borderTop: `1px solid ${T.borderLt}` }}>{l.label}</Link>
          ))}
          <Link href={`${BASE}/about#contact`} style={{ display: "block", marginTop: "1.25rem", padding: "0.85rem 1.5rem", background: "transparent", border: `1px solid ${T.gold}`, color: T.gold, textAlign: "center", textDecoration: "none", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" }}>Free Consultation</Link>
        </div>
      </header>

      {/* Page content */}
      <div style={{ paddingTop: 72 }}>
        {children}
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#060810", borderTop: `1px solid ${T.border}`, padding: "5rem 2.5rem 2rem", fontFamily: SANS }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div className="sterling-footer-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr repeat(3,1fr)", gap: "3rem", marginBottom: "4rem" }}>

            {/* Brand */}
            <div>
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontFamily: SERIF, fontSize: "1.4rem", fontWeight: 600, color: T.cream, letterSpacing: "0.04em" }}>Sterling &amp; Co</div>
                <div style={{ fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: T.gold }}>Solicitors</div>
              </div>
              <p style={{ fontSize: "0.82rem", lineHeight: "1.8", color: T.textMd, maxWidth: 280, marginBottom: "1.5rem" }}>
                A leading independent law firm with over 28 years of experience advising individuals, families and businesses across England and Wales.
              </p>
              <div style={{ fontSize: "0.75rem", color: T.textLt, lineHeight: "1.9" }}>
                <div>42 Chancery Lane, London WC2A 1JE</div>
                <div>+44 (0)20 7123 4567</div>
                <div>enquiries@sterlingco.co.uk</div>
              </div>
            </div>

            {/* Practice Areas */}
            <div>
              <h4 style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.gold, marginBottom: "1.25rem" }}>Practice Areas</h4>
              {PRACTICES.map(p => (
                <Link key={p.slug} href={`${BASE}/${p.slug}`} style={{ display: "block", fontSize: "0.8rem", color: T.textMd, textDecoration: "none", marginBottom: "0.5rem", transition: "color 150ms" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.cream}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.textMd}
                >{p.title}</Link>
              ))}
            </div>

            {/* Firm */}
            <div>
              <h4 style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.gold, marginBottom: "1.25rem" }}>The Firm</h4>
              {[
                { label: "About Us",    href: `${BASE}/about` },
                { label: "Our Team",    href: `${BASE}/about#team` },
                { label: "Blog",        href: `${BASE}/blog` },
                { label: "Careers",     href: `${BASE}/about` },
                { label: "Contact",     href: `${BASE}/about#contact` },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{ display: "block", fontSize: "0.8rem", color: T.textMd, textDecoration: "none", marginBottom: "0.5rem", transition: "color 150ms" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.cream}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.textMd}
                >{l.label}</Link>
              ))}
            </div>

            {/* Legal */}
            <div>
              <h4 style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.gold, marginBottom: "1.25rem" }}>Legal</h4>
              {["Privacy Policy","Terms of Use","Cookie Policy","Complaints Procedure","Regulatory Information","Accessibility"].map(l => (
                <p key={l} style={{ fontSize: "0.8rem", color: T.textMd, marginBottom: "0.5rem" }}>{l}</p>
              ))}
            </div>
          </div>

          {/* Gold divider */}
          <div style={{ height: 1, background: `linear-gradient(90deg, ${T.gold}, transparent)`, marginBottom: "1.5rem", opacity: 0.4 }} />

          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", fontSize: "0.72rem", color: T.textLt }}>
            <span>© {new Date().getFullYear()} Sterling &amp; Co Solicitors. Authorised and regulated by the Solicitors Regulation Authority (SRA No. 654321).</span>
            <span>Sterling &amp; Co is a trading name of Sterling Legal LLP, a limited liability partnership registered in England and Wales.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
