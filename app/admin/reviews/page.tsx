'use client'

import { useEffect, useState } from "react";
import LogoutButton from "@/components/LogoutButton";

import { createClient } from "@/lib/supabase/client";

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  approved: boolean;
  admin_reply?: string;
  created_at: string;
}

export default function AdminReviewsPage() {
  const supabase = createClient();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  /*
    =========================
    LOAD REVIEWS
    =========================
  */

  async function loadReviews() {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
      return;
    }

    setReviews(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadReviews();
  }, []);

  /*
    =========================
    APPROVE REVIEW
    =========================
  */

  async function approveReview(
    reviewId: string
  ) {
    await fetch(
      "/api/admin/reviews",
      {
        method: "PATCH",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          reviewId,
          approved: true,
        }),
      }
    );

    loadReviews();
  }

  /*
    =========================
    SAVE REPLY
    =========================
  */

  async function replyReview(
    reviewId: string,
    reply: string
  ) {
    await fetch(
      "/api/admin/reviews",
      {
        method: "PATCH",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          reviewId,
          admin_reply: reply,
        }),
      }
    );

    loadReviews();
  }

  /*
    =========================
    DELETE REVIEW
    =========================
  */

  async function deleteReview(
    reviewId: string
  ) {
    const confirmDelete =
      confirm(
        "Delete this review?"
      );

    if (!confirmDelete)
      return;

    await fetch(
      `/api/admin/reviews?reviewId=${reviewId}`,
      {
        method: "DELETE",
      }
    );

    loadReviews();
  }

  /*
    =========================
    LOADING
    =========================
  */

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-10">
        Loading reviews...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-12">
        Admin Reviews
      </h1>
      <LogoutButton />
      {reviews.length === 0 && (
        <div className="bg-zinc-900 rounded-3xl p-8">
          No reviews found.
        </div>
      )}

      <div className="space-y-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-3xl
              p-8
            "
          >
            {/* HEADER */}
            <div className="flex flex-wrap justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  {review.customer_name}
                </h2>

                <p className="text-yellow-400 mt-2">
                  {"⭐".repeat(
                    review.rating
                  )}
                </p>
              </div>

              <div>
                {review.approved ? (
                  <span
                    className="
                      bg-green-600
                      px-4
                      py-2
                      rounded-full
                      text-sm
                    "
                  >
                    Approved
                  </span>
                ) : (
                  <span
                    className="
                      bg-yellow-600
                      px-4
                      py-2
                      rounded-full
                      text-sm
                    "
                  >
                    Pending
                  </span>
                )}
              </div>
            </div>

            {/* COMMENT */}
            <div className="mb-6">
              <p className="text-zinc-300">
                {review.comment}
              </p>
            </div>

            {/* ADMIN REPLY */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold">
                Admin Reply
              </label>

              <textarea
                id={`reply-${review.id}`}
                defaultValue={
                  review.admin_reply || ""
                }
                placeholder="Write a reply..."
                className="
                  w-full
                  min-h-[120px]
                  bg-zinc-800
                  border
                  border-zinc-700
                  rounded-2xl
                  p-4
                  outline-none
                  mb-4
                "
              />

              <button
                onClick={() => {
                  const textarea =
                    document.getElementById(
                      `reply-${review.id}`
                    ) as HTMLTextAreaElement;

                  replyReview(
                    review.id,
                    textarea.value
                  );
                }}
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  px-5
                  py-3
                  rounded-2xl
                "
              >
                Save Reply
              </button>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-4">
              {!review.approved && (
                <button
                  onClick={() =>
                    approveReview(
                      review.id
                    )
                  }
                  className="
                    bg-green-600
                    hover:bg-green-700
                    px-5
                    py-3
                    rounded-2xl
                    transition
                  "
                >
                  Approve Review
                </button>
              )}

              <button
                onClick={() =>
                  deleteReview(
                    review.id
                  )
                }
                className="
                  bg-red-600
                  hover:bg-red-700
                  px-5
                  py-3
                  rounded-2xl
                  transition
                "
              >
                Delete Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}