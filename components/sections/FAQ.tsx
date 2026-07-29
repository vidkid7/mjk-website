'use client'

import { SectionHeading } from '@/components/ui/SectionHeading'

const questions = [
  ['What services does Mukesh Khadka provide?', 'Website development, custom software systems, ERP and CRM platforms, business automation, UI/UX design, mobile app solutions, and file or billing systems.'],
  ['Who does Mukesh Khadka work with?', 'Businesses, institutions, municipalities, schools, and growth-focused teams that need practical digital products and operational systems.'],
  ['Where is Mukesh Khadka based?', 'Kathmandu, Bagmati Province, Nepal. Projects can be delivered locally or remotely.'],
  ['How can I start a project?', 'Use the contact form, call +977 985-1241656, or email khadkamukesh423@gmail.com with your goals, timeline, and budget range.'],
]

export default function FAQ() {
  return (
    <section id="faq" className="public-section public-section--light py-20 md:py-28" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading pill="FAQ" heading="Answers about digital projects with Mukesh Khadka" subheading="Clear answers to common questions about services, clients, location, and getting started." accent="emerald" />
        <div className="mt-10 space-y-4">
          {questions.map(([question, answer]) => (
            <details key={question} className="glass-panel group rounded-[1.75rem] p-6 md:p-8">
              <summary className="cursor-pointer list-none pr-8 text-base font-bold text-slate-900 marker:hidden">{question}</summary>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
