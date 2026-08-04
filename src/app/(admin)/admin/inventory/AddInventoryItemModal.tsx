// src/app/(admin)/components/admin/inventory/AddInventoryItemModal.tsx
"use client";
import { useState } from "react";
import { X, Loader2 } from "lucide-react";

export interface NewInventoryItemValues {
  name: string;
  category: string;
  currentStock: string;
  minThreshold: string;
  unit: string;
}

interface AddInventoryItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewInventoryItemValues) => void;
  loading: boolean;
}

const EMPTY_FORM: NewInventoryItemValues = {
  name: "",
  category: "LINEN",
  currentStock: "0",
  minThreshold: "5",
  unit: "pcs",
};

export default function AddInventoryItemModal({
  isOpen,
  onClose,
  onSubmit,
  loading,
}: AddInventoryItemModalProps) {
  const [form, setForm] = useState<NewInventoryItemValues>(EMPTY_FORM);
  if (!isOpen) return null;

  const inputClass =
    "w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500/50 transition";
  const isValid = form.name.trim().length > 0;

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit(form);
    setForm(EMPTY_FORM);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            New Inventory Item
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
            Item Name *
          </label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Bath Towels"
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
            Category
          </label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className={inputClass}
          >
            <option value="LINEN">Linen</option>
            <option value="TOILETRIES">Toiletries</option>
            <option value="FOOD_BEVERAGE">Food & Beverage</option>
            <option value="CLEANING_SUPPLIES">Cleaning Supplies</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Stock
            </label>
            <input
              type="number"
              value={form.currentStock}
              onChange={(e) =>
                setForm({ ...form, currentStock: e.target.value })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Min
            </label>
            <input
              type="number"
              value={form.minThreshold}
              onChange={(e) =>
                setForm({ ...form, minThreshold: e.target.value })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Unit
            </label>
            <input
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
              placeholder="pcs"
              className={inputClass}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isValid || loading}
          className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add Item"}
        </button>
      </div>
    </div>
  );
}
