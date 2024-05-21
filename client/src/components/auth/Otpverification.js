import React, { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify

const OtpVerification = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const clearData = () => {
    setFormData({
      email: "",
      otp: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/auth/verification", formData);
     
      if (response.data.success) {
        toast.success(response.data.message);
        
        setTimeout(()=>{
          navigate("/");
        },[3000])
       
        clearData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error verifying OTP:", error);
      // toast.error("An error occurred while verifying the OTP.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-yellow-500 h-screen flex justify-center items-center text-white font-montserrat">
      <div className="p-5 shadow-2xl rounded-lg login-card p-8 w-full max-w-md flex flex-col">
        <div className="header mb-12">
          <div className="logo rounded-full w-32 h-32 flex justify-center items-center mx-auto mb-4 bg-white bg-opacity-10">
            <div className="text-white text-6xl">
              <FaUserAlt />
            </div>
          </div>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-field username relative mb-6">
            <div className="icon absolute bg-white text-black left-0 top-0 flex justify-center items-center w-10 h-10 rounded-full">
              <FaUserAlt />
            </div>
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="pl-12 pr-4 py-2 w-full bg-opacity-10 border text-black border-white rounded-lg focus:bg-white focus:text-black focus:outline-none transition duration-300"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-field password relative mb-6">
            <div className="icon absolute bg-white text-black left-0 top-0 flex justify-center items-center w-10 h-10 rounded-full">
              <FaLock />
            </div>
            <input
              type="text"
              placeholder="OTP"
              name="otp"
              className="pl-12 pr-4 py-2 w-full text-black bg-opacity-10 border border-white rounded-lg focus:bg-white focus:text-black focus:outline-none transition duration-300"
              value={formData.otp}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-3 px-4 w-full rounded-3xl uppercase font-bold mb-8 focus:outline-none transition duration-300 hover:bg-red-600 hover:text-white"
          >
            Verify
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OtpVerification;
