'use client'

import { ArrowUpRight, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

const portraits = {
  temple: '/assets/portraits/mukesh-temple.jpg',
  workspace: '/assets/portraits/mukesh-workspace.jpg',
  garden: '/assets/portraits/mukesh-garden.jpg',
  sky: '/assets/portraits/mukesh-sky.jpg',
}

export default function PortraitStory() {
  return (
    <section id="field-notes" className="public-section public-section--light relative overflow-hidden px-5 py-20 text-slate-900 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center gap-4 border-t border-slate-200 pt-5 text-[11px] font-black uppercase tracking-[0.28em] text-slate-500">
          <span className="text-crimson">04</span>
          <span>Field notes</span>
          <span aria-hidden="true" className="h-px flex-1 bg-slate-200" />
          <span className="hidden tracking-[0.18em] sm:inline">People · Places · Practice</span>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <motion.figure initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.55 }} className="group relative min-h-[32rem] overflow-hidden rounded-[1.5rem] bg-white shadow-sm ring-1 ring-slate-200 lg:min-h-[42rem]">
            <img src={portraits.temple} alt="Mukesh Khadka at a Kathmandu temple festival" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[50%_48%] grayscale-[0.06] transition duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.18)_24%,rgba(255,255,255,0.88)_66%,rgba(255,255,255,0.96)_100%)] px-6 pb-6 pt-24 sm:px-8 sm:pb-8">
              <div className="rounded-[1.35rem] border border-slate-200 bg-white/88 p-5 shadow-lg backdrop-blur-md sm:p-6">
                <div className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-emerald-700"><MapPin className="h-3.5 w-3.5" /> Kathmandu Valley</div>
                <h2 className="max-w-xl font-playfair text-3xl font-bold leading-tight text-slate-950 sm:text-5xl">Technology with a sense of place.</h2>
                <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600">The work is rooted in Nepal: its people, its rituals, and the everyday systems that help communities move forward.</p>
              </div>
            </div>
          </motion.figure>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <motion.figure initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.55, delay: 0.08 }} className="group relative min-h-[16rem] overflow-hidden rounded-[1.5rem] bg-white shadow-sm ring-1 ring-slate-200 sm:col-span-2 lg:min-h-[20rem]">
              <img src={portraits.sky} alt="Mukesh Khadka outdoors against an open sky" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[50%_42%] transition duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.78)_68%,rgba(255,255,255,0.96)_100%)] p-5 sm:p-6">
                <div className="flex items-end justify-between gap-4 rounded-[1.1rem] border border-slate-200 bg-white/88 p-4 shadow-lg backdrop-blur-md">
                  <div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">Perspective</p><p className="mt-2 font-playfair text-2xl font-bold text-slate-950">Keep looking outward.</p></div>
                  <ArrowUpRight className="mb-1 h-5 w-5 shrink-0 text-crimson" />
                </div>
              </div>
            </motion.figure>

            <motion.figure initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.55, delay: 0.16 }} className="group relative min-h-[18rem] overflow-hidden rounded-[1.5rem] bg-white shadow-sm ring-1 ring-slate-200">
              <img src={portraits.garden} alt="Mukesh Khadka in a garden setting" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[50%_50%] transition duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.76)_70%,rgba(255,255,255,0.96)_100%)] p-5">
                <div className="rounded-[1rem] border border-slate-200 bg-white/88 p-4 shadow-lg backdrop-blur-md">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">Energy</p><p className="mt-2 font-playfair text-xl font-bold text-slate-950">Stay curious.</p>
                </div>
              </div>
            </motion.figure>

            <motion.figure initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.55, delay: 0.24 }} className="group relative min-h-[18rem] overflow-hidden rounded-[1.5rem] bg-white shadow-sm ring-1 ring-slate-200">
              <img src={portraits.workspace} alt="Mukesh Khadka working with a digital project" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[50%_52%] transition duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.76)_70%,rgba(255,255,255,0.96)_100%)] p-5">
                <div className="rounded-[1rem] border border-slate-200 bg-white/88 p-4 shadow-lg backdrop-blur-md">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">Practice</p><p className="mt-2 font-playfair text-xl font-bold text-slate-950">Make it useful.</p>
                </div>
              </div>
            </motion.figure>
          </div>
        </div>
      </div>
    </section>
  )
}
