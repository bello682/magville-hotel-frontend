// src/app/(admin)/config/adminNav.ts
import {
  LayoutDashboard,
  CalendarCheck,
  BedDouble,
  Wallet,
  Megaphone,
  Users,
  UserCheck,
  Sparkles,
  Package,
  BarChart3,
  Star,
  Settings,
  LucideIcon,
} from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  roles: ("GENERAL_MANAGER" | "MANAGER" | "RECEPTIONIST")[];
  countKey?: "bookings" | "reviews" | "housekeeping" | "inventory";
}

export const ADMIN_NAV_ITEMS: NavItem[] = [
  // MAIN & OPERATIONS
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
    countKey: "bookings",
  },
  {
    name: "Guests",
    href: "/admin/guests",
    icon: UserCheck,
    roles: ["GENERAL_MANAGER", "MANAGER", "RECEPTIONIST"],
  },
  {
    name: "Rooms",
    href: "/admin/rooms",
    icon: BedDouble,
    roles: ["GENERAL_MANAGER", "MANAGER"],
  },
  {
    name: "Housekeeping",
    href: "/admin/housekeeping",
    icon: Sparkles,
    roles: ["GENERAL_MANAGER", "MANAGER", "RECEPTIONIST"],
    countKey: "housekeeping",
  },
  {
    name: "Inventory",
    href: "/admin/inventory",
    icon: Package,
    roles: ["GENERAL_MANAGER", "MANAGER"],
    countKey: "inventory",
  },

  // FINANCE & SALES
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
    name: "Reports & Analytics",
    href: "/admin/reports",
    icon: BarChart3,
    roles: ["GENERAL_MANAGER", "MANAGER"],
  },

  // MANAGEMENT & SYSTEM
  {
    name: "Staff Management",
    href: "/admin/staff",
    icon: Users,
    roles: ["GENERAL_MANAGER"],
  },
  {
    name: "Guest Reviews",
    href: "/admin/reviews",
    icon: Star,
    roles: ["GENERAL_MANAGER", "MANAGER"],
    countKey: "reviews",
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
    roles: ["GENERAL_MANAGER"],
  },
];

// import {
//   LayoutDashboard,
//   CalendarCheck,
//   BedDouble,
//   Wallet,
//   Megaphone,
//   Users,
//   UserCheck,
//   Sparkles,
//   Package,
//   BarChart3,
//   Star,
//   Settings,
//   UtensilsCrossed,
//   Wrench,
//   TrendingUp,
//   ShieldAlert,
//   Moon,
//   ConciergeBell,
//   Globe,
//   LucideIcon,
// } from "lucide-react";

// export interface NavItem {
//   name: string;
//   href: string;
//   icon: LucideIcon;
//   roles: ("GENERAL_MANAGER" | "MANAGER" | "RECEPTIONIST")[];
// }

// export const ADMIN_NAV_ITEMS: NavItem[] = [
//   // MAIN & OPERATIONS
//   {
//     name: "Overview",
//     href: "/admin",
//     icon: LayoutDashboard,
//     roles: ["GENERAL_MANAGER", "MANAGER", "RECEPTIONIST"],
//   },
//   {
//     name: "Bookings",
//     href: "/admin/bookings",
//     icon: CalendarCheck,
//     roles: ["GENERAL_MANAGER", "MANAGER", "RECEPTIONIST"],
//   },
//   {
//     name: "Guests",
//     href: "/admin/guests",
//     icon: UserCheck,
//     roles: ["GENERAL_MANAGER", "MANAGER", "RECEPTIONIST"],
//   },
//   {
//     name: "Rooms",
//     href: "/admin/rooms",
//     icon: BedDouble,
//     roles: ["GENERAL_MANAGER", "MANAGER"],
//   },
//   {
//     name: "Housekeeping",
//     href: "/admin/housekeeping",
//     icon: Sparkles,
//     roles: ["GENERAL_MANAGER", "MANAGER", "RECEPTIONIST"],
//   },
//   {
//     name: "Maintenance",
//     href: "/admin/maintenance",
//     icon: Wrench,
//     roles: ["GENERAL_MANAGER", "MANAGER", "RECEPTIONIST"],
//   },
//   {
//     name: "Room Service & POS",
//     href: "/admin/pos",
//     icon: UtensilsCrossed,
//     roles: ["GENERAL_MANAGER", "MANAGER", "RECEPTIONIST"],
//   },
//   {
//     name: "Guest Services",
//     href: "/admin/services",
//     icon: ConciergeBell,
//     roles: ["GENERAL_MANAGER", "MANAGER", "RECEPTIONIST"],
//   },
//   {
//     name: "Inventory",
//     href: "/admin/inventory",
//     icon: Package,
//     roles: ["GENERAL_MANAGER", "MANAGER"],
//   },

//   // REVENUE & FINANCE
//   {
//     name: "Payments",
//     href: "/admin/payments",
//     icon: Wallet,
//     roles: ["GENERAL_MANAGER", "MANAGER", "RECEPTIONIST"],
//   },
//   {
//     name: "Dynamic Pricing",
//     href: "/admin/pricing",
//     icon: TrendingUp,
//     roles: ["GENERAL_MANAGER", "MANAGER"],
//   },
//   {
//     name: "Marketing",
//     href: "/admin/marketing",
//     icon: Megaphone,
//     roles: ["GENERAL_MANAGER", "MANAGER"],
//   },
//   {
//     name: "Reports & Analytics",
//     href: "/admin/reports",
//     icon: BarChart3,
//     roles: ["GENERAL_MANAGER", "MANAGER"],
//   },

//   // MANAGEMENT & SECURITY
//   {
//     name: "Night Audit & Shifts",
//     href: "/admin/night-audit",
//     icon: Moon,
//     roles: ["GENERAL_MANAGER", "MANAGER", "RECEPTIONIST"],
//   },
//   {
//     name: "Channel Manager",
//     href: "/admin/channels",
//     icon: Globe,
//     roles: ["GENERAL_MANAGER", "MANAGER"],
//   },
//   {
//     name: "Staff Management",
//     href: "/admin/staff",
//     icon: Users,
//     roles: ["GENERAL_MANAGER"],
//   },
//   {
//     name: "Guest Reviews",
//     href: "/admin/reviews",
//     icon: Star,
//     roles: ["GENERAL_MANAGER", "MANAGER"],
//   },
//   {
//     name: "Audit Logs",
//     href: "/admin/audit-logs",
//     icon: ShieldAlert,
//     roles: ["GENERAL_MANAGER"],
//   },
//   {
//     name: "Settings",
//     href: "/admin/settings",
//     icon: Settings,
//     roles: ["GENERAL_MANAGER"],
//   },
// ];
