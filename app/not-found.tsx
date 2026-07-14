import Link from "next/link";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";

export default async function NotFound() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <section className="relative flex w-full flex-1 items-center justify-center overflow-hidden px-4 py-24">
      <div className="glow-blob top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center gap-4 text-center">
        <p className="font-mono text-sm text-accent">$ curl /this-page</p>
        <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
          404
        </h1>
        <p className="max-w-md text-foreground-muted">{dict.notFound.message}</p>
        <Link href="/" className="btn btn-primary focus-ring mt-2">
          {dict.notFound.backHome}
        </Link>
      </div>
    </section>
  );
}
