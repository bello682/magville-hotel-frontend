// src/app/(admin)/components/admin/guests/GuestDetailModal.tsx
"use client";
import { useState, useEffect } from "react";
import { X, Phone, Mail, IdCard, Crown, Ban, Loader2 } from "lucide-react";
import { GuestProfile, GuestTag } from "@/app/(admin)/types/guest";

interface GuestDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  guest: GuestProfile | null;
  onSave: (updates: { tag?: GuestTag; notes?: string }) => void;
  saving: boolean;
}

export default function GuestDetailModal({
  isOpen,
  onClose,
  guest,
  onSave,
  saving,
}: GuestDetailModalProps) {
  const [tag, setTag] = useState<GuestTag>("NONE");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (guest) {
      setTag(guest.tag);
      setNotes(guest.notes || "");
    }
  }, [guest]);

  if (!isOpen || !guest) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {guest.fullName}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <Phone className="w-3.5 h-3.5 text-amber-500" /> {guest.phone}
            </div>
            {guest.email && (
              <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                <Mail className="w-3.5 h-3.5 text-amber-500" /> {guest.email}
              </div>
            )}
            {guest.idType && (
              <div className="flex items-center gap-2 text-slate-900 dark:text-white sm:col-span-2">
                <IdCard className="w-3.5 h-3.5 text-amber-500" /> {guest.idType}
                : {guest.idNumber}
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3">
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {guest.totalBookings}
              </p>
              <p className="text-[10px] uppercase text-slate-500 dark:text-slate-400">
                Bookings
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3">
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {guest.totalStays}
              </p>
              <p className="text-[10px] uppercase text-slate-500 dark:text-slate-400">
                Stays
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3">
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                ₦{guest.totalSpent.toLocaleString()}
              </p>
              <p className="text-[10px] uppercase text-slate-500 dark:text-slate-400">
                Spent
              </p>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Guest Tag
            </label>
            <div className="flex gap-2">
              {(["NONE", "VIP", "BLACKLISTED"] as GuestTag[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold uppercase transition border ${
                    tag === t
                      ? t === "VIP"
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400"
                        : t === "BLACKLISTED"
                          ? "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
                          : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                      : "border-slate-200 dark:border-slate-800 text-slate-400 hover:border-slate-300"
                  }`}
                >
                  {t === "VIP" && <Crown className="w-3.5 h-3.5" />}
                  {t === "BLACKLISTED" && <Ban className="w-3.5 h-3.5" />}
                  {t === "NONE" ? "None" : t === "VIP" ? "VIP" : "Blacklisted"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Internal Staff Notes
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Prefers high floor, allergic to feathers..."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500/50 resize-none transition"
            />
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-2">
              Booking History
            </h4>
            {guest.bookings.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-4">
                No bookings yet.
              </p>
            ) : (
              <div className="space-y-2">
                {guest.bookings.map((b) => (
                  <div
                    key={b.id}
                    className="flex justify-between items-center text-xs border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2"
                  >
                    <div>
                      <span className="font-mono text-amber-600 dark:text-amber-400">
                        {b.bookingRef}
                      </span>
                      <span className="text-slate-400 ml-2">
                        Room {b.room.roomNumber}
                      </span>
                    </div>
                    <span className="text-slate-500 dark:text-slate-400">
                      {b.status.replace("_", " ")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => onSave({ tag, notes })}
            disabled={saving}
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
