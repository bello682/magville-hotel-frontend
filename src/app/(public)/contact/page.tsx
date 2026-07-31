"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Navbar from "@/components/Navbar";
import ReservationModal from "@/components/ReservationModal";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  Navigation,
} from "lucide-react";

export default function ContactPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact Form Submission:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
    }, 4000);
  };

  const contactDetails = [
    {
      icon: MapPin,
      title: "Resort Location",
      detail:
        "Magville Hotel & Resort, Off Coastal Expressway, Epe, Lagos, Nigeria",
      actionText: "Get Directions",
      actionHref: "https://maps.google.com",
    },
    {
      icon: Phone,
      title: "Direct Line & WhatsApp",
      detail: "+234 (0) 800 MAGVILLE / +234 (0) 812 345 6789",
      actionText: "Call Concierge",
      actionHref: "tel:+23480062484553",
    },
    {
      icon: Mail,
      title: "Email Inquiries",
      detail: "reservations@magvillehotel.com • info@magvillehotel.com",
      actionText: "Send Mail",
      actionHref: "mailto:reservations@magvillehotel.com",
    },
    {
      icon: Clock,
      title: "Front Desk & Concierge",
      detail: "24 Hours a Day / 7 Days a Week",
      actionText: "Book Room",
      actionClick: () => setIsModalOpen(true),
    },
  ];

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
            We Are At Your Service
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif uppercase tracking-tight mb-6"
          >
            Contact & Location
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted text-sm md:text-base max-w-xl mx-auto leading-relaxed"
          >
            Have questions about room availability, private events, or airport
            pickups? Reach out to our 24/7 concierge team.
          </motion.p>
        </div>
      </section>

      {/* 📞 2. CONTACT DETAILS CARDS */}
      <section className="py-16 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactDetails.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-black/50 border border-white/10 hover:border-accent/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 bg-accent/10 text-accent w-fit mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-serif mb-2">{item.title}</h3>
                  <p className="text-xs text-muted leading-relaxed mb-6">
                    {item.detail}
                  </p>
                </div>

                {item.actionClick ? (
                  <button
                    onClick={item.actionClick}
                    className="text-xs text-accent font-semibold tracking-widest uppercase hover:underline flex items-center space-x-1"
                  >
                    <span>{item.actionText}</span>
                    <Navigation className="w-3 h-3" />
                  </button>
                ) : (
                  <a
                    href={item.actionHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-accent font-semibold tracking-widest uppercase hover:underline flex items-center space-x-1"
                  >
                    <span>{item.actionText}</span>
                    <Navigation className="w-3 h-3" />
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ✉️ 3. CONTACT FORM & MAP SECTION */}
      <section className="py-12 px-4 md:px-12 max-w-7xl mx-auto pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black/60 border border-white/10 p-8 md:p-10 relative"
          >
            <div className="mb-8">
              <span className="text-accent text-[10px] tracking-[0.3em] uppercase font-bold block mb-1">
                Direct Inquiry
              </span>
              <h2 className="text-2xl font-serif uppercase">
                Send Us A Message
              </h2>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-accent mx-auto" />
                <h3 className="text-xl font-serif">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-muted">
                  Our desk representative will contact you within 30 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-muted block mb-2 font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Chief Tayo Bello"
                    className="w-full bg-dark/80 border border-white/10 px-4 py-3 text-xs text-main focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-muted block mb-2 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="tayo@example.com"
                      className="w-full bg-dark/80 border border-white/10 px-4 py-3 text-xs text-main focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-muted block mb-2 font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+234 800 000 0000"
                      className="w-full bg-dark/80 border border-white/10 px-4 py-3 text-xs text-main focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] tracking-widest uppercase text-muted block mb-2 font-medium">
                    Subject / Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full bg-dark/80 border border-white/10 px-4 py-3 text-xs text-main focus:outline-none focus:border-accent transition-colors"
                  >
                    <option value="General Inquiry" className="bg-dark">
                      General Inquiry
                    </option>
                    <option value="Room Booking" className="bg-dark">
                      Room Booking / Extensions
                    </option>
                    <option value="Event Hosting" className="bg-dark">
                      Hall & Private Events
                    </option>
                    <option value="Airport Transfer" className="bg-dark">
                      Airport Transfer Booking
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] tracking-widest uppercase text-muted block mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us how we can assist your stay..."
                    className="w-full bg-dark/80 border border-white/10 px-4 py-3 text-xs text-main focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-accent text-dark font-semibold text-xs tracking-widest uppercase hover:bg-white transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-accent/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Concierge Message</span>
                </button>
              </form>
            )}
          </motion.div>

          {/* Map / Location Embed Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} perspective={1000}>
              <div className="border border-white/10 p-3 bg-black/40 backdrop-blur-md relative h-[420px] overflow-hidden">
                {/* Embedded Interactive Map Placeholder */}
                <iframe
                  title="Magville Hotel Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63428.18841774213!2d3.935102!3d6.583138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf80b88939b4b%3A0xb3518b5258e74e44!2sEpe%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                  className="w-full h-full grayscale opacity-80 contrast-125 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  loading="lazy"
                />
              </div>
            </Tilt>

            <div className="bg-black/50 border border-white/10 p-6 space-y-3">
              <div className="flex items-center space-x-3 text-accent">
                <MessageSquare className="w-5 h-5 shrink-0" />
                <h4 className="font-serif font-bold text-sm text-main uppercase">
                  Need Instant Booking Assistance?
                </h4>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Prefer direct chatting over WhatsApp? Click below to reach our
                reservations desk instantly.
              </p>
              <a
                href="https://wa.me/23480062484553"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block pt-2 text-xs text-accent font-semibold tracking-widest uppercase hover:underline"
              >
                Chat via WhatsApp →
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
