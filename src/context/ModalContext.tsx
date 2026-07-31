// "use client";

// import React, { createContext, useContext, useState } from "react";

// interface RoomData {
//   name: string;
//   category: string;
//   price: number;
//   image: string;
// }

// interface ModalContextType {
//   isModalOpen: boolean;
//   selectedRoom: RoomData | null;
//   openModal: (room?: RoomData) => void;
//   closeModal: () => void;
// }

// const ModalContext = createContext<ModalContextType | undefined>(undefined);

// export function ModalProvider({ children }: { children: React.ReactNode }) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);

//   const openModal = (roomData?: RoomData) => {
//     setSelectedRoom(
//       roomData || {
//         name: "Executive Ocean Suite",
//         category: "Luxury Room",
//         price: 75000,
//         image:
//           "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
//       },
//     );
//     setIsModalOpen(true);
//   };

//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <ModalContext.Provider
//       value={{ isModalOpen, selectedRoom, openModal, closeModal }}
//     >
//       {children}
//     </ModalContext.Provider>
//   );
// }

// export function useModal() {
//   const context = useContext(ModalContext);
//   if (!context) throw new Error("useModal must be used within a ModalProvider");
//   return context;
// }

"use client";

import React, { createContext, useContext, useState } from "react";

// 1. Extend RoomData to support dates and standard room identifiers
export interface RoomData {
  id?: string;
  name: string;
  category: string;
  price: number;
  image: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  [key: string]: any; // Flexibly accept additional fields if needed
}

interface ModalContextType {
  isModalOpen: boolean;
  selectedRoom: RoomData | null;
  openModal: (room?: RoomData) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);

  const openModal = (roomData?: RoomData) => {
    if (roomData) {
      // Retain incoming room properties along with booking details
      setSelectedRoom({
        ...roomData,
        name: roomData.name || "Executive Ocean Suite",
        category: roomData.category || "Luxury Room",
        price: Number(roomData.price) || 75000,
        image:
          roomData.image ||
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
      });
    } else {
      // Fallback default if called without arguments
      setSelectedRoom({
        name: "Executive Ocean Suite",
        category: "Luxury Room",
        price: 75000,
        image:
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, selectedRoom, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
}
