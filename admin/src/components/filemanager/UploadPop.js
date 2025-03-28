"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import Confetti from "react-confetti";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import Api from "@/utils/Api";

const UploadPop = ({ handleOpen, onUploadSuccess }) => {
  const [uploadFile, setUploadFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [successful, setSuccessful] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadState, setUploadState] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setImageLoading(true);
    const imageUrl = URL.createObjectURL(selectedFile);

    setFileUrl(imageUrl);
    setUploadFile(selectedFile);

    // Use a short timeout to simulate loading and ensure UI updates properly
    setTimeout(() => {
      setImageLoading(false);
    }, 300);
  };

  const handleUpload = async () => {
    if (!uploadFile) {
      toast.error("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("image", uploadFile);

    const token = Cookies.get("adminToken");

    try {
      setLoading(true);
      setUploadState("Uploading, please wait...");
      setProgress(10);

      console.log(
        "Starting upload with token:",
        token ? "Token exists" : "No token"
      );

      const response = await Api.post(
        "admin/filemanager/file/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${String(token)}`,
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

      console.log("Upload response:", response.status, response.data);

      if (response.status === 201) {
        setProgress(100);
        setUploadState("File Uploaded Successfully 🎉");
        setSuccessful(true);
        setLoading(false);

        toast.success("File uploaded successfully");

        // Notify parent component about successful upload
        if (onUploadSuccess) {
          onUploadSuccess(response.data.data);
        }

        setTimeout(() => {
          setSuccessful(null);
          setFileUrl(null);
          setUploadFile(null);
          setUploadState(null);
          setProgress(0);
          // if (handleOpen) handleOpen(null);
        }, 2000);
      } else {
        setLoading(false);
        setUploadState("Error: Try again later");
        setProgress(0);
        toast.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setLoading(false);
      setUploadState(
        "Error: " + (error.response?.data?.message || "Try again later")
      );
      setProgress(0);
      toast.error(error.response?.data?.message || "Failed to upload file");
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFileUrl(null);
    setUploadFile(null);
  };

  return (
    <div className="flex flex-col justify-start">
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
            <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-muted/30">
              {imageLoading ? (
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              ) : (
                <Upload className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
          ) : (
            <div className="relative">
              <div className="w-[200px] h-[200px] overflow-hidden rounded-lg shadow-sm">
                <img
                  className="w-full h-full object-cover"
                  src={fileUrl || "/placeholder.svg"}
                  alt="Preview"
                />
              </div>
              {!loading && (
                <button
                  onClick={handleCancel}
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
        <div className="w-full space-y-2 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{uploadState}</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {!loading && uploadState && (
        <div className="flex items-center gap-2 text-sm mt-4">
          {successful ? (
            <div className="text-green-500 font-medium">{uploadState}</div>
          ) : (
            <div className="text-destructive font-medium">{uploadState}</div>
          )}
        </div>
      )}

      <div className="flex flex-row items-center justify-between mt-6">
        <div></div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleOpen && handleOpen(null)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!fileUrl || loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadPop;
