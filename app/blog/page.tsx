'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Sparkles } from 'lucide-react'
import { LiquidBackdrop } from '@/components/ui/LiquidBackdrop'
import { blogPosts } from '@/lib/blog-posts'
import { useStoredData } from '@/lib/storage'

const defaultPosts = blogPosts.map(post => ({ ...post, id: post.slug, is_published: true, content: post.sections.flatMap(section => section.paragraphs).join('\n\n') }))
const legacyBlogTerms = ['campaign', 'community update', 'vision 2030', 'youth coding', 'clean bagmati', 'mukesh jung khadka launches', 'supporters', 'ward']
function hasLegacyBlog(posts: typeof defaultPosts) {
  return posts.some(post => legacyBlogTerms.some(term => `${post.category} ${post.title} ${post.excerpt} ${post.content}`.toLowerCase().includes(term)))
}

export default function BlogPage() {
  const storedPosts = useStoredData('news', defaultPosts)
  const posts = (hasLegacyBlog(storedPosts) ? defaultPosts : storedPosts).filter(post => post.is_published)
  const blogStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://khadkamukesh.com.np/blog#webpage',
        url: 'https://khadkamukesh.com.np/blog',
        name: 'Digital Insights, Project Notes & Software Thinking',
        isPartOf: { '@id': 'https://khadkamukesh.com.np/#website' },
        about: ['Software systems', 'Website development', 'Business automation', 'UX design'],
        inLanguage: 'en',
      },
      {
        '@type': 'ItemList',
        itemListElement: posts.map((post, index) => ({
          '@type': 'ListItem',
          position: index + 1,
            url: `https://khadkamukesh.com.np/blog/${post.slug || post.id}`,
          item: {
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            dateModified: post.date,
            author: { '@type': 'Person', name: 'Mukesh Khadka', url: 'https://khadkamukesh.com.np' },
            image: post.cover,
            articleSection: post.category,
            mainEntityOfPage: `https://khadkamukesh.com.np/blog/${post.slug || post.id}`,
          },
        })),
      },
    ],
  }

  return (
    <main className="liquid-page public-editorial-light relative min-h-screen text-slate-900">
      <LiquidBackdrop variant="public" />
      <div className="relative z-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }} />
        <header className="sticky top-0 z-20 px-5 pt-4 sm:px-8">
          <div className="glass-panel mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-4 sm:px-6">
            <a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-crimson"><ArrowLeft size={16} /> Home</a>
            <a href="/#contact" className="admin-card rounded-full px-5 py-2.5 text-sm font-bold text-white transition hover:border-gold/70">Discuss a project</a>
          </div>
        </header>

        <section className="px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex items-center gap-4 border-t border-[#12375f]/15 pt-5 text-[11px] font-black uppercase tracking-[0.28em] text-[#12375f]/60">
              <span className="text-crimson">02</span>
              <span>Field notes</span>
              <span aria-hidden="true" className="h-px flex-1 bg-[#12375f]/15" />
              <span className="hidden tracking-[0.18em] sm:inline">Ideas for useful systems</span>
            </div>
            <div className="glass-panel mx-auto mb-14 max-w-3xl rounded-[1.5rem] p-7 text-center sm:p-10">
              <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-inset mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-crimson"><Sparkles size={14} />Blog Posts</motion.span>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="font-playfair text-4xl font-extrabold leading-tight tracking-tight text-[#071a35] sm:text-6xl">Digital insights, project notes, and software thinking</motion.h1>
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="mt-5 text-base leading-8 text-slate-600 md:text-lg">Practical explanations of software systems, user experience, websites, automation, and the decisions that make digital projects easier to run.</motion.p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => {
                const paragraphs = (post.content || post.excerpt).split(/\n\s*\n/).filter(Boolean)
                return (
                  <motion.article id={post.id} key={post.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.06 }} className="glass-panel overflow-hidden rounded-[1.5rem] transition hover:-translate-y-1 hover:border-gold/70 hover:shadow-2xl hover:shadow-[#071a35]/15">
                    <div className="h-56 overflow-hidden bg-slate-100"><img src={post.cover} alt={post.title} loading="lazy" decoding="async" className="h-full w-full object-cover" /></div>
                    <div className="p-6"><div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500"><span className="glass-inset rounded-full px-3 py-1 text-crimson">{post.category}</span><span className="glass-inset inline-flex items-center gap-1 rounded-full px-3 py-1"><Calendar size={13} /> {post.date}</span></div><h2 className="font-playfair text-2xl font-bold leading-tight text-[#071a35]"><a href={`/blog/${post.slug || post.id}`} className="transition hover:text-crimson">{post.title}</a></h2><p className="mt-4 text-sm leading-7 text-slate-600">{post.excerpt}</p>{paragraphs.length > 1 && (<div className="mt-5 border-t border-white/60 pt-5 text-sm leading-7 text-slate-500">{paragraphs.slice(0, 2).map((paragraph, i) => <p key={i} className="mb-3">{paragraph}</p>)}</div>)}<a href={`/blog/${post.slug || post.id}`} className="mt-5 inline-flex text-sm font-bold text-crimson transition hover:text-deep-crimson">Read the full insight →</a></div>
                  </motion.article>
                )
              })}
            </div>

            {!posts.length && <div className="glass-panel rounded-[2rem] border-dashed p-10 text-center text-slate-500">New practical digital insights will be published here soon.</div>}
          </div>
        </section>
      </div>
    </main>
  )
}
