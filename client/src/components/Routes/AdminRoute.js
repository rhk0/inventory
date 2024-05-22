import React from "react";
import { useState } from "react";
import {  Routes, Route } from "react-router-dom";
// import AdminDashboard from "../pages/admin/AdminDashboard";
import Registration from "../auth/Registraion";
import ForgotPassword from "../auth/ForgotPassword";
import OtpVerification from "../auth/Otpverification";
import ResetPassword from "../auth/ResetPassword";
import CompanyRegistration from "../auth/CompanyRegistration";
import Header from "../pages/admin/Header";
import Home from "../pages/admin/Home";
import Sidebar from "../pages/admin/Sidebar";
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