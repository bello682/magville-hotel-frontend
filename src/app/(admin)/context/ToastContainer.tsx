// src/app/(admin)/components/admin/ToastContainer.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from "lucide-react";
import { useAdminToast, ToastType } from "../context/ToastContext";

const TOAST_CONFIG: Record<
  ToastType,
  {
    icon: typeof CheckCircle2;
    iconClass: string;
    borderClass: string;
    bgClass: string;
  }
> = {
  success: {
    icon: CheckCircle2,
    iconClass: "text-emerald-500",
    borderClass: "border-emerald-500/30",
    bgClass: "bg-emerald-500/5",
  },
  error: {
    icon: XCircle,
    iconClass: "text-red-500",
    borderClass: "border-red-500/30",
    bgClass: "bg-red-500/5",
  },
  info: {
    icon: Info,
    iconClass: "text-sky-500",
    borderClass: "border-sky-500/30",
    bgClass: "bg-sky-500/5",
  },
  warning: {
    icon: AlertTriangle,
    iconClass: "text-amber-500",
    borderClass: "border-amber-500/30",
    bgClass: "bg-amber-500/5",
  },
};

export default function ToastContainer() {
  const { toasts, dismissToast } = useAdminToast();

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const config = TOAST_CONFIG[toast.type];
          const Icon = config.icon;

          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{
                opacity: 0,
                x: 80,
                scale: 0.9,
                transition: { duration: 0.2 },
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`pointer-events-auto relative overflow-hidden rounded-xl border ${config.borderClass} ${config.bgClass} bg-white dark:bg-slate-900 shadow-2xl backdrop-blur-md`}
            >
              <div className="flex items-start gap-3 p-4">
                <div className={`shrink-0 mt-0.5 ${config.iconClass}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {toast.title}
                  </p>
                  {toast.description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {toast.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => dismissToast(toast.id)}
                  className="shrink-0 text-slate-400 hover:text-slate-700 dark:hover:text-white transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Auto-dismiss progress bar */}
              <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 5, ease: "linear" }}
                className={`h-0.5 origin-left ${config.iconClass.replace("text-", "bg-")}`}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
