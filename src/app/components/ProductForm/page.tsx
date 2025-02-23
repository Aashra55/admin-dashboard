import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import sanityClient from "../../lib/sanity";
import imageUrlBuilder from "@sanity/image-url";
import client from "../../lib/sanity";
import Image from "next/image";

// Define a type for Sanity image assets
type ImageAsset = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
};

// Create the image URL builder
const builder = imageUrlBuilder(client);

// Define a helper function with an explicit type for the source parameter
function urlFor(source: ImageAsset): string {
  return builder.image(source).url();
}

export const AddProductForm = () => {
  // Set image as null initially because it will hold an asset reference object
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    image: null as null | {
      _type: "image";
      asset: { _ref: string; _type: "reference" };
    },
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.price ||
      !formData.description ||
      !formData.image
    ) {
      alert("Please fill out all fields and add an image.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Product added successfully!");
      setFormData({ name: "", price: 0, description: "", image: null });
    } else {
      alert("Failed to add product");
    }
    setLoading(false);
  };

  // onDrop: Upload the file to Sanity and set the image field to an asset reference.
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith("image/")) {
      try {
        // Upload the image file to Sanity's asset store.
        const asset = await sanityClient.assets.upload("image", file);
        // Set the image field to the proper asset reference format.
        setFormData((prev) => ({
          ...prev,
          image: {
            _type: "image",
            asset: {
              _ref: asset._id,
              _type: "reference",
            },
          },
        }));
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Image upload failed");
      }
    } else {
      alert("Only image files are allowed!");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-lg shadow-md m-4"
    >
      <input
        type="text"
        placeholder="Name"
        className="border p-2 rounded w-full mb-2"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        className="border p-2 rounded w-full mb-2"
        value={formData.price}
        onChange={(e) =>
          setFormData({ ...formData, price: Number(e.target.value) })
        }
      />
      <textarea
        placeholder="Description"
        className="border p-2 rounded w-full mb-2"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      {/* Drag & Drop Zone */}
      <div
        {...getRootProps()}
        className={`border-dashed border-2 p-4 rounded-lg cursor-pointer text-center m-2 ${
          isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the image here...</p>
        ) : (
          <p>Drag & drop an image here, or click to select one</p>
        )}
      </div>
      {formData.image && (
        <div className="mt-2 m-1 rounded-lg max-h-60 object-contain">
          {/* <p>Image asset uploaded: {formData.image.asset._ref}</p> */}
          <Image
            width={250}
            height={250}
            src={urlFor(formData.image)}
            alt="Preview"
            className="mt-2 m-1 rounded-lg max-h-60 object-contain"
          />
        </div>
      )}
      <button
        type="submit"
        className={`m-2 px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-blue-800 hover:bg-blue-900"
        }`}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};


