// src/app/(admin)/types/dashboard.ts

export interface DashboardKpis {
  occupancyRate: string; // e.g. "68.5%"
  activeGuests: number;
  todayRevenue: number;
  monthRevenue: number;
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

export interface DashboardOverviewResponse {
  kpis: DashboardKpis;
  roomStatus: RoomStatusBreakdown;
  frontDeskFeed: FrontDeskFeed;
}
