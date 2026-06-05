"use client";
import { motion } from "framer-motion";
import ParallaxLayer from "@/components/ParallaxLayer";

const TESTIMONIALS = [
  {
    quote: "They completely transformed our online presence. The design is stunning and the AI booking system alone has cut our admin time in half.",
    author: "Sarah Mitchell",
    title: "Owner, Vivah Films",
    company: "Asian Wedding Photography",
  },
  {
    quote: "Working with Falcon Designs was exceptional. They didn't just build a website—they built a business tool. The attention to detail is unmatched.",
    author: "James Patel",
    title: "Founder, Aurum Creations",
    company: "Fine Jewellery Design & Sales",
  },
  {
    quote: "The AI widget is a game-changer. Clients book directly, and the system integrates seamlessly with everything we use. Highly recommended.",
    author: "Emma Thompson",
    title: "Director, Swift Trades",
    company: "Emergency Plumbing & Heating",
  },
];

const EXPO = [0.16, 1, 0.3, 1] as const;
const VP = { once: true, margin: "0px 0px -60px 0px" } as const;

export default function Testimonials() {
  return (
    <section className="py-28 px-6 md:px-10 border-b border-fd-border overflow-hidden relative bg-fd-black">
      {/* Accent gradient */}
      <ParallaxLayer
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        offset={100}
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(249,115,22,0.08) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.6, ease: EXPO }}
          className="text-center mb-20"
        >
          <p className="font-display font-semibold text-xs tracking-widest uppercase text-fd-orange mb-4">
            Trusted by Industry Leaders
          </p>
          <h2
            className="font-display font-extrabold text-fd-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            What Our Clients Say
          </h2>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: EXPO }}
              className="p-8 border border-fd-border bg-fd-surface/30 backdrop-blur-sm hover:border-fd-orange/50 transition-colors duration-300"
            >
              {/* Quote mark */}
              <div className="mb-6">
                <span className="text-5xl text-fd-orange opacity-20">"</span>
              </div>

              {/* Quote */}
              <p className="font-body text-sm text-fd-white mb-8 leading-relaxed">
                {testimonial.quote}
              </p>

              {/* Author */}
              <div className="border-t border-fd-border pt-6">
                <p className="font-display font-semibold text-sm text-fd-white mb-1">
                  {testimonial.author}
                </p>
                <p className="font-body text-xs text-fd-orange mb-2">
                  {testimonial.title}
                </p>
                <p className="font-body text-xs text-fd-dim">
                  {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
