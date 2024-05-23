import { useState, useEffect } from "react";
import { useAuth } from "../context/Auth.js";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../loader/Loader.js";

export const AdminProtectedRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const autoCheck = async () => {
      const { data } = await axios.get("/api/v1/auth/admin-auth");
      setOk(data.ok);
    };
    if (auth?.dtoken) autoCheck();
  }, [auth?.dtoken]);

  return ok ? <Outlet /> : <Spinner />;
};
