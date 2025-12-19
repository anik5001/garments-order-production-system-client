import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageUserTableRow = ({ user, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { displayName, email, userRole, status } = user || {};

  const updatedManagerStatus = (id, status) => {
    const updatedInfo = { status: status };
    axiosSecure.patch(`/user/${id}`, updatedInfo).then((res) => {
      if (res.data.modifiedCount) {
        toast.success(`${status} Successful`);
        refetch();
      }
    });
  };
  const handleApprovedManager = (id) => {
    updatedManagerStatus(id, "approved");
  };
  const handleRejectionManager = (id) => {
    updatedManagerStatus(id, "rejected");
  };

  const deleteUser = (id) => {
    axiosSecure.delete(`/user/${id}`).then((res) => {
      if (res.data.deletedCount) {
        toast.success("Delete user Successful");
        refetch();
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
          <p
            className={`${
              status === "approved" ? "text-green-500" : "text-red-500"
            }`}
          >
            {status}
          </p>
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
          <span
            onClick={() => handleRejectionManager(user._id)}
            className="mx-2 btn relative cursor-pointer"
          >
            Reject
          </span>
          <span
            onClick={() => deleteUser(user._id)}
            className="relative btn cursor-pointer"
          >
            delete
          </span>
        </button>

        {/* <DeleteModal isOpen={isOpen} closeModal={closeModal} /> */}
      </td>
    </tr>
  );
};

export default ManageUserTableRow;
