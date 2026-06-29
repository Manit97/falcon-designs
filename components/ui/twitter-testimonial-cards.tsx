"use client";

import { useState } from "react";

interface TestimonialCardProps {
  className?: string;
  avatar?: string;
  username?: string;
  handle?: string;
  content?: string;
  date?: string;
  verified?: boolean;
  likes?: number;
  retweets?: number;
  tweetUrl?: string;
  onHover?: () => void;
  onLeave?: () => void;
  isActive?: boolean;
  onTap?: () => void;
  translateX?: string;
  translateY?: string;
  grayscale?: boolean;
  fillWidth?: boolean;
}

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function VerifiedBadge() {
  return (
    <svg width="15" height="15" viewBox="0 0 22 22" fill="#1d9bf0">
      <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
    </svg>
  );
}

function TestimonialCard({
  avatar,
  username = "User",
  handle = "@user",
  content = "",
  date = "",
  verified = true,
  likes = 0,
  retweets = 0,
  tweetUrl = "https://x.com",
  onHover,
  onLeave,
  isActive,
  onTap,
  translateX = "0px",
  translateY = "0px",
  grayscale = false,
  fillWidth = false,
}: TestimonialCardProps) {
  const [hovered, setHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice && !isActive) { e.preventDefault(); onTap?.(); }
  };

  const isRevealed = hovered || isActive;

  return (
    <a
      href={tweetUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      onMouseEnter={() => { setHovered(true); onHover?.(); }}
      onMouseLeave={() => { setHovered(false); onLeave?.(); }}
      style={{
        gridArea: "stack",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: fillWidth ? "100%" : 320,
        minHeight: 160,
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(30,26,22,0.92)",
        backdropFilter: "blur(8px)",
        padding: "16px 18px",
        gap: 10,
        cursor: "pointer",
        textDecoration: "none",
        transform: `skewY(-8deg) translateX(${translateX}) translateY(${translateY})`,
        transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), filter 0.5s ease",
        filter: grayscale && !isRevealed ? "grayscale(1) brightness(0.5)" : "none",
        willChange: "transform",
      }}
    >
      {/* Overlay that fades out on hover for back cards */}
      {grayscale && (
        <div style={{
          position: "absolute", inset: 0, borderRadius: 16,
          background: "rgba(20,18,16,0.55)",
          opacity: isRevealed ? 0 : 1,
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
        }} />
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          overflow: "hidden", flexShrink: 0,
          background: "#2a2420",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {avatar
            ? <img src={avatar} alt={username} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <span style={{ fontSize: 20 }}>👤</span>
          }
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontFamily: "'DM Sans','Inter',sans-serif", fontWeight: 700, fontSize: "0.88rem", color: "#f5f0e8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{username}</span>
            {verified && <VerifiedBadge />}
          </div>
          <span style={{ fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.72rem", color: "rgba(245,240,232,0.45)" }}>{handle}</span>
        </div>
        <span style={{ color: "rgba(245,240,232,0.5)", flexShrink: 0 }}><TwitterIcon /></span>
      </div>

      {/* Content */}
      <p style={{
        fontFamily: "'DM Sans','Inter',sans-serif",
        fontSize: "0.85rem",
        lineHeight: 1.65,
        color: "rgba(245,240,232,0.85)",
        margin: 0,
        display: "-webkit-box",
        WebkitLineClamp: 4,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}>{content}</p>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
        <span style={{ fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.68rem", color: "rgba(245,240,232,0.35)" }}>{date}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.7rem", color: "rgba(245,240,232,0.4)" }}>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            {likes}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "'DM Sans','Inter',sans-serif", fontSize: "0.7rem", color: "rgba(245,240,232,0.4)" }}>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
            {retweets}
          </span>
        </div>
      </div>
    </a>
  );
}

const defaultCards: Omit<TestimonialCardProps, "onHover" | "onLeave" | "isActive" | "onTap">[] = [
  {
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    username: "Sarah Chen",
    handle: "@sarahchen_ux",
    content: "Falcon Studio cut our project handover time in half. Clients update content themselves without breaking anything — worth every penny.",
    date: "Jan 3, 2026",
    verified: true,
    likes: 42,
    retweets: 8,
    tweetUrl: "https://x.com",
    translateX: "0px",
    translateY: "0px",
    grayscale: true,
  },
  {
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    username: "Mike Johnson",
    handle: "@mikej_dev",
    content: "The scroll-driven animation toolkit is insane. Prototyped a full agency showcase in a weekend. Would've taken 3 weeks before.",
    date: "Jan 2, 2026",
    verified: true,
    likes: 28,
    retweets: 5,
    tweetUrl: "https://x.com",
    translateX: "40px",
    translateY: "32px",
    grayscale: true,
  },
  {
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    username: "Alex Rivera",
    handle: "@alexrivera",
    content: "Finally a builder that respects design. Templates are actually production-ready, not just pretty mockups. 10/10.",
    date: "Jan 1, 2026",
    verified: true,
    likes: 156,
    retweets: 23,
    tweetUrl: "https://x.com",
    translateX: "80px",
    translateY: "64px",
    grayscale: false,
  },
];

interface TwitterTestimonialsProps {
  cards?: typeof defaultCards;
  fillWidth?: boolean;
}

export default function TwitterTestimonials({ cards, fillWidth = false }: TwitterTestimonialsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const displayCards = cards || defaultCards;
  const focused = hoveredIndex ?? activeIndex;

  // Tighter offsets when filling width so cards don't pop out of container
  const getTranslate = (index: number, base: { x: string; y: string }) => {
    if (fillWidth) {
      if (focused === 0 && index === 1) return { x: "0px", y: "190px" };
      if (focused === 0 && index === 2) return { x: "0px", y: "380px" };
      if (focused === 1 && index === 2) return { x: "0px", y: "190px" };
    } else {
      if (focused === 0 && index === 1) return { x: "40px", y: "110px" };
      if (focused === 0 && index === 2) return { x: "80px", y: "210px" };
      if (focused === 1 && index === 2) return { x: "80px", y: "170px" };
    }
    return base;
  };

  return (
    <div style={{
      display: "grid",
      gridTemplateAreas: "'stack'",
      placeItems: "start center",
      width: fillWidth ? "100%" : 320,
      height: fillWidth ? "100%" : 260,
    }}>
      {displayCards.map((card, index) => {
        const base = { x: fillWidth ? "0px" : (card.translateX ?? "0px"), y: card.translateY ?? "0px" };
        const t = getTranslate(index, base);
        return (
          <TestimonialCard
            key={index}
            {...card}
            translateX={t.x}
            translateY={t.y}
            fillWidth={fillWidth}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
            isActive={activeIndex === index}
            onTap={() => setActiveIndex(index)}
          />
        );
      })}
    </div>
  );
}

export { TestimonialCard, TwitterTestimonials };
export type { TestimonialCardProps, TwitterTestimonialsProps };
