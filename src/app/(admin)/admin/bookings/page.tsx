"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, AlertCircle } from "lucide-react";
import BookingsFilterBar from "../bookings/BookingsFilterBar";
import BookingsTable from "../bookings/BookingsTable";
import BookingDetailModal from "../bookings/BookingDetailModal";
import { Suspense } from "react";
import NewBookingModal, {
  NewBookingFormValues,
} from "../bookings/NewBookingModal";
import RejectReasonModal from "../bookings/RejectReasonModal";
import ConfirmActionModal from "../bookings/ConfirmActionModal";
import { BookingStatus } from "../../types/booking";
import { RootState, AppDispatch } from "@/store/store";
import {
  fetchAllBookings,
  fetchBookingById,
  clearBookingDetail,
  createBookingAdmin,
  resetBookingCreate,
  updateBookingStatus,
  checkInBookingAdmin,
  checkOutBookingAdmin,
  fetchRoomsForBookingLookup,
} from "@/store/redux/actions/adminAction/bookingActions";
import { useState } from "react";
import { useAdminToast } from "../../context/ToastContext";

const DEFAULT_MESSAGES: Record<string, string> = {
  approve:
    "Your reservation request has been reviewed and approved. Please proceed with payment using the account details provided, then send your receipt via WhatsApp with your booking reference.",
  checkIn:
    "Welcome to Magville Hotel & Resort! Your check-in is complete. Please contact the front desk for any assistance during your stay.",
  checkOut:
    "Thank you for staying with us! Your check-out has been processed. We hope you enjoyed your time and look forward to welcoming you again.",
};

const actionLabels: Record<"approve" | "checkIn" | "checkOut", string> = {
  approve: "approved",
  checkIn: "checked in",
  checkOut: "checked out",
};

function BookingsPageContent() {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    list: bookings,
    listLoading,
    listError,
    detail: detailBooking,
    createLoading,
    createSuccess,
    createError,
    actionLoadingId,
    actionError,
  } = useSelector((state: RootState) => state.adminBookings);
  const { showToast } = useAdminToast();

  const { rooms } = useSelector((state: RootState) => state.roomAdmin);

  const [search, setSearch] = useState("");
  const initialStatus =
    (searchParams.get("status") as BookingStatus | null) || "ALL";
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "ALL">(
    initialStatus,
  );

  const [detailBookingId, setDetailBookingId] = useState<string | null>(null);
  const [rejectBookingId, setRejectBookingId] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    bookingId: string;
    bookingRef: string;
    guestName: string;
    type: "approve" | "checkIn" | "checkOut";
  } | null>(null);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);

  // Initial load
  useEffect(() => {
    dispatch(fetchAllBookings());
    dispatch(fetchRoomsForBookingLookup());
  }, [dispatch]);

  // Re-fetch when status filter changes (server-side filtering)
  useEffect(() => {
    dispatch(
      fetchAllBookings(
        statusFilter !== "ALL" ? { status: statusFilter } : undefined,
      ),
    );
  }, [statusFilter, dispatch]);

  // Keep URL in sync when filter changes via the UI
  useEffect(() => {
    const params = new URLSearchParams();
    if (statusFilter !== "ALL") params.set("status", statusFilter);
    router.replace(`/admin/bookings${params.toString() ? `?${params}` : ""}`);
  }, [statusFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch full detail when a booking is opened
  useEffect(() => {
    if (detailBookingId) {
      dispatch(fetchBookingById(detailBookingId));
    } else {
      dispatch(clearBookingDetail());
    }
  }, [detailBookingId, dispatch]);

  // Close New Booking modal on successful create
  useEffect(() => {
    if (createSuccess) {
      setIsNewBookingOpen(false);
      dispatch(resetBookingCreate());
    }
  }, [createSuccess, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(
        fetchAllBookings(
          statusFilter !== "ALL" ? { status: statusFilter } : undefined,
        ),
      );
    }, 30000); // same 30s cadence as the notification bell
    return () => clearInterval(interval);
  }, [statusFilter, dispatch]);

  useEffect(() => {
    if (actionError) showToast("error", "Action Failed", actionError);
  }, [actionError]);

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesSearch =
        search.trim() === "" ||
        b.guestName.toLowerCase().includes(search.toLowerCase()) ||
        b.bookingRef.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
  }, [bookings, search]);

  const handleCreateBooking = (values: NewBookingFormValues) => {
    dispatch(createBookingAdmin(values));
  };

  const handleReject = (reason: string) => {
    if (!rejectBookingId) return;
    dispatch(updateBookingStatus(rejectBookingId, "REJECTED", reason));
    setRejectBookingId(null);
  };

  const handleConfirmAction = (message?: string) => {
    if (!confirmAction) return;
    if (confirmAction.type === "approve") {
      dispatch(
        updateBookingStatus(
          confirmAction.bookingId,
          "APPROVED",
          undefined,
          message,
        ),
      );
    } else if (confirmAction.type === "checkIn") {
      dispatch(checkInBookingAdmin(confirmAction.bookingId, message));
    } else {
      dispatch(checkOutBookingAdmin(confirmAction.bookingId, message));
    }
    showToast(
      "success",
      `Booking ${actionLabels[confirmAction.type]}`,
      confirmAction.bookingRef,
    );
    setConfirmAction(null);
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

      {actionError && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" /> {actionError}
        </div>
      )}

      {listLoading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <Loader2 className="w-7 h-7 animate-spin text-amber-500" />
          <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Loading bookings...
          </p>
        </div>
      ) : listError ? (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" /> {listError}
        </div>
      ) : (
        <BookingsTable
          bookings={filteredBookings}
          onViewDetail={(b) => setDetailBookingId(b.id)}
          onApprove={(b) =>
            setConfirmAction({
              bookingId: b.id,
              bookingRef: b.bookingRef,
              guestName: b.guestName,
              type: "approve",
            })
          }
          onReject={(b) => setRejectBookingId(b.id)}
          onCheckIn={(b) =>
            setConfirmAction({
              bookingId: b.id,
              bookingRef: b.bookingRef,
              guestName: b.guestName,
              type: "checkIn",
            })
          }
          onCheckOut={(b) =>
            setConfirmAction({
              bookingId: b.id,
              bookingRef: b.bookingRef,
              guestName: b.guestName,
              type: "checkOut",
            })
          }
        />
      )}

      <BookingDetailModal
        isOpen={!!detailBookingId}
        onClose={() => setDetailBookingId(null)}
        booking={detailBooking}
      />

      <NewBookingModal
        isOpen={isNewBookingOpen}
        onClose={() => setIsNewBookingOpen(false)}
        onSubmit={handleCreateBooking}
        rooms={rooms}
        loading={createLoading}
      />
      {createError && (
        <p className="text-red-500 text-xs text-center">{createError}</p>
      )}

      <RejectReasonModal
        isOpen={!!rejectBookingId}
        onClose={() => setRejectBookingId(null)}
        onConfirm={handleReject}
        loading={actionLoadingId === rejectBookingId}
      />

      <ConfirmActionModal
        isOpen={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        showMessageField
        defaultMessage={
          confirmAction ? DEFAULT_MESSAGES[confirmAction.type] : ""
        }
        onConfirm={handleConfirmAction}
        loading={actionLoadingId === confirmAction?.bookingId}
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
            ? `This will update booking ${confirmAction.bookingRef} for ${confirmAction.guestName}. An email notification will be sent to the guest where applicable.`
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

// useSearchParams requires a Suspense boundary — same pattern as your guest-side track page
export default function BookingsPage() {
  return (
    <Suspense fallback={null}>
      <BookingsPageContent />
    </Suspense>
  );
}
