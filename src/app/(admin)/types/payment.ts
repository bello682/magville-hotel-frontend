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
    room: { roomNumber: string; category?: { name: string } };
  };
  bookingRef?: string; // 🆕 present on freshly-recorded payments (from recordPaymentAdmin)
  guestName?: string; // 🆕 same
  roomNumber?: string; // 🆕
  roomCategory?: string; // 🆕
  checkInDate?: string; // 🆕
  checkOutDate?: string; // 🆕
  issuedBy?: string;
  balanceRemaining?: number;
}

export interface PaymentBookingLookup {
  id: string;
  bookingRef: string;
  guestName: string;
  totalAmount: number;
  totalPaid: number;
  balanceRemaining: number;
}

export interface OutstandingBooking {
  id: string;
  bookingRef: string;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  status: string;
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  totalPaid: number;
  balanceRemaining: number;
}
