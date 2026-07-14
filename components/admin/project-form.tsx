"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { ProjectDTO } from "@/lib/projects";

const formSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(120),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only")
    .optional()
    .or(z.literal("")),
  description: z.string().trim().min(1, "Description is required").max(2000),
  techStackInput: z.string().trim().min(1, "Add at least one technology (comma-separated)"),
  demoUrl: z.union([z.url("Enter a valid URL"), z.literal("")]).optional(),
  repoUrl: z.union([z.url("Enter a valid URL"), z.literal("")]).optional(),
  coverImage: z.union([z.url("Enter a valid URL"), z.literal("")]).optional(),
  featured: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

function toFormValues(project?: ProjectDTO): FormValues {
  return {
    title: project?.title ?? "",
    slug: project?.slug ?? "",
    description: project?.description ?? "",
    techStackInput: project?.techStack.join(", ") ?? "",
    demoUrl: project?.demoUrl ?? "",
    repoUrl: project?.repoUrl ?? "",
    coverImage: project?.coverImage ?? "",
    featured: project?.featured ?? false,
  };
}

export function ProjectForm({ project }: { project?: ProjectDTO }) {
  const router = useRouter();
  const isEdit = Boolean(project);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: toFormValues(project),
  });

  async function onSubmit(values: FormValues) {
    setServerError(null);

    const payload = {
      title: values.title,
      description: values.description,
      techStack: values.techStackInput
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      demoUrl: values.demoUrl || "",
      repoUrl: values.repoUrl || "",
      coverImage: values.coverImage || "",
      featured: values.featured,
      ...(values.slug ? { slug: values.slug } : {}),
    };

    const response = await fetch(
      isEdit ? `/api/projects/${project!.id}` : "/api/projects",
      {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setServerError(body?.error?.message ?? "Something went wrong. Please try again.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex max-w-xl flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="font-mono text-xs text-foreground-muted">
          Title
        </label>
        <input
          id="title"
          className="focus-ring rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
          {...register("title")}
        />
        {errors.title && (
          <p role="alert" className="text-xs text-danger">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="slug" className="font-mono text-xs text-foreground-muted">
          Slug (optional — auto-generated from title if left blank)
        </label>
        <input
          id="slug"
          placeholder="my-project"
          className="focus-ring rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
          {...register("slug")}
        />
        {errors.slug && (
          <p role="alert" className="text-xs text-danger">
            {errors.slug.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="font-mono text-xs text-foreground-muted">
          Description
        </label>
        <textarea
          id="description"
          rows={5}
          className="focus-ring resize-y rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
          {...register("description")}
        />
        {errors.description && (
          <p role="alert" className="text-xs text-danger">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="techStackInput" className="font-mono text-xs text-foreground-muted">
          Tech stack (comma-separated)
        </label>
        <input
          id="techStackInput"
          placeholder="Next.js, TypeScript, PostgreSQL"
          className="focus-ring rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
          {...register("techStackInput")}
        />
        {errors.techStackInput && (
          <p role="alert" className="text-xs text-danger">
            {errors.techStackInput.message}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="demoUrl" className="font-mono text-xs text-foreground-muted">
            Live demo URL
          </label>
          <input
            id="demoUrl"
            className="focus-ring rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
            {...register("demoUrl")}
          />
          {errors.demoUrl && (
            <p role="alert" className="text-xs text-danger">
              {errors.demoUrl.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="repoUrl" className="font-mono text-xs text-foreground-muted">
            Source code URL
          </label>
          <input
            id="repoUrl"
            className="focus-ring rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
            {...register("repoUrl")}
          />
          {errors.repoUrl && (
            <p role="alert" className="text-xs text-danger">
              {errors.repoUrl.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="coverImage" className="font-mono text-xs text-foreground-muted">
          Cover image URL
        </label>
        <input
          id="coverImage"
          className="focus-ring rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
          {...register("coverImage")}
        />
        {errors.coverImage && (
          <p role="alert" className="text-xs text-danger">
            {errors.coverImage.message}
          </p>
        )}
      </div>

      <label htmlFor="featured" className="flex items-center gap-2 font-mono text-sm text-foreground">
        <input
          id="featured"
          type="checkbox"
          className="focus-ring h-4 w-4 rounded border-border accent-[var(--accent)]"
          {...register("featured")}
        />
        Featured on homepage
      </label>

      {serverError && (
        <p role="alert" className="rounded-md border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {serverError}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="focus-ring inline-flex items-center justify-center rounded-md bg-accent px-5 py-2.5 font-mono text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Saving…" : isEdit ? "Save changes" : "Create project"}
        </button>
      </div>
    </form>
  );
}
