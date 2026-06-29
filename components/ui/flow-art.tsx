'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── FlowSection ─────────────────────────────────────────────────────────── */
export interface FlowSectionProps {
  style?: React.CSSProperties;
  children: React.ReactNode;
  'aria-label'?: string;
}

export const FlowSection: React.FC<FlowSectionProps> = ({
  style = {},
  children,
  'aria-label': ariaLabel,
}) => (
  <section
    data-flow-section
    aria-label={ariaLabel}
    style={{
      /* CSS sticky replaces GSAP pin — fully contained to its parent column */
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflow: 'hidden',
      zIndex: 0, /* overridden per-section by GSAP */
    }}
  >
    <div
      className="flow-art-container"
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '1.5rem',
        padding: 'clamp(2rem,8vw,4vw) 4vw 4vw',
        transformOrigin: 'bottom left',
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </div>
  </section>
);

/* ─── FlowArt ─────────────────────────────────────────────────────────────── */
export interface FlowArtProps {
  children: React.ReactNode;
  'aria-label'?: string;
  style?: React.CSSProperties;
}

const FlowArt: React.FC<FlowArtProps> = ({
  children,
  'aria-label': ariaLabel = 'Story scroll',
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = Array.from(
      container.querySelectorAll<HTMLElement>('[data-flow-section]'),
    );
    if (sections.length === 0) return;

    const tweens: gsap.core.Tween[] = [];

    sections.forEach((section, i) => {
      /* Stack later sections on top */
      gsap.set(section, { zIndex: i + 1 });

      const inner = section.querySelector<HTMLElement>('.flow-art-container');
      if (!inner) return;

      if (i > 0) {
        /* Start rotated, scrub to 0 as section scrolls into view */
        gsap.set(inner, { rotation: 30, transformOrigin: 'bottom left' });
        tweens.push(
          gsap.to(inner, {
            rotation: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top 25%',
              scrub: true,
            },
          }),
        );
      }
    });

    ScrollTrigger.refresh();

    return () => {
      tweens.forEach((t) => t.scrollTrigger?.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-label={ariaLabel}
      style={{ width: '100%', ...style }}
    >
      {children}
    </div>
  );
};

export default FlowArt;
