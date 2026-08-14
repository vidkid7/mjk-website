// Curated personal portfolio content for the public site.
// Written in a personal, first-person voice so the site reads like a
// portfolio of a person, not a company page.

export const pfMeta = {
  name: 'Mukesh Khadka',
  role: 'Independent Software Builder',
  tagline: `I turn slow, manual work into calm, dependable systems.`,
  shortBio: `I am Mukesh Khadka, a developer and entrepreneur based in Kathmandu. I make reliable websites, custom tools, and workflow systems for people who need technology to feel clear, useful, and easy to trust.`,
  location: 'Kathmandu, Nepal',
  email: 'khadkamukesh423@gmail.com',
  phone: '+977 985-1241656',
  availability: 'Founder/CEO at Aashatech',
  availabilityHref: 'https://aashatech.com/',
  resumeHref: '#contact',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mukesh-khadka-960401324/' },
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'Instagram', href: 'https://www.instagram.com/khadka3546' },
    { label: 'X', href: 'https://x.com/khadkamukesh422' },
  ],
}

export const pfHero = {
  eyebrow: 'Independent builder · Kathmandu, Nepal',
  roleLine: 'Software systems · workflow clarity · Nepal',
  headline: `I turn slow, manual work into calm, dependable systems.`,
  subheadline: `I design and ship practical digital systems for organizations that want less friction, better records, and more room to do meaningful work.`,
  ctaPrimary: { label: 'Open work index', href: '#work' },
  ctaSecondary: { label: 'Open channel', href: '#contact' },
  portrait: '/mk-removebg-preview.webp',
  stats: [
    { value: 33, suffix: '+', label: 'Projects delivered' },
    { value: 26, suffix: '+', label: 'Organizations served' },
    { value: 7, suffix: '+', label: 'Years of experience' },
    { value: 10, suffix: '+', label: 'Core capabilities' },
  ],
}

export const pfAbout = {
  index: '01',
  eyebrow: 'Operator profile',
  heading: 'I build the quiet layer that helps good work move.',
  paragraphs: [
    "I grew up in Nepal watching people carry important work through paper files, repeated calls, and processes that depended on memory. That experience shaped the way I build: start with the real workflow, remove the unnecessary steps, and make the result feel obvious to use.",
    'I have shipped websites, management systems, billing tools, data platforms, and automation for businesses, schools, and public institutions. The stack changes from project to project; the standard does not. The system should be dependable, readable, and useful on an ordinary Tuesday.',
    'I care about the moment after launch, when the software becomes part of someone’s routine. That is where good technology proves itself.',
  ],
  portrait: '/mk-removebg-preview.webp',
  highlights: [
    'Self-taught developer & entrepreneur',
    '7+ years building real products',
    'Based in Kathmandu · 26+ orgs served',
    'Focus on clean, reliable, useful systems',
  ],
  resumeHref: '#contact',
}

export const pfProjects = [
  {
    title: 'Digital Sifaris & Darta Chalani System',
    category: 'GovTech',
    year: '2025',
    description:
      'A local-government digital records platform for recommendation letters, certificates, registration, dispatch, audit logs, and structured access.',
    outcome: 'Public service records issued in minutes instead of days.',
    tags: ['Next.js', 'Supabase', 'Workflow', 'Roles'],
  },  {
    title: 'Agriculture Survey Management',
    category: 'Data System',
    year: '2024',
    description:
      'A centralized system for survey design, field data collection, data management, analysis, visualization, and reporting.',
    outcome: 'Decision-ready field data without manual spreadsheet chaos.',
    tags: ['Data', 'Dashboard', 'Analytics'],
  },
  {
    title: 'School Management System',
    category: 'Education',
    year: '2024',
    description:
      'A school operations platform covering records, administration, communication, student data, and everyday academic workflows.',
    outcome: 'The whole school runs from one clear place.',
    tags: ['CRM', 'Admin', 'Mobile'],
  },
  {
    title: 'Billing & Invoicing Platform',
    category: 'Business',
    year: '2023',
    description:
      'Software for invoices, payments, customer records, tax handling, financial reports, and multi-currency business operations.',
    outcome: 'A cleaner financial workflow with fewer errors.',
    tags: ['Fintech', 'Reports', 'Payments'],
  },
  {
    title: 'Inventory & POS System',
    category: 'Retail',
    year: '2023',
    description:
      'Inventory and point-of-sale software for stock, sales, customers, payments, mobile operations, and business reporting.',
    outcome: 'Smarter stock control and smoother sales.',
    tags: ['POS', 'Inventory', 'Mobile'],
  },
  {
    title: 'File & Document Management',
    category: 'Document System',
    year: '2022',
    description:
      'Digital file organization with search, backup, sharing, version tracking, compression, and controlled access.',
    outcome: 'Every record searchable, backed up, easy to find.',
    tags: ['Storage', 'Security', 'Search'],
  },
]

export const pfSkills = {
  disciplines: [
    {
      title: 'Web Platforms',
      description:
        'Fast, responsive, SEO-friendly websites and web apps built on modern stacks like Next.js and React.',
    },
    {
      title: 'Custom Software Systems',
      description:
        'ERP, CRM, and workflow systems tailored to the way an organization actually operates.',
    },
    {
      title: 'UI/UX & Interaction',
      description:
        'Clean interfaces and thoughtful flows that people can use without a manual or a training session.',
    },
    {
      title: 'Automation & Data',
      description:
        'Dashboards, reporting, alerts, and structured data that turn scattered inputs into useful decisions.',
    },
  ],
  toolbox: [
    'Next.js', 'React', 'TypeScript', 'JavaScript', 'Node.js', 'PostgreSQL',
    'Supabase', 'Tailwind CSS', 'REST / APIs', 'Responsive design', 'UI & UX',
    'Project coordination', 'Cloud deployment',
  ],
}

export const pfExperience = [
  {
    period: '2019 — Present',
    title: 'Founder & Independent Software Consultant',
    org: 'Self-directed · Nepal',
    points: [
      'Designed and shipped websites and management systems for 30+ organizations',
      'Led projects from discovery to deployment and training',
      'Advising, automation, and data tools for public and private clients',
    ],
  },
  {
    period: '2017 — 2018',
    title: 'Digital Systems & Software Portfolio',
    org: 'Early Practice · Kathmandu',
    points: [
      'Built first web projects for small businesses in Nepal',
      'Focused on practical tools that solved daily workflow problems',
      'Learned to combine business understanding with software craft',
    ],
  },
  {
    period: 'Education',
    title: 'Software & Design Foundations',
    org: 'Kathmandu, Nepal',
    points: [
      'Self-taught, project-driven learning across web development',
      'Continuous study of systems thinking, UX, and product delivery',
    ],
  },
]

export const pfTestimonials = [
  {
    quote:
      'We became more efficient and organized. The software is user-friendly, easy to use, and the functionality is practical for our work.',
    name: 'Roshan Pandey',
    role: 'Institutional Client',
  },
  {
    quote:
      'The project team understood our workflow and turned it into a clear digital system that reduced the manual tracking of records.',
    name: 'Operations Lead',
    role: 'Public Institution',
  },
  {
    quote:
      'The website and system improved how we present our business and manage customer information end to end.',
    name: 'Business Owner',
    role: 'SME Client',
  },
]

export const pfCulture = {
  index: '06',
  eyebrow: 'Cultural roots',
  heading: 'Proudly Nepali. Rooted in heritage, building for the future.',
  blurb:
    'I was born in Nepal — a land of the world\u2019s highest peak, the birthplace of the Buddha, and one of the most beautiful flags on earth. That heritage shapes how I work: patiently, respectfully, and with care for the people my work serves.',
  nepaliWord: 'नेपाल',
  flag: {
    video: '/nepal-flag-hero-bg-optimized.mp4',
    poster: '/nepal-flag-wave.png',
    title: 'The Flag of Nepal',
    caption: 'The only non-rectangular national flag in the world.',
  },
  tiles: [
    {
      image: '/cultural/janaki-temple.jpg',
      title: 'Janaki Mandir',
      location: 'Janakpur · Nepal',
      caption: 'The grand temple where Sita and Rama were wed.',
    },
    {
      image: '/cultural/mount-everest.jpg',
      title: 'Sagarmāthā · Mount Everest',
      location: 'Khumbu · Nepal',
      caption: 'The roof of the world, rising 8,849 m above sea level.',
    },
    {
      image: '/cultural/buddha.jpg',
      title: 'The Buddha',
      location: 'Lumbini · Nepal',
      caption: 'Birthplace of the Buddha — the light of Asia.',
    },
  ],
}

export const pfContact = {
  index: '07',
  eyebrow: 'Contact',
  heading: "Have a project in mind? Let's build something useful together.",
  blurb:
    'I am available for freelance projects, product partnerships, and technical consulting. Tell me about the problem you want to solve — I will tell you whether and how I can help.',
  email: 'khadkamukesh423@gmail.com',
  phone: '+977 984-1241656',
  location: 'Kathmandu, Nepal',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mukesh-khadka-960401324/' },
    { label: 'Instagram', href: 'https://www.instagram.com/khadka3546' },
    { label: 'X', href: 'https://x.com/khadkamukesh422' },
  ],
}

// Existing brand language remains available to the broader portfolio content contract.
// The gateway presents the new opening line above while preserving this established identity.
// I'm Mukesh Khadka. Software that feels like it always belonged.
