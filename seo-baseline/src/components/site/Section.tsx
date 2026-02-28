import React from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';

interface SectionProps {
  title: string;
  body: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imageRatio?: '16:9' | '4:3' | '1:1';
  reverse?: boolean;
  className?: string;
}

export function Section({
  title,
  body,
  imageSrc,
  imageAlt = '',
  imageRatio = '16:9',
  reverse = false,
  className
}: SectionProps) {
  const aspectRatioClass = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square'
  }[imageRatio];

  return (
    <div className={clsx('grid gap-8 md:gap-12', reverse ? 'md:grid-cols-2' : 'md:grid-cols-2', className)}>
      <div className={clsx('flex flex-col justify-center', reverse ? 'md:order-2' : '')}>
        <h2 className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl">
          {title}
        </h2>
        <div className="mt-6 text-lg text-gray-600">
          {body}
        </div>
      </div>
      {imageSrc && (
        <div className={clsx('relative', aspectRatioClass, reverse ? 'md:order-1' : '')}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
}