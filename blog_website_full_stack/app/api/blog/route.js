import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModels";
import {writeFile} from 'fs/promises';
import { NextResponse } from "next/server";
import path from "path";

const fs = require('fs')


// // const { NextResponse } = require("next/server");

// const LoadDB = async () => {
//     await ConnectDB();
// }

// LoadDB();



// // API Endpoint to get all Blogs
// export async function GET(request) {

//     try {
//         const blogs = await BlogModel.find().sort({ createdAt: -1 }); // newest first

//         return NextResponse.json({ success: true, blogs });
//     } catch (error) {
//         console.error("Error fetching blogs:", error);
//         return NextResponse.json({ success: false, message: "Failed to fetch blogs" }, { status: 500 });
//     }
// }



// // API Endpoint for Uploding Blogs
// export async function POST(request){
//     const formData = await request.formData();
//     const timestamp = Date.now();

//     const image = formData.get('image');

//     const imageByteData = await image.arrayBuffer();
//     const buffer = Buffer.from(imageByteData);
//     const path = `./public/${timestamp}_${image.name}`;
//     await writeFile(path,buffer);

//     const imgUrl = `/${timestamp}_${image.name}`
    
//     const blogData = {
//         title: `${formData.get("title")}`,
//         description: `${formData.get('description')}`,
//         category:`${formData.get('category')}`,
//         author:`${formData.get('author')}`,
//         image:`${imgUrl}`,
//         authorImg:`${formData.get('authorImg')}`
//     }

//     await BlogModel.create(blogData);
//     console.log("Blog Saved");

//     return NextResponse.json({success:true,msg:"Blog Added"})

// }



// GET all blogs or a single blog by ID
export async function GET(request) {
  try {
    await ConnectDB(); // Always connect first

    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get("id");

    // Case 1: Get a single blog by ID
    if (blogId) {
      const blog = await BlogModel.findById(blogId);

      if (!blog) {
        return NextResponse.json(
          { success: false, message: "Blog not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, blog });
    }

    // Case 2: Get all blogs
    const blogs = await BlogModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, blogs });

  } catch (error) {
    console.error("Error fetching blog(s):", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch blog(s)" },
      { status: 500 }
    );
  }
}

// POST new blog
export async function POST(request) {
    await ConnectDB(); // ✅ move connection inside handler

    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);

    const fileName = `${timestamp}_${image.name}`;
    const savePath = path.join(process.cwd(), "public", fileName);
    await writeFile(savePath, buffer);

    const imgUrl = `/${fileName}`;

    const blogData = {
        title: formData.get("title"),
        description: formData.get('description'),
        category: formData.get('category'),
        author: formData.get('author'),
        image: imgUrl,
        authorImg: formData.get('authorImg'),
    };

    await BlogModel.create(blogData);
    console.log("✅ Blog Saved");

    return NextResponse.json({ success: true, msg: "Blog Added" });
}



// ceating API Endpoint to delete Blog

export async function DELETE(request){
  const id = await request.nextUrl.searchParams.get('id');
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`, () => {})
  await BlogModel.findByIdAndDelete(id);

  return NextResponse.json({msg:"Blog Deleted"})

}