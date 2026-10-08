"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Header = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);

    const response = await axios.post("/api/email", formData);
    if (response.data.success) {
      toast.success(response.data.msg || "Subscribed successfully!");
      setEmail("");
    } else {
      toast.error("Error");
    }
  };

  return (
    <header className="relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, white 0, transparent 35%), radial-gradient(circle at 80% 0%, #c4b5fd 0, transparent 30%)",
        }}
      />

      <div className="relative py-12 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Image
            src={assets.logo}
            alt="App Logo"
            className="w-[130px] sm:w-auto h-auto brightness-0 invert"
            width={130}
            height={40}
            priority
          />

          <Link
            href="/admin/login"
            className="flex items-center gap-2 font-medium py-2.5 px-5 sm:px-6 rounded-full bg-white/15 backdrop-blur border border-white/25 hover:bg-white hover:text-indigo-700 transition-all duration-300"
          >
            Admin
            <Image
              src={assets.arrow}
              alt="arrow"
              width={16}
              height={16}
              className="w-4 h-4 object-contain brightness-0 invert group-hover:invert-0"
            />
          </Link>
        </div>

        <div className="text-center my-14 sm:my-16 max-w-3xl mx-auto">
          <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-white/15 border border-white/20">
            Stories · Ideas · Insights
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold mb-5 tracking-tight">
            Discover our latest blogs
          </h1>
          <p className="text-sm sm:text-lg text-indigo-100/95 leading-relaxed">
            Curated articles on startup life, technology, and lifestyle. Subscribe
            for new posts delivered to your inbox.
          </p>

          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col sm:flex-row gap-2 sm:gap-0 max-w-lg mx-auto mt-10 rounded-2xl sm:rounded-full overflow-hidden bg-white/95 p-1.5 shadow-xl shadow-indigo-900/20"
          >
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              className="flex-1 outline-none py-3.5 px-5 text-sm sm:text-base bg-transparent text-slate-800 placeholder:text-slate-400 rounded-xl sm:rounded-full"
            />
            <button
              type="submit"
              className="py-3.5 px-6 sm:px-8 rounded-xl sm:rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold hover:from-indigo-500 hover:to-violet-500 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
