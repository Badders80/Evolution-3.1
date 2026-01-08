import { Email } from '@/components/Email/Email';

export const About = () => {
  return (
    <section className="bg-background py-64 text-foreground" id="about">
      <div className="mx-auto max-w-6xl px-12 md:px-16 lg:px-20">
        <p className="mb-16 text-[11px] font-light uppercase tracking-[0.2em] text-white/30">
          ABOUT
        </p>

        <h2 className="mb-8 text-[36px] font-light tracking-tight text-white md:text-[48px]">
          Own the Experience
        </h2>

        <div className="mt-6 space-y-20">
          <p className="text-[18px] font-light leading-[1.85] text-white/65">
            Racehorse ownership has changed. Evolution Stables removes the barriers that once made it
            complex and inaccessible — opening the door for first-timers and seasoned fans alike to not
            just watch, but own the experience.
          </p>

          <div className="mx-auto max-w-[620px] text-center">
            <h4 className="mb-16 text-[21px] font-light leading-tight text-white">
              Unlock the thrill of ownership with early access and behind-the-scenes
              coverage - it is easier than you think.
            </h4>

            <Email />
          </div>
        </div>
      </div>
    </section>
  );
};
