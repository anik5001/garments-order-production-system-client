import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import AllOrderTableRow from "./AllOrderTableRow";

const AllOrders = () => {
  const axiosSecure = useAxiosSecure();
  // 1. Add state for filtering
  const [filterStatus, setFilterStatus] = useState("All");

  const { data: orderProducts = [], isLoading } = useQuery({
    queryKey: ["booking-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-booking");
      return res.data;
    },
  });

  // 2. Filter logic
  const filteredOrders = orderProducts.filter((order) => {
    if (filterStatus === "All") return true;
    return order.status?.toLowerCase() === filterStatus.toLowerCase();
  });

  if (isLoading) {
    return (
      <div className="py-16 text-center text-gray-500 text-lg">
        <span className="loading loading-spinner loading-lg"></span>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        {/* --- Filter Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold leading-tight">
            Order Management
          </h2>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-600">
              Filter by Status:
            </span>
            <select
              className="select select-bordered select-sm w-full max-w-xs"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Orders</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                    Order ID
                  </th>
                  <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                    Customer
                  </th>
                  <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                    Product
                  </th>
                  <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                    Qty
                  </th>
                  <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                    Price
                  </th>
                  <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                    Status
                  </th>
                  <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <AllOrderTableRow key={order._id} order={order} />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-5 py-10 bg-white text-center text-gray-500"
                    >
                      No orders found with status "{filterStatus}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
