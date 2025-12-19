import React from "react";

const ViewTrackingModal = ({ isOpen, closeModal, history, productName }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-2xl">
        <h3 className="font-bold text-lg mb-6">
          Tracking Timeline: {productName}
        </h3>

        {history.length > 0 ? (
          <ul className="timeline timeline-vertical">
            {history.map((step, index) => (
              <li key={index}>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 text-primary"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4.137-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="timeline-start md:text-end mb-10">
                  <time className="font-mono italic text-sm">
                    {new Date(step.updatedAt).toLocaleString()}
                  </time>
                  <div className="text-lg font-black">{step.status}</div>
                  <p className="text-gray-500">{step.location}</p>
                  <p className="text-xs italic">"{step.note}"</p>
                </div>
                <hr className="bg-primary" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center py-10 text-gray-400">
            No tracking history available yet.
          </p>
        )}

        <div className="modal-action">
          <button className="btn" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTrackingModal;
