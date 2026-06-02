"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────
   Design tokens
────────────────────────────────────────────────────────────────── */
const T = {
  bg:        "#070707",
  white:     "#f0ece0",
  gold:      "#c8b887",
  dim:       "rgba(240,236,224,0.45)",
  muted:     "rgba(240,236,224,0.22)",
  border:    "rgba(240,236,224,0.08)",
  cardBg:    "#0d0d0c",
  surface:   "#111110",
};

/* ─────────────────────────────────────────────────────────────────
   Data
────────────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: "01",
    title: "Solstice",
    category: "Fashion Film",
    year: "2025",
    duration: "4:22",
    colour: "#a89060",
    bg: "#0a0907",
  },
  {
    id: "02",
    title: "Drift",
    category: "Automotive",
    year: "2025",
    duration: "2:47",
    colour: "#7a8fa0",
    bg: "#07090a",
  },
  {
    id: "03",
    title: "Veil",
    category: "Wedding",
    year: "2024",
    duration: "6:10",
    colour: "#c4a882",
    bg: "#0a0807",
  },
  {
    id: "04",
    title: "Monument",
    category: "Architecture",
    year: "2024",
    duration: "3:55",
    colour: "#8a9088",
    bg: "#080908",
  },
  {
    id: "05",
    title: "Ember",
    category: "Brand Campaign",
    year: "2024",
    duration: "1:30",
    colour: "#b07050",
    bg: "#0a0807",
  },
];

const SERVICES = [
  { n: "01", title: "Narrative Film",    body: "Long-form documentary and editorial work. We build stories that unfold over time." },
  { n: "02", title: "Brand Campaigns",   body: "Commercial and product films. Shot for screens that command attention." },
  { n: "03", title: "Wedding & Events",  body: "Cinematic coverage for the moments that matter most. Discreet, unhurried, precise." },
  { n: "04", title: "Music Videos",      body: "Visual interpretations of sound. We work closely with artists to realise the vision." },
];

const CLIENTS = [
  "VOGUE", "ROLLS-ROYCE", "HARRODS", "SONY MUSIC", "TIFFANY & CO.",
  "THE TIMES", "BURBERRY", "SOTHEBY'S", "DIOR", "BBC FILMS",
];

/* ─────────────────────────────────────────────────────────────────
   Grain overlay
────────────────────────────────────────────────────────────────── */
const GRAIN_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='200' height='200' filter='url(#n)' opacity='1'/></svg>`;

/* ─────────────────────────────────────────────────────────────────
   Main component
────────────────────────────────────────────────────────────────── */
export default function VideographerTemplate() {
  const [loaded,     setLoaded]     = useState(false);
  const [reelOpen,   setReelOpen]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [cursorPos,  setCursorPos]  = useState({ x: -100, y: -100 });
  const [cursorHover,setCursorHover]= useState(false);
  const [cursorText, setCursorText] = useState("");
  const [scrolled,   setScrolled]   = useState(false);

  const containerRef  = useRef<HTMLDivElement>(null);
  const heroTitleRef  = useRef<HTMLHeadingElement>(null);
  const projectsRef   = useRef<HTMLDivElement>(null);
  const trackRef      = useRef<HTMLDivElement>(null);
  const lenisRef      = useRef<unknown>(null);

  /* ── Loader ── */
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2200);
    return () => clearTimeout(t);
  }, []);

  /* ── Lenis + GSAP ── */
  useEffect(() => {
    if (!loaded) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ default: Lenis }, gsapMod, { ScrollTrigger }, { default: SplitType }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("split-type"),
      ]);
      const gsap = gsapMod.gsap ?? gsapMod.default ?? gsapMod;
      gsap.registerPlugin(ScrollTrigger);

      /* Lenis */
      const lenis = new Lenis({
        lerp:            0.07,
        wheelMultiplier: 0.75,
        orientation:     "vertical",
        smoothWheel:     true,
        syncTouch:       false,
      });
      lenisRef.current = lenis;

      lenis.on("scroll", ScrollTrigger.update);
      lenis.on("scroll", () => {
        setScrolled(lenis.scroll > 60);
        window.dispatchEvent(new Event("scroll", { bubbles: false }));
      });

      gsap.ticker.add((time: number) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      /* ── Hero title SplitType stagger ── */
      if (heroTitleRef.current) {
        const split = new SplitType(heroTitleRef.current, { types: "chars" });
        gsap.fromTo(
          split.chars,
          { yPercent: 120, opacity: 0 },
          {
            yPercent:     0,
            opacity:      1,
            duration:     1.1,
            ease:         "expo.out",
            stagger:      0.03,
            delay:        0.3,
          }
        );
      }

      /* ── Horizontal scroll for projects ── */
      if (projectsRef.current && trackRef.current) {
        const track    = trackRef.current;
        const section  = projectsRef.current;
        const cards    = track.querySelectorAll<HTMLElement>(".proj-card");
        const cardW    = cards[0]?.offsetWidth ?? 480;
        const gap      = 24;
        const totalW   = (cardW + gap) * cards.length - gap;
        const viewW    = window.innerWidth;
        const scrollDist = totalW - viewW + 96; // 96px = 6rem padding

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start:   "top top",
            end:     `+=${scrollDist}`,
            pin:     true,
            scrub:   1.2,
            anticipatePin: 1,
          },
        });
        tl.to(track, { x: -scrollDist, ease: "none" });
      }

      /* ── Fade-in reveals ── */
      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y:       0,
            duration: 0.9,
            ease:    "expo.out",
            scrollTrigger: {
              trigger: el,
              start:   "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      /* ── Counter numbers ── */
      gsap.utils.toArray<HTMLElement>(".gsap-counter").forEach((el) => {
        const target = parseFloat(el.dataset.target ?? "0");
        gsap.fromTo(el,
          { innerText: 0 },
          {
            innerText: target,
            snap:      { innerText: 1 },
            duration:  1.8,
            ease:      "power2.out",
            scrollTrigger: {
              trigger: el,
              start:   "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      cleanup = () => {
        lenis.destroy();
        ScrollTrigger.getAll().forEach((t) => t.kill());
        gsap.ticker.remove((time: number) => lenis.raf(time * 1000));
      };
    })();

    return () => cleanup?.();
  }, [loaded]);

  /* ── Custom cursor ── */
  useEffect(() => {
    const move = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* ── Cursor hover helpers ── */
  const onEnter = (text = "") => { setCursorHover(true); setCursorText(text); };
  const onLeave = ()           => { setCursorHover(false); setCursorText(""); };

  return (
    <>
      {/* ── Film grain overlay ── */}
      <div
        aria-hidden
        style={{
          position:        "fixed",
          inset:           0,
          zIndex:          9999,
          pointerEvents:   "none",
          opacity:         0.035,
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`,
          backgroundRepeat:"repeat",
          mixBlendMode:    "overlay",
        }}
      />

      {/* ── Custom cursor ── */}
      <div
        aria-hidden
        style={{
          position:   "fixed",
          left:       cursorPos.x,
          top:        cursorPos.y,
          zIndex:     9998,
          pointerEvents: "none",
          transform:  "translate(-50%, -50%)",
          transition: "opacity 0.2s",
        }}
      >
        {/* Ring */}
        <div style={{
          width:      cursorHover ? 56 : 36,
          height:     cursorHover ? 56 : 36,
          borderRadius: "50%",
          border:     `1px solid ${cursorHover ? T.gold : T.white}`,
          opacity:    cursorHover ? 0.9 : 0.35,
          transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
          display:    "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {cursorText && (
            <span style={{ fontSize: 7, letterSpacing: "0.12em", color: T.gold, textTransform: "uppercase", fontFamily: "Courier New" }}>
              {cursorText}
            </span>
          )}
        </div>
        {/* Dot */}
        <div style={{
          position:  "absolute",
          top:       "50%",
          left:      "50%",
          transform: "translate(-50%, -50%)",
          width:     cursorHover ? 0 : 3,
          height:    cursorHover ? 0 : 3,
          borderRadius: "50%",
          background: T.white,
          opacity:   cursorHover ? 0 : 1,
          transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
        }} />
      </div>

      {/* ── Loader ── */}
      <div style={{
        position:   "fixed",
        inset:      0,
        zIndex:     9000,
        background: T.bg,
        display:    "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap:        24,
        transition: "opacity 0.8s ease, visibility 0.8s ease",
        opacity:    loaded ? 0 : 1,
        visibility: loaded ? "hidden" : "visible",
        pointerEvents: loaded ? "none" : "auto",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "Georgia, serif", fontSize: 13, letterSpacing: "0.3em", color: T.gold, textTransform: "uppercase" }}>
            JAMES HOLT
          </span>
          <span style={{ width: 1, height: 16, background: T.gold, opacity: 0.4 }} />
          <span style={{ fontFamily: "Courier New, monospace", fontSize: 9, letterSpacing: "0.25em", color: T.dim, textTransform: "uppercase" }}>
            CINEMATOGRAPHER
          </span>
        </div>
        {/* Loading bar */}
        <div style={{ width: 120, height: 1, background: T.border, position: "relative", overflow: "hidden" }}>
          <div style={{
            position:   "absolute",
            inset:      0,
            background: T.gold,
            transformOrigin: "left",
            animation:  "loaderBar 2s cubic-bezier(0.16,1,0.3,1) forwards",
          }} />
        </div>
        <style>{`
          @keyframes loaderBar { from { transform: scaleX(0) } to { transform: scaleX(1) } }
          @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
          @keyframes grain { 0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)} 20%{transform:translate(2%,3%)} 30%{transform:translate(-1%,2%)} 40%{transform:translate(1%,-2%)} 50%{transform:translate(-2%,1%)} 60%{transform:translate(2%,-1%)} 70%{transform:translate(-1%,3%)} 80%{transform:translate(1%,-3%)} 90%{transform:translate(-2%,2%)} }
        `}</style>
      </div>

      {/* ── Site ── */}
      <div
        ref={containerRef}
        style={{ background: T.bg, color: T.white, minHeight: "100vh", cursor: "none" }}
      >

        {/* ── NAV ── */}
        <nav style={{
          position:   "fixed",
          top:        0,
          left:       0,
          right:      0,
          zIndex:     100,
          padding:    "0 40px",
          height:     72,
          display:    "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
          background:  scrolled ? `rgba(7,7,7,0.9)` : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <a href="#hero" style={{ fontFamily: "Georgia, serif", fontSize: 13, letterSpacing: "0.25em", color: T.white, textDecoration: "none", textTransform: "uppercase" }}>
            James Holt
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
            <div className="vg-nav-links" style={{ display: "flex", gap: 40 }}>
              {["Work","Services","About","Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onMouseEnter={() => onEnter()}
                  onMouseLeave={onLeave}
                  style={{
                    fontFamily: "Courier New, monospace",
                    fontSize:   9,
                    letterSpacing: "0.2em",
                    color:      T.dim,
                    textDecoration: "none",
                    textTransform: "uppercase",
                    transition: "color 0.3s",
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
            <button
              onClick={() => setReelOpen(true)}
              onMouseEnter={() => onEnter("PLAY")}
              onMouseLeave={onLeave}
              style={{
                fontFamily: "Courier New, monospace",
                fontSize:   9,
                letterSpacing: "0.2em",
                color:      T.bg,
                background: T.gold,
                border:     "none",
                padding:    "10px 20px",
                textTransform: "uppercase",
                cursor:     "none",
                transition: "background 0.3s",
              }}
            >
              View Reel
            </button>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section
          id="hero"
          style={{
            minHeight:  "100vh",
            display:    "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding:    "0 48px 80px",
            position:   "relative",
            overflow:   "hidden",
          }}
        >
          {/* Background lines */}
          <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            {[20, 50, 80].map((pct) => (
              <div key={pct} style={{
                position:  "absolute",
                top:       0,
                bottom:    0,
                left:      `${pct}%`,
                width:     1,
                background: T.border,
              }} />
            ))}
          </div>

          {/* Hero label top-right */}
          <div style={{
            position:   "absolute",
            top:        96,
            right:      48,
            display:    "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap:        6,
          }}>
            <span style={{ fontFamily: "Courier New, monospace", fontSize: 8, letterSpacing: "0.25em", color: T.muted, textTransform: "uppercase" }}>
              London — Based
            </span>
            <span style={{ fontFamily: "Courier New, monospace", fontSize: 8, letterSpacing: "0.25em", color: T.muted, textTransform: "uppercase" }}>
              Available 2026
            </span>
          </div>

          {/* Main heading — GSAP SplitType target */}
          <div style={{ overflow: "hidden", paddingBottom: 8 }}>
            <h1
              ref={heroTitleRef}
              style={{
                fontFamily: "Georgia, serif",
                fontSize:   "clamp(4rem, 12vw, 11rem)",
                fontWeight: 400,
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
                color:      T.white,
                margin:     0,
              }}
            >
              MOTION<br />
              <em style={{ fontStyle: "italic", color: T.gold }}>& LIGHT</em>
            </h1>
          </div>

          {/* Sub row */}
          <div style={{
            display:    "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop:  40,
            paddingTop: 32,
            borderTop:  `1px solid ${T.border}`,
          }}>
            <p style={{ fontFamily: "Courier New, monospace", fontSize: 10, letterSpacing: "0.18em", color: T.dim, textTransform: "uppercase", maxWidth: 300, lineHeight: 1.8 }}>
              Award-winning cinematographer<br />based in London, UK
            </p>
            <button
              onClick={() => setReelOpen(true)}
              onMouseEnter={() => onEnter("PLAY")}
              onMouseLeave={onLeave}
              style={{
                display:    "flex",
                alignItems: "center",
                gap:        14,
                background: "transparent",
                border:     `1px solid ${T.border}`,
                color:      T.white,
                padding:    "16px 28px",
                cursor:     "none",
                fontFamily: "Courier New, monospace",
                fontSize:   9,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                transition: "border-color 0.3s, color 0.3s",
              }}
            >
              <span style={{ width: 0, height: 0, borderStyle: "solid", borderWidth: "5px 0 5px 9px", borderColor: `transparent transparent transparent ${T.gold}` }} />
              Watch Showreel
            </button>
          </div>

          {/* Scroll cue */}
          <div style={{
            position:   "absolute",
            bottom:     80,
            left:       "50%",
            transform:  "translateX(-50%)",
            display:    "flex",
            flexDirection: "column",
            alignItems: "center",
            gap:        12,
          }}>
            <span style={{ fontFamily: "Courier New, monospace", fontSize: 7, letterSpacing: "0.3em", color: T.muted, textTransform: "uppercase" }}>Scroll</span>
            <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${T.gold}, transparent)` }} />
          </div>
        </section>

        {/* ── STATEMENT ── */}
        <section style={{ padding: "160px 48px", borderTop: `1px solid ${T.border}`, overflow: "hidden" }}>
          <div className="gsap-reveal" style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <p style={{
              fontFamily:  "Courier New, monospace",
              fontSize:    9,
              letterSpacing: "0.28em",
              color:       T.gold,
              textTransform: "uppercase",
              marginBottom: 32,
            }}>
              Philosophy
            </p>
            <blockquote style={{
              fontFamily:  "Georgia, serif",
              fontSize:    "clamp(1.8rem, 4vw, 3.5rem)",
              fontWeight:  400,
              fontStyle:   "italic",
              lineHeight:  1.25,
              color:       T.white,
              margin:      0,
            }}>
              &ldquo;Every frame is a decision. Every cut, a breath. I make films for people who believe that how something looks is inseparable from what it means.&rdquo;
            </blockquote>
          </div>
        </section>

        {/* ── STATS ── */}
        <section style={{ borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {[
              { value: 120, suffix: "+", label: "Projects Completed" },
              { value: 8,   suffix: "",  label: "Years in the Industry" },
              { value: 40,  suffix: "+", label: "Countries Filmed" },
              { value: 12,  suffix: "",  label: "Awards Won" },
            ].map((s, i) => (
              <div
                key={s.label}
                className="gsap-reveal"
                style={{
                  padding:      "56px 40px",
                  borderRight:  i < 3 ? `1px solid ${T.border}` : "none",
                  textAlign:    "center",
                }}
              >
                <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: T.gold, margin: "0 0 8px" }}>
                  <span className="gsap-counter" data-target={s.value}>{s.value}</span>
                  {s.suffix}
                </p>
                <p style={{ fontFamily: "Courier New, monospace", fontSize: 8, letterSpacing: "0.22em", color: T.muted, textTransform: "uppercase" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROJECTS (horizontal scroll) ── */}
        <section id="work" ref={projectsRef} style={{ overflow: "hidden" }}>
          <div style={{ padding: "80px 48px 40px" }}>
            <p className="gsap-reveal" style={{ fontFamily: "Courier New, monospace", fontSize: 9, letterSpacing: "0.25em", color: T.gold, textTransform: "uppercase" }}>
              Selected Work
            </p>
          </div>

          {/* Horizontal track */}
          <div style={{ display: "flex", alignItems: "center", overflow: "hidden", paddingLeft: 48 }}>
            <div ref={trackRef} style={{ display: "flex", gap: 24, paddingRight: 96, willChange: "transform" }}>
              {PROJECTS.map((p) => (
                <div
                  key={p.id}
                  className="proj-card"
                  onMouseEnter={() => onEnter("VIEW")}
                  onMouseLeave={onLeave}
                  style={{
                    width:        "min(480px, 72vw)",
                    flexShrink:   0,
                    cursor:       "none",
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{
                    height:         320,
                    background:     p.bg,
                    position:       "relative",
                    overflow:       "hidden",
                    marginBottom:   20,
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    transition:     "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                  }}>
                    {/* Decorative circles */}
                    <div style={{ width: 200, height: 200, borderRadius: "50%", border: `1px solid ${p.colour}`, opacity: 0.15, position: "absolute" }} />
                    <div style={{ width: 120, height: 120, borderRadius: "50%", border: `1px solid ${p.colour}`, opacity: 0.25, position: "absolute" }} />
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: p.colour, opacity: 0.3, position: "absolute" }} />
                    <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 400, fontStyle: "italic", color: p.colour, position: "relative", zIndex: 1, margin: 0, opacity: 0.7 }}>
                      {p.title}
                    </p>
                    {/* Duration badge */}
                    <div style={{
                      position:   "absolute",
                      top:        16,
                      right:      16,
                      fontFamily: "Courier New, monospace",
                      fontSize:   8,
                      letterSpacing: "0.2em",
                      color:      T.muted,
                      background: "rgba(0,0,0,0.6)",
                      backdropFilter: "blur(6px)",
                      padding:    "6px 10px",
                    }}>
                      {p.duration}
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                      <p style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 400, color: T.white, margin: "0 0 4px" }}>{p.title}</p>
                      <p style={{ fontFamily: "Courier New, monospace", fontSize: 8, letterSpacing: "0.2em", color: T.muted, textTransform: "uppercase", margin: 0 }}>{p.category}</p>
                    </div>
                    <span style={{ fontFamily: "Courier New, monospace", fontSize: 10, color: T.muted }}>{p.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: "40px 48px", borderTop: `1px solid ${T.border}`, marginTop: 80, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontFamily: "Courier New, monospace", fontSize: 8, letterSpacing: "0.2em", color: T.muted, textTransform: "uppercase" }}>
              Drag or scroll to explore →
            </p>
            <span style={{ fontFamily: "Courier New, monospace", fontSize: 8, letterSpacing: "0.2em", color: T.muted }}>
              {PROJECTS.length} films
            </span>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" style={{ padding: "160px 48px", borderTop: `1px solid ${T.border}`, overflow: "hidden" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="gsap-reveal" style={{ marginBottom: 80 }}>
              <p style={{ fontFamily: "Courier New, monospace", fontSize: 9, letterSpacing: "0.25em", color: T.gold, textTransform: "uppercase", marginBottom: 16 }}>
                Services
              </p>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 400, color: T.white, margin: 0, lineHeight: 1.1 }}>
                What I Create
              </h2>
            </div>

            <div style={{ border: `1px solid ${T.border}` }}>
              {SERVICES.map((s, i) => (
                <div
                  key={s.n}
                  className="gsap-reveal"
                  onMouseEnter={(e) => { onEnter(); (e.currentTarget as HTMLElement).style.background = T.surface; }}
                  onMouseLeave={(e) => { onLeave(); (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  style={{
                    display:    "flex",
                    alignItems: "center",
                    gap:        48,
                    padding:    "40px 40px",
                    borderBottom: i < SERVICES.length - 1 ? `1px solid ${T.border}` : "none",
                    transition: "background 0.3s",
                    cursor:     "none",
                  }}
                >
                  <span style={{ fontFamily: "Courier New, monospace", fontSize: 11, color: T.muted, minWidth: 32 }}>{s.n}</span>
                  <div style={{ borderLeft: `1px solid ${T.border}`, paddingLeft: 40, flex: 1 }}>
                    <h3 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.2rem, 2.5vw, 2rem)", fontWeight: 400, color: T.white, margin: "0 0 8px" }}>{s.title}</h3>
                    <p style={{ fontFamily: "Courier New, monospace", fontSize: 9, letterSpacing: "0.12em", color: T.muted, lineHeight: 1.8, margin: 0, maxWidth: 500 }}>{s.body}</p>
                  </div>
                  <span style={{ fontFamily: "Courier New, monospace", fontSize: 9, color: T.gold, letterSpacing: "0.15em" }}>→</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CLIENTS MARQUEE ── */}
        <section style={{ borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: "32px 0", overflow: "hidden" }}>
          <div style={{
            display:   "flex",
            animation: "marquee 20s linear infinite",
            whiteSpace: "nowrap",
          }}>
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span
                key={i}
                style={{
                  fontFamily:   "Courier New, monospace",
                  fontSize:     9,
                  letterSpacing: "0.3em",
                  color:        i % 2 === 0 ? T.muted : T.dim,
                  textTransform: "uppercase",
                  padding:      "0 48px",
                  flexShrink:   0,
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" style={{ padding: "160px 48px", borderBottom: `1px solid ${T.border}`, overflow: "hidden" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div className="gsap-reveal">
              <p style={{ fontFamily: "Courier New, monospace", fontSize: 9, letterSpacing: "0.25em", color: T.gold, textTransform: "uppercase", marginBottom: 24 }}>
                About
              </p>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 400, color: T.white, margin: "0 0 32px", lineHeight: 1.1 }}>
                Ten years behind<br />the lens.
              </h2>
              <p style={{ fontFamily: "Courier New, monospace", fontSize: 9, letterSpacing: "0.1em", color: T.dim, lineHeight: 2, margin: "0 0 20px" }}>
                I started with a borrowed camera and an obsession with how light behaves. I&apos;ve since shot on four continents for clients ranging from independent artists to global luxury houses.
              </p>
              <p style={{ fontFamily: "Courier New, monospace", fontSize: 9, letterSpacing: "0.1em", color: T.muted, lineHeight: 2, margin: 0 }}>
                My approach is slow, deliberate, and always in service of the story. I don&apos;t take on every project — only the ones that demand real craft.
              </p>
            </div>

            {/* Visual element */}
            <div className="gsap-reveal" style={{ position: "relative" }}>
              <div style={{
                aspectRatio:   "4/5",
                background:    T.cardBg,
                border:        `1px solid ${T.border}`,
                position:      "relative",
                overflow:      "hidden",
                display:       "flex",
                alignItems:    "center",
                justifyContent:"center",
              }}>
                <span style={{ fontFamily: "Georgia, serif", fontSize: "clamp(8rem, 18vw, 16rem)", fontWeight: 400, fontStyle: "italic", color: T.gold, opacity: 0.06, lineHeight: 1 }}>
                  JH
                </span>
                <div style={{ position: "absolute", bottom: 24, left: 24, right: 24 }}>
                  <div style={{ height: 1, background: T.border, marginBottom: 16 }} />
                  <p style={{ fontFamily: "Courier New, monospace", fontSize: 8, letterSpacing: "0.2em", color: T.muted, textTransform: "uppercase" }}>
                    James Holt — London
                  </p>
                </div>
              </div>
              {/* Offset label */}
              <div style={{
                position:   "absolute",
                top:        24,
                right:      -20,
                fontFamily: "Courier New, monospace",
                fontSize:   8,
                letterSpacing: "0.2em",
                color:      T.gold,
                textTransform: "uppercase",
                writingMode: "vertical-rl",
                transform:  "rotate(180deg)",
              }}>
                Available for new projects
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" style={{ padding: "160px 48px", overflow: "hidden" }}>
          <div className="gsap-reveal" style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: "Courier New, monospace", fontSize: 9, letterSpacing: "0.25em", color: T.gold, textTransform: "uppercase", marginBottom: 32 }}>
              Let&apos;s Work Together
            </p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 400, lineHeight: 0.95, color: T.white, margin: "0 0 48px", letterSpacing: "-0.02em" }}>
              START A<br />
              <em style={{ fontStyle: "italic", color: T.gold }}>PROJECT</em>
            </h2>
            <a
              href="mailto:james@jamesholt.film"
              onMouseEnter={() => onEnter("MAIL")}
              onMouseLeave={onLeave}
              style={{
                fontFamily:   "Courier New, monospace",
                fontSize:     "clamp(0.8rem, 2vw, 1.1rem)",
                letterSpacing:"0.1em",
                color:        T.white,
                textDecoration:"none",
                display:      "inline-block",
                borderBottom: `1px solid ${T.gold}`,
                paddingBottom: 4,
                transition:   "color 0.3s",
              }}
            >
              james@jamesholt.film
            </a>

            <div style={{ marginTop: 80, paddingTop: 48, borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
              {["Instagram", "Vimeo", "LinkedIn"].map((link) => (
                <a
                  key={link}
                  href="#"
                  onMouseEnter={() => onEnter()}
                  onMouseLeave={onLeave}
                  style={{
                    fontFamily:   "Courier New, monospace",
                    fontSize:     8,
                    letterSpacing:"0.2em",
                    color:        T.muted,
                    textDecoration:"none",
                    textTransform: "uppercase",
                    transition:   "color 0.3s",
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{
          borderTop:   `1px solid ${T.border}`,
          padding:     "32px 48px",
          display:     "flex",
          justifyContent: "space-between",
          alignItems:  "center",
          flexWrap:    "wrap",
          gap:         16,
        }}>
          <span style={{ fontFamily: "Georgia, serif", fontSize: 11, letterSpacing: "0.2em", color: T.muted, textTransform: "uppercase" }}>
            © 2026 James Holt
          </span>
          <span style={{ fontFamily: "Courier New, monospace", fontSize: 7, letterSpacing: "0.18em", color: T.muted, textTransform: "uppercase" }}>
            Site by Falcon Designs
          </span>
        </footer>

        {/* ── REEL MODAL ── */}
        {reelOpen && (
          <div
            onClick={() => setReelOpen(false)}
            style={{
              position:   "fixed",
              inset:      0,
              zIndex:     8000,
              background: "rgba(0,0,0,0.95)",
              display:    "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(8px)",
              animation:  "fadeIn 0.4s ease",
            }}
          >
            <div onClick={(e) => e.stopPropagation()} style={{ width: "min(900px, 90vw)", position: "relative" }}>
              <button
                onClick={() => setReelOpen(false)}
                style={{
                  position:   "absolute",
                  top:        -40,
                  right:      0,
                  background: "transparent",
                  border:     "none",
                  color:      T.dim,
                  fontFamily: "Courier New, monospace",
                  fontSize:   9,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  cursor:     "none",
                }}
              >
                Close ✕
              </button>
              <div style={{ aspectRatio: "16/9", background: T.cardBg, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&rel=0&modestbranding=1"
                  style={{ width: "100%", height: "100%", border: "none" }}
                  allow="autoplay; fullscreen"
                  title="Showreel"
                />
              </div>
            </div>
          </div>
        )}

      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @media (max-width: 768px) {
          .stat-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .vg-nav-links { display: none !important; }
        }
      `}</style>
    </>
  );
}
