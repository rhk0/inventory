import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageSupplier = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    // Function to fetch supplier data
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("https://api.example.com/suppliers"); 
        setSuppliers(response.data);
      } catch (error) {
        console.error("Error fetching supplier data", error);
      }
    };

    fetchSuppliers();
  }, []);

  return (
    <div className="container mx-auto p-4 responsive-container">
      <h1 className="text-center text-2xl font-bold text-purple-600 mb-4 underline">
        Manage Supplier
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                S.No
              </th>
              <th className="px-6 py-2 border-r text-left text-sm font-medium text-gray-600">
                Supplier Name
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
            {suppliers.length > 0 ? (
              suppliers.map((supplier, index) => (
                <tr key={supplier.id} className="border-b">
                  <td className="px-6 py-2 border-r text-sm">{index + 1}</td>
                  <td className="px-6 py-2 border-r text-sm">{supplier.name}</td>
                  <td className="px-6 py-2 border-r text-sm">{supplier.contactDetail}</td>
                  <td className="px-6 py-2 border-r text-sm">{supplier.address}</td>
                  <td className="px-6 py-2 border-r text-sm">{supplier.gstNumber}</td>
                  <td className="px-6 py-2 border-r text-sm">{supplier.openingBalance}</td>
                  <td className="px-6 py-2 border-r text-sm">
                    <button className="mr-2 text-blue-600">View</button> / 
                    <button className="mx-2 text-blue-600">Edit</button> / 
                    <button className="ml-2 text-blue-600">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-2 text-center text-sm">
                  No suppliers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSupplier;
