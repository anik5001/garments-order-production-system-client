import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const BuyerOrderDataRow = ({ order }) => {
  const axiosSecure = useAxiosSecure();
  const { _id, productId, paymentMethod, orderPrice, orderQty, status } =
    order || {};

  const {
    data: product = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId], // Unique key per product
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/products/${productId}`);
        // console.log(res);
        return res.data;
      } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
      }
    },
    enabled: !!productId, // Only run query if id exists
    retry: 1, // Retry once if fails
  });
  console.log(product);
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="shrink-0">
            <div className="block relative">
              {_id}
              {/* <img
                alt="profile"
                src={image}
                className="mx-auto object-cover rounded h-10 w-15 "
              /> */}
            </div>
          </div>
        </div>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div>
          <img className="w-10 h-10" src={product.images} alt="" />
          <p className="text-gray-900">{product.productName}</p>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{orderQty}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{status}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{paymentMethod}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{orderPrice}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          // onClick={() => setIsOpen(true)}
          className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight"
        >
          <span className="absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full"></span>
          <span className="relative cursor-pointer">Cancel</span>
        </button>

        {/* <DeleteModal isOpen={isOpen} closeModal={closeModal} /> */}
      </td>
    </tr>
  );
};

export default BuyerOrderDataRow;
