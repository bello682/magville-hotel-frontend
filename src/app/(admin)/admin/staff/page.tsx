"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, AlertCircle } from "lucide-react";
import ConfirmActionModal from "../bookings/ConfirmActionModal";
import ChangeRoleModal from "../staff/ChangeRoleModal";
import StaffTable from "../staff/StaffTable";
import { StaffRole } from "../../types/staff";
import { RootState, AppDispatch } from "@/store/store";
import { useAdminUser } from "../../hooks/useAdminUser";
import { useAdminToast } from "../../context/ToastContext";
import { useState } from "react";
import {
  fetchStaff,
  updateStaffRoleAdmin,
  updateStaffStatusAdmin,
} from "@/store/redux/actions/adminAction/staffActions";
import { StaffMember } from "../../types/staff";

export default function StaffPage() {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useAdminUser();
  const { showToast } = useAdminToast();

  const {
    list: staff,
    listLoading,
    listError,
    actionLoadingId,
    actionError,
  } = useSelector((state: RootState) => state.staff);

  const [roleModalStaff, setRoleModalStaff] = useState<StaffMember | null>(
    null,
  );
  const [statusModalStaff, setStatusModalStaff] = useState<StaffMember | null>(
    null,
  );

  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  useEffect(() => {
    if (actionError) showToast("error", "Action Failed", actionError);
  }, [actionError]);

  const handleChangeRole = (newRole: StaffRole) => {
    if (!roleModalStaff) return;
    dispatch(updateStaffRoleAdmin(roleModalStaff.id, newRole));
    showToast(
      "success",
      "Role Updated",
      `${roleModalStaff.name} is now ${newRole.replace("_", " ")}`,
    );
    setRoleModalStaff(null);
  };

  const handleToggleStatus = () => {
    if (!statusModalStaff) return;
    const newStatus = !statusModalStaff.isActive;
    dispatch(updateStaffStatusAdmin(statusModalStaff.id, newStatus));
    showToast(
      "success",
      newStatus ? "Account Activated" : "Account Deactivated",
      statusModalStaff.name,
    );
    setStatusModalStaff(null);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <p className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold">
          Home / Admin / Staff
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
          Staff Management
        </h1>
      </div>

      {listLoading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <Loader2 className="w-7 h-7 animate-spin text-amber-500" />
          <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Loading staff accounts...
          </p>
        </div>
      ) : listError ? (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" /> {listError}
        </div>
      ) : (
        <StaffTable
          staff={staff}
          currentUserId={currentUser?.id || ""}
          onChangeRole={setRoleModalStaff}
          onToggleStatus={setStatusModalStaff}
        />
      )}

      <ChangeRoleModal
        isOpen={!!roleModalStaff}
        onClose={() => setRoleModalStaff(null)}
        onConfirm={handleChangeRole}
        staff={roleModalStaff}
        loading={actionLoadingId === roleModalStaff?.id}
      />

      <ConfirmActionModal
        isOpen={!!statusModalStaff}
        onClose={() => setStatusModalStaff(null)}
        onConfirm={handleToggleStatus}
        loading={actionLoadingId === statusModalStaff?.id}
        tone={statusModalStaff?.isActive ? "red" : "emerald"}
        title={
          statusModalStaff?.isActive
            ? "Deactivate This Account?"
            : "Reactivate This Account?"
        }
        description={
          statusModalStaff
            ? statusModalStaff.isActive
              ? `${statusModalStaff.name} will immediately lose access to the admin dashboard.`
              : `${statusModalStaff.name} will regain access to the admin dashboard.`
            : ""
        }
        confirmLabel={statusModalStaff?.isActive ? "Deactivate" : "Activate"}
      />
    </div>
  );
}
