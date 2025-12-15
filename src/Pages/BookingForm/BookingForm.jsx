import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";

const BookingForm = () => {
  const { user } = useAuth();
  const { id } = useParams(); // product ID from URL
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  // const [product, setProduct] = useState(null);
  // const [user, setUser] = useState(null); // logged-in user info
  const [orderQty, setOrderQty] = useState(0);
  const [orderPrice, setOrderPrice] = useState(0);

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
  console.log(product);
  if (!product) return <div className="p-10 text-center">Loading...</div>;

  // role check (Admin/Manager cannot book)
  // if (user?.role === "admin" || user?.role === "manager") {
  //   return (
  //     <div className="text-center p-10 text-red-500 text-xl font-semibold">
  //       Admin or Manager cannot place an order.
  //     </div>
  //   );
  // }

  const handleQuantityChange = (qty) => {
    setOrderQty(qty);

    if (qty >= product.minOrder && qty <= product.quantity) {
      setOrderPrice(qty * product.price);
    } else {
      setOrderPrice(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingInfo = {
      userEmail: user.email,
      productId: product._id,
      productName: product.productName,
      unitPrice: product.price,
      orderQty,
      orderPrice,
      paymentMethod: e.target.paymentMethod.value,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      notes: e.target.notes.value,
      status: "pending",
      createdAt: new Date(),
    };
    console.log(bookingInfo);
    // Payment Logic
    if (bookingInfo.paymentMethod === "payfast") {
      const { data } = await axios.post(
        "http://localhost:3000/create-checkout-session",
        bookingInfo
      );
      window.location.href = data.url;
      // console.log(data.url);
      // navigate("/payment"); // redirect to payment
      return;
    }

    // Cash on Delivery → save directly
    fetch("http://localhost:3000/order-booking", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(bookingInfo),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Booking placed successfully!");
        // navigate("/dashboard/my-orders");
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-200 rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Order / Booking Form</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="font-semibold">Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Product Title */}
        <div>
          <label className="font-semibold">Product Title</label>
          <input
            type="text"
            value={product.productName}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Price */}
        <div>
          <label className="font-semibold">Price (per unit)</label>
          <input
            type="text"
            value={`${product.price}৳`}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="font-semibold">
            Order Quantity (Min {product.minOrder}, Max {product.quantity})
          </label>
          <input
            type="number"
            min={product.minOrder}
            max={product.quantity}
            className="input input-bordered w-full"
            value={orderQty}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
            required
          />
          {orderQty < product.minOrder && (
            <p className="text-red-500 text-sm">
              Quantity cannot be less than minimum order.
            </p>
          )}
          {orderQty > product.quantity && (
            <p className="text-red-500 text-sm">
              Quantity cannot exceed available stock.
            </p>
          )}
        </div>

        {/* Total Price */}
        <div>
          <label className="font-semibold">Total Price</label>
          <input
            type="text"
            value={orderPrice > 0 ? `${orderPrice}৳` : "Invalid Quantity"}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* First Name */}
        <div>
          <label className="font-semibold">First Name</label>
          <input
            type="text"
            name="firstName"
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="font-semibold">Last Name</label>
          <input
            type="text"
            name="lastName"
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="font-semibold">Contact Number</label>
          <input
            type="text"
            name="phone"
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Address */}
        <div>
          <label className="font-semibold">Delivery Address</label>
          <textarea
            name="address"
            required
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        {/* Notes */}
        <div>
          <label className="font-semibold">Additional Notes</label>
          <textarea
            name="notes"
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        {/* Payment Method */}
        <div>
          <label className="font-semibold">Payment Method</label>
          <select
            name="paymentMethod"
            className="select select-bordered w-full"
            required
          >
            {product.paymentOptions.includes("cash-on-delivery") && (
              <option value="cash-on-delivery">Cash on Delivery</option>
            )}
            {product.paymentOptions.includes("payfast") && (
              <option value="payfast">PayFast (Online Payment)</option>
            )}
          </select>
        </div>

        {/* Submit */}
        <button className="btn btn-primary w-full text-lg">Place Order</button>
      </form>
    </div>
  );
};

export default BookingForm;
