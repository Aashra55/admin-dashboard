"use client";

import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { FiUsers, FiMail, FiTrash2, FiPlus, FiSearch, FiShield, FiCheck } from "react-icons/fi";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

const initialUsers: User[] = [
  {
    id: "1",
    name: "Sarah Jenkins",
    email: "sarah@nexusadmin.io",
    role: "Administrator",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
  },
  {
    id: "2",
    name: "Marcus Vance",
    email: "marcus@nexusadmin.io",
    role: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
  },
  {
    id: "3",
    name: "Elena Rostova",
    email: "elena@nexusadmin.io",
    role: "UI/UX Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
  },
];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Member",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces"
  });

  useEffect(() => {
    const saved = localStorage.getItem("nexus_users");
    if (saved) {
      try {
        setUsers(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveUsers = (newUsers: User[]) => {
    setUsers(newUsers);
    localStorage.setItem("nexus_users", JSON.stringify(newUsers));
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newUser: User = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      avatar: formData.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces"
    };

    saveUsers([newUser, ...users]);
    setFormData({ name: "", email: "", role: "Member", avatar: "" });
    setIsModalOpen(false);

    setSuccessToast("User added successfully!");
    setTimeout(() => setSuccessToast(""), 3000);
  };

  const handleDelete = (id: string) => {
    const updated = users.filter((u) => u.id !== id);
    saveUsers(updated);
    setSuccessToast("User removed successfully.");
    setTimeout(() => setSuccessToast(""), 3000);
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {successToast && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
            <FiCheck size={20} />
            <span className="font-semibold text-sm">{successToast}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">User Directory</h1>
            <p className="text-slate-500 text-sm mt-1">Manage team members, permissions, and access controls.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-200"
          >
            <FiPlus size={18} /> Invite New User
          </button>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white transition-all"
            />
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-2 rounded-xl hidden sm:block">
            Total Members: {filteredUsers.length}
          </span>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
              <FiUsers />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No users found</h3>
            <p className="text-slate-500 text-sm mt-1">Try a different search query or invite a new member.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-4 ring-slate-100 group-hover:ring-emerald-500/30 transition-all shadow-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 text-base truncate group-hover:text-emerald-600 transition-colors">
                      {user.name}
                    </h3>
                    <p className="text-slate-500 text-xs truncate flex items-center gap-1.5 mt-1">
                      <FiMail size={12} className="text-slate-400" /> {user.email}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                      <FiShield size={10} className="text-emerald-600" /> {user.role}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200"
                    title="Remove User"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-md p-6 lg:p-8 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Invite New User</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@nexusadmin.io"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  >
                    <option value="Administrator">Administrator</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="Member">Member</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-lg shadow-emerald-500/25 text-sm"
                  >
                    Send Invite
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
