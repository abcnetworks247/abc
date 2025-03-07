"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Edit, GripVertical, Loader2, Trash2, LinkIcon } from "lucide-react";
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

export default function NewsUpdatesPage() {
  const [newsUpdates, setNewsUpdates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editLink, setEditLink] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const token = Cookies.get("adminToken");
  const listRef = useRef(null);
  const sortableRef = useRef(null);

  const fetchNewsUpdates = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}admin/category/news/update`
      );
      if (response.status === 200) {
        const sortedUpdates = response.data.data.sort(
          (a, b) => a.position - b.position
        );
        setNewsUpdates(sortedUpdates);
      }
    } catch (error) {
      toast.error("Failed to fetch news updates");
    }
  }, []);

  useEffect(() => {
    fetchNewsUpdates();
  }, [fetchNewsUpdates]);

  useEffect(() => {
    if (listRef.current && newsUpdates.length > 0) {
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
              description: "News update order is being updated",
            });
            console.log("new order", newOrder);
            const response = await axios.put(
              `${process.env.NEXT_PUBLIC_SERVER_URL}admin/category/news/update/reorder`,
              { ids: newOrder },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.status === 200) {
              setNewsUpdates(response.data.data);
            }
          } catch (error) {
            console.error("Error updating positions:", error);
            fetchNewsUpdates(); // Revert to original order on error
          } finally {
            setLoading2(false);
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
  }, [newsUpdates, token, fetchNewsUpdates]);

  const handleCreate = async () => {
    if (!title.trim() || !link.trim()) {
      toast.error("Please enter both title and link");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}admin/category/news/update`,
        { title, link },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setTitle("");
        setLink("");
        fetchNewsUpdates();
        toast.success("News update created successfully");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!editTitle.trim() || !editLink.trim()) {
      toast.error("Please enter both title and link");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}admin/category/news/update`,
        {
          id: selectedItem.id,
          title: editTitle,
          link: editLink,
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
        fetchNewsUpdates();
        toast.success("News update modified successfully");
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
        `${process.env.NEXT_PUBLIC_SERVER_URL}admin/category/news/update`,
        {
          data: { id: selectedItem.id },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setIsDeleteOpen(false);
      fetchNewsUpdates();
      toast.success("News update deleted successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start justify-between gap-10 px-5 mt-10 md:flex-row lg:h-80vh overflow-hidden">
      <div className="flex flex-col items-start justify-start w-full p-8">
        <h1 className="mb-4 ml-5 text-xl font-semibold">All News Updates</h1>

        <div className="w-full bg-white shadow-sm rounded-lg overflow-hidden border">
          <div className="bg-muted/30 px-4 py-3 border-b">
            <div className="grid grid-cols-12 gap-4 font-medium text-sm text-muted-foreground">
              <div className="col-span-1"></div>
              <div className="col-span-1">Position</div>
              <div className="col-span-5">Title</div>
              <div className="col-span-3">Link</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
          </div>
          <div className="overflow-y-auto max-h-[50vh]">
            <ul ref={listRef} className="divide-y">
              {newsUpdates.map((item, index) => (
                <li
                  key={item._id}
                  id={item._id}
                  className="bg-background hover:bg-muted/20 transition-colors"
                >
                  <div className="px-4 py-3">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1">
                        <span className="handle cursor-grab active:cursor-grabbing flex justify-center">
                          <GripVertical className="w-5 h-5 text-muted-foreground" />
                        </span>
                      </div>
                      <div className="col-span-1">
                        <Badge variant="outline" className="w-8 justify-center">
                          {index + 1}
                        </Badge>
                      </div>
                      <div className="col-span-5">
                        <p className="text-sm font-medium truncate">
                          {item.title}
                        </p>
                      </div>
                      <div className="col-span-3 flex items-center">
                        <LinkIcon className="w-3.5 h-3.5 text-muted-foreground mr-1.5" />
                        <p className="text-sm text-muted-foreground truncate">
                          {item.link}
                        </p>
                      </div>
                      <div className="col-span-2 flex items-center justify-end">
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
                                      title: item.title,
                                      link: item.link,
                                    });
                                    setEditTitle(item.title);
                                    setEditLink(item.link);
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
                                      title: item.title,
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
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {newsUpdates.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No news updates found. Create your first one.
            </div>
          )}
        </div>
      </div>

      <div className="w-full lg:mt-16">
        <div className="flex items-center justify-start">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Create News Update</h2>
            <p className="text-sm text-muted-foreground mb-6">
              This news update will be displayed in the marquee on your website.
            </p>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="text-sm font-medium mb-1.5 block"
                >
                  Title
                </label>
                <Input
                  id="title"
                  placeholder="Enter news update title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="link"
                  className="text-sm font-medium mb-1.5 block"
                >
                  Link
                </label>
                <Input
                  id="link"
                  placeholder="Enter news update link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
              <Button
                className="w-full"
                onClick={handleCreate}
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save News Update
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit News Update</DialogTitle>
            <DialogDescription>
              Make changes to the news update here.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <label
                htmlFor="editTitle"
                className="text-sm font-medium mb-1.5 block"
              >
                Title
              </label>
              <Input
                id="editTitle"
                placeholder="Enter news update title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="editLink"
                className="text-sm font-medium mb-1.5 block"
              >
                Link
              </label>
              <Input
                id="editLink"
                placeholder="Enter news update link"
                value={editLink}
                onChange={(e) => setEditLink(e.target.value)}
              />
            </div>
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
              news update.
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
