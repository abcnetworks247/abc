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
export default function BlogCard() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const baseUrl =
    "https://klipto-inc-abcstudio-server.onrender.com/api/v1/client/blog";
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${baseUrl}/${id}`)
      .then((res) => {
        const data = res.data.blogdata;
        console.log(data);
        console.log(id);
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (error === true) {
    return (
      // create a professinal error page
      <div className="flex justify-center items-center h-96 flex-col gap-3">
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
        <div className="flex justify-center items-center h-96">
          <svg
            className="animate-spin -ml-1 mr-3 h-20 w-20 text-blue-500"
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
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none"
        >
          <img
            src={news.blogimage}
            alt="ui/ux review check"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h4" color="blue-gray">
            {news.title}
          </Typography>
          <Typography variant="lead" color="gray" className="mt-3 font-normal">
            {news.longdescription}
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
          <Typography className="font-normal">
            2 days ago
          </Typography>
        </CardFooter>
      </Card>

      )}
    </main>
  );
}
