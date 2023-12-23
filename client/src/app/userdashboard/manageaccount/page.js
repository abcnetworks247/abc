
"use client";
import React from "react";
import { useState, useEffect } from "react";
import { EditIcon } from "../components/icons/UserIcon";
import { UseProductProvider } from "../../../../contexts/ProductProvider";
import Editform from "../components/Editform";
import StaticForm from "../components/StaticForm";
import { UseUserContext } from "../../../../contexts/UserContext";

const page = () => {
  const { screen } = UseProductProvider()
  const [isEditable, setIsEditable] = useState(false);
  const { UserData } = UseUserContext();
  console.log("Userdata", UserData)
 
    const [userData, setUserData] = useState({
      firstName: "mijan",
      lastName: "richard",
      email: "igoni@gmail.com",
      phoneNumber: "0807032836",
      gender: "male",
    });
  
  console.log(userData)

    // Local state to store form data
    const [formData, setFormData] = useState({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      gender: userData.gender,
    });
  
  console.log(formData)
  console.log(userData)

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
      console.log(userData)
      

     
      console.log("Form data submitted:", formData);
      // Set isEditable back to false after submission
      setIsEditable(false);
  };
  
  

    
    const handleEdit = () => {
      setIsEditable((prev) => !prev);
    }
  return (
    <div className={` p-8 px-4 basis-2/3`}>
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
