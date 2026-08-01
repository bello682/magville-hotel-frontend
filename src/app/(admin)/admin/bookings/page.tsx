"use client";

import { useState, useMemo } from "react";
import BookingsFilterBar from "./BookingsFilterBar";
import BookingsTable from "./BookingsTable";
import BookingDetailModal from "./BookingDetailModal";
import NewBookingModal, { NewBookingFormValues } from "./NewBookingModal";
import RejectReasonModal from "./RejectReasonModal";
import ConfirmActionModal from "./ConfirmActionModal";
import { Booking, BookingStatus } from "../../types/booking";

// 🔧 Mock data matching GET /api/v1/bookings response shape
const MOCK_BOOKINGS: Booking[] = [
  {
    id: "1",
    bookingRef: "MAG-58201",
    status: "PENDING",
    guestName: "Chief Alexander Cole",
    guestEmail: "alexander@email.com",
    guestPhone: "+234 800 000 0000",
    checkInDate: new Date().toISOString(),
    checkOutDate: new Date(Date.now() + 3 * 86400000).toISOString(),
    notes: "Requested a quiet floor, away from the elevator.",
    totalAmount: 165000,
    room: {
      id: "r1",
      roomNumber: "204",
      pricePerNight: 55000,
      category: { id: "c1", name: "Executive Suite" },
    },
    guest: {
      id: "g1",
      fullName: "Chief Alexander Cole",
      email: "alexander@email.com",
      phone: "+234 800 000 0000",
      idType: "Passport",
      idNumber: "A12345678",
    },
    payments: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    bookingRef: "MAG-58150",
    status: "APPROVED",
    guestName: "Amara Johnson",
    guestEmail: "amara@email.com",
    guestPhone: "+234 801 111 2222",
    checkInDate: new Date().toISOString(),
    checkOutDate: new Date(Date.now() + 2 * 86400000).toISOString(),
    notes: null,
    totalAmount: 110000,
    room: {
      id: "r2",
      roomNumber: "112",
      pricePerNight: 55000,
      category: { id: "c1", name: "Standard Deluxe" },
    },
    guest: {
      id: "g2",
      fullName: "Amara Johnson",
      email: "amara@email.com",
      phone: "+234 801 111 2222",
    },
    payments: [
      {
        id: "p1",
        amount: 55000,
        method: "BANK_TRANSFER",
        status: "PAID",
        createdAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    bookingRef: "MAG-58090",
    status: "CHECKED_IN",
    guestName: "Michael Adeyemi",
    guestEmail: "michael@email.com",
    guestPhone: "+234 802 333 4444",
    checkInDate: new Date(Date.now() - 86400000).toISOString(),
    checkOutDate: new Date(Date.now() + 86400000).toISOString(),
    notes: null,
    totalAmount: 110000,
    room: {
      id: "r3",
      roomNumber: "301",
      pricePerNight: 55000,
      category: { id: "c2", name: "Ocean View" },
    },
    guest: {
      id: "g3",
      fullName: "Michael Adeyemi",
      email: "michael@email.com",
      phone: "+234 802 333 4444",
    },
    payments: [
      {
        id: "p2",
        amount: 110000,
        method: "CASH",
        status: "PAID",
        createdAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
  },
];

const MOCK_ROOMS = [
  {
    id: "r1",
    roomNumber: "204",
    category: { id: "c1", name: "Executive Suite" },
  },
  {
    id: "r2",
    roomNumber: "112",
    category: { id: "c1", name: "Standard Deluxe" },
  },
  { id: "r4", roomNumber: "405", category: { id: "c2", name: "Ocean View" } },
];

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "ALL">(
    "ALL",
  );

  const [detailBooking, setDetailBooking] = useState<Booking | null>(null);
  const [rejectBooking, setRejectBooking] = useState<Booking | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    booking: Booking;
    type: "approve" | "checkIn" | "checkOut";
  } | null>(null);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesStatus = statusFilter === "ALL" || b.status === statusFilter;
      const matchesSearch =
        search.trim() === "" ||
        b.guestName.toLowerCase().includes(search.toLowerCase()) ||
        b.bookingRef.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [bookings, search, statusFilter]);

  // 🔧 These handlers simulate API calls — replace body with real fetch later
  const updateBookingStatus = (
    id: string,
    status: BookingStatus,
    rejectionReason?: string,
  ) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              status,
              rejectionReason: rejectionReason ?? b.rejectionReason,
            }
          : b,
      ),
    );
  };

  const handleConfirmApprove = () => {
    if (!confirmAction) return;
    setActionLoading(true);
    setTimeout(() => {
      updateBookingStatus(confirmAction.booking.id, "APPROVED");
      setActionLoading(false);
      setConfirmAction(null);
    }, 600);
  };

  const handleConfirmCheckIn = () => {
    if (!confirmAction) return;
    setActionLoading(true);
    setTimeout(() => {
      updateBookingStatus(confirmAction.booking.id, "CHECKED_IN");
      setActionLoading(false);
      setConfirmAction(null);
    }, 600);
  };

  const handleConfirmCheckOut = () => {
    if (!confirmAction) return;
    setActionLoading(true);
    setTimeout(() => {
      updateBookingStatus(confirmAction.booking.id, "CHECKED_OUT");
      setActionLoading(false);
      setConfirmAction(null);
    }, 600);
  };

  const handleReject = (reason: string) => {
    if (!rejectBooking) return;
    setActionLoading(true);
    setTimeout(() => {
      updateBookingStatus(rejectBooking.id, "REJECTED", reason);
      setActionLoading(false);
      setRejectBooking(null);
    }, 600);
  };

  const handleCreateBooking = (values: NewBookingFormValues) => {
    setActionLoading(true);
    setTimeout(() => {
      const room = MOCK_ROOMS.find((r) => r.id === values.roomId);
      const newBooking: Booking = {
        id: String(Date.now()),
        bookingRef: `MAG-${Math.floor(100000 + Math.random() * 900000)}`,
        status: values.isDirectCheckIn ? "CHECKED_IN" : "PENDING",
        guestName: values.guestName,
        guestEmail: values.guestEmail,
        guestPhone: values.guestPhone,
        checkInDate: values.checkInDate,
        checkOutDate: values.checkOutDate,
        notes: values.notes || null,
        totalAmount: 0,
        room: {
          id: values.roomId,
          roomNumber: room?.roomNumber || "N/A",
          pricePerNight: 0,
          category: room?.category,
        },
        guest: {
          id: String(Date.now()),
          fullName: values.guestName,
          email: values.guestEmail,
          phone: values.guestPhone,
          idType: values.idType,
          idNumber: values.idNumber,
        },
        payments: [],
        createdAt: new Date().toISOString(),
      };
      setBookings((prev) => [newBooking, ...prev]);
      setActionLoading(false);
      setIsNewBookingOpen(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold">
            Home / Admin / Bookings
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Bookings Management
          </h1>
        </div>
        <button
          onClick={() => setIsNewBookingOpen(true)}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition"
        >
          + New Booking
        </button>
      </div>

      <BookingsFilterBar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <BookingsTable
        bookings={filteredBookings}
        onViewDetail={setDetailBooking}
        onApprove={(booking) => setConfirmAction({ booking, type: "approve" })}
        onReject={setRejectBooking}
        onCheckIn={(booking) => setConfirmAction({ booking, type: "checkIn" })}
        onCheckOut={(booking) =>
          setConfirmAction({ booking, type: "checkOut" })
        }
      />

      <BookingDetailModal
        isOpen={!!detailBooking}
        onClose={() => setDetailBooking(null)}
        booking={detailBooking}
      />

      <NewBookingModal
        isOpen={isNewBookingOpen}
        onClose={() => setIsNewBookingOpen(false)}
        onSubmit={handleCreateBooking}
        rooms={MOCK_ROOMS}
        loading={actionLoading}
      />

      <RejectReasonModal
        isOpen={!!rejectBooking}
        onClose={() => setRejectBooking(null)}
        onConfirm={handleReject}
        loading={actionLoading}
      />

      <ConfirmActionModal
        isOpen={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        onConfirm={
          confirmAction?.type === "approve"
            ? handleConfirmApprove
            : confirmAction?.type === "checkIn"
              ? handleConfirmCheckIn
              : handleConfirmCheckOut
        }
        loading={actionLoading}
        tone={confirmAction?.type === "approve" ? "emerald" : "amber"}
        title={
          confirmAction?.type === "approve"
            ? "Approve This Booking?"
            : confirmAction?.type === "checkIn"
              ? "Check In This Guest?"
              : "Check Out This Guest?"
        }
        description={
          confirmAction
            ? `This will update booking ${confirmAction.booking.bookingRef} for ${confirmAction.booking.guestName}. An email notification will be sent to the guest where applicable.`
            : ""
        }
        confirmLabel={
          confirmAction?.type === "approve"
            ? "Approve"
            : confirmAction?.type === "checkIn"
              ? "Check In"
              : "Check Out"
        }
      />
    </div>
  );
}
