import { Tag } from "@/components/tag";
import type { ExperienceDTO } from "@/lib/experience";

export function ExperienceTimeline({ experience }: { experience: ExperienceDTO[] }) {
  return (
    <ol className="relative flex flex-col gap-8 border-l-4 border-accent-strong pl-6">
      {experience.map((job, index) => (
        <li key={`${job.company}-${job.role}`} className="relative">
          <span
            className="absolute top-1.5 -left-[2rem] h-3 w-3 rounded-full border-4 border-accent-strong bg-background"
            aria-hidden="true"
          />

          <details open={index === 0} className="group">
            <summary className="focus-ring flex cursor-pointer list-none flex-col gap-1 rounded-md">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-semibold text-foreground">{job.role}</h3>
                <span className="flex items-center gap-2 font-mono text-xs text-accent">
                  {job.period}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5 shrink-0 text-foreground-muted transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </div>
              <p className="text-sm text-foreground-muted">
                {job.company} · {job.employment} · {job.location}
              </p>
            </summary>

            <div className="mt-3 flex flex-col gap-4">
              {job.highlights.length > 0 && (
                <ul className="flex flex-col gap-2">
                  {job.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-sm leading-relaxed text-foreground-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
              {job.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              )}
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}
