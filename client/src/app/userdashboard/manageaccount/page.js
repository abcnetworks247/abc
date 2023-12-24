"use client";
import React from "react";
import { useState, useEffect } from "react";
import { EditIcon } from "../components/icons/UserIcon";
import { UseProductProvider } from "../../../../contexts/ProductProvider";
import Editform from "../components/Editform";
import StaticForm from "../components/StaticForm";
import { UseUserContext } from "../../../../contexts/UserContext";
import axios from "axios";
import Api from "@/utils/Api";

const page = () => {

  const [formData, setFormData] = useState(null);
  const { screen } = UseProductProvider();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  const { UserData, HandleGetUser, Authtoken } = UseUserContext();
  
  console.log('UserData in form',formData)
  // useEffect(() => {
  //   // Fetch user data when the component mounts
  //   HandleGetUser();
  // }, []);



  // console.log("userdashboard", UserData && UserData);

  // console.log("formData", formData);

  useEffect(() => {
    // Update formData when userData changes
    setFormData({
       fullname: UserData?.fullname || "",
      email: UserData.email || "",
      userdp: UserData.userdp || "",
      phonenumber: UserData.phonenumber || "",
      shippingaddress: UserData.shippingaddress || "",
    });

    setSelectedPhoto(UserData.userdp);
  }, [UserData]);

  
  // console.log("this is user data", userData.userdp);
  
  // console.log(`this is selected p ${selectedPhoto}`);

 console.log("form", formData && formData.fullname);

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
    setFormData((prevData) => ({
      ...prevData,
      userdp: selectedFile,
    }));
    const imageUrl = URL.createObjectURL(selectedFile);
    console.log("selected file", selectedFile);
    setSelectedPhoto(imageUrl);
    console.log("imageurl", imageUrl);
    console.log("selectedphoto", selectedPhoto);
    console.log("image", formData);
    // If you want to update the userdp in the form, you can set it in the formData state
    // setSelectedPhoto(imageUrl); // Commented out as it's not necessary for form submission
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    

    try {
      // Create a new FormData instance
      const submitForm = new FormData();

      // Append form data to the FormData instance
      // submitForm.append("fullname", formData?.fullname);
      submitForm.append("email", formData?.email);

      // Append userdp if it exists
      if (formData.userdp) {
        submitForm.append("userdp", formData?.userdp);
      }

      // Make a PATCH request
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASEURL}client/auth/account`,
        submitForm,
        {
           headers: {
            Authorization: `Bearer ${String(Authtoken)}`
          },
          "Content-Type": "multipart/form-data",
        }
      );

      // Check the response status
      if (response.status === 200) {
        console.log("User profile updated successfully!");
        // Optionally, you can update the local user data context using HandleGetUser()
        HandleGetUser();
        // Set isEditable back to false after successful submission
        setIsEditable(false);
      } else {
        console.error("Failed to update user profile.");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
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

export default page;
