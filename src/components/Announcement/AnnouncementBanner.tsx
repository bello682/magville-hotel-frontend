// src/app/(public)/components/AnnouncementBanner.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";

interface AnnouncementBannerProps {
  title: string;
  isVisible: boolean;
  onDismiss: () => void;
  onReopen: () => void;
}

export default function AnnouncementBanner({
  title,
  isVisible,
  onDismiss,
  onReopen,
}: AnnouncementBannerProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className="w-full bg-accent text-dark overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
            <button
              onClick={onReopen}
              className="flex items-center gap-2 min-w-0 text-left group flex-1"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wider truncate group-hover:underline">
                {title}
              </span>
            </button>
            <button
              onClick={onDismiss}
              className="shrink-0 p-1 hover:bg-black/10 rounded-full transition"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
