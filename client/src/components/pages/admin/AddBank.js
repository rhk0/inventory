import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry",
  "Ladakh",
  "Jammu and Kashmir",
];

const indianBanks = [
  "State Bank of India",
  "Punjab National Bank",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Bank of Baroda",
  "Canara Bank",
  "IndusInd Bank",
  "Yes Bank",
  "Union Bank of India",
  "IDFC First Bank",
  "Punjab & Sind Bank",
  "UCO Bank",
  "Indian Bank",
  "Central Bank of India",
  "Indian Overseas Bank",
  "Bank of Maharashtra",
  "Federal Bank",
  "South Indian Bank",
  "RBL Bank",
  "Jammu & Kashmir Bank",
  "Karnataka Bank",
  "Dhanlaxmi Bank",
  "Karur Vysya Bank",
  "Lakshmi Vilas Bank",
];

const initialFormData = {
  name: "",
  contact: "",
  address: "",
  pinCode: "",
  state: "",
  country: "",
  email: "",
  website: "",
  registrationType: "",
  gstIn: "",
  panNo: "",
  bankName: "",
  ifscCode: "",
  accountNo: "",
  accountHolder: "",
  upiId: "",
  itemCategories: "",
  discountPercentage: "",
  discountAmount: "",
  openingBalance: "",
  drCr: "",
};

const AddBank = () => {
  const [formData, setFormData] = useState(initialFormData);

  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "name",
      "contact",
      "address",
      "pinCode",
      "state",
      "country",
      "email",
      "website",
      "registrationType",
      "gstIn",
      "panNo",
      "bankName",
      "ifscCode",
      "accountNo",
      "accountHolder",
      "upiId",
      "itemCategories",
      "discountPercentage",
      "discountAmount",
      "openingBalance",
      "drCr",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill out the ${field} field.`);
        return;
      }
    }

    try {
      const response = await axios.post("/api/v1/auth/AddBank", formData);

      if (response) {
        toast.success("Supplier Created Successfully...");
      }

      clearData();
    } catch (error) {
      console.error(
        "Error creating company:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        `There was an error creating the company: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  const clearData = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
  };

  return (
    <div className=" responsive-container  px-4 py-1 max-w-7xl">
      <form className=" mx-auto  p-8 border border-gray-300 shadow-lg rounded-lg bg-white">
        <h4 className="text-3xl font-semibold mb-4 text-center underline mb-6 text-violet-800">
          Add Suppliers
        </h4>

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div>
              <label className="block mb-2">
                Opening Balance
                <input
                  type="text"
                  name="openingBalance"
                  value={formData.openingBalance}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                />
              </label>
            </div>
            <div>
              <label className="block text-gray-700">Dr. / Cr.</label>
              <select
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                name="drCr"
                value={formData.drCr}
                onChange={handleChange}
              >
                <option value="">Select</option>

                <option value="Dr">Dr</option>
                <option value="Cr">Cr</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-violet-600"
            >
              Submit
            </button>
          </div>
        </div>

        <ToastContainer />
      </form>
    </div>
  );
};

export default AddBank;
