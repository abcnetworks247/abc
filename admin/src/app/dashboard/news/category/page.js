"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Edit, Trash2 } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NewsCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editCategory, setEditCategory] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const token = Cookies.get("adminToken");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}admin/category/news/category`
      );
      if (response.status === 200) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCreateCategory = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}admin/category/news/category`,
        { name: newCategoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        setNewCategoryName("");
        fetchCategories();
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleEditCategory = async () => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}admin/category/news/category`,
        { id: editCategory.id, name: editCategory.name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setIsEditDialogOpen(false);
        fetchCategories();
      }
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}admin/category/news/category`,
        {
          data: { id: categoryToDelete },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setIsDeleteDialogOpen(false);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCategories(items);
  };

  return (
    <div className="flex flex-col md:flex-row items-start justify-between gap-10 px-5 mt-10">
      <div className="flex flex-col items-start justify-start w-full p-8">
        <h1 className="mb-4 ml-5 text-lg font-semibold">All News Categories</h1>

        <div className="w-full overflow-hidden bg-white shadow sm:rounded-md overflow-y-auto max-h-[60vh]">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="categories">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {categories.map((category, index) => (
                    <Draggable
                      key={category._id}
                      draggableId={category._id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="border-b border-gray-200"
                        >
                          <div className="px-4 py-3 sm:px-6">
                            <div className="flex items-center justify-between">
                              <p className="max-w-2xl mt-1 text-sm font-semibold text-gray-500">
                                {category.name}
                              </p>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <p className="text-sm font-medium text-gray-500">
                                Status:{" "}
                                <span className="text-green-600">Active</span>
                              </p>

                              <div className="flex flex-row items-start gap-4">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                          setEditCategory({
                                            id: category._id,
                                            name: category.name,
                                          });
                                          setIsEditDialogOpen(true);
                                        }}
                                      >
                                        <Edit className="h-4 w-4 text-indigo-500" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Edit</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                          setCategoryToDelete(category._id);
                                          setIsDeleteDialogOpen(true);
                                        }}
                                      >
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Delete</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center justify-start">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm">
            <h1 className="mb-4 text-lg font-semibold">
              Create A News Category
            </h1>
            <p className="mb-6 text-sm text-gray-600">
              This news category will be associated with your product when
              created.
            </p>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Write here..."
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:border-blue-500"
              />
            </div>
            <Button className="w-full" onClick={handleCreateCategory}>
              Save
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <Input
            value={editCategory?.name || ""}
            onChange={(e) =>
              setEditCategory({ ...editCategory, name: e.target.value })
            }
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditCategory}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCategory}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default NewsCategoriesPage;
