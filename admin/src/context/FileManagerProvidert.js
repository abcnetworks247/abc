'use client'
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";



/**
 * creating context to for filemanger
 */
const FilemangerContext = createContext();

/**
 *
 * @param {children} children - allowing my children component to recieved data
 * @returns
 */

export const FileManagerProvider = ({ children }) => {
  // size for filemager dialog
  const [size, setSize] = useState(null);
  // fille manger dialog trigger
  const handleOpen = (value) => setSize(value);

//  const [uploadfile, setUploadFile] = useState(null);
//  const [fileUrl, setFileUrl] = useState(null);
//  const [successful, setSuccessfull] = useState(null);
//  const [loading, setLoading] = useState(false);
//  const [uploadstate, setUploadState] = useState(null);
 
//  const handleImageChange = (e) => {
//    const selectedFile = e.target.files[0];
   

//    const imageUrl = URL.createObjectURL(selectedFile);
//    setFileUrl(imageUrl);
//    setUploadFile(selectedFile);
//    console.log("handleImageChange", uploadfile)
//  };

//  const HandleUpload = async () => {
//    const formData = new FormData();
//    formData.append("image", uploadfile);

//    const token = Cookies.get("adminToken");

//    try {
//      setLoading(true);
//      setUploadState("Uploading, please wait...");
//      console.log("token", token);
//      const response = await axios.post(
//        `${process.env.NEXT_PUBLIC_SERVER_URL}admin/file/upload`,
//        formData, // Pass the FormData directly as the second parameter
//        {
//          headers: {
//            Authorization: `Bearer ${String(token)}`,
//            "Content-Type": "multipart/form-data",
//          },
//        }
//      );

//      console.log(response.data)

//      if (response.status === 201) {
//        console.log("successful");
//        setUploadState("File Uploaded Successfully 🎉🎉");
//        setSuccessfull(true);
//        setLoading(null);
//        setTimeout(() => {
//          setLoading(false);
//          setSuccessfull(null);
//          handleOpen(null);
//          // if(typeof window !== "undefined"){
//          //   window.location.reload();
//          // }
//        }, [5000]);
//      } else {
//        setTimeout(() => {
//          setLoading(false);
//          setUploadState("Error: Try again later");
//          setSuccessfull(null);
//          handleOpen(null);
//        }, [2000]);
//        console.log("error");
//      }
//    } catch (error) {
//      console.error("Error:", error);
//    }
//  };




  return (
    <FilemangerContext.Provider
      value={{
        size,
        handleOpen,
       
      }}
    >
      {children}
    </FilemangerContext.Provider>
  );
};

/**
 *
 * @returns {filemanger} useFilemanger - allowing me to use filemanager context
 */
export const UseFileManager = () => {
  const filemanger = FilemangerContext;
  if (!filemanger) {
    throw new Error("user can not use filemanager provider");
  }
  return useContext(filemanger); // returning filemanger
};
