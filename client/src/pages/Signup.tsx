import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [success, setSuccess] = useState(true);
  const [message, setMessage] = useState("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputs.username || !inputs.password || !inputs.email) {
      setMessage("All fields are required.");
      setSuccess(false);
    } else {
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      {/* Error Message */}
      {!success && (
        <div
          className={`w-full max-w-md mt-4 p-4 text-sm flex justify-between items-center ${
            success
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          } rounded-md shadow-md`}
        >
          <span className="flex-1">{message}</span>
          <button
            onClick={() => setSuccess(true)}
            className="ml-4 text-lg font-semibold hover:text-red-800 transition duration-200"
          >
            ❌
          </button>
        </div>
      )}

      {/* Signup Form */}
      <form
        onSubmit={handleFormSubmit}
        className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg mt-8"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-700">
          Sign Up
        </h1>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="email">
            Email
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Username Field */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="username">
            Username
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            id="username"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Login Link */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
