// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { LogOut } from "lucide-react";
// import { ADMIN_NAV_ITEMS } from "../../confiq/adminNav";
// import { useAdminUser } from "../../hooks/useAdminUser";

// interface AdminSidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
//   const pathname = usePathname();
//   const currentUser = useAdminUser();

//   const visibleNavItems = ADMIN_NAV_ITEMS.filter((item) =>
//     currentUser ? item.roles.includes(currentUser.role as any) : false,
//   );

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     window.location.href = "/auth/login";
//   };

//   return (
//     <>
//       {isOpen && (
//         <div
//           onClick={onClose}
//           className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
//         />
//       )}

//       <aside
//         className={`
//     fixed lg:static inset-y-0 left-0 z-30 w-64 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800
//     flex flex-col justify-between transition-colors duration-300 ease-in-out
//     ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
//   `}
//       >
//         <div className="p-4 space-y-6 pt-6">
//           <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 px-3">
//             Main Navigation
//           </p>

//           <nav className="space-y-1.5">
//             {visibleNavItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = pathname === item.href;

//               return (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   onClick={onClose}
//                   className={`
//                     flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-medium transition-all
//                     ${
//                       isActive
//                         ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold"
//                         : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
//                     }
//                   `}
//                 >
//                   <Icon
//                     className={`w-4 h-4 ${
//                       isActive
//                         ? "text-amber-500"
//                         : "text-slate-400 dark:text-slate-500"
//                     }`}
//                   />
//                   {item.name}
//                 </Link>
//               );
//             })}
//           </nav>
//         </div>

//         <div className="p-4 border-t border-slate-200 dark:border-slate-800">
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-medium text-red-500 dark:text-red-400 hover:bg-red-500/10 transition"
//           >
//             <LogOut className="w-4 h-4" />
//             Sign Out
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { ADMIN_NAV_ITEMS } from "../../confiq/adminNav";
import { useAdminUser } from "../../hooks/useAdminUser";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const currentUser = useAdminUser();

  const visibleNavItems = ADMIN_NAV_ITEMS.filter((item) =>
    currentUser ? item.roles.includes(currentUser.role as any) : false,
  );

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("lastAdminPath");
    window.location.href = "/auth/login";
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300"
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800
          flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header Header Label */}
        <div className="px-6 pt-6 pb-2 shrink-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Main Navigation
          </p>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <nav className="space-y-1.5">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    group flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-medium
                    transition-all duration-200 ease-out transform active:scale-[0.98]
                    ${
                      isActive
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold shadow-sm translate-x-1"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-200 hover:translate-x-1"
                    }
                  `}
                >
                  <Icon
                    className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                      isActive
                        ? "text-amber-500"
                        : "text-slate-400 dark:text-slate-500 group-hover:text-amber-500"
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Fixed Footer Sign Out Button */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900">
          <button
            onClick={handleLogout}
            className="group w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-medium text-red-500 dark:text-red-400 hover:bg-red-500/10 transition-all duration-200 active:scale-[0.98]"
          >
            <LogOut className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
