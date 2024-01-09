"use client"
import React from "react";
import { useState, useEffect } from "react";
import { UseProductProvider } from "../../../../../contexts/ProductProvider";
import { UseUserContext } from "../../../../../contexts/UserContext";
import axios from "axios";
import Api from "@/utils/Api";
import StaticForm from "../edit/StaticForm";
import Editform from "../edit/Editform";
import Swal from "sweetalert2";
import { RotatingLines } from "react-loader-spinner";



const Update = () => {
  const { UserData, HandleGetUser, Authtoken } = UseUserContext();

  const [formData, setFormData] = useState({
    fullname: UserData?.fullname,
    email: UserData.email,
    phone: UserData.phone,
    shippingaddress: UserData.shippingaddress,
    userdp: UserData.userdp,
  });
  const { screen } = UseProductProvider();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log("UserData in form", formData);

 
  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
  
    const imageUrl = URL.createObjectURL(selectedFile);

    setSelectedPhoto(imageUrl);
    setFormData({...formData, userdp:selectedFile})
  
    console.log("this is formData", formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
   
    try {
      // Create a new FormData instance
      const submitForm = new FormData();

      // Append form data to the FormData instance
    
      submitForm.append("fullname", formData.fullname);
      submitForm.append("email", formData.email);
      submitForm.append("phone", formData.phone);
      submitForm.append("shippingaddress", formData.shippingaddress);
      submitForm.append("userdp", formData.userdp);

      // Make a PATCH request
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}client/auth/account`,
        submitForm,
        {
          headers: {
            Authorization: `Bearer ${String(Authtoken)}`,
          },
          "Content-Type": "multipart/form-data",
        }
      );

      // Check the response status
      if (response.status === 200) {
        
        await HandleGetUser();
         console.log("Updated UserData:", UserData);
        setIsEditable(false);
        
        console.log("use profle updated successfully")
      } else {
        console.error("Failed to update user profile.");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
   
  };

  const handleClosePopup = () => {
    setSuccessMessage("");
  };

  const handleEdit = () => {
    setIsEditable((prev) => !prev);
  };

  return (
    <div className={` p-8 px-4 basis-2/3`}>
      <p></p>
  
      {isEditable ? (
        <Editform
          formData={formData}
          setFormData={setFormData}
          handleInputChange={handleInputChange}
          handleEdit={handleEdit}
          handleSubmit={handleSubmit}
          handleImageChange={handleImageChange}
          selectedPhoto={selectedPhoto}
          
        
        />
      ) : (
        <StaticForm userData={UserData} handleEdit={handleEdit} />
      )}
    </div>
  );
};

export default Update;
