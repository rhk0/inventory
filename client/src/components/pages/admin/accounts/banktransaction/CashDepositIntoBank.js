import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

function CashDepositeIntoBank() {
  const [formData, setFormData] = useState({
    date: "",
    contraNo: "",
    fromAccount: "",
    toAmount:"",
    amount: "",
    toAccount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "date",
      "contraNo",
      "fromAccount",
      "amount",
      "toAccount",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill out the ${field} field.`);
        return;
      }
    }

    try {
      const response = await axios.post(
        "/api/v1/auth/CashDepositeIntoBank",
        formData
      );

      if (response) {
        toast.success("Cash deposit into bank created successfully.");
      }

      clearData();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const clearData = () => {
    setFormData({
      date: "",
      contraNo: "",
      toAmount:"",
      fromAccount: "",
      amount: "",
      toAccount: "",
    });
  };

  return (
    <Container maxWidth="lg" className="responsive-container" data-aos="fade-down">
      <Box p={4} bgcolor="white" borderRadius={2} boxShadow={2}>
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Cash Deposit Into Bank
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contra No"
                type="text"
                name="contraNo"
                value={formData.contraNo}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel sx={{  background:"white"}}>From Account</InputLabel>
                <Select
                  name="fromAccount"
                  value={formData.fromAccount}
                  onChange={handleChange}
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="Cash">Cash</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Amount"
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel sx={{  background:"white"}}>To Account</InputLabel>
                <Select
                  name="toAccount"
                  value={formData.toAccount}
                  onChange={handleChange}
                >
                  <MenuItem value="">Select Bank</MenuItem>
                  <MenuItem value="BankA">Bank A</MenuItem>
                  <MenuItem value="BankB">Bank B</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label=" To Amount"
                type="text"
                name="toAmount"
                value={formData.toAmount}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Box>
        </form>
        <ToastContainer />
      </Box>
    </Container>
  );
}

export default CashDepositeIntoBank;