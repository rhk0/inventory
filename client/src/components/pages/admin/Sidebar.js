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
          <image src="https://manasvitech.in/images/white-logo.png" />
        </div>
        <span
          style={{ borderColor: "white" }}
          className="icon close_icon border"
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
                    <li className=" ">
                      <Link
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white nesteditem p-1"
                      >
                        Create Vender
                      </Link>
                      <li className=" ">
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
