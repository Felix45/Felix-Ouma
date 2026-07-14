import type { Locale } from "@/lib/i18n/config";

export type NonEnglishLocale = Exclude<Locale, "en">;

export type TranslationsMap<T> = Partial<Record<NonEnglishLocale, T>>;

export type SiteSettingsTranslation = Partial<{
  title: string;
  description: string;
  role: string;
  heroSummary: string;
  education: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  aboutHighlights: string[];
}>;

export type ExperienceTranslation = Partial<{
  role: string;
  employment: string;
  highlights: string[];
}>;

export type ServiceTranslation = Partial<{
  title: string;
  description: string;
}>;
