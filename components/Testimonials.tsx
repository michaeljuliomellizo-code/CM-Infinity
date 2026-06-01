"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";
import RatingStars from "@/components/reviews/RatingStars";

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  admin_reply?: string | null;

  services?: {
    id: string;
    name: string;
  }[];
}

interface Service {
  id: string;
  name: string;
}

export default function Testimonials() {
  const supabase = createClient();

  const [reviews, setReviews] =
    useState<Review[]>([]);

  const [services, setServices] =
    useState<Service[]>([]);

  useEffect(() => {
    async function loadData() {
      /*
        REVIEWS
      */

      const {
        data: reviewsData,
        error: reviewsError,
      } = await supabase
        .from("reviews")
        .select(`
          id,
          customer_name,
          rating,
          comment,
          admin_reply,
          services (
            id,
            name
          )
        `)
        .eq("approved", true)
        .order("created_at", {
          ascending: false,
        })
        .limit(6);

      if (reviewsError) {
        console.error(
          "Reviews Error:",
          reviewsError
        );
      }

      /*
        SERVICES
      */

      const {
        data: servicesData,
        error: servicesError,
      } = await supabase
        .from("services")
        .select(`
          id,
          name
        `)
        .order("name");

      if (servicesError) {
        console.error(
          "Services Error:",
          servicesError
        );
      }

      setReviews(
        (reviewsData as Review[]) ||
          []
      );

      setServices(
        servicesData || []
      );
    }

    loadData();
  }, []);

  return (
    <section className="bg-zinc-950 text-white py-24 px-8 relative overflow-hidden">
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

      <div className="relative max-w-7xl mx-auto">
        {/* TITLE */}
        <h2 className="text-5xl font-bold text-center mb-4">
          Testimonials
        </h2>

        <p className="text-center text-zinc-400 mb-16 max-w-2xl mx-auto">
          Real reviews from our
          customers.
        </p>

        {/* REVIEWS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="
                  bg-zinc-900/80
                  backdrop-blur-sm
                  border
                  border-zinc-800
                  p-8
                  rounded-3xl
                  shadow-xl
                "
              >
                {/* HEADER */}
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-lg">
                    {
                      review.customer_name
                    }
                  </h3>

                  <RatingStars
                    rating={
                      review.rating
                    }
                  />
                </div>

                {/* COMMENT */}
                <p className="text-zinc-300 leading-relaxed">
                  {review.comment}
                </p>

                {/* ADMIN REPLY */}
                {review.admin_reply && (
                  <div
                    className="
                      mt-6
                      border-l-4
                      border-blue-500
                      bg-zinc-800/70
                      p-4
                      rounded-xl
                    "
                  >
                    <p className="font-bold text-blue-400">
                      🏢 Response from
                      CM Infinity
                    </p>

                    <p className="mt-2 text-zinc-300">
                      {
                        review.admin_reply
                      }
                    </p>
                  </div>
                )}

                {/* SERVICE */}
                <div className="mt-6 text-sm text-blue-400">
                  Service:{" "}
                  {review.services?.[0]
                    ?.name ||
                    "General Service"}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-zinc-400">
              No reviews available
              yet.
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <h3 className="text-3xl font-bold mb-8">
            Leave a Review
          </h3>

          <div className="flex flex-wrap justify-center gap-4">
            {services.map(
              (service) => (
                <Link
                  key={service.id}
                  href={`/servicio/${service.id}`}
                  className="
                    bg-blue-600
                    hover:bg-blue-700
                    transition
                    px-6
                    py-3
                    rounded-2xl
                    font-semibold
                    shadow-lg
                  "
                >
                  {service.name}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}