import { Link, NavLink, useNavigate } from "react-router-dom";
import { LuHeart, LuShoppingBag, LuSearch, LuText } from "../icons";
import { useState } from "react";
import MobileNav from "./MobileNav";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../features/cart/cartSlice";
import { selectUser } from "../features/auth/authSlice";
import { fetchProductsByFiltersAsync } from "../features/product-list/productListSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //states
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  //selectors
  const items = useSelector(selectItems);
  const currentUser = useSelector(selectUser);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e, category) => {
    e.preventDefault();
    navigate("/product-listing");
    dispatch(fetchProductsByFiltersAsync({ searchTerm, category }));
    setSearchTerm("");
  };

  return (
    <header className="shadow font-primary">
      <div className="flex justify-between items-center max-w-7xl mx-auto py-3 px-5 md:px-0">
        <Link to="/">
          <h1 className="font-primary text-3xl flex flex-wrap md:text-4xl ">
            <span className="text-black">Make</span>
            <span className="text-pink-500">Over</span>
          </h1>
        </Link>
        <div className="hidden md:flex gap-5 items-center">
          <div className="categories flex items-center">
            <ul className="flex gap-8">
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
          <form
            onSubmit={handleSearch}
            className=" p-2 md:p-3 rounded-full flex items-center border  focus-within:border-slate-500 transition-border duration-300"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="bg-transparent focus:outline-none w-32 sm:w-64"
            />
            <button>
              <LuSearch className="text-xl" />
            </button>
          </form>
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Link to="/cart" className="flex relative">
                <LuShoppingBag className="text-xl" />
                {currentUser && items.length > 0 && (
                  <span className="hidden md:inline-flex absolute -top-2 left-3 items-center rounded-full bg-gray-50 px-1  text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                    {items.length}
                  </span>
                )}
              </Link>
            </div>
            <div>
              <Link to="/">
                <LuHeart className="text-xl" />
              </Link>
            </div>
          </div>
          <div>
            {currentUser && currentUser ? (
              <Link
                to={`/profile/${
                  currentUser.user.role === "admin" ? "admin" : "user"
                }`}
              >
                <img
                  src={currentUser.user.avatar}
                  alt={currentUser.user._id}
                  className="w-9 h-9 rounded-full"
                />
              </Link>
            ) : (
              <Link to="/sign-in">
                <span>SignIn</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden flex gap-3 items-center">
          <div className="flex gap-3 items-center">
            <div>
              <Link to="/cart" className="flex relative">
                <LuShoppingBag className="text-xl" />
                {currentUser && items.length > 0 && (
                  <span className="absolute md:hidden  -top-2 left-3 items-center rounded-full bg-gray-50 px-1 text-xs  text-gray-600 ring-1 ring-inset ring-gray-500/10">
                    {items.length}
                  </span>
                )}
              </Link>
            </div>
            <div>
              <Link to="/">
                <LuHeart className="text-xl" />
              </Link>
            </div>
          </div>
          <div>
            {currentUser ? (
              <Link
                to={`/profile/${
                  currentUser.user.role === "admin" ? "admin" : "user"
                }`}
              >
                <img
                  src={currentUser.user.avatar}
                  alt={currentUser.user._id}
                  className=" w-7 h-7 md:w-9 md:h-9 rounded-full"
                />
              </Link>
            ) : (
              <Link to="/sign-in">
                <span>SignIn</span>
              </Link>
            )}
          </div>
          <button
            onClick={toggleMobileMenu}
            className="text-xl focus:outline-none"
          >
            <LuText
              className={` ${isMobileMenuOpen ? "opacity-0" : "text-2xl"} `}
            />
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <MobileNav
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />
      )}
    </header>
  );
};

export default Navbar;
