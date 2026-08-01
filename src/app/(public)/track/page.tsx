"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Suspense } from "react";
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
  MessageSquare,
} from "lucide-react";
import { trackReservation } from "../../../store/redux/actions/publicActions";
import { RootState } from "../../../store/store";

function TrackBookingPage() {
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
      case "CHECKED_IN":
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider rounded-full">
            <Bed className="w-3.5 h-3.5" />
            <span>Checked In</span>
          </span>
        );
      case "CHECKED_OUT":
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Checked Out</span>
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

  // ============= temporary safe lookups for currentReservation fields =============

  // Safe lookup for Admin Action Reason (backend integration ready with dynamic dummy fallbacks)
  const getAdminReason = () => {
    // 1. Check for real backend fields when integrated
    if (currentReservation?.adminReason) return currentReservation.adminReason;
    if (currentReservation?.statusReason)
      return currentReservation.statusReason;
    if (currentReservation?.cancellationReason)
      return currentReservation.cancellationReason;
    if (currentReservation?.rejectionReason)
      return currentReservation.rejectionReason;

    // 2. Dynamic fallback messages based on status
    const status = currentReservation?.status?.toUpperCase();
    switch (status) {
      case "CONFIRMED":
      case "APPROVED":
        return "Your reservation has been reviewed and approved by management. We look forward to hosting you.";
      case "CHECKED_IN":
        return "Welcome to Magville Hotel & Resort! Your check-in process is complete. Please let concierge know if you need anything during your stay.";
      case "CHECKED_OUT":
        return "Thank you for staying with us! Your check-out has been processed successfully. We hope you enjoyed your time at Magville Hotel & Resort.";
      case "CANCELLED":
      case "REJECTED":
        return "Unfortunately, your reservation request could not be accepted due to room unavailability for the requested dates.";
      default:
        return "Your reservation is currently under manual review by our concierge team. No further action is required from you at this time.";
    }
  };

  const getReasonCardStyle = (status: string) => {
    switch (status?.toUpperCase()) {
      case "CONFIRMED":
      case "APPROVED":
        return "bg-green-500/5 border-green-500/20 text-green-300";
      case "CHECKED_IN":
        return "bg-blue-500/5 border-blue-500/20 text-blue-300";
      case "CHECKED_OUT":
        return "bg-purple-500/5 border-purple-500/20 text-purple-300";
      case "CANCELLED":
      case "REJECTED":
        return "bg-red-500/5 border-red-500/20 text-red-300";
      default:
        return "bg-amber-500/5 border-amber-500/20 text-amber-300";
    }
  };
  // ============== temporary safe lookups for currentReservation fields and dummy data =============

  // Payment & Next-Steps Instructions based on Booking Status
  const getPaymentDirections = () => {
    const status = currentReservation?.status?.toUpperCase();

    switch (status) {
      case "CONFIRMED":
      case "APPROVED":
        return {
          title: "Payment Directions & Confirmation",
          style: "bg-amber-500/10 border-amber-500/30 text-amber-200",
          content: (
            <div className="space-y-2">
              <p>
                Your booking request is approved! You may now proceed to make
                payment to our official account:
              </p>
              <div className="bg-black/40 p-3 rounded border border-white/10 font-mono text-xs space-y-1 text-white">
                <div>
                  <span className="text-muted">Bank:</span> Zenith Bank
                </div>
                <div>
                  <span className="text-muted">Account Name:</span> Magville
                  Hotel & Resort
                </div>
                <div>
                  <span className="text-muted">Account Number:</span> 1234567890
                </div>
              </div>
              <p className="pt-1">
                After payment, please send your receipt of payment along with
                your reference code (
                <span className="text-accent font-mono font-bold">
                  {currentReservation?.bookingRef}
                </span>
                ) via WhatsApp to{" "}
                <a
                  href={`https://wa.me/2348137650764?text=Hello%2C%20I%20have%20made%20payment%20for%20my%20reservation%20ref%20${currentReservation?.bookingRef}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline font-semibold hover:brightness-125 transition-all"
                >
                  +234 813 765 0764
                </a>
                .
              </p>
            </div>
          ),
        };

      case "CHECKED_IN":
        return {
          title: "In-House Concierge & Guest Services",
          style: "bg-blue-500/10 border-blue-500/20 text-blue-300",
          content: (
            <div className="space-y-2">
              <p>
                We hope you enjoy your stay! For room service, extra amenities,
                dining reservations, or assistance, dial{" "}
                <span className="font-bold text-white">0</span> on your room
                phone or contact desk via WhatsApp.
              </p>
              <a
                href={`https://wa.me/2348137650764?text=Hello%2C%20I%20am%20currently%20checked%20in%20with%20ref%20${currentReservation?.bookingRef}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-accent underline font-semibold hover:brightness-125 transition-all pt-1"
              >
                Contact Concierge Desk →
              </a>
            </div>
          ),
        };

      case "CHECKED_OUT":
        return {
          title: "Departure Note",
          style: "bg-purple-500/10 border-purple-500/20 text-purple-300",
          content: (
            <p>
              Thank you for dining and staying with us at Magville Hotel &
              Resort. We hope you had a pleasant stay and look forward to
              welcoming you back again soon!
            </p>
          ),
        };

      case "CANCELLED":
      case "REJECTED":
        return {
          title: "Next Steps",
          style: "bg-red-500/10 border-red-500/20 text-red-300",
          content: (
            <p>
              We are sorry, but we cannot fulfill this reservation request at
              this time. You may try selecting a different room category or
              choosing alternate dates for your stay.
            </p>
          ),
        };

      default:
        return {
          title: "Pending Action",
          style: "bg-blue-500/10 border-blue-500/20 text-blue-300",
          content: (
            <p>
              Please wait while our concierge team verifies availability. Rooms
              are typically confirmed within 15–30 minutes during standard
              operational hours.
            </p>
          ),
        };
    }
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

            {/* 💬 Admin Action Reason Block */}
            <div className="pt-4 border-t border-white/10 space-y-1 text-xs">
              <span className="text-muted text-[10px] uppercase tracking-wider block">
                Management Note / Status Reason
              </span>
              <div
                className={`flex items-start space-x-2.5 p-3 rounded border transition-colors ${getReasonCardStyle(
                  currentReservation.status,
                )}`}
              >
                <MessageSquare className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-80" />
                <p className="text-xs font-sans leading-relaxed">
                  {getAdminReason()}
                </p>
              </div>
            </div>

            {/* 💳 Payment & Next Steps Instructions */}
            {(() => {
              const direction = getPaymentDirections();
              return (
                <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
                  <span className="text-muted text-[10px] uppercase tracking-wider block">
                    {direction.title}
                  </span>
                  <div
                    className={`p-4 rounded border text-xs font-sans leading-relaxed ${direction.style}`}
                  >
                    {direction.content}
                  </div>
                </div>
              );
            })()}

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

export default function TrackPage() {
  return (
    <Suspense fallback={null}>
      <TrackBookingPage />
    </Suspense>
  );
}
