// src/app/(admin)/components/admin/bookings/BookingsTable.tsx
"use client";

import { Eye, CheckCircle2, XCircle, LogIn, LogOut } from "lucide-react";
import { Booking } from "@/app/(admin)/types/booking";
import BookingStatusBadge from "./BookingStatusBadge";
import GuestTagBadge from "../guests/GuestTagBadge";

interface BookingsTableProps {
  bookings: Booking[];
  onViewDetail: (booking: Booking) => void;
  onApprove: (booking: Booking) => void;
  onReject: (booking: Booking) => void;
  onCheckIn: (booking: Booking) => void;
  onCheckOut: (booking: Booking) => void;
}

export default function BookingsTable({
  bookings,
  onViewDetail,
  onApprove,
  onReject,
  onCheckIn,
  onCheckOut,
}: BookingsTableProps) {
  if (bookings.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-10 text-center text-sm text-slate-400 dark:text-slate-500 transition-colors">
        No bookings match your current filters.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
              {["Reference", "Guest", "Room", "Dates", "Status", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <td className="px-5 py-3.5 font-mono text-xs font-semibold text-amber-600 dark:text-amber-400">
                  {booking.bookingRef}
                </td>
                <td className="px-5 py-3.5">
                  <p className="font-medium text-slate-900 dark:text-white">
                    {booking.guestName}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {booking.guestPhone}
                  </p>
                  {booking.guest?.tag && booking.guest.tag !== "NONE" && (
                    <div className="mt-1">
                      <GuestTagBadge tag={booking.guest.tag} />
                    </div>
                  )}
                </td>
                <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">
                  Room {booking.room.roomNumber}
                </td>
                <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">
                  {new Date(booking.checkInDate).toLocaleDateString()} —{" "}
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </td>
                <td className="px-5 py-3.5">
                  <BookingStatusBadge status={booking.status} />
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewDetail(booking)}
                      title="View Details"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {booking.status === "PENDING" && (
                      <>
                        <button
                          onClick={() => onApprove(booking)}
                          title="Approve"
                          className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-500/10 transition"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onReject(booking)}
                          title="Reject"
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    {booking.status === "APPROVED" && (
                      <button
                        onClick={() => onCheckIn(booking)}
                        disabled={
                          !booking.payments || booking.payments.length === 0
                        }
                        title={
                          !booking.payments || booking.payments.length === 0
                            ? "Payment required before check-in"
                            : "Check In"
                        }
                        className="p-1.5 rounded-lg text-sky-500 hover:bg-sky-500/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <LogIn className="w-4 h-4" />
                      </button>
                    )}
                    {booking.status === "CHECKED_IN" && (
                      <button
                        onClick={() => onCheckOut(booking)}
                        title="Check Out"
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-500/10 transition"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
