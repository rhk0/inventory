import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    AccessToken: "",
  });

  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.AccessToken;

  useEffect(() => {
    const data = sessionStorage.getItem("dauth");
  
  //  console.log(data,"this is auth data")
    if (data) {
      const parseData = JSON.parse(data);
     // console.log(parseData,"this is auth data")
      setAuth({
        ...auth,
        user: parseData.user,
        AccessToken: parseData.AccessToken,
      });
    }

    
    //eslint-disable-next-line
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
