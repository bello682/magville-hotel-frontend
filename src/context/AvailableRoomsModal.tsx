"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Calendar, ArrowRight, Eye } from "lucide-react";

interface AvailableRoomsModalProps {
  isOpen: boolean;
  onClose: () => void;
  rooms: any[];
  checkIn: string;
  checkOut: string;
  onSelectRoom: (roomData: any) => void;
}

export default function AvailableRoomsModal({
  isOpen,
  onClose,
  rooms,
  checkIn,
  checkOut,
  onSelectRoom,
}: AvailableRoomsModalProps) {
  if (!isOpen) return null;

  const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-dark border border-white/15 shadow-2xl overflow-hidden text-main z-10 flex flex-col max-h-[85vh] md:max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 md:p-6 border-b border-white/10 bg-black/60 shrink-0">
            <div>
              <span className="text-accent text-[10px] uppercase tracking-[0.25em] font-semibold block">
                Search Results
              </span>
              <h3 className="text-xl md:text-2xl font-serif text-white">
                Available Accommodations ({rooms?.length || 0})
              </h3>
              <div className="flex items-center gap-3 text-xs text-muted mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-accent" />{" "}
                  {checkIn || "N/A"} to {checkOut || "N/A"}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="p-2 text-muted hover:text-accent bg-white/5 hover:bg-white/10 rounded-full transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Grid of Available Rooms */}
          <div className="p-4 md:p-6 overflow-y-auto min-h-0 flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {rooms?.map((room: any) => {
              const getRoomImage = () => {
                if (
                  typeof room.image === "string" &&
                  room.image.trim() !== ""
                ) {
                  return room.image;
                }
                const firstImg = room.images?.[0] || room.photos?.[0];
                if (typeof firstImg === "string" && firstImg.trim() !== "")
                  return firstImg;
                if (firstImg?.url) return firstImg.url;
                if (firstImg?.src) return firstImg.src;
                if (typeof room.category?.image === "string")
                  return room.category.image;
                return DEFAULT_IMAGE;
              };

              const mainImage = getRoomImage();
              const roomId = room._id || room.id || room.slug;
              const roomTitle =
                room.name ||
                room.title ||
                room.roomNumber ||
                room.category?.name ||
                "Luxury Suite";
              const roomPrice = Number(
                room.price || room.pricePerNight || room.category?.price || 0,
              );

              // Standardized room payload structure
              const normalizedRoom = {
                ...room,
                id: roomId,
                _id: roomId,
                name: roomTitle,
                title: roomTitle,
                price: roomPrice,
                pricePerNight: roomPrice,
                image: mainImage,
                images: [mainImage],
              };

              return (
                <div
                  key={roomId || Math.random()}
                  className="group border border-white/10 bg-black/50 hover:border-accent/40 transition-all flex flex-col justify-between overflow-hidden rounded-sm min-h-[380px]"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-white/5 shrink-0">
                    <Image
                      src={mainImage}
                      alt={roomTitle}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-dark/90 px-3 py-1 border border-white/10 text-xs font-mono text-accent shadow-md">
                      ₦{roomPrice ? roomPrice.toLocaleString() : "N/A"} / night
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-serif text-white group-hover:text-accent transition-colors">
                        {roomTitle}
                      </h4>
                      <p className="text-xs text-muted line-clamp-2 mt-2 leading-relaxed">
                        {room.description ||
                          room.category?.description ||
                          "Experience comfort and elegance with premium amenities."}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                      <Link
                        href={roomId ? `/rooms/${roomId}` : "/rooms"}
                        target="_blank"
                        className="px-3 py-2 border border-white/20 text-white/80 hover:text-white hover:border-accent/50 text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-accent" />
                        <span>Details</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          onSelectRoom({
                            room: normalizedRoom,
                            checkIn,
                            checkOut,
                          })
                        }
                        className="bg-accent text-dark px-4 py-2 text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 hover:brightness-110 transition-all cursor-pointer shadow-md"
                      >
                        <span>Select & Reserve</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
