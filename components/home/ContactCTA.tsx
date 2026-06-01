"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import ParallaxLayer from "@/components/ParallaxLayer";

const EXPO = [0.16, 1, 0.3, 1] as const;

export default function ContactCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      // No overflow-hidden here — ContactCTA is the last section on the page.
      // Removing it lets the FD parallax extend naturally below without hard clipping.
      className="relative py-40 px-6 md:px-10 bg-fd-black border-t border-fd-border"
    >
      {/* Orange glow */}
      <ParallaxLayer
        className="absolute pointer-events-none"
        offset={150}
        style={{
          width: "70vw",
          height: "70vw",
          top: "calc(50% - 35vw)",
          left: "calc(50% - 35vw)",
          background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 65%)",
        }}
      />

      {/* Big decorative "FD" — deepest layer, slowest movement */}
      <ParallaxLayer
        className="absolute right-0 bottom-0 font-display font-extrabold text-fd-border select-none pointer-events-none leading-none"
        offset={60}
        style={{ fontSize: "clamp(8rem, 20vw, 20rem)", lineHeight: 0.85 }}
      >
        FD
      </ParallaxLayer>

      {/* Main content — mid-layer parallax */}
      <ParallaxLayer offset={40} className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EXPO }}
          className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange mb-8"
        >
          Ready to Start?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: EXPO }}
          className="font-display font-extrabold leading-none tracking-tightest text-fd-white mb-10"
          style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
        >
          LET&apos;S BUILD<br />
          <span className="text-stroke-orange">SOMETHING</span><br />
          GREAT.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: EXPO }}
          className="font-body text-fd-dim text-lg mb-14 max-w-xl mx-auto leading-relaxed"
        >
          Tell us what you&apos;re building. We&apos;ll tell you how to make it world-class.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease: EXPO }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/contact"
            className="group font-display font-bold text-sm tracking-widest uppercase bg-fd-orange text-fd-black px-10 py-5 hover:bg-fd-white transition-colors duration-300 flex items-center justify-center gap-3"
          >
            Start a Project
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
          <a
            href="mailto:falcondesigns001@gmail.com"
            className="font-display font-semibold text-sm tracking-widest uppercase text-fd-white border border-fd-border px-10 py-5 hover:border-fd-orange hover:text-fd-orange transition-all duration-300"
          >
            Email Directly
          </a>
        </motion.div>
      </ParallaxLayer>
    </section>
  );
}
