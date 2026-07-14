const dictionary = {
  nav: {
    home: "Home",
    projects: "Projects",
    about: "About",
    experience: "Experience",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Language",
  },
  theme: {
    toggleLabel: "Toggle color theme",
  },
  layout: {
    skipToContent: "Skip to content",
  },
  common: {
    getInTouch: "Get in touch",
  },
  hero: {
    greetingBefore: "I'm",
    greetingAfter: ", glad to see you!",
    viewProjects: "View projects",
    focusLabel: "focus",
    yearsOfExperienceLabel: "Years of experience",
    buildingComment: "building things that hold up under real traffic",
  },
  about: {
    eyebrow: "about",
    title: "About me",
    downloadResume: "Download résumé",
  },
  skills: {
    eyebrow: "skills",
    title: "What I work with",
    languages: "Languages",
    frameworks: "Frameworks",
    tools: "Tools & Skills",
  },
  experience: {
    eyebrow: "experience",
    title: "Where I've worked",
    intro:
      "Six years across full-stack engineering, code review, and teaching — expand a role for the details.",
  },
  whatIDo: {
    eyebrow: "what-i-do",
    title: "Full-stack development, frontend focused",
    introBefore:
      "Your product deserves solid engineering behind it. I can help you build a feature, a full application, or the backend powering one. Take a look at some of my work below, and if you have a project in mind, don't hesitate to",
    introLink: "get in touch",
  },
  featuredProjects: {
    eyebrow: "featured-projects",
    title: "Selected work",
    viewAll: "View all →",
  },
  contactSection: {
    eyebrow: "contact",
    title: "Let's build something",
    blurb: "Have a project in mind or just want to say hi? Send a message — or find me here.",
    connectVerb: "connect",
  },
  footer: {
    builtWith: "Built with Next.js.",
  },
  socialRail: {
    scrollToTop: "Scroll to top",
  },
  projectCard: {
    featuredBadge: "Featured",
  },
  projectSpotlight: {
    browseProjects: "Browse projects",
    previousProject: "Previous project",
    nextProject: "Next project",
    projectTitleLabel: "Project Title",
    stackLabel: "Stack",
  },
  contactForm: {
    nameLabel: "Name",
    namePlaceholder: "Ada Lovelace",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    messageLabel: "Message",
    messagePlaceholder: "What are you looking to build?",
    submit: "Send message",
    submitting: "Sending…",
    successMessage: "Thanks — your message is in. I'll get back to you soon.",
    rateLimitError: "You're sending messages too quickly. Please try again in a minute.",
    genericError: "Something went wrong. Please try again.",
    networkError: "Network error. Please check your connection and try again.",
  },
  projectsPage: {
    title: "Projects",
    all: "All",
    empty: "No projects match that filter yet.",
    metaDescriptionBefore: "A collection of projects",
    metaDescriptionAfter: "has built across education, e-commerce, and cybersecurity.",
  },
  projectDetail: {
    backToProjects: "← Back to projects",
    liveDemo: "Live demo",
    sourceCode: "Source code",
    notFoundTitle: "Project not found",
  },
  notFound: {
    message: "Whatever you were looking for isn't here. Let's get you back on track.",
    backHome: "Back home",
  },
  errorPage: {
    title: "Something went wrong",
    message:
      "An unexpected error occurred while rendering this page. You can try again, or head back home.",
    tryAgain: "Try again",
  },
};

export type Dictionary = typeof dictionary;

export default dictionary;
