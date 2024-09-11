import React, { useEffect } from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../pages/admin/Header";
import Home from "../pages/admin/Home";
import Test from "./Test";
import { useAuth } from "../context/Auth";
import SuperAdminSideBar from "../pages/SupeAdmin/SuperAdminSideBar.js";
const SuperAdminRoute = () => {
  const [auth] = useAuth();

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <SuperAdminSideBar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/dash" element={<Home />} /> */}

        <Route path="/*" element={<Test />} /> 
        {/* <Route path="/companyregistration" element={<CompanyRegistration />} /> */}



      </Routes>
    </div>
  );
};

export default SuperAdminRoute;
