import React, { useState, useEffect } from 'react'
import ViewEstimateModal from '../modals/ViewEstimateModal'
import EditEstimateModal from '../modals/EditEstimateModal'
import Modal from 'react-modal'
import axios from 'axios'
import { useAuth } from '../../../context/Auth'
import { FiEdit } from 'react-icons/fi'
import { FaFileInvoice } from 'react-icons/fa'
import { MdRateReview, MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'
const ManageSalesEstimate = () => {
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedEstimate, setSelectedEstimate] = useState(null)
  const [salesEstimates, setSalesEstimates] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [customers, setCustomers] = useState([])
  const [auth] = useAuth()
  const [userId, setUserId] = useState('')

  useEffect(() => {
    if (auth.user.role === 1) {
      setUserId(auth.user._id)
    }
    if (auth.user.role === 0) {
      setUserId(auth.user.admin)
    }
    fetchEstimate()
    fetchCustomers()
  }, [auth, userId])

  const fetchEstimate = async () => {
    try {
      const response = await axios.get(
        `/api/v1/salesEstimateRoute/getAllSalesEstimatet/${userId}`,
      )
      setSalesEstimates(response.data.salesEstimates)
    } catch (error) {
      setError('Error fetching sales estimates.')
    } finally {
      setLoading(false)
    }
  }

  const handleView = (estimate) => {
    setSelectedEstimate(estimate)
    setViewModalOpen(true)
  }

  const handleEdit = (estimate) => {
    setSelectedEstimate(estimate)
    setEditModalOpen(true)
  }

  const handleDelete = async (estimateId) => {
    if (window.confirm('Are you sure you want to delete this estimate?')) {
      setLoading(true)
      try {
        await axios.delete(
          `/api/v1/salesEstimateRoute/deleteSalesEstimatetByID/${estimateId}`,
        )
        fetchEstimate()
      } catch (error) {
        setError('Error deleting the sales estimate.')
      } finally {
        setLoading(false)
      }
    }
  }

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`/api/v1/auth/manageCustomer/${userId}`)

      setCustomers(response.data.data)
    } catch (error) {
      console.error('Error fetching customers', error)
    }
  }

  const getCustomerName = (customerId) => {
    const customer = customers?.find((c) => c.id === customerId)
    return customer ? customer.name : 'Unknown Customer'
  }

  const closeModal = () => {
    setEditModalOpen(false)
    setViewModalOpen(false)
    fetchEstimate()
  }

  // Filter sales estimates based on search term
  const filteredEstimates = salesEstimates?.filter(
    (estimate) =>
      estimate.estimateNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.customerName?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="responsive-container p-4">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Estimate number or Customer Name"
          className="w-1/2 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                  'No.',
                  'Date',
                  'Estimate No.',
                  'Sales Type',
                  'Customer Name',
                  'Place of Supply',
                  'GST Type',
                  'Product Code',
                  'UOM',
                  'MRP',
                  'QTY',
                  // "Rate",
                  'Total Value',
                  'Action',
                ]?.map((header) => (
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
              {filteredEstimates?.length > 0 ? (
                filteredEstimates?.map((estimate, index) => (
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
                      {estimate.estimateNo}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.salesType}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate?.customerName ||
                        estimate?.cash ||
                        ` ${estimate.selectedBank[0]?.name} `}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.placeOfSupply || 'N/A'}
                    </td>

                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.gstType}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.rows?.[0]?.itemCode || '-'}
                    </td>

                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.rows?.[0]?.units || '-'}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.rows?.[0]?.mrp || '-'}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.rows?.[0]?.qty || '-'}
                    </td>

                    <td className="border border-gray-300 p-2 text-center">
                      {estimate.rows?.[0]?.totalValue || '-'}
                    </td>

                    <td className="border border-gray-300 p-2 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          className="text-blue-500 hover:underline focus:outline-none"
                          onClick={() => handleView(estimate)}
                        >
                          <MdRateReview className="text-xl" />
                        </button>
                        <button
                          className="text-yellow-500 hover:underline focus:outline-none "
                          onClick={() => handleEdit(estimate)}
                        >
                          <FiEdit className="text-xl" />
                        </button>
                        <button
                          className="text-red-500 hover:underline focus:outline-none"
                          onClick={() => handleDelete(estimate._id)}
                        >
                          <MdDelete className="text-xl" />
                        </button>
                        <Link
                          to={`/admin/EstimateSalesInvoice/${estimate._id}`} // Pass the ID in the URL
                          className="text-green-500 hover:underline focus:outline-none"
                        >
                          <FaFileInvoice className="text-xl" />
                        </Link>
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
            width: '90%',
            height: '100%',
            maxWidth: '1400px',
            margin: 'auto',
            padding: '5px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '5px',
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
            width: '90%',
            height: '100%',
            maxWidth: '1400px',
            margin: 'auto',
            padding: '5px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '5px',
          },
        }}
      >
        <EditEstimateModal
          isOpen={editModalOpen}
          estimate={selectedEstimate}
          closeModal={closeModal}
          getCustomerName={getCustomerName}
        />
      </Modal>
    </div>
  )
}

export default ManageSalesEstimate
