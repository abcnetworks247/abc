import React from "react";
import Api from "@/utils/Api";
import Cookies from "js-cookie";
export default async function CustompaymentFetch(props) {
  const token = Cookies.get("adminToken");
  const res = await Api.get(`admin/payment/history/${props}`, {
    headers: {
      Authorization: `Bearer ${String(token)}`,
      "Content-Type": "application/json",
    },
  });

  return res;
}
