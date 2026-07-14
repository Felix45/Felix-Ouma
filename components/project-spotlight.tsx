"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { TechBadge } from "@/components/tech-badge";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { ProjectDTO } from "@/lib/projects";

const HOLD_MS = 4000;

export function ProjectSpotlight({
  projects,
  dict,
}: {
  projects: ProjectDTO[];
  dict: Dictionary;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (projects.length < 2 || paused) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % projects.length);
    }, HOLD_MS);
    return () => clearInterval(id);
  }, [projects.length, paused]);

  if (projects.length === 0) return null;

  const project = projects[index];

  const goNext = () => setIndex((current) => (current + 1) % projects.length);
  const goPrev = () => setIndex((current) => (current - 1 + projects.length) % projects.length);

  return (
    <div
      className="border-y border-border bg-surface/60"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <h2 className="sr-only">{dict.projectSpotlight.browseProjects}</h2>
      <div className="mx-auto flex w-full max-w-[1320px] items-stretch justify-between gap-6 overflow-hidden px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="flex items-stretch gap-3 text-left">
          <div className="flex shrink-0 flex-col justify-between border-x-4 border-accent bg-surface px-4 py-6">
            <span className="flex h-7 items-center font-sans text-[11px] font-bold uppercase tracking-wider text-foreground-muted">
              {dict.projectSpotlight.projectTitleLabel}
            </span>
            <span className="flex h-7 items-center font-sans text-[11px] font-bold uppercase tracking-wider text-foreground-muted">
              {dict.projectSpotlight.stackLabel}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start gap-2 py-6"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="focus-ring flex h-7 items-center rounded-md font-sans text-lg font-bold tracking-wide text-accent uppercase underline underline-offset-4"
              >
                {project.title}
              </Link>
              <div className="flex h-7 flex-wrap items-center gap-2">
                {project.techStack.map((tech) => (
                  <TechBadge key={tech} tech={tech} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {projects.length > 1 && (
          <div className="flex shrink-0 items-center gap-2 py-6">
            <button
              type="button"
              onClick={goPrev}
              aria-label={dict.projectSpotlight.previousProject}
              className="focus-ring icon-btn flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-border text-foreground-muted hover:border-accent hover:text-accent"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label={dict.projectSpotlight.nextProject}
              className="focus-ring icon-btn flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-border text-foreground-muted hover:border-accent hover:text-accent"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
