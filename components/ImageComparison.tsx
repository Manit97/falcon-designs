"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface ImageComparisonProps {
  beforeImage: string;
  afterImage: string;
  altBefore?: string;
  altAfter?: string;
}

export function ImageComparison({
  beforeImage,
  afterImage,
  altBefore = "Before",
  altAfter = "After",
}: ImageComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newPosition = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      setSliderPosition(newPosition);
    },
    [isDragging]
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp   = useCallback(() => setIsDragging(false), []);
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleTouchStart = () => setIsDragging(true);
  const handleTouchEnd   = () => setIsDragging(false);
  const handleTouchMove  = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none overflow-hidden"
      style={{ cursor: isDragging ? "ew-resize" : "default" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Before label */}
      <div className="absolute top-4 left-4 z-20">
        <span className="font-display font-bold text-[10px] tracking-widest uppercase bg-black px-3 py-1.5 text-fd-orange">
          Before
        </span>
      </div>

      {/* After label */}
      <div className="absolute top-4 right-4 z-20">
        <span className="font-display font-bold text-[10px] tracking-widest uppercase bg-black px-3 py-1.5 text-fd-orange">
          After
        </span>
      </div>

      {/* After image (clipped) */}
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
      </div>

      {/* Before image (base layer) */}
      <img
        src={beforeImage}
        alt={altBefore}
        className="block w-full object-cover object-left-top"
        draggable={false}
      />

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/70 z-10 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      />

      {/* Drag handle */}
      <div
        className="absolute top-0 bottom-0 z-20 flex items-center justify-center"
        style={{ left: `calc(${sliderPosition}% - 22px)`, width: 44 }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className={`
            bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-xl
            transition-transform duration-150 cursor-ew-resize border border-white/20
            ${isDragging ? "scale-110 shadow-2xl" : "scale-100"}
          `}
        >
          {/* Double-arrow chevron */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 15 12 9 6" transform="translate(0,0)" />
          </svg>
        </div>
      </div>
    </div>
  );
}
