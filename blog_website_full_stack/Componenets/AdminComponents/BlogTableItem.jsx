import React from "react";
import { assets } from "@/Assets/assets";
import Image from "next/image";

const BlogTableItem = ({authorImg, title, author, date, deleteBlog, mongoId}) => {
    const BlogDate = new Date(date);
    return (
        <tr className="bg-white border-b">
            <th scope="row" className="items-center gap-3 hidden sm:flex px-6 py-4 font font-medium text-gray-900 whitespace-nowrap">
                <Image width={40} height={40} src={authorImg?authorImg:assets.profile_icon} alt="" />
                <p className="text-xl">{author?author:"No Author"}</p>
            </th>
            <td className="px-6 py-4">
                {title?title:"no title"}
            </td>
            <td className="px-6 py-4">
                    {BlogDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>

            {/* <td className="px-6 py-4 hover:text-red-800 transition duration-200 text-xl cursor-pointer">
                ❌
            </td> */}
            <td onClick = {() => deleteBlog(mongoId)} className="px-6 py-4">
                    <button
                        title="Delete Blog"
                        className="text-red-600 hover:text-red-800 transition duration-200 text-xl cursor-pointer"
                    >
                        ❌
                    </button>
                    </td>


        </tr>

        
    )
}

export default BlogTableItem