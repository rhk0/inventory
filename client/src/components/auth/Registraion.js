import React, { useState } from "react";
import {
  FaUserAlt,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaAddressCard,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    userName: "",
    address: "",
    contact: "",
    email: "",
    password: "",
    businessType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-yellow-500 h-screen flex justify-center items-center text-white font-montserrat">
      <div className="p-5  shadow-2xl rounded-lg  login-card p-8 w-full max-w-md flex flex-col">
        <div className="header mb-12">
          <div className="logo rounded-full w-32 h-32 flex justify-center items-center mx-auto mb-0 bg-white bg-opacity-10">
            <div className="text-white text-6xl">
              <FaUserAlt />
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-field relative mb-4">
              <div className="icon absolute bg-white text-black left-0 top-0 flex justify-center items-center w-10 h-10 rounded-full">
                <FaBuilding />
              </div>
              <input
                type="text"
                name="businessName"
                placeholder="Business Name"
                value={formData.businessName}
                onChange={handleChange}
                className="pl-12 pr-4 py-2 w-full bg-opacity-10 border border-white rounded-lg focus:bg-white focus:text-black focus:outline-none transition duration-300"
              />
            </div>
            <div className="form-field relative mb-4">
              <div className="icon absolute bg-white text-black left-0 top-0 flex justify-center items-center w-10 h-10 rounded-full">
                <FaUserAlt />
              </div>
              <input
                type="text"
                name="userName"
                placeholder="Username"
                value={formData.userName}
                onChange={handleChange}
                className="pl-12 pr-4 py-2 w-full bg-opacity-10 border border-white rounded-lg focus:bg-white focus:text-black focus:outline-none transition duration-300"
              />
            </div>
            <div className="form-field relative mb-4">
              <div className="icon absolute bg-white text-black left-0 top-0 flex justify-center items-center w-10 h-10 rounded-full">
                <FaAddressCard />
              </div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="pl-12 pr-4 py-2 w-full bg-opacity-10 border border-white rounded-lg focus:bg-white focus:text-black focus:outline-none transition duration-300"
              />
            </div>
            <div className="form-field relative mb-4">
              <div className="icon absolute bg-white text-black left-0 top-0 flex justify-center items-center w-10 h-10 rounded-full">
                <FaPhone />
              </div>
              <input
                type="text"
                name="contact"
                placeholder="Contact"
                value={formData.contact}
                onChange={handleChange}
                className="pl-12 pr-4 py-2 w-full bg-opacity-10 border border-white rounded-lg focus:bg-white focus:text-black focus:outline-none transition duration-300"
              />
            </div>
            <div className="form-field relative mb-4">
              <div className="icon absolute bg-white text-black left-0 top-0 flex justify-center items-center w-10 h-10 rounded-full">
                <FaEnvelope />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="pl-12 pr-4 py-2 w-full bg-opacity-10 border border-white rounded-lg focus:bg-white focus:text-black focus:outline-none transition duration-300"
              />
            </div>
            <div className="form-field relative mb-4">
              <div className="icon absolute bg-white text-black left-0 top-0 flex justify-center items-center w-10 h-10 rounded-full">
                <FaLock />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="pl-12 pr-4 py-2 w-full bg-opacity-10 border border-white rounded-lg focus:bg-white focus:text-black focus:outline-none transition duration-300"
              />
            </div>
            <div className="form-field relative mb-4">
              <div className="icon absolute bg-white text-black left-0 top-0 flex justify-center items-center w-10 h-10 rounded-full">
                <FaBuilding />
              </div>
              <input
                type="text"
                name="businessType"
                placeholder="Business Type"
                value={formData.businessType}
                onChange={handleChange}
                className="pl-12 pr-4 py-2 w-full bg-opacity-10 border border-white rounded-lg focus:bg-white focus:text-black focus:outline-none transition duration-300"
              />
            </div>

            <Link to="/otpverification">
              <button
                type="submit"
                className="bg-green-500 text-white py-3 px-4 w-full rounded-full uppercase font-bold mb-8 focus:outline-none transition duration-300 hover:bg-red-600 hover:text-white"
              >
                Sign Up
              </button>
            </Link>
            
          </form>
        </div>
        <div className="text-white text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold hover:text-yellow-400 text-blue-500"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
