import React from 'react';

interface UpdateBulletsProps {
  bullets: string[];
}

export function UpdateBullets({ bullets }: UpdateBulletsProps) {
  if (!bullets || bullets.length === 0) return null;

  return (
    <div className="bg-black text-white p-6 border-l-[3px] border-brand-gold my-6">
      <ul className="list-disc pl-5 space-y-2 text-lg font-medium">
        {bullets.map((bullet, idx) => (
          <li key={idx}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
}
