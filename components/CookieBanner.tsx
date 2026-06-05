"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-fd-surface border-t border-fd-border"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <p className="font-body text-sm text-fd-white mb-2">
                <span className="font-semibold">Privacy &amp; Cookies</span>
              </p>
              <p className="font-body text-xs text-fd-dim">
                We use cookies to enhance your experience and analyze site usage. By clicking &quot;Accept&quot;, you consent to our{" "}
                <a href="/privacy" className="text-fd-orange hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={handleDecline}
                className="font-display font-semibold text-xs tracking-widest uppercase px-4 py-2 border border-fd-border text-fd-dim hover:text-fd-white transition-colors duration-200"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="font-display font-semibold text-xs tracking-widest uppercase px-4 py-2 bg-fd-orange text-fd-black hover:bg-fd-white transition-colors duration-200"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
