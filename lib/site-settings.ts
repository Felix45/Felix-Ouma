import "server-only";

import { db } from "@/lib/db";
import type { SiteSettingsTranslation, TranslationsMap } from "@/lib/i18n/translations";
import type { SiteSettingsUpdateInput } from "@/lib/validations";

const SINGLETON_ID = "singleton";

type SiteSettingsRow = {
  id: string;
  name: string;
  title: string;
  description: string;
  role: string;
  yearsOfExperience: string;
  education: string;
  resumeUrl: string;
  heroSummary: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  aboutHighlights: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  mediumUrl: string;
  focusAreas: string;
  skillLanguages: string;
  skillFrameworks: string;
  skillTools: string;
  translations: string;
  updatedAt: Date;
};

export type SiteSettingsDTO = {
  name: string;
  title: string;
  description: string;
  role: string;
  yearsOfExperience: string;
  education: string;
  resumeUrl: string;
  heroSummary: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  aboutHighlights: string[];
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    medium: string;
  };
  focusAreas: string[];
  skills: {
    languages: string[];
    frameworks: string[];
    tools: string[];
  };
  translations: TranslationsMap<SiteSettingsTranslation>;
};

export const DEFAULT_SITE_SETTINGS: SiteSettingsDTO = {
  name: "Felix Ouma",
  title: "Felix Ouma — Full-Stack Software Developer",
  description:
    "Full-stack software developer with 6+ years of experience building scalable web applications across education, e-commerce, and cybersecurity.",
  role: "Full-Stack Software Developer",
  yearsOfExperience: "6+",
  education: "BSc Mathematics & Computer Science",
  resumeUrl: "/resume.pdf",
  heroSummary:
    "Full-Stack Software Developer with 6+ years of experience building scalable web applications across education, e-commerce, and cybersecurity.",
  aboutParagraph1:
    "I build full-stack products end to end — from data models and APIs to the interfaces people actually use. Over the past six years I've shipped learning platforms, storefronts, and internal security tooling, usually as the person who owns a feature from database schema to production.",
  aboutParagraph2:
    "I care about code that stays readable after the person who wrote it moves on, and about building things that hold up under real traffic and real edge cases.",
  aboutHighlights: [
    "End-to-end feature ownership",
    "Readable, maintainable code",
    "Built for real traffic & edge cases",
    "Education · E-commerce · Security",
  ],
  social: {
    github: "https://github.com/Felix45",
    linkedin: "https://linkedin.com/in/felix-ouma",
    twitter: "https://x.com/Felix_Atonoh",
    medium: "https://medium.com/@fatonoh",
  },
  focusAreas: ["React", "Next.js"],
  skills: {
    languages: ["JavaScript", "TypeScript", "Ruby", "HTML", "CSS", "SQL"],
    frameworks: ["React", "Next.js", "Ruby on Rails", "Node.js", "Tailwind CSS"],
    tools: ["Git", "Docker", "PostgreSQL", "Prisma", "REST APIs", "CI/CD"],
  },
  translations: {},
};

function toDTO(row: SiteSettingsRow): SiteSettingsDTO {
  return {
    name: row.name,
    title: row.title,
    description: row.description,
    role: row.role,
    yearsOfExperience: row.yearsOfExperience,
    education: row.education,
    resumeUrl: row.resumeUrl,
    heroSummary: row.heroSummary,
    aboutParagraph1: row.aboutParagraph1,
    aboutParagraph2: row.aboutParagraph2,
    aboutHighlights: JSON.parse(row.aboutHighlights) as string[],
    social: {
      github: row.githubUrl,
      linkedin: row.linkedinUrl,
      twitter: row.twitterUrl,
      medium: row.mediumUrl,
    },
    focusAreas: JSON.parse(row.focusAreas) as string[],
    skills: {
      languages: JSON.parse(row.skillLanguages) as string[],
      frameworks: JSON.parse(row.skillFrameworks) as string[],
      tools: JSON.parse(row.skillTools) as string[],
    },
    translations: JSON.parse(row.translations) as TranslationsMap<SiteSettingsTranslation>,
  };
}

export async function getSiteSettings(): Promise<SiteSettingsDTO> {
  const row = await db.siteSettings.findUnique({ where: { id: SINGLETON_ID } });
  return row ? toDTO(row) : DEFAULT_SITE_SETTINGS;
}

export async function updateSiteSettings(
  input: SiteSettingsUpdateInput
): Promise<SiteSettingsDTO> {
  const current = await getSiteSettings();
  const merged = { ...current, ...input };

  const row = await db.siteSettings.upsert({
    where: { id: SINGLETON_ID },
    create: {
      id: SINGLETON_ID,
      name: merged.name,
      title: merged.title,
      description: merged.description,
      role: merged.role,
      yearsOfExperience: merged.yearsOfExperience,
      education: merged.education,
      resumeUrl: merged.resumeUrl,
      heroSummary: merged.heroSummary,
      aboutParagraph1: merged.aboutParagraph1,
      aboutParagraph2: merged.aboutParagraph2,
      aboutHighlights: JSON.stringify(merged.aboutHighlights),
      githubUrl: merged.social.github,
      linkedinUrl: merged.social.linkedin,
      twitterUrl: merged.social.twitter,
      mediumUrl: merged.social.medium,
      focusAreas: JSON.stringify(merged.focusAreas),
      skillLanguages: JSON.stringify(merged.skills.languages),
      skillFrameworks: JSON.stringify(merged.skills.frameworks),
      skillTools: JSON.stringify(merged.skills.tools),
      translations: JSON.stringify(merged.translations),
    },
    update: {
      name: merged.name,
      title: merged.title,
      description: merged.description,
      role: merged.role,
      yearsOfExperience: merged.yearsOfExperience,
      education: merged.education,
      resumeUrl: merged.resumeUrl,
      heroSummary: merged.heroSummary,
      aboutParagraph1: merged.aboutParagraph1,
      aboutParagraph2: merged.aboutParagraph2,
      aboutHighlights: JSON.stringify(merged.aboutHighlights),
      githubUrl: merged.social.github,
      linkedinUrl: merged.social.linkedin,
      twitterUrl: merged.social.twitter,
      mediumUrl: merged.social.medium,
      focusAreas: JSON.stringify(merged.focusAreas),
      skillLanguages: JSON.stringify(merged.skills.languages),
      skillFrameworks: JSON.stringify(merged.skills.frameworks),
      skillTools: JSON.stringify(merged.skills.tools),
      translations: JSON.stringify(merged.translations),
    },
  });

  return toDTO(row);
}
