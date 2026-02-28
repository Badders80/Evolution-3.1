import React from "react";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqVariantProps = {
  items: FaqItem[];
  className?: string;
};

export function FaqAccordionVariant({ items, className = "" }: FaqVariantProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <details
          key={item.question}
          className="group border border-white/10 bg-black/60 px-6 py-4 transition hover:border-primary/60"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-semibold uppercase tracking-[0.3em] text-gray-200">
            <span>{item.question}</span>
            <span className="text-primary transition group-open:rotate-90">&rsaquo;</span>
          </summary>
          <div className="mt-3 text-sm leading-relaxed text-gray-300">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}

export function FaqCardVariant({ items, className = "" }: FaqVariantProps) {
  return (
    <div className={`grid gap-6 md:grid-cols-2 ${className}`}>
      {items.map((item) => (
        <div
          key={item.question}
          className="flex h-full flex-col gap-3 border border-white/10 bg-black/70 p-6 shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
        >
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            {item.question}
          </h3>
          <p className="text-sm leading-relaxed text-gray-300">{item.answer}</p>
        </div>
      ))}
    </div>
  );
}

export function FaqStackVariant({ items, className = "" }: FaqVariantProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {items.map((item, index) => (
        <div key={item.question} className="flex gap-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/60 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            {String(index + 1).padStart(2, "0")}
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-200">
              {item.question}
            </h3>
            <p className="text-sm leading-relaxed text-gray-300">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
