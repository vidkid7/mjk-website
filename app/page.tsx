import type { ReactNode } from 'react'
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Cloud,
  Code2,
  FileText,
  Layers3,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  MonitorSmartphone,
  Palette,
  Phone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow,
} from 'lucide-react'

type IconType = typeof ArrowRight

type Service = {
  title: string
  description: string
  icon: IconType
  points: string[]
}

type Project = {
  title: string
  category: string
  description: string
  outcome: string
  tech: string[]
}

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const stats = [
  { value: '26+', label: 'organizations served' },
  { value: '33+', label: 'projects delivered' },
  { value: '7+', label: 'years of delivery' },
  { value: '10+', label: 'team members' },
]

const services: Service[] = [
  {
    title: 'Custom Software Development',
    description: 'Purpose-built systems designed around the exact process, permissions, reports, and workflows your organization needs.',
    icon: Code2,
    points: ['Process mapping', 'Role-based workflows', 'Dashboards & reporting'],
  },
  {
    title: 'Web Development',
    description: 'Fast, secure, responsive websites and web applications covering front end, back end, databases, UX, and performance.',
    icon: MonitorSmartphone,
    points: ['Corporate websites', 'Web apps', 'Admin panels'],
  },
  {
    title: 'Mobile App Development',
    description: 'Native, cross-platform, hybrid, and PWA solutions with API integration, release support, and scalable architecture.',
    icon: Smartphone,
    points: ['Android & iOS', 'PWA builds', 'Backend integration'],
  },
  {
    title: 'UI/UX Design',
    description: 'Clean, intuitive digital product design for websites, apps, and operational systems that need high adoption.',
    icon: Palette,
    points: ['User flows', 'Design systems', 'Interface prototypes'],
  },
  {
    title: 'AI Automation & Cloud Delivery',
    description: 'Workflow automation, cloud-ready delivery, and infrastructure planning to reduce manual work and improve reliability.',
    icon: Cloud,
    points: ['Automation flows', 'Secure hosting', 'Scalable deployment'],
  },
  {
    title: 'Digital Growth & Branding',
    description: 'Measured digital marketing, graphic design, campaign visuals, and brand assets for stronger visibility and conversion.',
    icon: BarChart3,
    points: ['Digital campaigns', 'Brand graphics', 'Content systems'],
  },
]

const products = [
  {
    label: 'Governance System',
    title: 'Centralized Digital Sifaris & Darta Chalani',
    description: 'A local-government platform for digital recommendation letters, Darta, Chalani, certificates, ID cards, records, audit logs, and centralized deployment.',
    features: ['Digital Sifaris & certificates', 'Darta/Chalani records', 'Role-based access', 'Multi-municipality support'],
    icon: FileText,
  },
  {
    label: 'Planning System',
    title: 'Digital Planning System',
    description: 'A structured planning and task-management product for local government goals, deadlines, collaboration, reporting, and calendar-based follow-up.',
    features: ['Task & goal management', 'Analytics and reports', 'Team collaboration', 'Calendar integration'],
    icon: Workflow,
  },
]

const projects: Project[] = [
  {
    title: 'National Archive Searchable Database System',
    category: 'Public Digital Records',
    description: 'A searchable digital database for Nepal\'s National Archive, helping employees, researchers, and the public locate historical documents and government records through a cleaner interface.',
    outcome: 'Improved record discovery and public access to archived information.',
    tech: ['Search UX', 'Database', 'Web App', 'Public Portal'],
  },
  {
    title: 'Agriculture Survey Management System',
    category: 'Data Collection & Reporting',
    description: 'A centralized platform for survey design, field data collection, data management, analysis, visualization, and structured reporting.',
    outcome: 'Reduced manual survey handling and improved decision-ready agriculture data.',
    tech: ['Forms', 'Analytics', 'Dashboards', 'Reports'],
  },
  {
    title: 'Billing Software',
    category: 'Finance Operations',
    description: 'Billing and invoicing software for invoices, payments, customer records, tax handling, financial reports, and multi-currency transactions.',
    outcome: 'Faster billing workflows with cleaner finance visibility.',
    tech: ['Invoicing', 'Payments', 'Tax', 'Reports'],
  },
  {
    title: 'School Management System',
    category: 'Education Operations',
    description: 'A school operations platform for administrative tasks, student records, communication, and management workflows.',
    outcome: 'Centralized school administration and easier record management.',
    tech: ['Student Records', 'Admin Panel', 'Communication', 'Reports'],
  },
  {
    title: 'File Management System',
    category: 'Digital Operations',
    description: 'A digital file organization system covering search, backup, sharing, version control, compression, and document workflow support.',
    outcome: 'Better document traceability, access, and operational control.',
    tech: ['Document Search', 'Backup', 'Versioning', 'Sharing'],
  },
  {
    title: 'Inventory & POS System',
    category: 'Retail & Business Systems',
    description: 'Inventory and point-of-sale software for stock, sales, customers, payments, reports, and mobile-friendly daily operations.',
    outcome: 'More accurate stock control and faster sales reporting.',
    tech: ['POS', 'Inventory', 'Customers', 'Mobile Ops'],
  },
]

const clients = [
  'Malangwa Municipality',
  'Umakunda Rural Municipality',
  'Ishwor Municipality',
  'Home Ministry',
  'Pokhara University',
  'Khanikhola Rural Municipality',
  'Vehicle Fitness Test Center',
  'KTM Nepal Logistics',
]

const process = [
  ['Discover', 'Understand users, data flow, bottlenecks, and real business outcomes before proposing features.'],
  ['Design', 'Translate workflows into user journeys, clear interfaces, and practical system architecture.'],
  ['Build', 'Develop reliable software with scalable front end, back end, database, and integrations.'],
  ['Deploy & improve', 'Support launch, training, iteration, and future enhancement so the system keeps delivering value.'],
]

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
      <Sparkles className="h-4 w-4" />
      {children}
    </span>
  )
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">{description}</p>
    </div>
  )
}

function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-emerald-700">
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
    </a>
  )
}

function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-700">
      {children}
    </a>
  )
}

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen overflow-hidden bg-[#f8faf7] text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/70 bg-white/85 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <a href="#main-content" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white shadow-lg shadow-slate-950/15">AT</span>
            <span className="leading-tight">
              <span className="block text-base font-black tracking-tight text-slate-950">AashaTech</span>
              <span className="block text-xs font-medium text-slate-500">Digital systems partner</span>
            </span>
          </a>
          <div className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-2 shadow-sm md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700">{item.label}</a>
            ))}
          </div>
          <a href="mailto:info.aashatech@gmail.com?subject=Project%20Inquiry" className="hidden rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700 sm:inline-flex">Start a Project</a>
        </nav>
        <div className="flex gap-2 overflow-x-auto border-t border-slate-100 bg-white/95 px-4 py-2 md:hidden">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="shrink-0 rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600">{item.label}</a>
          ))}
        </div>
      </header>

      <section className="relative overflow-hidden px-4 pt-36 sm:px-6 lg:px-8 lg:pt-40">
        <div className="absolute left-1/2 top-0 -z-10 h-[560px] w-[920px] -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-200/70 via-sky-200/60 to-white blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionLabel>Nepal's Technology Partner</SectionLabel>
            <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[1.02] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">We build digital systems that transform how organizations work.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">AashaTech is a Kathmandu-based software company delivering custom software, web applications, mobile apps, government-focused digital systems, and growth-ready technology solutions.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href="#contact">Start a Project</PrimaryButton>
              <SecondaryButton href="#projects">View completed work</SecondaryButton>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-white bg-white/80 p-4 shadow-sm backdrop-blur">
                  <dt className="text-2xl font-black text-slate-950">{stat.value}</dt>
                  <dd className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-emerald-500/20 via-sky-500/10 to-amber-400/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white bg-slate-950 p-4 shadow-2xl shadow-slate-950/25">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
                  <div><p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-300">Delivery cockpit</p><p className="mt-1 text-xl font-black text-white">Software portfolio</p></div>
                  <div className="flex gap-2"><span className="h-3 w-3 rounded-full bg-red-400" /><span className="h-3 w-3 rounded-full bg-amber-400" /><span className="h-3 w-3 rounded-full bg-emerald-400" /></div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ['Digital Sifaris', 'GovTech', '92%'],
                    ['Survey Platform', 'Analytics', 'Live'],
                    ['Billing System', 'Finance', 'Ready'],
                    ['Inventory POS', 'Retail', 'Synced'],
                  ].map(([name, type, status]) => (
                    <div key={name} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                      <div className="mb-8 flex items-center justify-between"><span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-200">{type}</span><span className="text-xs font-bold text-white/60">{status}</span></div>
                      <p className="text-lg font-black text-white">{name}</p>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full w-4/5 rounded-full bg-gradient-to-r from-emerald-300 to-sky-300" /></div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4">
                  <div className="flex items-start gap-3"><ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-300" /><p className="text-sm leading-6 text-white/65"><strong className="text-white">Built for serious operations.</strong> Role-based access, audit trails, reports, dashboards, deployment support, and systems that teams can actually use.</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8" aria-label="Client trust strip">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white py-5 shadow-sm">
          <div className="flex min-w-max animate-marquee items-center gap-10 px-6 text-sm font-bold uppercase tracking-[0.24em] text-slate-400">
            {[...clients, ...clients].map((client, index) => <span key={`${client}-${index}`} className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-emerald-500" />{client}</span>)}
          </div>
        </div>
      </section>

      <section id="services" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Services" title="End-to-end digital delivery for modern organizations." description="From strategy and interface design to engineering, deployment, automation, and growth, AashaTech helps organizations replace manual work with reliable digital systems." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <article key={service.title} className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-900/10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white"><Icon className="h-7 w-7" /></div>
                  <h3 className="mt-6 text-xl font-black text-slate-950">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
                  <ul className="mt-6 space-y-3">
                    {service.points.map((point) => <li key={point} className="flex items-center gap-3 text-sm font-semibold text-slate-700"><CheckCircle2 className="h-4 w-4 text-emerald-600" />{point}</li>)}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="products" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Products" title="Software products built for Nepal's operational realities." description="AashaTech also develops ready-to-customize digital systems for government digitization, planning, records, and workflow automation." />
          <div className="grid gap-6 lg:grid-cols-2">
            {products.map((product) => {
              const Icon = product.icon
              return (
                <article key={product.title} className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-2xl shadow-slate-950/15">
                  <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
                  <div className="relative">
                    <div className="mb-8 flex items-center justify-between gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-emerald-300"><Icon className="h-7 w-7" /></div><span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white/70">{product.label}</span></div>
                    <h3 className="text-2xl font-black tracking-tight sm:text-3xl">{product.title}</h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">{product.description}</p>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">{product.features.map((feature) => <div key={feature} className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white/85">{feature}</div>)}</div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div><SectionLabel>How we work</SectionLabel><h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">Clear process, practical delivery, measurable outcomes.</h2><p className="mt-5 text-lg leading-8 text-slate-600">Good software is not only code. It is the result of understanding operations, simplifying decisions, designing clean workflows, and supporting real adoption after launch.</p></div>
          <div className="grid gap-4 sm:grid-cols-2">{process.map(([title, description], index) => <div key={title} className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm"><span className="text-sm font-black text-emerald-600">0{index + 1}</span><h3 className="mt-4 text-xl font-black text-slate-950">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{description}</p></div>)}</div>
        </div>
      </section>

      <section id="projects" className="bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl"><span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-200"><Layers3 className="h-4 w-4" /> Featured Projects</span><h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">Completed work across government, education, finance, records, and operations.</h2><p className="mt-5 text-lg leading-8 text-white/65">Each project is rewritten from the available AashaTech portfolio information with a focus on problem, system type, technology area, and practical outcome.</p></div>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-100">Plan your system <ArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project.title} className="group flex min-h-[360px] flex-col rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 transition hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-white/[0.09]">
                <span className="mb-5 inline-flex w-fit rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">{project.category}</span>
                <h3 className="text-xl font-black leading-tight text-white">{project.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/65">{project.description}</p>
                <div className="mt-auto pt-6"><div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4"><p className="text-sm font-semibold leading-6 text-emerald-50">{project.outcome}</p></div><div className="mt-4 flex flex-wrap gap-2">{project.tech.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-white/60">{tag}</span>)}</div></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div><SectionLabel>About AashaTech</SectionLabel><h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">Aasha means hope. The mission is Digital Nepal.</h2><div className="mt-6 space-y-5 text-base leading-8 text-slate-600 sm:text-lg"><p>AashaTech started with the idea of giving something back to society through technology. The company builds digital systems that help organizations serve people faster, manage information better, and move away from manual processes.</p><p>From Kathmandu, the team works with government bodies, schools, businesses, and local organizations to deliver software that is practical, maintainable, and built around real working conditions.</p></div><div className="mt-8 grid gap-3 sm:grid-cols-3">{['Quality Service', 'Client Focused', 'On-Time Delivery'].map((value) => <div key={value} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-black text-slate-800 shadow-sm">{value}</div>)}</div></div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/10"><div className="rounded-[1.5rem] bg-gradient-to-br from-slate-950 to-emerald-950 p-6 text-white"><div className="mb-8 flex items-center gap-3"><Lightbulb className="h-8 w-8 text-emerald-300" /><div><p className="text-sm font-bold text-white/60">Positioning</p><p className="font-black">Digital transformation partner</p></div></div><div className="space-y-4">{['Government-focused systems with auditability and role-based access.', 'Business software for billing, inventory, records, reporting, and daily operations.', 'Design and development capability across UI/UX, web, mobile, cloud, and automation.'].map((item) => <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" /><p className="text-sm leading-6 text-white/75">{item}</p></div>)}</div></div></div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Trust Signals" title="Trusted by public bodies, schools, and businesses across Nepal." description="The redesigned site surfaces recognizable organizations, client feedback, and project proof so visitors can quickly understand capability and credibility." />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{clients.map((client) => <div key={client} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-black text-slate-800">{client}</div>)}</div>
          <blockquote className="mx-auto mt-10 max-w-4xl rounded-[2rem] border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm"><p className="text-xl font-semibold leading-9 text-slate-800">“The software has helped us become more efficient and organized in managing scholarship applications. It is user-friendly, easy to use, and the functionality is great.”</p><footer className="mt-5 text-sm font-black uppercase tracking-[0.2em] text-emerald-700">Client feedback</footer></blockquote>
        </div>
      </section>

      <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl shadow-slate-950/20">
          <div className="grid gap-0 lg:grid-cols-[1fr_0.82fr]">
            <div className="p-8 sm:p-10 lg:p-14"><span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-200"><MessageCircle className="h-4 w-4" /> Let's discuss your idea</span><h2 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">Ready to transform your organization with technology?</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">Tell AashaTech about your project and the team will connect you with the right specialist. No sales pitch — just a practical conversation about how technology can help.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="mailto:info.aashatech@gmail.com?subject=Project%20Inquiry" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-100">Send project inquiry <ArrowRight className="h-4 w-4" /></a><SecondaryButton href="tel:+9774596538">Call now</SecondaryButton></div></div>
            <div className="border-t border-white/10 bg-white/[0.06] p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-14"><h3 className="text-2xl font-black">Contact details</h3><div className="mt-8 space-y-5">{[{ icon: MapPin, label: 'Office', value: 'Sinamangal, Kathmandu' }, { icon: Phone, label: 'Phone', value: '+977 4596538 / 9851241656' }, { icon: Mail, label: 'Email', value: 'info.aashatech@gmail.com' }].map((item) => { const Icon = item.icon; return <div key={item.label} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4"><Icon className="mt-1 h-5 w-5 shrink-0 text-emerald-300" /><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">{item.label}</p><p className="mt-1 font-semibold text-white/85">{item.value}</p></div></div> })}</div><div className="mt-6 rounded-2xl bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-50">Free consultation · Reply within 24h · No obligation</div></div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between"><div><p className="text-lg font-black text-slate-950">AashaTech</p><p className="mt-1 text-sm text-slate-500">Software, web, mobile, and digital systems development from Kathmandu, Nepal.</p></div><div className="flex flex-wrap gap-3 text-sm font-semibold text-slate-500">{navItems.map((item) => <a key={item.href} href={item.href} className="transition hover:text-emerald-700">{item.label}</a>)}</div></div>
      </footer>
    </main>
  )
}
