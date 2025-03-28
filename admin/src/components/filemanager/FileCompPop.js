"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import Api from "@/utils/Api";
import Cookies from "js-cookie";

const FileCompPop = ({
  setThumbnail,
  handleOpen,
  setGallery,
  setGallery2,
  setImageSrc,
  setAboutImageSrc,
}) => {
  const [fileData, setFileData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkurl, setCheckUrl] = useState([]);
  const [sortOption, setSortOption] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalFiles, setTotalFiles] = useState(0);
  const pathname = usePathname();

  // Fetch files from API
  const fetchFiles = async () => {
    try {
      const token = Cookies.get("adminToken");

      console.log(
        "Making API request to fetch files with token:",
        token ? "Token exists" : "No token"
      );

      const response = await Api.get("admin/filemanager/files", {
        params: {
          page: currentPage,
          limit: 12,
          sort: sortOption,
          search: searchTerm,
        },
        headers: {
          Authorization: `Bearer ${String(token)}`,
        },
      });

      console.log("API Response status:", response.status);

      if (response.status === 200) {
        console.log(
          "Files fetched successfully, count:",
          response.data.files?.length || 0
        );
        setFileData(response.data.files);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
        setTotalFiles(response.data.totalFiles);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
      toast.error("Failed to fetch files");
    } finally {
      setLoading(false);
    }
  };

  // Log file data for debugging
  const logFileData = () => {
    if (fileData && fileData.length > 0) {
      console.log("First file data:", fileData[0]);
    } else {
      console.log("No file data available");
    }
  };

  // Initial fetch and refetch when dependencies change
  useEffect(() => {
    console.log("Fetching files in FileCompPop");
    fetchFiles();
  }, [currentPage, sortOption, searchTerm]);

  // Debug file data after loading
  useEffect(() => {
    if (!loading && fileData) {
      logFileData();
    }
  }, [fileData, loading]);

  const handleFileCheck = (item) => {
    setCheckUrl((prevCheckUrl) => {
      if (!prevCheckUrl.find((url) => url._id === item._id)) {
        return [...prevCheckUrl, item];
      } else {
        return prevCheckUrl.filter((url) => url._id !== item._id);
      }
    });
  };

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when search changes
    fetchFiles();
  };

  const HandleAdd = () => {
    if (typeof window !== "undefined") {
      const fragment = window.location.hash;
      const valueWithoutPrefix = fragment.replace("#value=", "");

      if (valueWithoutPrefix === "thumbnail") {
        if (checkurl.length === 1) {
          const newthumbnail = checkurl.slice(0, 1);
          setThumbnail(newthumbnail[0].secure_url);
          handleOpen(null);
          toast.success("Thumbnail selected successfully");
        } else {
          toast.error("You can only select 1 product thumbnail");
        }
      }

      if (valueWithoutPrefix === "about") {
        if (checkurl.length === 1) {
          const imgabout = checkurl.slice(0, 1);
          setAboutImageSrc(imgabout[0].secure_url);
          handleOpen(null);
          toast.success("About image selected successfully");
        } else {
          toast.error("You can only select 1 product thumbnail");
        }
      }

      if (valueWithoutPrefix === "gallery") {
        if (checkurl.length === 3) {
          const newgallery = checkurl.slice(0, 3);
          setGallery(newgallery);
          handleOpen(null);
          toast.success("Gallery images selected successfully");
        } else {
          toast.error("You can only select 3 product gallery images");
        }
      }

      if (valueWithoutPrefix === "gallery2") {
        if (checkurl.length === 3) {
          const newgallery = checkurl.slice(0, 3);
          const newdata = newgallery.map((url) => url.secure_url);
          setGallery2(newdata);
          handleOpen(null);
          toast.success("Gallery images selected successfully");
        } else {
          toast.error("You can only select 3 product gallery images");
        }
      }

      if (valueWithoutPrefix === "newsimage") {
        if (checkurl.length === 1) {
          const newsimage = checkurl.slice(0, 1);
          setImageSrc(newsimage[0].secure_url);
          handleOpen(null);
          toast.success("News image selected successfully");
        } else {
          toast.error("You can only select 1 news image");
        }
      }
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Render loading skeletons
  if (loading) {
    return (
      <div className="h-[70vh] overflow-auto">
        <div className="flex flex-wrap items-center justify-between pt-4 border-t">
          <div className="flex flex-row items-center gap-3 ml-4">
            <Skeleton className="h-9 w-32" />
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center p-4">
            <Skeleton className="h-10 w-[180px]" />
            <Skeleton className="h-10 w-[250px]" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4">
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="aspect-square w-full" />
                <CardContent className="p-3">
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-3 w-2/3 mt-2" />
                </CardContent>
              </Card>
            ))}
        </div>

        <div className="flex items-center justify-between p-4 border-t">
          <Skeleton className="h-4 w-24" />
          <div className="flex gap-1">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </div>
    );
  }

  if (!fileData || fileData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <div className="p-4 rounded-full bg-muted">
          <Search className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-medium">No files found</h3>
        <p className="text-sm text-muted-foreground">
          Upload files to see them here
        </p>
      </div>
    );
  }

  return (
    <div className="h-[70vh] overflow-auto">
      <div className="flex flex-wrap items-center justify-between pt-4 border-t">
        <div className="flex flex-row items-center gap-3 ml-4">
          {checkurl.length > 0 && (
            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-1"
              onClick={HandleAdd}
            >
              <Plus className="h-4 w-4" />
              Add Selected
              {checkurl.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {checkurl.length}
                </Badge>
              )}
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center p-4">
          <Select value={sortOption} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Sort By Newest</SelectItem>
              <SelectItem value="oldest">Sort By Oldest</SelectItem>
              <SelectItem value="name">Sort By Name</SelectItem>
            </SelectContent>
          </Select>

          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search files..."
              className="pl-8 w-full md:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4">
        {fileData.map((item) => (
          <Card key={item._id} className="overflow-hidden group">
            <div className="relative aspect-square">
              <img
                className="object-cover w-full h-full"
                src={item.secure_url || "/placeholder.svg"}
                alt={item.originalname}
                loading="lazy"
                onError={(e) => {
                  console.error(`Error loading image: ${item.secure_url}`);
                  e.target.src = "/placeholder.svg";
                }}
              />
              <Skeleton className="absolute inset-0 -z-10" />
              <div className="absolute inset-0 flex items-start justify-between p-2 opacity-0 bg-black/50 group-hover:opacity-100 transition-opacity">
                <Checkbox
                  checked={checkurl.some((url) => url._id === item._id)}
                  onCheckedChange={() => handleFileCheck(item)}
                  className="bg-white"
                />
              </div>
            </div>
            <CardContent className="p-3">
              <p className="text-sm truncate" title={item.originalname}>
                {item.originalname}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between p-4 border-t">
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages} ({totalFiles} files)
        </div>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileCompPop;
