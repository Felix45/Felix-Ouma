import type { Locale } from "@/lib/i18n/config";
import type { ExperienceDTO } from "@/lib/experience";
import type { ServiceDTO } from "@/lib/services";
import type { SiteSettingsDTO } from "@/lib/site-settings";

function pick<T>(translated: T | undefined, fallback: T): T {
  if (translated === undefined) return fallback;
  if (typeof translated === "string") return (translated.trim() ? translated : fallback) as T;
  if (Array.isArray(translated)) return (translated.length ? translated : fallback) as T;
  return translated;
}

export function localizeSiteSettings(settings: SiteSettingsDTO, locale: Locale): SiteSettingsDTO {
  if (locale === "en") return settings;
  const t = settings.translations[locale] ?? {};

  return {
    ...settings,
    title: pick(t.title, settings.title),
    description: pick(t.description, settings.description),
    role: pick(t.role, settings.role),
    heroSummary: pick(t.heroSummary, settings.heroSummary),
    education: pick(t.education, settings.education),
    aboutParagraph1: pick(t.aboutParagraph1, settings.aboutParagraph1),
    aboutParagraph2: pick(t.aboutParagraph2, settings.aboutParagraph2),
    aboutHighlights: pick(t.aboutHighlights, settings.aboutHighlights),
  };
}

export function localizeExperience(entry: ExperienceDTO, locale: Locale): ExperienceDTO {
  if (locale === "en") return entry;
  const t = entry.translations[locale] ?? {};

  return {
    ...entry,
    role: pick(t.role, entry.role),
    employment: pick(t.employment, entry.employment),
    highlights: pick(t.highlights, entry.highlights),
  };
}

export function localizeExperienceList(list: ExperienceDTO[], locale: Locale): ExperienceDTO[] {
  return list.map((entry) => localizeExperience(entry, locale));
}

export function localizeService(service: ServiceDTO, locale: Locale): ServiceDTO {
  if (locale === "en") return service;
  const t = service.translations[locale] ?? {};

  return {
    ...service,
    title: pick(t.title, service.title),
    description: pick(t.description, service.description),
  };
}

export function localizeServiceList(list: ServiceDTO[], locale: Locale): ServiceDTO[] {
  return list.map((service) => localizeService(service, locale));
}
