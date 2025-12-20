import { Navigate } from "react-router";
import useRole from "../Hooks/useRole";
import Loading from "../components/LoadingSpinner/Loading";

const AdminRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <Loading />;
  if (role.userRole === "Admin") return children;
  return <Navigate to="/" replace="true" />;
};

export default AdminRoute;
