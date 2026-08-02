/** Single shimmering placeholder block. */
export function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`skeleton ${className}`} />;
}

/** Placeholder shaped like a ProjectPreview row. */
export function ProjectRowSkeleton() {
  return (
    <div className="border-b border-border py-8 first:border-t">
      <div className="grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-8">
        <Skeleton className="h-4 w-8" />
        <div>
          <Skeleton className="h-5 w-28 rounded-full" />
          <Skeleton className="mt-3 h-8 w-2/3" />
          <Skeleton className="mt-2 h-4 w-1/2" />
          <div className="mt-3 flex gap-1.5">
            <Skeleton className="h-5 w-14 rounded" />
            <Skeleton className="h-5 w-16 rounded" />
            <Skeleton className="h-5 w-12 rounded" />
          </div>
        </div>
        <Skeleton className="hidden h-4 w-14 md:block" />
      </div>
    </div>
  );
}

/** Placeholder shaped like a NotePreview row. */
export function NoteRowSkeleton() {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-start gap-4 border-b border-border py-6 first:border-t sm:gap-6">
      <Skeleton className="mt-1 h-4 w-6" />
      <div>
        <Skeleton className="h-5 w-40" />
        <Skeleton className="mt-2 h-4 w-full max-w-md" />
        <Skeleton className="mt-1.5 h-4 w-3/4 max-w-sm" />
      </div>
      <Skeleton className="mt-1 h-4 w-10" />
    </div>
  );
}

/** Placeholder shaped like a full case-study article. */
export function CaseStudySkeleton() {
  return (
    <div aria-hidden className="py-16 md:py-20">
      <Skeleton className="h-6 w-44 rounded-full" />
      <Skeleton className="mt-5 h-11 w-64 max-w-full" />
      <Skeleton className="mt-4 h-5 w-2/3 max-w-xl" />
      <Skeleton className="mt-6 h-4 w-full max-w-2xl" />
      <Skeleton className="mt-2 h-4 w-5/6 max-w-2xl" />

      {/* visual frame */}
      <Skeleton className="mt-10 h-64 w-full rounded-xl md:h-80" />

      {/* metrics */}
      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>

      {/* expandable sections */}
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_16rem]">
        <div className="space-y-3">
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
}

/** Placeholder shaped like a full note article. */
export function NoteDetailSkeleton() {
  return (
    <div aria-hidden className="mt-10">
      <Skeleton className="h-6 w-32 rounded-full" />
      <Skeleton className="mt-5 h-11 w-3/4 max-w-lg" />
      <Skeleton className="mt-8 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-11/12" />
      <Skeleton className="mt-2 h-4 w-4/5" />
      <div className="mt-12 space-y-4">
        <Skeleton className="h-16 w-full rounded-xl" />
        <Skeleton className="h-16 w-full rounded-xl" />
        <Skeleton className="h-16 w-full rounded-xl" />
      </div>
    </div>
  );
}

export function ListSkeleton({
  rows = 2,
  variant = "project",
}: {
  rows?: number;
  variant?: "project" | "note";
}) {
  const Row = variant === "project" ? ProjectRowSkeleton : NoteRowSkeleton;
  return (
    <div aria-hidden>
      {Array.from({ length: rows }).map((_, i) => (
        <Row key={i} />
      ))}
    </div>
  );
}
