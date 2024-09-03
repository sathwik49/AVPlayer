import { Link } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

export const Navbar = () => {
  const { authUser } = useAuthContext();
  const userName = authUser?.username
  const userInitial = userName?.charAt(0).toUpperCase();

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white shadow-md">
      <Link to="/" className="text-2xl font-bold text-white hover:text-gray-300">
        AVPlayer
      </Link>
      <div className="space-x-4 flex items-center">
        {
          !authUser ?
          <Link to="/login">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200">
            Login
          </button>
        </Link>  :
          <button className="w-10 h-10 flex items-center justify-center bg-gray-600 text-white font-bold rounded-full">
          {userInitial}
        </button>
        }
      </div>
    </nav>
  );
};