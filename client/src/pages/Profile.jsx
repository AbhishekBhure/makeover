import Layout from "../components/Layout";
import { useSnackbar } from "notistack";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFail,
} from "../features/user/userSlice";

const Profile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const { currentUser, loading } = useSelector((state) => state.user);

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
      <Layout>
        Profile
        <button type="button" onClick={handleSignOut}>
          SignOut
        </button>
      </Layout>
    </>
  );
};

export default Profile;
