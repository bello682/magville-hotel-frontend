// src/app/(admin)/admin/reports/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Loader2,
  Download,
  TrendingUp,
  BedDouble,
  Wallet,
  Percent,
} from "lucide-react";
import TrendLineChart from "../reports/TrendLineChart";
import { RootState, AppDispatch } from "@/store/store";
import {
  fetchRevenueTrend,
  fetchOccupancyTrend,
  fetchKeyMetrics,
} from "@/store/redux/actions/adminAction/reportsActions";
import { adminAxios } from "../../lib/axiosInstance";

export default function ReportsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { revenueTrend, occupancyTrend, metrics, loading } = useSelector(
    (s: RootState) => s.reports,
  );
  const [period, setPeriod] = useState<"7d" | "30d">("7d");

  useEffect(() => {
    dispatch(fetchRevenueTrend(period));
    dispatch(fetchOccupancyTrend(period));
    dispatch(fetchKeyMetrics(period));
  }, [period, dispatch]);

  const handleExport = async (type: "bookings" | "payments") => {
    const response = await adminAxios.get(`/reports/export`, {
      params: { type, period },
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${type}-report-${period}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold">
            Home / Admin / Reports
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Reports & Analytics
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as "7d" | "30d")}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-600 dark:text-slate-400 focus:outline-none"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button
            onClick={() => handleExport("payments")}
            className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-2 rounded-lg text-xs font-semibold hover:text-slate-900 dark:hover:text-white transition"
          >
            <Download className="w-3.5 h-3.5" /> Payments CSV
          </button>
          <button
            onClick={() => handleExport("bookings")}
            className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-2 rounded-lg text-xs font-semibold hover:text-slate-900 dark:hover:text-white transition"
          >
            <Download className="w-3.5 h-3.5" /> Bookings CSV
          </button>
        </div>
      </div>

      {loading && !metrics ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-7 h-7 animate-spin text-amber-500" />
        </div>
      ) : (
        <>
          {metrics && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Total Revenue",
                  value: `₦${metrics.totalRevenue.toLocaleString()}`,
                  icon: Wallet,
                },
                {
                  label: "Occupancy Rate",
                  value: `${metrics.occupancyRate}%`,
                  icon: BedDouble,
                },
                {
                  label: "ADR (Average Daily Rate)",
                  value: `₦${metrics.adr.toLocaleString()}`,
                  icon: Percent,
                },
                {
                  label: "RevPAR (Revenue Per Available Room)",
                  value: `₦${metrics.revPAR.toLocaleString()}`,
                  icon: TrendingUp,
                },
              ].map((m, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5"
                >
                  <p className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-2 truncate">
                    {m.label}
                  </p>
                  <p
                    className="text-lg font-bold text-slate-900 dark:text-white truncate"
                    title={m.value}
                  >
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
                Revenue Trend
              </h3>
              <TrendLineChart
                data={revenueTrend.map((t) => ({
                  date: t.date,
                  value: t.revenue,
                }))}
                color="#f59e0b"
                valuePrefix="₦"
              />
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
                Occupancy Trend
              </h3>
              <TrendLineChart
                data={occupancyTrend.map((t) => ({
                  date: t.date,
                  value: t.occupancyRate,
                }))}
                color="#10b981"
                valueSuffix="%"
              />
            </div>
          </div>

          {metrics?.paymentsByMethod?.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
                Revenue by Payment Method
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {metrics.paymentsByMethod.map((p: any) => (
                  <div
                    key={p.method}
                    className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 text-center"
                  >
                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                      ₦{p.total.toLocaleString()}
                    </p>
                    <p className="text-[11px] uppercase text-slate-500 dark:text-slate-400 mt-1">
                      {p.method.replace("_", " ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
