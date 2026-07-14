import "server-only";

import { db } from "@/lib/db";
import type { ExperienceTranslation, TranslationsMap } from "@/lib/i18n/translations";
import type { ExperienceInput, ExperienceUpdateInput } from "@/lib/validations";

type ExperienceRow = {
  id: string;
  role: string;
  company: string;
  employment: string;
  period: string;
  location: string;
  skills: string;
  highlights: string;
  translations: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ExperienceDTO = {
  id: string;
  role: string;
  company: string;
  employment: string;
  period: string;
  location: string;
  skills: string[];
  highlights: string[];
  translations: TranslationsMap<ExperienceTranslation>;
  order: number;
  createdAt: string;
  updatedAt: string;
};

function toDTO(row: ExperienceRow): ExperienceDTO {
  return {
    id: row.id,
    role: row.role,
    company: row.company,
    employment: row.employment,
    period: row.period,
    location: row.location,
    skills: JSON.parse(row.skills) as string[],
    highlights: JSON.parse(row.highlights) as string[],
    translations: JSON.parse(row.translations) as TranslationsMap<ExperienceTranslation>,
    order: row.order,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function listExperience(): Promise<ExperienceDTO[]> {
  const rows = await db.experience.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return rows.map(toDTO);
}

export async function getExperienceById(id: string): Promise<ExperienceDTO | null> {
  const row = await db.experience.findUnique({ where: { id } });
  return row ? toDTO(row) : null;
}

export async function createExperience(input: ExperienceInput): Promise<ExperienceDTO> {
  const row = await db.experience.create({
    data: {
      role: input.role,
      company: input.company,
      employment: input.employment,
      period: input.period,
      location: input.location,
      skills: JSON.stringify(input.skills ?? []),
      highlights: JSON.stringify(input.highlights ?? []),
      translations: JSON.stringify(input.translations ?? {}),
      order: input.order ?? 0,
    },
  });

  return toDTO(row);
}

export async function updateExperience(
  id: string,
  input: ExperienceUpdateInput
): Promise<ExperienceDTO | null> {
  const existing = await db.experience.findUnique({ where: { id } });
  if (!existing) return null;

  const row = await db.experience.update({
    where: { id },
    data: {
      ...(input.role !== undefined ? { role: input.role } : {}),
      ...(input.company !== undefined ? { company: input.company } : {}),
      ...(input.employment !== undefined ? { employment: input.employment } : {}),
      ...(input.period !== undefined ? { period: input.period } : {}),
      ...(input.location !== undefined ? { location: input.location } : {}),
      ...(input.skills !== undefined ? { skills: JSON.stringify(input.skills) } : {}),
      ...(input.highlights !== undefined
        ? { highlights: JSON.stringify(input.highlights) }
        : {}),
      ...(input.translations !== undefined
        ? { translations: JSON.stringify(input.translations) }
        : {}),
      ...(input.order !== undefined ? { order: input.order } : {}),
    },
  });

  return toDTO(row);
}

export async function deleteExperience(id: string): Promise<boolean> {
  try {
    await db.experience.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

export async function reorderExperience(
  items: { id: string; order: number }[]
): Promise<void> {
  await db.$transaction(
    items.map((item) =>
      db.experience.update({ where: { id: item.id }, data: { order: item.order } })
    )
  );
}
