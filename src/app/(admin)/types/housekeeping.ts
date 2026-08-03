// src/app/(admin)/admin/types/housekeeping.ts

export type HousekeepingStatus =
  | "CLEAN"
  | "DIRTY"
  | "CLEANING_IN_PROGRESS"
  | "OUT_OF_ORDER";
export type MaintenanceStatus = "PENDING" | "IN_PROGRESS" | "RESOLVED";

export interface HousekeepingRoom {
  id: string;
  roomNumber: string;
  status: string; // booking-level room status (AVAILABLE/OCCUPIED/etc)
  housekeepingStatus: HousekeepingStatus;
  category: { name: string };
  openMaintenanceCount: number;
}

export interface MaintenanceRequestItem {
  id: string;
  description: string;
  status: MaintenanceStatus;
  createdAt: string;
  resolvedAt?: string | null;
  room: { roomNumber: string };
  reportedBy?: { name: string } | null;
}
