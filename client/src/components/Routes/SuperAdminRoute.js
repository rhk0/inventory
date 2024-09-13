import React, { useEffect } from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../pages/admin/Header";
import Home from "../pages/admin/Home";
import Test from "./Test";
import { useAuth } from "../context/Auth";
import SuperAdminSideBar from "../pages/SupeAdmin/SuperAdminSideBar.js";
import Logout from "../pages/admin/Logout.js";
import SubscriptionPlans from "../pages/SupeAdmin/SubsCription/SubscriptionPlans.js";
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
       

        <Route path="/*" element={<Test />} /> 
        <Route path="/subscriptionPlans" element={<SubscriptionPlans/>}/>
       
        <Route path="log-out" element={<Logout/>} />
       

      </Routes>
    </div>
  );
};

export default SuperAdminRoute;
