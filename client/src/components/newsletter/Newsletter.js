export default function Newsletter() {
  return (
    <div>
      {/* <!-- subscribe --> */}
      <div className="rounded-xl flex items-start lg:items-center justify-center md:gap-8 md:mx-5 shadow-lg mt-12">
        <img
          src="https://images.unsplash.com/photo-1579275542618-a1dfed5f54ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
          className="w-0 md:w-1/4 object-cover rounded-l  md:hidden lg:block"
        />
        <div className="px-4 py-2">
          <h3 className="text-2xl text-gray-800 font-bold">
            Subscribe to newsletter
          </h3>
          <p className="text-base text-gray-700">
            We sent latest news and posts once in every week, fresh from the
            oven
          </p>

          <form className="mt-4 mb-10">
            <div className="flex flex-col md:flex-row gap-5">
              <input
                type="email"
                name=""
                id=""
                className="w-full outline-none rounded-xl border-gray-200 px-4 py-2"
                placeholder="john@tech.com"
              />
              <button className="px-4 py-2 rounded bg-green-800 text-gray-100 focus:outline-none">
                Subscribe
                <i className="bx bx-right-arrow-alt"></i>
              </button>
            </div>
            <p className="text-green-900 opacity-50 text-sm mt-1">
              No spam. We promise
            </p>
          </form>
        </div>
      </div>
      {/* <!-- end subscribe section --> */}
    </div>
  );
}
