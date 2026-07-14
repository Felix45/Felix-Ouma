"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ServiceDTO } from "@/lib/services";

export function ServicesManager({ initialServices }: { initialServices: ServiceDTO[] }) {
  const router = useRouter();
  const [services, setServices] = useState(initialServices);
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function move(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= services.length) return;

    const next = [...services];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    setServices(next);
    setPendingId(next[index].id);

    try {
      await fetch("/api/services/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: next.map((service, i) => ({ id: service.id, order: i })),
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
      await fetch(`/api/services/${id}`, { method: "DELETE" });
      setServices((current) => current.filter((service) => service.id !== id));
      router.refresh();
    } finally {
      setPendingId(null);
    }
  }

  if (services.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border p-8 text-center text-foreground-muted">
        No services yet.{" "}
        <Link href="/admin/services/new" className="text-accent underline underline-offset-4">
          Add your first one
        </Link>
        .
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {services.map((service, index) => (
        <li
          key={service.id}
          className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0 flex-1">
            <p className="font-medium text-foreground">{service.title}</p>
            <p className="mt-1 text-sm text-foreground-muted">{service.description}</p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => move(index, -1)}
              disabled={index === 0 || pendingId === service.id}
              aria-label={`Move ${service.title} up`}
              className="focus-ring flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-30"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => move(index, 1)}
              disabled={index === services.length - 1 || pendingId === service.id}
              aria-label={`Move ${service.title} down`}
              className="focus-ring flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-30"
            >
              ↓
            </button>
            <Link
              href={`/admin/services/${service.id}/edit`}
              className="focus-ring rounded-md border border-border px-3 py-1.5 font-mono text-xs text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={() => remove(service.id, service.title)}
              disabled={pendingId === service.id}
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
