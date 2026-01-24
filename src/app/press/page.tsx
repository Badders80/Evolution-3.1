import { constructMetadata } from "@/lib/seo";
import Image from 'next/image';
import { pressArticles } from '@/lib/press-articles';

export const metadata = constructMetadata({
  title: 'Press & Media',
  description: 'The latest news, media coverage, and press releases from Evolution Stables.',
  canonical: '/press',
});

export default function PressPage() {
  const sortedArticles = [...pressArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="min-h-screen pt-32 pb-20 bg-[#0a0a0a] text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <header className="mb-20 max-w-3xl">
          <p className="label-overline mb-6">Media Relations</p>
          <h1 className="heading-hero mb-8">
            Press & <br />
            <span className="text-white/40 italic">Coverage</span>
          </h1>
          <p className="body-lead">
            Stay updated with our latest announcements and media features as we
            bridge the gap between traditional equine excellence and modern
            digital syndication.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {sortedArticles.map((article) => (
            <a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block space-y-6"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-white/5 grayscale group-hover:grayscale-0 transition-all duration-700">
                {article.imageUrl ? (
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white/10 font-medium tracking-widest uppercase text-xs">
                    {article.publisher}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                    {article.date}
                  </span>
                  <div className="h-px w-6 bg-white/10" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37]">
                    {article.publisher}
                  </span>
                </div>

                <h2 className="heading-sub group-hover:text-primary transition-colors duration-300">
                  {article.title}
                </h2>

                <p className="body-standard line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="pt-2">
                  <span className="text-label flex items-center gap-2 group-hover:text-neutral-100 transition-colors">
                    Read Full Article
                    <svg
                      className="w-3 h-3 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
