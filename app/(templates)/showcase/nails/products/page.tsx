"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { C, DISPLAY, BODY, BASE, PRODUCTS, PRODUCT_CATS } from "../lib/data";
import { useCart } from "../lib/CartContext";

const EASE = [0.23,1,0.32,1] as const;

function Label({ text }: { text: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.2rem" }}>
      <span style={{ display: "block", width: 28, height: 1, background: C.rose }} />
      <span style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.rose, fontWeight: 600 }}>{text}</span>
    </div>
  );
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: EASE, delay }}>
      {children}
    </motion.div>
  );
}

function ProductCard({ p, delay }: { p: typeof PRODUCTS[0]; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    add(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <FadeUp delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ background: C.white, overflow: "hidden", position: "relative", cursor: "pointer" }}
      >
        {/* badge */}
        {p.badge && (
          <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2, background: C.rose, color: "#fff", fontFamily: BODY, fontSize: "0.58rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, padding: "0.25rem 0.65rem" }}>
            {p.badge}
          </div>
        )}

        {/* image */}
        <div style={{ overflow: "hidden", height: 240, position: "relative" }}>
          <motion.img
            src={p.img} alt={p.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.5, ease: EASE }}
          />
          {/* add to bag overlay */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2, ease: EASE }}
                style={{ position: "absolute", bottom: 12, left: 12, right: 12 }}
              >
                <button onClick={handleAdd} style={{
                  width: "100%", padding: "0.75rem", border: "none", cursor: "pointer",
                  background: added ? C.plum : C.rose, color: "#fff",
                  fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600,
                  transition: "background 0.2s ease",
                }}>
                  {added ? "Added ✓" : "Add to Bag"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ padding: "1.2rem" }}>
          <div style={{ fontFamily: BODY, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.textLt, marginBottom: "0.4rem" }}>
            {PRODUCT_CATS.find(c => c.id === p.cat)?.label}
          </div>
          <h3 style={{ fontFamily: BODY, fontSize: "0.9rem", fontWeight: 500, color: C.text, marginBottom: "0.3rem", lineHeight: 1.3 }}>{p.name}</h3>
          <p style={{ fontFamily: BODY, fontSize: "0.78rem", color: C.textMd, fontWeight: 300, lineHeight: 1.5, marginBottom: "0.8rem" }}>{p.desc}</p>
          <div style={{ fontFamily: DISPLAY, fontSize: "1.3rem", fontWeight: 400, color: C.rose }}>£{p.price.toFixed(2)}</div>
        </div>
      </div>
    </FadeUp>
  );
}

export default function ProductsPage() {
  const [activeCat, setActiveCat] = useState("all");

  const filtered = activeCat === "all" ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeCat);

  return (
    <>
      <style>{`
        .nails-cat-btn {
          font-family: ${BODY}; font-size: 0.62rem; letter-spacing: 0.18em; text-transform: uppercase;
          font-weight: 500; padding: 0.55rem 1.2rem; border: 1px solid ${C.border};
          background: transparent; color: ${C.textMd}; cursor: pointer;
          transition: all 0.2s ease;
        }
        .nails-cat-btn:hover { border-color: ${C.rose}; color: ${C.rose}; }
        .nails-cat-btn.active { background: ${C.rose}; border-color: ${C.rose}; color: #fff; }
        .nails-products-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1.2rem;
        }
      `}</style>

      {/* Hero */}
      <section style={{ background: C.plum, padding: "6rem 2.5rem 5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Label text="Shop" />
          <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(2.8rem, 7vw, 6rem)", fontWeight: 300, color: "#fff", lineHeight: 1.05 }}>
            <em style={{ fontStyle: "italic", color: C.roseLt }}>Curated</em> Products
          </h1>
          <p style={{ fontFamily: BODY, fontSize: "0.95rem", color: "rgba(255,255,255,0.6)", maxWidth: 440, lineHeight: 1.75, marginTop: "1.5rem", fontWeight: 300 }}>
            Professional-grade polishes, nail care treatments, wigs, and gift sets — all available to take home.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section style={{ padding: "4rem 2.5rem 6rem", maxWidth: 1280, margin: "0 auto" }}>
        {/* Filter bar */}
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "3rem" }}>
          {PRODUCT_CATS.map(cat => (
            <button key={cat.id} className={`nails-cat-btn${activeCat === cat.id ? " active" : ""}`}
              onClick={() => setActiveCat(cat.id)}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div style={{ fontFamily: BODY, fontSize: "0.75rem", color: C.textLt, marginBottom: "1.5rem" }}>
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        </div>

        <div className="nails-products-grid">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} p={p} delay={i * 0.04} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: C.surface, padding: "4rem 2.5rem", textAlign: "center", borderTop: `1px solid ${C.border}` }}>
        <Label text="Treat Yourself" />
        <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: C.plum, marginBottom: "1rem" }}>
          Not sure where to start?
        </h2>
        <p style={{ fontFamily: BODY, fontSize: "0.88rem", color: C.textMd, maxWidth: 380, margin: "0 auto 2rem", lineHeight: 1.7, fontWeight: 300 }}>
          Our gift cards make the perfect present — let them choose.
        </p>
        <Link href={`${BASE}/book`} style={{
          fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase",
          fontWeight: 600, color: C.white, background: C.rose, padding: "1rem 2.5rem", display: "inline-block",
        }}>
          Book an Appointment
        </Link>
      </section>
    </>
  );
}
