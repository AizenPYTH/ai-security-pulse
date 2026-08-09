"use client";

import { motion, useReducedMotion } from "framer-motion";

type RatingStarsProps = {
  rating: number;
  reviews?: number;
};

export default function RatingStars({ rating, reviews }: RatingStarsProps) {
  const reduce = useReducedMotion();
  const filled = Math.round((rating / 5) * 5);

  return (
    <div className="flex items-center gap-1.5 text-sm whitespace-nowrap">
      <div className="flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.span
            key={i}
            className={i < filled ? "text-accent" : "text-line"}
            initial={reduce ? false : { opacity: 0, scale: 0.6 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.25 }}
          >
            ★
          </motion.span>
        ))}
      </div>
      <span className="font-medium text-ink">{rating.toFixed(1)}</span>
      {typeof reviews === "number" && (
        <span className="text-muted">({reviews.toLocaleString()})</span>
      )}
    </div>
  );
}
