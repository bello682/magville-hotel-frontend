// src/app/(admin)/components/admin/payments/RecordPaymentModal.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { X, Loader2, Search } from "lucide-react";
import {
  PaymentBookingLookup,
  PaymentMethod,
} from "@/app/(admin)/types/payment";

export interface RecordPaymentFormValues {
  bookingId: string;
  amount: string;
  method: PaymentMethod;
  transactionRef: string;
}

interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    values: RecordPaymentFormValues,
    bookingRef: string,
    guestName: string,
  ) => void;
  bookingLookupResults: PaymentBookingLookup[];
  onSearchBookings: (query: string) => void;
  loading?: boolean;
  preselectedBooking?: PaymentBookingLookup | null;
}

export default function RecordPaymentModal({
  isOpen,
  onClose,
  onSubmit,
  bookingLookupResults,
  onSearchBookings,
  loading,
  preselectedBooking,
}: RecordPaymentModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] =
    useState<PaymentBookingLookup | null>(null);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("CASH");
  const [transactionRef, setTransactionRef] = useState("");
  const [amountError, setAmountError] = useState("");

  const parsedAmount = Number(amount) || 0;

  const newBalance = useMemo(() => {
    if (!selectedBooking) return null;
    return selectedBooking.balanceRemaining - parsedAmount;
  }, [selectedBooking, parsedAmount]);

  useEffect(() => {
    if (preselectedBooking) setSelectedBooking(preselectedBooking);
  }, [preselectedBooking]);
  const handleAmountChange = (value: string) => {
    setAmount(value);
    if (!selectedBooking) return;

    const num = Number(value);
    if (num <= 0) {
      setAmountError("Amount must be greater than zero");
    } else if (num > selectedBooking.balanceRemaining) {
      setAmountError(
        `Exceeds remaining balance of ₦${selectedBooking.balanceRemaining.toLocaleString()}`,
      );
    } else {
      setAmountError("");
    }
  };

  const isValid =
    selectedBooking &&
    parsedAmount > 0 &&
    parsedAmount <= selectedBooking.balanceRemaining &&
    !amountError;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !selectedBooking) return;
    onSubmit(
      {
        bookingId: selectedBooking.id,
        amount,
        method,
        transactionRef,
      },
      selectedBooking.bookingRef,
      selectedBooking.guestName,
    );
  };

  const handleClose = () => {
    setSearchQuery("");
    setSelectedBooking(null);
    setAmount("");
    setMethod("CASH");
    setTransactionRef("");
    setAmountError("");
    onClose();
  };

  if (!isOpen) return null;

  const inputClass =
    "w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 transition";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="absolute inset-0" onClick={handleClose} />
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden transition-colors my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Record Payment
          </h3>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Booking lookup */}
          {!selectedBooking ? (
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                Find Booking *
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    onSearchBookings(e.target.value);
                  }}
                  placeholder="Search by booking ref or guest name..."
                  className={`${inputClass} pl-9`}
                />
              </div>

              {bookingLookupResults.length > 0 && (
                <div className="mt-2 border border-slate-200 dark:border-slate-800 rounded-lg divide-y divide-slate-100 dark:divide-slate-800 max-h-48 overflow-y-auto">
                  {bookingLookupResults.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => {
                        setSelectedBooking(b);
                        setSearchQuery("");
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                    >
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {b.guestName}{" "}
                        <span className="font-mono text-amber-500 text-xs">
                          {b.bookingRef}
                        </span>
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Balance: ₦{b.balanceRemaining.toLocaleString()}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {selectedBooking.guestName}
                </p>
                <p className="text-xs font-mono text-amber-500">
                  {selectedBooking.bookingRef}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="text-xs text-slate-400 hover:text-slate-900 dark:hover:text-white underline"
              >
                Change
              </button>
            </div>
          )}

          {selectedBooking && (
            <>
              {/* Live balance display */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3">
                  <p className="text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mb-1">
                    Current Balance
                  </p>
                  <p className="text-base font-bold text-slate-900 dark:text-white">
                    ₦{selectedBooking.balanceRemaining.toLocaleString()}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3">
                  <p className="text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mb-1">
                    Balance After Payment
                  </p>
                  <p
                    className={`text-base font-bold ${
                      newBalance !== null && newBalance < 0
                        ? "text-red-500"
                        : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    ₦{Math.max(newBalance ?? 0, 0).toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                  Amount Received *
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  placeholder="0.00"
                  className={`${inputClass} ${amountError ? "border-red-500" : ""}`}
                />
                {amountError && (
                  <p className="text-red-500 text-[11px] mt-1">{amountError}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                    Payment Method
                  </label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value as PaymentMethod)}
                    className={inputClass}
                  >
                    <option value="CASH">Cash</option>
                    <option value="CARD">Card</option>
                    <option value="BANK_TRANSFER">Bank Transfer</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                    Transaction Ref
                  </label>
                  <input
                    type="text"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    placeholder="Optional"
                    className={inputClass}
                  />
                </div>
              </div>
            </>
          )}

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
                "Record Payment"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
