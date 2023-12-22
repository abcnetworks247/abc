"use client";

import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Spinner,
  } from "@material-tailwind/react";
import { useState } from "react";

function UploadComp({ handleOpen, size }) {
  const [selectedphoto, setSelectedPhoto] = useState(null);
  const [blogimage, setBlogImage] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setBlogImage(selectedFile);

    const imageUrl = URL.createObjectURL(selectedFile);

    if (selectedFile) {
      setSelectedPhoto(selectedFile.name);
    }
  };

  return (
    <div>
      <Dialog
        open={
          size === "xs" ||
          size === "sm" ||
          size === "md" ||
          size === "lg" ||
          size === "xl" ||
          size === "xxl"
        }
        size={size || "sm"}
        handler={handleOpen}
      >
        <DialogHeader>Choose Image.</DialogHeader>
        <DialogBody className="px-6">
          <div
            className="relative w-full p-6 border-2 border-gray-300 border-dashed rounded-lg h-[50vh] flex flex-col items-center justify-center"
            id="dropzone"
          >
            <input
              type="file"
              className="absolute inset-0 z-50 w-full h-full opacity-0"
            />
            <div className="text-center">
              <img
                className="w-12 h-12 mx-auto"
                src="https://www.svgrepo.com/show/357902/image-upload.svg"
                alt=""
              />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer"
                >
                  <span>Drag and drop</span>
                  <span className="text-indigo-600"> or browse </span>
                  <span> to upload</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </label>
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p>

              {/* <span>{selectedphoto}</span> */}
              
            </div>
            <img src="" className="hidden mx-auto mt-4 max-h-40" id="preview" />
          </div>
        </DialogBody>
        <DialogFooter className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-4">
            <Spinner />
            <span className="text-sm">70% Uploaded</span>
          </div>
          <div className="">
            <Button
              variant="text"
              color="red"
              onClick={() => handleOpen(null)}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" onClick={() => handleOpen(null)}>
              <span>Upload</span>
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default UploadComp;
