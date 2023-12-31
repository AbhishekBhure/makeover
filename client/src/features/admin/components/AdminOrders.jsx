import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../constants/constants";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderStatusAsync,
} from "../../order/orderSlice";
import { LuEye, LuPencilLine, LuArrowDown, LuArrowUp } from "../../../icons";
import Pagination from "../../../components/Pagination";

const AdminOrders = () => {
  const dispatch = useDispatch();

  //selectors
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);

  //states
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const [editOrderId, setEditOrderId] = useState(-1);

  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  const handleShow = () => {
    console.log("show");
  };

  const handleEdit = (order) => {
    setEditOrderId(order.id);
  };

  const handleUpdateStatus = (e, order) => {
    const updatedOrderStatus = { ...order, status: e.target.value };
    dispatch(updateOrderStatusAsync(updatedOrderStatus));
    setEditOrderId(-1);
  };

  const statusColors = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-green-200 text-green-600";
      case "delivered":
        return "bg-yellow-200 text-yellow-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sort);
    console.log({ sort });
  };

  return (
    <>
      {/* component */}
      <div className="overflow-x-auto">
        <div className="font-secondary flex items-center justify-center  ">
          <div className="w-full ">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th
                      className="py-3 px-6 inline-flex gap-1 items-center text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "id",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Order No.
                      {sort?._order === "asc" ? (
                        <span>
                          <LuArrowUp className="w-5 h-5" />
                        </span>
                      ) : (
                        <span>
                          <LuArrowDown className="w-5 h-5" />
                        </span>
                      )}
                    </th>
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
                              <span> ${discountedPrice(item)}</span>
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
                          {order.id === editOrderId ? (
                            <select
                              onChange={(e) => handleUpdateStatus(e, order)}
                            >
                              <option value="pending">Pending</option>
                              <option value="dispatched">Dispatched</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          ) : (
                            <span
                              className={`${statusColors(
                                order.status
                              )} py-1 px-3 rounded-full text-xs`}
                            >
                              {order.status}
                            </span>
                          )}
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
        <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalItems={totalOrders}
        />
      </div>
    </>
  );
};

export default AdminOrders;
