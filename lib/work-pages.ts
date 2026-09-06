export type WorkPage = {
  slug: string
  title: string
  category: string
  year: string
  description: string
  outcome: string
  focus: string[]
  serviceSlug: string
  articleSlug: string
}

// These pages turn the public portfolio entries into stable, crawlable URLs.
// Keep the copy aligned with the approved portfolio source; do not add
// unsupported client names, metrics, or implementation claims here.
export const workPages: WorkPage[] = [
  {
    slug: 'digital-sifaris-darta-chalani-system',
    title: 'Digital Sifaris & Darta Chalani System',
    category: 'GovTech',
    year: '2025',
    description: 'A local-government digital records platform for recommendation letters, certificates, registration, dispatch, audit logs, and structured access.',
    outcome: 'Public service records issued in minutes instead of days.',
    focus: ['Recommendation letters and certificates', 'Registration and document dispatch', 'Audit logs and structured access'],
    serviceSlug: 'custom-software-development-nepal',
    articleSlug: 'building-software-for-the-way-nepal-works',
  },
  {
    slug: 'agriculture-survey-management',
    title: 'Agriculture Survey Management',
    category: 'Data System',
    year: '2024',
    description: 'A centralized system for survey design, field data collection, data management, analysis, visualization, and reporting.',
    outcome: 'Decision-ready field data without manual spreadsheet chaos.',
    focus: ['Survey design and field data collection', 'Data management, analysis, and visualization', 'Reporting for practical decisions'],
    serviceSlug: 'custom-software-development-nepal',
    articleSlug: 'building-software-for-the-way-nepal-works',
  },
  {
    slug: 'school-management-system',
    title: 'School Management System',
    category: 'Education',
    year: '2024',
    description: 'A school operations platform covering records, administration, communication, student data, and everyday academic workflows.',
    outcome: 'The whole school runs from one clear place.',
    focus: ['School records and administration', 'Student data and communication', 'Everyday academic workflows'],
    serviceSlug: 'custom-software-development-nepal',
    articleSlug: 'why-aasha-tech-focuses-on-useful-systems',
  },
  {
    slug: 'billing-invoicing-platform',
    title: 'Billing & Invoicing Platform',
    category: 'Business',
    year: '2023',
    description: 'Software for invoices, payments, customer records, tax handling, financial reports, and multi-currency business operations.',
    outcome: 'A cleaner financial workflow with fewer errors.',
    focus: ['Invoices and payment records', 'Customer records and tax handling', 'Financial reports and multi-currency operations'],
    serviceSlug: 'business-automation-nepal',
    articleSlug: 'the-work-after-the-launch',
  },
  {
    slug: 'inventory-pos-system',
    title: 'Inventory & POS System',
    category: 'Retail',
    year: '2023',
    description: 'Inventory and point-of-sale software for stock, sales, customers, payments, mobile operations, and business reporting.',
    outcome: 'Smarter stock control and smoother sales.',
    focus: ['Inventory and stock control', 'Point-of-sale sales and payments', 'Customer records and business reporting'],
    serviceSlug: 'business-automation-nepal',
    articleSlug: 'software-systems-for-slow-workflow',
  },
  {
    slug: 'file-document-management',
    title: 'File & Document Management',
    category: 'Document System',
    year: '2022',
    description: 'Digital file organization with search, backup, sharing, version tracking, compression, and controlled access.',
    outcome: 'Every record searchable, backed up, easy to find.',
    focus: ['Searchable digital file organization', 'Backup, sharing, and version tracking', 'Compression and controlled access'],
    serviceSlug: 'custom-software-development-nepal',
    articleSlug: 'the-work-after-the-launch',
  },
]

export function getWorkPage(slug: string) {
  return workPages.find((work) => work.slug === slug)
}

export function getWorkPageByTitle(title: string) {
  return workPages.find((work) => work.title === title)
}
