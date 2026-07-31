"use client";

import React from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  Maximize,
  Users,
  Bed,
  CheckCircle2,
  Eye,
  ArrowRight,
} from "lucide-react";
import {
  Room,
  getRoomId,
  getRoomName,
  getRoomPrice,
  getRoomCategory,
  getPrimaryImage,
  getRoomFeatures,
} from "../app/(public)/rooms/types";

interface RoomCardProps {
  room: Room;
  onOpenDetails: (room: Room) => void;
  onOpenBooking: (room: Room) => void;
}

export default function RoomCard({
  room,
  onOpenDetails,
  onOpenBooking,
}: RoomCardProps) {
  const roomId = getRoomId(room);
  const roomName = getRoomName(room);
  const roomPrice = getRoomPrice(room);
  const roomCat = getRoomCategory(room);
  const primaryImage = getPrimaryImage(room);
  const features = getRoomFeatures(room);

  return (
    <motion.div
      layout
      key={roomId}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-black/60 border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-accent/40 transition-colors"
    >
      {/* Image Stack with Parallax Tilt */}
      <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} perspective={1000}>
        <div className="relative h-64 overflow-hidden">
          <img
            src={primaryImage}
            alt={roomName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4 bg-dark/90 text-accent text-[10px] font-bold tracking-widest uppercase px-3 py-1 border border-white/10">
            {roomCat}
          </div>
          <div className="absolute bottom-4 right-4 bg-accent text-dark text-sm font-serif font-bold px-3 py-1">
            ₦{roomPrice.toLocaleString()}{" "}
            <span className="text-[10px] font-sans font-normal uppercase">
              / Night
            </span>
          </div>
        </div>
      </Tilt>

      {/* Details Section */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-serif mb-2 text-main">{roomName}</h3>
          <p className="text-xs text-muted leading-relaxed mb-6 line-clamp-2">
            {room.description ||
              "Designed with premium amenities for an unmatched luxury experience."}
          </p>

          {/* Room Meta Badges */}
          <div className="flex items-center justify-between py-3 border-y border-white/10 text-[11px] text-muted mb-6">
            <div className="flex items-center space-x-1.5">
              <Maximize className="w-3.5 h-3.5 text-accent" />
              <span>
                {room.sizeSqFt
                  ? `${room.sizeSqFt} sq ft`
                  : room.size || "45 m²"}
              </span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Users className="w-3.5 h-3.5 text-accent" />
              <span>
                {room.capacity
                  ? `${room.capacity} Guests`
                  : room.guests || "2 Guests"}
              </span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Bed className="w-3.5 h-3.5 text-accent" />
              <span>{room.bedType || room.bed || "King Bed"}</span>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-2 mb-6">
            {features.slice(0, 3).map((feat: string, i: number) => (
              <div
                key={i}
                className="flex items-center space-x-2 text-xs text-main/80"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={() => onOpenDetails(room)}
            className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-main font-semibold text-[11px] tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-accent" />
            <span>Details</span>
          </button>

          <button
            onClick={() => onOpenBooking(room)}
            className="w-full py-3 bg-accent text-dark hover:bg-white text-dark font-semibold text-[11px] tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-1.5"
          >
            <span>Reserve</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
