import React, { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify
import Loader from "../loader/Loader.js"; // Import the Loader component

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before the request

    try {
      const response = await axios.post("/api/v1/auth/login", formData);

      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after the request
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-yellow-500 h-screen flex justify-center items-center text-white font-montserrat">
      {loading ? (
          <Loader />
        ) : (
      <div className="p-10 hover:scale-95 shadow-2xl rounded-lg login-card p-8 w-full max-w-md flex flex-col">
        <div className="header mb-12">
          <div className="logo rounded-full w-32 h-32 flex justify-center items-center mx-auto mb-4 bg-white bg-opacity-10">
            <div className="text-white text-6xl">
              <FaUserAlt />
            </div>
          </div>
        </div>
       
          <form>
            <div className="form-field email relative mb-6">
              <div className="icon absolute bg-white text-black left-0 top-0 flex justify-center items-center w-10 h-10 rounded-full">
                <FaUserAlt />
              </div>
              <input
                type="text"
                name="email"
                placeholder="email"
                className="pl-12 pr-4 py-2 w-full text-black bg-opacity-10 border border-white rounded-lg focus:bg-white focus:text-black focus:outline-none transition duration-300"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-field password relative mb-6">
              <div className="icon absolute bg-white text-black left-0 top-0 flex justify-center items-center w-10 h-10 rounded-full">
                <FaLock />
              </div>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="pl-12 pr-4 py-2 w-full text-black bg-opacity-10 border border-white rounded-lg focus:bg-white focus:text-black focus:outline-none transition duration-300"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-green-500 text-white py-3 px-4 w-full rounded-3xl uppercase font-bold mb-8 focus:outline-none transition duration-300 hover:bg-red-600 hover:text-white"
              disabled={loading} // Disable button while loading
            >
              Login
            </button>
          </form>
       
        <div className="text-white text-center">
          Don't have an account?
          <Link
            to="/registration"
            className="font-bold hover:text-yellow-400 text-blue-500"
          >
            Sign Up
          </Link>
        </div>
        <div className="text-white text-center">
          <Link
            to="/forgetpassword"
            className="text-red-500 font-bold hover:text-yellow-400"
          >
            Forgot password?
          </Link>
        </div>
      </div>
      
        )}
      <ToastContainer />
    </div>
  );
};

export default Login;
