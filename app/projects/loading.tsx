export default function Loading() {
  return (
    <section className="mx-auto w-full max-w-[1320px] px-4 py-20 sm:px-6 lg:px-10 xl:px-16">
      <div className="mb-10 h-9 w-40 animate-pulse rounded bg-surface" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-48 animate-pulse rounded-lg border border-border bg-surface"
          />
        ))}
      </div>
    </section>
  );
}
