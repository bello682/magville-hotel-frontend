"use client";

import { useState } from "react";
import ConfirmActionModal from "../bookings/ConfirmActionModal";
import ChangeRoleModal from "../staff/ChangeRoleModal";
import StaffTable from "../staff/StaffTable";
import { StaffMember, StaffRole } from "../../types/staff";

// 🔧 Mock data — replace with GET /api/v1/staff
const MOCK_STAFF: StaffMember[] = [
  {
    id: "u1",
    name: "Bello Tayo",
    email: "belloadetayo14@gmail.com",
    role: "GENERAL_MANAGER",
    isVerified: true,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "u2",
    name: "Grace Adebayo",
    email: "grace@magville.com",
    role: "MANAGER",
    isVerified: true,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "u3",
    name: "Tunde Okafor",
    email: "tunde@magville.com",
    role: "RECEPTIONIST",
    isVerified: true,
    isActive: false,
    createdAt: new Date().toISOString(),
  },
];

// 🔧 Replace with actual logged-in user id (decode from token / stored user object)
const CURRENT_USER_ID = "u1";

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>(MOCK_STAFF);
  const [roleModalStaff, setRoleModalStaff] = useState<StaffMember | null>(
    null,
  );
  const [statusModalStaff, setStatusModalStaff] = useState<StaffMember | null>(
    null,
  );
  const [actionLoading, setActionLoading] = useState(false);

  // 🔧 Replace with PATCH /api/v1/staff/:id/role
  const handleChangeRole = (newRole: StaffRole) => {
    if (!roleModalStaff) return;
    setActionLoading(true);
    setTimeout(() => {
      setStaff((prev) =>
        prev.map((s) =>
          s.id === roleModalStaff.id ? { ...s, role: newRole } : s,
        ),
      );
      setActionLoading(false);
      setRoleModalStaff(null);
    }, 500);
  };

  // 🔧 Replace with PATCH /api/v1/staff/:id/status
  const handleToggleStatus = () => {
    if (!statusModalStaff) return;
    setActionLoading(true);
    setTimeout(() => {
      setStaff((prev) =>
        prev.map((s) =>
          s.id === statusModalStaff.id ? { ...s, isActive: !s.isActive } : s,
        ),
      );
      setActionLoading(false);
      setStatusModalStaff(null);
    }, 500);
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

      <StaffTable
        staff={staff}
        currentUserId={CURRENT_USER_ID}
        onChangeRole={setRoleModalStaff}
        onToggleStatus={setStatusModalStaff}
      />

      <ChangeRoleModal
        isOpen={!!roleModalStaff}
        onClose={() => setRoleModalStaff(null)}
        onConfirm={handleChangeRole}
        staff={roleModalStaff}
        loading={actionLoading}
      />

      <ConfirmActionModal
        isOpen={!!statusModalStaff}
        onClose={() => setStatusModalStaff(null)}
        onConfirm={handleToggleStatus}
        loading={actionLoading}
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
