// src/app/(admin)/context/ToastContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastContextValue {
  toasts: ToastItem[];
  showToast: (type: ToastType, title: string, description?: string) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function AdminToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (type: ToastType, title: string, description?: string) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      setToasts((prev) => [...prev, { id, type, title, description }]);

      // Auto-dismiss after 5s
      setTimeout(() => dismissToast(id), 5000);
    },
    [dismissToast],
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useAdminToast() {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error("useAdminToast must be used within AdminToastProvider");
  return context;
}

// Usage — how any component calls it

// import { useAdminToast } from "@/app/(admin)/context/ToastContext";

// function SomeComponent() {
//   const { showToast } = useAdminToast();

//   showToast("success", "Payment Recorded", "₦135,000 received via Cash");
//   showToast("error", "Failed to Save Room", "Please check required fields");
//   showToast(
//     "info",
//     "New Pending Request",
//     "MAG-58201 from Chief Alexander Cole",
//   );
//   showToast("warning", "Low Occupancy Alert", "Only 2 rooms remain available");
// }
