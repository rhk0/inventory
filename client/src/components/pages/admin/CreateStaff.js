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
    <div className=" responsive-container  px-4 py-1 ">
      <form className=" mx-auto  p-8 border border-gray-300 shadow-lg rounded-lg bg-white">
        <h4 className="text-3xl font-semibold mb-4 text-center underline mb-6 text-violet-800">
          Add Staff
        </h4>

        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <label className="block mb-2 font-bold">
              Passport Image 
              <input
                type="file"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300  font-bold rounded-md focus:ring-2 focus:ring-violet-600"
              />
            </label>
            <label className="block mb-2 font-bold">
              Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300  font-bold rounded-md focus:ring-2 focus:ring-violet-600"
              />
            </label>
            <label className="block mb-2 font-bold">
              Contact
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 font-bold rounded-md focus:ring-2 focus:ring-violet-600"
              />
            </label>

            <label className="block mb-2 font-bold">
              Address
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 font-bold rounded-md focus:ring-2 focus:ring-violet-600"
              />
            </label>
            <label className="block mb-2 font-bold">
              Pin code
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 font-bold rounded-md focus:ring-2 focus:ring-violet-600"
              />
            </label>
            <label className="block mb-2 font-bold">
              State
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 font-bold rounded-md focus:ring-2 focus:ring-violet-600"
              >
                <option value="">Select State</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </label>
            <label className="block mb-2 font-bold">
              Father Name
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 font-bold rounded-md focus:ring-2 focus:ring-violet-600"
              />
            </label>

            <label className="block mb-2 font-bold">
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 font-bold rounded-md focus:ring-2 focus:ring-violet-600"
              />
            </label>
            <label className="block mb-2 font-bold">
              password
              <input
                type="password"
                name="password"
                value={formData.empId}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 font-bold rounded-md focus:ring-2 focus:ring-violet-600"
              />
            </label>
          </div>
        </>

        <ToastContainer />
      </form>
    </div>
  );
};

export default CreateStaff;
