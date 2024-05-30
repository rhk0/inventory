import React, { useState, useRef } from "react";
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

const CompanyRegistration = () => {
  const [formData, setFormData] = useState({
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
  });

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
      // "bankName": "",
      // "ifscCode": "",
      // "accountNo": "",
      // "accountHolder": "",
      // "upiId": "",
      // "itemCategories": "",
      // "discountPercentage": "",
      // "discountAmount": "",
      // "openingBalance": "",
      // "drCr": ""
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill out the ${field} field.`);
        return;
      }
    }

    try {
      const response = await axios.post(
        "/api/v1/auth/CreateSupplier",
        formData
      );

      if (response) {
        toast.success("supplier Created Successfully...");
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
    setFormData(formData);
    setCurrentStep(1);
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center px-0 mb-6 text-xs sm:text-md md:text-lg lg:text-lg font-semibold grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-4 gap-1">
      {[
        "Supplier Details",
        "Statutory Details",
        "Banking  Details",
        "Discounting",
        "Opening Balance",
      ].map((step, index) => (
        <div
          key={index}
          className={`flex items-center px-4 py-2 ${
            currentStep === index + 1
              ? "bg-violet-600 text-white underline underline-offset-8"
              : "bg-gray-300"
          } rounded-md mx-2 cursor-pointer transition duration-300`}
          onClick={() => setCurrentStep(index + 1)}
        >
          {step}
        </div>
      ))}
    </div>
  );

  return (
    <div className=" responsive-container  px-4 py-1 max-w-7xl">
      <form className=" mx-auto  p-8 border border-gray-300 shadow-lg rounded-lg bg-white">
        <h4 className="text-3xl font-semibold mb-4 text-center underline mb-6 text-violet-800">
          Add Suppliers
        </h4>
        {renderStepIndicator()}
        {currentStep === 1 && (
          <>
            {" "}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <label className="block mb-2">
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                />
              </label>
              <label className="block mb-2">
                Contact:
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                />
              </label>

              <label className="block mb-2">
                Address:
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                />
              </label>
              <label className="block mb-2">
                Pin Code:
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                />
              </label>
              <label className="block mb-2">
                State:
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                >
                  <option value="">Select State</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block mb-2">
                Country:
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                />
              </label>

              <label className="block mb-2">
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                />
              </label>
              <label className="block mb-2">
                Website:
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                />
              </label>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={nextStep}
                className="bg-blue-500 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-violet-600"
              >
                Next
              </button>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <label className="block mb-2">
                Registration Type:
                <select
                  name="registrationType"
                  value={formData.registrationType}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                >
                  <option value="">Select</option>
                  <option value="true">Regular</option>
                  <option value="false">Composition</option>
                  <option value="false">Unregistered</option>
                  <option value="false">Consumer</option>
                </select>
              </label>

              <label className="block mb-2">
                GSTIN:
                <input
                  type="text"
                  name="gstIn"
                  value={formData.gstIn}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                />
              </label>

              <label className="block mb-2">
                PAN No:
                <input
                  type="text"
                  name="panNo"
                  value={formData.panNo}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                />
              </label>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={prevStep}
                className="bg-gray-500 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-violet-600"
              >
                Previous
              </button>

              <button
                onClick={nextStep}
                className="bg-blue-500 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-violet-600"
              >
                Next
              </button>
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <label className="block mb-2">
                Bank Name:
                <select
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                >
                  <option value="">Select</option>
                  {indianBanks.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block mb-2">
                IRFC Code:
                <input
                  type="text"
                  name="irfcCode"
                  value={formData.irfcCode}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                />
              </label>

              <label className="block mb-2">
                Account No:
                <input
                  type="text"
                  name="accountNo"
                  value={formData.accountNo}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                />
              </label>

              <label className="block mb-2">
                Account Holder:
                <input
                  type="text"
                  name="accountHolder"
                  value={formData.accountHolder}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                />
              </label>

              <label className="block mb-2">
                UPI ID:
                <input
                  type="text"
                  name="upiId"
                  value={formData.upiId}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                />
              </label>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={prevStep}
                className="bg-gray-500 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-violet-600"
              >
                Previous
              </button>

              <button
                onClick={nextStep}
                className="bg-blue-500 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-violet-600"
              >
                Next
              </button>
            </div>
          </>
        )}

        {currentStep === 4 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <label className="block mb-2">
              Item Categories
              <input
                type="text"
                name="itemCategories"
                value={formData.itemCategories}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
              />
            </label>

            <label className="block mb-2">
              Discount %
              <input
                type="text"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
              />
            </label>

            <label className="block mb-2">
              Discount Amount
              <input
                type="text"
                name="discountAmount"
                value={formData.discountAmount}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
              />
            </label>

 
          </div>
          <div className="flex justify-between mt-4">
              <button
                onClick={prevStep}
                className="bg-gray-500 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-violet-600"
              >
                Previous
              </button>

              <button
                onClick={nextStep}
                className="bg-blue-500 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-violet-600"
              >
                Next
              </button>
            </div>
          </>
        )}

        {currentStep === 5 && (
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
                  <option value="Dr">Dr</option>
                  <option value="Cr">Cr</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={prevStep}
                className="bg-gray-500 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-violet-600"
              >
                Previous
              </button>

              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-violet-600"
              >
                Submit
              </button>
            </div>
          </div>
        )}
        <ToastContainer />
      </form>
    </div>
  );
};

export default CompanyRegistration;
