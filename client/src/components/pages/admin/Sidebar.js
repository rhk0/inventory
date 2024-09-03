import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
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
      className={openSidebarToggle ? "sidebar-responsive " : " p-2"}
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
        <li className="sidebar-list-item flex items-center innerlist justify-between focus:outline-none text-white p-1">
          <a href="../src/pages/Dharma.js" className="w-full">
            <Link to="/admin/dash" className="inline-container">
              <span>Dashboard</span>
            </Link>
          </a>
        </li>

        {/* Parties */}
        <li className="px-0 py-2">
          <button
            onClick={() => {
              setParties(!showParties);
              toggleParties();
            }}
            className="w-full sidebar-list-item flex items-center innerlist justify-between focus:outline-none text-white p-1"
          >
            <span className="">Parties</span>
            {!showParties ? <IoIosArrowForward /> : <IoIosArrowDown />}
          </button>
          {showParties && (
            <ul className="ml-4">
              {/* Supplier */}
              <li className="">
                <button
                  onClick={() => setSupplier(!showspplier)}
                  className="w-full flex items-center nestedlist justify-between focus:outline-none text-white nesteditem"
                >
                  <span>Supplier</span>
                  {!showspplier ? <IoIosArrowForward /> : <IoIosArrowDown />}
                </button>
                {showspplier && (
                  <ul className="ml-4">
                    <li>
                      <Link
                        to="/admin/CreateSupplier"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Add Supplier
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/ManageSupplier"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Supplier List
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              {/* Customer */}
              <li className="">
                <button
                  onClick={() => setCustomer(!showCustomer)}
                  className="w-full flex items-center nestedlist justify-between focus:outline-none text-white nesteditem"
                >
                  <span>Customer</span>
                  {!showCustomer ? <IoIosArrowForward /> : <IoIosArrowDown />}
                </button>
                {showCustomer && (
                  <ul className="ml-4">
                    <li>
                      <Link
                        to="/admin/CreateCustomer"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Add Customer
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/ManageCustomer"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Customer List
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Manufacture */}

              <li className="">
                <button
                  onClick={() => setManufacture(!showManufacture)}
                  className="w-full flex items-center nestedlist justify-between focus:outline-none text-white nesteditem"
                >
                  <span>Manufacturer</span>
                  {!showManufacture ? (
                    <IoIosArrowForward />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </button>
                {showManufacture && (
                  <ul className="ml-4">
                    <li>
                      <Link
                        to="/admin/CreateManufacturer"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Add Manufacturer
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/ManageManufacturer"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Manufacturer List
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Vendor */}
              <li className="">
                <button
                  onClick={() => setVendor(!showVendor)}
                  className="w-full flex items-center nestedlist justify-between focus:outline-none text-white nesteditem"
                >
                  <span>Vendor</span>
                  {!showVendor ? <IoIosArrowForward /> : <IoIosArrowDown />}
                </button>
                {showVendor && (
                  <ul className="ml-4">
                    <li>
                      <Link
                        to="/admin/createvendors"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Create Vendor
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/manageVendor"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Manage Vendor
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Transport */}
              <li className="">
                <button
                  onClick={() => setTransport(!showTransport)}
                  className="w-full flex items-center nestedlist justify-between focus:outline-none text-white nesteditem"
                >
                  <span>Transport</span>
                  {!showTransport ? <IoIosArrowForward /> : <IoIosArrowDown />}
                </button>
                {showTransport && (
                  <ul className="ml-4">
                    <li>
                      <Link
                        to="/admin/createtranspoter"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Create Transporter
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/managetranspoter"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Manage Transporter
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>

        {/* Inventory */}
        <li className="px-1 py-2 ">
          <button
            onClick={() => {
              setInventory(!showInventory);
              toggleInventry();
            }}
            className="w-full sidebar-list-item flex items-center innerlist justify-between focus:outline-none text-white   p-1"
          >
            <span className="">Inventory</span>
            {!showInventory ? <IoIosArrowForward /> : <IoIosArrowDown />}
          </button>
          {showInventory && (
            <ul className="ml-4   ">
              <li className=" ">
                <Link
                  to="/admin/addcategory"
                  className="flex items-center text-white nestitemhover"
                >
                  Create Category
                </Link>
                <li className=" ">
                  <Link
                    to="/admin/ManageCategory"
                    className="flex items-center text-white nestitemhover"
                  >
                    Manage Category
                  </Link>
                </li>
              </li>

              <li className=" ">
                <Link
                  to="/admin/addsubcategory"
                  className="flex items-center text-white nestitemhover"
                >
                  Create Sub Category
                </Link>
                <li className=" ">
                  <Link
                    to="/admin/managesubcategory"
                    className="flex items-center text-white nestitemhover"
                  >
                    Manage Sub Category
                  </Link>
                </li>
              </li>

              <li className=" ">
                <Link
                  to="/admin/addbrand"
                  className="flex items-center text-white nestitemhover"
                >
                  Create Brand
                </Link>

                <li className=" ">
                  <Link
                    to="/admin/manageBrand"
                    className="flex items-center text-white nestitemhover"
                  >
                    Manage Brand
                  </Link>
                </li>
              </li>

              <li className=" ">
                <Link
                  to="/admin/AddSubBrand"
                  className="flex items-center text-white nestitemhover"
                >
                  Add Sub Brand
                </Link>
                <li className=" ">
                  <Link
                    to="/admin/manageSubBrand"
                    className="flex items-center text-white nestitemhover"
                  >
                    Manage Sub Brand
                  </Link>
                </li>
              </li>

              <li className=" ">
                <Link
                  to="/admin/addstock"
                  className="flex items-center text-white nestitemhover"
                >
                  Create Unit
                </Link>
                <li className=" ">
                  <Link
                    to="/admin/managestockunit"
                    className="flex items-center text-white nestitemhover"
                  >
                    Manage Unit
                  </Link>
                </li>
              </li>

              <li className=" ">
                <Link
                  to="/admin/createproduct"
                  className="flex items-center text-white nestitemhover"
                >
                  Add Product
                </Link>
                <li className=" ">
                  <Link
                    to="/admin/manageproduct"
                    className="flex items-center text-white nestitemhover"
                  >
                    Manage Product
                  </Link>
                </li>
              </li>
            </ul>
          )}
        </li>

        {/* Sales */}
        <li className="px-1 py-2 ">
          <button
            onClick={() => {
              setSales(!showSales);
              toggleSales();
            }}
            className="w-full sidebar-list-item flex items-center innerlist justify-between focus:outline-none text-white p-1"
          >
            <span className="">Sales</span>
            {!showSales ? <IoIosArrowForward /> : <IoIosArrowDown />}
          </button>
          {showSales && (
            <ul className="ml-4">
              <li className=" ">
                <Link
                  to="/admin/CreateSalesEstimate"
                  className="flex items-center text-white nestitemhover "
                >
                  Create Sales Estimate
                </Link>
              </li>
              <li className=" ">
                <Link
                  to=""
                  className="flex items-center text-white nestitemhover "
                >
                  Sales Estimate List
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/invoice"
                  className="flex items-center text-white nestitemhover"
                >
                  create Sales Invoice
                </Link>
              </li>

              <li className="">
                <Link
                  to=""
                  className="flex items-center text-white nestitemhover"
                >
                  Sales Invoice List
                </Link>
              </li>

              <li className="">
                <Link
                  to="/admin/deliverychallan"
                  className="flex items-center text-white nestitemhover"
                >
                  create Delivery challan
                </Link>
              </li>
              <li className="">
                <Link
                  to=""
                  className="flex items-center text-white nestitemhover"
                >
                  Delivery Challan List
                </Link>
              </li>

              <li className="">
                <Link
                  to=""
                  className="flex items-center text-white nestitemhover"
                >
                  Create Sales Return
                </Link>
              </li>

              <li className="">
                <Link
                  to=""
                  className="flex items-center text-white nestitemhover"
                >
                  Manage Sales Return
                </Link>
              </li>

              <li className="">
                <Link
                  to=""
                  className="flex items-center text-white nestitemhover"
                >
                  Point of Sales
                </Link>
              </li>

              <li className="">
                <Link
                  to=""
                  className="flex items-center text-white nestitemhover"
                >
                  Online Store
                </Link>
              </li>

              <li className="">
                <Link
                  to=""
                  className="flex items-center text-white nestitemhover"
                >
                  Pay In
                </Link>
              </li>

              <li className="">
                <Link
                  to=""
                  className="flex items-center text-white nestitemhover"
                >
                  Manage Pay In
                </Link>
              </li>

              <li className="">
                <Link
                  to=""
                  className="flex items-center text-white nestitemhover"
                >
                  Total Sales List
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Purches */}
        <li className="px-1 py-2 ">
          <button
            onClick={() => {
              setPurches(!showPurches);
              togglePurches(); // Call togglePurches function
            }}
            className="w-full sidebar-list-item flex items-center innerlist justify-between focus:outline-none text-white   p-1"
          >
            <span className="">Purchase</span>
            {!showPurches ? <IoIosArrowForward /> : <IoIosArrowDown />}
          </button>
          {showPurches && (
            <ul className="ml-4">
              <li className=" ">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="flex items-center text-white nestitemhover "
                >
                  Create Purchase Order
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="flex items-center text-white nestitemhover"
                >
                  Purchase Order List
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="flex items-center text-white nestitemhover"
                >
                  Purchase Invoice
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="flex items-center text-white nestitemhover"
                >
                  Purchase Invoice List
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="flex items-center text-white nestitemhover"
                >
                  Purchase Return
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="flex items-center text-white nestitemhover"
                >
                  Purchase Return List
                </Link>
              </li>{" "}
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="flex items-center text-white nestitemhover"
                >
                  Pay Out
                </Link>
              </li>{" "}
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="flex items-center text-white nestitemhover"
                >
                  Manage Pay out
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* cash */}
        <li className="px-1 py-2 ">
          <button
            onClick={() => {
              setCash(!showCash);
              toggleCash();
            }}
            className="w-full sidebar-list-item flex items-center innerlist justify-between focus:outline-none text-white   p-1"
          >
            <span className="">cash</span>
            {!showCash ? <IoIosArrowForward /> : <IoIosArrowDown />}
          </button>
          {showCash && (
            <ul className="ml-4   ">
              <li className=" ">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="flex items-center text-white nestitemhover "
                >
                  Add cash
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="flex items-center text-white nestitemhover"
                >
                  Manage Cash
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="flex items-center text-white nestitemhover"
                >
                  Add Bank
                </Link>
              </li>{" "}
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="flex items-center text-white nestitemhover"
                >
                  Manage Bank
                </Link>
              </li>
            </ul>
          )}
        </li>
        {/* Account */}
        <li className="px-0 py-2">
          <button
            onClick={() => {
              setBankTransaction(!showAccount);
              toggleAccount();
            }}
            className="w-full sidebar-list-item flex items-center innerlist justify-between focus:outline-none text-white p-1"
          >
            <span className="">Account</span>
            {!showAccount ? <IoIosArrowForward /> : <IoIosArrowDown />}
          </button>
          {showAccount && (
            <ul className="ml-4">
              {/* setBankTransaction */}
              <li className="">
                <button
                  onClick={() => setShowBankTransction(!showBankTransaction)}
                  className="w-full flex items-center nestedlist justify-between focus:outline-none text-white nesteditem"
                >
                  <span>Bank Transaction</span>
                  {!showBankTransaction ? (
                    <IoIosArrowForward />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </button>
                {showBankTransaction && (
                  <ul className="ml-4">
                    <li>
                      <Link
                        to=""
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Bank to Bank Transfer
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/ManageSupplier"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Cash Deposit Into Bank
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/ManageSupplier"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Cash Withdraw from Bank
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="">
                <button
                  onClick={() => setExpenses(!showExpenses)}
                  className="w-full flex items-center nestedlist justify-between focus:outline-none text-white nesteditem"
                >
                  <span>Expenses</span>
                  {!showExpenses ? <IoIosArrowForward /> : <IoIosArrowDown />}
                </button>
                {showExpenses && (
                  <ul className="ml-4">
                    <li>
                      <Link
                        to=""
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Add Expenses
                      </Link>
                    </li>
                    <li>
                      <Link
                        to=""
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Expenses List
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* income*/}
              <li className="">
                <button
                  onClick={() => setIncome(!showIncome)}
                  className="w-full flex items-center nestedlist justify-between focus:outline-none text-white nesteditem"
                >
                  <span>Income</span>
                  {!showIncome ? <IoIosArrowForward /> : <IoIosArrowDown />}
                </button>
                {showIncome && (
                  <ul className="ml-4">
                    <li>
                      <Link
                        to=""
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Add Income
                      </Link>
                    </li>
                    <li>
                      <Link
                        to=""
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Manage Income
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>

        {/* Settings */}
        <li className="px-1 py-2 ">
          <button
            onClick={() => {
              setSettings(!showSettings);
              toggleSettings();
            }}
            className="w-full sidebar-list-item flex items-center innerlist justify-between focus:outline-none text-white   p-1"
          >
            <span className="">Settings</span>
            {!showSettings ? <IoIosArrowForward /> : <IoIosArrowDown />}
          </button>
          {showSettings && (
            <ul className="ml-4   ">
              <li className=" ">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="flex items-center text-white nestitemhover "
                >
                  Business Details
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="flex items-center text-white nestitemhover"
                >
                  Add Staff
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="flex items-center text-white nestitemhover"
                >
                  Change Profile
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="flex items-center text-white nestitemhover"
                >
                  Account Settings
                </Link>
              </li>
            </ul>
          )}
        </li>
        {/* Logout */}
        <li
          className="w-full sidebar-list-item flex items-center innerlist justify-between focus:outline-none text-white   "
          onClick={closeSidebar}
        >
          <Link to="/admin/dashboard/log-out" class="">
            <span>Log Out</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
