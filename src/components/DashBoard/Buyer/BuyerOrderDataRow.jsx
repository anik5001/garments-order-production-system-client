import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import ViewOrderModal from "./ViewOrderModal";

const BuyerOrderDataRow = ({ order, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isViewOpen, setIsViewOpen] = useState(false);

  const {
    _id,
    productId,
    paymentMethod,
    orderPrice,
    orderQty,
    status,
    trackingHistory,
  } = order || {};

  // Fetch product details for image/name
  const { data: product = {}, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${productId}`);
      return res.data;
    },
    enabled: !!productId,
  });

  const handleCancel = async () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        await axiosSecure.patch(`/order/cancel/${_id}`);
        refetch(); // Refresh the table
      } catch (err) {
        console.error("Cancel failed", err);
      }
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs font-mono">
        {_id}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10 rounded shadow-sm object-cover"
            src={product?.images?.[0] || product?.images}
            alt={product?.productName}
          />
          <p className="text-gray-900 font-medium">
            {product?.productName || "Loading..."}
          </p>
        </div>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
        {orderQty}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
        <span
          className={`badge badge-sm font-semibold uppercase ${
            status === "pending"
              ? "badge-warning"
              : status === "approved"
              ? "badge-success text-white"
              : "badge-ghost"
          }`}
        >
          {status}
        </span>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
        <p className="text-gray-900 uppercase">{paymentMethod}</p>
        <p className="font-bold">৳{orderPrice}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center gap-2">
          {/* View Button */}
          <button
            onClick={() => setIsViewOpen(true)}
            className="btn btn-xs btn-outline btn-primary"
          >
            View
          </button>

          {/* Cancel Button - Only visible if Pending */}
          {status?.toLowerCase() === "pending" && (
            <button
              onClick={handleCancel}
              className="btn btn-xs btn-error btn-outline"
            >
              Cancel
            </button>
          )}
        </div>

        {/* Modal for details and tracking */}
        <ViewOrderModal
          isOpen={isViewOpen}
          closeModal={() => setIsViewOpen(false)}
          order={order}
          product={product}
        />
      </td>
    </tr>
  );
};

export default BuyerOrderDataRow;
