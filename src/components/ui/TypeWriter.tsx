'use client';
import { useState, useEffect } from 'react';

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export function TypeWriter({ 
  text, 
  speed = 100, 
  delay = 500,
  className = ''
}: TypeWriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayedText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
        return () => clearTimeout(timer);
      }
    }, delay);
    
    return () => clearTimeout(startTimer);
  }, [currentIndex, text, speed, delay]);

  return <span className={className}>{displayedText}</span>;
}
