// "use client"

// // import {
// //   Button,
// //   Dialog,
// //   DialogHeader,
// //   DialogBody,
// //   DialogFooter,
// // } from "@material-tailwind/react";
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { MdCameraAlt } from "react-icons/md";
// import Cookies from "js-cookie";
// import axios from "axios";
// import ReactiveButton from "reactive-button";
// import Swal from "sweetalert2";

// const EditProfile = ({ size, handleOpen }) => {
//   const user = useSelector((state) => state.userauth.user);
//   const dispatch = useDispatch();
//   const token = Cookies.get("authtoken");

//   useEffect(() => {
//     dispatch({ type: "userauth/getUserInformation" });
//   }, []);

//   const [state, setState] = useState("idle");
//   const [selectedphoto, setSelectedPhoto] = useState(!user ? "" : user.userdp);
//   const [fullname, setFullname] = useState(!user ? "" : user.fullname);
//   const [username, setUsername] = useState(!user ? "" : user.username);
//   const [userbio, setUserBio] = useState(!user ? "" : user.userbio);
//   const [userphoto, setUserPhoto] = useState();

//   const handleImageChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setUserPhoto(selectedFile);
//     console.log(selectedFile);
//     const imageUrl = URL.createObjectURL(selectedFile);
//     setSelectedPhoto(imageUrl);
//   };

//   const UpdateProfile = async () => {
    
//     const formData = new FormData();
//     formData.append("fullname", fullname);
//     formData.append("username", username);
//     formData.append("userbio", userbio);
//     formData.append("userphoto", userphoto);

//     try {
//       setState("loading");
//       const response = await axios.patch(
//         ${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/account,
//         formData,
//         {
//           headers: {
//             Authorization: Bearer ${String(token)},
//           },
//           "Content-Type": "multipart/form-data",
//         }
//       );

//       console.log("testing...");

//       if (response.status !== 200) {
//         console.log("opps something went wrong, try again");
//         setState("error");
//       }

//       setState("success");
//       Swal.fire({
//         title: "Updated!",
//         text: "Your profile has been updated successfully.",
//         icon: "success",
//       });
//       if (typeof window !== "undefined") {
//         window.location.reload();
//       }
//       handleOpen(null);
//     } catch (error) {}
//   };

//   return (
//     <Dialog
//       open={
//         size === "xs" ||
//         size === "sm" ||
//         size === "md" ||
//         size === "lg" ||
//         size === "xl" ||
//         size === "xxl"
//       }
//       size={size || "sm"}
//       handler={handleOpen}
//     >
//       <form encType="multipart/form-data" className="max-w-2xl">
//         <DialogHeader className="flex flex-row justify-between">
//           <span className="text-large font-lg">Update Profile</span>
//         </DialogHeader>
//         <DialogBody className="h-[65vh] overflow-y-scroll">
//           <div className="flex flex-wrap p-3 rounded-lg">
//             <div className="relative flex flex-row items-center justify-center object-center w-full text-center rounded-lg shadow bottom-10 middle-0 ">
//               <div className="relative w-40 h-40 overflow-hidden rounded-full">
//                 <Image
//                   alt="Profile Picture"
//                   src={selectedphoto}
//                   className="object-cover w-40 h-40 p-5 text-center rounded-full"
//                   width={500}
//                   height={500}
//                 />
//                 <label
//                   htmlFor="userphoto"
//                   className="absolute top-0 left-0 flex items-center justify-center w-full h-full"
//                 >
//                   <MdCameraAlt
//                     className="p-1 text-2xl text-white bg-black rounded-full cursor-pointer"
//                     name="file"
//                   />
//                   <input
//                     type="file"
//                     id="userphoto"
//                     alt=""
//                     name="blogimage"
//                     className="hidden"
//                     onChange={handleImageChange}
//                     accept="image/*"
//                   />
//                 </label>
//               </div>
//             </div>

//             <div className="flex flex-col w-full gap-2 mt-5">
//               <div>
//                 <label className="text-sm text-black font-base">Fullname</label>
//                 <input
//                   className="w-full px-3 py-3 border rounded-lg border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
//                   type="text"
//                   value={fullname}
//                   onChange={(e) => setFullname(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label className="text-sm text-black font-base">Username</label>
//                 <input
//                   className="w-full px-3 py-3 border rounded-lg border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label className="text-sm text-black font-base">Bio</label>
//                 <textarea
//                   className="w-full px-3 py-3 border rounded-lg border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
//                   value={userbio}
//                   name="bio"
//                   onChange={(e) => setUserBio(e.target.value)}
//                 ></textarea>
//               </div>
//             </div>
//           </div>
//         </DialogBody>

//         <DialogFooter style={{ alignItems: "center" }}>
//           <Button
//             variant="text"
//             onClick={() => handleOpen(null)}
//             className="mt-2 mr-4 text-black"
//           >
//             <span>Cancel</span>
//           </Button>
//           <ReactiveButton
//             buttonState={state}
//             idleText="Submit"
//             loadingText="Loading"
//             successText="Updated successfully"
//             errorText="Unable to update"
//             color="red"
//             size="medium"
//             onClick={() => UpdateProfile()}
//             style={{
//               display: "block",
//               borderRadius: "0.5rem",
//               backgroundColor: "#000000",
//               padding: "0.75rem 1.25rem",
//               fontSize: "0.875rem",
//               fontWeight: "500",
//               color: "white",
//             }}
//           />
//         </DialogFooter>
//       </form>
//     </Dialog>
//   );
// };

// export default EditProfile;