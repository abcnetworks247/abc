
"use client";
import React from "react";
import { useState, useEffect } from "react";
import { EditIcon} from "../components/icons/UserIcon";
import { UseProductProvider } from "../../../../contexts/ProductProvider";
import Editform from "../components/Editform";
import StaticForm from "../components/StaticForm";
import { UseUserContext } from "../../../../contexts/UserContext";

const page = () => {
  const { screen } = UseProductProvider()
  const [isEditable, setIsEditable] = useState(false);
  const { UserData , HandleGetUser} = UseUserContext();
   
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({});
  
  useEffect(() => {
    // Fetch user data when the component mounts
    HandleGetUser();
  
  }, []);


  useEffect(() => {
    setUserData(UserData)
  }, [UserData])

  console.log("userdashboard", UserData && UserData);
 

   
  console.log("state", userData)
  

useEffect(() => {
  // Update formData when userData changes
  setFormData({
    fullname: userData.fullname || "",
    email: userData.email || "",
    
  });
}, [userData]);

  
  
  console.log("form", formData)
  

    // Function to handle form input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      setUserData({...formData})
      
      

     
      console.log("Form data submitted:", formData);
      // Set isEditable back to false after submission
      setIsEditable(false);
  };
  
  

    
    const handleEdit = () => {
      setIsEditable((prev) => !prev);
    }
  return (
    <div className={` p-8 px-4 basis-2/3`}>
      <p></p>
      {isEditable ?
        <Editform
          formData={formData}
          setFormData={setFormData}
          handleInputChange={handleInputChange}
          handleEdit={handleEdit}
          handleSubmit={handleSubmit}
        /> :
        <StaticForm userData={userData} handleEdit ={handleEdit} />}
    </div>
  );
};

export default page;
