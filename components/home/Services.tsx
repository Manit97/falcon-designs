"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ParallaxLayer from "@/components/ParallaxLayer";

const SERVICES = [
  {
    num: "01",
    title: "Web Design & Development",
    desc: "Pixel-perfect, high-performance Next.js websites. We obsess over every detail — from scroll animations to load times.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
  },
  {
    num: "02",
    title: "AI Agents & Chatbots",
    desc: "Custom-trained AI assistants that handle bookings, answer questions, and capture leads 24/7. Built on Claude.",
    tags: ["Claude API", "Booking AI", "Lead Capture", "Custom Training"],
  },
  {
    num: "03",
    title: "Template Customisation",
    desc: "Start from one of our battle-tested templates and have it transformed into your brand in a single sprint.",
    tags: ["Fast Turnaround", "Branded", "Full Stack", "Deployed"],
  },
  {
    num: "04",
    title: "Dashboard & CRM Systems",
    desc: "Internal tools that actually work. Client management, agent oversight, analytics — all in one place.",
    tags: ["Supabase", "Real-time", "Custom", "Scalable"],
  },
];

const EXPO = [0.16, 1, 0.3, 1] as const;

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 md:px-10 bg-fd-black border-t border-fd-border">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <ParallaxLayer offset={30} className="grid md:grid-cols-2 gap-10 mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EXPO }}
              className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange mb-4"
            >
              What We Do
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: EXPO }}
              className="font-display font-extrabold leading-none tracking-tightest text-fd-white"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              OUR<br />
              <span className="text-stroke">SERVICES</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: EXPO }}
            className="font-body text-fd-dim text-base leading-relaxed md:self-end max-w-sm"
          >
            We don&apos;t do average. Every project ships with world-class design, clean code, and performance built in from day one.
          </motion.p>
        </ParallaxLayer>

        {/* Service list */}
        <div className="divide-y divide-fd-border">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: EXPO }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="grid md:grid-cols-[80px_1fr_auto] gap-6 items-start py-10 group"
            >
              {/* Number */}
              <span className="font-display font-bold text-xs tracking-widest text-fd-muted group-hover:text-fd-orange transition-colors duration-300">
                {s.num}
              </span>

              {/* Title + desc */}
              <div>
                <h3
                  className="font-display font-bold leading-tight mb-3 text-fd-white group-hover:text-fd-orange transition-colors duration-300"
                  style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)" }}
                >
                  {s.title}
                </h3>
                <motion.p
                  animate={{ height: hovered === i ? "auto" : 0, opacity: hovered === i ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: EXPO }}
                  className="font-body text-sm text-fd-dim leading-relaxed overflow-hidden"
                >
                  {s.desc}
                </motion.p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 md:justify-end mt-1">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-display text-[10px] tracking-widest uppercase border border-fd-border text-fd-muted px-3 py-1 group-hover:border-fd-orange/30 group-hover:text-fd-dim transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
