import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CompanyRegistration from "./components/auth/CompanyRegistration";
import Login from "./components/auth/Login";
import Registraion from "./components/auth/Registraion";
import ForgotPassword from "./components/auth/ForgotPassword";
import Otpverification from "./components/auth/Otpverification";
import ResetPassword from "./components/auth/ResetPassword.js"
import AdminDashboard from "./components/pages/admin/AdminDashboard";
import { AdminProtectedRoute } from "./components/Routes/AdminProtectedRoute.js";
import AdminRoutes from "./components/Routes/AdminRoute.js";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route
            path="/CompanyRegistration"
            element={<CompanyRegistration />}
          />
          <Route path="/registration" element={<Registraion />} />
          <Route path="/forgetpassword" element={<ForgotPassword />} />
          <Route path="/otpverification" element={<Otpverification />} />
          <Route path="/resetPassword" element={<ResetPassword />} />



          {/* admin protected routes */}
          <Route path="/admin" element={<AdminProtectedRoute />}>
            <Route path="/admin/dashboard/*" element={<AdminRoutes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
