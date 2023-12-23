import { useEffect, useState } from "react";
import { loader } from "../icons";
import { useNavigate, useLocation } from "react-router-dom";

const Loader = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevVal) => --prevVal);
    }, 1000);
    count === 0 &&
      navigate("/login", {
        state: window.location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location]);

  return (
    <div className="w-full flex flex-col items-center">
      <img className="mx-auto w-10 h-10" src={loader} alt="loader" />
      <h1> redirecting to you in {count} second</h1>
    </div>
  );
};

export default Loader;
