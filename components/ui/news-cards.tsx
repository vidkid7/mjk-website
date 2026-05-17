"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BookmarkIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsCard {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  timeAgo: string;
  location: string;
  image: string;
  gradientColors?: string[];
  content?: string[];
}

interface NewsCardsProps {
  newsCards?: NewsCard[];
}

const defaultNewsCards: NewsCard[] = [
  {
    id: "1",
    title: "Mukesh Jung Khadka Launches Vision 2030 for Kathmandu",
    category: "Campaign",
    subcategory: "Vision 2030",
    timeAgo: "Jan 15, 2024",
    location: "Kathmandu",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168d9c?w=1600&h=900&fit=crop&q=80",
    gradientColors: ["from-red-500/20", "to-orange-500/20"],
    content: [
      "In a landmark event attended by over 5,000 supporters at Tundikhel grounds, Mukesh Jung Khadka unveiled his comprehensive development plan for transforming Kathmandu into a smart, sustainable city by 2030.",
      "The Vision 2030 plan outlines six pillars of transformation: Infrastructure Revolution, Youth Employment, Digital Nepal, Women Empowerment, Green Kathmandu, and Education Reform. Each pillar comes with specific, measurable targets and timelines.",
      "\"Kathmandu deserves to be a world-class capital. Our children deserve modern schools, our youth deserve meaningful jobs, and our elders deserve a clean, safe city,\" Khadka told the enthusiastic crowd.",
      "The plan includes creating 10,000+ new tech jobs through startup incubators, implementing e-governance across all municipal offices, planting 100,000 new trees, and modernizing community schools with digital infrastructure.",
      "Political analysts have praised the plan's specificity and ambition, noting that it represents a significant departure from typical campaign promises. Independent economists estimate the plan would require an investment of NPR 50 billion over six years.",
      "Community leaders from all 32 wards of Kathmandu have expressed support for the initiative, with many volunteering to serve on ward-level implementation committees.",
    ],
  },
  {
    id: "2",
    title: "Youth Coding Bootcamp Graduates 500th Batch — 85% Employment Rate",
    category: "Youth",
    subcategory: "Education",
    timeAgo: "Jan 10, 2024",
    location: "Lalitpur",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&h=900&fit=crop&q=80",
    gradientColors: ["from-blue-500/20", "to-purple-500/20"],
    content: [
      "The free coding bootcamp initiative founded by Mukesh Jung Khadka has reached a historic milestone as the 500th batch of students graduated from the Lalitpur campus, with a remarkable 85% employment rate within three months of completion.",
      "Since its inception, the program has trained over 3,000 young Nepalis in web development, mobile app creation, and data science — skills that are in high demand both domestically and in the global market.",
      "\"When we started this program, people said free education can't be quality education. Our graduates working at top companies in Nepal and abroad have proven them wrong,\" said Khadka at the graduation ceremony.",
      "The bootcamp partners with over 50 tech companies in Kathmandu Valley for internship placements. Several graduates have gone on to found their own startups, creating additional employment opportunities.",
      "Plans are underway to expand the program to Pokhara, Biratnagar, and Chitwan, with a goal of training 10,000 youth by 2026. The expansion will include new tracks in artificial intelligence and cybersecurity.",
      "International organizations including UNDP and the World Bank have recognized the bootcamp as a model for youth skills development in developing nations.",
    ],
  },
  {
    id: "3",
    title: "Clean Bagmati Campaign Enters Phase 3 — 15km More Covered",
    category: "Community",
    subcategory: "Environment",
    timeAgo: "Jan 5, 2024",
    location: "Kathmandu Valley",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1600&h=900&fit=crop&q=80",
    gradientColors: ["from-green-500/20", "to-emerald-500/20"],
    content: [
      "The community-driven Clean Bagmati River Campaign, spearheaded by Mukesh Jung Khadka, has expanded into its third phase, now covering an additional 15 kilometers of riverbank restoration and cleanup.",
      "Over 10,000 volunteers from across Kathmandu Valley participated in the Phase 3 launch event, making it the largest community cleanup initiative in Nepal's history. Local businesses contributed equipment and refreshments.",
      "The campaign has already shown measurable results: water quality testing at multiple points along the restored sections shows significant improvement in dissolved oxygen levels and reduction in harmful bacteria.",
      "\"The Bagmati is not just a river — it is the soul of our valley. Restoring it is not optional; it is our duty to future generations,\" Khadka emphasized while personally participating in the cleanup alongside volunteers.",
      "Phase 3 includes installation of waste management infrastructure along the riverbank, including solar-powered waste compactors and community composting stations. Local ward offices have committed to ongoing maintenance.",
      "Environmental scientists from Tribhuvan University are monitoring the ecological recovery, reporting the return of several fish species that hadn't been seen in the river for over a decade.",
    ],
  },
];

export function NewsCards({
  newsCards = defaultNewsCards,
}: NewsCardsProps) {
  const [selectedCard, setSelectedCard] = useState<NewsCard | null>(null);
  const [bookmarkedCards, setBookmarkedCards] = useState<Set<string>>(new Set());

  const toggleBookmark = (cardId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) newSet.delete(cardId);
      else newSet.add(cardId);
      return newSet;
    });
  };

  const openCard = (card: NewsCard) => setSelectedCard(card);
  const closeCard = () => setSelectedCard(null);

  return (
    <div className="w-full">
      {/* News Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {newsCards.map((card, index) => (
          <motion.article
            key={card.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 25 } }}
            className="bg-white border border-slate-200 rounded-lg overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl hover:shadow-slate-900/10 transition-shadow duration-300"
            onClick={() => openCard(card)}
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden bg-slate-100">
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transform-gpu group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />

              {/* Bookmark */}
              <div
                className="absolute top-3 right-3 cursor-pointer"
                onClick={(e) => toggleBookmark(card.id, e)}
              >
                <BookmarkIcon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    bookmarkedCards.has(card.id) ? "text-gold fill-gold" : "text-white/80 hover:text-white"
                  )}
                />
              </div>

              {/* Category & time */}
              <div className="absolute bottom-3 left-3 text-white">
                <div className="text-xs mb-0.5 font-bold uppercase tracking-[0.12em] opacity-95">{card.category} · {card.subcategory}</div>
                <div className="text-[11px] opacity-75">{card.timeAgo} · {card.location}</div>
              </div>
            </div>

            {/* Title */}
            <div className="p-5">
              <h3 className="font-playfair font-bold text-xl leading-tight line-clamp-3 text-slate-900 group-hover:text-crimson transition-colors">
                {card.title}
              </h3>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Expanded Card Modal */}
      <AnimatePresence>
        {selectedCard && (
          <>
            <motion.div
              className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCard}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed inset-4 md:inset-8 lg:inset-16 bg-white border border-slate-200 rounded-lg overflow-hidden z-50 shadow-2xl"
            >
              <motion.button
                className="absolute top-4 right-4 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center z-10 shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeCard}
              >
                <X className="w-4 h-4 text-slate-700" />
              </motion.button>

              <div className="h-full overflow-y-auto">
                <div className="relative h-64 md:h-80">
                  <img
                    src={selectedCard.image}
                    alt={selectedCard.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/90 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-sm mb-1 opacity-90">{selectedCard.category} · {selectedCard.subcategory}</div>
                    <div className="text-sm opacity-75">{selectedCard.timeAgo} · {selectedCard.location}</div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <h1 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900 font-playfair">
                    {selectedCard.title}
                  </h1>
                  <div className="text-slate-600">
                    {selectedCard.content?.map((paragraph, index) => (
                      <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
