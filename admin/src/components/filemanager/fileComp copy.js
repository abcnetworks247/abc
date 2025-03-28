"use client";

import { useState } from "react";
import axios from "axios";
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

const FileComp = ({ fileData, token }) => {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [checkurl, setCheckUrl] = useState([]);
  const [sortOption, setSortOption] = useState("newest");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

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
          try {
            const response = await axios.delete(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/account`,
              {
                headers: {
                  Authorization: `Bearer ${String(token)}`,
                },
              }
            );

            if (response.status === 200) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });

              // Refresh the page or update the state
              if (typeof window !== "undefined") {
                window.location.reload();
              }
            }
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
            console.error("Error deleting file:", error);
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
      }).then((result) => {
        if (result.isConfirmed) {
          // Implement bulk delete logic here
          Swal.fire({
            title: "Deleted!",
            text: "Your files have been deleted.",
            icon: "success",
          });
          setCheckUrl([]);
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSelectAll = () => {
    setCheckUrl((prevCheckurl) => {
      if (prevCheckurl.length === currentItems.length) {
        return [];
      } else {
        return [...currentItems];
      }
    });
  };

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
    setSortOrder("asc");
  };

  // Sorting logic
  const sortedItems = Array.isArray(fileData)
    ? [...fileData].sort((a, b) => {
        const aValue = a[sortOption] ?? "";
        const bValue = b[sortOption] ?? "";

        if (sortOrder === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      })
    : [];

  // Filtering logic
  const filteredItems = sortedItems.filter((item) =>
    item.originalname?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            checked={
              checkurl.length === currentItems.length && currentItems.length > 0
            }
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
              disabled={checkurl.length === 0}
              className="flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>

            <Select value={sortOption} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Sort By Newest</SelectItem>
                <SelectItem value="oldest">Sort By Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search files..."
              className="pl-8 w-full md:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentItems.map((item) => (
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
                />

                {checkurl.length === 0 && (
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleSingleDelete(item._id)}
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
                {new Date(item.createdAt).toLocaleDateString()}
                new data {item.createdAt}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}
        </div>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({
            length: Math.min(5, Math.ceil(filteredItems.length / itemsPerPage)),
          }).map((_, index) => {
            const pageNumber =
              currentPage > 3 ? currentPage - 3 + index + 1 : index + 1;
            if (pageNumber <= Math.ceil(filteredItems.length / itemsPerPage)) {
              return (
                <Button
                  key={index}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  size="icon"
                  onClick={() => paginate(pageNumber)}
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
            disabled={indexOfLastItem >= filteredItems.length}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileComp;
