"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { C, DISPLAY, BODY, BASE, SERVICES } from "./lib/data";
import { CartProvider, useCart } from "./lib/CartContext";

const EASE = "cubic-bezier(0.23,1,0.32,1)";

// ── CART DRAWER ────────────────────────────────────────────────────────────────
function CartDrawer() {
  const { items, count, total, remove, setQty, open, setOpen, clear } = useCart();
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 200 }} />
          <motion.div key="drawer"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.38, ease: [0.23,1,0.32,1] }}
            style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(420px,100vw)", background: C.bg, zIndex: 201, display: "flex", flexDirection: "column" }}
          >
            {/* header */}
            <div style={{ padding: "1.5rem 1.8rem", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontFamily: DISPLAY, fontSize: "1.4rem", color: C.plum, fontWeight: 400 }}>Your Bag</span>
                {count > 0 && <span style={{ fontFamily: BODY, fontSize: "0.68rem", color: C.rose, marginLeft: "0.6rem" }}>{count} item{count !== 1 ? "s" : ""}</span>}
              </div>
              <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.3rem", color: C.textMd, padding: "0.25rem" }}>✕</button>
            </div>

            {/* items */}
            <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.8rem" }}>
              {items.length === 0 ? (
                <div style={{ textAlign: "center", padding: "4rem 0" }}>
                  <div style={{ fontFamily: DISPLAY, fontSize: "1.1rem", color: C.textLt, fontStyle: "italic" }}>Your bag is empty</div>
                  <Link href={`${BASE}/products`} onClick={() => setOpen(false)}
                    style={{ display: "inline-block", marginTop: "1.5rem", fontFamily: BODY, fontSize: "0.65rem", letterSpacing: "0.16em", textTransform: "uppercase", color: C.rose }}>
                    Browse Products →
                  </Link>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {items.map(({ product: p, qty }) => (
                    <div key={p.id} style={{ display: "flex", gap: "1rem", paddingBottom: "1rem", borderBottom: `1px solid ${C.border}` }}>
                      <img src={p.img} alt={p.name} style={{ width: 64, height: 64, objectFit: "cover", flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: BODY, fontSize: "0.82rem", fontWeight: 500, color: C.text, marginBottom: "0.2rem" }}>{p.name}</div>
                        <div style={{ fontFamily: DISPLAY, fontSize: "1rem", color: C.rose }}>£{(p.price * qty).toFixed(2)}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
                          <button onClick={() => setQty(p.id, qty - 1)} style={{ width: 24, height: 24, border: `1px solid ${C.border}`, background: "none", cursor: "pointer", fontFamily: BODY, fontSize: "0.9rem", color: C.plum }}>−</button>
                          <span style={{ fontFamily: BODY, fontSize: "0.8rem", width: 20, textAlign: "center" }}>{qty}</span>
                          <button onClick={() => setQty(p.id, qty + 1)} style={{ width: 24, height: 24, border: `1px solid ${C.border}`, background: "none", cursor: "pointer", fontFamily: BODY, fontSize: "0.9rem", color: C.plum }}>+</button>
                          <button onClick={() => remove(p.id)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", fontFamily: BODY, fontSize: "0.65rem", color: C.textLt, letterSpacing: "0.1em" }}>Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* footer */}
            {items.length > 0 && (
              <div style={{ padding: "1.5rem 1.8rem", borderTop: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.2rem" }}>
                  <span style={{ fontFamily: BODY, fontSize: "0.75rem", color: C.textMd, letterSpacing: "0.1em", textTransform: "uppercase" }}>Subtotal</span>
                  <span style={{ fontFamily: DISPLAY, fontSize: "1.4rem", color: C.plum }}>£{total.toFixed(2)}</span>
                </div>
                <Link href={`${BASE}/checkout`} onClick={() => setOpen(false)} style={{
                  display: "block", textAlign: "center",
                  fontFamily: BODY, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase",
                  fontWeight: 600, color: C.white, background: C.rose, padding: "1rem", marginBottom: "0.6rem",
                }}>
                  Checkout
                </Link>
                <button onClick={clear} style={{
                  display: "block", width: "100%", textAlign: "center",
                  fontFamily: BODY, fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase",
                  color: C.textLt, background: "none", border: "none", cursor: "pointer", padding: "0.5rem",
                }}>
                  Clear Bag
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── NAV INNER ─────────────────────────────────────────────────────────────────
function NavInner() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const svcRef = useRef<HTMLLIElement>(null);
  const { count, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    // Hero is 100svh tall — start gaining opacity only in the last ~15% of it
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.85);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); setSvcOpen(false); }, [pathname]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.bg}; color: ${C.text}; font-family: ${BODY}; }
        a { text-decoration: none; color: inherit; }
        img { display: block; max-width: 100%; }

        #nails-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          transition: background 0.4s ${EASE}, box-shadow 0.4s ${EASE};
        }
        #nails-nav.scrolled {
          background: rgba(253,250,248,0.94);
          backdrop-filter: blur(12px);
          box-shadow: 0 1px 0 ${C.border};
        }
        .nails-nav-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 2.5rem; height: 72px;
        }
        .nails-nav-logo {
          font-family: ${DISPLAY}; font-size: 1.5rem; font-weight: 400;
          letter-spacing: 0.12em; color: ${C.plum}; text-transform: uppercase;
        }
        .nails-nav-logo span { color: ${C.rose}; font-style: italic; }
        .nails-nav-links { display: flex; gap: 2.5rem; list-style: none; align-items: center; }
        .nails-nav-link {
          font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: ${C.textMd}; font-weight: 500;
          transition: color 0.2s ease;
          position: relative; padding-bottom: 3px; display: flex; align-items: center; gap: 0.3rem;
          cursor: pointer;
        }
        .nails-nav-link::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 100%;
          height: 1px; background: ${C.rose};
          transition: right 0.3s ${EASE};
        }
        .nails-nav-link:hover, .nails-nav-link.active { color: ${C.plum}; }
        .nails-nav-link:hover::after, .nails-nav-link.active::after { right: 0; }

        /* Services dropdown */
        .nails-svc-dropdown {
          position: absolute; top: calc(100% + 12px); left: -1.2rem;
          background: ${C.bg}; border: 1px solid ${C.border};
          box-shadow: 0 16px 48px rgba(62,29,74,0.12);
          min-width: 220px; padding: 0.5rem 0; z-index: 200;
        }
        .nails-svc-dropdown a {
          display: block; padding: 0.7rem 1.4rem;
          font-family: ${BODY}; font-size: 0.72rem; color: ${C.textMd};
          letter-spacing: 0.1em; transition: background 0.15s, color 0.15s;
        }
        .nails-svc-dropdown a:hover { background: ${C.surface}; color: ${C.plum}; }

        .nails-nav-cta {
          font-size: 0.65rem; letter-spacing: 0.16em; text-transform: uppercase;
          font-weight: 600; color: ${C.white}; background: ${C.rose};
          padding: 0.65rem 1.5rem; border: none; cursor: pointer;
          transition: background 0.2s ease, transform 0.15s ease;
        }
        .nails-nav-cta:hover { background: ${C.plum}; }
        .nails-nav-cta:active { transform: scale(0.97); }
        .nails-cart-btn {
          position: relative; background: none; border: 1px solid ${C.border}; cursor: pointer;
          width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;
          transition: border-color 0.2s, background 0.2s;
        }
        .nails-cart-btn:hover { border-color: ${C.rose}; background: ${C.surface}; }
        .nails-cart-badge {
          position: absolute; top: -6px; right: -6px;
          width: 18px; height: 18px; border-radius: 50%;
          background: ${C.rose}; color: #fff;
          font-family: ${BODY}; font-size: 0.6rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
        }
        .nails-burger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; background: none; border: none; }
        .nails-burger span { display: block; width: 22px; height: 1.5px; background: ${C.plum}; transition: all 0.3s ${EASE}; }
        .nails-nav-right { display: flex; align-items: center; gap: 1rem; }

        @media (max-width: 768px) {
          .nails-nav-links { display: none; }
          .nails-nav-cta.desktop { display: none; }
          .nails-burger { display: flex; }
          .nails-nav-inner { padding: 0 1.5rem; }
        }

        #nails-footer {
          background: ${C.plum}; color: rgba(255,255,255,0.7);
          padding: 4rem 2.5rem 2.5rem; font-family: ${BODY};
        }
        .nails-footer-inner {
          max-width: 1280px; margin: 0 auto;
          display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 3rem;
        }
        .nails-footer-brand p { font-size: 0.8rem; line-height: 1.7; margin-top: 1rem; max-width: 280px; }
        .nails-footer-col h4 { font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: ${C.roseLt}; margin-bottom: 1.2rem; }
        .nails-footer-col a { display: block; font-size: 0.82rem; margin-bottom: 0.6rem; transition: color 0.2s; }
        .nails-footer-col a:hover { color: #fff; }
        .nails-footer-bottom {
          max-width: 1280px; margin: 3rem auto 0;
          border-top: 1px solid rgba(255,255,255,0.12); padding-top: 1.5rem;
          display: flex; justify-content: space-between; align-items: center;
          font-size: 0.72rem;
        }
        @media (max-width: 900px) {
          .nails-footer-inner { grid-template-columns: 1fr 1fr; gap: 2rem; }
        }
        @media (max-width: 560px) {
          .nails-footer-inner { grid-template-columns: 1fr; }
          .nails-footer-bottom { flex-direction: column; gap: 0.5rem; text-align: center; }
        }
      `}</style>

      <nav id="nails-nav" className={scrolled ? "scrolled" : ""}>
        <div className="nails-nav-inner">
          <Link href={BASE} className="nails-nav-logo">
            Vel<span>our</span>
          </Link>
          <ul className="nails-nav-links">
            {/* Services with dropdown */}
            <li ref={svcRef} style={{ position: "relative" }}
              onMouseEnter={() => setSvcOpen(true)}
              onMouseLeave={() => setSvcOpen(false)}
            >
              <Link href={`${BASE}/services`} className={`nails-nav-link${pathname.startsWith(`${BASE}/services`) ? " active" : ""}`}>
                Services <span style={{ fontSize: "0.55rem", opacity: 0.7 }}>▾</span>
              </Link>
              <AnimatePresence>
                {svcOpen && (
                  <motion.div className="nails-svc-dropdown"
                    initial={{ opacity: 0, y: -6, scaleY: 0.96 }}
                    animate={{ opacity: 1, y: 0, scaleY: 1 }}
                    exit={{ opacity: 0, y: -6, scaleY: 0.96 }}
                    transition={{ duration: 0.18, ease: [0.23,1,0.32,1] }}
                    style={{ transformOrigin: "top" }}
                  >
                    <Link href={`${BASE}/services`} style={{ borderBottom: `1px solid ${C.border}`, marginBottom: "0.25rem", color: C.rose, fontWeight: 600 }}>
                      All Services
                    </Link>
                    {SERVICES.map(s => (
                      <Link key={s.slug} href={`${BASE}/services/${s.slug}`}>{s.name}</Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            <li><Link href={`${BASE}/products`} className={`nails-nav-link${pathname.startsWith(`${BASE}/products`) ? " active" : ""}`}>Products</Link></li>
            <li><Link href={`${BASE}/about`}    className={`nails-nav-link${pathname.startsWith(`${BASE}/about`)    ? " active" : ""}`}>About</Link></li>
            <li><Link href={`${BASE}/book`}     className={`nails-nav-link${pathname.startsWith(`${BASE}/book`)     ? " active" : ""}`}>Book</Link></li>
          </ul>
          <div className="nails-nav-right">
            {/* Cart button */}
            <button className="nails-cart-btn" onClick={() => setCartOpen(true)} aria-label="Open bag">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.plum} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {count > 0 && <span className="nails-cart-badge">{count}</span>}
            </button>
            <Link href={`${BASE}/book`} className="nails-nav-cta desktop">Book Now</Link>
            <button className="nails-burger" onClick={() => setOpen(v => !v)} aria-label="Menu">
              <span style={open ? { transform: "rotate(45deg) translate(4.5px,4.5px)" } : {}} />
              <span style={open ? { opacity: 0 } : {}} />
              <span style={open ? { transform: "rotate(-45deg) translate(4.5px,-4.5px)" } : {}} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div key="mobile-menu"
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.23,1,0.32,1] }}
            style={{ position: "fixed", inset: 0, zIndex: 99, background: C.bg, paddingTop: 90, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}
          >
            {[{ label: "Services", href: `${BASE}/services` }, { label: "Products", href: `${BASE}/products` }, { label: "About", href: `${BASE}/about` }, { label: "Book", href: `${BASE}/book` }].map(n => (
              <Link key={n.href} href={n.href}
                style={{ fontFamily: DISPLAY, fontSize: "2.2rem", fontWeight: 300, color: C.plum, letterSpacing: "0.05em", padding: "0.6rem 2rem" }}
              >
                {n.label}
              </Link>
            ))}
            <Link href={`${BASE}/book`}
              style={{ marginTop: "1.5rem", background: C.rose, color: "#fff", fontFamily: BODY, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, padding: "0.9rem 2.5rem" }}
            >
              Book Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── ROOT LAYOUT ───────────────────────────────────────────────────────────────
export default function NailsLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <NavInner />
      <CartDrawer />
      <main style={{ paddingTop: 72 }}>
        {children}
      </main>
      <footer id="nails-footer">
        <div className="nails-footer-inner">
          <div className="nails-footer-brand">
            <div style={{ fontFamily: DISPLAY, fontSize: "1.6rem", fontWeight: 400, color: "#fff", letterSpacing: "0.1em" }}>
              Vel<span style={{ fontStyle: "italic", color: C.roseLt }}>our</span>
            </div>
            <p>A nail studio defined by precision, care, and the belief that every detail matters. Located in the heart of London.</p>
          </div>
          <div className="nails-footer-col">
            <h4>Services</h4>
            {["Nail Paint","Gel Nails","Nail Art","Manicure","Pedicure","Treatments"].map(s => (
              <Link key={s} href={`${BASE}/services`}>{s}</Link>
            ))}
          </div>
          <div className="nails-footer-col">
            <h4>Studio</h4>
            <Link href={`${BASE}/about`}>About Us</Link>
            <Link href={`${BASE}/products`}>Shop</Link>
            <Link href={`${BASE}/book`}>Book Appointment</Link>
            <a href="#">Gift Cards</a>
          </div>
          <div className="nails-footer-col">
            <h4>Visit</h4>
            <a href="#">24 Marylebone Lane<br />London W1U 2PT</a>
            <a href="#">Mon–Sat: 9am – 7pm</a>
            <a href="#">Sunday: 10am – 5pm</a>
            <a href="#" style={{ marginTop: "0.5rem" }}>hello@velourbynails.com</a>
          </div>
        </div>
        <div className="nails-footer-bottom">
          <span>© 2026 Velour Nails Studio. All rights reserved.</span>
          <span>Made with care in London</span>
        </div>
      </footer>
    </CartProvider>
  );
}
