'use client';
import { useState, useEffect } from 'react';

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
  trigger?: 'instant' | 'inView';
  loop?: boolean;
  className?: string;
}

export function TypeWriter({ 
  text, 
  speed = 100, 
  delay = 500,
  trigger = 'instant',
  loop = false,
  className = ''
}: TypeWriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Reset if looping
    if (loop && isComplete) {
      const loopDelay = setTimeout(() => {
        setDisplayedText('');
        setCurrentIndex(0);
        setIsComplete(false);
      }, delay);
      return () => clearTimeout(loopDelay);
    }

    // Start typing after initial delay
    const startTimer = setTimeout(() => {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayedText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
        return () => clearTimeout(timer);
      } else if (currentIndex === text.length && !isComplete) {
        setIsComplete(true);
      }
    }, currentIndex === 0 ? delay : 0);
    
    return () => clearTimeout(startTimer);
  }, [currentIndex, text, speed, delay, loop, isComplete]);

  return <span className={className}>{displayedText}</span>;
}
