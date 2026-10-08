"use client";

import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "react-toastify";

function getSafeAdminRedirect(from) {
  if (!from || typeof from !== "string") {
    return "/admin/blogList";
  }
  if (!from.startsWith("/admin") || from.startsWith("/admin/login")) {
    return "/admin/blogList";
  }
  return from;
}

function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = getSafeAdminRedirect(searchParams.get("from"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Welcome back!");
        window.location.assign(redirectTo);
        return;
      }

      toast.error(response.data.msg || "Login failed");
    } catch (err) {
      const msg = err.response?.data?.msg || "Login failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 px-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur rounded-2xl p-8 sm:p-10 shadow-2xl shadow-indigo-900/30 ring-1 ring-white/20">
        <Link href="/" className="inline-block mb-6">
          <Image src={assets.logo} width={120} alt="Blog logo" />
        </Link>

        <h1 className="text-2xl font-bold text-slate-900 mb-1">Admin login</h1>
        <p className="text-sm text-slate-500 mb-8">
          Sign in to manage blogs and subscriptions.
        </p>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-input !mt-0"
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input !mt-0"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-base hover:from-indigo-500 hover:to-violet-500 disabled:opacity-60 transition-all shadow-lg shadow-indigo-600/30"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-indigo-600 text-white">
          Loading...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
