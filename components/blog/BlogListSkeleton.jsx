"use client";

export default function BlogListSkeleton() {
  return (
    <div className="w-full space-y-8 animate-fadeIn">
      {/* 1. Subtle Status Indicator */}
      <div className="flex items-center justify-between gap-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-xs font-semibold text-slate-600">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5E14] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5E14]"></span>
          </span>
          <span>Loading publications & industrial insights...</span>
        </div>
      </div>

      {/* 2. Featured Flagship Post Skeleton (matches BlogHeroFeatured) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Column: Image Skeleton */}
          <div className="lg:col-span-7 min-h-[240px] sm:min-h-[300px] lg:min-h-[340px] skeleton-shimmer" />

          {/* Right Column: Content Skeleton */}
          <div className="lg:col-span-5 p-5 sm:p-6 lg:p-7 flex flex-col justify-between bg-white space-y-4">
            <div className="space-y-3">
              {/* Badge & Meta */}
              <div className="flex items-center gap-2.5">
                <div className="h-5 w-24 rounded-full skeleton-shimmer" />
                <div className="h-4 w-16 rounded skeleton-shimmer" />
              </div>

              {/* Title Skeleton (2 lines) */}
              <div className="space-y-2 pt-1">
                <div className="h-6 w-11/12 rounded-md skeleton-shimmer" />
                <div className="h-6 w-3/4 rounded-md skeleton-shimmer" />
              </div>

              {/* Excerpt Skeleton (3 lines) */}
              <div className="space-y-2 pt-2">
                <div className="h-3.5 w-full rounded skeleton-shimmer" />
                <div className="h-3.5 w-5/6 rounded skeleton-shimmer" />
                <div className="h-3.5 w-2/3 rounded skeleton-shimmer" />
              </div>
            </div>

            {/* Author & Button Row */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full skeleton-shimmer" />
                <div className="space-y-1">
                  <div className="h-3 w-24 rounded skeleton-shimmer" />
                  <div className="h-2.5 w-16 rounded skeleton-shimmer" />
                </div>
              </div>
              <div className="h-8 w-28 rounded-full skeleton-shimmer" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Search Bar & Category Filter Skeleton (matches BlogFilterBar) */}
      <div className="space-y-3">
        {/* Search input placeholder */}
        <div className="h-11 rounded-2xl bg-white border border-slate-200/80 p-2 flex items-center justify-between gap-2.5 shadow-2xs">
          <div className="h-7.5 rounded-xl flex-1 skeleton-shimmer" />
          <div className="h-6 w-24 rounded-full skeleton-shimmer hidden sm:block" />
        </div>

        {/* Category Pills placeholder */}
        <div className="flex items-center gap-2 overflow-hidden py-0.5">
          <div className="h-7 w-12 rounded-full skeleton-shimmer shrink-0" />
          <div className="h-7 w-24 rounded-full skeleton-shimmer shrink-0" />
          <div className="h-7 w-36 rounded-full skeleton-shimmer shrink-0" />
          <div className="h-7 w-32 rounded-full skeleton-shimmer shrink-0" />
          <div className="h-7 w-28 rounded-full skeleton-shimmer shrink-0" />
          <div className="h-7 w-24 rounded-full skeleton-shimmer shrink-0" />
        </div>
      </div>

      {/* 4. Grid of 6 Cards Skeleton (matches BlogCard layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col"
          >
            {/* Thumbnail */}
            <div className="aspect-[16/10] w-full skeleton-shimmer" />

            {/* Card Body */}
            <div className="p-4 sm:p-5 flex flex-col flex-1 space-y-3">
              {/* Meta Date & Time */}
              <div className="flex items-center gap-2">
                <div className="h-3 w-20 rounded skeleton-shimmer" />
                <span className="text-slate-300">•</span>
                <div className="h-3 w-16 rounded skeleton-shimmer" />
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <div className="h-4.5 w-11/12 rounded skeleton-shimmer" />
                <div className="h-4.5 w-3/4 rounded skeleton-shimmer" />
              </div>

              {/* Excerpt */}
              <div className="space-y-1.5 flex-1 pt-1">
                <div className="h-3 w-full rounded skeleton-shimmer" />
                <div className="h-3 w-4/5 rounded skeleton-shimmer" />
              </div>

              {/* Footer CTA */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="h-3.5 w-24 rounded skeleton-shimmer" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
