// src/app/(admin)/admin/types/payment.ts

export type PaymentMethod = "CASH" | "CARD" | "BANK_TRANSFER";
export type PaymentStatus = "PENDING" | "PAID" | "PARTIAL" | "REFUNDED";

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionRef?: string | null;
  createdAt: string;
  booking?: {
    bookingRef: string;
    guestName: string;
    room: { roomNumber: string };
  };
}

export interface PaymentBookingLookup {
  id: string;
  bookingRef: string;
  guestName: string;
  totalAmount: number;
  totalPaid: number;
  balanceRemaining: number;
}
