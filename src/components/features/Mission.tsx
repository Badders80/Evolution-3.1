'use client';

import React from 'react';

const missionCards = [
  {
    title: 'Investors & Fans',
    sub: 'Experience the thrill — without the hassle.',
    description: 'Ownership, on your terms. Simplified terms and conditions give you the full thrill of ownership in a transparent, regulated marketplace — where risk and return are clear before you buy.'
  },
  {
    title: 'Breeders & Syndicators',
    sub: 'Unlock new income — same control, zero extra effort.',
    description: 'Expand your reach and retain full control, with offers structured, managed, and delivered — all in one place.'
  },
  {
    title: 'Clubs & Organisations',
    sub: 'From spectators to invested stakeholders.',
    description: 'Ownership is the gateway to deeper engagement — turning one-time spectators into lifelong members, building revenue, and strengthening the sport\'s future, all in one place.'
  }
];

export function Mission() {
  return (
    <section id="mission" className="py-24 bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 w-full">
        <div className="space-y-12 mb-16">
          <p className="label-overline">
            OUR MISSION
          </p>
          <h2 className="heading-section">
            How It<br />Works
          </h2>
          <p className="body-lead max-w-2xl">
            At Evolution Stables, we understand that ownership is the lifeblood of racing — and strengthening it benefits every part of the industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {missionCards.map((card, idx) => (
            <div
              key={idx}
              className="group relative bg-white/[0.02] border border-white/[0.08] rounded-lg p-10 transition-all duration-700 ease-out hover:bg-white/[0.04] hover:border-white/[0.15] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] cursor-pointer"
            >
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: 'linear-gradient(140deg, rgba(255,255,255,0.06), rgba(67,129,255,0.08) 40%, transparent 70%)'
                }}
              />
              <div className="relative space-y-4">
                <p className="label-subhead text-white/40">
                  {card.title}
                </p>
                <h4 className="text-h4 font-light text-white leading-tight">
                  {card.sub}
                </h4>
                <p className="body-standard text-white/60">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
