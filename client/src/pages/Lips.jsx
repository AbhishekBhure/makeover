import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import {
  fetchProductsByFiltersAsync,
  selectAllProduct,
  selectProductLoading,
  selectTotalItems,
} from "../features/product-list/productListSlice";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { LuStar } from "../icons";
import Pagination from "../components/Pagination";

const Lips = () => {
  const dispatch = useDispatch();

  const products = useSelector(selectAllProduct);
  const productLoading = useSelector(selectProductLoading);

  const [totalLips, setTotalLips] = useState(0);
  const [page, setPage] = useState(1);
  const [lips, setLips] = useState([]);

  useEffect(() => {
    const lipsCategories = products.filter(
      (product) => product.category === "lips"
    );
    setLips(lipsCategories);
    setTotalLips(lipsCategories.length);
  }, [products]);

  useEffect(() => {
    const fetchLipsProducts = async () => {
      try {
        const pagination = { _page: page, _limit: totalLips };
        await dispatch(fetchProductsByFiltersAsync({ pagination }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchLipsProducts();
  }, [page]);

  const handlePage = (page) => {
    setPage(page);
  };
  return (
    <Layout title={"MakeOver- Lips"}>
      {lips.length === 0 ? (
        <Loader />
      ) : (
        <div className="bg-white font-secondary">
          <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {lips &&
                lips.length > 0 &&
                lips.map((product) => (
                  <div key={product.id}>
                    <div className="group relative shadow-md  p-3">
                      <Link to={`/product-detail/${product.id}`}>
                        <div className="aspect-w-1 w-full h-[340px] overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 transition-opacity duration-500">
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                          />
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm ">
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {product.title}
                              <span className="text-xs ml-2 bg-pink-500 rounded-full px-2 text-white">
                                {product.brand}
                              </span>
                            </h3>
                            <div className="mt-1 items-center gap-1 flex text-gray-600">
                              <LuStar className="w-4 h-4" />
                              <span className=" text-sm">{product.rating}</span>
                            </div>
                          </div>
                          <div className="">
                            <p className="text-sm font-medium ">
                              ₹{product.discountPrice}
                            </p>
                            <p className="text-sm mt-1 line-through font-medium ">
                              ₹{product.price}
                            </p>
                          </div>
                        </div>
                        {product.deleted && (
                          <div>
                            <p className="text-red-500 text-sm">
                              product deleted
                            </p>
                          </div>
                        )}
                        {product.stock <= 0 && (
                          <div>
                            <p className="text-red-500 text-sm">Out of stock</p>
                          </div>
                        )}
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalLips}
      />
    </Layout>
  );
};

export default Lips;
