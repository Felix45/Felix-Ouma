import { ApiIcon, CodeIcon, DevOpsIcon } from "@/components/icons";
import { Tag } from "@/components/tag";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export type SkillsData = {
  languages: string[];
  frameworks: string[];
  tools: string[];
};

const groupIcons = [CodeIcon, ApiIcon, DevOpsIcon];

export function SkillsAccordion({ skills, dict }: { skills: SkillsData; dict: Dictionary }) {
  const groups = [
    { id: "languages", title: dict.skills.languages, items: skills.languages },
    { id: "frameworks", title: dict.skills.frameworks, items: skills.frameworks },
    { id: "tools", title: dict.skills.tools, items: skills.tools },
  ];

  return (
    <div className="flex flex-col gap-3">
      {groups.map((group, index) => {
        const Icon = groupIcons[index % groupIcons.length];
        return (
          <details
            key={group.id}
            open
            className="group rounded-lg border border-border bg-surface transition-colors hover:border-accent/40"
          >
            <summary className="focus-ring flex cursor-pointer list-none items-center gap-3 rounded-lg px-5 py-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-accent/30 bg-accent/10 text-accent">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <span className="flex-1 font-mono text-sm font-medium text-foreground">
                {group.title}
              </span>
              <span className="font-mono text-xs text-foreground-muted">
                {String(group.items.length).padStart(2, "0")}
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0 text-foreground-muted transition-transform group-open:rotate-180"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <div className="flex flex-wrap gap-2 border-t border-border px-5 pt-4 pb-5">
              {group.items.map((item) => (
                <Tag key={item} className="transition-colors hover:border-accent/50 hover:text-accent">
                  {item}
                </Tag>
              ))}
            </div>
          </details>
        );
      })}
    </div>
  );
}
