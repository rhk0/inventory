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
  name: "",
  contact: "",
  address: "",
  state: "",
  fatherName: "",
  motherName: "",
  email: "",
  empId: "",
  designation: "",
  department: "",
  adharCardNo: "",
  panNo: "",
  drivingLicence: "",
  bankName: "",
  accountNumber: "",
  ifscCode: "",
  accountHolderName: "",
  salaryAmount: "",
};

const CreateStaff = () => {
  const [formData, setFormData] = useState(initialFormData);
  // const [photo, setPhoto] = useState([]);
  const [panCard, setPanacard] = useState([]);
  const [adharCards, setAdharcard] = useState([]);
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
      "state",
      "fatherName",
      "motherName",
      "email",
      "empId",
      "designation",
      "department",
      "adharCardNo",
      "panNo",
      "drivingLicence",
      "bankName",
      "accountNumber",
      "ifscCode",
      "accountHolderName",
      "salaryAmount",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please Enter ${field} .`);
        return;
      }
    }

    try {
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }
   
      for (let i = 0; i < adharCards.length; i++) {
        formDataToSend.append("adharCards", adharCards[i]);
      }
      for (let i = 0; i < panCard.length; i++) {
        formDataToSend.append("panCard", panCard[i]);
      }

      console.log(formDataToSend, "formDataToSend");

      const response = await axios.post(
        "/api/v1/auth/createStaff",
        formDataToSend
      );
      console.log(response, "response");
      if (response) {
        toast.success("Staff Created Successfully...");
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
  const adInputRef = useRef(null);

  const handlePhotoChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      photo: file,
      panCard: file,
    }));
  };

  // const handleAdChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   setFormData((prevData) => ({ ...prevData, adharCards: files }));
  // };

  const renderStepIndicator = () => (
    <div className="flex justify-center px-0 mb-6 text-xs sm:text-md md:text-lg lg:text-lg font-semibold grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-4 gap-1">
      {[
        "Staff Details",
        "Documents Details",
        "Banking  Details",
        "Salary Details",
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
          Add Staff
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
                Father Name:
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                />
              </label>
              <label className="block mb-2">
                Mother Name:
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
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
                Emp Id :
                <input
                  type="text"
                  name="empId"
                  value={formData.empId}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                />
              </label>
              <label className="block mb-2">
                Designation :
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                />
              </label>
              <label className="block mb-2">
                Department :
                <input
                  type="text"
                  name="department"
                  value={formData.department}
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
                Aadhar Card No.:
                <input
                  type="text"
                  name="adharCardNo"
                  value={formData.adharCardNo}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                />
              </label>

              <label className="block mb-2">
                PAN Number:
                <input
                  type="text"
                  name="panNo"
                  value={formData.panNo}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                />
              </label>

              <label className="block mb-2">
                Driving License :
                <input
                  type="text"
                  name="drivingLicence"
                  value={formData.drivingLicence}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                />
              </label>
              <label className="block mb-2">
                Photo :
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
                Aadhar Card:
             
                <input
                  type="file"
                  name="adharCards"
                  accept="image/*"
                  className="w-full p-1 border rounded"
                  multiple
                  onChange={(e) => setAdharcard(Array.from(e.target.files))}
                  // ref={fileInputRef}
                />
              </label>

              <label className="block mb-2">
                Pan Card :
                <input
                  type="file"
                  name="panCard"
                  accept="image/*"
                  className="w-full p-1 border rounded"
                  multiple
                  onChange={(e) => setPanacard(Array.from(e.target.files))}
                  // ref={fileInputRef}
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
                IFSC Code:
                <input
                  type="text"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                />
              </label>

              <label className="block mb-2">
                Account No:
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                />
              </label>

              <label className="block mb-2">
                Account Holder:
                <input
                  type="text"
                  name="accountHolderName"
                  value={formData.accountHolderName}
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
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div>
                <label className="block mb-2">
                  Salary Amount
                  <input
                    type="text"
                    name="salaryAmount"
                    value={formData.salaryAmount}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-600"
                  />
                </label>
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

export default CreateStaff;
