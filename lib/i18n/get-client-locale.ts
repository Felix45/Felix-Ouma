import { LOCALE_COOKIE, defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";

export function getClientLocale(): Locale {
  if (typeof document === "undefined") return defaultLocale;
  const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`));
  const value = match ? decodeURIComponent(match[1]) : undefined;
  return isLocale(value) ? value : defaultLocale;
}
