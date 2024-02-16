"use client"
import { useContext, createContext, useState, useEffect , useReducer} from "react";
import Cookies from "js-cookie";
import useCurrentAdmin from "@/hooks/useCurrentAdmin";
import Loading from "@/components/loading/Loading";
import { redirect } from "next/navigation";
const AdminContext = createContext();


export const AdminProvider = ({ children }) => {
  const {
    CurrentUser,
    CurrentUsererror,
    CurrentUserloading,
    CurrentUserisSuccess,
  } = useCurrentAdmin();
  const Users = CurrentUser?.data;
  const UserInfo = Users?.olduser;

    // get user token from session
    const Authtoken = Cookies.get("adminToken");

    const [genLoading, setGenload] = useState(true);
    const [generror, setGenerror] = useState(false);

    const ToggleReducers = (state, action)=>{
      switch (action.type) {
        case "TOGGLE":
          
           return {
            toggle:!state.toggle,
           }
      
        default:
          return state;
      }
    }
    


    const [state, dispatch] = useReducer(    ToggleReducers,{toggle: false})

    const HandleLogout = async () => {
      Cookies.remove("adminToken");
    };

    useEffect(()=>{
       if(Authtoken){
         setGenerror(true)
         setGenload(false)
       }else{
        setGenload(false)
       }
    },[])

     if(genLoading){
       return <Loading />
     }
  return (
    <AdminContext.Provider
      value={{
        UserInfo,
        CurrentUsererror,
        CurrentUserloading,
        HandleLogout,
        CurrentUserisSuccess,
    
        state, dispatch
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const  UseAdminContext = () => {
  const admin = AdminContext;
  if (!admin) {
    throw new Error("user can not use admin provider");
  }
  return useContext(AdminContext);
};
