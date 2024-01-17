import { Link } from "react-router-dom";
import { HiHeart } from "../icons";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-950 text-white font-secondary">
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-6">
            <Link to="/">
              <h1 className="font-primary text-3xl flex flex-wrap md:text-4xl ">
                <span className="text-white">Make</span>
                <span className="text-pink-500">Over</span>
              </h1>
            </Link>
            <p className="text-xs text-white inline-flex gap-1 justify-center items-center">
              © 2024 MakeOver, built with{" "}
              <HiHeart className="w-5 h-5 mb-1" fill="red" />
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
