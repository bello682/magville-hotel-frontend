import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  LucideIcon,
} from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
  { name: "Rooms", href: "/admin/rooms", icon: BedDouble },
  { name: "Payments", href: "/admin/payments", icon: LayoutDashboard },
];
