import { LuArrowLeft } from "react-icons/lu";
import Layout from "../components/Layout";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCartAsync } from "../features/cart/cartSlice";
import { resetOrder } from "../features/order/orderSlice";

const OrderSuccessPage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  //selectors
  const { currentUser } = useSelector((state) => state.auth);
  const user = currentUser.user;

  useEffect(() => {
    //reset cart
    dispatch(resetCartAsync(user._id));

    //reset currentOrder
    dispatch(resetOrder());
  }, [dispatch, user]);

  return (
    <>
      {!params.id && <Navigate to="/" replace={true} />}
      <Layout title={"Order Success"}>
        <div className="my-8">
          <div className="flex flex-col gap-4 items-center justify-center">
            <h1 className="text-3xl text-pretty text-center font-primary">
              Order Successfully Placed
            </h1>
            <p className="font-secondary text-2xl">
              Order Number <span className="italic">#{params?.id}</span>
            </p>
            <p className="font-secondary">
              Check your order in My Account &gt; My Orders
            </p>

            <Link
              to="/profile/user/orders"
              className="font-secondary bg-pink-500 text-white hover:bg-pink-800 transition-colors duration-500 rounded-full p-2"
            >
              <button type="button" className="px-3 flex items-center gap-2">
                <span>
                  <LuArrowLeft />
                </span>
                My Orders
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default OrderSuccessPage;
