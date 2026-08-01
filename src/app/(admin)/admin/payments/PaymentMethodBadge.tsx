// src/app/(admin)/components/admin/payments/PaymentMethodBadge.tsx
import { Banknote, CreditCard, Landmark } from "lucide-react";
import { PaymentMethod } from "@/app/(admin)/types/payment";

const METHOD_CONFIG: Record<
  PaymentMethod,
  { label: string; icon: typeof Banknote; className: string }
> = {
  CASH: {
    label: "Cash",
    icon: Banknote,
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  CARD: {
    label: "Card",
    icon: CreditCard,
    className: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  BANK_TRANSFER: {
    label: "Bank Transfer",
    icon: Landmark,
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
};

export default function PaymentMethodBadge({
  method,
}: {
  method: PaymentMethod;
}) {
  const config = METHOD_CONFIG[method];
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${config.className}`}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}
