import React from 'react';

/**
 * Base Shimmer Skeleton Element
 * Adapts fluidly across mobile, tablet, and desktop screens with rounded styling.
 */
export function Skeleton({ className = '', rounded = 'rounded-xl', ...props }) {
  return (
    <div
      className={`animate-shimmer ${rounded} ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}

/**
 * Responsive Project Case Study Card Skeleton Loader
 * Hand-tailored to match real project cards across:
 * - Mobile: 1-column, compact probe badge, 2 metric blocks, stacked action buttons
 * - Medium (Tablet / md): 2-column grid alignment, 3 metric blocks, flex action buttons
 * - Large (Desktop / lg): Expanded card dimensions, full tags, spacious padding
 */
export function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col justify-between bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 md:p-8 shadow-sm space-y-5 sm:space-y-6">
      <div className="space-y-4">
        {/* Top probe and star indicators */}
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="w-28 sm:w-36 h-7 rounded-full" />
          <Skeleton className="w-12 h-4 rounded-md" />
        </div>

        {/* Title & Tagline */}
        <div className="space-y-2 pt-1">
          <Skeleton className="w-4/5 sm:w-3/4 md:w-2/3 h-6 sm:h-7 rounded-lg" />
          <Skeleton className="w-full h-4 rounded-md" />
          <Skeleton className="w-3/4 sm:w-4/5 h-4 rounded-md" />
        </div>

        {/* Metric Badges: 2 on mobile, 3 on sm/md/lg */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 my-4 sm:my-5">
          <div className="p-2.5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60 space-y-1.5">
            <Skeleton className="w-16 h-3 rounded-md" />
            <Skeleton className="w-14 h-5 rounded-md" />
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60 space-y-1.5">
            <Skeleton className="w-16 h-3 rounded-md" />
            <Skeleton className="w-14 h-5 rounded-md" />
          </div>
          <div className="hidden sm:block p-2.5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60 space-y-1.5">
            <Skeleton className="w-16 h-3 rounded-md" />
            <Skeleton className="w-14 h-5 rounded-md" />
          </div>
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
          <Skeleton className="w-16 sm:w-20 h-6 rounded-lg" />
          <Skeleton className="w-14 sm:w-16 h-6 rounded-lg" />
          <Skeleton className="w-20 sm:w-24 h-6 rounded-lg" />
          <Skeleton className="hidden sm:block w-16 h-6 rounded-lg" />
        </div>
      </div>

      {/* Action Buttons: Full width on mobile, inline on tablet & desktop */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
        <Skeleton className="w-full sm:w-36 h-9 rounded-xl" />
        <Skeleton className="w-full sm:w-24 h-9 rounded-xl" />
      </div>
    </div>
  );
}

/**
 * Responsive Projects Grid Skeleton
 * Adapts grid structure for mobile (1 col), medium (2 cols), large (2 cols)
 */
export function ProjectsGridSkeleton({ count = 2 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </>
  );
}

/**
 * Responsive Telemetry Stats Ribbon Skeleton
 * - Mobile: 2-column grid (2x2)
 * - Medium & Large: 4-column responsive grid
 */
export function TelemetrySkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/60 space-y-2 sm:space-y-2.5"
        >
          <Skeleton className="w-20 sm:w-24 h-3 sm:h-3.5 rounded-md" />
          <Skeleton className="w-16 sm:w-24 h-7 sm:h-8 rounded-lg mt-1" />
          <Skeleton className="w-24 sm:w-28 h-2.5 sm:h-3 rounded-md mt-0.5" />
        </div>
      ))}
    </div>
  );
}

/**
 * Responsive Career Experience Timeline Skeleton
 * - Mobile: Stacked title & date pill, compact timeline dot
 * - Medium & Large: Wide card, row header with date badge, bullet achievements
 */
export function ExperienceSkeleton() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {[1, 2].map((i) => (
        <div key={i} className="relative flex items-start gap-3.5 sm:gap-6">
          {/* Timeline Node Dot */}
          <Skeleton className="w-7 h-7 sm:w-10 sm:h-10 rounded-2xl shrink-0 mt-0.5" />

          {/* Timeline Card */}
          <div className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-sm space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <Skeleton className="w-40 sm:w-56 h-5 sm:h-6 rounded-lg" />
              <Skeleton className="w-28 sm:w-32 h-5 sm:h-6 rounded-full self-start sm:self-auto" />
            </div>

            <Skeleton className="w-full h-4 rounded-md" />
            <Skeleton className="w-5/6 h-4 rounded-md" />

            {/* Achievement Bullets */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2">
                <Skeleton className="w-3 h-3 rounded-full shrink-0" />
                <Skeleton className="w-4/5 h-3.5 rounded-md" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="w-3 h-3 rounded-full shrink-0" />
                <Skeleton className="w-2/3 h-3.5 rounded-md" />
              </div>
            </div>

            {/* Tech chips */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
              <Skeleton className="w-14 sm:w-16 h-5 sm:h-6 rounded-md" />
              <Skeleton className="w-14 sm:w-16 h-5 sm:h-6 rounded-md" />
              <Skeleton className="w-16 sm:w-20 h-5 sm:h-6 rounded-md" />
              <Skeleton className="hidden sm:block w-14 h-5 sm:h-6 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Responsive Hero Section Skeleton
 * For initial bio/profile loading across mobile, tablet, and desktop
 */
export function HeroSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 py-16 sm:py-24">
      {/* Availability Pill */}
      <Skeleton className="w-52 sm:w-64 h-7 rounded-full mx-auto" />

      {/* Main Title & Headline */}
      <div className="space-y-4">
        <Skeleton className="w-3/4 sm:w-2/3 h-10 sm:h-14 rounded-2xl mx-auto" />
        <Skeleton className="w-1/2 sm:w-2/5 h-6 sm:h-8 rounded-xl mx-auto" />
        <Skeleton className="max-w-xl h-4 rounded-md mx-auto" />
        <Skeleton className="max-w-md h-4 rounded-md mx-auto" />
      </div>

      {/* Action Buttons: Full width on mobile, inline on tablet & desktop */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2 w-full max-w-sm sm:max-w-none mx-auto">
        <Skeleton className="w-full sm:w-44 h-12 rounded-xl" />
        <Skeleton className="w-full sm:w-44 h-12 rounded-xl" />
      </div>

      {/* Tech Stack Pills */}
      <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
        <Skeleton className="w-36 h-3 rounded-md mx-auto mb-4" />
        <div className="flex flex-wrap justify-center gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="w-20 sm:w-24 h-7 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skeleton;
