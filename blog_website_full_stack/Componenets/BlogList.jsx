"use client";
import { blog_data } from "@/Assets/assets";
import React, { useState, useEffect } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";

const BlogList = () => {
    const [menu, setMenu] = useState("All");

    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
    try {
        const response = await axios.get('/api/blog');
        if (response.data.success) {
            setBlogs(response.data.blogs);  // ← update your state
            console.log("Fetched blogs:", response.data.blogs);
        } else {
            console.log("Failed to fetch blogs:", response.data.message);
        }
    } catch (error) {
        console.error("Error fetching blogs:", error);
    }
};
        

        useEffect(() => {
            fetchBlogs();
        }, []);



    const filteredBlogs = menu === "All"
        ? blogs
        : blogs.filter((item) => item.category === menu);

    const categories = ["All", "Technology", "Startup", "Lifestyle"];

    return (
        <div>
            {/* Category Buttons */}
            <div className="flex justify-center gap-4 sm:gap-6 my-10 flex-wrap">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setMenu(category)}
                        className={`py-2 px-5 sm:px-6 border border-black text-sm sm:text-base rounded-full transition-all duration-300 ${
                            menu === category
                                ? "bg-black text-white"
                                : "bg-white text-black hover:bg-gray-200"
                        }`}
                        style={{
                            boxShadow:
                                menu === category
                                    ? "0px 4px 12px rgba(0, 0, 0, 0.2)"
                                    : "0px 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Blog Cards */}
            <div className="flex flex-wrap justify-center gap-6 gap-y-10 mb-16 xl:mx-24">
                {filteredBlogs.map((item, index) => (
                    <BlogItem
                        key={index}
                        id={item._id}
                        image={item.image}
                        title={item.title}
                        description={item.description}
                        category={item.category}
                    />
                ))}
            </div>
        </div>
    );
};

export default BlogList;






