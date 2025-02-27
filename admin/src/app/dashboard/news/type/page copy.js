// 'use client';

// import NewsDialogType from '@/components/news/Newdialogtype';
// import NewsDialog from '@/components/news/newsDialog';
// import {
//   IconButton,
//   Tooltip,
//   Button,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
//   Spinner,
// } from '@material-tailwind/react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import React, { useEffect, useState } from 'react';
// import { FiEdit } from 'react-icons/fi';
// import { MdOutlineDeleteForever } from 'react-icons/md';
// import Swal from 'sweetalert2';

// const page = () => {
//   const [allproductCategory, setAllProductCategory] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [uploadState, setUploadState] = useState(null);
//   const [name, setName] = useState('');
//   const [editname, setEditName] = useState('');
//   const [editid, setEditid] = useState(null);

//   const [newDialogdata, setNewdialogdata] = useState(null)
  

//   let [isOpen, setIsOpen] = useState(false);

//   function closeModal() {
//     setIsOpen(false);
//   }

//   function openModal() {
//     setIsOpen(true);
//   }


//   const token = Cookies.get('adminToken');

//   useEffect(() => {
//     const HandleFetch = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_SERVER_URL}admin/category/news/type`
//         );

//         if (response.status === 200) {
//           setAllProductCategory(response.data.data);
//         }
//       } catch (error) {}
//     };

//     HandleFetch();
//   });

//   const handleCreate = async () => {
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_SERVER_URL}admin/category/news/type`,
//         {
//           name,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${String(token)}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       setName('');
//       if (response.status === 201) {
//         if (typeof window !== 'undefined') {
//           window.location.reload();
//         }
//       } else {
//         alert('Unexpected response status');
//         // Handle the unexpected status code appropriately
//       }
//     } catch (error) {
//       alert('Error: ' + error);
//       throw new Error('Error creating category:', error);
//       // Handle the error or show an error message to the user
//     }
//   };

//   const handleDelete = async (newid) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         try {
//           const response = axios.delete(
//             `${process.env.NEXT_PUBLIC_SERVER_URL}admin/category/news/type`,
//             {
//               data: { id: newid }, // Send id in the request body
//               headers: {
//                 Authorization: `Bearer ${String(token)}`,
//                 'Content-Type': 'application/json',
//               },
//             }
//           );

//           if (response.status === 200) {
//             Swal.fire({
//               icon: 'error',
//               title: 'Oops...',
//               text: 'Something went wrong!',
//               footer: '<a href="#">Why do I have this issue?</a>',
//             });
//             // if (typeof window !== "undefined") {
//             //   window.location.reload();
//             // }
//           } else {
//             Swal.fire({
//               title: 'Deleted!',
//               text: 'Your file has been deleted.',
//               icon: 'success',
//             });
//           }
//         } catch (error) {
//           alert('Error: ' + error);
//           throw new Error('Error  deleting category:', error);
//           // Handle the error or show an error message to the user
//         }
//       }
//     });
//   };

//   const handleEdit = async (newid) => {
//     try {
//       const fildata = {
//         id: newid,
//         name: editname, // Make sure editname is defined and has the expected value
//       };

//       const response = await axios.patch(
//         `${process.env.NEXT_PUBLIC_SERVER_URL}admin/category/news/type`,
//         fildata,
//         {
//           headers: {
//             Authorization: `Bearer ${String(token)}`, // Ensure token is properly validated and securely handled
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       console.log('new response', response);

//       if (response.status === 200) {
//         console.log('new response');
//         // setUploadState('File Uploaded Successfully 🎉🎉');
//         // setSuccessful(true);

//         setLoading(false);

//         closeModal();
//       } else {
//         // Handle other status codes appropriately
//         console.log('Unexpected response status:', response.status);
//       }
//     } catch (error) {
//       console.error('Error:', error); // Use console.error for errors
//       alert('Error: ' + error.message); // Provide a more detailed error message to the user
//     }
//   };


//   return (
//     <div>
//       <div className='flex flex-col items-start justify-between gap-10 px-5 mt-10 md:flex-row'>
//         <div className='flex flex-col items-start justify-start w-full p-8'>
//           <h1 className='mb-4 ml-5 text-lg font-semibold' Name>
//             All News Type
//           </h1>

//           {allproductCategory && (
//             <div className='w-full overflow-hidden bg-white shadow sm:rounded-md overflow-y-auto max-h-[60vh]'>
//               <ul>
//                 {allproductCategory.map((item) => {
//                   const newitem = {
//                     id: item._id,
//                     name: item.name,
//                   }
//                   return(
//                   <li key={item._id} className='border border-b border-gray-200'>
//                     <div className='px-4 py-3 sm:px-6'>
//                       <div className='flex items-center justify-between'>
//                         <p className='max-w-2xl mt-1 text-sm font-semibold text-gray-500'>
//                           {item.name}
//                         </p>
//                       </div>
//                       <div className='flex items-center justify-between mt-4'>
//                         <p className='text-sm font-medium text-gray-500'>
//                           Status: <span className='text-green-600'>Active</span>
//                         </p>

//                         <div className='flex flex-row items-start gap-4'>
//                           <Tooltip content='Edit'>
//                             <IconButton
//                               variant='text'
//                               onClick={() => {
//                                 setEditName(item.name);
//                                 setNewdialogdata(newitem);
//                                 openModal();
//                               }}>
//                               <FiEdit className='text-xl text-indigo-500 cursor-pointer indigo-600' />
//                             </IconButton>
//                           </Tooltip>
//                           <Tooltip content='Delete'>
//                             <IconButton
//                               variant='text'
//                               onClick={() => {
//                                 let id = item._id;
//                                 handleDelete(id);
//                               }}>
//                               <MdOutlineDeleteForever className='text-xl text-red-600 cursor-pointer indigo-600' />
//                             </IconButton>
//                           </Tooltip>
//                         </div>
//                       </div>
//                     </div>
//                   </li>
//                 )})}
//               </ul>
//             </div>
//           )}
//         </div>

//         <div className='w-full'>
//           <div className='flex items-center justify-start'>
//             <div
//               className='w-full max-w-md p-8 bg-white rounded-lg shadow-sm'
//               Name>
//               <h1 className='mb-4 text-lg font-semibold' Name>
//                 Create A News Type
//               </h1>
//               <p className='mb-6 text-sm text-gray-600' Name>
//                 this news type will be associated to your product when created.
//               </p>
//               <div className='mb-4' Name>
//                 <input
//                   type='text'
//                   placeholder='write here...'
//                   className='w-full px-4 py-2 text-gray-700 border rounded-lg email-input focus:border-blue-500'
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//               </div>
//               <button
//                 className='w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none'
//                 onClick={handleCreate}>
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className=''></div>
//       <NewsDialogType
//         isOpen={isOpen}
//         closeModal={closeModal}
//         newDialogdata={newDialogdata}
//         setEditName={setEditName}
//         loading={loading}
//         uploadState={uploadState}
//         handleEdit={handleEdit}
//       />
//     </div>
//   );
// };

// export default page;


"use client";

import { useEffect, useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { GripVertical } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import NewsDialogType from "@/components/news/Newdialogtype";

const Page = () => {
  const [allproductCategory, setAllProductCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadState, setUploadState] = useState(null);
  const [name, setName] = useState("");
  const [editname, setEditName] = useState("");
  const [newDialogdata, setNewdialogdata] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const token = Cookies.get("adminToken");

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const fetchNewsTypes = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}admin/category/news/type`
      );

      if (response.status === 200) {
        setAllProductCategory(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching news types:", error);
    }
  }, []);

  useEffect(() => {
    fetchNewsTypes();
  }, [fetchNewsTypes]);

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}admin/category/news/type`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setName("");
        fetchNewsTypes();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "News type created successfully",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const handleDelete = async (newid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${process.env.NEXT_PUBLIC_SERVER_URL}admin/category/news/type`,
            {
              data: { id: newid },
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          fetchNewsTypes();
          Swal.fire("Deleted!", "News type has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", error.message, "error");
        }
      }
    });
  };

  const handleEdit = async (newid) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}admin/category/news/type`,
        {
          id: newid,
          name: editname,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setLoading(false);
        closeModal();
        fetchNewsTypes();
        Swal.fire("Updated!", "News type has been updated.", "success");
      }
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    try {
      // Optimistically update the UI
      const newItems = Array.from(allproductCategory);
      const [removed] = newItems.splice(sourceIndex, 1);
      newItems.splice(destinationIndex, 0, removed);
      setAllProductCategory(newItems);

      // Update position on server
      await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}admin/category/news/type/position`,
        {
          id: result.draggableId,
          newPosition: destinationIndex + 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      // Revert the changes if the server update fails
      fetchNewsTypes();
      Swal.fire("Error!", "Failed to update position", "error");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-10 px-5 mt-10 md:flex-row ">
        <div className="flex flex-col items-start justify-start w-full p-8 bg-red-500">
          <h1 className="mb-4 ml-5 text-lg font-semibold">All News Type</h1>

          {allproductCategory && (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="news-types">
                {(provided) => (
                  <div
                    className="w-full overflow-hidden bg-white shadow sm:rounded-md overflow-y-auto max-h-[60vh]"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <ul>
                      {allproductCategory.map((item, index) => {
                        const newitem = {
                          id: item._id,
                          name: item.name,
                        };
                        return (
                          <Draggable
                            key={item._id}
                            draggableId={item._id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`border border-b border-gray-200 ${
                                  snapshot.isDragging ? "bg-blue-50" : ""
                                }`}
                              >
                                <div className="px-4 py-3 sm:px-6">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                      <span
                                        {...provided.dragHandleProps}
                                        className="cursor-grab active:cursor-grabbing"
                                      >
                                        <GripVertical className="w-5 h-5 text-gray-400" />
                                      </span>
                                      <p className="max-w-2xl mt-1 text-sm font-semibold text-gray-500">
                                        {item.name}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between mt-4">
                                    {/* <p className="text-sm font-medium text-gray-500">
                                      Position:{" "}
                                      <span className="text-blue-600">
                                        {index + 1}
                                      </span>
                                    </p> */}

                                    <div className="flex flex-row items-start gap-4">
                                      <Tooltip content="Edit">
                                        <IconButton
                                          variant="text"
                                          onClick={() => {
                                            setEditName(item.name);
                                            setNewdialogdata(newitem);
                                            openModal();
                                          }}
                                        >
                                          <FiEdit className="text-xl text-indigo-500 cursor-pointer" />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip content="Delete">
                                        <IconButton
                                          variant="text"
                                          onClick={() => handleDelete(item._id)}
                                        >
                                          <MdOutlineDeleteForever className="text-xl text-red-600 cursor-pointer" />
                                        </IconButton>
                                      </Tooltip>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </ul>
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>

        <div className="w-full">
          <div className="flex items-center justify-start">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm">
              <h1 className="mb-4 text-lg font-semibold">Create A News Type</h1>
              <p className="mb-6 text-sm text-gray-600">
                This news type will be associated with your product when
                created.
              </p>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Write here..."
                  className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:border-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <button
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                onClick={handleCreate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <NewsDialogType
        isOpen={isOpen}
        closeModal={closeModal}
        newDialogdata={newDialogdata}
        setEditName={setEditName}
        loading={loading}
        uploadState={uploadState}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default Page;

