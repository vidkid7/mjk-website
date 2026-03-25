'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Users, Check, Sparkles } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'

const donationTiers = [
  { amount: 500, label: 'NPR 500', desc: 'Support a youth event', emoji: '🎯' },
  { amount: 1000, label: 'NPR 1,000', desc: 'Fund a community cleanup', emoji: '🌱' },
  { amount: 5000, label: 'NPR 5,000', desc: 'Sponsor a scholarship', emoji: '🎓' },
]

export default function Support() {
  const [volunteerForm, setVolunteerForm] = useState({ name: '', email: '', phone: '', city: '', help: '' })
  const [selectedTier, setSelectedTier] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="support" className="relative py-24 md:py-32 bg-slate-50">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          pill="Get Involved"
          heading="Support the Movement"
          subheading="Whether you volunteer your time or contribute to the cause, every bit makes a difference."
          accent="crimson"
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left — Volunteer */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-7 md:p-9 border border-slate-100 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Users className="text-white" size={18} />
              </div>
              <h3 className="font-playfair text-xl font-bold text-slate-900">Join The Movement</h3>
            </div>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Be part of the change. Whether you can give an hour or a lifetime, your contribution matters. 
              Join thousands of volunteers who are already building a better Kathmandu.
            </p>

            <form onSubmit={handleVolunteerSubmit} className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={volunteerForm.name}
                  onChange={e => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all text-sm"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={volunteerForm.email}
                  onChange={e => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all text-sm"
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={volunteerForm.phone}
                  onChange={e => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all text-sm"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={volunteerForm.city}
                  onChange={e => setVolunteerForm({ ...volunteerForm, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all text-sm"
                />
              </div>
              <select
                value={volunteerForm.help}
                onChange={e => setVolunteerForm({ ...volunteerForm, help: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all text-sm"
              >
                <option value="">How would you like to help?</option>
                <option value="door-to-door">Door-to-door campaigning</option>
                <option value="social-media">Social media promotion</option>
                <option value="events">Event organization</option>
                <option value="fundraising">Fundraising</option>
                <option value="other">Other</option>
              </select>
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:shadow-glow-blue transition-all text-sm flex items-center justify-center gap-2"
              >
                {submitted ? <><Check size={16} /> Thank You!</> : <><Users size={16} /> Volunteer Now</>}
              </button>
            </form>
          </motion.div>

          {/* Right — Donate */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl p-7 md:p-9 border border-slate-100 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crimson to-crimson-dark flex items-center justify-center">
                <Heart className="text-white" size={18} />
              </div>
              <h3 className="font-playfair text-xl font-bold text-slate-900">Support the Campaign</h3>
            </div>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Every contribution — big or small — fuels our mission to create a transparent, 
              youth-driven, and prosperous Kathmandu.
            </p>

            <div className="space-y-3 mb-5">
              {donationTiers.map((tier) => (
                <button
                  key={tier.amount}
                  onClick={() => setSelectedTier(tier.amount)}
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-200 ${
                    selectedTier === tier.amount
                      ? 'border-crimson bg-crimson-50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{tier.emoji}</span>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{tier.label}</div>
                        <div className="text-slate-400 text-xs mt-0.5">{tier.desc}</div>
                      </div>
                    </div>
                    {selectedTier === tier.amount && (
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-crimson to-crimson-dark flex items-center justify-center">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}

              {/* Custom Amount */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <label className="text-slate-400 text-xs block mb-2">Custom Amount (NPR)</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-crimson/40 focus:ring-1 focus:ring-crimson/40 text-sm"
                  onFocus={() => setSelectedTier(null)}
                />
              </div>
            </div>

            <button className="w-full py-3.5 bg-gradient-to-r from-crimson to-crimson-dark text-white font-medium rounded-xl hover:shadow-glow-crimson transition-all text-sm flex items-center justify-center gap-2">
              <Heart size={16} /> Donate Now
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
