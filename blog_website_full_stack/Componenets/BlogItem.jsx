"use client";
import { assets } from "@/Assets/assets";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const BlogItem = ({ title, description, category, image, id }) => {
    return (
        <div className="max-w-[330px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000000] transition-all duration-200 rounded-md">
            
            {/* Blog Image with Link */}
            <Link href={`/blogs/${id}`}>
                <Image
                    src={image || assets.default_blog_image}
                    alt={title || "Blog image"}
                    width={400}
                    height={250}
                    className="border-b border-black w-full h-[250px] object-cover"
                    />
            </Link>

            {/* Category Tag */}
            <p className="ml-5 mt-5 px-2 py-0.5 inline-block bg-black text-white text-sm rounded-sm">
                {category}
            </p>

            {/* Blog Content */}
            <div className="p-5">
                <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
                    {title}
                </h5>
                <p className="mb-3 text-sm tracking-tight text-gray-700">
                    {description.slice(0, 120)}... 
                </p>

                

                {/* Read More Link */}
                <Link
                    href={`/blogs/${id}`}
                    className="inline-flex items-center py-2 font-semibold text-center text-black hover:underline"
                >
                    Read more
                    <Image
                        src={assets.arrow}
                        alt="arrow icon"
                        width={12}
                        height={12}
                        className="ml-2 w-3 h-3 object-contain"
                    />
                </Link>
            </div>
        </div>
    );
};

export default BlogItem;

