import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { blogPosts, getBlogPost } from '@/lib/blog-posts'

const siteUrl = 'https://khadkamukesh.com.np'

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPost(params.slug)
  if (!post) return {}

  const url = `${siteUrl}/blog/${post.slug}`
  return {
    title: `${post.title} | Mukesh Khadka`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: ['Mukesh Khadka'],
      images: [{ url: post.cover, alt: post.title }],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description, images: [post.cover] },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)
  if (!post) notFound()

  const url = `${siteUrl}/blog/${post.slug}`
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        mainEntityOfPage: url,
        headline: post.title,
        description: post.description,
        image: post.cover,
        datePublished: post.date,
        dateModified: post.date,
        articleSection: post.category,
        inLanguage: 'en',
        author: { '@id': `${siteUrl}/#mukesh-khadka` },
        publisher: { '@id': `${siteUrl}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="/blog" className="text-sm font-bold text-slate-600 transition hover:text-emerald-700">← All insights</a>
          <a href="/#contact" className="text-sm font-bold text-emerald-700 transition hover:text-emerald-900">Start a project</a>
        </div>
      </header>
      <article className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500"><a href="/" className="hover:text-emerald-700">Home</a> <span aria-hidden="true">/</span> <a href="/blog" className="hover:text-emerald-700">Blog</a> <span aria-hidden="true">/</span> <span>{post.category}</span></nav>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">{post.category} · <time dateTime={post.date}>{new Date(`${post.date}T00:00:00Z`).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</time></p>
        <h1 className="mt-5 font-playfair text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-6xl">{post.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{post.excerpt}</p>
        <img src={post.cover} alt="" className="mt-10 aspect-[16/8] w-full rounded-[2rem] object-cover shadow-xl shadow-slate-900/10" />
        <section className="mt-12 rounded-[2rem] border border-emerald-100 bg-emerald-50/60 p-7 sm:p-9" aria-labelledby="takeaways-title">
          <h2 id="takeaways-title" className="font-playfair text-2xl font-bold text-emerald-950">Key takeaways</h2>
          <ul className="mt-5 space-y-3 text-slate-700">{post.takeaways.map((takeaway) => <li key={takeaway} className="flex gap-3"><span aria-hidden="true" className="font-bold text-emerald-700">✓</span>{takeaway}</li>)}</ul>
        </section>
        <div className="mt-12 space-y-12">
          {post.sections.map((section) => <section key={section.heading}><h2 className="font-playfair text-3xl font-bold text-slate-950">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5 text-base leading-8 text-slate-700">{paragraph}</p>)}</section>)}
        </div>
        <aside className="mt-14 rounded-[2rem] bg-slate-950 p-8 text-white sm:p-10" aria-label="Project enquiry"><h2 className="font-playfair text-2xl font-bold">Planning a digital system?</h2><p className="mt-3 max-w-2xl leading-7 text-slate-300">Mukesh Khadka works with organizations that need practical websites, software systems, workflow automation, and clear digital experiences.</p><a href="/#contact" className="mt-6 inline-flex rounded-full bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-400">Discuss your project</a></aside>
      </article>
    </main>
  )
}
