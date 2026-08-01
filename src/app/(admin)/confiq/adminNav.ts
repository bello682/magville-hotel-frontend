// src/app/(admin)/confiq/adminNav.ts
import {
  LayoutDashboard,
  CalendarCheck,
  BedDouble,
  Wallet,
  Megaphone,
  Users,
  LucideIcon,
} from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  roles: ("GENERAL_MANAGER" | "MANAGER" | "RECEPTIONIST")[];
}

export const ADMIN_NAV_ITEMS: NavItem[] = [
  {
    name: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
    roles: ["GENERAL_MANAGER", "MANAGER", "RECEPTIONIST"],
  },
  {
    name: "Bookings",
    href: "/admin/bookings",
    icon: CalendarCheck,
    roles: ["GENERAL_MANAGER", "MANAGER", "RECEPTIONIST"],
  },
  {
    name: "Rooms",
    href: "/admin/rooms",
    icon: BedDouble,
    roles: ["GENERAL_MANAGER", "MANAGER"],
  },
  {
    name: "Payments",
    href: "/admin/payments",
    icon: Wallet,
    roles: ["GENERAL_MANAGER", "MANAGER", "RECEPTIONIST"],
  },
  {
    name: "Marketing",
    href: "/admin/marketing",
    icon: Megaphone,
    roles: ["GENERAL_MANAGER", "MANAGER"],
  },
  {
    name: "Staff Management",
    href: "/admin/staff",
    icon: Users,
    roles: ["GENERAL_MANAGER"],
  },
];
