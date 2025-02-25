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
import ShareModal from "@/components/ShareModal";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Nav1 from "@/components/navbar/Nav1";
import { Toaster } from "sonner";
import SEOHead from "@/components/SEOHEAD";

export default function BlogPost() {
  const [blog, setBlog] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const { slug } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await Api.get(`admin/blog/${slug}`);
        const data = res.data.blogdata;
        setBlog(data);
        setAuthor(data.author);
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
  }, [slug]);

  if (loading) {
    return <BlogPostSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEOHead
        title={blog ? blog.title : "Blog Post Not Found"}
        description={
          blog
            ? blog.shortdescription
            : "The requested blog post could not be found."
        }
        image={blog ? blog.blogimage : "/placeholder.svg"}
        url={`${process.env.NEXT_PUBLIC_CLIENT_URL}blog/${slug}`}
      />
      <Nav1 />
      <div className="bg-[#111827] sticky top-0 z-[10] mb-10">
        <Navbar />
      </div>
      <main className="container mx-auto px-4 py-8 flex-grow">
        {blog ? (
          <BlogContent blog={blog} setShareModalOpen={setShareModalOpen} />
        ) : (
          <NotFound />
        )}
      </main>
      <FooterComp />
      {blog && (
        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          url={`${process.env.NEXT_PUBLIC_CLIENT_URL}blog/${slug}`}
          title={blog.title}
          image={blog.blogimage}
        />
      )}
      <Toaster />
    </div>
  );
}

function BlogContent({ blog, setShareModalOpen }) {
  const formattedDate = format(new Date(blog.createdAt), "MMMM d, yyyy");

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
