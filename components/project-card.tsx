import Link from "next/link";
import type { ProjectDTO } from "@/lib/projects";
import { Tag } from "@/components/tag";
import { hashHue } from "@/lib/gradient";

export function ProjectCard({ project }: { project: ProjectDTO }) {
  const hue = hashHue(project.slug);
  const initials = project.title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="focus-ring card-lift group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface"
    >
      <div className="h-56 shrink-0 border-b border-border p-3">
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- cover image URL is admin-supplied and arbitrary, so next/image's allow-listed remotePatterns can't be predicted in advance.
          <img
            src={project.coverImage}
            alt=""
            className="h-full w-full rounded-md object-contain transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="relative h-full w-full overflow-hidden rounded-md"
            style={{
              background: `radial-gradient(circle at 15% 20%, hsl(${hue} 75% 55% / 0.55), transparent 60%), radial-gradient(circle at 85% 75%, hsl(${(hue + 70) % 360} 75% 50% / 0.5), transparent 60%), var(--surface-hover)`,
            }}
          >
            <span className="absolute right-4 bottom-2 font-mono text-6xl font-bold text-foreground/10 select-none">
              {initials}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-accent">
          {project.title}
        </h3>
        <p className="line-clamp-3 flex-1 text-lg leading-relaxed text-foreground-muted">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}
