import { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import Loading from "../LoadingSpinner/Loading";
import toast from "react-hot-toast";

// Icons
import { GrLogout } from "react-icons/gr";
import {
  AiOutlineBars,
  AiOutlineProduct,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { BsGraphUp, BsCartCheck, BsBagPlus, BsListTask } from "react-icons/bs";
import {
  MdOutlineManageAccounts,
  MdOutlinePendingActions,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiOutlineUsers } from "react-icons/hi";

const Sidebar = () => {
  const [userRole, isRoleLoading] = useRole();
  const { signOutUser, user } = useAuth();
  const [isActive, setActive] = useState(false);

  const handleSignOut = () => {
    signOutUser()
      .then(() => toast.success("Sign Out Successful"))
      .catch((er) => console.log(er));
  };

  const handleToggle = () => setActive(!isActive);

  // NavLink Active Styling
  const activeClass = "bg-primary text-white shadow-md";
  const normalClass =
    "flex items-center px-4 py-3 text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-all duration-300 rounded-lg mx-2 my-1";

  if (isRoleLoading) return <Loading />;

  return (
    <>
      {/* Mobile Header */}
      <div className="bg-white text-gray-800 flex justify-between md:hidden shadow-sm border-b">
        <div className="p-4 font-bold text-xl text-primary uppercase tracking-wider">
          Garments CRM
        </div>
        <button onClick={handleToggle} className="p-4 focus:outline-none">
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar Container */}
      <div
        className={`z-20 md:fixed flex flex-col justify-between overflow-x-hidden bg-white border-r w-64 space-y-6 absolute inset-y-0 left-0 transform 
        ${isActive ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* 1. Header / Logo */}
          <div className="px-6 py-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl">
                G
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-800">
                Garments<span className="text-primary">Hub</span>
              </span>
            </Link>
          </div>

          {/* 2. Navigation Menu */}
          <nav className="flex-1 px-2">
            {/* BUYER MENU */}
            {userRole.role === "Buyer" && (
              <>
                <p className="px-4 text-[10px] uppercase font-bold text-gray-400 mb-2">
                  Shopping
                </p>
                <NavLink
                  to="/dashboard/my-orders"
                  className={({ isActive }) =>
                    isActive ? `${normalClass} ${activeClass}` : normalClass
                  }
                >
                  <BsCartCheck className="w-5 h-5 mr-3" /> My Orders
                </NavLink>
              </>
            )}

            {/* ADMIN MENU */}
            {userRole.role === "Admin" && (
              <>
                <p className="px-4 text-[10px] uppercase font-bold text-gray-400 mb-2">
                  Administration
                </p>
                <NavLink
                  to="/dashboard/manager-users"
                  className={({ isActive }) =>
                    isActive ? `${normalClass} ${activeClass}` : normalClass
                  }
                >
                  <MdOutlineManageAccounts className="w-5 h-5 mr-3" /> Manager
                  Users
                </NavLink>
                <NavLink
                  to="/dashboard/buyer-users"
                  className={({ isActive }) =>
                    isActive ? `${normalClass} ${activeClass}` : normalClass
                  }
                >
                  <HiOutlineUsers className="w-5 h-5 mr-3" /> Buyer Users
                </NavLink>
                <NavLink
                  to="/dashboard/all-products"
                  className={({ isActive }) =>
                    isActive ? `${normalClass} ${activeClass}` : normalClass
                  }
                >
                  <AiOutlineProduct className="w-5 h-5 mr-3" /> All Products
                </NavLink>
                <NavLink
                  to="/dashboard/all-orders"
                  className={({ isActive }) =>
                    isActive ? `${normalClass} ${activeClass}` : normalClass
                  }
                >
                  <BsListTask className="w-5 h-5 mr-3" /> All Orders
                </NavLink>
              </>
            )}

            {/* MANAGER MENU */}
            {userRole.role === "Manager" && userRole.status === "approved" && (
              <>
                <p className="px-4 text-[10px] uppercase font-bold text-gray-400 mb-2">
                  Production
                </p>
                <NavLink
                  to="/dashboard/add-product"
                  className={({ isActive }) =>
                    isActive ? `${normalClass} ${activeClass}` : normalClass
                  }
                >
                  <BsBagPlus className="w-5 h-5 mr-3" /> Add Product
                </NavLink>
                <NavLink
                  to="/dashboard/manage-products"
                  className={({ isActive }) =>
                    isActive ? `${normalClass} ${activeClass}` : normalClass
                  }
                >
                  <MdOutlineManageAccounts className="w-5 h-5 mr-3" /> Manage
                  Products
                </NavLink>
                <NavLink
                  to="/dashboard/pending-orders"
                  className={({ isActive }) =>
                    isActive ? `${normalClass} ${activeClass}` : normalClass
                  }
                >
                  <MdOutlinePendingActions className="w-5 h-5 mr-3" /> Pending
                  Orders
                </NavLink>
                <NavLink
                  to="/dashboard/approved-orders"
                  className={({ isActive }) =>
                    isActive ? `${normalClass} ${activeClass}` : normalClass
                  }
                >
                  <BsCartCheck className="w-5 h-5 mr-3" /> Approved Orders
                </NavLink>
              </>
            )}
          </nav>

          {/* 3. Footer / User Profile */}
          <div className="border-t border-gray-200 p-4">
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                isActive ? `${normalClass} ${activeClass}` : normalClass
              }
            >
              <CgProfile className="w-5 h-5 mr-3" /> Profile
            </NavLink>

            <button
              onClick={handleSignOut}
              className="flex w-full items-center px-4 py-3 mt-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300"
            >
              <GrLogout className="w-5 h-5 mr-3" />
              <span className="font-medium">Logout</span>
            </button>

            {/* User Info Display */}
            <div className="mt-4 flex items-center p-2 bg-gray-50 rounded-xl">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-8">
                  <span>{user?.displayName?.charAt(0) || "U"}</span>
                </div>
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-xs font-bold text-gray-800 truncate">
                  {user?.displayName}
                </p>
                <p className="text-[10px] text-gray-500 truncate">
                  {userRole.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
