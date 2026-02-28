import React from 'react';
import Image from 'next/image';

interface SectionCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  description: string | React.ReactNode;
  imageSrc?: string;
  hoverImageSrc?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({ className = '',
  title,
  description,
  imageSrc,
  hoverImageSrc = imageSrc?.replace('30', '32').replace('31', '32').replace('29', '32'),
  imageAlt = '',
  children,
}) => {
  const resolvedAlt = imageAlt || '';
  const hasHoverImage = hoverImageSrc && hoverImageSrc !== imageSrc;
  
  return (
    <div 
      className={`flex flex-col h-full relative ${className}`}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Vertical line with hover effects */}
      <div 
        className="absolute -left-6 -top-24 -bottom-24 w-px bg-gradient-to-b from-transparent via-muted/60 to-transparent transition-all duration-300 origin-center overflow-visible group-hover:via-primary group-hover:shadow-[0_0_25px_rgba(212,169,100,0.65)] group-hover:scale-x-[1.6]"
        style={{ willChange: 'transform, box-shadow' }}
      >
        {/* Horizontal pulse line */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/100 to-primary/0 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300">
          <div 
            className="absolute inset-y-1/2 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"
            style={{
              boxShadow: '0 0 15px 2px rgba(255,255,255,0.8)',
              maskImage: 'linear-gradient(90deg, transparent 0%, white 15%, white 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, white 15%, white 85%, transparent 100%)',
              willChange: 'opacity, transform'
            }}
          />
        </div>
        
        {/* Vertical bolt with tapered ends */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/100 to-primary/0 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, white 15%, white 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, white 15%, white 85%, transparent 100%)'
          }}
        >
          <div 
            className="absolute inset-y-1/2 left-1/2 w-1 h-0 bg-gradient-to-b from-transparent via-white to-transparent 
                      group-hover:h-full group-hover:inset-y-0 transition-all duration-700 ease-out"
            style={{
              transform: 'translateX(-50%)',
              boxShadow: '0 0 20px 2px rgba(255,255,255,0.9)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, white 10%, white 90%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, white 10%, white 90%, transparent 100%)',
              willChange: 'height, transform, opacity'
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="pl-6 flex flex-col h-full">
        <div>
          <div className="mb-1">
            <span className="text-primary group-hover:text-primary text-sm font-bold tracking-wider">
              FOR
            </span>
          </div>
          <h3 className="text-subheading font-medium text-foreground group-hover:text-primary mb-4 uppercase transition-colors duration-300">
            {title}
          </h3>
          <div className="leading-relaxed mb-6 text-muted group-hover:text-foreground transition-colors duration-300">
            {description}
          </div>
        </div>
        
        {/* Image Container */}
        <div className="mt-auto">
          {imageSrc && (
            <div 
              className="mt-6 w-[60%] mx-auto transform group-hover:scale-[1.2] transition-transform duration-300"
              style={{ willChange: 'transform' }}
            >
              <div className="relative overflow-hidden rounded-lg border border-foreground/10 group-hover:border-primary/30 transition-all duration-300">
                <div className="relative w-full aspect-square">
                  <Image
                    src={imageSrc}
                    alt={resolvedAlt}
                    width={200}
                    height={200}
                    className="w-full h-full object-contain transition-all duration-300 ease-out brightness-75 group-hover:opacity-0 group-hover:brightness-100"
                    priority={false}
                    loading="lazy"
                  />
                  {hasHoverImage && (
                    <Image
                      src={hoverImageSrc}
                      alt={resolvedAlt}
                      width={200}
                      height={200}
                      className="absolute inset-0 w-full h-full object-contain transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 brightness-100"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-background/50 mix-blend-multiply pointer-events-none group-hover:opacity-0 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

