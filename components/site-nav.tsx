"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { clsx } from "clsx";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { CloseIcon, MenuIcon } from "@/components/icons";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";

export function SiteNav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: dict.nav.home, index: "01" },
    { href: "/projects", label: dict.nav.projects, index: "02" },
    { href: "/#about", label: dict.nav.about, index: "03" },
    { href: "/#experience", label: dict.nav.experience, index: "04" },
    { href: "/#contact", label: dict.nav.contact, index: "05" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b-2 border-border bg-background/85 backdrop-blur transition-colors duration-300 ease-in-out">
      <div className="mx-auto flex h-[90px] w-full max-w-[1320px] items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-16">
        <Link
          href="/"
          className="focus-ring rounded-md whitespace-nowrap font-sans text-xl font-semibold capitalize text-foreground"
          onClick={() => setOpen(false)}
        >
          <span className="text-accent">~/</span>felix-<span className="text-accent">ouma</span>
        </Link>

        <nav className="hidden items-center gap-1 min-[769px]:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "focus-ring rounded-md px-4 py-2 font-sans text-sm capitalize transition-colors duration-300 ease-in-out",
                  isActive ? "text-accent" : "text-foreground-muted hover:text-accent"
                )}
              >
                <span className="text-accent">{link.index}.</span> {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 min-[769px]:flex">
          <LanguageSwitcher locale={locale} label={dict.nav.languageLabel} />
          <ThemeToggle label={dict.theme.toggleLabel} />
        </div>

        <div className="flex items-center gap-2 min-[769px]:hidden">
          <LanguageSwitcher locale={locale} label={dict.nav.languageLabel} />
          <ThemeToggle label={dict.theme.toggleLabel} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
            className="focus-ring icon-btn flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground hover:border-accent"
          >
            {open ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border bg-background px-4 py-3 min-[769px]:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring block rounded-md px-4 py-2 font-sans text-sm capitalize text-foreground-muted transition-colors duration-300 ease-in-out hover:text-accent"
                >
                  <span className="text-accent">{link.index}.</span> {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
