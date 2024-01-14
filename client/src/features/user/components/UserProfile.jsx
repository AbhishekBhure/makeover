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
import { useEffect, useState } from "react";
import {
  addAddressAsync,
  deleteAddressAsync,
  fetchAddressByUserIdAsync,
  selectAddress,
  selectAddressLoading,
} from "../../address/addressSlice";
import { LuPencilLine, LuTrash2 } from "../../../icons";
import EditAddress from "./EditAddress";
import ConfirmationModal from "../../../components/ConfirmationModal";

const UserProfile = () => {
  const dispatch = useDispatch();

  //selectors
  const { currentUser } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.auth);
  const user = useSelector(selectUser);
  const addressess = useSelector(selectAddress);
  const addressLoading = useSelector(selectAddressLoading);
  const userId = currentUser.user._id;

  useEffect(() => {
    if (user) {
      dispatch(fetchAddressByUserIdAsync(userId));
    }
  }, [dispatch, userId, user]);

  //states
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [filterAddress, setFilterAddress] = useState({});
  const [userAddress, setUserAddress] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
  });
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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

  const handleChange = (e) => {
    setUserAddress({ ...userAddress, [e.target.id]: e.target.value });
  };

  const handleAddNewAddress = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        addAddressAsync({
          ...userAddress,
          user: userId,
        })
      );
      setUserAddress({
        name: "",
        email: "",
        street: "",
        city: "",
        state: "",
        pinCode: "",
      });
      setShowAddAddressForm(false);
      await dispatch(fetchAddressByUserIdAsync(userId));
    } catch (error) {
      dispatch(addAddressAsync(error.message));
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const showEditForm = (addressId) => {
    const selectedAddress = addressess.find(
      (address) => address._id === addressId
    );
    setFilterAddress({ ...selectedAddress });
    setShowEditAddressModal(true);
  };

  const handleDeleteAddress = async (itemId) => {
    await dispatch(
      deleteAddressAsync({ addressId: itemId, alert: enqueueSnackbar })
    );
    setShowModal(false);
    await dispatch(fetchAddressByUserIdAsync(userId));
  };

  const showConfirmationModal = (itemId) => {
    setShowModal(true);
    setDeleteId(itemId);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ConfirmationModal
            title="Delete Address"
            message="Are you sure you want to delete this Address?"
            dangerTag="Delete"
            cancelTag="Cancel"
            dangerAction={() => handleDeleteAddress(deleteId)}
            cancelAction={() => setShowModal(false)}
            showModal={showModal}
          />
          <EditAddress
            showModal={showEditAddressModal}
            handleCancel={() => setShowEditAddressModal(false)}
            address={filterAddress}
          />
          <div className="bg-white my-8 md:mx-auto rounded shadow-md sm:w-1/2  overflow-hidden font-secondary">
            <div className="h-[140px] bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <div className="px-5 py-2 flex flex-col gap-3 pb-6">
              <div className="h-[90px] shadow-md w-[90px] rounded-full border-4 overflow-hidden -mt-14 border-white">
                <img
                  src={user.user.avatar}
                  alt="avatar"
                  className="w-full h-full rounded-full object-center object-cover"
                />
              </div>
              <div className="">
                <h3 className="text-xl text-slate-900 relative font-bold leading-6">
                  {user.user.username}
                </h3>
                <p className="text-sm text-gray-600">{user.user.email}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Link to="/profile/user/orders">
                  <button
                    type="button"
                    className="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-pink-500 p-2 md:px-3  md:py-2 text-sm font-medium text-white transition hover:border-pink-300 hover:bg-pink-600 active:bg-pink-700  focus:outline-none focus:ring-2 focus:ring-pink-300"
                  >
                    My Orders
                  </button>
                </Link>
                <button
                  type="button"
                  onClick={() => setShowAddAddressForm(true)}
                  className="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-white p-2 md:px-3 md:py-2 text-sm font-medium text-gray-800 transition hover:border-gray-300 active:bg-white hover:bg-gray-100 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Add New Address
                </button>
                <Link to={`/profile/user/update/${user.user._id}`}>
                  <button
                    type="button"
                    onClick={() => setShowAddAddressForm(true)}
                    className="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-white p-2 md:px-3 md:py-2 text-sm font-medium text-gray-800 transition hover:border-gray-300 active:bg-white hover:bg-gray-100 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    Update Profile
                  </button>
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-pink-500 p-2 md:px-3  md:py-2 text-sm font-medium text-white transition hover:border-pink-300 hover:bg-pink-600 active:bg-pink-700  focus:outline-none focus:ring-2 focus:ring-pink-300"
                >
                  Sign Out
                </button>
              </div>

              {showAddAddressForm && (
                <div>
                  <form className="mt-8" onSubmit={handleAddNewAddress}>
                    <div className="space-y-12">
                      <div className="border-b border-gray-900/10 pb-12">
                        <h1 className="text-xl">New Address</h1>
                        <div className="mt-7 font-secondary grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="col-span-full sm:col-span-4">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Full name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="name"
                                id="name"
                                onChange={handleChange}
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-pink-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="col-span-full sm:col-span-4">
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
                                onChange={handleChange}
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-pink-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="col-span-full sm:col-span-4">
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
                                id="street"
                                onChange={handleChange}
                                autoComplete="street-address"
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-pink-600 sm:text-sm sm:leading-6"
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
                                onChange={handleChange}
                                autoComplete="address-level2"
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-pink-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="state"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              State
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="state"
                                id="state"
                                onChange={handleChange}
                                autoComplete="address-level1"
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-pink-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="pinCode"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Pin code
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="pinCode"
                                id="pinCode"
                                onChange={handleChange}
                                autoComplete="postal-code"
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-pink-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="font-secondary flex items-center justify-end gap-x-6">
                        <button
                          onClick={() => setShowAddAddressForm(false)}
                          type="button"
                          className="text-sm leading-6 border px-3 py-1 rounded-full border-black text-gray-900"
                        >
                          Cancel
                        </button>
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
              {addressLoading ? (
                <Loader />
              ) : Array.isArray(addressess) && addressess.length > 0 ? (
                addressess.map((add, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-3 border px-2 py-3 w-full"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className=" text-sm font-bold text-slate-700">
                          {add.name}
                        </p>
                        <span className="text-xs text-slate-600">
                          {add.email}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm">
                          {add.city} - {add.pinCode}
                        </p>
                        <p className="text-sm text-slate-600">{add.state}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => showEditForm(add._id)}
                        >
                          <LuPencilLine className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => showConfirmationModal(add._id)}
                          type="button"
                        >
                          <LuTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Addresses</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;
