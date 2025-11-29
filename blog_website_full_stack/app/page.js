'use client'
import Header from "@/Componenets/Header";
import BlogList from "@/Componenets/BlogList";
import Footer from "@/Componenets/Footer";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export default function Home() {
  return (
    <>
    <ToastContainer theme="dark" />
    <Header />
    <BlogList />
    <Footer />
    </>
  );
}
