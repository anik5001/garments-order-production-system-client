import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";
import { toast } from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

const categories = [
  "T-Shirt",
  "Hoodie",
  "Polo Shirt",
  "Denim",
  "Sportswear",
  "Kids Wear",
];

const paymentOptionsList = ["cash-on-delivery", "payfast"];

const AddProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ------------------ PRODUCT CREATE MUTATION ------------------
  const mutation = useMutation({
    mutationFn: async (product) => {
      const res = await axiosSecure.post("/products", product);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Product created successfully!");
      reset();
    },
    onError: () => toast.error("Failed to create product!"),
  });

  // ------------------ HANDLE IMAGE UPLOAD ------------------
  const handleImageUpload = async (images) => {
    setUploading(true);

    const imageUrls = [];

    for (let img of images) {
      const formData = new FormData();
      formData.append("image", img);

      const imageApi = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_HOST_key
      }`;

      const res = await axios.post(imageApi, formData);

      if (res.data?.data?.url) {
        imageUrls.push(res.data.data.url);
      }
    }

    setUploading(false);
    return imageUrls;
  };

  // ------------------ FORM SUBMIT ------------------
  const onSubmit = async (data) => {
    try {
      // 1. Upload images
      const selectedImages = data.images;
      const uploadedImages = await handleImageUpload(selectedImages);

      // 2. Create product object
      const productData = {
        productName: data.productName,
        description: data.description,
        category: data.category,
        price: Number(data.price),
        quantity: Number(data.quantity),
        minOrder: Number(data.minOrder),

        images: uploadedImages,
        video: data.video || "",

        paymentOptions: data.paymentOptions
          ? data.paymentOptions
          : ["cash-on-delivery"],

        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: user?.email,
      };

      // 3. Save to database
      mutation.mutate(productData);
    } catch (error) {
      toast.error("Image upload failed!");
      console.log(error);
    }
  };

  return (
    <section className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Product Name */}
        <div>
          <label className="font-semibold">Product Name</label>
          <input
            type="text"
            className="input input-bordered w-full mt-2"
            {...register("productName", {
              required: "Product name is required",
            })}
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            className="textarea textarea-bordered w-full mt-2"
            rows={4}
            {...register("description", {
              required: "Description is required",
            })}
          ></textarea>
        </div>

        {/* Category Select */}
        <div>
          <label className="font-semibold">Category</label>
          <select
            className="select select-bordered w-full mt-2"
            {...register("category", { required: "Select a category" })}
          >
            <option value="">Select Category</option>
            {categories.map((c, i) => (
              <option value={c} key={i}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="font-semibold">Price (৳)</label>
          <input
            type="number"
            className="input input-bordered w-full mt-2"
            {...register("price", { required: "Price is required" })}
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="font-semibold">Available Quantity</label>
          <input
            type="number"
            className="input input-bordered w-full mt-2"
            {...register("quantity", { required: "Quantity is required" })}
          />
        </div>

        {/* Min Order */}
        <div>
          <label className="font-semibold">Minimum Order</label>
          <input
            type="number"
            className="input input-bordered w-full mt-2"
            {...register("minOrder", { required: "Minimum order is required" })}
          />
        </div>

        {/* Images Upload */}
        <div>
          <label className="font-semibold">Product Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            className="file-input file-input-bordered w-full mt-2"
            {...register("images", {
              required: "Upload at least one image",
            })}
          />
          <p className="text-sm text-gray-500 mt-1">
            You can upload multiple images.
          </p>
        </div>

        {/* Video */}
        <div>
          <label className="font-semibold">Demo Video URL (optional)</label>
          <input
            type="text"
            className="input input-bordered w-full mt-2"
            placeholder="https://example.com/demo.mp4"
            {...register("video")}
          />
        </div>

        {/* Payment Options Select */}
        <div>
          <label className="font-semibold">Payment Options</label>

          <select
            multiple
            className="select select-bordered w-full mt-2 h-24"
            {...register("paymentOptions")}
          >
            {paymentOptionsList.map((p, i) => (
              <option key={i} value={p}>
                {p}
              </option>
            ))}
          </select>

          <p className="text-sm text-gray-500"></p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={mutation.isPending || uploading}
          className="btn btn-primary w-full mt-4"
        >
          {uploading
            ? "Uploading Images..."
            : mutation.isPending
            ? "Adding Product..."
            : "Add Product"}
        </button>
      </form>
    </section>
  );
};

export default AddProduct;
