"use client";

import { assets } from "@/Assets/assets";
import Footer from "@/Componenets/Footer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function blogImageSrc(path) {
  if (!path) return null;
  if (path.startsWith("http") || path.startsWith("/")) {
    return encodeURI(path);
  }
  return encodeURI(`/${path}`);
}

const categoryStyles = {
  Startup: "bg-violet-500/20 text-violet-100 border-violet-300/30",
  Technology: "bg-sky-500/20 text-sky-100 border-sky-300/30",
  Lifestyle: "bg-rose-500/20 text-rose-100 border-rose-300/30",
};

const Page = () => {
  const params = useParams();
  const blogKey = params?.id ? decodeURIComponent(String(params.id)) : "";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!blogKey) {
      setLoading(false);
      setNotFound(true);
      return;
    }

    const fetchBlogData = async () => {
      setLoading(true);
      setNotFound(false);

      try {
        const response = await axios.get("/api/blog", {
          params: { id: blogKey },
        });

        if (response.data.success && response.data.blog) {
          setData(response.data.blog);
        } else {
          setData(null);
          setNotFound(true);
        }
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        setData(null);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [blogKey]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="h-10 w-10 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
        <p className="text-slate-600 font-medium mt-4">Loading article...</p>
      </div>
    );
  }

  if (notFound || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
        <div className="admin-card p-10 text-center max-w-md">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Blog not found</h1>
          <p className="text-slate-500 mb-6">
            This post may have been removed or the link is incorrect.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const heroImage = blogImageSrc(data.image);
  const authorImage = blogImageSrc(data.authorImg);
  const badgeClass =
    categoryStyles[data.category] || "bg-white/15 text-white border-white/25";

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-violet-700 to-fuchsia-700" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60" />

        <div className="relative py-8 px-5 md:px-12 lg:px-28">
          <div className="flex justify-between items-center">
            <Link href="/">
              <Image
                src={assets.logo}
                alt="App Logo"
                className="w-[120px] brightness-0 invert"
                width={120}
                height={40}
                priority
              />
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium py-2.5 px-5 rounded-full bg-white/15 border border-white/25 hover:bg-white hover:text-indigo-700 transition-all"
            >
              All blogs
            </Link>
          </div>

          <div className="text-center my-12 sm:my-16 max-w-3xl mx-auto">
            {data.category ? (
              <span
                className={`inline-block mb-4 px-3 py-1 text-xs font-semibold rounded-full border ${badgeClass}`}
              >
                {data.category}
              </span>
            ) : null}
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight tracking-tight">
              {data.title}
            </h1>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-indigo-100">
              <div className="flex items-center gap-3">
                {authorImage ? (
                  <Image
                    src={authorImage}
                    width={48}
                    height={48}
                    alt={data.author || "Author"}
                    className="rounded-full object-cover ring-2 ring-white/30"
                    unoptimized
                  />
                ) : (
                  <Image
                    src={assets.profile_icon}
                    width={48}
                    height={48}
                    alt={data.author || "Author"}
                    className="rounded-full ring-2 ring-white/30"
                  />
                )}
                <span className="font-medium text-white">{data.author || "Unknown author"}</span>
              </div>
              {data.createdAt ? (
                <>
                  <span className="hidden sm:inline text-white/40">·</span>
                  <time className="text-sm">
                    {new Date(data.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <main className="px-5 md:px-8 max-w-4xl mx-auto -mt-8 sm:-mt-12 pb-16 relative z-10">
        {heroImage ? (
          <div className="rounded-2xl overflow-hidden shadow-2xl shadow-indigo-200/50 ring-1 ring-slate-200">
            <Image
              src={heroImage}
              width={1280}
              height={720}
              alt={data.title || "Blog image"}
              className="w-full h-auto max-h-[480px] object-cover"
              unoptimized
              priority
            />
          </div>
        ) : null}

        <article className="admin-card mt-8 p-6 sm:p-10">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: data.description || "" }}
          />
        </article>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 admin-card p-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-semibold text-indigo-600 hover:text-violet-600"
          >
            <span className="text-lg">←</span> Back to all blogs
          </Link>
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-3">Share this article</p>
            <div className="flex items-center gap-3">
              <Image src={assets.facebook_icon} width={40} height={40} alt="Facebook" />
              <Image src={assets.twitter_icon} width={40} height={40} alt="Twitter" />
              <Image src={assets.googleplus_icon} width={40} height={40} alt="Google Plus" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Page;
