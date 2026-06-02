"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import ParallaxLayer from "@/components/ParallaxLayer";

const EXPO = [0.16, 1, 0.3, 1] as const;
const VP   = { once: true, margin: "0px 0px -80px 0px" } as const;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const PLANS = [
  {
    id: "launch",
    name: "Launch",
    price: "£1,200",
    period: "one-off",
    tag: "For small businesses establishing their digital presence.",
    highlight: false,
    badge: null,
    accent: "#666666",
    features: [
      "Up to 5 pages",
      "Mobile-first responsive design",
      "Contact form with email notifications",
      "Basic SEO setup & sitemap",
      "Google Analytics integration",
      "1 full revision round",
      "30-day aftercare support",
    ],
    cta: "Start a project",
    href: "/contact",
  },
  {
    id: "pro",
    name: "Professional",
    price: "£2,800",
    period: "one-off",
    tag: "For businesses ready to stand out and convert at scale.",
    highlight: true,
    badge: "Most Popular",
    accent: "#f97316",
    features: [
      "Up to 10 fully custom pages",
      "Bespoke animations & micro-interactions",
      "CMS — edit your content yourself",
      "Core Web Vitals optimised (95+ Lighthouse)",
      "Advanced SEO & Open Graph setup",
      "3 full revision rounds",
      "60-day aftercare + priority launch week",
    ],
    cta: "Start a project",
    href: "/contact",
  },
  {
    id: "retainer",
    name: "Retainer",
    price: "£350",
    period: "per month",
    tag: "For businesses that want an ongoing digital partner.",
    highlight: false,
    badge: null,
    accent: "#6366f1",
    features: [
      "Everything in Professional",
      "Unlimited content updates",
      "New landing pages on demand",
      "Monthly performance reports",
      "Priority support — 4hr response",
      "Hosting & domain fully managed",
      "Quarterly design refresh",
    ],
    cta: "Talk to us",
    href: "/contact",
  },
];

const ADDONS = [
  {
    name: "AI Chat Widget",
    price: "£400",
    desc: "A custom-trained chatbot that answers questions about your business, captures leads, and works 24/7.",
    icon: "◈",
  },
  {
    name: "E-Commerce Store",
    price: "£800",
    desc: "Full product catalogue, checkout, and inventory management — custom-built or Shopify integrated.",
    icon: "◇",
  },
  {
    name: "Blog & CMS",
    price: "£300",
    desc: "A full publishing system so you can write, publish, and manage posts without touching code.",
    icon: "◆",
  },
  {
    name: "Booking System",
    price: "£500",
    desc: "Online appointment scheduling with confirmations, reminders, and calendar sync.",
    icon: "◉",
  },
  {
    name: "Multilingual",
    price: "£400",
    desc: "Full site translated and localised for additional markets. SEO-optimised per region.",
    icon: "◎",
  },
  {
    name: "Custom Dashboard",
    price: "From £1,200",
    desc: "Internal tools, analytics dashboards, and CRM systems — built exactly to your business spec.",
    icon: "◐",
  },
];

const FAQ = [
  {
    q: "Do you charge for revisions?",
    a: "No — each plan includes a defined number of full revision rounds and feedback within those rounds is unlimited. We only charge if you significantly change scope after we've started.",
  },
  {
    q: "How long does a project take?",
    a: "First design within 48 hours. Full site live within 2–4 weeks for Launch, 4–6 weeks for Professional. We don't disappear for months — we move at pace.",
  },
  {
    q: "What do I need to get started?",
    a: "Just your branding (logo, colours) if you have it, and a rough idea of what you need. We handle the rest — copy direction, structure, and photography recommendations.",
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes. All one-off projects split 50% to start, 50% on launch. Retainers are monthly with no lock-in — cancel any time with 30 days' notice.",
  },
  {
    q: "What if I need more pages?",
    a: "Additional pages are £150 each on Launch, £200 each on Professional. Or upgrade to a Retainer and get unlimited new pages as standard.",
  },
  {
    q: "Do you work with existing websites?",
    a: "Yes — redesigns, speed fixes, new landing pages, and CMS additions all fall within our scope. Book a call and we'll assess what you have and what's worth keeping.",
  },
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function PricingPage() {
  return (
    <div className="min-h-screen bg-fd-black pt-20">
      <style>{`
        .plan-feature::before {
          content: "";
          display: inline-block;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: currentColor;
          margin-right: 10px;
          flex-shrink: 0;
          margin-top: 7px;
        }
        .plan-card-pro { box-shadow: 0 0 0 1px rgba(249,115,22,0.4); }
        .plan-card-pro:hover { box-shadow: 0 0 60px rgba(249,115,22,0.12), 0 0 0 1px rgba(249,115,22,0.7); }
        .plan-card:hover { box-shadow: 0 0 40px rgba(255,255,255,0.03), 0 0 0 1px rgba(255,255,255,0.1); }
        .faq-row:hover .faq-q { color: #f97316; }
      `}</style>

      {/* ══════════════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6 md:px-10 border-b border-fd-border overflow-hidden relative">
        <ParallaxLayer
          className="absolute w-[600px] h-[600px] pointer-events-none"
          offset={150}
          style={{
            top: "calc(50% - 300px)",
            left: "calc(50% - 300px)",
            background: "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)",
          }}
        />
        <ParallaxLayer offset={45} className="max-w-7xl mx-auto relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EXPO }}
            className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange mb-5"
          >
            Pricing
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: EXPO }}
            className="font-display font-extrabold leading-none tracking-tightest text-fd-white"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            CLEAR PRICING.
            <br />
            <span className="text-stroke">NO SURPRISES.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25, ease: EXPO }}
            className="font-body text-fd-dim text-lg mt-8 max-w-xl leading-relaxed"
          >
            Every project starts with a real conversation — not a quote form.
            These are our starting points.
          </motion.p>
        </ParallaxLayer>
      </section>

      {/* ══════════════════════════════════════════════════
          PLANS
      ══════════════════════════════════════════════════ */}
      <section className="py-32 px-6 md:px-10 border-b border-fd-border overflow-hidden relative">

        {/* Background glow — deep parallax */}
        <ParallaxLayer
          className="absolute inset-0 pointer-events-none"
          offset={200}
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(249,115,22,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Section header */}
          <ParallaxLayer offset={60}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.8, ease: EXPO }}
              className="mb-20"
            >
              <p className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange mb-4">
                Choose a Plan
              </p>
              <h2
                className="font-display font-extrabold leading-none tracking-tightest text-fd-white"
                style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)" }}
              >
                WHAT WE<br /><span className="text-stroke">CHARGE.</span>
              </h2>
              <p className="font-body text-fd-dim mt-5 max-w-lg leading-relaxed">
                No hidden fees. No monthly commitments disguised as one-offs.
                Every price includes everything we&apos;ve described — nothing more, nothing less.
              </p>
            </motion.div>
          </ParallaxLayer>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-px bg-fd-border border border-fd-border">
            {PLANS.map((plan, i) => (
              <ParallaxLayer key={plan.id} offset={[50, 30, 65][i]} spring={{ stiffness: [70, 90, 60][i], damping: 20 }}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: EXPO }}
                  className={`relative flex flex-col h-full bg-fd-black p-10 transition-all duration-500 ${
                    plan.highlight ? "plan-card-pro" : "plan-card border-t-0"
                  }`}
                  style={plan.highlight ? { background: "#0d0d0d" } : {}}
                >

                  {/* Top accent line */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0, left: 0, right: 0,
                      height: plan.highlight ? 3 : 1,
                      background: plan.highlight
                        ? "linear-gradient(90deg, transparent, #f97316, transparent)"
                        : `rgba(255,255,255,0.04)`,
                    }}
                  />

                  {/* Badge */}
                  {plan.badge && (
                    <span
                      className="font-display font-bold text-[9px] tracking-widest3 uppercase mb-6 self-start px-3 py-1.5"
                      style={{
                        background: "rgba(249,115,22,0.12)",
                        color: "#f97316",
                        border: "1px solid rgba(249,115,22,0.25)",
                      }}
                    >
                      {plan.badge}
                    </span>
                  )}

                  {!plan.badge && <div className="mb-6 h-[26px]" />}

                  {/* Name */}
                  <p
                    className="font-display font-bold text-xs tracking-widest uppercase mb-3"
                    style={{ color: plan.accent }}
                  >
                    {plan.name}
                  </p>

                  {/* Price */}
                  <div className="mb-2 flex items-end gap-2">
                    <span
                      className="font-display font-extrabold leading-none tracking-tightest text-fd-white"
                      style={{ fontSize: "clamp(2.4rem, 4vw, 3.2rem)" }}
                    >
                      {plan.price}
                    </span>
                    <span className="font-body text-fd-muted text-sm mb-1">{plan.period}</span>
                  </div>

                  {/* Tag */}
                  <p className="font-body text-fd-dim text-sm leading-relaxed mb-8">{plan.tag}</p>

                  {/* Divider */}
                  <div className="w-full h-px bg-fd-border mb-8" />

                  {/* Features */}
                  <ul className="space-y-3 flex-1 mb-10">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="plan-feature flex items-start font-body text-sm leading-relaxed"
                        style={{ color: plan.highlight ? "#cccccc" : "#999999" }}
                      >
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={plan.href}
                    className="font-display font-bold text-xs tracking-widest uppercase text-center py-4 px-8 transition-all duration-300 inline-flex items-center justify-center gap-3"
                    style={
                      plan.highlight
                        ? {
                            background: "#f97316",
                            color: "#080808",
                          }
                        : {
                            border: "1px solid #1f1f1f",
                            color: "#666666",
                          }
                    }
                    onMouseEnter={(e) => {
                      if (!plan.highlight) {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = plan.accent;
                        (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
                      } else {
                        (e.currentTarget as HTMLAnchorElement).style.background = "#ffffff";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!plan.highlight) {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1f1f1f";
                        (e.currentTarget as HTMLAnchorElement).style.color = "#666666";
                      } else {
                        (e.currentTarget as HTMLAnchorElement).style.background = "#f97316";
                      }
                    }}
                  >
                    {plan.cta} <span>→</span>
                  </Link>

                </motion.div>
              </ParallaxLayer>
            ))}
          </div>

          {/* Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VP}
            transition={{ duration: 0.8, delay: 0.3, ease: EXPO }}
            className="font-body text-xs text-fd-muted mt-6 text-center"
          >
            All prices exclude VAT where applicable. Projects over £5,000 qualify for staged milestone payments.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ADD-ONS
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6 md:px-10 border-b border-fd-border bg-fd-surface overflow-hidden relative">

        <ParallaxLayer
          className="absolute pointer-events-none"
          offset={180}
          style={{
            top: "10%", right: "-20%",
            width: "60%", height: "80%",
            background: "radial-gradient(ellipse, rgba(99,102,241,0.05) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">

          <ParallaxLayer offset={55}>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.8, ease: EXPO }}
              className="mb-16"
            >
              <p className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange mb-4">
                Extras
              </p>
              <h2
                className="font-display font-extrabold leading-none tracking-tightest text-fd-white"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                ADD-ONS<br /><span className="text-stroke">& EXTRAS.</span>
              </h2>
              <p className="font-body text-fd-dim mt-5 max-w-lg leading-relaxed">
                Bolt these onto any plan. Each one is built to the same standard as the core site — no half-measures.
              </p>
            </motion.div>
          </ParallaxLayer>

          <ParallaxLayer offset={35} className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-fd-border border border-fd-border">
            {ADDONS.map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.5, delay: i * 0.07, ease: EXPO }}
                className="bg-fd-surface p-8 group hover:bg-fd-card transition-colors duration-300"
              >
                <div className="flex items-start justify-between mb-5">
                  <span
                    className="font-display text-2xl"
                    style={{ color: "rgba(249,115,22,0.5)" }}
                  >
                    {a.icon}
                  </span>
                  <span className="font-display font-bold text-sm text-fd-white">
                    {a.price}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base text-fd-white mb-3 group-hover:text-fd-orange transition-colors duration-300">
                  {a.name}
                </h3>
                <p className="font-body text-sm text-fd-dim leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </ParallaxLayer>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          COMPARE STRIP
      ══════════════════════════════════════════════════ */}
      <section className="py-20 px-6 md:px-10 border-b border-fd-border overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <ParallaxLayer offset={40}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VP}
              transition={{ duration: 0.8, ease: EXPO }}
              className="grid md:grid-cols-3 gap-0 border border-fd-border text-center"
            >
              {[
                { label: "48hr",    sub: "First design delivered" },
                { label: "∞",       sub: "Revisions within each round" },
                { label: "No lock-in", sub: "Cancel retainer any time" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`px-8 py-10 ${i < 2 ? "border-b md:border-b-0 md:border-r border-fd-border" : ""}`}
                >
                  <p
                    className="font-display font-extrabold leading-none tracking-tightest text-fd-orange mb-2"
                    style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                  >
                    {stat.label}
                  </p>
                  <p className="font-display text-[10px] tracking-widest2 uppercase text-fd-muted">{stat.sub}</p>
                </div>
              ))}
            </motion.div>
          </ParallaxLayer>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6 md:px-10 border-b border-fd-border overflow-hidden relative">

        <ParallaxLayer
          className="absolute bottom-0 left-0 pointer-events-none"
          offset={160}
          style={{
            width: "50%", height: "70%",
            background: "radial-gradient(ellipse at 0% 100%, rgba(249,115,22,0.04) 0%, transparent 60%)",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-[1fr_1.6fr] gap-20">

          <ParallaxLayer offset={60}>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.8, ease: EXPO }}
            >
              <p className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange mb-4">
                FAQ
              </p>
              <h2
                className="font-display font-extrabold leading-none tracking-tightest text-fd-white"
                style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
              >
                COMMON<br /><span className="text-stroke">QUESTIONS.</span>
              </h2>
              <p className="font-body text-fd-dim mt-5 leading-relaxed max-w-xs">
                Still unsure? Book a free 20-minute call — no pitch, just straight answers.
              </p>
              <Link
                href="/contact"
                className="font-display font-bold text-xs tracking-widest uppercase border border-fd-border text-fd-muted px-7 py-3.5 hover:border-fd-orange hover:text-fd-white transition-all duration-300 inline-flex items-center gap-3 mt-8"
              >
                Book a call <span>→</span>
              </Link>
            </motion.div>
          </ParallaxLayer>

          <ParallaxLayer offset={30} className="space-y-0 border border-fd-border self-start">
            {FAQ.map((item, i) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VP}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EXPO }}
                className="faq-row group px-8 py-7 border-b border-fd-border last:border-b-0 hover:bg-fd-surface transition-colors duration-300 cursor-default"
              >
                <p className="faq-q font-display font-bold text-sm text-fd-white mb-3 transition-colors duration-300">
                  {item.q}
                </p>
                <p className="font-body text-sm text-fd-dim leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </ParallaxLayer>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6 md:px-10 overflow-hidden">
        <ParallaxLayer offset={40} className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.9, ease: EXPO }}
          >
            <p className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange mb-5">
              Ready to start?
            </p>
            <h2
              className="font-display font-extrabold leading-none tracking-tightest text-fd-white mb-6"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)" }}
            >
              LET&apos;S BUILD
              <br />
              <span className="text-stroke">SOMETHING.</span>
            </h2>
            <p className="font-body text-fd-dim mb-10 leading-relaxed max-w-lg mx-auto">
              Tell us about your business. We&apos;ll tell you exactly what we can build — and what it will cost.
              No sales pitch. No obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="font-display font-bold text-xs tracking-widest uppercase bg-fd-orange text-fd-black px-10 py-4 hover:bg-fd-white transition-colors duration-300 inline-flex items-center justify-center gap-3"
              >
                Start a Project <span>→</span>
              </Link>
              <Link
                href="/showcase"
                className="font-display font-bold text-xs tracking-widest uppercase border border-fd-border text-fd-muted px-10 py-4 hover:border-fd-orange hover:text-fd-white transition-all duration-300 inline-flex items-center justify-center gap-3"
              >
                See Our Work
              </Link>
            </div>
          </motion.div>
        </ParallaxLayer>
      </section>

    </div>
  );
}
