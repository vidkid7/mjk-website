import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LiquidBackdrop } from '@/components/ui/LiquidBackdrop'
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
    <main className="liquid-page relative min-h-screen text-slate-900">
      <LiquidBackdrop variant="public" />
      <div className="relative z-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <header className="sticky top-0 z-20 px-5 pt-4 sm:px-8"><div className="glass-panel mx-auto flex max-w-5xl items-center justify-between rounded-2xl px-5 py-4 sm:px-6"><a href="/blog" className="text-sm font-bold text-slate-600 transition hover:text-crimson">← All insights</a><a href="/#contact" className="text-sm font-bold text-crimson transition hover:text-deep-crimson">Start a project</a></div></header>
        <article className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="glass-panel rounded-[2rem] p-7 sm:p-10"><nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500"><a href="/" className="hover:text-crimson">Home</a> <span aria-hidden="true">/</span> <a href="/blog" className="hover:text-crimson">Blog</a> <span aria-hidden="true">/</span> <span>{post.category}</span></nav>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-crimson">{post.category} · <time dateTime={post.date}>{new Date(`${post.date}T00:00:00Z`).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</time></p>
          <h1 className="mt-5 font-playfair text-4xl font-extrabold leading-tight tracking-tight text-[#071a35] sm:text-6xl">{post.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{post.excerpt}</p></div>
          <div className="glass-panel mt-10 rounded-[2rem] p-2 shadow-xl shadow-[#071a35]/10"><img src={post.cover} alt="" className="aspect-[16/8] w-full rounded-[1.6rem] object-cover" /></div>
          <section className="glass-inset mt-12 rounded-[2rem] border-gold/40 p-7 sm:p-9" aria-labelledby="takeaways-title">
            <h2 id="takeaways-title" className="font-playfair text-2xl font-bold text-[#071a35]">Key takeaways</h2>
            <ul className="mt-5 space-y-3 text-slate-700">{post.takeaways.map((takeaway) => <li key={takeaway} className="flex gap-3"><span aria-hidden="true" className="font-bold text-crimson">✓</span>{takeaway}</li>)}</ul>
          </section>
          <div className="glass-panel mt-12 space-y-12 rounded-[2rem] p-7 sm:p-10">
            {post.sections.map((section) => <section key={section.heading}><h2 className="font-playfair text-3xl font-bold text-[#071a35]">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5 text-base leading-8 text-slate-700">{paragraph}</p>)}</section>)}
          </div>
          <aside className="admin-card mt-14 rounded-[2rem] p-8 text-white sm:p-10" aria-label="Project enquiry"><h2 className="font-playfair text-2xl font-bold">Planning a digital system?</h2><p className="mt-3 max-w-2xl leading-7 text-slate-300">Mukesh Khadka works with organizations that need practical websites, software systems, workflow automation, and clear digital experiences.</p><a href="/#contact" className="glass-action mt-6 inline-flex rounded-full px-5 py-3 text-sm font-bold text-[#071a35] transition hover:text-crimson">Discuss your project</a></aside>
        </article>
      </div>
    </main>
  )
}
