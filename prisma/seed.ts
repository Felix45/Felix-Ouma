import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../lib/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const db = new PrismaClient({ adapter });

const projects = [
  {
    slug: "eduflow-lms",
    title: "EduFlow LMS",
    description:
      "A course management platform for independent instructors, with student progress tracking, quiz builders, and Stripe-based billing. Built to replace a spreadsheet-driven workflow for a 200+ student cohort.",
    techStack: ["Ruby on Rails", "TypeScript", "React", "PostgreSQL"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/Felix45",
    coverImage: null,
    featured: true,
    order: 0,
  },
  {
    slug: "shopfront-storefront",
    title: "Shopfront",
    description:
      "A headless e-commerce storefront with server-rendered product pages, cart persistence, and a custom checkout flow integrated with a third-party payments API.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Redis"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/Felix45",
    coverImage: null,
    featured: true,
    order: 1,
  },
  {
    slug: "threadwatch",
    title: "ThreadWatch",
    description:
      "A lightweight security monitoring dashboard that aggregates log anomalies across services and flags suspicious auth patterns in near real time.",
    techStack: ["JavaScript", "Node.js", "React", "WebSockets"],
    demoUrl: null,
    repoUrl: "https://github.com/Felix45",
    coverImage: null,
    featured: false,
    order: 2,
  },
];

const siteSettings = {
  name: "Felix Ouma",
  title: "Felix Ouma — Full-Stack Software Developer",
  description:
    "Full-stack software developer with 6+ years of experience building scalable web applications across education, e-commerce, and cybersecurity.",
  role: "Full-Stack Software Developer",
  yearsOfExperience: "6+",
  education: "BSc Mathematics & Computer Science",
  resumeUrl: "/resume.pdf",
  heroSummary:
    "Full-Stack Software Developer with 6+ years of experience building scalable web applications across education, e-commerce, and cybersecurity.",
  aboutParagraph1:
    "I build full-stack products end to end — from data models and APIs to the interfaces people actually use. Over the past six years I've shipped learning platforms, storefronts, and internal security tooling, usually as the person who owns a feature from database schema to production.",
  aboutParagraph2:
    "I care about code that stays readable after the person who wrote it moves on, and about building things that hold up under real traffic and real edge cases.",
  aboutHighlights: [
    "End-to-end feature ownership",
    "Readable, maintainable code",
    "Built for real traffic & edge cases",
    "Education · E-commerce · Security",
  ],
  githubUrl: "https://github.com/Felix45",
  linkedinUrl: "https://linkedin.com/in/felix-ouma",
  twitterUrl: "https://x.com/Felix_Atonoh",
  mediumUrl: "https://medium.com/@fatonoh",
  focusAreas: ["React", "Next.js"],
  skillLanguages: ["JavaScript", "TypeScript", "Ruby", "HTML", "CSS", "SQL"],
  skillFrameworks: ["React", "Next.js", "Ruby on Rails", "Node.js", "Tailwind CSS"],
  skillTools: ["Git", "Docker", "PostgreSQL", "Prisma", "REST APIs", "CI/CD"],
};

const experience = [
  {
    role: "Software Engineer",
    company: "GRIFFIN Global Technologies, LLC",
    employment: "Full-time",
    period: "Sep 2025 - Present",
    location: "Nyeri, Kenya · On-site",
    skills: ["React.js", "Node.js"],
    highlights: [] as string[],
    order: 0,
  },
  {
    role: "Full-Stack Engineer",
    company: "Diversity Cyber Council",
    employment: "Part-time",
    period: "May 2023 - Jan 2024",
    location: "Atlanta, Georgia, United States · Remote",
    skills: ["Prisma", "Next.js"],
    highlights: [
      "Design and implement user interfaces for a social network site.",
      "Implement and optimize site performance.",
      "Collaborate with the product team in developing new features.",
      "Perform code reviews to improve the quality of the final product.",
      "Test and debug to improve the quality of the final product.",
    ],
    order: 1,
  },
  {
    role: "Web Developer",
    company: "KCA University",
    employment: "Full-time",
    period: "Feb 2019 - Jan 2022",
    location: "Nairobi County, Kenya",
    skills: ["System Development", "CSS"],
    highlights: [
      "Built an interactive and responsive website for the university that resulted in an increase in the number of current and prospective students interacting with the university administration through the website.",
    ],
    order: 2,
  },
  {
    role: "Web Application Developer",
    company: "Eagle-Link Flowers",
    employment: "Full-time",
    period: "Feb 2016 - Jan 2019",
    location: "Nairobi, Kenya",
    skills: [] as string[],
    highlights: [] as string[],
    order: 3,
  },
];

const services = [
  {
    title: "Front-End Development",
    description: "React and Next.js front ends backed by Rails or Node APIs, shipped end to end.",
    order: 0,
  },
  {
    title: "Backend Development",
    description: "REST APIs and data models designed to hold up under real traffic.",
    order: 1,
  },
  {
    title: "Database Design",
    description: "PostgreSQL schemas and Prisma models built for correctness and scale.",
    order: 2,
  },
  {
    title: "DevOps & CI/CD",
    description: "Docker-based deployments and CI pipelines that ship changes safely.",
    order: 3,
  },
];

async function main() {
  for (const project of projects) {
    await db.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: {
        ...project,
        techStack: JSON.stringify(project.techStack),
      },
    });
  }
  console.log(`Seeded ${projects.length} projects.`);

  await db.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      ...siteSettings,
      aboutHighlights: JSON.stringify(siteSettings.aboutHighlights),
      focusAreas: JSON.stringify(siteSettings.focusAreas),
      skillLanguages: JSON.stringify(siteSettings.skillLanguages),
      skillFrameworks: JSON.stringify(siteSettings.skillFrameworks),
      skillTools: JSON.stringify(siteSettings.skillTools),
    },
  });
  console.log("Seeded site settings.");

  for (const entry of experience) {
    const existing = await db.experience.findFirst({
      where: { role: entry.role, company: entry.company },
      select: { id: true },
    });
    if (existing) continue;
    await db.experience.create({
      data: {
        ...entry,
        skills: JSON.stringify(entry.skills),
        highlights: JSON.stringify(entry.highlights),
      },
    });
  }
  console.log(`Seeded ${experience.length} experience entries.`);

  for (const service of services) {
    const existing = await db.service.findFirst({
      where: { title: service.title },
      select: { id: true },
    });
    if (existing) continue;
    await db.service.create({ data: service });
  }
  console.log(`Seeded ${services.length} services.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
