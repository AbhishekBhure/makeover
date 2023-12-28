import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { currentUser } = useSelector((state) => state.auth);

  return currentUser ? <Outlet /> : <Navigate to="/sign-in" replace={true} />;
};

export default ProtectedRoute;
