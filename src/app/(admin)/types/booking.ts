// src/app/(admin)/types/booking.ts

export type BookingStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CHECKED_IN"
  | "CHECKED_OUT"
  | "CANCELLED";

export interface BookingPayment {
  id: string;
  amount: number;
  method: "CASH" | "CARD" | "BANK_TRANSFER";
  status: "PENDING" | "PAID" | "PARTIAL" | "REFUNDED";
  transactionRef?: string | null;
  createdAt: string;
}

export interface BookingRoom {
  id: string;
  roomNumber: string;
  pricePerNight: number;
  category?: { id: string; name: string };
}

export interface BookingGuest {
  id: string;
  fullName: string;
  email?: string | null;
  phone: string;
  idType?: string | null;
  idNumber?: string | null;
}

export interface Booking {
  id: string;
  bookingRef: string;
  status: BookingStatus;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkInDate: string;
  checkOutDate: string;
  actualCheckIn?: string | null;
  actualCheckOut?: string | null;
  notes?: string | null;
  rejectionReason?: string | null;
  totalAmount: number;
  room: BookingRoom;
  guest: BookingGuest;
  payments: BookingPayment[];
  createdAt: string;
}
