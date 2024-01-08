import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserFail,
  updateUserStart,
  updateUserSuccess,
} from "../../auth/authSlice";
import { useState } from "react";
import Loader from "../../../components/Loader";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../firebase";
import BackButton from "../../../components/BackButton";

const UserUpdate = () => {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef();

  //selectors
  const { currentUser } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.auth);

  //states
  const [userDetails, setUserDetails] = useState(currentUser);
  console.log("userDetails", userDetails);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.id]: e.target.value });
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setUserDetails({ ...userDetails, avatar: downloadURL })
        );
      }
    );
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = currentUser.user._id;
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/v1/users/update/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      const user = await res.json();
      if (user.success === false) {
        dispatch(updateUserFail(user.message));
        return;
      }
      dispatch(updateUserSuccess({ user }));
      enqueueSnackbar("Profile Updated Successfully", { variant: "success" });
      navigate("/profile/user");
    } catch (error) {
      dispatch(updateUserFail(error.message));
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <>
      {currentUser && (
        <div className="mx-auto">
          <BackButton />
          <form className="mt-8  flex flex-col gap-4" onSubmit={handleSubmit}>
            <h1 className="text-4xl font-primary leading-7 text-gray-900">
              Update Profile
            </h1>
            <div className=" h-[90px] shadow-md w-[90px] rounded-full border-4  border-white">
              <input
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <img
                className="w-full h-full cursor-pointer rounded-full object-center object-cover"
                src={userDetails.avatar || currentUser.user.avatar}
                alt="photo"
                onClick={() => fileRef.current.click()}
              />
            </div>
            <p className="">
              {fileUploadError ? (
                <span className="text-red-700">Error Image upload (3mb)</span>
              ) : filePercentage > 0 && filePercentage < 100 ? (
                <span className="text-slate-700">
                  {`Uploading ${filePercentage}%`}
                </span>
              ) : filePercentage === 100 ? (
                <span className="text-green-700">
                  Image Successfully uploaded
                </span>
              ) : (
                ""
              )}
            </p>
            <p className="text-gray-400 font-secondary">
              Click on the above image to update it
            </p>
            <label className="block text-sm font-medium leading-3 text-gray-900">
              Full name
            </label>
            <input
              type="text"
              id="username"
              defaultValue={currentUser.user.username}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />

            <label
              htmlFor="email"
              className="block text-sm font-medium leading-3 text-gray-900"
            >
              Email address
            </label>
            <input
              id="email"
              defaultValue={currentUser.user.email}
              type="email"
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />

            <label className="block text-sm font-medium leading-3 text-gray-900">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />

            <button
              disabled={loading}
              className="bg-pink-500 rounded-full text-white uppercase hover:opacity-95 p-3 disabled:opacity-80 cursor-pointer transition-all duration-500 "
            >
              {loading ? <Loader /> : "update"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default UserUpdate;
