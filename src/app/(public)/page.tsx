"use client";

import React from "react";
import Hero from "@/components/Hero";
import RoomGrid from "@/components/RoomGrid";
import AboutAmenities from "@/components/AboutAmenities";
import Navbar from "@/components/Navbar";
import { useModal } from "@/context/ModalContext";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  const { openModal } = useModal();

  return (
    <main className="min-h-screen bg-dark w-full overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* 1. Hero Section - Forward room / search data to openModal */}
      <Hero onBookClick={(bookingData) => openModal(bookingData)} />

      {/* 2. Rooms & Suites Grid */}
      <RoomGrid onSelectRoom={(room) => openModal(room)} />

      {/* 3. Testimonials (what guest says about services ) */}
      <TestimonialsSection />

      {/* 4. About & 3D Amenities Showcase */}
      <AboutAmenities />
    </main>
  );
}
