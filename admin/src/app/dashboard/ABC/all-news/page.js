"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState} from "react";



const Page = () => {
  const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const baseUrl = "https://klipto-inc-abcstudio-server.onrender.com/api/v1";
    const pathUrl = "/dashboard/abc/all-news";

    useEffect(() => {
        axios
            .get(`${baseUrl}/client/blog`)
            .then((res) => {
                const data = res.data.allblog;
                setNews(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setError(true)
            });
    }, []);
    if (error === true) {
        return (
            // create a professinal error page
            <div className="flex flex-col items-center justify-center gap-3 h-96">
                <h1 className="text-3xl font-bold">Something went wrong</h1>
                <p className="text-xl font-semibold text-gray-500 ">
                    Please check your internet connection and try again
                </p>
                {/* internet error svg */}

            </div>
        )
    }
  return (
    <main className="px-5 mt-10">
        <h1 className="text-3xl font-bold">All News</h1>
        <br />
        {
            loading ? (
                <div className="flex items-center justify-center h-96">
                    <svg
                        className="w-20 h-20 mr-3 -ml-1 text-blue-500 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24">
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
                <div className="flex flex-col gap-4">
                    {news.map((item) => (
                        <div className="flex flex-col items-center justify-between w-full p-2 my-3 rounded shadow-sm lg:h-44 lg:flex-row lg:my-4">
                            <Link href={`${pathUrl}/${item._id}`}>
                            <div className="w-full h-40 rounded  lg:w-80 lg:h-36">
                                <img
                                    src={item.blogimage}
                                    alt={item.title}
                                    className="object-cover w-full h-full rounded"
                                />
                            </div>
                            </Link>
                            <div className="px-3 h-36">
                            <Link href={`${pathUrl}/${item._id}`}>
                                <h1 className="text-xl font-bold">{item.title}</h1>
                            </Link>
                                <br  /><br className="hidden lg:block"/>
                                <p className="text-sm">{item.shortdescription}</p>
                            </div>
                            <div className="flex justify-end w-full gap-3 lg:w-auto lg:justify-normal">
                                <button className="flex flex-row items-center px-1 py-1 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700 lg:font-bold lg:py-2 lg:px-3">
                                    {/* pen svg */}
                                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M14.707 3.293a1 1 0 00-1.414 0L4 12.586V16h3.414l9.293-9.293a1 1 0 000-1.414l-2-2zM5 15v-2.586L12.586 5H15v2.586L7.414 15H5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                     Edit
                                </button>
                                <button className="px-1 py-1 font-semibold text-white bg-red-500 rounded hover:bg-red-700 lg:font-bold lg:py-2 lg:px-3">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )

        }
    </main>
  );
};

export default Page;
