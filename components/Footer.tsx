import Link from "next/link";

const LINKS = [
  { label: "Showcase",  href: "/showcase" },
  { label: "Pricing",   href: "/pricing" },
  { label: "AI Widget", href: "/ai-widget" },
  { label: "About",     href: "/about" },
  { label: "Contact",   href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-fd-black border-t border-fd-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-fd-orange" />
            <span className="font-display font-bold text-base tracking-widest uppercase">
              Falcon<span className="text-fd-orange">.</span>
            </span>
          </div>
          <p className="font-body text-sm text-fd-muted leading-relaxed max-w-[240px]">
            Building world-class websites and AI tools for ambitious brands.
          </p>
        </div>

        {/* Links */}
        <div>
          <p className="font-display font-semibold text-xs tracking-widest uppercase text-fd-muted mb-5">Navigation</p>
          <nav className="flex flex-col gap-3">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="font-body text-sm text-fd-dim hover:text-fd-white transition-colors duration-200">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <p className="font-display font-semibold text-xs tracking-widest uppercase text-fd-muted mb-5">Get In Touch</p>
          <a href="mailto:falcondesigns001@gmail.com" className="font-body text-sm text-fd-dim hover:text-fd-orange transition-colors duration-200 block mb-2">
            falcondesigns001@gmail.com
          </a>
          <p className="font-body text-sm text-fd-muted">London, UK</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-fd-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-fd-muted">© 2026 Falcon Designs. All rights reserved.</p>
          <p className="font-body text-xs text-fd-muted">
            Built with <span className="text-fd-orange">Next.js</span> · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
