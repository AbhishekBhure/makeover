import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
const OrderDetail = ({ showModal, handleCancel, orders }) => {
  const cancelButtonRef = useRef(null);

  return (
    <div>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8">
                  <div className="p-3">
                    <Dialog.Title className="text-xl">User Order</Dialog.Title>
                    <p>
                      Order Id: <span className="text-sm">{orders.id}</span>
                    </p>
                    <div>
                      <h1 className="text-xl">Items</h1>
                      {orders?.items?.length > 0 &&
                        orders.items.map((item) => (
                          <div key={item.id}>
                            <div className="flex gap-4 py-3">
                              <img
                                className="w-16 h-16 rounded-full"
                                src={item.product.images[0]}
                                alt={item.product.title}
                              />
                              <div>
                                <p className="line-clamp-1">
                                  {item.product.title}
                                </p>
                                <p className="flex gap-2">
                                  <span className="capitalize">
                                    Brand: {item.product.brand}
                                  </span>
                                  <span className="capitalize">
                                    Category: {item.product.category}{" "}
                                  </span>
                                </p>

                                <p className="flex gap-2">
                                  <span>
                                    Discount: {item.product.discountPercentage}%
                                  </span>
                                  <span>
                                    Discounted Price: ₹
                                    {item.product.discountPrice}
                                  </span>
                                  <span>
                                    Orignal Price: ₹{item.product.price}
                                  </span>
                                </p>
                                <p>Quantity: {item.quantity}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      <div className="bg-gray-200 px-3 rounded">
                        <h2>Selected Address:</h2>
                        <p className="flex gap-2">
                          <span className="capitalize">
                            User name: {orders?.selectedAddress?.name}{" "}
                          </span>
                          <span>Email: {orders?.selectedAddress?.email} </span>
                        </p>
                        <p className="flex gap-2">
                          <span className="capitalize">
                            Street: {orders?.selectedAddress?.street}{" "}
                          </span>
                          <span className="capitalize">
                            City: {orders?.selectedAddress?.city}
                          </span>
                          <span className="capitalize">
                            State: {orders?.selectedAddress?.state}
                          </span>
                          <span>
                            Pincode: {orders?.selectedAddress?.pinCode}
                          </span>
                        </p>
                      </div>
                    </div>
                    <p className="flex gap-2 p-3">
                      <span>Total Items: {orders.totalItems} </span>
                      <span>Total Amount: ₹{orders.totalAmount} </span>
                    </p>
                    <div className="font-secondary flex items-center justify-end gap-x-6">
                      <button
                        type="button"
                        onClick={handleCancel}
                        ref={cancelButtonRef}
                        className="text-sm leading-6 border px-3 py-1 rounded-full border-black text-gray-900"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default OrderDetail;
