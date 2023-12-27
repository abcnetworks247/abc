import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Select,
  Option,
  Avatar
} from "@material-tailwind/react";
import Image from "next/image";
import { TiCameraOutline } from "react-icons/ti";
import UseUpdateprof from "@/hooks/UseUpdateprof";

export function EditAdminProfile({ open, handleOpen, UserValue }) {

  const { updateProf, isSuccess } = UseUpdateprof();

  const[formData, setFormData] = useState({
     fullname: "", 
     email: "",
     userbio: "",
  })
 
   const HandleInputChange =(e)=>{
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

   }



   const HandleSubmit = async ( )=> { 
    try {
      await updateProf(formData);
      console.log('Profile updated successfully', isSuccess);
      // Handle success or redirect, etc.
    } catch (error) {
      console.error('Error updating profile', error);
      // Handle error, show a message, etc.
    }
  
   }
 
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Edit Your Profile</DialogHeader>
        <DialogBody className="h-[70vh]  overflow-scroll">
          <Typography className="font-normal">
            <form className="relative" >
              <div
                form="user"
                className="absolute top-0 left-0 flex flex-col w-full min-w-0 p-4 break-words bg-white dark:bg-slate-850 bg-clip-border h-auto opacity-100 visible"
                active=""
              >

                <div>
                <input type="file"  hidden id="imagechange" className="hidden" />
                   <div className="flex flex-col relative items-center justify-center m-auto">
                   <Image
               src={UserValue && UserValue.userdp}
                  alt="bruce-mars"
                  variant="rounded"
                  height={100}
                  width={100}
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
  
                <label htmlFor="imagechange" className="bg-black/25  absolute w-24 flex items-center bottom-[-2px] rounded-b-xl cursor-pointer  justify-center h-12 border-b-2">
                    
                    <TiCameraOutline  className="text-2xl  text-black"/>
               
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
                        defaultValue={ UserValue && UserValue.fullname}
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
                        defaultValue={ UserValue && UserValue.email}
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
                        defaultValue={ UserValue && UserValue.phone}
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
                      <Select variant="outlined" label={`${UserValue && UserValue.role} `} disabled>
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
                      <textarea name="userbio" id="" defaultValue={UserValue && UserValue.userbio} cols="5" rows="5"  onChange={HandleInputChange}  className="focus:shadow-primary-outline dark:bg-slate-850 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"></textarea>
                   
                    </div>
             
                </div>
              </div>
            </form>
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            cancel
          </Button>
          <Button variant="gradient" color="green" onClick={HandleSubmit} disabled={Object.values(formData).every((value)=> value === "")}>
            confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
