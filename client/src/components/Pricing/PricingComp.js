"use client";

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const PricingComp = ({ CloseModal, spinnerId, Authtoken }) => {
  const [spinner, setSpinner] = useState(false);
  const [amount, setAmount] = useState(spinnerId.range1);
  const [paymenttype, setPaymentType] = useState("Stripe");
  const public_stripe_key = process.env.NEXT_PUBLIC_STRIPE_PK;

  const Add = () => {
    if (amount < spinnerId.range2) {
      setAmount((prevAmount) => prevAmount + 1);
    }

    console.log("data", spinnerId);
  };

  const Remove = () => {
    if (amount > spinnerId.range1) {
      setAmount((prevAmount) => prevAmount - 1);
    }
  };

  const SubscribeNow = async (event) => {
    event.preventDefault();
    const stripePromise = await loadStripe(public_stripe_key);

    const update = {
      ...spinnerId,
      price: amount,
      type: spinnerId.type,
    };

    if (paymenttype === "Stripe") {
      try {
        setSpinner(true);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}admin/sub/usersubscription`,
          update,
          {
            headers: {
              Authorization: `Bearer ${Authtoken}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("res1", response);

        if (response.status === 409) {
          console.log(
            "User is already subscribed, redirecting to billing portal",
            response.data.redirectUrl
          );

          window.location.href = response.data.redirectUrl;
          setSpinner(false);

          // if (response.data && response.data.redirectUrl) {
          //   window.location.href = response.data.data.redirectUrl;
          // }
        } else if (response.status === 200) {
          // Adjusted condition to handle successee

          window.location.href = response.data.url;

          setSpinner(false);
        } else {
          console.log("res3", response);
          console.error(`Unexpected response status: ${response.status}`);
          setSpinner(false);
        }
      } catch (error) {
        // window.location.href = error.response.data.redirectUrl;
        if (typeof window !== "undefined") {
          window.location.href = error.response.data.redirectUrl;
          console.log(error);
          setSpinner(false);
        }
      }
    }
  };

  return (
    <div
      id="modelConfirm"
      className="fixed top-0 z-50 flex items-center justify-center w-full h-full px-2 overflow-hidden bg-gray-900 bg-opacity-60"
    >
      <div className="relative w-full bg-white rounded-md shadow-xl md:max-w-md md:mx-auto">
        <div className="flex justify-end p-2">
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={CloseModal}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div>
          <h2 className="ml-8 text-sm font-medium">
            {spinnerId?.name} - {spinnerId?.type} plan
          </h2>
          <div className="py-6 mt-4 bg-white rounded shadow-lg">
            <form onSubmit={(e) => SubscribeNow(e)}>
              <div className="px-8">
                <div className="flex flex-row items-center justify-between gap-5">
                  <div className="inline-flex items-center self-start h-full mt-2 font-semibold ">
                    Subscribe
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
                      min={spinnerId?.range1}
                      max={spinnerId?.range2}
                      value={amount}
                      readOnly
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
                    `Subscribe`
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
  );
};

export default PricingComp;
