import { LuArrowRight, LuTrash2 } from "../../icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteItemsFromCartAsync,
  selectCartLoading,
  selectItems,
  updateItemsAsync,
} from "./cartSlice";
import { useSnackbar } from "notistack";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useState } from "react";
import EmptyCart from "../../components/EmptyCart";
import Loader from "../../components/Loader";

export default function Cart() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  //states
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  //selectors
  const items = useSelector(selectItems);
  const cartLoading = useSelector(selectCartLoading);

  const totalAmount = items.reduce(
    (amount, item) => item.product.discountPrice * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateItemsAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleDeleteItem = (itemId) => {
    dispatch(deleteItemsFromCartAsync(itemId));
    setShowModal(false);
    enqueueSnackbar("Item Removed", { variant: "success" });
  };

  const showConfirmationModal = (itemId) => {
    setShowModal(true);
    setDeleteId(itemId);
  };

  return (
    <>
      {!items.length ? (
        <EmptyCart />
      ) : (
        <>
          {cartLoading ? (
            <Loader />
          ) : (
            <>
              <div className="mt-8 ">
                <ConfirmationModal
                  title="Delete Cart Item"
                  message="Are you sure you want to delete item from the cart?"
                  dangerTag="Delete"
                  cancelTag="Cancel"
                  dangerAction={() => handleDeleteItem(deleteId)}
                  cancelAction={() => setShowModal(false)}
                  showModal={showModal}
                />
                <h1 className="text-4xl mb-3 font-primary">Cart</h1>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
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
                              <h3 className="font-secondary">
                                <Link to={`/product-detail/${item.product.id}`}>
                                  {item.product.title}
                                </Link>
                              </h3>
                              <p className="ml-4">
                                ₹{item.product.discountPrice}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 font-secondary">
                              {item.product.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className=" flex gap-3 items-center font-secondary">
                              <label htmlFor="quantity">Qty</label>

                              <input
                                className="w-10 border"
                                type="number"
                                onChange={(e) => handleQuantity(e, item)}
                                value={item.quantity}
                                max={item.product.stock}
                              />
                            </div>

                            <div className="flex">
                              <button
                                onClick={() => showConfirmationModal(item.id)}
                                type="button"
                                className="p-3"
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
                <div className="flex justify-between text-base font-medium font-secondary text-gray-900">
                  <p>Total Itmes</p>
                  <p>{totalItems} items</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p className="font-secondary">Subtotal</p>
                  <p>₹{totalAmount}</p>
                </div>

                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Link
                    to="/checkout"
                    className="flex items-center justify-center rounded-md border border-transparent bg-pink-500 px-6 py-3 text-base  text-white shadow-sm hover:bg-pink-700"
                  >
                    Checkout
                  </Link>
                </div>
                <div className="mt-6 flex  justify-center text-center text-sm text-gray-500">
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-bold">OR</span>
                    <Link to="/">
                      <button
                        type="button"
                        className="font-medium flex gap-1 items-center justify-center  text-gray-500 hover:text-gray-600 "
                      >
                        <span>Continue Shopping</span>
                        <span>
                          <LuArrowRight className="w-5 h-5" />
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
