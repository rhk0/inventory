import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    duser: null,
    dtoken: "",
  });

  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.dtoken;

  useEffect(() => {
    const data = sessionStorage.getItem("dauth");
  //  console.log(data,"this is auth data")
    if (data) {
      const parseData = JSON.parse(data);
     // console.log(parseData,"this is auth data")
      setAuth({
        ...auth,
        duser: parseData.user,
        dtoken: parseData.token,
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
