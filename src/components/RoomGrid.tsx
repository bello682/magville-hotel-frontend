"use client";

import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { BedDouble, Star, ArrowRight, Loader2 } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { fetchPublicRooms } from "../store/redux/actions/publicActions";

import {
  Room,
  getRoomId,
  getRoomName,
  getRoomPrice,
  getRoomCategory,
  getPrimaryImage,
  isVideoUrl,
} from "../app/(public)/rooms/types";

interface RoomGridProps {
  onSelectRoom: (room: Room) => void;
  initialRooms?: Room[];
}

export default function RoomGrid({
  onSelectRoom,
  initialRooms,
}: RoomGridProps) {
  const dispatch = useAppDispatch();

  const {
    rooms: storeRooms = [],
    loading,
    error,
  } = useAppSelector((state: any) => state.public || {});

  const sourceRooms: Room[] =
    initialRooms && initialRooms.length > 0 ? initialRooms : storeRooms;

  // Filter to ensure unique categories (e.g. 1 Deluxe, 1 Standard, 1 Executive)
  const displayedRooms = useMemo<Room[]>(() => {
    const seenCategories = new Set<string>();
    const uniqueCategoryRooms: Room[] = [];

    for (const room of sourceRooms) {
      const category = getRoomCategory(room) || "Uncategorized";
      if (!seenCategories.has(category)) {
        seenCategories.add(category);
        uniqueCategoryRooms.push(room);
      }
      if (uniqueCategoryRooms.length === 3) break;
    }

    // Fallback: If less than 3 unique categories exist, slice standard array
    return uniqueCategoryRooms.length > 0
      ? uniqueCategoryRooms
      : sourceRooms.slice(0, 3);
  }, [sourceRooms]);

  useEffect(() => {
    if ((initialRooms && initialRooms.length > 0) || storeRooms.length > 0)
      return;

    dispatch(fetchPublicRooms());
  }, [dispatch, initialRooms, storeRooms.length]);

  return (
    <section className="py-24 bg-main text-dark px-4 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="text-accent text-xs tracking-[0.3em] uppercase font-bold block mb-2">
          Magville's Rooms & Suites
        </span>
        <h2 className="text-3xl md:text-5xl font-serif uppercase tracking-tight">
          Designed For Unrivaled Comfort
        </h2>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 text-muted">
          <Loader2 className="w-8 h-8 animate-spin text-accent mb-4" />
          <p className="text-xs uppercase tracking-widest font-mono">
            Connecting to database...
          </p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="text-center py-12 text-red-500 text-xs tracking-widest uppercase">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && displayedRooms.length === 0 && (
        <div className="text-center py-12 text-muted text-xs tracking-wider uppercase">
          No accommodations published in database yet.
        </div>
      )}

      {/* Featured Rooms Grid */}
      {!loading && !error && displayedRooms.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedRooms.map((room: Room, index: number) => {
            const primaryMedia = getPrimaryImage(room);
            const isVideo = isVideoUrl(primaryMedia);
            const price = getRoomPrice(room);

            return (
              <motion.div
                key={getRoomId(room) || index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Tilt
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  glareEnable={true}
                  glareMaxOpacity={0.15}
                  className="bg-white border border-gray-100 shadow-xl overflow-hidden group cursor-pointer h-full"
                >
                  <div
                    // onClick={() => onSelectRoom(room)}
                    onClick={() => {
                      onSelectRoom({
                        ...room,
                        name: getRoomName(room) || "Selected Suite",
                      });
                    }}
                    className="h-full flex flex-col justify-between"
                  >
                    <div>
                      {/* Media Container */}
                      <div className="relative h-64 overflow-hidden bg-black">
                        {isVideo ? (
                          <video
                            src={primaryMedia}
                            muted
                            loop
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          />
                        ) : (
                          <img
                            src={primaryMedia}
                            alt={getRoomName(room) || "Room image"}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          />
                        )}
                        <div className="absolute top-4 right-4 bg-accent text-dark px-3 py-1 text-xs font-semibold tracking-wider uppercase z-10">
                          ₦{price ? price.toLocaleString() : "0"} / Night
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6">
                        <span className="text-[10px] text-accent font-semibold tracking-widest uppercase block mb-1">
                          {getRoomCategory(room)}
                        </span>
                        <h3 className="text-xl font-serif mb-4 group-hover:text-accent transition-colors line-clamp-1">
                          {getRoomName(room)}
                        </h3>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100 text-xs text-muted">
                        <div className="flex items-center space-x-2">
                          <BedDouble className="w-4 h-4 text-accent" />
                          <span>{room.bedType || room.bed || "King Bed"}</span>
                        </div>
                        <div className="flex text-accent">
                          {[...Array(5)].map(
                            (_: undefined, starIndex: number) => (
                              <Star
                                key={starIndex}
                                className="w-3 h-3 fill-current"
                              />
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Catalog Link */}
      <div className="mt-16 text-center">
        <Link
          href="/rooms"
          className="inline-flex items-center space-x-3 px-8 py-4 bg-dark text-main hover:bg-accent hover:text-dark font-bold text-xs tracking-widest uppercase transition-all duration-300 group"
        >
          <span>Explore All Accommodations</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
