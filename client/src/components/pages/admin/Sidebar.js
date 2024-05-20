import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import { IoMdClose } from "react-icons/io";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [showCRMDropdown, setParties] = useState(false);
  const [showtransport, setTransport] = useState(false);
  const [customer, setCostomer] = useState(false);
  const [showstaff, setStaff] = useState(false);
  const [showvendor, setVender] = useState(false);
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
  const sidebarRef = useRef(null);

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

  const closeSidebar = () => {
    if (openSidebarToggle) {
      OpenSidebar();
    }
  };

  return (
    <aside
      ref={sidebarRef}
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <img src="https://manasvitech.in/images/white-logo.png" />
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
        <li className="w-full sidebar-list-item flex items-center innerlist justify-between focus:outline-none text-white   p-1 ">
          <a href="../src/pages/Dharma.js" className="w-full">
            <Link to="/admin/dashboard" class="inline-container">
              <span> Dashboard</span>
            </Link>
          </a>
        </li>
        {/* Parties */}
        <li className="px-0 py-2 ">
          <button
            onClick={() => setParties(!showCRMDropdown)}
            className="w-full sidebar-list-item flex items-center innerlist justify-between focus:outline-none text-white   p-1"
          >
            <span className="">Parties</span>

            {!showCRMDropdown ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </button>
          {showCRMDropdown && (
            <ul className="ml-4  ">
              <li className=" ">
                <button
                  onClick={() => setSupplier(!showspplier)}
                  className="w-full flex items-center nestedlist justify-between focus:outline-none text-white nesteditem  "
                >
                  <span>Supplier</span>
                  {!showspplier ? <IoIosArrowDown /> : <IoIosArrowForward />}
                </button>
                {showspplier && (
                  <ul className="ml-4 ">
                    <li className="  ">
                      <Link
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Create Supplier
                      </Link>

                      <Link
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Manage Supplier
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className=" ">
                <button
                  onClick={() => setCostomer(!customer)}
                  className="w-full flex items-center nestedlist justify-between focus:outline-none text-white nesteditem  "
                >
                  <span>Customer</span>
                  {!customer ? <IoIosArrowDown /> : <IoIosArrowForward />}
                </button>
                {customer && (
                  <ul className="ml-4 ">
                    <li className=" ">
                      <Link
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Create Customer
                      </Link>
                      <li className=" ">
                        <Link
                          to="/admin/dashboard/manageperformance"
                          className="flex items-center text-white nesteditem p-1"
                        >
                          Manage Customer
                        </Link>
                      </li>
                    </li>
                  </ul>
                )}
              </li>
              <li className=" ">
                <button
                  onClick={() => setTransport(!showtransport)}
                  className="w-full flex items-center nestedlist justify-between focus:outline-none text-white nesteditem  "
                >
                  <span>Transport</span>
                  {!showtransport ? <IoIosArrowDown /> : <IoIosArrowForward />}
                </button>
                {showtransport && (
                  <ul className="ml-4 ">
                    <li className=" ">
                      <Link
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Create Transporter
                      </Link>
                      <li className=" ">
                        <Link
                          to="/admin/dashboard/manageperformance"
                          className="flex items-center text-white nesteditem p-1"
                        >
                          Manage Transporter
                        </Link>
                      </li>
                    </li>
                  </ul>
                )}
              </li>
              <li className=" ">
                <button
                  onClick={() => setStaff(!showstaff)}
                  className="w-full flex items-center nestedlist justify-between focus:outline-none text-white nesteditem  "
                >
                  <span>Staff</span>
                  {!showstaff ? <IoIosArrowDown /> : <IoIosArrowForward />}
                </button>
                {showstaff && (
                  <ul className="ml-4 ">
                    <li className=" ">
                      <Link
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Create Staff
                      </Link>
                      <li className=" ">
                        <Link
                          to="/admin/dashboard/manageperformance"
                          className="flex items-center text-white nesteditem p-1"
                        >
                          Manage Staff
                        </Link>
                      </li>
                    </li>
                  </ul>
                )}
              </li>
              <li className=" ">
                <button
                  onClick={() => setVender(!showvendor)}
                  className="w-full flex items-center nestedlist justify-between focus:outline-none text-white nesteditem  "
                >
                  <span>Vendor</span>
                  {!showvendor ? <IoIosArrowDown /> : <IoIosArrowForward />}
                </button>
                {showvendor && (
                  <ul className="ml-4 ">
                    <li className="">
                      <Link
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Create Vender
                      </Link>
                      <li className="">
                        <Link
                          to="/admin/dashboard/manageperformance"
                          className="flex items-center text-white nesteditem p-1"
                        >
                          Manage Vender
                        </Link>
                      </li>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>
        {/* Cash */}

        <li className="sidebar-list-item hover:bg-blue-900 ">
          <a href="../src/pages/Dharma.js" className="w-full">
            <Link to="/admin/dashboard" class="inline-container">
              <span> Cash</span>
            </Link>
          </a>
        </li>

        {/* Bank */}
        <li className="px-1 py-2 ">
          <button
            onClick={() => setBank(!showBankDropdown)}
            className="w-full sidebar-list-item flex items-center innerlist justify-between focus:outline-none text-white   p-1"
          >
            <span className="">Bank</span>
            {!showBankDropdown ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </button>
          {showBankDropdown && (
            <ul className="ml-4   ">
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
                    <IoIosArrowDown />
                  ) : (
                    <IoIosArrowForward />
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
            onClick={() => setInventory(!showInventory)}
            className="w-full sidebar-list-item flex items-center innerlist justify-between focus:outline-none text-white   p-1"
          >
            <span className="">Inventory</span>
            {!showInventory ? <IoIosArrowDown /> : <IoIosArrowForward />}
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
                    <IoIosArrowDown />
                  ) : (
                    <IoIosArrowForward />
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
                    <IoIosArrowDown />
                  ) : (
                    <IoIosArrowForward />
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
                    <IoIosArrowDown />
                  ) : (
                    <IoIosArrowForward />
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
                    <IoIosArrowDown />
                  ) : (
                    <IoIosArrowForward />
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
                    <IoIosArrowDown />
                  ) : (
                    <IoIosArrowForward />
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
                    <IoIosArrowDown />
                  ) : (
                    <IoIosArrowForward />
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
            onClick={() => setPurches(!showPurches)}
            className="w-full sidebar-list-item flex items-center innerlist justify-between focus:outline-none text-white   p-1"
          >
            <span className="">Purches</span>
            {!showPurches ? <IoIosArrowDown /> : <IoIosArrowForward />}
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
            onClick={() => setSales(!showSales)}
            className="w-full sidebar-list-item flex items-center innerlist justify-between focus:outline-none text-white p-1"
          >
            <span className="">Sales</span>
            {!showSales ? <IoIosArrowDown/> : <IoIosArrowForward/>}
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
