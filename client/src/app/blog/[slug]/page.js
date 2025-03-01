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
import { Toaster } from "sonner";

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

function ShareModal({ isOpen, onClose, url, title, image }) {
  if (!isOpen) return null;

  const shareData = {
    title: title,
    url: url,
  };

  const shareLinks = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      icon: "📘",
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
      icon: "🐦",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      icon: "💼",
    },
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
      icon: "📱",
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Share this article</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden">
              {image && (
                <Image
                  src={image || "/placeholder.svg"}
                  alt={title}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium line-clamp-2">{title}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-4">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              <span className="text-2xl mb-1">{link.icon}</span>
              <span className="text-xs">{link.name}</span>
            </a>
          ))}
        </div>

        <div className="flex flex-col space-y-3">
          <div className="flex rounded-md overflow-hidden border">
            <input
              type="text"
              value={url}
              readOnly
              className="flex-1 px-3 py-2 text-sm focus:outline-none"
            />
            <button
              onClick={copyToClipboard}
              className="bg-gray-100 px-3 text-sm font-medium hover:bg-gray-200"
            >
              Copy
            </button>
          </div>

          {navigator.share && (
            <Button onClick={nativeShare} className="w-full">
              Share via device
            </Button>
          )}
        </div>
      </div>
    </div>
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
