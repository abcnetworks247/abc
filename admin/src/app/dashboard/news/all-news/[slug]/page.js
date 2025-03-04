"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import axios from "axios";
// import useParams fron next/navigation
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import Api from "@/utils/Api";

export default function BlogCard() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { slug } = useParams();
  useEffect(() => {
    Api.get(`admin/blog/${slug}`)
      .then((res) => {
        const data = res.data.blogdata;
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, []);
  const editUrl = "/dashboard/news/edit";
  const router = useRouter();

  if (error === true) {
    return (
      // create a professinal error page
      <div className="flex flex-col items-center justify-center gap-3 h-full">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="text-xl font-semibold text-gray-500 ">
          Please check your internet connection and try again
        </p>
        {/* internet error svg */}
      </div>
    );
  }
  return (
    <main className="flex items-center justify-center my-10">
      {loading ? (
        <div className="flex items-center justify-center h-[70svh] lg:h-full">
          <svg
            className="w-20 h-20 mr-3 -ml-1 text-blue-500 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>
      ) : (
          
        <Card className="lg:max-w-[70%] max-w-[90%] overflow-hidden">
          <div className="flex items-end justify-end m-0">
            <button
              onClick={() => {
                router.push(`${editUrl}/${news.slug}`);
              }}
              className=" mb-0.5 font-semibold border text-sm border-indigo-500 bg-indigo-500 px-5 py-1 text-[10px] mr-0 text-white"
            >
              Edit
            </button>
          </div>

          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded flex items-center justify-center  lg:h-72 md:h-72 h-72 w-full`"
          >
            <img src={news.blogimage} alt="ui/ux review check" className="object-cover object-center w-full" />
          </CardHeader>
          <CardBody>
            <Typography variant="h4" color="blue-gray">
              {news.title}
            </Typography>

            <Typography
              variant="lead"
              color="gray"
              className="mt-3 font-normal"
            >
              {parse(`${news.longdescription}`)}
            </Typography>
          </CardBody>
          <CardFooter className="flex items-center justify-between">
            <div className="flex items-center -space-x-3">
              <Tooltip content="Natali Craig">
                <Avatar
                  size="sm"
                  variant="circular"
                  alt="natali craig"
                  src={news.blogimage}
                  className="border-2 border-white hover:z-10"
                />
              </Tooltip>
              <Tooltip content="Tania Andrew">
                <Avatar
                  size="sm"
                  variant="circular"
                  alt="tania andrew"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  className="border-2 border-white hover:z-10"
                />
              </Tooltip>
            </div>
            <Typography className="font-normal">2 days ago</Typography>
          </CardFooter>
        </Card>
      )}
    </main>
  );
}
