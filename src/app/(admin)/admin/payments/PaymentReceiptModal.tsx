"use client";

import { createPortal } from "react-dom";
import { X, Printer, CheckCircle2 } from "lucide-react";
import { Payment } from "@/app/(admin)/types/payment";

interface PaymentReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: Payment | null;
  balanceRemaining: number;
}

export default function PaymentReceiptModal({
  isOpen,
  onClose,
  payment,
  balanceRemaining,
}: PaymentReceiptModalProps) {
  if (!isOpen || !payment) return null;

  const handlePrint = () => window.print();

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm print:hidden">
        <div className="absolute inset-0" onClick={onClose} />

        {/* <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden transition-colors"> */}
        <div className="relative w-full max-w-sm max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden transition-colors">
          <div className="flex items-center justify-end px-4 py-3">
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* <div className="px-8 pb-8 text-center space-y-5"> */}
          <div className="px-8 pb-8 text-center space-y-5 overflow-y-auto">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Payment Recorded
              </h3>
            </div>

            <ReceiptCardContents
              payment={payment}
              balanceRemaining={balanceRemaining}
            />

            <button
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition"
            >
              <Printer className="w-4 h-4" /> Print Receipt
            </button>
          </div>
        </div>
      </div>

      {/* 🆕 Portaled directly onto <body> so it's a real top-level sibling — required for the print CSS below to work reliably */}
      {typeof document !== "undefined" &&
        createPortal(
          <>
            <div id="print-receipt-root" className="hidden print:block">
              <ReceiptCardContents
                payment={payment}
                balanceRemaining={balanceRemaining}
                printMode
              />
            </div>
            <style jsx global>{`
              @media print {
                @page {
                  size: 80mm auto;
                  margin: 4mm;
                }
                body > *:not(#print-receipt-root) {
                  display: none !important;
                }
                #print-receipt-root {
                  display: block !important;
                }
              }
            `}</style>
          </>,
          document.body,
        )}
    </>
  );
}

function ReceiptCardContents({
  payment,
  balanceRemaining,
  printMode = false,
}: {
  payment: Payment;
  balanceRemaining: number;
  printMode?: boolean;
}) {
  const isFullyPaid = balanceRemaining <= 0;
  const receiptNumber = `RCPT-${payment.id.slice(0, 8).toUpperCase()}`;

  const roomNumber = payment.roomNumber || payment.booking?.room?.roomNumber;
  const roomCategory =
    payment.roomCategory || payment.booking?.room?.category?.name;

  const Row = ({
    label,
    value,
    bold = false,
  }: {
    label: string;
    value: React.ReactNode;
    bold?: boolean;
  }) => (
    <div className="flex justify-between gap-3">
      <span className={printMode ? "" : "text-slate-500 dark:text-slate-400"}>
        {label}
      </span>
      <span
        className={
          printMode
            ? bold
              ? "font-bold text-right"
              : "text-right"
            : `text-right ${bold ? "font-semibold text-slate-900 dark:text-white" : "text-slate-900 dark:text-white"}`
        }
      >
        {value}
      </span>
    </div>
  );

  return (
    <div
      className={
        printMode
          ? "text-left bg-white p-4 space-y-1.5 text-xs font-mono text-black w-full"
          : "text-left bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-1.5 text-sm"
      }
    >
      <div
        className={`text-center mb-3 pb-2 border-b ${printMode ? "border-dashed border-black" : "border-slate-200 dark:border-slate-800"}`}
      >
        <p
          className={
            printMode
              ? "font-bold text-sm"
              : "font-bold text-slate-900 dark:text-white"
          }
        >
          MAGVILLE HOTEL & RESORT
        </p>
        <p
          className={
            printMode
              ? "text-[10px]"
              : "text-xs text-slate-500 dark:text-slate-400"
          }
        >
          Victoria Island, Lagos, Nigeria
        </p>
        <p
          className={
            printMode
              ? "text-[10px]"
              : "text-xs text-slate-500 dark:text-slate-400"
          }
        >
          Tel: +234 800 MAGVILLE
        </p>
      </div>

      <Row label="Receipt No." value={receiptNumber} bold />
      <Row
        label="Booking Ref"
        value={payment.bookingRef || payment.booking?.bookingRef || "—"}
        bold
      />
      <Row
        label="Guest"
        value={payment.guestName || payment.booking?.guestName || "—"}
      />

      {roomNumber && (
        <Row
          label="Room"
          value={`${roomNumber}${roomCategory ? ` — ${roomCategory}` : ""}`}
        />
      )}

      {payment.checkInDate && payment.checkOutDate && (
        <Row
          label="Stay Period"
          value={`${new Date(payment.checkInDate).toLocaleDateString()} – ${new Date(payment.checkOutDate).toLocaleDateString()}`}
        />
      )}

      <div
        className={`my-1 border-t ${printMode ? "border-dashed border-black" : "border-slate-200 dark:border-slate-800"}`}
      />

      <Row
        label="Method"
        value={
          <span className="capitalize">
            {payment.method.replace("_", " ").toLowerCase()}
          </span>
        }
      />
      {payment.transactionRef && (
        <Row label="Txn Ref" value={payment.transactionRef} />
      )}
      <Row label="Date" value={new Date(payment.createdAt).toLocaleString()} />
      {payment.issuedBy && <Row label="Issued By" value={payment.issuedBy} />}

      <div
        className={`my-1 border-t ${printMode ? "border-dashed border-black" : "border-slate-200 dark:border-slate-800"}`}
      />

      <Row
        label="Amount Paid"
        value={
          <span
            className={
              printMode
                ? "font-bold"
                : "font-bold text-emerald-600 dark:text-emerald-400 text-base"
            }
          >
            ₦{payment.amount.toLocaleString()}
          </span>
        }
      />

      {balanceRemaining !== undefined && (
        <Row
          label="Balance Remaining"
          value={`₦${balanceRemaining.toLocaleString()}`}
          bold={balanceRemaining > 0}
        />
      )}

      <div
        className={
          printMode
            ? "mt-3 pt-2 border-t border-dashed border-black text-center text-[10px] font-bold"
            : `mt-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-center text-xs font-semibold ${
                isFullyPaid
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-amber-600 dark:text-amber-400"
              }`
        }
      >
        {isFullyPaid
          ? "✓ PAID IN FULL"
          : "⚠ PARTIAL PAYMENT — BALANCE OUTSTANDING"}
      </div>

      {printMode && (
        <p className="text-center text-[9px] mt-3 pt-2 border-t border-dashed border-black">
          Thank you for choosing Magville Hotel & Resort
        </p>
      )}
    </div>
  );
}
