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

const initialFormData = {
  photo: null,
  businessName: "",
  printName: "",
  businessType: "",
  address: "",
  b_state: "",
  country: "",
  pinCode: "",
  contact: "",
  email: "",
  website: "",
  financialYear: "",
  bookFrom: "",
  tax_Rate: "",
  gstIn: "",
  e_way_bill: "",
  periodicalReturn: "",
  enable_gst: "",
  registration_Type: "",
  selectBank: "",
  accountName: "",
  accountNumber: "",
  irfcCode: "",
  upiId: "",
  enableBatch: "",
  enableExpire: "",
};

const CompanyRegistration = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "enable_gst" && value === "true") {
      setFormData((prevData) => ({
        ...prevData,
        s_state: "",
        tax_Rate: "",
        gstIn: "",
      }));
    }

    if (name === "registration_Type" && value === "false") {
      setFormData((prevData) => ({
        ...prevData,
        tax_Rate: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "businessName",
      "printName",
      "businessType",
      "address",
      "b_state",
      "country",
      "pinCode",
      "contact",
      "email",
      "website",
      "financialYear",
      "bookFrom",
      "e_way_bill",
      // "periodicalReturn",
      "selectBank",
      "accountName",
      "accountNumber",
      "irfcCode",
      "upiId",
      "enableBatch",
      "enableExpire",
    ];

    if (formData.enable_gst === "true") {
      requiredFields.push("tax_Rate", "gstIn");
    }

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill out the ${field} field.`);
        return;
      }
    }

    try {
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post(
        "/api/v1/company/register",
        formDataToSend
      );
      if (response) {
        toast.success("Business Created Successfully...");
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

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const photoInputRef = useRef(null);

  const handlePhotoChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      photo: file,
    }));
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-6 text-xs sm:text-md md:text-lg lg:text-lg font-semibold">
      {[
        "Business Information",
        "Accounting/Statutory Details",
        "Banking Details",
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
    <form className="max-w-3xl mx-auto p-8 border border-gray-300 shadow-lg rounded-lg bg-white">
      <h4 className="text-3xl font-semibold mb-4 text-center underline mb-6 text-violet-800">
        Set Up Business
      </h4>
      {renderStepIndicator()}
      {currentStep === 1 && (
        <div>
          <label className="block mb-2">
            Logo:
            <input
              type="file"
              name="photo"
              accept="image/*"
              ref={photoInputRef}
              onChange={handlePhotoChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            />
          </label>

          <label className="block mb-2">
            Business Name:
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            />
          </label>
          <label className="block mb-2">
            Print Name:
            <input
              type="text"
              name="printName"
              value={formData.printName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            />
          </label>
          <label className="block mb-2">
            Business Type:
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            >
              <option value="">Select</option>
              <option value="grocery">Grocery</option>
              <option value="manufacturing">Manufacturing</option>
            </select>
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
            State:
            <select
              name="b_state"
              value={formData.b_state}
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
          <label className="block mb-2">
            Financial Year:
            <input
              type="text"
              name="financialYear"
              value={formData.financialYear}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            />
          </label>
          <label className="block mb-2">
            Book From:
            <input
              type="date"
              name="bookFrom"
              value={formData.bookFrom}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            />
          </label>
          <div className="flex justify-end mt-4">
            <button
              onClick={nextStep}
              className="bg-blue-500 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-violet-600"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <label className="block mb-2">
            Enable Bill Wise Entry:
            <select
              name="e_way_bill"
              value={formData.e_way_bill}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>

          {/* new field */}

          <label className="block mb-2">
            Enable Batch:
            <select
              name="enableBatch"
              value={formData.enableBatch}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>

          <label className="block mb-2">
            Enable Expire Date:
            <select
              name="enableExpire"
              value={formData.enableExpire}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>

          {/* end */}

          <label className="block mb-2">
            Enable GST:
            <select
              name="enable_gst"
              value={formData.enable_gst}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
          {formData.enable_gst === "true" && (
            <>
              <label className="block mb-2">
                Registration Type:
                <select
                  name="registration_Type"
                  value={formData.registration_Type}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </label>
              {formData.registration_Type === "true" && (
                <>
                  <label className="block mb-2">
                    Tax Rate:
                    <input
                      type="text"
                      name="tax_Rate"
                      value={formData.tax_Rate}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                    />
                  </label>
                </>
              )}
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
                Return Type:
                <select
                  name="periodicalReturn"
                  value={formData.periodicalReturn}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                >
                  <option value="">Select</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </label>
            </>
          )}

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
        </div>
      )}

      {currentStep === 3 && (
        <div>
          <label className="block mb-2">
            Select Bank:
            <select
              name="selectBank"
              value={formData.selectBank}
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
            Account Name:
            <input
              type="text"
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            />
          </label>

          <label className="block mb-2">
            Account Number:
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            />
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
            UPI ID:
            <input
              type="text"
              name="upiId"
              value={formData.upiId}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
            />
          </label>

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
  );
};

export default CompanyRegistration;
