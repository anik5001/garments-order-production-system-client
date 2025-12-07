import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 p-10 mt-10">
      <div className="grid md:grid-cols-3 footer max-w-7xl mx-auto text-base-content">
        {/* Logo + Description */}
        <aside>
          <h2 className="font-bold text-2xl">Garments Tracker</h2>
          <p className="text-sm mt-2 w-60">
            A complete garments order and production tracking system built with
            modern technology.
          </p>
        </aside>

        {/* Useful Links */}
        <nav>
          <h6 className="footer-title">Useful Links</h6>
          <Link className="link link-hover" to="/">
            Home
          </Link>
          <Link className="link link-hover" to="/all-products">
            All Products
          </Link>
          <Link className="link link-hover" to="/about">
            About Us
          </Link>
          <Link className="link link-hover" to="/contact">
            Contact
          </Link>
        </nav>

        {/* Support */}
        <nav>
          <h6 className="footer-title">Support</h6>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Terms of Use</a>
          <a className="link link-hover">Help Center</a>
        </nav>
      </div>
      <p className="text-center  mt-10">
        © {new Date().getFullYear()} All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
