import React from 'react'
import { redirect } from 'next/navigation';
import Cookies from 'js-cookie';



export default function HocsessionAuthenticated(Component) {
  
  const Authtoken = Cookies.get("authToken");
  const session = Authtoken;
  return function withHoc(params) {
    if (session) {
      redirect("/");
    }
    return <Component {...params} />;
  };
}

