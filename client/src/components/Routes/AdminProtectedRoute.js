import {useState,useEffect} from 'react'
import {useAuth} from "../context/Auth.js"
import { Outlet } from 'react-router-dom';
import axios from "axios";
import Spinner from "../Spinner";

export const AdminProtectedRoute = () => {
    const[ok,setOk]=useState(false);
    const [auth] =useState();

    useEffect(()=>{
        const autoCheck = async()=>{
            const data = await axios.get("/api/v1/dkpk-auth/admin-auth");
            if(data.data.ok){
                setOk(true);
            }
            else{
                setOk(false);
            }
        };
        if(auth?.dtoken) autoCheck();

    },[auth?.dtoken]);

  return ok?<Outlet/> : <Spinner path=""/>;
  }
