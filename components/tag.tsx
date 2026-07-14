import { clsx } from "clsx";

export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-xs text-foreground-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
