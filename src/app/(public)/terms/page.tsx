import Link from "next/link";
import { ArrowLeft, ShieldCheck, FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Magville Hotel",
  description:
    "Terms and conditions governing stay and services at Magville Hotel.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Navigation */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 hover:text-amber-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2 text-amber-500 text-xs uppercase tracking-widest font-semibold">
            <FileText className="w-4 h-4" />
            Legal Agreement
          </div>
        </div>

        {/* Title Block */}
        <div className="space-y-3 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-400 uppercase tracking-widest">
            Last Updated: August 2026
          </p>
        </div>

        {/* Policy Content */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-10 space-y-8 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-wide border-l-2 border-amber-500 pl-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or placing reservations through the
              Magville Hotel platform, you agree to be bound by these Terms of
              Service and all applicable laws and regulations governing
              hospitality services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-wide border-l-2 border-amber-500 pl-3">
              2. Reservations & Payments
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li>
                All bookings require valid guest information and full or partial
                prepayment via secure channels.
              </li>
              <li>
                Room rates are subject to applicable local taxes and service
                charges unless specified otherwise.
              </li>
              <li>
                Special requests (e.g., late check-out, room preferences) are
                subject to availability upon check-in.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-wide border-l-2 border-amber-500 pl-3">
              3. Check-In & Guest Rules
            </h2>
            <p>
              Standard check-in time starts at 2:00 PM and check-out is required
              by 12:00 PM. Primary guests must present a valid government-issued
              photo ID upon arrival. Magville Hotel enforces a strict
              zero-tolerance policy against illegal activities, property damage,
              and unapproved commercial photography on hotel premises.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-wide border-l-2 border-amber-500 pl-3">
              4. Cancellations & Refunds
            </h2>
            <p>
              Cancellation policies vary based on the rate type chosen during
              reservation. Standard bookings canceled 48 hours prior to check-in
              are eligible for full refund or rescheduling. Non-refundable
              promotional rates cannot be canceled once confirmed.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-800 pt-6">
            <h2 className="text-lg font-bold text-white tracking-wide border-l-2 border-amber-500 pl-3">
              5. Contact Information
            </h2>
            <p>
              For any legal inquiries regarding these terms, please contact our
              administrative desk at{" "}
              <a
                href="mailto:legal@magvillehotel.com"
                className="text-amber-500 underline hover:text-amber-400"
              >
                legal@magvillehotel.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
