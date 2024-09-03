import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth.js";
import axios from "axios";
import Loader from "../loader/Loader.js";

export const AdminProtectedRoute = () => {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const response = await axios.get("/api/v1/auth/Admin-auth");
        // console.log(response, "res");

        if (response.data.ok) {
          setOk(true);
        } else {
          navigate("/"); // Redirect to a "No Access" page or another appropriate action
        }
      } catch (error) {
        console.error("Error during authentication check", error);
        <div>Access Denied</div>; // Redirect to an error page or another appropriate action
      } finally {
        setLoading(false);
      }
    };

    if (auth?.AccessToken) {
      authCheck();
    } else {
      setOk(false);
      setLoading(false);
    }
  }, [auth, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return ok ? <Outlet /> : navigate("/");
};
// done every thing
