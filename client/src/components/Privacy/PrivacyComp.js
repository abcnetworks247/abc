"use client";

import Api from "@/utils/Api";
import axios from "axios";
import parse from "html-react-parser";
import React, { useState, useEffect } from "react";

const Privacy = () => {
  const [privacy, setPrivacy] = useState({ description: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Set loading initially to true

  const fetchPrivacyContent = async () => {
    try {
      const response = await Api.get("admin/pages/policy");
      const data = await response.data;
      setPrivacy(data.data);
      console.log(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching privacy content:", error);
    }
  };

  useEffect(() => {
    fetchPrivacyContent();
  }, []);

  return (
    <div>
      {/* terms and condition component */}
      <div className="container mx-auto px-4 lg:px-20 py-6 ">
        <div className="flex flex-wrap justify-center text-center my-12">
          <div className="w-full lg:w-6/12 px-4">
            <h2 className="text-2xl font-semibold">Read our Privacy Policy</h2>
            <p className="text-base leading-relaxed m-4 text-gray-600">
              {` Please read privacy policy carefully before using the ${process.env.NEXT_PUBLIC_CLIENT_URL}, website.`}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap">{parse(`${privacy.description}`)}</div>
      </div>
    </div>
  );
};

export default Privacy;
