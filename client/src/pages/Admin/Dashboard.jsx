import { useDispatch } from "react-redux";
import AdminProductList from "../../features/admin/components/AdminProductList";
import {
  signOutUserFail,
  signOutUserStart,
  signOutUserSuccess,
} from "../../features/auth/authSlice";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/v1/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFail(data.message));
        enqueueSnackbar(data.message, { variant: "error" });
        return;
      }
      dispatch(signOutUserSuccess(data));
      enqueueSnackbar("Logged Out Successfully", { variant: "success" });
    } catch (error) {
      dispatch(signOutUserFail(error.message));
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <>
      <Link to={"/"}>
        <button onClick={handleSignOut}>Sign Out</button>
      </Link>
      <AdminProductList />
    </>
  );
};

export default Dashboard;
