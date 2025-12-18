import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, NavLink, useLocation } from "react-router";
import Loading from "../components/LoadingSpinner/Loading";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading />;
  if (user) return children;
  return <Navigate to="/login" state={location.pathname} replace="true" />;
};

export default PrivateRouter;
