export interface RoomCategory {
  id: string;
  name: string;
  basePrice?: number;
  capacity?: number;
}

export interface Room {
  id: string;
  _id?: string; // Legacy compatibility
  roomNumber?: string;
  name?: string;
  title?: string;
  categoryId?: string;
  category?: string | RoomCategory;
  pricePerNight?: number;
  price?: number;
  status?: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE" | string;
  description?: string;
  images?: string[]; // Contains Cloudinary image AND video URLs
  image?: string;
  floor?: number | string;

  // Display specs (falls back to category capacity/defaults if missing)
  capacity?: number;
  guests?: string;
  sizeSqFt?: number;
  size?: string;
  bedType?: string;
  bed?: string;
  amenities?: string[];
  features?: string[];
}

// Helper utility functions
export const getRoomId = (r: Room): string => r.id || r._id || "";

export const getRoomName = (r: Room): string => {
  if (r.name) return r.name;
  if (r.title) return r.title;
  const categoryName =
    typeof r.category === "object" ? r.category?.name : r.category;
  return categoryName
    ? `${categoryName} (Room ${r.roomNumber})`
    : `Room ${r.roomNumber}`;
};

export const getRoomPrice = (r: Room): number => {
  if (typeof r.pricePerNight === "number") return r.pricePerNight;
  if (typeof r.price === "number") return r.price;
  if (
    typeof r.category === "object" &&
    typeof r.category?.basePrice === "number"
  )
    return r.category.basePrice;
  return 0;
};

export const getRoomCategory = (r: Room): string => {
  if (typeof r.category === "object" && r.category?.name)
    return r.category.name;
  if (typeof r.category === "string") return r.category;
  return "Standard";
};

/**
 * Enhanced check for video URLs (handles Cloudinary, standard video formats, and query params)
 */
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

/**
 * Retrieves ALL media items (Images + Videos) as an array
 */
export function getAllRoomMedia(room: Room | null): string[] {
  if (!room) return [];

  const mediaList: string[] = [];

  // 1. Collect images array
  if (Array.isArray(room.images)) {
    mediaList.push(...room.images);
  } else if (Array.isArray((room as any).media)) {
    mediaList.push(...(room as any).media);
  }

  // 2. Explicitly include videoUrl if present
  if ((room as any).videoUrl) {
    mediaList.push((room as any).videoUrl);
  }

  // Fallback to primary image if nothing else
  if (mediaList.length === 0) {
    const primary = getPrimaryImage(room);
    if (primary) mediaList.push(primary);
  }

  // Filter out falsy or duplicate items
  return Array.from(new Set(mediaList.filter(Boolean)));
}

export const getPrimaryImage = (r: Room): string => {
  const allMedia = getAllRoomMedia(r);
  return (
    allMedia[0] ||
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800"
  );
};

export const getRoomFeatures = (r: Room): string[] =>
  r.amenities || r.features || [];
