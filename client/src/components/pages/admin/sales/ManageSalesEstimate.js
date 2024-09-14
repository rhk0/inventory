import React, { useState, useEffect } from "react";
import ViewEstimateModal from "../modals/ViewEstimateModal";
import EditEstimateModal from "../modals/EditEstimateModal";
import Modal from "react-modal";
import axios from "axios";

const ManageSalesEstimate = () => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEstimate, setSelectedEstimate] = useState(null);
  const [salesEstimates, setSalesEstimates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEstimate();
  }, []);

  const fetchEstimate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "/api/v1/salesEstimateRoute/getAllSalesEstimatet"
      );
      console.log(response, "kdlsjf");
      setSalesEstimates(response.data.salesEstimates);
    } catch (error) {
      setError("Error fetching sales estimates.");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (estimate) => {
    setSelectedEstimate(estimate);
    setViewModalOpen(true);
  };

  const handleEdit = (estimate) => {
    setSelectedEstimate(estimate);
    setEditModalOpen(true);
  };

  const closeModal = () => {
    setEditModalOpen(false);
    setViewModalOpen(false);
  };

  // Filter sales estimates based on search term
  const filteredEstimates = salesEstimates.filter(
    (estimate) =>
      estimate.estimateNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="responsive-container p-4">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Estimate number, Customer Name"
          className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center text-blue-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <table className="min-w-full border-collapse border border-gray-300 bg-gray-100 text-black rounded-lg shadow-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                {[
                  "No.",
                  "Date",
                  "Estimate No.",
                  "Sales Type",
                  "Customer Name",
                  "Place of Supply",
                  "Payment Term",
                  "Due Date",
                  "GST Type",
                  "Product Code",
                  "Product Name",
                  "UOM",
                  "MRP",
                  "QTY",
                  "Rate",
                  "Total Value",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="border border-gray-300 p-2 text-center"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredEstimates.length > 0 ? (
                filteredEstimates.map((estimate, index) => (
                  <tr
                    key={estimate._id}
                    className="hover:bg-gray-200 transition-all"
                  >
                    <td className="border border-gray-300 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.date}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.estimateNo}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.salesType}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.customerName}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.placeOfSupply}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.paymentTerm}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.dueDate}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.gstType}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.rows?.[0]?.itemCode || "-"}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.rows?.[0]?.productName || "-"}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.rows?.[0]?.units || "-"}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.rows?.[0]?.mrp || "-"}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.rows?.[0]?.qty || "-"}
                    </td>

                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.rows?.[0]?.rate || "-"}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.rows?.[0]?.totalValue || "-"}
                    </td>
                    <td className="border border-gray-300 p-2 text-center flex justify-center space-x-2">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => handleView(estimate)}
                      >
                        View
                      </button>
                      <button
                        className="text-yellow-500 hover:underline"
                        onClick={() => handleEdit(estimate)}
                      >
                        Edit
                      </button>
                      <button className="text-red-500 hover:underline">
                        Delete
                      </button>
                      <button className="text-green-500 hover:underline">
                        Create Invoice
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="17" className="text-center p-4">
                    No sales estimates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* View Estimate Modal */}
      <Modal
        isOpen={viewModalOpen}
        onRequestClose={closeModal}
        contentLabel="View Estimate Modal"
        style={{
          content: {
            width: "100%",
            height: "100%",
            maxWidth: "1200px",
            margin: "auto",
            padding: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
          },
        }}
      >
        <ViewEstimateModal
          isOpen={viewModalOpen}
          closeModal={closeModal}
          estimate={selectedEstimate}
        />
      </Modal>

      {/* Edit Estimate Modal */}
      <Modal
        isOpen={editModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Estimate Modal"
        style={{
          content: {
            width: "100%",
            height: "100%",
            maxWidth: "1200px",
            margin: "auto",
            padding: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
          },
        }}
      >
        <EditEstimateModal isOpen={editModalOpen} estimate={selectedEstimate} />
      </Modal>
    </div>
  );
};

export default ManageSalesEstimate;
