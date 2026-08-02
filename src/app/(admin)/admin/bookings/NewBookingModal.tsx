// src/app/(admin)/components/admin/bookings/NewBookingModal.tsx
"use client";

import { useState } from "react";
import { X, Loader2, User, Mail, Phone, Calendar, IdCard } from "lucide-react";

export interface NewBookingFormValues {
  roomId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  idType: string;
  idNumber: string;
  checkInDate: string;
  checkOutDate: string;
  notes: string;
  isDirectCheckIn: boolean;
}

interface RoomOption {
  id: string;
  roomNumber: string;
  category?: { name: string };
}

interface NewBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewBookingFormValues) => void;
  rooms: RoomOption[];
  loading?: boolean;
}

const EMPTY_FORM: NewBookingFormValues = {
  roomId: "",
  guestName: "",
  guestEmail: "",
  guestPhone: "",
  idType: "Passport",
  idNumber: "",
  checkInDate: "",
  checkOutDate: "",
  notes: "",
  isDirectCheckIn: false,
};

export default function NewBookingModal({
  isOpen,
  onClose,
  onSubmit,
  rooms,
  loading,
}: NewBookingModalProps) {
  const [form, setForm] = useState<NewBookingFormValues>(EMPTY_FORM);

  if (!isOpen) return null;

  const handleChange = (
    field: keyof NewBookingFormValues,
    value: string | boolean,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isValid =
    form.roomId &&
    form.guestName &&
    form.guestPhone &&
    form.checkInDate &&
    form.checkOutDate;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit(form);
  };

  const handleClose = () => {
    setForm(EMPTY_FORM);
    onClose();
  };

  const inputClass =
    "w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 transition";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="absolute inset-0" onClick={handleClose} />
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden transition-colors my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            New Booking (On Behalf of Guest)
          </h3>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5 max-h-[75vh] overflow-y-auto"
        >
          {/* Room */}
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Select Room *
            </label>
            <select
              value={form.roomId}
              onChange={(e) => handleChange("roomId", e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500/50 transition"
            >
              <option value="">Choose a room...</option>
              {rooms.map(
                (room) => (
                  console.log(room),
                  (
                    <option key={room.id} value={room.id}>
                      Room {room.roomNumber}
                      {room.category ? ` — ${room.category.name}` : ""}
                    </option>
                  )
                ),
              )}
            </select>
          </div>

          {/* Guest Name */}
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Guest Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={form.guestName}
                onChange={(e) => handleChange("guestName", e.target.value)}
                placeholder="e.g. Chief Alexander Cole"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={form.guestEmail}
                  onChange={(e) => handleChange("guestEmail", e.target.value)}
                  placeholder="guest@email.com"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={form.guestPhone}
                  onChange={(e) => handleChange("guestPhone", e.target.value)}
                  placeholder="+234 800 000 0000"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                ID Type
              </label>
              <select
                value={form.idType}
                onChange={(e) => handleChange("idType", e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500/50 transition"
              >
                <option>Passport</option>
                <option>Driver License</option>
                <option>NIN</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                ID Number
              </label>
              <div className="relative">
                <IdCard className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={form.idNumber}
                  onChange={(e) => handleChange("idNumber", e.target.value)}
                  placeholder="e.g. A12345678"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                Check-In Date *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={form.checkInDate}
                  onChange={(e) => handleChange("checkInDate", e.target.value)}
                  className={`${inputClass} [color-scheme:light] dark:[color-scheme:dark]`}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                Check-Out Date *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={form.checkOutDate}
                  onChange={(e) => handleChange("checkOutDate", e.target.value)}
                  className={`${inputClass} [color-scheme:light] dark:[color-scheme:dark]`}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Notes / Special Requests
            </label>
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="e.g. Airport pickup, late check-in..."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 resize-none transition"
            />
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isDirectCheckIn}
              onChange={(e) =>
                handleChange("isDirectCheckIn", e.target.checked)
              }
              className="w-4 h-4 accent-amber-500"
            />
            <span className="text-sm text-slate-700 dark:text-slate-300">
              Check in guest immediately (walk-in / front desk)
            </span>
          </label>

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
                "Create Booking"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
