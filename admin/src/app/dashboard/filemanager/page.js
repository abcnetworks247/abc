"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import PopUpFilemanager from "@/components/filemanager/PopUpFilemanager";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import FileComp from "@/components/filemanager/fileComp";
import UploadComp from "@/components/filemanager/UploadComp";
import Cookies from "js-cookie";

export default function FileManagerPage() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [gallery2, setGallery2] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);
  const [aboutImageSrc, setAboutImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [refreshFiles, setRefreshFiles] = useState(0);

  useEffect(() => {
    // Simulate loading state for demo purposes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleOpen = (value) => {
    setSize(value);
    setOpen(!!value);

    if (value) {
      toast.info("File manager opened");
    }
  };

  const handleUploadOpen = (value) => {
    setUploadModalOpen(!!value);
  };

  const handleUploadSuccess = () => {
    // Trigger a refresh of the file list
    setRefreshFiles((prev) => prev + 1);
  };

  const token = Cookies.get("adminToken");

  return (
    <div className="container py-8 px-2 md:px-4 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">File Manager</h1>
          <p className="text-muted-foreground">
            Manage and organize your uploaded files
          </p>
        </div>
        <Button
          onClick={() => handleUploadOpen(true)}
          className="flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Upload Files
        </Button>
      </div>

      {/* File Manager Component */}
      <div className="mt-8">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-64 w-full" />
                ))}
            </div>
          </div>
        ) : (
          <FileComp token={token} key={refreshFiles} />
        )}
      </div>

      {/* Upload Modal */}
      <UploadComp
        handleOpen={handleUploadOpen}
        size={uploadModalOpen ? "md" : null}
        onUploadSuccess={handleUploadSuccess}
      />

      {/* File Manager Popup for selecting images */}
      <PopUpFilemanager
        handleOpen={handleOpen}
        size={open ? "lg" : null}
        setThumbnail={setThumbnail}
        setGallery={setGallery}
        setGallery2={setGallery2}
        setImageSrc={setImageSrc}
        setAboutImageSrc={setAboutImageSrc}
      />
    </div>
  );
}
