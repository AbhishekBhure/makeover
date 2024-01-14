import { google } from "../../icons";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../auth/authSlice";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const response = await fetch(
        "https://makeover-backend.onrender.com/api/v1/auth/google",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
          }),
        }
      );
      const user = await response.json();
      dispatch(signInSuccess({ user }));
      enqueueSnackbar("SignedIn With Google ✅", { variant: "success" });
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Could not signIn with google", { variant: "error" });
    }
  };

  return (
    <button
      onClick={handleGoogleAuth}
      type="button"
      className="bg-white border border-solid border-pink-700 text-black p-1 rounded-full md:uppercase flex items-center justify-center gap-2"
    >
      Continue with{" "}
      <img src={google} alt="google" className="w-9 md:w-[38px]" />
    </button>
  );
};

export default OAuth;
