import React from "react";
import { Link, useNavigate } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const PendingOrderTableRow = ({ order }) => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    _id,
    customerName,
    productName,
    orderPrice,
    orderQty,

    createdAt,
  } = order || {};

  const updatedOrderStatus = (id, status) => {
    const updatedInfo = { status: status, approvedAt: new Date() };
    axiosSecure.patch(`/order-update/${id}`, updatedInfo).then((res) => {
      if (res.data.modifiedCount) {
        toast.success(`${status} Successful`);
      }
    });
  };
  const orderApprovedHandle = (id) => {
    updatedOrderStatus(id, "Approved");
  };
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
        <p className="text-gray-900">{createdAt}</p>
      </td>

      <td className=" border-gray-200 bg-white text-sm">
        <button
          // onClick={() => setIsOpen(true)}
          className="relative   disabled:cursor-not-allowed cursor-pointer inline-block px-1 py-1 font-semibold text-lime-900 leading-tight"
        >
          <span
            onClick={() => {
              orderApprovedHandle(_id);
            }}
            className="btn btn-primary relative cursor-pointer"
          >
            Approve
          </span>
          <span className="btn btn-secondary relative cursor-pointer">
            Reject
          </span>
          <Link
            to={`/dashboard/order-details/${_id}`}
            className="btn relative cursor-pointer"
          >
            View{" "}
          </Link>
        </button>
      </td>
    </tr>
  );
};

export default PendingOrderTableRow;
