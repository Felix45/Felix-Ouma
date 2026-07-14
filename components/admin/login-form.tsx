"use client";

import { useActionState } from "react";
import { adminLogin } from "@/app/admin/login/actions";
import { ArrowUpRightIcon, LockIcon, MailIcon } from "@/components/icons";

export function LoginForm() {
  const [error, formAction, pending] = useActionState(adminLogin, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-mono text-xs text-foreground-muted">
          Email
        </label>
        <div className="relative">
          <MailIcon className="pointer-events-none absolute top-1/2 left-4 h-4.5 w-4.5 -translate-y-1/2 text-foreground-muted" />
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="focus-ring w-full rounded-md border border-border bg-surface py-3.5 pr-4 pl-11 text-base text-foreground transition-colors placeholder:text-foreground-muted/60 focus:border-accent"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-mono text-xs text-foreground-muted">
          Password
        </label>
        <div className="relative">
          <LockIcon className="pointer-events-none absolute top-1/2 left-4 h-4.5 w-4.5 -translate-y-1/2 text-foreground-muted" />
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="focus-ring w-full rounded-md border border-border bg-surface py-3.5 pr-4 pl-11 text-base text-foreground transition-colors placeholder:text-foreground-muted/60 focus:border-accent"
          />
        </div>
      </div>
      {error && (
        <p role="alert" className="rounded-md border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="btn btn-primary focus-ring justify-center py-3.5 text-base disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {pending ? "Signing in…" : "Sign in"}
        {!pending && <ArrowUpRightIcon className="h-4 w-4" />}
      </button>
    </form>
  );
}
