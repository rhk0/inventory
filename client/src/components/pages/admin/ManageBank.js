import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

 import BankViewModal from "./modals/BankViewModel.js";
 import BankEditModal from "./modals/BankEditModel.js";

const ManageBank = () => {
  const [Banks, setBanks] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [modalData, setModalData] = useState(null);

  const fetchBanks = async () => {
    try {
      const response = await axios.get("/api/v1/auth/manageBank");
      setBanks(response.data.data);


    } catch (error) {
      console.error("Error fetching Bank data", error);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  const deleteBank = async (_id) => {
    try {
      const response = await axios.delete(`/api/v1/auth/deleteBank/${_id}`);
      setBanks(Banks.filter((Bank) => Bank._id !== _id));

      if (response) {
        toast.success(" delete all data Successfully...");
      } else {
        toast.error("error while deleting...");
      }
    } catch (error) {
      console.log("Error deleting Bank data", error);
    }
  };

  const openViewModal = (Banks) => {
    setViewModal(true);
    setModalData(Banks);
  };

  const openEditModal = (Banks) => {
    setEditModal(true);
    setModalData(Banks);
  };

  const closeModal = () => {
    fetchBanks();
    setViewModal(false);
    setEditModal(false);
  };

  return (
    <div className="container mx-auto p-4 responsive-container">
      <h1 className="text-center text-2xl font-bold text-purple-600 mb-4 underline">
        Manage Bank
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                S.No
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Bank Name
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
               IFSC Code 
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Account No 
              </th>
          
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Opening Balance
              </th>
              <th className="px-6 py-2 text-left text-sm font-medium text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Banks.length > 0 ? (
              Banks.map((Bank, index) => (
                <tr key={Bank.id} className="border-b">
                  <td className="px-6 py-2 border-r text-sm">{index + 1}</td>
                  <td className="px-6 py-2 border-r text-sm">
                    {Bank.name}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {Bank.ifscCode}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {Bank.accountNumber}
                  </td>
                
                  <td className="px-6 py-2 border-r text-sm">
                    {Bank.openingBalance}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    <button
                      className="mx-1 text-blue-600"
                      onClick={() => openViewModal(Bank)}
                    >
                      View
                    </button>{" "}
                    /
                    <button
                      className="mx-1 text-blue-600"
                      onClick={() => openEditModal(Bank)}
                    >
                      Edit
                    </button>{" "}
                    /
                    <button
                      className="mx-1 text-blue-600"
                      onClick={() => deleteBank(Bank._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-2 text-center text-sm">
                  No Banks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Modal
          isOpen={viewModal}
          onRequestClose={closeModal}
          contentLabel="View Item Modal"
          style={{
            content: {
              width: "80%",
              height: "80%",
              maxWidth: "800px",
              margin: "auto",
              padding: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
            },
          }}
        >
          <BankViewModal closeModal={closeModal} BankData={modalData} />
        </Modal>

        <Modal
          isOpen={editModal}
          onRequestClose={closeModal}
          contentLabel="View Item Modal"
          style={{
            content: {
              width: "80%",
              height: "80%",
              maxWidth: "800px",
              margin: "auto",
              padding: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
            },
          }}
        >
          <BankEditModal closeModal={closeModal} BankData={modalData} />
        </Modal>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManageBank;
