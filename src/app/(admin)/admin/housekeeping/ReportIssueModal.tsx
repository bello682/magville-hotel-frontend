// src/app/(admin)/components/admin/housekeeping/ReportIssueModal.tsx
"use client";
import { useState } from "react";
import { X, Loader2 } from "lucide-react";

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (description: string) => void;
  roomNumber?: string;
  loading?: boolean;
}

export default function ReportIssueModal({
  isOpen,
  onClose,
  onSubmit,
  roomNumber,
  loading,
}: ReportIssueModalProps) {
  const [description, setDescription] = useState("");
  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!description.trim()) return;
    onSubmit(description.trim());
    setDescription("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Report Issue — Room {roomNumber}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. AC not cooling, leaking faucet in bathroom..."
          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500/50 resize-none transition"
        />
        <button
          onClick={handleSubmit}
          disabled={!description.trim() || loading}
          className="w-full bg-red-500 hover:bg-red-400 text-white py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Submit Report"
          )}
        </button>
      </div>
    </div>
  );
}
