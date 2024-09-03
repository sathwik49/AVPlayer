import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useAuthContext } from "../context/authContext";

const HomePage = () => {
  const { authUser } = useAuthContext();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex flex-col justify-center items-center flex-grow p-6">
        <h1 className="text-4xl font-semibold text-gray-700 mb-6">
          Welcome to AVPlayer
        </h1>
        <p className="text-lg text-center text-gray-600 mb-8">
          Upload your media and stream it without ads. Enjoy seamless playback
          and organize your files with ease.
        </p>
        {!authUser && (
          <Link to="/signup">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200">
              Get Started
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;
