import { LuX, LuSearch } from "../icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFiltersAsync } from "../features/product-list/productListSlice";
import { useState } from "react";

const MobileNav = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/");
    dispatch(fetchProductsByFiltersAsync({ searchTerm }));
    setSearchTerm("");
  };

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
