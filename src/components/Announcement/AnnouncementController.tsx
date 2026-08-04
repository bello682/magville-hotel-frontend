// src/app/(public)/components/AnnouncementController.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AnnouncementModal from "./AnnouncementModal";
import AnnouncementBanner from "./AnnouncementBanner";
import { api } from "@/store/services/api";

interface Announcement {
  id: string;
  title: string;
  message: string;
  imageUrl?: string | null;
  ctaText?: string | null;
  ctaUrl?: string | null;
}

export default function AnnouncementController() {
  const pathname = usePathname();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  // Fetch the latest active announcement once
  useEffect(() => {
    api
      .get("/announcements/public")
      .then((res) => {
        const latest = res.data?.data?.announcements?.[0];
        if (latest) setAnnouncement(latest);
      })
      .catch(() => {
        // silent — announcement failure shouldn't break the site
      });
  }, []);

  // Reset to full modal whenever the homepage is (re)loaded
  useEffect(() => {
    if (pathname === "/" && announcement) {
      setIsModalOpen(true);
      setIsBannerVisible(false);
    }
  }, [pathname, announcement]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsBannerVisible(true); // collapses into the nav banner
  };

  const handleDismissBanner = () => {
    setIsBannerVisible(false); // fully gone until next homepage load
  };

  const handleReopenFromBanner = () => {
    setIsModalOpen(true);
    setIsBannerVisible(false);
  };

  if (!announcement) return null;

  return (
    <>
      <AnnouncementBanner
        title={announcement.title}
        isVisible={isBannerVisible}
        onDismiss={handleDismissBanner}
        onReopen={handleReopenFromBanner}
      />
      <AnnouncementModal
        announcement={announcement}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
