"use client";

import FooterComp from "@/components/Footer/FooterComp";
import Nav1 from "@/components/navbar/Nav1";
import Navbar from "@/components/navbar/Navbar";
import { UseProductProvider } from "../../../contexts/ProductProvider";
import { UseUserContext } from "../../../contexts/UserContext";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Sidebar from "@/components/sidebar/Sidebar";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const [paymenttype, setPaymentType] = useState("Stripe");
  const [spinner, setSpinner] = useState(false);
  const [amount, setAmount] = useState(1);

  const { UserData, HandleGetUser, Authtoken } = UseUserContext();
  const router = useRouter();

  const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

  const Add = () => {
    setAmount((prevAmount) => prevAmount + 1);
  };

  const Remove = () => {
    if (amount > 1) {
      setAmount((prevAmount) => prevAmount - 1);
    }
  };

const Donate = async (event) => {
  event.preventDefault();
  
  let data = {
    name: "Donation",
    amount: amount,
  };

  if (!Authtoken) {
    router.push("/login");
    return; // Added return statement to exit function early
  }

  if (paymenttype === "Stripe") {
    try {
      setSpinner(true);
      const session = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}admin/donation/stripe/create-checkout-session`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Authtoken}`,
          },
          "Content-Type": "application/json",
        }
      );

      if (session.status === 200) {
        console.log("session", session);

        // const result = await stripe.redirectToCheckout({
        //   sessionId: session.data.url,
        // });

        window.location.href = session.data.url;
        setTimeout(() => {
          setSpinner(false);
        }, 1500);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error("Error in PayWithStripe:", error);
    }
  }
};

  return (
    <div>
      <Nav1 />
      <div className="bg-[#111827] sticky top-0 z-40">
        <Navbar />
      </div>
      <Sidebar />
      <div className="px-4 py-24 lg:px-28">
        <div className="grid w-full gap-8 lg:grid-cols-3 md:grid-cols-2">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-medium">Donation Page </h2>
            <div className="mt-4 bg-white rounded shadow-lg">
              <div className="mt-12 md:mt-0">
                <img
                  src="https://res.cloudinary.com/db2b7vgg4/image/upload/v1707751594/UserDP/plgw3iwrk1zwvtsa3keq.jpg"
                  alt="About Us Image"
                  className="object-cover rounded-lg shadow-md h-[60vh] lg:w-[60vw] md:w-auto w-auto"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-medium"> Summary</h2>
            <div className="py-6 mt-4 bg-white rounded shadow-lg">
              <form onSubmit={(e) => Donate(e)}>
                <div className="px-8">
                  <div className="flex flex-row items-center justify-between gap-5">
                    <div className="inline-flex items-center self-start h-full mt-2 font-semibold ">
                      Donate
                    </div>
                    <div className="flex">
                      <button
                        type="button"
                        onClick={Remove}
                        className="bg-blue-600 p-1.5 font-bold rounded"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-white"
                          viewBox="0 0 20 20"
                          fill="#ffffff"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <input
                        id="item_count"
                        type="number"
                        min={1}
                        //   defaultValue={amount}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="font-bold font-mono w-[80px] py-1.5 px-2 mx-1.5 block border border-gray-300 rounded-md text-sm shadow-sm  placeholder-gray-400"
                      />
                      <button
                        type="button"
                        onClick={Add}
                        className="bg-blue-600 p-1.5 font-bold rounded"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-white"
                          viewBox="0 0 20 20"
                          fill="#ffffff"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="px-8 pt-4 mt-4 border-t">
                  <label
                    for="payment"
                    class="block mb-2 mt-10 text-sm font-medium text-gray-900"
                  >
                    Choose a Payment Method
                  </label>
                  <select
                    id="payment"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setPaymentType(e.target.value)}
                    value={paymenttype}
                  >
                    <option selected>Stripe</option>
                    <option value="CA">Crypto</option>
                  </select>
                </div>
                <div className="px-8 pt-4 mt-4 border-t">
                  <div className="flex items-end justify-between">
                    <span className="font-semibold">Amount in (USD)</span>
                    <span className="font-semibold">${amount}</span>
                  </div>
                  <span className="mt-2 text-xs text-gray-500">
                    Payment goes to ABC Networks 24
                  </span>
                </div>
                <div className="flex items-center px-8 mt-8">
                  <input id="termsConditions" type="checkbox" required />
                  <label
                    className="ml-2 text-xs text-gray-500"
                    htmlFor="termsConditions"
                  >
                    I agree to the terms and conditions.
                  </label>
                </div>
                <div className="flex flex-col px-8 pt-4">
                  <button
                    className="flex items-center justify-center w-full h-10 text-sm font-medium bg-blue-600 rounded text-blue-50 hover:bg-blue-700"
                    type="submit"
                  >
                    {spinner === false ? (
                      `Donate $${amount}`
                    ) : (
                      <div
                        class="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                        role="status"
                        aria-label="loading"
                      ></div>
                    )}
                  </button>
                  <button className="mt-3 text-xs text-blue-500 underline">
                    Thank you!
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <FooterComp />
    </div>
  );
};

export default page;
