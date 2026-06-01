export default function RatingStars({
  rating,
}: {
  rating: number;
}) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map(
        (star) => (
          <span
            key={star}
            className={`text-2xl ${
              star <= rating
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
          >
            ★
          </span>
        )
      )}
    </div>
  );
}