import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITEMS_PER_PAGE } from "../../../constants/constants";
import {
  fetchAllOrdersAsync,
  selectOrderLoading,
  selectOrders,
  selectTotalOrders,
  updateOrderStatusAsync,
} from "../../order/orderSlice";
import { LuEye, LuPencilLine, LuArrowDown, LuArrowUp } from "../../../icons";
import Pagination from "../../../components/Pagination";
import { useSnackbar } from "notistack";
import Loader from "../../../components/Loader";
import BackButton from "../../../components/BackButton";

const AdminOrders = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  //selectors
  const orders = useSelector(selectOrders);
  console.log(orders);
  const totalOrders = useSelector(selectTotalOrders);
  const orderLoading = useSelector(selectOrderLoading);

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
    dispatch(
      updateOrderStatusAsync({
        order: updatedOrderStatus,
        alert: enqueueSnackbar,
      })
    );
    setEditOrderId(-1);
  };

  const handlePaymentStatus = (e, order) => {
    const updatedOrderStatus = { ...order, paymentStatus: e.target.value };
    dispatch(
      updateOrderStatusAsync({
        order: updatedOrderStatus,
        alert: enqueueSnackbar,
      })
    );
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
      case "recived":
        return "bg-green-200 text-green-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sort);
  };

  return (
    <>
      {/* component */}
      {orderLoading ? (
        <Loader />
      ) : (
        <>
          <BackButton />
          <div className="overflow-x-auto">
            <div className="font-secondary flex items-center justify-center">
              <div className="w-full">
                <div className="bg-white rounded my-6">
                  <table className="min-w-max w-full table-auto">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="p-3 text-left">Order No.</th>
                        <th className="p-3 text-left">Items</th>
                        <th className="p-3 text-left">Total Qantity</th>
                        <th className="p-3 text-left">Price</th>
                        <th
                          className="py-3 px-2 inline-flex gap-1 items-center text-left cursor-pointer"
                          onClick={(e) =>
                            handleSort({
                              sort: "totalAmount",
                              order: sort?._order === "asc" ? "desc" : "asc",
                            })
                          }
                        >
                          Total Amount
                          {sort?._order === "asc" ? (
                            <span>
                              <LuArrowUp className="text-xl" />
                            </span>
                          ) : (
                            <span>
                              <LuArrowDown className="text-xl" />
                            </span>
                          )}
                        </th>
                        {/* <th className="py-3 px-4 text-center">Shipping Address</th> */}
                        <th className="p-3 text-center">Order Status</th>
                        <th className="p-3 text-center">Payment Status</th>
                        <th
                          className="p-3 inline-flex gap-1 items-center text-left cursor-pointer"
                          onClick={(e) =>
                            handleSort({
                              sort: "createdAt",
                              order: sort?._order === "asc" ? "desc" : "asc",
                            })
                          }
                        >
                          Order Time
                          {sort._sort === "createdAt" &&
                          sort._order === "asc" ? (
                            <span>
                              <LuArrowUp className="text-xl" />
                            </span>
                          ) : (
                            <span>
                              <LuArrowDown className="text-xl" />
                            </span>
                          )}
                        </th>
                        <th className="p-3 ">Last Updated</th>
                        <th className="p-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className=" text-sm font-light">
                      {orderLoading ? (
                        <Loader />
                      ) : (
                        orders &&
                        orders.map((order, index) => (
                          <tr
                            key={order.id}
                            className="border-b border-gray-200 hover:bg-gray-100"
                          >
                            <td className="py-3 px-4 text-left whitespace-nowrap">
                              <div className="flex items-center">
                                <span className="font-medium">{index + 1}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-left">
                              {order.items.map((item) => (
                                <div
                                  key={order.id}
                                  className="flex items-center"
                                >
                                  <div className="mr-2 ">
                                    <img
                                      className="w-8 h-8 rounded-full"
                                      src={item.product.images[0]}
                                      alt={item.product.title}
                                    />
                                  </div>
                                  <span>{item.product.title}</span>
                                </div>
                              ))}
                            </td>
                            <td className="py-3 px-4 text-center">
                              {order.items.map((item) => (
                                <div
                                  key={order.id}
                                  className="flex items-center justify-center"
                                >
                                  <span>{item.quantity}</span>
                                </div>
                              ))}
                            </td>

                            <td className="py-3 px-4 text-center">
                              {order.items.map((item) => (
                                <div
                                  key={order.id}
                                  className="flex items-center justify-center"
                                >
                                  <span> ₹{item.product.discountPrice}</span>
                                </div>
                              ))}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="">₹{order.totalAmount}</span>
                            </td>
                            {/* <td className="py-3 px-4 text-center">
                          <strong className="">
                            {order.selectedAddress.name}
                          </strong>
                          <p> {order.selectedAddress.street}, </p>
                          <p> {order.selectedAddress.city}, </p>
                          <p> {order.selectedAddress.state}, </p>
                          <p> {order.selectedAddress.pinCode}. </p>
                        </td> */}
                            <td className="py-3 px-4 text-center">
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
                            <td className="py-3 px-4 text-center">
                              {order.id === editOrderId ? (
                                <select
                                  onChange={(e) =>
                                    handlePaymentStatus(e, order)
                                  }
                                >
                                  <option value="pending">Pending</option>
                                  <option value="recived">Recived</option>
                                </select>
                              ) : (
                                <span
                                  className={`${statusColors(
                                    order.paymentStatus
                                  )} py-1 px-3 rounded-full text-xs`}
                                >
                                  {order.paymentStatus}
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="">
                                {order.createdAt
                                  ? new Date(order.createdAt).toLocaleString()
                                  : "N/A"}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="">
                                {order.updatedAt
                                  ? new Date(order.updatedAt).toLocaleString()
                                  : "N/A"}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div className="flex item-center gap-1 justify-center">
                                <div className="w-4 mr-2 cursor-pointer transform hover:text-pink-500 hover:scale-110">
                                  <LuEye
                                    onClick={(e) => handleShow(order)}
                                    className="text-xl"
                                  />
                                </div>
                                <div className="w-4 mr-2 cursor-pointer transform hover:text-pink-500 hover:scale-110">
                                  <LuPencilLine
                                    onClick={(e) => handleEdit(order)}
                                    className="text-xl"
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
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
      )}
    </>
  );
};

export default AdminOrders;
