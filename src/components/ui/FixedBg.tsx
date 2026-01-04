"use client";

import React from "react";

type FixedBgProps = {
  src: string;
  alt?: string; // for semantics if we decide to add an <img> fallback later
  height?: `h-${string}` | `h-[${string}]`; // Tailwind height class
  overlay?: string; // Tailwind background overlay classes
  className?: string;
};

/**
 * A fixed-background section where content scrolls over a locked background image.
 * Uses CSS background-image for performance. On small screens, falls back to bg-scroll.
 */
export function FixedBg({ 
  src, 
  height = 'h-[60vh]', 
  overlay = '', // Removed default overlay
  className = '' 
}: FixedBgProps) {
  return (
    <div className={`relative w-full m-0 p-0 border-none ${className}`}>
      <div
        className={`relative ${height} bg-center bg-cover bg-no-repeat bg-scroll md:bg-fixed m-0 p-0 border-none`}
        style={{ backgroundImage: `url(${src})` }}
        aria-hidden
      >
        {overlay && (
          <div className={`absolute inset-0 pointer-events-none bg-gradient-to-b ${overlay} m-0 p-0 border-none`} aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

export default FixedBg;

