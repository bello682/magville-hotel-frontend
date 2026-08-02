// src/app/(admin)/types/dashboard.ts

export interface DashboardKpis {
  occupancyRate: string; // e.g. "68.5%"
  activeGuests: number;
  todayRevenue: number;
  monthRevenue: number;
  pendingRequests: number;
  totalOutstanding: number;
}

export interface RoomStatusBreakdown {
  total: number;
  occupied: number;
  available: number;
  maintenance: number;
}

export interface FrontDeskEntry {
  id: string;
  bookingRef: string;
  checkInDate: string;
  checkOutDate: string;
  room: { roomNumber: string };
  guest: { fullName: string; phone: string };
}

export interface FrontDeskFeed {
  arrivalsTodayCount: number;
  expectedArrivals: FrontDeskEntry[];
  departuresTodayCount: number;
  expectedDepartures: FrontDeskEntry[];
}

export interface RecentPayment {
  id: string;
  amount: number;
  method: "CASH" | "CARD" | "BANK_TRANSFER";
  createdAt: string;
  booking: {
    bookingRef: string;
    guestName: string;
    room: { roomNumber: string };
  };
}

export interface CategoryBreakdown {
  id: string;
  name: string;
  total: number;
  occupied: number;
}

// 🆕 The actual shape of ONE outstanding booking entry
export interface OutstandingBookingPreview {
  id: string;
  bookingRef: string;
  guestName: string;
  guestPhone: string;
  balanceRemaining: number;
}

export interface DashboardOverviewResponse {
  kpis: DashboardKpis;
  roomStatus: RoomStatusBreakdown;
  frontDeskFeed: FrontDeskFeed;
  recentPayments: RecentPayment[];
  categoryBreakdown: CategoryBreakdown[];
  outstandingBookings: OutstandingBookingPreview[];
}
