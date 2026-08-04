// src/app/(admin)/components/admin/inventory/StockMovementModal.tsx
"use client";
import { useState } from "react";
import { X, Loader2, Plus, Minus } from "lucide-react";
import { InventoryItem } from "@/app/(admin)/types/inventory";

interface StockMovementModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: InventoryItem | null;
  onSubmit: (quantity: number, reason: string) => void;
  loading: boolean;
}

export default function StockMovementModal({
  isOpen,
  onClose,
  item,
  onSubmit,
  loading,
}: StockMovementModalProps) {
  const [mode, setMode] = useState<"restock" | "deduct">("restock");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  if (!isOpen || !item) return null;

  const handleSubmit = () => {
    const qty = Number(amount);
    if (!qty || qty <= 0) return;
    onSubmit(mode === "restock" ? qty : -qty, reason);
    setAmount("");
    setReason("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {item.name}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Current stock:{" "}
          <span className="font-bold text-slate-900 dark:text-white">
            {item.currentStock} {item.unit}
          </span>
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setMode("restock")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold uppercase transition ${mode === "restock" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30" : "border border-slate-200 dark:border-slate-800 text-slate-500"}`}
          >
            <Plus className="w-3.5 h-3.5" /> Restock
          </button>
          <button
            onClick={() => setMode("deduct")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold uppercase transition ${mode === "deduct" ? "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30" : "border border-slate-200 dark:border-slate-800 text-slate-500"}`}
          >
            <Minus className="w-3.5 h-3.5" /> Deduct
          </button>
        </div>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={`Quantity (${item.unit})`}
          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500/50"
        />
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason (optional)"
          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500/50"
        />

        <button
          onClick={handleSubmit}
          disabled={!amount || loading}
          className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm"}
        </button>
      </div>
    </div>
  );
}
