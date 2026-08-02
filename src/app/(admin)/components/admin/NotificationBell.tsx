// src/app/(admin)/components/admin/NotificationBell.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Bell, Clock, User, BedDouble } from "lucide-react";
import { adminAxios } from "@/app/(admin)/lib/axiosInstance";
import { useAdminToast } from "../../context/ToastContext";

interface PendingBookingPreview {
  id: string;
  bookingRef: string;
  guestName: string;
  room: { roomNumber: string };
  createdAt: string;
}

const POLL_INTERVAL_MS = 30000;

export default function NotificationBell() {
  const router = useRouter();
  const { showToast } = useAdminToast();
  const [pending, setPending] = useState<PendingBookingPreview[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const previousCountRef = useRef<number | null>(null); // 🔧 was missing

  const fetchPending = async () => {
    try {
      const { data } = await adminAxios.get("/bookings", {
        params: { status: "PENDING" },
      });
      const newPending: PendingBookingPreview[] = data.data.bookings || [];

      if (
        previousCountRef.current !== null &&
        newPending.length > previousCountRef.current
      ) {
        const diff = newPending.length - previousCountRef.current;
        const latest = newPending[0];
        showToast(
          "info",
          diff === 1 ? "New Booking Request" : `${diff} New Booking Requests`,
          latest ? `${latest.guestName} — ${latest.bookingRef}` : undefined,
        );
      }
      previousCountRef.current = newPending.length;
      setPending(newPending);
    } catch {
      // silent
    }
  }; // 🔧 removed the stray extra closing brace that was here

  useEffect(() => {
    fetchPending();
    const interval = setInterval(fetchPending, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleViewAll = () => {
    setIsOpen(false);
    router.push("/admin/bookings?status=PENDING");
  };

  const timeAgo = (dateStr: string) => {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4" />
        {pending.length > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
            {pending.length > 9 ? "9+" : pending.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Pending Requests
            </h4>
            {pending.length > 0 && (
              <span className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full font-semibold">
                {pending.length} new
              </span>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {pending.length === 0 ? (
              <p className="px-4 py-8 text-center text-xs text-slate-400 dark:text-slate-500">
                No pending requests right now.
              </p>
            ) : (
              pending.slice(0, 6).map((booking) => (
                <button
                  key={booking.id}
                  onClick={handleViewAll}
                  className="w-full text-left px-4 py-3 border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-semibold text-amber-600 dark:text-amber-400">
                      {booking.bookingRef}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {timeAgo(booking.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" /> {booking.guestName}
                    </span>
                    <span className="flex items-center gap-1">
                      <BedDouble className="w-3 h-3" /> Room{" "}
                      {booking.room.roomNumber}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>

          {pending.length > 0 && (
            <button
              onClick={handleViewAll}
              className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition border-t border-slate-200 dark:border-slate-800"
            >
              View All Pending Requests
            </button>
          )}
        </div>
      )}
    </div>
  );
}
