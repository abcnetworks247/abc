"use client";
import React from "react";
import { useState, useEffect } from "react";
import { UseProductProvider } from "../../../../../contexts/ProductProvider";
import { UseUserContext } from "../../../../../contexts/UserContext";
import axios from "axios";
import Api from "@/utils/Api";
import StaticForm from "../edit/StaticForm";
import Editform from "../edit/Editform";
import Swal from "sweetalert2";
import { Loader2 } from "lucide-react";

const Update = () => {
  const { UserData, HandleGetUser, Authtoken } = UseUserContext();

  const [formData, setFormData] = useState({
    fullname: UserData && UserData.fullname || "",
    email:UserData && UserData.email || "",
    phone: UserData && UserData.phone || "",
    shippingaddress: UserData && UserData.shippingaddress || "",
    userdp:UserData && UserData.userdp,
  });

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log("UserData in form", formData);
  const [submitForm, setSubmitForm] = useState(new FormData());
  const [loading, setLoading] = useState(false)

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
    submitForm.append("userphoto", selectedFile);

    console.log("this is formData", formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      setLoading(true)
      

      console.log("userphoto", formData.userphoto);
      // Append form data to the FormData instance

      submitForm.append("fullname", formData.fullname);
      submitForm.append("email", formData.email);
      submitForm.append("phone", formData.phone);
      submitForm.append("shippingaddress", formData.shippingaddress);
    
       console.log("my phonenumber", formData.phone);
 
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
        setLoading(false)
        setIsEditable(false);

        console.log("use profle updated successfully");
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
          loading={loading}
          setLoading={setLoading}
        />
      ) : (
        <StaticForm userData={UserData} handleEdit={handleEdit} />
      )}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};

export default Update;
