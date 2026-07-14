import type { Dictionary } from "@/lib/i18n/dictionaries/en";

// NOTE: Dholuo (Luo) is a low-resource language for machine translation.
// These are best-effort translations and should be reviewed/corrected by a
// fluent speaker before treating the site as Luo-ready.
const dictionary = {
  nav: {
    home: "Dala",
    projects: "Migawo",
    about: "Kuoma",
    experience: "Lony",
    contact: "Wuoyo Koda",
    openMenu: "Yaw Menu",
    closeMenu: "Lor Menu",
    languageLabel: "Dhok",
  },
  theme: {
    toggleLabel: "Lok Kido",
  },
  layout: {
    skipToContent: "Dhi e Content",
  },
  common: {
    getInTouch: "Wuoyo Koda",
  },
  hero: {
    greetingBefore: "An",
    greetingAfter: ", amor neni!",
    viewProjects: "Ne Migawo",
    focusLabel: "Fokus",
    yearsOfExperienceLabel: "Higni mag Lony",
    buildingComment: "agero gik matek ma nyalo timo tich adier",
  },
  about: {
    eyebrow: "kuoma",
    title: "Kuoma",
    downloadResume: "Gol CV",
  },
  skills: {
    eyebrow: "lony",
    title: "Gik Matiyogo",
    languages: "Dhok",
    frameworks: "Frameworks",
    tools: "Gik Tich kod Lony",
  },
  experience: {
    eyebrow: "tich",
    title: "Kuma Asetiyoe",
    intro:
      "Higni auchiel mag tich mar full-stack, nono kode, kod puonjo — yaw tich moro ineye gik moko.",
  },
  whatIDo: {
    eyebrow: "gima-atimo",
    title: "Loso gik mag full-stack, ka aketo chuny e frontend",
    introBefore:
      "Gimi itimo dwaro tich motegno chien mare. Anyalo konyi geno gimoro, app duto, kata backend machiwo teko. Ne matin kuom tich moko manie piny, kendo ka in gi paro moro,",
    introLink: "wuoyo koda",
  },
  featuredProjects: {
    eyebrow: "migawo-moyier",
    title: "Migawo Moyier",
    viewAll: "Ne Duto →",
  },
  contactSection: {
    eyebrow: "wuoyo-koda",
    title: "Wachungʼ Gimoro",
    blurb: "In gi paro moro kata idwaro mana mos? Or ote — kata yudo koda ka.",
    connectVerb: "wuoyo",
  },
  footer: {
    builtWith: "Ogero gi Next.js.",
  },
  socialRail: {
    scrollToTop: "Dok Malo",
  },
  projectCard: {
    featuredBadge: "Moyier",
  },
  projectSpotlight: {
    browseProjects: "Nonro Migawo",
    previousProject: "Migawo Machon",
    nextProject: "Migawo Maluwo",
    projectTitleLabel: "Wi Migawo",
    stackLabel: "Stack",
  },
  contactForm: {
    nameLabel: "Nying",
    namePlaceholder: "Ada Lovelace",
    emailLabel: "Imel",
    emailPlaceholder: "in@machiel.com",
    messageLabel: "Ote",
    messagePlaceholder: "En angʼo midwaro geno?",
    submit: "Or Ote",
    submitting: "Oro…",
    successMessage: "Erokamano — ote mari osechopo. Abiro wuoyo kodi machiegni.",
    rateLimitError: "Ioro ote mapiyo mokalo. Tem kendo bang dakika achiel.",
    genericError: "Rach osetimore. Tem kendo.",
    networkError: "Rach mar network. Non chandruok mari kendo tem kendo.",
  },
  projectsPage: {
    title: "Migawo",
    all: "Duto",
    empty: "Onge migawo moromre gi ayiero.",
    metaDescriptionBefore: "Migawo mochokore ma",
    metaDescriptionAfter: "osegero e puonjruok, ohala, kod rit mar network.",
  },
  projectDetail: {
    backToProjects: "← Dok e Migawo",
    liveDemo: "Nyis Moro",
    sourceCode: "Kod Migawo",
    notFoundTitle: "Migawo Ok Oyudi",
  },
  notFound: {
    message: "Gima ne imanyo onge ka. Wadog e yo mowinjore.",
    backHome: "Dok Dala",
  },
  errorPage: {
    title: "Rach Osetimore",
    message: "Rach ma ne ok oikore osetimore ka inyiso ekonya. Inyalo temo kendo, kata dok dala.",
    tryAgain: "Tem Kendo",
  },
} satisfies Dictionary;

export default dictionary;
