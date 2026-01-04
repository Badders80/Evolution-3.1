import React from "react";

type AccordionItem = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
};

export function Accordion({ items, className = "" }: AccordionProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <details
          key={item.question}
          className="group border border-border/60 bg-surface/60 px-6 py-4 transition hover:border-primary/60"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-semibold uppercase tracking-[0.3em] text-foreground/80">
            <span>{item.question}</span>
            <span className="text-primary transition group-open:rotate-90">&rsaquo;</span>
          </summary>
          <div className="mt-3 text-sm leading-relaxed text-muted">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}

