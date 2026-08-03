// src/app/(admin)/admin/types/settings.ts
export interface HotelSettings {
  id: string;
  bankName?: string | null;
  accountName?: string | null;
  accountNumber?: string | null;
  whatsappNumber?: string | null;
  checkInTime?: string | null;
  checkOutTime?: string | null;
  cancellationPolicy?: string | null;
}
