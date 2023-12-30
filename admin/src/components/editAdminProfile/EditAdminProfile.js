import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Select,
  Spinner,
  Option,
  Avatar,
} from "@material-tailwind/react";
import Image from "next/image";
import { TiCameraOutline } from "react-icons/ti";
import UseUpdateprof from "@/hooks/UseUpdateprof";
import { useRouter } from "next/navigation";

export function EditAdminProfile({ open, handleOpen, UserValue }) {
  const { updateProf, isSuccess,isLoading,isError } = UseUpdateprof();
  const router = useRouter()
  const [names, setvalue] = useState("hello");
  const [userimage, setUserImage] = useState(UserValue && UserValue.userdp);
  const [selectedImage, setSelectedImage] = useState(null);
  const [successful, setSuccessfull] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadstate, setUploadState] = useState(null);
  function HandleImageChange(e) {
    const selectedPhoto = e.target.files[0];

    const ImageUrl = URL.createObjectURL(selectedPhoto);
    setUserImage(ImageUrl);
    setSelectedImage(selectedPhoto);
  }

  const [form, setForm] = useState({
    fullname: UserValue && UserValue.fullname,
    email: UserValue && UserValue.email,
    userbio: UserValue && UserValue.userbio,
    phone: UserValue && UserValue.phone,
  });

  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const HandleSubmit = async () => {
    let fullname = form.fullname;
    let email = form.email;
    let userbio = form.userbio;
    let phone = form.phone;

    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("userbio", userbio);
    formData.append("phone", phone);
    formData.append("userdp", selectedImage);

    console.log("this is a test", selectedImage);

    console.log(" all formdata on submit ", formData);
    try {
      if(!isLoading){
        setLoading(true);
        setUploadState("Uploading, please wait...");

      }
      await updateProf(formData);


      if(isSuccess){
        setUploadState("File Uploaded Successfully 🎉🎉");
        setSuccessfull(true);
        setLoading(null)
        setTimeout(() => {
          setLoading(false);
          setSuccessfull(null);
          handleOpen(null);
     
          
          if(typeof window !== "undefined"){
            window.location.reload();
          }
        }, 1000);
      }

      if(isError){
        setUploadState("an error occurred while updating your profile");
      }
      console.log("Profile updated successfully", isSuccess);
      // Handle success or redirect, etc.
    } catch (error) {
      console.error("Error updating profile", error);
      // Handle error, show a message, etc.
    }
  };

  console.log('is loading..', isLoading);
  console.log('is sucess..', isSuccess);

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Edit Your Profile</DialogHeader>
        <DialogBody className="h-[70vh]  overflow-scroll">
          <Typography className="font-normal">
            <form className="relative" enctype="multipart/form-data">
              <div
                form="user"
                className="absolute top-0 left-0 flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 dark:bg-slate-850 bg-clip-border"
                active=""
              >
                <div>
                  <input
                    type="file"
                    hidden
                    id="userdp"
                    className="hidden"
                    accept="image/*"
                    name="userdp"
                    onChange={HandleImageChange}
                  />
                  <div className="relative flex flex-col items-center justify-center m-auto">
                    <Image
                      src={userimage}
                      alt="bruce-mars"
                      variant="rounded"
                      height={100}
                      width={100}
                      className="rounded-lg shadow-lg h-24 w-24 object-cover shadow-blue-gray-500/40"
                    />

                    <label
                      htmlFor="userdp"
                      className="bg-black/25  absolute w-24 flex items-center bottom-[-2px] rounded-b-xl cursor-pointer  justify-center h-12 border-b-2"
                    >
                      <TiCameraOutline className="text-2xl text-gray-200" />
                    </label>
                  </div>

                  <div className="flex flex-wrap mt-4 -mx-3">
                    <div className="w-full max-w-full px-3 flex-0 sm:w-6/12">
                      <label
                        className="mb-2 ml-1 text-xs font-bold text-slate-700 dark:text-white/80"
                        htmlFor="First Name"
                      >
                        FullName
                      </label>
                      <input
                        type="text"
                        name="fullname"
                        placeholder="eg. Michael"
                        defaultValue={UserValue && UserValue.fullname}
                        required
                        onChange={HandleInputChange}
                        className="focus:shadow-primary-outline dark:bg-slate-850 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div className="w-full max-w-full px-3 mt-4 flex-0 sm:mt-0 sm:w-6/12">
                      <label
                        className="mb-2 ml-1 text-xs font-bold text-slate-700 dark:text-white/80"
                        htmlFor="Email Address"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="eg. soft@dashboard.com"
                        onChange={HandleInputChange}
                        defaultValue={UserValue && UserValue.email}
                        required
                        className="focus:shadow-primary-outline dark:bg-slate-850 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap mt-4 -mx-3">
                    <div className="w-full max-w-full px-3 mt-4 flex-0 sm:mt-0 sm:w-6/12">
                      <label
                        className="mb-2 ml-1 text-xs font-bold text-slate-700 dark:text-white/80"
                        htmlFor="Email Address"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+123 xxx xxx xxx"
                        defaultValue={UserValue && UserValue.phone}
                        onChange={HandleInputChange}
                        required
                        className="focus:shadow-primary-outline dark:bg-slate-850 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div className="w-full max-w-full px-3 flex-0 sm:w-6/12">
                      <label
                        className="mb-2 ml-1 text-xs font-bold text-slate-700 dark:text-white/80"
                        htmlFor="role"
                      >
                        Role
                      </label>
                      <Select
                        variant="outlined"
                        label={`${UserValue && UserValue.role} `}
                        disabled
                      >
                        <Option>{UserValue && UserValue.role} </Option>
                      </Select>
                    </div>
                  </div>
                  <div className="w-full max-w-full mt-4 flex-0 sm:mt-0">
                    <label
                      className="mb-2 ml-1 text-xs font-bold text-slate-700 dark:text-white/80"
                      htmlFor="Last Name"
                    >
                      Bio
                    </label>
                    <textarea
                      name="userbio"
                      id=""
                      defaultValue={UserValue && UserValue.userbio}
                      cols="5"
                      rows="5"
                      onChange={HandleInputChange}
                      className="focus:shadow-primary-outline dark:bg-slate-850 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2 flex flex-row items-center justify-between">
          <div>
          {!loading && <div className=""></div>}

<div className="flex flex-row items-center gap-4 ml-5">
  {loading && <Spinner />
  
  }
  <span className="text-sm"> {uploadstate}</span>
</div>
          </div>

           <div>
           
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            cancel
          </Button>
          <Button variant="gradient" color="green" onClick={HandleSubmit}>
            confirm
          </Button>
           </div>
        </DialogFooter>
      </Dialog>
    </>
  );
}
