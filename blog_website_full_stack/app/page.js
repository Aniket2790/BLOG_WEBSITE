'use client'
import Header from "@/Componenets/Header";
import BlogList from "@/Componenets/BlogList";
import Footer from "@/Componenets/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <ToastContainer theme="dark" />
      <Header />
      <BlogList />
      <Footer />
    </div>
  );
}
