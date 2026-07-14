import "server-only";

import { db } from "@/lib/db";
import type { ServiceTranslation, TranslationsMap } from "@/lib/i18n/translations";
import type { ServiceInput, ServiceUpdateInput } from "@/lib/validations";

type ServiceRow = {
  id: string;
  title: string;
  description: string;
  translations: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ServiceDTO = {
  id: string;
  title: string;
  description: string;
  translations: TranslationsMap<ServiceTranslation>;
  order: number;
  createdAt: string;
  updatedAt: string;
};

function toDTO(row: ServiceRow): ServiceDTO {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    translations: JSON.parse(row.translations) as TranslationsMap<ServiceTranslation>,
    order: row.order,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function listServices(): Promise<ServiceDTO[]> {
  const rows = await db.service.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return rows.map(toDTO);
}

export async function getServiceById(id: string): Promise<ServiceDTO | null> {
  const row = await db.service.findUnique({ where: { id } });
  return row ? toDTO(row) : null;
}

export async function createService(input: ServiceInput): Promise<ServiceDTO> {
  const row = await db.service.create({
    data: {
      title: input.title,
      description: input.description,
      translations: JSON.stringify(input.translations ?? {}),
      order: input.order ?? 0,
    },
  });

  return toDTO(row);
}

export async function updateService(
  id: string,
  input: ServiceUpdateInput
): Promise<ServiceDTO | null> {
  const existing = await db.service.findUnique({ where: { id } });
  if (!existing) return null;

  const row = await db.service.update({
    where: { id },
    data: {
      ...(input.title !== undefined ? { title: input.title } : {}),
      ...(input.description !== undefined ? { description: input.description } : {}),
      ...(input.translations !== undefined
        ? { translations: JSON.stringify(input.translations) }
        : {}),
      ...(input.order !== undefined ? { order: input.order } : {}),
    },
  });

  return toDTO(row);
}

export async function deleteService(id: string): Promise<boolean> {
  try {
    await db.service.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

export async function reorderServices(
  items: { id: string; order: number }[]
): Promise<void> {
  await db.$transaction(
    items.map((item) =>
      db.service.update({ where: { id: item.id }, data: { order: item.order } })
    )
  );
}
