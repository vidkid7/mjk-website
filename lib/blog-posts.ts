export type BlogPost = {
  slug: string
  cover: string
  category: string
  date: string
  title: string
  excerpt: string
  description: string
  takeaways: string[]
  sections: Array<{ heading: string; paragraphs: string[] }>
}

// These are permanent editorial pages, not temporary UI copy.  Keeping them in
// the server-readable source gives search engines a stable URL and full text.
export const blogPosts: BlogPost[] = [
  {
    slug: 'software-architecture-for-reliable-systems',
    cover: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200',
    category: 'Software architecture',
    date: '2026-01-15',
    title: 'Why software architecture matters for reliable digital systems',
    excerpt: 'Software architecture determines how a system is organized, how its major parts communicate, and how safely it can evolve as a team or organization grows.',
    description: 'A practical explanation of software architecture for organizations planning a website, dashboard, workflow, or custom software system.',
    takeaways: [
      'Start with users, workflows, and data before choosing tools.',
      'Keep the system modular so changes do not break unrelated work.',
      'Plan for security, backups, roles, and maintenance from the beginning.',
    ],
    sections: [
      {
        heading: 'Architecture is the working structure behind a product',
        paragraphs: [
          'Software architecture is the high-level structure of a digital product. It explains where data lives, how screens connect to services, who can perform which actions, and how the system behaves as more people and information are added.',
          'For a business, school, municipality, or growing team, that structure matters as much as the visible design. A good interface can make a first impression, but a clear architecture is what helps the product remain dependable after launch.',
        ],
      },
      {
        heading: 'Begin with the real workflow',
        paragraphs: [
          'The most useful architecture starts with practical questions: What information enters the system? Who checks it? What needs approval? Which reports are required? Where do delays or duplicate entries happen today?',
          'Answering those questions early prevents a common problem: building attractive screens that do not match the organization’s daily process. It also helps teams choose the right level of automation instead of adding complexity without a clear benefit.',
        ],
      },
      {
        heading: 'Design for change, not only the first launch',
        paragraphs: [
          'Requirements change. New users arrive, reporting needs expand, and a simple workflow can become a multi-step process. Separating responsibilities—such as user access, records, notifications, reporting, and integrations—makes those changes safer and easier to test.',
          'This approach does not mean every project needs an oversized technical stack. It means choosing a structure that is understandable, maintainable, and proportionate to the real work the system needs to do.',
        ],
      },
    ],
  },
  {
    slug: 'user-experience-in-software-design',
    cover: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200',
    category: 'User experience',
    date: '2026-01-10',
    title: 'Why user experience belongs at the center of software design',
    excerpt: 'User experience affects whether people can understand, trust, and consistently use a digital product—not simply whether it looks modern.',
    description: 'A practical guide to designing clear, useful software experiences for customers, staff, and public-facing services.',
    takeaways: [
      'Design around the task a person is trying to complete.',
      'Use plain language, clear feedback, and predictable navigation.',
      'Test important flows with real users before treating a release as finished.',
    ],
    sections: [
      {
        heading: 'Useful software reduces effort',
        paragraphs: [
          'User experience, often called UX, is the complete experience a person has while trying to complete a task. In software, that includes the wording, navigation, page speed, form fields, error messages, confirmation steps, and support for mobile devices.',
          'The goal is not decoration. The goal is to help a person finish the right task with confidence and without unnecessary delay.',
        ],
      },
      {
        heading: 'Clarity builds trust',
        paragraphs: [
          'People hesitate when a system hides what will happen next. Clear labels, visible progress, meaningful validation, and simple confirmations make a process feel safer—especially for payments, records, approvals, and public services.',
          'Small choices have a large effect. A button should describe its result, a required field should explain why it is needed, and an error should tell the person how to recover rather than merely saying something went wrong.',
        ],
      },
      {
        heading: 'Mobile use is part of the product, not a later adjustment',
        paragraphs: [
          'Many users first encounter a website or service on a phone. Designing the important flow for a small screen helps teams focus on what is essential: readable content, tap-friendly controls, fast loading, and forms that do not create unnecessary friction.',
          'A thoughtful UX process combines observation, content planning, prototype feedback, accessibility checks, and refinement after release. That is how a product becomes easier to adopt and support over time.',
        ],
      },
    ],
  },
  {
    slug: 'creating-a-software-development-roadmap',
    cover: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200',
    category: 'Planning',
    date: '2026-01-05',
    title: 'How to create a practical software development roadmap',
    excerpt: 'A roadmap turns a product idea into a shared plan: the intended outcome, the priorities, the delivery stages, and the decisions that still need evidence.',
    description: 'A step-by-step perspective on planning websites, software platforms, and digital transformation projects.',
    takeaways: [
      'Define the outcome and the people it should help before listing features.',
      'Release the most valuable workflow first, then learn from real use.',
      'Use measurable milestones so progress and decisions stay visible.',
    ],
    sections: [
      {
        heading: 'A roadmap connects vision to decisions',
        paragraphs: [
          'A software roadmap is a communication tool. It gives stakeholders a shared view of why a project exists, what comes first, and how the team will move from discovery to launch and improvement.',
          'It should be specific enough to guide decisions but flexible enough to respond to what users and the organization learn during delivery.',
        ],
      },
      {
        heading: 'Prioritize the workflow that creates the most value',
        paragraphs: [
          'Feature lists can grow quickly. A stronger approach is to identify the core workflow that solves the most important problem, then make that workflow reliable before extending the product.',
          'For example, a records platform may first need accurate entry, search, roles, and reporting. Secondary integrations or advanced customization can follow once the core process works in practice.',
        ],
      },
      {
        heading: 'Make progress measurable',
        paragraphs: [
          'Useful roadmap milestones describe outcomes, such as a validated workflow, a tested prototype, a secure data model, or a team trained to use the new process. This keeps attention on real readiness instead of only the number of features built.',
          'Reviewing the roadmap regularly also creates room for responsible changes. If new evidence shows a planned item is no longer valuable, the team can adjust before investing more time and budget.',
        ],
      },
    ],
  },
]

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}
