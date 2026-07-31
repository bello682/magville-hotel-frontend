"use client";

import React from "react";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Rooms & Suites", href: "/rooms" },
    { label: "Amenities", href: "/amenities" },
    { label: "Track Reservation", href: "/track" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-black text-main border-t border-white/10 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-12 pt-20 pb-12">
        {/* 🏛️ TOP SECTION: BRAND, NAV & CONTACT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <a href="/" className="inline-block">
              <span className="text-3xl font-serif tracking-widest text-accent font-bold uppercase">
                MAGVILLE
              </span>
              <span className="text-[10px] tracking-normal font-sans block text-muted uppercase">
                HOTEL & RESORT • EPE, LAGOS
              </span>
            </a>
            <p className="text-muted text-xs leading-relaxed max-w-md">
              A luxury hospitality sanctuary featuring 28 bespoke suites,
              multi-cuisine dining, and serenity-first architectural design in
              Epe.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              {[
                { icon: FaInstagram, href: "#", label: "Instagram" },
                { icon: FaFacebookF, href: "#", label: "Facebook" },
                { icon: FaXTwitter, href: "#", label: "Twitter" },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="p-3 bg-dark border border-white/10 text-muted hover:text-accent hover:border-accent/40 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links & Contact (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Nav Links */}
            <div>
              <h4 className="text-xs font-serif tracking-widest uppercase text-accent font-bold mb-5">
                Navigation
              </h4>
              <ul className="space-y-3 text-xs text-muted">
                {navLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="hover:text-accent transition-colors flex items-center space-x-1 group"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Contact */}
            <div>
              <h4 className="text-xs font-serif tracking-widest uppercase text-accent font-bold mb-5">
                Concierge
              </h4>
              <div className="space-y-3 text-xs text-muted">
                <p className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>Off Coastal Expressway, Epe, Lagos</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  <span>+234 (0) 800 MAGVILLE</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  <span>info@magvillehotel.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 📜 BOTTOM SECTION: COPYRIGHT */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-muted space-y-4 md:space-y-0">
          <p>
            © {new Date().getFullYear()} Magville Hotel & Resort. All rights
            reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Terms of Service
            </a>
            <a
              href="/track"
              className="hover:text-accent transition-colors"
            >
              Track Reservation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
