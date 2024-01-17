"use client";

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const Page = () => {
  const [money, setMoney] = useState(20);

  const body = {
    payment_method: "pm_card_visa", // Replace with the actual payment method ID
    amount: 1999, // Replace with the actual amount in cents
    currency: "usd",
    description: "Product Purchase",
    quantity: 2, // Replace with the actual quantity of the product
    receipt_email: "customer@example.com", // Replace with the customer's email
    customer: {
      name: "John Doe",
      email: "customer@example.com",
      phone: "123-456-7890",
      address: {
        line1: "123 Main St",
        city: "Cityville",
        state: "CA",
        postal_code: "12345",
        country: "US",
      },
    },
    metadata: {
      order_id: "12345", // Replace with your order ID or any other metadata
      custom_field: "value",
    },
  };

  const PayWithStripe = async () => {
    const stripe = await loadStripe(
      "pk_live_51OSkAALEvvTkpvAdgETbl2ZHfKDtpETfSbCDIg0VKsH5Bb7eM9ArPE6SV3ELfsB0WUELsXcXunDyHTWX6SZULwBy00TeDOxUH6"
    );

    const response = axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}products/create-checkout-session`,
      body,
      // {
      //   headers: {
      //     Authorization: `Bearer ${String(token)}`,
      //   },
      // }
    );

    if (response.status === 200) {
      console.log("success");
    } else {
      console.log("error");
    }
  };
  return (
    <div>
      <div className="a flex flex-col items-center justify-center h-screen w-full my-auto text-center gap-2">
        <h1>Pay with stripe</h1>
        <p>{money}</p>

        <button
          className="px-8 py-1 bg-blue-600 rounded-md text-white"
          onClick={PayWithStripe}
        >
          Pay with Stripe
        </button>
      </div>
    </div>
  );
};

export default Page;
