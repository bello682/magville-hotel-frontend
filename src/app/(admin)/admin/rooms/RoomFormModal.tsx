// src/app/(admin)/components/admin/rooms/RoomFormModal.tsx
"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Upload, Trash2, Play } from "lucide-react";
import {
  Room,
  RoomCategory,
  RoomStatus,
  isVideoUrl,
} from "@/app/(admin)/types/room";

export interface RoomFormValues {
  roomNumber: string;
  categoryId: string;
  pricePerNight: string;
  description: string;
  status: RoomStatus;
  existingImages: string[]; // URLs already saved
  newFiles: File[]; // freshly selected files to upload
}

interface RoomFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: RoomFormValues) => void;
  categories: RoomCategory[];
  editingRoom: Room | null; // null = create mode
  loading?: boolean;
}

const EMPTY_FORM: RoomFormValues = {
  roomNumber: "",
  categoryId: "",
  pricePerNight: "",
  description: "",
  status: "AVAILABLE",
  existingImages: [],
  newFiles: [],
};

export default function RoomFormModal({
  isOpen,
  onClose,
  onSubmit,
  categories,
  editingRoom,
  loading,
}: RoomFormModalProps) {
  const [form, setForm] = useState<RoomFormValues>(EMPTY_FORM);

  useEffect(() => {
    if (editingRoom) {
      setForm({
        roomNumber: editingRoom.roomNumber,
        categoryId: editingRoom.categoryId,
        pricePerNight: String(editingRoom.pricePerNight),
        description: editingRoom.description || "",
        status: editingRoom.status,
        existingImages: editingRoom.images,
        newFiles: [],
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editingRoom, isOpen]);

  if (!isOpen) return null;

  const isValid =
    form.roomNumber.trim() && form.categoryId && form.pricePerNight;

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setForm((prev) => ({ ...prev, newFiles: [...prev.newFiles, ...files] }));
  };

  const removeExistingImage = (url: string) => {
    setForm((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((img) => img !== url),
    }));
  };

  const removeNewFile = (index: number) => {
    setForm((prev) => ({
      ...prev,
      newFiles: prev.newFiles.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit(form);
  };

  const handleClose = () => {
    setForm(EMPTY_FORM);
    onClose();
  };

  const inputClass =
    "w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 transition";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="absolute inset-0" onClick={handleClose} />
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden transition-colors my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {editingRoom
              ? `Edit Room ${editingRoom.roomNumber}`
              : "Add New Room"}
          </h3>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5 max-h-[75vh] overflow-y-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                Room Number *
              </label>
              <input
                type="text"
                value={form.roomNumber}
                onChange={(e) =>
                  setForm({ ...form, roomNumber: e.target.value })
                }
                placeholder="e.g. 101"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                Category *
              </label>
              <select
                value={form.categoryId}
                onChange={(e) =>
                  setForm({ ...form, categoryId: e.target.value })
                }
                className={inputClass}
              >
                <option value="">Select category...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                Price Per Night *
              </label>
              <input
                type="number"
                value={form.pricePerNight}
                onChange={(e) =>
                  setForm({ ...form, pricePerNight: e.target.value })
                }
                placeholder="55000"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value as RoomStatus })
                }
                className={inputClass}
              >
                <option value="AVAILABLE">Available</option>
                <option value="OCCUPIED">Occupied</option>
                <option value="MAINTENANCE">Maintenance</option>
                <option value="RESERVED">Reserved</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Description
            </label>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="First floor ocean-facing room..."
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Media Upload */}
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Images / Videos
            </label>

            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg py-6 cursor-pointer hover:border-amber-500/50 transition">
              <Upload className="w-5 h-5 text-slate-400" />
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Click to upload images or videos
              </span>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFilesSelected}
                className="hidden"
              />
            </label>

            {/* Existing images (edit mode) */}
            {form.existingImages.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-3">
                {form.existingImages.map((url) => {
                  const isVideo = isVideoUrl(url);
                  return (
                    <div key={url} className="relative group">
                      {isVideo ? (
                        <div className="relative w-full h-16 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-black">
                          <video
                            src={url}
                            className="w-full h-full object-cover"
                            muted
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play className="w-4 h-4 text-white fill-white" />
                          </div>
                        </div>
                      ) : (
                        <img
                          src={url}
                          alt="Room media"
                          className="w-full h-16 object-cover rounded-lg border border-slate-200 dark:border-slate-800"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => removeExistingImage(url)}
                        className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Newly selected files */}
            {form.newFiles.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-3">
                {form.newFiles.map((file, idx) => (
                  <div key={idx} className="relative group">
                    <div className="w-full h-16 rounded-lg border border-amber-500/40 bg-amber-500/5 flex items-center justify-center px-1">
                      <span className="text-[9px] text-amber-600 dark:text-amber-400 text-center truncate">
                        {file.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeNewFile(idx)}
                      className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition mt-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid || loading}
              className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : editingRoom ? (
                "Save Changes"
              ) : (
                "Create Room"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
