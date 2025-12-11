import React from "react";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const { _id, productName, category, price, quantity, images } = product;

  return (
    <div className="card bg-base-100 shadow-xl border p-3 hover:shadow-2xl transition-all duration-200 rounded-xl">
      <figure className="h-48 w-full overflow-hidden rounded-lg">
        <img
          src={images}
          alt={productName}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </figure>

      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold">{productName}</h2>

        <p className="text-sm text-gray-600">
          Category: <span className="font-medium">{category}</span>
        </p>

        <p className="text-sm text-gray-600">
          Price: <span className="font-bold text-blue-600">{price}৳</span>
        </p>

        <p className="text-sm text-gray-700">
          Available Qty: <span className="font-semibold">{quantity}</span>
        </p>

        <div className="card-actions mt-3">
          <Link to={`/products/${_id}`} className="btn btn-primary w-full">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
