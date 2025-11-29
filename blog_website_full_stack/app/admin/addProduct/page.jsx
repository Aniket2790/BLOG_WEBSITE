"use client";
import { assets } from "@/Assets/assets";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"; 
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
    const router = useRouter(); // Initialize router

    const [image, setImage] = useState(false);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Startup",
        author: "Alex Bennett",
        authorImg: "/author_img.png"
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        console.log("Updated form data:", data);
    }, [data]);

    const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!image) {
        toast.error("Please upload an image");
        return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image);

    axios.post("/api/blog", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    .then((response) => {
        if (response.data.success) {
            toast.success(response.data.msg || "Blog Added Successfully!");

            // Reset form
            setImage(null);
            setPreview(null);
            setData({
                title: "",
                description: "",
                category: "Startup",
                author: "Alex Bennett",
                authorImg: "/author_img.png",
            });

            // Refresh page after short delay
            setTimeout(() => {
                router.refresh?.(); // safe check
            }, 1000);
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
        <form
            onSubmit={onSubmitHandler}
            className="pt-5 px-5 sm:pt-12 sm:pl-16"
        >
            <p className="text-xl font-medium mb-2">Upload thumbnail</p>
            <label htmlFor="image" className="cursor-pointer inline-block">
                <Image
                    className="mt-4 border border-gray-300 rounded-md"
                    src={preview || assets.upload_area}
                    alt="Upload thumbnail"
                    width={140}
                    height={140}
                />
            </label>
            <input
                onChange={handleImageChange}
                type="file"
                id="image"
                hidden
                required
            />

            <p className="text-xl mt-4">Blog title</p>
            <input
                name="title"
                onChange={onChangeHandler}
                value={data.title}
                className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
                type="text"
                placeholder="Type here"
                required
            />

            <p className="text-xl mt-4">Blog Description</p>
            <textarea
                name="description"
                onChange={onChangeHandler}
                value={data.description}
                className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
                type="text"
                placeholder="Write content here"
                rows={6}
                required
            />

            <p className="text-xl mt-4">Blog category</p>
            <select
                name="category"
                onChange={onChangeHandler}
                value={data.category}
                className="w-40 mt-4 px-4 py-3 border text-gray-700"
            >
                <option value="Startup">Startup</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
            </select>
            <br />

            <button
                type="submit"
                className="mt-8 w-40 h-12 bg-green-300 text-black font-bold text-2xl"
            >
                Add
            </button>
        </form>
    );
};

export default Page;
