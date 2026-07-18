"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { localeNames } from "@/lib/i18n/config";
import type { NonEnglishLocale } from "@/lib/i18n/translations";
import type { ExperienceDTO } from "@/lib/experience";

const nonEnglishLocales: NonEnglishLocale[] = ["fr", "sw", "luo"];

const translationFieldsSchema = z.object({
  role: z.string().max(160).optional().or(z.literal("")),
  employment: z.string().max(60).optional().or(z.literal("")),
  highlightsInput: z.string().optional().or(z.literal("")),
});

const formSchema = z.object({
  role: z.string().trim().min(1, "Role is required").max(160),
  company: z.string().trim().min(1, "Company is required").max(160),
  employment: z.string().trim().min(1, "Employment type is required").max(60),
  period: z.string().trim().min(1, "Period is required").max(80),
  location: z.string().trim().min(1, "Location is required").max(160),
  skillsInput: z.string().trim().optional().or(z.literal("")),
  highlightsInput: z.string().trim().optional().or(z.literal("")),
  translations: z.object({
    fr: translationFieldsSchema,
    sw: translationFieldsSchema,
    luo: translationFieldsSchema,
  }),
});

type FormValues = z.infer<typeof formSchema>;

function toTranslationFormValues(t?: ExperienceDTO["translations"][NonEnglishLocale]) {
  return {
    role: t?.role ?? "",
    employment: t?.employment ?? "",
    highlightsInput: t?.highlights?.join("\n") ?? "",
  };
}

function toTranslationPayload(t: z.infer<typeof translationFieldsSchema>) {
  return {
    role: t.role ?? "",
    employment: t.employment ?? "",
    highlights: (t.highlightsInput ?? "")
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),
  };
}

function toFormValues(entry?: ExperienceDTO): FormValues {
  return {
    role: entry?.role ?? "",
    company: entry?.company ?? "",
    employment: entry?.employment ?? "",
    period: entry?.period ?? "",
    location: entry?.location ?? "",
    skillsInput: entry?.skills.join(", ") ?? "",
    highlightsInput: entry?.highlights.join("\n") ?? "",
    translations: {
      fr: toTranslationFormValues(entry?.translations.fr),
      sw: toTranslationFormValues(entry?.translations.sw),
      luo: toTranslationFormValues(entry?.translations.luo),
    },
  };
}

export function ExperienceForm({ entry }: { entry?: ExperienceDTO }) {
  const router = useRouter();
  const isEdit = Boolean(entry);
  const [serverError, setServerError] = useState<string | null>(null);
  const [activeLocale, setActiveLocale] = useState<NonEnglishLocale>("fr");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: toFormValues(entry),
  });

  async function onSubmit(values: FormValues) {
    setServerError(null);

    const payload = {
      role: values.role,
      company: values.company,
      employment: values.employment,
      period: values.period,
      location: values.location,
      skills: (values.skillsInput ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      highlights: (values.highlightsInput ?? "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      translations: {
        fr: toTranslationPayload(values.translations.fr),
        sw: toTranslationPayload(values.translations.sw),
        luo: toTranslationPayload(values.translations.luo),
      },
    };

    const response = await fetch(
      isEdit ? `/api/experience/${entry!.id}` : "/api/experience",
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

    router.push("/admin/experience");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex max-w-xl flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="role" className="font-mono text-xs text-foreground-muted">
          Role
        </label>
        <input
          id="role"
          className="focus-ring rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
          {...register("role")}
        />
        {errors.role && (
          <p role="alert" className="text-xs text-danger">
            {errors.role.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="company" className="font-mono text-xs text-foreground-muted">
          Company
        </label>
        <input
          id="company"
          className="focus-ring rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
          {...register("company")}
        />
        {errors.company && (
          <p role="alert" className="text-xs text-danger">
            {errors.company.message}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="employment" className="font-mono text-xs text-foreground-muted">
            Employment type
          </label>
          <input
            id="employment"
            placeholder="Full-time"
            className="focus-ring rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
            {...register("employment")}
          />
          {errors.employment && (
            <p role="alert" className="text-xs text-danger">
              {errors.employment.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="period" className="font-mono text-xs text-foreground-muted">
            Period
          </label>
          <input
            id="period"
            placeholder="Jan 2024 - Present"
            className="focus-ring rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
            {...register("period")}
          />
          {errors.period && (
            <p role="alert" className="text-xs text-danger">
              {errors.period.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="location" className="font-mono text-xs text-foreground-muted">
          Location
        </label>
        <input
          id="location"
          className="focus-ring rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
          {...register("location")}
        />
        {errors.location && (
          <p role="alert" className="text-xs text-danger">
            {errors.location.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="skillsInput" className="font-mono text-xs text-foreground-muted">
          Skills (comma-separated)
        </label>
        <input
          id="skillsInput"
          placeholder="React.js, Node.js"
          className="focus-ring rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
          {...register("skillsInput")}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="highlightsInput" className="font-mono text-xs text-foreground-muted">
          Highlights (one per line)
        </label>
        <textarea
          id="highlightsInput"
          rows={5}
          className="focus-ring resize-y rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
          {...register("highlightsInput")}
        />
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
              <label htmlFor={`translations.${code}.role`} className="font-mono text-xs text-foreground-muted">
                Role
              </label>
              <input
                id={`translations.${code}.role`}
                className="focus-ring rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
                {...register(`translations.${code}.role`)}
              />
              {errors.translations?.[code]?.role && (
                <p role="alert" className="text-xs text-danger">
                  {errors.translations[code]?.role?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={`translations.${code}.employment`}
                className="font-mono text-xs text-foreground-muted"
              >
                Employment type
              </label>
              <input
                id={`translations.${code}.employment`}
                className="focus-ring rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
                {...register(`translations.${code}.employment`)}
              />
              {errors.translations?.[code]?.employment && (
                <p role="alert" className="text-xs text-danger">
                  {errors.translations[code]?.employment?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={`translations.${code}.highlightsInput`}
                className="font-mono text-xs text-foreground-muted"
              >
                Highlights (one per line)
              </label>
              <textarea
                id={`translations.${code}.highlightsInput`}
                rows={5}
                className="focus-ring resize-y rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
                {...register(`translations.${code}.highlightsInput`)}
              />
              {errors.translations?.[code]?.highlightsInput && (
                <p role="alert" className="text-xs text-danger">
                  {errors.translations[code]?.highlightsInput?.message}
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
          {isSubmitting ? "Saving…" : isEdit ? "Save changes" : "Add experience"}
        </button>
      </div>
    </form>
  );
}
