'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface WaveTextProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightColor?: string;
}

export function WaveText({ 
  text, 
  className = '', 
  highlightWords = [],
  highlightColor = 'text-primary'
}: WaveTextProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const words = text.split(' ');
  
  // Start animation after component mounts
  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      setIsAnimating(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Trigger wave animation randomly every 5-15 seconds
  useEffect(() => {
    if (!isAnimating) return;
    
    let timer: NodeJS.Timeout;
    
    const animateRandomly = () => {
      const randomDelay = 5000 + Math.random() * 10000; // 5-15 seconds
      timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => setIsAnimating(true), 100);
        animateRandomly();
      }, randomDelay);
    };
    
    animateRandomly();
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isAnimating]);

  // Check if a word should be highlighted
  const shouldHighlight = (word: string) => {
    return highlightWords.some(highlightWord => 
      word.toLowerCase().includes(highlightWord.toLowerCase())
    );
  };

  return (
    <div className={`flex flex-wrap justify-center ${className}`}>
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="flex items-center">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              className={`inline-block ${
                shouldHighlight(word) ? highlightColor : 'text-white'
              }`}
              animate={isAnimating ? {
                y: [0, -5, 0],
                scale: [1, 1.2, 1],
                textShadow: [
                  '0 0 0px rgba(255,255,255,0)',
                  '0 0 8px rgba(212, 175, 55, 0.6)',
                  '0 0 0px rgba(255,255,255,0)'
                ]
              } : {}}
              transition={{
                delay: wordIndex * 0.05 + charIndex * 0.01,
                duration: 0.4,
                ease: 'easeInOut',
                times: [0, 0.5, 1]
              }}
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && <span className="w-2" />}
        </div>
      ))}
    </div>
  );
}

export default WaveText;

