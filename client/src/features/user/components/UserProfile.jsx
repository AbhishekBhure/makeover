import { Link } from "react-router-dom";
import {
  selectUser,
  signOutUserFail,
  signOutUserStart,
  signOutUserSuccess,
} from "../../auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import Loader from "../../../components/Loader";
import { useState } from "react";
import { selectUserInfo } from "../userSlice";

const UserProfile = () => {
  //states
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);
  const user = useSelector(selectUser);
  const userInfo = useSelector(selectUserInfo);
  // console.log(userInfo);

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

  const handleAddNewAddress = async () => {};

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="bg-white md:mx-auto rounded shadow-xl w-full md:w-1/2 overflow-hidden font-secondary">
            <div className="h-[140px] bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <div className="px-5 py-2 flex flex-col gap-3 pb-6">
              <div className="h-[90px] shadow-md w-[90px] rounded-full border-4 overflow-hidden -mt-14 border-white">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  className="w-full h-full rounded-full object-center object-cover"
                />
              </div>
              <div className="">
                <h3 className="text-xl text-slate-900 relative font-bold leading-6">
                  {user.user.username}
                </h3>
                <p className="text-sm text-gray-600">{user.user.email}</p>
              </div>
              <div className="flex gap-2">
                <Link to="/orders">
                  <button
                    type="button"
                    className="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 transition hover:border-gray-300 active:bg-white hover:bg-gray-100 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    My Orders
                  </button>
                </Link>
                <button
                  type="button"
                  onClick={() => setShowAddAddressForm(true)}
                  className="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-blue-700 px-3 py-2 text-sm font-medium text-white transition hover:border-blue-300 hover:bg-blue-600 active:bg-blue-700 focus:blue-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Add New Address
                </button>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-pink-500 px-3 py-2 text-sm font-medium text-white transition hover:border-pink-300 hover:bg-pink-600 active:bg-pink-700  focus:outline-none focus:ring-2 focus:ring-pink-300"
                >
                  Sign Out
                </button>
              </div>

              {showAddAddressForm && (
                <div>
                  <form className="mt-8">
                    <div className="space-y-12">
                      <div className="border-b border-gray-900/10 pb-12">
                        <h1 className="text-xl">New Address</h1>
                        <div className="mt-7 font-secondary grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Full name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
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
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="street-address"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Street address
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="street-address"
                                id="street-address"
                                autoComplete="street-address"
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2 sm:col-start-1">
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              City
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="city"
                                id="city"
                                autoComplete="address-level2"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="region"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              State / Province
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="region"
                                id="region"
                                autoComplete="address-level1"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="postal-code"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              ZIP / Postal code
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="postal-code"
                                id="postal-code"
                                autoComplete="postal-code"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="font-secondary flex items-center justify-end gap-x-6">
                        <button
                          type="reset"
                          className="text-sm leading-6 border px-3 py-1 rounded-full border-black text-gray-900"
                        >
                          Reset
                        </button>
                        <button
                          type="submit"
                          onClick={handleAddNewAddress}
                          className="rounded-full bg-pink-500 px-3 py-2 text-sm text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-700"
                        >
                          Add Address
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              <h4 className="text-md font-medium leading-3">Your Addresses</h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 px-2 py-3 bg-white rounded border w-full ">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="h-8 w-8 text-slate-500"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"></path>
                  </svg>
                  <div className="leading-3">
                    <p className=" text-sm font-bold text-slate-700">
                      Ui Designer
                    </p>
                    <span className="text-xs text-slate-600">5 years</span>
                  </div>
                  <p className="text-sm text-slate-500 self-start ml-auto">
                    As Ui Designer on Front Page
                  </p>
                </div>
                <div className="flex items-center gap-3 px-2 py-3 bg-white rounded border w-full ">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="h-8 w-8 text-slate-500"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"></path>
                  </svg>
                  <div className="leading-3">
                    <p className=" text-sm font-bold text-slate-700">
                      Ui Designer
                    </p>
                    <span className="text-xs text-slate-600">5 years</span>
                  </div>
                  <p className="text-sm text-slate-500 self-start ml-auto">
                    As Ui Designer on Front Page
                  </p>
                </div>
                <div className="flex items-center gap-3 px-2 py-3 bg-white rounded border w-full ">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="h-8 w-8 text-slate-500"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"></path>
                  </svg>
                  <div className="leading-3">
                    <p className=" text-sm font-bold text-slate-700">
                      Ui Designer
                    </p>
                    <span className="text-xs text-slate-600">5 years</span>
                  </div>
                  <p className="text-sm text-slate-500 self-start ml-auto">
                    As Ui Designer on Front Page
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;
