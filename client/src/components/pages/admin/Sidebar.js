import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import { IoMdClose, IoMdPersonAdd } from "react-icons/io";
import {
  MdOutlineDashboard,
  MdCreateNewFolder,
  MdMovieCreation,
  MdFollowTheSigns,
  MdOutlineFollowTheSigns,
  MdLeaderboard,
} from "react-icons/md";
import { CiSquareMore } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { MdUpcoming } from "react-icons/md";
import { GiArcheryTarget } from "react-icons/gi";
import { FaRegistered } from "react-icons/fa6";

import { FiTarget } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { MdOutlineImportantDevices } from "react-icons/md";
import { FaPlusSquare } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { FaPersonCircleCheck, FaPerson } from "react-icons/fa6";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { FcRules } from "react-icons/fc";

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
                          className="flex items-center text-white hover:bg-blue-900 p-1"
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
                      <li className="py-1 ">
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
              <li className="py-1 ">
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
        {/* <li className="px-4 py-2 hover:bg-gray-700">
          <button
            onClick={() => setShowCRMDropdown(!showCRMDropdown)}
            className="w-full flex items-center justify-between focus:outline-none text-white"
          >
            <span>Account</span>
            <FaCaretDown />
          </button>
          {showCRMDropdown && (
            <ul className="ml-4 mt-2">
              <li className="py-1 ">
                <button
                  onClick={() => setseconLayer(!layer)}
                  className="w-full flex items-center justify-between focus:outline-none text-white"
                >
                  <span>Nested Account</span>
                  <FaCaretDown />
                </button>
                {layer && (
                  <ul className="ml-4 mt-2">
                    <li className="py-1 ">
                      <Link
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white"
                      >
                        
                        Nested Item
                      </Link>
                      <li className="py-1 ">
                        <Link
                          to="/admin/dashboard/manageperformance"
                          className="flex items-center text-white"
                        >
                          
                          Nested Item
                        </Link>
                      </li>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li> */}
        <ul className="sub-menu">
          <li className="sidebar-list-item" onClick={closeSidebar}>
            <Link to="/admin/dashboard/log-out" class="inline-container">
              <MdFollowTheSigns className="icon" />
              <span>Log Out</span>
            </Link>
          </li>
        </ul>
      </ul>
    </aside>
  );
}

export default Sidebar;
