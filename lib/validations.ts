import { z } from "zod";

const siteSettingsTranslationSchema = z
  .object({
    title: z.string().trim().max(160).optional(),
    description: z.string().trim().max(300).optional(),
    role: z.string().trim().max(120).optional(),
    heroSummary: z.string().trim().max(300).optional(),
    education: z.string().trim().max(160).optional(),
    aboutParagraph1: z.string().trim().max(1000).optional(),
    aboutParagraph2: z.string().trim().max(1000).optional(),
    aboutHighlights: z.array(z.string().trim().min(1)).max(12).optional(),
  })
  .partial();

const siteSettingsTranslationsSchema = z
  .object({
    fr: siteSettingsTranslationSchema.optional(),
    sw: siteSettingsTranslationSchema.optional(),
    luo: siteSettingsTranslationSchema.optional(),
  })
  .partial();

const experienceTranslationSchema = z
  .object({
    role: z.string().trim().max(160).optional(),
    employment: z.string().trim().max(60).optional(),
    highlights: z.array(z.string().trim().min(1)).optional(),
  })
  .partial();

const experienceTranslationsSchema = z
  .object({
    fr: experienceTranslationSchema.optional(),
    sw: experienceTranslationSchema.optional(),
    luo: experienceTranslationSchema.optional(),
  })
  .partial();

const serviceTranslationSchema = z
  .object({
    title: z.string().trim().max(120).optional(),
    description: z.string().trim().max(500).optional(),
  })
  .partial();

const serviceTranslationsSchema = z
  .object({
    fr: serviceTranslationSchema.optional(),
    sw: serviceTranslationSchema.optional(),
    luo: serviceTranslationSchema.optional(),
  })
  .partial();

const optionalUrl = z
  .union([z.url("Enter a valid URL"), z.literal("")])
  .optional()
  .nullable();

export const projectInputSchema = z.object({
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only")
    .optional(),
  title: z.string().trim().min(1, "Title is required").max(120),
  description: z.string().trim().min(1, "Description is required").max(2000),
  techStack: z
    .array(z.string().trim().min(1))
    .min(1, "Add at least one technology"),
  demoUrl: optionalUrl,
  repoUrl: optionalUrl,
  coverImage: optionalUrl,
  featured: z.boolean().optional().default(false),
  order: z.number().int().optional().default(0),
});

export const projectUpdateSchema = projectInputSchema.partial();

export const reorderSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.string().min(1),
        order: z.number().int(),
      })
    )
    .min(1),
});

export const contactInputSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.email("Enter a valid email address"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
});

export const siteSettingsSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  title: z.string().trim().min(1, "Title is required").max(160),
  description: z.string().trim().min(1, "Description is required").max(300),
  role: z.string().trim().min(1, "Role is required").max(120),
  yearsOfExperience: z.string().trim().min(1, "Required").max(20),
  education: z.string().trim().min(1, "Required").max(160),
  resumeUrl: z.string().trim().min(1, "Required").max(300),
  heroSummary: z.string().trim().min(1, "Required").max(300),
  aboutParagraph1: z.string().trim().min(1, "Required").max(1000),
  aboutParagraph2: z.string().trim().min(1, "Required").max(1000),
  aboutHighlights: z.array(z.string().trim().min(1)).max(12),
  social: z.object({
    github: z.union([z.url("Enter a valid URL"), z.literal("")]),
    linkedin: z.union([z.url("Enter a valid URL"), z.literal("")]),
    twitter: z.union([z.url("Enter a valid URL"), z.literal("")]),
    medium: z.union([z.url("Enter a valid URL"), z.literal("")]),
  }),
  focusAreas: z.array(z.string().trim().min(1)).min(1, "Add at least one").max(4),
  skills: z.object({
    languages: z.array(z.string().trim().min(1)).min(1, "Add at least one"),
    frameworks: z.array(z.string().trim().min(1)).min(1, "Add at least one"),
    tools: z.array(z.string().trim().min(1)).min(1, "Add at least one"),
  }),
  translations: siteSettingsTranslationsSchema.optional(),
});

export const siteSettingsUpdateSchema = siteSettingsSchema.partial();

export const experienceInputSchema = z.object({
  role: z.string().trim().min(1, "Role is required").max(160),
  company: z.string().trim().min(1, "Company is required").max(160),
  employment: z.string().trim().min(1, "Employment type is required").max(60),
  period: z.string().trim().min(1, "Period is required").max(80),
  location: z.string().trim().min(1, "Location is required").max(160),
  skills: z.array(z.string().trim().min(1)).default([]),
  highlights: z.array(z.string().trim().min(1)).default([]),
  order: z.number().int().optional().default(0),
  translations: experienceTranslationsSchema.optional(),
});

export const experienceUpdateSchema = experienceInputSchema.partial();

export const serviceInputSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(120),
  description: z.string().trim().min(1, "Description is required").max(500),
  order: z.number().int().optional().default(0),
  translations: serviceTranslationsSchema.optional(),
});

export const serviceUpdateSchema = serviceInputSchema.partial();

export type ProjectInput = z.infer<typeof projectInputSchema>;
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>;
export type ContactInput = z.infer<typeof contactInputSchema>;
export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
export type SiteSettingsUpdateInput = z.infer<typeof siteSettingsUpdateSchema>;
export type ExperienceInput = z.infer<typeof experienceInputSchema>;
export type ExperienceUpdateInput = z.infer<typeof experienceUpdateSchema>;
export type ServiceInput = z.infer<typeof serviceInputSchema>;
export type ServiceUpdateInput = z.infer<typeof serviceUpdateSchema>;
