import Link from "next/link";
import { ApiIcon, ArrowUpRightIcon, CodeIcon, DatabaseIcon, DevOpsIcon } from "@/components/icons";
import { ContactForm } from "@/components/contact-form";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ProjectCard } from "@/components/project-card";
import { ProjectSpotlight } from "@/components/project-spotlight";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SkillsAccordion } from "@/components/skills-accordion";
import { SocialLinks } from "@/components/social-links";
import { listExperience } from "@/lib/experience";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { localizeExperienceList, localizeService, localizeSiteSettings } from "@/lib/i18n/localize";
import { listProjects } from "@/lib/projects";
import { listServices } from "@/lib/services";
import { getSiteSettings } from "@/lib/site-settings";

const serviceIcons = [CodeIcon, ApiIcon, DatabaseIcon, DevOpsIcon];

export default async function Home() {
  const locale = await getLocale();
  const [projects, rawSettings, rawExperience, rawServices, dict] = await Promise.all([
    listProjects(),
    getSiteSettings(),
    listExperience(),
    listServices(),
    getDictionary(locale),
  ]);
  const settings = localizeSiteSettings(rawSettings, locale);
  const experience = localizeExperienceList(rawExperience, locale);
  const services = rawServices.map((service) => localizeService(service, locale));
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="glow-blob -top-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 opacity-60 sm:left-[15%] sm:translate-x-0"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid w-full max-w-[1320px] gap-14 px-4 pt-20 pb-24 sm:px-6 sm:pt-28 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-10 lg:px-10 xl:px-16">
          <div className="flex flex-col gap-6">
            <Reveal>
              <p className="font-mono text-sm text-accent">$ whoami</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
                {dict.hero.greetingBefore} <span className="text-accent">{settings.name}</span>
                {dict.hero.greetingAfter}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-xl text-lg leading-relaxed text-foreground-muted">
                {settings.heroSummary}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/projects" className="btn btn-primary focus-ring">
                  {dict.hero.viewProjects}
                  <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </Link>
                <Link href="/#contact" className="btn btn-secondary focus-ring">
                  {dict.common.getInTouch}
                </Link>
                <SocialLinks social={settings.social} className="ml-1" />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="relative hidden lg:block lg:justify-self-end">
            <div className="dot-grid absolute -top-6 -left-4 h-20 w-20" aria-hidden="true" />

            <div className="w-full max-w-lg rounded-lg border border-border bg-surface p-6 font-mono text-sm shadow-2xl shadow-black/20">
              <div className="mb-5 flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-danger/70" />
                <span className="h-3 w-3 rounded-full bg-accent/50" />
                <span className="h-3 w-3 rounded-full bg-accent/80" />
              </div>
              <p className="text-foreground-muted">
                <span className="text-accent">const</span> dev = {"{"}
              </p>
              <p className="pl-4 text-foreground">
                role: <span className="text-accent">&quot;{settings.role}&quot;</span>,
              </p>
              <p className="pl-4 text-foreground">
                experience:{" "}
                <span className="text-accent">
                  &quot;{settings.yearsOfExperience} years&quot;
                </span>
                ,
              </p>
              <p className="pl-4 text-foreground">
                education:{" "}
                <span className="text-accent">&quot;{settings.education}&quot;</span>,
              </p>
              <p className="pl-4 text-foreground">
                stack: [
                {settings.skills.frameworks.slice(0, 3).map((item, i) => (
                  <span key={item}>
                    <span className="text-accent">&quot;{item}&quot;</span>
                    {i < 2 ? ", " : ""}
                  </span>
                ))}
                ],
              </p>
              <p className="text-foreground-muted">{"}"}</p>
              <p className="mt-4 text-foreground-muted">
                <span className="text-accent">{"//"}</span> {dict.hero.buildingComment}
              </p>
            </div>

            <div className="absolute -top-5 -right-6 rounded-lg border border-border bg-surface/95 px-4 py-3 shadow-xl backdrop-blur">
              <p className="mb-1.5 font-mono text-[11px] text-foreground-muted">
                {dict.hero.focusLabel}
              </p>
              <div className="flex gap-1.5">
                {settings.focusAreas.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-lg border border-border bg-surface/95 px-4 py-3 shadow-xl backdrop-blur">
              <span className="font-mono text-2xl font-bold text-accent">
                {settings.yearsOfExperience}
              </span>
              <span className="max-w-[6rem] text-xs leading-tight text-foreground-muted">
                {dict.hero.yearsOfExperienceLabel}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <ProjectSpotlight projects={projects} dict={dict} />

      <section id="about" className="bg-surface/40 scroll-mt-[90px]">
        <div className="mx-auto grid w-full max-w-[1320px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-10 xl:px-16">
          <Reveal>
            <div className="flex flex-col gap-4">
              <SectionHeading index="01" eyebrow={dict.about.eyebrow} title={dict.about.title} />
              <p className="max-w-xl text-lg leading-relaxed text-foreground">
                {settings.aboutParagraph1}
              </p>
              <p className="max-w-xl leading-relaxed text-foreground-muted">
                {settings.aboutParagraph2}
              </p>

              <ul className="mt-2 grid max-w-xl grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                {settings.aboutHighlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-lg leading-relaxed text-foreground-muted"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-2 flex flex-wrap gap-4">
                <a href={settings.resumeUrl} download className="btn btn-primary focus-ring w-fit">
                  {dict.about.downloadResume}
                </a>
                <Link href="/#contact" className="btn btn-secondary focus-ring w-fit">
                  {dict.common.getInTouch}
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-4">
              <SectionHeading index="02" eyebrow={dict.skills.eyebrow} title={dict.skills.title} />
              <SkillsAccordion skills={settings.skills} dict={dict} />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="experience" className="border-t border-border scroll-mt-[90px]">
        <div className="mx-auto grid w-full max-w-[1320px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-10 xl:px-16">
          <Reveal>
            <div className="flex flex-col gap-4">
              <SectionHeading
                index="03"
                eyebrow={dict.experience.eyebrow}
                title={dict.experience.title}
              />
              <p className="max-w-xl leading-relaxed text-foreground-muted">
                {dict.experience.intro}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ExperienceTimeline experience={experience} />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid w-full max-w-[1320px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 xl:px-16">
          <Reveal>
            <div className="grid grid-cols-2 gap-5">
              {services.map((service, index) => {
                const Icon = serviceIcons[index % serviceIcons.length];
                return (
                  <div
                    key={service.id}
                    className="card-lift rounded-lg border border-border bg-surface p-5"
                  >
                    <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-md border border-accent/30 bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="text-sm font-semibold text-foreground">{service.title}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-4">
              <SectionHeading index="04" eyebrow={dict.whatIDo.eyebrow} title={dict.whatIDo.title} />
              <p className="max-w-xl leading-relaxed text-foreground-muted">
                {dict.whatIDo.introBefore}{" "}
                <Link href="/#contact" className="text-accent hover:underline">
                  {dict.whatIDo.introLink}
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section className="border-t border-border">
          <div className="mx-auto w-full max-w-[1320px] px-4 py-20 sm:px-6 lg:px-10 xl:px-16">
            <Reveal>
              <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                <SectionHeading
                  index="05"
                  eyebrow={dict.featuredProjects.eyebrow}
                  title={dict.featuredProjects.title}
                />
                <Link
                  href="/projects"
                  className="focus-ring font-mono text-sm text-foreground-muted transition-colors hover:text-accent"
                >
                  {dict.featuredProjects.viewAll}
                </Link>
              </div>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <Reveal key={project.id} delay={index * 0.05}>
                  <ProjectCard project={project} dict={dict} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="contact" className="relative overflow-hidden border-t border-border scroll-mt-[90px]">
        <div
          className="glow-blob top-10 right-[10%] h-72 w-72 opacity-40"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid w-full max-w-[1320px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10 xl:px-16">
          <Reveal>
            <div className="flex flex-col gap-4">
              <SectionHeading
                index="06"
                eyebrow={dict.contactSection.eyebrow}
                title={dict.contactSection.title}
              />
              <p className="max-w-md text-lg leading-relaxed text-foreground-muted">
                {dict.contactSection.blurb}
              </p>
              <div className="mt-2 flex flex-col gap-3">
                <p className="font-mono text-sm text-foreground-muted">
                  <span className="text-accent">$</span> {dict.contactSection.connectVerb}{" "}
                  --with {settings.name.split(" ")[0].toLowerCase()}
                </p>
                <SocialLinks social={settings.social} />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-lg border border-border bg-surface p-6 shadow-2xl shadow-black/10 sm:p-8">
              <ContactForm dict={dict} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
