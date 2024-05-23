import React, { useEffect } from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../pages/admin/Header";
import Home from "../pages/admin/Home";
import Sidebar from "../pages/admin/Sidebar";
import Test from "./Test";
import { useAuth } from "../context/Auth";
import CreateSupplier from "../pages/admin/CreateSupplier.js"
const AdminRoute = () => {

const [auth]=useAuth();

  useEffect(()=>{
if(auth){
  console.log(auth)
}
if(!auth){
  console.log("ho")
}
  })
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
        <Route path="/" element={<Home />}/>
        <Route path ="/*" element = {<Test/>}/>
        <Route path="/CreateSupplier" element={<CreateSupplier />}/>

      </Routes>
    </div>
  );
};

export default AdminRoute;
