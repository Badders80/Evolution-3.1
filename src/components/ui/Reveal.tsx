"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation, Variant } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  className?: string;
  variant?: "blur" | "slide" | "fade";
}

export const Reveal = ({ 
  children, 
  width = "fit-content", 
  delay = 0, 
  className = "",
  variant = "blur"
}: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const variants: Record<string, { hidden: Variant; visible: Variant }> = {
    blur: {
      hidden: { opacity: 0, y: 15, filter: "blur(10px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    },
    slide: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    }
  };

  const selectedVariant = variants[variant] || variants.blur;

  return (
    <div ref={ref} style={{ position: "relative", width }} className={className}>
      <motion.div
        variants={{
          hidden: selectedVariant.hidden,
          visible: selectedVariant.visible,
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.8, delay: delay, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};
