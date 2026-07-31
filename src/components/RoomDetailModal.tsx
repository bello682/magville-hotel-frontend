"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Loader2,
  Sparkles,
  BedDouble,
  Check,
  Building,
  CalendarCheck,
  Play,
} from "lucide-react";

import {
  Room,
  getRoomId,
  getRoomCategory,
  getRoomFeatures,
  getRoomPrice,
  getAllRoomMedia,
  getPrimaryImage,
  isVideoUrl,
} from "../app/(public)/rooms/types";

import { fetchRoomDetails } from "../store/redux/actions/publicActions";

interface RoomDetailModalProps {
  room: Room | null;
  onClose: () => void;
  onProceedToBooking?: (room: Room) => void;
}

export default function RoomDetailModal({
  room,
  onClose,
  onProceedToBooking,
}: RoomDetailModalProps) {
  const dispatch = useDispatch<any>();

  const roomId = room ? getRoomId(room) : null;
  const isOpen = Boolean(room);

  const roomState = useSelector((state: any) => state.public || {});
  const selectedRoom: Room | null = roomState.selectedRoom || room;
  const roomLoading = roomState.loading || false;

  // Track currently active media selection
  const [activeMedia, setActiveMedia] = useState<string | null>(null);
  const [videoError, setVideoError] = useState(false);

  // Safely gather all media, explicitly checking room.videoUrl as well
  const allMedia: string[] = React.useMemo(() => {
    if (!selectedRoom) return [];

    // First try the helper
    let media = getAllRoomMedia(selectedRoom);

    // Explicit fallback: if room.videoUrl exists and wasn't included by helper
    const rawVideo = (selectedRoom as any)?.videoUrl;
    if (rawVideo && !media.includes(rawVideo)) {
      media = [...media, rawVideo];
    }

    return media;
  }, [selectedRoom]);

  // Fetch full room details when modal opens
  useEffect(() => {
    if (isOpen && roomId) {
      dispatch(fetchRoomDetails(roomId));
    }
  }, [isOpen, roomId, dispatch]);

  // Set active media when room or media list updates
  useEffect(() => {
    if (allMedia.length > 0) {
      setActiveMedia((prev) =>
        prev && allMedia.includes(prev) ? prev : allMedia[0],
      );
    }
  }, [allMedia]);

  // Reset video error when activeMedia changes
  useEffect(() => {
    setVideoError(false);
  }, [activeMedia]);

  if (!isOpen || !selectedRoom) return null;

  const roomPrice = getRoomPrice(selectedRoom);
  const categoryName = getRoomCategory(selectedRoom);
  const roomAmenities = getRoomFeatures(selectedRoom);
  const isVideo = activeMedia ? isVideoUrl(activeMedia) : false;

  const categoryObj =
    typeof selectedRoom.category === "object" ? selectedRoom.category : null;

  const handleBookClick = () => {
    if (onProceedToBooking && selectedRoom) {
      onProceedToBooking(selectedRoom);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl my-8 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all shadow-lg"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {roomLoading ? (
            <div className="flex flex-col items-center justify-center p-16 space-y-4 min-h-[400px]">
              <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
              <p className="text-zinc-500 dark:text-zinc-400 font-medium text-sm">
                Fetching details for room...
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {/* Media Banner */}
              <div className="relative h-72 w-full bg-zinc-800 overflow-hidden">
                {activeMedia ? (
                  isVideo && !videoError ? (
                    <video
                      key={activeMedia}
                      src={activeMedia}
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.warn(
                          "Video failed to load, falling back to room image:",
                          activeMedia,
                        );
                        setVideoError(true);
                      }}
                    >
                      Your browser does not support playing this video format.
                    </video>
                  ) : (
                    <img
                      src={
                        videoError ? getPrimaryImage(selectedRoom) : activeMedia
                      }
                      alt={`Room ${selectedRoom.roomNumber}`}
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <div className="flex h-full items-center justify-center text-zinc-500">
                    <Building className="w-20 h-20 opacity-30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-none">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs uppercase tracking-wider bg-amber-500 text-black px-3 py-1 rounded-full font-bold">
                        {categoryName}
                      </span>
                      {selectedRoom.status && (
                        <span className="text-xs uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full font-medium">
                          {selectedRoom.status}
                        </span>
                      )}
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight">
                      Room {selectedRoom.roomNumber}
                    </h2>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-xs text-zinc-300">Price per night</p>
                    <p className="text-2xl font-bold text-amber-400">
                      ₦{roomPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Media Gallery Thumbnails */}
              {allMedia.length > 1 && (
                <div className="p-4 bg-zinc-100 dark:bg-zinc-800/50 flex gap-3 overflow-x-auto border-b border-zinc-200 dark:border-zinc-800">
                  {allMedia.map((url, index) => {
                    const isMediaVideo = isVideoUrl(url);
                    const isActive = activeMedia === url;
                    return (
                      <button
                        key={index}
                        onClick={() => setActiveMedia(url)}
                        className={`relative flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                          isActive
                            ? "border-amber-500 scale-105 shadow-md"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                      >
                        {isMediaVideo ? (
                          <div className="w-full h-full bg-zinc-900 flex items-center justify-center relative">
                            <video
                              src={url}
                              className="w-full h-full object-cover pointer-events-none"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <Play className="w-5 h-5 text-amber-400 fill-amber-400" />
                            </div>
                          </div>
                        ) : (
                          <img
                            src={url}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Body Content */}
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Description & Details
                  </h3>
                  <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
                    {selectedRoom.description ||
                      "Experience ultimate comfort in this beautifully appointed room featuring top-tier amenities, refined style, and everything you need for a restful stay."}
                  </p>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-y border-zinc-100 dark:border-zinc-800 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                      <BedDouble className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400">Capacity</p>
                      <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                        {selectedRoom.capacity || categoryObj?.capacity || 2}{" "}
                        Guests
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400">Floor</p>
                      <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                        Floor {selectedRoom.floor || 1}
                      </p>
                    </div>
                  </div>

                  {categoryObj?.basePrice && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-400">Base Price</p>
                        <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                          ₦{categoryObj.basePrice.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Amenities */}
                {roomAmenities.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                      Room Amenities
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {roomAmenities.map((amenity: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800"
                        >
                          <Check className="w-4 h-4 text-amber-500 shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Section */}
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleBookClick}
                    className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl bg-amber-500 hover:bg-amber-600 text-white transition-all shadow-md shadow-amber-500/20"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>Book This Room</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
