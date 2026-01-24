import React from 'react';
import { Card } from '@/components/ui/shadcn/card';
import {
  UpdateHeader,
  UpdateHeadline,
  UpdateBody,
  UpdateBullets,
  UpdateQuote,
  UpdateMedia,
  UpdateFooter
} from '@/components/ui-system/patterns/horse-update';

export function HorseUpdateTemplate() {
  return (
    <div className="min-h-screen bg-neutral-100 py-12 px-4">
      {/*
          This template demonstrates how to compose atomic horse-update components
          for a long-form story format, exceeding the capacity of a simple card.
      */}
      <Card className="max-w-2xl mx-auto bg-white text-black p-8 md:p-12 font-sans border-none rounded-none shadow-2xl">
        <UpdateHeader
          updateType="TRAINER UPDATE"
          horseName="FIRST GEAR"
          updateDate="12 DECEMBER 2025"
        />

        <main>
          <UpdateHeadline
            headline="First Gear Nominated: The Road to Otaki"
            subheadline="Stephen Gray provides a detailed insight into the gelding's progress and the strategic nomination for the upcoming meeting."
          />

          <UpdateBody
            content={[
              "We often speak about the difference between a horse that can run and a horse that knows how to race. This morning at Awapuni, First Gear put in a piece of work that signalled a significant shift in his mental maturity. It wasn't just the time on the clock—though that was impressive—it was the way he handled the pressure of a companion horse and his recovery afterwards.",
              "The transition from three to four is often where we see the most physical development, but with this horse, it's the psychological alignment that we've been waiting for. He's finally beginning to understand his craft."
            ]}
          />

          <UpdateBullets
            bullets={[
              "Nomination: Otaki-Maori RC, 19 December",
              "Target Race: Benchmark 65 1200m",
              "Condition: Currently 95% fitness, peaking for Thursday"
            ]}
          />

          <UpdateBody
            content={[
              "Stephen has been meticulous with the training load over the last fortnight. We've focused on sharp, interval-based gallops rather than long-distance endurance. This is designed to preserve his natural explosive speed while ensuring he has the lungs to finish strongly over 1200m.",
              "The track conditions at Otaki are currently rated as Good 4, which suits him perfectly. He's a horse that appreciates a firm surface where he can really use his stride."
            ]}
            dropCap={false}
          />

          <UpdateQuote
            text="He is as good as I can get him. The nomination is a reflection of my confidence in his current physical state. He's ready to put a big performance on the board."
            author="Stephen Gray, Trainer"
          />

          <UpdateMedia
            url="https://www.youtube.com/embed/dQw4w9WgXcQ"
            aspect="landscape"
          />

          <UpdateBody
            content={[
              "We expect a strong field for the Benchmark 65, but based on his current ratings and the weights, we are positioned well. Jockey assignments will be finalised by Tuesday morning, though we have already secured a senior rider who knows the Otaki track well.",
              "Owners are encouraged to reach out to the stable manager if they intend to attend the meeting, as we are organising a dedicated hospitality area for the Evolution Stables syndicate."
            ]}
            dropCap={false}
          />
        </main>

        <UpdateFooter />
      </Card>
    </div>
  );
}
