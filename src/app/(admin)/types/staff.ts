// src/app/(admin)/admin/types/staff.ts

export type StaffRole = "GENERAL_MANAGER" | "MANAGER" | "RECEPTIONIST";

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: StaffRole;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
}
