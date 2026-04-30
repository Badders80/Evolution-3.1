import { Skeleton } from "@/components/ui/Skeleton";

/**
 * Marketplace Listing Loading State
 *
 * Skeleton UI shown while listing data is fetched.
 * Improves perceived performance and prevents layout shift.
 */
export default function ListingLoading() {
  return (
    <main className="min-h-screen bg-background text-white pt-32 md:pt-40">
      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10 lg:px-12">
        {/* Breadcrumb skeleton */}
        <div className="mb-6 flex items-center gap-2">
          <Skeleton className="h-4 w-20" />
          <span className="text-white/20">/</span>
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left: Image skeletons */}
          <div className="space-y-4">
            <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
            <div className="grid grid-cols-4 gap-2">
              <Skeleton className="aspect-square rounded-lg" />
              <Skeleton className="aspect-square rounded-lg" />
              <Skeleton className="aspect-square rounded-lg" />
              <Skeleton className="aspect-square rounded-lg" />
            </div>
          </div>

          {/* Right: Details skeletons */}
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </main>
  );
}
