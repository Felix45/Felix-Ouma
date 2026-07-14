import type { Dictionary } from "@/lib/i18n/dictionaries/en";

const dictionary = {
  nav: {
    home: "Accueil",
    projects: "Projets",
    about: "À propos",
    experience: "Expérience",
    contact: "Contact",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    languageLabel: "Langue",
  },
  theme: {
    toggleLabel: "Changer de thème",
  },
  layout: {
    skipToContent: "Aller au contenu",
  },
  common: {
    getInTouch: "Me contacter",
  },
  hero: {
    greetingBefore: "Je suis",
    greetingAfter: ", ravi de te voir !",
    viewProjects: "Voir les projets",
    focusLabel: "focus",
    yearsOfExperienceLabel: "Années d'expérience",
    buildingComment: "je construis des choses capables de tenir sous une vraie charge",
  },
  about: {
    eyebrow: "a-propos",
    title: "À propos de moi",
    downloadResume: "Télécharger le CV",
  },
  skills: {
    eyebrow: "competences",
    title: "Avec quoi je travaille",
    languages: "Langages",
    frameworks: "Frameworks",
    tools: "Outils & compétences",
  },
  experience: {
    eyebrow: "experience",
    title: "Où j'ai travaillé",
    intro:
      "Six ans entre ingénierie full-stack, revue de code et enseignement — déroulez un poste pour voir les détails.",
  },
  whatIDo: {
    eyebrow: "ce-que-je-fais",
    title: "Développement full-stack, orienté frontend",
    introBefore:
      "Votre produit mérite une ingénierie solide derrière lui. Je peux vous aider à construire une fonctionnalité, une application complète, ou le backend qui la fait tourner. Jetez un œil à quelques-uns de mes travaux ci-dessous, et si vous avez un projet en tête, n'hésitez pas à",
    introLink: "me contacter",
  },
  featuredProjects: {
    eyebrow: "projets-en-vedette",
    title: "Sélection de projets",
    viewAll: "Tout voir →",
  },
  contactSection: {
    eyebrow: "contact",
    title: "Construisons quelque chose",
    blurb:
      "Un projet en tête, ou juste envie de dire bonjour ? Envoyez un message — ou retrouvez-moi ici.",
    connectVerb: "contacter",
  },
  footer: {
    builtWith: "Construit avec Next.js.",
  },
  socialRail: {
    scrollToTop: "Remonter en haut",
  },
  projectCard: {
    featuredBadge: "En vedette",
  },
  projectSpotlight: {
    browseProjects: "Parcourir les projets",
    previousProject: "Projet précédent",
    nextProject: "Projet suivant",
    projectTitleLabel: "Titre du projet",
    stackLabel: "Stack",
  },
  contactForm: {
    nameLabel: "Nom",
    namePlaceholder: "Ada Lovelace",
    emailLabel: "E-mail",
    emailPlaceholder: "vous@exemple.com",
    messageLabel: "Message",
    messagePlaceholder: "Que souhaitez-vous construire ?",
    submit: "Envoyer le message",
    submitting: "Envoi…",
    successMessage: "Merci — votre message est bien arrivé. Je reviens vers vous rapidement.",
    rateLimitError: "Vous envoyez des messages trop rapidement. Réessayez dans une minute.",
    genericError: "Une erreur est survenue. Merci de réessayer.",
    networkError: "Erreur réseau. Vérifiez votre connexion et réessayez.",
  },
  projectsPage: {
    title: "Projets",
    all: "Tous",
    empty: "Aucun projet ne correspond à ce filtre pour l'instant.",
    metaDescriptionBefore: "Une sélection de projets que",
    metaDescriptionAfter: "a réalisés dans l'éducation, l'e-commerce et la cybersécurité.",
  },
  projectDetail: {
    backToProjects: "← Retour aux projets",
    liveDemo: "Démo en ligne",
    sourceCode: "Code source",
    notFoundTitle: "Projet introuvable",
  },
  notFound: {
    message: "Ce que vous cherchiez n'est pas ici. Revenons sur la bonne voie.",
    backHome: "Retour à l'accueil",
  },
  errorPage: {
    title: "Une erreur est survenue",
    message:
      "Une erreur inattendue s'est produite lors de l'affichage de cette page. Vous pouvez réessayer, ou retourner à l'accueil.",
    tryAgain: "Réessayer",
  },
} satisfies Dictionary;

export default dictionary;
