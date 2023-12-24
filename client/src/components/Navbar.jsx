import { Link, NavLink } from "react-router-dom";
import { LuHeart, LuShoppingBag, LuSearch, LuText } from "../icons";
import { useState } from "react";
import MobileNav from "./MobileNav";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="shadow font-primary">
      <div className="flex justify-between items-center max-w-7xl mx-auto py-3 px-5 md:px-0">
        <Link to="/">
          <h1 className="font-primary text-xl flex flex-wrap md:text-4xl ">
            <span>Make</span>
            <span className="text-pink-500">Over</span>
          </h1>
        </Link>
        <div className="hidden md:flex gap-5 items-center">
          <div className="categories flex items-center">
            <ul className="flex gap-4">
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
                to="/tools-brushes"
                className={({ isActive }) =>
                  isActive ? " font-bold text-pink-500" : ""
                }
              >
                <li>Tools & Brushes</li>
              </NavLink>
              <NavLink
                to="/makeup-palettes"
                className={({ isActive }) =>
                  isActive ? " font-bold text-pink-500" : ""
                }
              >
                <li> Makeup Palettes </li>
              </NavLink>
            </ul>
          </div>
          <form className=" p-2 md:p-3 rounded-full flex items-center border  focus-within:border-slate-500 transition-border duration-300">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent focus:outline-none w-32 sm:w-64"
            />
            <LuSearch className="text-xl" />
          </form>
          <div className="flex gap-5 items-center">
            <div className="relative">
              <Link to="/cart" className="flex relative">
                <LuShoppingBag className="text-xl" />
                <span className=" hidden md:inline-flex absolute -top-2 left-3   items-center rounded-full bg-gray-50 px-1  text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  3
                </span>
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
                <span>{currentUser.user.username}</span>
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
          <div className="flex gap-5 items-center">
            <div>
              <Link to="/cart" className="flex relative">
                <LuShoppingBag className="text-xl" />
                <span className="absolute md:hidden  -top-2 left-3 items-center rounded-full bg-gray-50 px-1 text-xs  text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  3
                </span>
              </Link>
            </div>
            <div>
              <Link to="/">
                <LuHeart className="text-xl" />
              </Link>
            </div>
          </div>
          <Link to="/sign-in" className="md:hidden">
            <span>SignIn</span>
          </Link>
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
