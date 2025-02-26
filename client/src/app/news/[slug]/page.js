"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Api from "@/utils/Api";
import Navbar from "@/components/navbar/Navbar";
import FooterComp from "@/components/Footer/FooterComp";
import Sidebar from "@/components/sidebar/Sidebar";
import Nav1 from "@/components/navbar/Nav1";
import { Share2, Home } from "lucide-react";

function NewsArticlePage() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [newsType, setNewsType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pathUrl = "/blog";

  const fetchData = useCallback(async () => {
    try {
      const res = await Api.get(`admin/blog/news/${slug}`);
      const newData = res.data.data;
      const type = res.data.name;

      console.log("slug", slug);

      setData(newData);
      setNewsType(type);

      if (res.data.data.length === 0) {
        setError("No data found");
      }

      setLoading(false);
    } catch (err) {
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav1 />
      <div className="bg-[#111827] sticky top-0 z-[10]">
        <Navbar />
      </div>
      <Sidebar />
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage error={error} />
        ) : (
          <NewsContent newsType={newsType} data={data} pathUrl={pathUrl} />
        )}
      </main>
      <FooterComp />
    </div>
  );
}

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-[70vh]">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const ErrorMessage = ({ error }) => (
  <div className="max-w-3xl mx-auto text-center flex flex-col items-center h-[48vh]">
    <h1 className="text-3xl font-bold mb-4">Not Found</h1>
    <p className="text-lg mb-28">
      We're sorry, but the category is unavailable at this moment, refresh to try again
    </p>
    <Link href="/" passHref>
      <Button className="flex items-center ">
        <Home className="mr-2 h-4 w-4" />
        Return to Home
      </Button>
    </Link>
  </div>
);

const NewsContent = ({ newsType, data, pathUrl }) => (
  <>
    <h1 className="text-xs lg:text-sm font-bold mb-6 text-gray-800">
      Results for: {newsType}
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data &&
        data.map((item) => (
          <NewsCard key={item._id} item={item} pathUrl={pathUrl} />
        ))}
    </div>
  </>
);

const NewsCard = ({ item, pathUrl }) => {
  const formattedDate = format(new Date(item.createdAt), "MMMM d, yyyy");

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48">
        <Image
          src={item.blogimage || "/placeholder.svg"}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="transition-all duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <span className="text-xs font-semibold text-blue-600 uppercase">
          {item.category}
        </span>
        <Link
          href={`${pathUrl}/${item.slug}`}
          className="block mt-2 hover:underline"
        >
          <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
            {item.title}
          </h2>
        </Link>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {item.shortdescription}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-gray-500">{formattedDate}</span>
          <Link
            href={`${pathUrl}/${item.slug}`}
            className="text-blue-500 hover:underline"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsArticlePage;
