"use client";

import { useState } from "react";

import { createClient } from "@/lib/supabase/client";

export default function ReviewForm({
  serviceId,
}: {
  serviceId: string;
}) {
  const supabase = createClient();

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    rating: 5,
    comment: "",
  });

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    await supabase
      .from("reviews")
      .insert({
        service_id: serviceId,
        customer_name:
          form.customer_name,
        customer_email:
          form.customer_email,
        rating: form.rating,
        comment: form.comment,
      });

    setLoading(false);

    setSuccess(true);

    setForm({
      customer_name: "",
      customer_email: "",
      rating: 5,
      comment: "",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <input
        type="text"
        required
        placeholder="Name"
        value={form.customer_name}
        onChange={(e) =>
          setForm({
            ...form,
            customer_name:
              e.target.value,
          })
        }
        className="w-full border rounded-xl px-4 py-3"
      />

      <input
        type="email"
        placeholder="E-mail"
        value={form.customer_email}
        onChange={(e) =>
          setForm({
            ...form,
            customer_email:
              e.target.value,
          })
        }
        className="w-full border rounded-xl px-4 py-3"
      />

      <select
        value={form.rating}
        onChange={(e) =>
          setForm({
            ...form,
            rating: Number(
              e.target.value
            ),
          })
        }
        className="w-full border rounded-xl px-4 py-3"
      >
        <option value={5}>
          ⭐⭐⭐⭐⭐
        </option>

        <option value={4}>
          ⭐⭐⭐⭐
        </option>

        <option value={3}>
          ⭐⭐⭐
        </option>

        <option value={2}>
          ⭐⭐
        </option>

        <option value={1}>
          ⭐
        </option>
      </select>

      <textarea
        required
        rows={5}
        placeholder="Write your comment"
        value={form.comment}
        onChange={(e) =>
          setForm({
            ...form,
            comment: e.target.value,
          })
        }
        className="w-full border rounded-xl px-4 py-3"
      />

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl">
        {loading
          ? "Sending..."
          : "Submit comment"}
      </button>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700">
          Your comment was successfully submitted and will be reviewed before being published.
        </div>
      )}
    </form>
  );
}