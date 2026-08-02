"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { RootState, AppDispatch } from "@/store/store";
import { useAdminToast } from "../../context/ToastContext";
import {
  previewRecipientsAdmin,
  sendBulkCampaign,
  resetBulkEmailSend,
  fetchAnnouncements,
  saveAnnouncement,
  resetAnnouncementSave,
  deleteAnnouncementAdmin,
} from "@/store/redux/actions/adminAction/marketingActions";

export default function MarketingPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { showToast } = useAdminToast();

  const {
    previewCount,
    previewLoading,
    sendLoading,
    sendSuccess,
    sendError,
    lastSentCount,
    announcements,
    announcementsLoading,
    saveLoading,
    saveSuccess,
    saveError,
    deleteLoading,
  } = useSelector((state: RootState) => state.marketing);

  const [activeTab, setActiveTab] = useState<MarketingTab>("bulkEmail");
  const [editingAnnouncement, setEditingAnnouncement] =
    useState<Announcement | null>(null);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [deletingAnnouncement, setDeletingAnnouncement] =
    useState<Announcement | null>(null);

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  useEffect(() => {
    if (sendSuccess) {
      showToast(
        "success",
        "Campaign Sent",
        `Delivered to ${lastSentCount ?? 0} recipient${lastSentCount === 1 ? "" : "s"}`,
      );
      dispatch(resetBulkEmailSend());
    }
  }, [sendSuccess, lastSentCount, dispatch]);

  useEffect(() => {
    if (sendError) showToast("error", "Campaign Failed", sendError);
  }, [sendError]);

  useEffect(() => {
    if (saveSuccess) {
      showToast(
        "success",
        editingAnnouncement ? "Alert Updated" : "Alert Created",
        editingAnnouncement?.title,
      );
      setIsAnnouncementModalOpen(false);
      setEditingAnnouncement(null);
      dispatch(resetAnnouncementSave());
    }
  }, [saveSuccess, dispatch]);

  useEffect(() => {
    if (saveError) showToast("error", "Save Failed", saveError);
  }, [saveError]);

  const handlePreviewRecipients = (
    targetGroup: TargetGroup,
    customRecipients: string,
  ) => {
    dispatch(previewRecipientsAdmin(targetGroup, customRecipients));
  };

  const handleSendCampaign = (values: BulkEmailFormValues) => {
    dispatch(sendBulkCampaign(values));
  };

  const handleSubmitAnnouncement = (values: AnnouncementFormValues) => {
    dispatch(saveAnnouncement(values, editingAnnouncement?.id || null));
  };

  const handleConfirmDelete = () => {
    if (!deletingAnnouncement) return;
    dispatch(deleteAnnouncementAdmin(deletingAnnouncement.id));
    showToast("success", "Alert Deleted", deletingAnnouncement.title);
    setDeletingAnnouncement(null);
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
      ) : announcementsLoading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-7 h-7 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
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
        loading={saveLoading}
      />

      <ConfirmActionModal
        isOpen={!!deletingAnnouncement}
        onClose={() => setDeletingAnnouncement(null)}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
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
