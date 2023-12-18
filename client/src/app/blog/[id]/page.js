"use client";
import FooterComp from "@/components/Footer/FooterComp";
import Navbar from "@/components/navbar/Navbar";
import RelatedArticles from "@/components/relatedArticles/RelatedArticles";
import Sidebar from "@/components/sidebar/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";


export default function page() {
 //fetch blog api
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlog = async () => {
    setLoading(true);
    const res = await axios.get("https://klipto-inc-abcstudio-server.onrender.com/api/v1/client/blog");
    setBlog(res.data);
    setLoading(false);
    console.log("blogs", blog);

  };
  useEffect(() => {
    fetchBlog();
  }, []);
  console.log("blogs", blog);


  return (
 
        <div>
      <div className="bg-white sticky top-0 z-[10]">
        <Navbar />
      </div>

      <Sidebar />
      <main className="mt-[90px] pb-16  lg:pb-24 bg-white w-auto  antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className=" lg:mb-2 not-format">
              <address className="flex items-center mb-2 not-italic">
                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <img
                    className="mr-4 w-16 h-16 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Jese Leos"
                  />
                  <div>
                    <a
                      href="#"
                      rel="author"
                      className="text-xl font-bold text-gray-900"
                    >
                      Jese Leos
                    </a>
                    <p className="text-base text-gray-500 dark:text-gray-400">
                      Graphic Designer, educator & CEO Flowbite
                    </p>
                    <p className="text-base text-gray-500 dark:text-gray-400">
                      <time
                        pubdate
                        datetime="2022-02-08"
                        title="February 8th, 2022"
                      >
                        Feb. 8, 2022
                      </time>
                    </p>
                  </div>
                </div>
              </address>
              <h1 className="my-7 text-3xl font-bold leading-tight text-gray-900 lg:mb-6 lg:text-2xl">
                Best practices for successful prototypes
              </h1>
            </header>
            <figure>
              <img
                src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png"
                alt=""
              />
            </figure>

            <p className="mt-10">
              First of all you need to understand how Flowbite works. This
              library is not another framework. Rather, it is a set of
              components based on Tailwind CSS that you can just copy-paste from
              the documentation. It also includes a JavaScript file that enables
              interactive components, such as modals, dropdowns, and datepickers
              which you can optionally include into your project via CDN or NPM.
              You can check out the quickstart guide to explore the elements by
              including the CDN files into your project. But if you want to
              build a project with Flowbite I recommend you to follow the build
              tools steps so that you can purge and minify the generated CSS.
              You'll also receive a lot of useful application UI, marketing UI,
              and e-commerce pages that can help you get started with your
              projects even faster. You can check out this comparison table to
              better understand the differences between the open-source and pro
              version of Flowbite. When does design come in handy? While it
              might seem like extra work at a first glance, here are some key
              moments in which prototyping will come in handy: Usability
              testing. Does your user know how to exit out of screens? Can they
              follow your intended user journey and buy something from the site
              you’ve designed? By running a usability test, you’ll be able to
              see how users will interact with your design once it’s live;
              Involving stakeholders. Need to check if your GDPR consent boxes
              are displaying properly? Pass your prototype to your data
              protection team and they can test it for real; Impressing a
              client. Prototypes can help explain or even sell your idea by
              providing your client with a hands-on experience; Communicating
              your vision. By using an interactive medium to preview and test
              design elements, designers and developers can understand each
              other — and the project — better. Laying the groundwork for best
              design Before going digital, you might benefit from scribbling
              down some ideas in a sketchbook. This way, you can think things
              through before committing to an actual design project. Let's start
              by including the CSS file inside the head tag of your HTML.
              Understanding typography Type properties A typeface is a
              collection of letters. While each letter is unique, certain shapes
              are shared across letters. A typeface represents shared patterns
              across a collection of letters. Baseline A typeface is a
              collection of letters. While each letter is unique, certain shapes
              are shared across letters. A typeface represents shared patterns
              across a collection of letters. Measurement from the baseline A
              typeface is a collection of letters. While each letter is unique,
              certain shapes are shared across letters. A typeface represents
              shared patterns across a collection of letters. Type
              classNameification Serif A serif is a small shape or projection
              that appears at the beginning or end of a stroke on a letter.
              Typefaces with serifs are called serif typefaces. Serif fonts are
              classNameified as one of the following: Old-Style serifs Low
              contrast between thick and thin strokes Diagonal stress in the
              strokes Slanted serifs on lower-case ascenders
            </p>
            
            <section className="not-format">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Discussion (20)
                </h2>
              </div>
              <form className="mb-6">
                <div className="py-2 px-4 mb-4 rounded-lg rounded-t-lg border border-gray-200 bg-gray-200">
                  <label for="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    id="comment"
                    rows="6"
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 bg-gray-200"
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
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900">
                      <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                        alt="Michael Gough"
                      />
                      Michael Gough
                    </p>
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
                    className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                  >
                    <ul
                      className="py-1 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownMenuIconHorizontalButton"
                    >
                      <li>
                        <a
                          href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Edit
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Remove
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Report
                        </a>
                      </li>
                    </ul>
                  </div>
                </footer>
                <p className="text-gray-600">
                  Very straight-to-point article. Really worth time reading.
                  Thank you! But tools are just the instruments for the UX
                  designers. The knowledge of the design tools are as important
                  as the creation of the design strategy.
                </p>
                <div className="flex items-center mt-4 space-x-4">
                  <button
                    type="button"
                    className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400"
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
        className="py-8 px-14  overflow-hidden"
      >
        <div className="px-4 mx-auto max-w-screen-xl">
  
    
        </div>
        <div className="">

      <RelatedArticles />
        </div>
      </aside>


      <FooterComp />
    </div>
      )
    };
