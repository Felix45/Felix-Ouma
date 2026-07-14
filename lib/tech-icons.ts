import {
  siCss,
  siDocker,
  siGit,
  siHtml5,
  siJavascript,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siReact,
  siRuby,
  siRubyonrails,
  siTailwindcss,
  siTypescript,
} from "simple-icons";

export type TechIcon = { title: string; hex: string; path: string };

const ICONS: Record<string, TechIcon> = {
  javascript: siJavascript,
  typescript: siTypescript,
  ruby: siRuby,
  html: siHtml5,
  html5: siHtml5,
  css: siCss,
  css3: siCss,
  react: siReact,
  "next.js": siNextdotjs,
  nextjs: siNextdotjs,
  "ruby on rails": siRubyonrails,
  rails: siRubyonrails,
  "node.js": siNodedotjs,
  nodejs: siNodedotjs,
  node: siNodedotjs,
  "tailwind css": siTailwindcss,
  tailwindcss: siTailwindcss,
  git: siGit,
  docker: siDocker,
  postgresql: siPostgresql,
  postgres: siPostgresql,
  prisma: siPrisma,
};

export function getTechIcon(name: string): TechIcon | null {
  return ICONS[name.trim().toLowerCase()] ?? null;
}
