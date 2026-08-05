"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  X,
  Calendar,
  User,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Loader2,
  AlertCircle,
  Copy,
  Search,
} from "lucide-react";
import Link from "next/link";
import { reservationValidationSchema } from "../utils/validationSchemas";
import { getRoomPrice, Room } from "@/app/(public)/rooms/types";
import {
  createReservation,
  clearReservationState,
} from "../store/redux/actions/publicActions";
import { RootState } from "../store/store";
import { useAdminToast } from "@/app/(admin)/context/ToastContext";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: Room | null;
}

export default function ReservationModal({
  isOpen,
  onClose,
  room,
}: ReservationModalProps) {
  const dispatch = useDispatch<any>();
  const { showToast } = useAdminToast();
  const [step, setStep] = useState<1 | 2>(1);
  const searchParams = useSearchParams();

  // Redux state
  const { loading, error, success, bookingRef } = useSelector(
    (state: RootState) => state.reservation,
  );

  useEffect(() => {
    if (error) {
      showToast("error", "Reservation Error", error);
    }
  }, [error, showToast]);

  useEffect(() => {
    if (success && bookingRef) {
      showToast(
        "success",
        "Booking Confirmed",
        `Reservation submitted successfully! Ref: ${bookingRef}`,
      );
    }
  }, [success, bookingRef, showToast]);

  // Formik handles form state and submission
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      idType: "Passport",
      idNumber: "",
      checkInDate: "",
      checkOutDate: "",
      guests: "2 Guests",
      specialNotes: "",
    },
    validationSchema: reservationValidationSchema,
    onSubmit: async (values) => {
      if (!room) return;

      const payload = {
        fullName: values.fullName,
        email: values.email || undefined,
        phone: values.phone,
        idType: values.idType,
        idNumber: values.idNumber,
        roomId: room.id,
        checkInDate: values.checkInDate,
        checkOutDate: values.checkOutDate,
        specialRequests: values.specialNotes || undefined,
      };

      try {
        await dispatch(createReservation(payload));
      } catch (err: any) {
        showToast(
          "error",
          "Submission Failed",
          err?.message || "Failed to process reservation request.",
        );
      }
    },
  });

  // Automatically sync URL search params into Formik when modal opens
  useEffect(() => {
    if (isOpen) {
      const urlCheckIn = searchParams.get("checkIn") || "";
      const urlCheckOut = searchParams.get("checkOut") || "";

      if (urlCheckIn) formik.setFieldValue("checkInDate", urlCheckIn);
      if (urlCheckOut) formik.setFieldValue("checkOutDate", urlCheckOut);
    }
  }, [isOpen, searchParams]);

  // Safely extract room image with multiple fallback keys
  const roomImageUrl = useMemo(() => {
    if (!room) return "/images/room-placeholder.jpg";
    if (typeof room.image === "string" && room.image.trim().length > 0)
      return room.image;

    // Check array fallback if room.images exists
    const roomAny = room as any;
    if (Array.isArray(roomAny.images) && roomAny.images.length > 0) {
      return typeof roomAny.images[0] === "string"
        ? roomAny.images[0]
        : roomAny.images[0]?.url;
    }
    if (roomAny.coverImage) return roomAny.coverImage;

    return "/images/room-placeholder.jpg";
  }, [room]);

  // Calculate duration and prices
  const calculatedNights = useMemo(() => {
    if (!formik.values.checkInDate || !formik.values.checkOutDate) return 1;
    const checkIn = new Date(formik.values.checkInDate);
    const checkOut = new Date(formik.values.checkOutDate);
    const diffTime = checkOut.getTime() - checkIn.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [formik.values.checkInDate, formik.values.checkOutDate]);

  const roomPrice = useMemo(() => {
    if (!room) return 0;
    return typeof getRoomPrice === "function"
      ? getRoomPrice(room)
      : room.price || 0;
  }, [room]);

  const totalPrice = useMemo(() => {
    return roomPrice * calculatedNights;
  }, [roomPrice, calculatedNights]);

  const handleNextStep = async () => {
    formik.setFieldTouched("checkInDate", true);
    formik.setFieldTouched("checkOutDate", true);

    const errors = await formik.validateForm();
    if (!errors.checkInDate && !errors.checkOutDate) {
      setStep(2);
    } else {
      const firstError = errors.checkInDate || errors.checkOutDate;
      showToast(
        "warning",
        "Incomplete Dates",
        (firstError as string) || "Please fill in all required stay dates.",
      );
    }
  };

  const handleResetAndClose = () => {
    dispatch(clearReservationState());
    setStep(1);
    formik.resetForm();
    onClose();
  };

  // if (!isOpen || !room) return null;
  if (!isOpen || !room) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleResetAndClose}
          className="absolute inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          // className="relative w-full max-w-4xl bg-gradient-to-b from-[#121212] to-dark border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden text-main z-10 grid grid-cols-1 lg:grid-cols-12"
          className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-b from-[#121212] to-dark border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden text-main z-10 grid grid-cols-1 lg:grid-cols-12 rounded-xl"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={handleResetAndClose}
            className="absolute top-4 right-4 z-30 p-2 text-muted hover:text-accent bg-black/50 backdrop-blur-md rounded-full border border-white/10 transition-all hover:scale-105"
          >
            <X className="w-5 h-5" />
          </button>

          {/* LEFT SIDE: Room Details & Cost Summary */}
          {/* <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full flex flex-col justify-between p-6 lg:p-8 overflow-hidden bg-black/60 border-b lg:border-b-0 lg:border-r border-white/10"> */}
          <div className="lg:col-span-5 relative min-h-[180px] lg:min-h-full flex flex-col justify-between p-5 lg:p-8 overflow-hidden bg-black/60 border-b lg:border-b-0 lg:border-r border-white/10 shrink-0">
            {/* Optimized Next.js Background Image with Fallback */}
            <div className="absolute inset-0 z-0 opacity-40 transition-all duration-700">
              <Image
                src={roomImageUrl}
                alt={room.name || "Room Image"}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center scale-105"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent z-0" />

            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-accent/15 border border-accent/30 rounded-full mb-3">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span className="text-[10px] text-accent font-semibold uppercase tracking-[0.25em]">
                  Guaranteed Reservation
                </span>
              </div>
              <h4 className="text-2xl font-serif text-white tracking-wide leading-tight">
                {room.name}
              </h4>
              <p className="text-xs text-muted uppercase tracking-widest mt-1">
                {typeof room.category === "object"
                  ? room.category?.name
                  : room.category}
              </p>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-white/15 space-y-3">
              <div className="flex justify-between items-center text-xs text-muted">
                <span>Rate per night</span>
                <span className="text-white font-mono">
                  ₦{roomPrice.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs text-muted">
                <span>Selected Duration</span>
                <span className="text-white font-mono">
                  {calculatedNights}{" "}
                  {calculatedNights === 1 ? "Night" : "Nights"}
                </span>
              </div>

              <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                <div>
                  <span className="text-[10px] text-accent tracking-widest uppercase font-semibold block">
                    Estimated Total
                  </span>
                  <span className="text-2xl font-serif font-bold text-accent">
                    ₦{totalPrice.toLocaleString()}
                  </span>
                </div>
                <span className="text-[10px] text-muted">Taxes inclusive</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Interactive Form & Success Screen */}
          {/* <div className="lg:col-span-7 p-6 lg:p-8 flex flex-col justify-between"> */}
          <div className="lg:col-span-7 p-5 lg:p-8 flex flex-col justify-between overflow-y-auto max-h-[calc(90vh-180px)] lg:max-h-[90vh]">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 flex flex-col items-center text-center space-y-5 my-auto"
              >
                <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent flex items-center justify-center text-accent">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-[10px] text-accent uppercase tracking-[0.3em] font-bold block mb-1">
                    Request Received
                  </span>
                  <h3 className="text-2xl font-serif text-white">
                    Reservation Pending Approval
                  </h3>
                </div>

                <div className="w-full bg-black/60 border border-white/10 p-4 text-left space-y-2">
                  <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                    <span className="text-muted uppercase tracking-wider text-[10px]">
                      Booking Reference
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-accent font-mono font-bold tracking-wider">
                        {bookingRef}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          navigator.clipboard.writeText(bookingRef || "")
                        }
                        className="text-white/40 hover:text-accent transition-colors"
                        title="Copy reference code"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-1">
                    <span className="text-muted">Primary Guest</span>
                    <span className="text-white">{formik.values.fullName}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted">Contact Email</span>
                    <span className="text-white">{formik.values.email}</span>
                  </div>
                </div>

                <p className="text-xs text-muted leading-relaxed max-w-md">
                  Our concierge team is verifying availability for your
                  requested dates. You will receive a confirmation email
                  shortly. In the meantime, keep your reference code{" "}
                  <span className="text-accent font-mono font-semibold">
                    {bookingRef}
                  </span>{" "}
                  safe to monitor your reservation status live.
                </p>

                <div className="w-full space-y-2 pt-2">
                  <Link
                    href={`/track?ref=${bookingRef || ""}`}
                    onClick={handleResetAndClose}
                    className="w-full flex items-center justify-center gap-2 bg-accent text-dark py-3.5 text-xs uppercase tracking-[0.2em] font-semibold hover:brightness-110 transition-all"
                  >
                    <Search className="w-4 h-4" />
                    Track Reservation Status
                  </Link>

                  <Link
                    href="/"
                    onClick={handleResetAndClose}
                    className="w-full bg-white/5 border border-white/10 text-white/70 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-white/10 hover:text-white transition-all text-center block"
                  >
                    Return to Home
                  </Link>
                </div>
              </motion.div>
            ) : (
              <div>
                {/* Stepper Progress */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        step === 1
                          ? "bg-accent text-dark"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      1
                    </div>
                    <span
                      className={`text-xs uppercase tracking-wider ${
                        step === 1 ? "text-accent font-semibold" : "text-muted"
                      }`}
                    >
                      Dates & Stay
                    </span>
                  </div>

                  <ChevronRight className="w-4 h-4 text-muted" />

                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        step === 2
                          ? "bg-accent text-dark"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      2
                    </div>
                    <span
                      className={`text-xs uppercase tracking-wider ${
                        step === 2 ? "text-accent font-semibold" : "text-muted"
                      }`}
                    >
                      Guest Details
                    </span>
                  </div>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={formik.handleSubmit}>
                  {/* STEP 1: DATES & STAY */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] text-muted uppercase tracking-widest block mb-1">
                            Check-In Date *
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              name="checkInDate"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.checkInDate}
                              className="w-full bg-black/60 border border-white/15 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-accent [color-scheme:dark]"
                            />
                            <Calendar className="w-4 h-4 text-accent absolute right-3 top-2.5 pointer-events-none" />
                          </div>
                          {formik.touched.checkInDate &&
                            formik.errors.checkInDate && (
                              <p className="text-red-400 text-[10px] mt-1">
                                {formik.errors.checkInDate as string}
                              </p>
                            )}
                        </div>

                        <div>
                          <label className="text-[10px] text-muted uppercase tracking-widest block mb-1">
                            Check-Out Date *
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              name="checkOutDate"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.checkOutDate}
                              className="w-full bg-black/60 border border-white/15 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-accent [color-scheme:dark]"
                            />
                            <Calendar className="w-4 h-4 text-accent absolute right-3 top-2.5 pointer-events-none" />
                          </div>
                          {formik.touched.checkOutDate &&
                            formik.errors.checkOutDate && (
                              <p className="text-red-400 text-[10px] mt-1">
                                {formik.errors.checkOutDate as string}
                              </p>
                            )}
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-muted uppercase tracking-widest block mb-1">
                          Number of Guests
                        </label>
                        <select
                          name="guests"
                          onChange={formik.handleChange}
                          value={formik.values.guests}
                          className="w-full bg-black/60 border border-white/15 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-accent"
                        >
                          <option value="1 Guest" className="bg-dark">
                            01 Guest
                          </option>
                          <option value="2 Guests" className="bg-dark">
                            02 Guests (Recommended)
                          </option>
                          <option value="3 Guests" className="bg-dark">
                            03 Guests
                          </option>
                          <option value="4+ Guests" className="bg-dark">
                            04+ Guests (Family)
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] text-muted uppercase tracking-widest block mb-1">
                          Special Requests & Preferences
                        </label>
                        <textarea
                          name="specialNotes"
                          rows={2}
                          placeholder="e.g. Airport pickup, late check-in..."
                          onChange={formik.handleChange}
                          value={formik.values.specialNotes}
                          className="w-full bg-black/60 border border-white/15 p-3 text-xs text-white focus:outline-none focus:border-accent resize-none"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-full bg-accent text-dark py-3.5 text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center space-x-2 hover:brightness-110 transition-all mt-6 cursor-pointer"
                      >
                        <span>Continue to Guest Info</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}

                  {/* STEP 2: GUEST DETAILS */}
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="text-[10px] text-muted uppercase tracking-widest block mb-1">
                          Full Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="fullName"
                            placeholder="e.g. Chief Alexander Cole"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fullName}
                            className="w-full bg-black/60 border border-white/15 pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-accent"
                          />
                          <User className="w-4 h-4 text-muted absolute left-3 top-2.5" />
                        </div>
                        {formik.touched.fullName && formik.errors.fullName && (
                          <p className="text-red-400 text-[10px] mt-1">
                            {formik.errors.fullName}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] text-muted uppercase tracking-widest block mb-1">
                            Email Address *
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              name="email"
                              placeholder="alexander@domain.com"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.email}
                              className="w-full bg-black/60 border border-white/15 pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-accent"
                            />
                            <Mail className="w-4 h-4 text-muted absolute left-3 top-2.5" />
                          </div>
                          {formik.touched.email && formik.errors.email && (
                            <p className="text-red-400 text-[10px] mt-1">
                              {formik.errors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="text-[10px] text-muted uppercase tracking-widest block mb-1">
                            Phone Number *
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="phone"
                              placeholder="+234 800 000 0000"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.phone}
                              className="w-full bg-black/60 border border-white/15 pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-accent"
                            />
                            <Phone className="w-4 h-4 text-muted absolute left-3 top-2.5" />
                          </div>
                          {formik.touched.phone && formik.errors.phone && (
                            <p className="text-red-400 text-[10px] mt-1">
                              {formik.errors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Identification Type */}
                      <div>
                        <label className="text-[10px] text-muted uppercase tracking-widest block mb-1">
                          Identification Type
                        </label>
                        <select
                          name="idType"
                          onChange={formik.handleChange}
                          value={formik.values.idType}
                          className="w-full bg-black/60 border border-white/15 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-accent"
                        >
                          <option value="Passport" className="bg-dark">
                            International Passport
                          </option>
                          <option value="Driver License" className="bg-dark">
                            Driver's License
                          </option>
                          <option value="NIN" className="bg-dark">
                            National Identity (NIN)
                          </option>
                        </select>
                      </div>

                      {/* ID / Passport Number Field */}
                      <div>
                        <label className="text-[10px] text-muted uppercase tracking-widest block mb-1">
                          ID / Passport Number *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="idNumber"
                            placeholder="e.g. A12345678"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.idNumber}
                            className="w-full bg-black/60 border border-white/15 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-accent"
                          />
                        </div>
                        {formik.touched.idNumber && formik.errors.idNumber && (
                          <p className="text-red-400 text-[10px] mt-1">
                            {formik.errors.idNumber as string}
                          </p>
                        )}
                      </div>

                      <div className="p-3 bg-accent/10 border border-accent/20 text-[11px] text-accent flex items-start space-x-2.5">
                        <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                        <span className="leading-snug">
                          <strong>Zero Risk Hold:</strong> No immediate charge
                          is made today. We verify availability before
                          requesting payment.
                        </span>
                      </div>

                      <div className="flex space-x-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="w-1/3 border border-white/15 text-muted hover:text-white py-3.5 text-xs uppercase tracking-wider flex items-center justify-center space-x-1 cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back</span>
                        </button>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-2/3 bg-accent text-dark py-3.5 text-xs font-semibold uppercase tracking-[0.2em] hover:brightness-110 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                        >
                          {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <span>Confirm Request</span>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </form>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
