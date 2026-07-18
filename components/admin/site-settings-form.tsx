"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { localeNames } from "@/lib/i18n/config";
import type { NonEnglishLocale } from "@/lib/i18n/translations";
import type { SiteSettingsDTO } from "@/lib/site-settings";

const nonEnglishLocales: NonEnglishLocale[] = ["fr", "sw", "luo"];

function splitLines(value: string): string[] {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitCommas(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

const optionalUrl = z.union([z.url("Enter a valid URL"), z.literal("")]);

const translationFieldsSchema = z.object({
  title: z.string().max(160).optional().or(z.literal("")),
  description: z.string().max(300).optional().or(z.literal("")),
  role: z.string().max(120).optional().or(z.literal("")),
  heroSummary: z.string().max(300).optional().or(z.literal("")),
  education: z.string().max(160).optional().or(z.literal("")),
  aboutParagraph1: z.string().max(1000).optional().or(z.literal("")),
  aboutParagraph2: z.string().max(1000).optional().or(z.literal("")),
  aboutHighlightsInput: z.string().optional().or(z.literal("")),
});

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  title: z.string().trim().min(1, "Title is required").max(160),
  description: z.string().trim().min(1, "Description is required").max(300),
  role: z.string().trim().min(1, "Role is required").max(120),
  yearsOfExperience: z.string().trim().min(1, "Required").max(20),
  education: z.string().trim().min(1, "Required").max(160),
  resumeUrl: z.string().trim().min(1, "Required").max(300),
  heroSummary: z.string().trim().min(1, "Required").max(300),
  focusAreasInput: z.string().trim().min(1, "Add at least one focus area"),
  aboutParagraph1: z.string().trim().min(1, "Required").max(1000),
  aboutParagraph2: z.string().trim().min(1, "Required").max(1000),
  aboutHighlightsInput: z.string().trim().optional().or(z.literal("")),
  githubUrl: optionalUrl,
  linkedinUrl: optionalUrl,
  twitterUrl: optionalUrl,
  mediumUrl: optionalUrl,
  skillLanguagesInput: z.string().trim().min(1, "Add at least one language"),
  skillFrameworksInput: z.string().trim().min(1, "Add at least one framework"),
  skillToolsInput: z.string().trim().min(1, "Add at least one tool"),
  translations: z.object({
    fr: translationFieldsSchema,
    sw: translationFieldsSchema,
    luo: translationFieldsSchema,
  }),
});

type FormValues = z.infer<typeof formSchema>;

function toFormValues(settings: SiteSettingsDTO): FormValues {
  return {
    name: settings.name,
    title: settings.title,
    description: settings.description,
    role: settings.role,
    yearsOfExperience: settings.yearsOfExperience,
    education: settings.education,
    resumeUrl: settings.resumeUrl,
    heroSummary: settings.heroSummary,
    focusAreasInput: settings.focusAreas.join(", "),
    aboutParagraph1: settings.aboutParagraph1,
    aboutParagraph2: settings.aboutParagraph2,
    aboutHighlightsInput: settings.aboutHighlights.join("\n"),
    githubUrl: settings.social.github,
    linkedinUrl: settings.social.linkedin,
    twitterUrl: settings.social.twitter,
    mediumUrl: settings.social.medium,
    skillLanguagesInput: settings.skills.languages.join(", "),
    skillFrameworksInput: settings.skills.frameworks.join(", "),
    skillToolsInput: settings.skills.tools.join(", "),
    translations: {
      fr: toTranslationFormValues(settings.translations.fr),
      sw: toTranslationFormValues(settings.translations.sw),
      luo: toTranslationFormValues(settings.translations.luo),
    },
  };
}

function toTranslationPayload(t: z.infer<typeof translationFieldsSchema>) {
  return {
    title: t.title ?? "",
    description: t.description ?? "",
    role: t.role ?? "",
    heroSummary: t.heroSummary ?? "",
    education: t.education ?? "",
    aboutParagraph1: t.aboutParagraph1 ?? "",
    aboutParagraph2: t.aboutParagraph2 ?? "",
    aboutHighlights: splitLines(t.aboutHighlightsInput ?? ""),
  };
}

function toTranslationFormValues(t?: SiteSettingsDTO["translations"][NonEnglishLocale]) {
  return {
    title: t?.title ?? "",
    description: t?.description ?? "",
    role: t?.role ?? "",
    heroSummary: t?.heroSummary ?? "",
    education: t?.education ?? "",
    aboutParagraph1: t?.aboutParagraph1 ?? "",
    aboutParagraph2: t?.aboutParagraph2 ?? "",
    aboutHighlightsInput: t?.aboutHighlights?.join("\n") ?? "",
  };
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="font-mono text-xs text-foreground-muted">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "focus-ring rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground";

export function SiteSettingsForm({ settings }: { settings: SiteSettingsDTO }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [activeLocale, setActiveLocale] = useState<NonEnglishLocale>("fr");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: toFormValues(settings),
  });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    setSuccess(false);

    const payload = {
      name: values.name,
      title: values.title,
      description: values.description,
      role: values.role,
      yearsOfExperience: values.yearsOfExperience,
      education: values.education,
      resumeUrl: values.resumeUrl,
      heroSummary: values.heroSummary,
      focusAreas: splitCommas(values.focusAreasInput),
      aboutParagraph1: values.aboutParagraph1,
      aboutParagraph2: values.aboutParagraph2,
      aboutHighlights: splitLines(values.aboutHighlightsInput ?? ""),
      social: {
        github: values.githubUrl,
        linkedin: values.linkedinUrl,
        twitter: values.twitterUrl,
        medium: values.mediumUrl,
      },
      skills: {
        languages: splitCommas(values.skillLanguagesInput),
        frameworks: splitCommas(values.skillFrameworksInput),
        tools: splitCommas(values.skillToolsInput),
      },
      translations: {
        fr: toTranslationPayload(values.translations.fr),
        sw: toTranslationPayload(values.translations.sw),
        luo: toTranslationPayload(values.translations.luo),
      },
    };

    const response = await fetch("/api/site-settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setServerError(body?.error?.message ?? "Something went wrong. Please try again.");
      return;
    }

    setSuccess(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-5">
        <h2 className="font-mono text-sm text-accent"># Site meta</h2>
        <Field label="Name" htmlFor="name" error={errors.name?.message}>
          <input id="name" className={inputClass} {...register("name")} />
        </Field>
        <Field label="Page title (browser tab / SEO)" htmlFor="title" error={errors.title?.message}>
          <input id="title" className={inputClass} {...register("title")} />
        </Field>
        <Field label="Meta description" htmlFor="description" error={errors.description?.message}>
          <textarea id="description" rows={3} className={`${inputClass} resize-y`} {...register("description")} />
        </Field>
        <Field label="Résumé URL" htmlFor="resumeUrl" error={errors.resumeUrl?.message}>
          <input id="resumeUrl" className={inputClass} {...register("resumeUrl")} />
        </Field>
      </div>

      <div className="flex flex-col gap-5 border-t border-border pt-6">
        <h2 className="font-mono text-sm text-accent"># Hero</h2>
        <Field label="Role" htmlFor="role" error={errors.role?.message}>
          <input id="role" className={inputClass} {...register("role")} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Years of experience" htmlFor="yearsOfExperience" error={errors.yearsOfExperience?.message}>
            <input id="yearsOfExperience" placeholder="6+" className={inputClass} {...register("yearsOfExperience")} />
          </Field>
          <Field label="Education" htmlFor="education" error={errors.education?.message}>
            <input id="education" className={inputClass} {...register("education")} />
          </Field>
        </div>
        <Field label="Hero summary sentence" htmlFor="heroSummary" error={errors.heroSummary?.message}>
          <textarea id="heroSummary" rows={3} className={`${inputClass} resize-y`} {...register("heroSummary")} />
        </Field>
        <Field
          label="Focus areas (comma-separated, shown in the 'focus' badge)"
          htmlFor="focusAreasInput"
          error={errors.focusAreasInput?.message}
        >
          <input id="focusAreasInput" placeholder="React, Next.js" className={inputClass} {...register("focusAreasInput")} />
        </Field>
      </div>

      <div className="flex flex-col gap-5 border-t border-border pt-6">
        <h2 className="font-mono text-sm text-accent"># About</h2>
        <Field label="Paragraph 1" htmlFor="aboutParagraph1" error={errors.aboutParagraph1?.message}>
          <textarea id="aboutParagraph1" rows={4} className={`${inputClass} resize-y`} {...register("aboutParagraph1")} />
        </Field>
        <Field label="Paragraph 2" htmlFor="aboutParagraph2" error={errors.aboutParagraph2?.message}>
          <textarea id="aboutParagraph2" rows={4} className={`${inputClass} resize-y`} {...register("aboutParagraph2")} />
        </Field>
        <Field
          label="Highlights (one per line)"
          htmlFor="aboutHighlightsInput"
          error={errors.aboutHighlightsInput?.message}
        >
          <textarea
            id="aboutHighlightsInput"
            rows={4}
            className={`${inputClass} resize-y`}
            {...register("aboutHighlightsInput")}
          />
        </Field>
      </div>

      <div className="flex flex-col gap-5 border-t border-border pt-6">
        <h2 className="font-mono text-sm text-accent"># Skills</h2>
        <Field
          label="Languages (comma-separated)"
          htmlFor="skillLanguagesInput"
          error={errors.skillLanguagesInput?.message}
        >
          <input id="skillLanguagesInput" className={inputClass} {...register("skillLanguagesInput")} />
        </Field>
        <Field
          label="Frameworks (comma-separated)"
          htmlFor="skillFrameworksInput"
          error={errors.skillFrameworksInput?.message}
        >
          <input id="skillFrameworksInput" className={inputClass} {...register("skillFrameworksInput")} />
        </Field>
        <Field label="Tools (comma-separated)" htmlFor="skillToolsInput" error={errors.skillToolsInput?.message}>
          <input id="skillToolsInput" className={inputClass} {...register("skillToolsInput")} />
        </Field>
      </div>

      <div className="flex flex-col gap-5 border-t border-border pt-6">
        <h2 className="font-mono text-sm text-accent"># Social links</h2>
        <Field label="GitHub" htmlFor="githubUrl" error={errors.githubUrl?.message}>
          <input id="githubUrl" className={inputClass} {...register("githubUrl")} />
        </Field>
        <Field label="LinkedIn" htmlFor="linkedinUrl" error={errors.linkedinUrl?.message}>
          <input id="linkedinUrl" className={inputClass} {...register("linkedinUrl")} />
        </Field>
        <Field label="Twitter / X" htmlFor="twitterUrl" error={errors.twitterUrl?.message}>
          <input id="twitterUrl" className={inputClass} {...register("twitterUrl")} />
        </Field>
        <Field label="Medium" htmlFor="mediumUrl" error={errors.mediumUrl?.message}>
          <input id="mediumUrl" className={inputClass} {...register("mediumUrl")} />
        </Field>
      </div>

      <div className="flex flex-col gap-5 border-t border-border pt-6">
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
                  : "border-border text-foreground-muted hover:border-accent hover:text-accent"
              }`}
            >
              {localeNames[code]}
            </button>
          ))}
        </div>

        {nonEnglishLocales.map((code) => (
          <div key={code} hidden={activeLocale !== code} className="flex flex-col gap-5">
            <p className="text-xs text-foreground-muted">
              Falls back to English for any field left blank.
            </p>
            <Field label="Page title" htmlFor={`translations.${code}.title`}>
              <input id={`translations.${code}.title`} className={inputClass} {...register(`translations.${code}.title`)} />
            </Field>
            <Field label="Meta description" htmlFor={`translations.${code}.description`}>
              <textarea
                id={`translations.${code}.description`}
                rows={3}
                className={`${inputClass} resize-y`}
                {...register(`translations.${code}.description`)}
              />
            </Field>
            <Field label="Role" htmlFor={`translations.${code}.role`}>
              <input id={`translations.${code}.role`} className={inputClass} {...register(`translations.${code}.role`)} />
            </Field>
            <Field label="Hero summary sentence" htmlFor={`translations.${code}.heroSummary`}>
              <textarea
                id={`translations.${code}.heroSummary`}
                rows={3}
                className={`${inputClass} resize-y`}
                {...register(`translations.${code}.heroSummary`)}
              />
            </Field>
            <Field label="Education" htmlFor={`translations.${code}.education`}>
              <input
                id={`translations.${code}.education`}
                className={inputClass}
                {...register(`translations.${code}.education`)}
              />
            </Field>
            <Field label="About paragraph 1" htmlFor={`translations.${code}.aboutParagraph1`}>
              <textarea
                id={`translations.${code}.aboutParagraph1`}
                rows={4}
                className={`${inputClass} resize-y`}
                {...register(`translations.${code}.aboutParagraph1`)}
              />
            </Field>
            <Field label="About paragraph 2" htmlFor={`translations.${code}.aboutParagraph2`}>
              <textarea
                id={`translations.${code}.aboutParagraph2`}
                rows={4}
                className={`${inputClass} resize-y`}
                {...register(`translations.${code}.aboutParagraph2`)}
              />
            </Field>
            <Field
              label="About highlights (one per line)"
              htmlFor={`translations.${code}.aboutHighlightsInput`}
            >
              <textarea
                id={`translations.${code}.aboutHighlightsInput`}
                rows={4}
                className={`${inputClass} resize-y`}
                {...register(`translations.${code}.aboutHighlightsInput`)}
              />
            </Field>
          </div>
        ))}
      </div>

      {serverError && (
        <p role="alert" className="rounded-md border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {serverError}
        </p>
      )}
      {success && !serverError && (
        <p className="rounded-md border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent">
          Saved.
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="focus-ring inline-flex items-center justify-center rounded-md bg-accent px-5 py-2.5 font-mono text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Saving…" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
