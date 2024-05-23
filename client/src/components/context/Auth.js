import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    AccessToken: "",
  });

<<<<<<< HEAD
  useEffect(() => {
    const data = sessionStorage.getItem("dauth");
=======
  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.AccessToken;

  useEffect(() => {
    const data = sessionStorage.getItem("dauth");
  
  //  console.log(data,"this is auth data")
>>>>>>> 6723db38ff636c08bda152d0e0e3f4fb5285ab0d
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
<<<<<<< HEAD
        duser: parseData.user,
        dtoken: parseData.token,
=======
        ...auth,
        user: parseData.user,
        AccessToken: parseData.AccessToken,
>>>>>>> 6723db38ff636c08bda152d0e0e3f4fb5285ab0d
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
