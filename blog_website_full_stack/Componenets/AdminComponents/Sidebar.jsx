"use client";



import { assets } from "@/Assets/assets";

import axios from "axios";

import Image from "next/image";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { toast } from "react-toastify";



const navItems = [

  { href: "/admin/addProduct", label: "Create blog", icon: assets.add_icon },

  { href: "/admin/blogList", label: "Blog list", icon: assets.blog_icon },

  { href: "/admin/subscription", label: "Subscriptions", icon: assets.email_icon },

];



const Sidebar = () => {
  const pathname = usePathname();



  const handleLogout = async () => {

    try {

      await axios.post("/api/auth/logout");

      toast.success("Logged out");

      window.location.href = "/admin/login";

    } catch {

      toast.error("Could not log out");

    }

  };



  return (

    <aside className="hidden md:flex flex-col w-72 min-h-screen bg-gradient-to-b from-slate-900 to-indigo-950 text-white shrink-0">

      <div className="px-6 py-6 border-b border-white/10">

        <Link href="/">

          <Image src={assets.logo_light} width={120} alt="Logo" className="opacity-95" />

        </Link>

        <p className="text-xs text-indigo-200/70 mt-3 font-medium">Content management</p>

      </div>



      <nav className="flex-1 p-4 space-y-2">

        {navItems.map((item) => {

          const active = pathname === item.href;

          return (

            <Link

              key={item.href}

              href={item.href}

              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${

                active

                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-900/40"

                  : "text-indigo-100/90 hover:bg-white/10"

              }`}

            >

              <Image src={item.icon} alt="" width={24} height={24} className="brightness-0 invert opacity-90" />

              {item.label}

            </Link>

          );

        })}

      </nav>



      <div className="p-4 border-t border-white/10">

        <button

          type="button"

          onClick={handleLogout}

          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-rose-200 hover:bg-rose-500/20 transition-colors"

        >

          <Image src={assets.profile_icon} alt="" width={24} height={24} />

          Log out

        </button>

      </div>

    </aside>

  );

};



export default Sidebar;

