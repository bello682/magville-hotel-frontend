// src/app/(public)/components/GuestReceiptModal.tsx
"use client";

import { X, Receipt as ReceiptIcon } from "lucide-react";

interface GuestPayment {
  id: string;
  amount: number;
  method: "CASH" | "CARD" | "BANK_TRANSFER";
  createdAt: string;
  transactionRef?: string | null;
}

interface GuestReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingRef: string;
  guestName: string;
  roomNumber?: string;
  payments: GuestPayment[];
  totalAmount: number;
  totalPaid: number;
  balanceRemaining: number;
}

const METHOD_LABELS: Record<string, string> = {
  CASH: "Cash",
  CARD: "Card",
  BANK_TRANSFER: "Bank Transfer",
};

export default function GuestReceiptModal({
  isOpen,
  onClose,
  bookingRef,
  guestName,
  roomNumber,
  payments,
  totalAmount,
  totalPaid,
  balanceRemaining,
}: GuestReceiptModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-md bg-dark border border-white/15 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2">
            <ReceiptIcon className="w-4 h-4 text-accent" />
            <span className="text-xs uppercase tracking-widest text-accent font-bold">
              Payment Receipt
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-muted hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          <div className="text-center pb-4 border-b border-dashed border-white/15">
            <p className="font-serif font-bold text-white text-lg">
              MAGVILLE HOTEL & RESORT
            </p>
            <p className="text-[10px] text-muted">
              Victoria Island, Lagos, Nigeria
            </p>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-muted">Booking Ref</span>
              <span className="font-mono font-bold text-accent">
                {bookingRef}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Guest</span>
              <span className="text-white">{guestName}</span>
            </div>
            {roomNumber && (
              <div className="flex justify-between">
                <span className="text-muted">Room</span>
                <span className="text-white">{roomNumber}</span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-dashed border-white/15 space-y-2">
            <p className="text-[10px] uppercase tracking-widest text-muted font-semibold">
              Payment History
            </p>
            {payments.map((p, idx) => (
              <div
                key={p.id ?? `${p.createdAt}-${idx}`}
                className="flex items-center justify-between bg-white/5 border border-white/10 rounded px-3 py-2"
              >
                <div>
                  <p className="text-xs text-white">
                    {METHOD_LABELS[p.method]}
                  </p>
                  <p className="text-[10px] text-muted">
                    {new Date(p.createdAt).toLocaleDateString()}
                    {p.transactionRef && ` • ${p.transactionRef}`}
                  </p>
                </div>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  ₦{p.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-dashed border-white/15 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-muted">Total Amount</span>
              <span className="text-white font-semibold">
                ₦{totalAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Total Paid</span>
              <span className="text-emerald-400 font-semibold">
                ₦{totalPaid.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between pt-1.5 border-t border-white/10">
              <span className="text-muted font-semibold">
                Balance Remaining
              </span>
              <span
                className={`font-bold ${balanceRemaining > 0 ? "text-red-400" : "text-white"}`}
              >
                ₦{balanceRemaining.toLocaleString()}
              </span>
            </div>
          </div>

          <p className="text-center text-[10px] text-muted pt-2">
            Thank you for choosing Magville Hotel & Resort
          </p>
        </div>
      </div>
    </div>
  );
}
