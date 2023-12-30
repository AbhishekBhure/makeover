import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITEMS_PER_PAGE } from "../../../constants/constants";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
} from "../../order/orderSlice";
import { LuEye, LuPencilLine } from "../../../icons";

const AdminOrders = () => {
  const dispatch = useDispatch();

  //selectors
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);

  //states
  const [page, setPage] = useState(1);

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync(pagination));
  }, [dispatch, page]);

  const handleShow = () => {
    console.log("show");
  };

  const handleEdit = () => {
    console.log("edit");
  };

  return (
    <>
      {/* component */}
      <div className="overflow-x-auto">
        <div className="font-secondary flex items-center justify-center bg-gray-100  overflow-hidden">
          <div className="w-full ">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Order No.</th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th className="py-3 px-6 text-left">Total Qantity</th>
                    <th className="py-3 px-6 text-left">Price</th>
                    <th className="py-3 px-6 text-center">Total Amount</th>
                    <th className="py-3 px-6 text-center">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className=" text-sm font-light">
                  {orders &&
                    orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-medium">{order.id}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          {order.items.map((item) => (
                            <div key={order.id} className="flex items-center">
                              <div className="mr-2 ">
                                <img
                                  className="w-8 h-8 rounded-full"
                                  src={item.images[0]}
                                  alt={item.title}
                                />
                              </div>
                              <span>{item.title}</span>
                            </div>
                          ))}
                        </td>
                        <td className="py-3 px-6 text-center">
                          {order.items.map((item) => (
                            <div
                              key={order.id}
                              className="flex items-center justify-center"
                            >
                              <span>{item.quantity}</span>
                            </div>
                          ))}
                        </td>

                        <td className="py-3 px-6 text-center">
                          {order.items.map((item) => (
                            <div
                              key={order.id}
                              className="flex items-center justify-center"
                            >
                              <span> ${item.price}</span>
                            </div>
                          ))}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className="">${order.totalAmount}</span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <strong className="">
                            {order.selectedAddress.name}
                          </strong>
                          <p> {order.selectedAddress.street}, </p>
                          <p> {order.selectedAddress.city}, </p>
                          <p> {order.selectedAddress.state}, </p>
                          <p> {order.selectedAddress.phone}, </p>
                          <p> {order.selectedAddress.pinCode}. </p>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center gap-1 justify-center">
                            <div className="w-4 mr-2 cursor-pointer transform hover:text-pink-500 hover:scale-110">
                              <LuEye
                                onClick={(e) => handleShow(order)}
                                className="w-5 h-5"
                              />
                            </div>
                            <div className="w-4 mr-2 cursor-pointer transform hover:text-pink-500 hover:scale-110">
                              <LuPencilLine
                                onClick={(e) => handleEdit(order)}
                                className="w-5 h-5"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
