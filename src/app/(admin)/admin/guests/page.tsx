// src/app/(admin)/admin/guests/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Loader2, AlertCircle } from "lucide-react";
import GuestsTable from "../guests/GuestsTable";
import GuestDetailModal from "../guests/GuestDetailModal";
import { GuestListItem, GuestTag } from "../../types/guest";
import { RootState, AppDispatch } from "@/store/store";
import {
  fetchGuests,
  fetchGuestById,
  clearGuestDetail,
  updateGuestAdmin,
} from "@/store/redux/actions/adminAction/guestActions";
import { useAdminToast } from "../../context/ToastContext";

export default function GuestsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { showToast } = useAdminToast();
  const {
    list: guests,
    listLoading,
    listError,
    detail,
    actionLoadingId,
  } = useSelector((s: RootState) => s.guests);

  const [search, setSearch] = useState("");
  const [detailId, setDetailId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchGuests());
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => dispatch(fetchGuests(search)), 400);
    return () => clearTimeout(timeout);
  }, [search, dispatch]);

  useEffect(() => {
    if (detailId) dispatch(fetchGuestById(detailId));
    else dispatch(clearGuestDetail());
  }, [detailId, dispatch]);

  const handleSave = (updates: { tag?: GuestTag; notes?: string }) => {
    if (!detailId) return;
    dispatch(updateGuestAdmin(detailId, updates));
    showToast("success", "Guest Updated");
    setDetailId(null);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <p className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold">
          Home / Admin / Guests
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
          Guest Directory
        </h1>
      </div>
      {/* Guest counts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
          <p className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-2">
            Total Guests
          </p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {guests.length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/40 rounded-xl p-5">
          <p className="text-[11px] uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold mb-2">
            VIP Guests
          </p>
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {guests.filter((g) => g.tag === "VIP").length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/40 rounded-xl p-5">
          <p className="text-[11px] uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold mb-2">
            REGULAR Guests
          </p>
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {guests.filter((g) => g.tag === "REGULAR").length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/40 rounded-xl p-5">
          <p className="text-[11px] uppercase tracking-wider text-red-600 dark:text-red-400 font-semibold mb-2">
            Blacklisted Guests
          </p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            {guests.filter((g) => g.tag === "BLACKLISTED").length}
          </p>
        </div>
      </div>
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, phone, or email..."
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500/50"
        />
      </div>
      {listLoading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <Loader2 className="w-7 h-7 animate-spin text-amber-500" />
        </div>
      ) : listError ? (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" /> {listError}
        </div>
      ) : (
        <GuestsTable guests={guests} onViewDetail={(g) => setDetailId(g.id)} />
      )}
      <GuestDetailModal
        isOpen={!!detailId}
        onClose={() => setDetailId(null)}
        guest={detail}
        onSave={handleSave}
        saving={actionLoadingId === detailId}
      />
    </div>
  );
}
