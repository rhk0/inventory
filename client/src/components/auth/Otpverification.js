import React from 'react'
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
const Otpverification = () => {
  return (
    <div>
    <div className="bg-gradient-to-br from-blue-500 to-yellow-500 h-screen  flex justify-center items-center text-white font-montserrat">
   <div className="p-5  shadow-2xl rounded-lg login-card p-8 w-full max-w-md flex flex-col">
     <div className="header mb-12">
       <div className="logo rounded-full w-32 h-32 flex justify-center items-center mx-auto mb-4 bg-white bg-opacity-10">
         <div className="text-white text-6xl">
           <FaUserAlt />
         </div>
       </div>
     </div>
     <div className="form">
       <div className="form-field username relative mb-6">
         <div className="icon absolute bg-white text-black left-0 top-0  flex justify-center items-center w-10 h-10 rounded-full">
           <FaUserAlt />
         </div>
         <input
           type="text"
           placeholder="Email"
           className="pl-12 pr-4 py-2 w-full bg-opacity-10 border border-white rounded-lg focus:bg-white focus:text-black focus:outline-none transition duration-300"
         />
       </div>
       <div className="form-field password relative mb-6">
         <div className="icon absolute bg-white text-black left-0 top-0 flex justify-center items-center w-10 h-10 rounded-full">
           <FaLock />
         </div>
         <input
           type="password"
           placeholder="otp"
           className="pl-12 pr-4 py-2 w-full bg-opacity-10 border border-white rounded-lg focus:bg-white focus:text-black focus:outline-none transition duration-300"
         />
       </div>
       <button
         type="submit"
         className="bg-green-500 text-white py-3 px-4 w-full rounded-3xl uppercase font-bold mb-8 focus:outline-none transition duration-300 hover:bg-red-600 hover:text-white"
       >
         Verify
       </button>

     
     </div>
   </div>
 </div>
 </div>
  )
}

export default Otpverification
