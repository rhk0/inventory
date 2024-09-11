import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

function SuperAdminSideBar({ openSidebarToggle, OpenSidebar }) {
  const [showParties, setParties] = useState(false);
  const [showTransport, setTransport] = useState(false);
  const [showCustomer, setCustomer] = useState(false);

  const [showManufacture, setManufacture] = useState(false);

  const [showStaff, setStaff] = useState(false);
  const [showVendor, setVendor] = useState(false);
  const [showspplier, setSupplier] = useState(false);

  const [showBankDropdown, setBank] = useState(false);
  const [showBankTransction, setBankTransaction] = useState(false);
  const [showInventory, setInventory] = useState(false);
  const [showInventoryCategory, setInventoryCategory] = useState(false);
  const [showInventorySubCategory, setInventorySubCategory] = useState(false);
  const [showInventoryBrand, setInventoryBrand] = useState(false);
  const [showInventorySubBrand, setInventorySubBrand] = useState(false);
  const [showInventoryStockUnit, setInventoryStockUnit] = useState(false);
  const [showInventoryBranch, setInventoryBranch] = useState(false);
  const [showInventoryProduct, setInventoryProduct] = useState(false);
  const [showPurches, setPurches] = useState(false);
  const [showSales, setSales] = useState(false);
  const [showIncome, setIncome] = useState(false);
  const [showCRM, setCRM] = useState(false);
  const [showReport, setReport] = useState(false);
  const [showSettings, setSettings] = useState(false);
  const [showBankTransaction, setShowBankTransction] = useState(false);
  const [showCash, setCash] = useState(false);

  const [showExpenses, setExpenses] = useState(false);

  const [showAccount, SetShowAccount] = useState(false);
  const sidebarRef = useRef(null);

  const closeAll = () => {
    setParties(false);
    setTransport(false);
    setCustomer(false);
    setManufacture(false);
    SetShowAccount(false);
    setShowBankTransction(false);

    setStaff(false);
    setVendor(false);
    setSupplier(false);
    setBank(false);
    setInventory(false);
    setInventoryCategory(false);
    setInventorySubCategory(false);
    setInventoryBrand(false);
    setInventoryStockUnit(false);
    setInventoryBranch(false);
    setInventoryProduct(false);
    setPurches(false);
    setSales(false);
    setCash(false);
    setIncome(false);
    setCRM(false);
    setReport(false);
    setSettings(false);
  };

  const togglePurches = () => {
    closeAll();
    setPurches(!showPurches);
  };

  const toggleParties = () => {
    closeAll();
    setParties(!showParties);
  };
  const toggleAccount = () => {
    closeAll();
    SetShowAccount(!showAccount);
  };

  const toggleBank = () => {
    closeAll();
    setBank(!showBankDropdown);
  };
  const toggleInventry = () => {
    closeAll();
    setInventory(!showInventory);
  };
  const toggleSales = () => {
    closeAll();
    setSales(!showSales);
  };

  const toggleCash = () => {
    closeAll();
    setCash(!showCash);
  };
  const toggleCRM = () => {
    closeAll();
    setCRM(!showCRM);
  };

  const toggleReport = () => {
    closeAll();
    setReport(!showReport);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        openSidebarToggle
      ) {
        OpenSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSidebarToggle, OpenSidebar]);
  const toggleSettings = () => {
    closeAll();
    setSettings(!showSettings);
  };
  const closeSidebar = () => {
    if (openSidebarToggle) {
      OpenSidebar();
    }
  };
  return (
    <aside
      ref={sidebarRef}
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive " : " p-2 "}
    >
      <div className="sidebar-title">
        <div className="flex justify-between items-center gap-5">
          <div className="flex items-center">
            <img
              src="https://manasvitech.in/images/white-logo.png"
              alt="Company Logo"
              className="h-8"
            />
          </div>
        </div>
        <span
          style={{ borderColor: "white" }}
          className="icon close_icon border text-white"
          onClick={OpenSidebar}
        >
          <IoMdClose />
        </span>
      </div>

      <ul className="sidebar-list">
        {/* Dashboard */}
        <Link
          to="/superadmin/dash"
          className="w-full sidebar-list-item flex items-center innerlistsuperadmin justify-between focus:outline-none text-white "
        >
          <li className="">
            <a href="../src/pages/Dharma.js" className="w-full">
              <span className="text-nowrap">Dashboard</span>
            </a>
          </li>
        </Link>
        <Link to="/superadmin/subscriptionPlans" class="">
          <li
            className="w-full sidebar-list-item flex items-center innerlistsuperadmin justify-between focus:outline-none text-white   "
            onClick={closeSidebar}
          >
            <span>Subscription Plans</span>
          </li>{" "}
        </Link>
        <Link to="/superadmin/" class="">
          <li
            className="w-full sidebar-list-item flex items-center innerlistsuperadmin justify-between focus:outline-none text-white   "
            onClick={closeSidebar}
          >
            <span>Users</span>
          </li>
        </Link>
       
       
        <Link to="/superadmin/" class="">
          <li
            className="w-full sidebar-list-item flex items-center innerlistsuperadmin justify-between focus:outline-none text-white   "
            onClick={closeSidebar}
          >
            <span>Subscribed Users</span>
          </li>{" "}
        </Link>
        <Link to="/superadmin/" class="">
          <li
            className="w-full sidebar-list-item flex items-center innerlistsuperadmin justify-between focus:outline-none text-white   "
            onClick={closeSidebar}
          >
            <span>Free Trial Users</span>
          </li>
        </Link>
        <Link to="/superadmin/" class="">
          <li
            className="w-full sidebar-list-item flex items-center innerlistsuperadmin justify-between focus:outline-none text-white   "
            onClick={closeSidebar}
          >
            <span>Active Users</span>
          </li>
        </Link>
        <Link to="/superadmin/" class="">
          <li
            className="w-full sidebar-list-item flex items-center innerlistsuperadmin justify-between focus:outline-none text-white   "
            onClick={closeSidebar}
          >
            <span>InACtive Users</span>
          </li>{" "}
        </Link>
        <Link to="/superadmin/log-out" class="">
          {/* Logout */}
          <li
            className="w-full sidebar-list-item flex items-center innerlistsuperadmin justify-between focus:outline-none text-white   "
            onClick={closeSidebar}
          >
            <span>Log Out</span>
          </li>
        </Link>
      </ul>
    </aside>
  );
}

export default SuperAdminSideBar;
