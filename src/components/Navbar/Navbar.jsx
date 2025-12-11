import React, { use, useState } from "react";
import { Link } from "react-router";
import Container from "../Shared/Container";
import { AuthContext } from "../../providers/AuthContext";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  // const { user } = use(AuthContext);
  const { user, signOutUser } = useAuth();
  console.log(user);
  const handleSignOutUser = () => {
    signOutUser()
      .then(() => {
        alert("user signOut successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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

            {/* Mobile Menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {!user ? (
                <>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/all-products">All-Products</Link>
                  </li>
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/all-products">All-Products</Link>
                  </li>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOutUser}
                      className="btn btn-error btn-sm mt-2"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="btn btn-ghost font-bold text-xl">
            Garments Tracker
          </Link>
        </div>

        {/* Navbar Center (Desktop Menu) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {!user ? (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/all-products">All-Products</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/all-products">All-Products</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Navbar End (Avatar + Logout) */}
        <div className="navbar-end">
          {user ? (
            <>
              <div className="avatar mr-3">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user?.photoURL} alt="User" />
                </div>
              </div>

              <button
                onClick={handleSignOutUser}
                className="btn btn-outline btn-error btn-sm"
              >
                Logout
              </button>
            </>
          ) : null}
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
