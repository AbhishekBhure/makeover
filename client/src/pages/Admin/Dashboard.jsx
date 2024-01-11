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

  return (
    <>
      <AdminProductList />
    </>
  );
};

export default Dashboard;
