import Sidebar from "@/Componenets/AdminComponents/Sidebar";
import Link from "next/link";

export default function PanelLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <header className="sticky top-0 z-20 flex items-center justify-between px-5 sm:px-8 py-4 bg-white/80 backdrop-blur border-b border-slate-200">
          <div>
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
              Admin
            </p>
            <h2 className="text-lg font-bold text-slate-900">Blog dashboard</h2>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              View site
            </Link>
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 ring-2 ring-white shadow" />
          </div>
        </header>

        {/* Mobile nav */}
        <div className="md:hidden flex gap-2 overflow-x-auto px-4 py-3 bg-white border-b border-slate-200 scrollbar-hide">
          <Link href="/admin/blogList" className="shrink-0 px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium">
            Blogs
          </Link>
          <Link href="/admin/addProduct" className="shrink-0 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">
            Create
          </Link>
          <Link href="/admin/subscription" className="shrink-0 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">
            Subscribers
          </Link>
        </div>

        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
