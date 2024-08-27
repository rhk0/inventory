// MONGO_URI = mongodb+srv://manasvitech01:manasvitech01@cluster0.msglga2.mongodb.net/account
// PORT = 5000
// DEV_MODE = development
// JWT_SECRET = dharmapkdkhackerzonecommit 
// EMAIL_USER = manasvistaff.dharma@gmail.com
// EMAIL_PASS = pbqu tgfp ojyu uzcv
import React from 'react';
     
const AddSupplierForm = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Add Suppliers</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>

            <label className="block text-gray-700">Name</label>yghhgt
            <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>
          <div>
            <label className="block text-gray-700">Contact</label>
            <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>
          <div>
            <label className="block text-gray-700">Address</label>
            <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>
          <div>
            <label className="block text-gray-700">Pin Code</label>
            <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>
          <div>
            <label className="block text-gray-700">State</label>
            <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
              <option value="">Select State</option>
              {/* Add state options here */}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Country</label>
            <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>
          <div>
            <label className="block text-gray-700">E-mail</label>
            <input type="email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>
          <div>
            <label className="block text-gray-700">Website</label>
            <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-gray-700">Registration Type</label>
            <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
              <option value="">Regular</option>
              <option value="">Composition</option>
              <option value="">Exempted</option>
              <option value="">Consumer</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">GSTIN</label>
            <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>
          <div>
            <label className="block text-gray-700">PAN No.</label>
            <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-gray-700">Bank Name</label>
            <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>
          <div>
            <label className="block text-gray-700">IFSC Code</label>
            <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>
          <div>
            <label className="block text-gray-700">Account No.</label>
            <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>
          <div>
            <label className="block text-gray-700">Account Holder</label>
            <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>
          <div>
            <label className="block text-gray-700">UPI ID</label>
            <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-gray-700">Item Categories</label>
            <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>
          <div>
            <label className="block text-gray-700">Discount %</label>
            <input type="number" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>
          <div>
            <label className="block text-gray-700">Discount Amount</label>
            <input type="number" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-gray-700">Opening Balance</label>
            <input type="number" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>
          <div>
            <label className="block text-gray-700">Dr. / Cr.</label>
            <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
              <option value="Dr">Dr</option>
              <option value="Cr">Cr</option>
            </select>
          </div>
        </div>

        <div className="text-center mt-6">
          <button type="submit" className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-600">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddSupplierForm;
