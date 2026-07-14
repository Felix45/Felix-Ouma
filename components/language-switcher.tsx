"use client";

import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, locales, localeNames, type Locale } from "@/lib/i18n/config";

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

  function onChange(next: Locale) {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000`;
    router.refresh();
  }

  return (
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
      className="focus-ring appearance-none cursor-pointer rounded-md border border-border bg-surface py-2 pr-8 pl-2.5 font-mono text-xs text-foreground-muted transition-colors hover:border-accent hover:text-accent"
    >
      {locales.map((code) => (
        <option key={code} value={code}>
          {localeNames[code]}
        </option>
      ))}
    </select>
  );
}
