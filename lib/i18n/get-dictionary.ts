import "server-only";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/lib/i18n/dictionaries/en").then((m) => m.default),
  fr: () => import("@/lib/i18n/dictionaries/fr").then((m) => m.default),
  sw: () => import("@/lib/i18n/dictionaries/sw").then((m) => m.default),
  luo: () => import("@/lib/i18n/dictionaries/luo").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

export type { Dictionary };
