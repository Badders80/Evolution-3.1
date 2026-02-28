'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const words = text.split(' ');
  
  // Start animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 1000 + delay * 100);
    
    return () => clearTimeout(timer);
  }, [delay]);

  // Trigger wave animation randomly every 5-15 seconds
  useEffect(() => {
    if (!isAnimating) return;

    let timer: ReturnType<typeof setTimeout>;

    const scheduleAnimation = () => {
      const randomDelay = 5000 + Math.random() * 10000; // 5-15 seconds
      timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => setIsAnimating(true), 100);
        scheduleAnimation();
      }, randomDelay);
    };

    scheduleAnimation();

    return () => clearTimeout(timer);
  }, [isAnimating]);

  return (
    <div className={`flex flex-wrap justify-center ${className}`}>
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="flex">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              className={`inline-block ${
                (text.includes('innovation') || text.includes('passion') || text.includes('digital-syndication')) 
                  ? 'text-primary' 
                  : 'text-white'
              }`}
              animate={isAnimating ? {
                y: [0, -10, 0],
                scale: [1, 1.2, 1],
                textShadow: [
                  '0 0 0px rgba(255,255,255,0)',
                  '0 0 10px rgba(212, 175, 55, 0.8)',
                  '0 0 0px rgba(255,255,255,0)'
                ]
              } : {}}
              transition={{
                delay: wordIndex * 0.05 + charIndex * 0.01,
                duration: 0.5,
                ease: 'easeInOut',
                times: [0, 0.5, 1]
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && <span className="w-2" />}
        </div>
      ))}
    </div>
  );
}

export default AnimatedText;

