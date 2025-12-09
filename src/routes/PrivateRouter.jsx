import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, NavLink } from "react-router";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center my-10">loading..</div>;

  if (!user) return <NavLink to="/login"></NavLink>;
  return children;
};

export default PrivateRouter;
