export function SectionHeading({
  index,
  eyebrow,
  title,
}: {
  index: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="flex items-center gap-2 font-mono text-sm text-accent">
        <span className="text-foreground-muted">{index}</span>
        {eyebrow}
      </p>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}
