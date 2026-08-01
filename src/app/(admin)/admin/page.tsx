"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, AlertCircle } from "lucide-react";
import KpiCards from "../components/admin/overview/KpiCards";
import RoomStatusChart from "../components/admin/overview/RoomStatusChart";
import FrontDeskFeedTable from "../components/admin/overview/FrontDeskFeedTable";
import { fetchDashboardOverview } from "../../../store/redux/actions/adminAction/dashboardActions";
import { RootState, AppDispatch } from "@/store/store";

export default function AdminDashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data, error } = useSelector(
    (state: RootState) => state.dashboard,
  );

  useEffect(() => {
    dispatch(fetchDashboardOverview());
  }, [dispatch]);

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

      {loading && !data && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
          <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Loading dashboard metrics...
          </p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          {error}
        </div>
      )}

      {data && (
        <>
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
        </>
      )}
    </div>
  );
}
