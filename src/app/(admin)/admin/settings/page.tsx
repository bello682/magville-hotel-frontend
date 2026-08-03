// src/app/(admin)/admin/settings/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, Save } from "lucide-react";
import { RootState, AppDispatch } from "@/store/store";
import {
  fetchSettings,
  saveSettings,
} from "@/store/redux/actions/adminAction/settingsActions";
import { useAdminToast } from "../../context/ToastContext";

export default function SettingsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { showToast } = useAdminToast();
  const { settings, loading, saveLoading } = useSelector(
    (s: RootState) => s.settings,
  );

  const [form, setForm] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
    whatsappNumber: "",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    cancellationPolicy: "",
  });

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  useEffect(() => {
    if (settings) {
      setForm({
        bankName: settings.bankName || "",
        accountName: settings.accountName || "",
        accountNumber: settings.accountNumber || "",
        whatsappNumber: settings.whatsappNumber || "",
        checkInTime: settings.checkInTime || "14:00",
        checkOutTime: settings.checkOutTime || "12:00",
        cancellationPolicy: settings.cancellationPolicy || "",
      });
    }
  }, [settings]);

  const inputClass =
    "w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500/50 transition";

  const handleSave = () => {
    dispatch(saveSettings(form));
    showToast("success", "Settings Saved");
  };

  if (loading)
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="w-7 h-7 animate-spin text-amber-500" />
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <p className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold">
          Home / Admin / Settings
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
          Hotel Settings
        </h1>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5 max-w-2xl">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          Payment Details
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 -mt-3">
          Shown to guests on the reservation tracking page.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Bank Name
            </label>
            <input
              value={form.bankName}
              onChange={(e) => setForm({ ...form, bankName: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Account Name
            </label>
            <input
              value={form.accountName}
              onChange={(e) =>
                setForm({ ...form, accountName: e.target.value })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Account Number
            </label>
            <input
              value={form.accountNumber}
              onChange={(e) =>
                setForm({ ...form, accountNumber: e.target.value })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              WhatsApp Number
            </label>
            <input
              value={form.whatsappNumber}
              onChange={(e) =>
                setForm({ ...form, whatsappNumber: e.target.value })
              }
              placeholder="2348134897802"
              className={inputClass}
            />
          </div>
        </div>

        <h3 className="text-sm font-semibold text-slate-900 dark:text-white pt-3 border-t border-slate-200 dark:border-slate-800">
          Stay Policies
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Check-In Time
            </label>
            <input
              type="time"
              value={form.checkInTime}
              onChange={(e) =>
                setForm({ ...form, checkInTime: e.target.value })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Check-Out Time
            </label>
            <input
              type="time"
              value={form.checkOutTime}
              onChange={(e) =>
                setForm({ ...form, checkOutTime: e.target.value })
              }
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
            Cancellation Policy
          </label>
          <textarea
            rows={3}
            value={form.cancellationPolicy}
            onChange={(e) =>
              setForm({ ...form, cancellationPolicy: e.target.value })
            }
            className={`${inputClass} resize-none`}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saveLoading}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition disabled:opacity-50"
        >
          {saveLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}{" "}
          Save Settings
        </button>
      </div>
    </div>
  );
}
