import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LuEye, LuEyeOff } from "../../icons";
import Loader from "../../components/Loader";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFail,
  signInStart,
  signInSuccess,
} from "../../features/auth/authSlice";
import Layout from "../../components/Layout";
import OAuth from "../../features/googleAuth/OAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.auth);
  const [visible, setVisible] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

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

    // const { password: pass, ...rest } = formData;
    try {
      dispatch(signInStart());

      const res = await fetch(
        "https://makeover-backend.onrender.com/api/v1/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFail(data.message));
        enqueueSnackbar(data.message, { variant: "error" });
        return;
      }
      dispatch(signInSuccess(data));
      enqueueSnackbar("Logged In Successfully ", { variant: "success" });
      setFormData("");
      navigate(location.state || "/");
    } catch (error) {
      dispatch(signInFail());
      enqueueSnackbar("Enter the fields now", { variant: "error" });
    }
  };

  return (
    <Layout title={"MakeOver - SignIn"}>
      <div className="my-4 md:my-11">
        <div className="flex gap-5 justify-center items-center ">
          <div className="p-3 flex-1 max-w-lg">
            <h1 className="py-3 font-primary text-5xl text-center">SignIn</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
              <div className="p-2 md:p-3 rounded-full flex items-center border  focus-within:border-pink-800 transition-border duration-300">
                <input
                  type="email"
                  id="email"
                  required
                  className="focus:outline-none bg-transparent w-64"
                  placeholder="enter your email..."
                  onChange={handleChange}
                />
              </div>
              <div className="relative p-2 md:p-3 rounded-full flex items-center border  focus-within:border-pink-800 transition-border duration-300">
                <input
                  type={visible ? "text" : "password"}
                  id="password"
                  required
                  className="focus:outline-none bg-transparent w-64"
                  placeholder="enter password..."
                  onChange={handleChange}
                />
                {visible ? (
                  <span className="absolute right-3 cursor-pointer">
                    <LuEyeOff
                      className="text-xl"
                      onClick={handlePasswordtoggle}
                    />
                  </span>
                ) : (
                  <span className="absolute right-3 cursor-pointer">
                    <LuEye className="text-xl" onClick={handlePasswordtoggle} />
                  </span>
                )}
              </div>
              <button className="font-secondary rounded-full bg-pink-500 p-3 text-white md:uppercase">
                {loading ? <Loader /> : "Sign In"}
              </button>
              <OAuth />
              <div className="flex gap-3 mt-5 items-center justify-center">
                <p className="font-secondary">Dont have an Account?</p>
                <Link to="/sign-up">
                  <span className="font-secondary text-blue-500 hover:text-blue-700 ">
                    Sign Up
                  </span>
                </Link>
              </div>
            </form>
          </div>
          <div className="md:flex bg-black flex-1 hidden">hi</div>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
