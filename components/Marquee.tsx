interface MarqueeProps {
  items: string[];
  speed?: "fast" | "slow";
  reverse?: boolean;
  variant?: "orange" | "dark" | "border";
}

export default function Marquee({
  items,
  speed = "fast",
  reverse = false,
  variant = "orange",
}: MarqueeProps) {
  const repeated = [...items, ...items, ...items, ...items]; // duplicate for seamless loop
  const trackClass = speed === "slow" ? "marquee-track-slow" : "marquee-track";

  const bg =
    variant === "orange" ? "bg-fd-orange"
    : variant === "border" ? "bg-transparent border-y border-fd-border"
    : "bg-fd-surface";

  const textColor =
    variant === "orange" ? "text-fd-black"
    : "text-fd-dim";

  const sep =
    variant === "orange" ? "·" : "—";

  return (
    <div className={`overflow-hidden py-4 ${bg}`}>
      <div className={`${trackClass} ${reverse ? "marquee-reverse" : ""}`}>
        {repeated.map((item, i) => (
          <span
            key={i}
            className={`flex items-center gap-6 px-6 font-display font-semibold text-sm tracking-widest2 uppercase whitespace-nowrap ${textColor}`}
          >
            {item}
            <span className="opacity-50">{sep}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
