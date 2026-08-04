// src/app/(admin)/admin/inventory/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Loader2,
  AlertTriangle,
  Package,
  Plus,
  History,
  Trash2,
} from "lucide-react";
import StockMovementModal from "../inventory/StockMovementModal";
import MovementHistoryModal from "../inventory/MovementHistoryModal";
import AddInventoryItemModal, {
  NewInventoryItemValues,
} from "../inventory/AddInventoryItemModal";
import ConfirmActionModal from "../bookings/ConfirmActionModal";
import { InventoryItem } from "../../types/inventory";
import { RootState, AppDispatch } from "@/store/store";
import {
  fetchInventory,
  recordStockMovementAdmin,
  createInventoryItemAdmin,
  deleteInventoryItemAdmin,
} from "@/store/redux/actions/adminAction/inventoryActions";
import { useAdminToast } from "../../context/ToastContext";

export default function InventoryPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { showToast } = useAdminToast();
  const {
    items,
    lowStockCount,
    loading,
    movementLoadingId,
    createLoading,
    deleteLoadingId,
  } = useSelector((s: RootState) => s.inventory);

  const [movementItem, setMovementItem] = useState<InventoryItem | null>(null);
  const [historyItem, setHistoryItem] = useState<InventoryItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<InventoryItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  const handleMovement = (quantity: number, reason: string) => {
    if (!movementItem) return;
    dispatch(recordStockMovementAdmin(movementItem.id, quantity, reason));
    showToast(
      "success",
      quantity > 0 ? "Stock Restocked" : "Stock Deducted",
      movementItem.name,
    );
    setMovementItem(null);
  };

  const handleAddItem = (values: NewInventoryItemValues) => {
    dispatch(createInventoryItemAdmin(values));
    showToast("success", "Item Added", values.name);
    setIsAddModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!deletingItem) return;
    dispatch(deleteInventoryItemAdmin(deletingItem.id));
    showToast("success", "Item Deleted", deletingItem.name);
    setDeletingItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold">
            Home / Admin / Inventory
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Inventory & Supplies
          </h1>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition"
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      {lowStockCount > 0 && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm rounded-xl flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" /> {lowStockCount} item
          {lowStockCount !== 1 ? "s" : ""} below minimum threshold
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-7 h-7 animate-spin text-amber-500" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-10 text-center text-sm text-slate-400 dark:text-slate-500">
          No inventory items yet. Click "Add Item" to get started.
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  {[
                    "Item",
                    "Category",
                    "Stock",
                    "Min Threshold",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className={
                      item.isLowStock
                        ? "bg-red-50/50 dark:bg-red-950/10"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    }
                  >
                    <td className="px-5 py-3.5 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                      <Package className="w-4 h-4 text-slate-400" /> {item.name}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">
                      {item.category.replace("_", " ")}
                    </td>
                    <td
                      className={`px-5 py-3.5 font-bold ${item.isLowStock ? "text-red-600 dark:text-red-400" : "text-slate-900 dark:text-white"}`}
                    >
                      {item.currentStock} {item.unit}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">
                      {item.minThreshold} {item.unit}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setMovementItem(item)}
                          className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 px-2.5 py-1.5 rounded-lg transition"
                        >
                          Adjust
                        </button>
                        <button
                          onClick={() => setHistoryItem(item)}
                          title="View History"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <History className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingItem(item)}
                          title="Delete"
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <StockMovementModal
        isOpen={!!movementItem}
        onClose={() => setMovementItem(null)}
        item={movementItem}
        onSubmit={handleMovement}
        loading={movementLoadingId === movementItem?.id}
      />
      <MovementHistoryModal
        isOpen={!!historyItem}
        onClose={() => setHistoryItem(null)}
        item={historyItem}
      />
      <AddInventoryItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddItem}
        loading={createLoading}
      />
      <ConfirmActionModal
        isOpen={!!deletingItem}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleConfirmDelete}
        loading={deleteLoadingId === deletingItem?.id}
        tone="red"
        title="Delete This Item?"
        description={
          deletingItem
            ? `"${deletingItem.name}" and its movement history will be permanently removed.`
            : ""
        }
        confirmLabel="Delete"
      />
    </div>
  );
}
