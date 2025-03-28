"use client";

import Image from "next/image";
import { useState, useEffect, useMemo, useCallback } from "react";
import { UseFileManager } from "@/context/FileManagerProvidert";
import PopUpFilemanager from "@/components/filemanager/PopUpFilemanager";
import Api from "@/utils/Api";
import Cookies from "js-cookie";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { Loader2, ImagePlus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditNewsPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [html, setHtml] = useState("");
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [type, setType] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newType, setNewType] = useState("");
  const [category, setCategory] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);
  const [blogId, setBlogId] = useState("");

  const JoditEditor = useMemo(
    () => dynamic(() => import("jodit-react"), { ssr: false }),
    []
  );

  const router = useRouter();
  const { slug } = useParams();
  const { handleOpen, size } = UseFileManager();
  const AuthToken = Cookies.get("adminToken");

  const fetchData = useCallback(async () => {
    try {
      const [typeRes, catRes, postRes] = await Promise.all([
        Api.get("admin/category/news/type"),
        Api.get("admin/category/news/category"),
        Api.get(`admin/blog/${slug}`),
      ]);

      if (typeRes.status === 200) {
        setType(typeRes.data.data);
      }

      if (catRes.status === 200) {
        setCategory(catRes.data.data);
      }

      if (postRes.status === 200) {
        const data = postRes.data.blogdata;
        setTitle(data.title);
        setShortDescription(data.shortdescription);
        setHtml(data.longdescription);
        setNewType(data.type);
        setNewCategory(data.category);
        setImageSrc(data.blogimage);
        setBlogId(data._id); // Store the blog ID
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load post data");
      toast.error("Failed to load post data");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title || !newType || !newCategory || !shortDescription || !html) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!imageSrc) {
      toast.error("Please upload a featured image");
      return;
    }

    if (!blogId) {
      toast.error("Blog ID not found. Please try again.");
      return;
    }

    const toastId = toast.loading("Updating post...");
    setSubmitting(true);

    try {
      const response = await Api.patch(
        "admin/blog/update",
        {
          blogid: blogId, // Use the stored blogId instead of undefined 'id'
          title,
          shortdescription: shortDescription,
          longdescription: html,
          category: newCategory,
          type: newType,
          blogimage: imageSrc,
        },
        {
          headers: {
            Authorization: `Bearer ${AuthToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Post updated successfully", { id: toastId });
        // Add a small delay before redirecting
        setTimeout(() => {
          router.push("/dashboard/news/all-news");
        }, 1500);
      }
    } catch (error) {
      console.error("Update error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update post";
      toast.error(errorMessage, { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-[180px]" />
            <Skeleton className="h-4 w-[300px] mt-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </div>
            <Skeleton className="h-32" />
            <Skeleton className="h-[400px]" />
            <Skeleton className="h-[200px] w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-4xl mx-auto p-6">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => fetchData()}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit News Post</CardTitle>
          <CardDescription>
            Make changes to your news post.
            {newType && newCategory && (
              <span className="text-muted-foreground ml-1">
                Current: {newType} - {newCategory}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={newType} onValueChange={setNewType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {type.map((item) => (
                      <SelectItem key={item._id} value={item.slug}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={newCategory}
                  onValueChange={setNewCategory}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {category.map((item) => (
                      <SelectItem key={item._id} value={item.slug}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Textarea
                id="shortDescription"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Enter a brief description"
                className="h-20 resize-none"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Full Details</Label>
              <div className="border rounded-lg overflow-hidden">
                <JoditEditor
                  value={html}
                  onChange={(content) => setHtml(content)}
                  className="min-h-[400px]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Featured Image</Label>
              {!imageSrc ? (
                <a href="#value=newsimage">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-32"
                    onClick={() => handleOpen("lg")}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <ImagePlus className="h-8 w-8 mb-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Click to upload image
                      </span>
                      <span className="text-xs text-muted-foreground mt-1">
                        PNG, JPG, GIF up to 10MB
                      </span>
                    </div>
                  </Button>
                </a>
              ) : (
                <div className="relative rounded-lg overflow-hidden border">
                  <Image
                    src={imageSrc || "/placeholder.svg"}
                    alt="Preview"
                    width={800}
                    height={400}
                    className="w-full h-[300px] object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => setImageSrc(null)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {submitting ? "Updating..." : "Update Post"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <PopUpFilemanager
        handleOpen={handleOpen}
        size={size}
        setImageSrc={setImageSrc}
      />
    </div>
  );
}
