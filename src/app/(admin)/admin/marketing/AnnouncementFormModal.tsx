// src/app/(admin)/components/admin/marketing/AnnouncementFormModal.tsx
"use client";

import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import {
  Announcement,
  AnnouncementStatus,
} from "@/app/(admin)/types/marketing";
import ImageUrlOrUploadInput from "../../shared/ImageUrlOrUploadInput";

export interface AnnouncementFormValues {
  title: string;
  message: string;
  imageUrl: string;
  ctaText: string;
  ctaUrl: string;
  status: AnnouncementStatus;
}

interface AnnouncementFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AnnouncementFormValues) => void;
  editingAnnouncement: Announcement | null;
  loading?: boolean;
}

const EMPTY_FORM: AnnouncementFormValues = {
  title: "",
  message: "",
  imageUrl: "",
  ctaText: "",
  ctaUrl: "",
  status: "DRAFT",
};

export default function AnnouncementFormModal({
  isOpen,
  onClose,
  onSubmit,
  editingAnnouncement,
  loading,
}: AnnouncementFormModalProps) {
  const [form, setForm] = useState<AnnouncementFormValues>(EMPTY_FORM);

  useEffect(() => {
    if (editingAnnouncement) {
      setForm({
        title: editingAnnouncement.title,
        message: editingAnnouncement.message,
        imageUrl: editingAnnouncement.imageUrl || "",
        ctaText: editingAnnouncement.ctaText || "",
        ctaUrl: editingAnnouncement.ctaUrl || "",
        status: editingAnnouncement.status,
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editingAnnouncement, isOpen]);

  if (!isOpen) return null;

  const isValid = form.title.trim() && form.message.trim();
  const inputClass =
    "w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 transition";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden transition-colors my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {editingAnnouncement ? "Edit Alert" : "New Public Alert"}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Weekend Getaway Special"
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Message *
            </label>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="20% off all suites this weekend..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <ImageUrlOrUploadInput
              label="Image"
              value={form.imageUrl}
              onChange={(url) => setForm({ ...form, imageUrl: url })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                CTA Text
              </label>
              <input
                type="text"
                value={form.ctaText}
                onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
                placeholder="Book Now"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                CTA URL
              </label>
              <input
                type="text"
                value={form.ctaUrl}
                onChange={(e) => setForm({ ...form, ctaUrl: e.target.value })}
                placeholder="/rooms"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as AnnouncementStatus,
                })
              }
              className={inputClass}
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition mt-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid || loading}
              className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : editingAnnouncement ? (
                "Save Changes"
              ) : (
                "Create Alert"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
