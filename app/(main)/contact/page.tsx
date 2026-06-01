"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import ParallaxLayer from "@/components/ParallaxLayer";

const EXPO = [0.16, 1, 0.3, 1] as const;
const VP   = { once: true, margin: "0px 0px -60px 0px" } as const;

const SERVICES = [
  "New Website", "Template Customisation", "AI Widget", "Dashboard / CRM", "Full Redesign", "Other"
];

export default function ContactPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [status,   setStatus]   = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form,     setForm]     = useState({ name: "", email: "", company: "", message: "" });

  const toggle = (s: string) =>
    setSelected((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, services: selected }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-fd-black pt-20">

      {/* ── Header ── */}
      <section className="py-28 px-6 md:px-10 border-b border-fd-border overflow-hidden relative">
        <ParallaxLayer
          className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          offset={80}
          style={{ background: "radial-gradient(circle at 80% 20%, rgba(249,115,22,0.1) 0%, transparent 60%)" }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EXPO }}
            className="font-display font-semibold text-xs tracking-widest3 uppercase text-fd-orange mb-5"
          >
            Get In Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: EXPO }}
            className="font-display font-extrabold leading-none tracking-tightest text-fd-white"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            LET&apos;S<br /><span className="text-stroke">TALK.</span>
          </motion.h1>
        </div>
      </section>

      {/* ── Form + details ── */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-20">

          {/* Left — details */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VP}
            transition={{ duration: 0.8, ease: EXPO }}
          >
            <div className="space-y-10">
              <div>
                <p className="font-display font-semibold text-xs tracking-widest uppercase text-fd-orange mb-4">Email</p>
                <a href="mailto:falcondesigns001@gmail.com"
                  className="font-body text-sm text-fd-dim hover:text-fd-white transition-colors duration-200">
                  falcondesigns001@gmail.com
                </a>
              </div>
              <div>
                <p className="font-display font-semibold text-xs tracking-widest uppercase text-fd-orange mb-4">Based In</p>
                <p className="font-body text-sm text-fd-dim">London, United Kingdom</p>
              </div>
              <div>
                <p className="font-display font-semibold text-xs tracking-widest uppercase text-fd-orange mb-4">Response Time</p>
                <p className="font-body text-sm text-fd-dim">Within 24 hours</p>
              </div>
              <div>
                <p className="font-display font-semibold text-xs tracking-widest uppercase text-fd-orange mb-4">Availability</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <p className="font-body text-sm text-fd-dim">Open to new projects</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VP}
            transition={{ duration: 0.9, delay: 0.1, ease: EXPO }}
          >
            {status === "sent" ? (
              <div className="text-center py-24">
                <div className="w-16 h-16 rounded-full bg-fd-orange/20 flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">✓</span>
                </div>
                <h2 className="font-display font-bold text-2xl text-fd-white mb-3">Message Sent.</h2>
                <p className="font-body text-fd-dim">We&apos;ll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { key: "name",    placeholder: "Your Name",    type: "text" },
                    { key: "email",   placeholder: "Email Address", type: "email" },
                  ].map(({ key, placeholder, type }) => (
                    <div key={key}>
                      <input
                        type={type}
                        placeholder={placeholder}
                        required
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full bg-fd-surface border border-fd-border text-fd-white placeholder:text-fd-muted font-body text-sm px-5 py-4 focus:outline-none focus:border-fd-orange transition-colors duration-200"
                      />
                    </div>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Company / Project Name (optional)"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full bg-fd-surface border border-fd-border text-fd-white placeholder:text-fd-muted font-body text-sm px-5 py-4 focus:outline-none focus:border-fd-orange transition-colors duration-200"
                />

                <div>
                  <p className="font-display font-semibold text-xs tracking-widest uppercase text-fd-muted mb-3">
                    I&apos;m interested in
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggle(s)}
                        className={`font-display font-semibold text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
                          selected.includes(s)
                            ? "bg-fd-orange text-fd-black border-fd-orange"
                            : "text-fd-muted border-fd-border hover:border-fd-orange/50 hover:text-fd-dim"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  placeholder="Tell us about your project — the more detail the better."
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-fd-surface border border-fd-border text-fd-white placeholder:text-fd-muted font-body text-sm px-5 py-4 focus:outline-none focus:border-fd-orange transition-colors duration-200 resize-none"
                />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="font-display font-bold text-sm tracking-widest uppercase bg-fd-orange text-fd-black px-10 py-4 hover:bg-fd-white transition-colors duration-300 disabled:opacity-50 flex items-center gap-3"
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                  {status !== "sending" && <span>→</span>}
                </button>

                {status === "error" && (
                  <p className="font-body text-sm text-red-400">
                    Something went wrong. Email us directly at falcondesigns001@gmail.com
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
