const fs = require('fs')
const path = require('path')
const vm = require('vm')
const ts = require(path.join(process.cwd(), 'node_modules/typescript'))
const { Client } = require('C:/Users/A C E R/AppData/Local/Temp/mjk-pg-runtime-163fbe71fd3c4e9eb36c2cceddb2aaac/node_modules/pg')

const env = Object.fromEntries(
  fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf8')
    .split(/\r?\n/)
    .filter((line) => line && !line.trim().startsWith('#') && line.includes('='))
    .map((line) => {
      const index = line.indexOf('=')
      return [line.slice(0, index), line.slice(index + 1).trim().replace(/^"|"$/g, '')]
    }),
)

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
const projectRef = new URL(supabaseUrl).hostname.split('.')[0]
if (projectRef !== 'pfzpvjynhthlvgkrzron') {
  throw new Error(`Refusing unexpected Supabase project: ${projectRef}`)
}

const source = fs.readFileSync(path.join(process.cwd(), 'lib/placeholder-data.ts'), 'utf8')
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText
const moduleObject = { exports: {} }
vm.runInNewContext(compiled, { module: moduleObject, exports: moduleObject.exports }, { filename: 'lib/placeholder-data.ts' })
const original = moduleObject.exports

const articleSource = fs.readFileSync(path.join(process.cwd(), 'lib/articles.ts'), 'utf8')
const articleCompiled = ts.transpileModule(articleSource, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText
const articleModule = { exports: {} }
vm.runInNewContext(articleCompiled, { module: articleModule, exports: articleModule.exports }, { filename: 'lib/articles.ts' })
const originalArticles = articleModule.exports.getArticles()

const entrepreneurship = {
  sectionTitle: 'Delivery Capability Built Around Real Workflows',
  sectionSubtitle: 'A practical process for software, websites, dashboards, records, automation, and digital product delivery.',
  businesses: [
    { iconName: 'Rocket', title: 'Discovery & Strategy', description: 'Clarify goals, users, workflows, content, technology requirements, and the minimum useful version before development starts.', stat: '01', statLabel: 'Plan first' },
    { iconName: 'Database', title: 'Design & Development', description: 'Build clean interfaces, databases, dashboards, APIs, admin panels, and responsive pages around the approved delivery plan.', stat: '02', statLabel: 'Build clearly' },
    { iconName: 'TrendingUp', title: 'Launch & Improvement', description: 'Deploy, test, train, collect feedback, and improve the system so it remains practical after the first launch.', stat: '03', statLabel: 'Improve often' },
  ],
  stats: [
    { value: '33+', label: 'Projects Delivered' },
    { value: '26+', label: 'Organizations Served' },
    { value: '10+', label: 'Core Capabilities' },
  ],
  quoteText: 'A useful digital system is not the one with the most features. It is the one that solves the real workflow clearly, reliably, and repeatedly.',
  quoteAttribution: 'Digital Delivery Principle',
}

const youth = {
  heading: 'Knowledge, Insights & Digital Thinking',
  description: 'A practical space for ideas about software, user experience, automation, websites, systems, and technology planning for organizations that want to improve digitally.',
  testimonials: [
    { photo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300', name: 'Software Architecture', role: 'System Planning', quote: 'Good software starts with structure. Architecture helps teams understand how features, data, security, and future changes fit together.' },
    { photo: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=300', name: 'User Experience', role: 'Product Design', quote: 'A useful system must be easy to understand. Clear interfaces improve adoption, trust, speed, and the value users get from the product.' },
    { photo: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=300', name: 'Development Roadmap', role: 'Delivery Planning', quote: 'A roadmap keeps everyone aligned on priorities, phases, responsibilities, and the expected progress of a software product.' },
  ],
  ctaText: 'Read Blog Posts',
}

const faq = {
  questions: [
    ['What services does Mukesh Khadka provide?', 'Website development, custom software systems, ERP and CRM platforms, business automation, UI/UX design, mobile app solutions, and file or billing systems.'],
    ['Who does Mukesh Khadka work with?', 'Businesses, institutions, municipalities, schools, and growth-focused teams that need practical digital products and operational systems.'],
    ['Where is Mukesh Khadka based?', 'Kathmandu, Bagmati Province, Nepal. Projects can be delivered locally or remotely.'],
    ['How can I start a project?', 'Use the contact form, call +977 985-1241656, or email khadkamukesh423@gmail.com with your goals, timeline, and budget range.'],
  ],
}

const clientPortfolio = {
  aashaTechUrl: 'https://aashatech.com/',
  portfolioItems: [
    { title: 'Digital Sifaris & Darta Chalani System', category: 'Government / Institutional Projects', description: 'A centralized local-government system for recommendation letters, registration workflows, and official document tracking.', icon: 'Landmark', tone: 'crimson' },
    { title: 'Agriculture Survey Management System', category: 'Web Applications', description: 'A structured survey platform built to collect, manage, and analyze agriculture-related field information efficiently.', icon: 'Globe2', tone: 'emerald' },
    { title: 'School Management System', category: 'ERP / CRM Systems', description: 'A digital school operations system designed to simplify academic records, administration, and daily workflows.', icon: 'Building2', tone: 'blue' },
    { title: 'Inventory & POS System', category: 'Business Automation', description: 'A business-ready solution for product inventory, billing, sales tracking, and point-of-sale operations.', icon: 'LayoutDashboard', tone: 'gold' },
    { title: 'Scholarship Management System', category: 'Custom Software Solutions', description: 'A workflow-focused system that helps organizations manage scholarship applications, tracking, and review processes.', icon: 'Database', tone: 'violet' },
    { title: 'Website & Mobile App Delivery', category: 'Website Development', description: 'Modern websites, mobile-first interfaces, and custom digital products created for businesses and institutions.', icon: 'MonitorSmartphone', tone: 'cyan' },
  ],
  servicePillars: [
    { label: 'Website Development', icon: 'Code2' },
    { label: 'Mobile App Solutions', icon: 'Smartphone' },
    { label: 'ERP / CRM Systems', icon: 'Database' },
    { label: 'UI/UX Design', icon: 'Palette' },
    { label: 'Business Automation', icon: 'Workflow' },
    { label: 'File & Billing Systems', icon: 'FileText' },
  ],
  proofPoints: [
    { value: '33', label: 'Projects Delivered' },
    { value: '27+', label: 'Happy Clients' },
    { value: '10+', label: 'Team Strength' },
  ],
  trustedBy: ['Home Ministry, SinghaDurbar', 'Pokhara University', 'Khaptad National Park', 'Malangwa Municipality', 'Lalbandi Municipality', 'Antarik Rajaswo Karyalaya'],
}

const pages = {
  entrepreneurship,
  youth,
  faq,
  portraitStory: {
    portraits: {
      temple: '/assets/portraits/mukesh-temple.jpg',
      workspace: '/assets/portraits/mukesh-workspace.jpg',
      garden: '/assets/portraits/mukesh-garden.jpg',
      sky: '/assets/portraits/mukesh-sky.jpg',
    },
  },
  clientPortfolio,
  portfolio: {
    profile: {
      name: 'Mukesh Khadka',
      role: 'Digital Systems & Software Portfolio',
      tagline: 'Software Systems • Web Platforms • Digital Transformation',
      location: 'Kathmandu, Bagmati Province, Nepal',
      email: 'khadkamukesh423@gmail.com',
      phone: '+977 985-1241656',
      availability: 'CEO at AashaTech',
      availabilityHref: 'https://aashatech.com/',
      socials: [
        { label: 'Facebook', href: 'https://www.facebook.com/Nepali.man.67' },
        { label: 'Instagram', href: 'https://www.instagram.com/khadka3546?utm_source=qr' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mukesh-khadka-960401324/' },
        { label: 'X', href: 'https://x.com/khadkamukesh422?s=11' },
      ],
    },
    hero: {
      eyebrow: 'Digital Systems & Software Portfolio',
      roleLine: 'Software Systems • Web Platforms • Digital Transformation',
      ctaPrimaryHref: '#work',
      ctaSecondaryHref: '#contact',
    },
    about: {
      index: '01',
      eyebrow: 'About Mukesh',
      highlights: ['Practical software delivery', 'Clear digital presentation', 'Systems that support daily work'],
      resumeHref: '#contact',
      meta: [
        { label: 'Based in', value: 'Kathmandu, Nepal' },
        { label: 'Focus', value: 'Useful digital systems' },
        { label: 'Delivery', value: 'Web, software, workflows' },
      ],
    },
    skills: {
      toolbox: ['Web Platforms', 'Custom Software Systems', 'Workflow Automation', 'UI/UX Design', 'Dashboards', 'Digital Transformation'],
    },
  },
  profile: {
    name: 'Mukesh Khadka',
    role: 'Digital Systems & Software Portfolio',
    tagline: 'Software Systems • Web Platforms • Digital Transformation',
    availability: 'CEO at AashaTech',
    availabilityHref: 'https://aashatech.com/',
  },
  heroCopy: {
    eyebrow: 'Digital Systems & Software Portfolio',
    roleLine: 'Software Systems • Web Platforms • Digital Transformation',
    ctaPrimaryHref: '#work',
    ctaSecondaryHref: '#contact',
  },
  aboutCopy: {
    index: '01',
    eyebrow: 'About Mukesh',
    highlights: ['Practical software delivery', 'Clear digital presentation', 'Systems that support daily work'],
    resumeHref: '#contact',
    meta: [{ label: 'Based in', value: 'Kathmandu, Nepal' }, { label: 'Focus', value: 'Useful digital systems' }, { label: 'Delivery', value: 'Web, software, workflows' }],
  },
  contactCopy: {
    index: '06',
    eyebrow: 'Contact',
    heading: 'Let’s make the next workflow clearer.',
    blurb: 'Share the problem, the people involved, and the outcome you need. We can shape the right digital solution from there.',
    studioFacts: [],
    workPrompts: [],
  },
  uiCopy: {
    navigation: { menuKicker: 'NAVIGATION / OPEN CHANNEL', menuDescription: 'Move through the work, the tools, and the thinking behind the systems.', sectionLinks: [{ label: 'About', href: '/#about' }, { label: 'Field Files', href: '/#work' }, { label: 'Skills', href: '/#skills' }, { label: 'History', href: '/#experience' }, { label: 'Contact', href: '/#contact' }], pageLinks: [{ label: 'Articles', href: '/articles' }, { label: 'Contact', href: '/contact' }] },
    projects: { index: '02', eyebrow: 'Work index', heading: 'Systems built for the work behind the work.', viewLabel: 'View', gridLabel: 'Grid', focusLabel: 'Focus', discussLabel: 'Discuss this system', openLabel: 'Open file', footerPrimary: 'systems / one working method', footerSecondary: 'From public records to everyday operations →' },
    skills: { index: '03', eyebrow: 'System Inventory', heading: 'What I can help you with.', readyLabel: 'Inventory ready', categoriesLabel: 'Categories', toolsLabel: 'Tools in rotation', statusLabel: 'Status', statusValue: 'live / production', practiceLabel: 'Practice live', toolboxLabel: 'Toolbox', toolboxCountLabel: 'tools in rotation' },
    experience: { index: '04', eyebrow: 'Operational History', heading: 'A timeline of the work that shaped me.', filedLabel: 'Filed under', entriesLabel: 'Entries', statusLabel: 'Status', statusValue: 'Live / compiling', footnote: 'Each entry is a chapter of the same practice — software, systems, and the people they serve. The dossier stays open.' },
    testimonials: { index: '05', eyebrow: 'Verified Reports', heading: 'What people say about working with me.', filedLabel: 'Filed under', transmissionsLabel: 'Transmissions', channelLabel: 'Channel', channelValue: 'Open / verified', footnote: 'Every report is paraphrased with the client’s permission. Names are kept where their organization allows; titles are kept where they help the story.' },
    contact: { terminalLabel: 'TRANSMISSION TERMINAL', statusValue: 'READY · STANDING BY', body: 'Inbound channels are open. Pick the one that fits the work — short briefs, ongoing partnerships, or a quick call to sense whether we should build together.', bodyMeta: 'Long-form briefs welcome. Short intros welcome. So are second opinions.', emailAction: 'Start an email', phoneAction: 'Call directly', footerLabel: 'Channel ready', wiresLabel: 'WIRES · outbound' },
    footer: { brandEyebrow: 'Colophon', statusValue: 'Studio live', compilerLabel: 'Compiler', navigationTitle: 'Navigation', servicesTitle: 'Services', studioTitle: 'Studio', wiresLabel: 'Wires · outbound', topLabel: 'Back to top' },
  },
  contact: {
    contact: {
      index: '06',
      eyebrow: 'Contact',
      heading: 'Let’s make the next workflow clearer.',
      blurb: 'Share the problem, the people involved, and the outcome you need. We can shape the right digital solution from there.',
      studioFacts: [],
      workPrompts: [],
    },
  },
  services: {
    items: [
      { id: '1', slug: 'website-development', name: 'Website Development', shortName: 'Websites', title: 'Website Development', description: 'Professional, responsive websites and web platforms for organizations that need clear digital presentation.', intro: 'Professional, responsive websites and web platforms for organizations that need clear digital presentation.', outcomes: [], process: [], faqs: [], isPublished: true, orderIndex: 0 },
      { id: '2', slug: 'custom-software-systems', name: 'Custom Software Systems', shortName: 'Software', title: 'Custom Software Systems', description: 'Practical systems, dashboards, admin panels, and databases built around real organizational workflows.', intro: 'Practical systems, dashboards, admin panels, and databases built around real organizational workflows.', outcomes: [], process: [], faqs: [], isPublished: true, orderIndex: 1 },
      { id: '3', slug: 'workflow-automation', name: 'Workflow Automation', shortName: 'Automation', title: 'Workflow Automation', description: 'Digital workflows, records, alerts, reports, and role-based processes that reduce repetitive work.', intro: 'Digital workflows, records, alerts, reports, and role-based processes that reduce repetitive work.', outcomes: [], process: [], faqs: [], isPublished: true, orderIndex: 2 },
    ],
  },
}

const visibleSections = {
  hero: true, about: true, achievements: true, portfolio: true, vision: true,
  initiatives: true, entrepreneurship: true, youth: true, testimonials: true,
  gallery: true, news: true, stats: true, contact: true,
}

const settings = {
  site_title: 'Mukesh Khadka | Digital Systems & Software Portfolio',
  meta_description: 'Digital portfolio of Mukesh Khadka — practical software systems, web platforms, automation, UX thinking, and digital transformation work.',
  phone: '+977 985-1241656',
  email: 'khadkamukesh423@gmail.com',
  address: 'Kathmandu, Bagmati Province, Nepal',
  linkedin_url: 'https://www.linkedin.com/in/mukesh-khadka-960401324/',
  facebook_url: 'https://www.facebook.com/Nepali.man.67',
  instagram_url: 'https://www.instagram.com/khadka3546?utm_source=qr',
  youtube_url: '',
  twitter_url: 'https://x.com/khadkamukesh422?s=11',
  tiktok_url: '',
  logo_url: `visible_sections:${JSON.stringify(visibleSections)}`,
}

const client = new Client({
  host: 'aws-0-ap-southeast-1.pooler.supabase.com',
  port: 6543,
  user: `postgres.${projectRef}`,
  password: env.SUPABASE_DB_PASSWORD,
  database: 'postgres',
  ssl: { rejectUnauthorized: false },
})

const query = (sql, values = []) => client.query(sql, values)
const insertRows = async (table, columns, rows) => {
  for (const row of rows) {
    const values = columns.map((column) => row[column])
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ')
    await query(`INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`, values)
  }
}
const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

async function main() {
  await client.connect()
  try {
    await query('BEGIN')
    for (const table of ['hero_content', 'about_content', 'vision_cards', 'initiatives', 'achievements', 'testimonials', 'gallery_photos', 'news_posts', 'site_stats']) {
      await query(`DELETE FROM ${table}`)
    }

    await insertRows('hero_content', ['label', 'headline', 'subheadline', 'bio', 'cta_primary_text', 'cta_secondary_text', 'hero_image_url', 'stat_projects', 'stat_lives', 'stat_years', 'stat_youth'], [{
      label: original.heroData.label,
      headline: original.heroData.headline,
      subheadline: original.heroData.subheadline,
      bio: original.heroData.bio,
      cta_primary_text: original.heroData.cta_primary,
      cta_secondary_text: original.heroData.cta_secondary,
      hero_image_url: '/mk-removebg-preview.webp',
      stat_projects: 33,
      stat_lives: 26,
      stat_years: 7,
      stat_youth: 10,
    }])
    await insertRows('about_content', ['pill_text', 'heading', 'bio_paragraph_1', 'bio_paragraph_2', 'bio_paragraph_3', 'community_trust', 'youth_engagement', 'photo_url'], [{
      pill_text: original.aboutData.pill,
      heading: original.aboutData.heading,
      bio_paragraph_1: original.aboutData.paragraphs[0],
      bio_paragraph_2: original.aboutData.paragraphs[1],
      bio_paragraph_3: original.aboutData.paragraphs[2],
      community_trust: original.aboutData.community_trust,
      youth_engagement: original.aboutData.youth_engagement,
      photo_url: '/cultural/mukesh-about-cutout.png',
    }])
    await insertRows('vision_cards', ['icon', 'heading', 'description', 'order_index'], original.visionCards.map((row, index) => ({ ...row, order_index: index })))
    await insertRows('initiatives', ['photo_url', 'category', 'title', 'description', 'impact', 'is_published', 'order_index'], original.initiativesData.map((row, index) => ({ photo_url: row.photo, category: row.category, title: row.title, description: row.description, impact: row.impact, is_published: true, order_index: index })))
    await insertRows('achievements', ['year', 'title', 'description', 'icon', 'order_index'], original.achievementsData.map((row, index) => ({ ...row, order_index: index })))
    await insertRows('testimonials', ['photo_url', 'name', 'role', 'quote', 'rating', 'order_index'], original.testimonialsData.map((row, index) => ({ photo_url: row.photo, name: row.name, role: row.role, quote: row.quote, rating: row.rating, order_index: index })))
    await insertRows('gallery_photos', ['url', 'caption', 'category', 'order_index'], original.galleryData.map((row, index) => ({ ...row, order_index: index })))
    await insertRows('site_stats', ['label', 'value', 'suffix', 'icon', 'order_index'], original.statsData.map((row, index) => ({ ...row, order_index: index })))
    await insertRows('news_posts', ['slug', 'cover_url', 'category', 'title', 'excerpt', 'content', 'is_published', 'published_at', 'read_minutes', 'tags'], originalArticles.map((row) => ({ slug: row.slug, cover_url: row.image, category: row.category, title: row.title, excerpt: row.excerpt, content: row.body, is_published: true, published_at: `${row.date}T00:00:00.000Z`, read_minutes: row.readMinutes, tags: JSON.stringify(row.tags) })))

    const existingSettings = await query("SELECT id FROM site_settings WHERE site_title NOT LIKE '__cms__%' ORDER BY updated_at DESC NULLS LAST LIMIT 1")
    const settingValues = [settings.site_title, settings.meta_description, settings.phone, settings.email, settings.address, settings.linkedin_url, settings.facebook_url, settings.instagram_url, settings.youtube_url, settings.twitter_url, settings.tiktok_url, settings.logo_url]
    if (existingSettings.rows[0]) {
      await query('UPDATE site_settings SET site_title=$1, meta_description=$2, phone=$3, email=$4, address=$5, linkedin_url=$6, facebook_url=$7, instagram_url=$8, youtube_url=$9, twitter_url=$10, tiktok_url=$11, logo_url=$12, updated_at=NOW() WHERE id=$13', [...settingValues, existingSettings.rows[0].id])
    } else {
      await query('INSERT INTO site_settings (site_title, meta_description, phone, email, address, linkedin_url, facebook_url, instagram_url, youtube_url, twitter_url, tiktok_url, logo_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)', settingValues)
    }
    for (const [key, data] of Object.entries({ entrepreneurship, youth })) {
      await query('DELETE FROM site_settings WHERE site_title = $1', [`__cms__${key}`])
      await query('INSERT INTO site_settings (site_title, meta_description, updated_at) VALUES ($1, $2, NOW())', [`__cms__${key}`, JSON.stringify(data)])
    }
    for (const [pageKey, data] of Object.entries(pages)) {
      await query('INSERT INTO site_pages (page_key, data, updated_at) VALUES ($1, $2::jsonb, NOW()) ON CONFLICT (page_key) DO UPDATE SET data=EXCLUDED.data, updated_at=NOW()', [pageKey, JSON.stringify(data)])
    }
    await query('COMMIT')

    const counts = {}
    for (const table of ['hero_content', 'about_content', 'vision_cards', 'initiatives', 'achievements', 'testimonials', 'gallery_photos', 'news_posts', 'site_stats', 'site_pages']) {
      counts[table] = (await query(`SELECT COUNT(*)::int AS count FROM ${table}`)).rows[0].count
    }
    const hero = (await query('SELECT headline, subheadline FROM hero_content LIMIT 1')).rows[0]
    const visions = (await query('SELECT heading FROM vision_cards ORDER BY order_index')).rows.map((row) => row.heading)
    const articles = (await query('SELECT title FROM news_posts ORDER BY published_at DESC')).rows.map((row) => row.title)
    console.log(JSON.stringify({ counts, hero, visions, articles }, null, 2))
  } catch (error) {
    await query('ROLLBACK').catch(() => undefined)
    throw error
  } finally {
    await client.end()
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
