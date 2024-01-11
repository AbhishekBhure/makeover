import { LuX, LuSearch, LuLogOut, LuListOrdered, LuPlus } from "../icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFiltersAsync } from "../features/product-list/productListSlice";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import {
  selectUser,
  signOutUserFail,
  signOutUserStart,
  signOutUserSuccess,
} from "../features/auth/authSlice";
import { useSnackbar } from "notistack";

const MobileNav = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/product-listing");
    dispatch(fetchProductsByFiltersAsync({ searchTerm }));
    setSearchTerm("");
  };

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

  return (
    <Transition.Root show={isMobileMenuOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={toggleMobileMenu}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <div className="">
                  <button
                    onClick={toggleMobileMenu}
                    className="focus:outline-none absolute top-3.5 right-4"
                  >
                    <LuX className="text-2xl" />
                  </button>
                  <div className="categories flex flex-col gap-3 ">
                    <form
                      onSubmit={handleSearch}
                      className=" p-2 md:p-3 rounded-full flex justify-between items-center border  focus-within:border-slate-500 transition-border duration-300"
                    >
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search products..."
                        className="bg-transparent focus:outline-none w-40 sm:w-64 "
                      />
                      <button>
                        <LuSearch className="text-xl" />
                      </button>
                    </form>
                    <ul className="flex flex-col gap-4">
                      {user && user.user.role === "admin" && (
                        <>
                          <Link to="/profile/admin/product-form">
                            <button className="flex gap-2 items-center justify-center">
                              Add New Product
                              <span>
                                <LuPlus className="w-5 h-5" />
                              </span>
                            </button>
                          </Link>
                          <Link to={"/profile/admin/orders"}>
                            <button className="flex gap-2 items-center justify-center">
                              Orders
                              <span>
                                <LuListOrdered className="w-5 h-5" />
                              </span>
                            </button>
                          </Link>
                          <Link to={"/"}>
                            <button
                              onClick={handleSignOut}
                              className="flex gap-2 items-center justify-center"
                            >
                              Sign Out
                              <span>
                                <LuLogOut className="w-5 h-5" />
                              </span>
                            </button>
                          </Link>
                        </>
                      )}
                      <NavLink
                        to="/face"
                        className={({ isActive }) =>
                          isActive ? " font-bold text-pink-500" : ""
                        }
                      >
                        <li>Face</li>
                      </NavLink>
                      <NavLink
                        to="/eyes"
                        className={({ isActive }) =>
                          isActive ? " font-bold text-pink-500" : ""
                        }
                      >
                        <li>Eyes</li>
                      </NavLink>
                      <NavLink
                        to="/lips"
                        className={({ isActive }) =>
                          isActive ? " font-bold text-pink-500" : ""
                        }
                      >
                        <li>Lips</li>
                      </NavLink>
                      <NavLink
                        to="/nails"
                        className={({ isActive }) =>
                          isActive ? " font-bold text-pink-500" : ""
                        }
                      >
                        <li>Nails</li>
                      </NavLink>
                      <NavLink
                        to="/product-listing"
                        className={({ isActive }) =>
                          isActive ? " font-bold text-pink-500" : ""
                        }
                      >
                        <li>Others</li>
                      </NavLink>
                    </ul>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MobileNav;
