import Link from "next/link";

import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import ReviewForm from "@/components/reviews/ReviewForm";
import ReviewList from "@/components/reviews/ReviewList";
import RatingStars from "@/components/reviews/RatingStars";

export default async function ServicePage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  /*
    =========================
    SERVICIO
    =========================
  */

  const { data: service } =
    await supabase
      .from("services")
      .select("*")
      .eq("id", id)
      .single();

  if (!service) {
    notFound();
  }

  /*
    =========================
    REVIEWS
    =========================
  */

  const { data } = await supabase
    .from("reviews")
    .select("*")
    .eq("service_id", id)
    .eq("approved", true)
    .order("created_at", {
      ascending: false,
    });

  const reviews = data || [];

  /*
    =========================
    PROMEDIO
    =========================
  */

  const averageRating =
    reviews.length > 0
      ? reviews.reduce(
          (
            acc,
            review
          ) => acc + review.rating,
          0
        ) / reviews.length
      : 0;

  return (
    <div className="relative overflow-hidden min-h-screen bg-zinc-950 text-white">
      {/* WATERMARK */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url('/water-drop.jpeg')",

          backgroundRepeat:
            "no-repeat",

          backgroundPosition:
            "center",

          backgroundSize:
            "75vw",

          opacity: 0.05,

          filter:
            "grayscale(100%)",
        }}
      />

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-4 py-10">
        {/* BACK BUTTON */}
        <div className="mb-10">
          <Link
            href="/"
            className="
              inline-flex
              items-center
              gap-2
              border
              border-zinc-700
              bg-zinc-900/80
              backdrop-blur-sm
              hover:bg-zinc-800
              text-white
              px-6
              py-3
              rounded-2xl
              transition
            "
          >
            ← Back to Home
          </Link>
        </div>

        {/* SERVICE */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* INFO */}
          <div>
            <h1 className="text-5xl font-bold">
              {service.name}
            </h1>

            <p className="mt-6 text-gray-300 text-lg leading-relaxed">
              {service.description}
            </p>

            {/* RATING */}
            <div className="mt-8 flex items-center gap-3">
              <RatingStars
                rating={Math.round(
                  averageRating
                )}
              />

              <span className="font-medium">
                {averageRating.toFixed(1)}
              </span>

              <span className="text-gray-400">
                ({reviews.length} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* REVIEWS */}
        <div className="mt-20 grid lg:grid-cols-2 gap-12">
          {/* LISTA */}
          <div>
            <h2 className="text-3xl font-bold mb-8">
              Customer Reviews
            </h2>

            {reviews.length > 0 ? (
              <ReviewList
                reviews={reviews}
              />
            ) : (
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-10 text-center">
                <p className="text-gray-400">
                  No reviews yet for this
                  service.
                </p>
              </div>
            )}
          </div>

          {/* FORM */}
          <div>
            <div className="border border-zinc-800 rounded-3xl p-8 bg-zinc-900/80 backdrop-blur-sm shadow-2xl">
              <h2 className="text-2xl font-bold mb-6">
                Leave Your Review
              </h2>

              <ReviewForm
                serviceId={service.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}