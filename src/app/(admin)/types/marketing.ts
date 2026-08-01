// src/app/(admin)/admin/types/marketing.ts

export type TargetGroup = "ALL" | "CHECKED_IN" | "PAST_GUESTS" | "CUSTOM";

export interface BulkEmailFormValues {
  subject: string;
  htmlContent: string;
  targetGroup: TargetGroup;
  customRecipients: string; // comma-separated, only used when targetGroup === "CUSTOM"
  bannerImageUrl: string;
  ctaText: string;
  ctaUrl: string;
}

export type AnnouncementStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface Announcement {
  id: string;
  title: string;
  message: string;
  imageUrl?: string | null;
  ctaText?: string | null;
  ctaUrl?: string | null;
  status: AnnouncementStatus;
  startsAt?: string | null;
  endsAt?: string | null;
  createdAt: string;
}
