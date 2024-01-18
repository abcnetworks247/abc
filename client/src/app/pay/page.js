"use client";

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

import axios from "axios";

const Page = () => {
  const [money, setMoney] = useState(20);
  const [clientSecret, setClientSecret] = useState("");
  const stripePromise = loadStripe(
    "pk_live_51OSkAALEvvTkpvAdgETbl2ZHfKDtpETfSbCDIg0VKsH5Bb7eM9ArPE6SV3ELfsB0WUELsXcXunDyHTWX6SZULwBy00TeDOxUH6"
  );

  const body = {
    payment_method: "pm_card_visa",
    amount: 1999,
    currency: "usd",
    description: "Product Purchase",
    quantity: 2,
    receipt_email: "customer@example.com",
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
      order_id: "12345",
      custom_field: "value",
    },
  };

  const PayWithStripe = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}admin/commerce/products/create-checkout-session`,
        body
      );

      if (response.status === 200) {
        console.log("Success. Client Secret:", response.data.clientSecret);
        setClientSecret(response.data.clientSecret);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error("Error in PayWithStripe:", error);
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
      {clientSecret && (
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{}}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
};

export default Page;
