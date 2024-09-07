import React from "react";
import { MdRateReview } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const ManagePayIn = () => {
  return (
    <div
      style={{ padding: "0px", backgroundColor: "#41B3A2" }}
      className="responsive-container"
    >
      <h1 className="text-center text-2xl bg-gray-500 mt-3 mb-10">
        Manage Pay In
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-white">
          <thead>
            <tr className="bg-green-600">
              <th className="px-1 py-2 border text-black">#</th>
              <th className="px-4 py-2 border text-black">Date</th>
              <th className="px-4 py-2 border text-black text-nowrap">
                Receipt No.
              </th>
              <th className="px-4 py-2 border text-black text-nowrap">
                Customer Name
              </th>
              <th className="px-4 py-2 border text-black text-nowrap">
                Receipt Mode
              </th>
              <th className="px-4 py-2 border text-black text-nowrap">
                Transaction No.
              </th>
              <th className="px-4 py-2 border text-black text-nowrap">
                Bill No.
              </th>
              <th className="px-4 py-2 border text-black text-nowrap">
                Bill Amount
              </th>
              <th className="px-4 py-2 border text-black text-nowrap">
                Received Amount
              </th>
              <th className="px-4 py-2 border text-black text-nowrap">
                Balance Amount
              </th>
              <th className=" py-2 border text-black">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-1 py-2 border">1</td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className=" py-2 border flex">
                <button className="mx-1 text-white bg-green-500 rounded p-2">
                  <MdRateReview className="text-xl" />
                </button>
                <button className="mx-1 text-white bg-blue-500 pl-3 pr-3 p-1 rounded">
                  <FiEdit className="text-xl" />
                </button>
                <button className="mx-1 text-white bg-red-500 pl-3 pr-3 p-1 rounded">
                  <MdDelete className="text-xl" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePayIn;
