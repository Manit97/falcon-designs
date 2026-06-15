"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { T, SERIF, SANS, EASE, BASE, GALLERY } from "../lib/data";
import Link from "next/link";

const FILTERS = ["All", "Colour", "Cut", "Colour & Cut"] as const;
type Filter = typeof FILTERS[number];

export default function GalleryPage() {
  const [active, setActive] = useState<Filter>("All");
  const [lightbox, setLightbox] = useState<typeof GALLERY[0] | null>(null);

  const filtered = active === "All" ? GALLERY : GALLERY.filter(g => g.tag === active);

  return (
    <main style={{ paddingTop: 68 }}>

      {/* ── HEADER ── */}
      <section style={{ padding: "6rem 2.5rem 4rem", background: T.bgPanel, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
              <div style={{ width: 18, height: 1, background: T.amber }} />
              <span style={{ fontFamily: SANS, fontSize: "0.56rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: T.amber }}>Portfolio</span>
            </div>
            <h1 style={{ fontFamily: SERIF, fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 500, fontStyle: "italic", color: T.cream, lineHeight: 1.0, maxWidth: 600 }}>
              Work we're<br />proud of.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── FILTERS ── */}
      <div style={{ padding: "2rem 2.5rem", background: T.bg, borderBottom: `1px solid ${T.borderLt}`, position: "sticky", top: 68, zIndex: 100 }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              style={{
                fontFamily: SANS, fontSize: "0.62rem", fontWeight: 500,
                letterSpacing: "0.18em", textTransform: "uppercase",
                padding: "0.5rem 1.2rem",
                background: active === f ? T.amber : "transparent",
                color: active === f ? T.bg : T.cream,
                border: `1px solid ${active === f ? T.amber : T.borderLt}`,
                cursor: "pointer",
                transition: `all 250ms ${EASE}`,
              }}
            >{f}</button>
          ))}
          <span style={{ fontFamily: SANS, fontSize: "0.6rem", color: T.textMd, marginLeft: "auto", display: "flex", alignItems: "center" }}>
            {filtered.length} {filtered.length === 1 ? "image" : "images"}
          </span>
        </div>
      </div>

      {/* ── GRID ── */}
      <section style={{ padding: "3rem 2.5rem 7rem" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div className="mn-gallery-grid" style={{ gap: "0.75rem" }}>
            <AnimatePresence>
              {filtered.map((g, i) => (
                <motion.div
                  key={g.img}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  style={{ overflow: "hidden", position: "relative", cursor: "pointer", aspectRatio: "3/4" }}
                  onClick={() => setLightbox(g)}
                >
                  <img
                    src={g.img}
                    alt={g.label}
                    loading="lazy"
                    style={{
                      width: "100%", height: "100%", objectFit: "cover",
                      transition: `transform 600ms ${EASE}`,
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"}
                    onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"}
                  />
                  {/* Overlay */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(180deg, transparent 55%, rgba(11,21,18,0.85) 100%)",
                    display: "flex", flexDirection: "column", justifyContent: "flex-end",
                    padding: "1.25rem", opacity: 0, transition: `opacity 300ms`,
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "0"}
                  >
                    <span style={{ fontFamily: SANS, fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.amber, marginBottom: "0.25rem" }}>{g.tag}</span>
                    <span style={{ fontFamily: SERIF, fontSize: "0.9rem", fontStyle: "italic", color: T.cream }}>{g.label}</span>
                  </div>
                  {/* Always-visible label at bottom */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0.75rem 1rem", background: "linear-gradient(transparent, rgba(11,21,18,0.6))" }}>
                    <span style={{ fontFamily: SERIF, fontSize: "0.8rem", fontStyle: "italic", color: T.cream, opacity: 0.85 }}>{g.label}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "5rem 0", color: T.textMd, fontFamily: SANS }}>
              No images found for this filter.
            </div>
          )}
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed", inset: 0, zIndex: 1000,
              background: "rgba(8,14,12,0.95)", backdropFilter: "blur(12px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "2rem",
            }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              style={{ position: "relative", maxWidth: 640, width: "100%", maxHeight: "85vh" }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={lightbox.img}
                alt={lightbox.label}
                style={{ width: "100%", maxHeight: "75vh", objectFit: "contain", display: "block" }}
              />
              <div style={{ padding: "1.25rem 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontFamily: SANS, fontSize: "0.56rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.amber }}>{lightbox.tag}</div>
                  <div style={{ fontFamily: SERIF, fontSize: "1rem", fontStyle: "italic", color: T.cream, marginTop: "0.2rem" }}>{lightbox.label}</div>
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  aria-label="Close"
                  style={{ color: T.cream, opacity: 0.5, transition: "opacity 200ms", cursor: "pointer", background: "none", border: "none" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "0.5"}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CTA ── */}
      <section style={{ padding: "6rem 2.5rem", textAlign: "center", background: T.bgPanel }}>
        <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.75rem, 3.5vw, 2.8rem)", fontStyle: "italic", fontWeight: 500, color: T.cream, marginBottom: "2rem" }}>
          Want results like these?
        </h2>
        <Link href={`${BASE}/book`} style={{
          fontFamily: SANS, fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase",
          padding: "0.9rem 2.25rem", background: T.amber, color: T.bg, display: "inline-block",
          transition: `background 250ms ${EASE}`,
        }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.amberLt}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.amber}
        >Book Your Appointment</Link>
      </section>
    </main>
  );
}
