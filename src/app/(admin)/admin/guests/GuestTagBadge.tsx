// src/app/(admin)/components/admin/guests/GuestTagBadge.tsx
import { GuestTag } from "@/app/(admin)/types/guest";
import { Crown, Ban, User } from "lucide-react";

export default function GuestTagBadge({ tag }: { tag: GuestTag }) {
  if (tag === "NONE") return null;

  if (tag === "VIP") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full text-[10px] font-bold uppercase">
        <Crown className="w-3 h-3" /> VIP
      </span>
    );
  }

  if (tag === "REGULAR") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-full text-[10px] font-bold uppercase">
        <User className="w-3 h-3" /> Regular
      </span>
    );
  }

  // tag === "BLACKLISTED"
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-500/10 text-red-600 dark:text-red-400 rounded-full text-[10px] font-bold uppercase">
      <Ban className="w-3 h-3" /> Blacklisted
    </span>
  );
}
