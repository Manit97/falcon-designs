"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { C, DISPLAY, BODY, BASE } from "../lib/data";
import { useCart } from "../lib/CartContext";

const EASE = [0.23,1,0.32,1] as const;

type Step = "bag" | "details" | "payment" | "done";

export default function CheckoutPage() {
  const { items, total, count, remove, setQty, clear } = useCart();
  const [step, setStep] = useState<Step>("bag");

  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    address: "", city: "", postcode: "",
    card: "", expiry: "", cvv: "", cardName: "",
  });

  function setF(k: keyof typeof form, v: string) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  const delivery = total >= 50 ? 0 : 4.99;
  const orderTotal = total + delivery;

  if (step === "done") {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 2.5rem" }}>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, ease: EASE }}
          style={{ textAlign: "center", maxWidth: 500 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: C.rose, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem", fontSize: "1.8rem" }}>✓</div>
          <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: C.plum, marginBottom: "1rem" }}>Order placed.</h1>
          <p style={{ fontFamily: BODY, fontSize: "0.9rem", color: C.textMd, lineHeight: 1.75, fontWeight: 300, marginBottom: "2.5rem" }}>
            Thank you, <strong>{form.name || "there"}</strong>. Your order has been confirmed and will arrive in 3–5 working days. A receipt has been sent to <strong>{form.email}</strong>.
          </p>
          <Link href={`${BASE}/products`} style={{ fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: C.white, background: C.rose, padding: "1rem 2.5rem", display: "inline-block" }}>
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  const STEPS: Step[] = ["bag", "details", "payment"];
  const STEP_LABELS = ["Bag", "Details", "Payment"];

  return (
    <>
      <style>{`
        .nails-co-input {
          width: 100%; padding: 0.85rem 1rem; border: 1px solid ${C.border}; background: ${C.white};
          font-family: ${BODY}; font-size: 0.88rem; color: ${C.text}; outline: none;
          transition: border-color 0.2s;
        }
        .nails-co-input:focus { border-color: ${C.rose}; }
        .nails-co-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .nails-co-3col { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 1rem; }
        @media (max-width: 540px) {
          .nails-co-2col { grid-template-columns: 1fr; }
          .nails-co-3col { grid-template-columns: 1fr; }
        }
        .nails-co-grid { display: grid; grid-template-columns: 1fr 360px; gap: 4rem; align-items: start; }
        @media (max-width: 900px) { .nails-co-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* Header */}
      <section style={{ background: C.plum, padding: "5rem 2.5rem 4rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.roseLt, marginBottom: "0.8rem" }}>Shop</div>
          <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 300, color: "#fff", lineHeight: 1.05 }}>
            <em style={{ fontStyle: "italic", color: C.roseLt }}>Checkout</em>
          </h1>
        </div>
      </section>

      {/* Step tabs */}
      <div style={{ borderBottom: `1px solid ${C.border}`, background: C.white }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2.5rem", display: "flex", gap: "0" }}>
          {STEPS.map((s, i) => (
            <button key={s} onClick={() => { if (STEPS.indexOf(step) > i) setStep(s); }}
              style={{
                fontFamily: BODY, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase",
                fontWeight: step === s ? 600 : 400, padding: "1.2rem 2rem",
                color: step === s ? C.rose : C.textLt, background: "none", border: "none",
                borderBottom: step === s ? `2px solid ${C.rose}` : "2px solid transparent",
                cursor: STEPS.indexOf(step) > i ? "pointer" : "default",
                transition: "color 0.2s, border-color 0.2s",
              }}>
              {i + 1}. {STEP_LABELS[i]}
            </button>
          ))}
        </div>
      </div>

      <section style={{ padding: "3rem 2.5rem 6rem", background: C.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="nails-co-grid">

            {/* Left — main content */}
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.28, ease: EASE }}>

                {/* BAG */}
                {step === "bag" && (
                  <div>
                    <h2 style={{ fontFamily: DISPLAY, fontSize: "1.6rem", fontWeight: 400, color: C.plum, marginBottom: "1.5rem" }}>Your Bag ({count})</h2>
                    {items.length === 0 ? (
                      <div style={{ textAlign: "center", padding: "4rem 0" }}>
                        <div style={{ fontFamily: DISPLAY, fontSize: "1.2rem", color: C.textLt, fontStyle: "italic", marginBottom: "1.5rem" }}>Your bag is empty</div>
                        <Link href={`${BASE}/products`} style={{ fontFamily: BODY, fontSize: "0.65rem", letterSpacing: "0.16em", textTransform: "uppercase", color: C.white, background: C.rose, padding: "0.85rem 2rem", display: "inline-block" }}>
                          Browse Products
                        </Link>
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {items.map(({ product: p, qty }) => (
                          <div key={p.id} style={{ display: "flex", gap: "1.2rem", padding: "1.5rem 0", borderBottom: `1px solid ${C.border}` }}>
                            <img src={p.img} alt={p.name} style={{ width: 80, height: 80, objectFit: "cover", flexShrink: 0 }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginBottom: "0.3rem" }}>
                                <span style={{ fontFamily: BODY, fontSize: "0.9rem", fontWeight: 500, color: C.text }}>{p.name}</span>
                                <span style={{ fontFamily: DISPLAY, fontSize: "1.1rem", color: C.rose, flexShrink: 0 }}>£{(p.price * qty).toFixed(2)}</span>
                              </div>
                              <div style={{ fontFamily: BODY, fontSize: "0.75rem", color: C.textMd, marginBottom: "0.8rem" }}>£{p.price.toFixed(2)} each</div>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <button onClick={() => setQty(p.id, qty - 1)} style={{ width: 28, height: 28, border: `1px solid ${C.border}`, background: "none", cursor: "pointer", fontFamily: BODY, color: C.plum }}>−</button>
                                <span style={{ fontFamily: BODY, fontSize: "0.85rem", width: 24, textAlign: "center" }}>{qty}</span>
                                <button onClick={() => setQty(p.id, qty + 1)} style={{ width: 28, height: 28, border: `1px solid ${C.border}`, background: "none", cursor: "pointer", fontFamily: BODY, color: C.plum }}>+</button>
                                <button onClick={() => remove(p.id)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", fontFamily: BODY, fontSize: "0.65rem", color: C.textLt }}>Remove</button>
                              </div>
                            </div>
                          </div>
                        ))}
                        <button onClick={() => setStep("details")} disabled={items.length === 0}
                          style={{ marginTop: "2rem", fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: C.white, background: C.rose, border: "none", padding: "1rem", cursor: "pointer" }}>
                          Continue to Details →
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* DETAILS */}
                {step === "details" && (
                  <div>
                    <h2 style={{ fontFamily: DISPLAY, fontSize: "1.6rem", fontWeight: 400, color: C.plum, marginBottom: "1.5rem" }}>Delivery Details</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <div className="nails-co-2col">
                        <div>
                          <label style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.textLt, display: "block", marginBottom: "0.4rem" }}>Full Name *</label>
                          <input className="nails-co-input" value={form.name} onChange={e => setF("name", e.target.value)} placeholder="Jane Smith" />
                        </div>
                        <div>
                          <label style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.textLt, display: "block", marginBottom: "0.4rem" }}>Phone</label>
                          <input className="nails-co-input" value={form.phone} onChange={e => setF("phone", e.target.value)} placeholder="+44 7700 900000" />
                        </div>
                      </div>
                      <div>
                        <label style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.textLt, display: "block", marginBottom: "0.4rem" }}>Email *</label>
                        <input className="nails-co-input" type="email" value={form.email} onChange={e => setF("email", e.target.value)} placeholder="you@example.com" />
                      </div>
                      <div>
                        <label style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.textLt, display: "block", marginBottom: "0.4rem" }}>Address *</label>
                        <input className="nails-co-input" value={form.address} onChange={e => setF("address", e.target.value)} placeholder="24 Marylebone Lane" />
                      </div>
                      <div className="nails-co-2col">
                        <div>
                          <label style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.textLt, display: "block", marginBottom: "0.4rem" }}>City *</label>
                          <input className="nails-co-input" value={form.city} onChange={e => setF("city", e.target.value)} placeholder="London" />
                        </div>
                        <div>
                          <label style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.textLt, display: "block", marginBottom: "0.4rem" }}>Postcode *</label>
                          <input className="nails-co-input" value={form.postcode} onChange={e => setF("postcode", e.target.value)} placeholder="W1U 2PT" />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setStep("payment")}
                      disabled={!form.name || !form.email || !form.address || !form.city || !form.postcode}
                      style={{ marginTop: "2rem", fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: C.white, background: C.rose, border: "none", padding: "1rem 2.5rem", cursor: "pointer" }}>
                      Continue to Payment →
                    </button>
                  </div>
                )}

                {/* PAYMENT */}
                {step === "payment" && (
                  <div>
                    <h2 style={{ fontFamily: DISPLAY, fontSize: "1.6rem", fontWeight: 400, color: C.plum, marginBottom: "0.5rem" }}>Payment</h2>
                    <p style={{ fontFamily: BODY, fontSize: "0.8rem", color: C.textMd, marginBottom: "1.5rem", fontWeight: 300 }}>This is a demo — no real payment will be processed.</p>
                    <div style={{ background: C.surface, padding: "1.2rem", marginBottom: "1.5rem", borderLeft: `3px solid ${C.rose}`, fontFamily: BODY, fontSize: "0.78rem", color: C.textMd }}>
                      🔒 Secure checkout — your card details are never stored.
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <div>
                        <label style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.textLt, display: "block", marginBottom: "0.4rem" }}>Card Number</label>
                        <input className="nails-co-input" value={form.card} onChange={e => setF("card", e.target.value)} placeholder="1234 5678 9012 3456" maxLength={19} />
                      </div>
                      <div>
                        <label style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.textLt, display: "block", marginBottom: "0.4rem" }}>Name on Card</label>
                        <input className="nails-co-input" value={form.cardName} onChange={e => setF("cardName", e.target.value)} placeholder="Jane Smith" />
                      </div>
                      <div className="nails-co-2col">
                        <div>
                          <label style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.textLt, display: "block", marginBottom: "0.4rem" }}>Expiry</label>
                          <input className="nails-co-input" value={form.expiry} onChange={e => setF("expiry", e.target.value)} placeholder="MM / YY" maxLength={7} />
                        </div>
                        <div>
                          <label style={{ fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.textLt, display: "block", marginBottom: "0.4rem" }}>CVV</label>
                          <input className="nails-co-input" value={form.cvv} onChange={e => setF("cvv", e.target.value)} placeholder="123" maxLength={4} />
                        </div>
                      </div>
                    </div>
                    <button onClick={() => { clear(); setStep("done"); }}
                      style={{ marginTop: "2rem", width: "100%", fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: C.white, background: C.rose, border: "none", padding: "1.1rem", cursor: "pointer" }}>
                      Place Order — £{orderTotal.toFixed(2)}
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Right — order summary */}
            <div style={{ position: "sticky", top: 100 }}>
              <div style={{ background: C.white, padding: "1.8rem", border: `1px solid ${C.border}` }}>
                <h3 style={{ fontFamily: DISPLAY, fontSize: "1.3rem", fontWeight: 400, color: C.plum, marginBottom: "1.2rem" }}>Order Summary</h3>
                {items.map(({ product: p, qty }) => (
                  <div key={p.id} style={{ display: "flex", justifyContent: "space-between", gap: "0.8rem", marginBottom: "0.7rem" }}>
                    <span style={{ fontFamily: BODY, fontSize: "0.78rem", color: C.textMd }}>{p.name} × {qty}</span>
                    <span style={{ fontFamily: BODY, fontSize: "0.78rem", color: C.text, flexShrink: 0 }}>£{(p.price * qty).toFixed(2)}</span>
                  </div>
                ))}
                <div style={{ borderTop: `1px solid ${C.border}`, marginTop: "1rem", paddingTop: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ fontFamily: BODY, fontSize: "0.75rem", color: C.textMd }}>Subtotal</span>
                    <span style={{ fontFamily: BODY, fontSize: "0.75rem", color: C.text }}>£{total.toFixed(2)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.8rem" }}>
                    <span style={{ fontFamily: BODY, fontSize: "0.75rem", color: C.textMd }}>Delivery</span>
                    <span style={{ fontFamily: BODY, fontSize: "0.75rem", color: delivery === 0 ? C.rose : C.text }}>{delivery === 0 ? "Free" : `£${delivery.toFixed(2)}`}</span>
                  </div>
                  {delivery === 0 && (
                    <div style={{ fontFamily: BODY, fontSize: "0.62rem", color: C.rose, marginBottom: "0.8rem", letterSpacing: "0.1em" }}>✓ Free delivery on orders over £50</div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${C.border}`, paddingTop: "0.8rem" }}>
                    <span style={{ fontFamily: BODY, fontSize: "0.82rem", fontWeight: 600, color: C.plum }}>Total</span>
                    <span style={{ fontFamily: DISPLAY, fontSize: "1.4rem", color: C.rose }}>£{orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
