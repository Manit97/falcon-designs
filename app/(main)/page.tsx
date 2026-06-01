import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import WorkTeaser from "@/components/home/WorkTeaser";
import Stats from "@/components/home/Stats";
import AITeaser from "@/components/home/AITeaser";
import ContactCTA from "@/components/home/ContactCTA";
import Marquee from "@/components/Marquee";

const MARQUEE_ITEMS = [
  "Web Design",
  "Next.js Development",
  "AI Agents",
  "Falcon Designs",
  "Scroll Animations",
  "Results-Driven",
  "London",
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={MARQUEE_ITEMS} variant="orange" speed="fast" />
      <Services />
      <WorkTeaser />
      <Stats />
      <Marquee items={MARQUEE_ITEMS} variant="border" speed="slow" reverse />
      <AITeaser />
      <ContactCTA />
    </>
  );
}
