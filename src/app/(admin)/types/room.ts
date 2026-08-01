// src/app/(admin)/admin/types/room.ts

export type RoomStatus = "AVAILABLE" | "OCCUPIED" | "MAINTENANCE" | "RESERVED";

export interface RoomCategory {
  id: string;
  name: string;
  description?: string | null;
  basePrice: number;
  capacity: number;
  roomCount?: number; // from _count.rooms in getCategories
}

export interface Room {
  id: string;
  roomNumber: string;
  categoryId: string;
  category: RoomCategory;
  pricePerNight: number;
  description?: string | null;
  status: RoomStatus;
  images: string[];
  videoUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}
