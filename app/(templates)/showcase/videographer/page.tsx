"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────
   Data
────────────────────────────────────────────────────────────────── */
const PROJECTS = [
  { id: "01", title: "Solstice",  category: "Fashion Film",   year: "2025", duration: "4:22", colour: "#a89060", bg: "#0a0907" },
  { id: "02", title: "Drift",     category: "Automotive",     year: "2025", duration: "2:47", colour: "#7a8fa0", bg: "#07090a" },
  { id: "03", title: "Veil",      category: "Wedding",        year: "2024", duration: "6:10", colour: "#c4a882", bg: "#0a0807" },
  { id: "04", title: "Monument",  category: "Architecture",   year: "2024", duration: "3:55", colour: "#8a9088", bg: "#080908" },
  { id: "05", title: "Ember",     category: "Brand Campaign", year: "2024", duration: "1:30", colour: "#b07050", bg: "#0a0807" },
];

const SERVICES = [
  { n: "01", title: "Narrative Film",   body: "Long-form documentary and editorial work. We build stories that unfold over time." },
  { n: "02", title: "Brand Campaigns",  body: "Commercial and product films. Shot for screens that command attention." },
  { n: "03", title: "Wedding & Events", body: "Cinematic coverage for the moments that matter most. Discreet, unhurried, precise." },
  { n: "04", title: "Music Videos",     body: "Visual interpretations of sound. We work closely with artists to realise the vision." },
];

const CLIENTS = ["VOGUE","ROLLS-ROYCE","HARRODS","SONY MUSIC","TIFFANY & CO.","THE TIMES","BURBERRY","SOTHEBY'S","DIOR","BBC FILMS"];

const STATS = [
  { value: 120, suffix: "+", label: "Projects Completed" },
  { value: 8,   suffix: "",  label: "Years in the Industry" },
  { value: 40,  suffix: "+", label: "Countries Filmed" },
  { value: 12,  suffix: "",  label: "Awards Won" },
];

/* ─────────────────────────────────────────────────────────────────
   CSS — dark + light themes via CSS custom properties
────────────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  /* ── Dark theme (default) ── */
  :root {
    --bg:       #070707;
    --fg:       #f0ece0;
    --gold:     #c8b887;
    --dim:      rgba(240,236,224,0.55);
    --muted:    rgba(240,236,224,0.30);
    --border:   rgba(240,236,224,0.10);
    --card:     #0d0d0c;
    --surface:  #111110;
    --nav-bg:   rgba(7,7,7,0.93);
    --overlay:  rgba(0,0,0,0.55);
    --grain-blend: overlay;
    --grain-opacity: 0.032;
  }

  /* ── Light theme ── */
  .vg-light {
    --bg:       #f0ece3;
    --fg:       #1c1814;
    --gold:     #8a6820;
    --dim:      rgba(28,24,20,0.68);
    --muted:    rgba(28,24,20,0.44);
    --border:   rgba(28,24,20,0.13);
    --card:     #e5e0d7;
    --surface:  #ebe6dd;
    --nav-bg:   rgba(240,236,227,0.95);
    --overlay:  rgba(240,236,227,0.72);
    --grain-blend: multiply;
    --grain-opacity: 0.025;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { overflow-x: hidden; cursor: none !important; }
  a, button { cursor: none !important; }
  .vg-site { background: var(--bg); color: var(--fg); min-height: 100vh; }

  /* Cursor */
  #vg-cursor-ring {
    position: fixed; top: 0; left: 0; z-index: 9998; pointer-events: none;
    width: 36px; height: 36px; border-radius: 50%;
    border: 1px solid var(--fg);
    opacity: 0.35;
    display: flex; align-items: center; justify-content: center;
    will-change: transform;
    transition: width  0.22s cubic-bezier(.16,1,.3,1),
                height 0.22s cubic-bezier(.16,1,.3,1),
                border-color 0.22s ease, opacity 0.22s ease;
  }
  #vg-cursor-ring.hovered { width: 60px; height: 60px; border-color: var(--gold); opacity: 1; }
  #vg-cursor-dot {
    position: fixed; top: 0; left: 0; z-index: 9999; pointer-events: none;
    width: 4px; height: 4px; border-radius: 50%;
    background: var(--fg); opacity: 1; will-change: transform;
    transition: opacity 0.15s ease;
  }
  #vg-cursor-dot.hovered { opacity: 0; }
  #vg-cursor-label {
    font-family: 'Courier New', monospace; font-size: 8px;
    letter-spacing: 0.14em; color: var(--gold); text-transform: uppercase;
  }

  /* Grain */
  #vg-grain {
    position: fixed; inset: 0; z-index: 9997; pointer-events: none;
    opacity: var(--grain-opacity);
    mix-blend-mode: var(--grain-blend);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    background-repeat: repeat;
    animation: grainShift 0.5s steps(2) infinite;
  }
  @keyframes grainShift {
    0%  { background-position: 0 0 }
    25% { background-position: -10px 5px }
    50% { background-position: 8px -6px }
    75% { background-position: -5px 9px }
  }

  /* Loader */
  #vg-loader {
    position: fixed; inset: 0; z-index: 9000; background: #070707;
    display: flex; align-items: center; justify-content: center;
    flex-direction: column; gap: 24px;
    transition: opacity 0.9s cubic-bezier(.16,1,.3,1), visibility 0.9s;
  }
  #vg-loader.done { opacity: 0; visibility: hidden; pointer-events: none; }
  #vg-loader-bar-track { width: 140px; height: 1px; background: rgba(240,236,224,0.1); position: relative; overflow: hidden; }
  #vg-loader-bar {
    position: absolute; inset: 0; background: #c8b887;
    transform: scaleX(0); transform-origin: left;
    animation: loaderFill 2.1s cubic-bezier(.16,1,.3,1) forwards;
  }
  @keyframes loaderFill { to { transform: scaleX(1) } }

  /* Marquee */
  @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
  .vg-marquee { animation: marquee 22s linear infinite; will-change: transform; }

  /* Nav links hide on mobile */
  @media (max-width: 768px) { .vg-nav-links { display: none !important; } }

  /* Hero char clip */
  .vg-hero-clip { overflow: hidden; padding-bottom: 0.08em; }

  /* Service rows — hover is purely informational (not clickable) */
  .vg-service-row { transition: background 0.3s ease; }
  .vg-service-row:hover { background: var(--surface); }

  /* Reel modal */
  #vg-modal {
    position: fixed; inset: 0; z-index: 8000;
    background: rgba(0,0,0,0.96); backdrop-filter: blur(10px);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; visibility: hidden; pointer-events: none;
    transition: opacity 0.4s ease, visibility 0.4s;
  }
  #vg-modal.open { opacity: 1; visibility: visible; pointer-events: auto; }

  /* Theme toggle */
  .vg-theme-btn {
    width: 36px; height: 20px; border-radius: 10px; position: relative;
    border: 1px solid var(--border);
    background: transparent;
    transition: border-color 0.3s, background 0.3s;
    cursor: none !important;
  }
  .vg-theme-btn::after {
    content: '';
    position: absolute; top: 3px; left: 3px;
    width: 12px; height: 12px; border-radius: 50%;
    background: var(--muted);
    transition: transform 0.3s cubic-bezier(.16,1,.3,1), background 0.3s;
  }
  .vg-light .vg-theme-btn::after {
    transform: translateX(16px);
    background: var(--gold);
  }
  .vg-theme-btn:hover { border-color: var(--gold); }

  /* GSAP initial state */
  .gsap-reveal { will-change: transform, opacity; }
  #vg-track { will-change: transform; }
`;

/* ─────────────────────────────────────────────────────────────────
   Component
────────────────────────────────────────────────────────────────── */
export default function VideographerTemplate() {
  const [loaded,   setLoaded]   = useState(false);
  const [reelOpen, setReelOpen] = useState(false);
  const [light,    setLight]    = useState(false);

  const navRef       = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef  = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);

  /* ── Loader ── */
  useEffect(() => {
    const t = setTimeout(() => {
      setLoaded(true);
      document.getElementById("vg-loader")?.classList.add("done");
    }, 2200);
    return () => clearTimeout(t);
  }, []);

  /* ── Cursor — pure RAF, no React state ── */
  useEffect(() => {
    const ring = document.getElementById("vg-cursor-ring");
    const dot  = document.getElementById("vg-cursor-dot");
    if (!ring || !dot) return;

    let mx = -200, my = -200, rx = -200, ry = -200;
    let rafId: number;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const tick = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
      dot.style.transform  = `translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`;
      rafId = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafId); };
  }, []);

  /* ── GSAP + Lenis — starts on mount ── */
  useEffect(() => {
    let destroyed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }, { default: SplitType }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("split-type"),
      ]);
      if (destroyed) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.85, orientation: "vertical", smoothWheel: true, syncTouch: false });

      /* Nav direct DOM — no setScrolled */
      lenis.on("scroll", (e: { scroll: number }) => {
        const nav = navRef.current;
        if (!nav) return;
        const past = e.scroll > 60;
        nav.style.background     = past ? "var(--nav-bg)" : "transparent";
        nav.style.backdropFilter = past ? "blur(14px)"    : "none";
        nav.style.borderBottomColor = past ? "var(--border)" : "transparent";
      });

      lenis.on("scroll", ScrollTrigger.update);
      const tickerFn = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      /* Hero SplitType — fires at delay 2.4 s (just after loader fades) */
      if (heroTitleRef.current) {
        const split = new SplitType(heroTitleRef.current, { types: "chars" });
        gsap.set(split.chars, { yPercent: 120, opacity: 0 });
        gsap.to(split.chars, { yPercent: 0, opacity: 1, duration: 1.2, ease: "expo.out", stagger: 0.025, delay: 2.4, force3D: true });
      }

      /* Horizontal scroll */
      if (projectsRef.current && trackRef.current) {
        const track = trackRef.current;
        const cards = track.querySelectorAll<HTMLElement>(".proj-card");
        const cardW = cards[0]?.offsetWidth ?? 460;
        const dist  = (cardW + 24) * cards.length - 24 - window.innerWidth + 96;
        if (dist > 0) {
          gsap.timeline({
            scrollTrigger: { trigger: projectsRef.current, start: "top top", end: `+=${dist}`, pin: true, scrub: 1.2, anticipatePin: 1 },
          }).to(track, { x: -dist, ease: "none", force3D: true });
        }
      }

      /* Reveal */
      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 55, force3D: true }, {
          opacity: 1, y: 0, duration: 1, ease: "expo.out", force3D: true,
          scrollTrigger: { trigger: el, start: "top 87%", toggleActions: "play none none none" },
        });
      });

      /* Counters */
      gsap.utils.toArray<HTMLElement>(".gsap-counter").forEach((el) => {
        gsap.fromTo(el, { innerText: 0 }, {
          innerText: parseFloat(el.dataset.target ?? "0"),
          snap: { innerText: 1 }, duration: 2, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", toggleActions: "play none none none" },
        });
      });

      cleanup = () => { lenis.destroy(); gsap.ticker.remove(tickerFn); ScrollTrigger.getAll().forEach((t) => t.kill()); };
    })();

    return () => { destroyed = true; cleanup?.(); };
  }, []);

  /* ── Cursor helpers — direct DOM, no setState ── */
  const cEnter = (text = "") => {
    document.getElementById("vg-cursor-ring")?.classList.add("hovered");
    document.getElementById("vg-cursor-dot")?.classList.add("hovered");
    const lbl = document.getElementById("vg-cursor-label");
    if (lbl) lbl.textContent = text;
  };
  const cLeave = () => {
    document.getElementById("vg-cursor-ring")?.classList.remove("hovered");
    document.getElementById("vg-cursor-dot")?.classList.remove("hovered");
    const lbl = document.getElementById("vg-cursor-label");
    if (lbl) lbl.textContent = "";
  };

  /* ── Shared style helpers ── */
  const label = { fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: "0.22em", color: "var(--muted)", textTransform: "uppercase" as const };
  const mono  = { fontFamily: "'Courier New', monospace" } as const;
  const serif = { fontFamily: "Georgia, serif" } as const;

  return (
    <>
      <style suppressHydrationWarning>{GLOBAL_CSS}</style>

      {/* Grain */}
      <div id="vg-grain" aria-hidden />

      {/* Cursor */}
      <div id="vg-cursor-ring" aria-hidden><span id="vg-cursor-label" /></div>
      <div id="vg-cursor-dot"  aria-hidden />

      {/* Loader — always dark */}
      <div id="vg-loader" aria-hidden>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ ...serif, fontSize: 13, letterSpacing: "0.3em", color: "#c8b887", textTransform: "uppercase" }}>James Holt</span>
          <span style={{ width: 1, height: 16, background: "#c8b887", opacity: 0.3 }} />
          <span style={{ ...mono, fontSize: 9, letterSpacing: "0.25em", color: "rgba(240,236,224,0.35)", textTransform: "uppercase" }}>Cinematographer</span>
        </div>
        <div id="vg-loader-bar-track"><div id="vg-loader-bar" /></div>
      </div>

      {/* ── SITE ── */}
      <div className={`vg-site${light ? " vg-light" : ""}`}>

        {/* NAV */}
        <nav
          ref={navRef}
          style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
            padding: "0 48px", height: 72,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            borderBottom: "1px solid transparent",
            transition: "background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease",
          }}
        >
          <a href="#hero" onMouseEnter={() => cEnter()} onMouseLeave={cLeave}
            style={{ ...serif, fontSize: 13, letterSpacing: "0.25em", color: "var(--fg)", textDecoration: "none", textTransform: "uppercase" }}>
            James Holt
          </a>

          <div className="vg-nav-links" style={{ display: "flex", alignItems: "center", gap: 40 }}>
            {(["Work","Services","About","Contact"] as const).map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                onMouseEnter={() => cEnter()} onMouseLeave={cLeave}
                onMouseOver={(e)  => (e.currentTarget.style.color = "var(--fg)")}
                onMouseOut={(e)   => (e.currentTarget.style.color = "var(--muted)")}
                style={{ ...mono, fontSize: 11, letterSpacing: "0.2em", color: "var(--muted)", textDecoration: "none", textTransform: "uppercase", transition: "color 0.25s" }}>
                {item}
              </a>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Theme toggle */}
            <button
              className="vg-theme-btn"
              onClick={() => setLight((v) => !v)}
              onMouseEnter={() => cEnter(light ? "DARK" : "LITE")} onMouseLeave={cLeave}
              title={light ? "Switch to dark" : "Switch to light"}
              aria-label="Toggle theme"
            />

            {/* Reel CTA */}
            <button onClick={() => setReelOpen(true)}
              onMouseEnter={() => cEnter("PLAY")} onMouseLeave={cLeave}
              onMouseOver={(e)  => (e.currentTarget as HTMLButtonElement).style.background = "var(--fg)"}
              onMouseOut={(e)   => (e.currentTarget as HTMLButtonElement).style.background = "var(--gold)"}
              style={{ ...mono, fontSize: 10, letterSpacing: "0.18em", color: "var(--bg)", background: "var(--gold)", border: "none", padding: "11px 22px", textTransform: "uppercase", transition: "background 0.25s, color 0.25s" }}>
              View Reel
            </button>
          </div>
        </nav>

        {/* HERO */}
        <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 48px 80px", position: "relative", overflow: "hidden" }}>
          {[20, 50, 80].map((p) => (
            <div key={p} aria-hidden style={{ position: "absolute", top: 0, bottom: 0, left: `${p}%`, width: 1, background: "var(--border)", pointerEvents: "none" }} />
          ))}

          <div style={{ position: "absolute", top: 96, right: 48, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
            <span style={{ ...label, fontSize: 10 }}>London — Based</span>
            <span style={{ ...label, fontSize: 10 }}>Available 2026</span>
          </div>

          <div className="vg-hero-clip">
            <h1 ref={heroTitleRef}
              style={{ ...serif, fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 400, lineHeight: 0.9, letterSpacing: "-0.02em", color: "var(--fg)" }}>
              MOTION<br />
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>&amp; LIGHT</em>
            </h1>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 40, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
            <p style={{ ...mono, fontSize: 12, letterSpacing: "0.18em", color: "var(--dim)", textTransform: "uppercase", maxWidth: 320, lineHeight: 1.9 }}>
              Award-winning cinematographer<br />based in London, UK
            </p>
            <button onClick={() => setReelOpen(true)}
              onMouseEnter={() => cEnter("PLAY")} onMouseLeave={cLeave}
              onMouseOver={(e)  => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "var(--gold)"; b.style.color = "var(--gold)"; }}
              onMouseOut={(e)   => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "var(--border)"; b.style.color = "var(--fg)"; }}
              style={{ display: "flex", alignItems: "center", gap: 14, background: "transparent", border: "1px solid var(--border)", color: "var(--fg)", padding: "16px 28px", ...mono, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", transition: "border-color 0.25s, color 0.25s" }}>
              <span style={{ width: 0, height: 0, borderStyle: "solid", borderWidth: "5px 0 5px 9px", borderColor: "transparent transparent transparent var(--gold)" }} />
              Watch Showreel
            </button>
          </div>

          <div style={{ position: "absolute", bottom: 80, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <span style={{ ...label, fontSize: 9 }}>Scroll</span>
            <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, var(--gold), transparent)" }} />
          </div>
        </section>

        {/* STATEMENT */}
        <section style={{ padding: "160px 48px", borderTop: "1px solid var(--border)", overflow: "hidden" }}>
          <div className="gsap-reveal" style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
            <p style={{ ...label, fontSize: 10, color: "var(--gold)", marginBottom: 32 }}>Philosophy</p>
            <blockquote style={{ ...serif, fontSize: "clamp(1.7rem, 3.5vw, 3rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.3, color: "var(--fg)" }}>
              &ldquo;Every frame is a decision. Every cut, a breath. I make films for people who believe that how something looks is inseparable from what it means.&rdquo;
            </blockquote>
          </div>
        </section>

        {/* STATS */}
        <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {STATS.map((s, i) => (
              <div key={s.label} className="gsap-reveal"
                style={{ padding: "56px 40px", borderRight: i < 3 ? "1px solid var(--border)" : "none", textAlign: "center" }}>
                <p style={{ ...serif, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--gold)", marginBottom: 10 }}>
                  <span className="gsap-counter" data-target={s.value}>{s.value}</span>{s.suffix}
                </p>
                <p style={{ ...label, fontSize: 10 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS — horizontal scroll */}
        <section id="work" ref={projectsRef} style={{ overflow: "hidden" }}>
          <div style={{ padding: "80px 48px 40px" }}>
            <p className="gsap-reveal" style={{ ...label, fontSize: 11, color: "var(--gold)" }}>Selected Work</p>
          </div>

          <div style={{ overflow: "hidden", paddingLeft: 48 }}>
            <div id="vg-track" ref={trackRef} style={{ display: "flex", gap: 24, paddingRight: 96 }}>
              {PROJECTS.map((p) => (
                <div key={p.id} className="proj-card"
                  onMouseEnter={() => cEnter("VIEW")} onMouseLeave={cLeave}
                  style={{ width: "min(460px, 70vw)", flexShrink: 0 }}>
                  <div style={{ height: 320, background: p.bg, position: "relative", overflow: "hidden", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 220, height: 220, borderRadius: "50%", border: `1px solid ${p.colour}`, opacity: 0.12, position: "absolute" }} />
                    <div style={{ width: 130, height: 130, borderRadius: "50%", border: `1px solid ${p.colour}`, opacity: 0.22, position: "absolute" }} />
                    <div style={{ width: 50, height: 50, borderRadius: "50%", background: p.colour, opacity: 0.28, position: "absolute" }} />
                    <p style={{ ...serif, fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 400, fontStyle: "italic", color: p.colour, position: "relative", zIndex: 1, opacity: 0.75 }}>{p.title}</p>
                    <div style={{ position: "absolute", top: 14, right: 14, ...mono, fontSize: 10, letterSpacing: "0.18em", color: "rgba(240,236,224,0.55)", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", padding: "6px 10px" }}>{p.duration}</div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                      <p style={{ ...serif, fontSize: 22, fontWeight: 400, color: "var(--fg)", marginBottom: 5 }}>{p.title}</p>
                      <p style={{ ...label, fontSize: 10 }}>{p.category}</p>
                    </div>
                    <span style={{ ...mono, fontSize: 11, color: "var(--muted)" }}>{p.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: "40px 48px", borderTop: "1px solid var(--border)", marginTop: 80, display: "flex", justifyContent: "space-between" }}>
            <p style={{ ...label, fontSize: 10 }}>Scroll to explore →</p>
            <span style={{ ...label, fontSize: 10 }}>{PROJECTS.length} films</span>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" style={{ padding: "160px 48px", borderTop: "1px solid var(--border)", overflow: "hidden" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="gsap-reveal" style={{ marginBottom: 80 }}>
              <p style={{ ...label, fontSize: 11, color: "var(--gold)", marginBottom: 16 }}>Services</p>
              <h2 style={{ ...serif, fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 400, color: "var(--fg)", lineHeight: 1.1 }}>What I Create</h2>
            </div>

            <div style={{ border: "1px solid var(--border)" }}>
              {SERVICES.map((s, i) => (
                <div key={s.n} className="gsap-reveal vg-service-row"
                  style={{ display: "flex", alignItems: "center", gap: 48, padding: "44px 40px", borderBottom: i < SERVICES.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <span style={{ ...mono, fontSize: 13, color: "var(--muted)", minWidth: 32 }}>{s.n}</span>
                  <div style={{ borderLeft: "1px solid var(--border)", paddingLeft: 40, flex: 1 }}>
                    <h3 style={{ ...serif, fontSize: "clamp(1.2rem, 2.5vw, 2rem)", fontWeight: 400, color: "var(--fg)", marginBottom: 10 }}>{s.title}</h3>
                    <p style={{ ...mono, fontSize: 11, letterSpacing: "0.1em", color: "var(--dim)", lineHeight: 1.9, maxWidth: 520 }}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLIENTS MARQUEE */}
        <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "28px 0", overflow: "hidden" }}>
          <div className="vg-marquee" style={{ display: "flex", whiteSpace: "nowrap" }}>
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span key={i} style={{ ...mono, fontSize: 11, letterSpacing: "0.3em", color: i % 2 === 0 ? "var(--muted)" : "var(--dim)", textTransform: "uppercase", padding: "0 56px", flexShrink: 0 }}>
                {c}
              </span>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" style={{ padding: "160px 48px", borderBottom: "1px solid var(--border)", overflow: "hidden" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div className="gsap-reveal">
              <p style={{ ...label, fontSize: 11, color: "var(--gold)", marginBottom: 24 }}>About</p>
              <h2 style={{ ...serif, fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 400, color: "var(--fg)", marginBottom: 32, lineHeight: 1.1 }}>
                Ten years behind<br />the lens.
              </h2>
              <p style={{ ...mono, fontSize: 11, letterSpacing: "0.08em", color: "var(--dim)", lineHeight: 2, marginBottom: 20 }}>
                I started with a borrowed camera and an obsession with how light behaves. I&apos;ve since shot on four continents for clients ranging from independent artists to global luxury houses.
              </p>
              <p style={{ ...mono, fontSize: 11, letterSpacing: "0.08em", color: "var(--muted)", lineHeight: 2 }}>
                My approach is slow, deliberate, and always in service of the story. I don&apos;t take on every project — only the ones that demand real craft.
              </p>
            </div>

            <div className="gsap-reveal" style={{ position: "relative" }}>
              <div style={{ aspectRatio: "4/5", background: "var(--card)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
                <span style={{ ...serif, fontSize: "clamp(8rem, 18vw, 16rem)", fontWeight: 400, fontStyle: "italic", color: "var(--gold)", opacity: 0.07, lineHeight: 1 }}>JH</span>
                <div style={{ position: "absolute", bottom: 24, left: 24, right: 24 }}>
                  <div style={{ height: 1, background: "var(--border)", marginBottom: 14 }} />
                  <p style={{ ...label, fontSize: 10 }}>James Holt — London</p>
                </div>
              </div>
              <div style={{ position: "absolute", top: 24, right: -20, ...mono, fontSize: 10, letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                Available for new projects
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ padding: "160px 48px", overflow: "hidden" }}>
          <div className="gsap-reveal" style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <p style={{ ...label, fontSize: 11, color: "var(--gold)", marginBottom: 32 }}>Let&apos;s Work Together</p>
            <h2 style={{ ...serif, fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 400, lineHeight: 0.95, color: "var(--fg)", marginBottom: 48, letterSpacing: "-0.02em" }}>
              START A<br /><em style={{ fontStyle: "italic", color: "var(--gold)" }}>PROJECT</em>
            </h2>
            <a href="mailto:james@jamesholt.film"
              onMouseEnter={() => cEnter("MAIL")} onMouseLeave={cLeave}
              onMouseOver={(e)  => (e.currentTarget.style.color = "var(--gold)")}
              onMouseOut={(e)   => (e.currentTarget.style.color = "var(--fg)")}
              style={{ ...mono, fontSize: "clamp(0.85rem, 2vw, 1.1rem)", letterSpacing: "0.1em", color: "var(--fg)", textDecoration: "none", display: "inline-block", borderBottom: "1px solid var(--gold)", paddingBottom: 4, transition: "color 0.25s" }}>
              james@jamesholt.film
            </a>

            <div style={{ marginTop: 80, paddingTop: 48, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
              {["Instagram","Vimeo","LinkedIn"].map((link) => (
                <a key={link} href="#"
                  onMouseEnter={() => cEnter()} onMouseLeave={cLeave}
                  onMouseOver={(e)  => (e.currentTarget.style.color = "var(--fg)")}
                  onMouseOut={(e)   => (e.currentTarget.style.color = "var(--muted)")}
                  style={{ ...mono, fontSize: 11, letterSpacing: "0.22em", color: "var(--muted)", textDecoration: "none", textTransform: "uppercase", transition: "color 0.25s" }}>
                  {link}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: "1px solid var(--border)", padding: "28px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ ...serif, fontSize: 12, letterSpacing: "0.2em", color: "var(--muted)", textTransform: "uppercase" }}>© 2026 James Holt</span>
          <span style={{ ...mono, fontSize: 9, letterSpacing: "0.18em", color: "var(--muted)", textTransform: "uppercase" }}>Site by Falcon Designs</span>
        </footer>
      </div>

      {/* REEL MODAL */}
      <div id="vg-modal" className={reelOpen ? "open" : ""} onClick={() => setReelOpen(false)}>
        <div onClick={(e) => e.stopPropagation()} style={{ width: "min(900px, 90vw)", position: "relative" }}>
          <button onClick={() => setReelOpen(false)}
            onMouseEnter={() => cEnter()} onMouseLeave={cLeave}
            style={{ position: "absolute", top: -36, right: 0, background: "transparent", border: "none", color: "rgba(240,236,224,0.5)", ...mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Close ✕
          </button>
          <div style={{ aspectRatio: "16/9", background: "#0d0d0c", border: "1px solid rgba(240,236,224,0.09)" }}>
            {reelOpen && (
              <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1"
                style={{ width: "100%", height: "100%", border: "none" }}
                allow="autoplay; fullscreen" title="Showreel" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
