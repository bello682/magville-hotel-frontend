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
import GuestReceiptModal from "@/components/GuestReceiptModal";

function TrackBookingPage() {
  const dispatch = useDispatch<any>();
  const [reference, setReference] = useState("");
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const searchParams = useSearchParams();

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
            <div className="space-y-3">
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

              {/* Reference & WhatsApp Contact Details */}
              <div className="pt-2 border-t border-white/10 space-y-1">
                <p>
                  Reference Code:{" "}
                  <span className="text-accent font-mono font-bold">
                    {currentReservation?.bookingRef}
                  </span>
                </p>
                <p>
                  Send receipt via WhatsApp:{" "}
                  <a
                    href={`https://wa.me/2348134897802?text=Hello%2C%20I%20have%20made%20payment%20for%20my%20reservation%20ref%20${currentReservation?.bookingRef}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline font-semibold hover:brightness-125 transition-all"
                  >
                    +234 813 765 0764
                  </a>
                </p>
              </div>
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
                href={`https://wa.me/2348134897802?text=Hello%2C%20I%20am%20currently%20checked%20in%20with%20ref%20${currentReservation?.bookingRef}`}
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
            <div className="space-y-2">
              <p>
                We are sorry, but we cannot fulfill this reservation request at
                this time. You may try selecting a different room category or
                choosing alternate dates for your stay. For further assistance,
                please contact our concierge desk via WhatsApp.
              </p>
              <a
                href={`https://wa.me/2348134897802?text=Hello%2C%20I%20have%20an%20inquiry%20regarding%20my%20cancelled%2Frejected%20reservation%20ref%20${currentReservation?.bookingRef}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-accent underline font-semibold hover:brightness-125 transition-all pt-1"
              >
                Contact Concierge Desk →
              </a>
            </div>
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

  // ✅ Pure presentation — unchanged
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

  // ✅ Pure presentation — unchanged
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference.trim()) return;
    dispatch(trackReservation(reference));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReference(e.target.value);
  };

  // Safe field lookups
  const guestDisplayName = currentReservation?.guestName || "N/A";
  const roomCategory =
    currentReservation?.room?.category?.name || "Standard Suite";
  const roomNum = currentReservation?.room?.roomNumber;

  // Check if payment is completed/paid or if guest is partially paid
  const isPaid = currentReservation?.paymentStatus === "PAID";
  const isPartiallyPaid = currentReservation?.paymentStatus === "PARTIAL";

  const amountToDisplay = currentReservation?.totalAmount;
  const bookingNotes = currentReservation?.notes;

  // 🆕 Real message from the database — set by admin at time of action (approve/reject/check-in/check-out)
  const statusUpper = currentReservation?.status?.toUpperCase();
  const displayMessage =
    statusUpper === "REJECTED" || statusUpper === "CANCELLED"
      ? currentReservation?.rejectionReason
      : currentReservation?.guestMessage;

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

        {/* Booking Details Card */}
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
              <div className="space-y-1">
                <span className="text-muted text-[10px] uppercase tracking-wider block">
                  Guest Name
                </span>
                <div className="flex items-center space-x-2 text-white capitalize">
                  <User className="w-3.5 h-3.5 text-accent" />
                  <span>{guestDisplayName}</span>
                </div>
              </div>

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

            {/* 🆕 Real message from admin — only rendered if one actually exists */}
            {displayMessage && (
              <div className="pt-4 border-t border-white/10 space-y-1 text-xs">
                <span className="text-muted text-[10px] uppercase tracking-wider block">
                  Message from Magville Hotel
                </span>
                <div
                  className={`flex items-start space-x-2.5 p-3 rounded border transition-colors ${getReasonCardStyle(
                    currentReservation.status,
                  )}`}
                >
                  <MessageSquare className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-80" />
                  <p className="text-xs font-sans leading-relaxed whitespace-pre-line">
                    {displayMessage}
                  </p>
                </div>
              </div>
            )}

            {/* 🆕 Outstanding balance notices — only shown when relevant */}
            {currentReservation?.paymentStatus !== "PAID" && (
              <>
                {statusUpper === "CHECKED_IN" && (
                  <div className="pt-4 border-t border-white/10 space-y-1 text-xs">
                    <div className="flex items-start space-x-2.5 p-3 rounded border bg-amber-500/10 border-amber-500/30 text-amber-200">
                      <CreditCard className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <p className="text-xs font-sans leading-relaxed">
                        We kindly expect settlement of your outstanding balance
                        of{" "}
                        <span className="font-bold text-accent">
                          ₦
                          {Number(
                            currentReservation?.balanceRemaining,
                          ).toLocaleString()}
                        </span>{" "}
                        before check-out.
                      </p>
                    </div>
                  </div>
                )}

                {statusUpper === "APPROVED" &&
                  currentReservation?.totalPaid > 0 && (
                    <div className="pt-4 border-t border-white/10 space-y-1 text-xs">
                      <div className="flex items-start space-x-2.5 p-3 rounded border bg-blue-500/10 border-blue-500/20 text-blue-300">
                        <CreditCard className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <p className="text-xs font-sans leading-relaxed">
                          You've paid{" "}
                          <span className="font-bold text-accent">
                            ₦
                            {Number(
                              currentReservation?.totalPaid,
                            ).toLocaleString()}
                          </span>{" "}
                          so far. A remaining balance of{" "}
                          <span className="font-bold text-accent">
                            ₦
                            {Number(
                              currentReservation?.balanceRemaining,
                            ).toLocaleString()}
                          </span>{" "}
                          is expected at check-in.
                        </p>
                      </div>
                    </div>
                  )}
              </>
            )}

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
              <div className="pt-4 border-t border-white/10 space-y-3">
                {/* <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs"> */}
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center space-x-2 text-muted">
                    <CreditCard className="w-4 h-4 text-accent" />
                    <span className="text-[10px] uppercase tracking-wider">
                      {isPaid ? "Total Amount" : "Balance Due"}
                    </span>
                  </div>
                  <div className="text-right flex items-center space-x-2">
                    <span className="text-accent font-serif font-bold text-lg">
                      ₦
                      {Number(
                        isPaid
                          ? amountToDisplay
                          : (currentReservation?.balanceRemaining ??
                              amountToDisplay),
                      ).toLocaleString()}
                    </span>
                    {isPaid && (
                      <span className="text-[10px] bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded font-mono font-bold uppercase">
                        Paid
                      </span>
                    )}
                    {isPartiallyPaid && (
                      <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-mono font-bold uppercase">
                        Partial
                      </span>
                    )}
                  </div>
                </div>
                {/* 🆕 Only shown when admin has recorded at least one payment */}
                {currentReservation?.payments &&
                  currentReservation.payments.length > 0 && (
                    <button
                      onClick={() => setIsReceiptOpen(true)}
                      className="w-full flex items-center justify-center gap-2 border border-accent/40 text-accent hover:bg-accent/10 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all"
                    >
                      View Payment Receipt
                    </button>
                  )}
              </div>
            )}
          </motion.div>
        )}
        <GuestReceiptModal
          isOpen={isReceiptOpen}
          onClose={() => setIsReceiptOpen(false)}
          bookingRef={currentReservation?.bookingRef}
          guestName={guestDisplayName}
          roomNumber={roomNum}
          payments={currentReservation?.payments || []}
          totalAmount={currentReservation?.totalAmount || 0}
          totalPaid={currentReservation?.totalPaid || 0}
          balanceRemaining={currentReservation?.balanceRemaining || 0}
        />
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
