"use client";

import React, { useState } from "react";
import {
  Star,
  Search,
  Filter,
  MessageSquare,
  CheckCircle,
  EyeOff,
  Flag,
  ThumbsUp,
  CornerUpLeft,
  Sparkles,
  TrendingUp,
  UserCheck,
} from "lucide-react";

interface Review {
  id: string;
  guestName: string;
  roomType: string;
  roomNumber: string;
  rating: number;
  comment: string;
  date: string;
  status: "PUBLISHED" | "HIDDEN" | "FLAGGED";
  adminResponse?: string;
  verifiedStay: boolean;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: "REV-101",
    guestName: "Oluwaseun Adebayo",
    roomType: "Executive Suite",
    roomNumber: "304",
    rating: 5,
    comment:
      "Exceptional hospitality! The room service was prompt, and the ocean view from the terrace made our stay truly memorable. Will definitely recommend to colleagues.",
    date: "2026-08-01",
    status: "PUBLISHED",
    adminResponse:
      "Thank you for your warm words, Oluwaseun! We are delighted to know you enjoyed the terrace view and look forward to welcoming you back soon.",
    verifiedStay: true,
  },
  {
    id: "REV-102",
    guestName: "Chidinma Nwosu",
    roomType: "Deluxe King",
    roomNumber: "201",
    rating: 4,
    comment:
      "Very comfortable bed and excellent interior design. Air conditioning took a bit long to cool down the room initially, but the staff responded swiftly.",
    date: "2026-07-28",
    status: "PUBLISHED",
    verifiedStay: true,
  },
  {
    id: "REV-103",
    guestName: "Marcus Vance",
    roomType: "Presidential Villa",
    roomNumber: "501",
    rating: 2,
    comment:
      "Disappointed with the Wi-Fi speed during peak business hours. For a premium rate, internet connectivity should be seamless.",
    date: "2026-07-25",
    status: "FLAGGED",
    verifiedStay: true,
  },
  {
    id: "REV-104",
    guestName: "Aisha Ibrahim",
    roomType: "Standard Queen",
    roomNumber: "108",
    rating: 5,
    comment:
      "The breakfast buffet had a wonderful mix of local and continental options. Front desk staff made check-in effortless.",
    date: "2026-07-20",
    status: "PUBLISHED",
    verifiedStay: true,
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState<number | "ALL">("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  // Response Modal State
  const [replyingReviewId, setReplyingReviewId] = useState<string | null>(null);
  const [responseText, setResponseText] = useState("");

  // Stats Calculations
  const totalReviews = reviews.length;
  const avgRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (totalReviews || 1)
  ).toFixed(1);
  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;
  const pendingResponses = reviews.filter((r) => !r.adminResponse).length;

  // Status Handlers
  const toggleStatus = (
    id: string,
    newStatus: "PUBLISHED" | "HIDDEN" | "FLAGGED",
  ) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)),
    );
  };

  const handleOpenReply = (review: Review) => {
    setReplyingReviewId(review.id);
    setResponseText(review.adminResponse || "");
  };

  const handleSaveReply = () => {
    if (!replyingReviewId) return;
    setReviews((prev) =>
      prev.map((r) =>
        r.id === replyingReviewId
          ? { ...r, adminResponse: responseText.trim() || undefined }
          : r,
      ),
    );
    setReplyingReviewId(null);
    setResponseText("");
  };

  // Filter Logic
  const filteredReviews = reviews.filter((r) => {
    const matchesSearch =
      r.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.roomNumber.includes(searchTerm);

    const matchesRating =
      filterRating === "ALL" ? true : r.rating === filterRating;
    const matchesStatus =
      filterStatus === "ALL" ? true : r.status === filterStatus;

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
            placeholder="Search by guest, room, or keyword..."
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
            <option value="PUBLISHED">Published</option>
            <option value="HIDDEN">Hidden</option>
            <option value="FLAGGED">Flagged</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-400">
            No guest reviews found matching your selected filters.
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-500 font-bold flex items-center justify-center text-sm">
                    {review.guestName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                        {review.guestName}
                      </h3>
                      {review.verifiedStay && (
                        <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-medium">
                          <UserCheck className="w-3 h-3" /> Verified Guest
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {review.roomType} (Room {review.roomNumber}) •{" "}
                      {review.date}
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
                      review.status === "PUBLISHED"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : review.status === "HIDDEN"
                          ? "bg-slate-500/10 text-slate-400"
                          : "bg-rose-500/10 text-rose-500"
                    }`}
                  >
                    {review.status}
                  </span>
                </div>
              </div>

              {/* Review Comment */}
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                "{review.comment}"
              </p>

              {/* Existing Admin Response Box */}
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
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleOpenReply(review)}
                  className="inline-flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-400 font-medium transition-colors"
                >
                  <CornerUpLeft className="w-3.5 h-3.5" />
                  {review.adminResponse ? "Edit Response" : "Reply to Guest"}
                </button>

                <div className="flex items-center gap-2">
                  {review.status !== "PUBLISHED" && (
                    <button
                      type="button"
                      onClick={() => toggleStatus(review.id, "PUBLISHED")}
                      className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 text-xs transition"
                      title="Publish Review"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  )}

                  {review.status !== "HIDDEN" && (
                    <button
                      type="button"
                      onClick={() => toggleStatus(review.id, "HIDDEN")}
                      className="p-2 rounded-lg bg-slate-500/10 text-slate-400 hover:bg-slate-500/20 text-xs transition"
                      title="Hide Review"
                    >
                      <EyeOff className="w-4 h-4" />
                    </button>
                  )}

                  {review.status !== "FLAGGED" && (
                    <button
                      type="button"
                      onClick={() => toggleStatus(review.id, "FLAGGED")}
                      className="p-2 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 text-xs transition"
                      title="Flag Review"
                    >
                      <Flag className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

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
                ✕
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
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/10 transition"
              >
                Save Response
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
