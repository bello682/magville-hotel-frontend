"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import ReservationModal from "@/components/ReservationModal";
import { AppDispatch, RootState } from "../../../store/store";
import {
  fetchPublicRooms,
  fetchRoomCategories,
} from "../../../store/redux/actions/publicActions";
import { Loader2 } from "lucide-react";

import {
  Room,
  getRoomId,
  getRoomName,
  getRoomPrice,
  getRoomCategory,
  getPrimaryImage,
} from "./types";
import RoomCard from "../../../components/RoomCard";
import RoomDetailModal from "../../../components/RoomDetailModal";

export default function RoomsPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { rooms, categories, loading, error } = useSelector(
    (state: RootState) => state.public,
  );

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] =
    useState<Room | null>(null);
  const [detailModalRoom, setDetailModalRoom] = useState<Room | null>(null);

  useEffect(() => {
    dispatch(fetchPublicRooms());
    dispatch(fetchRoomCategories());
  }, [dispatch]);

  const filteredRooms = rooms.filter((room: Room) => {
    if (selectedCategory === "All") return true;
    const catName =
      typeof room.category === "object" ? room.category?.name : room.category;
    return catName === selectedCategory;
  });

  const handleOpenBooking = (room: Room) => {
    setDetailModalRoom(null);
    setSelectedRoomForBooking(room);
    setIsBookingModalOpen(true);
  };

  const handleOpenDetails = (room: Room) => {
    setDetailModalRoom(room);
  };

  return (
    <main className="min-h-screen bg-dark text-main overflow-x-hidden pt-28">
      {/* 👑 Global Navigation Bar */}
      <Navbar />

      {/* 🏛️ 1. HERO BANNER */}
      <section className="relative py-20 px-4 md:px-12 border-b border-white/10 overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent text-xs tracking-[0.3em] uppercase font-bold block mb-3"
          >
            Curated Accommodations
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif uppercase tracking-tight mb-6"
          >
            Rooms & Luxury Suites
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted text-sm md:text-base max-w-xl mx-auto leading-relaxed"
          >
            Explore our high-end minimalist sanctuaries, equipped with modern
            acoustic isolation and tailored concierge services.
          </motion.p>
        </div>
      </section>

      {/* 🏷️ 2. CATEGORY FILTER TABS */}
      <section className="py-8 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3 border-b border-white/10 pb-6">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-6 py-2.5 text-xs tracking-widest uppercase transition-all duration-300 font-medium ${
              selectedCategory === "All"
                ? "bg-accent text-dark shadow-lg shadow-accent/20"
                : "bg-black/40 text-muted hover:text-main border border-white/10"
            }`}
          >
            All Rooms ({rooms.length})
          </button>

          {categories.map((cat: any) => {
            const catName = typeof cat === "string" ? cat : cat.name;
            return (
              <button
                key={cat._id || catName}
                onClick={() => setSelectedCategory(catName)}
                className={`px-6 py-2.5 text-xs tracking-widest uppercase transition-all duration-300 font-medium ${
                  selectedCategory === catName
                    ? "bg-accent text-dark shadow-lg shadow-accent/20"
                    : "bg-black/40 text-muted hover:text-main border border-white/10"
                }`}
              >
                {catName}
              </button>
            );
          })}
        </div>
      </section>

      {/* 🏨 3. ROOMS GRID SHOWCASE */}
      <section className="py-12 px-4 md:px-12 max-w-7xl mx-auto pb-28">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted">
            <Loader2 className="w-8 h-8 animate-spin text-accent mb-4" />
            <p className="text-xs tracking-widest uppercase">
              Loading Accommodations...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-16 border border-red-500/20 bg-red-500/5 p-8 max-w-xl mx-auto">
            <p className="text-red-400 text-sm mb-4">{error}</p>
            <button
              onClick={() => dispatch(fetchPublicRooms())}
              className="px-6 py-2 bg-accent text-dark text-xs font-bold uppercase tracking-widest"
            >
              Retry
            </button>
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="text-center py-20 text-muted border border-white/10">
            <p className="text-sm">
              No rooms currently available in this category.
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredRooms.map((room: Room) => (
                <RoomCard
                  key={getRoomId(room)}
                  room={room}
                  onOpenDetails={handleOpenDetails}
                  onOpenBooking={handleOpenBooking}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* 🔍 4. FULL ROOM DETAIL MODAL */}
      <RoomDetailModal
        room={detailModalRoom}
        onClose={() => setDetailModalRoom(null)}
        onProceedToBooking={handleOpenBooking}
      />

      {/* 📝 RESERVATION MODAL */}
      {selectedRoomForBooking && (
        <ReservationModal
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedRoomForBooking(null); // Resets room selection
          }}
          room={selectedRoomForBooking}
        />
      )}
    </main>
  );
}
