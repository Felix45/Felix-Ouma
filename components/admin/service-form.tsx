"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { localeNames } from "@/lib/i18n/config";
import type { NonEnglishLocale } from "@/lib/i18n/translations";
import type { ServiceDTO } from "@/lib/services";

const nonEnglishLocales: NonEnglishLocale[] = ["fr", "sw", "luo"];

const translationFieldsSchema = z.object({
  title: z.string().max(120).optional().or(z.literal("")),
  description: z.string().max(500).optional().or(z.literal("")),
});

const formSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(120),
  description: z.string().trim().min(1, "Description is required").max(500),
  translations: z.object({
    fr: translationFieldsSchema,
    sw: translationFieldsSchema,
    luo: translationFieldsSchema,
  }),
});

type FormValues = z.infer<typeof formSchema>;

function toTranslationFormValues(t?: ServiceDTO["translations"][NonEnglishLocale]) {
  return {
    title: t?.title ?? "",
    description: t?.description ?? "",
  };
}

function toFormValues(service?: ServiceDTO): FormValues {
  return {
    title: service?.title ?? "",
    description: service?.description ?? "",
    translations: {
      fr: toTranslationFormValues(service?.translations.fr),
      sw: toTranslationFormValues(service?.translations.sw),
      luo: toTranslationFormValues(service?.translations.luo),
    },
  };
}

export function ServiceForm({ service }: { service?: ServiceDTO }) {
  const router = useRouter();
  const isEdit = Boolean(service);
  const [serverError, setServerError] = useState<string | null>(null);
  const [activeLocale, setActiveLocale] = useState<NonEnglishLocale>("fr");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: toFormValues(service),
  });

  async function onSubmit(values: FormValues) {
    setServerError(null);

    const response = await fetch(
      isEdit ? `/api/services/${service!.id}` : "/api/services",
      {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setServerError(body?.error?.message ?? "Something went wrong. Please try again.");
      return;
    }

    router.push("/admin/services");
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
        <label htmlFor="description" className="font-mono text-xs text-foreground-muted">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          className="focus-ring resize-y rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
          {...register("description")}
        />
        {errors.description && (
          <p role="alert" className="text-xs text-danger">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-border pt-5">
        <h2 className="font-mono text-sm text-accent"># Translations</h2>
        <div className="flex flex-wrap gap-2" role="tablist">
          {nonEnglishLocales.map((code) => (
            <button
              key={code}
              type="button"
              role="tab"
              aria-selected={activeLocale === code}
              onClick={() => setActiveLocale(code)}
              className={`focus-ring rounded-md border px-3 py-1.5 font-mono text-xs transition-colors ${
                activeLocale === code
                  ? "border-accent bg-accent/10 text-accent"
                  : errors.translations?.[code]
                    ? "border-danger text-danger hover:border-danger"
                    : "border-border text-foreground-muted hover:border-accent hover:text-accent"
              }`}
            >
              {localeNames[code]}
              {errors.translations?.[code] && " *"}
            </button>
          ))}
        </div>

        {nonEnglishLocales.map((code) => (
          <div key={code} hidden={activeLocale !== code} className="flex flex-col gap-5">
            <p className="text-xs text-foreground-muted">
              Falls back to English for any field left blank.
            </p>
            <div className="flex flex-col gap-1.5">
              <label htmlFor={`translations.${code}.title`} className="font-mono text-xs text-foreground-muted">
                Title
              </label>
              <input
                id={`translations.${code}.title`}
                className="focus-ring rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
                {...register(`translations.${code}.title`)}
              />
              {errors.translations?.[code]?.title && (
                <p role="alert" className="text-xs text-danger">
                  {errors.translations[code]?.title?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={`translations.${code}.description`}
                className="font-mono text-xs text-foreground-muted"
              >
                Description
              </label>
              <textarea
                id={`translations.${code}.description`}
                rows={4}
                className="focus-ring resize-y rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
                {...register(`translations.${code}.description`)}
              />
              {errors.translations?.[code]?.description && (
                <p role="alert" className="text-xs text-danger">
                  {errors.translations[code]?.description?.message}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

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
          {isSubmitting ? "Saving…" : isEdit ? "Save changes" : "Add service"}
        </button>
      </div>
    </form>
  );
}
