import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useAuth } from "../../../context/Auth";
import ViewPurchaseInvoices from "../modals/ViewPurchaseInvoices";
import EditPurchaseInvoice from "../modals/EditPurchaseInvoice";

const ManagePurchaseInvoice = () => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEstimate, setSelectedEstimate] = useState(null);
  const [salesEstimates, setSalesEstimates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customers, setCustomers] = useState([]);

  const [auth] = useAuth();
  const [userid, setUserId] = useState("");

  useEffect(() => {
    fetchEstimate();
  }, []);

  const fetchEstimate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "/api/v1/purchaseInvoiceRoute/getAllpurchaseinvoice"
      );
      console.log(response.data.invoices, "purchase invoice");
      setSalesEstimates(response.data.invoices);
    } catch (error) {
      setError("Error fetching sales order.");
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

  const handleDelete = async (estimateId) => {
    if (window.confirm("Are you sure you want to delete this Invoice?")) {
      setLoading(true);
      try {
        await axios.delete(
          `/api/v1/purchaseInvoiceRoute/deletepurchaseinvoice/${estimateId}`
        );
        fetchEstimate();
      } catch (error) {
        setError("Error deleting the Invoice.");
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchsupplier = async () => {
    try {
      const response = await axios.get(`/api/v1/auth/manageSupplier/${userid}`);
      setCustomers(response.data.data);
      console.log(response, "dskfkj");
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  useEffect(() => {
    if (auth?.user) {
      if (auth.user.role === 1) {
        setUserId(auth.user._id);
      } else if (auth.user.role === 0) {
        setUserId(auth.user.admin);
      }
    }
    fetchsupplier();
  }, [auth, userid]);

  const getSupplierName = (customerId) => {
    const customer = customers?.find((c) => c.id === customerId);
    return customer ? customer.name : "Unknown Customer";
  };

  const closeModal = () => {
    setEditModalOpen(false);
    setViewModalOpen(false);
  };

  const filteredEstimates = salesEstimates?.filter((estimate) => {
    const invoiceNo = estimate.invoiceNo || "";
    const supplierName = estimate.supplierName || "";
    return (
      invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplierName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="responsive-container p-4">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by order No, supplier Name"
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
                  "Invoice No",
                  "Supplier Invoice No",
                  "Supplier Name",
                  "Place of Supply",
                  "Payment Term",
                  "Due Date",
                  "GST Type",
                  "Product Code",
                  "UOM",
                  "MRP",
                  "QTY",
                  // "Rate",
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
                    <td className="border border-gray-300 p-2 text-center whitespace-nowrap">
                      {estimate.date}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.invoiceNo}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.supplierInvoiceNo}
                    </td>

                    <td className="border border-gray-300 p-2 text-center">
                      {getSupplierName(estimate.customerId)}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.placeOfSupply}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.paymentTerm}
                    </td>
                    <td className="border border-gray-300 p-2 text-center whitespace-nowrap">
                      {estimate.dueDate}
                    </td>

                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.gstType}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.rows?.[0]?.itemCode || "-"}
                    </td>

                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.rows?.[0]?.units || "-"}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.rows?.[0]?.maxmimunRetailPrice || "-"}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.rows?.[0]?.quantity || "-"}
                    </td>

                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.rows?.[0]?.totalValue || "-"}
                    </td>

                    <td className="border border-gray-300 p-2 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          className="text-blue-500 hover:underline focus:outline-none"
                          onClick={() => handleView(estimate)}
                        >
                          View
                        </button>
                        <button
                          className="text-yellow-500 hover:underline focus:outline-none "
                          onClick={() => handleEdit(estimate)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 hover:underline focus:outline-none"
                          onClick={() => handleDelete(estimate._id)}
                        >
                          Delete
                        </button>
                        <button className="text-green-500 hover:underline focus:outline-none">
                          Create Invoice
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="17"
                    className="text-center p-4 border border-gray-300"
                  >
                    No order found.
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
            width: "90%",
            height: "100%",
            maxWidth: "1400px",
            margin: "auto",
            padding: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
          },
        }}
      >
        <ViewPurchaseInvoices
          isOpen={viewModalOpen}
          closeModal={closeModal}
          estimate={selectedEstimate}
          getSupplierName={getSupplierName}
        />
      </Modal>

      {/* Edit Estimate Modal */}
      <Modal
        isOpen={editModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Estimate Modal"
        style={{
          content: {
            width: "90%",
            height: "100%",
            maxWidth: "1400px",
            margin: "auto",
            padding: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
          },
        }}
      >
        <EditPurchaseInvoice
          isOpen={editModalOpen}
          estimate={selectedEstimate}
          closeModal={closeModal}
          getSupplierName={getSupplierName}
        />
      </Modal>
    </div>
  );
};

export default ManagePurchaseInvoice;
