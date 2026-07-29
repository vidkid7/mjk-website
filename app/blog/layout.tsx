import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Digital Insights, Project Notes & Software Thinking | Mukesh Khadka',
  description: 'Practical notes on software systems, websites, automation, UX, and digital transformation from Mukesh Khadka in Nepal.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Digital Insights, Project Notes & Software Thinking',
    description: 'Practical notes on software systems, websites, automation, UX, and digital transformation from Mukesh Khadka.',
    url: '/blog',
    type: 'website',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
