// src/app/(admin)/components/admin/marketing/BulkEmailComposer.tsx
"use client";

import { useState } from "react";
import { Send, Loader2, Users, Eye } from "lucide-react";
import {
  BulkEmailFormValues,
  TargetGroup,
} from "@/app/(admin)/types/marketing";
import ImageUrlOrUploadInput from "../../shared/ImageUrlOrUploadInput";

interface BulkEmailComposerProps {
  onSend: (values: BulkEmailFormValues) => void;
  onPreviewRecipients: (
    targetGroup: TargetGroup,
    customRecipients: string,
  ) => void;
  previewCount: number | null;
  previewLoading?: boolean;
  sendLoading?: boolean;
}

const EMPTY_FORM: BulkEmailFormValues = {
  subject: "",
  htmlContent: "",
  targetGroup: "ALL",
  customRecipients: "",
  bannerImageUrl: "",
  ctaText: "",
  ctaUrl: "",
};

export default function BulkEmailComposer({
  onSend,
  onPreviewRecipients,
  previewCount,
  previewLoading,
  sendLoading,
}: BulkEmailComposerProps) {
  const [form, setForm] = useState<BulkEmailFormValues>(EMPTY_FORM);

  const inputClass =
    "w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 transition";

  const isValid = form.subject.trim() && form.htmlContent.trim();

  const handleSend = () => {
    if (!isValid) return;
    onSend(form);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Composer form */}
      <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5 transition-colors">
        <div>
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
            Subject Line *
          </label>
          <input
            type="text"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            placeholder="e.g. Exclusive Offer at Magville Hotel"
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
            Email Content (HTML) *
          </label>
          <textarea
            rows={10}
            value={form.htmlContent}
            onChange={(e) => setForm({ ...form, htmlContent: e.target.value })}
            placeholder="<p>Dear Guest,</p><p>Indulge in our Executive Ocean-View Suites with 20% off...</p>"
            className={`${inputClass} font-mono text-xs resize-y`}
          />
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
            HTML is wrapped automatically in the Magville email layout — you
            only need the inner content.
          </p>
        </div>

        <div>
          {/* <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
            Banner Image URL (optional)
          </label>
          <input
            type="text"
            value={form.bannerImageUrl}
            onChange={(e) =>
              setForm({ ...form, bannerImageUrl: e.target.value })
            }
            placeholder="https://..."
            className={inputClass}
          /> */}
          <ImageUrlOrUploadInput
            label="Banner Image (optional)"
            value={form.bannerImageUrl}
            onChange={(url) => setForm({ ...form, bannerImageUrl: url })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              CTA Button Text
            </label>
            <input
              type="text"
              value={form.ctaText}
              onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
              placeholder="Reserve Your Suite Now"
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              CTA URL
            </label>
            <input
              type="text"
              value={form.ctaUrl}
              onChange={(e) => setForm({ ...form, ctaUrl: e.target.value })}
              placeholder="https://magvillehotel.com/rooms"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Right: Recipients + send panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5 h-fit transition-colors">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="w-4 h-4 text-amber-500" /> Recipients
        </h3>

        <div>
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
            Target Group
          </label>
          <select
            value={form.targetGroup}
            onChange={(e) =>
              setForm({ ...form, targetGroup: e.target.value as TargetGroup })
            }
            className={inputClass}
          >
            <option value="ALL">All Guests</option>
            <option value="CHECKED_IN">Currently Checked-In</option>
            <option value="PAST_GUESTS">Past Guests (Checked-Out)</option>
            <option value="CUSTOM">Custom List</option>
          </select>
        </div>

        {form.targetGroup === "CUSTOM" && (
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Email Addresses
            </label>
            <textarea
              rows={3}
              value={form.customRecipients}
              onChange={(e) =>
                setForm({ ...form, customRecipients: e.target.value })
              }
              placeholder="email1@example.com, email2@example.com"
              className={`${inputClass} resize-none text-xs`}
            />
          </div>
        )}

        <button
          type="button"
          onClick={() =>
            onPreviewRecipients(form.targetGroup, form.customRecipients)
          }
          disabled={previewLoading}
          className="w-full flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition disabled:opacity-50"
        >
          {previewLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Eye className="w-4 h-4" /> Preview Recipients
            </>
          )}
        </button>

        {previewCount !== null && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {previewCount}
            </p>
            <p className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
              Resolved Recipients
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleSend}
          disabled={!isValid || sendLoading}
          className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition disabled:opacity-50"
        >
          {sendLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Send className="w-4 h-4" /> Send Campaign
            </>
          )}
        </button>
      </div>
    </div>
  );
}
