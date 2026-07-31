"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Navbar from "@/components/Navbar";
import ReservationModal from "@/components/ReservationModal";
import {
  Utensils,
  Waves,
  Dumbbell,
  Sparkles,
  ShieldCheck,
  Wifi,
  Car,
  Coffee,
  Tv,
  Clock,
  Check,
} from "lucide-react";

interface Amenity {
  id: string;
  title: string;
  category: "Wellness" | "Dining" | "Leisure" | "Services";
  description: string;
  hours: string;
  image: string;
  icon: React.ElementType;
  highlights: string[];
}

const AMENITIES_DATA: Amenity[] = [
  {
    id: "1",
    title: "Infinity Sky Pool & Lounge",
    category: "Leisure",
    description:
      "Relax by our temperature-controlled rooftop pool with panoramic views of Epe. Unwind with curated cocktails and ambient evening lighting.",
    hours: "06:00 AM - 10:00 PM",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800",
    icon: Waves,
    highlights: [
      "Temperature Controlled",
      "Poolside Bar",
      "Cabana Lounges",
      "Towel Service",
    ],
  },
  {
    id: "2",
    title: "The Magville Grand Bistro",
    category: "Dining",
    description:
      "Savor exquisite multi-course continental and local gourmet delicacies prepared by our world-class executive chefs.",
    hours: "24 Hours Dining Available",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    icon: Utensils,
    highlights: [
      "A La Carte Menu",
      "Private Dining Rooms",
      "Sommelier Wine Selection",
      "Organic Ingredients",
    ],
  },
  {
    id: "3",
    title: "State-of-the-Art Fitness Center",
    category: "Wellness",
    description:
      "Equipped with top-tier Technogym cardio machines, free weights, and dedicated spaces for personal training sessions.",
    hours: "24/7 Guest Access",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
    icon: Dumbbell,
    highlights: [
      "Technogym Equipment",
      "Personal Trainers",
      "Chilled Hydration Station",
      "Steam Room Access",
    ],
  },
  {
    id: "4",
    title: "Serene Spa & Wellness Sanctuary",
    category: "Wellness",
    description:
      "Rejuvenate your body and mind with our holistic massage therapy, deep tissue treatments, and aromatherapy rituals.",
    hours: "09:00 AM - 08:00 PM",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
    icon: Sparkles,
    highlights: [
      "Swedish & Deep Tissue",
      "Sauna & Steam Room",
      "Organic Essential Oils",
      "Couples Massage Rooms",
    ],
  },
  {
    id: "5",
    title: "VIP Valet & Secure Parking",
    category: "Services",
    description:
      "Round-the-clock armed security personnel, CCTV coverage, and complimentary valet parking for all checked-in guests.",
    hours: "24/7 Coverage",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800",
    icon: Car,
    highlights: [
      "24/7 CCTV Monitoring",
      "Complimentary Valet",
      "EV Charging Stations",
      "Secure Gated Compound",
    ],
  },
  {
    id: "6",
    title: "Executive Business Lounge",
    category: "Services",
    description:
      "Private high-speed fiber internet workstations, private meeting pods, and video conferencing suites for seamless remote work.",
    hours: "24/7 Guest Access",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    icon: Wifi,
    highlights: [
      "Gigabit Fiber Wi-Fi",
      "Private Meeting Pods",
      "Wireless Printing",
      "Espresso Bar",
    ],
  },
];

const CATEGORIES = ["All", "Leisure", "Dining", "Wellness", "Services"];

export default function AmenitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredAmenities =
    selectedCategory === "All"
      ? AMENITIES_DATA
      : AMENITIES_DATA.filter((item) => item.category === selectedCategory);

  return (
    <main className="min-h-screen bg-dark text-main overflow-x-hidden pt-28">
      {/* 👑 Global Navigation Bar */}
      <Navbar onBookClick={() => setIsModalOpen(true)} />

      {/* 🏛️ 1. HERO BANNER */}
      <section className="relative py-20 px-4 md:px-12 border-b border-white/10 overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent text-xs tracking-[0.3em] uppercase font-bold block mb-3"
          >
            World-Class Facilities
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif uppercase tracking-tight mb-6"
          >
            Luxury Amenities
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted text-sm md:text-base max-w-xl mx-auto leading-relaxed"
          >
            Every detail at Magville Hotel & Resort is engineered to deliver
            comfort, wellness, and effortless luxury throughout your stay.
          </motion.p>
        </div>
      </section>

      {/* 🏷️ 2. CATEGORY FILTER TABS */}
      <section className="py-8 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3 border-b border-white/10 pb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 text-xs tracking-widest uppercase transition-all duration-300 font-medium ${
                selectedCategory === cat
                  ? "bg-accent text-dark shadow-lg shadow-accent/20"
                  : "bg-black/40 text-muted hover:text-main border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 🌟 3. AMENITIES SHOWCASE LIST */}
      <section className="py-12 px-4 md:px-12 max-w-7xl mx-auto pb-28">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <AnimatePresence>
            {filteredAmenities.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-black/50 border border-white/10 overflow-hidden group hover:border-accent/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Banner */}
                    <Tilt
                      tiltMaxAngleX={3}
                      tiltMaxAngleY={3}
                      perspective={1000}
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4 bg-dark/90 text-accent text-[10px] font-bold tracking-widest uppercase px-3 py-1 border border-white/10 flex items-center space-x-2">
                          <Icon className="w-3.5 h-3.5" />
                          <span>{item.category}</span>
                        </div>
                      </div>
                    </Tilt>

                    {/* Content Details */}
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-serif text-main">
                          {item.title}
                        </h3>
                      </div>

                      <div className="flex items-center space-x-2 text-xs text-accent mb-4">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span className="tracking-wider uppercase text-[11px] font-semibold">
                          {item.hours}
                        </span>
                      </div>

                      <p className="text-xs text-muted leading-relaxed mb-6">
                        {item.description}
                      </p>

                      {/* Bullet Highlights */}
                      <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/10">
                        {item.highlights.map((h, i) => (
                          <div
                            key={i}
                            className="flex items-center space-x-2 text-xs text-main/80"
                          >
                            <Check className="w-3.5 h-3.5 text-accent shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 📝 Reservation Modal */}
      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={{
          name: "Executive Ocean Suite",
          category: "Luxury Room",
          price: 75000,
          image:
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
        }}
      />
    </main>
  );
}
