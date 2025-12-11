import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const AddProduct = () => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ------------------ TANSTACK MUTATION ------------------
  const mutation = useMutation({
    mutationFn: async (newProduct) => {
      const res = await axiosSecure.post("/products", newProduct);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Product added successfully!");
      reset();
    },
    onError: () => {
      toast.error("Failed to add product!");
    },
  });

  // ------------------ FORM SUBMIT ------------------
  const onSubmit = (data) => {
    const productData = {
      productName: data.productName,
      description: data.description,
      category: data.category,
      price: Number(data.price),
      quantity: Number(data.quantity),
      minOrder: Number(data.minOrder),

      // Convert comma-separated images into array
      images: data.images.split(",").map((img) => img.trim()),

      video: data.video || "",

      paymentOptions: data.paymentOptions
        ? data.paymentOptions.split(",").map((p) => p.trim())
        : ["cash-on-delivery"],

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mutation.mutate(productData);
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
          {errors.productName && (
            <p className="text-red-500 text-sm">{errors.productName.message}</p>
          )}
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
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="font-semibold">Category</label>
          <input
            type="text"
            placeholder="T-Shirt / Hoodie / Denim"
            className="input input-bordered w-full mt-2"
            {...register("category", { required: "Category is required" })}
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
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
            {...register("minOrder", { required: "Min order is required" })}
          />
        </div>

        {/* Images */}
        <div>
          <label className="font-semibold">Product Images</label>
          <input
            type="text"
            placeholder="Comma separated image URLs"
            className="input input-bordered w-full mt-2"
            {...register("images", {
              required: "At least one image URL is required",
            })}
          />
          <p className="text-gray-500 text-sm">
            Example: https://img1.jpg, https://img2.jpg
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

        {/* Payment Options */}
        <div>
          <label className="font-semibold">Payment Options</label>
          <input
            type="text"
            placeholder="cash-on-delivery, payfast"
            className="input input-bordered w-full mt-2"
            {...register("paymentOptions")}
          />
          <p className="text-gray-500 text-sm">
            If empty → default = cash-on-delivery
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </section>
  );
};

export default AddProduct;
