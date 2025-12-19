import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  FaBox,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCreditCard,
  FaCalendarAlt,
  FaStickyNote,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../components/LoadingSpinner/Loading";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Use the query hook properly
  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order-details", id], // Unique key per product
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/order-details/${id}`);
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
  const {
    productId,
    productName,
    userEmail,
    customerName,
    unitPrice,
    orderQty,
    orderPrice,
    transactionId,
    paymentMethod,
    phone,
    address,
    notes,
    status,
    createdAt,
  } = order;

  // Helper for status badge colors
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "badge-success text-white";
      case "pending":
        return "badge-warning";
      case "shipped":
        return "badge-info text-white";
      case "cancelled":
        return "badge-error text-white";
      default:
        return "badge-ghost";
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-4 md:p-8 bg-base-100 shadow-2xl rounded-2xl border border-base-200">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-6 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-primary flex items-center gap-2">
            <FaBox /> Order Details
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Transaction ID:{" "}
            <span className="font-mono font-medium">{transactionId}</span>
          </p>
        </div>
        <div
          className={`badge badge-lg p-4 font-bold uppercase tracking-wider ${getStatusClass(
            status
          )}`}
        >
          {status}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Customer Information */}
        <div className="card bg-base-200 p-5 rounded-xl">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-gray-300 pb-2">
            <FaUser className="text-secondary" /> Customer Info
          </h3>
          <div className="space-y-3">
            <p className="flex justify-between font-medium">
              <span>Name:</span>{" "}
              <span className="text-gray-700">{customerName}</span>
            </p>
            <p className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-2">
                <FaEnvelope /> Email:
              </span>
              <span className="text-blue-600 underline">{userEmail}</span>
            </p>
            <p className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-2">
                <FaPhone /> Phone:
              </span>
              <span>{phone}</span>
            </p>
            <p className="flex justify-between items-start text-sm">
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt /> Address:
              </span>
              <span className="text-right max-w-[150px]">{address}</span>
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="card bg-base-200 p-5 rounded-xl text-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-gray-300 pb-2">
            <FaCreditCard className="text-accent" /> Order Summary
          </h3>
          <div className="space-y-3">
            <p className="flex justify-between font-bold text-base">
              <span>Product:</span>{" "}
              <span className="text-primary">{productName}</span>
            </p>
            <p className="flex justify-between italic text-gray-400">
              <span>Product ID:</span> <span>{productId}</span>
            </p>
            <p className="flex justify-between border-t pt-2">
              <span>Unit Price:</span> <span>৳{unitPrice}</span>
            </p>
            <p className="flex justify-between">
              <span>Quantity:</span>{" "}
              <span className="badge badge-outline">{orderQty} Pcs</span>
            </p>
            <p className="flex justify-between font-bold text-lg text-success pt-2 border-t border-dashed border-gray-400">
              <span>Total Price:</span> <span>৳{orderPrice}</span>
            </p>
          </div>
        </div>

        {/* Payment & Date */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="p-3 bg-info/10 text-info rounded-full">
              <FaCreditCard size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">
                Payment Method
              </p>
              <p className="font-semibold">{paymentMethod}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="p-3 bg-secondary/10 text-secondary rounded-full">
              <FaCalendarAlt size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">
                Order Date
              </p>
              <p className="font-semibold">
                {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="p-3 bg-warning/10 text-warning rounded-full">
              <FaStickyNote size={20} />
            </div>
            <div className="w-full">
              <p className="text-xs text-gray-400 uppercase font-bold">Notes</p>
              <p className="font-medium italic truncate w-32">
                {notes || "No notes"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="mt-10 flex flex-wrap gap-4 justify-end border-t pt-6">
        <button className="btn btn-outline btn-sm">Download Invoice</button>
        <button className="btn btn-primary btn-sm">Update Status</button>
      </div>
    </div>
  );
};

export default OrderDetails;
