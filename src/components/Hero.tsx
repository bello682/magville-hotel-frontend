"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Suspense } from "react";
import {
  Calendar,
  Users,
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

import {
  fetchRoomCategories,
  checkRoomAvailability,
  fetchPublicRooms,
} from "../store/redux/actions/publicActions";
import AvailableRoomsModal from "@/context/AvailableRoomsModal";
import ReservationModal from "@/components/ReservationModal";
import { useModal } from "@/context/ModalContext";
import { useAdminToast } from "@/app/(admin)/context/ToastContext";

const HERO_SLIDES = [
  {
    id: 1,
    tagline: "★ ★ ★ ★ ★ Luxury Hotel & Resort",
    title: "Experience Elegance\nIn Every Detail",
    ctaText: "Discover Our Suites",
    type: "link",
    href: "/rooms",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 2,
    tagline: "Exclusive Sanctuary in Epe",
    title: "Unrivaled Comfort &\nPersonalized Service",
    ctaText: "Explore Amenities",
    type: "link",
    href: "/amenities",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 3,
    tagline: "Fine Dining & World-Class Spa",
    title: "Indulge Your Senses\nIn Total Serenity",
    ctaText: "Book Your Experience",
    type: "link",
    href: "/rooms",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 4,
    tagline: "Seamless Guest Concierge",
    title: "Manage & Track Your\nExisting Booking",
    ctaText: "Track Reservation",
    type: "link",
    href: "/track",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1920&q=80",
  },
];

interface HeroProps {
  onBookClick?: (data?: any) => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { openModal } = useModal();
  // 🟢 2. GET SHOWTOAST FROM YOUR CONTEXT
  const { showToast } = useAdminToast();

  const { categories } = useAppSelector((state) => state.public);
  const { loading: availabilityLoading } = useAppSelector(
    (state) => state.reservation,
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formError, setFormError] = useState("");

  const [availableRoomsList, setAvailableRoomsList] = useState<any[]>([]);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);

  // 🟢 Reservation Modal State Management
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectedRoomData, setSelectedRoomData] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchRoomCategories());
    dispatch(fetchPublicRooms());
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () =>
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const handlePrev = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
    );

  const current = HERO_SLIDES[currentSlide];

  // API Search Handler
  const handleHeroSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // Error 1: Missing Dates
    if (!checkIn || !checkOut) {
      const errorMsg = "Please select both Check-In and Check-Out dates.";
      setFormError(errorMsg);
      showToast("error", "Search Error", errorMsg);
      return;
    }

    try {
      const responseData = await dispatch(
        checkRoomAvailability({
          checkInDate: checkIn,
          checkOutDate: checkOut,
          categoryId: selectedCategory,
        }),
      );

      const availableRooms =
        responseData?.data?.availableRooms ||
        responseData?.availableRooms ||
        responseData?.data ||
        (Array.isArray(responseData) ? responseData : []);

      if (!availableRooms || availableRooms.length === 0) {
        const emptyMsg = "No rooms are available for the selected dates.";
        setFormError(emptyMsg);
        showToast("warning", "No Availability", emptyMsg);
        return;
      }

      setAvailableRoomsList(availableRooms);
      setIsResultsModalOpen(true);
      showToast(
        "success", // 🟢 Fixed: type ("success") comes first
        `Found ${availableRooms.length} available room${
          availableRooms.length > 1 ? "s" : ""
        }!`,
        "success",
      );
    } catch (err: any) {
      const errorMsg =
        err?.message || err || "Could not check availability. Try again.";
      setFormError(errorMsg);
      showToast("error", "Availability Check Failed", errorMsg);
    }
  };

  // 🟢 Handle payload selection directly
  const handleSelectRoomFromModal = (dataPayload: any) => {
    const chosenRoom = dataPayload?.room || dataPayload;

    openModal({
      ...chosenRoom,
      name: chosenRoom?.name || chosenRoom?.title,
      price: chosenRoom?.price || chosenRoom?.pricePerNight,
      image: chosenRoom?.image || chosenRoom?.images?.[0],
      checkIn: dataPayload?.checkIn || checkIn,
      checkOut: dataPayload?.checkOut || checkOut,
    });

    setIsResultsModalOpen(false); // Close Hero room search results modal
  };

  // 🟡 Constructed Room Payload Passed to ReservationModal
  const reservationModalPayload = selectedRoomData
    ? {
        ...selectedRoomData,
        checkIn: checkIn || selectedRoomData?.checkIn,
        checkOut: checkOut || selectedRoomData?.checkOut,
      }
    : null;

  // 🟢 Clean Normalization Helper
  const normalizedHeroRoom = useMemo(() => {
    if (!selectedRoomData) return null;

    return {
      ...selectedRoomData,
      id: selectedRoomData.id || selectedRoomData._id,
      name: selectedRoomData.name || selectedRoomData.title || "Luxury Suite",
      price:
        Number(selectedRoomData.price || selectedRoomData.pricePerNight) || 0,
      image:
        selectedRoomData.image ||
        (Array.isArray(selectedRoomData.images) &&
          selectedRoomData.images[0]) ||
        "/images/room-placeholder.jpg",
      category:
        typeof selectedRoomData.category === "object"
          ? selectedRoomData.category?.name
          : selectedRoomData.category || "Standard",
      checkIn: selectedRoomData.checkIn || checkIn,
      checkOut: selectedRoomData.checkOut || checkOut,
    };
  }, [selectedRoomData, checkIn, checkOut]);
  return (
    <section className="relative w-full min-h-screen bg-dark text-main overflow-hidden flex flex-col justify-between pt-28 pb-12 px-4 md:px-12">
      {/* Background Image Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${current.image}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/40" />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center my-auto min-h-[260px] flex flex-col justify-center items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <span className="text-accent text-xs tracking-[0.3em] uppercase block mb-3 font-semibold">
              {current.tagline}
            </span>

            <h1 className="text-4xl md:text-7xl font-serif tracking-tight uppercase leading-tight mb-8 whitespace-pre-line drop-shadow-md">
              {current.title}
            </h1>

            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000}>
              {current.type === "link" ? (
                <Link
                  href={current.href || "/"}
                  className="inline-block border border-accent text-accent hover:bg-accent hover:text-dark px-8 py-3.5 tracking-widest uppercase text-xs font-semibold transition-all duration-300 shadow-lg"
                >
                  {current.ctaText}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (checkIn && checkOut) {
                      handleHeroSearch(new Event("submit") as any);
                    } else {
                      setFormError(
                        "Please select Check-In and Check-Out dates first.",
                      );
                      // setIsReservationModalOpen(true);
                      // if (onBookClick) {
                      //   onBookClick({
                      //     checkIn,
                      //     checkOut,
                      //     category: selectedCategory,
                      //     roomId: "",
                      //   });
                      // }
                    }
                  }}
                  className="border border-accent text-accent hover:bg-accent hover:text-dark px-8 py-3.5 tracking-widest uppercase text-xs font-semibold transition-all duration-300 shadow-lg"
                >
                  {current.ctaText}
                </button>
              )}
            </Tilt>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="relative z-20 max-w-6xl mx-auto w-full flex justify-between items-center mb-6 px-2">
        <div className="flex space-x-3">
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="p-2.5 rounded-full border border-white/20 bg-black/40 hover:bg-accent hover:text-dark hover:border-accent text-white transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="p-2.5 rounded-full border border-white/20 bg-black/40 hover:bg-accent hover:text-dark hover:border-accent text-white transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex space-x-2">
          {HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentSlide === index
                  ? "w-8 bg-accent"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Search Form */}
      <div className="relative z-20 max-w-6xl mx-auto w-full">
        {formError && (
          <p className="text-red-400 text-xs mb-2 text-center font-medium bg-red-950/40 py-1.5 border border-red-900/50 rounded">
            {formError}
          </p>
        )}

        <motion.form
          onSubmit={handleHeroSearch}
          className="bg-black/80 backdrop-blur-md border border-white/10 p-4 md:p-6 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            {/* Check In */}
            <div className="flex items-center space-x-3 border-b md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0 pr-4">
              <Calendar className="text-accent w-5 h-5 shrink-0" />
              <div className="w-full">
                <p className="text-[10px] text-muted tracking-widest uppercase mb-1">
                  Check In
                </p>
                <input
                  type="date"
                  required
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="bg-transparent text-xs text-main focus:outline-none w-full cursor-pointer [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Check Out */}
            <div className="flex items-center space-x-3 border-b md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0 pr-4">
              <Calendar className="text-accent w-5 h-5 shrink-0" />
              <div className="w-full">
                <p className="text-[10px] text-muted tracking-widest uppercase mb-1">
                  Check Out
                </p>
                <input
                  type="date"
                  required
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="bg-transparent text-xs text-main focus:outline-none w-full cursor-pointer [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Category */}
            <div className="flex items-center space-x-3 border-b md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0 pr-4">
              <Users className="text-accent w-5 h-5 shrink-0" />
              <div className="w-full">
                <p className="text-[10px] text-muted tracking-widest uppercase mb-1">
                  Category
                </p>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent text-xs text-main focus:outline-none w-full cursor-pointer capitalize"
                >
                  <option value="" className="bg-dark text-main">
                    All Categories
                  </option>
                  {categories?.map((cat: any) => (
                    <option
                      key={cat.id || cat._id}
                      value={cat.id || cat._id}
                      className="bg-dark text-main"
                    >
                      {cat.name || cat.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Button */}
            <motion.button
              type="submit"
              disabled={availabilityLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-accent text-dark py-4 font-semibold text-xs tracking-widest uppercase flex items-center justify-center space-x-2 transition-all shadow-lg disabled:opacity-50"
            >
              {availabilityLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Checking...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Check Availability</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>

      {/* Available Rooms Search Modal */}
      <AvailableRoomsModal
        isOpen={isResultsModalOpen}
        onClose={() => setIsResultsModalOpen(false)}
        rooms={availableRoomsList}
        checkIn={checkIn}
        checkOut={checkOut}
        onSelectRoom={handleSelectRoomFromModal}
      />

      {/* 🟢 Reservation Modal with populated payload */}
      <Suspense fallback={null}>
        <ReservationModal
          isOpen={isReservationModalOpen}
          onClose={() => setIsReservationModalOpen(false)}
          room={normalizedHeroRoom}
        />
      </Suspense>
    </section>
  );
}
