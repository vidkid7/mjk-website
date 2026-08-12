export type SocialLink = { label: string; href: string }

export type PublicSite = {
  name: string
  role: string
  tagline: string
  location: string
  email: string
  phone: string
  availability: string
  availabilityHref: string
  siteTitle: string
  metaDescription: string
  socials: SocialLink[]
  visibleSections: Record<string, boolean>
}

export type PublicHero = {
  eyebrow: string
  roleLine: string
  headline: string
  subheadline: string
  bio: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
  portrait: string
  stats: Array<{ value: number; suffix: string; label: string }>
}

export type PublicAbout = {
  index: string
  eyebrow: string
  heading: string
  paragraphs: string[]
  portrait: string
  highlights: string[]
  resumeHref: string
  meta: Array<{ label: string; value: string }>
}

export type PublicProject = {
  id: string
  title: string
  category: string
  year: string
  description: string
  outcome: string
  tags: string[]
  image?: string
}

export type PublicSkills = {
  disciplines: Array<{ title: string; description: string }>
  toolbox: string[]
}

export type PublicExperience = {
  period: string
  title: string
  org: string
  points: string[]
}

export type PublicTestimonial = {
  id: string
  quote: string
  name: string
  role: string
  photo?: string
  rating: number
}

export type PublicContact = {
  index: string
  eyebrow: string
  heading: string
  blurb: string
  email: string
  phone: string
  location: string
  socials: SocialLink[]
  studioFacts: Array<{ label: string; value: string }>
  workPrompts: Array<{ title: string; body: string }>
}

export type PublicService = {
  id: string
  slug: string
  name: string
  shortName: string
  title: string
  description: string
  intro: string
  outcomes: string[]
  process: Array<{ title: string; body: string }>
  faqs: Array<{ question: string; answer: string }>
  isPublished: boolean
  orderIndex: number
}

export type PublicUiCopy = {
  navigation: { menuKicker: string; menuDescription: string; sectionLinks: Array<{ label: string; href: string }>; pageLinks: Array<{ label: string; href: string }> }
  projects: { index: string; eyebrow: string; heading: string; viewLabel: string; gridLabel: string; focusLabel: string; discussLabel: string; openLabel: string; footerPrimary: string; footerSecondary: string }
  skills: { index: string; eyebrow: string; heading: string; readyLabel: string; categoriesLabel: string; toolsLabel: string; statusLabel: string; statusValue: string; practiceLabel: string; toolboxLabel: string; toolboxCountLabel: string }
  experience: { index: string; eyebrow: string; heading: string; filedLabel: string; entriesLabel: string; statusLabel: string; statusValue: string; footnote: string }
  testimonials: { index: string; eyebrow: string; heading: string; filedLabel: string; transmissionsLabel: string; channelLabel: string; channelValue: string; footnote: string }
  contact: { terminalLabel: string; statusValue: string; body: string; bodyMeta: string; emailAction: string; phoneAction: string; footerLabel: string; wiresLabel: string }
  footer: { brandEyebrow: string; statusValue: string; compilerLabel: string; navigationTitle: string; servicesTitle: string; studioTitle: string; wiresLabel: string; topLabel: string }
}

export type PublicArticle = {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string
  category: string
  readMinutes: number
  date: string
  cover?: string
  image?: string
  caption?: string
  tags: string[]
}

export type PublicContent = {
  site: PublicSite
  hero: PublicHero
  about: PublicAbout
  projects: PublicProject[]
  skills: PublicSkills
  experience: PublicExperience[]
  testimonials: PublicTestimonial[]
  contact: PublicContact
  services: PublicService[]
  articles: PublicArticle[]
  ui: PublicUiCopy
}

export const EMPTY_PUBLIC_UI_COPY: PublicUiCopy = {
  navigation: { menuKicker: '', menuDescription: '', sectionLinks: [], pageLinks: [] },
  projects: { index: '', eyebrow: '', heading: '', viewLabel: '', gridLabel: '', focusLabel: '', discussLabel: '', openLabel: '', footerPrimary: '', footerSecondary: '' },
  skills: { index: '', eyebrow: '', heading: '', readyLabel: '', categoriesLabel: '', toolsLabel: '', statusLabel: '', statusValue: '', practiceLabel: '', toolboxLabel: '', toolboxCountLabel: '' },
  experience: { index: '', eyebrow: '', heading: '', filedLabel: '', entriesLabel: '', statusLabel: '', statusValue: '', footnote: '' },
  testimonials: { index: '', eyebrow: '', heading: '', filedLabel: '', transmissionsLabel: '', channelLabel: '', channelValue: '', footnote: '' },
  contact: { terminalLabel: '', statusValue: '', body: '', bodyMeta: '', emailAction: '', phoneAction: '', footerLabel: '', wiresLabel: '' },
  footer: { brandEyebrow: '', statusValue: '', compilerLabel: '', navigationTitle: '', servicesTitle: '', studioTitle: '', wiresLabel: '', topLabel: '' },
}

export const EMPTY_PUBLIC_CONTENT: PublicContent = {
  site: {
    name: '',
    role: '',
    tagline: '',
    location: '',
    email: '',
    phone: '',
    availability: '',
    availabilityHref: '',
    siteTitle: '',
    metaDescription: '',
    socials: [],
    visibleSections: {},
  },
  hero: {
    eyebrow: '',
    roleLine: '',
    headline: '',
    subheadline: '',
    bio: '',
    ctaPrimary: { label: '', href: '' },
    ctaSecondary: { label: '', href: '' },
    portrait: '',
    stats: [],
  },
  about: {
    index: '',
    eyebrow: '',
    heading: '',
    paragraphs: [],
    portrait: '',
    highlights: [],
    resumeHref: '',
    meta: [],
  },
  projects: [],
  skills: { disciplines: [], toolbox: [] },
  experience: [],
  testimonials: [],
  contact: { index: '', eyebrow: '', heading: '', blurb: '', email: '', phone: '', location: '', socials: [], studioFacts: [], workPrompts: [] },
  services: [],
  articles: [],
  ui: EMPTY_PUBLIC_UI_COPY,
}
