import { useState } from "react";
import { Link, NavLink } from "react-router";

import logo from "../../assets/logo.jpg";
// Icons
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";

// User Menu

import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";

const Sidebar = () => {
  const [role, isRoleLoading] = useRole();
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Small Screen Navbar, only visible till md breakpoint */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            {/* <Link to="/">
              <img src={logo} alt="logo" width="100" height="100" />
            </Link> */}
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Top Content */}
          <div>
            {/* Logo */}
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-lime-100 mx-auto">
              {/* <Link to="/">
                <img src={logo} alt="logo" width="100" height="100" />
              </Link> */}
            </div>
          </div>

          {/* Middle Content */}
          <div className="flex flex-col justify-between flex-1 mt-6 text-center">
            {/*  Menu Items */}
            <nav>
              {role === "Buyer" && (
                <div className="text-center">
                  <NavLink to="/dashboard/my-orders">My Order</NavLink>
                  <br />
                </div>
              )}
              {role === "Admin" && (
                <ul className="flex flex-col gap-3">
                  <li className="">
                    <NavLink to="/dashboard/all-products">All Products</NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/all-orders">All Orders</NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/all-orders">All Orders</NavLink>
                  </li>
                </ul>
              )}
              {role === "Manager" && (
                <ul className="flex flex-col gap-3">
                  <li>
                    <NavLink to="/dashboard/add-product">Add Product</NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/manage-products">
                      Manage Products
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/pending-orders">
                      Pending Orders
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/approved-orders">
                      Approved Orders
                    </NavLink>{" "}
                  </li>
                </ul>
              )}
              {/* Common Menu */}
              {/* <MenuItem
                icon={BsGraphUp}
                label="Statistics"
                address="/dashboard"
              /> */}
              {/* Role-Based Menu */}
              {/* <CustomerMenu />
              <SellerMenu />
              <AdminMenu /> */}
            </nav>
          </div>

          {/* Bottom Content */}
          <div>
            <li className="text-center">
              <NavLink to="/dashboard/profile">Profile</NavLink>
            </li>

            {/* <menuitem
              icon={FcSettings}
              label="Profile"
              address="/dashboard/profile"
            /> */}
            <button
              onClick={logOut}
              className="flex cursor-pointer w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
            >
              <GrLogout className="w-5 h-5" />

              <span className="mx-4 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
