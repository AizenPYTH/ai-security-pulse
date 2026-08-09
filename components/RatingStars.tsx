type RatingStarsProps = {
  rating: number;
  reviews?: number;
};

export default function RatingStars({ rating, reviews }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1.5 text-sm whitespace-nowrap">
      <span className="text-accent" aria-hidden="true">
        ★
      </span>
      <span className="font-medium text-ink">{rating.toFixed(1)}</span>
      {typeof reviews === "number" && (
        <span className="text-muted">({reviews.toLocaleString()})</span>
      )}
    </div>
  );
}
