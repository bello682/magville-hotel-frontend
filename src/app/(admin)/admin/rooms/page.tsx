"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Loader2, AlertCircle } from "lucide-react";
import RoomsTabs, { RoomsTab } from "../rooms/RoomsTabs";
import RoomsTable from "../rooms/RoomsTable";
import CategoriesGrid from "../rooms/CategoriesGrid";
import RoomFormModal, { RoomFormValues } from "../rooms/RoomFormModal";
import CreateCategoryModal, {
  NewCategoryFormValues,
} from "../rooms/CreateCategoryModal";
import RoomDetailModal from "../rooms/RoomDetailModal";
import { Room, RoomStatus } from "../../types/room";
import { RootState, AppDispatch } from "@/store/store";
import {
  fetchCategories,
  createCategoryAdmin,
  resetCategoryCreate,
  fetchAdminRooms,
  fetchRoomById,
  clearRoomDetail,
  saveRoomAdmin,
  resetRoomSave,
} from "@/store/redux/actions/adminAction/roomAdminActions";

export default function RoomsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    categories,
    categoriesLoading,
    categoryCreateLoading,
    categoryCreateSuccess,
    categoryCreateError,
    rooms,
    roomsLoading,
    roomsError,
    detail: detailRoom,
    saveLoading,
    saveSuccess,
    saveError,
  } = useSelector((state: RootState) => state.roomAdmin);

  const [activeTab, setActiveTab] = useState<RoomsTab>("rooms");
  const [statusFilter, setStatusFilter] = useState<RoomStatus | "ALL">("ALL");
  const [detailRoomId, setDetailRoomId] = useState<string | null>(null);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isRoomFormOpen, setIsRoomFormOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAdminRooms());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchAdminRooms(
        statusFilter !== "ALL" ? { status: statusFilter } : undefined,
      ),
    );
  }, [statusFilter, dispatch]);

  useEffect(() => {
    if (detailRoomId) {
      dispatch(fetchRoomById(detailRoomId));
    } else {
      dispatch(clearRoomDetail());
    }
  }, [detailRoomId, dispatch]);

  useEffect(() => {
    if (saveSuccess) {
      setIsRoomFormOpen(false);
      setEditingRoom(null);
      dispatch(resetRoomSave());
    }
  }, [saveSuccess, dispatch]);

  useEffect(() => {
    if (categoryCreateSuccess) {
      setIsCategoryModalOpen(false);
      dispatch(resetCategoryCreate());
    }
  }, [categoryCreateSuccess, dispatch]);

  const filteredRooms = useMemo(() => rooms, [rooms]); // status filtering now happens server-side

  const handleSubmitRoom = (values: RoomFormValues) => {
    dispatch(saveRoomAdmin(values, editingRoom?.id || null));
  };

  const handleSubmitCategory = (values: NewCategoryFormValues) => {
    dispatch(createCategoryAdmin(values));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold">
            Home / Admin / Rooms
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Rooms Inventory
          </h1>
        </div>
        {activeTab === "rooms" && (
          <button
            onClick={() => {
              setEditingRoom(null);
              setIsRoomFormOpen(true);
            }}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add New Room
          </button>
        )}
      </div>

      <RoomsTabs activeTab={activeTab} onChange={setActiveTab} />

      {saveError && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" /> {saveError}
        </div>
      )}

      {activeTab === "rooms" ? (
        roomsLoading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="w-7 h-7 animate-spin text-amber-500" />
            <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Loading rooms...
            </p>
          </div>
        ) : roomsError ? (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" /> {roomsError}
          </div>
        ) : (
          <RoomsTable
            rooms={filteredRooms}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onViewDetail={(room) => setDetailRoomId(room.id)}
            onEdit={(room) => {
              setEditingRoom(room);
              setIsRoomFormOpen(true);
            }}
          />
        )
      ) : categoriesLoading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <Loader2 className="w-7 h-7 animate-spin text-amber-500" />
        </div>
      ) : (
        <CategoriesGrid
          categories={categories}
          onAddCategory={() => setIsCategoryModalOpen(true)}
        />
      )}

      <RoomFormModal
        isOpen={isRoomFormOpen}
        onClose={() => {
          setIsRoomFormOpen(false);
          setEditingRoom(null);
        }}
        onSubmit={handleSubmitRoom}
        categories={categories}
        editingRoom={editingRoom}
        loading={saveLoading}
      />

      <CreateCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSubmit={handleSubmitCategory}
        loading={categoryCreateLoading}
      />
      {categoryCreateError && (
        <p className="text-red-500 text-xs text-center">
          {categoryCreateError}
        </p>
      )}

      <RoomDetailModal
        isOpen={!!detailRoomId}
        onClose={() => setDetailRoomId(null)}
        room={detailRoom}
      />
    </div>
  );
}
