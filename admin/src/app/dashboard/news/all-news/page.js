"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Api from "@/utils/Api";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AlertCircle, Edit, Trash2 } from "lucide-react";

const Page = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const pathUrl = "/dashboard/news/all-news";
  const editUrl = "/dashboard/news/edit";
  const router = useRouter();
  const AuthToken = Cookies.get("adminToken");

  const fetchBlogs = async (page, perPage) => {
    Api.get(`admin/blog?page=${page}&perPage=${perPage}`)
      .then((res) => {
        const data = res.data.allBlogs;
        const totalPages = res.data.totalPages;
        const page = res.data.page;
        setNews(data);
        setTotalPages(totalPages);
        setCurrentPage(page)
        setLoading(false);
      })
      .catch((err) => {
        console.log("error==", err);
        const error = "Something went wrong, Try again later";
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBlogs(currentPage, 10);
  }, [currentPage]);

  const handlePageIncrement = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageDecrement = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    setIsDeleting(true);

    try {
      const res = await Api.delete(`admin/blog/delete`, {
        data: { id: itemToDelete },
        headers: {
          Authorization: `Bearer ${String(AuthToken)}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status >= 200 && res.status < 300) {
        // Refresh the data
        fetchBlogs(currentPage, 10);
        setDeleteDialogOpen(false);
        setItemToDelete(null);
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
      setError("Failed to delete the post. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-[80vh]">
        <AlertCircle className="h-16 w-16 text-destructive" />
        <h1 className="text-3xl font-bold text-destructive">{error}</h1>
        <Button onClick={() => fetchBlogs(currentPage, 10)}>Try Again</Button>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">All News</h1>
        <Button onClick={() => router.push("/dashboard/news/create-news")}>
          Add New Post
        </Button>
      </div>

      <Separator className="mb-8" />

      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <Skeleton className="h-[250px] w-full rounded-lg" />
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="space-x-2">
                      <Skeleton className="h-9 w-16 inline-block" />
                      <Skeleton className="h-9 w-16 inline-block" />
                    </div>
                    <Skeleton className="h-5 w-32" />
                  </div>
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {news.map((item) => (
            <Card key={item._id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  <div className="overflow-hidden rounded-lg">
                    <Link href={`${pathUrl}/${item._id}`}>
                      <img
                        src={item.blogimage || "/placeholder.svg"}
                        alt={item.title}
                        className="object-cover object-center w-full h-[250px] transition-transform hover:scale-105"
                      />
                    </Link>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              router.push(`${editUrl}/${item.slug}`)
                            }
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteClick(item.slug)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(item.createdAt).toLocaleDateString()} at{" "}
                          {new Date(item.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium line-clamp-2 capitalize">
                          <Link
                            href={`${pathUrl}/${item._id}`}
                            className="hover:underline"
                          >
                            {item.title}
                          </Link>
                        </h3>
                        <p className="mt-2 text-muted-foreground line-clamp-3">
                          {item.shortdescription}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={handlePageDecrement}
                  disabled={currentPage <= 1}
                />
              </PaginationItem>
              <PaginationItem>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={handlePageIncrement}
                  disabled={currentPage >= totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Page;
