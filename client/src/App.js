import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";

import { AdminProtectedRoute } from "./components/Routes/AdminProtectedRoute.js";
import AdminRoutes from "./components/Routes/AdminRoute.js";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/admin" element={<AdminProtectedRoute/>}>
            <Route path="/admin/dashboard/*" element={<AdminRoutes/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
