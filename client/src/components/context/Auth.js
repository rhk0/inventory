import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    duser: null,
    dtoken: "",
  });

  useEffect(() => {
    const data = sessionStorage.getItem("dauth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        duser: parseData.user,
        dtoken: parseData.token,
      });
    }
  }, []);

  useEffect(() => {
    if (auth?.dtoken) {
      axios.defaults.headers.common["Authorization"] = auth.dtoken;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [auth?.dtoken]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
