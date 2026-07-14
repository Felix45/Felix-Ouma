"use client";

const STORAGE_KEY = "theme";

function toggleTheme() {
  const root = document.documentElement;
  const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  window.localStorage.setItem(STORAGE_KEY, next);
}

// Both icons always render identically on server and client — there is no
// React state to hydrate. Visibility is driven purely by CSS off the
// data-theme attribute (see globals.css), which the inline anti-flash
// script in app/layout.tsx already sets correctly before first paint.
export function ThemeToggle({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="focus-ring icon-btn flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-border text-foreground-muted hover:border-accent hover:text-accent"
      aria-label={label}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        className="theme-icon-dark h-4.5 w-4.5"
      >
        <circle cx="12" cy="12" r="4" />
        <path
          strokeLinecap="round"
          d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        className="theme-icon-light h-4.5 w-4.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
        />
      </svg>
    </button>
  );
}
