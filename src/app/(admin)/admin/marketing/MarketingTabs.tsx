// src/app/(admin)/components/admin/marketing/MarketingTabs.tsx
"use client";

export type MarketingTab = "bulkEmail" | "announcements";

interface MarketingTabsProps {
  activeTab: MarketingTab;
  onChange: (tab: MarketingTab) => void;
}

export default function MarketingTabs({
  activeTab,
  onChange,
}: MarketingTabsProps) {
  const tabs: { key: MarketingTab; label: string }[] = [
    { key: "bulkEmail", label: "Bulk Email" },
    { key: "announcements", label: "Public Alerts" },
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
