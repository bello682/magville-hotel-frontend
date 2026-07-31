"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  Wifi,
  UtensilsCrossed,
  Waves,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface AmenityProps {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  icon: React.ElementType;
}

const AMENITIES: AmenityProps[] = [
  {
    id: "1",
    title: "Infinity Pool & Lounge",
    category: "Relaxation",
    description:
      "Immerse yourself in our temperature-controlled pool overlooking pristine landscapes with dedicated cabana service.",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800",
    icon: Waves,
  },
  {
    id: "2",
    title: "Gourmet Fine Dining",
    category: "Culinary",
    description:
      "Savor world-class dishes prepared by master chefs, accompanied by an extensive selection of vintage beverages.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    icon: UtensilsCrossed,
  },
  {
    id: "3",
    title: "Executive Suites & Lounge",
    category: "Business & VIP",
    description:
      "Tailored private spaces equipped with high-speed fiber internet and premium privacy for exclusive meetings.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    icon: Wifi,
  },
  {
    id: "4",
    title: "24/7 Concierge & Security",
    category: "Services",
    description:
      "Round-the-clock bespoke assistance, private airport transfers, and top-tier security for peace of mind.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    icon: ShieldCheck,
  },
];

export default function AboutAmenities() {
  const [activeAmenity, setActiveAmenity] = useState<AmenityProps>(
    AMENITIES[0],
  );

  return (
    <section className="relative py-28 bg-dark text-main overflow-hidden px-4 md:px-12 border-t border-white/10">
      {/* 🌟 Subtle Ambient Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* ========================================== */}
        {/* 🏛️ PART 1: ABOUT MAGVILLE HOTEL */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent text-xs tracking-[0.3em] uppercase font-bold block mb-3">
              About Magville Hotel
            </span>
            <h2 className="text-3xl md:text-5xl font-serif uppercase tracking-tight leading-tight mb-6">
              A Sanctuary Of Refined Luxury & Comfort
            </h2>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Situated in an exclusive serene enclave, Magville Hotel combines
              modern architectural brilliance with unparalleled hospitality.
              Offering 28 premium curated apartments and suites, every room is
              crafted to provide absolute tranquility.
            </p>
            <p className="text-muted text-sm leading-relaxed mb-8">
              Whether you are traveling for executive business or seeking a
              relaxing getaway, our reservation approval workflow guarantees
              personalized service and zero double bookings.
            </p>

            {/* Stats Counter Row */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div>
                <h4 className="text-3xl md:text-4xl font-serif text-accent font-bold">
                  28
                </h4>
                <p className="text-[10px] text-muted uppercase tracking-widest mt-1">
                  Luxury Units
                </p>
              </div>
              <div>
                <h4 className="text-3xl md:text-4xl font-serif text-accent font-bold">
                  100%
                </h4>
                <p className="text-[10px] text-muted uppercase tracking-widest mt-1">
                  Verified Stays
                </p>
              </div>
              <div>
                <h4 className="text-3xl md:text-4xl font-serif text-accent font-bold">
                  4.9★
                </h4>
                <p className="text-[10px] text-muted uppercase tracking-widest mt-1">
                  Guest Ratings
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right 3D Visual Stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} perspective={1000}>
              <div className="relative z-10 border border-white/10 p-3 bg-black/40 backdrop-blur-md shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900"
                  alt="Magville Luxury Exterior"
                  className="w-full h-[450px] object-cover"
                />
              </div>
            </Tilt>

            {/* Decorative Floating Gold Accent Frame */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-accent/40 pointer-events-none z-0" />
          </motion.div>
        </div>

        {/* ========================================== */}
        {/* ✨ PART 2: 3D LUXURY AMENITIES SHOWCASE */}
        {/* ========================================== */}
        <div className="pt-16 border-t border-white/10">
          <div className="text-center mb-16">
            <span className="text-accent text-xs tracking-[0.3em] uppercase font-bold block mb-2">
              World-Class Facilities
            </span>
            <h3 className="text-3xl md:text-5xl font-serif uppercase tracking-tight">
              Designed For Extraordinary Experiences
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Interactive Tabs (4 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              {AMENITIES.map((amenity) => {
                const IconComponent = amenity.icon;
                const isActive = activeAmenity.id === amenity.id;

                return (
                  <motion.div
                    key={amenity.id}
                    whileHover={{ x: 6 }}
                    onClick={() => setActiveAmenity(amenity)}
                    className={`p-5 cursor-pointer transition-all duration-300 border ${
                      isActive
                        ? "bg-accent/10 border-accent text-main shadow-lg"
                        : "bg-black/40 border-white/10 text-muted hover:border-white/30"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-3 rounded-none ${isActive ? "bg-accent text-dark" : "bg-white/5 text-accent"}`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] text-accent tracking-widest uppercase block">
                          {amenity.category}
                        </span>
                        <h4 className="text-base font-serif font-medium">
                          {amenity.title}
                        </h4>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform ${isActive ? "text-accent translate-x-1" : "opacity-0"}`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Interactive 3D Card Display (7 Cols) */}
            <div className="lg:col-span-7">
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000}>
                <motion.div
                  key={activeAmenity.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="relative bg-black/60 border border-white/10 overflow-hidden shadow-2xl group"
                >
                  <div className="relative h-[380px] overflow-hidden">
                    <img
                      src={activeAmenity.image}
                      alt={activeAmenity.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
                  </div>

                  {/* Floating Content Card */}
                  <div className="p-8 relative z-10 -mt-20">
                    <span className="inline-block bg-accent text-dark text-[10px] font-bold tracking-widest uppercase px-3 py-1 mb-3">
                      {activeAmenity.category} Feature
                    </span>
                    <h4 className="text-2xl font-serif mb-3 text-main">
                      {activeAmenity.title}
                    </h4>
                    <p className="text-xs text-muted leading-relaxed">
                      {activeAmenity.description}
                    </p>
                  </div>
                </motion.div>
              </Tilt>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
