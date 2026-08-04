// src/app/(admin)/components/admin/inventory/MovementHistoryModal.tsx
"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, ArrowUpCircle, ArrowDownCircle, Loader2 } from "lucide-react";
import { RootState, AppDispatch } from "@/store/store";
import { fetchItemMovements } from "@/store/redux/actions/adminAction/inventoryActions";
import { InventoryItem } from "@/app/(admin)/types/inventory";

interface MovementHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: InventoryItem | null;
}

export default function MovementHistoryModal({
  isOpen,
  onClose,
  item,
}: MovementHistoryModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { movements, movementsLoading } = useSelector(
    (s: RootState) => s.inventory,
  );

  useEffect(() => {
    if (isOpen && item) dispatch(fetchItemMovements(item.id));
  }, [isOpen, item, dispatch]);

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {item.name} — History
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 max-h-96 overflow-y-auto">
          {movementsLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
            </div>
          ) : movements.length === 0 ? (
            <p className="text-center text-sm text-slate-400 py-8">
              No stock movements recorded yet.
            </p>
          ) : (
            <div className="space-y-2">
              {movements.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    {m.quantity > 0 ? (
                      <ArrowUpCircle className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <ArrowDownCircle className="w-4 h-4 text-red-500" />
                    )}
                    <div>
                      <p className="text-xs text-slate-900 dark:text-white">
                        {m.reason || (m.quantity > 0 ? "Restock" : "Deduction")}
                      </p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">
                        {new Date(m.createdAt).toLocaleString()}{" "}
                        {m.createdBy?.name && `• ${m.createdBy.name}`}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-mono font-bold text-sm ${m.quantity > 0 ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {m.quantity > 0 ? "+" : ""}
                    {m.quantity}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
