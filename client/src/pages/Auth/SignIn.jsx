import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuEye, LuEyeOff } from "../../icons";
import Loader from "../../components/Loader";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFail,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";
import Layout from "../../components/Layout";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);

  console.log(formData);

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
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

  // const hashPassword = async (password) => {
  //   const encoder = new TextEncoder();
  //   const data = encoder.encode(password);
  //   const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  //   const hashArray = Array.from(new Uint8Array(hashBuffer));
  //   const hashedPassword = hashArray
  //     .map((byte) => byte.toString(16).padStart(2, "0"))
  //     .join("");
  //   return hashedPassword;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const { password: pass, ...rest } = formData;
    try {
      dispatch(signInStart());

      // Hash the password before sending it to the server
      // const hashedPassword = await hashPassword(formData.password);

      const res = await fetch("/api/v1/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFail(data.message));
        enqueueSnackbar(data.message, { variant: "error" });
        return;
      }
      dispatch(signInSuccess());
      enqueueSnackbar("Logged In Successfully ", { variant: "success" });
      setFormData("");
      navigate("/");
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
                    <LuEyeOff className="" onClick={handlePasswordtoggle} />
                  </span>
                ) : (
                  <span className="absolute right-3 cursor-pointer">
                    <LuEye onClick={handlePasswordtoggle} />
                  </span>
                )}
              </div>
              <button className="font-secondary rounded-full bg-pink-500 p-3 text-white md:uppercase">
                {loading ? <Loader /> : "Sign In"}
              </button>
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
