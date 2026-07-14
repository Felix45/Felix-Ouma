"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactInputSchema, type ContactInput } from "@/lib/validations";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Status = "idle" | "success" | "error";

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactInputSchema),
  });

  async function onSubmit(data: ContactInput) {
    setServerError(null);
    setStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        if (response.status === 429) {
          setServerError(dict.contactForm.rateLimitError);
        } else {
          setServerError(body?.error?.message ?? dict.contactForm.genericError);
        }
        setStatus("error");
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setServerError(dict.contactForm.networkError);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="font-mono text-xs text-foreground-muted">
          {dict.contactForm.nameLabel}
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="focus-ring rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground transition-colors placeholder:text-foreground-muted/60 focus:border-accent"
          placeholder={dict.contactForm.namePlaceholder}
          {...register("name")}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="text-xs text-danger">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="font-mono text-xs text-foreground-muted">
          {dict.contactForm.emailLabel}
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="focus-ring rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground transition-colors placeholder:text-foreground-muted/60 focus:border-accent"
          placeholder={dict.contactForm.emailPlaceholder}
          {...register("email")}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="text-xs text-danger">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="font-mono text-xs text-foreground-muted">
          {dict.contactForm.messageLabel}
        </label>
        <textarea
          id="message"
          rows={5}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="focus-ring resize-y rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground transition-colors placeholder:text-foreground-muted/60 focus:border-accent"
          placeholder={dict.contactForm.messagePlaceholder}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="text-xs text-danger">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary focus-ring self-start disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {isSubmitting ? dict.contactForm.submitting : dict.contactForm.submit}
      </button>

      <div aria-live="polite">
        {status === "success" && (
          <p className="rounded-md border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent">
            {dict.contactForm.successMessage}
          </p>
        )}
        {status === "error" && serverError && (
          <p role="alert" className="rounded-md border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
            {serverError}
          </p>
        )}
      </div>
    </form>
  );
}
