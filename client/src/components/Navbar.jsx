import { Link } from "react-router-dom";
import { LuHeart, LuShoppingBag, LuSearch, LuText } from "../icons";
import { useState } from "react";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <Link to="/">
                <li>Face</li>
              </Link>
              <Link to="/">
                <li>Eyes</li>
              </Link>
              <Link to="/">
                <li>Lips</li>
              </Link>
              <Link to="/">
                <li>Nails</li>
              </Link>
              <Link to="/">
                <li>Tools & Brushes</li>
              </Link>
              <Link to="/">
                <li> Makeup Palettes </li>
              </Link>
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
          <div className="flex gap-3 items-center">
            <div>
              <Link to="/">
                <LuShoppingBag className="text-xl" />
              </Link>
            </div>
            <div>
              <Link to="/">
                <LuHeart className="text-xl" />
              </Link>
            </div>
          </div>
          <div>
            <Link to="/sign-in">
              <span>SignIn</span>
            </Link>
          </div>
        </div>
        {/* Mobile navigation */}
        <div className="md:hidden flex gap-3 items-center">
          <div className="flex gap-3 items-center">
            <div>
              <Link to="/">
                <LuShoppingBag className="text-xl" />
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
