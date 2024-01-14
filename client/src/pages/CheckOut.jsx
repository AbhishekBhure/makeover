import Layout from "../components/Layout";
import { LuArrowRight, LuMinus, LuPlus, LuTrash2 } from "../icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  deleteItemsFromCartAsync,
  resetCartAsync,
  selectItems,
  updateItemsAsync,
} from "../features/cart/cartSlice";
import { useEffect, useState } from "react";
import {
  createOrderAsync,
  resetOrder,
  selectCurrentOrder,
  selectOrderLoading,
} from "../features/order/orderSlice";
import { useSnackbar } from "notistack";
import {
  addAddressAsync,
  fetchAddressByUserIdAsync,
  selectAddress,
} from "../features/address/addressSlice";
import Loader from "../components/Loader";
import BackButton from "../components/BackButton";

function CheckOut() {
  //states
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [userAddress, setUserAddress] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  //selectors
  const { currentUser } = useSelector((state) => state.auth);
  const user = currentUser.user;
  const userId = user._id;
  const items = useSelector(selectItems);
  const currentOrder = useSelector(selectCurrentOrder);
  const addressess = useSelector(selectAddress);
  const orderLoading = useSelector(selectOrderLoading);

  useEffect(() => {
    if (user) {
      dispatch(fetchAddressByUserIdAsync(userId));
    }
  }, [dispatch, userId, user]);

  const totalAmount = items.reduce(
    (amount, item) => item.product.discountPrice * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateItemsAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleDeleteItem = (e, itemId) => {
    dispatch(deleteItemsFromCartAsync(itemId));
  };

  const handleAddress = (e) => {
    setSelectedAddress(addressess[e.target.value]);
  };

  const handleChange = (e) => {
    setUserAddress({ ...userAddress, [e.target.id]: e.target.value });
  };

  const handleAddNewAddress = (e) => {
    e.preventDefault();
    try {
      dispatch(addAddressAsync({ ...userAddress, user: userId }));
      dispatch(fetchAddressByUserIdAsync(userId));
      setUserAddress({
        name: "",
        email: "",
        street: "",
        city: "",
        state: "",
        pinCode: "",
      });
      enqueueSnackbar("Address added Successfully", { variant: "success" });
    } catch (error) {
      dispatch(addAddressAsync(error.message));
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleOrder = () => {
    if (selectedAddress && paymentMethod) {
      const order = {
        items,
        totalAmount,
        totalItems,
        user: user._id,
        selectedAddress,
        paymentMethod,
        status: "pending", //other status can be deliverd
      };
      dispatch(createOrderAsync(order));
      //reset cart
      dispatch(resetCartAsync(user._id));

      //reset currentOrder
      dispatch(resetOrder());
    } else {
      enqueueSnackbar("Enter Address and Payment Method", { variant: "error" });
    }
  };

  const handleIncreaseQuantity = (item) => {
    const newQuantity = item.quantity + 1;
    if (newQuantity <= item.product.stock) {
      dispatch(updateItemsAsync({ id: item.id, quantity: +newQuantity }));
    }
  };

  const handleDecreaseQuantity = (item) => {
    const newQuantity = item.quantity - 1;
    if (newQuantity > 0) {
      dispatch(updateItemsAsync({ id: item.id, quantity: +newQuantity }));
    }
  };

  return (
    <Layout>
      {!items.length && <Navigate to="/" replace={true} />}
      {/* {currentOrder && (
        <Navigate to={`/order-success/${currentOrder.id}`} replace={true} />
      )} */}
      {currentOrder && <Navigate to={`/stripe-checkout/`} replace={true} />}
      {orderLoading ? (
        <Loader />
      ) : (
        <>
          <BackButton />
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 shadow p-3">
            <div className="lg:col-span-3">
              <form className="mt-8" onSubmit={handleAddNewAddress}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h1 className="text-4xl font-primary leading-tight text-gray-900">
                      Personal Information
                    </h1>
                    <p className="text-gray-500">
                      Add a new address or choose from below
                    </p>
                    <div className="mt-10 font-secondary grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
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
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 focus:outline-none sm:text-sm sm:leading-6"
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
                            onChange={handleChange}
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 focus:outline-none sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="street"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="street"
                            id="street"
                            onChange={handleChange}
                            autoComplete="street"
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 focus:outline-none sm:text-sm sm:leading-6"
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
                            autoComplete="city"
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 focus:outline-none sm:text-sm sm:leading-6"
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
                            autoComplete="state"
                            className="block w-full rounded-md border-0 py-1.5  px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 focus:outline-none sm:text-sm sm:leading-6"
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
                            autoComplete="pinCode"
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 focus:outline-none sm:text-sm sm:leading-6"
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
                      className="rounded-full bg-pink-500 px-3 py-2 text-sm text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-700"
                    >
                      Add Address
                    </button>
                  </div>

                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Addresses
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose from existing address
                    </p>
                    <ul role="list" className="divide-y divide-gray-100">
                      {addressess.length > 0 ? (
                        addressess.map((address, index) => (
                          <li
                            key={index}
                            className="flex justify-between px-4 gap-x-6 py-5  border-solid border-2 border-gray-200"
                          >
                            <div className="flex min-w-0 gap-x-4">
                              <input
                                onChange={handleAddress}
                                name="address"
                                type="radio"
                                value={index}
                                className="h-4 w-4 border-gray-300 text-pink-600 focus:ring-pink-700"
                              />
                              <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                  {address.name}
                                </p>
                                <div className="flex gap-2 items-center justify-center">
                                  <p className=" text-xs leading-5 text-gray-500">
                                    {address.street},
                                  </p>
                                  <p className=" text-xs leading-5 text-gray-500">
                                    {address.state}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                              <div className="flex gap-1 items-center justify-center">
                                <p className=" text-xs leading-5 text-gray-500">
                                  {address.city} -
                                </p>
                                <p className="text-xs leading-5 text-gray-500">
                                  {address.pinCode}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))
                      ) : (
                        <p>No Address</p>
                      )}
                    </ul>

                    <div className="mt-10 space-y-10">
                      <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-gray-900">
                          Payment
                        </legend>

                        <div className="mt-6 space-y-6">
                          <div className="flex items-center gap-x-3">
                            <input
                              onChange={handlePayment}
                              value="card"
                              id="card"
                              name="payments"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-pink-600 focus:ring-pink-600"
                            />
                            <label
                              htmlFor="card"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Card Payment
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="lg:col-span-2 md:border-l md:px-6">
              <div className="mt-7">
                <h1 className="text-4xl mb-3 font-primary">Cart</h1>
                <div className="flow-root font-secondary">
                  <ul
                    role="list"
                    className="-my-6 divide-y p-3 divide-gray-200"
                  >
                    {items.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <Link
                                  to={`/product-detail/${item.product.id}`}
                                  className="line-clamp-3"
                                >
                                  {item.product.title}
                                </Link>
                              </h3>
                              <p className="ml-4">
                                ${item.product.discountPrice}
                              </p>
                            </div>
                            <p className="mt-1 text-sm bg-pink-500 px-2 inline rounded-full text-white font-secondary">
                              {item.product.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex gap-1 mt-1 items-center font-secondary">
                              <label htmlFor="quantity">Qty</label>
                              <button
                                type="button"
                                onClick={() => handleDecreaseQuantity(item)}
                              >
                                <LuMinus className="w-5 h-5" />
                              </button>
                              <input
                                className="w-10 border text-center"
                                type="number"
                                onChange={(e) => handleQuantity(e, item)}
                                value={item.quantity}
                                max={item.product.stock}
                              />
                              <button
                                onClick={() => handleIncreaseQuantity(item)}
                                type="button"
                              >
                                <LuPlus className="w-5 h-5" />
                              </button>
                            </div>

                            <div className="flex">
                              <button
                                onClick={(e) => handleDeleteItem(e, item.id)}
                                type="button"
                              >
                                <LuTrash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Itmes</p>
                  <p>{totalItems} items</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${totalAmount}</p>
                </div>

                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <div
                    onClick={handleOrder}
                    className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-pink-500 px-6 py-3 text-base  text-white shadow-sm hover:bg-pink-700"
                  >
                    Order now
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}
export default CheckOut;
