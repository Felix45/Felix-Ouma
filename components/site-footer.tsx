import { SocialLinks, type SocialLinksData } from "@/components/social-links";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function SiteFooter({
  name,
  social,
  dict,
}: {
  name: string;
  social: SocialLinksData;
  dict: Dictionary;
}) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col items-start gap-4 px-4 py-10 text-left sm:flex-row sm:justify-between sm:px-6 lg:px-10 xl:px-16">
        <p className="font-mono text-xs text-foreground-muted">
          <span className="text-accent">$</span> © {new Date().getFullYear()} {name}.{" "}
          {dict.footer.builtWith}
        </p>
        <SocialLinks social={social} />
      </div>
    </footer>
  );
}
