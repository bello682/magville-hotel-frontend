import React from "react";

export default function LockScreenAccessRequest() {
  return (
    /* Locked / Access Notice Screen */

    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-[#0f1117] to-[#0a0b0e]">
      <div className="max-w-md w-full bg-[#161922]/90 backdrop-blur-md border border-amber-500/20 rounded-2xl p-6 sm:p-8 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
        {/* Lock Badge Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.75"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-amber-200">
            Access Restricted
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            This platform is currently private. Please choose your preferred
            mode of contact below to request access from the developer.
          </p>
        </div>

        {/* Contact Modes Grid */}
        <div className="space-y-3 pt-2">
          {/* 1. WhatsApp Button (Primary Call-To-Action) */}
          <a
            href="https://wa.me/2348139680568?text=Hello%20Adetayo,%20I%20am%20trying%20to%20access%20the%20Magville%20Hotel%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98]"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>Contact via WhatsApp</span>
          </a>

          {/* 2. Email Button */}
          <a
            href="mailto:belloadetayo14@gmail.com?subject=Magville%20Hotel%20Website%20Access%20Request"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl text-sm font-medium bg-[#0f1117] border border-amber-500/30 text-amber-200 hover:bg-amber-500/10 transition-all active:scale-[0.98]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-amber-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>Send Email</span>
          </a>

          <a
            href="tel:+2348139680568"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl text-xs font-mono text-slate-300 hover:text-white transition-all bg-[#0f1117] border border-amber-500/20 hover:border-amber-500/40 active:scale-[0.98]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-amber-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>Direct Phone Call</span>
          </a>
        </div>
      </div>
    </div>
  );
}
