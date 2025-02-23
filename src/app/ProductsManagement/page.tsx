"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import ProductList from "../components/ProductList/page";
import GetProductData from "@/sanity/sanity.query"; // Import function to fetch data

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await GetProductData(); // Fetch products from Sanity
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-700">Manage Products</h1>
      {products.length === 0 ? (
        <p className="w-full p-6 text-center text-gray-500">No Product Found.</p>
      ) : (
        <ProductList products={products} setProducts={setProducts} />
      )}
    </AdminLayout>
  );
}
