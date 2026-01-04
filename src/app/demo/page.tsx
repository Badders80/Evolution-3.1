'use client';

import Image from 'next/image';

export default function Demo() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden text-center">
        <div className="absolute inset-0" style={{ filter: 'brightness(0.85)' }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
            style={{ transform: 'scale(1.1)' }}
            ref={(video) => {
              if (video) {
                video.playbackRate = 0.7;
              }
            }}
          >
            <source src="/images/Jockey-walk-out.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-4">
          <h1 className="mb-4 text-5xl font-bold text-[#d4af37]">Marketplace</h1>
          <p className="text-lg text-gray-300">
            Discover and own digital assets in the Evolution Stables ecosystem
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="min-h-screen bg-[#0a0a0a] pt-24 text-white">
        <div className="mx-auto max-w-7xl space-y-20 px-6 py-12 md:px-10 lg:px-12">
          {/* Section 1: Marketplace */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left: Content */}
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.28em] text-white/40">Evolution Stables</p>
              <h2 className="mb-4 text-4xl font-medium tracking-tight text-white">Marketplace</h2>
              <p className="text-base leading-relaxed text-white/60">
                Discover and explore digital-syndication opportunities within the Evolution ecosystem.
                Browse upcoming offerings, ownership positions, and live data — all designed to make racehorse ownership
                more accessible and connected.
              </p>
            </div>

            {/* Right: Blurred Table */}
            <div className="relative min-h-[400px] overflow-hidden rounded-2xl border border-gray-800 bg-[#0b0b0b] shadow-lg">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-700 text-sm uppercase tracking-wider text-gray-400">
                    <th className="px-6 py-3">Horse Name</th>
                    <th className="px-6 py-3">Location</th>
                    <th className="px-6 py-3">Stake</th>
                    <th className="px-6 py-3 text-right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-gray-800 text-gray-400">
                      <td className="px-6 py-3">########</td>
                      <td className="px-6 py-3">########</td>
                      <td className="px-6 py-3">########</td>
                      <td className="px-6 py-3 text-right">########</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Blur overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <span className="text-lg font-medium text-gray-300">Coming Soon</span>
              </div>
            </div>
          </div>

          {/* Section 2: Information Hub */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left: Content */}
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.28em] text-white/40">Evolution Stables</p>
              <h2 className="mb-4 text-4xl font-medium tracking-tight text-white">Information Hub</h2>
              <p className="text-base leading-relaxed text-white/60">
                Stay connected with the latest Evolution news, interviews, and race insights.
              </p>
            </div>

            {/* Right: Image */}
            <div className="relative overflow-hidden rounded-xl border border-white/5">
              <Image
                src="/images/Gemini_Generated_Image_r4hnnzr4hnnzr4hn.jpg"
                alt="Information Hub"
                width={800}
                height={600}
                className="h-[400px] w-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="mb-1 text-lg font-medium tracking-tight text-white">Latest Insights</h3>
                <p className="text-sm text-white/60">Curated coverage of races, partnerships, and trends.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
