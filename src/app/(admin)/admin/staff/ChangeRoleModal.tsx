// src/app/(admin)/components/admin/staff/ChangeRoleModal.tsx
"use client";

import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { StaffMember, StaffRole } from "@/app/(admin)/types/staff";

interface ChangeRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (role: StaffRole) => void;
  staff: StaffMember | null;
  loading?: boolean;
}

export default function ChangeRoleModal({
  isOpen,
  onClose,
  onConfirm,
  staff,
  loading,
}: ChangeRoleModalProps) {
  const [role, setRole] = useState<StaffRole>("RECEPTIONIST");

  useEffect(() => {
    if (staff) setRole(staff.role);
  }, [staff]);

  if (!isOpen || !staff) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-6 space-y-4 transition-colors">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Change Role — {staff.name}
        </h3>

        <div>
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
            New Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as StaffRole)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500/50 transition"
          >
            <option value="RECEPTIONIST">Receptionist</option>
            <option value="MANAGER">Manager</option>
            <option value="GENERAL_MANAGER">General Manager</option>
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(role)}
            disabled={loading || role === staff.role}
            className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Update Role"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
