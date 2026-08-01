// src/app/(admin)/components/admin/rooms/RoomsTabs.tsx
"use client";

export type RoomsTab = "rooms" | "categories";

interface RoomsTabsProps {
  activeTab: RoomsTab;
  onChange: (tab: RoomsTab) => void;
}

export default function RoomsTabs({ activeTab, onChange }: RoomsTabsProps) {
  const tabs: { key: RoomsTab; label: string }[] = [
    { key: "rooms", label: "Rooms" },
    { key: "categories", label: "Categories" },
  ];

  return (
    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-xl w-fit transition-colors">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
            activeTab === tab.key
              ? "bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
