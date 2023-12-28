import Layout from "../components/Layout";
import { useSnackbar } from "notistack";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFail,
} from "../features/auth/authSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

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
      {loading ? (
        <Loader />
      ) : (
        <Layout>
          Profile
          <div className="flex gap-5">
            <button type="button" onClick={handleSignOut}>
              SignOut
            </button>
            <Link to="/orders">
              <button type="button">My orders</button>
            </Link>
          </div>
        </Layout>
      )}
    </>
  );
};

export default Profile;
