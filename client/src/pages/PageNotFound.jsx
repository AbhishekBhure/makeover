import { Link } from "react-router-dom";
import { LuArrowLeft } from "../icons";
import Layout from "../components/Layout";
const PageNotFound = () => {
  return (
    <Layout title={"Page Not Found"}>
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="text-7xl text-pretty font-primary">404</h1>
        <h1 className="text-5xl font-secondary">Oops! Page Not Found</h1>

        <Link
          to="/"
          className="font-secondary bg-pink-500 text-white hover:bg-pink-800 transition-colors duration-500 rounded-full p-2"
        >
          <button type="button" className="px-3 flex items-center gap-2">
            <span>
              <LuArrowLeft />
            </span>
            Go Back
          </button>
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
