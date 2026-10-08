"use client";
import { assets } from "@/Assets/assets";
import React from "react";
import Image from "next/image";
import Link from "next/link";

function stripHtml(html) {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "").trim();
}

function blogImageSrc(path) {
    if (!path) return assets.upload_area;
    if (typeof path === "string" && (path.startsWith("http") || path.startsWith("/"))) {
        return encodeURI(path);
    }
    return encodeURI(`/${path}`);
}

const categoryStyles = {
    Startup: "bg-violet-100 text-violet-700 ring-violet-200",
    Technology: "bg-sky-100 text-sky-700 ring-sky-200",
    Lifestyle: "bg-rose-100 text-rose-700 ring-rose-200",
};

const BlogItem = ({ title, description, category, image, id, slug }) => {
    const identifier = slug || id;
    const href = identifier ? `/blogs/${encodeURIComponent(String(identifier))}` : "/";
    const excerpt = stripHtml(description);
    const imageSrc = blogImageSrc(image);
    const badgeClass =
        categoryStyles[category] || "bg-indigo-100 text-indigo-700 ring-indigo-200";

    return (
        <article className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-100/80 hover:-translate-y-1 transition-all duration-300">
            <Link href={href} className="relative block overflow-hidden">
                <Image
                    src={imageSrc}
                    alt={title || "Blog image"}
                    width={400}
                    height={250}
                    className="w-full h-[220px] sm:h-[240px] object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <div className="flex flex-col flex-1 p-5 sm:p-6">
                <span
                    className={`self-start mb-3 px-2.5 py-1 text-xs font-semibold rounded-full ring-1 ring-inset ${badgeClass}`}
                >
                    {category}
                </span>

                <Link href={href}>
                    <h2 className="mb-2 text-lg sm:text-xl font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {title}
                    </h2>
                </Link>

                <p className="mb-4 text-sm text-slate-600 leading-relaxed line-clamp-3 flex-1">
                    {excerpt.slice(0, 140)}
                    {excerpt.length > 140 ? "..." : ""}
                </p>

                <Link
                    href={href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-violet-600 transition-colors"
                >
                    Read more
                    <Image
                        src={assets.arrow}
                        alt=""
                        width={14}
                        height={14}
                        className="w-3.5 h-3.5 object-contain"
                    />
                </Link>
            </div>
        </article>
    );
};

export default BlogItem;
