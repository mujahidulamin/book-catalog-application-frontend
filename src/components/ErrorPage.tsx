import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="hero h-full lg:h-[80vh] bg-base-100">
      <div className="hero-content flex-col lg:flex-row">
        <div>
          <h1 className="text-5xl font-bold">WE ARE SORRY,PAGE NOT FOUND!</h1>
          <p className="py-4 lg:max-w-2xl">
            THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED HAD ITS NAME
            CHANGED OR IS TEMPORARILY UNAVAILABLE
          </p>
          <button
            onClick={() => navigate("/")}
            className="btn px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 my-2"
          >
            BACK TO HOMEPAGE
          </button>
        </div>
        <img src='https://i.ibb.co/sWwQ342/error.png' className="lg:max-w-lg rounded-lg" alt="" />
      </div>
    </div>
  );
};

export default NotFound;