// src/app/(public)/components/GuestReviewForm.tsx
"use client";
import { useState } from "react";
import { Star, Loader2, CheckCircle2 } from "lucide-react";
import { api } from "@/store/services/api";

interface GuestReviewFormProps {
  bookingRef: string;
  onSubmitted: () => void;
}

export default function GuestReviewForm({
  bookingRef,
  onSubmitted,
}: GuestReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await api.post("/public/reviews", {
        bookingRef,
        rating,
        comment,
      });
      const data = res.data;
      setSubmitted(true);
      onSubmitted();
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-4 border-t border-white/10">
        <div className="flex items-center gap-2.5 p-4 rounded border bg-emerald-500/10 border-emerald-500/30 text-emerald-300">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="text-sm">Thank you! Your review has been submitted.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-4 border-t border-white/10 space-y-3">
      <span className="text-muted text-[10px] uppercase tracking-wider block">
        Rate Your Stay
      </span>

      <div className="bg-white/5 border border-white/10 rounded p-4 space-y-3">
        <div className="flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setHoverRating(i)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(i)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-7 h-7 ${
                  i <= (hoverRating || rating)
                    ? "fill-accent text-accent"
                    : "text-white/20"
                }`}
              />
            </button>
          ))}
        </div>

        <textarea
          rows={2}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us about your experience (optional)..."
          className="w-full bg-black/40 border border-white/10 rounded p-3 text-xs text-white placeholder-muted focus:outline-none focus:border-accent resize-none"
        />

        {error && <p className="text-red-400 text-xs text-center">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-accent text-dark py-2.5 text-xs font-semibold uppercase tracking-wider hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Submit Review"
          )}
        </button>
      </div>
    </div>
  );
}
