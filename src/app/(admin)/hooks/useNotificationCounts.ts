// src/app/(admin)/admin/hooks/useNotificationCounts.ts
"use client";
import { useEffect, useState } from "react";
import { adminAxios } from "@/app/(admin)/lib/axiosInstance";

export interface NotificationCounts {
  bookings: number;
  reviews: number;
  housekeeping: number;
  inventory: number;
}

const POLL_INTERVAL_MS = 30000;

export function useNotificationCounts() {
  const [counts, setCounts] = useState<NotificationCounts>({
    bookings: 0,
    reviews: 0,
    housekeeping: 0,
    inventory: 0,
  });

  const fetchCounts = async () => {
    try {
      const { data } = await adminAxios.get("/notifications/counts");
      setCounts(data.data);
    } catch {
      // silent — badges shouldn't crash the sidebar
    }
  };

  useEffect(() => {
    fetchCounts();
    const interval = setInterval(fetchCounts, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return counts;
}
