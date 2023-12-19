"use client";
import FooterComp from "@/components/Footer/FooterComp";
import Navbar from "@/components/navbar/Navbar";
import RelatedArticles from "@/components/relatedArticles/RelatedArticles";
import Sidebar from "@/components/sidebar/Sidebar";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import parse from "html-react-parser";

export default function page() {
  // store fetched data in state
  const [blog, setBlog] = useState([]);
  // store author's data in state
  const [author, setAuthor] = useState([]);
  // store loading state
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const baseUrl =
    "https://klipto-inc-abcstudio-server.onrender.com/api/v1/client/blog";

  //fetch blog api
  const fetchBlog = async () => {
    setLoading(true);
    const res = await axios.get(`${baseUrl}/${id}`);
    const data = await res.data.blogdata;
    const author = await res.data.blogdata.author;
    setBlog(data);
    setAuthor(author);
    console.log("hey", res.data.blogdata.author);
    console.log(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlog();
    console.log(id);
  }, [id]);

  return (
    <div>
      <div className="bg-white sticky top-0 z-[10] mb-10">
        <Navbar />
      </div>

      {
        // if loading is true, show loading component
        loading ? (
          <main className="mt-[110px] pb-16  lg:pb-24 bg-white w-auto antialiased">
            <div className="flex justify-between max-w-screen-xl px-4 mx-auto flex-col gap-5">
              <span className="animate-pulse w-full rounded-lg lg:h-6 h-12 bg-gray-200  max-w-2xl mx-auto format format-sm sm:format-base lg:format-lg format-blue"></span>
              <div className="w-full h-[50svh] bg-gray-200 rounded max-w-2xl mx-auto format format-sm sm:format-base lg:format-lg format-blue animate-pulse"></div>
            </div>
          </main>
        ) : (
          // else show fetched data
          <>
            <Sidebar />
            <main className="mt-[90px] pb-16  lg:pb-24 bg-white w-auto antialiased">
              <div className="flex justify-between max-w-screen-xl px-4 mx-auto ">
                <article className="w-full max-w-2xl mx-auto format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                  <header className=" lg:mb-2 not-format">
                    <address className="flex items-center mb-2 not-italic">
                      {/* map through fetched data */}
                    </address>
                    <h1 className="text-3xl font-bold leading-tight text-gray-900 my-7 lg:mb-6 lg:text-2xl">
                      {blog.title}
                    </h1>
                  </header>
                  <figure>
                    <img
                      className="w-full h-auto mb-6 rounded-lg"
                      src={blog.blogimage}
                    />
                  </figure>

                  <div className="w-full text-lg leading-relaxed text-gray-700 lg:px-0 lg:w-full">
                    {parse(blog.longdescription)}
                  </div>

                  <section className="not-format">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-bold text-gray-900 lg:text-2xl">
                        Discussion (20)
                      </h2>
                    </div>
                    <form className="mb-6">
                      <div className="px-4 py-2 mb-4 bg-gray-200 border border-gray-200 rounded-lg rounded-t-lg">
                        <label for="comment" className="sr-only">
                          Your comment
                        </label>
                        <textarea
                          id="comment"
                          rows="6"
                          className="outline-0 w-full px-0 text-lg text-gray-900 bg-gray-200 border-0 focus:ring-0 dark:placeholder-gray-400"
                          placeholder="Write a comment..."
                          required
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="inline-flex items-end justify-end py-2.5 px-4 text-xs font-medium text-center text-white bg-gray-800 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 "
                      >
                        Post comment
                      </button>
                    </form>
                    <article className="p-6 mb-6 text-base bg-gray-200 rounded-lg ">
                      <footer className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-5">
                          <div className="flex items-center ">
                            <img
                              className="w-8 h-8 mr-2 rounded-full"
                              src={author.userdp}
                              alt="Profile picture of author"
                            />
                            <h3 className="text-sm font-bold text-gray-900">
                              {author.fullname}
                            </h3>
                          </div>

                          <p className="text-sm text-gray-800">
                            <time
                              pubdate
                              datetime="2022-02-08"
                              title="February 8th, 2022"
                            >
                              Feb. 8, 2022
                            </time>
                          </p>
                        </div>
                        <button
                          id="dropdownComment1Button"
                          data-dropdown-toggle="dropdownComment1"
                          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                          type="button"
                        >
                          <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 3"
                          >
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                          </svg>
                          <span className="sr-only">Comment settings</span>
                        </button>
                        {/* <!-- Dropdown menu --> */}
                        <div
                          id="dropdownComment1"
                          className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-36 dark:bg-gray-700 dark:divide-gray-600"
                        >
                          <ul
                            className="py-1 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownMenuIconHorizontalButton"
                          >
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Edit
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Remove
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Report
                              </a>
                            </li>
                          </ul>
                        </div>
                      </footer>
                      <p className="text-gray-600">
                        Very straight-to-point article. Really worth time
                        reading. Thank you! But tools are just the instruments
                        for the UX designers. The knowledge of the design tools
                        are as important as the creation of the design strategy.
                      </p>
                      <div className="flex items-center mt-4 space-x-4">
                        <button
                          type="button"
                          className="flex items-center text-sm font-medium text-gray-500 hover:underline dark:text-gray-400"
                        >
                          <svg
                            className="mr-1.5 w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 18"
                          >
                            <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                          </svg>
                          Reply
                        </button>
                      </div>
                    </article>
                  </section>
                </article>
              </div>
            </main>

            <aside
              aria-label="Related articles"
              className="py-8 overflow-hidden px-14"
            >
              <div className="max-w-screen-xl px-4 mx-auto"></div>
              <div className="">
                <RelatedArticles />
              </div>
            </aside>
          </>
        )
      }

      <FooterComp />
    </div>
  );
}
