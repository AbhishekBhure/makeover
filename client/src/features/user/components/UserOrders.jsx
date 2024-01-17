import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoggedInUserOrdersAsync,
  selectUserOrderLoading,
  selectUserOrders,
} from "../userSlice";
import Loader from "../../../components/Loader";
import { ITEMS_PER_PAGE } from "../../../constants/constants";
import { Link } from "react-router-dom";

const UserOrders = () => {
  const dispatch = useDispatch();

  //selectors
  const orders = useSelector(selectUserOrders);
  const { currentUser } = useSelector((state) => state.auth);
  const userId = currentUser.user._id;
  const userOrderLoading = useSelector(selectUserOrderLoading);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(userId));
  }, [dispatch, userId]);

  return (
    <>
      {userOrderLoading ? (
        <Loader />
      ) : (
        <>
          {orders &&
            orders.length > 0 &&
            orders.map((order) => (
              <div key={order.id} className="mb-6 border px-4">
                <div className="mt-2">
                  <h1 className="text-xl mb-3 font-secondary">
                    Order: <span>#{order.id} </span>
                  </h1>
                  <h3 className=" mb-3 font-secondary">
                    Order Status:
                    <span className="font-bold">{order.status} </span>
                  </h3>
                  <div className="flow-root font-secondary">
                    {/* <ul role="list" className="-my-6 divide-y divide-gray-200">
      {order.items.map((item) => (
                        <li key={item.product.id} className="flex py-6">
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
                                  >
                                    {item.product.title}
                                  </Link>
                                </h3>
                                <p className="ml-4">
                                  ${item.product.discountPrice}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.product.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className=" flex gap-1 items-center font-secondary">
                                <label htmlFor="quantity">
                                  Qty: {item.quantity}
                                </label>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
      </ul> */}
                  </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6 font-secondary">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total Itmes</p>
                    <p>{order.totalItems} items</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${order.totalAmount}</p>
                  </div>
                </div>
                <div className="font-secondary">
                  <p>Shipping Address:</p>
                  <ul role="list" className="divide-y divide-gray-100">
                    <li className="flex justify-between px-4 gap-x-6 py-5  my-3 border-solid border-2 border-gray-200">
                      <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {order.selectedAddress.name}
                          </p>
                          <div className="flex gap-2 items-center justify-center">
                            <p className=" text-xs leading-5 text-gray-500">
                              {order.selectedAddress.street},
                            </p>
                            <p className=" text-xs leading-5 text-gray-500">
                              {order.selectedAddress.state}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <div className="flex gap-1 items-center justify-center">
                          <p className=" text-xs leading-5 text-gray-500">
                            {order.selectedAddress.city} -
                          </p>
                          <p className="text-xs leading-5 text-gray-500">
                            {order.selectedAddress.pinCode}
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
        </>
      )}
    </>
  );
};

export default UserOrders;
