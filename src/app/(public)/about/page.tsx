"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { ShieldCheck, Award, Compass, HeartHandshake } from "lucide-react";

// 🚀 Dynamically import react-parallax-tilt with SSR disabled
const Tilt = dynamic(() => import("react-parallax-tilt"), { ssr: false });

export default function AboutPage() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Guaranteed Privacy",
      description:
        "Discreet and secure environments crafted for high-profile executives, VIPs, and guests seeking total serenity.",
    },
    {
      icon: Award,
      title: "5-Star Standard",
      description:
        "Uncompromised hospitality, bespoke concierges, and meticulous attention to detail in every suite.",
    },
    {
      icon: Compass,
      title: "Prime Location",
      description:
        "Nestled in an exclusive enclave in Epe, providing an escape from city noise while remaining easily accessible.",
    },
    {
      icon: HeartHandshake,
      title: "Zero Double Booking",
      description:
        "Our strict 2-step verification model guarantees that every reservation is manually verified before confirmation.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden pt-28 transition-colors duration-200">
      {/* 👑 Global Navbar */}
      <Navbar />

      {/* 🏛️ 1. ABOUT HERO BANNER */}
      <section className="relative py-20 px-4 md:px-12 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-amber-500 text-xs tracking-[0.3em] uppercase font-bold block mb-3"
          >
            Our Legacy & Philosophy
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif uppercase tracking-tight leading-tight mb-6"
          >
            Redefining Luxury Hospitality <br /> In Epe, Lagos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
          >
            Magville Hotel & Resort was built on a simple promise: to offer an
            authentic sanctuary where modern architectural elegance meets
            personalized, unhurried service.
          </motion.p>
        </div>
      </section>

      {/* 📖 2. STORY & ARCHITECTURE */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-amber-500 text-xs tracking-[0.2em] uppercase font-bold block">
              The Magville Experience
            </span>
            <h2 className="text-3xl md:text-4xl font-serif uppercase leading-tight">
              Designed For Absolute Peace Of Mind
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Featuring 28 meticulously curated suites and private apartments,
              Magville Hotel was designed to challenge traditional hotel stays.
              We believe true luxury isn't just about lavish decor—it is about
              space, quietude, and seamless execution.
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              From our infinity poolside lounge to private executive dining
              rooms, every square foot is curated to give long-term residents
              and weekend travelers a feeling of refined belonging.
            </p>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-8">
              <div>
                <h4 className="text-3xl font-serif text-amber-500 font-bold">
                  28
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">
                  Bespoke Suites
                </p>
              </div>
              <div>
                <h4 className="text-3xl font-serif text-amber-500 font-bold">
                  24/7
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">
                  Concierge Service
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right 3D Visual Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} perspective={1000}>
              <div className="border border-slate-200 dark:border-slate-800 p-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-2xl relative transition-colors">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900"
                  alt="Magville Luxury Suite Interior"
                  className="w-full h-[480px] object-cover"
                />
              </div>
            </Tilt>
          </motion.div>
        </div>
      </section>

      {/* 🏛️ 3. CORE PILLARS GRID */}
      <section className="py-20 px-4 md:px-12 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-bold block mb-2">
              Why Stay With Us
            </span>
            <h3 className="text-3xl md:text-4xl font-serif uppercase">
              Our Hospitality Commitments
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-8 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 transition-all group"
                >
                  <div className="p-3 bg-amber-500/10 text-amber-500 w-fit mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-serif mb-3">{pillar.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
