import React, { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../loader/Loader.js"; // Import the Loader component
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/v1/auth/forget', { email });
      if (response.data.success) {
        toast.success(response.data.message);
        setEmail('');
        setTimeout(()=>{
          navigate('/resetPassword');
        },[3000])
         
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }finally {
      setLoading(false); // Set loading to false after the request
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-br from-blue-500 to-yellow-500 h-screen flex justify-center items-center text-white font-montserrat">
      {loading ? (
          <Loader />
        ) : (
        <div className="p-5 shadow-2xl rounded-lg login-card p-8 w-full max-w-md flex flex-col">
          <div className="header mb-12">
            <div className="logo rounded-full w-32 h-32 flex justify-center items-center mx-auto mb-4 bg-white bg-opacity-10">
              <div className="text-white text-6xl">
                <FaUserAlt />
              </div>
            </div>
          </div>
          <form className="form" >
            <div className="form-field username relative mb-6">
              <div className="icon absolute bg-white text-black left-0 top-0 flex justify-center items-center w-10 h-10 rounded-full">
                <FaUserAlt />
              </div>
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="pl-12 pr-4 py-2 w-full bg-opacity-10 border border-white rounded-lg focus:bg-white focus:text-black focus:outline-none transition duration-300"
                value={email}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-green-500 text-white py-3 px-4 w-full rounded-3xl uppercase font-bold mb-8 focus:outline-none transition duration-300 hover:bg-red-600 hover:text-white"
            >
              Forget Password
            </button>
          </form>
        </div>
          )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
