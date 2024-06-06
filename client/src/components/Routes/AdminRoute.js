import React, { useEffect } from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../pages/admin/Header";
import Home from "../pages/admin/Home";
import Sidebar from "../pages/admin/Sidebar";
import Test from "./Test";
import { useAuth } from "../context/Auth";
import CreateSupplier from "../pages/admin/CreateSupplier.js"
import ManageSupplier from "../pages/admin/ManageSupplier.js"
import CreateTranspoter from "../pages/admin/CreateTransporter.js";
import ManageTranspoter from "../pages/admin/ManageTransporter.js"
import CreateCustomer from "../pages/admin/CreateCustomer.js"
import ManageCustomer from "../pages/admin/ManageCustomer.js";
import CreateVendors from "../pages/admin/CreateVendors.js";
import ManageVendor from "../pages/admin/ManageVendor.js";
import CreateStaff from "../pages/admin/CreateStaff.js";

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
        {/* rahul routing */}
        <Route path="/CreateSupplier" element={<CreateSupplier />}/>
        <Route path="/ManageSupplier" element={<ManageSupplier />}/>
        <Route path="/CreateCustomer" element={<CreateCustomer />}/>
        <Route path="/ManageCustomer" element={<ManageCustomer />}/>



        {/* dheerendra routing */}
        <Route path="createtranspoter" element={<CreateTranspoter/>}/>
        <Route path="managetranspoter" element={<ManageTranspoter/>}/>
        <Route path="createvendors" element={<CreateVendors/>}/>
        <Route path="manageVendor" element={<ManageVendor/>}/>
        <Route path="createstaff" element={<CreateStaff/>}/>


      </Routes>
    </div>
  );
};

export default AdminRoute;
