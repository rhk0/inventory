import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuotationViewModal from "./modals/QuotationViewModel.js";
import QuotationEditModal from "./modals/QuotationEditModel.js";
import Modal from "react-modal"; // Importing Modal from react-modal
const ManageQuotation = () => {
  const [Quotation, setQuotation] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const navigate = useNavigate();

  const fetchQuotation = async () => {
    try {
      const response = await axios.get(
        "/api/v1/salesQuationRoute/getAllSalesQuotation"
      );

      // date formatting
      const formattedData = response.data.response.map((quotation) => ({
        ...quotation,
        date: new Date(quotation.date).toLocaleDateString(),
        dueDate: new Date(quotation.dueDate).toLocaleDateString(),
      }));

      setQuotation(formattedData);
    } catch (error) {
      console.error("Error fetching Quotation data", error);
    }
  };

  useEffect(() => {
    fetchQuotation();
  }, []);

  const deleteQuotation = async (_id) => {
    try {
      const response = await axios.delete(
        `/api/v1/salesQuationRoute/deleteSalesQuotation/${_id}`
      );
      setQuotation(Quotation.filter((Quotation) => Quotation._id !== _id));

      if (response) {
        toast.success("Deleted all data successfully...");
      } else {
        toast.error("Error while deleting...");
      }
    } catch (error) {
      console.log("Error deleting Quotation data", error);
    }
  };

  const openViewModal = (Quotation) => {
    setViewModal(true);
    setModalData(Quotation);
  };

  const openEditModal = (Quotation) => {
    setEditModal(true);
    setModalData(Quotation);
  };

  const navigateToInvoice = (Quotation) => {
    navigate("/admin/invoice", { state: { quotation: Quotation } });
  };
  const navigateToDeliveryChallan = (Quotation) => {
    navigate("/admin/deliverychallan", { state: { quotation: Quotation } });
  };

  const closeModal = () => {
    fetchQuotation();
    setViewModal(false);
    setEditModal(false);
  };

  return (
    <div className="container mx-auto p-4 responsive-container">
      <h1 className="text-center text-2xl font-bold text-purple-600 mb-4 underline">
        View Quotation
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                S.No
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Date
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Quotation No
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Customer Name
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Place of Supply
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Due Date
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Tax Type
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Shipping Address
              </th>
              <th className="px-6 py-2 text-left text-sm font-medium text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Quotation.length > 0 ? (
              Quotation.map((quotation, index) => (
                <tr key={quotation._id} className="border-b">
                  <td className="px-6 py-2 border-r text-sm">{index + 1}</td>
                  <td className="px-6 py-2 border-r text-sm">
                    {quotation.date}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {quotation.quotationNo}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {quotation.customerName}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {quotation.placeOfSupply}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {quotation.dueDate}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {quotation.taxType}
                  </td>
                  <td className="px-6 py-2 border-r text-sm">
                    {quotation.shippingAddress}
                  </td>
                  <td className="px-6 py-2 text-sm ">
                    <button
                      className="mx-1 text-white bg-blue-700 p-1 rounded-sm"
                      onClick={() => openViewModal(quotation)}
                    >
                      View
                    </button>
                    
                    <button
                      className="mx-1  text-black bg-yellow-400 p-1"
                      onClick={() => openEditModal(quotation)}
                    >
                      Edit
                    </button>
                    
                    <button
                      className="mx-1 text-white bg-red-600 p-1 rounded-sm"
                      onClick={() => deleteQuotation(quotation._id)}
                    >
                      Delete
                    </button>
                    
                    <button
                      className="mx-1 gap-1 mt-1 mb-1 text-white bg-green-600 p-1 rounded-sm"
                      onClick={() => navigateToInvoice(quotation)} // Navigate to Invoice
                    >
                      Create Invoice
                    </button>
                    
                    <button className="mx-1 text-white bg-purple-600 p-1 rounded-sm"
                     onClick={() => navigateToDeliveryChallan(quotation)} // Navigate to Invoice
                    >
                      Create Delivery Challan
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-6 py-2 text-center text-sm">
                  No quotations found.
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
              height: "100%",
              margin: "auto",
              padding: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
            },
          }}
        >
          <QuotationViewModal
            closeModal={closeModal}
            QuotationData={modalData}
          />
        </Modal>

        <Modal
          isOpen={editModal}
          onRequestClose={closeModal}
          contentLabel="Edit Item Modal"
          style={{
            content: {
              width: "80%",
              height: "60%",
              maxWidth: "800px",
              margin: "auto",
              padding: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
            },
          }}
        >
          <QuotationEditModal
            closeModal={closeModal}
            QuotationData={modalData}
          />
        </Modal>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManageQuotation;
