"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import parse from "html-react-parser";
import { Share2, MessageCircle, ThumbsUp, Eye } from "lucide-react";

import Api from "@/utils/Api";
import Navbar from "@/components/navbar/Navbar";
import FooterComp from "@/components/Footer/FooterComp";
import RelatedArticles from "@/components/relatedArticles/RelatedArticles";
import ShareModal from "@/components/ShareModal";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Nav1 from "@/components/navbar/Nav1";
import { Toaster } from "sonner";

export default function BlogPost() {
  const [blog, setBlog] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await Api.get(`admin/blog/${id}`);
        const data = res.data.blogdata;
        setBlog(data);
        setAuthor(data.author);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (loading) {
    return <BlogPostSkeleton />;
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8">Blog post not found.</div>
    );
  }

  const formattedDate = format(new Date(blog.createdAt), "MMMM d, yyyy");

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav1 />
      <div className="bg-[#111827] sticky top-0 z-[10] mb-10">
        <Navbar />
      </div>
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <figure>
            <img
              className="w-full h-[60vh] mb-6 rounded-lg"
              src={blog.blogimage}
            />
          </figure>
          <div className="p-6 md:p-8">
            <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage
                    src={"/placeholder.svg"}
                    alt={"ABC Networks 24"}
                  />
                  <AvatarFallback>"A"</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-base font-semibold text-gray-900">
                   ABC Networks 24
                  </p>
                  <p className="text-sm text-gray-600">{formattedDate}</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => setShareModalOpen(true)}
                className="flex items-center text-sm"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
            <div className="prose max-w-none text-base">
              {parse(blog.longdescription)}
            </div>
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" className="flex items-center text-sm">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  {blog.likes || 0}
                </Button>
                <Button variant="ghost" className="flex items-center text-sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {blog.comments?.length || 0}
                </Button>
                <span className="flex items-center text-gray-600 text-sm">
                  <Eye className="h-4 w-4 mr-2" />
                  {blog.views || 0} views
                </span>
              </div>
              <Button
                variant="outline"
                onClick={() => setShareModalOpen(true)}
                className="text-sm"
              >
                Share Article
              </Button>
            </div>
          </div>
        </article>

        <section className="max-w-4xl mx-auto mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Comments</h2>
          {/* Add comment form and list here */}
        </section>

        <section className="max-w-4xl mx-auto mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Related Articles
          </h2>
          <RelatedArticles id={id} />
        </section>
      </main>

      <FooterComp />

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        url={`${process.env.NEXT_PUBLIC_CLIENT_URL}/blog/${id}`}
        title={blog.title}
        image={blog.blogimage}
      />
      <Toaster />
    </div>
  );
}

function BlogPostSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav1 />
      <div className="bg-[#111827] sticky top-0 z-[10] mb-10">
        <Navbar />
      </div>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <Skeleton className="h-72 w-full" />
          <div className="p-6 md:p-8">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Skeleton className="h-10 w-10 rounded-full mr-3" />
                <div>
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <Skeleton className="h-9 w-20" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </main>
      <FooterComp />
    </div>
  );
}
