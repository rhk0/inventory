import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  const [showHRMDropdown, setShowHRMDropdown] = useState(false);
  const [showCRMDropdown, setShowCRMDropdown] = useState(false);
  const [showtransport, setTransport] = useState(false);
  const [customer, setCostomer] = useState(false);
  const [showstaff, setStaff] = useState(false);
  const [showvendor, setVender] = useState(false);

  const [showspplier, setSupplier] = useState(false);

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
          className="icon close_icon border"
          onClick={OpenSidebar}
        >
          <IoMdClose />
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <a href="../src/pages/Dharma.js" className="w-full">
            <Link to="/admin/dashboard" class="inline-container">
              <MdOutlineDashboard className="icon" />
              <span> Dashboard</span>
            </Link>
          </a>
        </li>

        <li className="px-4 py-2 ">
          <button
            onClick={() => setShowCRMDropdown(!showCRMDropdown)}
            className="w-full flex items-center justify-between focus:outline-none text-white  hover:bg-blue-900 p-1"
          >
            <span className="">Parties</span>
            <FaCaretDown />
          </button>
          {showCRMDropdown && (
            <ul className="ml-4 mt-2 ">
              <li className="py-1 ">
                <button
                  onClick={() => setSupplier(!showspplier)}
                  className="w-full flex items-center justify-between focus:outline-none text-white hover:bg-blue-900 p-1 "
                >
                  <span>Supplier</span>
                  <FaCaretDown />
                </button>
                {showspplier && (
                  <ul className="ml-4 mt-2">
                    <li className="py-1  ">
                      <Link
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white hover:bg-blue-900 p-1"
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
              <li className="py-1 ">
                <button
                  onClick={() => setCostomer(!customer)}
                  className="w-full flex items-center justify-between focus:outline-none text-white"
                >
                  <span>Customer</span>
                  <FaCaretDown />
                </button>
                {customer && (
                  <ul className="ml-4 mt-2">
                    <li className="py-1 ">
                      <Link
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white"
                      >
                        Create Customer
                      </Link>
                      <li className="py-1">
                        <Link
                          to="/admin/dashboard/manageperformance"
                          className="flex items-center text-white"
                        >
                          Manage Customer
                        </Link>
                      </li>
                    </li>
                  </ul>
                )}
              </li>
              <li className="py-1">
                <button
                  onClick={() => setTransport(!showtransport)}
                  className="w-full flex items-center justify-between focus:outline-none text-white"
                >
                  <span>Transport</span>
                  <FaCaretDown />
                </button>
                {showtransport && (
                  <ul className="ml-4 mt-2">
                    <li className="py-1 ">
                      <Link
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white"
                      >
                        Create Transporter
                      </Link>
                      <li className="py-1 ">
                        <Link
                          to="/admin/dashboard/manageperformance"
                          className="flex items-center text-white"
                        >
                          Manage Transporter
                        </Link>
                      </li>
                    </li>
                  </ul>
                )}
              </li>
              <li className="py-1 ">
                <button
                  onClick={() => setStaff(!showstaff)}
                  className="w-full flex items-center justify-between focus:outline-none text-white"
                >
                  <span>Staff</span>
                  <FaCaretDown />
                </button>
                {showstaff && (
                  <ul className="ml-4 mt-2">
                    <li className="py-1 ">
                      <Link
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white"
                      >
                        Create Staff
                      </Link>
                      <li className="py-1 ">
                        <Link
                          to="/admin/dashboard/manageperformance"
                          className="flex items-center text-white"
                        >
                          Manage Staff
                        </Link>
                      </li>
                    </li>
                  </ul>
                )}
              </li>
              <li className="py-1 ">
                <button
                  onClick={() => setVender(!showvendor)}
                  className="w-full flex items-center justify-between focus:outline-none text-white"
                >
                  <span>Vendor</span>
                  <FaCaretDown />
                </button>
                {showvendor && (
                  <ul className="ml-4 mt-2">
                    <li className="py-1 ">
                      <Link
                        to="/admin/dashboard/manageperformance"
                        className="flex items-center text-white"
                      >
                        Create Vender
                      </Link>
                      <li className="py-1 ">
                        <Link
                          to="/admin/dashboard/manageperformance"
                          className="flex items-center text-white"
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
