import React from "react";
import { useNavigate } from "react-router";

const ManageProductTableRow = ({ product, onDelete }) => {
  const navigate = useNavigate();
  const { images, paymentOptions, productName, price, _id } = product;

  return (
    <tr>
      <td className="px-5 py-5 border-b bg-white">
        <div className="w-16 h-16">
          <img
            src={images[0] || "https://via.placeholder.com/100"}
            alt={productName}
            className="w-full h-full object-cover rounded"
          />
        </div>
      </td>
      <td className="px-5 py-5 border-b bg-white">{productName}</td>
      <td className="px-5 py-5 border-b bg-white">${price}</td>
      <td className="px-5 py-5 border-b bg-white">
        {paymentOptions.join(", ")}
      </td>
      <td className="px-5 py-5 border-b bg-white flex gap-2">
        <button
          onClick={() => navigate(`/dashboard/update-product/${_id}`)}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update
        </button>
        <button
          onClick={() => onDelete(_id)}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ManageProductTableRow;
