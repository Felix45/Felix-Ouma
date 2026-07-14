"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { ArrowUpIcon } from "@/components/icons";
import { SocialLinks, type SocialLinksData } from "@/components/social-links";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function SocialRail({ social, dict }: { social: SocialLinksData; dict: Dictionary }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-y-0 right-4 z-30 flex flex-col items-center justify-end gap-5 py-10 lg:right-6 xl:right-10">
      <div className="hidden flex-col items-center gap-5 lg:flex">
        <SocialLinks social={social} orientation="vertical" variant="minimal" />
      </div>
      <span className="hidden h-24 w-px bg-border lg:block" aria-hidden="true" />

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={dict.socialRail.scrollToTop}
        tabIndex={showScrollTop ? 0 : -1}
        className={clsx(
          "focus-ring icon-btn flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-foreground-muted shadow-lg shadow-black/10 transition-all duration-300 hover:border-accent hover:text-accent",
          showScrollTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        )}
      >
        <ArrowUpIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
