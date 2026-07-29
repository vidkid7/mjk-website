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
    title: "The importance of software architecture",
    category: "Software",
    subcategory: "System Planning",
    timeAgo: "2026-01-15",
    location: "Digital Portfolio",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&h=900&fit=crop&q=80",
    content: [
      "Software architecture describes how a system is built and how its major parts work together.",
      "A clear structure helps teams manage security, performance, scalability, maintainability, and future improvements without creating unnecessary confusion.",
    ],
  },
  {
    id: "2",
    title: "The importance of user experience in software design",
    category: "UX",
    subcategory: "Product Design",
    timeAgo: "2026-01-10",
    location: "Digital Portfolio",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1600&h=900&fit=crop&q=80",
    content: [
      "User experience should be a priority during product development because it directly affects adoption, trust, and value.",
      "A useful system is easy to understand, fast to operate, and designed around the real tasks people need to complete.",
    ],
  },
  {
    id: "3",
    title: "How to create a software development roadmap",
    category: "Planning",
    subcategory: "Delivery",
    timeAgo: "2026-01-05",
    location: "Digital Portfolio",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&h=900&fit=crop&q=80",
    content: [
      "A product roadmap summarizes product vision, priorities, phases, and expected progress over time.",
      "It helps teams decide what to build first, what to postpone, and how every stage contributes to the overall goal.",
    ],
  },
];

export function NewsCards({ newsCards = defaultNewsCards }: NewsCardsProps) {
  const [selectedCard, setSelectedCard] = useState<NewsCard | null>(null);
  const [bookmarkedCards, setBookmarkedCards] = useState<Set<string>>(new Set());

  const toggleBookmark = (cardId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedCards((prev) => {
      const next = new Set(prev);
      if (next.has(cardId)) next.delete(cardId);
      else next.add(cardId);
      return next;
    });
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 lg:gap-8">
        {newsCards.map((card, index) => (
          <motion.article
            key={card.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 25 } }}
            className="glass-panel group cursor-pointer overflow-hidden rounded-[1.75rem] transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-900/10"
            onClick={() => setSelectedCard(card)}
          >
            <div className="relative h-56 overflow-hidden bg-slate-100">
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full transform-gpu object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

              <div className="absolute right-3 top-3 cursor-pointer" onClick={(e) => toggleBookmark(card.id, e)}>
                <BookmarkIcon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    bookmarkedCards.has(card.id) ? "fill-gold text-gold" : "text-white/80 hover:text-white"
                  )}
                />
              </div>

              <div className="absolute bottom-3 left-3 text-white">
                <div className="mb-0.5 text-xs font-bold uppercase tracking-[0.12em] opacity-95">{card.category} · {card.subcategory}</div>
                <div className="text-[11px] opacity-75">{card.timeAgo} · {card.location}</div>
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-playfair text-xl font-bold leading-tight text-slate-900 line-clamp-3 transition-colors group-hover:text-emerald-700">
                {card.title}
              </h3>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {selectedCard && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-slate-900/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCard(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="glass-panel fixed inset-4 z-50 overflow-hidden rounded-[1.75rem] shadow-2xl md:inset-8 lg:inset-16"
            >
              <motion.button
                className="glass-action absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedCard(null)}
              >
                <X className="h-4 w-4 text-slate-700" />
              </motion.button>

              <div className="h-full overflow-y-auto">
                <div className="relative h-64 md:h-80">
                  <img
                    src={selectedCard.image}
                    alt={selectedCard.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/90 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="mb-1 text-sm opacity-90">{selectedCard.category} · {selectedCard.subcategory}</div>
                    <div className="text-sm opacity-75">{selectedCard.timeAgo} · {selectedCard.location}</div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <h1 className="mb-6 font-playfair text-2xl font-bold text-slate-900 md:text-3xl">
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
