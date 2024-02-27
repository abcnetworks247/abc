"use client"
import { createContext, useState, useContext, useEffect } from "react"
import Cookies from "js-cookie"
import React from "react"
import Api from "@/utils/Api"
import Loading from "@/components/loading/Loading"

const UserContext = createContext();

/**
 * @param {object} children where all component can acccss children
 */
export const UserContextProvider = ({ children }) => {
  // initial state for user incoming data
  const [UserData, setUserData] = useState(null);
 

  // console.log("user data", UserData)

  // loading state for user incoming data

  const [loading, setLoading] = useState(true);
  const [genLoading, setGenload] = useState(true);



  // get user token from session
  const Authtoken = Cookies.get("authToken");
  console.log("my auth", Authtoken)

  /**
   * @function (fuction) getUserData - a fuction created to retrieve user info.
   */

  const HandleGetUser = async () => {
    try {
      const data = await Api.get("client/auth/account", {
        headers: {
          Authorization: "Bearer " + Authtoken,
        },
      });
      const DataValue = data.data.olduser;
      if (data.status === 200) {
        setUserData(DataValue);
        setLoading(false);
        setGenload(false)
        // console.log("Data value if status is 200", DataValue)
      }

        // console.log("Data value outside ", DataValue);
      // setLoading(true);
  //  console.log("final Userdata", UserData)
    } catch (error) {
      console.error("Error fetching user data:", error);
      setGenload(false);
    }
  };


  // console.log("Another user data", UserData)
  /**
   * @function (fuction) getUserData - a fuction created to retrieve user info.
   */


  /**
   * @function (fuction)  functiom for password recovery
   */

  useEffect(() => {
    HandleGetUser();
    if (!Authtoken) {
      setGenload(false);
    }
  }, []);




  const [blogData, setBlogData] = useState(null)
    
       /**
   * Retrieves a blog using the API and sets the blog data.
   *
   * @return {Promise<void>} - A promise that resolves when the blog data is set.
   */
  const getBlog = async()=>{
      try {
          const res = await Api.get('admin/blog')
          const data = await res.data
          console.log("res",data)
          setBlogData(data.allblog)
      } catch (error) {
          console.log(error)
      }
  }


useEffect(()=>{
  console.log('blog context',blogData && blogData)
  getBlog()
},[])


    // log out user
    console.log("UserData", UserData);


  if(genLoading){
   return <Loading />
  }
  return (
    <UserContext.Provider
      value={{
        UserData,
        loading,
        Authtoken,
        HandleGetUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};



/**
 * Returns the user provider from the React context.
 * @returns {Object} The user provider.
 */

export function UseUserContext() {
  const usercontext = UserContext;
     if(!usercontext){
      throw new Error('useUser must be used within a UserProvider')
     }
  return useContext(usercontext);
}
