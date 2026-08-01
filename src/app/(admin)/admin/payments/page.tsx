"use client";

import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import RevenueSummary from "../payments/RevenueSummary";
import PaymentsTable from "../payments/PaymentsTable";
import RecordPaymentModal, {
  RecordPaymentFormValues,
} from "../payments/RecordPaymentModal";
import PaymentHistoryModal from "../payments/PaymentHistoryModal";
import {
  Payment,
  PaymentMethod,
  PaymentBookingLookup,
} from "../../types/payment";

// 🔧 Mock data
const MOCK_PAYMENTS: Payment[] = [
  {
    id: "p1",
    bookingId: "b1",
    amount: 55000,
    method: "BANK_TRANSFER",
    status: "PAID",
    transactionRef: "TXN-908123",
    createdAt: new Date().toISOString(),
    booking: {
      bookingRef: "MAG-58150",
      guestName: "Amara Johnson",
      room: { roomNumber: "112" },
    },
  },
  {
    id: "p2",
    bookingId: "b2",
    amount: 110000,
    method: "CASH",
    status: "PAID",
    transactionRef: null,
    createdAt: new Date().toISOString(),
    booking: {
      bookingRef: "MAG-58090",
      guestName: "Michael Adeyemi",
      room: { roomNumber: "301" },
    },
  },
];

const MOCK_BOOKING_LOOKUP: PaymentBookingLookup[] = [
  {
    id: "b3",
    bookingRef: "MAG-58201",
    guestName: "Chief Alexander Cole",
    totalAmount: 165000,
    totalPaid: 0,
    balanceRemaining: 165000,
  },
];

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(MOCK_PAYMENTS);
  const [methodFilter, setMethodFilter] = useState<PaymentMethod | "ALL">(
    "ALL",
  );
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [historyBooking, setHistoryBooking] = useState<{
    bookingId: string;
    bookingRef: string;
    totalAmount: number;
  } | null>(null);
  const [lookupResults, setLookupResults] = useState<PaymentBookingLookup[]>(
    [],
  );
  const [actionLoading, setActionLoading] = useState(false);

  const filteredPayments = useMemo(() => {
    return payments.filter(
      (p) => methodFilter === "ALL" || p.method === methodFilter,
    );
  }, [payments, methodFilter]);

  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const averagePayment =
    payments.length > 0 ? totalRevenue / payments.length : 0;

  // 🔧 Replace with real API search call
  const handleSearchBookings = (query: string) => {
    if (query.trim().length < 2) {
      setLookupResults([]);
      return;
    }
    setLookupResults(
      MOCK_BOOKING_LOOKUP.filter(
        (b) =>
          b.guestName.toLowerCase().includes(query.toLowerCase()) ||
          b.bookingRef.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  };

  // 🔧 Replace with real POST /api/v1/payments call
  const handleRecordPayment = (values: RecordPaymentFormValues) => {
    setActionLoading(true);
    setTimeout(() => {
      const booking = MOCK_BOOKING_LOOKUP.find(
        (b) => b.id === values.bookingId,
      );
      const newPayment: Payment = {
        id: String(Date.now()),
        bookingId: values.bookingId,
        amount: Number(values.amount),
        method: values.method,
        status: "PAID",
        transactionRef: values.transactionRef || null,
        createdAt: new Date().toISOString(),
        booking: booking
          ? {
              bookingRef: booking.bookingRef,
              guestName: booking.guestName,
              room: { roomNumber: "N/A" },
            }
          : undefined,
      };
      setPayments((prev) => [newPayment, ...prev]);
      setActionLoading(false);
      setIsRecordModalOpen(false);
      setLookupResults([]);
    }, 600);
  };

  const handleViewBooking = (bookingId: string) => {
    const payment = payments.find((p) => p.bookingId === bookingId);
    if (!payment?.booking) return;
    // 🔧 In real integration, fetch full booking + totalAmount via getPaymentsByBooking
    setHistoryBooking({
      bookingId,
      bookingRef: payment.booking.bookingRef,
      totalAmount: payment.amount + 50000, // placeholder — real total comes from API
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold">
            Home / Admin / Payments
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Payments & Finance
          </h1>
        </div>
        <button
          onClick={() => setIsRecordModalOpen(true)}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Record Payment
        </button>
      </div>

      <RevenueSummary
        totalRevenue={totalRevenue}
        paymentCount={payments.length}
        averagePayment={averagePayment}
      />

      <PaymentsTable
        payments={filteredPayments}
        methodFilter={methodFilter}
        onMethodFilterChange={setMethodFilter}
        onViewBooking={handleViewBooking}
      />

      <RecordPaymentModal
        isOpen={isRecordModalOpen}
        onClose={() => {
          setIsRecordModalOpen(false);
          setLookupResults([]);
        }}
        onSubmit={handleRecordPayment}
        bookingLookupResults={lookupResults}
        onSearchBookings={handleSearchBookings}
        loading={actionLoading}
      />

      <PaymentHistoryModal
        isOpen={!!historyBooking}
        onClose={() => setHistoryBooking(null)}
        bookingRef={historyBooking?.bookingRef || null}
        totalAmount={historyBooking?.totalAmount || 0}
        payments={payments.filter(
          (p) => p.bookingId === historyBooking?.bookingId,
        )}
      />
    </div>
  );
}
