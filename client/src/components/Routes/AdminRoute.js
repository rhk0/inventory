import React from "react";
import { useState } from "react";
import {  Routes, Route } from "react-router-dom";
// import AdminDashboard from "../pages/admin/AdminDashboard";
import Registration from "../auth/Registraion.js";
import ForgotPassword from "../auth/ForgotPassword.js";
import OtpVerification from "../auth/Otpverification.js";
import ResetPassword from "../auth/ResetPassword.js";
import CompanyRegistration from "../auth/CompanyRegistration.js";
import Header from "../pages/admin/Header.js";
import Home from "../pages/admin/Home.js";
import Sidebar from "../pages/admin/Sidebar.js";
const AdminRoute = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
    <Header OpenSidebar={OpenSidebar} />
    <Sidebar
      openSidebarToggle={openSidebarToggle}
      OpenSidebar={OpenSidebar}
    />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/forgetpassword" element={<ForgotPassword />} />
      <Route path="/otpverification" element={<OtpVerification />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/CompanyRegistration" element={<CompanyRegistration />} />
    </Routes>
  </div>
  );
};

export default AdminRoute;