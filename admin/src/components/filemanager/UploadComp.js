"use client";

import { useState } from "react";
import Image from "next/image";
import cookies from "js-cookie";
import Confetti from "react-confetti";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import Api from "@/utils/Api";
import Cookies from "js-cookie";

function UploadComp({ handleOpen, size, onUploadSuccess }) {
  const [uploadfile, setUploadFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [successful, setSuccessfull] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadstate, setUploadState] = useState(null);
  const [progress, setProgress] = useState(0);
    const AuthToken = Cookies.get("adminToken");

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const imageUrl = URL.createObjectURL(selectedFile);
    setFileUrl(imageUrl);
    setUploadFile(selectedFile);
  };

  const HandleUpload = async () => {
    if (!uploadfile) {
      toast.error("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("image", uploadfile);

    try {
      setLoading(true);
      setUploadState("Uploading, please wait...");
      setProgress(10);

      const response = await Api.post(
        "admin/filemanager/file/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${String(AuthToken)}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      if (response.status === 201) {
        setProgress(100);
        setUploadState("File Uploaded Successfully 🎉");
        setSuccessfull(true);

        toast.success("File uploaded successfully");

        // Notify parent component about successful upload
        if (onUploadSuccess) {
          onUploadSuccess(response.data.data);
        }

        setTimeout(() => {
          setLoading(false);
          setSuccessfull(null);
          setFileUrl(null);
          setUploadFile(null);
          setUploadState(null);
          setProgress(0);
          handleOpen(null);
        }, 2000);
      } else {
        handleUploadError("Upload failed. Please try again.");
      }
    } catch (error) {
      handleUploadError(
        error.response?.data?.message || "Upload failed. Please try again."
      );
      console.error("Error:", error);
    }
  };

  const handleUploadError = (message) => {
    setProgress(0);
    setLoading(false);
    setUploadState(`Error: ${message}`);

    toast.error(message);
  };

  const isOpen =
    size === "xs" ||
    size === "sm" ||
    size === "md" ||
    size === "lg" ||
    size === "xl" ||
    size === "xxl";

  return (
    <Dialog open={isOpen} onOpenChange={() => !loading && handleOpen(null)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>

        <div className="relative w-full p-6 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg min-h-[300px] flex flex-col items-center justify-center">
          <form encType="multipart/form-data">
            <input
              type="file"
              className="absolute inset-0 z-50 w-full h-full opacity-0 cursor-pointer"
              onChange={handleImageChange}
              name="image"
              accept="image/*"
              disabled={loading}
            />
          </form>

          <div className="text-center">
            {!fileUrl ? (
              <div className="mx-auto w-32 h-32 flex items-center justify-center rounded-full bg-muted/30">
                <Upload className="h-10 w-10 text-muted-foreground" />
              </div>
            ) : (
              <div className="relative">
                <Image
                  className="w-[200px] h-[200px] object-cover mx-auto rounded-lg shadow-sm"
                  src={fileUrl || "/placeholder.svg"}
                  alt="Preview"
                  height={200}
                  width={200}
                />
                {!loading && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setFileUrl(null);
                      setUploadFile(null);
                    }}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}

            <h3 className="mt-4 text-sm font-medium">
              <span>Drag and drop</span>
              <span className="text-primary"> or browse </span>
              <span>to upload</span>
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>

          {successful && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Confetti
                width={500}
                height={300}
                recycle={false}
                numberOfPieces={200}
              />
            </div>
          )}
        </div>

        {loading && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {uploadstate}
              </span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {!loading && uploadstate && (
          <div className="flex items-center gap-2 text-sm">
            {successful ? (
              <div className="text-green-500 font-medium">{uploadstate}</div>
            ) : (
              <div className="text-destructive font-medium">{uploadstate}</div>
            )}
          </div>
        )}

        <DialogFooter className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => handleOpen(null)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={HandleUpload}
            disabled={!fileUrl || loading}
            className={`${!fileUrl ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadComp;
