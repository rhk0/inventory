import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CompanyRegistration from "./components/auth/CompanyRegistration";
import Login from "./components/auth/Login";
import Registraion from "./components/auth/Registraion";
import ForgotPassword from "./components/auth/ForgotPassword";
import Otpverification from "./components/auth/Otpverification";
import AdminDashboard from "./components/pages/admin/AdminDashboard";
import ResetPassword from "./components/auth/ResetPassword";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route
            path="/CompanyRegistration"
            element={<CompanyRegistration />}
          />
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registraion />} />
          <Route path="/forgetpassword" element={<ForgotPassword />} />
          <Route path="/otpverification" element={<Otpverification />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
