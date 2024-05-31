import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TranspoterViewModal from "./modals/TransporterViewModel.js";
import TranspoterEditModal from "./modals/TransporterEditModel.js";

const ManageTranspoter = () => {
  const [Transpoters, setTranspoters] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [editModal, setEditModal] = useState(false);
  
  useEffect(() => {
    const fetchTranspoters = async () => {
      try {
        const response = await axios.get("/api/v1/auth/manageTransport");
        setTranspoters(response.data.data);

        if (response.data.data) {
          toast.success(" Get Transpoter data Successfully...");

        }
      } catch (error) {
        console.error("Error fetching Transpoter data", error);
      }
    };

    fetchTranspoters();
  }, []);

  const fetchTranspoters = async () => {
    try {
      const response = await axios.get("/api/v1/auth/manageTransport");
      setTranspoters(response.data.data);

      if (response.data.data) {
        toast.success(" Get Transpoter data Successfully...");

      }
    } catch (error) {
      console.error("Error fetching Transpoter data", error);
    }
  };


  const deleteTranspoter = async (_id) => {
    try {
      const response = await axios.delete(`/api/v1/auth/deleteTranspoter/${_id}`);
      console.log(response);
      setTranspoters(Transpoters.filter((Transpoter) => Transpoter._id !== _id));
    } catch (error) {
      console.log("Error deleting Transpoter data", error);
    }
  };

  const openViewModal = (Transpoters) => {
    setViewModal(true);
  
    setModalData(Transpoters);
  };
 
  const openEditModal = (suppliers) => {
    setEditModal(true);
    setModalData(suppliers);
  };

  const closeModal = () => {
    fetchTranspoters();
    setViewModal(false);
    setEditModal(false);
  };

  return (
    <div className="container mx-auto p-4 responsive-container">
      <h1 className="text-center text-2xl font-bold text-purple-600 mb-4 underline">
        Manage Transpoter
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                S.No
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Transpoter Name
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Contact Detail
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Address
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                GST Number
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
            {Transpoters.length > 0 ? (
              Transpoters.map((Transpoter, index) => (
                <tr key={Transpoter.id} className="border-b">
                  <td className="px-6 py-2 border-r text-sm">{index + 1}</td>
                  <td className="px-6 py-2 border-r text-sm">
                    {Transpoter.name}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {Transpoter.contact}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {Transpoter.address}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {Transpoter.gstIn}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {Transpoter.openingBalance}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    <button
                      className="mx-1 text-blue-600"
                      onClick={() => openViewModal(Transpoter)}
                    >
                      View
                    </button>{" "}
                    <button className="mx-1 text-blue-600"  onClick={() => openEditModal(Transpoter)}>Edit</button> /
                    <button
                      className="mx-1 text-blue-600"
                      onClick={() => deleteTranspoter(Transpoter._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-2 text-center text-sm">
                  No Transpoters found.
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
          <TranspoterViewModal closeModal={closeModal} TranspoterData={modalData} />
         
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
          <TranspoterEditModal closeModal={closeModal} TranspoterData={modalData} />
        </Modal>
      </div>
      <ToastContainer />

    </div>
  );
};

export default ManageTranspoter;
