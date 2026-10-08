
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true, sparse: true },
  description: String,
  category: String,
  author: String,
  image: String,
  authorImg: String,
}, { timestamps: true });

//  Check if model already exists to avoid OverwriteModelError
const BlogModel = mongoose.models.blog || mongoose.model("blog", blogSchema);

export default BlogModel;
