// // src/app/(public)/components/TestimonialsSection.tsx

// "use client";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Star, Quote, CornerDownRight } from "lucide-react";
// import { api } from "../store/services/api";

// interface PublicReview {
//   id: string;
//   guestName: string;
//   rating: number;
//   comment?: string | null;
//   adminResponse?: string | null; // <-- Added adminResponse field
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
//                   className={`w-4 h-4 ${
//                     i <= Math.round(averageRating)
//                       ? "fill-accent text-accent"
//                       : "text-white/20"
//                   }`}
//                 />
//               ))}
//             </div>
//             <span className="text-sm text-muted">
//               {averageRating.toFixed(1)} out of 5 ({totalReviews} review
//               {totalReviews !== 1 ? "s" : ""})
//             </span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
//           {reviews.slice(0, 6).map((review, idx) => (
//             <motion.div
//               key={review.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: idx * 0.1 }}
//               className="bg-white/5 border border-white/10 p-6 space-y-4 flex flex-col justify-between"
//             >
//               <div className="space-y-4">
//                 <Quote className="w-6 h-6 text-accent/40" />
//                 <div className="flex gap-0.5">
//                   {[1, 2, 3, 4, 5].map((i) => (
//                     <Star
//                       key={i}
//                       className={`w-3.5 h-3.5 ${
//                         i <= review.rating
//                           ? "fill-accent text-accent"
//                           : "text-white/20"
//                       }`}
//                     />
//                   ))}
//                 </div>

//                 {review.comment && (
//                   <p className="text-sm text-white/80 leading-relaxed italic">
//                     "{review.comment}"
//                   </p>
//                 )}

//                 {/* Management Response Block */}
//                 {review.adminResponse && (
//                   <div className="mt-4 p-3.5 bg-accent/5 border-l-2 border-accent rounded-r space-y-1">
//                     <div className="flex items-center gap-1.5 text-accent text-xs font-semibold tracking-wide uppercase">
//                       <CornerDownRight className="w-3.5 h-3.5" />
//                       <span>Response from Management</span>
//                     </div>
//                     <p className="text-xs text-white/70 leading-relaxed font-light">
//                       {review.adminResponse}
//                     </p>
//                   </div>
//                 )}
//               </div>

//               <div className="pt-3 border-t border-white/10 mt-auto">
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
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Star, Quote, CornerDownRight } from "lucide-react";
import { api } from "../store/services/api";

interface PublicReview {
  id: string;
  guestName: string;
  rating: number;
  comment?: string | null;
  adminResponse?: string | null;
  createdAt: string;
}

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  // Carousel State & Refs
  const [containerWidth, setContainerWidth] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

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

  // Duplicate list to allow smooth infinite loop scrolling
  const displayReviews = [...reviews, ...reviews];

  // Calculate container and track widths for precise drag constraints
  useEffect(() => {
    const updateBounds = () => {
      if (containerRef.current && trackRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setTrackWidth(trackRef.current.scrollWidth);
      }
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, [reviews]);

  // Smooth Auto-sliding RAF Loop
  useEffect(() => {
    if (!trackWidth || isHovered || isDragging) return;

    let animationFrameId: number;
    const speed = 0.5; // Adjust speed (pixels per frame)

    const step = () => {
      let currentX = x.get() - speed;
      const halfTrack = trackWidth / 2;

      // Loop back seamlessly when scrolling past half the track
      if (Math.abs(currentX) >= halfTrack) {
        currentX = 0;
      }

      x.set(currentX);
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [trackWidth, isHovered, isDragging, x]);

  if (reviews.length === 0) return null;

  const maxDragConstraint = 0;
  const minDragConstraint = -(trackWidth - containerWidth);

  return (
    <section className="py-24 px-4 md:px-12 bg-black/40 border-y border-white/10 overflow-hidden">
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

        {/* Carousel Container */}
        <div
          ref={containerRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            ref={trackRef}
            style={{ x }}
            drag="x"
            dragConstraints={{
              left: minDragConstraint < 0 ? minDragConstraint : 0,
              right: maxDragConstraint,
            }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            className="flex gap-6 items-stretch w-max"
          >
            {displayReviews.map((review, idx) => (
              // <div
              //   key={`${review.id}-${idx}`}
              //   className="w-[85vw] sm:w-[360px] md:w-[400px] shrink-0 bg-white/5 border border-white/10 p-6 space-y-4 flex flex-col justify-between"
              // >
              <div
                key={`${review.id}-${idx}`}
                className="w-[85vw] sm:w-[360px] md:w-[400px] shrink-0 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 flex flex-col justify-between"
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
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
