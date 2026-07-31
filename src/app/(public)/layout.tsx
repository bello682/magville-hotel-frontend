"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReservationModal from "@/components/ReservationModal";
import { ModalProvider, useModal } from "@/context/ModalContext";

function PublicLayoutInner({ children }: { children: React.ReactNode }) {
  const { isModalOpen, closeModal, selectedRoom, openModal } = useModal();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-dark">
      {/* Navbar receives trigger from Context */}
      <Navbar />

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <Footer />

      {/* Global Booking Modal */}
      <ReservationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        room={selectedRoom}
      />
    </div>
  );
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModalProvider>
      <PublicLayoutInner>{children}</PublicLayoutInner>
    </ModalProvider>
  );
}
