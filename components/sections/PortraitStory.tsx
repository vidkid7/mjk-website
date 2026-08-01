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
    <section id="field-notes" className="public-section public-section--dark relative overflow-hidden px-5 py-20 text-white sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center gap-4 border-t border-white/20 pt-5 text-[11px] font-black uppercase tracking-[0.28em] text-white/65">
          <span className="text-crimson">04</span>
          <span>Field notes</span>
          <span aria-hidden="true" className="h-px flex-1 bg-white/20" />
          <span className="hidden tracking-[0.18em] sm:inline">People · Places · Practice</span>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <motion.figure initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.55 }} className="group relative min-h-[32rem] overflow-hidden rounded-[1.5rem] bg-[#071a35] lg:min-h-[42rem]">
            <img src={portraits.temple} alt="Mukesh Khadka at a Kathmandu temple festival" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[50%_48%] grayscale-[0.12] transition duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071a35]/90 via-[#071a35]/5 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <div className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-gold"><MapPin className="h-3.5 w-3.5" /> Kathmandu Valley</div>
              <h2 className="max-w-xl font-playfair text-3xl font-bold leading-tight sm:text-5xl">Technology with a sense of place.</h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/75">The work is rooted in Nepal: its people, its rituals, and the everyday systems that help communities move forward.</p>
            </figcaption>
          </motion.figure>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <motion.figure initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.55, delay: 0.08 }} className="group relative min-h-[16rem] overflow-hidden rounded-[1.5rem] bg-[#dce8ef] sm:col-span-2 lg:min-h-[20rem]">
              <img src={portraits.sky} alt="Mukesh Khadka outdoors against an open sky" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[50%_42%] transition duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071a35]/65 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-6">
                <div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">Perspective</p><p className="mt-2 font-playfair text-2xl font-bold">Keep looking outward.</p></div>
                <ArrowUpRight className="mb-1 h-5 w-5 shrink-0 text-gold" />
              </figcaption>
            </motion.figure>

            <motion.figure initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.55, delay: 0.16 }} className="group relative min-h-[18rem] overflow-hidden rounded-[1.5rem] bg-[#dbe8d9]">
              <img src={portraits.garden} alt="Mukesh Khadka in a garden setting" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[50%_50%] transition duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071a35]/65 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">Energy</p><p className="mt-2 font-playfair text-xl font-bold">Stay curious.</p></figcaption>
            </motion.figure>

            <motion.figure initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.55, delay: 0.24 }} className="group relative min-h-[18rem] overflow-hidden rounded-[1.5rem] bg-[#dce6eb]">
              <img src={portraits.workspace} alt="Mukesh Khadka working with a digital project" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[50%_52%] transition duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071a35]/70 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">Practice</p><p className="mt-2 font-playfair text-xl font-bold">Make it useful.</p></figcaption>
            </motion.figure>
          </div>
        </div>
      </div>
    </section>
  )
}
