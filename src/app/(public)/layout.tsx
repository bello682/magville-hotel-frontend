"use client";

import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReservationModal from "@/components/ReservationModal";
import { ModalProvider, useModal } from "@/context/ModalContext";
import AnnouncementController from "../../components/Announcement/AnnouncementController";

// 1. Import BOTH the Provider and the Container from the admin folder
import { AdminToastProvider } from "../(admin)/context/ToastContext";
import ToastContainer from "../(admin)/context/ToastContainer";

function PublicLayoutInner({ children }: { children: React.ReactNode }) {
  const { isModalOpen, closeModal, selectedRoom, openModal } = useModal();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-dark">
      {/* 2. Place ToastContainer here */}
      <ToastContainer />

      {/* Announcement Controller */}
      <AnnouncementController />

      {/* Navbar receives trigger from Context */}
      <Navbar />

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <Footer />

      {/* Global Booking Modal */}
      <Suspense fallback={null}>
        <ReservationModal
          isOpen={isModalOpen}
          onClose={closeModal}
          room={selectedRoom}
        />
      </Suspense>
    </div>
  );
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* 3. Wrap everything inside AdminToastProvider */
    <AdminToastProvider>
      <ModalProvider>
        <PublicLayoutInner>{children}</PublicLayoutInner>
      </ModalProvider>
    </AdminToastProvider>
  );
}
