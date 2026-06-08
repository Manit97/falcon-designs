import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import Cursor from "@/components/Cursor";
import BurgerMenu from "@/components/BurgerMenu";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Falcon Designs — World-Class Web Design & AI Solutions",
  description: "We build beautiful, high-performing websites and AI tools for ambitious brands. Based in London.",
  keywords: "web design, next.js, AI solutions, web development, London",
  metadataBase: new URL("https://falcondesigns.co.uk"),
  openGraph: {
    title: "Falcon Designs — World-Class Web Design & AI Solutions",
    description: "Beautiful websites and AI tools that convert.",
    type: "website",
    url: "https://falcondesigns.co.uk",
    siteName: "Falcon Designs",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Falcon Designs — Web Design & AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Falcon Designs — World-Class Web Design & AI Solutions",
    description: "Beautiful websites and AI tools that convert.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable} antialiased`}>
      <body className="bg-fd-black text-fd-white font-body grain">
        <Cursor />
        <BurgerMenu />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
