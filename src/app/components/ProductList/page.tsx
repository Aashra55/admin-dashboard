"use client";

import { useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GetProductData } from "@/sanity/sanity.query";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const ProductList = ({
  products,
  setProducts,
}: {
  products: Product[];
  setProducts: (data: Product[]) => void;
}) => {
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await GetProductData(); // Directly get JSON data
        setProducts(data); // Set products state correctly
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, [setProducts]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(products.filter((product) => product._id !== id));
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <ul className="mt-4 space-y-2">
        {products.length > 0 ? (
          products.map((product) => (
            <li
              key={product._id}
              className="border p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div className="text-gray-900">
                <strong>{product.name}</strong> - ${product.price}
              </div>
              <button
                className="hover:scale-105 transition-all duration-300
                bg-red-500 text-white px-2 py-1 rounded flex gap-2 items-center"
                onClick={() => {
                  handleDelete(product._id);
                  alert("Product deleted successfully!");
                }}
              >
                <RiDeleteBin6Line />
                <p>Delete</p>
              </button>
            </li>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </ul>
    </div>
  );
};

export default ProductList;
