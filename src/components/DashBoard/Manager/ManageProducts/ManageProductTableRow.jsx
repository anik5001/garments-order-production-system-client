import React from "react";
import { useNavigate } from "react-router";

const ManageProductTableRow = ({ product, handleDelete }) => {
  const navigate = useNavigate();
  const { images, paymentOptions, productName, price, _id } = product;

  return (
    <tr>
      <td className="  bg-white">
        <div className="w-16 h-16">
          <img
            src={images[0] || "https://via.placeholder.com/100"}
            alt={productName}
            className="w-full h-full object-cover rounded"
          />
        </div>
      </td>
      <td className=" bg-white">{productName}</td>
      <td className=" bg-white">${price}</td>
      <td className=" bg-white">{paymentOptions.join(", ")}</td>
      <td className=" bg-white flex gap-2 ">
        <button
          onClick={() => navigate(`/dashboard/update-product/${_id}`)}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
        >
          Update
        </button>
        <button
          onClick={() => handleDelete(_id)}
          className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer hover:bg-red-700"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ManageProductTableRow;
