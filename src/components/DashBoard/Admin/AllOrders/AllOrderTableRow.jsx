import React from "react";
import { Link } from "react-router";

const AllOrderTableRow = ({ order }) => {
  const { _id, customerName, productName, orderPrice, orderQty, status } =
    order || {};
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
        {customerName}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{productName}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{orderQty}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">${orderPrice}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{status}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          // onClick={() => setIsOpen(true)}
          className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight"
        >
          <Link
            to={`/dashboard/order-details/${order._id}`}
            className=" btn relative cursor-pointer"
          >
            View Details
          </Link>
        </button>
      </td>
    </tr>
  );
};

export default AllOrderTableRow;
