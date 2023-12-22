"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState} from "react";



const Page = () => {
  const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const baseUrl = "https://klipto-inc-abcstudio-server.onrender.com/api/v1";
    const pathUrl = "/dashboard/ABC/all-news";

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
            <div className="flex justify-center items-center h-96 flex-col gap-3">
                <h1 className="text-3xl font-bold">Something went wrong</h1>
                <p className="
                    text-xl font-semibold text-gray-500 
                ">
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
                <div className="flex justify-center items-center h-96">
                    <svg
                        className="animate-spin -ml-1 mr-3 h-20 w-20 text-blue-500"
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
                        <div className="lg:h-44 flex lg:flex-row flex-col w-full rounded shadow-sm p-2 items-center justify-between lg:my-4 my-3">
                            <Link href={`${pathUrl}/${item._id}`}>
                            <div className=" rounded lg:w-80 w-full lg:h-36 h-40 ">
                                <img
                                    src={item.blogimage}
                                    alt={item.title}
                                    className="w-full h-full object-cover rounded"
                                />
                            </div>
                            </Link>
                            <div className="h-36 px-3">
                            <Link href={`${pathUrl}/${item._id}`}>
                                <h1 className="text-xl font-bold">{item.title}</h1>
                            </Link>
                                <br  /><br className="lg:block hidden"/>
                                <p className="text-sm">{item.shortdescription}</p>
                            </div>
                            <div className="flex gap-3 lg:w-auto lg:justify-normal justify-end w-full">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white lg:font-bold font-semibold lg:py-2 py-1 lg:px-3 px-1 rounded flex flex-row items-center">
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
                                <button className="bg-red-500 hover:bg-red-700 text-white lg:font-bold font-semibold lg:py-2 py-1 lg:px-3 px-1 rounded">
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
