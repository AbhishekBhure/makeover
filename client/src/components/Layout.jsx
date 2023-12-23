import React from "react";
import Home from "../pages/Home";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="">
      <Navbar />
      <div className="max-w-7xl mx-auto px-5 md:px-0">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
