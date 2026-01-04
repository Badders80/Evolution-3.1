"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface StaticImageProps {
  src: string;
  alt: string;
  /**
   * Optional className for the wrapper
   */
  className?: string;
  /**
   * If set, fills its parent (absolute positioning). Otherwise behaves like a block element.
   */
  fill?: boolean;
  priority?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  /**
   * Optional class for the underlying <Image>
   */
  imageClassName?: string;
  /**
   * Opacity value (0-1)
   */
  opacity?: number;
}

export function StaticImage({
  src,
  alt,
  className = "",
  fill = false,
  priority,
  width,
  height,
  sizes,
  imageClassName,
  opacity = 1,
}: StaticImageProps) {
  return (
    <div
      className={`${fill ? '' : 'overflow-hidden'} ${className || ''}`}
      style={{ 
        position: fill ? "absolute" as const : undefined, 
        inset: fill ? 0 : undefined,
        opacity: opacity
      }}
    >
      <Image
        src={src}
        alt={alt}
        priority={priority}
        {...(fill ? { fill: true } : { width: width || 1920, height: height || 1080 })}
        className={imageClassName || "object-cover"}
        sizes={sizes || (fill ? "100vw" : undefined)}
      />
    </div>
  );
}

export default StaticImage;
