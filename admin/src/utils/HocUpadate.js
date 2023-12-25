"use client";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";
export default function HocUpadate(Component) {
  return function Update(params) {
    const AuthToken = Cookies.get("adminToken");
    const Params = useSearchParams();
    const reset = Params.get('reset');
    if(!reset || reset === "true") {
        AuthToken ?redirect('/dashboard') : redirect("/auth/signin")
    }
 
    return <Component {...params} />

    
  }
}
