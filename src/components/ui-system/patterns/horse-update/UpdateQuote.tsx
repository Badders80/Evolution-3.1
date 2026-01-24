import React from 'react';

interface UpdateQuoteProps {
  text: string;
  author: string;
}

export function UpdateQuote({ text, author }: UpdateQuoteProps) {
  return (
    <div className="bg-neutral-50 p-8 border-l-[3px] border-brand-gold my-6 space-y-4">
      <blockquote className="font-serif text-[22px] italic leading-relaxed text-black">
        <span className="text-3xl leading-[0.8] align-top mr-1">“</span>
        {text}
        <span className="text-3xl leading-[0.8] align-top ml-1">”</span>
      </blockquote>
      <cite className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 not-italic block">
        — {author}
      </cite>
    </div>
  );
}
