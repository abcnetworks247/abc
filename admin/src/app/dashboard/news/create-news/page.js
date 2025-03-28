"use client";

import Image from "next/image";
import { useState, useEffect, useMemo, useCallback } from "react";
import { UseFileManager } from "@/context/FileManagerProvidert";
import PopUpFilemanager from "@/components/filemanager/PopUpFilemanager";
import Api from "@/utils/Api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
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

function Page() {
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

  const JoditEditor = useMemo(
    () => dynamic(() => import("jodit-react"), { ssr: false }),
    []
  );

  const router = useRouter();
  const { handleOpen, size } = UseFileManager();
  const AuthToken = Cookies.get("adminToken");

  function onChange(newContent) {
    setHtml(newContent);
  }

  async function handleUpload(e) {
    e.preventDefault();

    if (!title || !newType || !newCategory || !shortDescription || !html) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!imageSrc) {
      toast.error("Please upload a featured image");
      return;
    }

    const data = {
      title,
      type: newType,
      category: newCategory,
      shortdescription: shortDescription,
      longdescription: html,
      blogimage: imageSrc,
    };

    const toastId = toast.loading("Creating news post...");
    setSubmitting(true);

    try {
      const response = await Api.post("admin/blog/create", data, {
        headers: { Authorization: `Bearer ${AuthToken}` },
      });

      if (response.status === 201) {
        toast.success("News post created successfully", { id: toastId });
        // Add a small delay before redirecting to ensure the toast is visible
        setTimeout(() => {
          router.push("/dashboard/news/all-news");
        }, 1500);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(`Error: ${errorMessage}`, { id: toastId });
    } finally {
      setSubmitting(false);
    }
  }

  const fetchData = useCallback(async () => {
    try {
      const [typeRes, catRes] = await Promise.all([
        Api.get("admin/category/news/type"),
        Api.get("admin/category/news/category"),
      ]);

      if (catRes.status === 200) {
        setCategory(catRes.data.data);
      }
      if (typeRes.status === 200) {
        setType(typeRes.data.data);
      }
    } catch (error) {
      toast.error("Failed to load categories and types");
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto p-6 space-y-6">
        <Skeleton className="h-8 w-[200px]" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[150px]" />
            <Skeleton className="h-4 w-[300px]" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </div>
            <Skeleton className="h-32" />
            <Skeleton className="h-[400px]" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create News Post</CardTitle>
          <CardDescription>
            Create a new news post with title, description, and content.
            {newCategory && newType && (
              <span className="text-muted-foreground">
                {" "}
                Selected: {newCategory} - {newType}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                placeholder="Enter a brief description"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                required
                className="h-20"
              />
            </div>

            <div className="space-y-2">
              <Label>Full Details</Label>
              <div className="border rounded-md">
                <JoditEditor
                  value={html}
                  onChange={onChange}
                  className="min-h-[400px]"
                />
              </div>
            </div>

            <div className="space-y-4">
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
                <div className="relative rounded-lg overflow-hidden">
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

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {submitting ? "Creating..." : "Create Post"}
            </Button>
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

export default Page;
