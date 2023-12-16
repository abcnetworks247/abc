import Image from "next/image";

export default function Newsletter() {
  return (
    <div>
      {/* <!-- subscribe --> */}
      <div className="flex items-start justify-center mt-12 shadow-lg rounded-xl lg:items-start lg:justify-start md:gap-8 md:mx-5">
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
                className="w-full px-4 py-2 border-gray-200 outline-none rounded-xl"
                placeholder="john@tech.com"
              />
              <button className="px-4 py-2 text-gray-100 bg-green-800 rounded focus:outline-none">
                Subscribe
                <i className="bx bx-right-arrow-alt"></i>
              </button>
            </div>
            <p className="mt-1 text-sm text-green-900 opacity-50">
              No spam. We promise
            </p>
          </form>
        </div>
      </div>
      {/* <!-- end subscribe section --> */}
    </div>
  );
}
