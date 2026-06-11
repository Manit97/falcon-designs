"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import ParallaxLayer from "@/components/ParallaxLayer";
import { BotIcon, ClockIcon, MessageIcon, SparklesIcon } from "@/components/icons/AnimatedIcons";
import type { ComponentType } from "react";

const EXPO = [0.16, 1, 0.3, 1] as const;

const FEATURES = [
  { Icon: ClockIcon,    title: "Available 24/7",          desc: "Never miss a lead. Your AI handles enquiries at 3am just as well as 3pm." },
  { Icon: MessageIcon,  title: "Instant Responses",        desc: "No hold music. No contact forms that go nowhere. Answers in seconds." },
  { Icon: BotIcon,      title: "Books Appointments",       desc: "Captures details, checks availability, confirms bookings — all automatically." },
  { Icon: SparklesIcon, title: "Trained On Your Business", desc: "Knows your services, prices, and FAQs. Sounds like you, not like a bot." },
];

type IconComponent = ComponentType<{ animate: boolean; size?: number }>;

function FeatureCard({
  Icon, title, desc, motionProps,
}: {
  Icon: IconComponent; title: string; desc: string;
  motionProps: React.ComponentProps<typeof motion.div>;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      {...motionProps}
      className="bg-fd-card border border-fd-border p-4 hover:border-fd-orange/30 transition-colors duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="block mb-2 text-fd-orange">
        <Icon animate={hovered} size={20} />
      </span>
      <p className="font-display font-bold text-xs text-fd-white mb-1">{title}</p>
      <p className="font-body text-[11px] text-fd-muted leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function AITeaser() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 md:py-32 px-6 md:px-10 bg-fd-surface border-t border-fd-border overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

        {/* Left — copy at a shallower depth */}
        <ParallaxLayer offset={55}>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EXPO }}
              className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange mb-5"
            >
              AI Widget Service
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: EXPO }}
              className="font-display font-extrabold leading-none tracking-tightest text-fd-white mb-8"
              style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)" }}
            >
              YOUR WEBSITE<br />
              <span className="text-stroke">NEVER SLEEPS</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: EXPO }}
              className="font-body text-fd-dim leading-relaxed mb-10 max-w-md"
            >
              We install an AI agent directly into your website. It handles customer enquiries, books appointments, and captures leads — automatically, around the clock. Your clients interact with an assistant that actually knows your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: EXPO }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/ai-widget"
                className="font-display font-bold text-xs tracking-widest uppercase bg-fd-orange text-fd-black px-7 py-4 hover:bg-fd-white transition-colors duration-300 flex items-center gap-3"
              >
                Try It Live <span>↗</span>
              </Link>
              <Link
                href="/contact"
                className="font-display font-semibold text-xs tracking-widest uppercase text-fd-dim border border-fd-border px-7 py-4 hover:border-fd-white hover:text-fd-white transition-all duration-300"
              >
                Add to My Site
              </Link>
            </motion.div>
          </div>
        </ParallaxLayer>

        {/* Right — widget at a deeper depth */}
        <ParallaxLayer className="relative" offset={100}>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: EXPO }}
          >
            {/* Mock chat widget */}
            <div className="bg-fd-card border border-fd-border rounded-2xl p-6 mb-6 relative">
              {/* Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-fd-border mb-4">
                <div className="w-8 h-8 rounded-full bg-fd-orange flex items-center justify-center">
                  <span className="text-xs">🦅</span>
                </div>
                <div>
                  <p className="font-display font-bold text-xs text-fd-white">Falcon AI</p>
                  <p className="font-body text-[10px] text-fd-orange flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-fd-orange animate-pulse inline-block" />
                    Online now
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-3">
                <div className="bg-fd-surface rounded-xl rounded-tl-none p-3 max-w-[80%]">
                  <p className="font-body text-xs text-fd-dim">Hi! I&apos;m the AI assistant for this business. How can I help you today?</p>
                </div>
                <div className="bg-fd-orange rounded-xl rounded-tr-none p-3 max-w-[80%] ml-auto">
                  <p className="font-body text-xs text-fd-black">I&apos;d like to book an appointment for next week</p>
                </div>
                <div className="bg-fd-surface rounded-xl rounded-tl-none p-3 max-w-[80%]">
                  <p className="font-body text-xs text-fd-dim">Great! I have availability on Tuesday at 10am or Thursday at 2pm. Which works better for you?</p>
                </div>
                <div className="flex gap-1 pt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-fd-muted animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-fd-muted animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-fd-muted animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>

              {/* Glow */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-fd-orange/10 to-transparent pointer-events-none" />
            </div>

            {/* Feature chips */}
            <div className="grid grid-cols-2 gap-3">
              {FEATURES.map(({ Icon, title, desc }, i) => (
                <FeatureCard
                  key={title}
                  Icon={Icon}
                  title={title}
                  desc={desc}
                  motionProps={{
                    initial: { opacity: 0, y: 20 },
                    animate: inView ? { opacity: 1, y: 0 } : {},
                    transition: { duration: 0.6, delay: 0.4 + i * 0.08, ease: EXPO },
                  }}
                />
              ))}
            </div>
          </motion.div>
        </ParallaxLayer>
      </div>
    </section>
  );
}
