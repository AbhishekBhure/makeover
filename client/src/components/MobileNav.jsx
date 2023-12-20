import React from "react";
import { LuX, LuSearch } from "../icons";
import { Link } from "react-router-dom";

const MobileNav = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  return (
    <div className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
      <div className="max-w-6xl mx-auto h-full">
        <div
          className={`flex h-full transition-transform duration-500 transform ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="w-3/4 bg-white p-4 overflow-y-auto">
            <button
              onClick={toggleMobileMenu}
              className="focus:outline-none absolute top-3.5 right-4"
            >
              <LuX className="text-2xl" />
            </button>
            <div className="categories flex flex-col gap-3 ">
              <form className=" p-2 md:p-3 rounded-full flex justify-between items-center border  focus-within:border-slate-500 transition-border duration-300">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent focus:outline-none w-32 sm:w-64"
                />
                <LuSearch className="text-xl" />
              </form>
              <ul className="flex flex-col gap-4">
                <Link to="/face">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
