"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  Loader2,
  Calendar,
  User,
  Mail,
  ShieldAlert,
  CheckCircle2,
  Clock,
  XCircle,
  Bed,
  CreditCard,
  FileText,
} from "lucide-react";
import { trackReservation } from "../../../store/redux/actions/publicActions";
import { RootState } from "../../../store/store";

export default function TrackBookingPage() {
  const dispatch = useDispatch<any>();
  const [reference, setReference] = useState("");

  // ⚡ 1. Read query parameters from URL
  const searchParams = useSearchParams();

  // ⚡ 2. Auto-fill input & trigger search if ref parameter exists
  useEffect(() => {
    const refFromUrl = searchParams.get("ref");
    if (refFromUrl) {
      setReference(refFromUrl);
      dispatch(trackReservation(refFromUrl));
    }
  }, [searchParams, dispatch]);

  const { currentReservation, loading, error } = useSelector(
    (state: RootState) => state.reservation,
  );

  const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "CONFIRMED":
      case "APPROVED":
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold uppercase tracking-wider rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Confirmed</span>
          </span>
        );
      case "CANCELLED":
      case "REJECTED":
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-wider rounded-full">
            <XCircle className="w-3.5 h-3.5" />
            <span>Cancelled</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider rounded-full">
            <Clock className="w-3.5 h-3.5" />
            <span>Pending Approval</span>
          </span>
        );
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference.trim()) return;

    // The reducer will automatically clear currentReservation when
    // TRACK_RESERVATION_REQUEST fires!
    dispatch(trackReservation(reference));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReference(e.target.value);
  };

  // Safe field lookups supporting direct values or nested payload properties
  const guestDisplayName =
    currentReservation?.guestName || currentReservation?.fullName || "N/A";
  const roomCategory =
    currentReservation?.room?.category?.name ||
    currentReservation?.room?.name ||
    "Standard Suite";
  const roomNum = currentReservation?.room?.roomNumber;
  const amountToDisplay =
    currentReservation?.totalAmount ?? currentReservation?.totalPrice;
  const bookingNotes =
    currentReservation?.notes || currentReservation?.specialRequests;

  return (
    <div className="min-h-screen bg-dark text-main py-40 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-[10px] text-accent uppercase tracking-[0.3em] font-bold">
            Concierge Portal
          </span>
          <h1 className="text-3xl md:text-4xl font-serif text-white">
            Track Your Reservation
          </h1>
          <p className="text-xs text-muted max-w-md mx-auto">
            Enter your unique reference code (MAG-XXXXXX) to view real-time
            details and status updates for your booking.
          </p>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSearch} className="relative flex items-center">
          <input
            type="text"
            value={reference}
            onChange={handleInputChange}
            placeholder="e.g. MAG-58201"
            className="w-full bg-black/60 border border-white/15 px-4 py-4 pr-32 text-sm text-white placeholder-muted focus:outline-none focus:border-accent uppercase font-mono tracking-widest"
          />
          <button
            type="submit"
            disabled={loading || !reference.trim()}
            className="absolute right-2 bg-accent text-dark px-5 py-2.5 text-xs font-semibold uppercase tracking-wider hover:brightness-110 transition-all flex items-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Track</span>
              </>
            )}
          </button>
        </form>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center space-x-3"
          >
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Booking Details Card — Only shown when currentReservation exists AND there is no error */}
        {currentReservation && !loading && !error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/40 border border-white/15 p-6 md:p-8 space-y-6"
          >
            {/* Header / Ref & Status */}
            <div className="flex flex-wrap justify-between items-center pb-4 border-b border-white/10 gap-3">
              <div>
                <span className="text-[10px] text-muted uppercase tracking-widest block">
                  Reference Code
                </span>
                <span className="text-lg font-mono font-bold text-accent">
                  {currentReservation.bookingRef}
                </span>
              </div>
              <div>{getStatusBadge(currentReservation.status)}</div>
            </div>

            {/* Main Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Guest Name */}
              <div className="space-y-1">
                <span className="text-muted text-[10px] uppercase tracking-wider block">
                  Guest Name
                </span>
                <div className="flex items-center space-x-2 text-white capitalize">
                  <User className="w-3.5 h-3.5 text-accent" />
                  <span>{guestDisplayName}</span>
                </div>
              </div>

              {/* Contact Email (If Present) */}
              {currentReservation.email && (
                <div className="space-y-1">
                  <span className="text-muted text-[10px] uppercase tracking-wider block">
                    Contact Email
                  </span>
                  <div className="flex items-center space-x-2 text-white">
                    <Mail className="w-3.5 h-3.5 text-accent" />
                    <span>{currentReservation.email}</span>
                  </div>
                </div>
              )}

              {/* Check-In */}
              <div className="space-y-1">
                <span className="text-muted text-[10px] uppercase tracking-wider block">
                  Check-In
                </span>
                <div className="flex items-center space-x-2 text-white">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  <span>
                    {new Date(
                      currentReservation.checkInDate,
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Check-Out */}
              <div className="space-y-1">
                <span className="text-muted text-[10px] uppercase tracking-wider block">
                  Check-Out
                </span>
                <div className="flex items-center space-x-2 text-white">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  <span>
                    {new Date(
                      currentReservation.checkOutDate,
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Room Details */}
              <div className="space-y-1">
                <span className="text-muted text-[10px] uppercase tracking-wider block">
                  Room & Category
                </span>
                <div className="flex items-center space-x-2 text-white">
                  <Bed className="w-3.5 h-3.5 text-accent" />
                  <span>
                    {roomCategory}{" "}
                    {roomNum && (
                      <span className="text-accent font-mono ml-1">
                        ({roomNum})
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {/* Booking Date */}
              {currentReservation.createdAt && (
                <div className="space-y-1">
                  <span className="text-muted text-[10px] uppercase tracking-wider block">
                    Booked On
                  </span>
                  <div className="flex items-center space-x-2 text-white">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    <span>
                      {new Date(currentReservation.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Guest Notes / Special Requests */}
            {bookingNotes && (
              <div className="pt-4 border-t border-white/10 space-y-1 text-xs">
                <span className="text-muted text-[10px] uppercase tracking-wider block">
                  Guest Notes / Special Requests
                </span>
                <div className="flex items-start space-x-2 text-white/90 bg-white/5 p-3 rounded border border-white/10">
                  <FileText className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                  <p className="whitespace-pre-line text-xs font-sans">
                    {bookingNotes}
                  </p>
                </div>
              </div>
            )}

            {/* Total Amount Footer */}
            {amountToDisplay !== undefined && amountToDisplay !== null && (
              <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                <div className="flex items-center space-x-2 text-muted">
                  <CreditCard className="w-4 h-4 text-accent" />
                  <span className="text-[10px] uppercase tracking-wider">
                    Total Amount Due
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-accent font-serif font-bold text-lg">
                    ₦{Number(amountToDisplay).toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
