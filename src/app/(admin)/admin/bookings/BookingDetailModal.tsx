// src/app/(admin)/components/admin/bookings/BookingDetailModal.tsx
"use client";

import {
  X,
  User,
  Mail,
  Phone,
  Calendar,
  BedDouble,
  CreditCard,
  FileText,
  IdCard,
} from "lucide-react";
import { Booking } from "@/app/(admin)/types/booking";
import BookingStatusBadge from "./BookingStatusBadge";

interface BookingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
}

export default function BookingDetailModal({
  isOpen,
  onClose,
  booking,
}: BookingDetailModalProps) {
  if (!isOpen || !booking) return null;

  const totalPaid = booking.payments.reduce((sum, p) => sum + p.amount, 0);
  const balanceRemaining = booking.totalAmount - totalPaid;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden transition-colors my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold">
              Booking Reference
            </p>
            <p className="text-lg font-mono font-bold text-amber-500">
              {booking.bookingRef}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <BookingStatusBadge status={booking.status} />
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Guest Info */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-3">
              Guest Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                <User className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                {booking.guestName}
              </div>
              <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                {booking.guestPhone}
              </div>
              {booking.guestEmail && (
                <div className="flex items-center gap-2 text-slate-900 dark:text-white sm:col-span-2">
                  <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  {booking.guestEmail}
                </div>
              )}
              {booking.guest.idType && (
                <div className="flex items-center gap-2 text-slate-900 dark:text-white sm:col-span-2">
                  <IdCard className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  {booking.guest.idType}: {booking.guest.idNumber}
                </div>
              )}
            </div>
          </div>

          {/* Stay Details */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-3">
              Stay Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                <BedDouble className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                Room {booking.room.roomNumber}
                {booking.room.category && ` — ${booking.room.category.name}`}
              </div>
              <div />
              <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                Check-In: {new Date(booking.checkInDate).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                Check-Out: {new Date(booking.checkOutDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Rejection Reason (only if rejected) */}
          {booking.status === "REJECTED" && booking.rejectionReason && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-600 dark:text-red-400">
              <span className="font-semibold">Rejection Reason: </span>
              {booking.rejectionReason}
            </div>
          )}

          {/* Notes */}
          {booking.notes && (
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Guest Notes
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3">
                {booking.notes}
              </p>
            </div>
          )}

          {/* Payment Summary */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5" /> Payment Summary
            </h4>
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden text-sm">
              <div className="flex justify-between px-4 py-2.5 border-b border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">
                  Total Amount
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  ₦{booking.totalAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between px-4 py-2.5 border-b border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">
                  Total Paid
                </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  ₦{totalPaid.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between px-4 py-2.5">
                <span className="text-slate-500 dark:text-slate-400">
                  Balance Remaining
                </span>
                <span
                  className={`font-semibold ${
                    balanceRemaining > 0
                      ? "text-red-500"
                      : "text-slate-900 dark:text-white"
                  }`}
                >
                  ₦{balanceRemaining.toLocaleString()}
                </span>
              </div>
            </div>

            {booking.payments.length > 0 && (
              <div className="mt-3 space-y-2">
                {booking.payments.map((p) => (
                  <div
                    key={p.id}
                    className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 px-1"
                  >
                    <span className="capitalize">
                      {p.method.replace("_", " ").toLowerCase()} •{" "}
                      {new Date(p.createdAt).toLocaleDateString()}
                    </span>
                    <span className="font-mono text-slate-900 dark:text-white">
                      ₦{p.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
