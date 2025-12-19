import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const ManageUserTableRow = ({ user }) => {
  const axiosSecure = useAxiosSecure();
  const { displayName, email, userRole, status } = user || {};
  const handleApprovedManager = (id) => {
    const updatedInfo = { status: "approved" };
    axiosSecure.patch(`/user/${id}`, updatedInfo).then((res) => {
      if (res.data.modifiedCount) {
        alert("approved ");
      }
    });
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="shrink-0">
            <div className="block relative">
              {displayName}
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
          <p className="text-gray-900">{email}</p>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{userRole}</p>
      </td>
      {user.userRole === "Manager" && (
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900">{status}</p>
        </td>
      )}

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          // onClick={() => setIsOpen(true)}
          className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight "
        >
          {user.userRole === "Manager" && (
            <span
              onClick={() => {
                handleApprovedManager(user._id);
              }}
              className="relative cursor-pointer btn"
            >
              Approved
            </span>
          )}
          <span className="mx-2 btn relative cursor-pointer">Reject</span>
          <span className="relative btn cursor-pointer">delete</span>
        </button>

        {/* <DeleteModal isOpen={isOpen} closeModal={closeModal} /> */}
      </td>
    </tr>
  );
};

export default ManageUserTableRow;
