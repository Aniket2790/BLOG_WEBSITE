import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const ADMIN_EMAIL = "tiwarianiket605@gmail.com";
const ADMIN_PASSWORD = "Blog@123";

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

const Admin =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema);

async function seedAdmin() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is missing. Add it to blog_website_full_stack/.env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
    const email = ADMIN_EMAIL.toLowerCase();

    const admin = await Admin.findOneAndUpdate(
      { email },
      { email, passwordHash, role: "admin" },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log("Admin seeded successfully:");
    console.log("  Email:", admin.email);
    console.log("  Role:", admin.role);
  } catch (error) {
    console.error("Failed to seed admin:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

seedAdmin();
