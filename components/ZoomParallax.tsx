'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

const IMAGES = [
  { src: '/tmpl-webgl.png',        alt: 'WebGL Interactive Experience' },
  { src: '/tmpl-jewellery.png',    alt: 'Fine Jewellery Store'         },
  { src: '/tmpl-photography.png',  alt: 'Photography Studio'           },
  { src: '/tmpl-trades.png',       alt: 'Trades & Services'            },
  { src: '/tmpl-videographer.png', alt: 'Videographer Portfolio'       },
  { src: '/after-website.png',     alt: 'Website Rebuild'              },
];

// Per-image position overrides (mirrors the original layout)
const POSITIONS = [
  '',                                                                                    // 0 — centre
  '[&>div]:!-top-[30vh] [&>div]:!left-[5vw]   [&>div]:!h-[30vh] [&>div]:!w-[35vw]',  // 1
  '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]',  // 2
  '[&>div]:!left-[27.5vw]                      [&>div]:!h-[25vh] [&>div]:!w-[25vw]',  // 3
  '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw]  [&>div]:!h-[25vh] [&>div]:!w-[20vw]',  // 4
  '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]', // 5
];

export function ZoomParallax() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8];

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: '#080808' }}>

        {/* Grid lines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Radial orange glow — centre */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(249,115,22,0.07) 0%, transparent 70%)',
          }}
        />

        {/* Template images */}
        {IMAGES.map(({ src, alt }, i) => (
          <motion.div
            key={i}
            style={{ scale: scales[i] }}
            className={`absolute inset-0 flex items-center justify-center ${POSITIONS[i] ?? ''}`}
          >
            <div className="relative h-[25vh] w-[25vw]">
              <img
                src={src}
                alt={alt}
                className="h-full w-full object-cover object-top"
                style={{
                  border: '1px solid rgba(249,115,22,0.18)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.7)',
                }}
                draggable={false}
              />
            </div>
          </motion.div>
        ))}

      </div>
    </div>
  );
}
