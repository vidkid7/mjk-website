export type ServicePage = {
  slug: string
  name: string
  shortName: string
  title: string
  description: string
  intro: string
  outcomes: string[]
  process: Array<{ title: string; body: string }>
  faqs: Array<{ question: string; answer: string }>
}

export const servicePages: ServicePage[] = [
  {
    slug: 'web-development-nepal',
    name: 'Web Development in Nepal',
    shortName: 'Web Development',
    title: 'Web Development in Nepal | Fast, Clear Digital Platforms',
    description: 'Web development in Nepal for organizations that need a clear, fast, mobile-friendly website with practical content, structure, and a maintainable foundation.',
    intro: 'A useful website should help people understand an organization, find the right information, and take the next step without unnecessary friction. This work focuses on the practical pieces behind that experience: content structure, responsive design, accessibility, performance, and a foundation that can be maintained as needs evolve.',
    outcomes: ['A clear page structure based on visitor questions and goals', 'Responsive interfaces that work across phones, tablets, and desktops', 'Performance-conscious delivery that supports a good first experience', 'Search-ready titles, descriptions, internal links, and structured data'],
    process: [
      { title: 'Understand the purpose', body: 'Start by defining the people the website needs to serve, the questions they arrive with, and the action that should be easiest to complete.' },
      { title: 'Plan the information', body: 'Organize pages, headings, calls to action, and supporting content so both visitors and search engines can understand what each page is about.' },
      { title: 'Build for real devices', body: 'Create responsive pages with readable content, sensible navigation, and asset choices that avoid slowing down the first view.' },
      { title: 'Review and improve', body: 'Check important user journeys, technical search signals, and content clarity before publishing, then refine with real feedback.' },
    ],
    faqs: [
      { question: 'What makes a website search-friendly?', answer: 'Search-friendly websites give each important topic a useful page, use descriptive titles and headings, load reliably, link related pages together, and provide content that directly answers a visitor’s question.' },
      { question: 'Why does mobile performance matter for a website?', answer: 'Many visitors use a phone first. Fast loading, readable type, clear controls, and lightweight media help people reach information without delay and support a stronger overall experience.' },
      { question: 'Can an existing website be improved instead of replaced?', answer: 'Often, yes. A focused review can identify content gaps, slow assets, unclear navigation, missing metadata, and technical issues that can be improved without rebuilding every part of the site.' },
    ],
  },
  {
    slug: 'custom-software-development-nepal',
    name: 'Custom Software Development in Nepal',
    shortName: 'Custom Software',
    title: 'Custom Software Development in Nepal | Practical Digital Systems',
    description: 'Custom software development in Nepal for teams that need practical workflows, clear user roles, reliable information, and a system that can grow responsibly.',
    intro: 'Custom software is most valuable when it removes a specific source of manual work, confusion, or duplicated information. The right starting point is not a long feature list—it is a shared understanding of the people, records, approvals, and decisions the system needs to support.',
    outcomes: ['A scope built around a high-value workflow rather than unnecessary features', 'Clear roles, data ownership, and operational steps', 'A maintainable structure for future changes and integrations', 'A delivery plan with visible priorities and measurable milestones'],
    process: [
      { title: 'Map the workflow', body: 'Document the current process: information entering the system, people involved, approval points, handoffs, reports, and avoidable delays.' },
      { title: 'Define the first release', body: 'Prioritize the smallest reliable workflow that solves the most important problem, then keep secondary features for later evidence-based decisions.' },
      { title: 'Design the system structure', body: 'Plan data, permissions, screens, notifications, and integrations so the product remains understandable as more users and requirements are added.' },
      { title: 'Validate before expansion', body: 'Review the important tasks with the people who will use the system, then improve the experience before extending the product further.' },
    ],
    faqs: [
      { question: 'When is custom software a good fit?', answer: 'Custom software is worth considering when an important workflow does not fit standard tools, when teams repeatedly copy data between systems, or when a process needs specific roles, records, reporting, or approvals.' },
      { question: 'How should a software project begin?', answer: 'Begin with the outcome, users, workflow, and information that matter most. That creates a stronger brief than starting with technology choices or a large unprioritized feature list.' },
      { question: 'How can a team reduce software project risk?', answer: 'Reduce risk by validating the core workflow early, using clear milestones, keeping responsibilities understandable, and planning security, backups, roles, and maintenance from the beginning.' },
    ],
  },
  {
    slug: 'business-automation-nepal',
    name: 'Business Automation in Nepal',
    shortName: 'Business Automation',
    title: 'Business Automation in Nepal | Clearer, More Reliable Workflows',
    description: 'Business automation in Nepal for organizations that want to reduce repetitive manual work, create clearer handoffs, and make important processes easier to track.',
    intro: 'Automation should make work easier to understand, not hide it behind a complicated tool. A practical approach begins by finding repeated tasks, unclear handoffs, and information that is being entered more than once. The goal is a dependable process with useful human oversight.',
    outcomes: ['Fewer repeated manual steps in a defined workflow', 'Clearer notifications, ownership, and follow-up points', 'More consistent records for reporting and decisions', 'Automation that stays proportionate to the actual process'],
    process: [
      { title: 'Find repeated work', body: 'Identify tasks that happen frequently, create delays, or require people to move the same information between messages, spreadsheets, and systems.' },
      { title: 'Simplify before automating', body: 'Clarify the process, ownership, and exceptions first. Automating an unclear process simply makes the confusion happen faster.' },
      { title: 'Connect useful steps', body: 'Use forms, notifications, records, and approvals to reduce unnecessary handoffs while keeping the people responsible able to see what is happening.' },
      { title: 'Measure the result', body: 'Review whether the change reduced time, errors, or missed follow-ups, then adjust the workflow based on real use.' },
    ],
    faqs: [
      { question: 'What business tasks are suitable for automation?', answer: 'Good candidates are repeated, rule-based tasks such as routing requests, sending reminders, collecting structured information, updating a record, or preparing routine status information.' },
      { question: 'Will automation remove human oversight?', answer: 'Not necessarily. Good automation makes routine steps more reliable while keeping people involved for exceptions, decisions, approvals, and work that needs judgment.' },
      { question: 'What should be checked before automating a workflow?', answer: 'Check the purpose of the workflow, the people responsible, the information required, known exceptions, privacy needs, and how the result will be measured after the change.' },
    ],
  },
]

export function getServicePage(slug: string) {
  return servicePages.find((service) => service.slug === slug)
}
