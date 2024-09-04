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
import AddCategory from "../pages/admin/AddCategory.js";
import AddSubCategory from "../pages/admin/AddSubCategory.js";
import AddBrand from "../pages/admin/AddBrand.js";
import StockUnit from "../pages/admin/StockUnit.js";
import CashWithDrawFromBank from "../pages/admin/CashWithDrawFromBank.js";
import CashDepositIntoBank from "../pages/admin/CashDepositIntoBank.js";
import StockDetails from "../pages/admin/StockDetails.js";
import AddSubBrand from "../pages/admin/AddSubBrand.js";
import ManageCategory from "../pages/admin/ManageCategory.js";
import ManageSubCategory from "../pages/admin/ManageSubCategory.js";
import ManageStockUnit from "../pages/admin/ManageStockUnit.js";
import ManageBrand from "../pages/admin/ManageBrand.js";
import ManageSubBrand from "../pages/admin/ManageSubBrand.js";
import CreateBranches from "../pages/admin/CreateBranches.js";
import ManageBranches from "../pages/admin/ManageBranches.js";
import CreateProduct from "../pages/admin/CreateProduct.js";
import SalesQuotation from "../pages/admin/SalesQuotation.js";
import ManageQuotation from "../pages/admin/ManageQuotation.js";
import Invoice from "../pages/admin/Invoice.js";
import DeliveryChallan from "../pages/admin/DeliveryChallan.js";
import CreateManufacturer from "../pages/admin/CreateManufacturer.js";
import ManageManufacturer from "../pages/admin/ManageManufacturer.js";
import Manageproducts from "../pages/admin/Manageproducts.js";
import CreateSalesEstimate from "../pages/admin/sales/CreateSalesEstimate.js";
import ManageSalesEstimate from "../pages/admin/sales/ManageSalesEstimate.js";
import CreateSalesInvoice from "../pages/admin/sales/CreateSalesInvoice.js";

const AdminRoute = () => {
  const [auth] = useAuth();

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
        {/* <Route path="/dash" element={<Home />} /> */}

        <Route path="/*" element={<Test />} />
        {/* rahul routing */}

        <Route path="/CreateSupplier" element={<CreateSupplier />} />
        <Route path="/ManageSupplier" element={<ManageSupplier />} />
        <Route path="CreateCustomer" element={<CreateCustomer />} />
        <Route path="ManageCustomer" element={<ManageCustomer />} />
        <Route path="/CreateManufacturer" element={<CreateManufacturer />} />
        <Route path="/ManageManufacturer" element={<ManageManufacturer />} />


        <Route path="Cash" element={<Cash />} />
        <Route path="BankToBankTransfer" element={<BankToBankTranfer />} />
        <Route path="addcategory" element={<AddCategory />} />
        <Route path="addsubcategory" element={<AddSubCategory />} />
        <Route path="addbrand" element={<AddBrand />} />
        <Route path="addstock" element={<StockUnit />} />
        <Route path="cashwithdrawfrombank" element={<CashWithDrawFromBank />} />
        <Route path="CashDepositIntoBank" element={<CashDepositIntoBank />} />
        <Route path="AddSubBrand" element={<AddSubBrand />} />
        <Route path="ManageCategory" element={<ManageCategory />} />
        <Route path="managesubcategory" element={<ManageSubCategory />} />
        <Route path="createbranch" element={<CreateBranches />} />
        <Route path="managebranches" element={<ManageBranches />} />
        <Route path="createproduct" element={<CreateProduct />} />

        {/* dheerendra routing */}
        <Route path="createtranspoter" element={<CreateTranspoter />} />
        <Route path="managetranspoter" element={<ManageTranspoter />} />
        <Route path="createvendors" element={<CreateVendors />} />
        <Route path="manageVendor" element={<ManageVendor />} />
        <Route path="createstaff" element={<CreateStaff />} />
        <Route path="addbank" element={<AddBank />} />
        <Route path="managebank" element={<ManageBank />} />
        <Route path="stockdetails" element={<StockDetails />} />
        <Route path="managestockunit" element={<ManageStockUnit />} />
        <Route path="manageBrand" element={<ManageBrand />} />
        <Route path="manageSubBrand" element={<ManageSubBrand />} />
        <Route path="salesQuotation" element={<SalesQuotation />} />
        <Route path="managesalesQuotation" element={<ManageQuotation />} />
        {/* <Route path="invoice" element={<Invoice />} /> */}
        <Route path="invoice" element={<CreateSalesInvoice />} />
       
        <Route path="deliverychallan" element={<DeliveryChallan />} />
        <Route path="ManageProduct" element={<Manageproducts/>} />
        <Route path="CreateSalesEstimate" element={<CreateSalesEstimate/>} />
        <Route path="ManageSalesEstimate" element={<ManageSalesEstimate/>} />

      </Routes>
    </div>
  );
};

export default AdminRoute;
