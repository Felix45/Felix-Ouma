import "server-only";

import { db } from "@/lib/db";
import { slugify } from "@/lib/slug";
import type { ProjectInput, ProjectUpdateInput } from "@/lib/validations";

type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  techStack: string;
  demoUrl: string | null;
  repoUrl: string | null;
  coverImage: string | null;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ProjectDTO = {
  id: string;
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  demoUrl: string | null;
  repoUrl: string | null;
  coverImage: string | null;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};

function toDTO(row: ProjectRow): ProjectDTO {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    techStack: JSON.parse(row.techStack) as string[],
    demoUrl: row.demoUrl,
    repoUrl: row.repoUrl,
    coverImage: row.coverImage,
    featured: row.featured,
    order: row.order,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

async function uniqueSlug(base: string, ignoreId?: string): Promise<string> {
  const root = slugify(base) || "project";
  let candidate = root;
  let suffix = 2;

  while (
    await db.project.findFirst({
      where: { slug: candidate, ...(ignoreId ? { id: { not: ignoreId } } : {}) },
      select: { id: true },
    })
  ) {
    candidate = `${root}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}

export async function listProjects(options?: {
  tech?: string;
  featuredOnly?: boolean;
}): Promise<ProjectDTO[]> {
  const rows = await db.project.findMany({
    where: options?.featuredOnly ? { featured: true } : undefined,
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  const projects = rows.map(toDTO);

  if (options?.tech) {
    const tech = options.tech.toLowerCase();
    return projects.filter((project) =>
      project.techStack.some((item) => item.toLowerCase() === tech)
    );
  }

  return projects;
}

export async function getProjectBySlug(slug: string): Promise<ProjectDTO | null> {
  const row = await db.project.findUnique({ where: { slug } });
  return row ? toDTO(row) : null;
}

export async function getProjectById(id: string): Promise<ProjectDTO | null> {
  const row = await db.project.findUnique({ where: { id } });
  return row ? toDTO(row) : null;
}

export async function createProject(input: ProjectInput): Promise<ProjectDTO> {
  const slug = input.slug ? await uniqueSlug(input.slug) : await uniqueSlug(input.title);

  const row = await db.project.create({
    data: {
      slug,
      title: input.title,
      description: input.description,
      techStack: JSON.stringify(input.techStack),
      demoUrl: input.demoUrl || null,
      repoUrl: input.repoUrl || null,
      coverImage: input.coverImage || null,
      featured: input.featured ?? false,
      order: input.order ?? 0,
    },
  });

  return toDTO(row);
}

export async function updateProject(
  id: string,
  input: ProjectUpdateInput
): Promise<ProjectDTO | null> {
  const existing = await db.project.findUnique({ where: { id } });
  if (!existing) return null;

  const slug = input.slug ? await uniqueSlug(input.slug, id) : undefined;

  const row = await db.project.update({
    where: { id },
    data: {
      ...(slug ? { slug } : {}),
      ...(input.title !== undefined ? { title: input.title } : {}),
      ...(input.description !== undefined ? { description: input.description } : {}),
      ...(input.techStack !== undefined
        ? { techStack: JSON.stringify(input.techStack) }
        : {}),
      ...(input.demoUrl !== undefined ? { demoUrl: input.demoUrl || null } : {}),
      ...(input.repoUrl !== undefined ? { repoUrl: input.repoUrl || null } : {}),
      ...(input.coverImage !== undefined ? { coverImage: input.coverImage || null } : {}),
      ...(input.featured !== undefined ? { featured: input.featured } : {}),
      ...(input.order !== undefined ? { order: input.order } : {}),
    },
  });

  return toDTO(row);
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    await db.project.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

export async function reorderProjects(
  items: { id: string; order: number }[]
): Promise<void> {
  await db.$transaction(
    items.map((item) =>
      db.project.update({ where: { id: item.id }, data: { order: item.order } })
    )
  );
}

export async function listTechStack(): Promise<string[]> {
  const rows = await db.project.findMany({ select: { techStack: true } });
  const all = new Set<string>();
  for (const row of rows) {
    for (const tech of JSON.parse(row.techStack) as string[]) {
      all.add(tech);
    }
  }
  return Array.from(all).sort((a, b) => a.localeCompare(b));
}
