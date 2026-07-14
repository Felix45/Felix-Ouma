import { clsx } from "clsx";
import { GitHubIcon, LinkedInIcon, MediumIcon, TwitterIcon } from "@/components/icons";

export type SocialLinksData = {
  github: string;
  linkedin: string;
  twitter: string;
  medium: string;
};

export function SocialLinks({
  social,
  className,
  orientation = "horizontal",
  variant = "default",
}: {
  social: SocialLinksData;
  className?: string;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "minimal";
}) {
  const links = [
    { name: "GitHub", href: social.github, Icon: GitHubIcon },
    { name: "LinkedIn", href: social.linkedin, Icon: LinkedInIcon },
    { name: "Twitter / X", href: social.twitter, Icon: TwitterIcon },
    { name: "Medium", href: social.medium, Icon: MediumIcon },
  ].filter((link) => link.href);

  return (
    <ul
      className={clsx(
        "flex items-center gap-2",
        orientation === "vertical" && "flex-col gap-5",
        className
      )}
    >
      {links.map(({ name, href, Icon }) => (
        <li key={name}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className={clsx(
              "focus-ring icon-btn flex items-center justify-center text-foreground-muted hover:text-accent",
              variant === "default"
                ? "h-9 w-9 rounded-md border border-border hover:border-accent"
                : "h-5 w-5 hover:-translate-y-0.5"
            )}
          >
            <Icon className="h-4 w-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}
