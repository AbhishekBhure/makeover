import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {
  const { currentUser } = useSelector((state) => state.auth);

  const isAdmin = currentUser?.user?.role === "admin";

  return isAdmin ? <Outlet /> : <Navigate to={"/sign-in"} />;
};

export default AdminRoute;
