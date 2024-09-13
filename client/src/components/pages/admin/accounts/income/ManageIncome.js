import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageIncome = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [incomes, setincomes] = useState([]);
  const [selectedincome, setSelectedincome] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    incomeNo: "",
    incomeType: "",
    gstType: "",
    vendor: "",
    income: "",
    amount: 0,
    gstRate: 0,
    cgstAmount: 0,
    sgstAmount: 0,
    igstAmount: 0,
    total: 0,
    narration: "",
  });

  useEffect(() => {
    fetchincomes();
  }, []);

  const fetchincomes = async () => {
    try {
      const response = await axios.get("/api/v1/incomeRoute/manageallincome");
      console.log(response, "manage");
      setincomes(response.data.data);
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };

  const handleViewClick = (income) => {
    setSelectedincome(income);
    openViewModal();
  };

  const handleEditClick = (income) => {
    setSelectedincome(income);
    setFormData({
      ...income,
      date: formatToDateInputValue(income.date),
    });
    openEditModal();
  };

  const handleDeleteClick = async (_id) => {
    try {
      await axios.delete(`/api/v1/incomeRoute/delete/${_id}`);
      toast.success("income deleted successfully");

      setincomes(incomes.filter((income) => income._id !== _id));
    } catch (error) {
      console.error("Error deleting income:", error);
      toast.error("Error deleting income");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };

    // Recalculate GST and Total if necessary
    if (name === "amount" || name === "gstRate" || name === "gstType") {
      const { cgstAmount, sgstAmount, igstAmount, total } =
        calculateGSTAndTotal(
          updatedData.gstType,
          parseFloat(updatedData.amount),
          parseFloat(updatedData.gstRate)
        );
      updatedData.cgstAmount = cgstAmount;
      updatedData.sgstAmount = sgstAmount;
      updatedData.igstAmount = igstAmount;
      updatedData.total = total;
    }

    setFormData(updatedData);
  };

  // Simplified GST calculation function
  const calculateGSTAndTotal = (gstType, amount, gstRate) => {
    let cgstAmount = 0;
    let sgstAmount = 0;
    let igstAmount = 0;
    let total = amount;

    if (gstType === "cgst-sgst") {
      cgstAmount = (amount * gstRate) / 200;
      sgstAmount = (amount * gstRate) / 200;
      total = amount + cgstAmount + sgstAmount;
    } else if (gstType === "igst") {
      igstAmount = (amount * gstRate) / 100;
      total = amount + igstAmount;
    }

    return { cgstAmount, sgstAmount, igstAmount, total };
  };

  // Handler for GST Type change
  const handleGstTypeChange = (e) => {
    const gstType = e.target.value;
    setFormData({
      ...formData,
      gstType,
      cgstAmount: 0,
      sgstAmount: 0,
      igstAmount: 0,
      total: parseFloat(formData.amount),
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (selectedincome) {
        await axios.put(
          `/api/v1/incomeRoute/update/${selectedincome._id}`,
          formData
        );
      } else {
        await axios.post("/api/v1/incomeRoute/create", formData);
      }
      fetchincomes();
      closeEditModal();
    } catch (error) {
      console.error("Error saving income:", error);
    }
  };

  // Functions to open and close modals
  const openViewModal = () => setIsViewModalOpen(true);
  const closeViewModal = () => setIsViewModalOpen(false);

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  // Convert date to YYYY-MM-DD format
  const formatToDateInputValue = (dateStr) => {
    return format(parseISO(dateStr), "yyyy-MM-dd");
  };

  return (
    <div className="p-4 responsive-container">
      <h1 className="text-2xl font-bold mb-4 text-center">Manage Income</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="text-black">
            <tr>
              <th className="py-2 px-4 border border-gray-300">Date</th>
              <th className="py-2 px-4 border border-gray-300">Exp no.</th>
              <th className="py-2 px-4 border border-gray-300">income Type</th>
              <th className="py-2 px-4 border border-gray-300">Vendor Name</th>
              <th className="py-2 px-4 border border-gray-300">income</th>
              <th className="py-2 px-4 border border-gray-300">Total Amount</th>
              <th className="py-2 px-4 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {incomes.map((income) => (
              <tr key={income._id}>
                <td className="py-2 px-4 border border-gray-300">
                  {format(new Date(income.date), "dd/MM/yyyy")}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {income.incomeNo}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {income.incomeType}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {income.vendor}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {income.income}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {income.total}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleViewClick(income)}
                  >
                    <FaEye className="inline-block mr-1" />
                  </button>{" "}
                  <button
                    className="text-green-500 hover:underline mx-2"
                    onClick={() => handleEditClick(income)}
                  >
                    <FaEdit className="inline-block mr-1" /> {/* Edit Icon */}
                  </button>{" "}
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDeleteClick(income._id)}
                  >
                    <FaTrash className="inline-block mr-1" />{" "}
                    {/* Delete Icon */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onRequestClose={closeViewModal}
        contentLabel="View income Modal"
        style={{
          content: {
            width: "65%",
            height: "90%",
            margin: "auto",
            padding: "20px",
            borderRadius: "8px",
          },
        }}
      >
        {selectedincome && (
          <>
            <h1 className="text-center font-bold text-2xl underline">
              View income
            </h1>
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {/* All fields */}
              <div className="mb-4">
                <label className="block text-sm font-bold" htmlFor="date">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={
                    formData.date ||
                    format(new Date(selectedincome.date), "yyyy-MM-dd")
                  }
                  className="border border-gray-300 p-2 w-full"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold" htmlFor="incomeNo">
                  income No.
                </label>
                <input
                  type="text"
                  name="incomeNo"
                  value={selectedincome.incomeNo}
                  className="border border-gray-300 py-2 px-4 w-full"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold" htmlFor="incomeType">
                  income Type
                </label>
                <input
                  type="text"
                  name="incomeType"
                  value={selectedincome.incomeType}
                  className="border border-gray-300 py-2 px-4 w-full"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold" htmlFor="gstType">
                  GST Type
                </label>
                <input
                  type="text"
                  name="gstType"
                  value={selectedincome.gstType}
                  className="border border-gray-300 py-2 px-4 w-full"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold" htmlFor="vendor">
                  Vendor Name
                </label>
                <input
                  type="text"
                  name="vendor"
                  value={selectedincome.vendor}
                  className="border border-gray-300 py-2 px-4 w-full"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold" htmlFor="income">
                  income
                </label>
                <input
                  type="text"
                  name="income"
                  value={selectedincome.income}
                  className="border border-gray-300 py-2 px-4 w-full"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold" htmlFor="amount">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={selectedincome.amount}
                  className="border border-gray-300 py-2 px-4 w-full"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold" htmlFor="gstRate">
                  GST Rate
                </label>
                <input
                  type="number"
                  name="gstRate"
                  value={selectedincome.gstRate}
                  className="border border-gray-300 py-2 px-4 w-full"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold" htmlFor="cgstAmount">
                  CGST Amount
                </label>
                <input
                  type="number"
                  name="cgstAmount"
                  value={selectedincome.cgstAmount}
                  className="border border-gray-300 py-2 px-4 w-full"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold" htmlFor="sgstAmount">
                  SGST Amount
                </label>
                <input
                  type="number"
                  name="sgstAmount"
                  value={selectedincome.sgstAmount}
                  className="border border-gray-300 py-2 px-4 w-full"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold" htmlFor="igstAmount">
                  IGST Amount
                </label>
                <input
                  type="number"
                  name="igstAmount"
                  value={selectedincome.igstAmount}
                  className="border border-gray-300 py-2 px-4 w-full"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold" htmlFor="total">
                  Total Amount
                </label>
                <input
                  type="number"
                  name="total"
                  value={selectedincome.total}
                  className="border border-gray-300 py-2 px-4 w-full"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold" htmlFor="narration">
                  Narration
                </label>
                <textarea
                  name="narration"
                  value={selectedincome.narration}
                  className="border border-gray-300 p-2 w-full"
                  disabled
                ></textarea>
              </div>
            </form>
            <div className="flex justify-center mt-4">
              <button
                onClick={closeViewModal}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit income Modal"
        style={{
          content: {
            width: "65%",
            height: "90%",
            margin: "auto",
            padding: "20px",
            borderRadius: "8px",
          },
        }}
      >
        <>
          <h1 className="text-center font-bold text-2xl underline">
            Edit income
          </h1>

          <form onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">income No.</label>
                <input
                  type="text"
                  name="incomeNo"
                  value={formData.incomeNo}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">income Type</label>
                <select
                  name="incomeType"
                  value={formData.incomeType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select income Type</option>
                  <option value="GST">GST</option>
                  <option value="Non GST">Non GST</option>
                </select>
              </div>

              {formData.incomeType === "GST" && (
                <div>
                  <label className="block font-semibold mb-1">GST Type</label>
                  <select
                    name="gstType"
                    value={formData.gstType}
                    onChange={handleGstTypeChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  >
                    <option value="">Select GST Type</option>
                    <option value="cgst-sgst">CGST + SGST</option>
                    <option value="igst">IGST</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block font-semibold mb-1">
                  Select Vendor
                </label>
                <select
                  name="vendor"
                  value={formData.vendor}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select Vendor</option>
                  <option value="vendor1">Vendor 1</option>
                  <option value="vendor2">Vendor 2</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">income</label>
                <input
                  type="text"
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              {formData.incomeType === "GST" && (
                <>
                  <div>
                    <label className="block font-semibold mb-1">GST Rate</label>
                    <select
                      name="gstRate"
                      value={formData.gstRate}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="5">5%</option>
                      <option value="12">12%</option>
                      <option value="18">18%</option>
                    </select>
                  </div>

                  {formData.gstType === "cgst-sgst" && (
                    <>
                      <div>
                        <label className="block font-semibold mb-1">
                          CGST Amount
                        </label>
                        <input
                          type="number"
                          name="cgstAmount"
                          value={formData.cgstAmount}
                          className="w-full p-2 border border-gray-300 rounded"
                          readOnly
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1">
                          SGST Amount
                        </label>
                        <input
                          type="number"
                          name="sgstAmount"
                          value={formData.sgstAmount}
                          className="w-full p-2 border border-gray-300 rounded"
                          readOnly
                        />
                      </div>
                    </>
                  )}

                  {formData.gstType === "igst" && (
                    <div>
                      <label className="block font-semibold mb-1">
                        IGST Amount
                      </label>
                      <input
                        type="number"
                        name="igstAmount"
                        value={formData.igstAmount}
                        className="w-full p-2 border border-gray-300 rounded"
                        readOnly
                      />
                    </div>
                  )}
                </>
              )}

              <div>
                <label className="block font-semibold mb-1">Total</label>
                <input
                  type="number"
                  name="total"
                  value={formData.total}
                  className="w-full p-2 border border-gray-300 rounded"
                  readOnly
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Narration</label>
                <textarea
                  name="narration"
                  value={formData.narration}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="2"
                />
              </div>
            </div>
          </form>
          <div className="flex justify-center mt-4">
            <button
              onClick={closeEditModal}
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default ManageIncome;
