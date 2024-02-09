import Image from "next/image";
import Link from "next/link";

export default function Newsletter() {
  return (
    <div className="">
      {/* <!-- subscribe --> */}
      {/* <div className="flex items-start justify-center mt-12 shadow-lg rounded-xl lg:items-start lg:justify-start md:gap-8 md:mx-5">
        <Image
          src="https://images.unsplash.com/photo-1579275542618-a1dfed5f54ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
          height={500}
          width={500}
          alt="img"
          className="object-cover w-0 rounded-lg md:w-1/4 md:hidden lg:block"
        />
        <div className="px-4 py-2">
          <h3 className="text-2xl font-bold text-gray-800">
            Subscribe to newsletter
          </h3>
          <p className="text-base text-gray-700">
            We sent latest news and posts once in every week, fresh from the
            oven
          </p>

          <form className="mt-4 mb-10">
            <div className="flex flex-col gap-5 md:flex-row">
              <input
                type="email"
                name=""
                id=""
                className="w-full px-4 py-2 border-2 border-gray-300 outline-none rounded-md"
                placeholder="john@tech.com"
              />
              <button className="px-4 py-2 text-white bg-blue-800 rounded focus:outline-none">
                Subscribe
                <i className="bx bx-right-arrow-alt"></i>
              </button>
            </div>
            <p className="mt-1 text-sm text-green-900 opacity-50">
              No spam. We promise
            </p>
          </form>
        </div>
      </div> */}

      <aside
        className="p-4 mt-8 rounded-t-lg shadow-md sm:p-6 lg:p-8 bg-gray-800 border-gray-700 "
        aria-label="Subscribe to the Flowbite newsletter"
      >
        <h3 className="mb-3 text-xl font-medium text-white">
          Get more updates...
        </h3>
        <p className="mb-5 text-sm font-medium text-gray-300">
          Sign up for our newsletter and you'll be among the first to find out
          about new features.
        </p>
        <form>
          <div data-style="clean" className="flex items-end mb-3">
            <div
              data-element="fields"
              data-stacked="false"
              className="flex items-center w-full max-w-md mb-3 seva-fields formkit-fields"
            >
              <div className="relative w-full mr-3 formkit-field">
                <label
                  htmlFor="member_email"
                  className="hidden block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Email address
                </label>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  id="member_email"
                  className="formkit-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="email_address"
                  aria-label="Email Address"
                  placeholder="Your email address..."
                  required=""
                  type="email"
                />
              </div>
              <span className="px-5 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Subscribe
              </span>
            </div>
          </div>
        </form>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-14">
          By subscribing, you agree with ABC's{" "}
          <Link
            href="terms"
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            Terms of Service
          </Link>{" "}
          and
          <Link
            className="text-blue-600 hover:underline dark:text-blue-500 ml-1"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>
          .
        </div>
      </aside>

      {/* <!-- end subscribe section --> */}
    </div>
  );
}
