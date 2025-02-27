"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Edit, GripVertical, Loader2, Trash2 } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import Sortable from "sortablejs";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

export default function NewsTypesPage() {
  const [newsTypes, setNewsTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [name, setName] = useState("");
  const [editName, setEditName] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const token = Cookies.get("adminToken");
  const listRef = useRef(null);
  const sortableRef = useRef(null);

  const fetchNewsTypes = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}admin/category/news/type`
      );
      if (response.status === 200) {
        const sortedTypes = response.data.data.sort(
          (a, b) => a.position - b.position
        );
        setNewsTypes(sortedTypes);
      }
    } catch (error) {
      toast.error("Failed to fetch news types");
    }
  }, []);

  useEffect(() => {
    fetchNewsTypes();
  }, [fetchNewsTypes]);

  useEffect(() => {
    if (listRef.current && newsTypes.length > 0) {
      if (sortableRef.current) {
        sortableRef.current.destroy();
      }
      sortableRef.current = new Sortable(listRef.current, {
        animation: 150,
        handle: ".handle",
        
        onEnd: async (evt) => {
          const newOrder = Array.from(listRef.current.children).map(
            (child) => child.id
          );
          try {
            setLoading2(true);
            toast("Updating...", {
              description: "news type is being updated",
            });
            console.log("new order", newOrder);
            const response = await axios.put(
              `${process.env.NEXT_PUBLIC_SERVER_URL}admin/category/news/type/reorder`,
              { ids: newOrder },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.status === 200) {
              setNewsTypes(response.data.data);
            }
          } catch (error) {
            console.error("Error updating positions:", error);
            fetchNewsTypes(); // Revert to original order on error
          } finally {
            setLoading(false);
          }
        },
      });
    }

    return () => {
      if (sortableRef.current) {
        sortableRef.current.destroy();
        sortableRef.current = null;
      }
    };
  }, [newsTypes, token, fetchNewsTypes]);

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error("Please enter a name");
      return;
    }

    try {
      setLoading(true);
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
        toast.success("News type created successfully");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!editName.trim()) {
      toast.error("Please enter a name");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}admin/category/news/type`,
        {
          id: selectedItem.id,
          name: editName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setIsEditOpen(false);
        fetchNewsTypes();
        toast.success("News type updated successfully");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}admin/category/news/type`,
        {
          data: { id: selectedItem.id },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setIsDeleteOpen(false);
      fetchNewsTypes();
      toast.success("News type deleted successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start justify-between gap-10 px-5 mt-10 md:flex-row lg:h-80vh overflow-hidden">
      <div className="flex flex-col items-start justify-start w-full p-8">
        <h1 className="mb-4 ml-5 text-base font-semibold">All News Types</h1>

        <div className="w-full bg-white shadow-sm rounded-lg overflow-y-auto max-h-[50vh] border">
          <ul ref={listRef} className="">
            {newsTypes.map((item, index) => (
              <li key={item._id} id={item._id} className="bg-background">
                <div className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="handle cursor-grab active:cursor-grabbing">
                        <GripVertical className="w-5 h-5 text-muted-foreground" />
                      </span>
                      <Badge variant="outline" className="w-8 justify-center">
                        {index + 1}
                      </Badge>
                      <p className="text-sm font-medium">{item.name}</p>
                    </div>
                    <TooltipProvider>
                      <div className="flex items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedItem({
                                  id: item._id,
                                  name: item.name,
                                });
                                setEditName(item.name);
                                setIsEditOpen(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedItem({
                                  id: item._id,
                                  name: item.name,
                                });
                                setIsDeleteOpen(true);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Delete</TooltipContent>
                        </Tooltip>
                      </div>
                    </TooltipProvider>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full lg:mt-16">
        <div className="flex items-center justify-start">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Create News Type</h2>
            <p className="text-sm text-muted-foreground mb-6">
              This news type will be associated with your product when created.
            </p>
            <div className="space-y-4">
              <Input
                placeholder="Enter news type name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                className="w-full"
                onClick={handleCreate}
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit News Type</DialogTitle>
            <DialogDescription>
              Make changes to the news type here.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Enter news type name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleEdit} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              news type.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={loading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
