"use client";
import { assets } from "@/Assets/assets";
import AdminPageHeader from "@/Componenets/AdminComponents/AdminPageHeader";
import RichTextEditor from "@/Componenets/AdminComponents/RichTextEditor";
import { slugify } from "@/lib/utils/slug";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const router = useRouter();

  const [image, setImage] = useState(false);
  const [preview, setPreview] = useState(null);
  const [slugTouched, setSlugTouched] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const [data, setData] = useState({
    title: "",
    slug: "",
    description: "",
    category: "Startup",
    author: "Alex Bennett",
    authorImg: "/author_img.png",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    if (name === "title") {
      setData((prev) => ({
        ...prev,
        title: value,
        slug: slugTouched ? prev.slug : slugify(value),
      }));
      return;
    }

    if (name === "slug") {
      setSlugTouched(true);
      setData((prev) => ({ ...prev, slug: slugify(value) }));
      return;
    }

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onDescriptionChange = (html) => {
    setData((prev) => ({ ...prev, description: html }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    const plainText = data.description.replace(/<[^>]*>/g, "").trim();
    if (!plainText) {
      toast.error("Please add blog content");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug || slugify(data.title));
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image);

    axios
      .post("/api/blog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.msg || "Blog Added Successfully!");
          setImage(null);
          setPreview(null);
          setSlugTouched(false);
          setData({
            title: "",
            slug: "",
            description: "",
            category: "Startup",
            author: "Alex Bennett",
            authorImg: "/author_img.png",
          });
          setTimeout(() => router.refresh?.(), 1000);
        } else {
          toast.error(response.data.msg || "Error adding blog");
        }
      })
      .catch((error) => {
        console.error("Submit error:", error);
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="max-w-3xl">
      <AdminPageHeader
        title="Create blog"
        description="Add a thumbnail, title, slug, and rich content for your new post."
      />

      <form onSubmit={onSubmitHandler} className="admin-card p-6 sm:p-8">
        <label className="admin-label !mt-0">Thumbnail</label>
        <label
          htmlFor="image"
          className="cursor-pointer inline-block mt-2 rounded-xl overflow-hidden ring-2 ring-slate-100 hover:ring-indigo-200 transition-all"
        >
          <Image
            className="object-cover"
            src={preview || assets.upload_area}
            alt="Upload thumbnail"
            width={160}
            height={160}
          />
        </label>
        <input onChange={handleImageChange} type="file" id="image" hidden required />

        <label className="admin-label" htmlFor="title">
          Blog title
        </label>
        <input
          id="title"
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          className="admin-input max-w-2xl"
          type="text"
          placeholder="Enter an engaging title"
          required
        />

        <label className="admin-label" htmlFor="slug">
          URL slug
        </label>
        <p className="text-xs text-slate-500 mt-1">
          Auto-generated from the title. You can edit before publishing.
        </p>
        <input
          id="slug"
          name="slug"
          onChange={onChangeHandler}
          value={data.slug}
          className="admin-input max-w-2xl font-mono text-sm"
          type="text"
          placeholder="my-blog-post"
          required
        />

        <label className="admin-label">Blog content</label>
        <RichTextEditor
          value={data.description}
          onChange={onDescriptionChange}
          placeholder="Write content here"
        />

        <label className="admin-label" htmlFor="category">
          Category
        </label>
        <select
          id="category"
          name="category"
          onChange={onChangeHandler}
          value={data.category}
          className="admin-input max-w-xs"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>

        <button
          type="submit"
          className="mt-8 px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-lg hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-600/25 transition-all"
        >
          Publish blog
        </button>
      </form>
    </div>
  );
};

export default Page;
