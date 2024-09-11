
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CompanyRegistration from "./components/auth/CompanyRegistration";
import Login from "./components/auth/Login";
import Registraion from "./components/auth/Registraion";
import ForgotPassword from "./components/auth/ForgotPassword";
import Otpverification from "./components/auth/Otpverification";
import ResetPassword from "./components/auth/ResetPassword.js";
import { AdminProtectedRoute } from "./components/Routes/AdminProtectedRoute.js";
import AdminRoutes from "./components/Routes/AdminRoute.js";
import Test from "./components/Routes/Test.js";

import Landing from "./landing/Landing.js";
import FreeTriel from "./landing/FreeTriel.js";
import { SuperAdminProtectedRoute } from "./components/Routes/SuperAdminProtectedRoute.js";
import SuperAdminRoute from "./components/Routes/SuperAdminRoute.js";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Landing />}/>
           <Route path="/freeTriel" element={<FreeTriel/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/registration" element={<Registraion />} />
          <Route path="/forgetpassword" element={<ForgotPassword />} />
          <Route path="/otpverification" element={<Otpverification />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/CompanyRegistration" element={<CompanyRegistration />} />
          
         
          <Route path="/admin/*" element={<AdminProtectedRoute />}>
            <Route path="*" element={<AdminRoutes />} />
          
          </Route>
          <Route path="/superadmin/*" element={<SuperAdminProtectedRoute />}>
            <Route path="*" element={<SuperAdminRoute />} />
          
          </Route>
          <Route path="/*" element={<Test />} />

         
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;