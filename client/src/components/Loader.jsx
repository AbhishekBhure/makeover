import { loader } from "../icons";

const Loader = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <img className="mx-auto w-10 h-10" src={loader} alt="loader" />
    </div>
  );
};

export default Loader;
