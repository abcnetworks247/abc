"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import parse from "html-react-parser";
import { Share2, Home } from "lucide-react";

import Api from "@/utils/Api";
import Navbar from "@/components/navbar/Navbar";
import FooterComp from "@/components/Footer/FooterComp";
import RelatedArticles from "@/components/relatedArticles/RelatedArticles";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Nav1 from "@/components/navbar/Nav1";
import { Toaster, toast } from "sonner";
import ShareModal from "@/components/ShareModal";
import Sidebar from "@/components/sidebar/Sidebar";

export default function BlogPost() {
  const [blog, setBlog] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const { slug } = useParams();
  const router = useRouter();
  const baseUrl =
    process.env.NEXT_PUBLIC_CLIENT_URL || "https://yourdomain.com";

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await Api.get(`admin/blog/${slug}`);
        const data = res.data.blogdata;
        setBlog(data);
        setAuthor(data.author);

        // Update document head for social media sharing
        if (data) {
          // This updates the document title
          document.title = data.title;

          // Find and update or create meta tags
          updateMetaTag("description", data.shortdescription);

          // Open Graph
          updateMetaTag("og:title", data.title, "property");
          updateMetaTag("og:description", data.shortdescription, "property");
          updateMetaTag("og:image", data.blogimage, "property");
          updateMetaTag("og:url", `${baseUrl}/blog/${slug}`, "property");
          updateMetaTag("og:type", "article", "property");

          // Twitter
          updateMetaTag("twitter:card", "summary_large_image", "name");
          updateMetaTag("twitter:title", data.title, "name");
          updateMetaTag("twitter:description", data.shortdescription, "name");
          updateMetaTag("twitter:image", data.blogimage, "name");
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }

    // Cleanup function to reset meta tags when component unmounts
    return () => {
      document.title = "ABC Networks 24";
      removeMetaTag("description");
      removeMetaTag("og:title", "property");
      removeMetaTag("og:description", "property");
      removeMetaTag("og:image", "property");
      removeMetaTag("og:url", "property");
      removeMetaTag("og:type", "property");
      removeMetaTag("twitter:card", "name");
      removeMetaTag("twitter:title", "name");
      removeMetaTag("twitter:description", "name");
      removeMetaTag("twitter:image", "name");
    };
  }, [slug, baseUrl]);

  // Helper function to update meta tags
  const updateMetaTag = (name, content, attributeName = "name") => {
    if (!content) return;

    // Try to find existing tag
    let meta = document.querySelector(`meta[${attributeName}="${name}"]`);

    // If it doesn't exist, create it
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute(attributeName, name);
      document.head.appendChild(meta);
    }

    // Set the content
    meta.setAttribute("content", content);
  };

  // Helper function to remove meta tags
  const removeMetaTag = (name, attributeName = "name") => {
    const meta = document.querySelector(`meta[${attributeName}="${name}"]`);
    if (meta) {
      meta.remove();
    }
  };

  if (loading) {
    return <BlogPostSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Nav1 />
       <div className="bg-[#111827] sticky top-0 z-[10] mb-10">
              <Navbar />
            </div>
            <Sidebar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {blog ? (
          <BlogContent
            blog={blog}
            shareModalOpen={shareModalOpen}
            setShareModalOpen={setShareModalOpen}
            slug={slug}
          />
        ) : (
          <NotFound />
        )}
      </main>
      <FooterComp />
      <Toaster />
    </div>
  );
}

function BlogContent({ blog, shareModalOpen, setShareModalOpen, slug }) {
  const formattedDate = format(new Date(blog.createdAt), "MMMM d, yyyy");
  const baseUrl =
    process.env.NEXT_PUBLIC_CLIENT_URL || "https://yourdomain.com";

  return (
    <>
      <article className="max-w-3xl mx-auto overflow-hidden">
        <figure>
          <Image
            className="w-full h-[50vh] mb-6 rounded-lg object-cover"
            src={blog.blogimage || "/placeholder.svg"}
            alt={blog.title}
            width={1200}
            height={600}
            priority
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
                  src={
                    "http://abcnetworks24.com/_next/static/media/AbcstudioNo.b0321c29.png"
                  }
                  alt={"ABC Networks 24"}
                />
                <AvatarFallback>A</AvatarFallback>
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

      <aside
        aria-label="Related articles"
        className="px-5 py-8 overflow-hidden"
      >
        <div className="max-w-screen-xl px-4 mx-auto"></div>
        <div className="">
          <RelatedArticles slug={blog.slug} />
        </div>
      </aside>

      {shareModalOpen && (
        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          url={`${baseUrl}/blog/${slug}`}
          title={blog.title}
          image={blog.blogimage}
        />
      )}
    </>
  );
}



function NotFound() {
  return (
    <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
      <p className="text-lg mb-28">
        We're sorry, but the blog post you're looking for doesn't exist or has
        been removed.
      </p>
      <Link href="/" passHref>
        <Button className="flex items-center ">
          <Home className="mr-2 h-4 w-4" />
          Return to Home
        </Button>
      </Link>
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
