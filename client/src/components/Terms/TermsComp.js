'use client'

import Api from "@/utils/Api";
import parse from "html-react-parser";
import React, { useState, useEffect } from "react";



const Terms = () => {

  const [terms, setTerms] = useState({ description: "" });
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);

const fetchTerms = async () => {
  try {
    const response = await Api.get("admin/pages/terms");
    const data = await response.data;
    setTerms(data.data);
    console.log(data.data.description);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching terms content:", error);
  }
};

useEffect(() => {
  fetchTerms();
}, []);
  
  return (
    <div>
      {/* terms and condition component */}
      <div className="container mx-auto px-4 lg:px-20 py-6 ">
        <div className="flex flex-wrap justify-center text-center my-12">
          <div className="w-full lg:w-6/12 px-4">
            <h2 className="text-2xl font-semibold">Terms and Conditions</h2>
            <p className="text-base leading-relaxed m-4 text-gray-600">
              {` Please read privacy policy carefully before using the ${process.env.NEXT_PUBLIC_CLIENT_URL}, website.`}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap">{parse(`${terms.description}`)}</div>
      </div>
    </div>
  );
};

export default Terms;
