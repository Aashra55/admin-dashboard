'use client';
import { useSession, signOut } from "next-auth/react";
import AdminLayout from "../components/AdminLayout";
import { AddProductForm } from "../components/ProductForm/page";
import { CgLogOut } from "react-icons/cg";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-gray-700">Welcome {session?.user?.name}!</h1>
      <AddProductForm/>
      <button className=" flex gap-1 items-center
      mt-4 px-4 py-2 bg-red-600 text-white mb-2 rounded-md hover:bg-red-700 transition-all duration-30" onClick={() => signOut()}>
        <CgLogOut className="text-xl"/>
        <p>Logout</p>
      </button>
    </AdminLayout>
  );
};


