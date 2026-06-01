"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 4,    suffix: "+",  label: "Years Building" },
  { value: 20,   suffix: "+",  label: "Projects Shipped" },
  { value: 100,  suffix: "%",  label: "Client Satisfaction" },
  { value: 3,    suffix: "x",  label: "Avg. Conversion Lift" },
];

const EXPO = [0.16, 1, 0.3, 1] as const;

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const duration = 1600;
    const raf = (ts: number) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - prog, 4);
      setDisplay(Math.round(eased * value));
      if (prog < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [inView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-24 px-6 md:px-10 bg-fd-black border-t border-fd-border">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.1, ease: EXPO }}
            className="text-center md:text-left md:border-r border-fd-border last:border-0 md:px-8 first:pl-0"
          >
            <p className="font-display font-extrabold text-fd-white mb-1" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
              <CountUp value={s.value} suffix={s.suffix} />
            </p>
            <p className="font-display font-semibold text-[10px] tracking-widest2 uppercase text-fd-muted">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
