"use client";

import KpiCards from "../components/admin/overview/KpiCards";
import RoomStatusChart from "../components/admin/overview/RoomStatusChart";
import FrontDeskFeedTable from "../components/admin/overview/FrontDeskFeedTable";
import { DashboardOverviewResponse } from "../types/dashboard";

// 🔧 Placeholder data matching the exact shape of GET /api/v1/dashboard/overview
// Replace this with a real fetch call once API wiring begins.
const MOCK_DASHBOARD_DATA: DashboardOverviewResponse = {
  kpis: {
    occupancyRate: "68.5%",
    activeGuests: 24,
    todayRevenue: 340000,
    monthRevenue: 4820000,
  },
  roomStatus: {
    total: 40,
    occupied: 24,
    available: 14,
    maintenance: 2,
  },
  frontDeskFeed: {
    arrivalsTodayCount: 2,
    expectedArrivals: [
      {
        id: "1",
        bookingRef: "MAG-58201",
        checkInDate: new Date().toISOString(),
        checkOutDate: new Date().toISOString(),
        room: { roomNumber: "204" },
        guest: { fullName: "Chief Alexander Cole", phone: "+234 800 000 0000" },
      },
      {
        id: "2",
        bookingRef: "MAG-58202",
        checkInDate: new Date().toISOString(),
        checkOutDate: new Date().toISOString(),
        room: { roomNumber: "112" },
        guest: { fullName: "Amara Johnson", phone: "+234 801 111 2222" },
      },
    ],
    departuresTodayCount: 1,
    expectedDepartures: [
      {
        id: "3",
        bookingRef: "MAG-58150",
        checkInDate: new Date().toISOString(),
        checkOutDate: new Date().toISOString(),
        room: { roomNumber: "301" },
        guest: { fullName: "Michael Adeyemi", phone: "+234 802 333 4444" },
      },
    ],
  },
};

export default function AdminDashboardPage() {
  const data = MOCK_DASHBOARD_DATA;

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold">
            Home / Admin / Dashboard
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Operational Overview
          </h1>
        </div>
      </div>

      <KpiCards kpis={data.kpis} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RoomStatusChart roomStatus={data.roomStatus} />
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 gap-6">
          <FrontDeskFeedTable
            title="Arrivals Today"
            entries={data.frontDeskFeed.expectedArrivals}
            dateField="checkInDate"
            emptyLabel="No arrivals scheduled for today."
          />
          <FrontDeskFeedTable
            title="Departures Today"
            entries={data.frontDeskFeed.expectedDepartures}
            dateField="checkOutDate"
            emptyLabel="No departures scheduled for today."
          />
        </div>
      </div>
    </div>
  );
}
