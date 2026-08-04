// src/app/(admin)/admin/types/inventory.ts
export type StockCategory =
  | "LINEN"
  | "TOILETRIES"
  | "FOOD_BEVERAGE"
  | "CLEANING_SUPPLIES"
  | "OTHER";

export interface InventoryItem {
  id: string;
  name: string;
  category: StockCategory;
  currentStock: number;
  minThreshold: number;
  unit: string;
  isLowStock: boolean;
}

export interface StockMovementItem {
  id: string;
  quantity: number;
  reason?: string | null;
  createdAt: string;
  createdBy?: { name: string } | null;
}
