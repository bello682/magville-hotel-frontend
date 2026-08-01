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

export const isVideoUrl = (url?: string): boolean => {
  if (!url) return false;
  const cleanUrl = url.toLowerCase().split("?")[0];

  const hasVideoExtension =
    cleanUrl.match(/\.(mp4|webm|ogg|mov|m4v|avi|mkv)$/i) !== null;
  const isCloudinaryVideo =
    cleanUrl.includes("/video/upload/") ||
    cleanUrl.includes("resource_type/video") ||
    cleanUrl.includes("f_auto,q_auto/v");

  return hasVideoExtension || isCloudinaryVideo;
};
