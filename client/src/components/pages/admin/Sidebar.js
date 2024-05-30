import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [showParties, setParties] = useState(false);
  const [showTransport, setTransport] = useState(false);
  const [showCustomer, setCustomer] = useState(false);
  const [showStaff, setStaff] = useState(false);
  const [showVendor, setVendor] = useState(false);
  const [showspplier, setSupplier] = useState(false);

  const [showBankDropdown, setBank] = useState(false);
  const [showBankTransction, setBankTransaction] = useState(false);
  const [showInventory, setInventory] = useState(false);
  const [showInventoryCategory, setInventoryCategory] = useState(false);
  const [showInventorySubCategory, setInventorySubCategory] = useState(false);
  const [showInventoryBrand, setInventoryBrand] = useState(false);
  const [showInventoryStockUnit, setInventoryStockUnit] = useState(false);
  const [showInventoryBranch, setInventoryBranch] = useState(false);
  const [showInventoryProduct, setInventoryProduct] = useState(false);
  const [showPurches, setPurches] = useState(false);
  const [showSales, setSales] = useState(false);
  const [showExpenses, setExpenses] = useState(false);
  const [showIncome, setIncome] = useState(false);
  const [showCRM, setCRM] = useState(false);
  const [showReport, setReport] = useState(false);
  const [showSettings, setSettings] = useState(false);
  const sidebarRef = useRef(null);

  const closeAll = () => {
    setParties(false);
    setTransport(false);
    setCustomer(false);
    setStaff(false);
    setVendor(false);
    setSupplier(false);
    setBank(false);
    setBankTransaction(false);
    setInventory(false);
    setInventoryCategory(false);
    setInventorySubCategory(false);
    setInventoryBrand(false);
    setInventoryStockUnit(false);
    setInventoryBranch(false);
    setInventoryProduct(false);
    setPurches(false);
    setSales(false);
    setExpenses(false);
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

  const toggleExpenses = () => {
    closeAll();
    setExpenses(!showExpenses);
  };

  const toggleIncome = () => {
    closeAll();
    setIncome(!showIncome);
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
            <Link to="/dashboard" className="inline-container">
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
                        Create Supplier
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/ManageSupplier"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Manage Supplier
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
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Create Customer
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Manage Customer
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
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Create Transporter
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Manage Transporter
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              {/* Staff */}
              <li className="">
                <button
                  onClick={() => setStaff(!showStaff)}
                  className="w-full flex items-center nestedlist justify-between focus:outline-none text-white nesteditem"
                >
                  <span>Staff</span>
                  {!showStaff ? <IoIosArrowForward /> : <IoIosArrowDown />}
                </button>
                {showStaff && (
                  <ul className="ml-4">
                    <li>
                      <Link
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Create Staff
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Manage Staff
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
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Create Vendor
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Manage Vendor
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>

        {/* Cash */}
        <li className="sidebar-list-item hover:bg-blue-900">
          <a href="../src/pages/Dharma.js" className="w-full">
            <Link to="/admin/dashboard" className="inline-container">
              <span>Cash</span>
            </Link>
          </a>
        </li>

        {/* Bank */}
        <li className="px-1 py-2 ">
          <button
            onClick={() => {
              setBank(!showBankDropdown);
              toggleBank();
            }}
            className="w-full sidebar-list-item flex items-center innerlist justify-between focus:outline-none text-white   p-1"
          >
            <span className="">Bank</span>
            {!showBankDropdown ? <IoIosArrowForward /> : <IoIosArrowDown />}
          </button>
          {showBankDropdown && (
            <ul className="ml-4 ">
              <li className=" ">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white "
                >
                  Add Bank 
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white"
                >
                  Manage Bank
                </Link>
              </li>

              <li className="  ">
                <button
                  onClick={() => setBankTransaction(!showBankTransction)}
                  className="w-full flex items-center nestedlist sidebar-list-item justify-between focus:outline-none text-white "
                >
                  <span>Bank Transaction</span>
                  {!showBankTransction ? (
                    <IoIosArrowForward />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </button>
                {showBankTransction && (
                  <ul className="ml-4  px-1">
                    <li className=" ">
                      <Link
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white nestitemhover"
                      >
                        Bank To Bank Transfer
                      </Link>
                      <li className=" ">
                        <Link
                          to="/admin/dashboard/manageperformance"
                          className="flex items-center text-white nestitemhover"
                        >
                          Cash Deposit Into Bank
                        </Link>
                      </li>
                      <li className=" ">
                        <Link
                          to="/admin/dashboard/manageperformance"
                          className="flex items-center text-white nestitemhover"
                        >
                          Cash Withdraw From Bank
                        </Link>
                      </li>
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
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white "
                >
                  Stock Details
                </Link>
              </li>

              <li className="  ">
                <button
                  onClick={() => setInventoryCategory(!showInventoryCategory)}
                  className="w-full flex items-center nestedlist sidebar-list-item justify-between focus:outline-none text-white "
                >
                  <span>Category</span>
                  {!showInventoryCategory ? (
                    <IoIosArrowForward />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </button>
                {showInventoryCategory && (
                  <ul className="ml-4  px-1">
                    <li className=" ">
                      <Link
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white nestitemhover"
                      >
                        Add Category
                      </Link>
                      <li className=" ">
                        <Link
                          to="/admin/dashboard/manageperformance"
                          className="flex items-center text-white nestitemhover"
                        >
                          Manage Category
                        </Link>
                      </li>
                    </li>
                  </ul>
                )}
              </li>

              <li className="  ">
                <button
                  onClick={() =>
                    setInventorySubCategory(!showInventorySubCategory)
                  }
                  className="w-full flex items-center nestedlist sidebar-list-item justify-between focus:outline-none text-white "
                >
                  <span>Sub Category</span>
                  {!showInventorySubCategory ? (
                    <IoIosArrowForward />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </button>
                {showInventorySubCategory && (
                  <ul className="ml-4  px-1">
                    <li className=" ">
                      <Link
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white nestitemhover"
                      >
                        Add Sub Category
                      </Link>
                      <li className=" ">
                        <Link
                          to="/admin/dashboard/manageperformance"
                          className="flex items-center text-white nestitemhover"
                        >
                          Manage Sub Category
                        </Link>
                      </li>
                    </li>
                  </ul>
                )}
              </li>
              <li className="  ">
                <button
                  onClick={() => setInventoryBrand(!showInventoryBrand)}
                  className="w-full flex items-center nestedlist sidebar-list-item justify-between focus:outline-none text-white "
                >
                  <span>Brand</span>
                  {!showInventoryBrand ? (
                    <IoIosArrowForward />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </button>
                {showInventoryBrand && (
                  <ul className="ml-4  px-1">
                    <li className=" ">
                      <Link
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white nestitemhover"
                      >
                        Add Sub Category
                      </Link>
                      <li className=" ">
                        <Link
                          to="/admin/dashboard/manageperformance"
                          className="flex items-center text-white nestitemhover"
                        >
                          Manage Sub Category
                        </Link>
                      </li>
                    </li>
                  </ul>
                )}
              </li>

              <li className="  ">
                <button
                  onClick={() => setInventoryStockUnit(!showInventoryStockUnit)}
                  className="w-full flex items-center nestedlist sidebar-list-item justify-between focus:outline-none text-white "
                >
                  <span>Stock Unit</span>
                  {!showInventoryStockUnit ? (
                    <IoIosArrowForward />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </button>
                {showInventoryStockUnit && (
                  <ul className="ml-4  px-1">
                    <li className=" ">
                      <Link
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white nestitemhover"
                      >
                        Add Stock Unit
                      </Link>
                      <li className=" ">
                        <Link
                          to="/admin/dashboard/manageperformance"
                          className="flex items-center text-white nestitemhover"
                        >
                          Manage Stock Unit
                        </Link>
                      </li>
                    </li>
                  </ul>
                )}
              </li>

              <li className="  ">
                <button
                  onClick={() => setInventoryBranch(!showInventoryBranch)}
                  className="w-full flex items-center nestedlist sidebar-list-item justify-between focus:outline-none text-white "
                >
                  <span>Branch</span>
                  {!showInventoryBranch ? (
                    <IoIosArrowForward />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </button>
                {showInventoryBranch && (
                  <ul className="ml-4  px-1">
                    <li className=" ">
                      <Link
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white nestitemhover"
                      >
                        Add Branch
                      </Link>
                      <li className=" ">
                        <Link
                          to="/admin/dashboard/manageperformance"
                          className="flex items-center text-white nestitemhover"
                        >
                          Manage Branch
                        </Link>
                      </li>
                    </li>
                  </ul>
                )}
              </li>

              <li className="">
                <button
                  onClick={() => setInventoryProduct(!showInventoryProduct)}
                  className="w-full flex items-center nestedlist sidebar-list-item justify-between focus:outline-none text-white "
                >
                  <span>Product</span>
                  {!showInventoryProduct ? (
                    <IoIosArrowForward />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </button>
                {showInventoryProduct && (
                  <ul className="ml-4  px-1">
                    <li className=" ">
                      <Link
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white nestitemhover"
                      >
                        Add Product
                      </Link>
                      <li className=" ">
                        <Link
                          to="/admin/dashboard/manageperformance"
                          className="flex items-center text-white nestitemhover"
                        >
                          Manage Product
                        </Link>
                      </li>
                    </li>
                  </ul>
                )}
              </li>

              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white"
                >
                  Stock Transfer
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white"
                >
                  Stock Verification
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
            <span className="">Purches</span>
            {!showPurches ? <IoIosArrowForward /> : <IoIosArrowDown />}
          </button>
          {showPurches && (
            <ul className="ml-4">
              <li className=" ">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white "
                >
                  Purches Order
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white"
                >
                  Purches
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white"
                >
                  Purches Bills
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white"
                >
                  Debit Note
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white"
                >
                  Pay Out
                </Link>
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
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white "
                >
                  Quotation
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white"
                >
                  Invoice
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white"
                >
                  Delivery challan
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white"
                >
                  Credit Note
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white"
                >
                  Pay In
                </Link>
              </li>
            </ul>
          )}
        </li>
        {/* Expenses */}
        <li className="px-1 py-2 ">
          <button
            onClick={() => {
              setExpenses(!showExpenses);
              toggleExpenses();
            }}
            className="w-full sidebar-list-item flex items-center innerlist justify-between focus:outline-none text-white   p-1"
          >
            <span className="">Expenses</span>
            {!showExpenses ? <IoIosArrowForward /> : <IoIosArrowDown />}
          </button>
          {showExpenses && (
            <ul className="ml-4   ">
              <li className=" ">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white "
                >
                  Create Expenses
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white"
                >
                  Manage Expenses
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Income */}
        <li className="px-1 py-2 ">
          <button
            onClick={() => {
              setIncome(!showIncome);
              toggleIncome();
            }}
            className="w-full sidebar-list-item flex items-center innerlist justify-between focus:outline-none text-white   p-1"
          >
            <span className="">Income</span>
            {!showIncome ? <IoIosArrowForward /> : <IoIosArrowDown />}
          </button>
          {showIncome && (
            <ul className="ml-4   ">
              <li className=" ">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white "
                >
                  Create Income
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white"
                >
                  Manage Income
                </Link>
              </li>
            </ul>
          )}
        </li>
        {/* Point Of Sales */}
        <li className="sidebar-list-item hover:bg-blue-900 ">
          <a href="../src/pages/Dharma.js" className="w-full">
            <Link to="/admin/dashboard" class="inline-container">
              <span> Point Of Sales</span>
            </Link>
          </a>
        </li>

        {/* CRM */}
        <li className="px-1 py-2 ">
          <button
            onClick={() => {
              setCRM(!showCRM);
              toggleCRM();
            }}
            className="w-full sidebar-list-item flex items-center innerlist justify-between focus:outline-none text-white   p-1"
          >
            <span className="">CRM</span>
            {!showCRM ? <IoIosArrowForward /> : <IoIosArrowDown />}
          </button>
          {showCRM && (
            <ul className="ml-4   ">
              <li className=" ">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white "
                >
                  Create Coupon
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white"
                >
                  Manage Coupon
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white"
                >
                  Add Membership
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white"
                >
                  Manage Membership
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white"
                >
                  Discount
                </Link>
              </li>
            </ul>
          )}
        </li>
        {/* Online store  */}
        <li className="sidebar-list-item hover:bg-blue-900 ">
          <a href="../src/pages/Dharma.js" className="w-full">
            <Link to="/admin/dashboard" class="inline-container">
              <span> Online store </span>
            </Link>
          </a>
        </li>
        {/* Report */}
        <li className="px-1 py-2 ">
          <button
            onClick={() => {
              setReport(!showReport);
              toggleReport();
            }}
            className="w-full sidebar-list-item flex items-center innerlist justify-between focus:outline-none text-white   p-1"
          >
            <span className="">Report</span>
            {!showReport ? <IoIosArrowForward /> : <IoIosArrowDown />}
          </button>
          {showReport && (
            <ul className="ml-4   ">
              <li className=" ">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white "
                >
                  Sales
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white"
                >
                  Purchase
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white"
                >
                  Accounts
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white"
                >
                  GST
                </Link>
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
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white "
                >
                  Profile
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white"
                >
                  Taxes
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white"
                >
                  User Role
                </Link>
              </li>
              <li className="">
                <Link
                  to="/admin/dashboard/manageperformance"
                  className="w-full sidebar-list-item flex items-center nestedlist justify-between focus:outline-none text-white"
                >
                  Term And Conditions
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
