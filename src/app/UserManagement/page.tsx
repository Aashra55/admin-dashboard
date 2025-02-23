import AdminLayout from "../components/AdminLayout";
import {GetUserData} from "@/sanity/sanity.query";
import { FaUser, FaEnvelope, FaTrash } from "react-icons/fa";

interface User {
  _id: string;
  name: string;
  email: string;
}

export default async function Users() {
  const users = await GetUserData();
  return (
    <AdminLayout>
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Manage Users</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user: User) => (
            <div
              key={user._id}
              className="p-4 bg-gray-50 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <FaUser className="text-gray-500 text-3xl" />
                <div>
                  <h2 className="font-semibold text-gray-700">
                    {user.name || "Unknown"}
                  </h2>
                  <p className="text-gray-500 text-sm flex items-center">
                    <FaEnvelope className="mr-2" /> {user.email}
                  </p>
                </div>
              </div>
              <button className="mt-4 text-red-500 hover:text-red-700 flex items-center">
                <FaTrash className="mr-2" /> Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

