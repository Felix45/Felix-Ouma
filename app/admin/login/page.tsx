import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "@/components/admin/login-form";
import { ChevronLeftIcon, LockIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.user) redirect("/admin");

  return (
    <section className="relative mx-auto flex w-full max-w-lg flex-1 flex-col justify-center overflow-hidden px-4 py-20 sm:py-28">
      <div
        className="glow-blob top-0 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 opacity-50"
        aria-hidden="true"
      />
      <div className="dot-grid absolute top-8 right-2 h-24 w-24 opacity-70" aria-hidden="true" />

      <Reveal>
        <Link
          href="/"
          className="focus-ring mb-6 inline-flex items-center gap-1.5 font-mono text-xs text-foreground-muted transition-colors hover:text-accent"
        >
          <ChevronLeftIcon className="h-3.5 w-3.5" />
          cd ..
        </Link>
      </Reveal>

      <Reveal delay={0.05} className="relative rounded-lg border border-border bg-surface shadow-2xl shadow-black/20">
        <div className="flex items-center gap-1.5 border-b border-border px-6 py-4 sm:px-8">
          <span className="h-3 w-3 rounded-full bg-danger/70" />
          <span className="h-3 w-3 rounded-full bg-accent/50" />
          <span className="h-3 w-3 rounded-full bg-accent/80" />
          <span className="ml-2 font-mono text-xs text-foreground-muted">admin@portfolio: ~</span>
        </div>

        <div className="p-8 sm:p-10">
          <p className="font-mono text-sm text-accent">$ sudo login</p>
          <div className="mt-4 mb-9 flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-accent/30 bg-accent/10 text-accent">
              <LockIcon className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-3xl font-semibold text-foreground">Admin sign in</h1>
              <p className="font-mono text-xs text-foreground-muted">Restricted — authorized access only</p>
            </div>
          </div>
          <LoginForm />
        </div>
      </Reveal>
    </section>
  );
}
