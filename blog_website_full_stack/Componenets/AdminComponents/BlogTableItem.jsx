import React from "react";
import { assets } from "@/Assets/assets";
import Image from "next/image";

const BlogTableItem = ({ authorImg, title, author, date, deleteBlog, mongoId }) => {
  const blogDate = new Date(date);

  return (
    <tr className="hover:bg-indigo-50/40 transition-colors">
      <th
        scope="row"
        className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-slate-800 whitespace-nowrap"
      >
        <Image
          width={40}
          height={40}
          src={authorImg ? authorImg : assets.profile_icon}
          alt=""
          className="rounded-full ring-2 ring-indigo-100"
        />
        <span>{author ? author : "No Author"}</span>
      </th>
      <td className="px-6 py-4 font-medium text-slate-900 max-w-xs truncate">
        {title ? title : "No title"}
      </td>
      <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
        {blogDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </td>
      <td className="px-6 py-4 text-right">
        <button
          type="button"
          title="Delete blog"
          onClick={() => deleteBlog(mongoId)}
          className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-100 transition-colors"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default BlogTableItem;
