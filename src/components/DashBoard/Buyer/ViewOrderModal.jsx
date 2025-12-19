import React from "react";

const ViewOrderModal = ({ isOpen, closeModal, order, product }) => {
  if (!isOpen) return null;

  const history = order.trackingHistory || [];

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-3xl">
        <div className="flex justify-between items-start border-b pb-4 mb-4">
          <h3 className="font-bold text-xl">Order Details</h3>
          <button
            className="btn btn-sm btn-circle btn-ghost"
            onClick={closeModal}
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Order Info */}
          <div className="space-y-2">
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>Item:</strong> {product.productName}
            </p>
            <p>
              <strong>Quantity:</strong> {order.orderQty}
            </p>
            <p>
              <strong>Total Price:</strong> ৳{order.orderPrice}
            </p>
            <p>
              <strong>Payment:</strong> {order.paymentMethod}
            </p>
          </div>
          {/* Status info */}
          <div className="bg-base-200 p-4 rounded-lg">
            <p className="text-sm font-bold uppercase text-gray-500">
              Current Status
            </p>
            <p className="text-2xl font-black text-primary">{order.status}</p>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="mt-6">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            Tracking Timeline
          </h4>

          {history.length > 0 ? (
            <ul className="timeline timeline-vertical timeline-compact">
              {history.map((step, idx) => (
                <li key={idx}>
                  <hr className={idx !== 0 ? "bg-primary" : ""} />
                  <div className="timeline-middle text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4.137-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="timeline-end mb-10 pl-4">
                    <time className="font-mono italic text-xs text-gray-500">
                      {new Date(step.updatedAt).toLocaleString()}
                    </time>
                    <div className="text-md font-bold text-gray-800">
                      {step.status}
                    </div>
                    <p className="text-sm text-gray-600">{step.location}</p>
                    {step.note && (
                      <p className="text-xs italic text-gray-400 mt-1">
                        "{step.note}"
                      </p>
                    )}
                  </div>
                  {idx !== history.length - 1 && <hr className="bg-primary" />}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center p-8 bg-gray-50 rounded border-dashed border-2 border-gray-200">
              <p className="text-gray-400">
                Order is being processed. Tracking info will appear here soon.
              </p>
            </div>
          )}
        </div>

        <div className="modal-action">
          <button className="btn btn-primary" onClick={closeModal}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderModal;
