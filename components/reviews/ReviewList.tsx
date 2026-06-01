import RatingStars from "./RatingStars";

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  admin_reply?: string;
  created_at: string;
}

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({
  reviews,
}: ReviewListProps) {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="
            border
            rounded-2xl
            p-6
            bg-white
            shadow-sm
          "
        >
          {/* CLIENTE */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-bold text-lg">
                {review.customer_name}
              </h3>

              <p className="text-sm text-gray-500">
                {new Date(
                  review.created_at
                ).toLocaleDateString()}
              </p>
            </div>

            <RatingStars
              rating={review.rating}
            />
          </div>

          {/* COMENTARIO */}
          <p className="text-gray-700">
            {review.comment}
          </p>

          {/* RESPUESTA ADMIN */}
          {review.admin_reply && (
            <div
              className="
                mt-5
                ml-4
                border-l-4
                border-blue-500
                bg-blue-50
                p-4
                rounded-xl
              "
            >
              <p className="font-bold text-blue-700">
                CM Infinity Response
              </p>

              <p className="mt-2 text-gray-700">
                {review.admin_reply}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}