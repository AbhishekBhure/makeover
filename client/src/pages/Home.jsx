import Layout from "../components/Layout";
import { Link, NavLink } from "react-router-dom";
import { LuArrowDown, LuArrowRight, lipstick, mascara } from "../icons";
import SwipperCards from "../components/SwipperCards";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsByFiltersAsync,
  selectAllProduct,
} from "../features/product-list/productListSlice";

const Home = () => {
  const [faceCategory, setFaceCategory] = useState([]);
  const products = useSelector(selectAllProduct);

  useEffect(() => {
    const eyesCategories = products.filter(
      (product) => product.category === "eyes"
    );
    setFaceCategory(eyesCategories);
  }, []);

  console.log("eyes", faceCategory);

  return (
    <Layout>
      <main>
        {/* hero section */}
        <section className="md:min-h-dvh">
          <div className="grid grid-cols-2 grid-rows-1 gap-3 relative">
            <div className="md:px-8 md:py-36 col-span-full sm:col-auto py-12">
              <h1 className="font-primary text-5xl leading-tight">
                Unveil your best <span className="text-pink-500">self </span>
                with our <span className="text-pink-500">Makeup </span>
                Collection
              </h1>
              <NavLink to="#products-section">
                <button
                  className="bg-pink-500 hover:bg-pink-600 transition-colors duration-300 flex items-center justify-center p-3 gap-2 shadow-2xl mt-5 rounded-full text-white "
                  type="button"
                >
                  <span className="font-secondary">Shop Now</span>
                  <LuArrowDown className="w-5 h-5 animate-pulse" />
                </button>
              </NavLink>
              <img
                src={lipstick}
                alt="lipstick"
                className="absolute left-24 top-64 w-[150px] md:hidden"
              />
              <img
                src={mascara}
                alt="mascara"
                className="absolute -right-6 md:-right-16 -z-10  w-[150px] top-20 md:hidden"
              />
            </div>
            <div className="relative hidden md:block">
              <img
                src={lipstick}
                alt="lipstick"
                className="absolute -left-36"
              />
              <img src={mascara} alt="mascara" className="absolute -right-20" />
            </div>
          </div>
        </section>
        {/* hero section end */}
        {/* products section */}
        <section id="products-section" className="my-7 overflow-hidden">
          <div className="grid grid-cols-2  gap-3">
            <div className="md:px-8 md:py-20 py-12 col-span-full sm:col-auto">
              <h1 className="text-4xl sm:text-5xl font-primary leading-tight">
                <span className="text-pink-500">Special</span> Recommanded
                <br /> for <span className="text-pink-500">you</span>
              </h1>
              <Link to="/product-listing">
                <button className="bg-pink-500 hover:bg-pink-600 transition-colors duration-300 flex items-center justify-center p-3 gap-2 shadow-2xl mt-5 rounded-full text-white ">
                  More Products
                  <LuArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
            <div className="col-span-full sm:col-auto">
              <SwipperCards />
            </div>
          </div>
        </section>
        {/* products section end*/}

        {/* Eyes categories */}
        <section className="my-7 overflow-hidden">
          <div>
            <div>
              <h2 className="text-4xl font-primary text-center">Face</h2>
            </div>
            <div></div>
          </div>
        </section>
        {/* Eyes categories end*/}
      </main>
    </Layout>
  );
};

export default Home;
