"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";

// Easing from Wix Studio ANIMATIONS.md — slide-horizontal keyframe
const SLIDE_EASE = [0.83, 0, 0.17, 1] as const;

const TEMPLATES = [
  {
    title: "Aurum Creations",
    cat: "E-Commerce · Luxury",
    href: "/showcase/jewellery",
    url: "aurum-creations.co.uk",
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&w=1200&q=80",
    tags: ["Product Variants", "Cart & Checkout", "Wishlist", "Mega-Nav"],
  },
  {
    title: "Velour Nail Studio",
    cat: "Beauty · Nail Salon",
    href: "/showcase/nails",
    url: "velourbynails.com",
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&w=1200&q=80",
    tags: ["Booking Flow", "Products Shop", "Services Strip", "Gallery"],
  },
  {
    title: "Sterling & Co",
    cat: "Legal Services · Luxury",
    href: "/showcase/law",
    url: "sterlingandco.com",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&w=1200&q=80",
    tags: ["Mega-Nav", "5 Practice Areas", "Blog", "Team Profiles"],
  },
  {
    title: "Ember Restaurant",
    cat: "Hospitality · Fine Dining",
    href: "/showcase/restaurant",
    url: "emberlondon.co.uk",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&w=1200&q=80",
    tags: ["Reservation Flow", "Chef Story", "Parallax Hero", "Menu Page"],
  },
  {
    title: "Ivory Dental",
    cat: "Healthcare · Premium",
    href: "/showcase/dental",
    url: "ivorydental.co.uk",
    img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&w=1200&q=80",
    tags: ["Before/After Slider", "5-Step Booking", "Stat Count-up", "Bento Gallery"],
  },
  {
    title: "Maison Noir",
    cat: "Beauty · Hair Atelier",
    href: "/showcase/salon",
    url: "maisonnoir.co.uk",
    img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&w=1200&q=80",
    tags: ["Editorial Parallax", "Treatment Ticker", "Filterable Gallery", "Lightbox"],
  },
];

const INTERVAL = 3800;

export default function InteractiveMockup() {
  const [active, setActive]     = useState(0);
  const [dir, setDir]           = useState(1);    // 1 = forward, -1 = backward
  const [progress, setProgress] = useState(0);
  const timerRef                = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef             = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef            = useRef(null);
  const inView                  = useInView(containerRef, { once: false, margin: "0px 0px -200px 0px" });

  const goTo = useCallback((i: number, manual = false) => {
    setDir(i > active ? 1 : -1);
    setActive(i);
    setProgress(0);
    if (manual) {
      // restart the auto timer on manual select
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setActive(prev => {
          setDir(1);
          setProgress(0);
          return (prev + 1) % TEMPLATES.length;
        });
      }, INTERVAL);
    }
  }, [active]);

  // Auto-advance
  useEffect(() => {
    if (!inView) return;
    timerRef.current = setInterval(() => {
      setActive(prev => { setDir(1); setProgress(0); return (prev + 1) % TEMPLATES.length; });
    }, INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [inView]);

  // Progress bar
  useEffect(() => {
    if (!inView) return;
    setProgress(0);
    const step = 50;
    progressRef.current = setInterval(() => {
      setProgress(prev => Math.min(prev + (step / INTERVAL) * 100, 100));
    }, step);
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, [active, inView]);

  const T = TEMPLATES[active];

  return (
    <section ref={containerRef} style={{ maxWidth: 1280, margin: "0 auto", padding: "7rem 2.5rem" }}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        style={{ marginBottom: "4rem" }}
      >
        <p style={{ fontFamily: "'Wix Madefor Text', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#0000ee", marginBottom: "0.6rem" }}>
          Selected work
        </p>
        <h2 style={{ fontFamily: "'Wix Madefor Display', sans-serif", fontSize: "clamp(2rem, 4vw, 3.4rem)", fontWeight: 800, letterSpacing: "-0.025em", color: "#000", lineHeight: 1.05 }}>
          Native to every industry.
          <br />
          Fit for every project.
        </h2>
      </motion.div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.65fr", gap: "4rem", alignItems: "start" }}>

        {/* ── LEFT — template list ── */}
        <div>
          {TEMPLATES.map((t, i) => (
            <div
              key={t.title}
              onClick={() => goTo(i, true)}
              style={{
                padding: "1.2rem 0 1.2rem 1rem",
                borderBottom: "1px solid #323232",
                cursor: "pointer",
                borderLeft: active === i ? "3px solid #0000ee" : "3px solid transparent",
                transition: "border-color 0.2s",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{
                    fontFamily: "'Wix Madefor Display', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: active === i ? "#000" : "#888",
                    transition: "color 0.22s",
                    marginBottom: "0.25rem",
                  }}>
                    {t.title}
                  </div>
                  <div style={{
                    fontFamily: "'Wix Madefor Text', sans-serif",
                    fontSize: "0.72rem",
                    color: active === i ? "#0000ee" : "#aaa",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    transition: "color 0.22s",
                  }}>
                    {t.cat}
                  </div>
                </div>
                <span style={{
                  fontFamily: "'Wix Madefor Text', sans-serif",
                  fontSize: "0.85rem",
                  color: active === i ? "#0000ee" : "transparent",
                  transition: "color 0.22s, transform 0.22s",
                  transform: active === i ? "translateX(0)" : "translateX(-8px)",
                  display: "inline-block",
                }}>
                  →
                </span>
              </div>

              {/* Progress bar for active item */}
              {active === i && (
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "#f0f0f0" }}>
                  <motion.div
                    style={{ height: "100%", background: "#0000ee", width: `${progress}%` }}
                    transition={{ duration: 0 }}
                  />
                </div>
              )}
            </div>
          ))}

          {/* "First item" top border */}
          <style>{`.mock-list-first { border-top: 1px solid #323232; }`}</style>

          <div style={{ marginTop: "2rem" }}>
            <Link
              href="/showcase"
              style={{
                fontFamily: "'Wix Madefor Text', sans-serif",
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "#000",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                borderBottom: "1.5px solid #000",
                paddingBottom: "2px",
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#0000ee"; el.style.borderColor = "#0000ee"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#000"; el.style.borderColor = "#000"; }}
            >
              See all 12 templates →
            </Link>
          </div>
        </div>

        {/* ── RIGHT — browser window ── */}
        <div style={{ position: "sticky", top: 100 }}>
          <div style={{
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 32px 96px rgba(0,0,0,0.13), 0 4px 16px rgba(0,0,0,0.07)",
            border: "1px solid #e8e8e8",
            background: "#ffffff",
          }}>
            {/* Chrome bar */}
            <div style={{ background: "#f0f0f0", borderBottom: "1px solid #e0e0e0", padding: "10px 14px", display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ display: "flex", gap: 6 }}>
                {["#ff5f57","#febc2e","#28c840"].map(c => (
                  <span key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c, display: "block" }} />
                ))}
              </div>
              <div style={{ flex: 1, background: "#fff", borderRadius: 6, padding: "4px 12px", fontFamily: "'Wix Madefor Text', sans-serif", fontSize: "0.68rem", color: "#888", border: "1px solid #e0e0e0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 400 }}>
                <AnimatePresence mode="wait">
                  <motion.span key={T.url}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}>
                    {T.url}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Sliding image */}
            <div style={{ position: "relative", overflow: "hidden", lineHeight: 0, background: "#f6f6f6" }}>
              <AnimatePresence mode="wait" custom={dir}>
                <motion.img
                  key={active}
                  custom={dir}
                  src={T.img}
                  alt={T.title}
                  variants={{
                    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
                    center: { x: 0, opacity: 1 },
                    exit:  (d: number) => ({ x: d > 0 ? "-30%" : "30%", opacity: 0 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: SLIDE_EASE }}
                  style={{ width: "100%", height: 420, objectFit: "cover", objectPosition: "top", display: "block" }}
                />
              </AnimatePresence>

              {/* Feature tag chips — overlaid bottom-left */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`tags-${active}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    position: "absolute",
                    bottom: "1rem",
                    left: "1rem",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.4rem",
                  }}
                >
                  {T.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: "'Wix Madefor Text', sans-serif",
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      background: "rgba(255,255,255,0.92)",
                      backdropFilter: "blur(8px)",
                      color: "#000",
                      padding: "0.3rem 0.7rem",
                      borderRadius: 100,
                      letterSpacing: "0.02em",
                    }}>
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom bar — template name + CTA */}
            <div style={{ padding: "1rem 1.4rem", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f0f0f0" }}>
              <AnimatePresence mode="wait">
                <motion.div key={`name-${active}`}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
                  <div style={{ fontFamily: "'Wix Madefor Display', sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "#000" }}>{T.title}</div>
                  <div style={{ fontFamily: "'Wix Madefor Text', sans-serif", fontSize: "0.68rem", color: "#888", marginTop: 2 }}>{T.cat}</div>
                </motion.div>
              </AnimatePresence>
              <Link href={T.href} style={{
                fontFamily: "'Wix Madefor Text', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "#0000ee",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.5rem 0.9rem",
                border: "1.5px solid #0000ee",
                borderRadius: 6,
                transition: "background 0.2s, color 0.2s",
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#0000ee"; el.style.color = "#fff"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "#0000ee"; }}>
                View template →
              </Link>
            </div>
          </div>

          {/* Dot indicators — scaleX transform, no layout thrash */}
          <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: "1.2rem" }}>
            {TEMPLATES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, true)}
                aria-label={`View template ${i + 1}`}
                style={{ width: 22, height: 8, background: "transparent", border: "none", padding: 0, cursor: "pointer", flexShrink: 0 }}
              >
                <div style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 100,
                  background: active === i ? "#0000ee" : "#d0d0d0",
                  transform: `scaleX(${active === i ? 1 : 8 / 22})`,
                  transformOrigin: "center",
                  transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1), background 0.2s",
                }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
