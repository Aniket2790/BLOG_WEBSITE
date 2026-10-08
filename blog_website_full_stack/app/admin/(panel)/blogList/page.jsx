"use client";
import AdminPageHeader from "@/Componenets/AdminComponents/AdminPageHeader";
import BlogTableItem from "@/Componenets/AdminComponents/BlogTableItem";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get("/api/blog");
    setBlogs(response.data.blogs || []);
  };

  const deleteBlog = async (mongoId) => {
    const response = await axios.delete("/api/blog", {
      params: { id: mongoId },
    });
    toast.success(response.data.msg);
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-5xl">
      <AdminPageHeader
        title="All blogs"
        description="Manage published posts, review titles, and remove outdated content."
        action={
          <Link
            href="/admin/addProduct"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-500 transition-colors shadow-sm"
          >
            + New blog
          </Link>
        }
      />

      <div className="admin-card overflow-hidden">
        <div className="relative max-h-[70vh] overflow-auto scrollbar-hide">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th scope="col" className="hidden sm:table-cell px-6 py-4">
                  Author
                </th>
                <th scope="col" className="px-6 py-4">
                  Title
                </th>
                <th scope="col" className="px-6 py-4">
                  Date
                </th>
                <th scope="col" className="px-6 py-4 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-slate-500">
                    No blogs yet.{" "}
                    <Link href="/admin/addProduct" className="text-indigo-600 font-semibold hover:underline">
                      Create your first post
                    </Link>
                  </td>
                </tr>
              ) : (
                blogs.map((item) => (
                  <BlogTableItem
                    key={item._id}
                    mongoId={item._id}
                    title={item.title}
                    author={item.author}
                    authorImg={item.authorImg}
                    date={item.createdAt}
                    deleteBlog={deleteBlog}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
