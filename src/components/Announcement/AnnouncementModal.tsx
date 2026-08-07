// src/app/(public)/components/AnnouncementModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import Link from "next/link";

interface Announcement {
  id: string;
  title: string;
  message: string;
  imageUrl?: string | null;
  ctaText?: string | null;
  ctaUrl?: string | null;
}

interface AnnouncementModalProps {
  announcement: Announcement | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AnnouncementModal({
  announcement,
  isOpen,
  onClose,
}: AnnouncementModalProps) {
  if (!announcement) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: -15, y: 40 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            style={{ perspective: 1200 }}
            className="relative w-full max-w-lg max-h-[90vh] bg-gradient-to-b from-[#141414] to-dark border border-accent/20 shadow-[0_25px_80px_-15px_rgba(212,175,55,0.25)] overflow-y-auto overflow-x-hidden overscroll-contain"
          >
            <button
              onClick={onClose}
              className="fixed sm:absolute top-4 right-4 sm:top-4 sm:right-4 z-20 p-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white/70 hover:text-white hover:scale-105 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {announcement.imageUrl && (
              <div className="relative h-40 sm:h-56 overflow-hidden">
                <img
                  src={announcement.imageUrl}
                  alt={announcement.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
              </div>
            )}

            <div className="p-6 sm:p-8 text-center space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/15 border border-accent/30 rounded-full">
                <Sparkles className="w-3 h-3 text-accent" />
                <span className="text-[10px] text-accent font-semibold uppercase tracking-[0.25em]">
                  Special Offer
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-white leading-tight">
                {announcement.title}
              </h2>

              <p className="text-sm text-muted leading-relaxed">
                {announcement.message}
              </p>

              {announcement.ctaText && announcement.ctaUrl && (
                <Link
                  href={announcement.ctaUrl}
                  onClick={onClose}
                  className="inline-block mt-2 bg-accent text-dark px-8 py-3 text-xs font-semibold uppercase tracking-widest hover:brightness-110 transition-all"
                >
                  {announcement.ctaText}
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
