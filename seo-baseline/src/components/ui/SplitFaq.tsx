"use client";

import React, { useState } from "react";

export type FaqItem = {
  question: string;
  answer: string;
};

type SplitFaqProps = {
  items: FaqItem[];
  className?: string;
};

export function SplitFaq({ items, className = "" }: SplitFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleMouseLeave = () => {
    setOpenIndex(null);
  };

  return (
    <div className={`max-w-3xl mx-auto ${className}`} onMouseLeave={handleMouseLeave}>
      {items.map((item, index) => {
        const contentId = `faq-panel-${index}`;
        const isOpen = openIndex === index;
        const isLast = index === items.length - 1;
        return (
          <div
            key={item.question}
            className={`animate-[slideUp_0.8s_ease-out_forwards] ${index === 0 ? 'border-t' : ''}`}
            style={{ 
              animationDelay: `${index * 0.12}s`,
              borderTopColor: index === 0 ? 'rgba(255, 255, 255, 0.08)' : undefined
            }}
          >
            <div className="py-8 border-b border-white/[0.08] transition-all duration-300 ease-out hover:border-white/[0.12]">
              <button 
                onClick={() => toggleQuestion(index)}
                className="w-full text-left cursor-pointer group relative"
              >
                <div className="flex items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3 className={`font-heading text-base font-light tracking-tight transition-all duration-300 ease-out ${
                      isOpen ? 'text-white' : 'text-white/95'
                    } group-hover:text-white`}>
                      {item.question}
                    </h3>
                  </div>
                  <svg
                    className={`h-5 w-5 shrink-0 transition-all duration-300 ease-out ${
                      isOpen ? 'rotate-45 text-[#d4a964]' : 'rotate-0 text-white/40'
                    } group-hover:text-[#d4a964]`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                  </svg>
                </div>
              </button>
              <div
                id={contentId}
                role="region"
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div
                  className={`text-base leading-relaxed font-light max-w-2xl pt-4 pb-2 transition-all duration-300 ease-out ${
                    isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                  }`}
                  style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                >
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

