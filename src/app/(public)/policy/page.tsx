import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Magville Hotel",
  description:
    "Learn how Magville Hotel collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
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
            <Lock className="w-4 h-4" />
            Data Protection
          </div>
        </div>

        {/* Title Block */}
        <div className="space-y-3 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400 uppercase tracking-widest">
            Last Updated: August 2026
          </p>
        </div>

        {/* Policy Content */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-10 space-y-8 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-wide border-l-2 border-amber-500 pl-3">
              1. Information We Collect
            </h2>
            <p>
              We collect personal details necessary to provide luxury lodging
              and reservation services, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
              <li>
                Full name, email address, phone number, and residential address.
              </li>
              <li>
                Payment details processed securely via encrypted third-party
                payment gateways.
              </li>
              <li>
                Stay preferences, dietary requirements, and special service
                requests.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-wide border-l-2 border-amber-500 pl-3">
              2. How We Use Your Data
            </h2>
            <p>
              Your information is used exclusively to process room reservations,
              verify guest identity, issue booking confirmations, optimize
              operational efficiency, and send important service alerts
              regarding your stay.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-wide border-l-2 border-amber-500 pl-3">
              3. Data Security & Storage
            </h2>
            <p>
              Magville Hotel implements industry-standard technical
              measures—including TLS encryption and strict internal access
              controls—to safeguard guest records against unauthorized access,
              loss, or disclosure. Personal billing tokens are processed
              securely and are never stored directly in raw format on our
              primary application databases.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-wide border-l-2 border-amber-500 pl-3">
              4. Third-Party Sharing
            </h2>
            <p>
              We do not sell, rent, or trade your personal data to external
              marketing companies. Data is shared only with trusted
              infrastructure providers (e.g., payment providers, email service
              dispatchers) strictly required to deliver our operational
              services.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-800 pt-6">
            <h2 className="text-lg font-bold text-white tracking-wide border-l-2 border-amber-500 pl-3">
              5. Your Rights & Privacy Inquiries
            </h2>
            <p>
              You have the right to request access to your personal data,
              request correction of inaccuracies, or request complete deletion
              of guest records after check-out settlement. Please contact our
              data compliance office at{" "}
              <a
                href="mailto:privacy@magvillehotel.com"
                className="text-amber-500 underline hover:text-amber-400"
              >
                privacy@magvillehotel.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
