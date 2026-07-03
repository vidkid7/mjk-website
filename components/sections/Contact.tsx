'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Send, Check } from 'lucide-react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { addMessage, useStoredData } from '@/lib/storage'

const socialUrl = (url: string | undefined, fallback: string, legacyFallback?: string) =>
  !url || url === legacyFallback ? fallback : url

const defaultSettings = {
  site_title: 'Mukesh Khadka | Digital Systems Portfolio',
  meta_description: 'Digital portfolio of Mukesh Khadka — practical software systems, web platforms, automation, and digital transformation work.',
  phone: '+977 985-1241656',
  email: 'khadkamukesh423@gmail.com',
  address: 'Kathmandu, Bagmati Province, Nepal',
  linkedin_url: 'https://www.linkedin.com/in/mukesh-khadka-960401324/',
  facebook_url: 'https://www.facebook.com/Nepali.man.67',
  instagram_url: 'https://www.instagram.com/khadka3546?utm_source=qr',
  youtube_url: '',
  twitter_url: 'https://x.com/khadkamukesh422?s=11',
  tiktok_url: '',
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const storedSettings = useStoredData('settings', defaultSettings)
  const settings = { ...defaultSettings, ...storedSettings, phone: defaultSettings.phone, email: defaultSettings.email }
  const socialLinks = [
    { icon: FaLinkedin, label: 'LinkedIn', url: socialUrl(settings.linkedin_url, defaultSettings.linkedin_url), color: 'hover:text-blue-700 hover:bg-blue-50 hover:border-blue-100' },
    { icon: FaFacebook, label: 'Facebook', url: socialUrl(settings.facebook_url, defaultSettings.facebook_url, 'https://facebook.com/mjk'), color: 'hover:text-blue-600 hover:bg-blue-50 hover:border-blue-100' },
    { icon: FaTwitter, label: 'Twitter/X', url: socialUrl(settings.twitter_url, defaultSettings.twitter_url, 'https://twitter.com/mjk'), color: 'hover:text-sky-600 hover:bg-sky-50 hover:border-sky-100' },
    { icon: FaInstagram, label: 'Instagram', url: socialUrl(settings.instagram_url, defaultSettings.instagram_url, 'https://instagram.com/mjk'), color: 'hover:text-pink-600 hover:bg-pink-50 hover:border-pink-100' },
  ].filter(social => Boolean(social.url))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addMessage({ name: form.name, email: form.email, subject: form.subject, message: form.message })
      setSubmitted(true)
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 3000)
    } catch {
      alert('Failed to send message. Please try again.')
    }
  }

  return (
    <section id="contact" className="relative bg-[#fbfaf7] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading pill="Contact" heading="Let’s discuss your digital project" subheading="Have a website, software system, dashboard, automation idea, or portfolio project in mind? Send a message and we can discuss the best next step." accent="emerald" />

        <div className="mb-10 grid gap-5 lg:grid-cols-3">
          {[
            { icon: MapPin, label: 'Office Address', value: settings.address, color: 'text-crimson', bg: 'bg-crimson-50 border-crimson-100' },
            { icon: Phone, label: 'Phone', value: settings.phone, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
            { icon: Mail, label: 'Email', value: settings.email, color: 'text-emerald', bg: 'bg-emerald-50 border-emerald-light/30' },
          ].map((info, i) => (
            <motion.div key={info.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4, transition: { duration: 0.25 } }} className="rounded-lg border border-slate-200 bg-white p-6 text-center transition-all duration-300 hover:border-slate-300 hover:shadow-md">
              <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center border ${info.bg}`}><info.icon className={info.color} size={20} /></div>
              <h4 className="mb-1.5 text-sm font-semibold text-slate-900">{info.label}</h4>
              <p className="whitespace-pre-line text-xs leading-relaxed text-slate-500">{info.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input type="text" placeholder="Your Name" aria-label="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-300 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20" required />
              <input type="email" placeholder="Email Address" aria-label="Email address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-300 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20" required />
            </div>
            <input type="text" placeholder="Subject" aria-label="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="w-full rounded-lg border border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-300 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20" />
            <textarea placeholder="Tell us about your project" aria-label="Your message" rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full resize-none rounded-lg border border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-300 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20" required />
            <button type="submit" className="flex w-full items-center justify-center gap-2 bg-slate-950 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-emerald-700 hover:shadow-xl disabled:opacity-60">
              {submitted ? <><Check size={16} /> Message Sent!</> : <><Send size={16} /> Send Message</>}
            </button>
          </motion.form>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-5">
            <div className="h-[220px] overflow-hidden rounded-lg border border-slate-200 bg-white lg:h-[260px]"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.31397712412!2d85.28493!3d27.70169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4f13.1" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
            <div className="rounded-lg border border-slate-200 bg-white p-6"><h4 className="mb-4 text-center text-sm font-semibold text-slate-900">Connect Online</h4><div className="flex justify-center gap-3">{socialLinks.map((social) => (<a key={social.label} href={social.url} className={`flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 ${social.color}`} aria-label={social.label}><social.icon size={18} /></a>))}</div></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
