// src/app/(admin)/components/admin/shared/ImageUrlOrUploadInput.tsx
"use client";

import { useState, useRef } from "react";
import { Link2, Upload, Loader2, X } from "lucide-react";
import { adminAxios } from "@/app/(admin)/lib/axiosInstance";

interface ImageUrlOrUploadInputProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUrlOrUploadInput({
  value,
  onChange,
  label = "Image",
}: ImageUrlOrUploadInputProps) {
  const [mode, setMode] = useState<"url" | "upload">("url");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const inputClass =
    "w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 transition";

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await adminAxios.post("/upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onChange(data.data.url);
    } catch (error: any) {
      setUploadError(
        error?.response?.data?.message || "Upload failed. Try again.",
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {label}
        </label>
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase transition flex items-center gap-1 ${
              mode === "url"
                ? "bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            <Link2 className="w-3 h-3" /> URL
          </button>
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase transition flex items-center gap-1 ${
              mode === "upload"
                ? "bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            <Upload className="w-3 h-3" /> Upload
          </button>
        </div>
      </div>

      {mode === "url" ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className={inputClass}
        />
      ) : (
        <div>
          <label className="flex flex-col items-center justify-center gap-1.5 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg py-5 cursor-pointer hover:border-amber-500/50 transition">
            {uploading ? (
              <Loader2 className="w-5 h-5 text-amber-500 animate-spin" />
            ) : (
              <Upload className="w-5 h-5 text-slate-400" />
            )}
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {uploading
                ? "Uploading..."
                : "Click to select an image from your device"}
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={uploading}
              className="hidden"
            />
          </label>
          {uploadError && (
            <p className="text-red-500 text-[11px] mt-1">{uploadError}</p>
          )}
        </div>
      )}

      {/* Live preview + clear button, shown regardless of mode once a URL exists */}
      {value && (
        <div className="relative mt-2 w-fit">
          <img
            src={value}
            alt="Preview"
            className="h-20 rounded-lg border border-slate-200 dark:border-slate-800 object-cover"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
