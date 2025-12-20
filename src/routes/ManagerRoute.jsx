import React from "react";
import Loading from "../components/LoadingSpinner/Loading";
import useRole from "../Hooks/useRole";
import { Navigate } from "react-router";

const ManagerRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();
  console.log(role);

  if (isRoleLoading) return <Loading />;
  if (role.userRole === "Manager") return children;
  return <Navigate to="/" replace="true" />;
};

export default ManagerRoute;
