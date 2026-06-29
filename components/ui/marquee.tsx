"use client";
import React, { ComponentPropsWithoutRef, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  duration?: string;
  gap?: string;
  ariaLabel?: string;
  ariaLive?: 'off' | 'polite' | 'assertive';
  ariaRole?: string;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  duration = '40s',
  gap = '1rem',
  ariaLabel,
  ariaLive = 'off',
  ariaRole = 'marquee',
  ...props
}: MarqueeProps) {
  const [paused, setPaused] = useState(false);

  const trackStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: vertical ? 'column' : 'row',
    gap,
    flexShrink: 0,
    animation: vertical
      ? `marquee-vertical ${duration} linear infinite`
      : `marquee ${duration} linear infinite`,
    animationDirection: reverse ? 'reverse' : 'normal',
    animationPlayState: paused ? 'paused' : 'running',
    willChange: 'transform',
  };

  return (
    <div
      {...props}
      data-slot="marquee"
      className={cn('flex overflow-hidden', vertical ? 'flex-col' : 'flex-row', className)}
      aria-label={ariaLabel}
      aria-live={ariaLive}
      role={ariaRole}
      tabIndex={0}
      onMouseEnter={pauseOnHover ? () => setPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setPaused(false) : undefined}
      style={{ gap, ...props.style }}
    >
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-100% - ${gap})); }
        }
        @keyframes marquee-vertical {
          from { transform: translateY(0); }
          to   { transform: translateY(calc(-100% - ${gap})); }
        }
      `}</style>
      {Array.from({ length: repeat }, (_, i) => (
        <div key={i} style={trackStyle}>
          {children}
        </div>
      ))}
    </div>
  );
}
