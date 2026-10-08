"use client";
import React, { useState, useEffect } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";

const BlogList = () => {
    const [menu, setMenu] = useState("All");
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get("/api/blog");
            if (response.data.success) {
                setBlogs(response.data.blogs);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const filteredBlogs =
        menu === "All" ? blogs : blogs.filter((item) => item.category === menu);

    const categories = ["All", "Technology", "Startup", "Lifestyle"];

    return (
        <section className="px-5 md:px-12 lg:px-28 pb-20 -mt-6 relative z-10">
            <div className="flex justify-center gap-2 sm:gap-3 my-8 flex-wrap">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setMenu(category)}
                        className={`py-2.5 px-5 text-sm sm:text-base rounded-full font-medium transition-all duration-300 ${
                            menu === category
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                                : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-200 hover:text-indigo-600"
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {loading ? (
                <p className="text-center text-slate-500 py-16">Loading blogs...</p>
            ) : filteredBlogs.length === 0 ? (
                <div className="text-center py-20 admin-card max-w-lg mx-auto px-6">
                    <p className="text-lg font-semibold text-slate-800">No blogs yet</p>
                    <p className="text-slate-500 mt-2">
                        {menu === "All"
                            ? "Check back soon for new articles."
                            : `No posts in ${menu} yet.`}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {filteredBlogs.map((item, index) => (
                        <BlogItem
                            key={item._id || index}
                            id={item._id}
                            slug={item.slug}
                            image={item.image}
                            title={item.title}
                            description={item.description}
                            category={item.category}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default BlogList;
