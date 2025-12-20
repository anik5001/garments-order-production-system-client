import React from "react";
import { Link, NavLink } from "react-router";
import Container from "../Shared/Container";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, signOutUser } = useAuth();

  const handleSignOutUser = () => {
    signOutUser()
      .then(() => toast.success("Signed out successfully"))
      .catch((err) => console.log(err));
  };

  // Active Link Styling
  const navLinkStyles = ({ isActive }) =>
    `font-medium transition-colors duration-200 ${
      isActive ? "text-primary border-b-2 border-primary" : "hover:text-primary"
    }`;

  const navItems = (
    <>
      <li>
        <NavLink to="/" className={navLinkStyles}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-products" className={navLinkStyles}>
          All-Products
        </NavLink>
      </li>
      {!user && (
        <>
          <li>
            <NavLink to="/about" className={navLinkStyles}>
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={navLinkStyles}>
              Contact
            </NavLink>
          </li>
        </>
      )}
      {user && (
        <li>
          <NavLink to="/dashboard" className={navLinkStyles}>
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="bg-base-100/80 backdrop-blur-md sticky top-0 z-50 border-b border-base-200">
      <Container>
        <div className="navbar px-0 h-20">
          {/* Navbar Start */}
          <div className="navbar-start">
            {/* Mobile Dropdown */}
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl bg-base-100 rounded-box w-64 gap-3 border border-base-200"
              >
                {navItems}
                {!user && (
                  <div className="flex flex-col gap-2 mt-4 border-t pt-4">
                    <Link
                      to="/login"
                      className="btn btn-primary btn-sm btn-outline"
                    >
                      Login
                    </Link>
                    <Link to="/register" className="btn btn-primary btn-sm">
                      Register
                    </Link>
                  </div>
                )}
              </ul>
            </div>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-black text-xl transition-transform group-hover:scale-105">
                G
              </div>
              <span className="font-bold text-xl tracking-tighter hidden sm:block">
                Garments<span className="text-primary text-2xl">Tracker</span>
              </span>
            </Link>
          </div>

          {/* Navbar Center (Desktop Menu) */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-6">{navItems}</ul>
          </div>

          {/* Navbar End */}
          <div className="navbar-end gap-2">
            {!user ? (
              <div className="hidden sm:flex gap-2">
                <Link to="/login" className="btn btn-ghost btn-sm capitalize">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary btn-sm px-6 capitalize rounded-full"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar border-2 border-primary/20"
                >
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        user?.photoURL || "https://i.ibb.co/mJR7z81/user.png"
                      }
                      alt="Profile"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-200"
                >
                  <div className="px-4 py-3 border-b mb-2">
                    <p className="font-bold text-sm truncate">
                      {user?.displayName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                  <li>
                    <Link to="/dashboard/profile">View Profile</Link>
                  </li>
                  <li>
                    <Link to="/dashboard">My Dashboard</Link>
                  </li>
                  <div className="divider my-1"></div>
                  <li>
                    <button
                      onClick={handleSignOutUser}
                      className="text-error font-bold flex justify-between items-center"
                    >
                      Logout
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
