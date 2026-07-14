"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ProjectDTO } from "@/lib/projects";
import { Tag } from "@/components/tag";

export function ProjectsManager({ initialProjects }: { initialProjects: ProjectDTO[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function move(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const next = [...projects];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    setProjects(next);
    setPendingId(next[index].id);

    try {
      await fetch("/api/projects/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: next.map((project, i) => ({ id: project.id, order: i })),
        }),
      });
      router.refresh();
    } finally {
      setPendingId(null);
    }
  }

  async function remove(id: string, title: string) {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;

    setPendingId(id);
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      setProjects((current) => current.filter((project) => project.id !== id));
      router.refresh();
    } finally {
      setPendingId(null);
    }
  }

  if (projects.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border p-8 text-center text-foreground-muted">
        No projects yet.{" "}
        <Link href="/admin/projects/new" className="text-accent underline underline-offset-4">
          Create your first one
        </Link>
        .
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {projects.map((project, index) => (
        <li
          key={project.id}
          className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium text-foreground">{project.title}</p>
              {project.featured && (
                <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
                  Featured
                </span>
              )}
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => move(index, -1)}
              disabled={index === 0 || pendingId === project.id}
              aria-label={`Move ${project.title} up`}
              className="focus-ring flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-30"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => move(index, 1)}
              disabled={index === projects.length - 1 || pendingId === project.id}
              aria-label={`Move ${project.title} down`}
              className="focus-ring flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-30"
            >
              ↓
            </button>
            <Link
              href={`/admin/projects/${project.id}/edit`}
              className="focus-ring rounded-md border border-border px-3 py-1.5 font-mono text-xs text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={() => remove(project.id, project.title)}
              disabled={pendingId === project.id}
              className="focus-ring rounded-md border border-danger/30 px-3 py-1.5 font-mono text-xs text-danger transition-colors hover:bg-danger/10 disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
