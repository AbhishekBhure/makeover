import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../userSlice";
import {
  selectUser,
  updateUserFail,
  updateUserStart,
  updateUserSuccess,
} from "../../auth/authSlice";
import { useState } from "react";
import Loader from "../../../components/Loader";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const UserUpdate = () => {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.auth);
  const [userDetails, setUserDetails] = useState(currentUser);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = currentUser.user._id;
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/v1/users/update/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      const user = await res.json();
      if (user.success === false) {
        dispatch(updateUserFail(user.message));
        return;
      }
      dispatch(updateUserSuccess({ user }));
      enqueueSnackbar("Profile Updated Successfully", { variant: "success" });
      navigate("/profile/user");
    } catch (error) {
      dispatch(updateUserFail(error.message));
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <>
      {currentUser && (
        <div>
          <div className="border-r">
            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h1 className="text-4xl font-primary leading-7 text-gray-900">
                    Personal Information
                  </h1>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 font-secondary grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="username"
                          defaultValue={currentUser.user.username}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          defaultValue={currentUser.user.email}
                          type="email"
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                      </label>
                      <div className="mt-2">
                        <input
                          type="password"
                          id="password"
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                disabled={loading}
                className="bg-slate-700 rounded-lg text-white uppercase hover:opacity-95 p-3 disabled:opacity-80 cursor-pointer transition-all duration-500 "
              >
                {loading ? <Loader /> : "update"}
              </button>
            </form>
          </div>
          <div></div>
        </div>
      )}
    </>
  );
};

export default UserUpdate;
