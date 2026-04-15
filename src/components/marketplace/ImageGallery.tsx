'use client';

import { useState } from 'react';
import Image from 'next/image';

type ImageGalleryProps = {
  images: string[];
  alt: string;
};

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const mainImage = images[activeIndex];
  const thumbnails = images.slice(1);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative h-[400px] overflow-hidden rounded-[28px] border border-white/10">
        <Image
          src={mainImage}
          alt={`${alt} — image ${activeIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-300"
          priority={activeIndex === 0}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Thumbnails */}
      {thumbnails.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {thumbnails.map((src, i) => {
            const thumbIndex = i + 1;
            const isActive = activeIndex === thumbIndex;
            return (
              <button
                key={src}
                onClick={() => setActiveIndex(thumbIndex)}
                className={`relative h-[100px] overflow-hidden rounded-2xl border transition-all duration-200 ${
                  isActive
                    ? 'border-[#D4A964] ring-1 ring-[#D4A964]/40'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <Image
                  src={src}
                  alt={`${alt} — thumbnail ${thumbIndex + 1}`}
                  fill
                  className="object-cover"
                />
                <div
                  className={`absolute inset-0 transition-colors ${
                    isActive ? 'bg-transparent' : 'bg-black/20 hover:bg-black/10'
                  }`}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}