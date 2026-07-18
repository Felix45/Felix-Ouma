import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRightIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Tag } from "@/components/tag";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { getProjectBySlug, listProjects } from "@/lib/projects";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const projects = await listProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const [project, locale] = await Promise.all([getProjectBySlug(slug), getLocale()]);

  if (!project) {
    const dict = await getDictionary(locale);
    return { title: dict.projectDetail.notFoundTitle };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const locale = await getLocale();
  const [project, dict] = await Promise.all([getProjectBySlug(slug), getDictionary(locale)]);

  if (!project) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6">
      <Reveal>
        <Link
          href="/projects"
          className="focus-ring inline-flex items-center gap-1.5 font-mono text-sm text-foreground-muted transition-colors hover:text-accent"
        >
          {dict.projectDetail.backToProjects}
        </Link>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {project.title}
        </h1>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>

        {project.coverImage && (
          <div className="mt-8 rounded-lg border border-border bg-surface p-3">
            {/* eslint-disable-next-line @next/next/no-img-element -- cover image URL is admin-supplied and arbitrary, so next/image's allow-listed remotePatterns can't be predicted in advance. */}
            <img
              src={project.coverImage}
              alt={`${project.title} cover`}
              className="w-full rounded-md object-cover"
            />
          </div>
        )}

        <p className="mt-8 text-lg leading-relaxed text-foreground-muted">
          {project.description}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary focus-ring"
            >
              {dict.projectDetail.liveDemo}
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary focus-ring"
            >
              {dict.projectDetail.sourceCode}
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </Reveal>
    </article>
  );
}
