import { useNavigate } from "react-router-dom";
import { LuArrowLeft } from "../icons";

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button
      type="button"
      onClick={handleGoBack}
      className="hidden md:flex rounded-full w-10 h-10 items-center justify-center absolute top-20 left-10 bg-pink-500"
    >
      <LuArrowLeft color="white" className="" />
    </button>
  );
};

export default BackButton;
