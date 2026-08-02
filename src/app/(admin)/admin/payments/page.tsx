"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Loader2, AlertCircle } from "lucide-react";
import RevenueSummary from "../payments/RevenueSummary";
import PaymentsTable from "../payments/PaymentsTable";
import OutstandingBalancesTable from "../payments/OutstandingBalancesTable";
import RecordPaymentModal, {
  RecordPaymentFormValues,
} from "../payments/RecordPaymentModal";
import PaymentHistoryModal from "../payments/PaymentHistoryModal";
import {
  Payment,
  PaymentMethod,
  PaymentBookingLookup,
} from "../../types/payment";
import { RootState, AppDispatch } from "@/store/store";
import {
  fetchAllPayments,
  recordPaymentAdmin,
  resetPaymentCreate,
  fetchPaymentsForBooking,
  clearBookingPayments,
  searchBookingsForPayment,
  fetchOutstandingBalances,
} from "@/store/redux/actions/adminAction/paymentActions";
import PaymentReceiptModal from "./PaymentReceiptModal";
import { useAdminToast } from "@/app/(admin)/context/ToastContext";

function PaymentsPageContent() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useAdminToast();

  const {
    payments,
    totalRevenue,
    listLoading,
    listError,
    createLoading,
    createSuccess,
    createError,
    bookingHistory,
    lastRecordedPayment,
    outstanding,
    outstandingLoading,
    outstandingTotal,
  } = useSelector((state: RootState) => state.payments);

  const { results: lookupResults } = useSelector(
    (state: RootState) => state.paymentBookingSearch,
  );

  // 🆕 Read tab + highlight from URL on first load
  const initialTab =
    (searchParams.get("tab") as "all" | "outstanding") || "all";
  const highlightId = searchParams.get("highlight");

  const [activeTab, setActiveTab] = useState<"all" | "outstanding">(initialTab);
  const [methodFilter, setMethodFilter] = useState<PaymentMethod | "ALL">(
    "ALL",
  );
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [historyBookingId, setHistoryBookingId] = useState<string | null>(null);
  const [receiptPayment, setReceiptPayment] = useState<Payment | null>(null);
  const [preselectedBooking, setPreselectedBooking] =
    useState<PaymentBookingLookup | null>(null);

  useEffect(() => {
    dispatch(fetchAllPayments());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchAllPayments(methodFilter !== "ALL" ? methodFilter : undefined),
    );
  }, [methodFilter, dispatch]);

  // 🆕 Fetch outstanding data unconditionally so counts/badges are always accurate
  useEffect(() => {
    dispatch(fetchOutstandingBalances());
  }, [dispatch]);

  useEffect(() => {
    if (historyBookingId) {
      dispatch(fetchPaymentsForBooking(historyBookingId));
    } else {
      dispatch(clearBookingPayments());
    }
  }, [historyBookingId, dispatch]);

  useEffect(() => {
    if (createSuccess && lastRecordedPayment) {
      setIsRecordModalOpen(false);
      setReceiptPayment(lastRecordedPayment);
      dispatch(resetPaymentCreate());
      showToast(
        "success",
        "Payment Recorded",
        `₦${lastRecordedPayment.amount.toLocaleString()} received`,
      );
    }
  }, [createSuccess, lastRecordedPayment, dispatch]);

  useEffect(() => {
    if (createError) showToast("error", "Payment Failed", createError);
  }, [createError]);

  // 🆕 Once outstanding data has loaded, auto-open Record Payment for the highlighted guest
  useEffect(() => {
    if (activeTab === "outstanding" && highlightId && outstanding.length > 0) {
      const target = outstanding.find((b) => b.id === highlightId);
      if (target) {
        setPreselectedBooking({
          id: target.id,
          bookingRef: target.bookingRef,
          guestName: target.guestName,
          totalAmount: target.totalAmount,
          totalPaid: target.totalPaid,
          balanceRemaining: target.balanceRemaining,
        });
        setIsRecordModalOpen(true);
      }
    }
  }, [activeTab, highlightId, outstanding]);

  const averagePayment =
    payments.length > 0 ? totalRevenue / payments.length : 0;

  // 🆕 Keep URL in sync whenever the tab is changed manually
  const handleTabChange = (tab: "all" | "outstanding") => {
    setActiveTab(tab);
    router.replace(
      `/admin/payments${tab === "outstanding" ? "?tab=outstanding" : ""}`,
    );
  };

  const handleRecordPayment = (
    values: RecordPaymentFormValues,
    bookingRef: string,
    guestName: string,
  ) => {
    dispatch(recordPaymentAdmin(values, bookingRef, guestName));
  };

  const handleSearchBookings = (query: string) => {
    dispatch(searchBookingsForPayment(query));
  };

  const handleViewBooking = (bookingId: string) => {
    setHistoryBookingId(bookingId);
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

      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-xl w-fit">
        <button
          onClick={() => handleTabChange("all")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
            activeTab === "all"
              ? "bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          All Payments
        </button>
        <button
          onClick={() => handleTabChange("outstanding")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
            activeTab === "outstanding"
              ? "bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 shadow-sm"
              : outstanding.length > 0
                ? "text-red-500 dark:text-red-400 hover:text-red-600"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Outstanding {outstanding.length > 0 && `(${outstanding.length})`}
        </button>
      </div>

      {activeTab === "all" ? (
        <>
          <RevenueSummary
            totalRevenue={totalRevenue}
            paymentCount={payments.length}
            averagePayment={averagePayment}
          />

          {listLoading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Loader2 className="w-7 h-7 animate-spin text-amber-500" />
              <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Loading payments...
              </p>
            </div>
          ) : listError ? (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" /> {listError}
            </div>
          ) : (
            <PaymentsTable
              payments={payments}
              methodFilter={methodFilter}
              onMethodFilterChange={setMethodFilter}
              onViewBooking={handleViewBooking}
              onViewReceipt={setReceiptPayment}
            />
          )}
        </>
      ) : (
        <OutstandingBalancesTable
          bookings={outstanding}
          loading={outstandingLoading}
          totalOutstanding={outstandingTotal}
          onRecordPayment={(booking) => {
            setPreselectedBooking({
              id: booking.id,
              bookingRef: booking.bookingRef,
              guestName: booking.guestName,
              totalAmount: booking.totalAmount,
              totalPaid: booking.totalPaid,
              balanceRemaining: booking.balanceRemaining,
            });
            setIsRecordModalOpen(true);
          }}
        />
      )}

      <RecordPaymentModal
        isOpen={isRecordModalOpen}
        onClose={() => {
          setIsRecordModalOpen(false);
          setPreselectedBooking(null);
        }}
        onSubmit={handleRecordPayment}
        bookingLookupResults={lookupResults}
        onSearchBookings={handleSearchBookings}
        loading={createLoading}
        preselectedBooking={preselectedBooking}
      />

      <PaymentHistoryModal
        isOpen={!!historyBookingId}
        onClose={() => setHistoryBookingId(null)}
        bookingRef={bookingHistory?.bookingRef || null}
        totalAmount={bookingHistory?.summary.totalAmount || 0}
        payments={bookingHistory?.payments || []}
      />

      <PaymentReceiptModal
        isOpen={!!receiptPayment}
        onClose={() => setReceiptPayment(null)}
        payment={receiptPayment}
        balanceRemaining={receiptPayment?.balanceRemaining ?? 0}
      />
    </div>
  );
}

// useSearchParams requires a Suspense boundary
export default function PaymentsPage() {
  return (
    <Suspense fallback={null}>
      <PaymentsPageContent />
    </Suspense>
  );
}
