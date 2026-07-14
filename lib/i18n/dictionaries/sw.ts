import type { Dictionary } from "@/lib/i18n/dictionaries/en";

const dictionary = {
  nav: {
    home: "Nyumbani",
    projects: "Miradi",
    about: "Kuhusu",
    experience: "Uzoefu",
    contact: "Wasiliana",
    openMenu: "Fungua menyu",
    closeMenu: "Funga menyu",
    languageLabel: "Lugha",
  },
  theme: {
    toggleLabel: "Badilisha mandhari",
  },
  layout: {
    skipToContent: "Ruka hadi maudhui",
  },
  common: {
    getInTouch: "Wasiliana nami",
  },
  hero: {
    greetingBefore: "Mimi ni",
    greetingAfter: ", nafurahi kukuona!",
    viewProjects: "Tazama miradi",
    focusLabel: "lengo",
    yearsOfExperienceLabel: "Miaka ya uzoefu",
    buildingComment: "ninajenga vitu vinavyostahimili mzigo halisi",
  },
  about: {
    eyebrow: "kuhusu",
    title: "Kuhusu Mimi",
    downloadResume: "Pakua CV",
  },
  skills: {
    eyebrow: "ujuzi",
    title: "Ninachofanyia Kazi",
    languages: "Lugha",
    frameworks: "Mifumo",
    tools: "Zana na Ujuzi",
  },
  experience: {
    eyebrow: "uzoefu",
    title: "Nilipofanya Kazi",
    intro:
      "Miaka sita ya uhandisi wa full-stack, ukaguzi wa msimbo, na ufundishaji — fungua nafasi ya kazi kuona maelezo zaidi.",
  },
  whatIDo: {
    eyebrow: "ninachofanya",
    title: "Ukuzaji wa full-stack, ukilenga frontend",
    introBefore:
      "Bidhaa yako inastahili uhandisi imara nyuma yake. Ninaweza kukusaidia kujenga kipengele, programu kamili, au mfumo wa nyuma unaoiendesha. Angalia baadhi ya kazi zangu hapa chini, na kama una mradi akilini, usisite",
    introLink: "kuwasiliana nami",
  },
  featuredProjects: {
    eyebrow: "miradi-teule",
    title: "Kazi Zilizochaguliwa",
    viewAll: "Tazama zote →",
  },
  contactSection: {
    eyebrow: "wasiliana",
    title: "Hebu Tujenge Kitu",
    blurb: "Una mradi akilini au unataka tu kusalimia? Tuma ujumbe — au nipate hapa.",
    connectVerb: "wasiliana",
  },
  footer: {
    builtWith: "Imejengwa kwa Next.js.",
  },
  socialRail: {
    scrollToTop: "Rudi juu",
  },
  projectCard: {
    featuredBadge: "Iliyoangaziwa",
  },
  projectSpotlight: {
    browseProjects: "Vinjari miradi",
    previousProject: "Mradi uliopita",
    nextProject: "Mradi unaofuata",
    projectTitleLabel: "Kichwa cha Mradi",
    stackLabel: "Stack",
  },
  contactForm: {
    nameLabel: "Jina",
    namePlaceholder: "Ada Lovelace",
    emailLabel: "Barua pepe",
    emailPlaceholder: "wewe@mfano.com",
    messageLabel: "Ujumbe",
    messagePlaceholder: "Unataka kujenga nini?",
    submit: "Tuma ujumbe",
    submitting: "Inatuma…",
    successMessage: "Asante — ujumbe wako umepokelewa. Nitawasiliana nawe hivi karibuni.",
    rateLimitError: "Unatuma ujumbe kwa haraka sana. Tafadhali jaribu tena baada ya dakika moja.",
    genericError: "Hitilafu imetokea. Tafadhali jaribu tena.",
    networkError: "Hitilafu ya mtandao. Angalia muunganisho wako na ujaribu tena.",
  },
  projectsPage: {
    title: "Miradi",
    all: "Zote",
    empty: "Hakuna mradi unaolingana na kichujio hiki kwa sasa.",
    metaDescriptionBefore: "Mkusanyiko wa miradi ambayo",
    metaDescriptionAfter: "amejenga katika elimu, biashara mtandaoni, na usalama wa mtandao.",
  },
  projectDetail: {
    backToProjects: "← Rudi kwenye miradi",
    liveDemo: "Onyesho la moja kwa moja",
    sourceCode: "Msimbo chanzo",
    notFoundTitle: "Mradi haukupatikana",
  },
  notFound: {
    message: "Ulichokuwa unatafuta hakipo hapa. Hebu turudi kwenye mstari.",
    backHome: "Rudi nyumbani",
  },
  errorPage: {
    title: "Hitilafu imetokea",
    message:
      "Hitilafu isiyotarajiwa ilitokea wakati wa kuonyesha ukurasa huu. Unaweza kujaribu tena, au kurudi nyumbani.",
    tryAgain: "Jaribu tena",
  },
} satisfies Dictionary;

export default dictionary;
