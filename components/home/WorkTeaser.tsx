"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import ParallaxLayer from "@/components/ParallaxLayer";

const WORKS = [
  {
    num: "01",
    title: "Fine Jewellery Store",
    category: "E-Commerce · Luxury",
    desc: "Dark gold aesthetic. Scroll-driven SVG ring assembly animation, hero slider, full product catalogue.",
    href: "https://jewellery-template-one.vercel.app",
    external: true,
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    colour: "#c9a85c",
  },
  {
    num: "02",
    title: "Photography Studio",
    category: "Portfolio · Creative",
    desc: "Full-screen gallery, floating lightbox, cinematic transitions. Built for visual storytellers.",
    href: "https://photography-template-khaki.vercel.app",
    external: true,
    tags: ["Next.js", "GSAP", "Framer Motion"],
    colour: "#e2e8f0",
  },
  {
    num: "03",
    title: "More Coming Soon",
    category: "Restaurant · Trades · SaaS",
    desc: "We're building new templates every sprint. Book a consultation and we'll match you to the right starting point.",
    href: "/showcase",
    external: false,
    tags: ["In Progress"],
    colour: "#f97316",
  },
];

const EXPO = [0.16, 1, 0.3, 1] as const;

export default function WorkTeaser() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-32 px-6 md:px-10 bg-fd-surface border-t border-fd-border">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <ParallaxLayer offset={30} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EXPO }}
              className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange mb-4"
            >
              Selected Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: EXPO }}
              className="font-display font-extrabold leading-none tracking-tightest text-fd-white"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              OUR<br /><span className="text-stroke">SHOWCASE</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: EXPO }}
          >
            <Link
              href="/showcase"
              className="font-display font-bold text-xs tracking-widest uppercase text-fd-dim border border-fd-border px-6 py-3 hover:border-fd-orange hover:text-fd-orange transition-all duration-300 flex items-center gap-3"
            >
              View All Work <span>↗</span>
            </Link>
          </motion.div>
        </ParallaxLayer>

        {/* Work cards */}
        <div className="space-y-4">
          {WORKS.map((w, i) => (
            <motion.div
              key={w.num}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: EXPO }}
            >
              <Link
                href={w.href}
                target={w.external ? "_blank" : undefined}
                rel={w.external ? "noopener noreferrer" : undefined}
                className="group flex flex-col md:flex-row md:items-center gap-6 p-8 bg-fd-card border border-fd-border hover:border-fd-orange/40 transition-all duration-400"
              >
                {/* Colour accent bar */}
                <div
                  className="hidden md:block w-1 self-stretch rounded-full flex-shrink-0 transition-all duration-300 group-hover:w-2"
                  style={{ background: w.colour }}
                />

                {/* Number */}
                <span className="font-display font-bold text-xs text-fd-muted tracking-widest flex-shrink-0">
                  {w.num}
                </span>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-2">
                    <h3 className="font-display font-bold text-xl text-fd-white group-hover:text-fd-orange transition-colors duration-300">
                      {w.title}
                    </h3>
                    <span className="font-display text-[10px] tracking-widest uppercase text-fd-muted border border-fd-border px-2.5 py-1">
                      {w.category}
                    </span>
                  </div>
                  <p className="font-body text-sm text-fd-dim leading-relaxed max-w-xl">
                    {w.desc}
                  </p>
                </div>

                {/* Tags + arrow */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="hidden lg:flex flex-wrap gap-2">
                    {w.tags.map((tag) => (
                      <span key={tag} className="font-display text-[9px] tracking-widest uppercase text-fd-muted px-2 py-0.5 border border-fd-border/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="font-display text-lg text-fd-muted group-hover:text-fd-orange group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                    ↗
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
