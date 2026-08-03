// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { Loader2 } from "lucide-react";

// export default function AdminAuthGuard({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

//   useEffect(() => {
//     // Skip guard check on login route
//     if (pathname === "/auth/login") {
//       setIsAuthenticated(true);
//       return;
//     }

//     const token =
//       typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

//     if (!token) {
//       setIsAuthenticated(false);
//       router.replace("/auth/login");
//     } else {
//       setIsAuthenticated(true);
//     }
//   }, [pathname, router]);

//   // Loading spinner while verifying credentials
//   if (isAuthenticated === null && pathname !== "/auth/login") {
//     return (
//       <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950 text-white gap-3">
//         <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
//         <p className="text-xs uppercase tracking-widest text-slate-400">
//           Verifying Admin Session...
//         </p>
//       </div>
//     );
//   }

//   return <>{children}</>;
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2, LogOut, ShieldAlert } from "lucide-react";
import { decodeAdminToken } from "../../(admin)/utils/decodeToken";

export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [showExpiredModal, setShowExpiredModal] = useState(false);

  useEffect(() => {
    // 1. Skip checks on login route
    if (pathname === "/auth/login") {
      setIsAuthenticated(true);
      setShowExpiredModal(false);
      return;
    }

    const token =
      typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

    // 2. If no token at all, send directly to login
    if (!token) {
      setIsAuthenticated(false);
      router.replace("/auth/login");
      return;
    }

    const decoded = decodeAdminToken(token);

    if (!decoded || !decoded.exp) {
      localStorage.removeItem("adminToken");
      setIsAuthenticated(false);
      router.replace("/auth/login");
      return;
    }

    // 3. Check expiration
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem("adminToken");
      setIsAuthenticated(false);
      setShowExpiredModal(true);
      return;
    }

    setIsAuthenticated(true);
  }, [pathname, router]);

  // 4. Listen for API 401 interceptor events
  useEffect(() => {
    const handleSessionExpiredEvent = () => {
      localStorage.removeItem("adminToken");
      setIsAuthenticated(false);
      setShowExpiredModal(true);
    };

    window.addEventListener("admin-session-expired", handleSessionExpiredEvent);
    return () => {
      window.removeEventListener(
        "admin-session-expired",
        handleSessionExpiredEvent,
      );
    };
  }, []);

  // 5. User explicitly clicks "Log In Now" -> Hard Redirect
  const handleRedirectToLogin = () => {
    setShowExpiredModal(false);
    window.location.href = "/auth/login";
  };

  // 6. Render Modal overlay IF expired
  if (showExpiredModal) {
    return (
      <>
        {/* Backdrop with semi-transparent blur */}
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm pointer-events-auto">
          {/* Modal Card with dark: theme support */}
          <div
            className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto inline-flex p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Session Expired
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                Your security session has timed out due to inactivity. Please
                log back in to continue managing hotel operations safely.
              </p>
            </div>

            <button
              type="button"
              onClick={handleRedirectToLogin}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold py-3.5 rounded-xl text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Log In Now
            </button>
          </div>
        </div>

        {/* Render children so dashboard stays visible underneath */}
        <div className="pointer-events-none opacity-80">{children}</div>
      </>
    );
  }

  // 7. Loading state while checking token
  if (isAuthenticated === null && pathname !== "/auth/login") {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-slate-950 text-slate-900 dark:text-white gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Verifying Admin Session...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
