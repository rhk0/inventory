import React, { useEffect } from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../pages/admin/Header";
import Home from "../pages/admin/Home";
import Sidebar from "../pages/admin/Sidebar";
import Test from "./Test";
import { useAuth } from "../context/Auth";
import CreateSupplier from "../pages/admin/CreateSupplier.js";
import ManageSupplier from "../pages/admin/ManageSupplier.js";
import CreateTranspoter from "../pages/admin/CreateTransporter.js";
import ManageTranspoter from "../pages/admin/ManageTransporter.js";
import CreateCustomer from "../pages/admin/CreateCustomer.js";
import ManageCustomer from "../pages/admin/ManageCustomer.js";
import Cash from "../pages/admin/Cash.js";
import CreateVendors from "../pages/admin/CreateVendors.js";
import ManageVendor from "../pages/admin/ManageVendor.js";
import CreateStaff from "../pages/admin/CreateStaff.js";
import BankToBankTranfer from "../pages/admin/BankToBankTransfer.js";
import AddBank from "../pages/admin/AddBank.js";
import ManageBank from "../pages/admin/ManageBank.js";
import CashDepositeIntoBank from "../pages/admin/CashDepositeIntoBank.js";
import CashWithdrwFromBank from "../pages/admin/CashWithdrwFromBank.js";
import StockDetails from "../pages/admin/StockDetails.js";

const AdminRoute = () => {
  const [auth] = useAuth();

  useEffect(() => {
    if (auth) {
      console.log(auth);
    }
    if (!auth) {
      console.log("ho");
    }
  });
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
        <Route path="/*" element={<Test />} />
        {/* rahul routing */}
        <Route path="/CreateSupplier" element={<CreateSupplier />} />
        <Route path="/ManageSupplier" element={<ManageSupplier />} />
        <Route path="/CreateCustomer" element={<CreateCustomer />} />
        <Route path="/ManageCustomer" element={<ManageCustomer />} />
        <Route path="/Cash" element={<Cash />} />
        <Route path="BankToBankTransfer" element={<BankToBankTranfer />} />

        {/* dheerendra routing */}
        <Route path="createtranspoter" element={<CreateTranspoter />} />
        <Route path="managetranspoter" element={<ManageTranspoter />} />
        <Route path="createvendors" element={<CreateVendors />} />
        <Route path="manageVendor" element={<ManageVendor />} />
        <Route path="createstaff" element={<CreateStaff />} />
        <Route path="addbank" element={<AddBank />} />
        <Route path="managebank" element={<ManageBank />} />
        <Route path="CashDepositeIntoBank" element={<CashDepositeIntoBank />}/>
        <Route path="CashWithdrwFromBank" element={<CashWithdrwFromBank />}/>
        <Route path="stockdetails" element={<StockDetails />}/>
        
        
      </Routes>
    </div>
  );
};

export default AdminRoute;
