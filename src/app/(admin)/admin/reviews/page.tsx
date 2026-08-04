// "use client";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Star, CheckCircle2, XCircle, Trash2, Loader2 } from "lucide-react";
// import { RootState, AppDispatch } from "@/store/store";
// import { useAdminToast } from "../../context/ToastContext";
// import { adminAxios } from "../../lib/axiosInstance";

// interface AdminReview {
//   id: string;
//   guestName: string;
//   rating: number;
//   comment?: string | null;
//   isPublic: boolean;
//   createdAt: string;
//   booking: { bookingRef: string; room: { roomNumber: string } };
// }

// function StarRating({ rating }: { rating: number }) {
//   return (
//     <div className="flex gap-0.5">
//       {[1, 2, 3, 4, 5].map((i) => (
//         <Star
//           key={i}
//           className={`w-3.5 h-3.5 ${i <= rating ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-700"}`}
//         />
//       ))}
//     </div>
//   );
// }

// export default function ReviewsPage() {
//   const { showToast } = useAdminToast();
//   const [reviews, setReviews] = useState<AdminReview[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
//   const [filter, setFilter] = useState<"all" | "pending" | "public">("all");

//   const loadReviews = async () => {
//     setLoading(true);
//     try {
//       const params =
//         filter === "all" ? undefined : { isPublic: filter === "public" };
//       const { data } = await adminAxios.get("/reviews", { params });
//       setReviews(data.data.reviews);
//     } catch (error: any) {
//       showToast(
//         "error",
//         "Failed to load reviews",
//         error?.response?.data?.message,
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadReviews();
//   }, [filter]);

//   const handleApprove = async (id: string) => {
//     setActionLoadingId(id);
//     try {
//       await adminAxios.patch(`/reviews/${id}`, { isPublic: true });
//       showToast("success", "Review Approved", "Now visible on the public site");
//       loadReviews();
//     } catch (error: any) {
//       showToast("error", "Failed", error?.response?.data?.message);
//     } finally {
//       setActionLoadingId(null);
//     }
//   };

//   const handleReject = async (id: string) => {
//     setActionLoadingId(id);
//     try {
//       await adminAxios.patch(`/reviews/${id}`, { isPublic: false });
//       showToast("info", "Review Hidden");
//       loadReviews();
//     } catch (error: any) {
//       showToast("error", "Failed", error?.response?.data?.message);
//     } finally {
//       setActionLoadingId(null);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     setActionLoadingId(id);
//     try {
//       await adminAxios.delete(`/reviews/${id}`);
//       showToast("success", "Review Deleted");
//       setReviews((prev) => prev.filter((r) => r.id !== id));
//     } catch (error: any) {
//       showToast("error", "Failed", error?.response?.data?.message);
//     } finally {
//       setActionLoadingId(null);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
//         <p className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold">
//           Home / Admin / Reviews
//         </p>
//         <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
//           Guest Reviews
//         </h1>
//       </div>

//       <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-xl w-fit">
//         {(["all", "pending", "public"] as const).map((f) => (
//           <button
//             key={f}
//             onClick={() => setFilter(f)}
//             className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
//               filter === f
//                 ? "bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm"
//                 : "text-slate-500 dark:text-slate-400"
//             }`}
//           >
//             {f === "all" ? "All" : f === "pending" ? "Pending" : "Public"}
//           </button>
//         ))}
//       </div>

//       {loading ? (
//         <div className="flex justify-center py-16">
//           <Loader2 className="w-7 h-7 animate-spin text-amber-500" />
//         </div>
//       ) : reviews.length === 0 ? (
//         <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-10 text-center text-sm text-slate-400 dark:text-slate-500">
//           No reviews found.
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {reviews.map((r) => (
//             <div
//               key={r.id}
//               className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3"
//             >
//               <div className="flex items-start justify-between">
//                 <div>
//                   <p className="font-semibold text-slate-900 dark:text-white">
//                     {r.guestName}
//                   </p>
//                   <p className="text-[11px] text-slate-400 dark:text-slate-500">
//                     {r.booking.bookingRef} • Room {r.booking.room.roomNumber}
//                   </p>
//                 </div>
//                 <StarRating rating={r.rating} />
//               </div>
//               {r.comment && (
//                 <p className="text-sm text-slate-600 dark:text-slate-400">
//                   {r.comment}
//                 </p>
//               )}
//               <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
//                 <span
//                   className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
//                     r.isPublic
//                       ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
//                       : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
//                   }`}
//                 >
//                   {r.isPublic ? "Public" : "Pending"}
//                 </span>
//                 <div className="flex items-center gap-2">
//                   {!r.isPublic ? (
//                     <button
//                       onClick={() => handleApprove(r.id)}
//                       disabled={actionLoadingId === r.id}
//                       className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-500/10 transition disabled:opacity-50"
//                     >
//                       <CheckCircle2 className="w-4 h-4" />
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => handleReject(r.id)}
//                       disabled={actionLoadingId === r.id}
//                       className="p-1.5 rounded-lg text-amber-500 hover:bg-amber-500/10 transition disabled:opacity-50"
//                     >
//                       <XCircle className="w-4 h-4" />
//                     </button>
//                   )}
//                   <button
//                     onClick={() => handleDelete(r.id)}
//                     disabled={actionLoadingId === r.id}
//                     className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition disabled:opacity-50"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import {
  Star,
  Search,
  Filter,
  MessageSquare,
  CheckCircle,
  EyeOff,
  Trash2,
  ThumbsUp,
  CornerUpLeft,
  Sparkles,
  TrendingUp,
  UserCheck,
  Loader2,
  X,
} from "lucide-react";
import { useAdminToast } from "../../context/ToastContext";
import { adminAxios } from "../../lib/axiosInstance";

interface AdminReview {
  id: string;
  guestName: string;
  rating: number;
  comment?: string | null;
  isPublic: boolean;
  createdAt: string;
  booking: {
    bookingRef: string;
    room: {
      roomNumber: string;
      title?: string;
    };
  };
  adminResponse?: string | null;
}

export default function ReviewsPage() {
  const { showToast } = useAdminToast();
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState<number | "ALL">("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  // Admin Response Modal State
  const [replyingReviewId, setReplyingReviewId] = useState<string | null>(null);
  const [responseText, setResponseText] = useState("");

  // Load reviews from backend API
  const loadReviews = async () => {
    setLoading(true);
    try {
      const { data } = await adminAxios.get("/reviews");
      setReviews(data?.data?.reviews || []);
    } catch (error: any) {
      showToast(
        "error",
        "Failed to load reviews",
        error?.response?.data?.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  // Backend Status Update Actions
  const handleApprove = async (id: string) => {
    setActionLoadingId(id);
    try {
      await adminAxios.patch(`/reviews/${id}`, { isPublic: true });
      showToast("success", "Review Approved", "Now visible on the public site");
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, isPublic: true } : r)),
      );
    } catch (error: any) {
      showToast("error", "Failed", error?.response?.data?.message);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleHide = async (id: string) => {
    setActionLoadingId(id);
    try {
      await adminAxios.patch(`/reviews/${id}`, { isPublic: false });
      showToast("info", "Review Hidden");
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, isPublic: false } : r)),
      );
    } catch (error: any) {
      showToast("error", "Failed", error?.response?.data?.message);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setActionLoadingId(id);
    try {
      await adminAxios.delete(`/reviews/${id}`);
      showToast("success", "Review Deleted");
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (error: any) {
      showToast("error", "Failed", error?.response?.data?.message);
    } finally {
      setActionLoadingId(null);
    }
  };

  // Reply Handlers
  const handleOpenReply = (review: AdminReview) => {
    setReplyingReviewId(review.id);
    setResponseText(review.adminResponse || "");
  };

  // Find current review state to retain isPublic flag
  const currentReview = reviews.find((r) => r.id === replyingReviewId);

  const handleSaveReply = async () => {
    if (!replyingReviewId) return;
    setActionLoadingId(replyingReviewId);
    try {
      await adminAxios.patch(`/reviews/${replyingReviewId}`, {
        adminResponse: responseText.trim() || null,
        isPublic: currentReview?.isPublic ?? false, // Guarantees boolean payload
      });
      showToast("success", "Response Saved", "Management reply updated");
      setReviews((prev) =>
        prev.map((r) =>
          r.id === replyingReviewId
            ? { ...r, adminResponse: responseText.trim() || null }
            : r,
        ),
      );
      setReplyingReviewId(null);
      setResponseText("");
    } catch (error: any) {
      showToast(
        "error",
        "Failed to save response",
        error?.response?.data?.message,
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  // KPI Calculations based on real backend reviews data
  const totalReviews = reviews.length;
  const avgRating = totalReviews
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : "0.0";
  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;
  const pendingResponses = reviews.filter((r) => !r.adminResponse).length;

  // Filter Logic
  const filteredReviews = reviews.filter((r) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      r.guestName.toLowerCase().includes(searchLower) ||
      (r.comment && r.comment.toLowerCase().includes(searchLower)) ||
      r.booking.room.roomNumber.includes(searchLower) ||
      r.booking.bookingRef.toLowerCase().includes(searchLower);

    const matchesRating =
      filterRating === "ALL" ? true : r.rating === filterRating;

    const matchesStatus =
      filterStatus === "ALL"
        ? true
        : filterStatus === "PUBLISHED"
          ? r.isPublic
          : !r.isPublic;

    return matchesSearch && matchesRating && matchesStatus;
  });

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Guest Reviews & Feedback
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Monitor stay ratings, respond to guest comments, and manage public
            testimonials.
          </p>
        </div>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
            <Star className="w-6 h-6 fill-amber-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {avgRating}{" "}
              <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Average Guest Rating
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
            <ThumbsUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {fiveStarCount}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              5-Star Testimonials
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {pendingResponses}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pending Admin Replies
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {totalReviews}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Total Recorded Reviews
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by guest, room, or booking ref..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Rating Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterRating}
              onChange={(e) =>
                setFilterRating(
                  e.target.value === "ALL" ? "ALL" : Number(e.target.value),
                )
              }
              className="py-2 px-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              <option value="ALL">All Ratings</option>
              <option value="5">5 Stars ★</option>
              <option value="4">4 Stars ★</option>
              <option value="3">3 Stars ★</option>
              <option value="2">2 Stars ★</option>
              <option value="1">1 Star ★</option>
            </select>
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="py-2 px-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            <option value="ALL">All Statuses</option>
            <option value="PUBLISHED">Public / Published</option>
            <option value="HIDDEN">Pending / Hidden</option>
          </select>
        </div>
      </div>

      {/* Reviews List / Loading State */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-400">
          No guest reviews found matching your selected filters.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-500 font-bold flex items-center justify-center text-sm">
                    {review.guestName
                      ? review.guestName.charAt(0).toUpperCase()
                      : "G"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                        {review.guestName}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-medium">
                        <UserCheck className="w-3 h-3" /> Verified Stay
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {review.booking?.room?.title ||
                        `Room ${review.booking?.room?.roomNumber}`}{" "}
                      • {review.booking?.bookingRef} •{" "}
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Stars & Status Badge */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? "fill-amber-500 text-amber-500"
                            : "text-slate-300 dark:text-slate-700"
                        }`}
                      />
                    ))}
                  </div>

                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-lg ${
                      review.isPublic
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {review.isPublic ? "PUBLIC" : "PENDING"}
                  </span>
                </div>
              </div>

              {/* Review Comment */}
              {review.comment && (
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  "{review.comment}"
                </p>
              )}

              {/* Admin Management Response Display */}
              {review.adminResponse && (
                <div className="bg-slate-50 dark:bg-slate-800/40 border-l-2 border-amber-500 rounded-r-xl p-3.5 space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-amber-500">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Management Response</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {review.adminResponse}
                  </p>
                </div>
              )}

              {/* Card Footer Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                <button
                  type="button"
                  onClick={() => handleOpenReply(review)}
                  disabled={actionLoadingId === review.id}
                  className="inline-flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-400 font-medium transition-colors disabled:opacity-50"
                >
                  <CornerUpLeft className="w-3.5 h-3.5" />
                  {review.adminResponse ? "Edit Response" : "Reply to Guest"}
                </button>

                <div className="flex items-center gap-2">
                  {!review.isPublic ? (
                    <button
                      type="button"
                      onClick={() => handleApprove(review.id)}
                      disabled={actionLoadingId === review.id}
                      className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 text-xs transition disabled:opacity-50"
                      title="Approve & Publish Review"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleHide(review.id)}
                      disabled={actionLoadingId === review.id}
                      className="p-2 rounded-lg bg-slate-500/10 text-slate-400 hover:bg-slate-500/20 text-xs transition disabled:opacity-50"
                      title="Hide Review"
                    >
                      <EyeOff className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDelete(review.id)}
                    disabled={actionLoadingId === review.id}
                    className="p-2 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 text-xs transition disabled:opacity-50"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Admin Reply Modal */}
      {replyingReviewId && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div
            className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CornerUpLeft className="w-4 h-4 text-amber-500" />
                Reply to Guest Review
              </h3>
              <button
                onClick={() => setReplyingReviewId(null)}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <textarea
              rows={4}
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              placeholder="Write a professional response to this guest..."
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setReplyingReviewId(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveReply}
                disabled={actionLoadingId === replyingReviewId}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/10 transition disabled:opacity-50 flex items-center gap-1.5"
              >
                {actionLoadingId === replyingReviewId && (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                )}
                Save Response
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
