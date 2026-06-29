'use client';
import { useState, useRef } from "react";

const TERM = {
  bg: "#000d00",
  card: "rgba(0,18,0,0.92)",
  border: "rgba(0,255,65,0.18)",
  borderHi: "rgba(0,255,65,0.55)",
  green: "#00ff41",
  greenDim: "rgba(0,255,65,0.55)",
  greenMuted: "rgba(0,255,65,0.28)",
  innerBg: "rgba(0,255,65,0.04)",
  innerBg2: "rgba(0,255,65,0.08)",
  font: "'VT323', monospace",
};

/* ── helpers ── */
function fmtNumber(v: string) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})/g, "$1 ").trim();
}
function fmtExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d;
}

/* ── Low-poly geometric background ── */
function GeomBg() {
  const GREENS = [
    "#14532d","#155d30","#166534","#0f6b30","#15803d",
    "#1a8a42","#16a34a","#0d9040","#22c55e","#1db954",
    "#2ecc71","#4ade80","#0c7a36",
  ];
  const cols = 8, rows = 6, W = 420, H = 220;
  const cw = W / cols, ch = H / rows;
  const tris: { pts: string; fill: string }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x1 = c * cw, y1 = r * ch, x2 = x1 + cw, y2 = y1 + ch;
      const xm = x1 + cw / 2, ym = y1 + ch / 2;
      [
        `${x1},${y1} ${x2},${y1} ${xm},${ym}`,
        `${x2},${y1} ${x2},${y2} ${xm},${ym}`,
        `${x2},${y2} ${x1},${y2} ${xm},${ym}`,
        `${x1},${y2} ${x1},${y1} ${xm},${ym}`,
      ].forEach((pts, t) => {
        tris.push({ pts, fill: GREENS[((r * 13 + c * 7 + t * 5) % GREENS.length + GREENS.length) % GREENS.length] });
      });
    }
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      {tris.map((t, i) => <polygon key={i} points={t.pts} fill={t.fill} />)}
    </svg>
  );
}

/* ── Holographic strip ── */
function HoloStrip() {
  return (
    <div style={{
      width: 50, height: 36, borderRadius: 4, overflow: "hidden", position: "relative",
      background: "linear-gradient(135deg, #d0d0d0 0%, #f0f0f0 25%, #b8b8b8 50%, #e8e8e8 75%, #c0c0c0 100%)",
      boxShadow: "inset 0 0 8px rgba(255,255,255,0.6), 0 1px 3px rgba(0,0,0,0.3)",
    }}>
      <svg viewBox="0 0 50 36" width="50" height="36" style={{ opacity: 0.45 }}>
        <ellipse cx="25" cy="18" rx="18" ry="12" fill="none" stroke="#666" strokeWidth="0.6"/>
        <ellipse cx="25" cy="18" rx="9" ry="12" fill="none" stroke="#666" strokeWidth="0.6"/>
        <ellipse cx="25" cy="18" rx="3" ry="12" fill="none" stroke="#666" strokeWidth="0.6"/>
        <line x1="7" y1="18" x2="43" y2="18" stroke="#666" strokeWidth="0.6"/>
        <line x1="25" y1="6" x2="25" y2="30" stroke="#666" strokeWidth="0.6"/>
        <line x1="7" y1="11" x2="43" y2="11" stroke="#666" strokeWidth="0.4"/>
        <line x1="7" y1="25" x2="43" y2="25" stroke="#666" strokeWidth="0.4"/>
      </svg>
    </div>
  );
}

/* ── Chip SVG ── */
function Chip() {
  return (
    <svg width="44" height="34" viewBox="0 0 44 34" fill="none">
      <rect x="0.5" y="0.5" width="43" height="33" rx="5.5" fill="#c9a84c" stroke="#b8943f" />
      <rect x="14" y="0.5" width="16" height="33" rx="0" fill="#b8943f" fillOpacity=".5" />
      <rect x="0.5" y="10" width="43" height="14" fill="#b8943f" fillOpacity=".5" />
      <rect x="14" y="10" width="16" height="14" fill="#c9a84c" fillOpacity=".8" />
    </svg>
  );
}

/* ── Wifi / NFC icon ── */
function NFC() {
  return (
    <svg width="26" height="22" viewBox="0 0 26 22" fill="none" style={{ opacity: 0.7 }}>
      <path d="M13 11 Q16 8 19 11 Q22 8 25 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M13 11 Q10 8 7 11 Q4 8 1 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* ── corner bracket helper (reused from HwCard pattern) ── */
function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const br = pos === "tl" ? "0 0 10px 0" : pos === "tr" ? "0 0 0 10px" : pos === "bl" ? "0 10px 0 0" : "10px 0 0 0";
  const t = pos.startsWith("t") ? -1 : undefined;
  const b = pos.startsWith("b") ? -1 : undefined;
  const l = pos.endsWith("l") ? -1 : undefined;
  const r = pos.endsWith("r") ? -1 : undefined;
  return (
    <div aria-hidden="true" style={{
      position: "absolute", top: t, bottom: b, left: l, right: r,
      width: 14, height: 14,
      borderTop: pos.startsWith("t") ? `1.5px solid ${TERM.green}` : undefined,
      borderBottom: pos.startsWith("b") ? `1.5px solid ${TERM.green}` : undefined,
      borderLeft: pos.endsWith("l") ? `1.5px solid ${TERM.green}` : undefined,
      borderRight: pos.endsWith("r") ? `1.5px solid ${TERM.green}` : undefined,
      borderRadius: br,
    }} />
  );
}

export function CreditCardForm() {
  const [cardNum, setCardNum] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [flipped, setFlipped] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  /* Build display: # for empty slots, digits for g1/g4, * for each typed digit in middle groups */
  const raw = cardNum.replace(/\D/g, "");
  const g1 = (raw.slice(0, 4) + "####").slice(0, 4);
  const g2 = ("*".repeat(Math.min(raw.slice(4, 8).length, 4)) + "####").slice(0, 4);
  const g3 = ("*".repeat(Math.min(raw.slice(8, 12).length, 4)) + "####").slice(0, 4);
  const g4 = (raw.slice(12, 16) + "####").slice(0, 4);
  const displayNum = `${g1} ${g2} ${g3} ${g4}`;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2800);
  }

  return (
    <>
      <style>{`
        .ccf-input::placeholder { color: rgba(0,255,65,0.22); }
        .ccf-input:focus { outline: none; border-color: rgba(0,255,65,0.55) !important; background: rgba(0,255,65,0.08) !important; box-shadow: 0 0 0 2px rgba(0,255,65,0.12); }
        .ccf-select option { background: #000d00; color: #00ff41; }
        .ccf-submit:hover { background: #00cc33 !important; }
        .ccf-submit:active { transform: scale(0.98); }
        @keyframes ccf-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .ccf-blink { animation: ccf-blink 1s step-end infinite; }
        @keyframes ccf-pulse-ok { 0%{opacity:0;transform:scale(0.9)} 20%{opacity:1;transform:scale(1.05)} 80%{opacity:1} 100%{opacity:0} }
        .ccf-ok { animation: ccf-pulse-ok 2.8s ease forwards; }
        .ccf-card-wrapper { perspective: 900px; width: 100%; }
        .ccf-card-inner { position: relative; transition: transform 0.6s cubic-bezier(.4,0,.2,1); transform-style: preserve-3d; }
        .ccf-card-inner.flipped { transform: rotateY(180deg); }
        .ccf-card-face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .ccf-card-back { transform: rotateY(180deg); }
      `}</style>

      {/* ── Heading ── */}
      <h3 style={{
        fontFamily: TERM.font,
        fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
        color: TERM.green,
        textShadow: `0 0 18px ${TERM.green}99, 0 0 40px ${TERM.green}44`,
        letterSpacing: "0.1em",
        textAlign: "center",
        margin: "0 0 1.8rem",
        lineHeight: 1.1,
      }}>
        Try Me — If You Dare...
      </h3>

      {/* ── Outer HwCard-style wrapper ── */}
      <div style={{
        position: "relative",
        background: TERM.card,
        border: `1px solid ${TERM.border}`,
        borderRadius: 12,
        padding: "1.6rem 1.4rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
        width: "100%",
        maxWidth: 420,
        boxShadow: "0 0 40px rgba(0,255,65,0.06), 0 0 80px rgba(0,255,65,0.03)",
      }}>
        <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />

        {/* ── Title bar ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", borderBottom: `1px solid ${TERM.border}`, paddingBottom: "0.7rem" }}>
          <span style={{ fontFamily: TERM.font, fontSize: "0.78rem", color: TERM.greenDim, letterSpacing: "0.22em" }}>
            &gt; PAYMENT_FORM.exe
          </span>
          <span className="ccf-blink" style={{ fontFamily: TERM.font, fontSize: "0.78rem", color: TERM.green, marginLeft: "auto" }}>█</span>
        </div>

        {/* ── Credit card visual ── */}
        <div className="ccf-card-wrapper">
          <div className={`ccf-card-inner${flipped ? " flipped" : ""}`} style={{ height: 196, borderRadius: 14 }}>

            {/* FRONT */}
            <div className="ccf-card-face" style={{
              position: "absolute", inset: 0, borderRadius: 14, overflow: "hidden",
              boxShadow: "0 0 0 1px rgba(0,255,65,0.25), 0 8px 40px rgba(0,0,0,0.7)",
              padding: "1rem 1.3rem",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
            }}>
              {/* Geometric low-poly background */}
              <GeomBg />
              {/* Subtle dark overlay for text readability */}
              <div aria-hidden="true" style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.28) 100%)",
              }} />

              {/* Row 1: bank name right */}
              <div style={{ display: "flex", justifyContent: "flex-end", position: "relative", zIndex: 1 }}>
                <div style={{ textAlign: "right", lineHeight: 1.1 }}>
                  <span style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1rem", fontWeight: 900, color: "#FFD700", letterSpacing: "0.08em", textShadow: "0 1px 8px rgba(0,0,0,0.6), 0 0 16px rgba(255,215,0,0.3)" }}>FALCON </span>
                  <span style={{ fontFamily: "'Arial', sans-serif", fontSize: "1rem", fontWeight: 400, color: "#FFD700", letterSpacing: "0.08em", textShadow: "0 1px 8px rgba(0,0,0,0.6), 0 0 16px rgba(255,215,0,0.3)" }}>BANK</span>
                </div>
              </div>

              {/* Row 2: chip left, holo strip right */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1 }}>
                <Chip />
                <HoloStrip />
              </div>

              {/* Row 3: card number */}
              <div style={{
                fontFamily: "'Arial Black', 'Arial', sans-serif", fontSize: "1rem", fontWeight: 900, letterSpacing: "0.18em",
                color: "white", position: "relative", zIndex: 1,
                textShadow: "0 1px 6px rgba(0,0,0,0.6)",
              }}>
                {displayNum}
              </div>

              {/* Row 4: name left, expiry right */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", position: "relative", zIndex: 1 }}>
                <div>
                  <div style={{ fontFamily: "'Arial', sans-serif", fontSize: "0.48rem", color: "rgba(255,255,255,0.6)", letterSpacing: "0.16em", marginBottom: 2, textTransform: "uppercase" }}>Cardholder Name</div>
                  <div style={{ fontFamily: "'Arial', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "white", letterSpacing: "0.06em", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
                    {name.toUpperCase() || "YOUR NAME"}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'Arial', sans-serif", fontSize: "0.48rem", color: "rgba(255,255,255,0.6)", letterSpacing: "0.16em", marginBottom: 2, textTransform: "uppercase" }}>Expires</div>
                  <div style={{ fontFamily: "'Arial', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "white", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
                    {expiry || "MM/YY"}
                  </div>
                </div>
              </div>
            </div>

            {/* BACK */}
            <div className="ccf-card-face ccf-card-back" style={{
              position: "absolute", inset: 0, borderRadius: 14, overflow: "hidden",
              boxShadow: "0 0 0 1px rgba(0,255,65,0.25), 0 8px 40px rgba(0,0,0,0.7)",
              display: "flex", flexDirection: "column", gap: "1rem",
            }}>
              <GeomBg />
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", pointerEvents: "none" }} />
              {/* magnetic stripe */}
              <div style={{ height: 40, background: "rgba(0,0,0,0.7)", marginTop: 24 }} />
              {/* signature + cvv strip */}
              <div style={{ padding: "0 1.4rem", display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <div style={{
                  flex: 1, height: 36,
                  background: "repeating-linear-gradient(-55deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 8px, rgba(255,255,255,0.03) 8px, rgba(255,255,255,0.03) 16px)",
                  borderRadius: 4, display: "flex", alignItems: "center", paddingLeft: 8,
                }}>
                  <span style={{ fontFamily: "'Courier New', monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", letterSpacing: 2 }}>
                    AUTHORIZED SIGNATURE
                  </span>
                </div>
                <div style={{
                  width: 52, height: 36, background: "white", borderRadius: 4,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontFamily: "'Courier New', monospace", fontSize: "0.88rem", color: "#111", letterSpacing: 3 }}>
                    {cvv || "•••"}
                  </span>
                </div>
              </div>
              <div style={{ padding: "0 1.4rem" }}>
                <div style={{ fontFamily: TERM.font, fontSize: "0.55rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", lineHeight: 1.5 }}>
                  This card is property of Falcon Bank. Unauthorized use is prohibited. To report a lost or stolen card, contact 1-800-FALCON-1.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Form ── */}
        <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>

          {/* Card number */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <label style={{ fontFamily: TERM.font, fontSize: "0.72rem", color: TERM.greenMuted, letterSpacing: "0.2em" }}>
              CARD_NUMBER
            </label>
            <input
              className="ccf-input"
              type="text"
              inputMode="numeric"
              placeholder="0000 0000 0000 0000"
              value={cardNum}
              onChange={e => setCardNum(fmtNumber(e.target.value))}
              maxLength={19}
              style={{
                background: TERM.innerBg, border: `1px solid ${TERM.border}`,
                borderRadius: 6, padding: "0.55rem 0.75rem",
                color: TERM.green, fontFamily: "'Courier New', monospace", fontSize: "1rem", letterSpacing: "0.12em",
                width: "100%", boxSizing: "border-box", transition: "border-color 0.2s, background 0.2s",
              }}
            />
          </div>

          {/* Card name */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <label style={{ fontFamily: TERM.font, fontSize: "0.72rem", color: TERM.greenMuted, letterSpacing: "0.2em" }}>
              CARDHOLDER_NAME
            </label>
            <input
              className="ccf-input"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={26}
              style={{
                background: TERM.innerBg, border: `1px solid ${TERM.border}`,
                borderRadius: 6, padding: "0.55rem 0.75rem",
                color: TERM.green, fontFamily: TERM.font, fontSize: "1rem", letterSpacing: "0.12em",
                width: "100%", boxSizing: "border-box", transition: "border-color 0.2s, background 0.2s",
              }}
            />
          </div>

          {/* Expiry + CVV row */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              <label style={{ fontFamily: TERM.font, fontSize: "0.72rem", color: TERM.greenMuted, letterSpacing: "0.2em" }}>
                EXPIRY
              </label>
              <input
                className="ccf-input"
                type="text"
                inputMode="numeric"
                placeholder="MM/YY"
                value={expiry}
                onChange={e => setExpiry(fmtExpiry(e.target.value))}
                maxLength={5}
                style={{
                  background: TERM.innerBg, border: `1px solid ${TERM.border}`,
                  borderRadius: 6, padding: "0.55rem 0.75rem",
                  color: TERM.green, fontFamily: "'Courier New', monospace", fontSize: "1rem", letterSpacing: "0.18em",
                  width: "100%", boxSizing: "border-box", transition: "border-color 0.2s, background 0.2s",
                }}
              />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              <label style={{ fontFamily: TERM.font, fontSize: "0.72rem", color: TERM.greenMuted, letterSpacing: "0.2em" }}>
                CVV
              </label>
              <input
                className="ccf-input"
                type="password"
                inputMode="numeric"
                placeholder="•••"
                value={cvv}
                onChange={e => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                onFocus={() => setFlipped(true)}
                onBlur={() => setFlipped(false)}
                maxLength={4}
                style={{
                  background: TERM.innerBg, border: `1px solid ${TERM.border}`,
                  borderRadius: 6, padding: "0.55rem 0.75rem",
                  color: TERM.green, fontFamily: "'Courier New', monospace", fontSize: "1rem", letterSpacing: "0.22em",
                  width: "100%", boxSizing: "border-box", transition: "border-color 0.2s, background 0.2s",
                }}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="ccf-submit"
            style={{
              marginTop: "0.3rem",
              background: TERM.green,
              color: TERM.bg,
              fontFamily: TERM.font,
              fontSize: "1rem",
              letterSpacing: "0.22em",
              border: "none",
              borderRadius: 6,
              padding: "0.7rem 1rem",
              cursor: "pointer",
              transition: "background 0.18s",
              fontWeight: 700,
            }}
          >
            {submitted ? "PROCESSING..." : "> PAY_NOW.exe"}
          </button>

          {/* Success flash */}
          {submitted && (
            <div className="ccf-ok" style={{
              textAlign: "center", fontFamily: TERM.font, fontSize: "0.82rem",
              color: TERM.green, letterSpacing: "0.18em",
            }}>
              [OK] TRANSACTION_AUTHORISED
            </div>
          )}
        </form>
      </div>
    </>
  );
}
