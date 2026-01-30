'use client';

import { motion, useInView, useAnimation, Variant } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  width?: 'fit-content' | '100%';
  blur?: boolean;
}

export const Reveal = ({
  children,
  className,
  delay = 0.25,
  duration = 0.5,
  width = 'fit-content',
  blur = true,
}: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: blur ? 'blur(8px)' : 'blur(0px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        delay,
        ease: [0.25, 0.25, 0, 1], // Cubic bezier for "Runway" smooth feel
      },
    },
  };

  return (
    <div ref={ref} style={{ width, position: 'relative', overflow: 'visible' }} className={className}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={controls}
      >
        {children}
      </motion.div>
    </div>
  );
};
