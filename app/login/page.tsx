"use client";

import {
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase =
    createClient();

  const router =
    useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      );

    setLoading(false);

    if (error) {
      alert(error.message);

      return;
    }

    router.push(
      "/admin/reviews"
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full bg-zinc-800 text-white p-4 rounded-2xl mb-5"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full bg-zinc-800 text-white p-4 rounded-2xl mb-8"
        />

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            transition
            text-white
            p-4
            rounded-2xl
            font-bold
          "
        >
          {loading
            ? "Loading..."
            : "Login"}
        </button>
      </form>
    </div>
  );
}