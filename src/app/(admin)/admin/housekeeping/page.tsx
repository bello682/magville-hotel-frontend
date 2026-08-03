// src/app/(admin)/admin/housekeeping/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import HousekeepingCard from "../housekeeping/HousekeepingCard";
import ReportIssueModal from "../housekeeping/ReportIssueModal";
import MaintenanceTable from "../housekeeping/MaintenanceTable";
import {
  HousekeepingRoom,
  HousekeepingStatus,
  MaintenanceStatus,
} from "../../types/housekeeping";
import { RootState, AppDispatch } from "@/store/store";
import { useAdminToast } from "../../context/ToastContext";
import {
  fetchHousekeepingBoard,
  updateRoomHousekeepingStatus,
  fetchMaintenanceRequests,
  createMaintenanceRequestAdmin,
  resetMaintenanceCreate,
  updateMaintenanceStatusAdmin,
} from "@/store/redux/actions/adminAction/housekeepingActions";

export default function HousekeepingPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { showToast } = useAdminToast();
  const {
    board,
    boardLoading,
    requests,
    requestsLoading,
    createLoading,
    createSuccess,
    createError,
    requestActionLoadingId,
  } = useSelector((s: RootState) => s.housekeeping);

  const [tab, setTab] = useState<"rooms" | "maintenance">("rooms");
  const [reportingRoom, setReportingRoom] = useState<HousekeepingRoom | null>(
    null,
  );

  useEffect(() => {
    dispatch(fetchHousekeepingBoard());
    dispatch(fetchMaintenanceRequests());
  }, [dispatch]);

  useEffect(() => {
    if (createSuccess) {
      setReportingRoom(null);
      showToast("success", "Issue Reported", "Room flagged as Out of Order");
      dispatch(resetMaintenanceCreate());
    }
  }, [createSuccess, dispatch]);

  const handleCycleStatus = (
    room: HousekeepingRoom,
    next: HousekeepingStatus,
  ) => {
    dispatch(updateRoomHousekeepingStatus(room.id, next));
  };

  const handleReportSubmit = (description: string) => {
    if (!reportingRoom) return;
    dispatch(createMaintenanceRequestAdmin(reportingRoom.id, description));
  };

  const handleUpdateMaintenance = (id: string, status: MaintenanceStatus) => {
    dispatch(updateMaintenanceStatusAdmin(id, status));
    if (status === "RESOLVED") showToast("success", "Issue Resolved");
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <p className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold">
          Home / Admin / Housekeeping
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
          Housekeeping & Maintenance
        </h1>
      </div>

      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-xl w-fit">
        <button
          onClick={() => setTab("rooms")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${tab === "rooms" ? "bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm" : "text-slate-500 dark:text-slate-400"}`}
        >
          Room Status
        </button>
        <button
          onClick={() => setTab("maintenance")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${tab === "maintenance" ? "bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm" : "text-slate-500 dark:text-slate-400"}`}
        >
          Maintenance Log
        </button>
      </div>

      {tab === "rooms" ? (
        boardLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-7 h-7 animate-spin text-amber-500" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {board.map((room) => (
              <HousekeepingCard
                key={room.id}
                room={room}
                onCycleStatus={handleCycleStatus}
                onReportIssue={setReportingRoom}
              />
            ))}
          </div>
        )
      ) : requestsLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-7 h-7 animate-spin text-amber-500" />
        </div>
      ) : (
        <MaintenanceTable
          requests={requests}
          onUpdateStatus={handleUpdateMaintenance}
          actionLoadingId={requestActionLoadingId}
        />
      )}

      <ReportIssueModal
        isOpen={!!reportingRoom}
        onClose={() => setReportingRoom(null)}
        onSubmit={handleReportSubmit}
        roomNumber={reportingRoom?.roomNumber}
        loading={createLoading}
      />
    </div>
  );
}
