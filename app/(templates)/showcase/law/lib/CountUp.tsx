"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// Parses "28+", "4,200+", "98%", "£2.1bn" → { prefix, number, suffix, decimals }
function parse(raw: string) {
  const prefix  = raw.match(/^[^0-9]*/)?.[0] ?? "";
  const suffix  = raw.match(/[^0-9.]+$/)?.[0] ?? "";
  const numStr  = raw.slice(prefix.length, raw.length - suffix.length);
  const number  = parseFloat(numStr.replace(/,/g, ""));
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  const hasComma = numStr.includes(",");
  return { prefix, suffix, number, decimals, hasComma };
}

function format(val: number, decimals: number, hasComma: boolean) {
  const fixed = val.toFixed(decimals);
  if (!hasComma) return fixed;
  return parseFloat(fixed).toLocaleString("en-GB", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// Ease-out cubic
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function useCountUp(rawValue: string, duration = 1800) {
  const { prefix, suffix, number, decimals, hasComma } = parse(rawValue);
  const [display, setDisplay] = useState(format(0, decimals, hasComma));
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOut(progress);
      const current = eased * number;
      setDisplay(format(current, decimals, hasComma));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView]);

  return { ref, display: prefix + display + suffix };
}

// Ready-to-use component
export function CountUp({
  value,
  label,
  serif,
  sans,
  gold,
  textMd,
  size = "clamp(2.2rem,4vw,3.5rem)",
  labelSize = "0.72rem",
  delay = 0,
}: {
  value: string;
  label: string;
  serif: string;
  sans: string;
  gold: string;
  textMd: string;
  size?: string;
  labelSize?: string;
  delay?: number;
}) {
  const { ref, display } = useCountUp(value);
  return (
    <div ref={ref} style={{ textAlign: "center", padding: "2rem 1rem" }}>
      <div style={{ fontFamily: serif, fontSize: size, fontWeight: 600, color: gold, lineHeight: 1, marginBottom: "0.5rem" }}>
        {display}
      </div>
      <div style={{ fontFamily: sans, fontSize: labelSize, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: textMd }}>
        {label}
      </div>
    </div>
  );
}
