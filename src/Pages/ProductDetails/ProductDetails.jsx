import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../components/LoadingSpinner/Loading";
import { Link, useNavigate, useParams } from "react-router";
// Create or use a loading component

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Use the query hook properly
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id], // Unique key per product
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/products/${id}`);
        return res.data;
      } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
      }
    },
    enabled: !!id, // Only run query if id exists
    retry: 1, // Retry once if fails
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
        <p className="ml-4">Loading product details...</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Product Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Products
        </button>
      </div>
    );
  }

  // Handle case where product is null/undefined
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No product data available.</p>
      </div>
    );
  }

  // Destructure with default values to prevent errors
  const {
    productName = "Unnamed Product",
    description = "No description available",
    category = "Uncategorized",
    price = 0,
    quantity = 0,
    minOrder = 10,
    paymentOptions = ["cash-on-delivery"],
    images = [],
    video = "",
  } = product;

  // Get first image or placeholder
  const imageUrl = images?.[0] || "https://via.placeholder.com/400x300";

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
        >
          ← Back
        </button>

        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 grid lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img
                src={imageUrl}
                className="w-full h-96 object-cover rounded-lg"
                alt={productName}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x300";
                }}
              />
            </div>

            {/* Thumbnail gallery if multiple images */}
            {images?.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    className="w-20 h-20 object-cover rounded cursor-pointer"
                    alt={`${productName} ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className=" text-3xl font-bold mb-4">{productName}</h1>

            <div className="mb-6">
              <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                {category}
              </span>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-600 font-medium">Price:</span>
                <span className="text-2xl font-bold text-blue-600">
                  {price}৳
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-600 font-medium">
                  Available Quantity:
                </span>
                <span className="font-semibold">{quantity} units</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-600 font-medium">
                  Minimum Order:
                </span>
                <span className="font-semibold">{minOrder} units</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-600 font-medium">
                  Payment Options:
                </span>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(paymentOptions) ? (
                    paymentOptions.map((option, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded"
                      >
                        {option}
                      </span>
                    ))
                  ) : (
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                      {paymentOptions}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 max-w-full">
              <Link
                to={`/booking-product/${id}`}
                className="w-full btn bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Place Order
              </Link>

              {/* <button
                onClick={() => navigate("/contact")}
                className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Contact Supplier
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
