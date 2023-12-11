export default function Newsletter() {
  return (
    <div>
      {/* <!-- subscribe --> */}
      <div className="rounded-lg flex gap-8 md:shadow-lg mt-12">
        <img
          src="https://images.unsplash.com/photo-1579275542618-a1dfed5f54ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
          className="w-0 md:w-1/4 object-cover rounded-l"
        />
        <div className="px-4 py-2">
          <h3 className="text-2xl text-gray-800 font-bold">
            Subscribe to newsletter
          </h3>
          <p className="text-base text-gray-700">
            We sent latest news and posts once in every week, fresh from the
            oven
          </p>
          <form className="mt-4 mb-10 ">
            <div className="flex flex-col md:flex-row gap-5 lg:border-2 border-gray-400 focus:border-green-400 rounded-lg lg:bg-gray-100">
              <input
                type="email"
                className="w-full  px-4 py-2 outline-none  bg-gray-200 lg:bg-transparent rounded-lg text-black"
                placeholder="john@tech.com"
              />
              <button className="px-4 py-2 rounded bg-green-800 text-gray-100">
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
      {/* <!-- ens subscribe section --> */}
    </div>
  );
}
