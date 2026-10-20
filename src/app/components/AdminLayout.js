"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { FiUsers, FiSettings, FiBell, FiSearch, FiLogOut, FiUser, FiCheck } from "react-icons/fi";
import { GoPackage } from "react-icons/go";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const pathname = usePathname();

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeClasses = "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25";
  const defaultClasses = "text-slate-300 hover:bg-slate-800/60 hover:text-white";

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          <FiCheck size={20} />
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar - Full Viewport Height */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 bg-slate-900 text-slate-100 p-6 transition-transform duration-300 ease-in-out z-50 flex flex-col justify-between border-r border-slate-800 shadow-2xl sticky top-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0`}
      >
        <div>
          {/* Logo & Close */}
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/30 text-xl">
                A
              </div>
              <div>
                <h1 className="font-extrabold text-base tracking-tight text-white">Admin Dashboard</h1>
                <span className="text-xs text-indigo-400 font-medium">Enterprise Suite</span>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-slate-400 hover:text-white md:hidden p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <AiOutlineClose size={22} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase px-3 mb-3">
              Core Modules
            </p>
            <Link
              href="/AdminDashboard"
              onClick={handleLinkClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group ${
                pathname === "/AdminDashboard" ? activeClasses : defaultClasses
              }`}
            >
              <RxDashboard className={`text-xl transition-transform group-hover:scale-110 ${pathname === "/AdminDashboard" ? "text-white" : "text-indigo-400"}`} />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/ProductsManagement"
              onClick={handleLinkClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group ${
                pathname === "/ProductsManagement" ? activeClasses : defaultClasses
              }`}
            >
              <GoPackage className={`text-xl transition-transform group-hover:scale-110 ${pathname === "/ProductsManagement" ? "text-white" : "text-violet-400"}`} />
              <span>Products</span>
              <span className="ml-auto text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-semibold border border-indigo-500/30">Live</span>
            </Link>

            <Link
              href="/UserManagement"
              onClick={handleLinkClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group ${
                pathname === "/UserManagement" ? activeClasses : defaultClasses
              }`}
            >
              <FiUsers className={`text-xl transition-transform group-hover:scale-110 ${pathname === "/UserManagement" ? "text-white" : "text-emerald-400"}`} />
              <span>Users</span>
            </Link>
          </nav>
        </div>

        {/* User Profile Card Footer */}
        <div className="pt-6 border-t border-slate-800/80">
          <div
            onClick={() => {
              setProfileModalOpen(true);
            }}
            className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-all cursor-pointer group"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
              alt="Admin avatar"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/50 group-hover:ring-indigo-400 transition-all"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Aashra Saleem</p>
              <p className="text-xs text-slate-400 truncate">View Profile</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Online" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="text-slate-600 hover:text-slate-900 md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <HiOutlineMenuAlt3 size={24} />
            </button>
            <div className="relative hidden sm:block w-72">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search products, users..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100/80 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <FiBell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full animate-ping" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="font-semibold text-slate-800 text-sm">Notifications</h3>
                    <span className="text-[10px] bg-indigo-50 text-indigo-600 font-semibold px-2 py-0.5 rounded-full">3 New</span>
                  </div>
                  <div className="divide-y divide-slate-50 mt-2 max-h-64 overflow-y-auto">
                    <div className="py-2.5 hover:bg-slate-50 px-2 rounded-xl transition-colors cursor-pointer">
                      <p className="text-xs font-medium text-slate-800">New product added successfully</p>
                      <span className="text-[10px] text-slate-400">2 mins ago</span>
                    </div>
                    <div className="py-2.5 hover:bg-slate-50 px-2 rounded-xl transition-colors cursor-pointer">
                      <p className="text-xs font-medium text-slate-800">User database synchronized</p>
                      <span className="text-[10px] text-slate-400">1 hour ago</span>
                    </div>
                    <div className="py-2.5 hover:bg-slate-50 px-2 rounded-xl transition-colors cursor-pointer">
                      <p className="text-xs font-medium text-slate-800">Security audit passed</p>
                      <span className="text-[10px] text-slate-400">5 hours ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-slate-200 mx-1" />

            {/* Interactive Top Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-3 cursor-pointer p-1.5 rounded-xl hover:bg-slate-100 transition-all select-none"
              >
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold text-slate-800 leading-none">Aashra Saleem</p>
                  <p className="text-xs text-indigo-600 font-medium mt-1">Administrator</p>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20 shadow-sm"
                />
              </div>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-3 border-b border-slate-100">
                    <p className="font-bold text-slate-900 text-sm">Aashra Saleem</p>
                    <p className="text-xs text-slate-500 mt-0.5">sarah@nexusadmin.io</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        setProfileModalOpen(true);
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                    >
                      <FiUser size={15} className="text-indigo-600" /> View Profile Details
                    </button>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        showToast("Settings panel opened");
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                    >
                      <FiSettings size={15} className="text-slate-500" /> Account Settings
                    </button>
                  </div>
                  <div className="pt-1 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        showToast("Demo session refreshed successfully");
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors"
                    >
                      <FiLogOut size={15} /> Lock Session / Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Profile Modal */}
        {profileModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-md p-6 lg:p-8 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Administrator Profile</h2>
                <button
                  onClick={() => setProfileModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces"
                  alt="Aashra Saleem"
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-indigo-500/20 shadow-lg mb-4"
                />
                <h3 className="text-lg font-bold text-slate-900">Aashra Saleem</h3>
                <p className="text-sm text-indigo-600 font-medium">Lead Enterprise Administrator</p>
                <p className="text-xs text-slate-500 mt-1">sarah@nexusadmin.io • San Francisco, CA</p>
              </div>

              <div className="py-4 space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500">Role</span>
                  <span className="font-semibold text-slate-800">Super Admin</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500">Access Level</span>
                  <span className="font-semibold text-indigo-600">Full Control</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500">Last Active</span>
                  <span className="font-semibold text-slate-800">Just Now</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setProfileModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-lg shadow-indigo-500/25 text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
