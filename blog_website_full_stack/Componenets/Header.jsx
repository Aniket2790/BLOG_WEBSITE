"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
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
    <div className="py-10 px-5 md:px-12 lg:px-28 bg-gradient-to-br from-white via-gray-50 to-gray-100 text-black">
      {/* Header Top: Logo and Button */}
      <div className="flex justify-between items-center">
        <Image
          src={assets.logo}
          alt="App Logo"
          className="w-[130px] sm:w-auto h-auto"
          width={130}
          height={40}
          priority
        />

        <button
          className="flex items-center gap-2 font-medium py-2 px-5 sm:px-6 rounded-full border border-black bg-white hover:bg-black hover:text-white transition-all duration-300"
          style={{ boxShadow: "-7px 7px 7px rgba(0, 0, 0, 0.25)" }}
        >
          Get started
          <Image
            src={assets.arrow}
            alt="arrow"
            width={16}
            height={16}
            className="w-4 h-4 object-contain"
          />
        </button>
      </div>

      {/* Heading & Paragraph */}
      <div className="text-center my-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight text-gray-900">
          Latest Blogs
        </h1>
        <p className="max-w-[740px] mx-auto text-sm sm:text-base text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro facilis
          quisquam nobis fugiat laborum aspernatur sint qui, dolorem ab quo
          quaerat reprehenderit voluptatem quis sequi, laboriosam cupiditate
          iste odio asperiores.Stay updated with our latest articles, insights,
          and resources – delivered straight to your inbox.
        </p>

        {/* Email Form */}
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-[500px] mx-auto mt-10 border border-black rounded-full overflow-hidden bg-white shadow-[-7px_7px_7px_0_#000000]"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className="pl-5 flex-1 outline-none py-4 text-sm sm:text-base bg-transparent placeholder:text-gray-500"
          />
          <button
            type="submit"
            className="border-l border-black py-4 px-5 sm:px-8 bg-black text-white hover:bg-red-500 transition-all duration-300 font-bold"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
