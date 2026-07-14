"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ExperienceDTO } from "@/lib/experience";
import { Tag } from "@/components/tag";

export function ExperienceManager({ initialExperience }: { initialExperience: ExperienceDTO[] }) {
  const router = useRouter();
  const [experience, setExperience] = useState(initialExperience);
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function move(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= experience.length) return;

    const next = [...experience];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    setExperience(next);
    setPendingId(next[index].id);

    try {
      await fetch("/api/experience/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: next.map((entry, i) => ({ id: entry.id, order: i })),
        }),
      });
      router.refresh();
    } finally {
      setPendingId(null);
    }
  }

  async function remove(id: string, role: string) {
    if (!window.confirm(`Delete "${role}"? This can't be undone.`)) return;

    setPendingId(id);
    try {
      await fetch(`/api/experience/${id}`, { method: "DELETE" });
      setExperience((current) => current.filter((entry) => entry.id !== id));
      router.refresh();
    } finally {
      setPendingId(null);
    }
  }

  if (experience.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border p-8 text-center text-foreground-muted">
        No experience entries yet.{" "}
        <Link href="/admin/experience/new" className="text-accent underline underline-offset-4">
          Add your first one
        </Link>
        .
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {experience.map((entry, index) => (
        <li
          key={entry.id}
          className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium text-foreground">{entry.role}</p>
              <span className="font-mono text-xs text-foreground-muted">{entry.period}</span>
            </div>
            <p className="mt-1 text-sm text-foreground-muted">
              {entry.company} · {entry.employment} · {entry.location}
            </p>
            {entry.skills.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {entry.skills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => move(index, -1)}
              disabled={index === 0 || pendingId === entry.id}
              aria-label={`Move ${entry.role} up`}
              className="focus-ring flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-30"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => move(index, 1)}
              disabled={index === experience.length - 1 || pendingId === entry.id}
              aria-label={`Move ${entry.role} down`}
              className="focus-ring flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-30"
            >
              ↓
            </button>
            <Link
              href={`/admin/experience/${entry.id}/edit`}
              className="focus-ring rounded-md border border-border px-3 py-1.5 font-mono text-xs text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={() => remove(entry.id, entry.role)}
              disabled={pendingId === entry.id}
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
