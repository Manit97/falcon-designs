"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { C, DISPLAY, BODY, BASE, SERVICES, TESTIMONIALS, SLIDER_IMAGES } from "./lib/data";

const EASE = [0.23,1,0.32,1] as const;

function Label({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.2rem" }}>
      <span style={{ display: "block", width: 28, height: 1, background: light ? C.roseLt : C.rose }} />
      <span style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: light ? C.roseLt : C.rose, fontWeight: 600 }}>
        {text}
      </span>
    </div>
  );
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay }}>
      {children}
    </motion.div>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0,1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0,1], ["0%", "15%"]);

  return (
    <section ref={ref} style={{ position: "relative", height: "100svh", minHeight: 600, overflow: "hidden", display: "flex", alignItems: "center" }}>
      {/* Full-bleed background image with overlay */}
      <motion.div style={{ position: "absolute", inset: 0, y: imgY }}>
        <img
          src="https://images.unsplash.com/photo-1604946989636-d4b76e25e05b?w=1800&q=90"
          alt="Luxury nail art"
          style={{ width: "100%", height: "115%", objectFit: "cover", objectPosition: "center" }}
        />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(105deg, rgba(253,250,248,0.97) 0%, rgba(253,250,248,0.88) 38%, rgba(253,250,248,0.35) 65%, transparent 100%)` }} />
      </motion.div>

      <motion.div style={{ position: "relative", zIndex: 2, maxWidth: 1280, width: "100%", margin: "0 auto", padding: "0 2.5rem", y: textY }}>
        <Label text="Nail Studio · London" />
        <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(3.2rem, 7vw, 7rem)", fontWeight: 300, lineHeight: 1.05, color: C.plum, marginBottom: "1.5rem", maxWidth: "10ch" }}>
          Where nails<br />become <em style={{ color: C.rose, fontStyle: "italic" }}>art</em>.
        </h1>
        <p style={{ fontFamily: BODY, fontSize: "1rem", lineHeight: 1.75, color: C.textMd, maxWidth: 400, marginBottom: "2.5rem", fontWeight: 300 }}>
          Precision craftsmanship. Luxurious materials. A space designed entirely around you.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link href={`${BASE}/book`} style={{
            fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase",
            fontWeight: 600, color: C.white, background: C.rose, padding: "1rem 2.2rem", transition: "background 0.2s ease",
            display: "inline-block",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = C.plum)}
            onMouseLeave={e => (e.currentTarget.style.background = C.rose)}
          >
            Book Appointment
          </Link>
          <Link href={`${BASE}/services`} style={{
            fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase",
            fontWeight: 500, color: C.plum, border: `1px solid ${C.border}`, padding: "1rem 2.2rem", transition: "border-color 0.2s ease",
            display: "inline-block",
          }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = C.rose)}
            onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
          >
            Our Services
          </Link>
        </div>
        <div style={{ display: "flex", gap: "3rem", marginTop: "4rem", flexWrap: "wrap" }}>
          {[["8+", "Years Experience"],["2,400+","Happy Clients"],["200+","Colour Shades"]].map(([n,l]) => (
            <div key={l}>
              <div style={{ fontFamily: DISPLAY, fontSize: "2.2rem", fontWeight: 400, color: C.plum, lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.textLt, marginTop: "0.3rem" }}>{l}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ── SERVICES TICKER ───────────────────────────────────────────────────────────
function ServicesTicker() {
  const items = [...SERVICES, ...SERVICES];
  return (
    <div style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, overflow: "hidden", padding: "1rem 0", background: C.surface }}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: "3rem", width: "max-content", alignItems: "center" }}
      >
        {items.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "1.2rem", whiteSpace: "nowrap" }}>
            <span style={{ fontFamily: DISPLAY, fontSize: "1.1rem", fontWeight: 400, color: C.plum, fontStyle: "italic" }}>{s.name}</span>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: C.rose, flexShrink: 0 }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ── GALLERY MOSAIC ─────────────────────────────────────────────────────────────
// Mixed-shape image collage: circles, arches, ovals on a warm background
function GalleryMosaic() {
  const IMGS = [
    { src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80", shape: "circle",   alt: "Nail art detail" },
    { src: "https://images.unsplash.com/photo-1604946989636-d4b76e25e05b?w=800&q=80", shape: "arch-tall", alt: "Gel nails" },
    { src: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=800&q=80", shape: "arch-wide", alt: "Nail painting" },
    { src: "https://images.unsplash.com/photo-1604954892701-0c95a2b3c0d5?w=800&q=80", shape: "circle",   alt: "Manicure" },
    { src: "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=800&q=80", shape: "arch-wide", alt: "Pedicure" },
    { src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80", shape: "oval",     alt: "Nail products" },
    { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",    shape: "circle",   alt: "Salon" },
    { src: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80", shape: "arch-tall", alt: "Gel polish" },
  ];

  const shapes: Record<string, React.CSSProperties> = {
    circle:    { borderRadius: "50%",       aspectRatio: "1/1" },
    "arch-tall": { borderRadius: "200px 200px 0 0", aspectRatio: "3/4" },
    "arch-wide": { borderRadius: "200px 200px 0 0", aspectRatio: "4/3" },
    oval:      { borderRadius: "50%",       aspectRatio: "4/3" },
  };

  return (
    <section style={{ padding: "6rem 2.5rem", background: C.bg, overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <Label text="Our Gallery" />
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, color: C.plum, lineHeight: 1.1 }}>
              Every nail tells<br />a <em style={{ fontStyle: "italic", color: C.rose }}>story</em>.
            </h2>
          </div>
          <Link href={`${BASE}/services`} style={{
            fontFamily: BODY, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase",
            fontWeight: 500, color: C.plum, border: `1px solid ${C.border}`, padding: "0.8rem 1.8rem",
            display: "inline-block",
          }}>
            View Services →
          </Link>
        </div>

        {/* Mosaic grid: 4 columns, staggered heights with shape-cropped images */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.2rem", alignItems: "start" }}>

          {/* Col 1: circle top, arch-wide below */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <FadeUp delay={0}>
              <div style={{ overflow: "hidden", ...shapes.circle, background: C.surface }}>
                <img src={IMGS[0].src} alt={IMGS[0].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </FadeUp>
            <FadeUp delay={0.08}>
              <div style={{ overflow: "hidden", ...shapes["arch-wide"], background: C.surface }}>
                <img src={IMGS[4].src} alt={IMGS[4].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </FadeUp>
          </div>

          {/* Col 2: tall arch (offset top by padding) */}
          <FadeUp delay={0.05}>
            <div style={{ overflow: "hidden", ...shapes["arch-tall"], background: C.surface, marginTop: "3rem" }}>
              <img src={IMGS[1].src} alt={IMGS[1].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </FadeUp>

          {/* Col 3: arch-wide, then oval */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <FadeUp delay={0.1}>
              <div style={{ overflow: "hidden", ...shapes["arch-wide"], background: C.surface }}>
                <img src={IMGS[2].src} alt={IMGS[2].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div style={{ overflow: "hidden", ...shapes.oval, background: C.surface }}>
                <img src={IMGS[5].src} alt={IMGS[5].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </FadeUp>
          </div>

          {/* Col 4: circle then tall arch */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginTop: "1.5rem" }}>
            <FadeUp delay={0.07}>
              <div style={{ overflow: "hidden", ...shapes.circle, background: C.surface }}>
                <img src={IMGS[3].src} alt={IMGS[3].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </FadeUp>
            <FadeUp delay={0.12}>
              <div style={{ overflow: "hidden", ...shapes["arch-tall"], background: C.surface }}>
                <img src={IMGS[7].src} alt={IMGS[7].alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── MARQUEE IMAGE STRIP ───────────────────────────────────────────────────────
function ImageMarquee() {
  const doubled = [...SLIDER_IMAGES, ...SLIDER_IMAGES];
  return (
    <div style={{ overflow: "hidden", borderTop: `1px solid ${C.border}` }}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", width: "max-content" }}
      >
        {doubled.map((img, i) => (
          <div key={i} style={{ width: 280, height: 360, flexShrink: 0, overflow: "hidden" }}>
            <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ── TESTIMONIALS — BENTO GRID ─────────────────────────────────────────────────
function Testimonials() {
  const main = TESTIMONIALS[0];
  const rest = TESTIMONIALS.slice(1);

  return (
    <section style={{ background: "#F5F0EA", padding: "7rem 2.5rem" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ marginBottom: "3rem" }}>
          <Label text="Client Stories" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gridTemplateRows: "auto auto", gap: "1rem" }}>

          {/* Hero card — large, dark */}
          <div style={{
            gridRow: "1 / 3", gridColumn: "1 / 2",
            background: C.plum, borderRadius: 20, padding: "2.8rem",
            display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 340,
          }}>
            <div>
              <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 400, color: "#fff", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                What Our<br />Clients <em style={{ color: C.roseLt, fontStyle: "italic" }}>Say!</em>
              </h2>
              <p style={{ fontFamily: BODY, fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, fontWeight: 300, maxWidth: 380 }}>
                {main.quote}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <img src={main.img} alt={main.author} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
                <div>
                  <div style={{ fontFamily: BODY, fontSize: "0.78rem", fontWeight: 600, color: "#fff" }}>{main.author}</div>
                  <div style={{ fontFamily: BODY, fontSize: "0.65rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em" }}>{main.title}</div>
                </div>
              </div>
              {/* decorative arrow-pill */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", background: "rgba(255,255,255,0.1)", borderRadius: 100, padding: "0.5rem 0.8rem" }}>
                <span style={{ fontFamily: BODY, fontSize: "0.7rem", color: "#fff" }}>→</span>
                <img src={main.img} alt="" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />
              </div>
            </div>
          </div>

          {/* Right cards — 3 in a column */}
          {rest.slice(0, 3).map((t, i) => (
            <div key={i} style={{
              background: "#1A1A1A", borderRadius: 20, padding: "1.8rem 2rem",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
            }}>
              <div>
                <div style={{ fontFamily: DISPLAY, fontSize: "2rem", color: C.rose, lineHeight: 1, marginBottom: "0.5rem" }}>"</div>
                <p style={{ fontFamily: BODY, fontSize: "0.82rem", lineHeight: 1.7, color: "rgba(255,255,255,0.75)", fontWeight: 300 }}>
                  {t.quote}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.2rem" }}>
                <div>
                  <div style={{ fontFamily: BODY, fontSize: "0.75rem", fontWeight: 600, color: C.roseLt }}>{t.author}</div>
                  <div style={{ fontFamily: BODY, fontSize: "0.62rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>{t.title}</div>
                </div>
                <img src={t.img} alt={t.author} style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Second row — remaining testimonials */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", marginTop: "1rem" }}>
          {rest.slice(3).map((t, i) => (
            <div key={i} style={{ background: "#1A1A1A", borderRadius: 20, padding: "1.8rem 2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontFamily: DISPLAY, fontSize: "2rem", color: C.rose, lineHeight: 1, marginBottom: "0.5rem" }}>"</div>
                <p style={{ fontFamily: BODY, fontSize: "0.82rem", lineHeight: 1.7, color: "rgba(255,255,255,0.75)", fontWeight: 300 }}>{t.quote}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.2rem" }}>
                <div>
                  <div style={{ fontFamily: BODY, fontSize: "0.75rem", fontWeight: 600, color: C.roseLt }}>{t.author}</div>
                  <div style={{ fontFamily: BODY, fontSize: "0.62rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>{t.title}</div>
                </div>
                <img src={t.img} alt={t.author} style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA BANNER ────────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <img
        src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80"
        alt="Salon interior"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(62,29,74,0.9) 0%, rgba(192,84,114,0.7) 100%)` }} />
      <div style={{ position: "relative", zIndex: 1, padding: "8rem 2.5rem", textAlign: "center" }}>
        <Label text="Ready?" light />
        <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 300, color: "#fff", lineHeight: 1.1, marginBottom: "1.5rem" }}>
          Your perfect nails<br />are one click away.
        </h2>
        <p style={{ fontFamily: BODY, fontSize: "0.95rem", color: "rgba(255,255,255,0.75)", marginBottom: "2.5rem", fontWeight: 300, maxWidth: 400, margin: "0 auto 2.5rem" }}>
          Book your appointment online in seconds — no calls, no waiting.
        </p>
        <Link href={`${BASE}/book`} style={{
          fontFamily: BODY, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase",
          fontWeight: 600, color: C.plum, background: "#fff", padding: "1.1rem 2.8rem",
          display: "inline-block", transition: "background 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.background = C.blush)}
          onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
        >
          Book Now
        </Link>
      </div>
    </section>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function NailsHome() {
  return (
    <>
      <Hero />
      <ServicesTicker />
      <GalleryMosaic />
      <ImageMarquee />
      <Testimonials />
      <CTABanner />
    </>
  );
}
