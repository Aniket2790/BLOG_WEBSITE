// import mongoose from "mongoose";

// export const ConnectDB = async () => {

//         await mongoose.connect('mongodb+srv://Blog:abhi123@cluster0.wsxufek.mongodb.net/Blog');
//         console.log("DB Connected");

// }

import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGODB_URI;
    if (!MONGO_URI) {
      throw new Error(" MONGODB_URI not found in .env");
    }

    await mongoose.connect(MONGO_URI);
    console.log("Local MongoDB Connected");
  } catch (error) {
    console.error(" DB Connection Error:", error);
  }
};
