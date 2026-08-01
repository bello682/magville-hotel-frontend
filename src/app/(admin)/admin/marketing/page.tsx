"use client";

import { useState } from "react";
import MarketingTabs, { MarketingTab } from "../marketing/MarketingTabs";
import BulkEmailComposer from "../marketing/BulkEmailComposer";
import AnnouncementsGrid from "../marketing/AnnouncementsGrid";
import AnnouncementFormModal, {
  AnnouncementFormValues,
} from "../marketing/AnnouncementFormModal";
import ConfirmActionModal from "../bookings/ConfirmActionModal";
import {
  Announcement,
  BulkEmailFormValues,
  TargetGroup,
} from "../../types/marketing";

const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "a1",
    title: "Weekend Getaway Special",
    message: "20% off all suites booked for Friday–Sunday stays this month.",
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    ctaText: "Book Now",
    ctaUrl: "/rooms",
    status: "PUBLISHED",
    createdAt: new Date().toISOString(),
  },
];

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState<MarketingTab>("bulkEmail");
  const [announcements, setAnnouncements] =
    useState<Announcement[]>(MOCK_ANNOUNCEMENTS);

  const [previewCount, setPreviewCount] = useState<number | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);

  const [editingAnnouncement, setEditingAnnouncement] =
    useState<Announcement | null>(null);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [deletingAnnouncement, setDeletingAnnouncement] =
    useState<Announcement | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // 🔧 Replace with real POST /api/v1/marketing/preview-recipients call
  const handlePreviewRecipients = (
    targetGroup: TargetGroup,
    customRecipients: string,
  ) => {
    setPreviewLoading(true);
    setTimeout(() => {
      const mockCounts: Record<TargetGroup, number> = {
        ALL: 142,
        CHECKED_IN: 8,
        PAST_GUESTS: 96,
        CUSTOM: customRecipients.split(",").filter((e) => e.trim()).length,
      };
      setPreviewCount(mockCounts[targetGroup]);
      setPreviewLoading(false);
    }, 500);
  };

  // 🔧 Replace with real POST /api/v1/marketing/send-bulk call
  const handleSendCampaign = (values: BulkEmailFormValues) => {
    setSendLoading(true);
    setTimeout(() => {
      setSendLoading(false);
      alert(`Campaign "${values.subject}" queued for sending.`);
    }, 800);
  };

  const handleSubmitAnnouncement = (values: AnnouncementFormValues) => {
    setActionLoading(true);
    setTimeout(() => {
      if (editingAnnouncement) {
        setAnnouncements((prev) =>
          prev.map((a) =>
            a.id === editingAnnouncement.id
              ? {
                  ...a,
                  title: values.title,
                  message: values.message,
                  imageUrl: values.imageUrl || null,
                  ctaText: values.ctaText || null,
                  ctaUrl: values.ctaUrl || null,
                  status: values.status,
                }
              : a,
          ),
        );
      } else {
        const newAnnouncement: Announcement = {
          id: String(Date.now()),
          title: values.title,
          message: values.message,
          imageUrl: values.imageUrl || null,
          ctaText: values.ctaText || null,
          ctaUrl: values.ctaUrl || null,
          status: values.status,
          createdAt: new Date().toISOString(),
        };
        setAnnouncements((prev) => [newAnnouncement, ...prev]);
      }
      setActionLoading(false);
      setIsAnnouncementModalOpen(false);
      setEditingAnnouncement(null);
    }, 600);
  };

  const handleConfirmDelete = () => {
    if (!deletingAnnouncement) return;
    setActionLoading(true);
    setTimeout(() => {
      setAnnouncements((prev) =>
        prev.filter((a) => a.id !== deletingAnnouncement.id),
      );
      setActionLoading(false);
      setDeletingAnnouncement(null);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <p className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold">
          Home / Admin / Marketing
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
          Marketing & Communications
        </h1>
      </div>

      <MarketingTabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "bulkEmail" ? (
        <BulkEmailComposer
          onSend={handleSendCampaign}
          onPreviewRecipients={handlePreviewRecipients}
          previewCount={previewCount}
          previewLoading={previewLoading}
          sendLoading={sendLoading}
        />
      ) : (
        <AnnouncementsGrid
          announcements={announcements}
          onAdd={() => {
            setEditingAnnouncement(null);
            setIsAnnouncementModalOpen(true);
          }}
          onEdit={(a) => {
            setEditingAnnouncement(a);
            setIsAnnouncementModalOpen(true);
          }}
          onDelete={setDeletingAnnouncement}
        />
      )}

      <AnnouncementFormModal
        isOpen={isAnnouncementModalOpen}
        onClose={() => {
          setIsAnnouncementModalOpen(false);
          setEditingAnnouncement(null);
        }}
        onSubmit={handleSubmitAnnouncement}
        editingAnnouncement={editingAnnouncement}
        loading={actionLoading}
      />

      <ConfirmActionModal
        isOpen={!!deletingAnnouncement}
        onClose={() => setDeletingAnnouncement(null)}
        onConfirm={handleConfirmDelete}
        loading={actionLoading}
        tone="red"
        title="Delete This Alert?"
        description={
          deletingAnnouncement
            ? `"${deletingAnnouncement.title}" will be permanently removed and will stop showing on the public site if currently published.`
            : ""
        }
        confirmLabel="Delete"
      />
    </div>
  );
}
