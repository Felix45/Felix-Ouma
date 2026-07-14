"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ContactMessageDTO } from "@/lib/contact";

export function MessagesList({ initialMessages }: { initialMessages: ContactMessageDTO[] }) {
  const router = useRouter();
  const [messages, setMessages] = useState(initialMessages);
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function remove(id: string) {
    if (!window.confirm("Delete this message?")) return;

    setPendingId(id);
    try {
      await fetch(`/api/contact/${id}`, { method: "DELETE" });
      setMessages((current) => current.filter((message) => message.id !== id));
      router.refresh();
    } finally {
      setPendingId(null);
    }
  }

  if (messages.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border p-8 text-center text-foreground-muted">
        No messages yet.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {messages.map((message) => (
        <li key={message.id} className="rounded-lg border border-border bg-surface p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-medium text-foreground">{message.name}</p>
              <a
                href={`mailto:${message.email}`}
                className="font-mono text-xs text-accent hover:underline"
              >
                {message.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <time
                dateTime={message.createdAt}
                className="font-mono text-xs text-foreground-muted"
              >
                {new Date(message.createdAt).toLocaleDateString()}
              </time>
              <button
                type="button"
                onClick={() => remove(message.id)}
                disabled={pendingId === message.id}
                className="focus-ring rounded-md border border-danger/30 px-3 py-1.5 font-mono text-xs text-danger transition-colors hover:bg-danger/10 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground-muted">
            {message.message}
          </p>
        </li>
      ))}
    </ul>
  );
}
