"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react";
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
import { toast } from "sonner";
import Api from "@/utils/Api";
import Cookies from "js-cookie";

const FileComp = ({ token }) => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkurl, setCheckUrl] = useState([]);
  const [sortOption, setSortOption] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [fileData, setFileData] = useState([]);
  const [totalFiles, setTotalFiles] = useState(0);
  const AuthToken = Cookies.get("adminToken");

  // Fetch files from API
  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await Api.get("admin/filemanager/files", {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          sort: sortOption,
          search: searchTerm,
        },
        headers: {
          Authorization: `Bearer ${String(token)}`,
        },
      });

      if (response.status === 200) {
        setFileData(response.data.files);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
        setTotalFiles(response.data.totalFiles);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch files");
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch files when component mounts or dependencies change
  useEffect(() => {
    fetchFiles();
  }, [currentPage, sortOption, searchTerm, itemsPerPage]);

  const handleFileCheck = (item) => {
    setCheckUrl((prevCheckurl) => {
      const isItemChecked = prevCheckurl.some(
        (checkedItem) => checkedItem._id === item._id
      );

      if (!isItemChecked) {
        return [item, ...prevCheckurl];
      } else {
        return prevCheckurl.filter(
          (checkedItem) => checkedItem._id !== item._id
        );
      }
    });
  };

  const handleSingleDelete = async (id) => {
    try {
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
          setLoading(true);
          try {
            const response = await Api.delete(`admin/filemanager/file/${id}`, {
              headers: {
                Authorization: `Bearer ${String(AuthToken)}`,
              },
            });

            if (response.status === 200) {
              toast.success("File deleted successfully");

              // Refresh the file list
              fetchFiles();
            }
          } catch (error) {
            toast.error(
              error.response?.data?.message || "Failed to delete file"
            );
            setLoading(false);
          }
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleBulkDelete = async () => {
    if (checkurl.length === 0) return;

    try {
      Swal.fire({
        title: "Delete selected files?",
        text: `You are about to delete ${checkurl.length} files`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete them!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          try {
            const fileIds = checkurl.map((item) => item._id);
            const response = await Api.post(
              "admin/filemanager/files/delete",
              { fileIds },
              {
                headers: {
                  Authorization: `Bearer ${String(AuthToken)}`,
                },
              }
            );

            if (response.status === 200) {
              toast.success(`${checkurl.length} files deleted successfully`);

              setCheckUrl([]);
              // Refresh the file list
              fetchFiles();
            }
          } catch (error) {
            toast.error(
              error.response?.data?.message || "Failed to delete files"
            );
            setLoading(false);
          }
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSelectAll = () => {
    setCheckUrl((prevCheckurl) => {
      if (prevCheckurl.length === fileData.length) {
        return [];
      } else {
        return [...fileData];
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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading && fileData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 mt-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground">Loading files...</p>
      </div>
    );
  }

  if (!fileData || fileData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 mt-8 border border-dashed rounded-lg">
        <div className="p-4 rounded-full bg-muted">
          <Trash2 className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-medium">No files found</h3>
        <p className="text-sm text-muted-foreground">
          Upload files to see them here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 pt-8 border-t md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="selectAll"
            checked={checkurl.length === fileData.length && fileData.length > 0}
            onCheckedChange={handleSelectAll}
          />
          <label
            htmlFor="selectAll"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Select All
          </label>

          {checkurl.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {checkurl.length} selected
            </Badge>
          )}
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBulkDelete}
              disabled={checkurl.length === 0 || loading}
              className="flex items-center gap-1"
            >
              {loading ? (
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              Delete
            </Button>

            <Select
              value={sortOption}
              onValueChange={handleSortChange}
              disabled={loading}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Sort By Newest</SelectItem>
                <SelectItem value="oldest">Sort By Oldest</SelectItem>
                <SelectItem value="name">Sort By Name</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search files..."
              className="pl-8 w-full md:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={loading}
            />
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {fileData.map((item) => (
          <Card key={item._id} className="overflow-hidden group">
            <div className="relative aspect-square">
              <img
                className="object-cover w-full h-full"
                src={item.secure_url || "/placeholder.svg"}
                alt={item.originalname}
              />
              <div className="absolute inset-0 flex items-start justify-between p-2 opacity-0 bg-black/50 group-hover:opacity-100 transition-opacity">
                <Checkbox
                  checked={checkurl.some(
                    (checkedItem) => checkedItem._id === item._id
                  )}
                  onCheckedChange={() => handleFileCheck(item)}
                  className="bg-white"
                  disabled={loading}
                />

                {checkurl.length === 0 && (
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleSingleDelete(item._id)}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <CardContent className="p-3">
              <p className="text-sm truncate" title={item.originalname}>
                {item.originalname}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(
                  item.created_at || item.createdAt
                ).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages} ({totalFiles} files)
        </div>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1 || loading}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
            const pageNumber =
              currentPage > 3 ? currentPage - 3 + index + 1 : index + 1;
            if (pageNumber <= totalPages) {
              return (
                <Button
                  key={index}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  size="icon"
                  onClick={() => paginate(pageNumber)}
                  disabled={loading}
                >
                  {pageNumber}
                </Button>
              );
            }
            return null;
          })}
          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage >= totalPages || loading}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileComp;
