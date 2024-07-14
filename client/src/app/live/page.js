"use client";

import React from "react";
import FooterComp from "@/components/Footer/FooterComp";
import Nav1 from "@/components/navbar/Nav1";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { UseUserContext } from "../../../contexts/UserContext";
import Link from "next/link";
// import vidEnglish from "@/resources/assets/videos/English.mp4";
// import vidFrancais from "@/../public/assets/ABC_AMBA_TV_FRANÇAIS_Full HD 1080p_MEDIUM_FR30.mp4";
// // import vidPidgin from "@/../public/assets/ABC_AMBA_TV_PIDGIN__Full HD 1080p_MEDIUM_FR30";
// import vidPortuguese from "@/../public/assets/ABC_AMBA_TV_PORTUGUESE_Full HD 1080p_MEDIUM_FR30";

const Page = () => {
  const { UserData, HandleGetUser, Authtoken } = UseUserContext();
  const userpackage = UserData && UserData.userpackage;

  //new update

  const channels = [
    {
      name: "ABC AMBA TV, English Live",
      description: "-",
      url: "https://iframe.viewmedia.tv?channel=158",
      img: "./English.jpg",
      id: 1,
    },
    {
      name: "ABC AMBA TV, Portuguese Live",
      description: "Notícias em Português",
      url: "https://iframe.viewmedia.tv?channel=158",
      img: "./Portugues.jpg",
      id: 2,
    },
    {
      name: "ABC AMBA TV, French Live",
      description: "Actualités en français",
      url: "https://iframe.viewmedia.tv?channel=158",
      img: "./Francaise.jpg",
      id: 3,
    },
    {
      name: "ABC AMBA TV, Pidgin English Live",
      description: "News in Pidgin English",
      url: "https://iframe.viewmedia.tv?channel=158",
      img: "./Pidgin.jpg",
      id: 4,
    },
  ];

  return (
    <div>
      <Nav1 />
      <div className="bg-[#111827] sticky top-0 z-[10] mb-10">
        <Navbar />
      </div>

      <Sidebar />
      <div className="h-fit w-full flex flex-col items-center justify-center p-2 md:p-8 lg:p-12">
        <div className="">
          <div className="flex flex-col items-center justify-center gap-1 md:gap-3 mb-3">
            <svg
              version="1.1"
              id="Icons"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 32 32"
              xmlSpace="preserve"
              fill="#000000"
              className="h-14 w-14"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                {" "}
                <style
                  type="text/css"
                  dangerouslySetInnerHTML={{
                    __html:
                      " .st0{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} ",
                  }}
                />{" "}
                <path
                  className="st0"
                  d="M27,30H5c-1.1,0-2-0.9-2-2V14c0-1.1,0.9-2,2-2h22c1.1,0,2,0.9,2,2v14C29,29.1,28.1,30,27,30z"
                />{" "}
                <polyline className="st0" points="7,4 13,12 21,2 " />{" "}
                <line className="st0" x1={21} y1={12} x2={21} y2={30} />{" "}
                <circle className="st0" cx={25} cy={17} r={1} />{" "}
                <circle cx={25} cy={24} r={1} />{" "}
                <circle cx={25} cy={21} r={1} />{" "}
              </g>
            </svg>
            <h1 className="text-xl font-semibold md:text-3xl text-blue-500 mt-1 md:mt-3 text-center  leading-relaxed md:leading-snug">
              ABC Networks Channel, Live-24/7
            </h1>
          </div>
          <h2 className="text-center mb-8">
            Stay informed with our latest news updates. Thank you for staying
            connected!
          </h2>
        </div>

        <div className="w-full mx-auto grid h-full grid-cols-1  lg:grid-cols-2 md:grid-cols-2 justify-items-center justify-center gap-y-20 md:gap-x-14 mt-10 mb-5">
          {/* <div className='w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl'>

          </div> */}

          {channels.map((channel) => (
            <div className="w-full h-auto" key={channel.id}>
              <div className="flex flex-col items-center justify-center mb-3">
                <h1 className="text-xl font-semibold md:text-xl text-gray-800 mt-1 md:mt-3 text-center  leading-relaxed md:leading-snug">
                  {channel.name}
                </h1>
                <h2 className="text-center">{channel.description}</h2>
              </div>
              {userpackage === "basic" || userpackage === null || undefined ? (
                <Link href="/pricing">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      className="object-cover"
                      src={channel.img}
                      alt="Image 1"
                    />
                  </div>
                  
                </Link>
              ) : (
                <iframe
                  src={channel.url}
                  frameborder="0"
                  allowfullscreen
                  webkitallowfullscreen
                  mozallowfullscreen
                  className=" w-full lg:w-[40dvw] h-[40dvh] rounded-lg"
                ></iframe>
              )}
            </div>
          ))}
        </div>

        {/* <iframe
          src='https://iframe.viewmedia.tv?channel=158'
          width='640'
          height='360'
          frameborder='0'
          autoplay='true'
          allowfullscreen
          webkitallowfullscreen
          mozallowfullscreen></iframe> */}
      </div>
      <FooterComp />
    </div>
  );
};

export default Page;
