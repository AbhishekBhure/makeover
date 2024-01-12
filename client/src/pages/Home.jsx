import Layout from "../components/Layout";
import { Link, NavLink } from "react-router-dom";
import {
  LuArrowDown,
  LuArrowLeft,
  LuArrowRight,
  lipstick,
  mascara,
  sugarFound,
  howTo1,
  howTo2,
  sugarFound2,
  sugarFound3,
} from "../icons";
import SwipperCards from "../components/SwipperCards";
import { useRef } from "react";

import ProductSwiper from "../components/ProductSwiper";

const Home = () => {
  const productsSectionRef = useRef();
  return (
    <Layout>
      <main className="overflow-hidden">
        {/* hero section */}
        <section className="md:min-h-dvh">
          <div className="grid grid-cols-2 grid-rows-1 gap-3 relative">
            <div className="md:px-8 md:py-36 col-span-full sm:col-auto py-12">
              <h1 className="font-primary text-5xl leading-tight">
                Unveil your best <span className="text-pink-500">self </span>
                with our <span className="text-pink-500">Makeup </span>
                Collection
              </h1>
              <p className="text-base mt-4 text-slate-600">
                Indulge in the art of self-expression with our exquisite Makeup
                Collection. Elevate your beauty routine and unveil your best
                self with a stunning array of colors and textures carefully
                curated to enhance your unique features.
              </p>
              <NavLink to="#products-section">
                <button
                  onClick={() =>
                    productsSectionRef.current.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
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
                className="absolute left-24 top-[25rem] w-[150px] md:hidden"
              />
              <img
                src={mascara}
                alt="mascara"
                className="absolute -right-7 md:-right-16 -z-10  w-[150px] top-20 md:hidden"
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
        <section
          ref={productsSectionRef}
          className="my-7 overflow-hidden min-h-[80vh]"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="md:px-8 md:py-20 py-12 col-span-full  sm:col-auto">
              <h1 className="text-4xl sm:text-5xl font-primary sm:leading-tight text-center sm:text-left">
                <span className="text-pink-500">Special </span>
                Recommanded
                <br /> for <span className="text-pink-500">you</span>
              </h1>
              <p className="text-base mt-4 text-slate-600 text-center sm:text-left">
                From vibrant pigments to luxurious formulations, our collection
                is designed to inspire confidence and creativity.
              </p>
              <Link
                to="/product-listing"
                className="flex items-center justify-center sm:justify-start"
              >
                <button className="bg-pink-500 hover:bg-pink-600 transition-colors duration-300 flex items-center justify-center  p-3 gap-2 shadow-2xl mt-5 rounded-full text-white ">
                  More Products
                  <LuArrowRight className="w-5 h-5 hidden sm:block" />
                </button>
              </Link>
            </div>
            <div className="col-span-full sm:col-auto">
              <SwipperCards />
            </div>
          </div>
        </section>
        {/* products section end*/}

        {/* Face categories */}
        <section className="my-7 overflow-hidden min-h-[80vh]">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-full sm:col-span-2 ">
              <ProductSwiper />
            </div>
            <div className="md:px-8 md:py-20 py-12 col-span-full sm:col-span-1 order-first sm:order-last">
              <div className="flex flex-col items-center sm:items-end">
                <h1 className="text-4xl text-center sm:text-right sm:text-5xl font-primary sm:leading-tight">
                  The Perfect
                  <br /> <span className="text-pink-500">Beauty</span> of you
                </h1>
                <Link to="/face">
                  <button className="bg-pink-500  hover:bg-pink-600 transition-colors duration-300 flex items-center justify-center p-3 gap-2 shadow-2xl mt-5 rounded-full text-white ">
                    <LuArrowLeft className="w-5 h-5 hidden sm:block" />
                    More Products
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* Face categories end*/}

        {/* suagr found */}
        <section className="my-7 px-10 overflow-hidden min-h-[80vh] border rounded-3xl bg-pink-100">
          <div>
            <h1 className="text-4xl sm:text-5xl font-primary leading-tight text-center pt-5">
              Define Your <span className="text-pink-500">Glow</span>
            </h1>
          </div>
          <div className="flex flex-wrap items-center  gap-0 sm:gap-5 py-3 sm:py-7">
            <div className="w-[400px] sm:h-[500px] py-5 sm:py-10">
              <img src={howTo1} alt="how1" />
              <img src={howTo2} alt="how2" />
            </div>
            <div className="sm:w-[350px] sm:h-[450px]">
              <img src={sugarFound} alt="sugarFound" className="sm:h-full" />
            </div>
            <div className="w-[400px]">
              <img src={sugarFound2} alt="sugarfound2" />
              <img src={sugarFound3} alt="sugarfound3" />
            </div>
          </div>
        </section>
        {/* sugar found end*/}
      </main>
    </Layout>
  );
};

export default Home;
