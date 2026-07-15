"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { LOCALE_COOKIE, locales, localeNames, type Locale } from "@/lib/i18n/config";
import { FlagIcon } from "@/components/flag-icons";

const chevron = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#92a89d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>'
)}")`;

export function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function onChange(next: Locale) {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000`;
    router.refresh();
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <div ref={containerRef} className="relative sm:hidden">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={label}
          onClick={() => setOpen((value) => !value)}
          className="focus-ring flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface transition-colors hover:border-accent"
        >
          <FlagIcon locale={locale} className="h-[0.8125rem] w-[1.21875rem] rounded-[2px]" />
        </button>

        {open && (
          <ul
            role="listbox"
            aria-label={label}
            className="absolute top-[calc(100%+0.4rem)] right-0 z-50 flex flex-col gap-0.5 rounded-md border border-border bg-surface p-1 shadow-lg"
          >
            {locales.map((code) => (
              <li key={code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={code === locale}
                  onClick={() => onChange(code)}
                  className={clsx(
                    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 font-mono text-xs whitespace-nowrap transition-colors hover:bg-background hover:text-accent",
                    code === locale ? "text-accent" : "text-foreground-muted"
                  )}
                >
                  <FlagIcon locale={code} className="h-[0.6875rem] w-[1.03125rem] shrink-0 rounded-[2px]" />
                  {localeNames[code]}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <select
        aria-label={label}
        value={locale}
        onChange={(event) => onChange(event.target.value as Locale)}
        style={{
          backgroundImage: chevron,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.65rem center",
          backgroundSize: "12px",
        }}
        className="focus-ring hidden appearance-none rounded-md border border-border bg-surface py-2 pr-8 pl-2.5 font-mono text-xs text-foreground-muted transition-colors hover:border-accent hover:text-accent sm:block"
      >
        {locales.map((code) => (
          <option key={code} value={code}>
            {localeNames[code]}
          </option>
        ))}
      </select>
    </>
  );
}
