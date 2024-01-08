import React from 'react'

const HomeBanner = () => {
  return (
    <div>
      <header>
        <div
          className="w-full bg-cover bg-center h-[50vh] mb-10"
          style={{
            backgroundImage:
              "url(https://www.physiomics.co.uk/wp-content/uploads/2019/03/news-header-1350px.jpg)",
          }}
        >
          <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
            <div className="text-center">
              <h1 className="text-white text-2xl font-semibold uppercase md:text-3xl">
                ABC STUDIO{" "}
                <span className="underline text-blue-400">24</span>
              </h1>
              
              <div className="inline-block mb-6 py-1 px-4 font-semibold bg-blue-100 rounded-full my-5">
                <div class="flex flex-wrap items-center -m-1">
                  <div className=" p-1">
                    <a className="text-sm" href="">
                      &#x1F44B; Ambazonia Broadcasting Cooperation
                    </a>
                  </div>
                  <div className=" p-1">
                    <svg
                      width="15"
                      height="15"
                      viewbox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.66667 3.41675L12.75 7.50008M12.75 7.50008L8.66667 11.5834M12.75 7.50008L2.25 7.50008"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HomeBanner;