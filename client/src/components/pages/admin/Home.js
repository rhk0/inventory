import React, { useState, useRef, useEffect } from "react";
import {
  FaChartBar,
  FaMoneyBill,
  FaUsers,
  FaShoppingCart,
  FaBuilding,
  FaMoneyCheckAlt,
  FaClipboardList,
  FaMoneyBillAlt,
  FaCubes,
  FaUserFriends,
  FaMoneyCheck,
  FaCashRegister,
  FaPiggyBank,
  FaDollarSign,
  FaCalculator,
} from "react-icons/fa";

const Home = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const closeFilter = () => {
    setIsFilterOpen(false);
  };

  const handleOptionClick = (event) => {
    // Preventing the event propagation to avoid closing the filter options
    event.stopPropagation();
  };

  const filterOptions = [
    "Today",
    "Last 7 days",
    "Last 15 days",
    "Last Month",
    "Last Quarter",
    "Last 6 Month",
    "Last Year",
  ];

  return (
    <main className="main-container">
      <div className=" p-2 bg-gray-100 ">
        <div className="text-3xl font-bold text-indigo-700 text-center">
          Dashboard
        </div>
        <div className="flex justify-start items-center mb-4 space-x-4">
          <div className="relative inline-block" ref={filterRef}>
            <button
              className="bg-blue-500 hover:bg-green-500 text-white py-2 px-4 rounded"
              onClick={toggleFilter}
            >
              Filter
            </button>
            {isFilterOpen && (
              <div className="absolute top-full left-0 mt-2  bg-white border border-gray-200 w-40 rounded shadow-lg">
                <ul>
                  {filterOptions.map((option, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-200 text-black cursor-pointer"
                      onClick={closeFilter}
                      onMouseDown={handleOptionClick}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <div className="flex  flex-col  hover:scale-95 items-center rounded-md ">
            <div className="bg-purple-400 h-24 text-2xl gap-16 w-full flex gap-16 items-center justify-center rounded-md">
              <span>10</span>
              <FaChartBar size={24} />
            </div>
            <div className="mt-2 text-center text-black text-xl h-10 w-full">
              Total Sales
            </div>
          </div>
          <div className="flex flex-col  hover:scale-95 items-center rounded-md">
            <div className="bg-purple-400 h-24 text-2xl gap-16 w-full  flex items-center justify-center rounded-md">
              <span>10</span>
              <FaMoneyBill size={24} />
            </div>
            <div className="mt-2 text-center text-black text-xl h-10 w-full">
              Total Invoices
            </div>
          </div>
          <div className="flex flex-col  hover:scale-95 items-center rounded-md">
            <div className="bg-purple-400 h-24 text-2xl gap-16 w-full flex items-center justify-center rounded-md">
              <span>10</span>
              <FaUsers size={24} />
            </div>
            <div className="mt-2 text-center text-black text-xl h-10 w-full">
              Trade Receivables
            </div>
          </div>
          <div className="flex flex-col  hover:scale-95 items-center rounded-md">
            <div className="bg-purple-400 h-24 text-2xl gap-16 w-full flex items-center justify-center rounded-md">
              <span>10</span>
              <FaShoppingCart size={24} />
            </div>
            <div className="mt-2 text-center text-black text-xl h-10 w-full">
              Qty Sold
            </div>
          </div>
          <div className="flex flex-col  hover:scale-95 items-center rounded-md">
            <div className="bg-purple-400 h-24 text-2xl gap-16 w-full flex items-center justify-center rounded-md">
              <span>10</span>
              <FaBuilding size={24} />
            </div>
            <div className="mt-2 text-center text-black text-xl h-10 w-full">
              Total Customers
            </div>
          </div>
          <div className="flex flex-col  hover:scale-95 items-center rounded-md">
            <div className="bg-green-400 h-24 text-2xl gap-16 w-full flex items-center justify-center rounded-md">
              <span>10</span>
              <FaMoneyCheckAlt size={24} />
            </div>
            <div className="mt-2 text-center text-black text-xl h-10 w-full">
              Total Purchase
            </div>
          </div>
          <div className="flex flex-col  hover:scale-95 items-center rounded-md">
            <div className="bg-green-400 h-24 text-2xl gap-16 w-full flex items-center justify-center rounded-md">
              <span>10</span>
              <FaClipboardList size={24} />
            </div>
            <div className="mt-2 text-center text-black text-xl h-10 w-full">
              Total Bills
            </div>
          </div>
          <div className="flex flex-col  hover:scale-95 items-center rounded-md">
            <div className="bg-green-400 h-24 text-2xl gap-16 w-full flex items-center justify-center rounded-md">
              <span>10</span>
              <FaMoneyBillAlt size={24} />
            </div>
            <div className="mt-2 text-center text-black text-xl h-10 w-full">
              Trade Payables
            </div>
          </div>
          <div className="flex flex-col  hover:scale-95 items-center rounded-md">
            <div className="bg-green-400 h-24 text-2xl gap-16 w-full flex items-center justify-center rounded-md">
              <span>10</span>
              <FaCubes size={24} />
            </div>
            <div className="mt-2 text-center text-black text-xl h-10 w-full">
              Qty Purchase
            </div>
          </div>
          <div className="flex flex-col  hover:scale-95 items-center rounded-md">
            <div className="bg-green-400 h-24 text-2xl gap-16 w-full flex items-center justify-center rounded-md">
              <span>10</span>
              <FaUserFriends size={24} />
            </div>
            <div className="mt-2 text-center text-black text-xl h-10 w-full">
              Total Supplier
            </div>
          </div>
          <div className="flex flex-col  hover:scale-95 items-center rounded-md">
            <div className="bg-pink-400 h-24 text-2xl gap-16 w-full flex items-center justify-center rounded-md">
              <span>10</span>
              <FaCashRegister size={24} />
            </div>
            <div className="mt-2 text-center text-black text-xl h-10 w-full">
              Cash
            </div>
          </div>
          <div className="flex flex-col  hover:scale-95 items-center rounded-md">
            <div className="bg-pink-400 h-24 text-2xl gap-16 w-full flex items-center justify-center rounded-md">
              <span>10</span>
              <FaPiggyBank size={24} />
            </div>
            <div className="mt-2 text-center text-black text-xl h-10 w-full">
              Bank
            </div>
          </div>
          <div className="flex flex-col  hover:scale-95 items-center rounded-md">
            <div className="bg-pink-400 h-24 text-2xl gap-16 w-full flex items-center justify-center rounded-md">
              <span>10</span>
              <FaMoneyCheck size={24} />
            </div>
            <div className="mt-2 text-center text-black text-xl h-10 w-full">
              Total Expense
            </div>
          </div>
          <div className="flex flex-col  hover:scale-95 items-center rounded-md">
            <div className="bg-pink-400 h-24 text-2xl gap-16 w-full flex items-center justify-center rounded-md">
              <span>10</span>
              <FaDollarSign size={24} />
            </div>
            <div className="mt-2 text-center text-black text-xl h-10 w-full">
              Closing Units
            </div>
          </div>
          <div className="flex flex-col  hover:scale-95 items-center rounded-md">
            <div className="bg-pink-400 h-24 text-2xl gap-16 w-full flex items-center justify-center rounded-md">
              <span>10</span>
              <FaCalculator size={24} />
            </div>
            <div className="mt-2 text-center text-black text-xl h-10 w-full">
              Closing Stock
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
