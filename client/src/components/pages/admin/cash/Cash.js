import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
} from "@mui/material";

const initialFormData = {
  name: "",
  openingBalance: "",
};

const Cash = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [cashData, setCashData] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  useEffect(() => {
    fetchCash();
  }, []);

  const fetchCash = async () => {
    try {
      const response = await axios.get("/api/v1/auth/manageCash");
      setCashData(response.data.data);
    } catch (error) {
      console.error("Error fetching cash data", error);
      toast.error("Error fetching cash data");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["name", "openingBalance"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill out the ${field} field.`);
        return;
      }
    }

    try {
      const response = await axios.post("/api/v1/auth/createCash", formData);
      if (response) {
        toast.success("Cash created successfully");
        fetchCash();
        clearData();
      }
    } catch (error) {
      console.error("Error creating cash entry:", error);
      toast.error("Error creating cash entry");
    }
  };

  const clearData = () => {
    setFormData(initialFormData);
    setIsCreateModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/auth/deleteCash/${id}`);
      toast.success("Cash entry deleted successfully");
      fetchCash();
    } catch (error) {
      console.error("Error deleting cash entry:", error);
      toast.error("Error deleting cash entry");
    }
  };

  const openViewModal = (cash) => {
    setModalData(cash);
    setIsViewModalOpen(true);
  };

  const openEditModal = (cash) => {
    setModalData(cash);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    fetchCash();
  };

  const handleModalChange = (e) => {
    setModalData({ ...modalData, [e.target.name]: e.target.value });
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/v1/auth/updateCash/${modalData._id}`, modalData);
      toast.success("Cash entry updated successfully");
      setIsEditModalOpen(false);
      fetchCash();
    } catch (error) {
      console.error("Error updating cash entry:", error);
      toast.error("Error updating cash entry");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="container mx-auto p-4 responsive-container uppercase">
      <h1 className="text-center text-2xl font-bold text-purple-600 mb-4 underline">
        Manage Cash
      </h1>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => setIsCreateModalOpen(true)}
      >
        Add Cash
      </Button>

      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>S.No</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>Opening Balance</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "start", fontSize: "1.2rem" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cashData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((cash, index) => (
                <TableRow key={cash._id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{cash.name}</TableCell>
                  <TableCell>{cash.openingBalance}</TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => openViewModal(cash)}>View</Button>
                    <Button color="secondary" onClick={() => openEditModal(cash)}>Edit</Button>
                    <Button color="error" onClick={() => handleDelete(cash._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={cashData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[7, 14, 21]}
      />

      <ToastContainer />

      <Dialog open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <DialogTitle>Add Cash</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Opening Balance"
            name="openingBalance"
            value={formData.openingBalance}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreateModalOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {isViewModalOpen && (
        <Dialog open={isViewModalOpen} onClose={closeModal}>
          <DialogTitle>View Cash Entry</DialogTitle>
          <DialogContent>
            <Typography variant="body1"><strong>Name:</strong> {modalData?.name}</Typography>
            <Typography variant="body1"><strong>Opening Balance:</strong> {modalData?.openingBalance}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal} color="secondary">Close</Button>
          </DialogActions>
        </Dialog>
      )}

      {isEditModalOpen && (
        <Dialog open={isEditModalOpen} onClose={closeModal}>
          <DialogTitle>Edit Cash Entry</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              name="name"
              value={modalData?.name}
              onChange={handleModalChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Opening Balance"
              name="openingBalance"
              value={modalData?.openingBalance}
              onChange={handleModalChange}
              fullWidth
              margin="dense"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal} color="secondary">Cancel</Button>
            <Button onClick={handleModalSubmit} color="primary">Save</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Cash;