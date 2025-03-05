import { Metadata } from "next";
import Api from "@/utils/Api";
import BlogPostClient from "./blog-post-client";

// This function generates metadata for the page
export async function generateMetadata({ params }, parent) {
  // Fetch blog data
  try {
    const res = await Api.get(`admin/blog/${params.slug}`);
    const blog = res.data.blogdata;

    const baseUrl =
      process.env.NEXT_PUBLIC_CLIENT_URL || "https://yourdomain.com";

    return {
      title: blog.title,
      description: blog.shortdescription,
      openGraph: {
        title: blog.title,
        description: blog.shortdescription,
        images: [blog.blogimage],
        url: `${baseUrl}/blog/${params.slug}`,
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: blog.shortdescription,
        images: [blog.blogimage],
      },
    };
  } catch (error) {
    console.error("Error fetching blog metadata:", error);
    return {
      title: "Blog Post",
      description: "ABC Networks 24 Blog",
    };
  }
}

// Server component that fetches data and passes it to the client component
export default async function BlogPostPage({ params }) {
  try {
    // Fetch blog data on the server
    const res = await Api.get(`admin/blog/${params.slug}`);
    const blogData = res.data.blogdata;

    // Pass the pre-fetched data to the client component
    return <BlogPostClient initialBlogData={blogData} slug={params.slug} />;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    // Still render the client component, which will handle the error state
    return <BlogPostClient initialBlogData={null} slug={params.slug} />;
  }
}
