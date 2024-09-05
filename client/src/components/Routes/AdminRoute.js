import React, { useEffect } from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../pages/admin/Header";
import Home from "../pages/admin/Home";
import Sidebar from "../pages/admin/Sidebar";
import Test from "./Test";
import { useAuth } from "../context/Auth";
import CreateSupplier from "../pages/admin/parties/CreateSupplier.js";
import ManageSupplier from "../pages/admin/parties/ManageSupplier.js";
import CreateTranspoter from "../pages/admin/parties/CreateTransporter.js";
import ManageTranspoter from "../pages/admin/parties/ManageTransporter.js";
import CreateCustomer from "../pages/admin/parties/CreateCustomer.js";
import ManageCustomer from "../pages/admin/parties/ManageCustomer.js";
import Cash from "../pages/admin/cash/Cash.js"
import CreateVendors from "../pages/admin/parties/CreateVendors.js";
import ManageVendor from "../pages/admin/parties/ManageVendor.js";
import CreateStaff from "../pages/admin/CreateStaff.js";
import BankToBankTranfer from "../pages/admin/accounts/banktransaction/BankToBankTransfer.js";
import AddBank from "../pages/admin/cash/AddBank.js";

import AddCategory from "../pages/admin/inventory/AddCategory.js";
import AddSubCategory from "../pages/admin/inventory/AddSubCategory.js";
import AddBrand from "../pages/admin/inventory/AddBrand.js";
import StockUnit from "../pages/admin/inventory/StockUnit.js";
import CashWithDrawFromBank from "../pages/admin/accounts/banktransaction/CashWithDrawFromBank.js";
import CashDepositIntoBank from "../pages/admin/accounts/banktransaction/CashDepositIntoBank.js";
import StockDetails from "../pages/admin/inventory/StockDetails.js";
import AddSubBrand from "../pages/admin/inventory/AddSubBrand.js";
import ManageCategory from "../pages/admin/inventory/ManageCategory.js";
import ManageSubCategory from "../pages/admin/inventory/ManageSubCategory.js";
import ManageStockUnit from "../pages/admin/inventory/ManageStockUnit.js";
import ManageBrand from "../pages/admin/inventory/ManageBrand.js";
import ManageSubBrand from "../pages/admin/inventory/ManageSubBrand.js";
import CreateBranches from "../pages/admin/CreateBranches.js";
import ManageBranches from "../pages/admin/ManageBranches.js";
import CreateProduct from "../pages/admin/inventory/CreateProduct.js";
import SalesQuotation from "../pages/admin/SalesQuotation.js";
import ManageQuotation from "../pages/admin/ManageQuotation.js";


import CreateManufacturer from "../pages/admin/parties/CreateManufacturer.js";
import ManageManufacturer from "../pages/admin/parties/ManageManufacturer.js";
import Manageproducts from "../pages/admin/inventory/Manageproducts.js";
import CreateSalesEstimate from "../pages/admin/sales/CreateSalesEstimate.js";
import CreateSalesInvoice from "../pages/admin/sales/CreateSalesInvoice.js";
import CreateDeliveryChallan from "../pages/admin/sales/CreateDeliveryChallan.js";
import CreateSalesReturn from "../pages/admin/sales/CreateSalesReturn.js";
import Pos from "../pages/admin/sales/Pos.js";
import PayIn from "../pages/admin/sales/PayIn.js";
import ManagePayIn from "../pages/admin/sales/ManagePayIn.js";
import TotalSalesList from "../pages/admin/sales/TotalSalesList.js";

const AdminRoute = () => {
  const [auth] = useAuth();

  // useEffect(() => {
  //   if (auth) {
  //     console.log(auth);
  //   }
  //   if (!auth) {
  //     console.log("ho");
  //   }
  // });
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
        <Route path="bankTobankTransfer" element={<BankToBankTranfer />} />
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
       
        <Route path="stockdetails" element={<StockDetails />} />
        <Route path="managestockunit" element={<ManageStockUnit />} />
        <Route path="manageBrand" element={<ManageBrand />} />
        <Route path="manageSubBrand" element={<ManageSubBrand />} />
        <Route path="salesQuotation" element={<SalesQuotation />} />
        <Route path="managesalesQuotation" element={<ManageQuotation />} />
        {/* <Route path="invoice" element={<Invoice />} /> */}
        <Route path="invoice" element={<CreateSalesInvoice />} />
        <Route path="pos" element={<Pos />} />
        <Route path="payin" element={<PayIn />} />
        <Route path="ManagePayIn" element={<ManagePayIn />} />
        <Route path="TotalSalesList" element={<TotalSalesList />} />

        
       
        {/* <Route path="deliverychallan" element={<DeliveryChallan />} /> */}
        <Route path="deliverychallan" element={<CreateDeliveryChallan />} />
        <Route path="salesreturn" element={<CreateSalesReturn />} />
        

        <Route path="ManageProduct" element={<Manageproducts/>} />
        <Route path="CreateSalesEstimate" element={<CreateSalesEstimate/>} />
      </Routes>
    </div>
  );
};

export default AdminRoute;
