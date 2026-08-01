// src/app/(admin)/components/admin/rooms/RoomDetailModal.tsx
"use client";

import { useState } from "react";
import { X, Users, BedDouble, ImageOff } from "lucide-react";
import { Room } from "@/app/(admin)/types/room";
import RoomStatusBadge from "./RoomStatusBadge";

interface RoomDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: Room | null;
}

export default function RoomDetailModal({
  isOpen,
  onClose,
  room,
}: RoomDetailModalProps) {
  const [activeImage, setActiveImage] = useState(0);

  if (!isOpen || !room) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden transition-colors my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold">
              Room
            </p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              Room {room.roomNumber}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <RoomStatusBadge status={room.status} />
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Media Gallery */}
          <div>
            {room.images.length > 0 ? (
              <>
                <div className="w-full h-64 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={room.images[activeImage]}
                    alt={`Room ${room.roomNumber}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {room.images.length > 1 && (
                  <div className="flex gap-2 mt-2 overflow-x-auto">
                    {room.images.map((img, idx) => (
                      <button
                        key={img}
                        onClick={() => setActiveImage(idx)}
                        className={`w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition ${
                          idx === activeImage
                            ? "border-amber-500"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-64 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <ImageOff className="w-8 h-8 text-slate-400" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <BedDouble className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              {room.category.name}
            </div>
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <Users className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              Up to {room.category.capacity} guests
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
              Price Per Night
            </span>
            <span className="text-xl font-bold text-amber-500">
              ₦{room.pricePerNight.toLocaleString()}
            </span>
          </div>

          {room.description && (
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-2">
                Description
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {room.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
