import { hashHue } from "@/lib/gradient";
import { getTechIcon } from "@/lib/tech-icons";

function isNearBlack(hex: string): boolean {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 40;
}

export function TechBadge({ tech }: { tech: string }) {
  const icon = getTechIcon(tech);
  const color = icon
    ? isNearBlack(icon.hex)
      ? "var(--foreground)"
      : `#${icon.hex}`
    : `hsl(${hashHue(tech)} 70% 50%)`;

  return (
    <span
      className="inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] text-foreground-muted sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-xs"
      style={{
        borderColor: `color-mix(in srgb, ${color} 40%, var(--border))`,
        backgroundColor: `color-mix(in srgb, ${color} 12%, var(--surface))`,
      }}
    >
      {icon ? (
        <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3" fill={color} aria-hidden="true">
          <path d={icon.path} />
        </svg>
      ) : (
        <span
          className="h-1 w-1 shrink-0 rounded-full sm:h-1.5 sm:w-1.5"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
      )}
      {tech}
    </span>
  );
}
