// src/app/(admin)/admin/types/reports.ts
export interface RevenueTrendPoint {
  date: string;
  revenue: number;
}
export interface OccupancyTrendPoint {
  date: string;
  occupancyRate: number;
}
export interface PaymentMethodBreakdown {
  method: string;
  total: number;
}

export interface KeyMetrics {
  period: string;
  totalRevenue: number;
  occupancyRate: number;
  adr: number;
  revPAR: number;
  paymentsByMethod: PaymentMethodBreakdown[];
}
