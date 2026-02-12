import React from 'react';
import Image from 'next/image';

interface ImageBandProps {
  src: string;
  alt: string;
  height?: number;
  className?: string;
  children?: React.ReactNode;
}

export default function ImageBand({ 
  src, 
  alt, 
  height = 300,
  className = '',
  children
}: ImageBandProps) {
  return (
    <div 
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: height ? `${height}px` : undefined }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority
      />
      {children}
    </div>
  );
}