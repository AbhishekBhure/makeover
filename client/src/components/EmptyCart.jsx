import { LuArrowLeft } from "react-icons/lu";
import { Link } from "react-router-dom";
import Layout from "./Layout";

const EmptyCart = () => {
  return (
    <Layout title={"MakeOver - Empty Cart"}>
      <div className="flex flex-col mt-8 gap-4 items-center justify-center">
        <h1 className="text-5xl text-center leading-normal font-primary">
          Oops! Cart is Empty
        </h1>
        <Link
          to="/"
          className="font-secondary bg-pink-500 text-white hover:bg-pink-800 transition-colors duration-500 rounded-full p-2"
        >
          <button type="button" className="px-3 flex items-center gap-2">
            <span>
              <LuArrowLeft />
            </span>
            Let&apos;s Shop
          </button>
        </Link>
      </div>
    </Layout>
  );
};

export default EmptyCart;
