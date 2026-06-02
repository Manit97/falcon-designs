"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface ImageComparisonV2Props {
  beforeImage: string;
  afterImage: string;
  altBefore?: string;
  altAfter?: string;
}

export function ImageComparisonV2({
  beforeImage,
  afterImage,
  altBefore = "Before",
  altAfter = "After",
}: ImageComparisonV2Props) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setSliderPosition(Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100)));
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none overflow-hidden"
      style={{ cursor: isDragging ? "ew-resize" : "default" }}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseLeave={handleMouseUp}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleMouseUp}
    >
      {/* ── After image — base layer ── */}
      <img
        src={beforeImage}
        alt={altBefore}
        className="block w-full object-cover object-left-top"
        draggable={false}
      />

      {/* ── Before image — clipped ── */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={afterImage}
          alt={altAfter}
          className="block h-full w-full object-cover object-left-top"
          draggable={false}
        />
        {/* "BEFORE" watermark — fades in when left panel is wide */}
        <div
          className="absolute bottom-8 left-0 pointer-events-none"
          style={{
            width: `${sliderPosition}vw`,
            paddingLeft: 28,
            opacity: sliderPosition > 20 ? 1 : sliderPosition / 20,
            transition: "opacity 0.2s",
          }}
        >
          <span style={{
            fontFamily: "inherit",
            fontWeight: 900,
            fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
            letterSpacing: "0.22em",
            textTransform: "uppercase" as const,
            color: "#f97316",
            textShadow: "0 2px 12px rgba(0,0,0,0.7)",
          }}>
            Before
          </span>
        </div>
      </div>

      {/* ── "AFTER" watermark — right panel ── */}
      <div
        className="absolute bottom-8 right-7 pointer-events-none"
        style={{
          opacity: sliderPosition < 80 ? 1 : (100 - sliderPosition) / 20,
          transition: "opacity 0.2s",
        }}
      >
        <span style={{
          fontFamily: "inherit",
          fontWeight: 900,
          fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
          letterSpacing: "0.22em",
          textTransform: "uppercase" as const,
          color: "#f97316",
          textShadow: "0 2px 12px rgba(0,0,0,0.7)",
        }}>
          After
        </span>
      </div>

      {/* ── Glowing divider line ── */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          left: `${sliderPosition}%`,
          width: 2,
          background: "linear-gradient(to bottom, transparent 0%, #f97316 15%, #f97316 85%, transparent 100%)",
          boxShadow: "0 0 12px 2px rgba(249,115,22,0.45)",
        }}
      />

      {/* ── Drag handle ── */}
      <div
        className="absolute top-1/2 -translate-y-1/2 z-20 flex items-center"
        style={{ left: `calc(${sliderPosition}% - 20px)` }}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Left arrow */}
        <div style={{
          width: 20, height: 36,
          background: "#f97316",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "ew-resize",
        }}>
          <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
            <polyline points="7,1 2,7 7,13" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {/* Right arrow */}
        <div style={{
          width: 20, height: 36,
          background: "#f97316",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "ew-resize",
        }}>
          <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
            <polyline points="3,1 8,7 3,13" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
