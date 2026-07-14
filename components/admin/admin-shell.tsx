import Link from "next/link";
import { adminLogout } from "@/app/admin/actions";

const tabs = [
  { href: "/admin", label: "Projects" },
  { href: "/admin/projects/new", label: "New project" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/site", label: "Site" },
  { href: "/admin/messages", label: "Messages" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="font-mono text-sm text-accent">$ admin --dashboard</p>
          <nav className="mt-3 flex flex-wrap gap-1" aria-label="Admin">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className="focus-ring rounded-md px-3 py-1.5 font-mono text-sm text-foreground-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
        <form action={adminLogout}>
          <button
            type="submit"
            className="focus-ring rounded-md border border-border px-4 py-2 font-mono text-sm text-foreground-muted transition-colors hover:border-accent hover:text-accent"
          >
            Log out
          </button>
        </form>
      </div>
      {children}
    </div>
  );
}
