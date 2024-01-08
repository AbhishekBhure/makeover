import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSnackbar } from "notistack";
import {
  editAddressAsync,
  fetchAddressByUserIdAsync,
} from "../../address/addressSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../auth/authSlice";

export default function EditAddress({
  showModal,
  handleUpdate,
  handleCancel,
  address,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  //states
  const [userEditAddress, setUserEditAddress] = useState({});

  //selectors
  const { currentUser } = useSelector((state) => state.auth);
  const userId = currentUser.user._id;

  const handleChange = (e) => {
    setUserEditAddress({ ...userEditAddress, [e.target.id]: e.target.value });
  };
  const cancelButtonRef = useRef(null);

  // Update userEditAddress when the address prop changes
  useEffect(() => {
    setUserEditAddress(address);
  }, [address]);

  const handleEditAddress = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        editAddressAsync({ address: userEditAddress, alert: enqueueSnackbar })
      );
      handleCancel();
      await dispatch(fetchAddressByUserIdAsync(userId));
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  };

  return (
    <>
      {address && (
        <Transition.Root show={showModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={() => showModal(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <form className="mt-8 p-3" onSubmit={handleEditAddress}>
                      <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                          <Dialog.Title className="text-xl">
                            Edit Address
                          </Dialog.Title>
                          <div className="mt-7 font-secondary grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
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
                                  defaultValue={address.name}
                                  onChange={handleChange}
                                  autoComplete="given-name"
                                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="col-span-full">
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
                                  defaultValue={address.email}
                                  onChange={handleChange}
                                  autoComplete="email"
                                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-pink-600 sm:text-sm sm:leading-6"
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
                                  id="street"
                                  defaultValue={address.street}
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
                                  defaultValue={address.city}
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
                                  defaultValue={address.state}
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
                                  defaultValue={address.pinCode}
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
                            type="button"
                            onClick={handleCancel}
                            ref={cancelButtonRef}
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
                            className="rounded-full bg-pink-500 px-3 py-2 text-sm text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-700"
                          >
                            Edit Address
                          </button>
                        </div>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
}
