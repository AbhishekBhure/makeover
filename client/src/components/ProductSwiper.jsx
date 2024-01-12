import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProductsByFiltersAsync } from "../features/product-list/productListSlice";

const ProductSwiper = () => {
  const [faceCategory, setFaceCategory] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch face category products
    dispatch(
      fetchProductsByFiltersAsync({
        filter: { category: ["face"] },
        pagination: { _page: 1, _limit: 6 }, // Fetch only 6 products
      })
    ).then((action) => {
      // Update the state with the fetched face category products
      setFaceCategory(action.payload.products);
    });
  }, [dispatch]);
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          320: {
            width: 293,
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper h-[420px]"
      >
        {faceCategory.length === 0 ? (
          <Loader />
        ) : (
          faceCategory &&
          faceCategory.map((product, index) => (
            <SwiperSlide
              key={index}
              className="bg-gray-100 rounded swiper-slide"
              style={{ width: "293px" }}
            >
              <div className="group relative p-3 ">
                <Link to={`/product-detail/${product.id}`}>
                  <div className="w-full h-[340px] overflow-hidden rounded-md bg-gray-200  group-hover:opacity-75">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm font-secondary ">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 "
                        />
                        <span className="line-clamp-1">{product.title}</span>

                        <span className="text-xs bg-pink-500 px-2 text-white rounded-full">
                          {product.brand}
                        </span>
                      </h3>
                    </div>
                    <div className="">
                      <p className="text-sm font-medium text-gray-700">
                        ₹{product.discountPrice}
                      </p>
                      <p className="text-sm text-gray-500 mt-1 line-through font-medium ">
                        ₹{product.price}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </>
  );
};

export default ProductSwiper;
