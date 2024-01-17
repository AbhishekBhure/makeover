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

const Face = () => {
  const dispatch = useDispatch();

  const products = useSelector(selectAllProduct);
  const productLoading = useSelector(selectProductLoading);
  console.log(products);

  const [totalFace, setTotalFace] = useState(0);
  const [page, setPage] = useState(1);
  const [face, setFace] = useState([]);

  useEffect(() => {
    const faceCategories = products.filter(
      (product) => product.category === "face"
    );
    setFace(faceCategories);
    setTotalFace(faceCategories.length);
  }, [products]);

  useEffect(() => {
    const fetchFaceProducts = async () => {
      try {
        const pagination = { _page: page, _limit: totalFace };
        await dispatch(fetchProductsByFiltersAsync({ pagination }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchFaceProducts();
  }, [page, dispatch]);

  const handlePage = (page) => {
    setPage(page);
  };

  console.log("face", face);

  return (
    <Layout title={"MakeOver- Face"}>
      {productLoading ? (
        <Loader />
      ) : (
        <div className="bg-white font-secondary">
          <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {face &&
                face.length > 0 &&
                face.map((product) => (
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
                            <h3 className="text-sm">
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              <span className="line-clamp-1">
                                {product.title}
                              </span>

                              <span className="text-xs bg-pink-500 rounded-full px-2 text-white">
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
    </Layout>
  );
};

export default Face;
