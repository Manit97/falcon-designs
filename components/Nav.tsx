"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Showcase",  href: "/showcase",  num: "01" },
  { label: "AI Widget", href: "/ai-widget", num: "02" },
  { label: "About",     href: "/about",     num: "03" },
  { label: "Contact",   href: "/contact",   num: "04" },
];

const EXPO = [0.16, 1, 0.3, 1] as const;

export default function Nav() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Top bar — logo only ─────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-fd-black/90 backdrop-blur-xl border-b border-fd-border"
            : "bg-fd-black/40 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-2 h-2 rounded-full bg-fd-orange group-hover:scale-150 transition-transform duration-300" />
            <span className="font-display font-bold text-base tracking-widest uppercase text-fd-white">
              Falcon<span className="text-fd-orange">.</span>
            </span>
          </Link>

          {/* Let's Talk — desktop only, sits next to floating burger */}
          <Link
            href="/contact"
            className="hidden md:block font-display font-semibold text-xs tracking-widest uppercase bg-fd-orange text-fd-black px-5 py-2.5 hover:bg-fd-white transition-colors duration-300 mr-16"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </header>

      {/* ── Floating burger — always visible, fixed top-right ───────────── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="fixed top-4 right-5 md:top-5 md:right-8 z-[80] flex flex-col justify-center items-center gap-[5px] w-11 h-11 bg-fd-card border border-fd-border hover:border-fd-orange transition-colors duration-300"
      >
        <motion.span
          animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
          transition={{ duration: 0.35, ease: EXPO }}
          className="block h-px bg-fd-white"
          style={{ width: 20 }}
        />
        <motion.span
          animate={{ opacity: open ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="block h-px bg-fd-orange"
          style={{ width: 14 }}
        />
        <motion.span
          animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
          transition={{ duration: 0.35, ease: EXPO }}
          className="block h-px bg-fd-white"
          style={{ width: 20 }}
        />
      </button>

      {/* ── Side panel ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.55, ease: EXPO }}
              className="fixed top-0 right-0 h-full w-full md:w-[480px] z-[70] bg-fd-card border-l border-fd-border flex flex-col overflow-hidden"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-10 pt-8 pb-6 border-b border-fd-border flex-shrink-0">
                <span className="font-display font-semibold text-[10px] tracking-widest3 uppercase text-fd-muted">
                  Navigation
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="font-display font-semibold text-[10px] tracking-widest uppercase text-fd-muted hover:text-fd-white border border-fd-border hover:border-fd-orange px-3 py-1.5 transition-all duration-200"
                >
                  Close ✕
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 flex flex-col justify-center px-10 gap-0">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 60 }}
                    transition={{ duration: 0.45, delay: i * 0.07, ease: EXPO }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between py-5 border-b border-fd-border hover:border-fd-orange/60 transition-colors duration-300"
                    >
                      <span className="font-display text-[10px] tracking-widest text-fd-muted group-hover:text-fd-orange transition-colors duration-300 w-8 flex-shrink-0">
                        {link.num}
                      </span>

                      <motion.span
                        whileHover={{ scale: 1.05, x: 8 }}
                        transition={{ duration: 0.3, ease: EXPO }}
                        className="flex-1 font-display font-extrabold text-fd-white group-hover:text-fd-orange transition-colors duration-300 leading-none"
                        style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
                      >
                        {link.label}
                      </motion.span>

                      <span className="font-display text-lg text-fd-muted group-hover:text-fd-orange transition-colors duration-300 ml-4 opacity-0 group-hover:opacity-100">
                        ↗
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Panel footer */}
              <div className="px-10 py-8 border-t border-fd-border flex-shrink-0 space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.32, ease: EXPO }}
                >
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between w-full bg-fd-orange text-fd-black px-6 py-4 hover:bg-fd-white transition-colors duration-300"
                  >
                    <span className="font-display font-bold text-sm tracking-widest uppercase">
                      Start a Project
                    </span>
                    <span className="font-display font-bold text-lg">→</span>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.42 }}
                  className="flex items-center justify-between"
                >
                  <a
                    href="mailto:falcondesigns001@gmail.com"
                    className="font-body text-xs text-fd-muted hover:text-fd-white transition-colors duration-200"
                  >
                    falcondesigns001@gmail.com
                  </a>
                  <span className="font-display text-[10px] tracking-widest uppercase text-fd-muted">
                    London, UK
                  </span>
                </motion.div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
