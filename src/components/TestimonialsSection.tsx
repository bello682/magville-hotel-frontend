// // src/app/(public)/components/TestimonialsSection.tsx
// "use client";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Star, Quote } from "lucide-react";
// import { api } from "../store/services/api";

// interface PublicReview {
//   id: string;
//   guestName: string;
//   rating: number;
//   comment?: string | null;
//   createdAt: string;
// }

// export default function TestimonialsSection() {
//   const [reviews, setReviews] = useState<PublicReview[]>([]);
//   const [averageRating, setAverageRating] = useState(0);
//   const [totalReviews, setTotalReviews] = useState(0);

//   useEffect(() => {
//     api
//       .get("/public/reviews")
//       .then((res) => {
//         setReviews(res.data?.data?.reviews || []);
//         setAverageRating(res.data?.data?.averageRating || 0);
//         setTotalReviews(res.data?.data?.totalReviews || 0);
//       })
//       .catch(() => {});
//   }, []);
//   // Don't render the section at all if there's nothing to show yet
//   if (reviews.length === 0) return null;

//   return (
//     <section className="py-24 px-4 md:px-12 bg-black/40 border-y border-white/10">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-14">
//           <span className="text-accent text-xs tracking-[0.3em] uppercase font-bold block mb-3">
//             Guest Experiences
//           </span>
//           <h2 className="text-3xl md:text-4xl font-serif uppercase text-white mb-4">
//             What Our Guests Say
//           </h2>
//           <div className="flex items-center justify-center gap-2">
//             <div className="flex gap-0.5">
//               {[1, 2, 3, 4, 5].map((i) => (
//                 <Star
//                   key={i}
//                   className={`w-4 h-4 ${i <= Math.round(averageRating) ? "fill-accent text-accent" : "text-white/20"}`}
//                 />
//               ))}
//             </div>
//             <span className="text-sm text-muted">
//               {averageRating.toFixed(1)} out of 5 ({totalReviews} review
//               {totalReviews !== 1 ? "s" : ""})
//             </span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {reviews.slice(0, 6).map((review, idx) => (
//             <motion.div
//               key={review.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: idx * 0.1 }}
//               className="bg-white/5 border border-white/10 p-6 space-y-4"
//             >
//               <Quote className="w-6 h-6 text-accent/40" />
//               <div className="flex gap-0.5">
//                 {[1, 2, 3, 4, 5].map((i) => (
//                   <Star
//                     key={i}
//                     className={`w-3.5 h-3.5 ${i <= review.rating ? "fill-accent text-accent" : "text-white/20"}`}
//                   />
//                 ))}
//               </div>
//               {review.comment && (
//                 <p className="text-sm text-white/80 leading-relaxed italic">
//                   "{review.comment}"
//                 </p>
//               )}
//               <div className="pt-3 border-t border-white/10">
//                 <p className="text-sm font-semibold text-white">
//                   {review.guestName}
//                 </p>
//                 <p className="text-[11px] text-muted">
//                   {new Date(review.createdAt).toLocaleDateString("en-US", {
//                     month: "long",
//                     year: "numeric",
//                   })}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// src/app/(public)/components/TestimonialsSection.tsx
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, CornerDownRight } from "lucide-react";
import { api } from "../store/services/api";

interface PublicReview {
  id: string;
  guestName: string;
  rating: number;
  comment?: string | null;
  adminResponse?: string | null; // <-- Added adminResponse field
  createdAt: string;
}

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    api
      .get("/public/reviews")
      .then((res) => {
        setReviews(res.data?.data?.reviews || []);
        setAverageRating(res.data?.data?.averageRating || 0);
        setTotalReviews(res.data?.data?.totalReviews || 0);
      })
      .catch(() => {});
  }, []);

  // Don't render the section at all if there's nothing to show yet
  if (reviews.length === 0) return null;

  return (
    <section className="py-24 px-4 md:px-12 bg-black/40 border-y border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-accent text-xs tracking-[0.3em] uppercase font-bold block mb-3">
            Guest Experiences
          </span>
          <h2 className="text-3xl md:text-4xl font-serif uppercase text-white mb-4">
            What Our Guests Say
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i <= Math.round(averageRating)
                      ? "fill-accent text-accent"
                      : "text-white/20"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted">
              {averageRating.toFixed(1)} out of 5 ({totalReviews} review
              {totalReviews !== 1 ? "s" : ""})
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {reviews.slice(0, 6).map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <Quote className="w-6 h-6 text-accent/40" />
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i <= review.rating
                          ? "fill-accent text-accent"
                          : "text-white/20"
                      }`}
                    />
                  ))}
                </div>

                {review.comment && (
                  <p className="text-sm text-white/80 leading-relaxed italic">
                    "{review.comment}"
                  </p>
                )}

                {/* Management Response Block */}
                {review.adminResponse && (
                  <div className="mt-4 p-3.5 bg-accent/5 border-l-2 border-accent rounded-r space-y-1">
                    <div className="flex items-center gap-1.5 text-accent text-xs font-semibold tracking-wide uppercase">
                      <CornerDownRight className="w-3.5 h-3.5" />
                      <span>Response from Management</span>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed font-light">
                      {review.adminResponse}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/10 mt-auto">
                <p className="text-sm font-semibold text-white">
                  {review.guestName}
                </p>
                <p className="text-[11px] text-muted">
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
