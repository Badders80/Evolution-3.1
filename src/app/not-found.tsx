import Link from 'next/link';
import Image from 'next/image';

const NotFoundPage = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background text-foreground">
      {/* Soft background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(88,114,255,0.12),transparent_55%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center gap-10 px-8 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] shadow-[0_10px_60px_rgba(0,0,0,0.4)]">
            <span className="text-4xl font-light tracking-[0.4em] text-white/70">404</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-light tracking-tight text-white sm:text-4xl">
              This page could not be found
            </h1>
            <p className="text-base font-light leading-relaxed text-white/60">
              It looks like the route you&apos;re looking for doesn&apos;t exist. Let&apos;s guide you back to the stable.
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-white/[0.08] px-8 py-3 text-sm font-medium uppercase tracking-[0.25em] text-white/80 transition-all duration-500 hover:bg-white/[0.12] hover:text-white focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
        >
          Return Home
        </Link>
      </div>

      {/* Accent image */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[-140px] flex justify-center opacity-70">
        <Image
          src="/images/Horse-Double-Black.png"
          alt="Evolution Stables silhouette"
          width={720}
          height={300}
          className="max-w-[80%] select-none opacity-40"
          priority
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
