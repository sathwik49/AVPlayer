import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login, returnMsg, returnSuccess,setReturnMsg, loading } = useLogin();

  const handleLoginForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputs.username || !inputs.password) {
      toast.error("All fields are required")
      return;
    }

    await login(inputs);
    if(returnSuccess){
      navigate('/');
    }
    else {
      toast.error(returnMsg);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      {/* { (returnSuccess) && (
        <div
          className={`w-full max-w-md mt-4 p-4 text-sm flex justify-between items-center ${
            returnSuccess
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          } rounded-md shadow-md`}
        >
          <span className="flex-1">{returnMsg || msg}</span>
          <button
            onClick={() => setClose(true)}
            className="ml-4 text-lg font-semibold hover:text-red-800 transition duration-200"
          >
            ❌
          </button>
        </div>
      )} */}

      {/* Login Form */}
      <form
        onSubmit={handleLoginForm}
        className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg mt-8"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-700">
          Login
        </h1>

        {/* Username Field */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="username">
            Username
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="password">
            Password
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
        </div>

        {/* Signup Link */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
