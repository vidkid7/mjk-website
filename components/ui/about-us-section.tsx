"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  Heart,
  Users,
  Lightbulb,
  Building2,
  GraduationCap,
  Globe,
  Sparkles,
  Star,
  ArrowRight,
  Zap,
  CheckCircle,
} from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { DhakaPattern } from "@/components/ui/NepalFlag"

interface AboutContent {
  pill: string
  heading: string
  paragraphs: string
  community_trust: number
  youth_engagement: number
  photo: string
}

const fallbackContent: AboutContent = {
  pill: "Discover His Story",
  heading: "About Mukesh",
  paragraphs:
    "Born and raised in the heart of Kathmandu, Mukesh Jung Khadka grew up witnessing both the immense potential and the daily struggles of the Nepali people. A son of Nepal, built for service.",
  community_trust: 94,
  youth_engagement: 88,
  photo: "/mukk-removebg-preview.png",
}

export default function AboutMukeshSection({ content = fallbackContent }: { content?: AboutContent }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const paragraphs = content.paragraphs
    .split(/\n\s*\n/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const qualities = [
    {
      icon: <Heart className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-crimson/60" />,
      title: "Community Service",
      description:
        "For over 15 years, Mukesh has dedicated his life to empowering communities across Kathmandu Valley, leading 50+ development projects that have transformed lives.",
      position: "left",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-blue-400/60" />,
      title: "Youth Champion",
      description:
        "From free coding bootcamps to mentorship programs, Mukesh has trained and inspired over 5,000 young Nepalis to pursue their dreams and build careers.",
      position: "left",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-gold/60" />,
      title: "Visionary Leader",
      description:
        "His vision for a digitally empowered, transparent local government reflects a deep understanding of what Kathmandu needs to become a world-class capital.",
      position: "left",
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-crimson/60" />,
      title: "Entrepreneur",
      description:
        "Founder of multiple successful enterprises that created hundreds of jobs. His journey from the streets of Ason to boardrooms gives him unique insight.",
      position: "right",
    },
    {
      icon: <Users className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-blue-400/60" />,
      title: "People's Leader",
      description:
        "His hands-on approach and genuine connection with people from all walks of life have earned him the trust and admiration of thousands across Nepal.",
      position: "right",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-gold/60" />,
      title: "Nation Builder",
      description:
        "From clean Bagmati campaigns to solar street lighting, Mukesh brings proven results and unwavering commitment to making Nepal a better place for all.",
      position: "right",
    },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full py-24 px-4 bg-[#fbfaf7] text-[#202e44] overflow-hidden relative"
    >
      {/* Decorative background elements */}
      <DhakaPattern className="opacity-[0.04]" />
      <motion.div
        className="absolute left-0 top-16 h-28 w-1/3 bg-gradient-to-r from-crimson/10 to-transparent"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-20 right-0 h-32 w-1/3 bg-gradient-to-l from-[#003893]/10 to-transparent"
        style={{ y: y2, rotate: rotate2 }}
      />

      <motion.div
        className="container mx-auto max-w-6xl relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="flex flex-col items-center mb-6" variants={itemVariants}>
          <motion.span
            className="text-crimson font-medium mb-2 flex items-center gap-2 text-sm uppercase tracking-wider"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap className="w-4 h-4" />
            {content.pill}
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-center text-[#202e44]">
            {content.heading}
          </h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-crimson via-gold to-[#003893]"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <motion.p className="text-center max-w-2xl mx-auto mb-16 text-[#202e44]/70 leading-relaxed" variants={itemVariants}>
          {paragraphs[0]}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Left Column */}
          <div className="space-y-14">
            {qualities
              .filter((q) => q.position === "left")
              .map((quality, index) => (
                <QualityItem
                  key={`left-${index}`}
                  icon={quality.icon}
                  secondaryIcon={quality.secondaryIcon}
                  title={quality.title}
                  description={quality.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="left"
                />
              ))}
          </div>

          {/* Center Image */}
          <div className="flex justify-center items-center order-first md:order-none mb-8 md:mb-0">
            <motion.div className="relative w-full max-w-xs" variants={itemVariants}>
              <motion.div
                className="rounded-lg overflow-hidden shadow-xl shadow-slate-900/10"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <div className="bg-gradient-to-b from-slate-100 via-slate-50 to-white">
                  <img
                    src={content.photo || "/mukk-removebg-preview.png"}
                    alt="Mukesh Jung Khadka"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-[#202e44]/40 to-transparent flex items-end justify-center p-4 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <motion.a
                    href="#vision"
                    className="bg-white text-[#202e44] px-4 py-2 flex items-center gap-2 text-sm font-semibold shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    My Vision <ArrowRight className="w-4 h-4" />
                  </motion.a>
                </motion.div>
              </motion.div>
              <motion.div
                className="absolute inset-0 border-4 border-crimson/20 rounded-lg -m-3 z-[-1]"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />

              {/* Floating accent elements */}
              <motion.div
                className="absolute -top-4 -right-8 h-16 w-1 bg-crimson/25"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                style={{ y: y1 }}
              />
              <motion.div
                className="absolute -bottom-6 -left-10 h-20 w-1 bg-[#003893]/25"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                style={{ y: y2 }}
              />

              <motion.div
                className="hidden"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="hidden"
                animate={{
                  y: [0, 10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-14">
            {qualities
              .filter((q) => q.position === "right")
              .map((quality, index) => (
                <QualityItem
                  key={`right-${index}`}
                  icon={quality.icon}
                  secondaryIcon={quality.secondaryIcon}
                  title={quality.title}
                  description={quality.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="right"
                />
              ))}
          </div>
        </div>

        <motion.div
          className="mt-16 grid gap-5 rounded-lg border border-slate-200 bg-white/80 p-6 shadow-sm md:grid-cols-[1fr_220px]"
          variants={itemVariants}
        >
          <div className="space-y-4">
            {(paragraphs.length > 1 ? paragraphs.slice(1) : paragraphs).map((paragraph, index) => (
              <p key={index} className="text-sm leading-7 text-[#202e44]/70">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
            {[
              { label: "Community Trust", value: content.community_trust },
              { label: "Youth Engagement", value: content.youth_engagement },
            ].map(stat => (
              <div key={stat.label} className="rounded-lg bg-slate-50 p-4 text-center">
                <div className="font-playfair text-3xl font-bold text-crimson">{stat.value}%</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-[#071224] to-[#102642] text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-slate-900/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex-1">
            <h3 className="text-2xl font-playfair font-bold mb-2">Ready to build a better Nepal?</h3>
            <p className="text-white/70">Join Mukesh's mission for a transparent, youth-driven future.</p>
          </div>
          <motion.a
            href="#support"
            className="bg-crimson hover:bg-crimson-dark text-white px-6 py-3 flex items-center gap-2 font-bold uppercase tracking-[0.12em] text-xs transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Support The Mission <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

interface QualityItemProps {
  icon: React.ReactNode
  secondaryIcon?: React.ReactNode
  title: string
  description: string
  variants: {
    hidden: { opacity: number; y?: number }
    visible: { opacity: number; y?: number; transition: { duration: number; ease: string } }
  }
  delay: number
  direction: "left" | "right"
}

function QualityItem({ icon, secondaryIcon, title, description, variants, delay, direction }: QualityItemProps) {
  return (
    <motion.div
      className="flex flex-col group"
      variants={variants}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="flex items-center gap-3 mb-3"
        initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        <motion.div
          className="text-crimson bg-crimson/10 p-3 transition-colors duration-300 group-hover:bg-crimson/20 relative"
          whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
        >
          {icon}
          {secondaryIcon}
        </motion.div>
        <h3 className="text-xl font-semibold text-[#202e44] group-hover:text-crimson transition-colors duration-300">
          {title}
        </h3>
      </motion.div>
      <motion.p
        className="text-sm text-[#202e44]/70 leading-relaxed pl-[52px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
      >
        {description}
      </motion.p>
      <motion.div
        className="mt-3 pl-[52px] flex items-center text-crimson text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <span className="flex items-center gap-1">
          Learn more <ArrowRight className="w-3 h-3" />
        </span>
      </motion.div>
    </motion.div>
  )
}
