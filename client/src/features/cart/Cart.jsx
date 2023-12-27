import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  deleteItemsFromCartAsync,
  selectItems,
  updateItemsAsync,
} from "./cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const totalAmount = items.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateItemsAsync({ ...item, quantity: +e.target.value }));
  };

  const handleDeleteItem = (e, itemId) => {
    dispatch(deleteItemsFromCartAsync(itemId));
  };

  return (
    <>
      {!items.length && <Navigate to="/" replace={true} />}
      <div className="mt-8 ">
        <h1 className="text-4xl mb-3 font-primary">Cart</h1>
        <div className="flow-root font-secondary">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <Link to={`/product-detail/${item.id}`}>
                          {item.title}
                        </Link>
                      </h3>
                      <p className="ml-4">${item.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className=" flex gap-1 items-center font-secondary">
                      <label htmlFor="quantity">Qty</label>

                      <select
                        onChange={(e) => handleQuantity(e, item)}
                        value={item.quantity}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                      </select>
                    </div>

                    <div className="flex">
                      <button
                        onClick={(e) => handleDeleteItem(e, item.id)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
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
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-pink-500 px-6 py-3 text-base  text-white shadow-sm hover:bg-pink-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex  justify-center text-center text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="font-bold">OR</span>

            <Link to="/">
              <button
                type="button"
                className="font-medium flex gap-1 items-center justify-center text-gray-500 hover:text-gray-700"
              >
                Continue Shopping
                <span>
                  <ArrowRightIcon className="w-4" />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
