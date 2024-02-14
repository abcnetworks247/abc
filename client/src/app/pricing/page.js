"use client";
import Navbar from "@/components/navbar/Navbar";
import FooterComp from "@/components/Footer/FooterComp";
import { UseUserContext } from "../../../contexts/UserContext";
import Sidebar from "@/components/sidebar/Sidebar";
import { useRouter } from "next/navigation";

import axios from "axios";
import { useState } from "react";
import Nav1 from "@/components/navbar/Nav1";
import PricingComp from "@/components/Pricing/PricingComp";

export default function page() {
  const { UserData, HandleGetUser, Authtoken } = UseUserContext();
  const [spinner, setSpinner] = useState(false);
  const [oPenNav, setOpenNav] = useState(false);
  const [spinnerId, setSpinnerId] = useState(null);
  



  const router = useRouter();

  const Plans = [
    {
      name: "General - Copper Donor",
      id: "1",
      range1: 10,
      range2: 50,
      price: "10 - $ 50",
      description:
        "This plan is ideal for individual users and hobbyists who are looking for essential functionalities to support.",
      features: ["Live Video"],
    },
    {
      name: "Prime -Silver Donor",
      id: "2",
      range1: 55,
      range2: 100,
      price: "55 - $ 100",
      description:
        "This plan is ideal for individual users and hobbyists who are looking for essential functionalities to support.",
      features: ["Special Discount", "Live Video"],
    },
    {
      name: "Patrons 1 - Gold Donor",
      id: "3",
      range1: 105,
      range2: 200,
      price: "105 - $ 200",
      description:
        "This plan is ideal for individual users and hobbyists who are looking for essential functionalities to support.",
      features: ["Special Discount", "Live Video", "Free Shipping"],
    },
    {
      name: "Patron 2 - Diamond Donor",
      id: "4",
      range1: 500,
      range2: 1000,
      price: "500",
      description:
        "This plan is ideal for individual users and hobbyists who are looking for essential functionalities to support.",
      features: [
        "Special Discount",
        "Live Video",
        "Free Shipping / Fast Delivery",
        "Free ABCTV App Download",
      ],
    },
    {
      name: "Patron 3 - Titanium Donor",
      id: "5",
      range1: 1000,
      range2: 500000,
      price: "1000",
      description:
        "This plan is ideal for individual users and hobbyists who are looking for essential functionalities to support.",
      features: [
        "Special Discount",
        "Live Discount",
        "Free ABCTV App Download",
        "Free ABCTV Gadgets",
        "Free Shipping / Free Delivery",
      ],
    },
  ];


 const OpenModal = (plan) => {
   setSpinnerId(plan);
   document.body.style.overflow = "hidden";
   setOpenNav(true);
  };
  
  const CloseModal = () => {
    setSpinnerId(null);
    document.body.style.overflow = "visible";
    setOpenNav(false);
  };

  

  return (
    <div className="relative">
      <Nav1 />
      <div className="bg-[#111827] sticky top-0 z-[10] mb-10">
        <Navbar />
      </div>
      <Sidebar />
      <section className="relative overflow-hidden bg-white">
        <div className="relative flex flex-col items-center justify-center max-w-6xl px-8 py-4 mx-auto lg:pt-8 lg:pb-8">
          <div className="text-center">
            <p className="mt-8 text-2xl font-semibold tracking-tight text-black lg:text-3xl">
              <span className="md:block"> Membership Packages</span>
            </p>
            <p className="max-w-xl mt-4 text-base text-gray-400">
              Every plan includes every feature, and can scale as your team
              does.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-12 mb-16 lg:ap-2 lg:grid-cols-3">
            {Plans.map((plan) => (
              <div className="order-first" key={plan.id}>
                <div className="flex flex-col">
                  <div className="p-8 rounded-3xl bg-[#1c1f29] ring-1 ring-white/10 shadow-2xl">
                    <div className="flex-col justify-between">
                      <div className="flex items-center gap-3">
                        <svg
                          className="w-8 h-8 text-black rounded-full"
                          viewBox="0 0 280 280"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="280"
                            height="280"
                            rx="32"
                            fill="#d1cfdf"
                          ></rect>
                          <g clipPath="url(#clip0_501_1489)">
                            <path
                              d="M196.064 183.936L152.127 140L196.064 96.0636L240 140L196.064 183.936ZM83.9364 183.936L40 140L83.9364 96.0636L127.873 140L83.9364 183.936ZM140 240L96.0636 196.064L140 152.127L183.936 196.064L140 240ZM140 127.873L96.0636 83.9364L140 40L183.936 83.9364L140 127.873Z"
                              fill="#000"
                            ></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_501_1489">
                              <rect
                                width="200"
                                height="200"
                                fill="white"
                                transform="translate(40 40)"
                              ></rect>
                            </clipPath>
                          </defs>
                        </svg>
                        <span className="flex flex-col">
                          <p className="text-sm font-medium text-white uppercase">
                            {plan.name}
                          </p>
                          <p className="ml-3">
                            <span className="text-base font-medium text-white uppercase lg:text-xl">
                              ${plan.price}
                            </span>
                            <span className="text-sm font-medium text-gray-500">
                              {" "}
                              /mo
                            </span>
                          </p>
                        </span>
                      </div>
                    </div>
                    <p className="mt-8 text-sm font-medium text-gray-300">
                      {plan.description}
                    </p>
                    <div className="flex mt-6">
                      {/* <button
                        className="w-full px-8 py-1.5 text-white bg-blue-600 rounded-md"
                        onClick={() => {
                          let id = plan.id;
                          if (id) {
                            SubscribeNow(plan);
                          }
                        }}
                      >
                        {plan.id === spinnerId ? (
                          <div
                            class="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                            role="status"
                            aria-label="loading"
                          ></div>
                        ) : (
                          <div className="">
                            Subscribe Now <span>→</span>
                          </div>
                        )}
                      </button> */}

                      <button
                        className="w-full px-8 py-1.5 text-white bg-blue-600 rounded-md"
                        for="modal-3"
                        onClick={() => {
                          let id = plan.id;

                          if (!Authtoken) {
                            router.push("/login");
                            return; // Added return statement to exit function early
                          } else {
                            OpenModal(plan);
                          }
                        }}
                      >
                        <div className="">
                          Subscribe Now <span>→</span>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="px-8">
                    <div>
                      <p className="mt-4 text-lg font-medium text-black uppercase lg:mt-8">
                        Features
                      </p>
                      <ul
                        className="order-last gap-4 mt-4 space-y-3 text-gray-300 list-none"
                        role="list"
                      >
                        {plan.features.map((feature) => (
                          <li className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 text-gray-300 icon icon-tabler icon-tabler-circle-check"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="#000"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              ></path>
                              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                              <path d="M9 12l2 2l4 -4"></path>
                            </svg>
                            <span className="text-black">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {oPenNav && (
        <PricingComp
          CloseModal={CloseModal}
          spinnerId={spinnerId}
          Authtoken={Authtoken}
        />
      )}
      <FooterComp />
    </div>
  );
}
