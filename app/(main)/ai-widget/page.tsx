"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AIWidget from "@/components/AIWidget";
import Link from "next/link";

const EXPO = [0.16, 1, 0.3, 1] as const;
const VP   = { once: true, margin: "0px 0px -80px 0px" } as const;

const DEMOS = [
  {
    id: "plumber",
    label: "Plumber & Trades",
    icon: "🔧",
    businessName: "QuickFix Plumbing",
    accentColour: "#3b82f6",
    greeting: "Hi there! I'm the QuickFix Plumbing assistant. Boiler playing up? Emergency leak? I can help book an engineer or answer any questions. What's going on?",
    placeholder: "e.g. I have a leak under my sink…",
    systemPrompt: `You are a friendly, professional AI assistant for QuickFix Plumbing — a London-based plumbing and heating company.

Your role:
- Help customers describe their plumbing issue and assess urgency
- Collect basic info: name, postcode, and best time for a call-back
- Quote rough timeframes (emergency = same day, routine = 2-5 days)
- Mention services: boilers, leaks, bathrooms, drain unblocking, central heating
- Pricing: free quote, call-out from £75 in London
- Keep replies short (2-4 sentences max), warm, and action-oriented
- If someone seems stressed about a flood/burst pipe, prioritise urgency and offer the emergency line: 0800 123 4567`,
  },
  {
    id: "restaurant",
    label: "Restaurant & Dining",
    icon: "🍽️",
    businessName: "The Golden Fork",
    accentColour: "#eab308",
    greeting: "Welcome to The Golden Fork! I can help with reservations, tell you about our menu and seasonal specials, or answer anything else. What can I do for you tonight?",
    placeholder: "e.g. I'd like to book a table for 4…",
    systemPrompt: `You are a charming AI assistant for The Golden Fork — an upscale British-Mediterranean restaurant in Mayfair, London.

Details:
- Open: Tues–Sun, 12pm–10:30pm (closed Monday)
- Covers: up to 60 inside, 20 on the terrace (weather permitting, Apr–Oct)
- Booking: tables up to 8 online, larger groups by phone: 020 7123 4567
- Signature dishes: 28-day aged beef Wellington, hand-rolled pasta, tasting menu (£85pp, 7 courses)
- Dietary: full vegetarian and vegan menus, please mention allergies when booking
- Dress code: smart casual
- Wine: 200-label cellar, sommelier available for tastings

Your tone: warm, knowledgeable, slightly elegant — like a great maître d'. Keep replies concise (2-4 sentences). For reservations, always ask: date, time, party size, any dietary needs.`,
  },
  {
    id: "jeweller",
    label: "Luxury Jeweller",
    icon: "💎",
    businessName: "Lumière Jewellery",
    accentColour: "#c9a85c",
    greeting: "Welcome to Lumière. I'm here to help you find something truly special — whether it's an engagement ring, a gift, or a bespoke commission. Where shall we begin?",
    placeholder: "e.g. I'm looking for an engagement ring…",
    systemPrompt: `You are an elegant AI consultant for Lumière Jewellery — a fine jewellery house in London's Hatton Garden, specialising in bespoke and designer pieces.

Collections:
- Eternelle: engagement rings from £1,200 (lab-grown) to £25,000+ (natural diamonds)
- Héritage: classic gold chains, pendants, earrings — £200–£3,000
- Bespoke: custom commissions, 6–8 week turnaround, consultation required
- Bridal: wedding bands, eternity rings, anniversary pieces

Services:
- Free jewellery valuation (by appointment)
- Engraving from £45
- Resizing from £35
- Free cleaning & check-up for life on Lumière pieces
- Video consultations available

Tone: refined, warm, and knowledgeable — like a trusted jewellery advisor. Never rush the customer. Ask about occasion, metal preference (gold/platinum/silver), stone preference, and budget when relevant. Keep replies 2-4 sentences.`,
  },
];

const INDUSTRIES = [
  "Retail & E-Commerce", "Hospitality", "Healthcare", "Legal Services",
  "Education", "Real Estate", "Beauty & Wellness", "Finance", "Trades", "Other",
];

function ConfiguratorWidget({ systemPrompt, businessName, accentColour }: {
  systemPrompt: string;
  businessName: string;
  accentColour: string;
}) {
  return (
    <AIWidget
      systemPrompt={systemPrompt}
      greeting={`Hi! I'm ${businessName}'s AI assistant. How can I help you today?`}
      accentColour={accentColour}
      businessName={businessName}
      placeholder="Ask me anything about our business…"
    />
  );
}

export default function AIWidgetPage() {
  const [activeDemo, setActiveDemo]     = useState(0);
  const [step, setStep]                 = useState<"form" | "chat">("form");
  const [configForm, setConfigForm]     = useState({
    businessName: "",
    industry: "",
    tone: "friendly",
    services: "",
    keyInfo: "",
  });
  const [customSystem, setCustomSystem] = useState("");
  const [customAccent, setCustomAccent] = useState("#f97316");

  const ACCENT_OPTIONS = [
    { label: "Orange",  value: "#f97316" },
    { label: "Blue",    value: "#3b82f6" },
    { label: "Emerald", value: "#10b981" },
    { label: "Purple",  value: "#8b5cf6" },
    { label: "Gold",    value: "#eab308" },
    { label: "Rose",    value: "#f43f5e" },
  ];

  const TONE_OPTIONS = [
    { value: "friendly",     label: "Friendly & Casual" },
    { value: "professional", label: "Professional" },
    { value: "luxury",       label: "Premium / Luxury" },
    { value: "energetic",    label: "Bold & Energetic" },
  ];

  const buildSystemPrompt = () =>
    `You are an AI assistant for ${configForm.businessName} — a ${configForm.industry} business.

${configForm.services ? `Services/Products: ${configForm.services}` : ""}
${configForm.keyInfo ? `Key information: ${configForm.keyInfo}` : ""}

Tone: ${configForm.tone}. Keep replies concise (2-4 sentences). Be helpful, answer questions about the business, and guide customers towards getting in touch or making a purchase/booking. If you don't know specific details, invite them to call or email the business directly.`;

  const handleBuild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!configForm.businessName || !configForm.industry) return;
    setCustomSystem(buildSystemPrompt());
    setStep("chat");
  };

  return (
    <div className="min-h-screen bg-fd-black pt-20">

      {/* ── Header ── */}
      <section className="py-28 px-6 md:px-10 border-b border-fd-border overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: "radial-gradient(circle at 70% 30%, rgba(249,115,22,0.08) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EXPO }}
            className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange mb-5"
          >
            AI Widget
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: EXPO }}
            className="font-display font-extrabold leading-none tracking-tightest text-fd-white"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            YOUR SITE.<br /><span className="text-stroke">AI-POWERED.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25, ease: EXPO }}
            className="font-body text-fd-dim text-lg mt-8 max-w-2xl leading-relaxed"
          >
            Every website we build can include a bespoke AI assistant — trained on your business,
            available 24/7, and embedded seamlessly into your site. No monthly fees, no off-the-shelf
            chatbot junk. Pure Claude intelligence, built your way.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4, ease: EXPO }}
            className="flex flex-wrap gap-6 mt-12"
          >
            {[
              { stat: "< 2s",  label: "Response time" },
              { stat: "24/7",  label: "Always on" },
              { stat: "100%",  label: "Your brand voice" },
              { stat: "∞",     label: "Conversations" },
            ].map(({ stat, label }) => (
              <div key={label} className="border border-fd-border px-6 py-4">
                <p className="font-display font-extrabold text-2xl text-fd-orange">{stat}</p>
                <p className="font-display text-[10px] tracking-widest uppercase text-fd-muted mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Live Demos ── */}
      <section className="py-24 px-6 md:px-10 border-b border-fd-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VP}
            transition={{ duration: 0.6, ease: EXPO }}
            className="mb-14"
          >
            <p className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange mb-3">
              Live Demos
            </p>
            <h2
              className="font-display font-extrabold leading-none tracking-tightest text-fd-white"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              SEE IT IN ACTION.
            </h2>
            <p className="font-body text-fd-dim mt-5 max-w-xl leading-relaxed">
              These are real AI assistants — fully functional, right here. Pick an industry and start chatting.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VP}
            transition={{ duration: 0.7, ease: EXPO }}
          >
            {/* Tab selector */}
            <div className="flex gap-0 mb-0 border border-fd-border w-fit">
              {DEMOS.map((d, i) => (
                <button
                  key={d.id}
                  onClick={() => setActiveDemo(i)}
                  className={`flex items-center gap-2 px-6 py-3 font-display font-semibold text-xs tracking-widest uppercase transition-all duration-200 border-r border-fd-border last:border-r-0 ${
                    activeDemo === i
                      ? "bg-fd-surface text-fd-white"
                      : "text-fd-muted hover:text-fd-dim"
                  }`}
                >
                  <span>{d.icon}</span>
                  <span className="hidden sm:block">{d.label}</span>
                </button>
              ))}
            </div>

            {/* Demo widget */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDemo}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: EXPO }}
                className="max-w-xl"
              >
                <AIWidget
                  systemPrompt={DEMOS[activeDemo].systemPrompt}
                  greeting={DEMOS[activeDemo].greeting}
                  accentColour={DEMOS[activeDemo].accentColour}
                  businessName={DEMOS[activeDemo].businessName}
                  placeholder={DEMOS[activeDemo].placeholder}
                />
                <p className="font-display text-[10px] tracking-widest uppercase text-fd-muted mt-3 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-green-400" />
                  Live — powered by Claude
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 px-6 md:px-10 border-b border-fd-border bg-fd-surface">
        <div className="max-w-7xl mx-auto">
          <p className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange mb-14">
            How It Works
          </p>
          <div className="grid md:grid-cols-3 gap-0 border border-fd-border">
            {[
              {
                n: "01",
                title: "We learn your business",
                body: "You tell us about your services, tone, FAQs, opening hours — anything a great employee would know. We shape the AI's knowledge around it.",
              },
              {
                n: "02",
                title: "We build & tune it",
                body: "The widget is embedded into your site with your brand colours and personality. We test hundreds of real-world conversations before launch.",
              },
              {
                n: "03",
                title: "It works while you sleep",
                body: "Customers get instant answers at 3am. Leads are captured automatically. You wake up to qualified enquiries, not missed calls.",
              },
            ].map(({ n, title, body }) => (
              <div
                key={n}
                className="p-10 border-r border-fd-border last:border-r-0 group hover:bg-fd-card transition-colors duration-300"
              >
                <p className="font-display font-extrabold text-5xl text-fd-border group-hover:text-fd-orange transition-colors duration-500 mb-6">
                  {n}
                </p>
                <h3 className="font-display font-bold text-lg text-fd-white mb-3">{title}</h3>
                <p className="font-body text-sm text-fd-dim leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Build Your Own ── */}
      <section className="py-24 px-6 md:px-10 border-b border-fd-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VP}
            transition={{ duration: 0.6, ease: EXPO }}
            className="mb-14"
          >
            <p className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange mb-3">
              Try It
            </p>
            <h2
              className="font-display font-extrabold leading-none tracking-tightest text-fd-white"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              AS YOUR BUSINESS.
            </h2>
            <p className="font-body text-fd-dim mt-5 max-w-xl leading-relaxed">
              Fill in a few details about your business and we'll spin up a live demo tailored specifically to you — right now.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VP}
            transition={{ duration: 0.8, ease: EXPO }}
            className="grid lg:grid-cols-2 gap-12 items-start"
          >
            {/* Left: form */}
            <AnimatePresence mode="wait">
              {step === "form" ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleBuild}
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-display font-semibold text-xs tracking-widest uppercase text-fd-muted mb-2 block">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Joe's Bakery"
                        value={configForm.businessName}
                        onChange={(e) => setConfigForm({ ...configForm, businessName: e.target.value })}
                        className="w-full bg-fd-surface border border-fd-border text-fd-white placeholder:text-fd-muted font-body text-sm px-5 py-4 focus:outline-none focus:border-fd-orange transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="font-display font-semibold text-xs tracking-widest uppercase text-fd-muted mb-2 block">
                        Industry *
                      </label>
                      <select
                        required
                        value={configForm.industry}
                        onChange={(e) => setConfigForm({ ...configForm, industry: e.target.value })}
                        className="w-full bg-fd-surface border border-fd-border text-fd-white font-body text-sm px-5 py-4 focus:outline-none focus:border-fd-orange transition-colors duration-200 appearance-none"
                      >
                        <option value="" className="bg-fd-card">Select industry…</option>
                        {INDUSTRIES.map((ind) => (
                          <option key={ind} value={ind} className="bg-fd-card">{ind}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-display font-semibold text-xs tracking-widest uppercase text-fd-muted mb-2 block">
                      What do you offer?
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. custom cakes, wedding catering, corporate events"
                      value={configForm.services}
                      onChange={(e) => setConfigForm({ ...configForm, services: e.target.value })}
                      className="w-full bg-fd-surface border border-fd-border text-fd-white placeholder:text-fd-muted font-body text-sm px-5 py-4 focus:outline-none focus:border-fd-orange transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label className="font-display font-semibold text-xs tracking-widest uppercase text-fd-muted mb-2 block">
                      Key info (prices, location, hours, etc.)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Based in Manchester. Orders from £40. 48hr notice required."
                      value={configForm.keyInfo}
                      onChange={(e) => setConfigForm({ ...configForm, keyInfo: e.target.value })}
                      className="w-full bg-fd-surface border border-fd-border text-fd-white placeholder:text-fd-muted font-body text-sm px-5 py-4 focus:outline-none focus:border-fd-orange transition-colors duration-200 resize-none"
                    />
                  </div>

                  <div>
                    <label className="font-display font-semibold text-xs tracking-widest uppercase text-fd-muted mb-3 block">
                      Tone of voice
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TONE_OPTIONS.map((t) => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => setConfigForm({ ...configForm, tone: t.value })}
                          className={`font-display font-semibold text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
                            configForm.tone === t.value
                              ? "bg-fd-orange text-fd-black border-fd-orange"
                              : "text-fd-muted border-fd-border hover:border-fd-orange/50"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-display font-semibold text-xs tracking-widest uppercase text-fd-muted mb-3 block">
                      Widget colour
                    </label>
                    <div className="flex gap-2">
                      {ACCENT_OPTIONS.map((a) => (
                        <button
                          key={a.value}
                          type="button"
                          onClick={() => setCustomAccent(a.value)}
                          className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                            customAccent === a.value ? "border-white scale-110" : "border-transparent"
                          }`}
                          style={{ background: a.value }}
                          title={a.label}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="font-display font-bold text-sm tracking-widest uppercase bg-fd-orange text-fd-black px-10 py-4 hover:bg-fd-white transition-colors duration-300 flex items-center gap-3"
                  >
                    Build My Widget <span>→</span>
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="reset"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="p-6 border border-fd-border bg-fd-surface">
                    <p className="font-display font-semibold text-xs tracking-widest uppercase text-fd-orange mb-2">
                      Your widget is live
                    </p>
                    <p className="font-display font-bold text-xl text-fd-white">{configForm.businessName}</p>
                    <p className="font-body text-sm text-fd-dim mt-1">{configForm.industry}</p>
                  </div>
                  <button
                    onClick={() => setStep("form")}
                    className="font-display font-semibold text-xs tracking-widest uppercase text-fd-muted border border-fd-border px-6 py-3 hover:border-fd-orange hover:text-fd-white transition-all duration-200"
                  >
                    ← Start Over
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Right: live widget */}
            <div>
              <AnimatePresence mode="wait">
                {step === "chat" ? (
                  <motion.div
                    key="custom"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EXPO }}
                  >
                    <ConfiguratorWidget
                      systemPrompt={customSystem}
                      businessName={configForm.businessName}
                      accentColour={customAccent}
                    />
                    <p className="font-display text-[10px] tracking-widest uppercase text-fd-muted mt-3 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-green-400" />
                      Your personalised AI — live
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border border-dashed border-fd-border flex flex-col items-center justify-center text-center p-16"
                    style={{ height: 420 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-fd-surface border border-fd-border flex items-center justify-center mb-5">
                      <span className="text-2xl">✦</span>
                    </div>
                    <p className="font-display font-bold text-fd-white mb-2">Your widget will appear here</p>
                    <p className="font-body text-sm text-fd-muted">Fill in the form and hit "Build My Widget"</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 md:px-10 border-t border-fd-border bg-fd-surface">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="font-display font-extrabold leading-none tracking-tightest text-fd-white mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            WANT ONE FOR<br /><span className="text-stroke-orange">YOUR SITE?</span>
          </h2>
          <p className="font-body text-fd-dim mb-10 leading-relaxed max-w-xl mx-auto">
            We include AI widgets as part of our web packages — or as an add-on to any existing site.
            Every widget is built custom, not templated.
          </p>
          <Link
            href="/contact"
            className="font-display font-bold text-xs tracking-widest uppercase bg-fd-orange text-fd-black px-10 py-4 hover:bg-fd-white transition-colors duration-300 inline-flex items-center gap-3"
          >
            Talk to us about AI <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
