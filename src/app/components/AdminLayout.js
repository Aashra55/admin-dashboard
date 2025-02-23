"use client";

import { useState } from "react";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { FiUsers } from "react-icons/fi";
import { GoPackage } from "react-icons/go";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session } = useSession();

  const pathname = usePathname();

  const activeClasses = "bg-white text-blue-800";
  const defaultClasses = "hover:bg-white hover:text-blue-800";

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Close the sidebar on mobile when a link is clicked
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Welcome to the Admin Dashboard
          </h1>
          <button
            onClick={() => signIn("github")}
            className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12,0.5C5.373,0.5,0,5.873,0,12.5c0,5.292,3.438,9.787,8.205,11.387c0.6,0.111,0.82-0.261,0.82-0.58
                c0-0.285-0.011-1.04-0.016-2.041c-3.338,0.725-4.042-1.611-4.042-1.611c-0.546-1.387-1.333-1.757-1.333-1.757
                c-1.089-0.745,0.083-0.729,0.083-0.729c1.205,0.085,1.838,1.236,1.838,1.236c1.07,1.834,2.809,1.304,3.495,0.997
                c0.107-0.775,0.418-1.305,0.762-1.605c-2.665-0.305-5.467-1.332-5.467-5.931c0-1.312,0.469-2.382,1.236-3.221
                c-0.124-0.304-0.536-1.525,0.117-3.176c0,0,1.008-0.322,3.301,1.23c0.957-0.266,1.983-0.399,3.003-0.404
                c1.02,0.005,2.047,0.138,3.006,0.404c2.289-1.553,3.295-1.23,3.295-1.23c0.655,1.651,0.243,2.872,0.119,3.176
                c0.77,0.839,1.235,1.909,1.235,3.221c0,4.609-2.807,5.623-5.479,5.921c0.43,0.372,0.814,1.102,0.814,2.222
                c0,1.604-0.015,2.896-0.015,3.289c0,0.322,0.218,0.697,0.825,0.579C20.565,22.284,24,17.792,24,12.5
                C24,5.873,18.627,0.5,12,0.5z" />
            </svg>
            Sign in with GitHub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full lg:h-auto w-64 bg-blue-800 text-white p-4 transition-transform duration-300 ease-in-out z-50
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0`}
      >
        {/* Close Button for Mobile Screen*/}
        <div className="flex justify-end md:hidden">
          <button onClick={() => setSidebarOpen(false)} className="text-white">
            <AiOutlineClose size={24} />
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4 pl-2">Admin Panel</h2>
        <nav>
          <ul className="w-full p-2">
            <li
              className={`mb-2 p-2 rounded-lg flex items-center gap-2 pl-6 transition-all duration-300 w-full ${
                pathname === "/AdminDashboard" ? activeClasses : defaultClasses
              }`}
              onClick={handleLinkClick}
            >
              <RxDashboard />
              <Link href="/AdminDashboard">Dashboard</Link>
            </li>
            <li
              className={`mb-2 p-2 rounded-lg flex items-center gap-2 pl-6 transition-all duration-300 w-full ${
                pathname === "/UserManagement" ? activeClasses : defaultClasses
              }`}
              onClick={handleLinkClick}
            >
              <FiUsers />
              <Link href="/UserManagement">Users</Link>
            </li>
            <li
              className={`mb-2 p-2 rounded-lg flex items-center gap-2 pl-6 transition-all duration-300 w-full ${
                pathname === "/ProductsManagement"
                  ? activeClasses
                  : defaultClasses
              }`}
              onClick={handleLinkClick}
            >
              <GoPackage />
              <Link href="/ProductsManagement">Products</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="flex items-center justify-between p-4 bg-gray-100 md:hidden">
          <button onClick={toggleSidebar} className="text-blue-800">
            <HiOutlineMenuAlt3 size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-700">Admin Dashboard</h1>
        </header>
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}

