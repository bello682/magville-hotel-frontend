// src/app/(admin)/components/admin/bookings/ConfirmActionModal.tsx
"use client";

import { AlertTriangle, Loader2, X } from "lucide-react";

interface ConfirmActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  tone?: "amber" | "emerald" | "red";
}

const TONE_CLASSES = {
  amber: "bg-amber-500 hover:bg-amber-400 text-slate-950",
  emerald: "bg-emerald-500 hover:bg-emerald-400 text-slate-950",
  red: "bg-red-500 hover:bg-red-400 text-white",
};

export default function ConfirmActionModal({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title,
  description,
  confirmLabel,
  tone = "amber",
}: ConfirmActionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-6 space-y-4 transition-colors">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-full bg-amber-500/10 border border-amber-500/20">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {title}
          </h3>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>

        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-2 disabled:opacity-60 ${TONE_CLASSES[tone]}`}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
