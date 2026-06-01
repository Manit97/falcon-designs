"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-fd-black/90 backdrop-blur-xl border-b border-fd-border"
          : "bg-fd-black/40 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-2 h-2 rounded-full bg-fd-orange group-hover:scale-150 transition-transform duration-300" />
          <span className="font-display font-bold text-base tracking-widest uppercase text-fd-white">
            Falcon<span className="text-fd-orange">.</span>
          </span>
        </Link>

        {/* Let's Talk — desktop, leaves space for the floating burger on the right */}
        <Link
          href="/contact"
          className="hidden md:block font-display font-semibold text-xs tracking-widest uppercase bg-fd-orange text-fd-black px-5 py-2.5 hover:bg-fd-white transition-colors duration-300 mr-16"
        >
          Let&apos;s Talk
        </Link>
      </div>
    </header>
  );
}
