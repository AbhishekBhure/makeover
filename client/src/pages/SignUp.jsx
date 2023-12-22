import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuEye, LuEyeOff } from "../icons";
import Loader from "../components/Loader";
import { useSnackbar } from "notistack";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  console.log(formData);

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handlePasswordtoggle = () => {
    setVisible(!visible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(error.message);
        enqueueSnackbar(data.message, { variant: "error" });
        return;
      }
      setLoading(false);
      enqueueSnackbar("User Created Successfully ", { variant: "success" });
      setError(null);
      setFormData("");
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(false);
      enqueueSnackbar("Enter the fields", { variant: "error" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-4 md:my-11">
      <div className="flex gap-5 justify-center items-center ">
        <div className="p-3 flex-1 max-w-lg">
          <h1 className="py-3 font-primary text-5xl text-center">SignUp</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
            <div className="p-2 md:p-3 rounded-full flex items-center border  focus-within:border-pink-800 transition-border duration-300">
              <input
                type="text"
                required
                id="username"
                className="focus:outline-none bg-transparent w-32 sm:w-64"
                placeholder="enter your name..."
                onChange={handleChange}
              />
            </div>
            <div className="p-2 md:p-3 rounded-full flex items-center border  focus-within:border-pink-800 transition-border duration-300">
              <input
                type="email"
                id="email"
                required
                className="focus:outline-none bg-transparent w-32 sm:w-64"
                placeholder="enter your email..."
                onChange={handleChange}
              />
            </div>
            <div className="relative p-2 md:p-3 rounded-full flex items-center border  focus-within:border-pink-800 transition-border duration-300">
              <input
                type={visible ? "text" : "password"}
                id="password"
                required
                className="focus:outline-none bg-transparent w-32 sm:w-64"
                placeholder="enter password..."
                onChange={handleChange}
              />
              {visible ? (
                <span className="absolute right-3 cursor-pointer">
                  <LuEyeOff className="" onClick={handlePasswordtoggle} />
                </span>
              ) : (
                <span className="absolute right-3 cursor-pointer">
                  <LuEye onClick={handlePasswordtoggle} />
                </span>
              )}
            </div>
            <button className="font-secondary rounded-full bg-pink-500 p-3 text-white md:uppercase">
              {loading ? <Loader /> : "Sign Up"}
            </button>
            <div className="flex gap-3 mt-5 items-center justify-center">
              <p className="font-secondary">Have an Account?</p>
              <Link to="/sign-in">
                <span className="font-secondary text-blue-500 hover:text-blue-700 ">
                  Sign In
                </span>
              </Link>
            </div>
          </form>
        </div>
        <div className="md:flex bg-black flex-1 hidden">hi</div>
      </div>
    </div>
  );
};

export default SignUp;
