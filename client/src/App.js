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

          {/* admin protected routes */}
          <Route path="/admin" element={<AdminProtectedRoute />}>
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
