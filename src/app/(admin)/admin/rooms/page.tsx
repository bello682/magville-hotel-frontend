"use client";

import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import RoomsTabs, { RoomsTab } from "../rooms/RoomsTabs";
import RoomsTable from "../rooms/RoomsTable";
import CategoriesGrid from "../rooms/CategoriesGrid";
import RoomFormModal, { RoomFormValues } from "../rooms/RoomFormModal";
import CreateCategoryModal, {
  NewCategoryFormValues,
} from "../rooms/CreateCategoryModal";
import RoomDetailModal from "../rooms/RoomDetailModal";
import { Room, RoomCategory, RoomStatus } from "../../types/room";

// 🔧 Mock data matching your controller response shapes
const MOCK_CATEGORIES: RoomCategory[] = [
  {
    id: "c1",
    name: "Executive Suite",
    description: "Spacious room with king-size bed and city view.",
    basePrice: 55000,
    capacity: 2,
    roomCount: 2,
  },
  {
    id: "c2",
    name: "Ocean View",
    description: "Premium suite facing the water, private balcony.",
    basePrice: 75000,
    capacity: 3,
    roomCount: 1,
  },
];

const MOCK_ROOMS: Room[] = [
  {
    id: "r1",
    roomNumber: "204",
    categoryId: "c1",
    category: MOCK_CATEGORIES[0],
    pricePerNight: 55000,
    description: "First floor, quiet corner room.",
    status: "AVAILABLE",
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "r2",
    roomNumber: "112",
    categoryId: "c1",
    category: MOCK_CATEGORIES[0],
    pricePerNight: 55000,
    description: null,
    status: "OCCUPIED",
    images: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "r3",
    roomNumber: "301",
    categoryId: "c2",
    category: MOCK_CATEGORIES[1],
    pricePerNight: 75000,
    description: "Ocean-facing room with balcony.",
    status: "MAINTENANCE",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function RoomsPage() {
  const [activeTab, setActiveTab] = useState<RoomsTab>("rooms");
  const [rooms, setRooms] = useState<Room[]>(MOCK_ROOMS);
  const [categories, setCategories] = useState<RoomCategory[]>(MOCK_CATEGORIES);
  const [statusFilter, setStatusFilter] = useState<RoomStatus | "ALL">("ALL");

  const [detailRoom, setDetailRoom] = useState<Room | null>(null);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isRoomFormOpen, setIsRoomFormOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const filteredRooms = useMemo(() => {
    return rooms.filter(
      (r) => statusFilter === "ALL" || r.status === statusFilter,
    );
  }, [rooms, statusFilter]);

  // 🔧 Replace bodies with real fetch calls later
  const handleSubmitRoom = (values: RoomFormValues) => {
    setActionLoading(true);
    setTimeout(() => {
      const category = categories.find((c) => c.id === values.categoryId)!;
      // Simulated upload: in real integration, upload newFiles to Cloudinary via backend, get URLs back
      const uploadedUrls = values.newFiles.map(
        (f) => URL.createObjectURL(f), // placeholder preview only — replace with real upload response
      );

      if (editingRoom) {
        setRooms((prev) =>
          prev.map((r) =>
            r.id === editingRoom.id
              ? {
                  ...r,
                  roomNumber: values.roomNumber,
                  categoryId: values.categoryId,
                  category,
                  pricePerNight: Number(values.pricePerNight),
                  description: values.description || null,
                  status: values.status,
                  images: [...values.existingImages, ...uploadedUrls],
                }
              : r,
          ),
        );
      } else {
        const newRoom: Room = {
          id: String(Date.now()),
          roomNumber: values.roomNumber,
          categoryId: values.categoryId,
          category,
          pricePerNight: Number(values.pricePerNight),
          description: values.description || null,
          status: values.status,
          images: uploadedUrls,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setRooms((prev) => [newRoom, ...prev]);
      }

      setActionLoading(false);
      setIsRoomFormOpen(false);
      setEditingRoom(null);
    }, 600);
  };

  const handleSubmitCategory = (values: NewCategoryFormValues) => {
    setActionLoading(true);
    setTimeout(() => {
      const newCategory: RoomCategory = {
        id: String(Date.now()),
        name: values.name,
        description: values.description || null,
        basePrice: Number(values.basePrice),
        capacity: Number(values.capacity) || 2,
        roomCount: 0,
      };
      setCategories((prev) => [newCategory, ...prev]);
      setActionLoading(false);
      setIsCategoryModalOpen(false);
    }, 600);
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

      {activeTab === "rooms" ? (
        <RoomsTable
          rooms={filteredRooms}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onViewDetail={setDetailRoom}
          onEdit={(room) => {
            setEditingRoom(room);
            setIsRoomFormOpen(true);
          }}
        />
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
        loading={actionLoading}
      />

      <CreateCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSubmit={handleSubmitCategory}
        loading={actionLoading}
      />

      <RoomDetailModal
        isOpen={!!detailRoom}
        onClose={() => setDetailRoom(null)}
        room={detailRoom}
      />
    </div>
  );
}
