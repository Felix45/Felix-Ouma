import type { Metadata } from "next";
import Link from "next/link";
import { clsx } from "clsx";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { listProjects, listTechStack } from "@/lib/projects";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const [dict, settings] = await Promise.all([getDictionary(locale), getSiteSettings()]);

  return {
    title: dict.projectsPage.title,
    description: `${dict.projectsPage.metaDescriptionBefore} ${settings.name} ${dict.projectsPage.metaDescriptionAfter}`,
  };
}

type SearchParams = Promise<{ tech?: string }>;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { tech } = await searchParams;
  const locale = await getLocale();
  const [projects, techStack, dict] = await Promise.all([
    listProjects({ tech }),
    listTechStack(),
    getDictionary(locale),
  ]);

  return (
    <section className="mx-auto w-full max-w-[1320px] px-4 py-20 sm:px-6 lg:px-10 xl:px-16">
      <Reveal>
        <p className="font-mono text-sm text-accent">$ ls ./projects</p>
        <h1 className="mt-3 mb-10 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {dict.projectsPage.title}
        </h1>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects by technology">
          <Link
            href="/projects"
            className={clsx(
              "focus-ring icon-btn rounded-full border px-3.5 py-1.5 font-mono text-xs",
              !tech
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-foreground-muted hover:border-accent hover:text-accent"
            )}
          >
            {dict.projectsPage.all}
          </Link>
          {techStack.map((item) => (
            <Link
              key={item}
              href={`/projects?tech=${encodeURIComponent(item)}`}
              className={clsx(
                "focus-ring icon-btn rounded-full border px-3.5 py-1.5 font-mono text-xs",
                tech === item
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-foreground-muted hover:border-accent hover:text-accent"
              )}
            >
              {item}
            </Link>
          ))}
        </div>
      </Reveal>

      {projects.length === 0 ? (
        <p className="text-foreground-muted">{dict.projectsPage.empty}</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={Math.min(index * 0.04, 0.2)}>
              <ProjectCard project={project} dict={dict} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
