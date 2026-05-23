"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import {
  Building2,
  Briefcase,
  Laptop,
  Heart,
  TreePine,
  GraduationCap,
  Globe,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VisionFeatureInput {
  id: string;
  icon: string;
  heading: string;
  description: string;
}

const FEATURES = [
  {
    id: "infrastructure",
    label: "Infrastructure",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1200&auto=format&fit=crop",
    description:
      "Modern roads, smart traffic systems, and sustainable urban planning to transform Kathmandu into a world-class capital.",
  },
  {
    id: "employment",
    label: "Youth Employment",
    icon: Briefcase,
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    description:
      "Creating 10,000+ new jobs through tech hubs, startup incubators, and skill development centers across every ward.",
  },
  {
    id: "digital",
    label: "Digital Nepal",
    icon: Laptop,
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    description:
      "E-governance, free public WiFi, digital literacy programs, and a fully transparent online municipal system.",
  },
  {
    id: "women",
    label: "Women Empowerment",
    icon: Heart,
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200&auto=format&fit=crop",
    description:
      "Women entrepreneur funds, safety initiatives, childcare centers, and equal representation at every level.",
  },
  {
    id: "green",
    label: "Green Kathmandu",
    icon: TreePine,
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
    description:
      "Clean Bagmati campaign, 100,000 new trees, waste management revolution, and electric public transport.",
  },
  {
    id: "education",
    label: "Education Reform",
    icon: GraduationCap,
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop",
    description:
      "Modernized community schools, free coding education for youth, scholarships, and global university partnerships.",
  },
];

const DEFAULT_IMAGES = FEATURES.map(feature => feature.image);

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Building2,
  Briefcase,
  Laptop,
  Heart,
  TreePine,
  GraduationCap,
  Globe,
  Shield,
  Users,
  Zap,
};

const AUTO_PLAY_INTERVAL = 3500;
const ITEM_HEIGHT = 65;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function VisionCarousel({ features }: { features?: VisionFeatureInput[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(carouselRef, { amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselFeatures = features?.length
    ? features.map((feature, index) => ({
        id: feature.id,
        label: feature.heading,
        icon: ICON_MAP[feature.icon] || Building2,
        image: DEFAULT_IMAGES[index % DEFAULT_IMAGES.length],
        description: feature.description,
      }))
    : FEATURES;

  const currentIndex =
    ((step % carouselFeatures.length) + carouselFeatures.length) % carouselFeatures.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + carouselFeatures.length) % carouselFeatures.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused || !isInView || shouldReduceMotion) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused, isInView, shouldReduceMotion]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = carouselFeatures.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div ref={carouselRef} className="w-full max-w-7xl mx-auto md:p-6">
      <div className="relative overflow-hidden rounded-lg flex flex-col lg:flex-row min-h-[600px] lg:aspect-video border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
        {/* Left side - Feature list */}
        <div className="w-full lg:w-[40%] min-h-[350px] md:min-h-[450px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-16 lg:pl-16 bg-gradient-to-br from-crimson via-crimson-dark to-[#771323]">
          <div className="absolute inset-x-0 top-0 h-12 md:h-20 lg:h-16 bg-gradient-to-b from-crimson via-crimson/80 to-transparent z-40" />
          <div className="absolute inset-x-0 bottom-0 h-12 md:h-20 lg:h-16 bg-gradient-to-t from-crimson-dark via-crimson-dark/80 to-transparent z-40" />
          <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
            {carouselFeatures.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(carouselFeatures.length / 2),
                carouselFeatures.length / 2,
                distance
              );
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.id}
                  style={{
                    height: ITEM_HEIGHT,
                    width: "fit-content",
                  }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    mass: 1,
                  }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-center gap-4 px-6 md:px-10 lg:px-8 py-3.5 md:py-5 lg:py-4 transition-all duration-700 text-left group border",
                      isActive
                        ? "bg-white text-crimson border-white z-10 shadow-lg"
                        : "bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center transition-colors duration-500",
                        isActive ? "text-crimson" : "text-white/40"
                      )}
                    >
                      <Icon size={18} strokeWidth={2} />
                    </div>

                    <span className="font-medium text-sm md:text-[15px] tracking-tight whitespace-nowrap uppercase">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right side - Image cards */}
        <div className="flex-1 min-h-[500px] md:min-h-[600px] lg:h-full relative bg-[#fbfaf7] flex items-center justify-center py-16 md:py-24 lg:py-16 px-6 md:px-12 lg:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-200/70">
          <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
            {carouselFeatures.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? ("auto" as const) : ("none" as const),
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className="absolute inset-0 rounded-lg overflow-hidden border-4 md:border-8 border-white bg-white origin-center shadow-xl"
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    loading={isActive || isPrev || isNext ? "eager" : "lazy"}
                    decoding="async"
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700",
                      isActive
                        ? "grayscale-0 blur-0"
                        : "grayscale blur-[2px] brightness-75"
                    )}
                  />

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-x-0 bottom-0 p-10 pt-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end pointer-events-none"
                      >
                        <div className="bg-white text-slate-900 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] w-fit shadow-lg mb-3 border border-slate-100">
                          {index + 1} • {feature.label}
                        </div>
                        <p className="text-white font-medium text-xl md:text-2xl leading-tight drop-shadow-md tracking-tight">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className={cn(
                      "absolute top-8 left-8 flex items-center gap-3 transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
                    <span className="text-white/80 text-[10px] font-medium uppercase tracking-[0.3em]">
                      Our Vision
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisionCarousel;
