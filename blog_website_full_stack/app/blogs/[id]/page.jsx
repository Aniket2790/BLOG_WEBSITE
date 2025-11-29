"use client";
import { assets, blog_data } from '@/Assets/assets';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Footer from '@/Componenets/Footer';
import Link from "next/link";
import axios from 'axios';
import { useParams } from 'next/navigation'; 


const Page = () => {
    const params = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await axios.get("/api/blog", {
                    params: { id: params.id },
                });

                if (response.data.success && response.data.blog) {
                    setData(response.data.blog);  // ✅ corrected from `blogs[0]`
                } else {
                    console.log("No blog found for this ID");
                }
            } catch (err) {
                console.error("Failed to fetch blog:", err);
            }
        };

        if (params.id) {
            fetchBlogData();
        }
    }, [params.id]);

    return data ? (
        <>
            <div className="py-10 px-5 md:px-12 lg:px-28 bg-gradient-to-br from-white via-gray-50 to-gray-100 text-black">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <Link href='/'>
                        <Image 
                            src={assets.logo} 
                            alt="App Logo" 
                            className="w-[130px] sm:w-auto h-auto" 
                            width={130} 
                            height={40} 
                            priority 
                        />
                    </Link>
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

                {/* Title and Author */}
                <div className='text-center my-24'>
                    <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
                    
                      {data?.authorImg ? (
                              <Image
                                src={data.authorImg}
                                width={80}
                                height={80}
                                alt={data.author || "Author"}
                                className="rounded-full mx-auto"
                              />
                            ) : null}

                    <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
                </div>
            </div>

            {/* Blog Body */}
            <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
                  {data?.image ? (
                        <Image
                          src={data.image}
                          width={1280}
                          height={720}
                          alt="Blog image"
                          className="border-4 border-black"
                        />
                      ) : null}


                <h1 className='my-8 text-[26px] font-semibold'>Introduction:</h1>
                {/* <p className="my-3">{data.description}</p> */}
                <div className='blog-content' dangerouslySetInnerHTML={{__html:data.description}} >

                </div>

                {/* Sample Dummy Content */}
                <h3 className='my-5 text-[18px] font-semibold'>Step 1: Self-Reflection and Goal Setting</h3>
                <p className='my-3'>
                    Before you can manage your lifestyle, you must have a clear understanding of what you want to achieve...
                </p>

                {/* Conclusion and Socials */}
                <h3 className='my-5 text-[18px] font-semibold'>Conclusion:</h3>
                <p className='my-3'>
                    Lifestyle management is an ongoing process of improvement.
                </p>

                <div className="my-24">
                    <p className="text-black font-semibold mb-4">Share this article on Social Media</p>
                    <div className="flex items-center gap-4">
                        <Image src={assets.facebook_icon} width={50} height={50} alt="Facebook" />
                        <Image src={assets.twitter_icon} width={50} height={50} alt="Twitter" />
                        <Image src={assets.googleplus_icon} width={50} height={50} alt="Google Plus" />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    ) : null;
};

export default Page;
