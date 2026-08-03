// src/app/(admin)/admin/types/guest.ts

export type GuestTag = "NONE" | "VIP" | "BLACKLISTED";

export interface GuestListItem {
  id: string;
  fullName: string;
  email?: string | null;
  phone: string;
  tag: GuestTag;
  notes?: string | null;
  totalBookings: number;
  totalStays: number;
  totalSpent: number;
  createdAt: string;
}

export interface GuestBookingHistoryItem {
  id: string;
  bookingRef: string;
  status: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  room: { roomNumber: string; category?: { name: string } };
  payments: { amount: number }[];
}

export interface GuestProfile extends GuestListItem {
  idType?: string | null;
  idNumber?: string | null;
  bookings: GuestBookingHistoryItem[];
}
