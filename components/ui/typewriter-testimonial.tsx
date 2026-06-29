'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Testimonial = {
  image: string;
  text: string;
  name: string;
  jobtitle: string;
};

type TypewriterTestimonialProps = {
  testimonials: Testimonial[];
  large?: boolean;
};

export const TypewriterTestimonial: React.FC<TypewriterTestimonialProps> = ({ testimonials, large = false }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hasBeenHovered, setHasBeenHovered] = useState<boolean[]>(
    new Array(testimonials.length).fill(false)
  );
  const [typedText, setTypedText] = useState('');
  const typewriterTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startTypewriter = useCallback((text: string) => {
    if (typewriterTimeoutRef.current) clearTimeout(typewriterTimeoutRef.current);
    setTypedText('');
    let i = 0;
    const type = () => {
      if (i <= text.length) {
        setTypedText(text.slice(0, i));
        i++;
        typewriterTimeoutRef.current = setTimeout(type, 30);
      }
    };
    type();
  }, []);

  const stopTypewriter = useCallback(() => {
    if (typewriterTimeoutRef.current) clearTimeout(typewriterTimeoutRef.current);
    setTypedText('');
  }, []);

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredIndex(index);
    setHasBeenHovered(prev => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
    startTypewriter(testimonials[index].text);
  }, [testimonials, startTypewriter]);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    stopTypewriter();
  }, [stopTypewriter]);

  useEffect(() => () => stopTypewriter(), [stopTypewriter]);

  const avatarSize = large ? 88 : 52;
  const popupWidth = large ? 260 : 200;
  const popupHeight = large ? 96 : 72;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: large ? '2rem' : '1rem', flexWrap: 'wrap' }}>
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.img
            src={testimonial.image}
            alt={testimonial.name}
            style={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: '50%',
              objectFit: 'cover',
              border: `${large ? 4 : 3}px solid`,
              display: 'block',
            }}
            animate={{
              borderColor: (hoveredIndex === index || hasBeenHovered[index])
                ? '#8b2500'
                : 'rgba(196,189,176,0.4)',
            }}
            transition={{ duration: 0.3 }}
          />

          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: -16 }}
                exit={{ opacity: 0, scale: 0.85, y: -8 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#f0ebe0',
                  borderRadius: 10,
                  padding: '12px 14px',
                  width: popupWidth,
                  boxShadow: '0 8px 32px rgba(28,24,20,0.25)',
                  border: '1px solid #c4bdb0',
                  zIndex: 50,
                  marginBottom: 8,
                }}
              >
                <div style={{ height: popupHeight, overflow: 'hidden', fontFamily: "'Playfair Display','Georgia',serif", fontStyle: 'italic', fontSize: large ? '0.82rem' : '0.72rem', lineHeight: 1.65, color: '#4a4540' }}>
                  {typedText}<span style={{ animation: 'blink 1s step-end infinite', fontStyle: 'normal' }}>|</span>
                </div>
                <p style={{ marginTop: 8, textAlign: 'right', fontFamily: "'DM Sans','Inter',sans-serif", fontWeight: 700, fontSize: '0.72rem', color: '#1c1814' }}>{testimonial.name}</p>
                <p style={{ textAlign: 'right', fontFamily: "'DM Sans','Inter',sans-serif", fontSize: '0.65rem', color: '#8a8278' }}>{testimonial.jobtitle}</p>
                {/* Tail */}
                <div style={{ position: 'absolute', left: '50%', bottom: -10, transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <div style={{ width: 8, height: 8, background: '#f0ebe0', borderRadius: '50%', boxShadow: '0 2px 4px rgba(28,24,20,0.15)', border: '1px solid #c4bdb0' }} />
                  <div style={{ width: 5, height: 5, background: '#f0ebe0', borderRadius: '50%', border: '1px solid #c4bdb0' }} />
                  <div style={{ width: 3, height: 3, background: '#f0ebe0', borderRadius: '50%', border: '1px solid #c4bdb0' }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  );
};
