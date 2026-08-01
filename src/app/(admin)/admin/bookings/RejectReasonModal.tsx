// src/app/(admin)/components/admin/bookings/RejectReasonModal.tsx
"use client";

import { useState } from "react";
import { XCircle, Loader2, X } from "lucide-react";

interface RejectReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  loading?: boolean;
}

export default function RejectReasonModal({
  isOpen,
  onClose,
  onConfirm,
  loading,
}: RejectReasonModalProps) {
  const [reason, setReason] = useState("");
  const [touched, setTouched] = useState(false);

  if (!isOpen) return null;

  const isInvalid = touched && reason.trim().length === 0;

  const handleConfirm = () => {
    setTouched(true);
    if (reason.trim().length === 0) return;
    onConfirm(reason.trim());
  };

  const handleClose = () => {
    setReason("");
    setTouched(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={handleClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-6 space-y-4 transition-colors">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-full bg-red-500/10 border border-red-500/20">
            <XCircle className="w-5 h-5 text-red-500" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Reject Booking Request
          </h3>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Please provide a reason. This will be included in the email sent to
          the guest.
        </p>

        <div>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. No rooms available for the selected dates in this category"
            className={`w-full bg-slate-50 dark:bg-slate-950 border rounded-lg p-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none resize-none transition ${
              isInvalid
                ? "border-red-500 focus:border-red-500"
                : "border-slate-200 dark:border-slate-800 focus:border-amber-500/50"
            }`}
          />
          {isInvalid && (
            <p className="text-red-500 text-[11px] mt-1">
              A rejection reason is required.
            </p>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleClose}
            className="flex-1 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 bg-red-500 hover:bg-red-400 text-white py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Reject Booking"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
