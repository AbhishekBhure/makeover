import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsByFiltersAsync,
  selectProductLoading,
} from "../features/product-list/productListSlice";
import { useEffect } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const SwipperCards = () => {
  const dispatch = useDispatch();
  const [recommanded, setRecommanded] = useState([]);

  const productLoading = useSelector(selectProductLoading);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(
          fetchProductsByFiltersAsync({
            filter: { category: ["eyes"] },
            pagination: { _page: 1, _limit: 6 }, // Fetch only 6 products
          })
        ).then((action) => {
          // Update the state with the fetched face category products
          setRecommanded(action.payload.products);
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper w-[270px] h-[420px]"
      >
        {productLoading ? (
          <Loader />
        ) : (
          recommanded &&
          recommanded.map((product) => (
            <SwiperSlide key={product.id} className="bg-gray-100 rounded">
              <div key={product.id} className="group relative p-3">
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
                      <h3 className="text-sm font-secondary">
                        <span aria-hidden="true" className="absolute inset-0" />
                        <span className="line-clamp-1"> {product.title}</span>

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
    </div>
  );
};

export default SwipperCards;
