'use client';
import { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { FiTrendingUp, FiUsers, FiBox, FiDollarSign, FiPlus, FiArrowUpRight, FiActivity, FiDownload, FiClock, FiShield } from "react-icons/fi";
import Link from "next/link";

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState("monthly");

  // Dynamic stats based on timeframe
  const statsData = {
    daily: { productsCount: 12, usersCount: 148, revenue: "$1,850", growth: "+8.4%" },
    weekly: { productsCount: 12, usersCount: 148, revenue: "$12,400", growth: "+12.1%" },
    monthly: { productsCount: 12, usersCount: 148, revenue: "$48,250", growth: "+14.2%" },
    yearly: { productsCount: 12, usersCount: 148, revenue: "$584,900", growth: "+32.8%" },
  };

  const currentStats = statsData[timeframe as keyof typeof statsData];

  const recentActivities = [
    { id: "1", action: "Product Added", detail: "Wireless Noise-Canceling Headphones", time: "2 mins ago", user: "Aashra Saleem", type: "product" },
    { id: "2", action: "User Invited", detail: "Marcus Vance (Product Manager)", time: "1 hour ago", user: "Aashra Saleem", type: "user" },
    { id: "3", action: "Security Audit", detail: "System vulnerability scan completed successfully", time: "3 hours ago", user: "System", type: "system" },
    { id: "4", action: "Inventory Export", detail: "Exported 12 items to CSV format", time: "5 hours ago", user: "Aashra Saleem", type: "export" },
  ];

  const recentProducts = [
    { id: "1", name: "Wireless Noise-Canceling Headphones", price: "$299.00", category: "Electronics", stock: "In Stock" },
    { id: "2", name: "Ergonomic Mechanical Keyboard", price: "$149.00", category: "Accessories", stock: "Low Stock" },
    { id: "3", name: "UltraWide 4K Gaming Monitor", price: "$699.00", category: "Displays", stock: "In Stock" },
    { id: "4", name: "Minimalist Leather Desk Pad", price: "$49.00", category: "Office", stock: "In Stock" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 text-white p-8 shadow-2xl">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
          <div className="absolute right-40 -top-20 w-48 h-48 rounded-full bg-violet-500/20 blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-200 backdrop-blur-md mb-3 border border-indigo-400/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Business Intelligence Active
              </span>
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">Welcome back, Aashra! 👋</h1>
              <p className="text-indigo-200 mt-2 text-sm lg:text-base max-w-xl">
                Real-time metrics, audit logs, and inventory controls are running seamlessly.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Timeframe Selector */}
              <div className="flex items-center bg-slate-900/60 p-1.5 rounded-2xl backdrop-blur-md border border-slate-700">
                {["daily", "weekly", "monthly", "yearly"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeframe(t)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                      timeframe === t ? "bg-indigo-600 text-white shadow-md" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <FiBox />
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                <FiTrendingUp /> {currentStats.growth}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500">Total Products</p>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{currentStats.productsCount}</p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <FiUsers />
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                <FiTrendingUp /> +24%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500">Active Users</p>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{currentStats.usersCount}</p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center text-2xl group-hover:bg-violet-600 group-hover:text-white transition-colors">
                <FiDollarSign />
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                <FiTrendingUp /> +18.4%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500">Revenue ({timeframe})</p>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{currentStats.revenue}</p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <FiActivity />
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                <FiShield /> 100%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500">System Security</p>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">Protected</p>
            </div>
          </div>
        </div>

        {/* Two Column Section: Recent Inventory & Live Audit Log */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Products */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Recent Inventory</h2>
                <p className="text-sm text-slate-500 mt-0.5">Top performing products in stock</p>
              </div>
              <Link
                href="/ProductsManagement"
                className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                View All <FiArrowUpRight size={16} />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4">Product Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm">
                  {recentProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4 font-semibold text-slate-800">{p.name}</td>
                      <td className="py-4 px-4 text-slate-500">{p.category}</td>
                      <td className="py-4 px-4 font-bold text-slate-900">{p.price}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          p.stock === "In Stock" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                        }`}>
                          {p.stock}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Audit Log */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Activity Audit Log</h2>
                  <p className="text-sm text-slate-500 mt-0.5">Real-time team & system trail</p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" title="Live stream active" />
              </div>

              <div className="space-y-4">
                {recentActivities.map((act) => (
                  <div key={act.id} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      <FiClock size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-800">{act.action}</p>
                        <span className="text-[10px] text-slate-400">{act.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 truncate mt-0.5">{act.detail}</p>
                      <p className="text-[10px] text-indigo-600 font-medium mt-1">By {act.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <span className="text-xs text-slate-400 font-medium">Encrypted Enterprise Audit Trail</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
