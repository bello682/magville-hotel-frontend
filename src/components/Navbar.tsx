"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";

interface NavbarProps {
  onBookClick?: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Rooms & Suites", href: "/rooms" },
    { label: "Amenities", href: "/amenities" },
    // { label: "Track Booking", href: "/track" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-dark/90 backdrop-blur-md border-b border-white/10 px-4 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* 👑 Brand Logo */}
          <motion.a
            href="/"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-serif tracking-widest text-accent font-bold uppercase"
          >
            MAGVILLE
            <span className="text-[10px] tracking-normal font-sans block text-muted">
              HOTEL & RESORT
            </span>
          </motion.a>

          {/* 🖥️ Desktop Navigation Links (Hidden on Mobile/Tablet) */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs tracking-[0.2em] uppercase font-light text-main">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-accent transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* 🔘 Right Action Buttons + Mobile Hamburger Toggle */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Secondary CTA: Track Booking Icon/Button for Quick Desktop Access */}
            <a
              href="/track"
              className="hidden xl:flex items-center space-x-1.5 text-xs text-main hover:text-accent border border-white/20 hover:border-accent/50 px-3.5 py-2 transition-all uppercase tracking-widest"
            >
              <Search className="w-3.5 h-3.5 text-accent" />
              <span>Track Reservation</span>
            </a>

            {/* Primary CTA: Book Online */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBookClick}
              className="hidden sm:block bg-accent text-dark px-6 py-2.5 font-semibold text-xs tracking-widest uppercase transition-all shadow-lg shadow-accent/20"
            >
              Book Online
            </motion.button>

            {/* 🍔 Hamburger Button (Visible on Mobile & Tablet < 1024px) */}
            <button
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              className="lg:hidden text-main hover:text-accent p-2 transition-colors focus:outline-none"
            >
              {isOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 📱 Mobile & Tablet Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-dark/98 backdrop-blur-xl pt-28 px-6 pb-10 flex flex-col justify-between lg:hidden border-b border-white/10"
          >
            <nav className="flex flex-col space-y-5 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-serif tracking-widest uppercase text-main hover:text-accent transition-colors py-2 border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-6 text-center space-y-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onBookClick) onBookClick();
                }}
                className="w-full bg-accent text-dark py-3.5 font-semibold text-xs tracking-widest uppercase shadow-lg shadow-accent/20"
              >
                Book Online Now
              </button>

              <a
                href="/track"
                onClick={() => setIsOpen(false)}
                className="block w-full border border-white/20 text-main hover:border-accent hover:text-accent py-3 font-semibold text-xs tracking-widest uppercase transition-all"
              >
                Track Existing Reservation
              </a>

              <p className="text-[10px] text-muted uppercase tracking-widest pt-2">
                Magville Hotel, Epe • Reservation Support
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
