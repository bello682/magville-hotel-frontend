// src/app/(admin)/components/admin/rooms/CreateCategoryModal.tsx
"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";

export interface NewCategoryFormValues {
  name: string;
  description: string;
  basePrice: string;
  capacity: string;
}

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewCategoryFormValues) => void;
  loading?: boolean;
}

const EMPTY_FORM: NewCategoryFormValues = {
  name: "",
  description: "",
  basePrice: "",
  capacity: "2",
};

export default function CreateCategoryModal({
  isOpen,
  onClose,
  onSubmit,
  loading,
}: CreateCategoryModalProps) {
  const [form, setForm] = useState<NewCategoryFormValues>(EMPTY_FORM);

  if (!isOpen) return null;

  const isValid = form.name.trim() && form.basePrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit(form);
  };

  const handleClose = () => {
    setForm(EMPTY_FORM);
    onClose();
  };

  const inputClass =
    "w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 transition";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={handleClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden transition-colors">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            New Room Category
          </h3>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Category Name *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Executive Suite"
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Description
            </label>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Brief description of this category..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                Base Price *
              </label>
              <input
                type="number"
                value={form.basePrice}
                onChange={(e) =>
                  setForm({ ...form, basePrice: e.target.value })
                }
                placeholder="55000"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                Capacity
              </label>
              <input
                type="number"
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                placeholder="2"
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleClose}
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
              ) : (
                "Create Category"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
