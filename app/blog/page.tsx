'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Sparkles } from 'lucide-react'
import { newsData } from '@/lib/placeholder-data'
import { useStoredData } from '@/lib/storage'

const defaultPosts = newsData.map(post => ({ ...post, is_published: true, content: post.excerpt }))
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
          url: `https://khadkamukesh.com.np/blog#${post.id}`,
          item: {
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            dateModified: post.date,
            author: { '@type': 'Person', name: 'Mukesh Khadka', url: 'https://khadkamukesh.com.np' },
            image: post.cover,
            articleSection: post.category,
            mainEntityOfPage: 'https://khadkamukesh.com.np/blog',
          },
        })),
      },
    ],
  }

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }} />
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-emerald-700"><ArrowLeft size={16} /> Home</a>
          <a href="/admin/news" className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700">Admin Blog</a>
        </div>
      </header>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-700"><Sparkles size={14} />Blog Posts</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="font-playfair text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-6xl">Digital insights, project notes, and software thinking</motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="mt-5 text-base leading-8 text-slate-600 md:text-lg">This page reads the same posts created from the admin panel under Blog Posts. Publish or draft posts from admin and they appear here automatically when published.</motion.p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => {
              const paragraphs = (post.content || post.excerpt).split(/\n\s*\n/).filter(Boolean)
              return (
                <motion.article id={post.id} key={post.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.06 }} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10">
                  <div className="h-56 overflow-hidden bg-slate-100"><img src={post.cover} alt={post.title} loading="lazy" decoding="async" className="h-full w-full object-cover" /></div>
                  <div className="p-6"><div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400"><span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">{post.category}</span><span className="inline-flex items-center gap-1"><Calendar size={13} /> {post.date}</span></div><h2 className="font-playfair text-2xl font-bold leading-tight text-slate-950">{post.title}</h2><p className="mt-4 text-sm leading-7 text-slate-600">{post.excerpt}</p>{paragraphs.length > 1 && (<div className="mt-5 border-t border-slate-100 pt-5 text-sm leading-7 text-slate-500">{paragraphs.slice(0, 2).map((paragraph, i) => <p key={i} className="mb-3">{paragraph}</p>)}</div>)}</div>
                </motion.article>
              )
            })}
          </div>

          {!posts.length && <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">No published blog posts yet. Create one from the admin panel.</div>}
        </div>
      </section>
    </main>
  )
}
