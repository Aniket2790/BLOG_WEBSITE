# 📝 Full Stack Blog Platform

A powerful and modern full-stack blog application built with **Next.js (App Router)** and **MongoDB**. It features dynamic blog creation, reading, deletion (CRUD), an admin dashboard, image uploads, and a subscription system.

---

## 📚 Project Overview

This blog platform allows both readers and administrators to interact with blog content. It supports:

- Creating blogs with images
- Viewing blog details dynamically via route
- Subscribing to blog updates via email
- Managing blogs and subscribers via an admin dashboard

---

## 📁 Project Structure

root
├── app/
│ ├── page.jsx # Home page with all blogs
│ ├── blogs/[id]/page.jsx # Dynamic blog detail page
│ └── admin/
│ └── blogList/page.jsx # Admin dashboard - list of blogs
├── components/
│ ├── Header.jsx # Includes subscription form
│ ├── Footer.jsx # Page footer
│ ├── BlogTableItem.jsx # Table rows for blogs in admin panel
│ └── SubsTableItem.jsx # Table rows for subscribers in admin panel
├── lib/
│ ├── config/db.js # MongoDB connection
│ └── models/
│ ├── BlogModel.js # Blog schema
│ └── EmailModel.js # Subscription schema
├── public/ # Blog image uploads
└── README.md

---

## 🔧 Technologies Used

### Frontend

- **Next.js (App Router)**
- **Tailwind CSS**
- **React Hooks**
- **React Toastify**

### Backend / API

- **Next.js API Routes**
- **MongoDB** with **Mongoose**

---

## 🚀 Key Features Breakdown

### 1. 📖 Blog Functionality

- Add blogs with title, description, author info, category, and image
- Blogs are submitted using `FormData` with image support
- Displayed with dynamic routing (e.g., `/blogs/[id]`)
- Blog description supports HTML rendering (`dangerouslySetInnerHTML`)

### 2. 🧑‍💻 Admin Dashboard

- View list of blogs
- Add new blog (with image)
- Delete blogs
- View and delete subscribers

### 3. 📬 Email Subscription

- Visitors can subscribe with email
- Saved in MongoDB
- Viewable/deletable by admin

### 4. 🖼️ Image Upload

- Uploaded images stored in `public/`
- Accessed via `/timestamp_filename.jpg`

---

## 📡 API Endpoints

### 🔹 Blog Routes

- `GET /api/blog` – Fetch all blogs
- `GET /api/blog?id=...` – Fetch blog by ID
- `POST /api/blog` – Create new blog

### 🔹 Email Subscription

- `POST /api/email` – Add subscriber
- `GET /api/email` – Get all subscribers

---

## 🌐 Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-username/blog-platform.git
cd blog-platform



2. Install Dependencies
bash
Copy
Edit
npm install
3. Configure Environment
Create .env.local:

ini
Copy
Edit
MONGODB_URI=your_mongodb_connection_string
4. Start the App
bash
Copy
Edit
npm run dev
📸 Screenshots to Add
✅ Homepage

✅ Blog Detail Page

✅ Admin Panel

✅ Add Blog Form

✅ Subscriber List

⚠️ Developer Notes
Ensure the public/ folder is writable

Always validate Image component src to avoid empty string warnings

Use MongoDB Atlas or local MongoDB for database connection

🙌 Contributing
Fork this repo and open a PR. Follow coding standards, especially modular Next.js structure.

📜 License
Licensed under the MIT License.

💬 Author
Developed by Aniket Tiwari.
```
