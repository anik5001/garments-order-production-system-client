import React, { useState } from "react";
import TrackingModal from "./TrackingModal";
import ViewTrackingModal from "./ViewTrackingModal";

const ApprovedOrdersTableRow = ({ order, refetch }) => {
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const {
    _id,
    customerName,
    productName,
    orderQty,
    createdAt,
    trackingHistory,
  } = order || {};

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-mono text-xs">
        {_id}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {customerName}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 font-medium">{productName}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="badge badge-ghost">{orderQty}</span>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-gray-600">
        {new Date(createdAt).toLocaleDateString()}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm space-x-2">
        {/* Add Tracking Button */}
        <button
          onClick={() => setIsTrackModalOpen(true)}
          className="btn btn-xs btn-primary text-white"
        >
          + Add Tracking
        </button>

        {/* View Timeline Button */}
        <button
          onClick={() => setIsViewModalOpen(true)}
          className="btn btn-xs btn-outline btn-secondary"
        >
          View Tracking
        </button>

        {/* Modals */}
        <TrackingModal
          isOpen={isTrackModalOpen}
          closeModal={() => setIsTrackModalOpen(false)}
          orderId={_id}
          refetch={refetch}
        />

        <ViewTrackingModal
          isOpen={isViewModalOpen}
          closeModal={() => setIsViewModalOpen(false)}
          history={trackingHistory || []}
          productName={productName}
        />
      </td>
    </tr>
  );
};

export default ApprovedOrdersTableRow;
