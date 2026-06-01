"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const LINKS = [
  { label: "Showcase",  href: "/showcase",  num: "01" },
  { label: "AI Widget", href: "/ai-widget", num: "02" },
  { label: "About",     href: "/about",     num: "03" },
  { label: "Contact",   href: "/contact",   num: "04" },
];

const EXPO = [0.16, 1, 0.3, 1] as const;

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Floating square button — always on screen ───────────────────── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="fixed top-4 right-5 md:top-5 md:right-8 z-[90] w-11 h-11 flex flex-col justify-center items-center gap-[5px] bg-fd-card border border-fd-border hover:border-fd-orange transition-colors duration-300"
      >
        {/* Line 1 — white, rotates to top arm of X */}
        <motion.span
          className="block h-px origin-center"
          animate={{
            rotate:          open ? 45  : 0,
            y:               open ? 6   : 0,
            backgroundColor: open ? "#f97316" : "#ffffff",
            width:           20,
          }}
          transition={{ duration: 0.35, ease: EXPO }}
        />
        {/* Line 2 — orange, shorter, fades out on open */}
        <motion.span
          className="block h-px bg-fd-orange origin-center"
          animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
          transition={{ duration: 0.18 }}
          style={{ width: 13 }}
        />
        {/* Line 3 — white, rotates to bottom arm of X */}
        <motion.span
          className="block h-px origin-center"
          animate={{
            rotate:          open ? -45 : 0,
            y:               open ? -6  : 0,
            backgroundColor: open ? "#f97316" : "#ffffff",
            width:           20,
          }}
          transition={{ duration: 0.35, ease: EXPO }}
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
              {/* Top spacer — clears the floating burger button */}
              <div className="px-10 pt-20 pb-4 flex-shrink-0">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="font-display font-semibold text-[10px] tracking-widest3 uppercase text-fd-muted"
                >
                  Navigation
                </motion.span>
              </div>

              {/* Nav links */}
              <nav className="flex-1 flex flex-col justify-center px-10">
                {LINKS.map((link, i) => (
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
                      className="group flex items-center py-5 border-b border-fd-border hover:border-fd-orange/60 transition-colors duration-300 gap-5"
                    >
                      <span className="font-display text-[10px] tracking-widest text-fd-muted group-hover:text-fd-orange transition-colors duration-300 w-8 flex-shrink-0">
                        {link.num}
                      </span>

                      <motion.span
                        whileHover={{ scale: 1.05, x: 8 }}
                        transition={{ duration: 0.28, ease: EXPO }}
                        className="flex-1 font-display font-extrabold text-fd-white group-hover:text-fd-orange transition-colors duration-300 leading-none"
                        style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
                      >
                        {link.label}
                      </motion.span>

                      <span className="font-display text-lg text-fd-muted group-hover:text-fd-orange opacity-0 group-hover:opacity-100 transition-all duration-200 ml-2">
                        ↗
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Footer */}
              <div className="px-10 py-8 border-t border-fd-border flex-shrink-0 space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: EXPO }}
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
                  transition={{ delay: 0.42 }}
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
