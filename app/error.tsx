"use client";

import { useEffect, useState } from "react";
import en from "@/lib/i18n/dictionaries/en";
import fr from "@/lib/i18n/dictionaries/fr";
import sw from "@/lib/i18n/dictionaries/sw";
import luo from "@/lib/i18n/dictionaries/luo";
import { getClientLocale } from "@/lib/i18n/get-client-locale";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";

const dictionaries: Record<Locale, Dictionary> = { en, fr, sw, luo };

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [dict] = useState<Dictionary>(() => dictionaries[getClientLocale()]);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <p className="font-mono text-sm text-danger">$ echo $?</p>
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        {dict.errorPage.title}
      </h1>
      <p className="max-w-md text-foreground-muted">{dict.errorPage.message}</p>
      <button type="button" onClick={reset} className="btn btn-primary focus-ring mt-2">
        {dict.errorPage.tryAgain}
      </button>
    </section>
  );
}
