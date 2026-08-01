// src/app/(admin)/components/admin/payments/PaymentHistoryModal.tsx
"use client";

import { X } from "lucide-react";
import { Payment } from "@/app/(admin)/types/payment";
import PaymentMethodBadge from "./PaymentMethodBadge";

interface PaymentHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingRef: string | null;
  totalAmount: number;
  payments: Payment[];
}

export default function PaymentHistoryModal({
  isOpen,
  onClose,
  bookingRef,
  totalAmount,
  payments,
}: PaymentHistoryModalProps) {
  if (!isOpen) return null;

  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const balanceRemaining = totalAmount - totalPaid;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden transition-colors my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold">
              Payment History
            </p>
            <p className="text-lg font-mono font-bold text-amber-500">
              {bookingRef}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-center">
              <p className="text-slate-500 dark:text-slate-400 uppercase font-semibold mb-1">
                Total
              </p>
              <p className="font-bold text-slate-900 dark:text-white">
                ₦{totalAmount.toLocaleString()}
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-center">
              <p className="text-slate-500 dark:text-slate-400 uppercase font-semibold mb-1">
                Paid
              </p>
              <p className="font-bold text-emerald-600 dark:text-emerald-400">
                ₦{totalPaid.toLocaleString()}
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-center">
              <p className="text-slate-500 dark:text-slate-400 uppercase font-semibold mb-1">
                Balance
              </p>
              <p
                className={`font-bold ${balanceRemaining > 0 ? "text-red-500" : "text-slate-900 dark:text-white"}`}
              >
                ₦{balanceRemaining.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {payments.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-6">
                No payments recorded yet.
              </p>
            ) : (
              payments.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3"
                >
                  <div>
                    <PaymentMethodBadge method={p.method} />
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      {new Date(p.createdAt).toLocaleString()}
                      {p.transactionRef && ` • ${p.transactionRef}`}
                    </p>
                  </div>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    ₦{p.amount.toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
